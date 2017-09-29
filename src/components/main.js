const R = require('ramda');
const S = require('sanctuary');
const parseCsv = require('csv-parse');

const {Dataset} = require('../types/index');

const CollectorListComponent = require('./collector-list');
const GridComponent = require('./grid');
const ChartComponent = require('./chart');

const view = require('./main/view');
const Action = require('./main/action');

const update = Action.caseOn({
  SetData: (newData, model) =>
    R.merge(model, {
      dataLoading: false,
      dataset: newData,
      page: 'Remix'
    }),

  SetPage: R.assoc('page'),
  ToggleHelp: model => R.assoc('help', !model.help, model),
  ToggleWalkthrough: model => R.assoc('walkthrough', !model.walkthrough, model),

  SetCollectors: (act, mod) => R.over(
    R.lensProp('collectors'),
    CollectorListComponent.update(act),
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
  collectors: CollectorListComponent.init(),
  grids: {
    prepareData: GridComponent.init(),
  },
  mainDimensions: {}, // used for chart sizing, should depend on DOM externally
  chart: ChartComponent.init()
};

const init = state => state || firstInit;


module.exports = {Action, view, update, init};
