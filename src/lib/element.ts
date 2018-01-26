// Acts much like a VNode, except it can figure out which children are
// components and turn them into VNodes.

import { is, map } from 'ramda';
import { VNodeData, VNode, vnode } from 'snabbdom/vnode';
import { h, VNodesSparse } from 'snabbdom/h';
import { create } from '@most/create';
import { Component, makeComponent } from './component';

export type ElementNodesSparse = VNode | Component<any> | Array<VNode | Component<any> | undefined | null>;

interface hCall {
  (): VNode
  (data: VNodeData): VNode
  (text: string): VNode
  (children: ElementNodesSparse): VNode
  (data: VNodeData, text: string): VNode
  (data: VNodeData, children: ElementNodesSparse): VNode
}

function hh(sel: string) {
  const expand = c => map(c.isComponent ? c.view : c);

  return <hCall>(b?: any, c?: any) => {
    // TODO: handle case of single component child
    const b_ = (c === undefined && b !== undefined && is(Array, b)) ? expand(b) : b;
    const c_ = (c !== undefined && is(Array, c)) ? expand(c) : c;

    const vnode = h(sel, b_, c_);
    const output = vnode.data.output || {};

    return makeComponent(vnode, output);
  }
}

function hhh(sel: string, outputs: string[]): Component<any> {
  // GOAL: return an object of streams that map to dom actions
  // Add the proper hooks on insert, remove them and end streams on destroy

  // 🎁
  // wut imperative?!
  // const streams = map(o => ({[o]: }))
  // const handler =
  // signature: create((add, end, error) => { ... }) no touchie the function args outside the closure
  // might need to add a general event listener(s) and dispatch by hand
  // see: https://github.com/snabbdom/snabbdom/blob/master/src/modules/eventlisteners.ts
  // see: https://github.com/mostjs/create
}

export const input = hhh('input', ['change']);
export const div = hh('div');
export const span = hh('span');
