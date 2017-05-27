const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');

const Action = require('../types').Action;
const Filter = require('../components/filter');
const filters = require('../lib/filters');


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
    const pairs = S.zip(columns, records);

    const t = S.compose(
      S.filter(S.all(filter), S.nth(1)),
      S.map(S.nth(0))
    );

    return t(pairs);
  }

  return h('div', {class: {"main-container": true}}, R.flatten([
    h('aside', {class: "prepare-controls"}, R.flatten([
      R.map(filter =>
        Filter.view(
          // forwardTo(action$, console.log),
          forwardTo(action$, Action.SetFilterState(filter)),
          model.dataset, filter),
        model.filters),

      h('button', {}, "Derive Field"),
      h('button', {on: {click: [action$, Action.CreateFilter]}}, "Add Filter"),
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
