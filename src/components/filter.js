const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const Type = require('union-type');

const FILTERS = require('../lib/filters');

const {targetValue, lookup} = require('../lib/utils');

const isMaybe = t => S.type(t) === 'sanctuary/Maybe';
const Action = Type({
  StartEdit: [],
  SetFunc: [isMaybe],
  Cancel: [],
  Save: [],
  Delete: []
});


const relevantColumns = R.curry((dataset, columnSlot) => {
  const {columns, records} = dataset;
  const pairs = R.zip(columns, records);
  console.log(pairs)

  const t = R.compose(
    R.filter(R.all(columnSlot.test), R.nth(1)),
    R.map(R.nth(0))
  );

  return R.into([], t, pairs);
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

  // const columnInputs

  console.log(filter)
  // console.log(FILTERS)
  // console.log(
  //   S.pipe([
  //     S.map(S.flip(S.prop)(FILTERS)),
  //     S.map(S.prop('columnSlots'))
  //   ])(func)
  // );
  // console.log(lookup(func, filters).map(relevantColumns))

  // const columnMarkup = filterDef => {
  //   return h('div', )
  // }

  return h('div', {class: {"filter-form": true}}, R.flatten([
    h('h2', {}, "Edit Filter"),
    h('div', {}, [
      h('span', {}, "Function"),
      h('select', {
          on: {change: R.compose(action$, Action.SetFunc, S.of(S.Maybe), targetValue)}
        },
        R.prepend(h('option', {}, ''), functions)),
    ]),
    S.maybe([], filt =>
      h('div', {class: {columns: true}}, S.pipe([
        S.map(colSlot =>
          h('div', {}, [
            h('span', {}, colSlot.name),
            h('select', {}, S.map(
              col => h('option', {}, col),
              relevantColumns(dataset, colSlot)))
          ])
        , filt.columnSlots)
      ])),
    filter)
  ]));
}


function show(action$, model) {

}



module.exports = {Action, view, update, init};
