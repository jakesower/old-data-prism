import xs, { Stream } from 'xstream';
import isolate from '@cycle/isolate';
import { adapt } from '@cycle/run/lib/adapt';
import sampleCombine from 'xstream/extra/sampleCombine';

const ITEM_ID = Symbol('id');
const ITEM_NAME = Symbol('name');
const ITEM_REMOVE$ = Symbol('remove$');

type Component = any;//(sources: {[k: string]: Stream<any>}) => {[k: string]: Stream<any>}
type ChainedCollectionInput = {
  component: Component,
  sources: object,
  add$: Stream<any>,
  root$,
  chainConnector: (sinks: {[k: string]: Stream<any>}) => Stream<any>,
  removeConnector: (item: {[k: string]: Stream<any>}) => Stream<any>,
}
type Item = {
  [ITEM_ID]: number,
  [ITEM_NAME]: string,
  [ITEM_REMOVE$]: Stream<any>,
  [k: string]: Stream<any>
}

// helpers
const id = (function () { let i = 1; return function () { return i++; }}());
function isVtree (x) { return x && typeof x.sel === 'string'; }

function ChainedCollection(args: ChainedCollectionInput) {
  const { component, sources, add$, root$, chainConnector, removeConnector } = args;
  const removeProxy$: Stream<number> = xs.create();
  const chainSourceProxy$ = xs.create();

  const addModifier$ = add$.mapTo((collection: Item[]): Item[] => {
    const initChain = collection.length === 0 ?
      root$ :
      chainConnector(collection[collection.length - 1]);

    const newId = id();
    const newItem = isolate(component, newId.toString())({
      ...sources,
      chain$: chainSourceProxy$
        .startWith({[newId]: initChain})
        .map(chainSource => chainSource[newId] || initChain)
        .flatten()
        .remember()
    });
    newItem[ITEM_ID] = newId;
    newItem[ITEM_NAME] = component.name;
    newItem[ITEM_REMOVE$] = removeConnector(newItem).take(1).mapTo(newId);
    // newItem.DOM.debug()

    return [...collection, newItem];
  });

  const removeModifier$ = removeProxy$.map(itemId => collection => removeItem(itemId, collection));

  const modifier$: Stream<(collection: Item[]) => any> = xs.merge(
    addModifier$,
    removeModifier$,
  );

  const init: Item[] = [];
  const collection$ = modifier$.fold((coll, fn) => fn(coll), init);
  const remove$ = collection$
    .map(items => items.map(item => item[ITEM_REMOVE$]))
    .map(remove$$ => xs.merge(...remove$$))
    .flatten() as Stream<number>;

  const chainSource$ = modifier$
    .compose(sampleCombine(collection$))
    .map(([_, collection]) => collection)
    .map(collection => collection.reduce((acc, item, idx) => {
      const chainSource = idx === 0 ? root$ : chainConnector(collection[idx - 1]);
      const entry = {[item[ITEM_ID]]: chainSource};
      return Object.assign({}, acc, entry);
    }, {}))

  removeProxy$.imitate(remove$);
  chainSourceProxy$.imitate(chainSource$);

  return collection$;
}


function removeItem(itemIdToRemove: number, collection: any[]): any[] {
  return collection.filter(item => item[ITEM_ID] !== itemIdToRemove);
}


function pluck(sourceCollection$: Stream<any[]>, pluckSelector): Stream<any> {
  const sinks = {};

  function sink$(item) {
    const key = item[ITEM_ID];

    if (sinks[key] === undefined) {
      const selectedSink = xs.fromObservable(pluckSelector(item));
      const sink = selectedSink.map((x: any) =>
        isVtree(x) && x.key == null ? {...x, key} : x
      );
      sinks[key] = sink.remember();
    }

    return sinks[key];
  }

  const collection$: Stream<any[]> = xs.fromObservable(sourceCollection$);
  const outputCollection$ = collection$
    .map(items => items.map(item => sink$(item)))
    .map(sinkStreams => xs.combine(...sinkStreams))
    .flatten()
    .startWith([]);

  return adapt(outputCollection$);
}


export { ChainedCollection, pluck };
