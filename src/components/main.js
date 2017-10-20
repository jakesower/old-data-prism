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
  CreateSource: (name, data, model) =>
    R.evolve({
      dataLoading: () => false,
      sources: R.append({id: model.uid, name, data, schema: {}}),
      activeSource: () => model.uid,
      uid: R.inc
    }, model),

  SetActiveSource: R.assoc('activeSource'),
  SetPage: R.assoc('page'),

  ToggleHelp: model => R.assoc('help', !model.help, model),
  ToggleWalkthrough: model => R.assoc('walkthrough', !model.walkthrough, model),

  SetCollectorList: (act, mod) => R.over(
    R.lensPath(['collectorList']),
    CollectorListComponent.update(act),
    mod
  ),

  SetGridState: (action, model) =>
    R.over(R.lensPath(['pageData', 'remix', 'grid']), GridComponent.update(action), model),

  SetMainDimensions: R.assoc('mainDimensions'),
  SetChart: (action, model) =>
    R.over(R.lensProp('chart'), ChartComponent.update(action), model),

  // LoadLocalFile, LoadURI are handled externally
  _: function(){ console.error(arguments)}
});


const firstInit = {
  page: 'Source',

  pageData: {
    sources: {
      sourceName: "",
    },
    remix: {
      grid: GridComponent.init(),
    },
    chart: ChartComponent.init(),
    annotate: {}
  },

  sources: [],  // source is {name: x, dataset: y, schema: z, id: w}
  collectorList: CollectorListComponent.init(),
  activeSource: null,

  dataLoading: false,
  help: false,
  walkthrough: false,

  uid: 1,
  mainDimensions: {}, // used for chart sizing, should depend on DOM externally
};

const init = state => state || firstInit;


module.exports = {Action, view, update, init};
