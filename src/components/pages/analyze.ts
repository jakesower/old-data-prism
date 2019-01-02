import xs, { Stream } from 'xstream';
import delay from 'xstream/extra/delay';
import { aside, div, main as main_, select, h2, VNode, input, button, map, h3, table, tr, td, th, option } from '@cycle/dom';
import { ChainedCollection, pluck as pl} from '../../lib/chained-collection';
import { DataSource, StateModifier, makeDataSource, DataColumn } from '../../types';
import { merge, flatten, last, upperTriangularMatrixMap, round, reflectUTMatrix, zipWith, go } from '../../lib/utils';
import { Maybe } from '../../lib/maybe';
import Grid from '../components/grid';
import Collector from '../components/collector';
import { indexedOptions, targetValue } from '../../lib/dom-utils';
import { sampleWith } from '../../lib/stream-utils';
import dataTypes from '../../lib/data-types';
import { LinearRegression } from '../../analyses';
import { plot } from '../charts/scatter';
import { Point, IPoint } from '../charts/shapes';


interface LocalState {
  rootSource: Maybe<string>,
  activePair: Maybe<[number, number]>
}

interface Props {
  sources: DataSource[]
}

interface State extends LocalState, Props {};
type ColPair = [DataColumn[], (number|null)[][]];

const initState: LocalState = {
  rootSource: Maybe.Nothing(),
  activePair: Maybe.Nothing(),
};


export default function main(cycleSources) {
  const { props: props$, DOM, dimensions: dimensions$, remixSource: remixSource$ } = cycleSources;
  const { changeRoot$, changeActivePair$ } = intent(DOM);

  const stateModifiers$ = xs.merge(
    changeRoot$.map(source => state => ({...state,
      rootSource: Maybe.fromValue(source),
    })),
    changeActivePair$.map(coords => state => ({ ...state, activePair: Maybe.of(coords) })),
  ) as StateModifier<LocalState>;

  const localState$: Stream<LocalState> = stateModifiers$.fold((state, mod) => mod(state), initState);
  const state$ = xs.combine<Props, LocalState>(props$, localState$).map(([a,b]) => merge(a,b));
  const activeSource$: Stream<Maybe<DataSource>> = state$
    .map(state =>
      state.rootSource.hasValue('remix') ?
        remixSource$ :
        xs.of(state.rootSource.chain(rs => Maybe.fromValue(state.sources.find(s => s.fingerprint === rs))))
    )
    .flatten();

  const grid$ = activeSource$
    .map(mActiveSource =>
      mActiveSource.chain(activeSource => {
        const numerics = activeSource.columns.filter(c => c.hasType(dataTypes.Number));
        const numNumerics = numerics.length;
        if (numNumerics < 2) { return Maybe.Nothing(); }
        const numericVals = numerics.map(n => n.values.map(dataTypes.Number.cast));

        return Maybe.of([
          numerics,
          reflectUTMatrix(upperTriangularMatrixMap(numericVals, numericVals, LinearRegression.fn, null, false))
        ]);
      }) as Maybe<ColPair>
    )
    .startWith(Maybe.Nothing())

  return {
    DOM: xs.combine<State, Maybe<ColPair>, any>(state$, grid$, remixSource$).map(a => view(a[0], a[1], a[2])),
  };
}


function intent(DOM) {
  return {
    changeRoot$: DOM.select('select.root-source').events('change').map(targetValue).map(v => v || null),
    changeActivePair$: DOM.select('.correlation-grid, td')
      .events('click')
      .map(ev => [parseFloat(ev.target.dataset.row), parseFloat(ev.target.dataset.col)]),
  }
}


function view(state: State, grid: Maybe<ColPair>, remixSource: Maybe<DataSource>) {
  const mPts = extractPoints(state, grid);

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

  return div('.main-container', [
    aside({}, [
      div('.root-datasource', {}, [
        h2({}, 'Root DataSource'),
        select('.root-source', sourceOptions)
      ]),
    ]),

    main_({}, [
      grid.map(numberGrid).withDefault(null),
      mPts.map(pts =>
        div('.chart-container',
          { attrs: {style: "height: 500px; width: 500px;" }},
          plot(pts, { height: 500, width: 500 })
        ),
      ).withDefault(null),
    ]),
  ]);
}


function numberGrid(colPair: ColPair) {
  const [cols, matrix] = colPair;

  return table('.correlation-grid', flatten([
    tr(flatten([th(''), cols.map(c => th(c.name))])),
    matrix.map((row, i) => tr(flatten([
      th(cols[i].name),
      row.map((cell, j) => (
        td('.numeric', { dataset: { row: i.toString(), col: j.toString() }}, cell ? round(cell, -2) : "—")
      ))])
    ))
  ]));
}


function extractPoints(state: State, mGrid: Maybe<ColPair>): Maybe<IPoint[]> {
  return go(function* () {
    const grid = yield mGrid;
    const activePair: [number, number] = yield state.activePair;
    const cols: DataColumn[] = grid[0];

    const fst = activePair[0];
    const snd = activePair[1];
    return zipWith(
      (x,y) => Point(parseFloat(x), parseFloat(y)),
      cols[fst].values, cols[snd].values
    );
  });
}
