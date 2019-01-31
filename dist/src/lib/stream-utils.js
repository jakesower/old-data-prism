"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xstream_1 = require("xstream");
const utils_1 = require("./utils");
const sample_with_1 = require("./streams/sample-with");
exports.sampleWith = sample_with_1.sampleWith;
function objectStream(obj) {
    const [keys, vals] = [Object.keys(obj), Object.values(obj)];
    return xstream_1.default.combine(...vals).map(args => utils_1.zipObj(keys, args));
}
exports.objectStream = objectStream;
