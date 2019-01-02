import { div, input, tr, td, table, th, button } from '@cycle/dom';
import { DataSource, Operation } from '../../types';
import xs, { Stream } from 'xstream';
import { Collection, pluck } from '../../lib/collection';
import { flatten } from '../../lib/utils';
import { freeSlotComponent } from './shared/slot-components';
import { FreeSlot } from '../../lib/slots';
import dataTypes from '../../lib/data-types';

export interface SlotPairOperation extends Operation {}


export function SlotPairCollector(_opDef, dataSource: DataSource, initialInputs) {
  function main(cycleSources: { DOM: Stream<any> }) {
    const { add$, otherwise$ } = intent(cycleSources.DOM, initialInputs);

    const slot = FreeSlot({ display: 'Column Name', type: dataTypes.NonEmptyString });
    const collector = freeSlotComponent(slot, dataSource, initialInputs.columnName)(cycleSources);
    const pairs$ = Collection({
      component: pairComponent,
      sources: cycleSources,
      add$,
      init: initialInputs.values || [],
      removeConnector: i => i.remove$,
    });

    const value$ = xs.combine(pluck(pairs$, i => i.value), otherwise$, collector.value)
      .map(([ values, otherwise, columnName ]) => ({ values, otherwise, columnName }));

    return {
      DOM: xs.combine(pluck(pairs$, i => i.DOM), otherwise$, collector.DOM)
        .map(([rowDom, otherwise, collectorDom]) => view(rowDom, otherwise, collectorDom)),
      value: value$,
    };
  }


  function view(rowDom, otherwise, collectorDom) {
    return div([
      collectorDom,
      table('.column-collector', flatten([
        tr([ th('Condition'), th(''), th('Result'), th('') ]),
        rowDom,
        tr(td({ attrs: { colspan: '4'}}, button('.add', { style: { width: '100%' }}, 'New Condition'))),
        tr([
          td('otherwise'),
          td(''),
          td(input('.otherwise', {
            attrs: { type: 'text', required: true },
            props: { value: otherwise },
          },
          td(''),
        ))]),
      ]))
    ]);
  }


  function intent(DOM, init) {
    return {
      add$: DOM.select('.add').events('click'),
      otherwise$: DOM.select('.otherwise').events('change').map(ev => ev.target.value).startWith(init.otherwise),
    };
  }


  function pairComponent({ DOM }, rawInit) {
    const init = rawInit || {};
    const condition$ = DOM.select('.condition').events('change').map(ev => ev.target.value).startWith(init.condition);
    const result$ = DOM.select('.result').events('change').map(ev => ev.target.value).startWith(init.result);

    const dom$ = xs.combine(condition$, result$).map(([condition, result]) =>
      tr('.column-row', [
        td(input('.condition', {
          attrs: { type: 'text', required: true },
          props: { value: condition }
        })),
        td('to'),
        td(input('.result', {
          attrs: { type: 'text' },
          props: { value: result }
        })),
        td('.remove', 'X')
      ])
    );

    const value$ = xs.combine(condition$, result$).map(([condition, result]) => ({ condition, result })).debug();

    return {
      DOM: dom$,
      value: value$,
      remove$: DOM.select('.remove').events('click'),
    };
  }


  return main;
}
