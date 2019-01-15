"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sha1 = require("js-sha1");
const utils_1 = require("./lib/utils");
const p = value => ({ value, writable: false });
const g = get => ({ get });
const sourcePrototype = Object.create(null, {
    empty: p(function () { return this.numRecords === 0; }),
    headers: g(function () { return this.columns.map(c => c.name); }),
    numRecords: g(function () { return this.columns[0].values.length; }),
    records: g(function () { return utils_1.transpose(this.columns.map(c => c.values)); }),
    appendColumn: p(function (column) {
        return makeDataSource(Object.assign({}, this, { columns: this.columns.concat([column]) }));
    })
});
const dataColumnPrototype = Object.create(null, {
    hasType: p(function (type) { return this.types.some(t => t.name === type.name); }),
});
// TODO: consider using immutable js for some stuff
function makeDataSource(attrs) {
    const fingerprint = sha1(JSON.stringify([attrs.name].concat(attrs.columns.map(c => c.fingerprint))));
    return Object.setPrototypeOf(Object.assign({}, attrs, { fingerprint }), sourcePrototype);
}
exports.makeDataSource = makeDataSource;
function makeDataColumn(attrs) {
    const fingerprint = sha1(JSON.stringify([attrs.name].concat(attrs.values)));
    return Object.setPrototypeOf(Object.assign({}, attrs, { fingerprint }), dataColumnPrototype);
}
exports.makeDataColumn = makeDataColumn;
