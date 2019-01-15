"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nothing = Symbol('Nothing');
class Maybe {
    constructor(value) {
        this.value = value;
    }
    // `of` is the strict constructor--anything may be wrapped in the Maybe,
    // including undefined and null values
    static of(value) {
        return new Maybe(value);
    }
    static fromValue(valueOrFalsy) {
        return (valueOrFalsy != undefined) ?
            new Maybe(valueOrFalsy) :
            new Maybe(Nothing);
    }
    static Nothing() { return new Maybe(Nothing); }
    withDefault(defaultValue) {
        return (this.value === Nothing) ? defaultValue : this.value;
    }
    map(fn) {
        return this.value === Nothing ? new Maybe(Nothing) : new Maybe(fn(this.value));
    }
    chain(fn) {
        return this.value === Nothing ? new Maybe(Nothing) : fn(this.value);
    }
    isNothing() {
        return this.value === Nothing;
    }
    hasValue(other) {
        return this.value === other;
    }
}
exports.Maybe = Maybe;
