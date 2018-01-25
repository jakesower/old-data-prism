import { concat } from 'ramda';
import { VNode } from "snabbdom/vnode";
import { Stream, empty } from "most";

export interface Component<A> {
  output: A,
  view: Stream<VNode>[],
}

function of<A> (x: A): Component<A> {
  return {
    view: [],
    output: x,
  };
}

function chain<A, B>(comp: Component<A>, fn: (x: A) => Component<B>): Component<B> {
  // ignore the error about output for now
  const newOutput = fn(comp.output);

  return {
    view: concat(comp.view, newOutput.view),
    output: newOutput.output
  };
}

function view(comp: Component<any>): VNode {
  // TODO: for lists, wrap them invisibly into one VNode; this `div` thing is BS
  return div(comp.view);
}

/**
 * Sample pool slot collector:
 *
 * Inputs: Slot pool
 * Outputs: A value from the pool or undefined (view implicit)
 *
 *
 * Operation List:
 *
 * Inputs: A DataTable
 * Outputs: A list of operations (view implicit)
*/
type Handler = (ev: Event) => Stream<any>;

interface HandlerMap {
  [prop: string]: Handler
}

interface StreamMap {
  [prop: string]: Stream<any>
}

type Model = ((ss: StreamMap, ...args: any[] ) => Component<any>);
type View = ((handlers: HandlerMap, state: any, ...args: any[] ) => VNode);

function makeComponent(model: Model, view: View) {
  // const fakeStreamMap: StreamMap = new Proxy({}, { get: empty });

  // return (function () {
  //   const modelStreams = model(fakeStreamMap).output;

  //   const model_ = model(viewStreams);
  // }());
}
