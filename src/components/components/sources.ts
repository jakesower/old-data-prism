import xs, { Stream } from 'xstream';
import { aside, div, input, main as main_, p, h1, h2, DOMSource } from '@cycle/dom';
import { DataSource, StateModifier } from '../../types';
import Grid from './grid';
import { scopedEvent } from '../../lib/dom-utils';
import { merge } from '../../lib/utils';
import { Maybe } from '../../lib/maybe';

const noNum = Maybe.Nothing<number>();

interface LocalState {
  activeSource: Maybe<number>,
}

interface Props {
  sources: DataSource[]
}

interface State extends LocalState, Props {};

const initState: LocalState = { activeSource: noNum };

export default function main(cycleSources: { DOM: DOMSource, props: Stream<Props> }) {
  const { props: props$, DOM } = cycleSources;
  const { addSource$, newSource$, changeSource$ } = intent({ DOM });

  const stateModifiers$ = xs.merge(
    newSource$.mapTo(state => ({ ...state, activeSource: noNum })),
    changeSource$.map((id: number) => state => ({ ...state, activeSource: Maybe.of(id) })),
    props$.map(ps => ps.sources.length)
      .filter(l => l > 0)
      .map(l => state => ({ ...state, activeSource: Maybe.of(l-1) })),
    props$.map(ps => ps.sources.length)
      .filter(l => l === 0)
      .map(l => state => ({ ...state, activeSource: noNum }))
  ) as StateModifier<LocalState>;

  const localState$: Stream<LocalState> = stateModifiers$.fold((state, mod) => mod(state), initState);
  const state$ = xs.combine(props$, localState$).map(args => merge(...args));

  const activeSourceObj: (state: State) => ({ source: Maybe<DataSource> }) = state =>
    ({ source: state.activeSource.map(rs => state.sources[rs]) });

  const grid = Grid({ DOM: DOM, props: state$.map(activeSourceObj) });
  const gridDom$ = grid.DOM;

  return {
    DOM: xs.combine(state$, gridDom$).map(c => view(c[0] as State, c[1])).startWith(div('hi')),
    csvLoader: addSource$.map(e => ({ source: 'upload-csv', element: e })),
  }
}


function intent({ DOM }) {
  return {
    addSource$: DOM.select('#data-file').events('change')
      .map(ev => ev.target),
    newSource$: DOM.select('.new-source').events('click'),
    changeSource$: scopedEvent(DOM.select('.source-list .source'), 'click')
      .map(t => parseFloat(t.dataset.sourceId)),
  }
}


function view(state: State, gridDom) {
  const { activeSource, sources } = state;

  return div({class: {"main-container": true}}, [
    aside({class: {source: true}}, [
      div(
        { class: {"new-source": true, active: activeSource.isNothing() }},
        "New DataSource"
      ),
      sources.length > 0 ?
        sourceList(sources, activeSource) :
        p({}, [
          'Get started by importing a data source. New to Data Prism? ...'
        ])
    ]),

    main_({class: {source: true}},
      activeSource.map(active => activeSourceVdom(sources[active], gridDom))
        .withDefault(newSourceVdom())
    )
  ]);
}


function sourceList(sources, activeSource) {
  return div({class: {"source-list": true}}, sources.map(
    (source, idx) => div(
      { class: {source: true, active: activeSource.hasValue(idx) }, dataset: { sourceId: idx.toString() }},
      [
        h2(source.name.length === 0 ? '<no name>' : source.name),
        div({class: {"source-stat": true}}, `Records: ${source.numRecords}`)
      ])
  ));
}

function activeSourceVdom(source: DataSource, grid) {
  return div({}, [
    h1({}, source.name),
    grid
  ])
}


function newSourceVdom() {
  return div({}, [
    h1({}, 'Import New DataSource'),

    div({}, [
      div({class: {colgroup: true}}, [
        div({class: {"upload-type": true}}, [
          h2({}, 'Import CSV'),
          input({
            attrs: {type: 'file', id: 'data-file'},
          }, [])
        ]),

        div({class: {"upload-type": true}}, [
          h2({}, 'Import Sample Data'),
          // h('select',
          //   prepend(emptyOption, R.map(({name, uri}) =>
          //     option({attrs: {value: uri}}, name),
          //     Samples.catalog
          //   ))
          // )
        ])
      ])
    ])
  ]);
}
