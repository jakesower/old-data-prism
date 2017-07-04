const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');

const {Action, Operation, GroupAction} = require('../types');
const {applyOperations} = require('../../../lib/operation-functions');

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

const mapWithIndex = R.addIndex(R.map);


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


module.exports = R.curry((action$, model) => {
  if (!model.dataset) return h('div', {}, '');

  const dataset = applyOperations(model.dataset, model.operations);

  return h('div', {class: {"main-container": true}}, R.flatten([
    h('aside', {class: {"prepare-controls": true}}, R.flatten([
      mapWithIndex(operationView(action$, dataset), model.operations),

      h('button', {on: {click: [action$, Action.CreateDeriver]}}, "Derive Field"),
      h('button', {on: {click: [action$, Action.CreateFilter]}}, "Add Filter"),
      h('button', {on: {click: [action$, Action.CreateGrouping]}}, "Perform Grouping")
    ])),

    h('main', {}, [
      GridComponent.view(
        dataset,
        forwardTo(action$, Action.SetGridState('prepareData')),
        model.grids.prepareData
      )
    ])
  ]))
});
