const R = require('ramda');

const columns = function({headers, records}) {
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


module.exports = {
  columns,
  relevantColumns,
  appendColumn
};
