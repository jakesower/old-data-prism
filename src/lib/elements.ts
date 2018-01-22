import { VNodeData, VNode, vnode } from 'snabbdom/vnode';
import { h, VNodesSparse } from 'snabbdom/h';
import { makeComponent } from './component';
import { fromEvent } from 'most';

interface ElementData extends VNodeData {
  output?: {}
}

interface hCall {
  (): VNode
  (data: ElementData): VNode
  (text: string): VNode
  (children: VNodesSparse): VNode
  (data: ElementData, text: string): VNode
  (data: ElementData, children: VNodesSparse): VNode
}

function hh(sel: string) {
  return <hCall>(b?: any, c?: any) => h(sel, b, c);
}

export const div = hh('div');
export const span = hh('span');

export const button = makeComponent(
  {},
  hh('button')({ on: { click: fromEvent }}),
  {click: }
)
