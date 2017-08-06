import S from 'sanctuary';
import flyd from 'flyd';
import snabCl from 'snabbdom/modules/class';
import snabEv from 'snabbdom/modules/eventlisteners';
import snabAt from 'snabbdom/modules/attributes';
import snabPr from 'snabbdom/modules/props';
import { init as snabPatch  } from 'snabbdom';
import { debounce  } from './lib/utils';

import * as Main from './components/main.js';
import { Action as MainAction  } from './components/main/types';

const stream = flyd.stream;

const patch = snabPatch([
  snabCl,
  snabEv,
  snabAt,
  snabPr,
]);

// State Functions
const saveState = (model) => {
  localStorage.setItem('state', JSON.stringify(model));
};

const restoreState = () => {
  // return Main.init(null);
  const restored = JSON.parse(localStorage.getItem('state'));
  return restored === null ? Main.init : restored;
};

// Streams
const action$ = flyd.stream();
const model$ = flyd.scan(S.flip(Main.update), restoreState(), action$);
const vnode$ = flyd.map(Main.view(action$), model$);

flyd.map(saveState, model$);
flyd.map(console.log, model$);


// Side effects (aka necessary evils)

const setDimensions = () => {
  const elt = document.querySelector('main');
  action$(MainAction.SetMainDimensions({
    height: elt.clientHeight,
    width: elt.clientWidth
  }));
}


window.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('#main');
  flyd.scan(patch, container, vnode$);
  setDimensions();
});

window.onresize = debounce(setDimensions, 400);
