const R = require('ramda');

const DF = require('./dataset-functions');


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
  apply
};
