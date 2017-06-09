const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');

const {Action, Operation} = require('../types');
const OperationComponent = require('../../operation');
const FILTERS = require('../../../lib/filters');
const DERIVERS = require('../../../lib/filters');

const viewOC = Operation.case({
  // Filter: (ds, a$, op) => OperationComponent.view(FILTERS, ds, a$, op),
  Filter: op => OperationComponent.view(FILTERS, R.__, R.__, op),
  Deriver: OperationComponent.view(DERIVERS)
});

module.exports = R.curry((action$, model) => {
  const {page, perPage} = model.state.grid;
  const {headers, records} = model.dataset;
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

  console.log(model.operations)

  return h('div', {class: {"main-container": true}}, R.flatten([
    h('aside', {class: "prepare-controls"}, R.flatten([
      R.map(operation => {
        const x = viewOC(operation)(
          model.dataset,
          forwardTo(action$, Action.SetOperationState(operation))
        )
        return x;
        },
        model.operations),

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
        [h('tr', {}, R.map(c => h('th', {}, c), headers))],
        toRows(recordsOnPage)
      ))
    ])
  ]))
});
