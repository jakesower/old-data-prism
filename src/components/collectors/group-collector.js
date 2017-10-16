const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');
const Type = require('union-type');

const OperationComponent = require('../operation');
const {Slot, DataType} = require('../../types');
const slotDom = require('../helpers/slot-dom');
const aggregatorPool = require('../../definitions/helpers/aggregators');


const Action = Type({
  SetColumns: [Array],
  CreateAggregator: [],
  SetAggregator: [Number, Object],
  DeleteAggregator: [Number],
  SetActive: [R.T],
});


const update = Action.caseOn({
  SetColumns: R.assoc('columns'),
  CreateAggregator: model => {
    return R.evolve({
      aggregators: R.append(OperationComponent.init('Aggregator', model.uid)),
      uid: R.inc,
      active: R.always(model.uid),
    }, model);
  },
  SetAggregator: (id, act, mod) => R.over(
    R.lensProp('aggregators'),
    R.map(agg => agg.id === id ? OperationComponent.update(act, agg) : agg),
    mod
  ),
  DeleteAggregator: (id, mod) => R.over(
    R.lensProp('aggregators'),
    R.filter(agg => agg.id !== id),
    mod
  ),
  SetActive: R.assoc('active'),
});


const init = (_, id) => ({
  id: id,
  uid: 1,
  active: null,

  columns: [],
  aggregators: [],
});


const view = (action$, dataset, model) => {
  const {id, columns, aggregators, active} = model;

  return h('div', {class: {"collector-list": true}}, R.flatten([
    slotDom(
      forwardTo(set$, Action.SetColumns),
      Slot.Multipool('columns', 'Grouping Columns', DataType.FiniteNumber, pool),
      columns
    ),

    R.map(
      aggregator => active === aggregator.id ?
        renderActiveAggregator(action$, dataset, aggregator) :
        renderInactiveAggregator(action$, dataset, aggregator),
      aggregators
    )
  ]));
}


function renderActiveAggregator(action$, dataset, {inputs, key, id}) {
  const collector$ = forwardTo(action$, Action.SetAggregator(id));
  const collector = aggregatorPool[key].collector;

  return h('div', {class: {collector: true, editing: true}}, [
    h('div', {class: {"collector-form": true, form: true}}, [
      h('div', {class: {"operation-header": true}}, [
        h('span', { class: {remove: true}, on: {click: [action$, Action.DeleteAggregator(id)]}}),
        h('h2', {}, `Edit ${aggregatorPool[key].name}`),
      ]),

      collector.view(collector$, dataset, inputs),

      h('div', {class: {controls: true}}, [
        h('button',
          { on: {click: [action$, Action.SetActive(null)]}},
          'Done'
        )
      ])
    ])
  ]);
}


const renderInactiveAggregator = (action$, dataset, {inputs, key, id}) => {
  const agg = aggregatorPool[key];
  const icon = `collector-${R.find(R.contains(op.tags), iconTags) || 'generic'}`;

  return h('div', {class: {collector: true, [icon]: true}}, [
    h('div', {class: {definition: true}}, agg.display(dataset, inputs)),
    h('div', {class: {controls: true}}, [
      h('span', {class: {edit: true}, on: {click: [action$, Action.SetActive(id)]}}),
      h('span', {class: {remove: true}, on: {click: [action$, Action.DeleteAggregator(id)]}})
    ])
  ]);
};


module.exports = {Action, view, update, init};
