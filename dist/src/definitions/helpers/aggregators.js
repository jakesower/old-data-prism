const R = require('ramda');
const Slot = require('../../types/slot');
const DataType = require('../../types/data-type');
const DataSlot = require('../../types/data-slot');
const SlotCollector = require('../../components/collectors/slot-collector');
const { populateSlots, validateSlots } = require('../../lib/definition-utils');
const col = R.curry((dataset, cName) => h('span', { class: { "column-name": true } }, dataset.headers[cName]));
/*
 * Aggregators are NOT operations. Rather they are functions that reduce
 * datasets to a single value.
 */
const colNameSlot = Slot.Free('columnName', 'Column Name', DataType.String);
const makeSlotAggregator = def => {
    const slots = R.prepend(colNameSlot, def.slots);
    return R.merge(def, {
        fn: (group, inputs) => {
            const populated = populateSlots(group, inputs, slots);
            return def.fn(group, populated).toString();
        },
        slots,
        collector: SlotCollector(slots),
        help: "TODO",
        tags: R.append("aggregator", def.tags || []),
        valid: (dataset, inputs) => validateSlots(dataset, inputs, slots)
    });
};
const Count = makeSlotAggregator({
    name: "Count",
    slots: [],
    fn: (group, inputs) => Column.autoSchema(inputs.columnName, group.records.length),
    display: () => 'Count'
});
const Mean = makeSlotAggregator({
    name: "Mean",
    slots: [
        DataSlot.Column('a', 'Column', DataType.FiniteNumber)
    ],
    fn: (group, inputs) => R.mean(inputs.a),
    display: () => 'Mean'
});
const Median = makeSlotAggregator({
    name: "Median",
    slots: [
        DataSlot.Column('a', 'Column', DataType.FiniteNumber)
    ],
    fn: (group, inputs) => R.median(inputs.a),
    display: (inputs, group) => 'Median'
});
const Maximum = makeSlotAggregator({
    name: "Maximum",
    slots: [
        DataSlot.Column('a', 'Column', DataType.FiniteNumber)
    ],
    fn: (group, inputs) => R.max(inputs.a),
    display: () => 'Maximum'
});
const Minimum = makeSlotAggregator({
    name: "Minimum",
    slots: [
        DataSlot.Column('a', 'Column', DataType.FiniteNumber)
    ],
    fn: (group, inputs) => R.min(inputs.a),
    display: () => 'minimum'
});
const Sum = makeSlotAggregator({
    name: "Sum",
    slots: [
        DataSlot.Column('a', 'Column', DataType.FiniteNumber)
    ],
    fn: (group, inputs) => R.sum(inputs.a),
    display: () => 'Sum'
});
const Product = makeSlotAggregator({
    name: "Product",
    slots: [
        DataSlot.Column('a', 'Column', DataType.FiniteNumber)
    ],
    fn: (group, inputs) => R.product(inputs.a),
    display: () => 'Product'
});
module.exports = {
    Count,
    Mean,
    Median,
    Maximum,
    Minimum,
    Sum,
    Product,
};
