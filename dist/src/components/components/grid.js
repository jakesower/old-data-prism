"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xstream_1 = require("xstream");
const dom_1 = require("@cycle/dom");
const maybe_1 = require("../../lib/monads/maybe");
const data_types_1 = require("../../lib/data-types");
const utils_1 = require("../../lib/utils");
const perPage = 25;
const initState = {
    page: 1,
    sorting: { col: maybe_1.Maybe.Nothing(), dir: "asc" },
};
function main(cycleSources) {
    const props$ = cycleSources.props.startWith({ source: maybe_1.Maybe.Nothing() });
    const { firstPage$, prevPage$, nextPage$, lastPage$, columnSort$ } = intent({ DOM: cycleSources.DOM });
    const pageChanger = (action$, pageFn) => {
        return xstream_1.default.combine(action$, props$)
            .map(([_, props]) => state => (Object.assign({}, state, { page: utils_1.clamp(1, props.source.map(numPages).withDefault(1), pageFn(state.page)) })));
    };
    const stateModifiers$ = xstream_1.default.merge(pageChanger(firstPage$, _ => 1), pageChanger(prevPage$, p => p - 1), pageChanger(nextPage$, p => p + 1), pageChanger(lastPage$, _ => Infinity), columnSort$.map(nextCol => state => {
        const { col, dir } = state.sorting;
        const nextDir = (col.hasValue(nextCol) && dir === 'asc') ? 'desc' : 'asc';
        return Object.assign({}, state, { sorting: { col: maybe_1.Maybe.of(nextCol), dir: nextDir } });
    }));
    const localState$ = stateModifiers$.fold((state, fn) => fn(state), initState);
    const state$ = xstream_1.default.combine(props$, localState$).map(([a, b]) => utils_1.merge(a, b));
    return {
        DOM: state$.map(view),
    };
}
exports.default = main;
function intent(cycleSources) {
    const { DOM } = cycleSources;
    const getColumn = ev => ev.path.find(e => e.dataset && e.dataset.column != undefined).dataset.column;
    return {
        firstPage$: DOM.select(".first-page").events("click"),
        prevPage$: DOM.select(".prev-page").events("click"),
        nextPage$: DOM.select(".next-page").events("click"),
        lastPage$: DOM.select(".last-page").events("click"),
        columnSort$: DOM.select("th").events("click").map(getColumn),
    };
}
// TODO: sort by type (numbers and not just strings)
const view = (state) => {
    const source = state.source.withDefault(null);
    if (source === null || source.empty())
        return null;
    const { headers } = source;
    const { sorting } = state;
    const records = sorting.col.map(sortColNum => {
        const sortCol = source.columns[sortColNum] || source.columns[0];
        const numericSort = sortCol.hasType(data_types_1.default.Number);
        const getCell = (rec) => rec[sortColNum];
        const sorter = sorting.dir === "asc" ? utils_1.ascend : utils_1.descend;
        const sortPipe = numericSort ?
            sorter(utils_1.pipe([getCell, v => data_types_1.default.Number.cast(v)])) :
            sorter(getCell);
        return utils_1.sortBy(sortPipe, source.records);
    }).withDefault(source.records);
    if (records.length === 0)
        return dom_1.div({}, "");
    const toCells = r => r.map(datum => dom_1.td({}, datum));
    const toRows = rs => rs.map(record => dom_1.tr({}, toCells(record)));
    const numPages = Math.ceil(records.length / perPage);
    const page = utils_1.clamp(1, numPages, state.page);
    const recordsOnPage = records.slice((page - 1) * perPage, page * perPage);
    const gridHeader = dom_1.tr({}, headers.map((c, idx) => {
        const activeSort = sorting.col.hasValue(idx) ? sorting.dir : null;
        return dom_1.th({ class: {
                asc: activeSort === "asc",
                desc: activeSort === "desc",
                sortable: true
            },
            dataset: { column: idx.toString() }
        }, [dom_1.span({ attrs: { class: "header" } }, c),
            dom_1.span({ attrs: { class: "desc arrow" } }, "▼"),
            dom_1.span({ attrs: { class: "asc arrow" } }, "▲"),
        ]);
    }));
    return dom_1.div({}, [
        dom_1.div({ class: { "page-controls": true } }, [
            dom_1.button({ class: { "first-page": true, disabled: page === 1 } }, "<<"),
            dom_1.button({ class: { "prev-page": true, disabled: page === 1 } }, "<"),
            dom_1.strong({ class: { "button": true } }, `${page} / ${numPages}`),
            dom_1.button({ class: { "next-page": true, disabled: page === numPages } }, ">"),
            dom_1.button({ class: { "last-page": true, disabled: page === numPages } }, ">>"),
        ]),
        dom_1.table({}, [gridHeader].concat(toRows(recordsOnPage))),
    ]);
};
function numPages(source) {
    return (source === null) ? 0 : Math.ceil(source.numRecords / perPage);
}
// // Technically a side effect; should possibly be moved. Where?
// function exportCsv(source) {
//   stringify(R.prepend(source.headers, source.records), (err, output) => {
//     const blob = new Blob([output], {type: "text/csv"});
//     FileSaver.saveAs(blob, "data-prism.csv");
//   });
// }
// module.exports = { Action, init, update, view };
