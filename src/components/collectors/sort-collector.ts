import { DataSource, DataColumn } from '../../types';
import { Collection, pluck } from '../../lib/collection';
import { div, button, option, VNode, h3, select } from '@cycle/dom';
import dataTypes from '../../lib/data-types';
import xs, { Stream } from 'xstream';
import { Maybe } from '../../lib/monads/maybe';


export function SortCollector(_opDef, dataSource: DataSource, initialInputs) {
  function main(cycleSources) {
    const new$ = cycleSources.DOM.select('.add-button').events('click');

    const sorters$ = Collection({
      component: columnComponent,
      sources: cycleSources,
      add$: new$,
      init: initialInputs.columns || [],
      removeConnector: i => i.remove$,
    });

    return {
      DOM: pluck(sorters$, i => i.DOM).map(view),
      value: pluck(sorters$, i => i.value).startWith([]).map(vals => ({ columns: vals })),
    };
  }

  function columnComponent(cycleSources, init) {
    const { DOM } = cycleSources;

    const columnName$ = DOM.select('.col-name').events('change').map(ev => ev.target.value)
      .startWith(init ? init.columnName : '');

    const setDirection$ = DOM.select('.direction').events('change').map(ev => ev.target.value);

    const stringOpts = ['A 🡒 Z', 'Z 🡒 A'];
    const numericOpts = ['0 🡒 9', '9 🡒 0'].concat(stringOpts);
    const firstDirection = col => col.hasType(dataTypes.Number) ? numericOpts[0] : stringOpts[0];

    const directionModifiers$ = xs.merge(
      columnName$.map(columnName => direction => {
        const col = Maybe.fromValue(dataSource.columns.find(c => c.name === columnName)).withDefault(null);
        return !col ? '' : (direction === '' ? firstDirection(col) : direction)
      }),
      setDirection$.map(d => _ => d),
    ) as Stream<(input: any) => (direction: string) => string>;
    const direction$ = directionModifiers$.fold((dir, mod) => mod(dir), init ? init.direction : '');

    const value$ = xs.combine(columnName$, direction$).map(([columnName, direction]) => ({ columnName, direction }));
    const view$ = xs.combine(columnName$, direction$).map(([ columnName, direction ]) => {
      const mColumn = Maybe.fromValue(dataSource.columns.find(c => c.name === columnName));

      const emptyCol = option({ attrs: { value: '', selected: (columnName === "") }}, '');
      const colNameOptions = dataSource.columns.map(col =>
        option({ attrs: { value: col.name, selected: (columnName === col.name) }}, col.name)
      );

      const colDirectionOptions = mColumn.map(col => {
        const opts = col.hasType(dataTypes.Number) ? numericOpts : stringOpts;
        return opts.map(opt => option({ attrs: { value: opt, selected: direction === opt }}, opt));
      }).withDefault([]);

      return div('.slot-container', [
        div('.remove', 'X'),
        div('.slot', {}, [
          h3({}, 'Column & Direction'),
          div({ style: { display: 'flex' }}, [
            select('.col-name', { style: { "flex-grow": "1" }}, [emptyCol].concat(colNameOptions)),
            select('.direction', { style: { width: "6em", "margin-left": "1em", }}, colDirectionOptions),
          ]),
        ])
      ]);
    });

    return {
      DOM: view$,
      value: value$,
      remove$: cycleSources.DOM.select('.remove').events('click'),
    };
  }

  function view(collectorDom) {
    return div([
      div(collectorDom),
      button('.add-button', 'Add Sorter'),
    ]);
  }

  return main;
}
