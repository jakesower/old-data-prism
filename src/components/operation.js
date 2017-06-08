const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const Type = require('union-type');

const DERIVERS = require('../lib/derivers');

const {targetValue} = require('../lib/utils');
const {relevantColumns} = require('../lib/dataset-functions');

module.exports = function(itemType, itemPool) {
  const Action = Type({
    StartEdit: [],
    SetFunc: [String],
    SetColumn: [String, Number],
    SetUserInput: [String, String],
    Cancel: [],
    Save: [],
    Delete: []
  });


  const update = Action.caseOn({
    StartEdit: R.assoc('editing', true),
    SetFunc: R.assocPath(['editState', 'func']),
    SetColumn: (key, val, model) => R.mergeDeepRight(model, {
      editState: {columns: {[key]: val}}
    }),
    SetUserInput: (key, val, model) => R.mergeDeepRight(model, {
      editState: {userInput: {[key]: val}}
    }),
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
    const itemDef = func ? S.Just(itemPool[func]) : S.Nothing;

    const functions = S.map(itemName =>
      h('option',
        {attrs: {selected: (itemName === func), value: itemName}},
        itemName),
      S.keys(itemPool).sort());

    const toOption = opt => h('option', {value: opt.index}, opt.header);
    const withBlank = R.prepend(h('option', {}, ''));

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

    const controlsVdom = [
      h('div', {class: {controls: true}}, [
        h('button', {
          on: {click: [action$, Action.Save]},
          attrs: {disabled: !func}
        }, model.func ? 'Update' : 'Apply'),

        h('button', {
          on: {click: [action$, Action.Cancel]}
        }, 'Cancel')
      ])
    ]


    const columnOptions = S.map(item =>
      S.map(col =>
        h('option', {
          attrs: {
            selected: (item[key].index === col[key].index),
            value: col[key].index
          }},
          col.header),
        relevantColumns(dataset, item.test)),
      itemDef
    );
    const columnVdom = item =>
      h('div', {class: {columns: true}},
        S.map(colSlot =>
          h('div', {}, [
            h('span', {}, colSlot.display),
            h('select', {
              on: {change: R.compose(action$, Action.SetColumn(colSlot.val), parseInt, targetValue)}
            },
            withBlank(S.map(colSlot)))
          ])
        , item.columnSlots)
      );

    const inputVdom = item =>
      h('div', {class: {userInput: true}},
        S.map(inputSlot =>
          h('div', {}, [
            h('span', {}, inputSlot.display),
            h('input', {type: 'text', name: inputSlot.name}, [])
          ])
        , item.userInputs)
      );

    return h('div', {class: {"operation-form": true}},
      S.maybe(R.flatten([selectorVdom, controlsVdom]),
        d => R.flatten([selectorVdom, columnVdom(d), inputVdom(d), controlsVdom]),
        itemDef)
    )
  }


  function show(action$, model) {
    return h('div', {class: {operation: true}}, [
      // h('div', model.func.display(model.userInput, model.columns)),

      h('div', {class: {controls: true}}, [
        h('button', {
          on: {click: [action$, Action.StartEdit]}
        }, 'Edit'),

        h('button', {
          on: {click: [action$, Action.Remove]}
        }, 'Delete')

      ])
    ]);
  }


  return {Action, view, update, init};
}
