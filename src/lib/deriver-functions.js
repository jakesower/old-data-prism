const R = require('ramda');

const {$, def, $Deriver, $Dataset} = require('./sanctuary-types');
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
const apply = def('apply', {},
  [$Deriver, $.StrMap($.Any), $.StrMap($.String), $Dataset, $Dataset],
  (deriver, columns, operands, dataset) => {
    const dsCols = DSF.columns(dataset);
    const nthCol = n => dsCols[n];
    const colVal = R.pipe(
      nthCol,
      R.prop('values')
    );

    const colVals = v =>
      Array.isArray(v) ?
        R.transpose(R.map(colVal, v)) :
        colVal(v);

    return DSF.appendColumn(dataset, {
      header: `${deriver.name} ()`,
      values: deriver.fn(operands, R.map(colVals, columns))
    })
  }
);


const applyOperation = R.curry((dataset, deriver) => {
  return apply(DERIVERS[deriver.func], deriver.columns, deriver.userInputs, dataset);
});


module.exports = {
  apply,
  applyOperation
};
