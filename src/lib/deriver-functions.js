const R = require('ramda');

const DSF = require('./dataset-functions');


/**
 * Apply a deriver across the dataset. Each deriver receives arguments of two
 * types: columns and operands. Columns are indicated by the index of the
 * column in the records. Operands are provided by the user. A new dataset with
 * the derived column will be returned.
 *
 * Filter -> StrMap Int -> StrMap String -> Dataset -> Dataset
 */
const apply = R.curry((deriver, columns, operands, dataset) => {
  const xCols = rec => R.map(i => R.nth(i, rec), columns);
  const fn = R.curry(deriver.fn)(operands);
  const xRecs = R.map(xCols, dataset.records);

  const trans = R.compose(
    R.map(xCols),
    R.map(R.curry(deriver.fn)(operands))
  );

  return DSF.appendColumn(dataset, {
    header: 'Moo',
    values: R.into([], trans, dataset.records)
  })
})


module.exports = {
  apply
};
