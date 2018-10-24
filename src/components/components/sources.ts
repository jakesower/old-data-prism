import { aside, div, input, main as main_, p, h1, h2, DOMSource } from '@cycle/dom';
import { combineArray, Stream, mergeArray, combine } from 'most';
import { DataSource, StateModifier } from '../../types';
import Grid from './grid';
import { scopedEvent } from '../../lib/dom-utils';
import { merge, eq } from '../../lib/utils';

interface LocalState {
  activeSource: number | null,
}

interface Props {
  sources: DataSource[]
}

interface State extends LocalState, Props {};

const initState: LocalState = { activeSource: null };

export default function main(cycleSources: { DOM: DOMSource, props: Stream<Props> }) {
  const { props: props$, DOM } = cycleSources;
  const { addSource$, newSource$, changeSource$ } = intent({ DOM });

  const stateModifiers$: StateModifier<LocalState> = mergeArray([
    newSource$.constant(state => ({ ...state, activeSource: null })),
    changeSource$.map((id: number) => state => ({ ...state, activeSource: id })),
    props$.map(ps => ps.sources.length)
      .skipRepeats()
      .filter(l => l > 0)
      .map(l => state => ({ ...state, activeSource: l-1 })),
    props$.map(ps => ps.sources.length)
      .skipRepeats()
      .filter(l => l === 0)
      .map(l => state => ({ ...state, activeSource: null }))
  ]);

  const localState$: Stream<LocalState> = stateModifiers$.scan((state, mod) => mod(state), initState);
  const state$ = combine<Props, LocalState, State>(merge, props$, localState$).skipRepeatsWith(eq);

  const sourceOrNull = s => ({ source: (s.activeSource === null) ? null : s.sources[s.activeSource] });
  const grid = Grid({ DOM: DOM, props: state$.map(sourceOrNull) });
  const gridDom$ = grid.DOM;

  return {
    DOM: combineArray(view, [state$, gridDom$]),
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
        { class: {"new-source": true, active: (activeSource == null) }},
        "New DataSource"
      ),
      sources.length > 0 ?
        sourceList(sources, activeSource) :
        p({}, [
          'Get started by importing a data source. New to Data Prism? ...'
        ])
    ]),

    main_({class: {source: true}},
      (activeSource !== null) ?
        activeSourceVdom(sources[activeSource], gridDom) :
        newSourceVdom()
    )
  ]);
}


function sourceList(sources, activeSource) {
  return div({class: {"source-list": true}}, sources.map(
    (source, idx) => div(
      { class: {source: true, active: idx === activeSource }, dataset: { sourceId: idx.toString() }},
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
    h1({}, 'Load New DataSource'),

    div({}, [
      div({class: {colgroup: true}}, [
        div({class: {"upload-type": true}}, [
          h2({}, 'Upload CSV'),
          input({
            attrs: {type: 'file', id: 'data-file'},
          }, [])
        ]),

        div({class: {"upload-type": true}}, [
          h2({}, 'Load Sample Data'),
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



// const R = require('ramda');
// const h = require('snabbdom/h').default;
// const {targetValue} = require('../../../lib/utils');

// const Action = require('../action');
// const Samples = require('../../../samples/index');

// const emptyOption = h('option', {}, '');

// module.exports = R.curry((action$, model) => {
//   const activeSource = R.find(s => s.id === model.activeSource, model.sources);

//   return h('div', {class: {"main-container": true}}, [
//     h('aside', {class: {source: true}}, [
//       h('div',
//         { class: {"new-source": true, active: R.isNil(model.activeSource)},
//           on: {click: [action$, Action.SetActiveSource(null)]}
//         },
//         "New DataSource"
//       ),
//       R.length(model.sources) > 0 ?
//         sourceList(action$, model.sources, model.activeSource) :
//         h('p', {}, [
//           'Get started by importing a data source. New to Data Prism? ...'
//         ])
//     ]),

//     h('main', {class: {source: true}},
//       model.activeSource ?
//         activeSourceVdom(action$, activeSource) :
//         newSourceVdom(action$, model)
//     )
//   ])
// });


// function activeSourceVdom(action$, source) {
//   return h('div', {}, [
//     h('h1', {}, source.name),

//   ])
// }


// function newSourceVdom(action$, model) {
//   return h('div', {}, [
//     h('h1', {}, 'Load New DataSource'),

//     h('div', {}, [
//       h('div', {class: {colgroup: true}}, [
//         h('div', {class: {"upload-type": true}}, [
//           h('h2', {}, 'Upload CSV'),
//           h('input', {
//             attrs: {type: 'file', id: 'data-file'},
//             on: {change: [action$, Action.LoadLocalFile('data-file')]}
//           }, [])
//         ]),

//         h('div', {class: {"upload-type": true}}, [
//           h('h2', {}, 'Load Sample Data'),
//           h('select',
//             { on: {change: R.compose(action$, Action.LoadURI, targetValue)}
//             },
//             R.prepend(emptyOption, R.map(({name, uri}) =>
//               h('option', {attrs: {value: uri}}, name),
//               Samples.catalog
//             ))
//           )
//         ])
//       ])
//     ])
//   ]);
// }


// function sourceList(action$, sources, activeSource) {
//   return h('div', {class: {"source-list": true}}, R.map(
//     source => h('div',
//       { class: {source: true, active: source.id === activeSource},
//         on: {click: [action$, Action.SetActiveSource(source.id)]}
//       }, [
//       h('h2', R.isEmpty(source.name) ? '<no name>' : source.name),
//       h('div', {class: {"source-stat": true}}, `Records: ${source.data.records.length}`)
//     ]),
//     sources
//   ));
// }
