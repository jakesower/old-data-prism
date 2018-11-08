import { div, h3, input, select, option } from '@cycle/dom';
import { mergeAll, mapObj } from '../../lib/utils';
import { OperationSlot, DataSource } from '../../types';

// A higher order component--takes in slots and returns a component
export default function (dataSource: DataSource, slots: {[k: string]: OperationSlot<any>}) {
  const slotDispatch = {
    free: freeSlotView,
    column: columnSlotView,
    multicolumn: multicolumnView,
  };

  function main({ DOM, props: props$ }) {
    return {
      DOM: props$.map(view),
    };
  }

  function view(state) {
    const slotVdom = mapObj(slots, (slot, id) => {
      return div({class: {slot: true}}, [
        h3({}, slot.display),
        slotDispatch[slot.slotType](id)
      ])
    });

    return div({},
      slotVdom
    );
  }

  function freeSlotView(state) {
    return input({ attrs: { type: 'text' }});
  }

  function columnSlotView(slotId) {
    const dsOptions = dataSource.columns.map(c => c.name).map(
      (colName, idx) => option({ value: idx.toString() }, colName)
    );

    return select({ class: { [slotId]: true }},
      [option({}, '')].concat(dsOptions)
    );
  }

  return main;
}
