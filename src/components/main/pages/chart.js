const R = require('ramda');
const ChartComponent = require('../../chart');
const Action = require('../action');
const {applyOperations} = require('../../../lib/operation-functions');
const forwardTo = require('flyd-forwardto');


module.exports = R.curry((action$, model) => {
  const {mainDimensions, chart} = model;
  const dataset = applyOperations(model.dataset, model.operations);
  const chartAction$ = forwardTo(action$, Action.SetChart);

  return ChartComponent.view(chartAction$, mainDimensions, dataset, chart);
});
