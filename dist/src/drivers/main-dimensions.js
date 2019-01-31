"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adapt_1 = require("@cycle/run/lib/adapt");
const xstream_1 = require("xstream");
const debounce_1 = require("xstream/extra/debounce");
/**
 * Highly specialized driver. Its value is the height and width of whatever is
 * at `main` in the DOM.
 */
function mainDimensionsDriver(_) {
    const dimensions$ = xstream_1.default.create({
        start: listener => {
            const update = () => {
                const elt = document.querySelector('main');
                listener.next({
                    height: elt.clientHeight,
                    width: elt.clientWidth,
                });
            };
            window.addEventListener('DOMContentLoaded', update);
            window.onresize = update;
        },
        stop: () => { }
    });
    return adapt_1.adapt(dimensions$
        .compose(debounce_1.default(400))
        .startWith({ height: 1, width: 1 })
        .remember());
}
exports.default = mainDimensionsDriver;
