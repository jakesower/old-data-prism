"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../src/lib/utils");
const maybe_1 = require("../src/lib/monads/maybe");
const chai_1 = require("chai");
require("mocha");
describe('go', () => {
    const just5 = maybe_1.Maybe.of(5);
    const just3 = maybe_1.Maybe.of(3);
    const nothing = maybe_1.Maybe.Nothing();
    it('should return Nothing when encountering a Nothing', () => {
        const out1 = utils_1.go(function* () {
            const nada = yield nothing;
            const five = yield just5;
            return five + nada;
        });
        chai_1.assert(out1.isNothing());
        const out2 = utils_1.go(function* () {
            const five = yield just5;
            const nada = yield nothing;
            return five + nada;
        });
        chai_1.assert(out2.isNothing());
    });
    it('should return Just 8 with Just inputs', () => {
        const out = utils_1.go(function* () {
            const three = yield just3;
            const five = yield just5;
            return three + five;
        });
        chai_1.assert(out.hasValue(8));
    });
});
