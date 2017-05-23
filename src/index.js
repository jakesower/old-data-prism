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

const Action = require('./types');

const update = Action.caseOn({
  StartUpload: (model) => {
    readCsv('data-file');
    return R.merge(model, {'dataUploading': true});
  },

  SetData: (newData, model) =>
    R.merge(model, {
      dataUploading: false,
      dataset: newData
    }),
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
})


function readCsv(fileDomId) {
  var input = document.getElementById(fileDomId);
  var file = input.files[0];

  var r = new FileReader();
  // r.onerror = function(e){error(e.target.error.name);};
  r.onload = function(e) {
    const result = e.target.result;
    const handleData = (err, data) => {
      action$(Action.SetData({
        columns: data[0],
        data: R.slice(1, Infinity, data)
      }));
    }

    parseCsv(result, handleData);
  };
  r.readAsText(file);
}


flyd.on(console.log, model$)
