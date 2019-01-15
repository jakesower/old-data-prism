"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xstream_1 = require("xstream");
const delay_1 = require("xstream/extra/delay");
const dom_1 = require("@cycle/dom");
const chained_collection_1 = require("../../lib/chained-collection");
const types_1 = require("../../types");
const utils_1 = require("../../lib/utils");
const maybe_1 = require("../../lib/monads/maybe");
const grid_1 = require("../components/grid");
const collector_1 = require("../components/collector");
const dom_utils_1 = require("../../lib/dom-utils");
const stream_utils_1 = require("../../lib/stream-utils");
const operations_menu_1 = require("../components/operations-menu");
;
const initState = {
    rootSource: maybe_1.Maybe.Nothing(),
    collectors: [],
    saveOpen: false,
    saveRemixOpen: false,
    showSaved: false,
    actionsOpen: false,
};
function main(cycleSources) {
    const { props: props$, DOM } = cycleSources;
    const { changeRoot$, saveSource$, toggleSave$, saveName$, export$, toggleActions$, toggleRemixSave$ } = intent(DOM);
    const activeSourceObj = state => state.rootSource.chain(rs => maybe_1.Maybe.fromValue(state.sources.find(s => s.fingerprint === rs)));
    const stateModifiers$ = xstream_1.default.merge(changeRoot$.map(source => state => (Object.assign({}, state, { rootSource: maybe_1.Maybe.fromValue(source) }))), toggleSave$.mapTo(state => (Object.assign({}, state, { saveOpen: !state.saveOpen }))), toggleRemixSave$.mapTo(state => (Object.assign({}, state, { saveRemixOpen: !state.saveOpen }))), toggleActions$.mapTo(state => (Object.assign({}, state, { actionsOpen: !state.actionsOpen }))), saveSource$.mapTo(state => (Object.assign({}, state, { showSaved: true, saveOpen: false }))), saveSource$.compose(delay_1.default(5000)).mapTo(state => (Object.assign({}, state, { showSaved: false }))));
    const localState$ = stateModifiers$.fold((state, mod) => mod(state), initState);
    const state$ = xstream_1.default.combine(props$, localState$).map(([a, b]) => utils_1.merge(a, b));
    const activeSource$ = state$.map(activeSourceObj).remember();
    const menu = operations_menu_1.default(cycleSources);
    const collectors$ = chained_collection_1.ChainedCollection({
        component: collector_1.default,
        sources: cycleSources,
        add$: menu.operation,
        root$: activeSource$,
        chainConnector: sink => sink.dataSource,
        removeConnector: sink => sink.remove$,
    });
    const collectorDom$ = chained_collection_1.pluck(collectors$, x => x.DOM);
    const collectorSources$ = chained_collection_1.pluck(collectors$, x => x.dataSource);
    const collectorValues$ = chained_collection_1.pluck(collectors$, x => x.operationValue); // TODO
    const recipe$ = xstream_1.default.combine(activeSource$, collectorValues$)
        .map(([activeSource, collectorValues]) => ({
        rootSource: activeSource.map(a => a.fingerprint).withDefault(null),
        operations: collectorValues
    }))
        .map(o => JSON.stringify(o))
        .startWith("{}");
    const gridSource$ = xstream_1.default.combine(activeSource$, collectorSources$)
        .map(([activeSource, collectorSources]) => {
        return collectorSources.reduce((last, s) => s.isErr() ? last : s.toMaybe(), activeSource);
    });
    const grid = grid_1.default({ DOM: DOM, props: gridSource$.map(source => ({ source })) });
    return {
        DOM: xstream_1.default.combine(state$, grid.DOM, collectorDom$, menu.DOM, recipe$).map(a => view(a[0], a[1], a[2], a[3], a[4])),
        source: xstream_1.default.combine(saveName$, collectorSources$)
            .compose(stream_utils_1.sampleWith(saveSource$))
            .map(([name, dataSources]) => ({ name, dataSource: utils_1.last(dataSources) }))
            .filter(x => x.dataSource && !x.dataSource.isErr())
            .map(o => (Object.assign({}, o, { dataSource: o.dataSource.recoverWith([]) })))
            .map(({ name, dataSource }) => types_1.makeDataSource({
            name,
            columns: dataSource.columns,
        })),
        csvExport: xstream_1.default.combine(gridSource$, saveName$)
            .compose(stream_utils_1.sampleWith(export$))
            .filter(([gridSource, _]) => !gridSource.isNothing())
            .map(([gridSource, saveName]) => {
            const gs = gridSource.withDefault(null);
            return types_1.makeDataSource({
                name: saveName,
                columns: gs.columns,
            });
        }),
        workingSource: gridSource$,
        value: state$
            .map(state => state.rootSource
            .map(rootSource => ({ collectors: state.collectors, rootSource }))
            .withDefault({})),
    };
}
exports.default = main;
function intent(DOM) {
    return {
        changeRoot$: DOM.select('select.root-source').events('change').map(dom_utils_1.targetValue),
        toggleSave$: DOM.select('.save-toggle').events('click'),
        toggleRemixSave$: DOM.select('.save-remix-toggle').events('click'),
        saveSource$: DOM.select('.save-source').events('click'),
        saveName$: DOM.select('.save-name').events('change').map(ev => ev.target.value).startWith(''),
        export$: DOM.select('.export-csv').events('click'),
        toggleActions$: DOM.select('.toggle-actions-button').events('click'),
    };
}
function view(state, gridDom, collectorDom, menuDom, recipe) {
    const emptyOption = dom_1.option({ attrs: { value: "", select: state.rootSource.isNothing() } });
    const sourceOptions = state.sources.map(s => dom_1.option({ attrs: { value: s.fingerprint, selected: state.rootSource.hasValue(s.fingerprint) } }, s.name));
    const opts = [emptyOption].concat(sourceOptions);
    return dom_1.div('.main-container', [
        dom_1.aside({}, [
            dom_1.div('.root-datasource', {}, [
                dom_1.h2({}, 'Root DataSource'),
                dom_1.select({ class: { "root-source": true } }, opts)
            ]),
            dom_1.div((state.rootSource.isNothing() ? '.remix-controls.disabled' : '.remix-controls'), {}, [
                dom_1.div({}, utils_1.flatten([
                    collectorDom,
                    menuDom,
                    dom_1.div('.save-as-source.toggle' + (state.saveOpen ? '.open.subsection' : ''), {}, [
                        dom_1.div('.save-toggle.action', {}, "Save Data"),
                        dom_1.div('.open', {}, [
                            dom_1.h3('Save As...'),
                            dom_1.input('.save-name', { attrs: { type: 'text', required: true } }),
                            dom_1.button('.export-csv', 'Save as CSV'),
                            dom_1.button('.save-source', 'Save as Source'),
                            dom_1.button('.save-toggle.button', 'Cancel'),
                        ]),
                    ]),
                    dom_1.div('.save-remix.toggle' + (state.saveRemixOpen ? '.open.subsection' : ''), {}, [
                        dom_1.div('.save-remix-toggle.action', {}, "Save Remix"),
                        dom_1.div('.open', {}, [
                            dom_1.h3('JSON'),
                            dom_1.textarea({ props: { spellcheck: false } }, recipe)
                        ]),
                    ]),
                ]))
            ])
        ]),
        dom_1.main({}, [
            gridDom
        ])
    ]);
}
