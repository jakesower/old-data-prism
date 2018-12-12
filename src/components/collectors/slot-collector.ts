import { zipObj } from '../../lib/utils';
import { OperationSlot, DataSource, Operation } from '../../types';
import xs, { Stream } from 'xstream';
import isolate from '@cycle/isolate';
import { freeSlotComponent, columnSlotComponent, enumeratedSlotComponent, multicolumnSlotComponent, sourceSlotComponent } from './shared/slot-components';

export interface SlotHolder {
  slots: { [k in string]: OperationSlot<any> },
}

export interface SlotOperation extends Operation, SlotHolder {}


interface CompOut {
  DOM: Stream<any>,
  value: Stream<string | string[]>
}

type SlotComp = (slot: OperationSlot<any>, dataSource: DataSource, init: any) => ((args: {DOM: any, props: any}) => CompOut);

interface SlotCompDispatch {
  [k: string]: SlotComp
}

// A higher order component--takes in slots and returns a component
export function SlotCollector(opDef: SlotHolder, dataSource: DataSource, initialInputs) {
  const slots = opDef.slots;
  const slotKeys = Object.keys(slots);
  const slotVals = Object.values(slots);

  const slotDispatch: SlotCompDispatch = {
    free: freeSlotComponent,
    column: columnSlotComponent,
    enumerated: enumeratedSlotComponent,
    expression: freeSlotComponent,
    multicolumn: multicolumnSlotComponent,
    source: sourceSlotComponent,
  };

  function main(cycleSources: { DOM: Stream<any>, props: any }) {
    const slotComponents = slotVals.map((slot, idx) => {
      const init = initialInputs[slotKeys[idx]];
      return isolate(slotDispatch[slot.slotType](slot, dataSource, init), idx)(cycleSources)
    });

    const value: Stream<{[k: string]: string}> = xs.combine(...slotComponents.map(sc => sc.value))
      .map(vals => zipObj(slotKeys, vals));

    const outDom = xs.combine(...slotComponents.map(sc => sc.DOM))
      .map(vals => [...vals]);

    return { DOM: outDom, value };
  }

  return main;
}
