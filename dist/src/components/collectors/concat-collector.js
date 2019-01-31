"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@cycle/dom");
const xstream_1 = require("xstream");
const isolate_1 = require("@cycle/isolate");
const maybe_1 = require("../../lib/monads/maybe");
const utils_1 = require("../../lib/utils");
// A higher order component--takes in slots and returns a component
function ConcatCollector(_opDef, dataSource, initialInputs) {
    function main(cycleSources) {
        const { DOM, props: props$ } = cycleSources;
        const initialState = {
            foreignSourceId: maybe_1.Maybe.fromValue(initialInputs.foreignSourceId),
        };
        const { setForeignSource$ } = intent(DOM, initialInputs);
        const stateModifiers$ = xstream_1.default.merge(setForeignSource$.map(x => state => (Object.assign({}, state, { foreignSourceId: maybe_1.Maybe.fromValue(x) }))));
        const state$ = stateModifiers$.fold((state, mod) => mod(state), initialState);
        const xwalkComponent$ = xstream_1.default.combine(props$, state$)
            .map(([props, state]) => {
            const colSources = { state, props, DOM: cycleSources.DOM };
            return getForeignSource(props.sources, state.foreignSourceId)
                .map(foreignSource => {
                const columnComponents = dataSource.columns.map((col, idx) => {
                    const sameName = col => maybe_1.Maybe.fromValue(foreignSource.columns.find(fc => col.name === fc.name));
                    const init = (initialInputs.xwalk || [])[idx] || {
                        keep: true,
                        foreignColumn: sameName(col).map(c => c.name).withDefault(""),
                    };
                    return isolate_1.default(columnComponent(col, foreignSource, init), idx)(colSources);
                });
                const xwalkValue = xstream_1.default.combine(...columnComponents.map(sc => sc.value));
                const xwalkDom = xstream_1.default.combine(...columnComponents.map(sc => sc.DOM))
                    .map(vals => [...vals]);
                return { DOM: xwalkDom, value: xwalkValue };
            })
                .withDefault({ DOM: xstream_1.default.of(null), value: xstream_1.default.of({}) });
        })
            .startWith({ DOM: xstream_1.default.of(null), value: xstream_1.default.of({}) });
        const xwalkDom$ = xwalkComponent$.map(c => c.DOM).flatten();
        const xwalkValues$ = xwalkComponent$.map(c => c.value).flatten();
        const dom$ = xstream_1.default.combine(state$, props$, xwalkDom$)
            .map(([state, props, xwalkDom]) => view(state, props.sources, xwalkDom));
        const value$ = xstream_1.default.combine(state$, props$, xwalkValues$)
            .map(([state, props, xwalk]) => utils_1.go(function* () {
            const foreignSourceId = yield state.foreignSourceId;
            const foreignSource = yield getForeignSource(props.sources, state.foreignSourceId);
            return { foreignSourceId, foreignSource, xwalk };
        })
            .withDefault({}))
            .startWith({});
        return {
            DOM: dom$,
            value: value$,
        };
    }
    function view(state, sources, xwalkDom) {
        const emptyOption = dom_1.option({ attrs: { value: '' } }, '');
        const withEmpty = opts => [emptyOption].concat(opts);
        return dom_1.div('.join-collector', [
            dom_1.div('.slot', [
                dom_1.h3('Foreign Source'),
                dom_1.select('.foreign-source', withEmpty(sources.map(source => dom_1.option({ attrs: { value: source.fingerprint, selected: (state.foreignSourceId.hasValue(source.fingerprint)) } }, source.name)))),
            ]),
            state.foreignSourceId.map(_ => dom_1.div('.slot', [
                dom_1.h3('Crosswalk'),
                dom_1.table('.column-collector', utils_1.flatten([
                    dom_1.tr([dom_1.th('Keep'), dom_1.th('Local Column'), dom_1.th('Foreign Column')]),
                    xwalkDom,
                ]))
            ])).withDefault(null),
        ]);
    }
    function columnComponent(column, foreignSource, init) {
        return function ({ DOM }) {
            const keep$ = DOM.select('.keep').events('click').map(ev => ev.target.checked).startWith(init.keep || true);
            const foreignColumn$ = DOM
                .select('.foreign-column')
                .events('change')
                .map(ev => ev.target.value)
                .startWith(init.foreignColumn || foreignSource.columns[0].name);
            const dom$ = xstream_1.default.combine(keep$, foreignColumn$).map(([keep, foreignColumn]) => {
                const foreignColumnOptions = foreignSource.columns.map(col => dom_1.option({ attrs: { value: col.name, selected: col.name === foreignColumn } }, col.name));
                return dom_1.tr('.column-row', [
                    dom_1.td(dom_1.input('.keep', {
                        attrs: { type: 'checkbox' },
                        props: { checked: keep },
                    })),
                    dom_1.td(column.name),
                    dom_1.td(dom_1.select('.foreign-column', {
                        attrs: { type: 'text', required: true },
                        props: { value: name }
                    }, foreignColumnOptions)),
                ]);
            });
            const value$ = xstream_1.default.combine(keep$, foreignColumn$).map(([keep, foreignColumn]) => ({ keep, foreignColumn }));
            return { DOM: dom$, value: value$ };
        };
    }
    function intent(DOM, init) {
        const { foreignSourceId } = init;
        return {
            setForeignSource$: DOM.select('.foreign-source').events('change').map(ev => ev.target.value).startWith(foreignSourceId),
        };
    }
    return main;
}
exports.ConcatCollector = ConcatCollector;
function getForeignSource(sources, mId) {
    return mId.chain(id => maybe_1.Maybe.fromValue(sources.find(s => s.fingerprint === id)));
}
