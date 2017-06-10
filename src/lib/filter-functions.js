const R = require('ramda');

const DF = require('./dataset-functions');
const FILTERS = require('./filters');


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

  return {
    headers: dataset.headers,
    records: R.filter(r => filter.fn(operands, xCols(r)), dataset.records)
  }
});


const applyOperation = R.curry((dataset, filter) => {
  return apply(FILTERS[filter.func], filter.columns, filter.userInputs, dataset);
});


module.exports = {
  apply,
  applyOperation
};
