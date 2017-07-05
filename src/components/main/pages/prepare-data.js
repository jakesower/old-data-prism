const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');

const {Action, Operation, GroupAction} = require('../types');
const {applyOperation, applyOperations} = require('../../../lib/operation-functions');

const OperationAction = require('../../operation/types').Action;
const OperationComponent = require('../../operation');

const GroupingComponent = require('../../group-operation');

const GridComponent = require('../../grid');

const AGGREGATORS = require('../../../lib/aggregators');
const DERIVERS = require('../../../lib/derivers');
const FILTERS = require('../../../lib/filters');

const itemPools = {
  Filter: FILTERS,
  Deriver: DERIVERS,
  Grouping: AGGREGATORS,
};

const componentsByType = {
  Filter: OperationComponent,
  Deriver: OperationComponent,
  Grouping: GroupingComponent
}


const operationView = R.curry((action$, dataset, operation, idx) => {
  const component = componentsByType[operation.type];

  return component.view(
    itemPools[operation.type],
    dataset,
    forwardTo(action$, act => {
      return component.Action.case({
        Delete: () => Action.DeleteOperation(idx),
        _: () => Action.ModifyOperation(idx, component.update, act)
      }, act);
    }),
    operation);
});


const renderOperations = R.curry((action$, dataset, operations, idx) => {
  const [head, tail] = [R.head(operations), R.tail(operations)];
  if (!head) return [];

  return R.prepend(
    operationView(action$, dataset, head, idx),
    renderOperations(action$, applyOperation(dataset, head), tail, idx+1)
  );
});


module.exports = R.curry((action$, model) => {
  if (!model.dataset) return h('div', {}, '');

  return h('div', {class: {"main-container": true}}, R.flatten([
    h('aside', {class: {"prepare-controls": true}}, R.flatten([
      renderOperations(action$, model.dataset, model.operations, 0),

      h('button', {on: {click: [action$, Action.CreateDeriver]}}, "Derive Field"),
      h('button', {on: {click: [action$, Action.CreateFilter]}}, "Add Filter"),
      h('button', {on: {click: [action$, Action.CreateGrouping]}}, "Perform Grouping")
    ])),

    h('main', {}, [
      GridComponent.view(
        applyOperations(model.dataset, model.operations),
        forwardTo(action$, Action.SetGridState('prepareData')),
        model.grids.prepareData
      )
    ])
  ]))
});
