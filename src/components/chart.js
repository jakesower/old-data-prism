const R = require('ramda');
const barChart = require('./charts/bar');
const ColumnSelector = require('./column-selector');
const Type = require('union-type');

const {validColumns} = require('../lib/dataset-functions');


const CHARTS = {
  bar: barChart
};


const init = () => ({
  type: null,
  inputs: {},
});


const Action = Type({
  SetType: [String],
  SetInput: [String, String]
});


const update = Action.caseOn({
  SetType: (type, model) => {
    const slots = R.pathOr([], [type, 'slots'], CHARTS);

    return R.evolve({
      type: R.assoc('type', type, val),
      inputs: R.mergeAll(R.map(s => ({[s.key]: null}), slots))
    });
  },
  SetInput: R.assoc
  // SetInput: (slotName, val, model) => {
  //   return R.assoc(slotName, val, model)
  // }
});


const view = R.curry((action$, mainDimensions, dataset, model) => {
  const slots = R.pathOr([], [model.type, 'slots'], CHARTS);

  return h('div', {class: {"main-container": true}}, [
    h('aside', {}, R.flatten([
      h('div', {class: {"form": true}}, [
        h('label', {attrs: {for: 'type'}}, "Chart Type"),
        ColumnSelector.single(
          R.map(t => ({ val: t, display: t }), R.keys(CHARTS)),
          Action.SetType,
          model.chart.type
        ),

        R.map(slot => {
          const cols = validColumns(dataset, slot.dataType);
          const optionPair = col => ({val: col.index, display: col.header});

          return h('div', {}, [
            h('label', {}, slot.display),
            ColumnSelector.single(
              R.map(optionPair, cols),
              Action.SetInput(slot.key),
              model.inputs[slot.key]
            )
          ])
        }, slots)
      ])
    ])),

    h('main', {},
      R.has(model.type, CHARTS) ?
        CHARTS[model.type](dataset, model.inputs, mainDimensions) :
        []
    )
  ])
});


module.exports = { Action, init, update, view };
