const R = require('ramda');
const S = require('sanctuary');
const parseCsv = require('csv-parse');

const {Dataset} = require('../types/index');

const OperationListComponent = require('./operation-list');
const GridComponent = require('./grid');
const ChartComponent = require('./chart');

const view = require('./main/view');
const Action = require('./main/action');

const update = Action.caseOn({
  SetData: (newData, model) =>
    R.merge(model, {
      dataLoading: false,
      dataset: Dataset(newData.headers, newData.records),
      page: 'Remix'
    }),

  SetPage: R.assoc('page'),
  ToggleHelp: model => R.assoc('help', !model.help, model),
  ToggleWalkthrough: model => R.assoc('walkthrough', !model.walkthrough, model),

  SetOperations: (act, mod) => R.over(
    R.lensProp('operations'),
    OperationListComponent.update(act),
    mod
  ),

  SetGridState: (gridId, action, model) =>
    R.over(R.lensPath(['grids', gridId]), GridComponent.update(action), model),

  SetMainDimensions: R.assoc('mainDimensions'),
  SetChart: (action, model) =>
    R.over(R.lensProp('chart'), ChartComponent.update(action), model),

  // LoadLocalFile, LoadURI are handled externally
  _: function(){ console.error(arguments)}
});


const firstInit = {
  page: 'UploadData',
  dataLoading: false,
  dataset: null,
  help: false,
  walkthrough: false,
  uid: 1,
  operations: OperationListComponent.init(),
  grids: {
    prepareData: GridComponent.init(),
  },
  mainDimensions: {}, // used for chart sizing, should depend on DOM externally
  chart: ChartComponent.init()
};

const init = state => state || firstInit;


module.exports = {Action, view, update, init};
