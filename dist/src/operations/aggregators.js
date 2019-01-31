"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Aggregators are NOT operations. Rather they are functions that reduce
 * datasets to a single value.
 */
const dom_1 = require("@cycle/dom");
const types_1 = require("../types");
const data_functions_1 = require("../lib/data-functions");
const slots_1 = require("../lib/slots");
const slot_collector_1 = require("../components/collectors/slot-collector");
const data_types_1 = require("../lib/data-types");
const utils_1 = require("../lib/utils");
const either_1 = require("../lib/monads/either");
const colNameSlot = slots_1.FreeSlot({ display: 'Column Name', type: data_types_1.default.String });
const makeAggregator = (def) => {
    return Object.assign({}, def, { fn: (dataSources, inputs) => utils_1.go(function* () {
            const valsE = dataSources.map(dataSource => utils_1.go(function* () {
                const populated = yield data_functions_1.populateSlots(dataSource, def.slots, inputs);
                return def.aggregatorFn(dataSource, populated);
            }));
            const vals = yield either_1.sequenceList(valsE);
            return types_1.makeDataColumn({
                name: inputs.columnName,
                values: vals,
                types: data_functions_1.discoverTypes(vals),
            });
        }), slots: def.slots, collector: slot_collector_1.SlotCollector, help: "TODO", tags: [...(def.tags || []), "aggregator"] });
};
exports.Count = makeAggregator({
    name: "Count",
    slots: {
        columnName: colNameSlot,
    },
    aggregatorFn: (ds, _) => ds.records.length.toString(),
    display: () => dom_1.div('Count'),
});
exports.Mean = makeAggregator({
    name: "Mean",
    slots: {
        columnName: colNameSlot,
        a: slots_1.ColumnSlot({ display: 'Column', type: data_types_1.default.FiniteNumber }),
    },
    aggregatorFn: (_, inputs) => (inputs.a.reduce((x, y) => x + y, 0) / inputs.a.length).toString(),
    display: () => dom_1.div('Sum'),
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
exports.Sum = makeAggregator({
    name: "Sum",
    slots: {
        columnName: colNameSlot,
        a: slots_1.ColumnSlot({ display: 'Column', type: data_types_1.default.FiniteNumber }),
    },
    aggregatorFn: (_, inputs) => inputs.a.reduce((x, y) => x + y, 0).toString(),
    display: () => dom_1.div('Sum'),
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
