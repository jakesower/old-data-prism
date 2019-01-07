import xs, { Stream } from 'xstream';
import { aside, div, input, main as main_, p, h1, h2, DOMSource, ul, li } from '@cycle/dom';
import { DataSource, StateModifier } from '../../types';
import Grid from '../components/grid';
import { scopedEvent, extractFile } from '../../lib/dom-utils';
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

export default function main(cycleSources: { DOM: DOMSource, props: Stream<Props>, HTTP }) {
  const { props: props$, DOM } = cycleSources;
  const { addSource$, newSource$, changeSource$, newHttpSource$ } = intent({ DOM });

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
    csvLoader: addSource$,
    HTTP: newHttpSource$.map(url => ({ url, category: 'imported-source' })),
  }
}


function intent({ DOM }) {
  const fileEvent$ = DOM.select('#data-file').events('change')
      .map(ev => ev.target)

  return {
    addSource$: extractFile(fileEvent$),
    newSource$: DOM.select('.new-source').events('click'),
    changeSource$: scopedEvent(DOM.select('.source-list .source'), 'click')
      .map(t => parseFloat(t.dataset.sourceId)),
    newHttpSource$: DOM.select('li.http-data').events('click')
      .map(ev => ev.target.dataset.url),
  }
}


function view(state: State, gridDom) {
  const { activeSource, sources } = state;

  return div('.main-container', [
    aside('.source', [
      div(
        { class: {"new-source": true, active: activeSource.isNothing() }},
        "New DataSource"
      ),
      sourceList(sources, activeSource)
    ]),

    main_({class: {source: true}},
      activeSource.map(active => activeSourceVdom(sources[active], gridDom))
        .withDefault(newSourceVdom())
    )
  ]);
}


function sourceList(sources, activeSource) {
  return div('.source-list', sources.map(
    (source, idx) => div(
      { class: {source: true, active: activeSource.hasValue(idx) }, dataset: { sourceId: idx.toString() }},
      div([
        h2(source.name.length === 0 ? '<no name>' : source.name),
        div({class: {"source-stat": true}}, `Records: ${source.numRecords}`)
      ]))
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
      div('.colgroup', [
        div('upload-type', [
          h2({}, 'Import CSV'),
          input({
            attrs: {type: 'file', id: 'data-file'},
          }, [])
        ]),

        div('upload-type', [
          h2('.sample-data', 'Import Sample Data'),
          ul([
            li('.http-data', { dataset: { url: '/data/2012-2013-agua-canyon-temp.csv' }}, '2012-2013 Agua Canyon Temperatures'),
            li('.http-data', { dataset: { url: '/data/DC_Bike_Accidents_2013.csv' }}, '2013 DC Bike Accidents'),
            li('.http-data', { dataset: { url: '/data/2018-conmebol.csv' }}, '2018 CONMEBOL Results'),
            li('.http-data', { dataset: { url: '/data/artists.csv' }}, 'Artists'),
            li('.http-data', { dataset: { url: '/data/average-northpole-temps.csv' }}, 'Average North Pole Temperatures'),
            li('.http-data', { dataset: { url: '/data/elevations.csv' }}, 'Elevations of Capitals'),
            li('.http-data', { dataset: { url: '/data/FL_insurance_sample.csv' }}, 'Florida Insurance Data'),
            li('.http-data', { dataset: { url: '/data/Populations.csv' }}, 'Population Data (Small Sample)'),
            li('.http-data', { dataset: { url: '/data/Sacramentorealestatetransactions.csv' }}, 'Sacramento Real Estate Transations'),
            li('.http-data', { dataset: { url: '/data/Seattle-Wages-Gender.csv' }}, 'Seattle Wages by Gender'),
          ])
        ])
      ])
    ])
  ]);
}


