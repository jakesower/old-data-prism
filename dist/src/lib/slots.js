"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const either_1 = require("./monads/either");
const data_types_1 = require("./data-types");
const data_functions_1 = require("./data-functions");
function FreeSlot(def) {
    return Object.assign({}, def, { slotType: 'free', extract: (_dataSource, raw) => def.type.testCast(raw) });
}
exports.FreeSlot = FreeSlot;
function ColumnSlot(def) {
    return Object.assign({}, def, { slotType: 'column', extract: (dataSource, raw) => (raw !== '') && dataSource.columns[parseFloat(raw)].hasType(def.type) ?
            either_1.Ok(dataSource.columns[parseFloat(raw)].values.map(def.type.cast)) :
            either_1.Err("column blank or has wrong type") });
}
exports.ColumnSlot = ColumnSlot;
function ExpressionSlot(def) {
    return Object.assign({}, def, { type: data_types_1.default.String, slotType: 'expression', extract: (dataSource, raw) => data_functions_1.extractExpression(dataSource, raw).mapErr(e => e.toString()) });
}
exports.ExpressionSlot = ExpressionSlot;
function MultiColumnSlot(def) {
    return Object.assign({}, def, { slotType: 'multicolumn', extract: (dataSource, raw) => raw.every(col => dataSource.columns[parseFloat(col)].hasType(def.type)) ?
            either_1.Ok(raw.map(col => dataSource.columns[col].map(def.type.cast))) :
            either_1.Err("one or more columns have the wrong type") });
}
exports.MultiColumnSlot = MultiColumnSlot;
function EnumeratedSlot(def) {
    return Object.assign({}, def, { type: data_types_1.default.String, slotType: 'enumerated', extract: (_dataSource, raw) => either_1.Ok(raw) });
}
exports.EnumeratedSlot = EnumeratedSlot;
function SourceSlot(def) {
    return Object.assign({}, def, { type: data_types_1.default.String, slotType: 'source', extract: (_dataSource, raw, misc) => either_1.Ok(misc.sources[parseFloat(raw)]) });
}
exports.SourceSlot = SourceSlot;
