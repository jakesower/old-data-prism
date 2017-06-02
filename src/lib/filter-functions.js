const R = require('ramda');

/**
 * Runs the columnSlot's predicates over the columns in the dataset, picking
 * out the names of columns that qualify
 *
 * Dataset -> {test: (String -> Boolean)} -> List ColumnName
 */
const relevantColumns = R.curry((dataset, columnSlot) => {
  const {columns, records} = dataset;
  const pairs = R.zip(columns, records);

  const t = R.compose(
    // List Pair -> List Pair
    R.filter(x => R.all(columnSlot.test, R.nth(1, x))),
    // List Pair -> List ColumnName
    R.map(R.nth(0))
  );

  return R.into([], t, pairs);
});


module.exports = {
  relevantColumns
};
