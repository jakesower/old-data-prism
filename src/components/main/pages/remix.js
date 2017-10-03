const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');

const {Dataset, Operation} = require('../../../types')
const Action = require('../action');

const CollectorListComponent = require('../../collector-list');
const GridComponent = require('../../grid');

module.exports = R.curry((action$, model) => {
  if (!model.dataset) return h('div', {}, '');

  const {collectors, grids} = model;
  const dataset = Dataset.fromCSV(model.dataset);

  const collector$ = forwardTo(action$, Action.SetCollectors);
  const ctrlAttrs = action => ({class: {control: true}, on: {click: [action$, action]}});
  const iconed = name => {
    const i = `collector-${name.toLowerCase()}`;
    return h('span', {class: {[i]: true}}, ` ${name}`);
  }

  const operations = R.map(c => Operation.fromCollector(c.key, c.inputs), collectors.collectors);

  return h('div', {class: {"main-container": true}}, R.flatten([
    h('aside', {},
      CollectorListComponent.view(collector$, dataset, collectors)
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
