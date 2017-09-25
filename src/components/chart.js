const R = require('ramda');
const ColumnSelector = require('./column-selector');
const Slot = require('./slot');
const {select} = require('./controls');
const Type = require('union-type');
const h = require('snabbdom/h').default;

const forwardTo = require('flyd-forwardto');

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
      R.map(s => ({[s.id]: s['@@type'] === 'multicolumn' ? [] : ''})),
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
  const action = slot => forwardTo(action$, Action.SetInput(slot.key));

  return h('div', {class: {"main-container": true}}, [
    h('aside', {}, [
      h('div', {class: {"form": true}}, R.flatten([
        Slot.slotWrapper('Chart Type',
          select(
            model.type,
            R.map(t => ({ value: t, display: t }), R.keys(CHARTS)),
            forwardTo(action$, Action.SetType)
          )
        ),

        R.map(s => Slot.build(s, model.inputs, dataset, action(s)), slots)
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
