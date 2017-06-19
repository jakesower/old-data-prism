const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const Type = require('union-type');

const perPage = 25;

const init = () => ({
  page: 1
});


const Action = Type({
  SetPage: [Number]
});


const update = Action.caseOn({
  SetPage: R.assoc('page')
});


const view = (dataset, action$, model) => {
  const {headers, records} = dataset;
  const {page} = model;

  if(records.length === 0) return h('div', {}, '');

  const toCells = R.map(datum => h('td', {}, datum));
  const toRows = R.map(record => h('tr', {}, toCells(record)));
  const numPages = Math.ceil(records.length / perPage);
  const recordsOnPage = R.slice((page - 1) * perPage, page*perPage, records);

  const pageButton = (str, pageNum) => {
    return R.clamp(1, numPages, pageNum) === page ?
      h('a', {class: {button: true, disabled: true}}, str) :
      h('a', {
        class: {button: true},
        on: {click: [action$, Action.SetPage(pageNum)]}
      }, str);
  }

  return h('div', {}, [
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
}


module.exports = { Action, init, update, view };
