/*
 * Aggregators are NOT operations. Rather they are functions that reduce
 * datasets to a single value.
 */
import { VNode, div } from '@cycle/dom';
import { Operation, DataSource, makeDataColumn, OperationSlot, DataColumn } from '../types';
import { discoverTypes, populateSlots } from '../lib/data-functions';
import { FreeSlot, ColumnSlot, MultiColumnSlot } from '../lib/slots';
import { SlotCollector } from '../components/collectors/slot-collector';
import dataTypes from '../lib/data-types';
import { go } from '../lib/utils';
import { Ok, Either, sequenceList } from '../lib/monads/either';

interface SlotAggregatorDefinition {
  aggregatorFn: (dataSource: DataSource, inputs: {[k: string]: any}) => string,
  display: (source: DataSource, inputs: {[k: string]: any}) => VNode,
  name: string,
  slots: { [k in string]: OperationSlot<any> },
  tags?: string[],
}

interface Aggregator {
  fn: (dataSource: DataSource[], inputs: {[k: string]: any}) => Either<string, DataColumn>,
  display: (source: DataSource, inputs: {[k: string]: any}) => VNode,
  slots: { [k in string]: OperationSlot<any> },
  name: string,
  collector: any,
  tags?: string[],
  help?: string,
  valid?: (source: DataSource, inputs: {[k: string]: any}) => boolean,
}



const colNameSlot = FreeSlot({ display: 'Column Name', type: dataTypes.String });

const makeAggregator = (def: SlotAggregatorDefinition): Aggregator => {
  return {...def,
    fn: (dataSources, inputs) => go(function* () {
      const valsE = dataSources.map(dataSource => go(function* () {
        const populated = yield populateSlots(dataSource, def.slots, inputs);
        return def.aggregatorFn(dataSource, populated);
      }));

      const vals = yield sequenceList(valsE);

      return makeDataColumn({
        name: inputs.columnName,
        values: vals,
        types: discoverTypes(vals),
      });
    }),
    slots: def.slots,
    collector: SlotCollector,
    help: "TODO",
    tags: [...(def.tags || []), "aggregator"],
  };
}

export const Count: Aggregator = makeAggregator({
  name: "Count",
  slots: {
    columnName: colNameSlot,
  },
  aggregatorFn: (ds, _) => ds.records.length.toString(),
  display: () => div('Count'),
});


export const Mean = makeAggregator({
  name: "Mean",
  slots: {
    columnName: colNameSlot,
    a: ColumnSlot({ display: 'Column', type: dataTypes.FiniteNumber }),
  },
  aggregatorFn: (_, inputs) => (inputs.a.reduce((x, y) => x+y, 0) / inputs.a.length).toString(),
  display: () => div('Sum'),
});


// const Mean = makeSlotAggregator({
//   name: "Mean",
//   slots: [
//     DataSlot.Column('a', 'Column', DataType.FiniteNumber)
//   ],
//   fn: (group, inputs) => R.mean(inputs.a),
//   display: () => 'Mean'
// });


// const Median = makeSlotAggregator({
//   name: "Median",
//   slots: [
//     DataSlot.Column('a', 'Column', DataType.FiniteNumber)
//   ],
//   fn: (group, inputs) => R.median(inputs.a),
//   display: (inputs, group) => 'Median'
// });


// const Maximum = makeSlotAggregator({
//   name: "Maximum",
//   slots: [
//     DataSlot.Column('a', 'Column', DataType.FiniteNumber)
//   ],
//   fn: (group, inputs) => R.max(inputs.a),
//   display: () => 'Maximum'
// });


// const Minimum = makeSlotAggregator({
//   name: "Minimum",
//   slots: [
//     DataSlot.Column('a', 'Column', DataType.FiniteNumber)
//   ],
//   fn: (group, inputs) => R.min(inputs.a),
//   display: () => 'minimum'
// });


export const Sum = makeAggregator({
  name: "Sum",
  slots: {
    columnName: colNameSlot,
    a: ColumnSlot({ display: 'Column', type: dataTypes.FiniteNumber }),
  },
  aggregatorFn: (_, inputs) => inputs.a.reduce((x, y) => x+y, 0).toString(),
  display: () => div('Sum'),
});


// const Product = makeSlotAggregator({
//   name: "Product",
//   slots: [
//     DataSlot.Column('a', 'Column', DataType.FiniteNumber)
//   ],
//   fn: (group, inputs) => R.product(inputs.a),
//   display: () => 'Product'
// });


// module.exports = {
//   Count,
//   Mean,
//   Median,
//   Maximum,
//   Minimum,
//   Sum,
//   Product,
// };
