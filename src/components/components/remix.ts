import xs, { Stream } from 'xstream';
import { aside, div, main as main_, select, h2, VNode } from '@cycle/dom';
import { ChainedCollection, pluck as pl} from '../../lib/chained-collection';
import { DataSource, StateModifier } from '../../types';
import { merge, flatten } from '../../lib/utils';
import { Maybe } from '../../lib/maybe';
import Grid from './grid';
import Collector from './collector';
import { indexedOptions, targetValue } from '../../lib/dom-utils';


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
  const activeSourceObj: (state: State) => Maybe<DataSource> =
    state => state.rootSource.map(rs => state.sources[rs]);

  const stateModifiers$: StateModifier<LocalState> = xs.merge(
    changeRoot$.map(source => state => ({...state,
      rootSource: Maybe.fromValue(source),
    })),
  );

  const localState$: Stream<LocalState> = stateModifiers$.fold((state, mod) => mod(state), initState);
  const state$ = xs.combine<Props, LocalState>(props$, localState$).map(([a,b]) => merge(a,b));
  const activeSource$ = state$.map(activeSourceObj).remember();

  const collectors$ = ChainedCollection({
    component: Collector,
    sources: cycleSources,
    add$: newOperation$,
    root$: activeSource$,
    chainConnector: sink => sink.dataSource,
    removeConnector: sink => sink.remove$,
  });

  const collectorDom$ = pl(collectors$, x => x.DOM);
  const collectorSources$ = pl(collectors$, x => x.dataSource);

  const gridSource = xs.combine<Maybe<DataSource>, any[]>(activeSource$, collectorSources$)
    .map(([activeSource, collectorSources]): Maybe<DataSource> => {
      return collectorSources.reduce((last, s) => s.isNothing() ? last : s, activeSource);
    })

  const grid = Grid({ DOM: DOM, props: gridSource.map(source => ({source})) });

  return {
    DOM: xs.combine<State, VNode|null, VNode|null>(state$, grid.DOM, collectorDom$).map(a => view(a[0], a[1], a[2]))
  };
}


function intent(DOM) {
  const opId = ev => parseFloat(ev.target.dataset.operationId);
  return {
    changeRoot$: DOM.select('select.root-source').events('change').map(targetValue).map(v => v ? parseFloat(v) : null),
    newOperation$: DOM.select('.new-operation-button').events('click'),
  }
}


function view(state: State, gridDom, collectorDom) {
  return div('.main-container', [
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
