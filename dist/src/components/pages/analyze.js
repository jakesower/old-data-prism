"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xstream_1 = require("xstream");
const dom_1 = require("@cycle/dom");
const utils_1 = require("../../lib/utils");
const maybe_1 = require("../../lib/monads/maybe");
const dom_utils_1 = require("../../lib/dom-utils");
const data_types_1 = require("../../lib/data-types");
const analyses_1 = require("../../analyses");
const scatter_1 = require("../charts/scatter");
const shapes_1 = require("../charts/shapes");
;
const initState = {
    rootSource: maybe_1.Maybe.Nothing(),
    activePair: maybe_1.Maybe.Nothing(),
};
function main(cycleSources) {
    const { props: props$, DOM, remixSource: remixSource$ } = cycleSources;
    const { changeRoot$, changeActivePair$ } = intent(DOM);
    const stateModifiers$ = xstream_1.default.merge(changeRoot$.map(source => state => (Object.assign({}, state, { rootSource: maybe_1.Maybe.fromValue(source) }))), changeActivePair$.map(coords => state => (Object.assign({}, state, { activePair: maybe_1.Maybe.of(coords) }))));
    const localState$ = stateModifiers$.fold((state, mod) => mod(state), initState);
    const state$ = xstream_1.default.combine(props$, localState$).map(([a, b]) => utils_1.merge(a, b));
    const activeSource$ = state$
        .map(state => state.rootSource.hasValue('remix') ?
        remixSource$ :
        xstream_1.default.of(state.rootSource.chain(rs => maybe_1.Maybe.fromValue(state.sources.find(s => s.fingerprint === rs)))))
        .flatten();
    const grid$ = activeSource$
        .map(mActiveSource => mActiveSource.chain(activeSource => {
        const numerics = activeSource.columns.filter(c => c.hasType(data_types_1.default.Number));
        const numNumerics = numerics.length;
        if (numNumerics < 2) {
            return maybe_1.Maybe.Nothing();
        }
        const numericVals = numerics.map(n => n.values.map(data_types_1.default.Number.cast));
        return maybe_1.Maybe.of([
            numerics,
            utils_1.reflectUTMatrix(utils_1.upperTriangularMatrixMap(numericVals, numericVals, analyses_1.LinearRegression.fn, null, false))
        ]);
    }))
        .startWith(maybe_1.Maybe.Nothing());
    return {
        DOM: xstream_1.default.combine(state$, grid$, remixSource$).map(a => view(a[0], a[1], a[2])),
    };
}
exports.default = main;
function intent(DOM) {
    return {
        changeRoot$: DOM.select('select.root-source').events('change').map(dom_utils_1.targetValue).map(v => v || null),
        changeActivePair$: DOM.select('.correlation-grid, td')
            .events('click')
            .map(ev => [parseFloat(ev.target.dataset.row), parseFloat(ev.target.dataset.col)]),
    };
}
function view(state, grid, remixSource) {
    const mPts = extractPoints(state, grid);
    const remixOption = remixSource.map(_ => [dom_1.option({ attrs: { value: "remix", selected: state.rootSource.hasValue("remix") } }, "(remix source)")]).withDefault([]);
    const sourceOptions = [dom_1.option({ attrs: { value: "", selected: state.rootSource.isNothing() } })].concat(remixOption.concat(state.sources.map(s => dom_1.option({ attrs: { value: s.fingerprint, selected: state.rootSource.hasValue(s.fingerprint) } }, s.name))));
    return dom_1.div('.main-container', [
        dom_1.aside({}, [
            dom_1.div('.root-datasource', {}, [
                dom_1.h2({}, 'Root DataSource'),
                dom_1.select('.root-source', sourceOptions)
            ]),
        ]),
        dom_1.main({}, [
            grid.map(numberGrid).withDefault(null),
            mPts.map(pts => dom_1.div('.chart-container', { attrs: { style: "height: 500px; width: 500px;" } }, scatter_1.plot(pts, { height: 500, width: 500 }))).withDefault(null),
        ]),
    ]);
}
function numberGrid(colPair) {
    const [cols, matrix] = colPair;
    return dom_1.table('.correlation-grid', utils_1.flatten([
        dom_1.tr(utils_1.flatten([dom_1.th(''), cols.map(c => dom_1.th(c.name))])),
        matrix.map((row, i) => dom_1.tr(utils_1.flatten([
            dom_1.th(cols[i].name),
            row.map((cell, j) => (dom_1.td('.numeric', { dataset: { row: i.toString(), col: j.toString() } }, cell ? utils_1.round(cell, -2) : "—")))
        ])))
    ]));
}
function extractPoints(state, mGrid) {
    return utils_1.go(function* () {
        const grid = yield mGrid;
        const activePair = yield state.activePair;
        const cols = grid[0];
        const fst = yield maybe_1.Maybe.fromValue(cols[activePair[0]]);
        const snd = yield maybe_1.Maybe.fromValue(cols[activePair[1]]);
        return utils_1.zipWith((x, y) => shapes_1.Point(parseFloat(x), parseFloat(y)), fst.values, snd.values);
    });
}
