"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xstream_1 = require("xstream");
const isolate_1 = require("@cycle/isolate");
const adapt_1 = require("@cycle/run/lib/adapt");
const ITEM_ID = Symbol('id');
const ITEM_NAME = Symbol('name');
const ITEM_REMOVE$ = Symbol('remove$');
// helpers
const id = (function () { let i = 1; return function () { return i++; }; }());
function isVtree(x) { return x && typeof x.sel === 'string'; }
function Collection(args) {
    const { component, sources, add$, init, removeConnector } = args;
    const removeProxy$ = xstream_1.default.create();
    const makeItem = (init) => {
        const newId = id();
        const newItem = isolate_1.default(component, newId.toString())(sources, init);
        newItem[ITEM_ID] = newId;
        newItem[ITEM_NAME] = component.name;
        newItem[ITEM_REMOVE$] = removeConnector(newItem).take(1).mapTo(newId);
        return newItem;
    };
    const addModifier$ = add$.mapTo((collection) => {
        return [...collection, makeItem()];
    });
    const removeModifier$ = removeProxy$.map(itemId => collection => removeItem(itemId, collection));
    const modifier$ = xstream_1.default.merge(addModifier$, removeModifier$);
    const collectionInit = init.map(makeItem);
    const collection$ = modifier$.fold((coll, fn) => fn(coll), collectionInit);
    const remove$ = collection$
        .map(items => items.map(item => item[ITEM_REMOVE$]))
        .map(remove$$ => xstream_1.default.merge(...remove$$))
        .flatten();
    removeProxy$.imitate(remove$);
    return collection$;
}
exports.Collection = Collection;
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
