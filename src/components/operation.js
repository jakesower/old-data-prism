const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const Type = require('union-type');

const DERIVERS = require('../lib/derivers');

const {targetValue} = require('../lib/utils');
const {relevantColumns} = require('../lib/dataset-functions');

module.exports = function(itemPool, dataset) {
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
      editState: {userInputs: {[key]: val}}
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

    func: null,
    columns: {},
    userInputs: {},

    editState: {
      func: null,
      columns: {},
      userInputs: {}
    }
  });


  const view = R.curry(function(action$, model) {
    return model.editing ? edit(action$, model) : show(action$, model);
  });


  function edit(action$, model) {
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


    // Item is the Filter/Deriver definition
    const columnVdom = item => {
      const option = R.curry((key, col) => {
        return h('option', {
          attrs: {
            selected: (columns[key] === col.index),
            value: col.index
          }},
          col.header)
      })

      return h('div', {class: {columns: true}},
        S.map(colSlot => {
          const potentialPicks = relevantColumns(dataset, colSlot.test);

          return h('div', {}, [
            h('span', {}, colSlot.display),
            h('select', {
              on: {change: R.compose(action$, Action.SetColumn(colSlot.key), parseInt, targetValue)}
            },
            withBlank(S.map(option(colSlot.key), potentialPicks)))
          ])}
        , item.columnSlots)
      );
    }

    const inputVdom = item =>
      h('div', {class: {userInput: true}},
        S.map(inputSlot =>
          h('div', {}, [
            h('span', {}, inputSlot.display),
            h('input', {
              attrs: {value: userInputs[inputSlot.key]},
              on: {keyup: R.compose(action$, Action.SetUserInput(inputSlot.key), targetValue)}
            }, [])
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
      h('div', itemPool[model.func].display(model.userInputs, model.columns)),

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
