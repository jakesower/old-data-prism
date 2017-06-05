const R = require('ramda');

const DF = require('./dataset-functions');

/**
 * Runs the columnSlot's predicates over the columns in the dataset, picking
 * out the names of columns that qualify
 *
 * Dataset -> {test: (String -> Boolean)} -> List ColumnName
 */
const relevantColumns = R.curry((dataset, columnSlot) => {
  const columns = DF.columns(dataset);

  const t = R.compose(
    // List Column -> List Column
    R.filter(x => R.all(columnSlot.test, x.values))
  );

  return R.into([], t, columns);
});


/**
 * Apply a filter across the dataset. Each filter receives arguments of two
 * types: columns and operands. Columns are indicated by the index of the
 * column in the records. Operands are provided by the user.
 *
 * Filter -> StrMap Int -> StrMap String -> Dataset -> Dataset
 */
const apply = R.curry((filter, columns, operands, dataset) => {
  // StrMap Int -> Record -> StrMap String
  const xCols = rec => R.map(i => R.nth(i, rec), columns);
  // console.log(R.map(xCols, dataset.records))
  // console.log(operands)
  // console.log(filter.fn(operands, xCols(dataset.records[0])))

  return {
    headers: dataset.headers,
    records: R.filter(r => filter.fn(operands, xCols(r)), dataset.records)
  }

})


module.exports = {
  relevantColumns,
  apply
};
