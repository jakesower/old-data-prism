import { div, h3, input, select, option, VNode } from '@cycle/dom';
import { zipObj, eq } from '../../lib/utils';
import { OperationSlot, DataSource, Collector, DataColumn, Operation } from '../../types';
import Multiselect from '../components/multiselect';
import xs, { Stream } from 'xstream';
import isolate from '@cycle/isolate';
import { Maybe } from '../../lib/maybe';

export interface SlotHolder {
  slots: { [k in string]: OperationSlot<any> },
}

export interface SlotOperation extends Operation, SlotHolder {}


interface CompOut {
  DOM: Stream<any>,
  value: Stream<string | string[]>
}

type SlotComp = (slot: OperationSlot<any>, init: any) => ((args: {DOM: any, dataSource: Stream<Maybe<DataSource>>}) => CompOut);

interface SlotCompDispatch {
  [k: string]: SlotComp
}

// A higher order component--takes in slots and returns a component
export function SlotCollector(opDef: SlotHolder, initialInputs) {
  const slots = opDef.slots;
  const slotKeys = Object.keys(slots);
  const slotVals = Object.values(slots);

  const slotDispatch: SlotCompDispatch = {
    free: freeSlotComponent,
    column: columnSlotComponent,
    multicolumn: multicolumnSlotComponent,
  };

  function main(cycleSources: { DOM: Stream<any>, dataSource: Stream<Maybe<DataSource>>}) {
    const slotComponents = slotVals.map((slot, idx) => {
      const init = initialInputs[slotKeys[idx]];
      return isolate(slotDispatch[slot.slotType](slot, init), idx)(cycleSources)
    });

    const value: Stream<{[k: string]: string}> = xs.combine(...slotComponents.map(sc => sc.value))
      .map(vals => zipObj(slotKeys, vals));

    const outDom = xs.combine(...slotComponents.map(sc => sc.DOM))
      .map(vals => [...vals]);

    return { DOM: outDom, value };
  }


  function freeSlotComponent(slot, init) {
    return function ({ DOM }): { DOM: Stream<any>, value: Stream<string> } {
      const value$ = DOM.select('.slot-input')
        .events('change')
        .map(ev => ev.target.value)
        .startWith(init || '');

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


  function columnSlotComponent(slot, init) {
    return function ({ DOM, dataSource: dataSource$ }) {
      const value$ = DOM.select('.slot-input').events('change').map(ev => ev.target.value).startWith(init || '');
      const view$ = xs.combine(value$, <Stream<Maybe<DataSource>>>dataSource$)
        .map(([value, mDataSource]) => {
          const emptyCol = option({ attrs: { value: '', selected: (value === "") }}, '');
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


  function multicolumnSlotComponent(slot: OperationSlot<any>) {
    return function ({ DOM, dataSource }) {
      const colReducer = (acc, col: DataColumn, idx: number) =>
        col.hasType(slot.type) ?
          [...acc, { value: idx, display: col.name }] :
          acc;

      const ms$ = dataSource
        .map(mDs => {
          const relevantColumns = mDs.map(ds => ds.columns.reduce(colReducer, [])).withDefault([]);
          return Multiselect({ options: relevantColumns, selected: [] })({ DOM });
        });

      return {
        DOM: ms$.map(ms => ms.DOM).debug(x => console.log({x})),
        value: ms$.map(ms => ms.value)
      };
    }
  }

  return main;
}
