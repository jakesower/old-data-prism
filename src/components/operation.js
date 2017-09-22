const R = require('ramda');
const h = require('snabbdom/h').default;
const Type = require('union-type');
const forwardTo = require('flyd-forwardto');

const {targetValue} = require('../lib/utils');
const ColumnSelector = require('./column-selector');
const {operationValid} = require('../lib/operation-functions');
const dataTypes = require('../types/data-type');

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


const Action = Type({
  SetDefinition: [R.T],
  SetInput: [String, R.T],
});


const update = Action.caseOn({
  SetDefinition: (definition, model) => {
    const slots = definition.slots;
    const inputs = R.pipe( // TODO: no stringly typed crap
      R.map(s => ({[s.id]: s['@@type'] === 'multicolumn' ? [] : ''})),
      R.append(createsColumn(model.type) ? {columnName: model.inputs.columnName} : {}),
      R.reduce(R.merge, {})
    )(slots);

    return R.merge(model, { inputs, definition })
  },
  SetInput: (key, val, model) => R.set(R.lensPath(['inputs', key]), val, model)
});


const init = (type, id) => ({
  type,
  id,
  definition: null,
  inputs: {}
});


const createsColumn = type => type === 'Deriver' || type === 'Aggregator';
const view = (model, {dataset, itemPool, editing}, {set$, delete$, setActive$}) => {
  return h('div', {class: {operation: true, editing}},
    editing ? edit() : show());

  function edit() {
    const {definition, inputs} = model;

    const headerVdom = h('div', {class: {"operation-header": true}}, [
      h('span', {class: {remove: true}, on: {click: [delete$, model.id]}}),
      h('h2', {}, "Edit " + model.type),
    ]);

    const functionSlotVdom = Slot.slotWrapper(
      "Function",
      select(
        R.path(['definition', 'key'], model),
        R.map(i => ({value: i.key, display: i.name}), R.values(itemPool)),
        forwardTo(set$, R.compose(Action.SetDefinition, R.prop(R.__, itemPool)))
      )
    );

    const controlsVdom = [
      h('div', {class: {controls: true}}, [
        h('button',
          { on: {click: [setActive$, null]}
          // , attrs: {disabled: !operation.valid(dataset)}
          },
          'Done'
        )
      ])
    ]

    const inputVdom = item => R.map(slot => Slot.build(
      slot,
      inputs,
      dataset,
      forwardTo(set$, Action.SetInput(slot.id))
    ), item.slots);


    const columnNameVdom =
      Slot.user(
        "Column Name",
        columnNameSlot,
        inputs.columnName,
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
    const text = R.path(['definition', 'display'], model) ?
      model.definition.display(model.inputs, dataset) :
      "Invalid";

    return [
      h('div',
        {class: {definition: true, fa: true, ["operation-"+model.type.toLowerCase()]: true}}
        , text),

      h('div', {class: {controls: true}}, [
        h('span', {class: {edit: true}, on: {click: [setActive$, model.id]}}),
        h('span', {class: {remove: true}, on: {click: [delete$, model.id]}})
      ])
    ];
  }
};

module.exports = {Action, view, update, init};
