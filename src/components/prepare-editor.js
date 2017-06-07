const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const Type = require('union-type');

const DERIVERS = require('../lib/derivers');

const {targetValue} = require('../lib/utils');
const {relevantColumns} = require('../lib/filter-functions');

const isMaybe = t => S.type(t) === 'sanctuary/Maybe';

module.exports = function(itemType, itemPool) {
  const Action = Type({
    StartEdit: [],
    SetFunc: [R.T],
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
        func: model.editState.func,
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
    type: itemType,

    func: null,
    columns: {},
    userInputs: {},

    editState: {
      func: null,
      columns: {},
      userInputs: {}
    }
  });


  const view = R.curry(function(action$, dataset, model) {
    return model.editing ? edit(action$, dataset, model) : show(action$, model);
  });


  function edit(action$, dataset, model) {
    const {func, columns, userInputs} = model.editState;
    const itemDef = func ? itemPool[func] : S.Nothing;

    const functions = S.map(itemName =>
      h('option',
        { attrs: {selected: (itemName === func), value: itemName}},
        itemName),
      S.keys(itemPool).sort());

    const toOption = opt => h('option', {value: opt.index}, opt.header);

    const selectorVdom = [
      h('h2', {}, "Edit Filter"),
      h('div', {}, [
        h('span', {}, "Function"),
        h('select', {
            on: {change: R.compose(action$, Action.SetFunc, targetValue)}
          },
          R.prepend(h('option', {}, ''), functions)),
      ])
    ];

    const columnVdom = item =>
      h('div', {class: {columns: true}},
        S.map(colSlot =>
          h('div', {}, [
            h('span', {}, colSlot.name),
            h('select', {}, S.map(toOption, relevantColumns(dataset, colSlot)))
          ])
        , item.columnSlots)
      );

    const inputVdom = item =>
      h('div', {class: {userInput: true}},
        S.map(inputSlot =>
          h('div', {}, [
            h('span', {}, inputSlot.name),
            h('input', {type: 'text', name: inputSlot.name}, [])
          ])
        , item.userInputs)
      );

    return h('div', {class: {"filter-form": true}},
      S.maybe(selectorVdom,
        d => R.flatten([selectorVdom, columnVdom(d), inputVdom(d)]),
        itemDef)
    )
  }


  function show(action$, model) {
    return h('div', {}, 'oh hai');
  }


  return {Action, view, update, init};
}
