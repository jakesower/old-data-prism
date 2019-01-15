import { div, select, option, h3 } from '@cycle/dom';
import { DataSource, Operation, StateModifier } from '../../types';
import xs, { Stream } from 'xstream';
import { Maybe } from '../../lib/monads/maybe';
import { go } from '../../lib/utils';

export interface JoinOperation extends Operation {}

interface LocalState {
  foreignSourceId: Maybe<string>,
  localKey: Maybe<string>,
  foreignKey: Maybe<string>,
  joinMethod: Maybe<string>,
}

interface Props {
  sources: DataSource[],
}

// A higher order component--takes in slots and returns a component
export function JoinCollector(_opDef, dataSource, initialInputs) {
  function main(cycleSources: { DOM: Stream<any>, props: Stream<Props> }) {
    const { DOM, props: props$ } = cycleSources;
    const initialState = {
      foreignSourceId: Maybe.fromValue(initialInputs.foreignSourceId),
      localKey: Maybe.fromValue(initialInputs.localKey),
      foreignKey: Maybe.fromValue(initialInputs.foreignKey),
      joinMethod: Maybe.fromValue(initialInputs.joinMethod),
    };
    const { setForeignSource$, setLocalKey$, setForeignKey$, setJoinMethod$ } = intent(DOM, initialInputs);

    const stateModifiers$ = xs.merge(
      setForeignSource$.map(x => state => ({ ...state, foreignSourceId: Maybe.fromValue(x) })),
      setLocalKey$.map(x => state => ({ ...state, localKey: Maybe.fromValue(x) })),
      setForeignKey$.map(x => state => ({ ...state, foreignKey: Maybe.fromValue(x) })),
      setJoinMethod$.map(x => state => ({ ...state, joinMethod: Maybe.fromValue(x) })),
    ) as StateModifier<LocalState>;

    const state$: Stream<LocalState> = stateModifiers$.fold((state, mod) => mod(state), initialState);

    const dom$ = xs.combine(state$, props$)
      .map(([state, props]) => view(state, props.sources, dataSource));

    const value$ = xs.combine(state$, props$)
      .map(([state, props]) => go(function* () {
        const localKey = yield state.localKey;
        const foreignSourceId = yield state.foreignSourceId;
        const foreignKey = yield state.foreignKey;
        const joinMethod = yield state.joinMethod;
        const foreignSource = props.sources.find(s => s.fingerprint === foreignSourceId);

        return { localKey, foreignSourceId, foreignSource, foreignKey, joinMethod };
      }).withDefault({}))
      .startWith({});

    return {
      DOM: dom$,
      value: value$,
    }
  }


  function view(state: LocalState, sources: DataSource[], dataSource: DataSource) {
    const joinMethods = ['Inner', 'Left', 'Right'];
    const emptyOption = option({ attrs: { value: '' }}, '');
    const withEmpty = opts => [emptyOption].concat(opts);
    const mForeignSource = state.foreignSourceId
      .chain(f => Maybe.fromValue(sources.find(s => s.fingerprint === f)));

    return div('.join-collector', [
      div('.slot', [
        h3('Join Method'),
        select('.join-method', withEmpty(joinMethods.map(jm =>
          option({ attrs: { value: jm, selected: (state.joinMethod.hasValue(jm)) }}, jm)
        ))),
      ]),

      div('.slot', [
        h3('Foreign Source'),
        select('.foreign-source', withEmpty(sources.map(source =>
          option({ attrs: { value: source.fingerprint, selected: (state.foreignSourceId.hasValue(source.fingerprint)) }}, source.name)
        ))),
      ]),

      div('.slot', [
        h3('Local Key'),
        select('.local-key', withEmpty(dataSource.columns.map(column =>
          option({ attrs: { value: column.name, selected: (state.localKey.hasValue(column.name)) }}, column.name)
        )))
      ]),

      mForeignSource.map(fSource =>
        div('.slot', [
          h3('Foreign Key'),
          select('.foreign-key', withEmpty(fSource.columns.map(column =>
            option({ attrs: { value: column.name, selected: (state.localKey.hasValue(column.name)) }}, column.name)
          ))),
      ])
      ).withDefault(null),
    ]);
  }


  function intent(DOM, init) {
    const { foreignSourceId, foreignKey, localKey, joinMethod } = init;
    return {
      setForeignSource$: DOM.select('.foreign-source').events('change').map(ev => ev.target.value).startWith(foreignSourceId),
      setJoinMethod$: DOM.select('.join-method').events('change').map(ev => ev.target.value).startWith(joinMethod),
      setLocalKey$: DOM.select('.local-key').events('change').map(ev => ev.target.value).startWith(localKey),
      setForeignKey$: DOM.select('.foreign-key').events('change').map(ev => ev.target.value).startWith(foreignKey),
    }
  }


  return main;
}
