"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xstream_1 = require("xstream");
const dom_1 = require("@cycle/dom");
const utils_1 = require("../../lib/utils");
const BarChart = require("../charts/bar");
const maybe_1 = require("../../lib/monads/maybe");
const slot_collector_1 = require("../collectors/slot-collector");
const stream_utils_1 = require("../../lib/stream-utils");
const chartDefs = {
    Bar: BarChart,
};
const initState = {
    rootSource: maybe_1.Maybe.Nothing(),
    chartType: maybe_1.Maybe.Nothing(),
    chartInputs: {},
};
function ChartComponent(cycleSources) {
    const { props: props$, DOM, dimensions: dimensions$, remixSource: remixSource$ } = cycleSources;
    const { changeRoot$, chartType$, apply$ } = intent(DOM);
    const applyProxy$ = xstream_1.default.create();
    const modifier$ = xstream_1.default.merge(changeRoot$.map(root => state => (Object.assign({}, state, { rootSource: maybe_1.Maybe.fromValue(root) }))), chartType$.map(chartType => state => (Object.assign({}, state, { chartType: maybe_1.Maybe.fromValue(chartType) }))), applyProxy$.map(chartInputs => state => (Object.assign({}, state, { chartInputs }))));
    const localState$ = modifier$.fold((state, mod) => mod(state), initState);
    const state$ = xstream_1.default.combine(props$, localState$).map(([props, ls]) => {
        return Object.assign({}, ls, props);
    });
    const activeSource$ = state$
        .map(state => state.rootSource.hasValue('remix') ?
        remixSource$ :
        xstream_1.default.of(state.rootSource.chain(rs => maybe_1.Maybe.fromValue(state.sources.find(s => s.fingerprint === rs)))))
        .flatten();
    const collector$ = collector(state$, activeSource$, cycleSources);
    const collectorVdom$ = collector$.map(c => c.DOM).flatten();
    const collectorValue$ = collector$.map(c => c.value).flatten();
    applyProxy$.imitate(collectorValue$.compose(stream_utils_1.sampleWith(apply$)));
    const chartVdom$ = xstream_1.default.combine(state$, applyProxy$.startWith({}), dimensions$, activeSource$)
        .map(([state, cValue, dimensions, mActiveSource]) => utils_1.go(function* () {
        const dataSource = yield mActiveSource;
        const chartType = yield state.chartType;
        const chartDef = chartDefs[chartType];
        return chartDef.fn(dataSource, cValue, dimensions);
    }).withDefault([]));
    const dom$ = xstream_1.default.combine(state$, remixSource$, collectorVdom$, chartVdom$)
        .map(args => view(args[0], args[1], args[2], args[3]))
        .startWith(null);
    return {
        DOM: dom$,
    };
}
exports.default = ChartComponent;
function intent(DOM) {
    const tv = ev => ev.target.value;
    return {
        chartType$: DOM.select('.chart-type').events('change').map(tv).startWith('').map(v => v ? v : null),
        changeRoot$: DOM.select('select.root-source').events('change').map(tv),
        apply$: DOM.select('.apply').events('click'),
    };
}
function view(state, remixSource, collectorVdom, chartVdom) {
    const remixOption = remixSource.map(_ => [dom_1.option({ attrs: { value: "remix", selected: state.rootSource.hasValue("remix") } }, "(remix source)")]).withDefault([]);
    const sourceOptions = [dom_1.option({ attrs: { value: "", selected: state.rootSource.isNothing() } })].concat(remixOption.concat(state.sources.map(s => dom_1.option({ attrs: { value: s.fingerprint, selected: state.rootSource.hasValue(s.fingerprint) } }, s.name))));
    const chartOptions = ['', ...Object.keys(chartDefs).sort()].map(name => dom_1.option({ attrs: { value: name, selected: state.chartType.withDefault('') === name } }, name));
    return dom_1.div('.main-container', [
        dom_1.aside([
            dom_1.div('.root-datasource', {}, [
                dom_1.h2({}, 'Root DataSource'),
                dom_1.select('.root-source', sourceOptions)
            ]),
            state.rootSource.map(_ => dom_1.div('.collector.editing', utils_1.flatten([
                dom_1.div('.slot', utils_1.flatten([
                    dom_1.h3({}, 'Chart Type'),
                    dom_1.select('.chart-type', {}, chartOptions),
                ])),
                [collectorVdom],
                state.chartType.map(_ => dom_1.div([
                    dom_1.button('.apply', {}, 'Apply'),
                ])).withDefault(null)
            ]))).withDefault(null),
        ]),
        dom_1.main(chartVdom),
    ]);
}
function collector(state$, activeSource$, cycleSources) {
    const emptyCollector = { DOM: xstream_1.default.of([]), value: xstream_1.default.of({}) };
    return xstream_1.default.combine(state$, activeSource$).map(([state, activeSource]) => {
        return activeSource.map(dataSource => state.chartType.map(chartType => {
            const { slots } = chartDefs[chartType];
            return slot_collector_1.SlotCollector({ slots }, dataSource, state.chartInputs)(cycleSources);
        }).withDefault(emptyCollector)).withDefault(emptyCollector);
    }).startWith(emptyCollector);
}
