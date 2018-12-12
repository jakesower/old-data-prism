import xs, { Stream } from 'xstream';
import { div, aside, main, option, select, h2, h3, VNode } from '@cycle/dom';
import { flatten, merge, go } from '../../lib/utils';
import * as BarChart from '../charts/bar';
import { indexedOptions } from '../../lib/dom-utils';
import { Maybe } from '../../lib/maybe';
import { StateModifier, DataSource } from '../../types';
import { SlotCollector } from '../collectors/slot-collector';
// import { sampleWith } from '../../lib/stream-utils';
// const scatterPlot = require('./charts/scatter');
// const lineChart = require('./charts/line');

const chartDefs = {
  Bar: BarChart,
  // scatterPlot,
  // line: lineChart,
};

type StrObj = {[k: string]: string};

interface LocalState {
  activeSource: Maybe<number>,
  chartType: Maybe<string>,
}

interface Props {
  sources: DataSource[],
}

interface State extends LocalState, Props {
  dataSource: Maybe<DataSource>,
}

const initState: LocalState = {
  activeSource: Maybe.Nothing(),
  chartType: Maybe.Nothing(),
}

export default function ChartComponent(cycleSources) {
  const { props: props$, DOM, dimensions: dimensions$ } = cycleSources;
  const { changeRoot$, chartType$ } = intent(DOM);

  const modifier$: StateModifier<LocalState> = xs.merge(
    changeRoot$.map(root => state => ({ ...state, activeSource: Maybe.fromValue(root) })),
    chartType$.map(chartType => state => ({ ...state, chartType: Maybe.fromValue(chartType) })),
  ) as StateModifier<LocalState>;

  const localState$: Stream<LocalState> = modifier$.fold((state, mod) => mod(state), initState);
  const state$: Stream<State> = xs.combine<Props, LocalState>(props$, localState$).map(([props,ls]) => {
    return { ...ls, ...props,
      dataSource: ls.activeSource.map(act => props.sources[act]),
    };
  }).debug();

  const collector$ = collector(state$, cycleSources);
  const collectorVdom$: Stream<VNode | VNode[]> = collector$.map(c => c.DOM).flatten();
  const collectorValue$: Stream<{[k: string]: string}> = collector$.map(c => c.value).flatten();

  const chartVdom$ = xs.combine(state$, collectorValue$, dimensions$)
    .map(([state, cValue, dimensions]) => go(function* () {
      const dataSource = yield state.dataSource;
      const chartType = yield state.chartType;
      const chartDef = chartDefs[chartType];
      return chartDef.fn(dataSource, cValue, dimensions);
    }).withDefault([]))

  const dom$ = xs.combine(state$, collectorVdom$, chartVdom$)
    .map(args => <VNode | null>view(args[0], args[1], args[2]))
    .startWith(null);

  return {
    DOM: dom$,
  };
}


function intent(DOM) {
  const tv = ev => ev.target.value;
  return {
    chartType$: DOM.select('.chart-type').events('change').map(tv).startWith('').map(v => v ? v : null),
    changeRoot$: DOM.select('select.root-source').events('change').map(tv).map(v => v ? parseFloat(v) : null)
  };
}


function view(state: State, collectorVdom, chartVdom) {
  const chartOptions = ['', ...Object.keys(chartDefs).sort()].map(name =>
    option({ attrs: { value: name, selected: state.chartType.withDefault('') === name }}, name));

  return div('.main-container', [
    aside([
      div('.root-datasource', {}, [
        h2({}, 'Root DataSource'),
        // select('.root-source', indexedOptions(state.sources.map(s => s.name), state.rootSource.withDefault(null)))
        select('.root-source', indexedOptions(state.sources.map(s => s.name), null))
      ]),
      div('.collector.editing', flatten([
        div('.slot', flatten([
          h3({}, 'Chart Type'),
          select('.chart-type', {}, chartOptions),
        ])),
        [collectorVdom]
      ])),
    ]),

    main(chartVdom),
  ])
}

function collector(state$: Stream<State>, cycleSources): Stream<{DOM: Stream<any>, value: Stream<any>}> {
  const emptyCollector = { DOM: xs.of([]), value: xs.of({}) };

  return state$.map(state =>
    state.dataSource.map(dataSource =>
      state.chartType.map(chartType => {
        console.log({ chartDefs, chartType })
        const { slots } = chartDefs[chartType];
        return SlotCollector({ slots }, dataSource, {})(cycleSources);
      }).withDefault(emptyCollector)
    ).withDefault(emptyCollector)
  );
}


// const update = Action.caseOn({
//   SetType: (type, model) => {
//     const slots = R.pathOr([], [type, 'slots'], CHARTS);
//     const inputs = R.pipe( // TODO: no stringly typed crap
//       R.map(s => ({[s.id]: s['@@tag'] === 'Multicolumn' ? [] : ''})),
//       R.mergeAll
//     )(slots);

//     return R.merge(model, {type, inputs});
//   },
//   SetInput: (slotName, val, model) => {
//     return R.assocPath(['inputs', slotName], val, model)
//   }
// });


// const view = R.curry((action$, {dimensions, dataset}, model) => {
//   const slots = R.pathOr([], [model.type, 'slots'], CHARTS);

//   const action = slot => forwardTo(action$, Action.SetInput(slot.id));
//   const typePool = R.map(t => ({ value: t, display: t }), R.keys(CHARTS));
//   const toCollector = s => SlotCollector(
//     action(s),
//     s.toSlot(dataset),
//     model.inputs[s.id]
//   );

//   return h('div', {class: {"main-container": true}}, [
//     h('aside', {}, [
//       h('div', {class: {"form": true}}, R.flatten([
//         SlotCollector(
//           forwardTo(action$, Action.SetType),
//           Slot.Pool('chartType', 'Chart Type', DataType.String, typePool),
//           model.type
//         ),

//         R.map(toCollector, slots)
//       ]))
//     ]),

//     h('main', {},
//       R.has(model.type, CHARTS) ?
//         CHARTS[model.type].fn(dataset, model.inputs, dimensions) :
//         []
//     )
//   ])
// });


// module.exports = { Action, init, update, view };
