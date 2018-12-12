import xs, { Stream } from 'xstream'
import sampleCombine from 'xstream/extra/sampleCombine'
import { div, button, option, h3, select, VNode, span } from '@cycle/dom';
import { DataSource, StateModifier } from '../../types';
import { Maybe } from '../../lib/maybe';
import { inlineKey, go, sortWith, flatten } from '../../lib/utils';
import operationDefs, { OperationType } from '../../operations';
import { sampleWith } from '../../lib/stream-utils';

type StrObj = {[k: string]: string};

interface LocalState {
  operation: Maybe<string>,
  editing: boolean,
  savedValue: Maybe<object>,
  inputs: StrObj,
  showErrors: boolean,
}

interface State extends LocalState {
  dataSource: Maybe<DataSource>,
}

const initState: LocalState = {
  operation: Maybe.Nothing<string>(),
  editing: true,
  savedValue: Maybe.Nothing<object>(),
  inputs: {},
  showErrors: false,
};

const iconTags = [
  'deriver',
  'filter',
  'grouping',
  'aggregator'
];


export default function main(cycleSources: { DOM: any, chain$: Stream<Maybe<DataSource>>, props: any }) {
  const { DOM, chain$ } = cycleSources;
  const collectorValueApplyProxy$: any = xs.create();
  const collectorValueSaveProxy$: any = xs.create();

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
    collectorValueApplyProxy$
      .filter(_ => valid)
      .map(inputs => state => ({ ...state, inputs })),
    collectorValueSaveProxy$
      .filter(_ => valid)
      .map(inputs => state => ({ ...state, inputs, editing: false, savedValue: Maybe.of(inputs) })),
    // xs.merge(collectorValueApplyProxy$, collectorValueSaveProxy$)
    //   .filter(_ => state => !valid(state))
    //   .mapTo(state => ({ ...state, showErrors: true })),
  ) as StateModifier<LocalState>;

  const localState$: Stream<LocalState> = stateModifiers$.fold((state, mod) => mod(state), initState);


  // SECONDARY STREAMS
  //
  const collector$ = collector(localState$, DOM, chain$, cycleSources.props);
  const collectorVdom$: Stream<VNode | VNode[]> = collector$.map(c => c.DOM).flatten();
  const collectorValue$: Stream<{[k: string]: string}> = collector$.map(c => c.value).flatten();
  const collectorValueApply$ = collectorValue$.compose(sampleWith(apply$));
  const collectorValueSave$ = collectorValue$.compose(sampleWith(save$));

  collectorValueApplyProxy$.imitate(collectorValueApply$);
  collectorValueSaveProxy$.imitate(collectorValueSave$);

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
    value: value$,
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
  return go(function* (){
    const op = yield state.operation;
    const opDef: OperationType = operationDefs[op];
    const src: DataSource = yield state.dataSource;
    return opDef.valid(src, state.inputs);
  }).withDefault(false);
}


function collector(localState$: Stream<LocalState>, DOM, dataSource$: Stream<Maybe<DataSource>>, props): Stream<{DOM: Stream<any>, value: Stream<any>}> {
  const emptyCollector = { DOM: xs.of([]), value: xs.of({}) };
  const noDataSourceCollector = { DOM: xs.of(div('hi')), value: xs.of({}) };

  return xs.combine(localState$, dataSource$)
    .map(([ localState, mDataSource ]) =>
      mDataSource.map(dataSource =>
        localState.operation
          .map(op => {
            const opDef: OperationType = operationDefs[op];
            return opDef.collector(opDef, dataSource, localState.inputs)({ DOM, props });
          })
          .withDefault(emptyCollector)
      )
      .withDefault(noDataSourceCollector)
    )
    .startWith(noDataSourceCollector)
}


function nextDataSource(state: State): Maybe<DataSource> {
  return go(function* () {
    const op = yield state.operation;
    const opDef: OperationType = operationDefs[op];
    const src: DataSource = yield state.dataSource;
    return opDef.fn(src, state.inputs);
  });
}
