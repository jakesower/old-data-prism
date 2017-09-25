const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');

const Operation = require('../../../types/operation');
const Action = require('../action');

const OperationListComponent = require('../../operation-list');
const GridComponent = require('../../grid');

module.exports = R.curry((action$, model) => {
  if (!model.dataset) return h('div', {}, '');

  const {dataset, operations: operationsList, activeOperation, grids} = model;
  const operations = R.map(o => Operation.fromDefinition(o), operationsList.operations);
  const operations$ = forwardTo(action$, Action.SetOperations);

  const ctrlAttrs = action => ({class: {control: true}, on: {click: [action$, action]}});
  const iconed = name => {
    const i = `operation-${name.toLowerCase()}`;
    return h('span', {class: {[i]: true}}, ` ${name}`);
  }

  return h('div', {class: {"main-container": true}}, R.flatten([
    h('aside', {},
      OperationListComponent.view(operations$, dataset, operationsList)
    ),

    h('main', {}, [
      GridComponent.view(
        dataset.applyValidOperations(operations),
        forwardTo(action$, Action.SetGridState('prepareData')),
        grids.prepareData
      )
    ])
  ]))
});
