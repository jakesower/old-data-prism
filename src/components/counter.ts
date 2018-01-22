import { h } from 'snabbdom';
import { div, span } from '../lib/elements';
import { Stream, combine } from 'most';
import { VNode } from 'snabbdom/vnode';
import { Component, View, makeComponent } from '../lib/component';

interface Initializer {
  num: number
}

interface Model {
  num: number
}

interface ModelOut {
  num: Component<{num: number}>
}

interface Actions {
  decrement: Stream<Event>,
  increment: Stream<Event>,
}

interface ActionStream {

}

const init = ((init: Initializer): Model => init);

const model = ((state: Model, actions: {}): {} => {
  // const dec: Stream<number> = actions.decrement.constant(-1);
  // const inc: Stream<number> = actions.increment.constant(1);
  // const delta = combine((a, b) => a + b, inc, dec);

  return {num: 0};
});

const view = <View>((state: Model, actions) =>
  div([
    h('button', { on: { click: actions.decrement }}, '-'),
    h('span', "69"),
    h('button', { on: { click: actions.increment }}, '-'),
  ])
);

export default makeComponent(init, view, {});
