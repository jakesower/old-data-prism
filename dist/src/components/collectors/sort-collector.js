"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collection_1 = require("../../lib/collection");
const dom_1 = require("@cycle/dom");
const data_types_1 = require("../../lib/data-types");
const xstream_1 = require("xstream");
const maybe_1 = require("../../lib/monads/maybe");
function SortCollector(_opDef, dataSource, initialInputs) {
    function main(cycleSources) {
        const new$ = cycleSources.DOM.select('.add-button').events('click');
        const sorters$ = collection_1.Collection({
            component: columnComponent,
            sources: cycleSources,
            add$: new$,
            init: initialInputs.columns || [],
            removeConnector: i => i.remove$,
        });
        return {
            DOM: collection_1.pluck(sorters$, i => i.DOM).map(view),
            value: collection_1.pluck(sorters$, i => i.value).startWith([]).map(vals => ({ columns: vals })),
        };
    }
    function columnComponent(cycleSources, init) {
        const { DOM } = cycleSources;
        const columnName$ = DOM.select('.col-name').events('change').map(ev => ev.target.value)
            .startWith(init ? init.columnName : '');
        const setDirection$ = DOM.select('.direction').events('change').map(ev => ev.target.value);
        const stringOpts = ['A 🡒 Z', 'Z 🡒 A'];
        const numericOpts = ['0 🡒 9', '9 🡒 0'].concat(stringOpts);
        const firstDirection = col => col.hasType(data_types_1.default.Number) ? numericOpts[0] : stringOpts[0];
        const directionModifiers$ = xstream_1.default.merge(columnName$.map(columnName => direction => {
            const col = maybe_1.Maybe.fromValue(dataSource.columns.find(c => c.name === columnName)).withDefault(null);
            return !col ? '' : (direction === '' ? firstDirection(col) : direction);
        }), setDirection$.map(d => _ => d));
        const direction$ = directionModifiers$.fold((dir, mod) => mod(dir), init ? init.direction : '');
        const value$ = xstream_1.default.combine(columnName$, direction$).map(([columnName, direction]) => ({ columnName, direction }));
        const view$ = xstream_1.default.combine(columnName$, direction$).map(([columnName, direction]) => {
            const mColumn = maybe_1.Maybe.fromValue(dataSource.columns.find(c => c.name === columnName));
            const emptyCol = dom_1.option({ attrs: { value: '', selected: (columnName === "") } }, '');
            const colNameOptions = dataSource.columns.map(col => dom_1.option({ attrs: { value: col.name, selected: (columnName === col.name) } }, col.name));
            const colDirectionOptions = mColumn.map(col => {
                const opts = col.hasType(data_types_1.default.Number) ? numericOpts : stringOpts;
                return opts.map(opt => dom_1.option({ attrs: { value: opt, selected: direction === opt } }, opt));
            }).withDefault([]);
            return dom_1.div('.slot-container', [
                dom_1.div('.remove', 'X'),
                dom_1.div('.slot', {}, [
                    dom_1.h3({}, 'Column & Direction'),
                    dom_1.div({ style: { display: 'flex' } }, [
                        dom_1.select('.col-name', { style: { "flex-grow": "1" } }, [emptyCol].concat(colNameOptions)),
                        dom_1.select('.direction', { style: { width: "6em", "margin-left": "1em", } }, colDirectionOptions),
                    ]),
                ])
            ]);
        });
        return {
            DOM: view$,
            value: value$,
            remove$: cycleSources.DOM.select('.remove').events('click'),
        };
    }
    function view(collectorDom) {
        return dom_1.div([
            dom_1.div(collectorDom),
            dom_1.button('.add-button', 'Add Sorter'),
        ]);
    }
    return main;
}
exports.SortCollector = SortCollector;
