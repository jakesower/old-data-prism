const R = require('ramda');
const S = require('sanctuary');
const flyd = require('flyd');
const Type = require('union-type');
const stream = flyd.stream;
const parseCsv = require('csv-parse');
const patch = require('snabbdom').init([
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/eventlisteners').default,
  require('snabbdom/modules/attributes').default,
]);

const view = require('./view');
const Action = require('./types').Action;
const Filter = require('./components/filter');

const update = Action.caseOn({
  StartUpload: (model) => {
    readCsv('data-file');
    return R.merge(model, {'dataUploading': true});
  },

  SetData: (newData, model) =>
    R.merge(model, {
      dataUploading: false,
      dataset: newData,
      page: 'PrepareData'
    }),

  SetPage: R.assocPath(['state', 'grid', 'page']),
  SetOperationState: (filter, action, model) => {
    const idx = R.indexOf(filter, model.operations);
    return R.evolve({
      operations: R.adjust(Filter.update(action), idx)
    }, model);
  },

  CreateFilter: model => R.evolve({
    uid: S.inc,
    operations: S.append(Operation.Filter.init(model.uid))
  }, model),

  _: function(){ console.error(arguments)}
});



const init = () => ({
  page: 'UploadData',
  dataUploading: false,
  dataset: null,
  uid: 1,
  operations: [],
  state: {              // TODO: consider puttings these into components
    grid: {
      page: 1,
      perPage: 20
    }
  }
});


// State Functions
const saveState = (model) => {
  localStorage.setItem('state', JSON.stringify(model));
};

const restoreState = () => {
  // return init();
  const restored = JSON.parse(localStorage.getItem('state'));
  return restored === null ? init() : restored;
};



// Streams

const action$ = flyd.stream();
const model$ = flyd.scan(S.flip(update), restoreState(), action$);
const vnode$ = flyd.map(view(action$), model$);

flyd.map(saveState, model$);


// Side effects

window.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('#main');
  flyd.scan(patch, container, vnode$);
});



function readCsv(fileDomId) {
  var input = document.getElementById(fileDomId);
  var file = input.files[0];

  var r = new FileReader();
  // r.onerror = function(e){error(e.target.error.name);};
  r.onload = function(e) {
    const result = e.target.result;
    const handleData = (err, data) => {
      action$(Action.SetData({
        headers: data[0],
        records: R.slice(1, Infinity, data)
      }));
    }

    parseCsv(result, handleData);
  };

  r.readAsText(file);
}


// flyd.on(console.log, action$)
flyd.on(console.log, model$)
