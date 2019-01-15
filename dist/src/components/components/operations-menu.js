"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xstream_1 = require("xstream");
const dom_1 = require("@cycle/dom");
const operations_1 = require("../../operations");
const utils_1 = require("../../lib/utils");
const help = require("../../strings/operations");
const initState = {
    active: false,
};
function main(cycleSources) {
    const { activate$, close$, operation$ } = intent(cycleSources.DOM);
    const stateModifiers$ = xstream_1.default.merge(xstream_1.default.merge(close$, operation$).mapTo(state => (Object.assign({}, state, { active: false }))), activate$.mapTo(state => (Object.assign({}, state, { active: true }))));
    const state$ = stateModifiers$.fold((state, fn) => fn(state), initState);
    return {
        DOM: state$.map(view),
        operation: operation$,
    };
}
exports.default = main;
function intent(DOM) {
    return {
        activate$: DOM.select('.new-operation-button').events('click'),
        close$: DOM.select('.close-mask').events('click'),
        operation$: DOM.select('.operation').events('click').debug().map(ev => ev.target.dataset.operation),
    };
}
// TODO: sort by type (numbers and not just strings)
const view = (state) => {
    const operations = utils_1.sortWith(od => od.name, utils_1.inlineKey(operations_1.default));
    return dom_1.div({}, [
        dom_1.div('.new-operation-button.action', {}, "New Operation"),
        dom_1.div('.operations-menu-container' + (state.active ? '.active' : ''), dom_1.div('.operations-menu', [
            dom_1.div('.close-mask', dom_1.i('.fa.fa-times-circle', "")),
            dom_1.div('.menu', [
                dom_1.h1('Select Operation'),
                dom_1.ul(operations.map(operation => dom_1.li([
                    dom_1.span('.operation', { dataset: { operation: operation.key } }, operation.name),
                    dom_1.div('.help', { props: { innerHTML: help[operation.key] } })
                ]))),
            ])
        ]))
    ]);
};
