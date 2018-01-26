import { concat, isNil, keys, map, mergeAll, pipe } from 'ramda';
import { VNode } from "snabbdom/vnode";
import { Stream, empty, fromEvent, of as streamOf } from "most";
import { h, VNodesSparse } from 'snabbdom/h';

export interface Component<A> {
  readonly isComponent: true,
  readonly output: A,
  readonly view: VNodesSparse,
  readonly view$: () => Stream<VNodesSparse>,
  readonly chain: <B>(fn: (x: A) => Component<B>) => Component<B>,
}

function ComponentObj<A> (view: VNodesSparse, output: A): void {
  this.view = view;
  this.output = output;
}

ComponentObj.prototype.isComponent = true;
ComponentObj.prototype.extractView = function() { return this.view };
ComponentObj.prototype.view$ = function() { return streamOf(this.view); }
ComponentObj.prototype.chain = function(fn) { return chain(this, fn); }

export function of<A> (x: A): Component<A> {
  return new ComponentObj([], x);
}

export function chain<A, B>(comp: Component<A>, fn: (x: A) => Component<B>): Component<B> {
  // ignore the error about output for now
  const newOutput = fn(comp.output);
  let newView: VNodesSparse;

  if (isNil(comp.view)) {
    newView = newOutput.view
  }
  else if(isNil(newOutput.view)) {
    newView = comp.view
  }
  else {
    const oldNodes = Array.isArray(comp.view) ? comp.view : [comp.view];
    const newNodes = Array.isArray(newOutput.view) ? newOutput.view : [newOutput.view];
    newView = concat(oldNodes, newNodes);
  }

  return new ComponentObj(newView, newOutput.output);
}

export function makeComponent<A> (view: VNodesSparse, output: A): Component<A> {
  return new ComponentObj(view, output);
}
