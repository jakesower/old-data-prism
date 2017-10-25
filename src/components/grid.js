const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const Type = require('union-type');
const FileSaver = require('file-saver');
const stringify = require('csv-stringify');

const {DataType} = require('../types');

const perPage = 25;

const init = () => ({
  page: 1,
  sorting: {col: 0, dir: 'asc'}
});


const Action = Type({
  SetPage: [Number],
  SetSorting: [Number, String]
});


const update = Action.caseOn({
  SetPage: R.assoc('page'),
  SetSorting: (col, dir, model) => {
    return R.assoc('sorting', {col, dir}, model)
  }
});


// TODO: sort by type (numbers and not just strings)
const view = (dataset, action$, model) => {
  if (dataset.empty()) return null;

  const {headers} = dataset;
  const {sorting} = model;

  const sortCol = dataset.columns[sorting.col] || dataset.columns[0];
  const numericSort = sortCol.hasType(DataType.Number);
  const caster = numericSort ? v => DataType.Number.cast(v) : R.identity;
  const sorter = sorting.dir === 'asc' ? R.ascend : R.descend;
  const records = R.sort(
    sorter(R.pipe(R.nth(sorting.col), caster)),
    dataset.records
  );

  if(records.length === 0) return h('div', {}, '');

  const toCells = R.map(datum => h('td', {}, datum));
  const toRows = R.map(record => h('tr', {}, toCells(record)));
  const numPages = Math.ceil(records.length / perPage);
  const page = R.clamp(1, numPages, model.page);
  const recordsOnPage = R.slice((page - 1) * perPage, page*perPage, records);

  const pageButton = (str, pageNum) => {
    return R.clamp(1, numPages, pageNum) === page ?
      h('a', {class: {button: true, disabled: true}}, str) :
      h('a', {
        class: {button: true},
        on: {click: [action$, Action.SetPage(pageNum)]}
      }, str);
  }

  const gridHeader = h('tr', {}, R.addIndex(R.map)((c, idx) => {
    const activeSort = sorting.col === idx ? sorting.dir : null;
    const dir = activeSort === 'asc' ? 'desc' : 'asc';

    return h('th',
      { on: {click: [action$, Action.SetSorting(idx, dir)]},
        class: {
          asc: activeSort === 'asc',
          desc: activeSort === 'desc',
          sortable: true
        }
      },
      [ h('span', {attrs: {class: "header"}}, c),
        h('span', {attrs: {class: "desc arrow"}}, '▼'),
        h('span', {attrs: {class: "asc arrow"}}, '▲'),
      ]
    );
  }, headers));


  return h('div', {}, [
    h('div', {class: {"page-controls": true}}, [
      pageButton("<<", 1),
      pageButton("<", page - 1),
      h('strong', {class: {"button": true}}, `${page} / ${numPages}`),
      pageButton(">", page + 1),
      pageButton(">>", numPages),
      // h('a', {
      //   class: {button: true},
      //   on: {click: [exportCsv, dataset]}
      // }, 'Export')
    ]),

    h('table', {}, R.prepend(
      gridHeader,
      toRows(recordsOnPage)
    ))
  ])
}


// Technically a side effect; should possibly be moved. Where?
function exportCsv(dataset) {
  stringify(R.prepend(dataset.headers, dataset.records), (err, output) => {
    const blob = new Blob([output], {type: 'text/csv'});
    FileSaver.saveAs(blob, "data-prism.csv");
  });
}


module.exports = { Action, init, update, view };
