import xs, { Stream } from 'xstream'
import sampleCombine from 'xstream/extra/sampleCombine'
import { div, button, option, h3, select, input, VNode, span } from '@cycle/dom';
import { lensPath, set, values } from 'ramda';
import { DataSource, StateModifier, OperationSlot, Operation, DataColumn } from '../../types';
import { Maybe } from '../../lib/maybe';
import { eq, inlineKey, go, sortWith, mapObj, flatten } from '../../lib/utils';
import operationDefs from '../../operations';
import { applyOperation } from '../../lib/data-functions';
import Multiselect from './multiselect';

type Obj = {[k: string]: string};
interface LocalState {
  operation: Maybe<string>,
  inputs: Obj,
  editing: boolean,
  savedValue: Maybe<Obj>
}

interface Props {
  source: Maybe<DataSource>
}

const initState: LocalState = {
  operation: Maybe.Nothing<string>(),
  inputs: {},
  editing: true,
  savedValue: Maybe.Nothing<Obj>(),
};

const slotDispatch = {
  free: freeSlotMarkup,
  column: columnSlotMarkup,
  multicolumn: multicolumnSlotMarkup,
};

const iconTags = [
  'deriver',
  'filter',
  'grouping',
  'aggregator'
];


export default function main(cycleSources) {
  const { DOM, chain$ } = cycleSources;
  const { save$, cancel$, edit$, apply$, updateInput$, setOperation$, removePress$ } = intent(DOM);

  const stateModifiers$ = xs.merge(
    setOperation$.map(operation => state => ({...state,
      operation: Maybe.fromValue(operation),
    })),
    updateInput$.map(({ value, slot }) => set(lensPath(['inputs', slot]), value)),
    save$
      .filter(_ => valid)
      .mapTo(state => ({...state, editing: false, savedValue: Maybe.of(state.inputs) })),
    edit$.mapTo(state => ({...state, editing: true })),
    cancel$
      .filter(_ => state => !state.savedValue.isNothing())
      .mapTo(state => ({ ...state, editing: false, inputs: state.savedValue.withDefault({})}))
  ) as StateModifier<LocalState>;

  const localState$: Stream<LocalState> = stateModifiers$.fold((state, mod) => mod(state), initState);
  const state$ = xs.combine<LocalState, Maybe<DataSource>>(localState$, chain$);

  // basis of what the outside sees
  const activeState$ = xs.merge(save$, apply$)
    .compose(sampleCombine(localState$))
    .map(([_, ls]) => ls)
    .debug()
    .filter(valid)
    .map(Maybe.of)
    .startWith(Maybe.Nothing<LocalState>());

  const cancelRemove$ = cancel$
    .compose(sampleCombine(localState$))
    .filter(([_, ls]) => ls.savedValue.isNothing());

  const nextDataSource = (mSource: Maybe<DataSource>, mActiveState: Maybe<LocalState>) => go(function* (){
    const activeState: LocalState = yield mActiveState;
    const op = yield activeState.operation;
    const opDef: Operation = operationDefs[op];
    const src: DataSource = yield mSource;
    return applyOperation(src, opDef, activeState.inputs);
  });

  const dataSource$ = xs.combine<Maybe<DataSource>, Maybe<LocalState>>(chain$, activeState$).map(([a,b]) => nextDataSource(a, b))
    .startWith(Maybe.Nothing<DataSource>());

  return {
    DOM: state$.map(args => view(args[0], args[1])).startWith(div('')),
    value: activeState$,
    dataSource: dataSource$,
    remove$: xs.merge(removePress$, cancelRemove$),
  };
}


function intent(DOM) {
  return {
    save$: DOM.select('.collector .save').events('click'),
    apply$: DOM.select('.collector .apply').events('click'),
    cancel$: DOM.select('.collector .cancel').events('click'),
    edit$: DOM.select('.collector .edit').events('click'),
    removePress$: DOM.select('.collector .remove').events('click'),
    setOperation$: DOM.select('.operation-id').events('change').map(ev => ev.target.value),
    updateInput$: DOM.select('.slot-input').events('change')
      .map(ev => ({ value: ev.target.value, slot: ev.target.dataset.slotId })),
  }
}


function view(state: LocalState, mSource: Maybe<DataSource>, DOM) {
  if (state.editing) { return viewEdit(state, mSource, DOM); }

  const def = state.operation.map(o => operationDefs[o]).withDefault(null);
  const source = mSource.withDefault(null);
  if (!def || !source) { return []; }

  const icon = `collector-${def.tags.find(t => iconTags.includes(t)) || 'generic'}`;

  return div({class: {collector: true, [icon]: true}}, [
    div({class: {definition: true}}, def.display(source, state.inputs)),
    div({class: {controls: true}}, [
      span('.edit', ''),
      span('.remove', '')
    ])
  ]);

}


function viewEdit(state: LocalState, source: Maybe<DataSource>, DOM) {
  const { operation } = state;
  const opOpts = sortWith(od => od.name, inlineKey(operationDefs))
    .map(od => option({ attrs: { value: od.key, selected: operation.withDefault('') === od.key }}, od.name));

  const slots = operation.map(o => operationDefs[o]).map(o => o.slots).withDefault({});

  const opMarkup = div('.slot', {}, [
    h3({}, "Operation"),
    select('.operation-id', {}, [option({}, '')].concat(opOpts))
  ]);

  const slotMarkup = values(mapObj(slots, (s, sid) => {
    return slotDispatch[s.slotType](s, sid, state.inputs[sid], source, DOM);
  }));

  return div('.collector.editing', {}, flatten([
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


function freeSlotMarkup(slot: OperationSlot<any>, slotId: string, value: string) {
  return div('.slot', {}, [
    h3({}, slot.display),
    input('.slot-input', {
      attrs: { type: 'text', required: true },
      props: { value },
      dataset: { slotId }
    })
  ]);
}


function columnSlotMarkup(slot: OperationSlot<any>, slotId: string, value: string, mSource: Maybe<DataSource>) {
  const emptyCol = option({ attrs: { value: '' }}, '');
  const colRed = (acc: VNode[], col: DataColumn, idx: number) => col.hasType(slot.type) ?
    [...acc, option({ attrs: { value: idx, selected: (value === idx.toString()) }}, col.name)] :
    acc;

  const relevantColumns = mSource.map(source => source.columns.reduce(colRed, [emptyCol]));

  return div('.slot', {}, [
    h3({}, slot.display),
    select('.slot-input', { dataset: { slotId }}, relevantColumns.withDefault([emptyCol]))
  ]);
}


function multicolumnSlotMarkup(slot: OperationSlot<any>, slotId: string, value: string[], mSource: Maybe<DataSource>, DOM) {
  return div('.slot', {}, [
    h3({}, slot.display),
    Multiselect()
  ])
}



function valid(state: LocalState): boolean {
  if (state.operation.isNothing()) { return false; }

  const slots = state.operation.map(o => operationDefs[o]).map(o => o.slots).withDefault({});

  return eq(Object.keys(slots), Object.keys(state.inputs));
}

