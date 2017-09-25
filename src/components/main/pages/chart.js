const R = require('ramda');
const forwardTo = require('flyd-forwardto');

const ChartComponent = require('../../chart');
const Action = require('../action');
const {Operation} = require('../../../types');


module.exports = R.curry((action$, model) => {
  const {mainDimensions, chart} = model;
  const operations = R.map(o => Operation.fromDefinition(o), model.operations.operations);
  const dataset = model.dataset.applyValidOperations(operations);
  const chartAction$ = forwardTo(action$, Action.SetChart);

  return ChartComponent.view(chartAction$, {dimensions: mainDimensions, dataset}, chart);
});
