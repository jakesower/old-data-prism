const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');

const Operation = require('../../../types/operation');
const Action = require('../action');
const {applyOperation, applyOperations, operationsValid} = require('../../../lib/operation-functions');

const OperationListComponent = require('../../operation-list');
const GridComponent = require('../../grid');

module.exports = R.curry((action$, model) => {
  if (!model.dataset) return h('div', {}, '');

  const {dataset, operations, activeOperation, grids} = model;
  const operations$ = forwardTo(action$, Action.SetOperations);

  const ctrlAttrs = action => ({class: {control: true}, on: {click: [action$, action]}});
  const iconed = name => {
    const i = `operation-${name.toLowerCase()}`;
    return h('span', {class: {[i]: true}}, ` ${name}`);
  }

  return h('div', {class: {"main-container": true}}, R.flatten([
    h('aside', {},
      OperationListComponent.view(operations$, dataset, operations),
    ),

    h('main', {}, [
      GridComponent.view(
        applyOperations(dataset, operations),
        forwardTo(action$, Action.SetGridState('prepareData')),
        grids.prepareData
      )
    ])
  ]))
});
