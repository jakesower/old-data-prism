import xs, { Stream as XStream } from 'xstream';
import isolate from '@cycle/isolate';
import { adapt } from '@cycle/run/lib/adapt';
import { Stream, never } from 'most';

type Component = any;//(sources: {[k: string]: Stream<any>}) => {[k: string]: Stream<any>}

// helpers
const id = (function () { let i = 1; return function () { return i++; }}());
function isVtree (x) { return x && typeof x.sel === 'string'; }


// IF THIS DOESN'T SEEM TO BE WORKING, TRY SOMETHING LIKE THIS:
// FAILS: const activeSource$ = state$.map(activeSourceObj);
// WORKS: const activeSource$ = adapt(xs.fromObservable(state$.map(activeSourceObj)).remember())
// It ain't cool, but it'll do for now.
function ChainedCollection(
  component: Component,
  sources: {[k: string]: any},
  sourceAdd$: Stream<any>,
  rootWithMemory$,
  connector: (sinks: {[k: string]: Stream<any>}) => Stream<any>,
) {

  const addModifier$ = sourceAdd$.constant((collection: any[]) => {
    const chainSource = collection.length === 0 ?
      rootWithMemory$ :
      connector(collection[collection.length - 1]);

    const newId = id();
    const newItem = isolate(component, newId.toString())({ ...sources, chain$: rootWithMemory$ });
    newItem._id = newId;
    newItem._name = component.name;

    return [...collection, newItem];
  });

  // remove stuff needs to be included eventually--consider a stream of streams for connection purposes

  const modifiers = [
    addModifier$,
  ];

  const init: any[] = [];
  const collection$ = addModifier$.scan((coll, fn) => fn(coll), init);

  return collection$;
}


function pluck(sourceCollection$: Stream<any[]>, pluckSelector): Stream<any[]> {
  const sinks = {};

  function sink$(item) {
    const key = item._id;

    if (sinks[key] === undefined) {
      const selectedSink = xs.fromObservable(pluckSelector(item));
      const sink = selectedSink.map((x: any) =>
        isVtree(x) && x.key == null ? {...x, key} : x
      );
      sinks[key] = sink.remember();
    }

    return sinks[key];
  }

  const collection$: XStream<any[]> = xs.fromObservable(sourceCollection$);
  const outputCollection$ = collection$
    .map(items => items.map(item => sink$(item)))
    .map(sinkStreams => xs.combine(...sinkStreams))
    .flatten()
    .startWith([]);

  return adapt(outputCollection$);
}


export { ChainedCollection, pluck };
