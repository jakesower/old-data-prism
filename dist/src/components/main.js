"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@cycle/dom");
const xstream_1 = require("xstream");
const dropRepeats_1 = require("xstream/extra/dropRepeats");
const sources_1 = require("./pages/sources");
const remix_1 = require("./pages/remix");
const chart_1 = require("./pages/chart");
const analyze_1 = require("./pages/analyze");
const share_1 = require("./pages/share");
const learn_1 = require("./pages/learn");
const stream_utils_1 = require("../lib/stream-utils");
const maybe_1 = require("../lib/monads/maybe");
const isolate_1 = require("@cycle/isolate");
const data_functions_1 = require("../lib/data-functions");
const utils_1 = require("../lib/utils");
const initState = {
    page: "sources",
    help: false,
    helpIndex: 0,
    helpMessages: ['Click the "Learn" tab and select a tutorial to begin.'],
    sources: [],
};
const pages = ["sources", "remix", "chart", "analyze", "share", "learn"];
function main(cycleSources) {
    const { changeTab$, helpToggle$, adjustTutorialPage$ } = intent(cycleSources);
    const addSourceProxy$ = xstream_1.default.create();
    const setTutorialProxy$ = xstream_1.default.create();
    // TODO: Handle multiple formats
    const addHttpSource$ = cycleSources.HTTP.select('imported-source').flatten()
        .map(response => {
        const uriParts = response.req.url.split('/');
        return {
            body: response.text,
            name: uriParts[uriParts.length - 1].split('.')[0],
        };
    });
    const urlPage$ = cycleSources.history
        .map(h => utils_1.last(h.pathname.split('/')))
        .filter(p => pages.includes(p))
        .compose(dropRepeats_1.default());
    const stateModifiers$ = [
        xstream_1.default.merge(changeTab$, urlPage$)
            .map(page => prev => (Object.assign({}, prev, { page }))),
        addSourceProxy$
            .map(source => prev => (Object.assign({}, prev, { sources: prev.sources.concat(source) }))),
        helpToggle$.mapTo(prev => (Object.assign({}, prev, { help: !prev.help }))),
        setTutorialProxy$.map(tutorial => prev => (Object.assign({}, prev, { helpIndex: 0, helpMessages: tutorial, help: true }))),
        adjustTutorialPage$.map(adj => prev => (Object.assign({}, prev, { helpIndex: utils_1.clamp(0, prev.helpMessages.length - 1, prev.helpIndex + adj) })))
    ];
    const state$ = xstream_1.default.merge(...stateModifiers$)
        .fold((state, fn) => fn(state), initState);
    const componentSources = page => (Object.assign({}, cycleSources, { props: state$.filter(state => state.page === page).startWith(initState) }));
    const sources = isolate_1.default(sources_1.default, 'sources')(Object.assign({}, cycleSources, { props: state$ }));
    const remix = isolate_1.default(remix_1.default, 'remix')(componentSources('remix'));
    const remixSource = remix.workingSource.startWith(maybe_1.Maybe.Nothing());
    const chart = isolate_1.default(chart_1.default, 'chart')(Object.assign({}, componentSources('chart'), { remixSource }));
    const analyze = isolate_1.default(analyze_1.default, 'analyze')(Object.assign({}, componentSources('analyze'), { remixSource }));
    const share = isolate_1.default(share_1.default, 'share')(Object.assign({}, componentSources('share'), { remixSource, remixValue: remix.value.startWith(maybe_1.Maybe.Nothing()), chartValue: xstream_1.default.of(maybe_1.Maybe.Nothing()), analysisValue: xstream_1.default.of(maybe_1.Maybe.Nothing()) }));
    const learn = isolate_1.default(learn_1.default, 'learn')(Object.assign({}, cycleSources));
    addSourceProxy$.imitate(xstream_1.default.merge(remix.source, data_functions_1.csvToDataSource(sources.csvLoader), data_functions_1.csvToDataSource(addHttpSource$)));
    setTutorialProxy$.imitate(learn.tutorial);
    const pageDoms$ = stream_utils_1.objectStream({
        sources: sources.DOM,
        remix: remix.DOM,
        chart: chart.DOM,
        analyze: analyze.DOM,
        share: share.DOM,
        learn: learn.DOM,
    });
    const view$ = xstream_1.default.combine(state$, pageDoms$).map(([s, pd]) => view(s, pd));
    const history$ = state$
        .map(s => s.page)
        .compose(dropRepeats_1.default())
        .map(page => '/' + page);
    return {
        DOM: view$,
        csvExport: remix.csvExport,
        HTTP: sources.HTTP,
        history: history$,
    };
}
function intent({ DOM }) {
    return {
        changeTab$: DOM.select("nav a.tab").events("click").map(ev => {
            ev.preventDefault();
            return ev.target.dataset.tab;
        }),
        helpToggle$: DOM.select('nav .help-toggle').events('click'),
        adjustTutorialPage$: xstream_1.default.merge(DOM.select('.next-tutorial').events('click').mapTo(1), DOM.select('.prev-tutorial').events('click').mapTo(-1)),
    };
}
function view(state, page) {
    const { help, helpMessages, helpIndex } = state;
    const tab = n => dom_1.a({
        class: { selected: state.page === n, tab: true }, dataset: { tab: n.toLowerCase() },
    }, n);
    const pageClass = state.page.toLowerCase();
    return dom_1.div({
        class: { "body-container": true, [pageClass]: true, 'help-active': help }
    }, [
        dom_1.nav([
            dom_1.h1("Data Prism"),
            tab("sources"),
            tab("remix"),
            tab("chart"),
            tab("analyze"),
            tab("share"),
            tab("learn"),
            dom_1.i('.help-toggle', ''),
        ]),
        dom_1.div('.help-bar', [
            dom_1.div('.help-text', [
                helpMessages[helpIndex],
                helpIndex !== 0 ? dom_1.button('.prev-tutorial', 'Prev') : null,
                helpIndex !== (helpMessages.length - 1) ? dom_1.button('.next-tutorial', 'Next') : null,
            ]),
        ]),
        page[state.page]
    ]);
}
exports.default = main;
