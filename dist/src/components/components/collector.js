"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xstream_1 = require("xstream");
const sampleCombine_1 = require("xstream/extra/sampleCombine");
const dom_1 = require("@cycle/dom");
const maybe_1 = require("../../lib/monads/maybe");
const utils_1 = require("../../lib/utils");
const operations_1 = require("../../operations");
const stream_utils_1 = require("../../lib/stream-utils");
const help = require("../../strings/operations");
const either_1 = require("../../lib/monads/either");
const initState = {
    editing: true,
    inputs: {},
    showErrors: false,
    showHelp: false,
    savedValue: maybe_1.Maybe.Nothing(),
};
const iconTags = [
    'deriver',
    'filter',
    'grouping',
    'aggregator'
];
function main(cycleSources) {
    const { DOM, chain$, chainInit$: operation$ } = cycleSources;
    const collectorValueApplyProxy$ = xstream_1.default.create();
    const collectorValueSaveProxy$ = xstream_1.default.create();
    // STATE MODIFIERS
    //
    const { save$, cancel$, edit$, apply$, removePress$, toggleHelp$ } = intent(DOM);
    const stateModifiers$ = xstream_1.default.merge(edit$.mapTo(state => (Object.assign({}, state, { editing: true }))), cancel$
        .filter(_ => state => !state.savedValue.isNothing())
        .mapTo(state => (Object.assign({}, state, { editing: false, inputs: state.savedValue.withDefault({}) }))), collectorValueApplyProxy$
        .map(inputs => state => (Object.assign({}, state, { inputs }))), collectorValueSaveProxy$
        .map(inputs => state => (Object.assign({}, state, { inputs, editing: false, savedValue: maybe_1.Maybe.of(inputs) }))), toggleHelp$.mapTo(state => (Object.assign({}, state, { showHelp: !state.showHelp }))));
    const localState$ = stateModifiers$.fold((state, mod) => mod(state), initState);
    // SECONDARY STREAMS
    //
    const collector$ = collector(localState$, DOM, chain$, cycleSources.props, operation$);
    const collectorVdom$ = collector$.map(c => c.DOM).flatten();
    const collectorValue$ = collector$.map(c => c.value).flatten();
    const collectorValueApply$ = collectorValue$.compose(stream_utils_1.sampleWith(apply$));
    const collectorValueSave$ = collectorValue$.compose(stream_utils_1.sampleWith(save$));
    collectorValueApplyProxy$.imitate(collectorValueApply$);
    collectorValueSaveProxy$.imitate(collectorValueSave$);
    const state$ = xstream_1.default.combine(localState$, chain$)
        .map(([a, b]) => Object.assign({}, a, { dataSource: b }))
        .startWith(Object.assign({}, initState, { dataSource: maybe_1.Maybe.Nothing(), inputs: {} }));
    // EXTERNAL STREAMS
    //
    const dataSource$ = xstream_1.default.combine(state$, operation$)
        .compose(stream_utils_1.sampleWith(xstream_1.default.merge(save$, apply$)))
        .map(([s, o]) => nextDataSource(s, o))
        .startWith(either_1.Err({}));
    const value$ = state$
        .compose(stream_utils_1.sampleWith(xstream_1.default.merge(save$, apply$)));
    // .map(Maybe.of)
    // .startWith(Maybe.Nothing());
    const dom$ = xstream_1.default.combine(state$, collectorVdom$, dataSource$, operation$)
        .map(args => view(args[0], args[1], args[2], args[3]));
    const cancelRemove$ = cancel$
        .compose(sampleCombine_1.default(localState$))
        .filter(([_, ls]) => ls.savedValue.isNothing());
    return {
        DOM: dom$,
        value: value$,
        operationValue: xstream_1.default.combine(state$, operation$).map(([state, operation]) => ({ operation, inputs: state.inputs })),
        dataSource: dataSource$.map(ds => ds.toMaybe()),
        remove$: xstream_1.default.merge(removePress$, cancelRemove$),
    };
}
exports.default = main;
function intent(DOM) {
    return {
        save$: DOM.select('.collector .save').events('click'),
        apply$: DOM.select('.collector .apply').events('click'),
        cancel$: DOM.select('.collector .cancel').events('click'),
        edit$: DOM.select('.collector .edit').events('click'),
        removePress$: DOM.select('.collector .remove').events('click'),
        toggleHelp$: DOM.select('.collector .help-toggle').events('click'),
    };
}
function view(state, collectorMarkup, eDataSource, operation) {
    if (state.editing) {
        return viewEdit(state, collectorMarkup, operation);
    }
    const def = operations_1.default[operation];
    const dataSource = eDataSource.okOr(null);
    if (!def || !dataSource) {
        return [];
    }
    const icon = `collector-${def.tags.find(t => iconTags.includes(t)) || 'generic'}`;
    return dom_1.div({ class: { collector: true, [icon]: true } }, [
        dom_1.div({ class: { definition: true } }, def.display(dataSource, state.inputs)),
        dom_1.div({ class: { controls: true } }, [
            dom_1.span('.edit', ''),
            dom_1.span('.remove', '')
        ])
    ]);
}
function viewEdit(state, collectorMarkup, operation) {
    const def = operations_1.default[operation];
    return dom_1.div('.collector.editing', {}, utils_1.flatten([
        dom_1.div('.operation-heading', [
            dom_1.i('.fa.fa-question-circle.help-toggle', " "),
            dom_1.h2('.operation-title', def.name),
            dom_1.div(state.showHelp ? '.active.help-container' : '.help-container', dom_1.div('.help', { props: { innerHTML: help[operation] } })),
        ]),
        collectorMarkup,
        dom_1.div('.collector-controls', {}, [
            dom_1.button('.save', {}, 'Save'),
            dom_1.button('.apply', {}, 'Apply'),
            dom_1.button('.cancel', {}, 'Cancel'),
        ])
    ]));
}
function collector(localState$, DOM, dataSource$, props, operation$) {
    const noDataSourceCollector = { DOM: xstream_1.default.of(dom_1.div('hi')), value: xstream_1.default.of({}) };
    return xstream_1.default.combine(localState$, dataSource$, operation$)
        .map(([localState, mDataSource, operation]) => mDataSource.map(dataSource => {
        const opDef = operations_1.default[operation];
        return opDef.collector(opDef, dataSource, localState.inputs)({ DOM, props });
    })
        .withDefault(noDataSourceCollector))
        .startWith(noDataSourceCollector);
}
function nextDataSource(state, operation) {
    const mData = utils_1.go(function* () {
        const opDef = operations_1.default[operation];
        const src = yield state.dataSource;
        return { opDef, src };
    });
    return mData
        .map(({ opDef, src }) => opDef.fn(src, state.inputs))
        .withDefault(either_1.Err("missing operation or data source"));
}
