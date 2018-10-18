const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');

const {Source, Dataset, Operation} = require('../../../types')
const Action = require('../action');

const CollectorListComponent = require('../../collector-list');
const GridComponent = require('../../components/grid');

module.exports = R.curry((action$, model) => {
  const {grid} = model.pageData.remix;
  const {collectorList, sources} = model;
  const rawSource = R.find(s => R.equals(collectorList.source, s.id), sources);
  const source = rawSource ? Source.load(rawSource) : Source.empty;
  const dataset = source.dataset;

  const collector$ = forwardTo(action$, Action.SetCollectorList);
  const ctrlAttrs = action => ({class: {control: true}, on: {click: [action$, action]}});
  const iconed = name => {
    const i = `collector-${name.toLowerCase()}`;
    return h('span', {class: {[i]: true}}, ` ${name}`);
  }

  const operations = R.map(c => Operation.fromCollector(c.key, c.inputs), collectorList.collectors);

  return h('div', {class: {"main-container": true}}, R.flatten([
    h('aside', {},
      CollectorListComponent.view(collector$, {sources, dataset}, collectorList)
    ),

    h('main', {}, [
      GridComponent.view(
        dataset.applyValidOperations(operations, sources),
        forwardTo(action$, Action.SetGridState),
        grid
      )
    ])
  ]))
});
