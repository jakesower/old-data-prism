import { is, concat, omit } from 'ramda';
import { h } from 'snabbdom';
import { VNodeData, VNode } from "snabbdom/vnode";
import { Stream } from "most";
import { VNodesSparse } from "snabbdom/h";

interface Component<A> {
  output: A,
  vnodes: VNode[]
}

interface ElementData extends VNodeData {
  output: {}
}

interface ButtonOutput {
  click: Stream<Event>
}

type Button = Component<ButtonOutput>
// A bottom level component.

// Button: Component<{click: Stream<ClickEvent>}>

// export function makeButton(sel: string): Button
// export function makeButton(sel: string, data: ElementData): Button
// export function makeButton(sel: string, text: string): Button
// export function makeButton(sel: string, children: VNodesSparse): Button
// export function makeButton(sel: string, data: ElementData, text: string): Button
// export function makeButton(sel: string, data: ElementData, children: VNodesSparse): Button
// export function makeButton(sel: string, b?: any, c?: any): Button {
//   let data: ElementData, children: VNodesSparse, text: any, i: number;

//   if (c !== undefined) {
//     data = b;
//     if (is(Array, c)) { children = c; }
//     else if (is(String, c) || is(Number, c)) { text = c }
//     else if (c && c.sel) { children = [c] }
//   } else if (b !== undefined) {
//     if (is(Array, b)) { children = b }
//     else if (is(String, b) || is(Number, b)) { text = b }
//     else if (b && b.sel) { children = [b] }
//     else { data = b }
//   }
// }

export function makeButton(data: ElementData): Button
export function makeButton(data: ElementData, text: string): Button
export function makeButton(a?: any, b?: any): Button {
  const vnode = h('button', a, b);
  const { output } = vnode.data;

  return { vnodes: [vnode], output };
}

function viewComponent<A> (component: Component<A>): VNode[] {
  return component.vnodes;
}


const viewButton = ((state: {}, button: Button): VNode => {
  return omit(['output'], button);
});


function makeComponent<A> (vnodes: VNode[], output: A): Component<A> {
  return { vnodes, output };
}


function of<A> (x: A): Component<A> {
  return {
    vnodes: [],
    output: x
  };
}

// Requirements for chain:
// 1. Must allow ANY value in its context (but functions that consume it can ignore dumb ones)
// 2. Must accrete a VNode representation of the component


function chain<A, B>(comp: Component<A>, fn: (x: A) => Component<B>): Component<B> {
  // ignore the error about output for now
  const newOutput = fn(comp.output);

  return {
    vnodes: concat(comp.vnodes, newOutput.vnodes),
    output: newOutput.output
  };
}
