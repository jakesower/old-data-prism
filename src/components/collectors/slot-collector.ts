import { div, h3, input, select, option, VNode } from '@cycle/dom';
import { mergeAll, mapObj, zipObj } from '../../lib/utils';
import { OperationSlot, DataSource, Collector, DataColumn } from '../../types';
import Multiselect from '../components/multiselect';
import xs, { Stream } from 'xstream';
import isolate from '@cycle/isolate';
import { Maybe } from '../../lib/maybe';

interface CompOut {
  DOM: Stream<any>,
  value: Stream<any>
}

type SlotComp = (slot: OperationSlot<any>) => ((args: {DOM: any, dataSource: Stream<Maybe<DataSource>>}) => CompOut);

interface SlotCompDispatch {
  [k: string]: SlotComp
}

// A higher order component--takes in slots and returns a component
export default <Collector>function (opDef) {
  const slots = opDef.slots;
  const slotKeys = Object.keys(slots);
  const slotVals = Object.values(slots);

  const slotDispatch: SlotCompDispatch = {
    free: freeSlotComponent,
    column: columnSlotComponent,
    multicolumn: multicolumnSlotComponent,
  };

  function main(cycleSources: { DOM: Stream<any>, dataSource: Stream<Maybe<DataSource>>}) {
    const slotComponents = slotVals.map((slot, idx) =>
      isolate(slotDispatch[slot.slotType](slot), idx)(cycleSources)
    );

    const value = xs.combine(...slotComponents.map(sc => sc.value))
      .map(vals => zipObj(slotKeys, vals));

    const outDom = xs.combine(...slotComponents.map(sc => sc.DOM))
      .map(vals => [...vals]);

    return { DOM: outDom, value };
  }


  function freeSlotComponent(slot) {
    return function ({ DOM }): { DOM: Stream<any>, value: Stream<string> } {
      const value$ = DOM.select('.slot-input')
        .events('change')
        .map(ev => ev.target.value)
        .startWith('');

      const view$ = value$.map(value =>
        div('.slot', {}, [
          h3({}, slot.display),
          input('.slot-input', {
            attrs: { type: 'text', required: true },
            props: { value }
          })
        ])
      );

      return { value: value$, DOM: view$ };
    }
  }


  function columnSlotComponent(slot) {
    return function ({ DOM, dataSource: dataSource$ }) {
      const value$ = DOM.select('.slot-input').events('change').map(ev => ev.target.value).startWith('');
      const view$ = xs.combine(value$, <Stream<Maybe<DataSource>>>dataSource$)
        .map(([value, mDataSource]) => {
          const emptyCol = option({ attrs: { value: '' }}, '');
          const colReducer = (acc: VNode[], col: DataColumn, idx: number) => col.hasType(slot.type) ?
            [...acc, option({ attrs: { value: idx, selected: (value === idx.toString()) }}, col.name)] :
            acc;

          const relevantColumns = mDataSource.map(ds => ds.columns.reduce(colReducer, [emptyCol]));

          return div('.slot', {}, [
            h3({}, slot.display),
            select('.slot-input', relevantColumns.withDefault([emptyCol]))
          ]);
        });

      return { value: value$, DOM: view$ };
    }
  }


  function multicolumnSlotComponent(slot) {
    return function ({ DOM, dataSource }) {
      const colReducer = (acc, col: DataColumn, idx: number) =>
        col.hasType(slot.type) ?
          [...acc, { value: idx, display: col.name }] :
          acc;

      const relevantColumns = dataSource.columns.reduce(colReducer, []);

      return Multiselect(
        { options: relevantColumns, selected: [] },
        { DOM }
      )
    }
  }


  return main;
}
