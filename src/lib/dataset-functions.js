const R = require('ramda');
const S = require('sanctuary');

// const DF = require('./deriver-functions');
// const FF = require('./filter-functions');

const FILTERS = require('./filters');
const DERIVERS = require('./derivers');

const columns = ({headers, records}) => {
  const mapWithIndex = R.addIndex(R.map);

  return mapWithIndex((col, idx) => ({
    index: idx,
    header: col,
    values: R.map(R.nth(idx))(records)
  }), headers);
}


const appendColumn = (dataset, column) => ({
  headers: R.append(column.header, dataset.headers),
  records: R.zipWith(R.append, column.values, dataset.records)
});

/**
 * Runs the columnSlot's predicates over the columns in the dataset, picking
 * out the names of columns that qualify
 *
 * Dataset -> {test: (String -> Boolean)} -> List ColumnName
 */
const relevantColumns = R.curry((dataset, test) => {
  const t = R.compose(
    // List Column -> List Column
    R.filter(x => R.all(test, x.values))
  );

  return R.into([], t, columns(dataset));
});


/**
 * Apply a sequence of operations to the dataset. In many ways, this is the
 * beating heart of the entire system.
 *
 * Dataset -> (Dataset -> Dataset) -> Dataset
 */
 const applyOperations = R.reduce(S.T);


module.exports = {
  columns,
  relevantColumns,
  appendColumn,
  applyOperations
};
