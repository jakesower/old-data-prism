const R = require('ramda');
const Maybe = require('ramda-fantasy').Maybe;
const {Just, Nothing} = Maybe;
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
const Action = require('./types');

const EMPTY_FILTER = id => {
  id,
  fn: Nothing(),
  columns: {},
  userInputs: {}
};

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

  CreateFilter: model => R.evolve({
    filterId: R.inc,
    filters: R.append(EMPTY_FILTER(model.filterId)),
    editingFilter: model.filterId
  }, model),
  SetEditingFilter: R.assocPath(['state', 'prepare', 'editingFilter']),
  SetFilterFunc: R.assocPath(['state', 'prepare', 'filterFunc']),
});



const init = {
  page: 'UploadData',
  dataUploading: false,
  dataset: Nothing(),
  filterId: 0,
  filters: [],
  state: {              // TODO: consider puttings these into components
    grid: {
      page: 1,
      perPage: 20
    },
    prepare: {
      editingFilter: Nothing(),
      editingDerived: false
    }
  }
};


// Streams

const action$ = flyd.stream();
const model$ = flyd.scan(R.flip(update), init, action$);
const vnode$ = flyd.map(view(action$), model$);



// Side effects

window.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('#main');
  flyd.scan(patch, container, vnode$);
})


function readCsv(fileDomId) {
  var input = document.getElementById(fileDomId);
  var file = input.files[0];

  var r = new FileReader();
  // r.onerror = function(e){error(e.target.error.name);};
  r.onload = function(e) {
    const result = e.target.result;
    const handleData = (err, data) => {
      console.log({ columns: data[0], records: R.slice(1, Infinity, data) })
      action$(Action.SetData({
        columns: data[0],
        records: R.slice(1, Infinity, data)
      }));
    }

    parseCsv(result, handleData);
  };

  r.readAsText(file);
}


flyd.on(console.log, model$)
