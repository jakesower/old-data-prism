import { adapt } from '@cycle/run/lib/adapt';
import { aside, div, main as main_, select, h2 } from '@cycle/dom';
import { mergeArray, combine, Stream, combineArray, of, never } from 'most';
import { ChainedCollection, pluck as pl} from '../../lib/chained-collection';
import { DataSource, StateModifier, Operation } from '../../types';
import { merge, flatten, go } from '../../lib/utils';
import { Maybe } from '../../lib/maybe';
import Grid from './grid';
import Collector from './collector';
import { indexedOptions, targetValue } from '../../lib/dom-utils';
import operationDefs from '../../operations';
import xs from 'xstream';
import { applyOperation } from '../../lib/data-functions';


interface LocalState {
  collectors: any[],
  rootSource: Maybe<number>,
}

interface Props {
  sources: DataSource[]
}

interface State extends LocalState, Props {};

const initState: LocalState = { rootSource: Maybe.Nothing<number>(), collectors: [] };


export default function main(cycleSources) {
  const { props: props$, DOM } = cycleSources;
  const { changeRoot$, newOperation$ } = intent(DOM);
  const activeSourceObj: (state: State) => ({ source: Maybe<DataSource> }) = state =>
    ({ source: state.rootSource.map(rs => state.sources[rs]) });

  const stateModifiers$: StateModifier<LocalState> = mergeArray([
    changeRoot$.map(source => state => ({...state,
      rootSource: Maybe.fromValue(source),
    })),
  ]);

  const localState$: Stream<LocalState> = stateModifiers$.scan((state, mod) => mod(state), initState);
  const state$ = combine<Props, LocalState, State>(merge, props$, localState$);

  // YUCK
  const activeSource$ = adapt(xs.fromObservable(state$.map(activeSourceObj)).remember());


  const collectors$ = ChainedCollection(
    Collector,
    cycleSources,
    newOperation$,
    activeSource$,
    sink => sink.dataSource
  );

  const collectorDom$ = pl(collectors$, x => x.DOM);
  const collectorSources$ = pl(collectors$, x => x.dataSource);

  const gridSource = combine((activeSource, collectorSources) => {
    console.log({activeSource, collectorSources});
    return collectorSources.reduce((last, s) => s.isNothing() ? last : s, activeSource);
  }, activeSource$, collectorSources$);

  const grid = Grid({ DOM: DOM, props: gridSource });

  return {
    DOM: combineArray(view, [state$, grid.DOM, collectorDom$]),
  };
}


function intent(DOM) {
  const opId = ev => parseFloat(ev.target.dataset.operationId);
  return {
    changeRoot$: DOM.select('select.root-source').events('change').map(targetValue).map(v => v ? parseFloat(v) : null),
    newOperation$: DOM.select('.new-operation-button').events('click'),
    setOperation$: DOM.select('.operation-id').events('change').map(ev =>
      ({ value: ev.target.value, opId: opId(ev) })
    ),
    saveOperation$: DOM.select('.collector .save').events('click').map(opId),
    applyOperation$: DOM.select('.collector .apply').events('click').map(opId),
    cancelOperation$: DOM.select('.collector .cancel').events('click').map(opId),
  }
}


function view(state: State, gridDom, collectorDom) {
  return div({class: {"main-container": true}}, [
    aside({}, [
      div('.root-datasource', {}, [
        h2({}, 'Root DataSource'),
        select({ class: { "root-source": true }}, indexedOptions(state.sources.map(s => s.name), state.rootSource.withDefault(null)))
      ]),
      div('.remix-controls', {}, [
        div('.operations-menu', {}, flatten([
          collectorDom,
          div('.new-operation-button', {}, "New Operation")
        ]))
      ])
    ]),

    main_({}, [
      gridDom
    ])
  ]);
}
