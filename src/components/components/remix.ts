import { aside, div, main as main_, span, select, h2, button, option, h3, input } from '@cycle/dom';
import { mergeArray, combine, Stream, combineArray } from 'most';
import { append, lensPath, lensProp, over, set } from 'ramda';
import { DataSource, StateModifier, OperationSlot } from '../../types';
import { merge, eq, sortBy, sortWith, inlineKey, flatten, setIn, mapObj } from '../../lib/utils';
import Grid from './grid';
import { indexedOptions, targetValue } from '../../lib/dom-utils';
import operationDefs from '../../operations';


interface LocalState {
  operations: OperationItem[],
  rootSource: number | null,
}

interface Props {
  sources: DataSource[]
}

interface State extends LocalState, Props {};

interface OperationItem {
  operation: string | null,
  slots: {[k in string]: string},
  editing: boolean,
}

const initOperation: OperationItem = { operation: null, slots: {}, editing: true };
const initState: LocalState = { rootSource: null, operations: [] };

const slotDispatch = {
  free: freeSlotMarkup,
  column: columnSlotMarkup,
};

export default function main(cycleSources) {
  const { props: props$, DOM } = cycleSources;
  const { changeRoot$, newOperation$, setOperation$ } = intent(DOM);

  const stateModifiers$: StateModifier<LocalState> = mergeArray([
    changeRoot$.map(setIn(['rootSource'])),
    newOperation$.constant(over(lensProp('operations'), append(initOperation))),
    setOperation$.map(({opId, value}) => set(lensPath(['operations', opId, 'operation']), value)),
  ]);

  const localState$: Stream<LocalState> = stateModifiers$.scan((state, mod) => mod(state), initState).tap(console.log);
  const state$ = combine<Props, LocalState, State>(merge, props$, localState$).skipRepeatsWith(eq);

  const sourceOrNull = s => ({ source: (s.rootSource === null) ? null : s.sources[s.rootSource] });
  const grid = Grid({ DOM: DOM, props: state$.map(sourceOrNull) });
  const gridDom$ = grid.DOM;

  return {
    DOM: combineArray(view, [state$, gridDom$]),
  };
}


function intent(DOM) {
  return {
    changeRoot$: DOM.select('select.root-source').events('change').map(targetValue).map(parseFloat),
    newOperation$: DOM.select('.new-operation-button').events('click'),
    setOperation$: DOM.select('.operation-id').events('change').map(ev =>
      ({ value: ev.target.value, opId: parseFloat(ev.target.dataset.operationId) })
    ),
  }
}


function view(state: State, gridDom) {
  const operationsList = state.operations.map((op, idx) =>
    op.editing ? editingOperation(op, idx) : displayOperation(op)
  )

  return div({class: {"main-container": true}}, [
    aside({}, [
      div('.root-datasource', {}, [
        h2({}, 'Root DataSource'),
        select({ class: { "root-source": true }}, indexedOptions(state.sources.map(s => s.name), state.rootSource))
      ]),
      div('.remix-controls', {}, [
        div('.operations-menu', {}, flatten([
          operationsList,
          div('.new-operation-button', {}, "New Operation")
        ]))
      ])
    ]),

    main_({}, [
      gridDom
    ])
  ]);
}


function editingOperation(op, idx) {
  const opOpts = sortWith(od => od.name, inlineKey(operationDefs))
    .map(od => option({ attrs: { value: od.key }}, od.name));
  const opDef = op.operation ? operationDefs[op.operation] : null;
  console.log({ op, opDef, operationDefs })

  const opMarkup = div('.slot', {}, [
    h3({}, "Operation"),
    select('.operation-id', { dataset: { operationId: idx.toString() }}, [option({}, '')].concat(opOpts))
  ])

  const slotMarkup = opDef ?
    Object.values(mapObj(opDef.slots, (s, sid) => {
      console.log({ s, sid, idx })
      return slotDispatch[s.slotType](s, sid, idx)
    })) :
    [];

  return div('.collector.empty', {}, [opMarkup].concat(slotMarkup));
}


function freeSlotMarkup(slot: OperationSlot<any>, slotId: string, opId: string) {
  return div('.slot', {}, [
    h3({}, slot.display),
    input('.slot-input', { type: 'text', dataset: { slotId, operationId: opId }})
  ]);
}


function columnSlotMarkup(slot: OperationSlot<any>, slotId: string, opId: string) {
  return div('.slot', {}, [
    h3({}, slot.display),
    select('.slot-input', { dataset: { slotId, operationId: opId }}, [

    ])
  ]);
}


function displayOperation(op) {
  console.log({op, operationDefs});
  return "";
}
