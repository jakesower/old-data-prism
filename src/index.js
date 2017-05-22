const R = require('ramda');
const flyd = require('flyd');
const stream = flyd.stream;
const patch = require('snabbdom').init([
  require('snabbdom/modules/class'),
  require('snabbdom/modules/style'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/eventlisteners'),
]);

const view = require('./view');


// Streams

const init = {
  page: 'UploadData'
}

const update = (acc, x) => x;

const action$ = flyd.stream();
const model$ = flyd.scan(update, init, action$);
const vnode$ = flyd.map(view(action$), model$);


// Side effects

window.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('#main');
  flyd.scan(patch, container, vnode$)
})

flyd.on(console.log, vnode$)
