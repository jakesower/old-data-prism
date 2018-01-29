// Acts much like a VNode, except it can figure out which children are
// components and turn them into VNodes.

import { is, map, merge } from 'ramda';
import { VNodeData, VNode, vnode } from 'snabbdom/vnode';
import { h, VNodesSparse } from 'snabbdom/h';
import { fromEvent } from 'most';
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


const eventMap = {
  change: 'keyup',
};


function eventHooks(oldVnode: VNode, vnode: VNode): void {
  const oldOutput = (oldVnode.data as VNodeData).output;
  const oldElm: Element = oldVnode.elm as Element;
  const output = vnode && (vnode.data as VNodeData).output;
  const elm: Element = (vnode && vnode.elm) as Element;

  if (oldOutput === output) {
    return;
  }

  // if (oldOutput && !output) {

  // }

  if (output && !oldOutput) {
    fromEvent('keyup', elm);
  }
}

function hhh(sel: string, outputs?: string[]) {
  // GOAL: return an object of streams that map to dom actions
  // Add the proper hooks on insert, remove them and end streams on destroy

  return <hCall>(b?: any, c?: any) => {
    if (outputs) {
      const b_ = is(Object, b) ? merge({output: outputs}, b) : b;

      const vnode = h(sel, b_, c);
      const output = vnode.data.output || {};

      return makeComponent(vnode, output);
    } else {
      return h(sel, b, c);
    }

  }
}

export const input = hhh('input', ['change']);
export const div = hh('div');
export const span = hh('span');
