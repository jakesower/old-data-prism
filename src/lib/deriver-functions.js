const R = require('ramda');

const DSF = require('./dataset-functions');
const DERIVERS = require('./derivers');


/**
 * Apply a deriver across the dataset. Each deriver receives arguments of two
 * types: columns and operands. Columns are indicated by the index of the
 * column in the records. Operands are provided by the user. A new dataset with
 * the derived column will be returned.
 *
 * Filter -> StrMap Int -> StrMap String -> Dataset -> Dataset
 */
const apply = R.curry((deriver, columns, operands, dataset) => {
  const dsCols = DSF.columns(dataset);
  const nthCol = R.flip(R.nth)(dsCols);
  const colVals = R.pipe(
    R.map(nthCol),
    R.map(R.prop('values'))
  );
  const colHeads = R.pipe(R.map(nthCol), R.map(R.prop('header')));

  return DSF.appendColumn(dataset, {
    header: `${deriver.name} (${R.concat(R.values(colHeads(columns)), R.values(operands)).join(', ')})`,
    values: deriver.fn(operands, colVals(columns))
  })
});


const applyOperation = R.curry((dataset, deriver) => {
  return deriver.enabled ?
    apply(DERIVERS[deriver.func], deriver.columns, deriver.userInputs, dataset) :
    dataset;
});


module.exports = {
  apply,
  applyOperation
};
