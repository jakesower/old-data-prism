const R = require('ramda');
const ColumnSelector = require('./column-selector');
const Type = require('union-type');
const h = require('snabbdom/h').default;

const {validColumns} = require('../lib/dataset-functions');
const forwardTo = require('flyd-forwardto');

const barChart = require('./charts/bar');
// const lineChart = require('./charts/line');


const CHARTS = {
  bar: barChart,
  // line: lineChart,
};


const init = () => ({
  type: null,
  inputs: {},
});


const Action = Type({
  SetType: [String],
  SetInput: [String, Number]
});


const update = Action.caseOn({
  SetType: (type, model) => {
    const slots = R.pathOr([], [type, 'slots'], CHARTS);

    return R.evolve({
      type: R.always(type),
      inputs: R.mergeAll(R.map(s => ({[s.key]: null}), slots))
    }, model);
  },
  SetInput: (slotName, val, model) => {
    return R.assocPath(['inputs', slotName], val, model)
  }
});


const view = R.curry((action$, dimensions, dataset, model) => {
  const slots = R.pathOr([], [model.type, 'slots'], CHARTS);

  return h('div', {class: {"main-container": true}}, [
    h('aside', {}, [
      h('div', {class: {"form": true}}, R.flatten([
        h('div', {}, [
          h('label', {attrs: {for: 'type'}}, "Chart Type"),
          ColumnSelector.single(
            R.map(t => ({ val: t, display: t }), R.keys(CHARTS)),
            forwardTo(action$, Action.SetType),
            model.type
          ),
        ]),

        R.map(slot => {
          const cols = validColumns(dataset, slot.dataType);
          const optionPair = col => ({val: col.index, display: col.header});

          return h('div', {}, [
            h('label', {}, slot.display),
            ColumnSelector.single(
              R.map(optionPair, cols),
              forwardTo(action$, R.compose(Action.SetInput(slot.key), parseInt)),
              model.inputs[slot.key]
            )
          ])
        }, slots)
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
