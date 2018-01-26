// Acts much like a VNode, except it can figure out which children are
// components and turn them into VNodes.

import { is, map } from 'ramda';
import { VNodeData, VNode, vnode } from 'snabbdom/vnode';
import { h, VNodesSparse } from 'snabbdom/h';
import { fromEvent } from 'most';
import { Component } from './component';

export type ElementNodesSparse = VNode | Component<any> | Array<VNode | Component<any> | undefined | null>;

interface hCall {
  (): VNode
  (data: VNodeData): VNode
  (text: string): VNode
  (children: ElementNodesSparse): VNode
  (data: VNodeData, text: string): VNode
  (data: VNodeData, children: ElementNodesSparse): VNode
}

const viewComponent = ((c: Component<any>) => c.view());

function hh(sel: string) {
  const expand = c => map(c.isComponent ? viewComponent(c) : c);

  return <hCall>(b?: any, c?: any) => {
    // TODO: handle case of single component child
    const b_ = (c === undefined && b !== undefined && is(Array, b)) ? expand(b) : b;
    const c_ = (c !== undefined && is(Array, c)) ? expand(c) : c;

    return h(sel, b_, c_);
  }
}

export const div = hh('div');
export const span = hh('span');
