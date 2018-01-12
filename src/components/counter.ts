import { h } from 'snabbdom';
import { Stream, combine } from 'most';
import { VNode } from 'snabbdom/vnode';
import { Component, View } from '../lib/component';

interface Initializer {
  num: number
}

interface Model {
  num: number
}

interface Actions {
  decrement: Stream<number>,
  increment: Stream<number>,
}

const init = ((init: Initializer): Model => init);

const model = ((state: Model, actionStreams: {}): {} => {
  const dec = actionStreams.decrement.constant(-1);
  const inc = actionStreams.increment.constant(1);
  const delta = combine((a, b) => a + b, inc, dec);

  return {num: 0};
});

const view = <View>((state: Model, actions) =>
  h('div', [
    h('button', { on: { click: actions.decrement }}, '-'),
    h('span', state.num.toString()),
    h('button', { on: { click: actions.increment }}, '-'),
  ])
);

export default Component(init, view, {});
