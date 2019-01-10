import { div } from '@cycle/dom';
import { Operation, makeDataColumn, makeDataSource } from '../types';
import { ColumnCollector } from '../components/collectors/column-collector';
import { SlotCollector, SlotOperation } from '../components/collectors/slot-collector';
import { SortCollector } from '../components/collectors/sort-collector';
import { ExpressionSlot } from '../lib/slots';
import { discoverTypes, populateSlots } from '../lib/data-functions';
import { sortBy, zip, transpose } from '../lib/utils';


export const ColumnModifier: Operation = {
  display: _ => div('Change Columns'),
  fn: (source, inputs) => {
    const nextCols = inputs.reduce((acc, item, idx) =>
      item.keep ?
        acc.concat(makeDataColumn({ name: item.name, values: source.columns[idx].values, types: source.columns[idx].types })) :
        acc
    , []);

    return makeDataSource({
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
    expression: ExpressionSlot({ display: 'Predicate Expression' }),
  };

  return {
    slots,
    display: _ => div('Filter'),
    fn: (source, inputs) => {
      const populated = populateSlots(source, slots, inputs);
      const nextCols = source.columns.map(col => {
        const nextVals = col.values.filter((_, idx) => populated.expression[idx] === "true");
        return makeDataColumn({
          name: col.name,
          values: nextVals,
          types: discoverTypes(nextVals)
        });
      });

      return makeDataSource({
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


export const Sort: Operation = {
  display: _ => div('Change Sorting'),
  fn: (source, inputs) => {
    const comps = {
      '0 🡒 9': (a, b) => parseFloat(a) - parseFloat(b),
      '9 🡒 0': (a, b) => parseFloat(b) - parseFloat(a),
      'A 🡒 Z': (a, b) => (a === b) ? 0 : ((a > b) ? -1 : 1),
      'Z 🡒 A': (a, b) => (a === b) ? 0 : ((a < b) ? -1 : 1),
    };

    const sorters = inputs.columns.map(({ columnName, direction }) => ({
      offset: source.columns.findIndex(c => c.name === columnName) || 0,
      comp: comps[direction],
    }));
    const numSorters = sorters.length;

    const sorter = (rowA, rowB) => {
      for (let i=0; i<numSorters; i+=1) {
        const n = sorters[i].offset;
        const c = sorters[i].comp(rowA[n], rowB[n]);
        if (c !== 0) {
          return c;
        }
      }
      return 0;
    }

    const sorted = <string[][]>sortBy(sorter, source.records);
    const nextCols = transpose(sorted).map((values, idx) => makeDataColumn({
      name: source.columns[idx].name,
      values,
      types: source.columns[idx].types,
    }));

    return makeDataSource({
      name: source.name,
      columns: nextCols
    });
  },
  name: 'Sort',
  tags: [],
  collector: SortCollector,
  valid: _ => true,
};

