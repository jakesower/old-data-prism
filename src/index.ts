import { merge } from 'ramda';
import * as snabbdom from 'snabbdom';
import snabClass = require('snabbdom/modules/class');
import snabELs = require('snabbdom/modules/eventlisteners');
import snabAttrs = require('snabbdom/modules/attributes');
import snabProps = require('snabbdom/modules/props');

const h = snabbdom.h;

const patch = snabbdom.init([
  snabClass.default,
  snabELs.default,
  snabAttrs.default,
  snabProps.default,
]);

interface Model {
  page: string,
  sources: Source[],
  activeSource: Source,
  dataLoading: boolean,
  help: boolean,
  walkthrough: boolean,
  uid: number,
  mainDimensions: { width: number, height: number },
}

const root = document.querySelector('#app');

function pairwise(prev: any, current: any): any {
  return { seed: current, value: [prev, current] };
}

const view$ = Counter;

view$
  .loop(pairwise, (document.querySelector('#main') as Element))
  .observe(([a, b]) => patch(a, b));
