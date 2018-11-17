import xs, { Stream } from 'xstream';
import isolate from '@cycle/isolate';
import { adapt } from '@cycle/run/lib/adapt';

const ITEM_ID = Symbol('id');
const ITEM_NAME = Symbol('name');
const ITEM_REMOVE$ = Symbol('remove$');

type Component = any;//(sources: {[k: string]: Stream<any>}) => {[k: string]: Stream<any>}
type CollectionInput = {
  component: Component,
  sources: object,
  add$: Stream<any>,
  init: any[],
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

function Collection(args: CollectionInput) {
  const { component, sources, add$, init, removeConnector } = args;
  const removeProxy$: Stream<number> = xs.create();

  const makeItem = (init?: any): Item => {
    const newId = id();
    const newItem = isolate(component, newId.toString())(sources, init);
    newItem[ITEM_ID] = newId;
    newItem[ITEM_NAME] = component.name;
    newItem[ITEM_REMOVE$] = removeConnector(newItem).take(1).mapTo(newId);
    return newItem;
  }

  const addModifier$ = add$.mapTo((collection: Item[]): Item[] => {
    return [...collection, makeItem()];
  });

  const removeModifier$ = removeProxy$.map(itemId => collection => removeItem(itemId, collection));

  const modifier$: Stream<(collection: Item[]) => any> = xs.merge(
    addModifier$,
    removeModifier$,
  );

  const collectionInit: Item[] = init.map(makeItem);
  const collection$ = modifier$.fold((coll, fn) => fn(coll), collectionInit);
  const remove$ = collection$
    .map(items => items.map(item => item[ITEM_REMOVE$]))
    .map(remove$$ => xs.merge(...remove$$))
    .flatten() as Stream<number>;

  removeProxy$.imitate(remove$);

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


export { Collection, pluck };
