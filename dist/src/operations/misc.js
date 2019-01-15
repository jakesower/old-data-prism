"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@cycle/dom");
const types_1 = require("../types");
const column_collector_1 = require("../components/collectors/column-collector");
const slot_collector_1 = require("../components/collectors/slot-collector");
const sort_collector_1 = require("../components/collectors/sort-collector");
const slots_1 = require("../lib/slots");
const data_functions_1 = require("../lib/data-functions");
const utils_1 = require("../lib/utils");
const either_1 = require("../lib/monads/either");
exports.ColumnModifier = {
    display: _ => dom_1.div('Change Columns'),
    fn: (source, inputs) => {
        const nextCols = inputs.reduce((acc, item, idx) => item.keep ?
            acc.concat(types_1.makeDataColumn({ name: item.name, values: source.columns[idx].values, types: source.columns[idx].types })) :
            acc, []);
        return either_1.Ok(types_1.makeDataSource({
            name: source.name,
            columns: nextCols
        }));
    },
    name: 'Adjust Columns',
    tags: [],
    collector: column_collector_1.ColumnCollector,
};
exports.Filter = (function () {
    const slots = {
        expression: slots_1.ExpressionSlot({ display: 'Predicate Expression' }),
    };
    return {
        slots,
        display: _ => dom_1.div('Filter'),
        fn: (source, inputs) => utils_1.go(function* () {
            const populated = yield data_functions_1.populateSlots(source, slots, inputs);
            const nextCols = source.columns.map(col => {
                const nextVals = col.values.filter((_, idx) => populated.expression[idx] === "true");
                return types_1.makeDataColumn({
                    name: col.name,
                    values: nextVals,
                    types: data_functions_1.discoverTypes(nextVals)
                });
            });
            return either_1.Ok(types_1.makeDataSource({
                name: source.name,
                columns: nextCols,
            }));
        }),
        name: 'Filter',
        tags: [],
        collector: slot_collector_1.SlotCollector,
    };
}());
exports.Sort = {
    display: _ => dom_1.div('Change Sorting'),
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
            for (let i = 0; i < numSorters; i += 1) {
                const n = sorters[i].offset;
                const c = sorters[i].comp(rowA[n], rowB[n]);
                if (c !== 0) {
                    return c;
                }
            }
            return 0;
        };
        const sorted = utils_1.sortBy(sorter, source.records);
        const nextCols = utils_1.transpose(sorted).map((values, idx) => types_1.makeDataColumn({
            name: source.columns[idx].name,
            values,
            types: source.columns[idx].types,
        }));
        return either_1.Ok(types_1.makeDataSource({
            name: source.name,
            columns: nextCols
        }));
    },
    name: 'Sort',
    tags: [],
    collector: sort_collector_1.SortCollector,
};
