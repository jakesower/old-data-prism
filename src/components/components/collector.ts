import xs, { Stream } from 'xstream'
import sampleCombine from 'xstream/extra/sampleCombine'
import { div, button, option, h3, select, input, VNode, span, map } from '@cycle/dom';
import { lensPath, set, values } from 'ramda';
import { DataSource, StateModifier, OperationSlot, Operation, DataColumn, Component, StreamObj } from '../../types';
import { Maybe } from '../../lib/maybe';
import { eq, inlineKey, go, sortWith, mapObj, flatten, merge, mergeAll } from '../../lib/utils';
import operationDefs from '../../operations';
import { applyOperation } from '../../lib/data-functions';
import { sampleWith } from '../../lib/stream-utils';

type StrObj = {[k: string]: string};

interface LocalState {
  operation: Maybe<string>,
  editing: boolean,
  savedValue: Maybe<object>,
  inputs: StrObj,
}

interface State extends LocalState {
  dataSource: Maybe<DataSource>,
}

const initState: LocalState = {
  operation: Maybe.Nothing<string>(),
  editing: true,
  savedValue: Maybe.Nothing<object>(),
  inputs: {},
};

const iconTags = [
  'deriver',
  'filter',
  'grouping',
  'aggregator'
];

// PELIGRO! This is a big jungle of Maybe handling
export default function main(cycleSources: { DOM: any, chain$: Stream<Maybe<DataSource>> }) {
  const { DOM, chain$ } = cycleSources;
  const collectorValueProxy$: any = xs.create();

  // STATE MODIFIERS
  //
  const { save$, cancel$, edit$, apply$, setOperation$, removePress$ } = intent(DOM);
  const stateModifiers$: StateModifier<LocalState> = xs.merge(
    setOperation$.map(operation => state => ({...state,
      operation: Maybe.fromValue(operation),
    })),
    edit$.mapTo(state => ({...state, editing: true })),
    cancel$
      .filter(_ => state => !state.savedValue.isNothing())
      .mapTo(state => ({ ...state, editing: false, inputs: state.savedValue.withDefault({})})),
    collectorValueProxy$ // activated upon save
      .debug(i => console.log({inputs: i}))
      .filter(_ => valid)
      .map(inputs => state => ({ ...state, inputs, savedValue: Maybe.of(inputs), editing: false }))
  ) as StateModifier<LocalState>;

  const localState$: Stream<LocalState> = stateModifiers$.fold((state, mod) => mod(state), initState);


  // SECONDARY STREAMS
  //
  const collector$ = collector(localState$, DOM, chain$);
  const collectorVdom$: Stream<VNode | VNode[]> = collector$.map(c => c.DOM).flatten();
  const collectorValue$: Stream<{[k: string]: string}> = collector$.map(c => c.value).flatten();
  const collectorValueSnapshot$ = collectorValue$.compose(sampleWith(save$));

  collectorValueProxy$.imitate(collectorValueSnapshot$);

  const state$: Stream<State> = xs.combine<LocalState, Maybe<DataSource>>(localState$, chain$)
    .map(([a,b]) => Object.assign({}, a, { dataSource: b }))
    .startWith({...initState, dataSource: Maybe.Nothing<DataSource>(), inputs: {} });


  // EXTERNAL STREAMS
  //
  const value$ = state$
    .compose(sampleWith(xs.merge(save$, apply$)))
    .filter(valid)
    .map(Maybe.of)
    .startWith(Maybe.Nothing());

  const dataSource$ = state$
    .compose(sampleWith(xs.merge(save$, apply$)))
    .filter(valid)
    .map(nextDataSource)
    .startWith(Maybe.Nothing());

  const dom$ = xs.combine(state$, collectorVdom$)
    .map(args => view(args[0], args[1]));

  const cancelRemove$ = cancel$
    .compose(sampleCombine(localState$))
    .filter(([_, ls]) => ls.savedValue.isNothing());

  return {
    DOM: dom$,
    value: value$.debug(v => console.log({value$: v})),
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
  }
}


function view(state: State, collectorMarkup: VNode | VNode[]) {
  console.log({ state, collectorMarkup });
  if (state.editing) { return viewEdit(state, collectorMarkup); }

  const def = state.operation.map(o => operationDefs[o]).withDefault(null);
  const dataSource = state.dataSource.withDefault(null);
  if (!def || !dataSource) { return <VNode[]>[]; }

  const icon = `collector-${def.tags.find(t => iconTags.includes(t)) || 'generic'}`;

  return div({class: {collector: true, [icon]: true}}, [
    div({class: {definition: true}}, def.display(dataSource, state.inputs)),
    div({class: {controls: true}}, [
      span('.edit', ''),
      span('.remove', '')
    ])
  ]);

}


function viewEdit(state: LocalState, collectorMarkup: VNode | VNode[]): VNode {
  const { operation } = state;
  const opOpts = sortWith(od => od.name, inlineKey(operationDefs))
    .map(od => option({ attrs: { value: od.key, selected: operation.withDefault('') === od.key }}, od.name));

  const opMarkup = div('.slot', {}, [
    h3({}, "Operation"),
    select('.operation-id', {}, [option({}, '')].concat(opOpts))
  ]);

  return div('.collector.editing', {}, flatten([
    [opMarkup],
    collectorMarkup,
    [
      div('.collector-controls', {}, [
        button('.save', {}, 'Save'),
        button('.apply', {}, 'Apply'),
        button('.cancel', {}, 'Cancel'),
      ])
    ]
  ]));
}


function valid(state: State): boolean {
  if (state.operation.isNothing()) { return false; }

  const slots = state.operation
    .map(o => operationDefs[o].slots)
    .withDefault({});

  return eq(Object.keys(slots), Object.keys(state.inputs));
}


function collector(localState$: Stream<LocalState>, DOM, dataSource): Stream<{DOM: Stream<any>, value: Stream<any>}> {
  const emptyCollector = { DOM: xs.of([]), value: xs.of({}) };

  return localState$.map(localState =>
    localState.operation
      .map(op => {
        const opDef: Operation = operationDefs[op];
        return opDef.collector(opDef)({ DOM, dataSource, inputs: localState.inputs });
      })
      .withDefault(emptyCollector)
  );
}


function nextDataSource(state: State): Maybe<DataSource> {
  return go(function* () {
    const op = yield state.operation;
    const opDef: Operation = operationDefs[op];
    const src: DataSource = yield state.dataSource;
    return applyOperation(src, opDef, state.inputs);
  });
}
