import xs, { Stream } from 'xstream';
import delay from 'xstream/extra/delay';
import { aside, div, main as main_, select, h2, VNode, input, button, map, h3, option } from '@cycle/dom';
import { ChainedCollection, pluck as pl} from '../../lib/chained-collection';
import { DataSource, StateModifier, makeDataSource } from '../../types';
import { merge, flatten, last } from '../../lib/utils';
import { Maybe } from '../../lib/maybe';
import Grid from '../components/grid';
import Collector from '../components/collector';
import { targetValue } from '../../lib/dom-utils';
import { sampleWith } from '../../lib/stream-utils';
import OperationsMenu from '../components/operations-menu';


interface LocalState {
  collectors: any[],
  rootSource: Maybe<string>,
  saveOpen: boolean,
  showSaved: boolean,
  actionsOpen: boolean,
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
  actionsOpen: false,
};


export default function main(cycleSources) {
  const { props: props$, DOM } = cycleSources;
  const { changeRoot$, saveSource$, toggleSave$, saveName$, export$, toggleActions$ } = intent(DOM);
  const activeSourceObj: (state: State) => Maybe<DataSource> =
    state => state.rootSource.chain(rs => Maybe.fromValue(state.sources.find(s => s.fingerprint === rs)));

  const stateModifiers$ = xs.merge(
    changeRoot$.map(source => state => ({...state,
      rootSource: Maybe.fromValue(source),
    })),
    toggleSave$.mapTo(state => ({...state, saveOpen: !state.saveOpen })),
    toggleActions$.mapTo(state => ({ ...state, actionsOpen: !state.actionsOpen })),
    saveSource$.mapTo(state => ({ ...state, showSaved: true, saveOpen: false })),
    saveSource$.compose(delay(5000)).mapTo(state => ({ ...state, showSaved: false })),
  ) as StateModifier<LocalState>;

  const localState$: Stream<LocalState> = stateModifiers$.fold((state, mod) => mod(state), initState);
  const state$ = xs.combine<Props, LocalState>(props$, localState$).map(([a,b]) => merge(a,b));
  const activeSource$ = state$.map(activeSourceObj).remember();

  const menu = OperationsMenu(cycleSources);
  const collectors$ = ChainedCollection({
    component: Collector,
    sources: cycleSources,
    add$: menu.operation,
    root$: activeSource$,
    chainConnector: sink => sink.dataSource,
    removeConnector: sink => sink.remove$,
  });

  const collectorDom$ = pl(collectors$, x => x.DOM);
  const collectorSources$ = pl(collectors$, x => x.dataSource);

  const gridSource$ = xs.combine<Maybe<DataSource>, any[]>(activeSource$, collectorSources$)
    .map(([activeSource, collectorSources]): Maybe<DataSource> => {
      return collectorSources.reduce((last, s) => s.isNothing() ? last : s, activeSource);
    })

  const grid = Grid({ DOM: DOM, props: gridSource$.map(source => ({source})) });

  return {
    DOM: xs.combine(state$, grid.DOM, collectorDom$, menu.DOM).map(a => view(a[0], a[1], a[2], a[3])),
    source: xs.combine<string, Maybe<DataSource>[]>(saveName$, collectorSources$)
      .compose(sampleWith(saveSource$))
      .map(([name, dataSources]) => ({ name, dataSource: last(dataSources) }))
      .filter(x => x.dataSource && !x.dataSource.isNothing())
      .map(o => ({ ...o, dataSource: <DataSource>o.dataSource.withDefault([]) }))
      .map(({name, dataSource}) => makeDataSource({
        name,
        columns: dataSource.columns,
      })),
    csvExport: gridSource$
      .map(a => a.withDefault(null))
      .compose(sampleWith(export$))
      .filter(a => a != undefined),
    workingSource: gridSource$,
    value: state$
      .map(state => state.rootSource
        .map(rootSource => ({collectors: state.collectors, rootSource }))
        .withDefault({})
      ),
  };
}


function intent(DOM) {
  return {
    changeRoot$: DOM.select('select.root-source').events('change').map(targetValue),
    toggleSave$: DOM.select('.save-toggle').events('click'),
    saveSource$: DOM.select('.save-source').events('click'),
    saveName$: DOM.select('.save-name').events('change').map(ev => ev.target.value).startWith(''),
    export$: DOM.select('.export-csv').events('click'),
    toggleActions$: DOM.select('.toggle-actions-button').events('click'),
  }
}


function view(state: State, gridDom, collectorDom, menuDom) {
  const emptyOption = option({ attrs: { value: "", select: state.rootSource.isNothing() }});
  const sourceOptions = state.sources.map(s => option(
    { attrs: { value: s.fingerprint, selected: state.rootSource.hasValue(s.fingerprint) }},
    s.name
  ));

  const opts = [emptyOption].concat(sourceOptions);

  return div('.main-container', [
    aside({}, [
      div('.root-datasource', {}, [
        h2({}, 'Root DataSource'),
        select({ class: { "root-source": true }}, opts)
      ]),
      div((state.rootSource.isNothing() ? '.remix-controls.disabled' : '.remix-controls'), {}, [
        div({}, flatten([
          collectorDom,
          menuDom,
          div('.save-as-source.toggle' + (state.saveOpen ? '.open' : ''), {}, [
            div('.save-toggle.action', {}, "Save as Source"),
            div('.open', {}, [
              h3('Save As...'),
              input('.save-name', { attrs: { type: 'text', required: true }}),
              button('.save-source', 'Save Source'),
              button('.save-toggle.button', 'Cancel'),
            ]),
          ]),
          div('.export-csv.action', {}, "Export to CSV"),
        ]))
      ])
    ]),

    main_({}, [
      gridDom
    ])
  ]);
}
