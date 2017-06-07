const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const Type = require('union-type');

const FILTERS = require('../lib/filters');

const {targetValue, lookup} = require('../lib/utils');
const {relevantColumns} = require('../lib/filter-functions');

const isMaybe = t => S.type(t) === 'sanctuary/Maybe';
const Action = Type({
  StartEdit: [],
  SetFunc: [isMaybe],
  Cancel: [],
  Save: [],
  Delete: []
});


const update = Action.caseOn({
  StartEdit: R.assoc('editing', true),
  SetFunc: R.assocPath(['editState', 'func']),
  Cancel: R.assoc('editing', false),
  Save: model =>
    R.merge(model, {
      func: S.fromMaybe("", model.editState.func),
      columns: model.editState.columns,
      userInputs: model.editState.userInputs,
      editing: false
    }),
  Delete: x => x  // NOOP -- this should be handled externally
})


const init = id => ({
  id: id,
  enabled: false,
  editing: true,

  func: null,
  columns: {},
  userInputs: {},

  editState: {
    func: S.Nothing,
    columns: {},
    userInputs: {}
  }
});


const view = R.curry(function(action$, dataset, model) {
  return model.editing ? edit(action$, dataset, model) : show(action$, model);
});


function edit(action$, dataset, model) {
  const {func, columns, userInputs} = model.editState;
  const filter = S.map(S.flip(S.prop)(FILTERS))(func);

  const functions = S.map(filterName =>
    h('option',
      { attrs: {selected: (filterName === func), value: filterName}},
      filterName),
    S.keys(FILTERS).sort());

  const toOption = opt => h('option', {value: opt.index}, opt.header);

  const selectorVdom = [
    h('h2', {}, "Edit Filter"),
    h('div', {}, [
      h('span', {}, "Function"),
      h('select', {
          on: {change: R.compose(action$, Action.SetFunc, S.of(S.Maybe), targetValue)}
        },
        R.prepend(h('option', {}, ''), functions)),
    ])
  ];

  const columnVdom = filt =>
    h('div', {class: {columns: true}},
      S.map(colSlot =>
        h('div', {}, [
          h('span', {}, colSlot.name),
          h('select', {}, S.map(toOption, relevantColumns(dataset, colSlot)))
        ])
      , filt.columnSlots)
    );

  const inputVdom = filt =>
    h('div', {class: {userInput: true}},
      S.map(inputSlot =>
        h('div', {}, [
          h('span', {}, inputSlot.name),
          h('input', {type: 'text', name: inputSlot.name}, [])
        ])
      , filt.userInputs)
    );

  return h('div', {class: {"filter-form": true}},
    S.maybe(selectorVdom,
      filt => R.flatten([selectorVdom, columnVdom(filt), inputVdom(filt)]),
      filter)
  )
}


function show(action$, model) {
  return h('div', {}, 'oh hai');
}



module.exports = {Action, view, update, init};
