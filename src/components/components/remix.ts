import xs, { Stream } from 'xstream';
import delay from 'xstream/extra/delay';
import { aside, div, main as main_, select, h2, VNode, input, button, map } from '@cycle/dom';
import { ChainedCollection, pluck as pl} from '../../lib/chained-collection';
import { DataSource, StateModifier, makeDataSource } from '../../types';
import { merge, flatten, last } from '../../lib/utils';
import { Maybe } from '../../lib/maybe';
import Grid from './grid';
import Collector from './collector';
import { indexedOptions, targetValue } from '../../lib/dom-utils';
import { sampleWith } from '../../lib/stream-utils';


interface LocalState {
  collectors: any[],
  rootSource: Maybe<number>,
  saveOpen: boolean,
  showSaved: boolean,
}

interface Props {
  sources: DataSource[]
}

interface State extends LocalState, Props {};

const initState: LocalState = {
  rootSource: Maybe.Nothing(),
  collectors: [],
  saveOpen: false,
  showSaved: false,
};


export default function main(cycleSources) {
  const { props: props$, DOM } = cycleSources;
  const { changeRoot$, newOperation$, saveSource$, toggleSave$, saveName$ } = intent(DOM);
  const activeSourceObj: (state: State) => Maybe<DataSource> =
    state => state.rootSource.map(rs => state.sources[rs]);

  const stateModifiers$ = xs.merge(
    changeRoot$.map(source => state => ({...state,
      rootSource: Maybe.fromValue(source),
    })),
    toggleSave$.mapTo(state => ({...state, saveOpen: !state.saveOpen })),
    saveSource$.mapTo(state => ({ ...state, showSaved: true, saveOpen: false })),
    saveSource$.compose(delay(5000)).mapTo(state => ({ ...state, showSaved: false })),
  ) as StateModifier<LocalState>;

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
    DOM: xs.combine<State, VNode|null, VNode|null>(state$, grid.DOM, collectorDom$).map(a => view(a[0], a[1], a[2])),
    source: xs.combine<string, Maybe<DataSource>[]>(saveName$, collectorSources$)
      .compose(sampleWith(saveSource$))
      .map(([name, dataSources]) => ({ name, dataSource: last(dataSources) }))
      .filter(x => x.dataSource && !x.dataSource.isNothing())
      .map(o => ({ ...o, dataSource: <DataSource>o.dataSource.withDefault([]) }))
      .map(({name, dataSource}) => makeDataSource({
        name,
        columns: dataSource.columns,
      })),
  };
}


function intent(DOM) {
  return {
    changeRoot$: DOM.select('select.root-source').events('change').map(targetValue).map(v => v ? parseFloat(v) : null),
    newOperation$: DOM.select('.new-operation-button').events('click'),
    toggleSave$: DOM.select('.save-toggle').events('click'),
    saveSource$: DOM.select('.save-source').events('click'),
    saveName$: DOM.select('.save-name').events('change').map(ev => ev.target.value).startWith(''),
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
          div('.new-operation-button.button', {}, "New Operation"),
          div('.save-as-source', {}, [
            div('.save-toggle.button', {}, "Save as Source"),
            div({ style: { display: state.saveOpen ? 'block' : 'none' }}, [
              input('.save-name', { attrs: { type: 'text', required: true }}),
              button('.save-source', 'Save Source'),
            ]),
            div({ style: { display: state.showSaved ? 'block' : 'none' }}, 'Saved!'),
          ]),
        ]))
      ])
    ]),

    main_({}, [
      gridDom
    ])
  ]);
}
