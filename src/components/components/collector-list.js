const R = require('ramda');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');
const Type = require('union-type');

const {select, text} = require('../controls');
const operationPool = require('../../definitions');
const strings = require('../../strings/operations');

const iconTags = [
  'deriver',
  'filter',
  'grouping',
  'aggregator'
];


const Action = Type({
  CreateCollector: [String], // Key
  SetCollector: [Number, Object], // id, operation
  DeleteCollector: [Number], // id
  SetActive: [R.T], // id
  SetSource: [R.T],
  SetMenuOpen: [Boolean]
});


const init = () => ({
  uid: 1,
  collectors: [],
  active: null,
  source: null,
  menuOpen: false,
  search: ""
});


const update = Action.caseOn({
  CreateCollector: (key, model) => {
    return R.evolve({
      collectors: R.append({
        id: model.uid,
        key,
        inputs: operationPool[key].collector.init(),
        search: ""
      }),
      uid: R.inc,
      active: R.always(model.uid),
      menuOpen: R.always(false)
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
  SetSource: R.assoc('source'),
  SetActive: R.assoc('active'),
  SetMenuOpen: R.assoc('menuOpen')
});


const renderActiveCollector = (action$, modelVars, {inputs, key, id}) => {
  const collector$ = forwardTo(action$, Action.SetCollector(id));
  const collector = operationPool[key].collector;

  return div({class: {collector: true, editing: true}}, [
    div({class: {"collector-form": true, form: true}}, [
      div({class: {"collector-header": true}}, [
        span({class: {remove: true}, on: {click: [action$, Action.DeleteCollector(id)]}}),
        h2({}, operationPool[key].name),
      ]),

      collector.view(collector$, modelVars, inputs),

      div({class: {controls: true}}, [
        h('button',
          { on: {click: [action$, Action.SetActive(null)]}
          // , attrs: {disabled: !operation.valid(modelVars)}
          },
          'Done'
        )
      ])
    ])
  ]);
};


const renderInactiveCollector = (action$, modelVars, {inputs, key, id}) => {
  const op = operationPool[key];
  const icon = `collector-${R.find(R.contains(op.tags), iconTags) || 'generic'}`;

  return div({class: {collector: true, [icon]: true}}, [
    div({class: {definition: true}}, op.display(modelVars, inputs)),
    div({class: {controls: true}}, [
      span({class: {edit: true}, on: {click: [action$, Action.SetActive(id)]}}),
      span({class: {remove: true}, on: {click: [action$, Action.DeleteCollector(id)]}})
    ])
  ]);
};


const renderCollectors = R.curry((action$, modelVars, model) => {
  const {active, collectors} = model;
  return R.map(
    collector => active === collector.id ?
      renderActiveCollector(action$, modelVars, collector) :
      renderInactiveCollector(action$, modelVars, collector),
    collectors
  );
});


// modelVars contains a list of all sources and the active modelVars
const view = R.curry((action$, modelVars, model) => {
  const sourceOpts = R.map(s => ({display: s.name, value: s.id}), modelVars.sources);

  return R.flatten([
    div({class: {slot: true}}, [
      h2({}, 'Source'),
      // Dogshit strings everywhere @_@
      select(model.source, sourceOpts, forwardTo(action$, R.compose(Action.SetSource, parseInt)))
    ]),

    div({class: {"remix-controls": true}, key: 'remix-controls'}, [
      renderMenu(action$, modelVars, model)
    ]),

    div({class: {"collector-list": true}},
      renderCollectors(action$, modelVars, model)
    ),
  ]);
});


function renderMenu(action$, modelVars, model) {
  return div({class: {"operations-menu": true, active: model.menuOpen}}, [
    h('div',
      { class: {"new-operation-button": true},
        on: {click: [action$, Action.SetMenuOpen(!model.menuOpen)]}
      }, "New Operation"),

    div({class: {menu: true}}, [
      div({class: {item: true}}, [
        'Grouping',
        div({class: {"sub-menu": true, help: true}, props: {innerHTML: strings.groupingHelp}})
      ]),

      div({class: {item: true, "has-submenu": true}}, [
        'By Tag',
        div({class: {"sub-menu": true}}, menuByTag(action$))
      ])
    ])
  ]);
}

function menuByTag (action$) {
  const tags = R.reduce(R.union, [], R.map(R.prop('tags'), R.values(operationPool)));
  const tagOps = R.pipe(
    R.map(tag => ({tag, ops: R.filter(o => R.contains(tag, o.tags), operationPool)})),
    R.sort(R.ascend(R.prop('tag')))
  )(tags);

  return R.map(({tag, ops}) => {
    const tagOps = R.pipe(
      R.toPairs,
      R.map(pair => R.merge({key: pair[0]}, pair[1])),
      R.sort(R.ascend(R.prop('name')))
    )(ops);

    return div({class: {item: true, "has-submenu": true}}, [
      tag,
      div({class: {"sub-menu": true}},
        R.map(op =>
          div({
            class: {item: true},
            on: {click: () => action$(Action.CreateCollector(op.key))}
          },
          op.name
        ), tagOps)
      )
    ])
  }, tagOps)

}


module.exports = {Action, update, init, view};
