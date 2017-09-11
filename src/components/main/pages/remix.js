const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');

const Operation = require('../../../types/operation');
const {Action, GroupAction} = require('../types');
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
  const operation = toOperation(head);

  return R.prepend(
    operationView(action$, dataset, head.id === active, head, idx),
    renderOperations(action$, operation.apply(dataset), tail, idx+1, active)
  );
});


module.exports = R.curry((action$, model) => {
  // operations list
  // grid
  // andnomore


  if (!model.dataset) return h('div', {}, '');
  const {dataset, operations: ops, activeOperation, grids} = model;
  const operations = R.map(toOperation, ops);
  const ctrlAttrs = action => ({
    class: {control: true},
    on: {click: [action$, action]}
  });

  const iconed = name => {
    const i = `operation-${name.toLowerCase()}`;
    return h('span', {class: {[i]: true}}, ` ${name}`);
  }

  return h('div', {class: {"main-container": true}}, R.flatten([
    h('aside', {}, R.flatten([
      renderOperations(action$, dataset, ops, 0, activeOperation),

      h('div', {class: {"prepare-controls": true}, key: 'prepare-controls'}, [
        h('div', ctrlAttrs(Action.CreateFilter), iconed('Filter')),
        h('div', ctrlAttrs(Action.CreateDeriver), iconed('Deriver')),
        h('div', ctrlAttrs(Action.CreateGrouping), iconed('Grouping')),
      ]),

      h('div', {class: {"prepare-controls": true}, key: 'prepare-controls'}, [
        h('div', ctrlAttrs(Action.PickColumns), iconed('Columns')),
        h('div', ctrlAttrs(Action.SaveRemix), iconed('Save')),
        h('div', ctrlAttrs(Action.SaveRemix), iconed('Download')),
      ]),

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

// the opposite of cool:
function toOperation(op) {
  switch (op.type) {
    case 'Filter':
    case 'Deriver':
    case 'Aggregator':
      return op.definition ? Operation[op.type](op.definition, op.inputs) : Operation.Empty;
    case 'Grouping':
      return Operation.Grouping(op.inputs);
  }
}
