"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@cycle/dom");
const multiselect_1 = require("../../components/multiselect");
const xstream_1 = require("xstream");
function freeSlotComponent(slot, _dataSource, init) {
    return function ({ DOM, errors }) {
        const value$ = DOM.select('.slot-input')
            .events('change')
            .map(ev => ev.target.value)
            .startWith(init || '');
        const view$ = xstream_1.default.combine(value$, errors).map(([value, mErrors]) => dom_1.div('.slot', {}, [
            dom_1.h3({}, slot.display),
            dom_1.input('.slot-input', {
                attrs: { type: 'text', required: true },
                props: { value }
            }),
            mErrors.map(error => dom_1.div('.error', error)).withDefault(null),
        ]));
        return { value: value$, DOM: view$ };
    };
}
exports.freeSlotComponent = freeSlotComponent;
function columnSlotComponent(slot, dataSource, init) {
    return function ({ DOM, errors }) {
        const value$ = DOM.select('.slot-input').events('change').map(ev => ev.target.value).startWith(init || '');
        const view$ = value$.map(value => {
            const emptyCol = dom_1.option({ attrs: { value: '', selected: (value === "") } }, '');
            const colReducer = (acc, col, idx) => col.hasType(slot.type) ?
                [...acc, dom_1.option({ attrs: { value: idx, selected: (value === idx.toString()) } }, col.name)] :
                acc;
            const relevantColumns = dataSource.columns.reduce(colReducer, [emptyCol]);
            return dom_1.div('.slot', {}, [
                dom_1.h3({}, slot.display),
                dom_1.select('.slot-input', relevantColumns),
            ]);
        });
        return { value: value$, DOM: view$ };
    };
}
exports.columnSlotComponent = columnSlotComponent;
function multicolumnSlotComponent(slot, dataSource) {
    return function ({ DOM, errors }) {
        const colReducer = (acc, col, idx) => col.hasType(slot.type) ?
            [...acc, { value: idx, display: col.name }] :
            acc;
        const relevantColumns = dataSource.columns.reduce(colReducer, []);
        return multiselect_1.default({ options: relevantColumns, selected: [] })({ DOM });
    };
}
exports.multicolumnSlotComponent = multicolumnSlotComponent;
function sourceSlotComponent(slot, _dataSource, init) {
    return function ({ DOM, errors, props }) {
        const value$ = DOM.select('.slot-input').events('change').map(ev => ev.target.value).startWith(init || '');
        const view$ = xstream_1.default.combine(value$, props)
            .map(([value, props]) => {
            const emptySource = dom_1.option({ attrs: { value: '', selected: (value === '') } }, '');
            const sourceVdom = props.sources.map((src, idx) => dom_1.option({ attrs: { value: idx, selected: (value === idx.toString()) } }, src.name));
            return dom_1.div('.slot', {}, [
                dom_1.h3({}, slot.display),
                dom_1.select('.slot-input', [emptySource].concat(sourceVdom)),
            ]);
        });
        return { value: value$, DOM: view$ };
    };
}
exports.sourceSlotComponent = sourceSlotComponent;
function enumeratedSlotComponent(slot, _dataSource, init) {
    return function ({ DOM, errors }) {
        const value$ = DOM.select('.slot-input').events('change').map(ev => ev.target.value).startWith(init || '');
        const view$ = value$.map(value => {
            const empty = dom_1.option({ attrs: { value: '', selected: (value === '') } }, '');
            const opts = slot.possibleValues.map(poss => dom_1.option({ attrs: { value: poss, selected: (value === poss) } }, poss));
            return dom_1.div('.slot', {}, [
                dom_1.h3({}, slot.display),
                dom_1.select('.slot-input', [empty].concat(opts)),
            ]);
        });
        return { value: value$, DOM: view$ };
    };
}
exports.enumeratedSlotComponent = enumeratedSlotComponent;
