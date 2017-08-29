const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');

const {Action, Operation, GroupAction} = require('../types');
const {applyOperation, applyOperations, operationsValid} = require('../../../lib/operation-functions');

const OperationAction = require('../../operation/types').Action;
const OperationComponent = require('../../operation');

const GroupingComponent = require('../../group-operation');

const GridComponent = require('../../grid');

const AGGREGATORS = require('../../../definitions/aggregators');
const DERIVERS = require('../../../definitions/derivers');
const FILTERS = require('../../../definitions/filters');

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


const operationView = R.curry((action$, dataset, editing, operation, idx) => {
  const component = componentsByType[operation.type];

  return component.view(
    itemPools[operation.type],
    dataset,
    editing,
    forwardTo(action$, act => {
      return component.Action.case({
        Delete: () => Action.DeleteOperation(idx),
        StartEdit: () => Action.SetActiveOperation(operation.id),
        StopEdit: () => Action.SetActiveOperation(null),
        _: () => Action.ModifyOperation(idx, component.update, act)
      }, act);
    }),
    operation);
});


const renderOperations = R.curry((action$, dataset, operations, idx, active) => {
  const [head, tail] = [R.head(operations), R.tail(operations)];
  if (!head) return [];

  return R.prepend(
    operationView(action$, dataset, head.id === active, head, idx),
    renderOperations(action$, applyOperation(dataset, head), tail, idx+1, active)
  );
});


module.exports = R.curry((action$, model) => {
  if (!model.dataset) return h('div', {}, '');
  const {dataset, operations, activeOperation, grids} = model;
  const ctrlAttrs = action => ({
    class: {control: true},
    on: {click: [action$, action]}
  });

  return h('div', {class: {"main-container": true}}, R.flatten([
    h('aside', {}, R.flatten([
      renderOperations(action$, dataset, operations, 0, activeOperation),

      h('div', {class: {"prepare-controls": true}, key: 'prepare-controls'}, [
        h('div', ctrlAttrs(Action.CreateFilter), "\uf0b0 Filter"),
        h('div', ctrlAttrs(Action.CreateDeriver), "\uf1ec Deriver"),
        h('div', ctrlAttrs(Action.CreateGrouping), "\uf247 Grouping")
      ])
    ])),

    h('main', {}, [
      GridComponent.view(
        applyOperations(dataset, operations),
        forwardTo(action$, Action.SetGridState('prepareData')),
        grids.prepareData
      )
    ])
  ]))
});
