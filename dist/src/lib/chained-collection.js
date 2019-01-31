"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xstream_1 = require("xstream");
const isolate_1 = require("@cycle/isolate");
const adapt_1 = require("@cycle/run/lib/adapt");
const sampleCombine_1 = require("xstream/extra/sampleCombine");
const ITEM_ID = Symbol('id');
const ITEM_NAME = Symbol('name');
const ITEM_REMOVE$ = Symbol('remove$');
// helpers
const id = (function () { let i = 1; return function () { return i++; }; }());
function isVtree(x) { return x && typeof x.sel === 'string'; }
function ChainedCollection(args) {
    const { component, sources, add$, root$, chainConnector, removeConnector } = args;
    const removeProxy$ = xstream_1.default.create();
    const chainSourceProxy$ = xstream_1.default.create();
    const addModifier$ = add$.map(init => (collection) => {
        const initChain = collection.length === 0 ?
            root$ :
            chainConnector(collection[collection.length - 1]);
        const newId = id();
        const newItem = isolate_1.default(component, newId.toString())(Object.assign({}, sources, { chainInit$: xstream_1.default.of(init).remember(), chain$: chainSourceProxy$
                .startWith({ [newId]: initChain })
                .map(chainSource => chainSource[newId] || initChain)
                .flatten()
                .remember() }));
        newItem[ITEM_ID] = newId;
        newItem[ITEM_NAME] = component.name;
        newItem[ITEM_REMOVE$] = removeConnector(newItem).take(1).mapTo(newId);
        return [...collection, newItem];
    });
    const removeModifier$ = removeProxy$.map(itemId => collection => removeItem(itemId, collection));
    const modifier$ = xstream_1.default.merge(addModifier$, removeModifier$);
    const init = [];
    const collection$ = modifier$.fold((coll, fn) => fn(coll), init);
    const remove$ = collection$
        .map(items => items.map(item => item[ITEM_REMOVE$]))
        .map(remove$$ => xstream_1.default.merge(...remove$$))
        .flatten();
    const chainSource$ = modifier$
        .compose(sampleCombine_1.default(collection$))
        .map(([_, collection]) => collection)
        .map(collection => collection.reduce((acc, item, idx) => {
        const chainSource = idx === 0 ? root$ : chainConnector(collection[idx - 1]);
        const entry = { [item[ITEM_ID]]: chainSource };
        return Object.assign({}, acc, entry);
    }, {}));
    removeProxy$.imitate(remove$);
    chainSourceProxy$.imitate(chainSource$);
    return collection$;
}
exports.ChainedCollection = ChainedCollection;
function removeItem(itemIdToRemove, collection) {
    return collection.filter(item => item[ITEM_ID] !== itemIdToRemove);
}
function pluck(sourceCollection$, pluckSelector) {
    const sinks = {};
    function sink$(item) {
        const key = item[ITEM_ID];
        if (sinks[key] === undefined) {
            const selectedSink = xstream_1.default.fromObservable(pluckSelector(item));
            const sink = selectedSink.map((x) => isVtree(x) && x.key == null ? Object.assign({}, x, { key }) : x);
            sinks[key] = sink.remember();
        }
        return sinks[key];
    }
    const collection$ = xstream_1.default.fromObservable(sourceCollection$);
    const outputCollection$ = collection$
        .map(items => items.map(item => sink$(item)))
        .map(sinkStreams => xstream_1.default.combine(...sinkStreams))
        .flatten()
        .startWith([]);
    return adapt_1.adapt(outputCollection$);
}
exports.pluck = pluck;
