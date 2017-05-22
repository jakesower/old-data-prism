const R = require('ramda');
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

const Action = Type({
  StartUpload: [],
  // SetData: [Array]
})

const update = Action.caseOn({
  StartUpload: (model) => {
    // readCsv('data-file');
    return R.merge(model, {'dataUploading': true});
  },

  // SetData: (newData, model) =>
  //   R.merge(model, {
  //     dataUploading: false,
  //     data: newData
  //   }),
});



const init = {
  page: 'UploadData',
  dataUploading: false,
  dataset: []
};


// Streams

const action$ = flyd.stream();
const model$ = flyd.scan(R.flip(update), init, action$);
const vnode$ = flyd.map(view(action$), model$);



// Side effects

window.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('#main');
  flyd.scan(patch, container, vnode$);
  action$(Action.StartUpload())
})


function readCsv(fileDomId) {
  console.log('hola')
  var input = document.getElementById(fileDomId);
  var file = input.files[0];

  var r = new FileReader();
  // r.onerror = function(e){error(e.target.error.name);};
  r.onload  = function(e) {
    const result = e.target.result;
    const parsed = parseCsv(result);

    action$(Action.SetData({
      columns: parsed[0],
      data: R.slice(1, Infinity, parsed)
    }));
  };
  r.readAsText(file);
}


flyd.on(console.log, model$)
