const R = require('ramda');

const defaultFilter = {
  fn: null,
  columns: {},
  userInputs: {}
};

module.exports = R.curry(function(action$, dataset, state) {
  const {fn, columns, userInputs} = filter.editState;
  const mappedIndex = R.addIndex(R.map);
  const functions = mappedIndex((func, idx) => h('option',
    { attrs: {selected: (idx === fn), value: idx},
      on: {change: Action.SetEditFilterFunction(idx)}
    },
    R.prop('name', func)), filters);

  const relevantColumns = filter => {
    const {columns, records} = model.dataset;
    const pairs = R.zip(columns, records);

    const t = R.compose(
      R.filter(R.all(filter), R.nth(1)),
      R.map(R.nth(0))
    );

    return t(pairs);
  }


  return h('div', {class: {"filter-form": true}}, R.flatten([
    h('h2', {}, "Edit Filter"),
    h('div', {}, [
      h('span', {}, "Function"),
      h('select', {}, R.prepend(h('option', {}, ''), functions)),
    ]),
    h('div', {class: {columns: true}}, R.map(column =>
      h('div', {}, relevantColumns(filters[fn]))
    ))
  ]));
});
