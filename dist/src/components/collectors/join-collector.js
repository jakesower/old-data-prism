"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@cycle/dom");
const xstream_1 = require("xstream");
const maybe_1 = require("../../lib/monads/maybe");
const utils_1 = require("../../lib/utils");
// A higher order component--takes in slots and returns a component
function JoinCollector(_opDef, dataSource, initialInputs) {
    function main(cycleSources) {
        const { DOM, props: props$ } = cycleSources;
        const initialState = {
            foreignSourceId: maybe_1.Maybe.fromValue(initialInputs.foreignSourceId),
            localKey: maybe_1.Maybe.fromValue(initialInputs.localKey),
            foreignKey: maybe_1.Maybe.fromValue(initialInputs.foreignKey),
            joinMethod: maybe_1.Maybe.fromValue(initialInputs.joinMethod),
        };
        const { setForeignSource$, setLocalKey$, setForeignKey$, setJoinMethod$ } = intent(DOM, initialInputs);
        const stateModifiers$ = xstream_1.default.merge(setForeignSource$.map(x => state => (Object.assign({}, state, { foreignSourceId: maybe_1.Maybe.fromValue(x) }))), setLocalKey$.map(x => state => (Object.assign({}, state, { localKey: maybe_1.Maybe.fromValue(x) }))), setForeignKey$.map(x => state => (Object.assign({}, state, { foreignKey: maybe_1.Maybe.fromValue(x) }))), setJoinMethod$.map(x => state => (Object.assign({}, state, { joinMethod: maybe_1.Maybe.fromValue(x) }))));
        const state$ = stateModifiers$.fold((state, mod) => mod(state), initialState);
        const dom$ = xstream_1.default.combine(state$, props$)
            .map(([state, props]) => view(state, props.sources, dataSource));
        const value$ = xstream_1.default.combine(state$, props$)
            .map(([state, props]) => utils_1.go(function* () {
            const localKey = yield state.localKey;
            const foreignSourceId = yield state.foreignSourceId;
            const foreignKey = yield state.foreignKey;
            const joinMethod = yield state.joinMethod;
            const foreignSource = props.sources.find(s => s.fingerprint === foreignSourceId);
            return { localKey, foreignSourceId, foreignSource, foreignKey, joinMethod };
        }).withDefault({}))
            .startWith({});
        return {
            DOM: dom$,
            value: value$,
        };
    }
    function view(state, sources, dataSource) {
        const joinMethods = ['Inner', 'Left', 'Right'];
        const emptyOption = dom_1.option({ attrs: { value: '' } }, '');
        const withEmpty = opts => [emptyOption].concat(opts);
        const mForeignSource = state.foreignSourceId
            .chain(f => maybe_1.Maybe.fromValue(sources.find(s => s.fingerprint === f)));
        return dom_1.div('.join-collector', [
            dom_1.div('.slot', [
                dom_1.h3('Join Method'),
                dom_1.select('.join-method', withEmpty(joinMethods.map(jm => dom_1.option({ attrs: { value: jm, selected: (state.joinMethod.hasValue(jm)) } }, jm)))),
            ]),
            dom_1.div('.slot', [
                dom_1.h3('Foreign Source'),
                dom_1.select('.foreign-source', withEmpty(sources.map(source => dom_1.option({ attrs: { value: source.fingerprint, selected: (state.foreignSourceId.hasValue(source.fingerprint)) } }, source.name)))),
            ]),
            dom_1.div('.slot', [
                dom_1.h3('Local Key'),
                dom_1.select('.local-key', withEmpty(dataSource.columns.map(column => dom_1.option({ attrs: { value: column.name, selected: (state.localKey.hasValue(column.name)) } }, column.name))))
            ]),
            mForeignSource.map(fSource => dom_1.div('.slot', [
                dom_1.h3('Foreign Key'),
                dom_1.select('.foreign-key', withEmpty(fSource.columns.map(column => dom_1.option({ attrs: { value: column.name, selected: (state.localKey.hasValue(column.name)) } }, column.name)))),
            ])).withDefault(null),
        ]);
    }
    function intent(DOM, init) {
        const { foreignSourceId, foreignKey, localKey, joinMethod } = init;
        return {
            setForeignSource$: DOM.select('.foreign-source').events('change').map(ev => ev.target.value).startWith(foreignSourceId),
            setJoinMethod$: DOM.select('.join-method').events('change').map(ev => ev.target.value).startWith(joinMethod),
            setLocalKey$: DOM.select('.local-key').events('change').map(ev => ev.target.value).startWith(localKey),
            setForeignKey$: DOM.select('.foreign-key').events('change').map(ev => ev.target.value).startWith(foreignKey),
        };
    }
    return main;
}
exports.JoinCollector = JoinCollector;
