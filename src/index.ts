import { merge } from 'ramda';
import * as snabbdom from 'snabbdom';
import snabClass = require('snabbdom/modules/class');
import snabAttrs = require('snabbdom/modules/attributes');
import snabProps = require('snabbdom/modules/props');
import { of } from 'most';
import { view } from './components/main';

const h = snabbdom.h;

const patch = snabbdom.init([
  snabClass.default,
  snabAttrs.default,
  snabProps.default,
]);

const root = document.querySelector('#app');
console.log(view);

const view$ = view.view$().map(a => Array.isArray(a) ? h('div', a) : a);
console.log(view$)

function pairwise(prev: any, current: any): any {
  return { seed: current, value: [prev, current] };
}

view$
  .loop(pairwise, (document.querySelector('#main') as Element))
  .observe(([a, b]) => patch(a, b));
