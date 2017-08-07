const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const Type = require('union-type');
const forwardTo = require('flyd-forwardto');

const {targetValue} = require('../lib/utils');
const {validColumns} = require('../lib/dataset-functions');
const ColumnSelector = require('./column-selector');

const {Action} = require('./operation/types');


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

    const functions = S.map(itemName =>
      h('option',
        {attrs: {selected: (itemName === itemDef.name), value: itemName}},
        itemName),
      S.keys(itemPool).sort());

    const toOption = opt => h('option', {value: opt.index}, opt.header);
    const withBlank = R.prepend(h('option', {}, ''));

    const selectorVdom = [
      h('h2', {}, "Edit " + model.type),
      h('div', {}, [
        h('span', {}, "Function"),
        h('select', {
            on: {change: R.compose(
              action$,
              Action.SetDefinition,
              R.prop(itemPool),
              targetValue)}
          },
          R.prepend(h('option', {}, ''), functions)),
      ])
    ];

    const controlsVdom = [
      h('div', {class: {controls: true}}, [
        h('button', {
          on: {click: [action$, Action.Save]},
          attrs: {disabled: !itemDef.name}
        }, model.definition ? 'Update' : 'Apply'),

        h('button', {
          on: {click: [action$, model.enabled ? Action.Cancel : Action.Delete]}
        }, 'Cancel')
      ])
    ]

    const userSlot = slot =>
      h('div', {}, [
        h('span', {}, slot.display),
        h('input', {
          attrs: {value: inputs[slot.key]},
          on: {keyup: R.compose(action$, Action.SetInput(slot.key), targetValue)}
        }, [])
      ])

    const columnSlot = slot => {
      const potentialPicks = validColumns(dataset, slot.dataType);
      const optionPair = col => ({val: col.index, display: col.header});
      const fn = slot.sourceType === 'column' ? 'single' : 'multi';
      const clean = slot.sourceType === 'column' ?
        R.compose(Action.SetInput(slot.key), parseInt) :
        R.compose(Action.SetInput(slot.key), R.map(parseInt), R.filter(x => x !== ''));

      return ColumnSelector[fn](
        S.map(optionPair, potentialPicks),
        forwardTo(action$, clean),
        inputs[slot.key]
      );
    }

    const inputVdom = item =>
      h('div', {}, S.map(
        slot => slot.sourceType === 'user' ? userSlot(slot) : columnSlot(slot),
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
      }, itemPool[model.func].display(model.inputs, dataset)),

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
