const R = require('ramda');
const S = require('sanctuary');
const parseCsv = require('csv-parse');

const view = require('./main/view');
const {Action, Operation} = require('./main/types');
const OperationComponent = require('./operation');
const GridComponent = require('./grid');

const update = Action.caseOn({
  StartUpload: (action$, model) => { // keep action$ out of here TODO
    readCsv(action$, 'data-file');
    return R.merge(model, {'dataUploading': true});
  },

  SetData: (newData, model) =>
    R.merge(model, {
      dataUploading: false,
      dataset: newData,
      page: 'PrepareData'
    }),

  SetPage: R.assoc('page'),

  SetOperationState: (operation, action, model) => {
    const idx = R.indexOf(operation, model.operations);

    return R.evolve({
      operations: R.adjust(OperationComponent.update(action), idx)
    }, model);
  },

  SetGridState: (gridId, action, model) =>
    R.set(R.lensPath(['grids', gridId]), GridComponent.update(action, model), model),

  CreateFilter: model => {
    return R.evolve({
      uid: S.inc,
      operations: S.append(OperationComponent.init('Filter', model.uid))
    }, model)
  },

  CreateDeriver: model => {
    return R.evolve({
      uid: S.inc,
      operations: S.append(OperationComponent.init('Deriver', model.uid))
    }, model)
  },

  DeleteOperation: (operation, model) => {
    return R.assoc('operations',
      S.filter(op => op.id !== operation.id, model.operations),
      model);
  },

  _: function(){ console.error(arguments)}
});



const firstInit = {
  page: 'UploadData',
  dataUploading: false,
  dataset: null,
  uid: 1,
  operations: [],
  grids: {
    prepareData: GridComponent.init(),
  },
};

const init = state => state || firstInit;


// Helper
function readCsv(action$, fileDomId) {
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

module.exports = {Action, view, update, init};
