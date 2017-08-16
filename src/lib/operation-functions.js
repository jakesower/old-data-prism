const R = require('ramda');
const S = require('sanctuary');

const {populateSlots} = require('../lib/operation-utils');
const {validColumn, columns} = require('./dataset-functions');


const applyGroupingOperation = (dataset, operation) => {
  const applyAggregators = groups => {
    const applyAggregator = R.curry((dataset, aggregator) => {
      const inputs = populateSlots(aggregator.definition, aggregator.inputs, dataset);
      return aggregator.definition.fn(dataset, inputs);
    });

    const headers = R.concat(
      R.map(n => columns(dataset)[n].header, operation.columns),
      R.map(a => 'Hi', operation.aggregators)
    );

    const records = R.map(group => {
      return R.concat(
        JSON.parse(group[0]),
        R.map(applyAggregator({
          headers: dataset.headers,
          records: group[1]
        }), operation.aggregators)
      )
    }, groups);

    return { headers, records };
  }

  return R.pipe(
    R.prop('records'),
    R.groupBy(row => JSON.stringify(R.map(c => row[c], operation.columns))),
    R.toPairs,
    applyAggregators
  )(dataset);
}


const applyOperation = R.curry((dataset, operation) => {
  if (!operation.enabled) {
    return dataset;
  }
  else if (operation.type === 'Grouping') {
    return applyGroupingOperation(dataset, operation);
  }
  else {
    const inputs = populateSlots(operation.definition, operation.inputs, dataset);
    return operation.definition.fn(dataset, inputs);
  }
})

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
