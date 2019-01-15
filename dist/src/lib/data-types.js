"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const either_1 = require("./monads/either");
const defMeths = {
    testCast: function (s) {
        return this.test(s) ? either_1.Ok(this.cast(s)) : either_1.Err("invalid data type");
    },
    mapTestCast: function (ss) {
        const l = ss.length;
        const out = [];
        for (let i = 0; i < l; i += 1) {
            const s = ss[i];
            if (!this.test(s)) {
                return either_1.Err("one or more invalid data types");
            }
            out[i] = this.cast(s);
        }
        return either_1.Ok(out);
    },
};
const withDefaults = (x) => Object.assign({}, defMeths, x);
const finiteNum = x => !isNaN(parseFloat(x)) && isFinite(x);
const gt0 = x => parseFloat(x) > 0;
const _String = withDefaults({
    name: "String",
    test: _ => true,
    cast: x => x,
    testCast: x => either_1.Ok(x),
    mapTestCast: xs => either_1.Ok(xs),
});
const NonEmptyString = withDefaults({
    name: "Non-Empty String",
    test: x => x !== "",
    cast: x => x,
    testCast: x => x === "" ? either_1.Err("String must be empty") : either_1.Ok(x),
});
const _Number = withDefaults({
    name: "Number",
    test: x => !isNaN(parseFloat(x)),
    cast: parseFloat,
    testCast: x => this.test ? either_1.Ok(this.cast(x)) : either_1.Err("must be numeric"),
});
const FiniteNumber = withDefaults({
    name: "Finite Number",
    test: finiteNum,
    cast: parseFloat,
    testCast: x => this.test ? either_1.Ok(this.cast(x)) : either_1.Err("must be a finite number"),
});
const PositiveFiniteNumber = withDefaults({
    name: "Positive Finite Number",
    test: x => finiteNum(x) && gt0(x),
    cast: parseFloat
});
const Integer = withDefaults({
    name: "Integer",
    test: x => finiteNum(x) && (parseFloat(x) % 1 === 0),
    cast: parseFloat
});
const PositiveInteger = withDefaults({
    name: "Positive Integer",
    test: x => Integer.test(x) && gt0(x),
    cast: parseFloat
});
const _Date = withDefaults({
    name: "Date",
    test: x => !isNaN(Date.parse(x)),
    cast: x => moment(new Date(x))
});
const _Boolean = withDefaults({
    name: "Boolean",
    test: x => (x === "true") || (x === "false"),
    cast: x => x === "true"
});
const dataTypes = {
    String: _String,
    NonEmptyString,
    Number: _Number,
    FiniteNumber,
    PositiveFiniteNumber,
    Integer,
    PositiveInteger,
    Date: _Date,
    Boolean: _Boolean
};
exports.default = dataTypes;
