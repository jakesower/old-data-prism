import { div } from '@cycle/dom';
import { Operation, makeDataColumn, makeDataSource, DataSource } from '../types';
import { ColumnCollector } from '../components/collectors/column-collector';
import { SlotCollector, SlotOperation } from '../components/collectors/slot-collector';
import { ExpressionSlot, SourceSlot, EnumeratedSlot, ColumnSlot } from '../lib/slots';
import dataTypes from '../lib/data-types';
import { zip, transpose, groupBy, fill } from '../lib/utils';
import { discoverTypes, populateSlots } from '../lib/data-functions';
import { JoinCollector } from '../components/collectors/join-collector';


export const ColumnModifier: Operation = {
  display: _ => div('Change Columns'),
  fn: (source, inputs) => {
    const nextCols = inputs.reduce((acc, item, idx) =>
      item.keep ?
        acc.concat(makeDataColumn({ name: item.name, values: source.columns[idx].values, types: source.columns[idx].types })) :
        acc
    , []);

    return makeDataSource({
      id: 'hi',
      name: source.name,
      columns: nextCols
    });
  },
  name: 'Adjust Columns',
  tags: [],
  collector: ColumnCollector,
  valid: _ => true,
}


export const Filter: SlotOperation = (function () {
  const slots = {
    expression: ExpressionSlot({ display: 'Expression' }),
  };

  return {
    slots,
    display: _ => div('Filter'),
    fn: (source, inputs) => {
      const populated = populateSlots(source, slots, inputs);
      // console.log({ source, inputs, populated });
      const nextCols = source.columns.map(col => {
        const nextVals = col.values.filter((_, idx) => populated.expression[idx] === "true");
        return makeDataColumn({
          name: col.name,
          values: nextVals,
          types: discoverTypes(nextVals)
        });
      });

      return makeDataSource({
        id: 'moo',
        name: source.name,
        columns: nextCols,
      });
    },
    name: 'Filter',
    tags: [],
    collector: SlotCollector,
    valid: _ => true,
  }
}());


// export const Append: Operation = {
//   display: _ => div('Join'),
//   fn: (source, inputs) => {
//     return source;
//   },
//   name: 'Join',
//   tags: [],
//   collector: AppendCollector,
//   valid: _ => true,
// }


export const Join: Operation = (function () {
  function innerJoin(local, foreign, lk, fk) {
    return joinDataSources(local, foreign, lk, fk, _ => []);
  }

  function leftJoin(local, foreign, lk, fk) {
    const emptyCols = fill(foreign.columns.length, "");
    const noMatchFn = localRow => [localRow.concat(emptyCols)];
    return joinDataSources(local, foreign, lk, fk, noMatchFn);
  }

  function rightJoin(local, foreign, lk, fk) {
    const result = leftJoin(foreign, local, fk, lk);
    const lcols = result.columns.slice(foreign.columns.length);
    const fcols = result.columns.slice(0, foreign.columns.length);

    return makeDataSource({
      name: result.name,
      columns: lcols.concat(fcols)
    });
  }

  return {
    display: _ => div('Join'),
    fn: (source, inputs) => {
      console.log({ source, inputs });
      const local = source;
      const foreign = inputs.foreignSource;
      const lk = inputs.localKey;
      const fk = inputs.foreignKey;

      switch (inputs.joinMethod) {
        case 'Inner':
          return innerJoin(local, foreign, lk, fk);
        case 'Left':
          return leftJoin(local, foreign, lk, fk);
        case 'Right':
          return rightJoin(local, foreign, lk, fk);
      }

      return source; // :(
    },
    name: 'Join',
    tags: [],
    collector: JoinCollector,
    valid: (_source, inputs) => {
      const required = ['foreignSource', 'localKey', 'foreignKey', 'joinMethod'];
      return required.every(k => Object.keys(inputs).includes(k));
    },
  }
}());


function joinDataSources(a: DataSource, b: DataSource, aKeys: string, bKeys: string, noMatchFn: (localRow: string[]) => string[][]) {
  const aIdx = a.columns.findIndex(col => col.name === aKeys);
  const bIdx = b.columns.findIndex(col => col.name === bKeys);
  const nextRecords = join(a.records, b.records, aIdx, bIdx, noMatchFn);
  const colHeaders = a.columns.map(c => c.name).concat(b.columns.map(c => c.name));
  const pairs = zip(colHeaders, transpose(nextRecords));
  const nextColumns = pairs.map(([ name, values ]) => makeDataColumn({
    name,
    values,
    types: discoverTypes(values),
  }));

  return makeDataSource({
    name: "Moo",
    columns: nextColumns,
  })
}


function join(
  local: string[][],
  foreign: string[][],
  localKeys: number,
  foreignKeys: number,
  noMatchFn: (localRow: string[]) => string[][]
): string[][] {
  // console.log({ local, foreign, localKeys, foreignKeys });

  const foreignGroups = groupBy(foreign, f => f[foreignKeys]);
  const joiner = (acc, localRow) => {
    const localKey = localRow[localKeys];
    const foreignMatches = foreignGroups[localKey];
    // console.log({ localKey, foreignGroups, foreignMatches })

    const rows = foreignMatches ?
      foreignMatches.map(match => localRow.concat(match)) :
      noMatchFn(localRow);

    return acc.concat(rows);
  };

  const resultRows = local.reduce(joiner, []);
  return resultRows;
}

// export const Join: SlotOperation = (function () {
//   const slots = {
//     foreignSource: SourceSlot({ display: 'Foreign Source', type: dataTypes.String }),
//     joinMethod: EnumeratedSlot({ display: 'Join Method', possibleValues: ['Cross', 'Inner'] }),
//     localKey: ColumnSlot
//   }
// })
