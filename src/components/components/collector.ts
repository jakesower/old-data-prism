import { div, button, option, h3, select, input } from '@cycle/dom';
import { Stream, mergeArray, combine } from 'most';
import { lensPath, set, values } from 'ramda';
import { DataSource, StateModifier, OperationSlot, Operation } from '../../types';
import { Maybe } from '../../lib/maybe';
import { merge, eq, inlineKey, go, sortWith, mapObj, flatten } from '../../lib/utils';
import { indexedOptions, targetValue } from '../../lib/dom-utils';
import operationDefs from '../../operations';
import { applyOperation } from '../../lib/data-functions';


interface LocalState {
  operation: Maybe<string>,
  inputs: {[k in string]: string},
  editing: boolean,
}

interface Props {
  source: Maybe<DataSource>
}

const initState: LocalState = { operation: Maybe.Nothing<string>(), inputs: {}, editing: true };

const slotDispatch = {
  free: freeSlotMarkup,
  column: columnSlotMarkup,
};

export default function main(cycleSources) {
  const { DOM, chain$ } = cycleSources;
  const { save$, cancel$, apply$, updateInput$, setOperation$ } = intent(DOM);

  const stateModifiers$: StateModifier<LocalState> = mergeArray([
    setOperation$.map(operation => state => ({...state,
      operation: Maybe.fromValue(operation),
    })),
    updateInput$.map(({ value, slot }) => set(lensPath(['inputs', slot]), value)),
  ]);

  const localState$: Stream<LocalState> = stateModifiers$.scan((state, mod) => mod(state), initState);
  const state$ = combine<Props, LocalState, Props&LocalState>(merge, chain$, localState$).tap(b => console.log({b}));

  // basis of what the outside sees
  const activeState$ = localState$
    .sampleWith(mergeArray([save$, apply$]))
    .filter(valid)
    .map(Maybe.of)
    .startWith(Maybe.Nothing<LocalState>());

  const nextDataSource = (mSource: {source: Maybe<DataSource>}, mActiveState: Maybe<LocalState>) => go(function* (){
    const activeState: LocalState = yield mActiveState;
    const op = yield activeState.operation;
    const opDef: Operation = operationDefs[op];
    const src: DataSource = yield mSource.source;
    return applyOperation(src, opDef, activeState.inputs);
  });

  const dataSource$ = combine(nextDataSource, chain$, activeState$)
    .startWith(Maybe.Nothing<DataSource>());

  activeState$.observe(console.log)
  apply$.observe(console.log)
  dataSource$.observe(console.log)

  return {
    DOM: state$.map(view).startWith(div('')),
    value: activeState$,
    dataSource: dataSource$,
  };
}


function intent(DOM) {
  return {
    save$: DOM.select('.collector .save').events('click'),
    apply$: DOM.select('.collector .apply').events('click'),
    cancel$: DOM.select('.collector .cancel').events('click'),
    setOperation$: DOM.select('.operation-id').events('change').map(ev => ev.target.value),
    updateInput$: DOM.select('.slot-input').events('change')
      .map(ev => ({ value: ev.target.value, slot: ev.target.dataset.slotId })).tap(console.log)
  }
}


function view(state: LocalState & Props) {
  const { operation, source } = state;
  const opOpts = sortWith(od => od.name, inlineKey(operationDefs))
    .map(od => option({ attrs: { value: od.key, selected: operation.withDefault('') === od.key }}, od.name));

  const slots = operation.map(o => operationDefs[o]).map(o => o.slots).withDefault({});

  const opMarkup = div('.slot', {}, [
    h3({}, "Operation"),
    select('.operation-id', {}, [option({}, '')].concat(opOpts))
  ]);

  const slotMarkup = values(mapObj(slots, (s, sid) => {
    return slotDispatch[s.slotType](s, sid, source);
  }));

  return div('.collector', {}, flatten([
    [opMarkup],
    slotMarkup,
    [
      div('.collector-controls', {}, [
        button('.save', {}, 'Save'),
        button('.apply', {}, 'Apply'),
        button('.cancel', {}, 'Cancel'),
      ])
    ]
  ]));
}


function freeSlotMarkup(slot: OperationSlot<any>, slotId: string) {
  return div('.slot', {}, [
    h3({}, slot.display),
    input('.slot-input', { attrs: { type: 'text', required: true }, dataset: { slotId }})
  ]);
}


function columnSlotMarkup(slot: OperationSlot<any>, slotId: string, mSource: Maybe<DataSource>) {
  const emptyCol = option({ attrs: { value: '' }}, '');
  const colRed = (acc, col, idx) => col.hasType(slot.type) ?
    [...acc, option({ attrs: { value: idx }}, col.name)] :
    acc;

  const relevantColumns = mSource.map(source => source.columns.reduce(colRed, [emptyCol]));

  return div('.slot', {}, [
    h3({}, slot.display),
    select('.slot-input', { dataset: { slotId }}, relevantColumns.withDefault([emptyCol]))
  ]);
}


function displayOperation(op) {
  console.log({op, operationDefs});
  return "";
}


function valid(state: LocalState): boolean {
  if (state.operation.isNothing()) { return false; }

  const slots = state.operation.map(o => operationDefs[o]).map(o => o.slots).withDefault({});

  return eq(Object.keys(slots), Object.keys(state.inputs));
}

