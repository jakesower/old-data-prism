const R = require('ramda');
const S = require('sanctuary');
const flyd = require('flyd');
const forwardTo = require('flyd-forwardto');
const stream = flyd.stream;
const patch = require('snabbdom').init([
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/eventlisteners').default,
  require('snabbdom/modules/attributes').default,
  require('snabbdom/modules/props').default,
]);
const { debounce } = require('./lib/utils');
const { readCsv, readUri } = require('./lib/data-fetchers');

const Main = require('./components/main.js');
const MainAction = require('./components/main/action');

const errorVdom = require('./components/error-view');

// State Functions
const saveState = (model) => {
  localStorage.setItem('state', JSON.stringify(model));
};

const restoreState = () => {
  // return Main.init(null);
  try {
    const restored = JSON.parse(localStorage.getItem('state'));
    // console.log(restored)
    // const safe = S.encase(rehydrateOperations);
    return restored === null ?
      Main.init(null) :
      Main.init(restored);
      // S.fromMaybe(Main.init, safe(restored));
  }
  catch(e) {
    return {};
  }
};

// Side-effect handlers
const action$ = flyd.stream();

// Model -> Action -> Model
const update = (model, action, x) => {
  return MainAction.case({
    LoadLocalFile: domNode => {
      // console.log({model, domNode, action})
      readCsv(action$, domNode);
      return R.merge(model, {dataLoading: true});
    },

    LoadURI: uri => {
      readUri(action$, uri);
      return R.merge(model, {dataLoading: true});
    },

    _: () => {
      return Main.update(action, model)
    }
  })(action);
}

// Streams
const model$ = flyd.scan(update, restoreState(), action$);
const vnode$ = flyd.map(
  // m => S.fromMaybe(
  //   errorVdom(forwardTo(model$, _ => Main.init(null))),
  //   S.encase(Main.view(action$))(m)
  // ),
  Main.view(action$),
  model$
);
// const vnode$ = flyd.map(() => errorVdom, model$)

flyd.map(saveState, model$);
flyd.map(console.log, action$);
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
