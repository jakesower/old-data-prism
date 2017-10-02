const R = require('ramda');
const forwardTo = require('flyd-forwardto');

const ChartComponent = require('../../chart');
const Action = require('../action');
const {Dataset, Operation} = require('../../../types');


module.exports = R.curry((action$, model) => {
  const {mainDimensions, chart} = model;

  const initDataset = Dataset(model.dataset.headers, model.dataset.records);
  const operations = R.map(c => Operation.fromCollector(c.key, c.inputs), model.collectors.collectors);
  const dataset = initDataset.applyValidOperations(operations);

  const chartAction$ = forwardTo(action$, Action.SetChart);

  return ChartComponent.view(chartAction$, {dimensions: mainDimensions, dataset}, chart);
});
