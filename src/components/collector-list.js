const R = require('ramda');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');
const Type = require('union-type');

const operationPool = require('../definitions');


const Action = Type({
  CreateCollector: [String], // Key
  SetCollector: [Number, Object], // id, operation
  DeleteCollector: [Number], // id
  SetActive: [R.T] // id
});


const init = () => ({
  uid: 1,
  collectors: [],
  active: null,
  picking: false,
});


const update = Action.caseOn({
  CreateCollector: (key, model) => {
    return R.evolve({
      collectors: R.append({
        id: model.uid,
        key,
        inputs: operationPool[key].collector.init()
      }),
      uid: R.inc,
      active: R.always(model.uid)
    }, model);
  },
  SetCollector: (id, act, mod) => {
    const cUpdate = c => operationPool[c.key].collector.update;
    return R.over(
      R.lensProp('collectors'),
      R.map(
        c => c.id === id ?
          R.set(R.lensProp('inputs'), cUpdate(c)(act, c.inputs), c) :
          c
      ),
      mod
    );
  },
  DeleteCollector: (id, mod) => R.over(
    R.lensProp('collectors'),
    R.filter(c => c.id !== id),
    mod
  ),
  SetActive: R.assoc('active'),
});


const renderActiveCollector = (action$, dataset, {inputs, key, id}) => {
  const collector$ = forwardTo(action$, Action.SetCollector(id));
  const collector = operationPool[key].collector;

  return h('div', {class: {collector: true, editing: true}}, [
    h('div', {class: {"collector-form": true, form: true}}, [
      h('div', {class: {"collector-header": true}}, [
        h('span', {class: {remove: true}, on: {click: [action$, Action.DeleteCollector(id)]}}),
        h('h2', {}, `Edit ${operationPool[key].name}`),
      ]),

      collector.view(collector$, dataset, inputs),

      h('div', {class: {controls: true}}, [
        h('button',
          { on: {click: [action$, Action.SetActive(null)]}
          // , attrs: {disabled: !operation.valid(dataset)}
          },
          'Done'
        )
      ])
    ])
  ]);
};


const renderInactiveCollector = (action$, dataset, {inputs, key, id}) => {
  const op = operationPool[key];

  return h('div', {class: {collector: true}}, [
    h('div', {class: {definition: true}}, op.display(dataset, inputs)),
    h('div', {class: {controls: true}}, [
      h('span', {class: {edit: true}, on: {click: [action$, Action.SetActive(id)]}}),
      h('span', {class: {remove: true}, on: {click: [action$, Action.DeleteCollector(id)]}})
    ])
  ]);
};


const renderCollectors = R.curry((action$, dataset, model) => {
  const {active, collectors} = model;
  return R.map(
    collector => active === collector.id ?
      renderActiveCollector(action$, dataset, collector) :
      renderInactiveCollector(action$, dataset, collector),
    collectors
  );
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
    h('div', {class: {"collector-list": true}},
      renderCollectors(action$, dataset, model)
    ),

    h('div', {class: {"remix-controls": true}, key: 'prepare-controls'}, [
      h('div', {}, "New Operation"),
      h('div', {class: {"operation-navigator": true}}, [
        h('div', {}, 'Hi')
      ])
    ]),
  ]);
});


module.exports = {Action, update, init, view};
