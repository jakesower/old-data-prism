const R = require('ramda');
const h = require('snabbdom/h').default;
const Type = require('union-type');
const forwardTo = require('flyd-forwardto');

const {targetValue} = require('../lib/utils');
const ColumnSelector = require('./column-selector');
const {operationValid} = require('../lib/operation-functions');
const dataTypes = require('../types/data-type');

const {Action} = require('./operation/types');
const Slot = require('./slot');
const {select} = require('./controls');

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
  SetDefinition: (definition, model) => {
    const slots = definition.slots;
    const inputs = R.pipe(
      R.map(s => ({[s.key]: s.sourceType === 'multicolumn' ? [] : ''})),
      R.append(createsColumn(model.type) ? {columnName: model.inputs.columnName} : {}),
      R.reduce(R.merge, {})
    )(slots);

    return R.merge(model, { inputs, definition })
  },
  SetInput: key => R.set(R.lensPath(['inputs', key]))
});


const init = (type, id) => ({
  type,
  id,
  definition: null,
  inputs: {}
});


const createsColumn = type => type === 'Deriver' || type === 'Aggregator';
const view = (
  {dataset, operation, itemPool, active},
  {set$, delete$, setActive$} ) => {

  return h('div', {class: {operation: true, editing: editing}},
    editing ? edit() : show());


  function edit() {
    const {definition, inputs} = model;

    const headerVdom = h('div', {class: {"operation-header": true}}, [
      h('span', {class: {remove: true}, on: {click: [delete$, operation.id]}}),
      h('h2', {}, "Edit " + model.type),
    ]);

    const functionSlotVdom = Slot.slotWrapper("Function",
      select(
        R.path(['definition', 'key'], model),
        R.map(i => ({val: i.key, display: i.name}), R.values(itemPool)),
        forwardTo(set$, R.compose(Action.SetDefinition, R.prop(R.__, itemPool)))
      )
    );

    const controlsVdom = [
      h('div', {class: {controls: true}}, [
        h('button',
          { on: {click: [setActive$, null]}
          , attrs: {disabled: !operationValid(dataset, model)}
          },
          'Done'
        )
      ])
    ]

    const inputVdom = item => R.map(slot => Slot.build(
      slot,
      inputs,
      dataset,
      forwardTo(set$, Action.SetInput(slot.key))
    ), item.slots);


    const columnNameVdom =
      Slot.user(
        "Column Name",
        columnNameSlot,
        model.inputs.columnName,
        forwardTo(set$, Action.SetInput('columnName'))
      )

    return h('div', {class: {"operation-form": true, form: true}},
      R.flatten([
        headerVdom,
        createsColumn(model.type) ? columnNameVdom : [],
        functionSlotVdom,
        definition ? inputVdom(definition) : [],
        controlsVdom
      ])
    )
  }


  function show() {
    const text = operation.definition ?
      operation.definition.display(operation.inputs, dataset) :
      "Invalid";

    return [
      h('div',
        {class: {definition: true, fa: true, ["operation-"+model.type.toLowerCase()]: true}}
        , text),

      h('div', {class: {controls: true}}, [
        h('span', {class: {edit: true}, on: {click: [setActive$, operation.id]}}),
        h('span', {class: {remove: true}, on: {click: [delete$, operation.id]}})
      ])
    ];
  }
};

module.exports = {Action, view, update, init};
