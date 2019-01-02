import { div, input, tr, td, table, th } from '@cycle/dom';
import { DataSource, DataColumn, Operation } from '../../types';
import xs, { Stream } from 'xstream';
import { Maybe } from '../../lib/maybe';
import isolate from '@cycle/isolate';
import { flatten } from '../../lib/utils';

export interface ColumnOperation extends Operation {

}

type ValueStream = Stream<{ keep: boolean, name: string }[]>;


// A higher order component--takes in slots and returns a component
export function ColumnCollector(_opDef, dataSource: DataSource, initialInputs) {
  function main(cycleSources: { DOM: Stream<any> }) {
    const columnComponents = dataSource.columns.map((col, idx) => {
      const init = initialInputs[idx] || { keep: true, name: col.name };
      return isolate(columnComponent(col, init), idx)(cycleSources);
    })

    return {
      DOM: xs.combine(...columnComponents.map(sc => sc.DOM))
        .map(vals => [...vals])
        .map(view),
      value: <ValueStream>xs.combine(...columnComponents.map(sc => sc.value)),
    }
  }


  function view(rowDom) {
    return table('.column-collector', flatten([
      tr([ th('Keep'), th('Original Name'), th('New Name') ]),
      rowDom,
    ]));
  }


  function columnComponent(column: DataColumn, init) {
    return function ({ DOM }): { DOM: Stream<any>, value: Stream<any> } {
      const keep$ = DOM.select('.keep').events('click').map(ev => ev.target.checked).startWith(init.keep);
      const columnName$ = DOM.select('.new-column-name').events('change').map(ev => ev.target.value).startWith(init.name);

      const dom$ = xs.combine(keep$, columnName$).map(([keep, name]) =>
        tr('.column-row', [
          td(input('.keep', {
            attrs: { type: 'checkbox' },
            props: { checked: keep },
          })),
          td(column.name),
          td(input('.new-column-name', {
            attrs: { type: 'text', required: true },
            props: { value: name }
          })),
        ])
      );

      const value$ = xs.combine(keep$, columnName$).map(([keep, name]) => ({ keep, name }));

      return { DOM: dom$, value: value$ };
    }
  }


  return main;
}
