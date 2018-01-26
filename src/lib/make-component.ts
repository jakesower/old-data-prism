import { concat, keys, map, mergeAll, pipe } from 'ramda';
import { VNode } from "snabbdom/vnode";
import { Stream, empty, fromEvent } from "most";

export interface Component<A> {
  output: A,
  view: VNode[],
}

export function of<A> (x: A): Component<A> {
  return {
    view: [],
    output: x,
  };
}

export function chain<A, B>(comp: Component<A>, fn: (x: A) => Component<B>): Component<B> {
  // ignore the error about output for now
  const newOutput = fn(comp.output);

  return {
    view: concat(comp.view, newOutput.view),
    output: newOutput.output
  };
}

export function makeComponent<A> (view: VNode[], output: A): Component<A> {
  return { view, output };
}
