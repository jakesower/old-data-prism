"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@cycle/dom");
const xstream_1 = require("xstream");
const collection_1 = require("../../lib/collection");
const utils_1 = require("../../lib/utils");
const slot_components_1 = require("./shared/slot-components");
const slots_1 = require("../../lib/slots");
const data_types_1 = require("../../lib/data-types");
function SlotPairCollector(_opDef, dataSource, initialInputs) {
    function main(cycleSources) {
        const { add$, otherwise$ } = intent(cycleSources.DOM, initialInputs);
        const slot = slots_1.FreeSlot({ display: 'Column Name', type: data_types_1.default.NonEmptyString });
        const collector = slot_components_1.freeSlotComponent(slot, dataSource, initialInputs.columnName)(cycleSources);
        const pairs$ = collection_1.Collection({
            component: pairComponent,
            sources: cycleSources,
            add$,
            init: initialInputs.values || [],
            removeConnector: i => i.remove$,
        });
        const value$ = xstream_1.default.combine(collection_1.pluck(pairs$, i => i.value), otherwise$, collector.value)
            .map(([values, otherwise, columnName]) => ({ values, otherwise, columnName }));
        return {
            DOM: xstream_1.default.combine(collection_1.pluck(pairs$, i => i.DOM), otherwise$, collector.DOM)
                .map(([rowDom, otherwise, collectorDom]) => view(rowDom, otherwise, collectorDom)),
            value: value$,
        };
    }
    function view(rowDom, otherwise, collectorDom) {
        return dom_1.div([
            collectorDom,
            dom_1.table('.column-collector', utils_1.flatten([
                dom_1.tr([dom_1.th('Condition'), dom_1.th(''), dom_1.th('Result'), dom_1.th('')]),
                rowDom,
                dom_1.tr(dom_1.td({ attrs: { colspan: '4' } }, dom_1.button('.add', { style: { width: '100%' } }, 'New Condition'))),
                dom_1.tr([
                    dom_1.td('otherwise'),
                    dom_1.td(''),
                    dom_1.td(dom_1.input('.otherwise', {
                        attrs: { type: 'text', required: true },
                        props: { value: otherwise },
                    }, dom_1.td('')))
                ]),
            ]))
        ]);
    }
    function intent(DOM, init) {
        return {
            add$: DOM.select('.add').events('click'),
            otherwise$: DOM.select('.otherwise').events('change').map(ev => ev.target.value).startWith(init.otherwise),
        };
    }
    function pairComponent({ DOM }, rawInit) {
        const init = rawInit || {};
        const condition$ = DOM.select('.condition').events('change').map(ev => ev.target.value).startWith(init.condition);
        const result$ = DOM.select('.result').events('change').map(ev => ev.target.value).startWith(init.result);
        const dom$ = xstream_1.default.combine(condition$, result$).map(([condition, result]) => dom_1.tr('.column-row', [
            dom_1.td(dom_1.input('.condition', {
                attrs: { type: 'text', required: true },
                props: { value: condition }
            })),
            dom_1.td('to'),
            dom_1.td(dom_1.input('.result', {
                attrs: { type: 'text' },
                props: { value: result }
            })),
            dom_1.td('.remove', 'X')
        ]));
        const value$ = xstream_1.default.combine(condition$, result$).map(([condition, result]) => ({ condition, result })).debug();
        return {
            DOM: dom$,
            value: value$,
            remove$: DOM.select('.remove').events('click'),
        };
    }
    return main;
}
exports.SlotPairCollector = SlotPairCollector;
