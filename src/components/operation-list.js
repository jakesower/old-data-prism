const R = require('ramda');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');
const Type = require('union-type');

const {switchcase} = require('../lib/utils');
const {Operation, Slot, DataType} = require('../types');

const OperationComponent = require('./operation');
const SlotOperationComponent = require('./slot-operation');
const GroupOperationComponent = require('./group-operation');

const AGGREGATORS = require('../definitions/aggregators');
const DERIVERS = require('../definitions/derivers');
const FILTERS = require('../definitions/filters');

const itemPools = {
  Filter: FILTERS,
  Deriver: DERIVERS,
  Grouping: AGGREGATORS,
};

const componentsByType = {
  Filter: OperationComponent,
  Deriver: OperationComponent,
  Grouping: GroupOperationComponent,
  Columns: SlotOperationComponent,
}

// TODO: ...
const slots = dataset => {
  const pool = R.addIndex(R.map)((h, idx) => ({display: h, value: idx}), dataset.headers);
  return [
    { slot: Slot.Multipool('columns', 'Columns', DataType.String, pool),
      label: 'Columns'
    }
  ]
}


const createType = switchcase({
  Grouping: ({id}) => GroupingOperationComponent.init('Grouping', id),
  Columns: ({id, dataset}) => {
    SlotOperationComponent.init('Columns', id, {columns: R.range(0, 255)})
  },
  Filter: ({id}) => OperationComponent.init('Filter', id),
  Deriver: ({id}) => OperationComponent.init('Deriver', id),
  Aggregator: ({id}) => OperationComponent.init('Aggregator', id),
});

const updateType = switchcase({
  Grouping: (action, op) => GroupingOperationComponent.update(action, op),
  Columns: (action, op) => SlotOperationComponent.update(action, op),
  Filter: (action, op) => OperationComponent.update(action, op),
  Deriver: (action, op) => OperationComponent.update(action, op),
  Aggregator: (action, op) => OperationComponent.update(action, op),
})



// these are the things this component responds to--it's the parent's job to
// pass appropriate streams to write up to
const Action = Type({
  CreateOperation: [String], // Type
  SetOperation: [Number, Object], // id, operation
  DeleteOperation: [Number], // id
  SetActive: [R.T] // id
});


const init = () => ({
  uid: 1,
  operations: [],
  active: null,
});


const update = Action.caseOn({
  CreateOperation: (type, model) => R.evolve({
    operations: R.append(createType(type)({id: model.uid})),
    uid: R.inc,
    active: R.always(model.uid)
  }, model),
  SetOperation: (id, act, mod) => {
    return R.over(
      R.lensProp('operations'),
      R.map(op => op.id === id ? updateType(op.type)(act, op) : op),
      mod
    );
  },
  DeleteOperation: (id, mod) => R.over(
    R.lensProp('operations'),
    R.filter(op => op.id !== id),
    mod
  ),
  SetActive: R.assoc('active'),
});


const renderOperations = R.curry((action$, dataset, model) => {
  const {active, operations} = model;
  const af = a => forwardTo(action$, a);

  return R.map(
    operation => {
      const component = componentsByType[operation.type];
      return component.view(
        { set$: af(Action.SetOperation(operation.id)),
          delete$: af(Action.DeleteOperation),
          setActive$: af(Action.SetActive),
        },
        { dataset,
          slots: slots(dataset),
          itemPool: itemPools[operation.type], // TODO: type implies pool
          editing: operation.id === active
        },
        operation
      )
    }
    , operations
  )
});


const view = R.curry((action$, dataset, model) => {
  const ctrlAttrs = action => ({
    class: {control: true},
    on: {click: [action$, action]}
  });

  const iconed = name => {
    const i = `operation-${name.toLowerCase()}`;
    return h('span', {class: {[i]: true}}, ` ${name}`);
  }

  return R.flatten([
    renderOperations(action$, dataset, model),

    h('div', {class: {"prepare-controls": true}, key: 'prepare-controls'}, [
      h('div', ctrlAttrs(Action.CreateOperation('Filter')), iconed('Filter')),
      h('div', ctrlAttrs(Action.CreateOperation('Deriver')), iconed('Deriver')),
      h('div', ctrlAttrs(Action.CreateOperation('Grouping')), iconed('Grouping')),
    ]),

    h('div', {class: {"prepare-controls": true}, key: 'prepare-controls'}, [
      h('div', ctrlAttrs(Action.CreateOperation('Columns')), iconed('Columns')),
      h('div', ctrlAttrs(Action.SaveRemix), iconed('Save')),
      h('div', ctrlAttrs(Action.SaveRemix), iconed('Download')),
    ]),

  ]);
});


module.exports = {Action, update, init, view};
