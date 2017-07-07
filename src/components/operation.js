const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const Type = require('union-type');
const forwardTo = require('flyd-forwardto');

const {targetValue} = require('../lib/utils');
const {relevantColumns} = require('../lib/dataset-functions');
const ColumnSelector = require('./column-selector');

const {Action} = require('./operation/types');


const update = Action.caseOn({
  StartEdit: R.assoc('editing', true),
  SetFunc: (operations, func, model) => {
    const slots = operations[func].slots;
    const cols = R.pipe(
      R.map(s => ({[s.key]: s.type === 'multicolumn' ? [] : null})),
      R.reduce(R.merge, {})
    )(slots);

    return R.pipe(
      R.set(R.lensPath(['editState', 'func']), func),
      R.set(R.lensPath(['editState', 'inputs']), cols)
    )(model);
  },
  SetInput: (key, val, model) => R.mergeDeepRight(model, {
    editState: {inputs: {[key]: val}}
  }),
  Cancel: R.assoc('editing', false),
  Save: model =>
    R.merge(model, {
      func: model.editState.func,
      inputs: model.editState.inputs,
      editing: false,
      enabled: true
    }),
  Delete: x => x  // NOOP -- this should be handled externally
});


const init = (type, id) => ({
  type: type,
  id: id,
  enabled: false,
  editing: true,

  func: null,
  inputs: {},

  editState: {
    func: null,
    inputs: {}
  }
});


const view = R.curry(function(itemPool, dataset, action$, model) {
  return model.editing ? edit(action$, model) : show(action$, model);

  function edit(action$, model) {
    const {func, inputs} = model.editState;
    const itemDef = func ? S.Just(itemPool[func]) : S.Nothing;

    const functions = S.map(itemName =>
      h('option',
        {attrs: {selected: (itemName === func), value: itemName}},
        itemName),
      S.keys(itemPool).sort());

    const toOption = opt => h('option', {value: opt.index}, opt.header);
    const withBlank = R.prepend(h('option', {}, ''));

    const selectorVdom = [
      h('h2', {}, "Edit " + model.type),
      h('div', {}, [
        h('span', {}, "Function"),
        h('select', {
            on: {change: R.compose(action$, Action.SetFunc(itemPool), targetValue)}
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
          on: {click: [action$, model.enabled ? Action.Cancel : Action.Delete]}
        }, 'Cancel')
      ])
    ]


    // // Item is the Filter/Deriver definition
    // const columnVdom = item => {
    //   return h('div', {class: {columns: true}},
    //     S.map(colSlot => {
    //       const potentialPicks = relevantColumns(dataset, colSlot.test);
    //       const optionPair = col => ({val: col.index, display: col.header});
    //       const fn = colSlot.type === 'single' ? 'single' : 'multi';
    //       const clean = colSlot.type === 'single' ?
    //         R.compose(Action.SetColumn(colSlot.key), parseInt) :
    //         R.compose(Action.SetColumn(colSlot.key), R.map(parseInt), R.filter(x => x !== ''));
    //
    //       return ColumnSelector[fn](
    //         S.map(optionPair, potentialPicks),
    //         forwardTo(action$, clean),
    //         columns[colSlot.key]
    //       );
    //     }, item.columnSlots)
    //   );
    // }
    //
    // const inputVdom = item =>
    //   h('div', {class: {userInput: true}},
    //     S.map(inputSlot =>
    //       h('div', {}, [
    //         h('span', {}, inputSlot.display),
    //         h('input', {
    //           attrs: {value: userInputs[inputSlot.key]},
    //           on: {keyup: R.compose(action$, Action.SetUserInput(inputSlot.key), targetValue)}
    //         }, [])
    //       ])
    //     , item.userInputs)
    //   );

    const userSlot = slot =>
      h('div', {}, [
        h('span', {}, slot.display),
        h('input', {
          attrs: {value: inputs[slot.key]},
          on: {keyup: R.compose(action$, Action.SetInput(slot.key), targetValue)}
        }, [])
      ])

    const columnSlot = slot => {
      const potentialPicks = relevantColumns(dataset, slot.test);
      const optionPair = col => ({val: col.index, display: col.header});
      const fn = slot.type === 'column' ? 'single' : 'multi';
      const clean = slot.type === 'column' ?
        R.compose(Action.SetInput(slot.key), parseInt) :
        R.compose(Action.SetInput(slot.key), R.map(parseInt), R.filter(x => x !== ''));

      return ColumnSelector[fn](
        S.map(optionPair, potentialPicks),
        forwardTo(action$, clean),
        inputs[slot.key]
      );
    }

    const inputVdom = item =>
      h('div', {}, S.map(
        slot => slot.type === 'user' ? userSlot(slot) : columnSlot(slot),
        item.slots))

    return h('div', {class: {"operation-form": true}},
      S.maybe(R.flatten([selectorVdom, controlsVdom]),
        d => R.flatten([selectorVdom, inputVdom(d), controlsVdom]),
        itemDef)
    )
  }


  function show(action$, model) {
    return h('div', {class: {operation: true}}, [
      h('div', {
        class: {definition: true, ["operation-"+model.type.toLowerCase()]: true},
      }, itemPool[model.func].display(model.inputs, dataset)),

      h('div', {class: {controls: true}}, [
        h('span', {
          class: {edit: true},
          on: {click: [action$, Action.StartEdit]}
        }, 'Edit'),

        h('span', {
          class: {remove: true},
          on: {click: [action$, Action.Delete]}
        }, 'Delete')

      ])
    ]);
  }
});

module.exports = {Action, view, update, init};
