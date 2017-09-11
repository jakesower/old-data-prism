const R = require('ramda');
const S = require('sanctuary');

// An operation is essentially a definition plus data
const {Operation} = require('../types');


const applyOperation = R.curry((dataset, operation) => {
  return operation.valid(dataset) ?
    operation.apply(dataset) :
    operation.applyInvalid(dataset);
})

/**
 * Apply a sequence of operations to the dataset. In many ways, this is the
 * beating heart of the entire system.
 *
 * Dataset -> List (Dataset -> Dataset) -> Dataset
 */
 // const applyOperations = R.reduce(S.T);
const applyOperations = R.reduce(applyOperation);


module.exports = {
  applyOperation,
  applyOperations,
};
