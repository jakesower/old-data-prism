const R = require('ramda');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');
const Type = require('union-type');

const SlotCollector = require('./slot-collector');
const {Slot} = require('../types');


const Action = Type({
  SetInput: [String, () => true]
});

const init = (type, id) => ({
  type,
  id,
  inputs: {}
});

const update = Action.caseOn({
  SetInput: (key, val, model) => R.set(R.lensPath(['inputs', key]), val, model)
});

const view = (streams, misc, model) => {
  const {set$, delete$, setActive$} = streams;
  const {slots, dataset} = misc;
  const {inputs} = model;

  const slotStream = slot => forwardTo(set$, Action.SetInput(slot.id));

  return h('div', {class: {"operation-form": true, form: true}}, R.flatten([
    h('div', {class: {"operation-header": true}}, [
      h('span', {class: {remove: true}, on: {click: [delete$, model.id]}}),
      h('h2', {}, "Edit " + model.type)
    ]),

    R.map(({slot, pool, label}) => {
      return h('div', {class: {slot: true}}, [
        h('h3', {}, label),
        SlotCollector(
          slotStream(slot),
          slot,
          pool,
          R.has(slot.id, inputs) ? inputs[slot.id] : slot.defaultValue()
        )
      ])}, slots),

    h('div', {class: {controls: true}}, [
      h('button',
        { on: {click: [setActive$, null]}
        // , attrs: {disabled: !operation.valid(dataset)}
        },
        'Done'
      )
    ])
  ]));

}


module.exports = {Action, init, view, update};
