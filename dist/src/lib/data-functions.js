"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseCsv = require("csv-parse");
const data_types_1 = require("./data-types");
const types_1 = require("../types");
const utils_1 = require("./utils");
const math = require("mathjs");
const xstream_1 = require("xstream");
const either_1 = require("./monads/either");
function discoverTypes(vals) {
    return Object.values(data_types_1.default).filter(type => vals.every(type.test));
}
exports.discoverTypes = discoverTypes;
function modifyStateAttr(attr, fn) {
    return obj => Object.assign({}, obj, { [attr]: fn(obj[attr]) });
}
exports.modifyStateAttr = modifyStateAttr;
function populateSlots(dataSource, slots, rawInputs) {
    const populated = utils_1.mapObj(slots, (slot, key) => slot.extract(dataSource, rawInputs[key]));
    return either_1.sequenceAndCollectObj(populated);
}
exports.populateSlots = populateSlots;
// TODO: optimize
function mapRows(fn) {
    return function (dataSource, inputs) {
        const [ks, vs] = [Object.keys(inputs), Object.values(inputs)];
        let output = [];
        for (let i = 0; i < dataSource.numRecords; i += 1) {
            let row = {};
            for (let j = 0; j < ks.length; j += 1) {
                row[ks[j]] = Array.isArray(vs[j]) ? vs[j][i] : vs[j];
            }
            output.push(fn(row));
        }
        return output;
    };
}
exports.mapRows = mapRows;
function csvToDataSource(raw) {
    return raw
        .map(({ body, name }) => {
        const p = new Promise((resolve, reject) => {
            parseCsv(body, {}, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    const headers = data[0];
                    const records = data.slice(1);
                    const pairs = utils_1.zip(headers, utils_1.transpose(records));
                    const columns = pairs.map(pair => types_1.makeDataColumn({
                        name: pair[0],
                        values: pair[1],
                        types: discoverTypes(pair[1]),
                    }));
                    const s = types_1.makeDataSource({
                        name,
                        columns,
                    });
                    resolve(s);
                }
            });
        });
        return xstream_1.default.fromPromise(p);
    })
        .flatten();
}
exports.csvToDataSource = csvToDataSource;
function compileExpression(dataSource, raw) {
    const pat = s => new RegExp('\\{' + s + '\\}', 'g');
    const subbed = dataSource.columns.reduce((acc, col, idx) => acc.replace(pat(col.name), `v${idx}`), raw);
    const fn = math.compile(subbed);
    return record => {
        const scope = record.reduce((acc, v, idx) => {
            const o = { ['v' + idx]: v };
            return Object.assign({}, acc, o);
        }, {});
        return fn.eval(scope).toString();
    };
}
exports.compileExpression = compileExpression;
function extractExpression(dataSource, raw) {
    try {
        const fn = compileExpression(dataSource, raw);
        return either_1.Ok(dataSource.records.map(fn));
    }
    catch (e) {
        return either_1.Err(e);
    }
}
exports.extractExpression = extractExpression;
