import { div, h3, input, select, option, VNode, button, footer, span } from '@cycle/dom';
import { Collection, pluck } from '../../lib/collection';
import { MultiColumnSlot } from '../../lib/slots';
import { OperationSlot, DataSource, Collector, DataColumn, Operation, StateModifier } from '../../types';
import Multiselect, { Option } from '../components/multiselect';
import xs, { Stream } from 'xstream';
import { Maybe } from '../../lib/monads/maybe';
import dataTypes from '../../lib/data-types';
import * as aggregatorDefs from '../../operations/aggregators';
import { sortWith, inlineKey, flatten } from '../../lib/utils';
import { SlotCollector } from './slot-collector';

export interface GroupOperation extends Operation {

}

interface CompOut {
  DOM: Stream<any>,
  value: Stream<any>
}

type SlotComp = (dataSource: DataSource, args: {DOM: Stream<any>}) => CompOut;


// A higher order component--takes in slots and returns a component
export function GroupCollector(_opDef: GroupOperation, dataSource, init) {
  function main(cycleSources: { DOM: Stream<any>, props: any}) {
    const { new$ } = intent(cycleSources.DOM);

    const groupBasisComp = multicolumnSlotComponent(
      MultiColumnSlot({ type: dataTypes.String, display: 'Columns' }),
      init.groupBasis,
    );

    const GroupBasis = groupBasisComp(dataSource, cycleSources);
    const aggregators$ = Collection({
      component: (cs, i) => Aggregator(cs, dataSource, i),
      sources: cycleSources,
      add$: new$,
      init: init.aggregators || [],
      removeConnector: i => i.remove$,
    });
    const aggregatorDom$ = pluck(aggregators$, i => i.DOM).startWith([]);
    const aggregatorValues$ = pluck(aggregators$, i => i.value).startWith([]);
    const validValues$ = aggregatorValues$
      .map(avs => avs
        .filter(av => !av.aggregator.isNothing()) // TODO: make this part of validation
        .map(av => ({ ...av, aggregator: av.aggregator.withDefault(null) }))
      );

    const value = xs.combine(GroupBasis.value, validValues$)
      .map(([gb, aggregators]) => ({ groupBasis: gb, aggregators }));

    const dom$ = xs.combine(GroupBasis.DOM, aggregatorDom$)
      .map(([gbDom, ad]) => view({ basisDom: gbDom, aggregatorDom: ad }));

    return { DOM: dom$, value };
  }


  function intent(DOM): {[k: string]: Stream<any>} {
    return {
      new$: DOM.select('.new-aggregator').events('click'),
    }
  }


  function view(state) {
    return div('.slot', [
      h3('Group By'),
      state.basisDom,
      div('.aggregators', state.aggregatorDom),
      button('.new-aggregator', 'New Aggregator'),
    ]);
  }


  function multicolumnSlotComponent(slot: OperationSlot<any>, init): SlotComp {
    return function (dataSource, { DOM }) {
      const colReducer = (acc, col: DataColumn, idx: number): Option[] =>
        col.hasType(slot.type) ?
          [...acc, { value: idx.toString(), display: col.name }] :
          acc;

      const cols = dataSource.columns.reduce(colReducer, []);
      return Multiselect({ options: cols, selected: init || [] })({ DOM });
    }
  }


  return main;
}

interface AggState {
  aggregator: Maybe<string>,
  inputs: {[k: string]: string}
}

function Aggregator(cycleSources, dataSource: DataSource, init) {
  const { DOM } = cycleSources;
  const initState: AggState = init ?
    { ...init, aggregator: Maybe.of(init.aggregator) } :
    { aggregator: Maybe.Nothing(), inputs: {} };

  const aggregator$: Stream<string> = DOM.select('.aggregator-id').events('change').map(ev => ev.target.value);
  const remove$: Stream<any> = DOM.select('.remove').events('click');

  const modifiers$: StateModifier<AggState> = xs.merge(
    aggregator$.map(a => state => ({ ...state, aggregator: Maybe.fromValue(a)} )),
  );

  const state$: Stream<AggState> = modifiers$.fold((state, mod) => mod(state), initState);
  const collector$ = slotCollector(state$, DOM, dataSource);
  const collectorVdom$: Stream<VNode | VNode[]> = collector$.map(c => c.DOM).flatten();
  const collectorValue$: Stream<{[k: string]: string}> = collector$.map(c => c.value).flatten();

  const dom$ = xs.combine(state$, collectorVdom$).map(([{ aggregator }, collectorVdom]) => {
    const aggOpts = sortWith(od => od.name, inlineKey(aggregatorDefs))
      .map(agg => option({ attrs: { value: agg.key, selected: aggregator.withDefault('') === agg.key }}, agg.name));

    const aggMarkup = div('.slot', {}, [
      h3([span('.remove'), 'Aggregator']),
      select('.aggregator-id', {}, [option({}, '')].concat(aggOpts))
    ]);

    return div('.aggregator', {}, flatten([
      [aggMarkup],
      [collectorVdom]
    ]));
  });

  const value$ = xs.combine(state$, collectorValue$)
    .map(([s, cv]) => ({ aggregator: s.aggregator, inputs: cv }));

  return {
    DOM: dom$,
    value: value$,
    remove$,
  }

  function slotCollector(state$, DOM, dataSource) {
    const emptyCollector = { DOM: xs.of([]), value: xs.of({}) };
    return state$.map(state =>
      state.aggregator
        .map(agg => {
          const aggDef = aggregatorDefs[agg];
          return SlotCollector(aggDef, dataSource, state.inputs)({ DOM, props: cycleSources.props, update: xs.never() });
        })
        .withDefault(emptyCollector)
    );
  }
}
