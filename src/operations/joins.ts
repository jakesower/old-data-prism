import { div } from '@cycle/dom';
import { Operation, makeDataColumn, makeDataSource, DataSource, DataColumn } from '../types';
import { zip, transpose, groupBy, fill, intersection } from '../lib/utils';
import { discoverTypes } from '../lib/data-functions';
import { JoinCollector } from '../components/collectors/join-collector';
import { ConcatCollector } from '../components/collectors/concat-collector';
import dataTypes from '../lib/data-types';

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


export const Concat: Operation = (function () {
  return {
    display: _ => div('Concatenate'),
    fn: (source, inputs) => {
      console.log({ source, inputs });
      const local = source;
      const foreign = inputs.foreignSource;
      const xwalk = inputs.xwalk;

      const nextCols = local.columns.map((lcol, lIdx) => {
        const fcol = foreign.columns.find(c => c.name === xwalk[lIdx].foreignColumn) as DataColumn;
        const typeNames = intersection(lcol.types.map(t => t.name), fcol.types.map(t => t.name));
        const types = typeNames.map(n => Object.values(dataTypes).find(t => t.name === n));

        return makeDataColumn({
          name: lcol.name,
          values: lcol.values.concat(fcol.values),
          types,
        });
      });

      return makeDataSource({ columns: nextCols });
    },
    name: 'Concatenate',
    tags: [],
    collector: ConcatCollector,
    valid: (_source, inputs) => {
      const required = ['foreignSource', 'xwalk'];
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
  const foreignGroups = groupBy(foreign, f => f[foreignKeys]);
  const joiner = (acc, localRow) => {
    const localKey = localRow[localKeys];
    const foreignMatches = foreignGroups[localKey];

    const rows = foreignMatches ?
      foreignMatches.map(match => localRow.concat(match)) :
      noMatchFn(localRow);

    return acc.concat(rows);
  };

  const resultRows = local.reduce(joiner, []);
  return resultRows;
}
