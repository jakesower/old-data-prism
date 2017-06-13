const S = require('sanctuary');
const flyd = require('flyd');
const stream = flyd.stream;
const patch = require('snabbdom').init([
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/eventlisteners').default,
  require('snabbdom/modules/attributes').default,
  require('snabbdom/modules/props').default,
]);

const Main = require('./components/main.js');

// State Functions
const saveState = (model) => {
  localStorage.setItem('state', JSON.stringify(model));
};

const restoreState = () => {
  return Main.init(null);
  const restored = JSON.parse(localStorage.getItem('state'));
  return restored === null ? Main.init : restored;
};


// Streams
const action$ = flyd.stream();
const model$ = flyd.scan(S.flip(Main.update), restoreState(), action$);
const vnode$ = flyd.map(Main.view(action$), model$);

flyd.map(saveState, model$);
flyd.map(console.log, model$);


// Side effects

window.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('#main');
  flyd.scan(patch, container, vnode$);
});
