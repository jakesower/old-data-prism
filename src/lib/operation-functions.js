const R = require('ramda');
const S = require('sanctuary');

const DF = require('./deriver-functions');
const FF = require('./filter-functions');
const GF = require('./grouping-functions');

const typeFunctions = {
  Filter: FF,
  Deriver: DF,
  Grouping: GF
};


const {validColumn, columns} = require('./dataset-functions');


const definitionFor = operation =>
  typeFunctions[operation.type][operation.key];


const applyOperation = (dataset, operation) => {
  return operation.enabled ?
    typeFunctions[operation.type].applyOperation(dataset, operation) :
    dataset;
}

/**
 * Apply a sequence of operations to the dataset. In many ways, this is the
 * beating heart of the entire system.
 *
 * Dataset -> List (Dataset -> Dataset) -> Dataset
 */
 // const applyOperations = R.reduce(S.T);
const applyOperations = R.reduce(applyOperation);


const slotValid = R.curry((dataset, input, slot) => {
  const slotInput = slot.sourceType === "column" ?
    columns(dataset)[input[slot.key]] :
    input[slot.key];

  return slot.sourceType === "column" ?
    validColumn(slot.dataType, slotInput) :
    slot.dataType.test(slotInput);
});


const operationValid = R.curry((dataset, operation) => {
  const opDef = definitionFor(operation);

  return R.all(slotValid(dataset, input), opDef.slots)
});


const operationsValid = (dataset, operations) =>
  R.all(operationValid(dataset), operations);


module.exports = {
  applyOperation,
  applyOperations,
  operationsValid
};
