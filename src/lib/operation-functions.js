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
      R.map(R.prop('columnName'), operation.aggregators)
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
  if (!operationValid(dataset, operation)) {
    return dataset;
  }
  else if (operation.type === 'Grouping') {
    return applyGroupingOperation(dataset, operation);
  }
  else {
    const inputs = populateSlots(operation.definition, operation.inputs, dataset);
    return operation.definition.fn(dataset, inputs, operation.columnName);
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

const userValid = (inputs, slot) =>
  slot.dataType.test(inputs[slot.key]);


const columnValid = (dataset, inputs, slot) => {
  const slotInput = columns(dataset)[inputs[slot.key]];
  return slotInput && validColumn(slot.dataType, slotInput);
}


const multicolumnValid = (dataset, inputs, slot) => {
  const slotInputs = R.map(R.prop(R.__, columns(dataset)), inputs[slot.key]);
  return slotInputs && R.all(validColumn(slot.dataType), slotInputs);
}


const slotValid = R.curry((dataset, inputs, slot) =>
  slot.sourceType === "column"      ? columnValid(dataset, inputs, slot) :
  slot.sourceType === "multicolumn" ? multicolumnValid(dataset, inputs, slot) :
                      /* user */      userValid(inputs, slot)
);


const basicOperationValid = R.curry((dataset, operation) => {
  return R.allPass([
    R.complement(R.isNil),
    opDef => R.all(slotValid(dataset, operation.inputs), opDef.slots)
  ])(operation.definition);
});


const groupingOperationValid = (dataset, operation) => {
  return operation.columns.length > 0 &&
    R.all(operationValid(dataset), operation.aggregators);
}

const operationValid = R.curry((dataset, operation) =>
  operation.type === 'Grouping' ?
    groupingOperationValid(dataset, operation) :
    basicOperationValid(dataset, operation)
);

const operationsValid = (dataset, operations) =>
  R.pipe(
    R.all(operationValid(dataset))
  )(operations);

module.exports = {
  applyOperation,
  applyOperations,
  operationsValid,
  operationValid
};
