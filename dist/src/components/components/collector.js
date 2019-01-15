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
    operation: maybe_1.Maybe.Nothing(),
    editing: true,
    savedValue: maybe_1.Maybe.Nothing(),
    inputs: {},
    showErrors: false,
    helpVisible: false,
};
const iconTags = [
    'deriver',
    'filter',
    'grouping',
    'aggregator'
];
function main(cycleSources) {
    const { DOM, chain$, chainInit$ } = cycleSources;
    const collectorValueApplyProxy$ = xstream_1.default.create();
    const collectorValueSaveProxy$ = xstream_1.default.create();
    // STATE MODIFIERS
    //
    const { save$, cancel$, edit$, apply$, removePress$, toggleHelp$ } = intent(DOM);
    const stateModifiers$ = xstream_1.default.merge(chainInit$.map(ci => state => (Object.assign({}, state, { operation: maybe_1.Maybe.fromValue(ci) }))), edit$.mapTo(state => (Object.assign({}, state, { editing: true }))), cancel$
        .filter(_ => state => !state.savedValue.isNothing())
        .mapTo(state => (Object.assign({}, state, { editing: false, inputs: state.savedValue.withDefault({}) }))), collectorValueApplyProxy$
        .map(inputs => state => (Object.assign({}, state, { inputs }))), collectorValueSaveProxy$
        .map(inputs => state => (Object.assign({}, state, { inputs, editing: false, savedValue: maybe_1.Maybe.of(inputs) }))), toggleHelp$.mapTo(state => (Object.assign({}, state, { helpVisible: !state.helpVisible }))));
    const localState$ = stateModifiers$.fold((state, mod) => mod(state), initState).debug();
    // SECONDARY STREAMS
    //
    const collector$ = collector(localState$, DOM, chain$, cycleSources.props);
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
    const dataSource$ = state$
        .compose(stream_utils_1.sampleWith(xstream_1.default.merge(save$, apply$)))
        .map(nextDataSource)
        .startWith(either_1.Err("starting up"));
    const value$ = state$
        .compose(stream_utils_1.sampleWith(xstream_1.default.merge(save$, apply$)));
    // .map(Maybe.of)
    // .startWith(Maybe.Nothing());
    const dom$ = xstream_1.default.combine(state$, collectorVdom$)
        .map(args => view(args[0], args[1]));
    const cancelRemove$ = cancel$
        .compose(sampleCombine_1.default(localState$))
        .filter(([_, ls]) => ls.savedValue.isNothing());
    return {
        DOM: dom$,
        value: value$,
        operationValue: state$.map(state => utils_1.go(function* () {
            const operation = yield state.operation;
            return { operation, inputs: state.inputs };
        }).withDefault({})),
        dataSource: dataSource$,
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
function view(state, collectorMarkup) {
    if (state.editing) {
        return viewEdit(state, collectorMarkup);
    }
    const def = state.operation.map(o => operations_1.default[o]).withDefault(null);
    const dataSource = state.dataSource.withDefault(null);
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
function viewEdit(state, collectorMarkup) {
    const operation = state.operation.map(o => operations_1.default[o]).withDefault({
        name: "",
        help: "",
    });
    return dom_1.div('.collector.editing', {}, utils_1.flatten([
        dom_1.div('.operation-heading', [
            dom_1.i('.fa.fa-question-circle.help-toggle', " "),
            dom_1.h2('.operation-title', operation.name),
            dom_1.div(state.helpVisible ? '.active.help-container' : '.help-container', dom_1.div('.help', { props: { innerHTML: help[state.operation.withDefault('')] } })),
        ]),
        collectorMarkup,
        dom_1.div('.collector-controls', {}, [
            dom_1.button('.save', {}, 'Save'),
            dom_1.button('.apply', {}, 'Apply'),
            dom_1.button('.cancel', {}, 'Cancel'),
        ])
    ]));
}
function collector(localState$, DOM, dataSource$, props) {
    const emptyCollector = { DOM: xstream_1.default.of([]), value: xstream_1.default.of({}) };
    const noDataSourceCollector = { DOM: xstream_1.default.of(dom_1.div('hi')), value: xstream_1.default.of({}) };
    return xstream_1.default.combine(localState$, dataSource$)
        .map(([localState, mDataSource]) => mDataSource.map(dataSource => localState.operation
        .map(op => {
        const opDef = operations_1.default[op];
        return opDef.collector(opDef, dataSource, localState.inputs)({ DOM, props });
    })
        .withDefault(emptyCollector))
        .withDefault(noDataSourceCollector))
        .startWith(noDataSourceCollector);
}
function nextDataSource(state) {
    const mData = utils_1.go(function* () {
        const op = yield state.operation;
        const opDef = operations_1.default[op];
        const src = yield state.dataSource;
        return { opDef, src };
    });
    return mData
        .map(({ opDef, src }) => opDef.fn(src, state.inputs))
        .withDefault(either_1.Err("missing operation or data source"));
}
