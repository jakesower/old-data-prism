"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xstream_1 = require("xstream");
const dom_1 = require("@cycle/dom");
const grid_1 = require("../components/grid");
const dom_utils_1 = require("../../lib/dom-utils");
const utils_1 = require("../../lib/utils");
const maybe_1 = require("../../lib/monads/maybe");
const noNum = maybe_1.Maybe.Nothing();
;
const initState = { activeSource: noNum };
function main(cycleSources) {
    const { props: props$, DOM } = cycleSources;
    const { addSource$, newSource$, changeSource$, newHttpSource$ } = intent({ DOM });
    const stateModifiers$ = xstream_1.default.merge(newSource$.mapTo(state => (Object.assign({}, state, { activeSource: noNum }))), changeSource$.map((id) => state => (Object.assign({}, state, { activeSource: maybe_1.Maybe.of(id) }))), props$.map(ps => ps.sources.length)
        .filter(l => l > 0)
        .map(l => state => (Object.assign({}, state, { activeSource: maybe_1.Maybe.of(l - 1) }))), props$.map(ps => ps.sources.length)
        .filter(l => l === 0)
        .map(l => state => (Object.assign({}, state, { activeSource: noNum }))));
    const localState$ = stateModifiers$.fold((state, mod) => mod(state), initState);
    const state$ = xstream_1.default.combine(props$, localState$).map(args => utils_1.merge(...args));
    const activeSourceObj = state => ({ source: state.activeSource.map(rs => state.sources[rs]) });
    const grid = grid_1.default({ DOM: DOM, props: state$.map(activeSourceObj) });
    const gridDom$ = grid.DOM;
    return {
        DOM: xstream_1.default.combine(state$, gridDom$).map(c => view(c[0], c[1])).startWith(dom_1.div('hi')),
        csvLoader: addSource$,
        HTTP: newHttpSource$.map(url => ({ url, category: 'imported-source' })),
    };
}
exports.default = main;
function intent({ DOM }) {
    const fileEvent$ = DOM.select('#data-file').events('change')
        .map(ev => ev.target);
    return {
        addSource$: dom_utils_1.extractFile(fileEvent$),
        newSource$: DOM.select('.new-source').events('click'),
        changeSource$: dom_utils_1.scopedEvent(DOM.select('.source-list .source'), 'click')
            .map(t => parseFloat(t.dataset.sourceId)),
        newHttpSource$: DOM.select('li.http-data').events('click')
            .map(ev => ev.target.dataset.url),
    };
}
function view(state, gridDom) {
    const { activeSource, sources } = state;
    return dom_1.div('.main-container', [
        dom_1.aside('.source', [
            dom_1.div({ class: { "new-source": true, active: activeSource.isNothing() } }, "New DataSource"),
            sourceList(sources, activeSource)
        ]),
        dom_1.main({ class: { source: true } }, activeSource.map(active => activeSourceVdom(sources[active], gridDom))
            .withDefault(newSourceVdom()))
    ]);
}
function sourceList(sources, activeSource) {
    return dom_1.div('.source-list', sources.map((source, idx) => dom_1.div({ class: { source: true, active: activeSource.hasValue(idx) }, dataset: { sourceId: idx.toString() } }, dom_1.div([
        dom_1.h2(source.name.length === 0 ? '<no name>' : source.name),
        dom_1.div({ class: { "source-stat": true } }, `Records: ${source.numRecords}`)
    ]))));
}
function activeSourceVdom(source, grid) {
    return dom_1.div({}, [
        dom_1.h1({}, source.name),
        grid
    ]);
}
function newSourceVdom() {
    return dom_1.div({}, [
        dom_1.h1({}, 'Import New DataSource'),
        dom_1.div({}, [
            dom_1.div('.colgroup', [
                dom_1.div('upload-type', [
                    dom_1.h2({}, 'Import CSV'),
                    dom_1.input({
                        attrs: { type: 'file', id: 'data-file' },
                    }, [])
                ]),
                dom_1.div('upload-type', [
                    dom_1.h2('.sample-data', 'Import Sample Data'),
                    dom_1.ul([
                        dom_1.li('.http-data', { dataset: { url: '/data/2012-2013-agua-canyon-temp.csv' } }, '2012-2013 Agua Canyon Temperatures'),
                        dom_1.li('.http-data', { dataset: { url: '/data/DC_Bike_Accidents_2013.csv' } }, '2013 DC Bike Accidents'),
                        dom_1.li('.http-data', { dataset: { url: '/data/2018-conmebol.csv' } }, '2018 CONMEBOL Results'),
                        dom_1.li('.http-data', { dataset: { url: '/data/artists.csv' } }, 'Artists'),
                        dom_1.li('.http-data', { dataset: { url: '/data/average-northpole-temps.csv' } }, 'Average North Pole Temperatures'),
                        dom_1.li('.http-data', { dataset: { url: '/data/elevations.csv' } }, 'Elevations of Capitals'),
                        dom_1.li('.http-data', { dataset: { url: '/data/FL_insurance_sample.csv' } }, 'Florida Insurance Data'),
                        dom_1.li('.http-data', { dataset: { url: '/data/Populations.csv' } }, 'Population Data (Small Sample)'),
                        dom_1.li('.http-data', { dataset: { url: '/data/Sacramentorealestatetransactions.csv' } }, 'Sacramento Real Estate Transations'),
                        dom_1.li('.http-data', { dataset: { url: '/data/Seattle-Wages-Gender.csv' } }, 'Seattle Wages by Gender'),
                    ])
                ])
            ])
        ])
    ]);
}
