const R = require('ramda');
const S = require('sanctuary');

const DF = require('./deriver-functions');
const FF = require('./filter-functions');
const GF = require('./grouping-functions');

const {populateSlots} = require('../lib/operation-utils');

const typeFunctions = {
  Filter: FF,
  Deriver: DF,
  Grouping: GF
};


const {validColumn, columns} = require('./dataset-functions');


const definitionFor = operation =>
  typeFunctions[operation.type][operation.key];


const applyOperation = (dataset, operation) => {
  if (!operation.enabled) return dataset;
  
  const inputs = populateSlots(operation.definition, operation.inputs, dataset);
  return operation.definition.fn(dataset, inputs);
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
  return true;
  const opDef = operation.definition;

  return R.all(slotValid(dataset, input), opDef.slots)
});


const operationsValid = (dataset, operations) =>
  R.pipe(
    R.filter(R.prop('enabled')),
    R.all(operationValid(dataset))
  )(operations);

module.exports = {
  applyOperation,
  applyOperations,
  operationsValid
};
