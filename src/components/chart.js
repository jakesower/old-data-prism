const R = require('ramda');
const forwardTo = require('flyd-forwardto');

const {Slot, DataType} = require('../types');
const SlotCollector = require('./slot-collector');
const Type = require('union-type');
const h = require('snabbdom/h').default;


const barChart = require('./charts/bar');
const scatterPlot = require('./charts/scatter');
const lineChart = require('./charts/line');


const CHARTS = {
  bar: barChart,
  scatterPlot,
  line: lineChart,
};


const init = () => ({
  type: null,
  inputs: {},
});


const Action = Type({
  SetType: [String],
  SetInput: [String, () => true]
});


const update = Action.caseOn({
  SetType: (type, model) => {
    const slots = R.pathOr([], [type, 'slots'], CHARTS);
    const inputs = R.pipe( // TODO: no stringly typed crap
      R.map(s => ({[s.id]: s['@@tag'] === 'Multicolumn' ? [] : ''})),
      R.mergeAll
    )(slots);

    return R.merge(model, {type, inputs});
  },
  SetInput: (slotName, val, model) => {
    return R.assocPath(['inputs', slotName], val, model)
  }
});


const view = R.curry((action$, {dimensions, dataset}, model) => {
  const slots = R.pathOr([], [model.type, 'slots'], CHARTS);
  
  const action = slot => forwardTo(action$, Action.SetInput(slot.id));
  const typePool = R.map(t => ({ value: t, display: t }), R.keys(CHARTS));
  const toCollector = s => SlotCollector(
    action(s),
    s.toSlot(dataset),
    model.inputs[s.id]
  );

  return h('div', {class: {"main-container": true}}, [
    h('aside', {}, [
      h('div', {class: {"form": true}}, R.flatten([
        SlotCollector(
          forwardTo(action$, Action.SetType),
          Slot.Pool('chartType', 'Chart Type', DataType.String, typePool),
          model.type
        ),

        R.map(toCollector, slots)
      ]))
    ]),

    h('main', {},
      R.has(model.type, CHARTS) ?
        CHARTS[model.type].fn(dataset, model.inputs, dimensions) :
        []
    )
  ])
});


module.exports = { Action, init, update, view };
