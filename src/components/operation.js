const R = require('ramda');
const h = require('snabbdom/h').default;
const Type = require('union-type');
const forwardTo = require('flyd-forwardto');

const {switchcase} = require('../lib/utils');
const {Slot, DataType, Operation} = require('../types');

const filterPool = require('../definitions/filters');
const deriverPool = require('../definitions/derivers');
const aggregatorPool = require('../definitions/helpers/aggregators');

const SlotCollector = require('./collectors/slot-collector');

const toOperation = switchcase({
  Filter: (definition, inputs) => Operation.Filter(definition, inputs),
  Deriver: (definition, inputs) => Operation.Deriver(definition, inputs, inputs.columnName),
  Aggregator: (definition, inputs) => Operation.Aggregator(definition, inputs, inputs.columnName),
});


const Action = Type({
  SetDefinitionKey: [String],
  SetInput: [String, R.T],
});


const update = Action.caseOn({
  SetDefinitionKey: (definitionKey, model) => {
    const definition = operationDefinition(model.type, definitionKey);
    const slots = definition.slots;
    const inputs = R.pipe(
      R.map(s => ({[s.id]: s.defaultValue()})),
      R.append(createsColumn(model.type) ? {columnName: model.inputs.columnName} : {}),
      R.reduce(R.merge, {})
    )(slots);

    return R.merge(model, { inputs, definitionKey })
  },
  SetInput: (key, val, model) => R.set(R.lensPath(['inputs', key]), val, model)
});


const init = (type, id) => ({
  type,
  id,
  definitionKey: null,
  inputs: {}
});


const createsColumn = type => type === 'Deriver' || type === 'Aggregator';
const view = ({set$, delete$, setActive$}, {dataset, itemPool, editing}, model) => {
  return h('div', {class: {operation: true, editing}},
    editing ? edit() : show());

  function edit() {
    const {definitionKey, inputs} = model;
    const definition = operationDefinition(model.type, definitionKey);
    const operation = definition ?
      toOperation(model.type)(definition, inputs) :
      Operation.Empty;

    const headerVdom = h('div', {class: {"operation-header": true}}, [
      h('span', {class: {remove: true}, on: {click: [delete$, model.id]}}),
      h('h2', {}, "Edit " + model.type),
    ]);

    const functionSlotVdom = SlotCollector(
      forwardTo(set$, R.compose(Action.SetDefinitionKey)),
      Slot.Pool(
        'function',
        'Function',
        DataType.String,
        R.map(i => ({value: i.key, display: i.name}), R.values(itemPool))
      ),
      R.path(['definitionKey'], model)
    );

    const controlsVdom = [
      h('div', {class: {controls: true}}, [
        h('button',
          { on: {click: [setActive$, null]}
          , attrs: {disabled: !operation.valid(dataset)}
          },
          'Done'
        )
      ])
    ];

    const columnNameVdom = SlotCollector(
      forwardTo(set$, Action.SetInput('columnName')),
      Slot.Anonymous('Column Name'),
      inputs.columnName
    );

    const inputVdom = R.pipe(
      R.prop('slots'),
      R.map(dataSlot => SlotCollector(
        forwardTo(set$, Action.SetInput(dataSlot.id)),
        dataSlot.toSlot(dataset),
        inputs[dataSlot.id]
      ))
    );


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
    const definition = operationDefinition(model.type, model.definitionKey);
    const text = definition ?
      definition.display(model.inputs, dataset) :
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

function operationDefinition(type, key) {
  const pools = {Filter: filterPool, Deriver: deriverPool, Aggregator: aggregatorPool};
  return R.path([type, key], pools);
}

module.exports = {Action, view, update, init};
