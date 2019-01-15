"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@cycle/dom");
const collection_1 = require("../../lib/collection");
const slots_1 = require("../../lib/slots");
const multiselect_1 = require("../components/multiselect");
const xstream_1 = require("xstream");
const maybe_1 = require("../../lib/monads/maybe");
const data_types_1 = require("../../lib/data-types");
const aggregatorDefs = require("../../operations/aggregators");
const utils_1 = require("../../lib/utils");
const slot_collector_1 = require("./slot-collector");
// A higher order component--takes in slots and returns a component
function GroupCollector(_opDef, dataSource, init) {
    function main(cycleSources) {
        const { new$ } = intent(cycleSources.DOM);
        const groupBasisComp = multicolumnSlotComponent(slots_1.MultiColumnSlot({ type: data_types_1.default.String, display: 'Columns' }), init.groupBasis);
        const GroupBasis = groupBasisComp(dataSource, cycleSources);
        const aggregators$ = collection_1.Collection({
            component: (cs, i) => Aggregator(cs, dataSource, i),
            sources: cycleSources,
            add$: new$,
            init: init.aggregators || [],
            removeConnector: i => i.remove$,
        });
        const aggregatorDom$ = collection_1.pluck(aggregators$, i => i.DOM).startWith([]);
        const aggregatorValues$ = collection_1.pluck(aggregators$, i => i.value).startWith([]);
        const validValues$ = aggregatorValues$
            .map(avs => avs
            .filter(av => !av.aggregator.isNothing()) // TODO: make this part of validation
            .map(av => (Object.assign({}, av, { aggregator: av.aggregator.withDefault(null) }))));
        const value = xstream_1.default.combine(GroupBasis.value, validValues$)
            .map(([gb, aggregators]) => ({ groupBasis: gb, aggregators }));
        const dom$ = xstream_1.default.combine(GroupBasis.DOM, aggregatorDom$)
            .map(([gbDom, ad]) => view({ basisDom: gbDom, aggregatorDom: ad }));
        return { DOM: dom$, value };
    }
    function intent(DOM) {
        return {
            new$: DOM.select('.new-aggregator').events('click'),
        };
    }
    function view(state) {
        return dom_1.div('.slot', [
            dom_1.h3('Group By'),
            state.basisDom,
            dom_1.div('.aggregators', state.aggregatorDom),
            dom_1.button('.new-aggregator', 'New Aggregator'),
        ]);
    }
    function multicolumnSlotComponent(slot, init) {
        return function (dataSource, { DOM }) {
            const colReducer = (acc, col, idx) => col.hasType(slot.type) ?
                [...acc, { value: idx.toString(), display: col.name }] :
                acc;
            const cols = dataSource.columns.reduce(colReducer, []);
            return multiselect_1.default({ options: cols, selected: init || [] })({ DOM });
        };
    }
    return main;
}
exports.GroupCollector = GroupCollector;
function Aggregator(cycleSources, dataSource, init) {
    const { DOM } = cycleSources;
    const initState = init ? Object.assign({}, init, { aggregator: maybe_1.Maybe.of(init.aggregator) }) :
        { aggregator: maybe_1.Maybe.Nothing(), inputs: {} };
    const aggregator$ = DOM.select('.aggregator-id').events('change').map(ev => ev.target.value);
    const remove$ = DOM.select('.remove').events('click');
    const modifiers$ = xstream_1.default.merge(aggregator$.map(a => state => (Object.assign({}, state, { aggregator: maybe_1.Maybe.fromValue(a) }))));
    const state$ = modifiers$.fold((state, mod) => mod(state), initState);
    const collector$ = slotCollector(state$, DOM, dataSource);
    const collectorVdom$ = collector$.map(c => c.DOM).flatten();
    const collectorValue$ = collector$.map(c => c.value).flatten();
    const dom$ = xstream_1.default.combine(state$, collectorVdom$).map(([{ aggregator }, collectorVdom]) => {
        const aggOpts = utils_1.sortWith(od => od.name, utils_1.inlineKey(aggregatorDefs))
            .map(agg => dom_1.option({ attrs: { value: agg.key, selected: aggregator.withDefault('') === agg.key } }, agg.name));
        const aggMarkup = dom_1.div('.slot', {}, [
            dom_1.h3([dom_1.span('.remove'), 'Aggregator']),
            dom_1.select('.aggregator-id', {}, [dom_1.option({}, '')].concat(aggOpts))
        ]);
        return dom_1.div('.aggregator', {}, utils_1.flatten([
            [aggMarkup],
            [collectorVdom]
        ]));
    });
    const value$ = xstream_1.default.combine(state$, collectorValue$)
        .map(([s, cv]) => ({ aggregator: s.aggregator, inputs: cv }));
    return {
        DOM: dom$,
        value: value$,
        remove$,
    };
    function slotCollector(state$, DOM, dataSource) {
        const emptyCollector = { DOM: xstream_1.default.of([]), value: xstream_1.default.of({}) };
        return state$.map(state => state.aggregator
            .map(agg => {
            const aggDef = aggregatorDefs[agg];
            return slot_collector_1.SlotCollector(aggDef, dataSource, state.inputs)({ DOM, props: cycleSources.props });
        })
            .withDefault(emptyCollector));
    }
}
