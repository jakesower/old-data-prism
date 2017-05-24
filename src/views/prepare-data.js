const R = require('ramda');
const h = require('snabbdom/h').default;
const Maybe = require('ramda-fantasy').Maybe;
const {Just, Nothing} = Maybe;
const forwardTo = require('flyd-forwardto');

const Action = require('../types').Action;
const filters = require('../lib/filters');
const editFilter = require('../components/edit-filter');

module.exports = R.curry((action$, model) => {
  const {page, perPage} = model.state.grid;
  const {columns, records} = model.dataset;
  const numPages = Math.ceil(records.length / perPage);
  const recordsOnPage = R.slice((page - 1) * perPage, page*perPage, records);

  const toCells = R.map(datum => h('td', {}, datum));
  const toRows = R.map(record => h('tr', {}, toCells(record)));

  const pageButton = (str, pageNum) => {
    return R.clamp(1, numPages, pageNum) === page ?
      h('a', {class: {button: true, disabled: true}}, str) :
      h('a', {
        class: {button: true},
        on: {click: [action$, Action.SetPage(pageNum)]}
      }, str);
  }

  const relevantColumns = filter => {
    const {columns, records} = model.dataset;
    const pairs = R.zip(columns, records);

    const t = R.compose(
      R.filter(R.all(filter), R.nth(1)),
      R.map(R.nth(0))
    );

    return t(pairs);
  }

  const showFilter = R.curry((_) => []);
  const showOrEditFilter = filter =>
    filter.editing ?
      editFilter({
        action$: forwardTo(action$, Action.SetFilterEditState(filter)),
        dataset,
        filter.editState
      }) :
      showFilter(filter);

  return h('div', {class: {"main-container": true}}, R.flatten([
    h('aside', {class: "prepare-controls"}, R.flatten([
      R.map(showOrEditFilter, model.filters),

      h('button', {}, "Derive Field"),
      h('button', {on: {click: [action$, Action.CreateFilter()]}}, "Add Filter"),
      h('button', {}, "Perform Grouping")
    ])),

    h('main', {}, [
      h('div', {class: {"page-controls": true}}, [
        pageButton("<<", 1),
        pageButton("<", page - 1),
        h('strong', {class: {"button": true}}, `${page} / ${numPages}`),
        pageButton(">", page + 1),
        pageButton(">>", numPages)
      ]),

      h('table', {}, R.concat(
        [h('tr', {}, R.map(c => h('th', {}, c), columns))],
        toRows(recordsOnPage)
      ))
    ])
  ]))
});
