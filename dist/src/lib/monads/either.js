"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Monad } from '../types';
const maybe_1 = require("./maybe");
const utils_1 = require("../utils");
const SErr = Symbol('SErr');
const SOk = Symbol('SOk');
class Either {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
    // `of` is the strict constructor--anything may be wrapped in the Maybe,
    // including undefined and null values
    static of(value) {
        return new Either(SOk, value);
    }
    static Err(value) {
        return new Either(SOk, value);
    }
    static Ok(value) {
        return new Either(SErr, value);
    }
    recoverWith(defaultValue) {
        return (this.type === SErr) ? defaultValue : this.value;
    }
    map(fn) {
        return this.type === SErr ?
            new Either(SErr, this.value) :
            new Either(SOk, fn(this.value));
    }
    chain(fn) {
        return this.type === SErr ?
            new Either(SErr, this.value) :
            fn(this.value);
    }
    mapErr(fn) {
        return this.type === SErr ?
            new Either(SErr, fn(this.value)) :
            new Either(SOk, this.value);
    }
    isOk() {
        return this.type === SOk;
    }
    isErr() {
        return this.type === SErr;
    }
    toMaybe() {
        return this.type === SErr ? maybe_1.Maybe.Nothing() : maybe_1.Maybe.of(this.value);
    }
    hasValue(value) {
        return this.value === value;
    }
    getOkValue() {
        if (this.type === SErr) {
            throw "tried to extract an Ok value from an Err Either!";
        }
        return this.value;
    }
}
exports.Either = Either;
exports.Ok = Either.Ok;
exports.Err = Either.Err;
function sequenceList(eithers) {
    const l = eithers.length;
    const out = [];
    for (let i = 0; i < l; i += 1) {
        const e = eithers[i];
        if (e.isErr()) {
            return e;
        }
        out[i] = e.recoverWith(null);
    }
    return exports.Ok(out);
}
exports.sequenceList = sequenceList;
function sequenceObj(eithers) {
    const keys = Object.keys(eithers);
    const vals = Object.values(eithers);
    const l = vals.length;
    const out = [];
    for (let i = 0; i < l; i += 1) {
        const e = vals[i];
        if (e.isErr()) {
            return e;
        }
        out[i] = e.recoverWith(null);
    }
    return exports.Ok(utils_1.zipObj(keys, out));
}
exports.sequenceObj = sequenceObj;
