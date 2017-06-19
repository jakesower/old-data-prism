const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const Type = require('union-type');


const Action = require('./main/types').GroupAction;


const update = Action.caseOn({
  StartEdit: R.assoc('editing', true),
  Cancel: R.assoc('editing', false),
  Delete: x => x,  // NOOP -- this should be handled externally
  Save: [],

  SetColumns: [Array],

  AddAggregator: [Object],
  SetAggregator: [Number, Object],
  RemoveAggregator: [Number]
});


const init = id => ({
  id: id,
  enabled: false,
  editing: true,

  columns: [],
  aggregators: [],

  editState: {
    columns: [],
    aggregators: []
  }
});


const view = R.curry(function(aggregators, dataset, action$, model) {
  return model.editing ? edit(action$, model) : show(action$, model);


  // General approach:
  // 1. Select columns on which to group
  // 2. Display a "group grid" of some sort
  // 3. Present aggregator functions that take a group and produce a value


  function edit(action$, model) {
    const {columns, aggregators} = model.editState;

    const functions = S.map(itemName =>
      h('option',
        {attrs: {selected: (itemName === func), value: itemName}},
        itemName),
      S.keys(itemPool).sort());

    const toOption = opt => h('option', {value: opt.index}, opt.header);
    const withBlank = R.prepend(h('option', {}, ''));

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


    const columnsVdom = item => {
      const option = R.curry((key, col) => {
        return h('option', {
          attrs: {
            selected: (columns[key] === col.index),
            value: col.index
          }},
          col.header)
      });

      const mOption = R.curry((key, idx, col) => {
        return h('option', {
          attrs: {
            selected: (columns[key][idx] === col.index),
            value: col.index
          }},
          col.header)
      });

      return h('div', {class: {columns: true}},
        S.map(colSlot => {
          const potentialPicks = relevantColumns(dataset, colSlot.test);

          if(colSlot.type === 'single') {
            return h('div', {}, [
              h('span', {}, colSlot.display),
              h('select', {
                on: {change: R.compose(action$, Action.SetColumn(colSlot.key), parseInt, targetValue)}
              },
              withBlank(S.map(option(colSlot.key), potentialPicks)))
            ]);
          }

          // list type
          const existing = R.addIndex(R.map)((col, idx) => {
            return h('div', {}, [
              h('select', {
                on: {change: R.compose(
                  action$,
                  v => S.equals(NaN, v) ?
                    Action.RemoveMultiColumn(colSlot.key, idx) :
                    Action.SetMultiColumn(colSlot.key, idx, v),
                  parseInt,
                  targetValue)}
              },
              R.prepend(h('option', {}, '(delete)'))(S.map(mOption(colSlot.key, idx), potentialPicks)))
            ])
          }, columns[colSlot.key]);

          const newMulti = h('div', {}, [
            h('select', {
              on: {change: R.compose(action$, Action.AddMultiColumn(colSlot.key), parseInt, targetValue)}
            },
            R.prepend(h('option', {}, '(select another?)'))(S.map(option(colSlot.key), potentialPicks)))
          ]);

          return h('div', {}, R.flatten([
            h('span', {}, colSlot.display),
            existing,
            newMulti
          ]));

        }, item.columnSlots)
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
    return h('div', {class: {operation: true, grouping: true}}, [
      'Hi'
    ]);
  }
});

module.exports = {Action, view, update, init};
