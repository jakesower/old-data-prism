"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const dom_1 = require("@cycle/dom");
const ramda_1 = require("ramda");
const types_1 = require("../types");
const data_functions_1 = require("../lib/data-functions");
const data_types_1 = require("../lib/data-types");
const utils_1 = require("../lib/utils");
const slots_1 = require("../lib/slots");
const slot_collector_1 = require("../components/collectors/slot-collector");
const slot_pair_collector_1 = require("../components/collectors/slot-pair-collector");
const either_1 = require("../lib/monads/either");
const col = (dataSource, cName) => dom_1.span('.column-name', dataSource.headers[cName]);
const colNameSlot = slots_1.FreeSlot({ display: 'Column Name', type: data_types_1.default.NonEmptyString });
const slotsMissing = (slots, inputs) => {
    return !utils_1.eq(Object.keys(slots), Object.keys(inputs));
};
const makeDeriver = (def) => {
    return utils_1.merge(def, {
        fn: (dataSource, inputs) => utils_1.go(function* () {
            if (slotsMissing(def.slots, inputs) || (def.valid && !def.valid(dataSource, inputs))) {
                return either_1.Err("invalid input");
            }
            const populated = yield data_functions_1.populateSlots(dataSource, def.slots, inputs);
            const vals = def.deriverFn(dataSource, populated);
            return dataSource.appendColumn(types_1.makeDataColumn({
                name: inputs.columnName,
                values: vals,
                types: data_functions_1.discoverTypes(vals)
            }));
        }),
        collector: slot_collector_1.SlotCollector,
        help: 'help text',
        tags: def.tags ? def.tags.concat(["deriver"]) : ["deriver"],
    });
};
exports.Expression = makeDeriver({
    name: "Expression",
    tags: ["math"],
    slots: {
        columnName: colNameSlot,
        expression: slots_1.ExpressionSlot({ display: "Expression" }),
    },
    deriverFn: (_, inputs) => inputs.expression,
    display: (_, inputs) => dom_1.div(['Expression Column ', dom_1.span('.column-name', inputs.columnName)]),
});
exports.Index = makeDeriver({
    name: "Index",
    slots: {
        columnName: colNameSlot,
    },
    deriverFn: (dataSource, _) => dataSource.records.map((_, idx) => (idx + 1).toString()),
    display: _ => dom_1.div('Add Index'),
});
exports.FormatDate = makeDeriver({
    name: "Format Date",
    tags: ["date", "time"],
    slots: {
        columnName: colNameSlot,
        date: slots_1.ColumnSlot({ display: 'Column', type: data_types_1.default.Date }),
        format: slots_1.FreeSlot({ display: 'Format', type: data_types_1.default.String })
    },
    deriverFn: data_functions_1.mapRows(({ date, format }) => date.format(format)),
    display: (dataSource, inputs) => dom_1.div({}, [
        'Formatted ',
        col(dataSource, inputs.num)
    ])
});
exports.ParseDate = makeDeriver({
    name: "Parse Date",
    tags: ["date", "time"],
    slots: {
        columnName: colNameSlot,
        date: slots_1.ColumnSlot({ display: 'Column', type: data_types_1.default.String }),
        format: slots_1.FreeSlot({ display: 'Pattern', type: data_types_1.default.String })
    },
    deriverFn: data_functions_1.mapRows(({ date, format }) => moment(date, format).toString()),
    display: (dataSource, inputs) => dom_1.div({}, [
        'Formatted ',
        col(dataSource, inputs.num)
    ])
});
exports.Round = makeDeriver({
    name: "Round",
    tags: ["math"],
    slots: {
        columnName: colNameSlot,
        column: slots_1.ColumnSlot({ display: 'Column', type: data_types_1.default.FiniteNumber }),
        precision: slots_1.FreeSlot({ display: 'Precision', type: data_types_1.default.FiniteNumber }),
    },
    deriverFn: data_functions_1.mapRows(({ column, precision }) => utils_1.round(column, precision).toString()),
    display: (dataSource, inputs) => dom_1.div({}, [
        'Round ',
        col(dataSource, inputs.column)
    ])
});
exports.MapValues = {
    name: 'Map Values',
    tags: [],
    collector: slot_pair_collector_1.SlotPairCollector,
    fn: (dataSource, inputs) => {
        const fn = utils_1.reverse(inputs.values).reduce((onion, { condition, result }) => {
            const test = data_functions_1.compileExpression(dataSource, condition);
            const out = /\{/.test(result) ? data_functions_1.compileExpression(dataSource, result) : _ => result;
            return row => (test(row) === 'true') ? out(row) : onion(row);
        }, _ => inputs.otherwise);
        const values = dataSource.records.map(fn);
        return either_1.Ok(dataSource.appendColumn(types_1.makeDataColumn({
            values,
            name: inputs.columnName,
            types: data_functions_1.discoverTypes(values),
        })));
    },
    display: (dataSource, inputs) => dom_1.div('Map Values'),
};
exports.Quantile = (function () {
    const slots = {
        columnName: colNameSlot,
        column: slots_1.ColumnSlot({ display: 'Column', type: data_types_1.default.FiniteNumber }),
        order: slots_1.FreeSlot({ display: 'Order', type: data_types_1.default.PositiveFiniteNumber }),
    };
    return {
        name: "Quantile",
        tags: ["math", "bucketers"],
        collector: slot_collector_1.SlotCollector,
        slots,
        fn: (dataSource, inputs) => utils_1.go(function* () {
            if (slotsMissing(slots, inputs)) {
                return either_1.Err("missing inputs");
            }
            const populated = yield data_functions_1.populateSlots(dataSource, slots, inputs);
            const sorted = utils_1.sort(populated.column);
            const frac = sorted.length / populated.order;
            const cutoffs = ramda_1.range(0, parseInt(populated.order)).map(n => ramda_1.nth(Math.ceil(n * frac), sorted));
            const qCol = populated.column.map(n => (ramda_1.findLastIndex((m) => parseFloat(n) >= m, cutoffs) + 1).toString());
            return either_1.Ok(dataSource.appendColumn(types_1.makeDataColumn({
                name: populated.columnName,
                values: qCol,
                types: data_functions_1.discoverTypes(qCol) // TODO
            })));
        }),
        display: (dataSource, inputs) => {
            const quantileNames = {
                '2': "median groups",
                '3': "terciles",
                '4': "quartiles",
                '5': "quintiles",
                '6': "sextiles",
                '7': "septiles",
                '8': "octiles",
                '10': "deciles",
                '12': "duo-deciles",
                '16': "hexadeciles",
                '20': "ventiles",
                '100': "percentiles",
                '1000': "permilles"
            };
            const name = quantileNames[inputs.order] || `${inputs.order}-quantile`;
            return dom_1.div({}, [
                `${name} on `,
                col(dataSource, inputs.column)
            ]);
        }
    };
}());
