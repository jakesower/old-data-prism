const R = require('ramda');
const S = require('sanctuary');
const parseCsv = require('csv-parse');

const Dataset = require('../types/dataset');

const view = require('./main/view');
const {Action, Operation} = require('./main/types');
const OperationComponent = require('./operation');
const GroupingComponent = require('./group-operation');
const GridComponent = require('./grid');
const ChartComponent = require('./chart');

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

  SetOperations: R.assoc('operations'),

  SetActiveOperation: R.assoc('activeOperation'),

  ModifyOperation: (idx, updateFn, action, model) => {
    return R.evolve({
      operations: R.adjust(updateFn(action), idx)
    }, model);
  },

  DeleteOperation: (idx, model) => {
    return R.evolve({
      operations: R.remove(idx, 1)
    }, model);
  },

  SetGridState: (gridId, action, model) =>
    R.over(R.lensPath(['grids', gridId]), GridComponent.update(action), model),

  SetMainDimensions: R.assoc('mainDimensions'),
  SetChart: (action, model) =>
    R.over(R.lensProp('chart'), ChartComponent.update(action), model),

  CreateFilter: model => {
    return R.evolve({
      uid: S.inc,
      operations: S.append(OperationComponent.init('Filter', model.uid, false)),
      activeOperation: R.always(model.uid),
    }, model)
  },

  CreateDeriver: model => {
    return R.evolve({
      uid: S.inc,
      operations: S.append(OperationComponent.init('Deriver', model.uid, true)),
      activeOperation: R.always(model.uid),
    }, model)
  },

  CreateGrouping: model => {
    return R.evolve({
      uid: S.inc,
      operations: S.append(GroupingComponent.init(model.uid)),
      activeOperation: R.always(model.uid),
    }, model)
  },

  // LoadLocalFile, LoadURI are handled externally
  _: function(){ console.error(arguments)}
});


const firstInit = {
  page: 'UploadData',
  dataLoading: false,
  dataset: null,
  help: false,
  walkthrough: false,
  activeOperation: null,
  uid: 1,
  operations: [],
  grids: {
    prepareData: GridComponent.init(),
  },
  mainDimensions: {}, // used for chart sizing, should depend on DOM externally
  chart: ChartComponent.init()
};

const init = state => state || firstInit;


module.exports = {Action, view, update, init};
