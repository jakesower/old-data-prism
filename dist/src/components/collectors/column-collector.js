"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@cycle/dom");
const xstream_1 = require("xstream");
const isolate_1 = require("@cycle/isolate");
const utils_1 = require("../../lib/utils");
// A higher order component--takes in slots and returns a component
function ColumnCollector(_opDef, dataSource, initialInputs) {
    function main(cycleSources) {
        const columnComponents = dataSource.columns.map((col, idx) => {
            const init = initialInputs[idx] || { keep: true, name: col.name };
            return isolate_1.default(columnComponent(col, init), idx)(cycleSources);
        });
        return {
            DOM: xstream_1.default.combine(...columnComponents.map(sc => sc.DOM))
                .map(vals => [...vals])
                .map(view),
            value: xstream_1.default.combine(...columnComponents.map(sc => sc.value)),
        };
    }
    function view(rowDom) {
        return dom_1.table('.column-collector', utils_1.flatten([
            dom_1.tr([dom_1.th('Keep'), dom_1.th('Original Name'), dom_1.th('New Name')]),
            rowDom,
        ]));
    }
    function columnComponent(column, init) {
        return function ({ DOM }) {
            const keep$ = DOM.select('.keep').events('click').map(ev => ev.target.checked).startWith(init.keep);
            const columnName$ = DOM.select('.new-column-name').events('change').map(ev => ev.target.value).startWith(init.name);
            const dom$ = xstream_1.default.combine(keep$, columnName$).map(([keep, name]) => dom_1.tr('.column-row', [
                dom_1.td(dom_1.input('.keep', {
                    attrs: { type: 'checkbox' },
                    props: { checked: keep },
                })),
                dom_1.td(column.name),
                dom_1.td(dom_1.input('.new-column-name', {
                    attrs: { type: 'text', required: true },
                    props: { value: name }
                })),
            ]));
            const value$ = xstream_1.default.combine(keep$, columnName$).map(([keep, name]) => ({ keep, name }));
            return { DOM: dom$, value: value$ };
        };
    }
    return main;
}
exports.ColumnCollector = ColumnCollector;
