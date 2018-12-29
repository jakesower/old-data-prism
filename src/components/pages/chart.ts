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
  rootSource: Maybe<string>,
  chartType: Maybe<string>,
}

interface Props {
  sources: DataSource[],
}

interface State extends LocalState, Props {
}

const initState: LocalState = {
  rootSource: Maybe.Nothing(),
  chartType: Maybe.Nothing(),
}

export default function ChartComponent(cycleSources) {
  const { props: props$, DOM, dimensions: dimensions$, remixSource: remixSource$ } = cycleSources;
  const { changeRoot$, chartType$ } = intent(DOM);

  const modifier$: StateModifier<LocalState> = xs.merge(
    changeRoot$.map(root => state => ({ ...state, rootSource: Maybe.fromValue(root) })),
    chartType$.map(chartType => state => ({ ...state, chartType: Maybe.fromValue(chartType) })),
  ) as StateModifier<LocalState>;

  const localState$: Stream<LocalState> = modifier$.fold((state, mod) => mod(state), initState);
  const state$: Stream<State> = xs.combine<Props, LocalState>(props$, localState$).map(([props, ls]) => {
    return { ...ls, ...props };
  });

  const activeSource$: Stream<Maybe<DataSource>> = state$
    .map(state =>
      state.rootSource.hasValue('remix') ?
        remixSource$ :
        xs.of(state.rootSource.chain(rs => Maybe.fromValue(state.sources.find(s => s.fingerprint === rs))))
    )
    .flatten();


  const collector$ = collector(state$, activeSource$, cycleSources);
  const collectorVdom$: Stream<VNode | VNode[]> = collector$.map(c => c.DOM).flatten();
  const collectorValue$: Stream<{[k: string]: string}> = collector$.map(c => c.value).flatten();

  const chartVdom$ = xs.combine(state$, collectorValue$, dimensions$, activeSource$)
    .map(([state, cValue, dimensions, mActiveSource]) => go(function* () {
      const dataSource = yield mActiveSource;
      const chartType = yield state.chartType;
      const chartDef = chartDefs[chartType];
      return chartDef.fn(dataSource, cValue, dimensions);
    }).withDefault([]))

  const dom$ = xs.combine(state$, activeSource$, collectorVdom$, chartVdom$)
    .map(args => <VNode | null>view(args[0], args[1], args[2], args[3]))
    .startWith(null);

  return {
    DOM: dom$,
  };
}


function intent(DOM) {
  const tv = ev => ev.target.value;
  return {
    chartType$: DOM.select('.chart-type').events('change').map(tv).startWith('').map(v => v ? v : null),
    changeRoot$: DOM.select('select.root-source').events('change').map(tv)
  };
}


function view(state: State, remixSource: Maybe<DataSource>, collectorVdom, chartVdom) {
  const remixOption = remixSource.map(_ =>
    [option({ attrs: { value: "remix", select: state.rootSource.hasValue("remix") }}, "(remix source)")]
  ).withDefault([]) as VNode[];

  const sourceOptions = [option({ attrs: { value: "", select: state.rootSource.isNothing() }})].concat(
    remixOption.concat(
    state.sources.map(s => option(
      { attrs: { value: s.fingerprint, selected: state.rootSource.hasValue(s.fingerprint) }},
      s.name
    ))
  ));

  const chartOptions = ['', ...Object.keys(chartDefs).sort()].map(name =>
    option({ attrs: { value: name, selected: state.chartType.withDefault('') === name }}, name));

  return div('.main-container', [
    aside([
      div('.root-datasource', {}, [
        h2({}, 'Root DataSource'),
        // select('.root-source', indexedOptions(state.sources.map(s => s.name), state.rootSource.withDefault(null)))
        select('.root-source', sourceOptions)
      ]),
      state.rootSource.map(_ => div('.collector.editing', flatten([
        div('.slot', flatten([
          h3({}, 'Chart Type'),
          select('.chart-type', {}, chartOptions),
        ])),
        [collectorVdom]
      ]))).withDefault(null),
    ]),

    main(chartVdom),
  ])
}

function collector(state$: Stream<State>, activeSource$: Stream<Maybe<DataSource>>, cycleSources): Stream<{DOM: Stream<any>, value: Stream<any>}> {
  const emptyCollector = { DOM: xs.of([]), value: xs.of({}) };

  return xs.combine(state$, activeSource$).map(([state, activeSource]) =>
    activeSource.map(dataSource =>
      state.chartType.map(chartType => {
        const { slots } = chartDefs[chartType];
        return SlotCollector({ slots }, dataSource, {})(cycleSources);
      }).withDefault(emptyCollector)
    ).withDefault(emptyCollector)
  );
}
