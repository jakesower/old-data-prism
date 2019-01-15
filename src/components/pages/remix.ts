import xs, { Stream } from 'xstream';
import delay from 'xstream/extra/delay';
import { aside, div, main as main_, select, h2, VNode, input, button, map, h3, option, textarea } from '@cycle/dom';
import { ChainedCollection, pluck as pl} from '../../lib/chained-collection';
import { DataSource, StateModifier, makeDataSource } from '../../types';
import { merge, flatten, last } from '../../lib/utils';
import { Maybe } from '../../lib/monads/maybe';
import Grid from '../components/grid';
import Collector from '../components/collector';
import { targetValue } from '../../lib/dom-utils';
import { sampleWith } from '../../lib/stream-utils';
import OperationsMenu from '../components/operations-menu';
import { Either } from '../../lib/monads/either';


interface LocalState {
  collectors: any[],
  rootSource: Maybe<string>,
  saveOpen: boolean,
  saveRemixOpen: boolean,
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
  saveRemixOpen: false,
  showSaved: false,
  actionsOpen: false,
};


export default function main(cycleSources) {
  const { props: props$, DOM } = cycleSources;
  const { changeRoot$, saveSource$, toggleSave$, saveName$, export$, toggleActions$, toggleRemixSave$ } = intent(DOM);
  const activeSourceObj: (state: State) => Maybe<DataSource> =
    state => state.rootSource.chain(rs => Maybe.fromValue(state.sources.find(s => s.fingerprint === rs)));

  const stateModifiers$ = xs.merge(
    changeRoot$.map(source => state => ({...state,
      rootSource: Maybe.fromValue(source),
    })),
    toggleSave$.mapTo(state => ({...state, saveOpen: !state.saveOpen })),
    toggleRemixSave$.mapTo(state => ({...state, saveRemixOpen: !state.saveOpen })),
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
  const collectorSources$: Stream<Either<string,DataSource>[]> = pl(collectors$, x => x.dataSource);
  const collectorValues$ = pl(collectors$, x => x.operationValue); // TODO

  const recipe$ = xs.combine<Maybe<DataSource>, any[]>(activeSource$, collectorValues$)
    .map(([activeSource, collectorValues]) => ({
      rootSource: activeSource.map(a => a.fingerprint).withDefault(null),
      operations: collectorValues
    }))
    .map(o => JSON.stringify(o))
    .startWith("{}");

  const gridSource$ = xs.combine<Maybe<DataSource>, Either<string,DataSource>[]>(activeSource$, collectorSources$)
    .map(([activeSource, collectorSources]): Maybe<DataSource> => {
      return collectorSources.reduce((last, s) => s.isErr() ? last : s.toMaybe(), activeSource);
    });

  const grid = Grid({ DOM: DOM, props: gridSource$.map(source => ({source})) });

  return {
    DOM: xs.combine(state$, grid.DOM, collectorDom$, menu.DOM, recipe$).map(a => view(a[0], a[1], a[2], a[3], a[4])),
    source: xs.combine<string, Either<string,DataSource>[]>(saveName$, collectorSources$)
      .compose(sampleWith(saveSource$))
      .map(([name, dataSources]) => ({ name, dataSource: last(dataSources) }))
      .filter(x => x.dataSource && !x.dataSource.isErr())
      .map(o => ({ ...o, dataSource: <DataSource>o.dataSource.recoverWith([]) }))
      .map(({name, dataSource}) => makeDataSource({
        name,
        columns: dataSource.columns,
      })),
    csvExport: xs.combine(gridSource$, saveName$)
      .compose(sampleWith(export$))
      .filter(([gridSource, _]) => !gridSource.isNothing())
      .map(([gridSource, saveName]) => {
        const gs = gridSource.withDefault(null) as DataSource;
        return makeDataSource({
          name: saveName,
          columns: gs.columns,
        })
      }),
    workingSource: gridSource$,
    value: state$
      .map(state => state.rootSource
        .map(rootSource => ({ collectors: state.collectors, rootSource }))
        .withDefault({})
      ),
  };
}


function intent(DOM) {
  return {
    changeRoot$: DOM.select('select.root-source').events('change').map(targetValue),
    toggleSave$: DOM.select('.save-toggle').events('click'),
    toggleRemixSave$: DOM.select('.save-remix-toggle').events('click'),
    saveSource$: DOM.select('.save-source').events('click'),
    saveName$: <Stream<string>>DOM.select('.save-name').events('change').map(ev => ev.target.value).startWith(''),
    export$: DOM.select('.export-csv').events('click'),
    toggleActions$: DOM.select('.toggle-actions-button').events('click'),
  }
}


function view(state: State, gridDom, collectorDom, menuDom, recipe) {
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
          div('.save-as-source.toggle' + (state.saveOpen ? '.open.subsection' : ''), {}, [
            div('.save-toggle.action', {}, "Save Data"),
            div('.open', {}, [
              h3('Save As...'),
              input('.save-name', { attrs: { type: 'text', required: true }}),
              button('.export-csv', 'Save as CSV'),
              button('.save-source', 'Save as Source'),
              button('.save-toggle.button', 'Cancel'),
            ]),
          ]),
          div('.save-remix.toggle' + (state.saveRemixOpen ? '.open.subsection' : ''), {}, [
            div('.save-remix-toggle.action', {}, "Save Remix"),
            div('.open', {}, [
              h3('JSON'),
              textarea({ props: { spellcheck: false }}, recipe)
            ]),
          ]),

        ]))
      ])
    ]),

    main_({}, [
      gridDom
    ])
  ]);
}
