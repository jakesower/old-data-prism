import { zipObj } from '../../lib/utils';
import { OperationSlot, DataSource, Operation, OperationError } from '../../types';
import xs, { Stream } from 'xstream';
import isolate from '@cycle/isolate';
import { freeSlotComponent, columnSlotComponent, enumeratedSlotComponent, multicolumnSlotComponent, sourceSlotComponent } from './shared/slot-components';
import { sampleWith } from '../../lib/stream-utils';
import { Either } from '../../lib/monads/either';
import { Maybe } from '../../lib/monads/maybe';

export interface SlotHolder {
  slots: { [k in string]: OperationSlot<any> },
}

export interface SlotOperation extends Operation, SlotHolder {}

interface SlotOperationError extends OperationError {
  slotErrors: Maybe<string>[],
}


interface CompOut {
  DOM: Stream<any>,
  value: Stream<string | string[]>
}

type SlotComp = (slot: OperationSlot<any>, dataSource: DataSource, init: any) => ((args: {DOM: any, props: any}) => CompOut);

interface SlotCompDispatch {
  [k: string]: SlotComp
}

// A higher order component--takes in slots and returns a component
export function SlotCollector(opDef: SlotOperation, dataSource: DataSource, initialInputs) {
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

  function main(cycleSources: { DOM: Stream<any>, props: any, update: Stream<any> }) {
    const { update: update$ } = cycleSources;
    const errorProxy$ = xs.create<Maybe<SlotOperationError>>();

    const slotComponents = slotVals.map((slot, idx) => {
      const init = initialInputs[slotKeys[idx]];
      return isolate(slotDispatch[slot.slotType](slot, dataSource, init), idx)({
        ...cycleSources,
        errors: errorProxy$.map(mErrors => mErrors.map(error => error.slotErrors[idx])),
      });
    });

    const value: Stream<{[k: string]: string}> = xs.combine(...slotComponents.map(sc => sc.value))
      .map(vals => zipObj(slotKeys, vals));

    const curDataSource$ = value
      .compose(sampleWith(xs.merge(update$)))
      .map(inputs => nextDataSource(opDef, dataSource, inputs));

    errorProxy$.imitate(curDataSource$.map(eds => eds.flip().toMaybe()));

    const outDom = xs.combine(...slotComponents.map(sc => sc.DOM))
      .map(vals => [...vals]);

    return {
      DOM: outDom,
      value: value.compose(sampleWith(xs.merge(update$))),
      dataSource: curDataSource$ // :(
    };
  }

  return main;
}

// TODO: move this into a util
function nextDataSource(operationDef: Operation, dataSource: DataSource, inputs: {[k: string]: string}): Either<SlotOperationError,DataSource> {
  return operationDef.fn(dataSource, inputs);
}
