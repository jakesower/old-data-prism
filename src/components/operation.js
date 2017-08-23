const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const Type = require('union-type');
const forwardTo = require('flyd-forwardto');

const {targetValue} = require('../lib/utils');
const {validColumns} = require('../lib/dataset-functions');
const ColumnSelector = require('./column-selector');
const {operationValid} = require('../lib/operation-functions');
const dataTypes = require('../definitions/data');

const {Action} = require('./operation/types');
const Slot = require('./slot');

const optionPair = col => ({val: col.index, display: col.header});

const columnNameSlot = {
  sourceType: "user",
  key: "columnName",
  display: "Column Name",
  dataType: dataTypes.NonEmptyString,
};

const functionSlot = fs => ({
  sourceType: "user",
  key: "function",
  display: "Function",
  dataType: dataTypes.Enumerated(fs),
})

const update = Action.caseOn({
  StartEdit: R.assoc('editing', true),
  SetDefinition: (definition, model) => {
    const slots = definition.slots;
    const inputs = R.pipe(
      R.map(s => ({[s.key]: s.sourceType === 'multicolumn' ? [] : ''})),
      R.reduce(R.merge, {})
    )(slots);

    return R.merge(model, { inputs, definition })
  },
  SetColumnName: R.assoc('columnName'),
  SetInput: (key, val, model) => R.mergeDeepRight(model, {
    inputs: {[key]: val}
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


const init = (type, id, createsColumn) => ({
  type,
  id,
  createsColumn,

  editing: true,
  definition: null,
  columnName: '',
  inputs: {}
});

const view = R.curry(function(itemPool, dataset, action$, model) {
  return model.editing ? edit(action$, model) : show(action$, model);

  function edit(action$, model) {
    const {definition, inputs} = model;
    const itemDef = definition ? S.Just(definition) : S.Nothing;

    const headerVdom = [
      h('h2', {}, "Edit " + model.type),
    ];

    const functionSlotVdom = Slot.column(
      "Function",
      R.path(['definition', 'key'], model),
      R.map(i => ({val: i.key, display: i.name}), R.values(itemPool)),
      R.compose(
        action$,
        Action.SetDefinition,
        R.prop(R.__, itemPool),
        targetValue
      )
    )

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

    const inputVdom = item => S.map(slot => Slot.build(
      slot,
      inputs,
      dataset,
      forwardTo(action$, Action.SetInput(slot.key))
    ), item.slots);


    const columnNameVdom = model.createsColumn ?
      Slot.user(
        "Column Name",
        columnNameSlot,
        model.columnName,
        R.compose(action$, Action.SetColumnName)
      ) : [];

    return h('div', {class: {"operation-form": true, form: true}},
      S.maybe(
        R.flatten([headerVdom, columnNameVdom, functionSlotVdom, controlsVdom]),
        d => R.flatten([headerVdom, columnNameVdom, functionSlotVdom, inputVdom(d), controlsVdom]),
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
