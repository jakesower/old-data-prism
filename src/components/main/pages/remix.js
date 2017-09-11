const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');

const Operation = require('../../../types/operation');
const {Action, GroupAction} = require('../types');
const {applyOperation, applyOperations, operationsValid} = require('../../../lib/operation-functions');

const OperationListComponent = require('../../operation-list');
const GridComponent = require('../../grid');

module.exports = R.curry((action$, model) => {
  if (!model.dataset) return h('div', {}, '');

  const {dataset, operations: ops, activeOperation, grids} = model;
  const operations = R.map(toOperation, ops);

  const ctrlAttrs = action => ({class: {control: true}, on: {click: [action$, action]}});
  const iconed = name => {
    const i = `operation-${name.toLowerCase()}`;
    return h('span', {class: {[i]: true}}, ` ${name}`);
  }

  return h('div', {class: {"main-container": true}}, R.flatten([
    h('aside', {}, R.flatten([
      OperationListComponent.view(action$, dataset, ops),

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
