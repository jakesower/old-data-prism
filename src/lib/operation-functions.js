const R = require('ramda');
const S = require('sanctuary');
const {$, def, $Dataset} = require('./sanctuary-types');

const DF = require('./deriver-functions');
const FF = require('./filter-functions');

const opHandlers = {
  Filter: FF.applyOperation,
  Deriver: DF.applyOperation
}

const applyOperation = (dataset, operation) => {
  return operation.enabled ?
    opHandlers[operation.type](dataset, operation) :
    dataset;
}

/**
 * Apply a sequence of operations to the dataset. In many ways, this is the
 * beating heart of the entire system.
 *
 * Dataset -> List (Dataset -> Dataset) -> Dataset
 */
 // const applyOperations = R.reduce(S.T);
const applyOperations = def('applyOperations', {},
  [$Dataset, $.Array($.Function([$Dataset, $Dataset])), $Dataset],
  R.reduce(applyOperation)
);

module.exports = {
  applyOperations
};
