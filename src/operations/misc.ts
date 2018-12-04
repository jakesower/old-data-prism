import { div } from '@cycle/dom';
import { Operation, makeDataColumn, makeDataSource } from '../types';
import { ColumnCollector } from '../components/collectors/column-collector';
import { SlotCollector, SlotOperation } from '../components/collectors/slot-collector';
import { ExpressionSlot } from '../lib/slots';
import dataTypes from '../lib/data-types';
import { zip, transpose } from '../lib/utils';
import { discoverTypes, populateSlots } from '../lib/data-functions';


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
    expression: ExpressionSlot({ display: 'Expression', type: dataTypes.String }),
  };

  return {
    slots,
    display: _ => div('Filter'),
    fn: (source, inputs) => {
      const populated = populateSlots(source, slots, inputs);
      console.log({ source, inputs, populated });
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
