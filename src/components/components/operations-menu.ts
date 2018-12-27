import xs, { Stream } from 'xstream';
import { div, span, strong, table, td, th, tr, button, VNode, i, ul, li, h1 } from "@cycle/dom";
import { DataColumn, DataSource, StateModifier } from "../../types";
import operationDefs, { OperationType } from '../../operations';
import { sortWith, inlineKey } from '../../lib/utils';

interface State {
  active: boolean,
}

const initState: State = {
  active: false,
};

export default function main(cycleSources: { DOM: any }) {
  const { activate$, close$, operation$ } = intent(cycleSources.DOM);

  const stateModifiers$: StateModifier<State> = xs.merge(
    xs.merge(close$, operation$).mapTo(state => ({...state, active: false })),
    activate$.mapTo(state => ({...state, active: true }))
  );

  const state$ = stateModifiers$.fold((state, fn) => fn(state), initState);

  return {
    DOM: state$.map(view),
    operation: operation$,
  }
}

function intent(DOM): {[k in string]: Stream<any>} {
  return {
    activate$: DOM.select('.new-operation-button').events('click'),
    close$: DOM.select('.close-mask').events('click'),
    operation$: DOM.select('.operation').events('click').debug().map(ev => ev.target.dataset.operation),
  };
}

// TODO: sort by type (numbers and not just strings)
const view = (state: State) => {
  const operations = sortWith(od => od.name, inlineKey(operationDefs))

  return div({}, [
    div('.new-operation-button.action', {}, "New Operation"),
    div('.operations-menu-container' + (state.active ? '.active' : ''), div('.operations-menu', [
      div('.close-mask', i('.fa.fa-times-circle', "")),
      div('.menu', [
        h1('Select Operation'),
        ul(operations.map(operation =>
          li([
            span('.operation', { dataset: { operation: operation.key }}, operation.name),
            div('.help', operation.help || div('TODO'))
          ])
        )),
      ])
    ]))
  ])
}
