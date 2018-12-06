import { div, h3, input, select, option, VNode } from '@cycle/dom';
import { OperationSlot, DataSource, DataColumn } from '../../../types';
import Multiselect from '../../components/multiselect';
import xs, { Stream } from 'xstream';
import { Maybe } from '../../../lib/maybe';


export function freeSlotComponent(slot, init) {
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


export function columnSlotComponent(slot, init) {
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


export function multicolumnSlotComponent(slot: OperationSlot<any>) {
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


export function sourceSlotComponent(slot, init) {
  return function ({ DOM, props: props$ }) {
    const value$ = DOM.select('.slot-input').events('change').map(ev => ev.target.value).startWith(init || '');
    const view$ = xs.combine(value$, <Stream<any>>props$)
      .map(([value, props]) => {
        const emptySource = option({ attrs: { value: '', selected: (value === '') }}, '');
        const sourceVdom = props.sources.map((src, idx) =>
          option({ attrs: { value: idx, selected: (value === idx.toString()) }}, src.name)
        );

        return div('.slot', {}, [
          h3({}, slot.display),
          select('.slot-input', [emptySource].concat(sourceVdom)),
        ]);
      });

    return { value: value$, DOM: view$ };
  }
}


export function enumeratedSlotComponent(slot, init) {
  return function ({ DOM }) {
    const value$ = DOM.select('.slot-input').events('change').map(ev => ev.target.value).startWith(init || '');
    const view$ = value$.map(value => {
      const empty = option({ attrs: { value: '', selected: (value === '') }}, '');
      const opts = slot.possibleValues.map(poss =>
        option({ attrs: { value: poss, selected: (value === poss) }}, poss)
      );

      return div('.slot', {}, [
        h3({}, slot.display),
        select('.slot-input', [empty].concat(opts)),
      ]);
    });

    return { value: value$, DOM: view$ };
  }
}
