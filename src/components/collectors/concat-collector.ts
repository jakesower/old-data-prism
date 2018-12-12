import { div, select, option, h3, tr, td, input, table, th } from '@cycle/dom';
import { DataSource, Operation, StateModifier, DataColumn } from '../../types';
import xs, { Stream } from 'xstream';
import isolate from '@cycle/isolate';
import { Maybe } from '../../lib/maybe';
import { go, flatten } from '../../lib/utils';

export interface JoinOperation extends Operation {}

interface LocalState {
  foreignSourceId: Maybe<string>,
}

interface Props {
  sources: DataSource[],
}

interface CompOut {
  DOM: Stream<any>,
  value: Stream<any>
}

type ValueStream = Stream<{ keep: boolean, name: string }[]>;

// A higher order component--takes in slots and returns a component
export function ConcatCollector(_opDef, dataSource: DataSource, initialInputs) {
  function main(cycleSources: { DOM: Stream<any>, props: Stream<Props> }) {
    const { DOM, props: props$ } = cycleSources;
    const initialState = {
      foreignSourceId: Maybe.fromValue(initialInputs.foreignSourceId),
    };

    const { setForeignSource$ } = intent(DOM, initialInputs);

    const stateModifiers$ = xs.merge(
      setForeignSource$.map(x => state => ({ ...state, foreignSourceId: Maybe.fromValue(x) })),
    ) as StateModifier<LocalState>;

    const state$: Stream<LocalState> = stateModifiers$.fold((state, mod) => mod(state), initialState);

    const xwalkComponent$ = xs.combine(props$, state$)
      .map(([props, state]) => {
        const colSources = { state, props, DOM: cycleSources.DOM };
        return getForeignSource(props.sources, state.foreignSourceId)
          .map(foreignSource => {
            const columnComponents: CompOut[] = dataSource.columns.map((col, idx) => {
              const sameName = col => Maybe.fromValue(foreignSource.columns.find(fc => col.name === fc.name));
              const init = (initialInputs.xwalk || [])[idx] || {
                keep: true,
                foreignColumn: sameName(col).map(c => c.name).withDefault(""),
              };
              return isolate(columnComponent(col, foreignSource, init), idx)(colSources);
            });

            const xwalkValue: ValueStream = xs.combine(...columnComponents.map(sc => sc.value));
            const xwalkDom = xs.combine(...columnComponents.map(sc => sc.DOM))
              .map(vals => [...vals]);

            return { DOM: xwalkDom, value: xwalkValue };
          })
          .withDefault({ DOM: xs.of(null), value: xs.of({}) });
      })
      .startWith({ DOM: xs.of(null), value: xs.of({}) });

    const xwalkDom$ = xwalkComponent$.map(c => c.DOM).flatten();
    const xwalkValues$ = xwalkComponent$.map(c => c.value).flatten();

    const dom$ = xs.combine(state$, props$, xwalkDom$)
      .map(([state, props, xwalkDom]) => view(state, props.sources, xwalkDom));

    const value$ = xs.combine(state$, props$, xwalkValues$)
      .map(([state, props, xwalk]) => go(function* () {
        const foreignSourceId = yield state.foreignSourceId;
        const foreignSource = yield getForeignSource(props.sources, state.foreignSourceId);

        return { foreignSourceId, foreignSource, xwalk };
      })
      .withDefault({}))
      .startWith({});

    return {
      DOM: dom$,
      value: value$,
    }
  }


  function view(state: LocalState, sources: DataSource[], xwalkDom) {
    const emptyOption = option({ attrs: { value: '' }}, '');
    const withEmpty = opts => [emptyOption].concat(opts);

    return div('.join-collector', [
      div('.slot', [
        h3('Foreign Source'),
        select('.foreign-source', withEmpty(sources.map(source =>
          option({ attrs: { value: source.fingerprint, selected: (state.foreignSourceId.hasValue(source.fingerprint)) }}, source.name)
        ))),
      ]),

      state.foreignSourceId.map(_ =>
        div('.slot', [
          h3('Crosswalk'),
          table('.column-collector', flatten([
            tr([ th('Keep'), th('Local Column'), th('Foreign Column') ]),
            xwalkDom,
          ]))
        ]),
      ).withDefault(null),
    ]);
  }


  function columnComponent(column: DataColumn, foreignSource: DataSource, init) {
    return function ({ DOM }): { DOM: Stream<any>, value: Stream<any> } {
      const keep$ = DOM.select('.keep').events('click').map(ev => ev.target.checked).startWith(init.keep || true);
      const foreignColumn$ = DOM
        .select('.foreign-column')
        .events('change')
        .map(ev => ev.target.value)
        .startWith(init.foreignColumn || foreignSource.columns[0].name);

      const dom$ = xs.combine(keep$, foreignColumn$).map(([keep, foreignColumn]) => {
        const foreignColumnOptions = foreignSource.columns.map(col =>
          option({ attrs: { value: col.name, selected: col.name === foreignColumn }}, col.name));

        return tr('.column-row', [
          td(input('.keep', {
            attrs: { type: 'checkbox' },
            props: { checked: keep },
          })),
          td(column.name),
          td(select('.foreign-column', {
            attrs: { type: 'text', required: true },
            props: { value: name }
          }, foreignColumnOptions)),
        ])
      });

      const value$ = xs.combine(keep$, foreignColumn$).map(([keep, foreignColumn]) => ({ keep, foreignColumn }));

      return { DOM: dom$, value: value$ };
    }
  }


  function intent(DOM, init) {
    const { foreignSourceId } = init;
    return {
      setForeignSource$: DOM.select('.foreign-source').events('change').map(ev => ev.target.value).startWith(foreignSourceId),
    }
  }


  return main;
}


function getForeignSource(sources: DataSource[], mId: Maybe<string>): Maybe<DataSource> {
  return mId.chain(id => Maybe.fromValue(sources.find(s => s.fingerprint === id)));
}
