const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const Type = require('union-type');
const forwardTo = require('flyd-forwardto');

const {targetValue} = require('../lib/utils');
const {validColumns} = require('../lib/dataset-functions');
const ColumnSelector = require('./column-selector');

const {Action} = require('./operation/types');
const Slot = require('./slot');

const optionPair = col => ({val: col.index, display: col.header});

const update = Action.caseOn({
  StartEdit: R.assoc('editing', true),
  SetDefinition: (definition, model) => {
    const slots = definition.slots;
    const cols = R.pipe(
      R.map(s => ({[s.key]: s.sourceType === 'multicolumn' ? [] : ''})),
      R.reduce(R.merge, {})
    )(slots);

    return R.pipe(
      R.set(R.lensPath(['editState', 'inputs']), cols),
      R.set(R.lensPath(['editState', 'definition']), definition)
    )(model);
  },
  SetInput: (key, val, model) => R.mergeDeepRight(model, {
    editState: {inputs: {[key]: val}}
  }),
  Cancel: R.assoc('editing', false),
  Save: model =>
    R.merge(model, {
      inputs: model.editState.inputs,
      definition: model.editState.definition,
      editing: false,
      enabled: true
    }),
  Delete: x => x  // NOOP -- this should be handled externally
});


const init = (type, id) => ({
  type: type,
  id: id,
  enabled: false,
  editing: true,

  definition: null,
  inputs: {},

  editState: {
    definition: null,
    inputs: {}
  }
});


const view = R.curry(function(itemPool, dataset, action$, model) {
  return model.editing ? edit(action$, model) : show(action$, model);

  function edit(action$, model) {
    const {definition, inputs} = model.editState;
    const itemDef = definition ? S.Just(definition) : S.Nothing;

    const selectorVdom = [
      h('h2', {}, "Edit " + model.type),
      Slot.column(
        "Function",
        R.path(['definition', 'key'], model),
        R.map(i => ({val: i.key, display: i.name}), R.values(itemPool)),
        {change: R.compose(
          action$,
          Action.SetDefinition,
          R.prop(R.__, itemPool),
          targetValue
        )}
      )
    ];

    const controlsVdom = [
      h('div', {class: {controls: true}}, [
        h('button', {
          on: {click: [action$, Action.Save]},
          attrs: {disabled: !(definition && definition.name)}
        }, model.definition ? 'Update' : 'Apply'),

        h('button', {
          on: {click: [action$, model.enabled ? Action.Cancel : Action.Delete]}
        }, 'Cancel')
      ])
    ]

    const userSlot = slot =>
      Slot.user(
        slot.display,
        inputs[slot.key],
        {keyup: R.compose(action$, Action.SetInput(slot.key), targetValue)}
      )

    const columnSlot = slot => {
      const clean = R.compose(Action.SetInput(slot.key), parseInt, targetValue);

      return Slot.column(
        slot.display,
        inputs[slot.key],
        R.map(optionPair, validColumns(dataset, slot.dataType)),
        {change: forwardTo(action$, clean)}
      )
    }


    const multicolumnSlot = slot => {
      const clean = R.compose(Action.SetInput(slot.key), R.map(parseInt), R.filter(x => x !== ''));

      return Slot.multicolumn(
        slot.display,
        inputs[slot.key],
        R.map(optionPair, validColumns(dataset, slot.dataType)),
        {change: forwardTo(action$, clean)},
        R.T
      )
    }

    const inputVdom = item =>
      h('div', {}, S.map(
        slot => slot.sourceType === 'user' ? userSlot(slot) :
                slot.sourceType === 'column' ? columnSlot(slot) :
                multicolumnSlot(slot),
        item.slots))

    return h('div', {class: {"operation-form": true, form: true}},
      S.maybe(R.flatten([selectorVdom, controlsVdom]),
        d => R.flatten([selectorVdom, inputVdom(d), controlsVdom]),
        itemDef)
    )
  }


  function show(action$, model) {
    return h('div', {class: {operation: true}}, [
      h('div', {
        class: {definition: true, ["operation-"+model.type.toLowerCase()]: true},
      }, model.definition.display(model.inputs, dataset)),

      h('div', {class: {controls: true}}, [
        h('span', {
          class: {edit: true},
          on: {click: [action$, Action.StartEdit]}
        }, 'Edit'),

        h('span', {
          class: {remove: true},
          on: {click: [action$, Action.Delete]}
        }, 'Delete')

      ])
    ]);
  }
});

module.exports = {Action, view, update, init};
