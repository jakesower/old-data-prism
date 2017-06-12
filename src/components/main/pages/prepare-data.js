const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');

const {Action, Operation} = require('../types');
const OperationAction = require('../../operation/types').Action;
const {applyOperations} = require('../../../lib/operation-functions');
const OperationComponent = require('../../operation');
const FILTERS = require('../../../lib/filters');
const DERIVERS = require('../../../lib/derivers');

const viewOC = op => {
  const cases = {
    Filter: op => OperationComponent.view(FILTERS, R.__, R.__, op),
    Deriver: op => OperationComponent.view(DERIVERS, R.__, R.__, op)
  };

  return cases[op.type](op);
};

module.exports = R.curry((action$, model) => {
  const {page, perPage} = model.state.grid;
  const dataset = applyOperations(model.dataset, model.operations);
  const {headers, records} = dataset;
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

  return h('div', {class: {"main-container": true}}, R.flatten([
    h('aside', {class: "prepare-controls"}, R.flatten([
      R.map(operation => {
        return viewOC(operation)(
          dataset,
          // forwardTo(action$, Action.SetOperationState(operation))
          forwardTo(action$, a => {
            console.log(a);
            console.log(OperationAction);
            const x = OperationAction.case({
              Delete: () => Action.DeleteOperation(operation),
              _: () => Action.SetOperationState(operation, a)
            }, a);
            console.log(x)
            console.log(Action.SetOperationState(operation, a))
            // return Action.SetOperationState(operation, a);
            return x;
          })
        )},
        model.operations),

      h('button', {on: {click: [action$, Action.CreateDeriver]}}, "Derive Field"),
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
