const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');

const {Action, Operation} = require('../types');
const OperationAction = require('../../operation/types').Action;
const {applyOperations} = require('../../../lib/operation-functions');
const OperationComponent = require('../../operation');
const GridComponent = require('../../grid');
const FILTERS = require('../../../lib/filters');
const DERIVERS = require('../../../lib/derivers');

const viewOC = op => {
  const cases = {
    Filter: op => OperationComponent.view(FILTERS, R.__, R.__, op),
    Deriver: op => OperationComponent.view(DERIVERS, R.__, R.__, op)
  };

  return cases[op.type](op);
};

module.exports = R.curry((action$, model) => {
  if (!model.dataset) return h('div', {}, '');

  const dataset = applyOperations(model.dataset, model.operations);

  return h('div', {class: {"main-container": true}}, R.flatten([
    h('aside', {class: "prepare-controls"}, R.flatten([
      R.map(operation => {
        return viewOC(operation)(
          dataset,
          // forwardTo(action$, Action.SetOperationState(operation))
          forwardTo(action$, a => {
            return OperationAction.case({
              Delete: () => Action.DeleteOperation(operation),
              _: () => Action.SetOperationState(operation, a)
            }, a);
          })
        )},
        model.operations),

      h('button', {on: {click: [action$, Action.CreateDeriver]}}, "Derive Field"),
      h('button', {on: {click: [action$, Action.CreateFilter]}}, "Add Filter"),
      h('button', {}, "Perform Grouping")
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
