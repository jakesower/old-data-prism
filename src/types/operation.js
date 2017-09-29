const R = require('ramda');
const daggy = require('daggy');

const operationPool = require('../definitions');
const Dataset = require('./dataset');

const Operation = daggy.tagged('Operation', ['definition', 'inputs']);

Operation.fromCollector = (key, inputs) => {
  const def = operationPool[key];
  return Operation(def, inputs);
}

// Operation ~> Dataset -> Boolean
Operation.prototype.valid = function (dataset) {
  return this.definition.valid(dataset, this.inputs);
}

// Operation ~> Dataset -> Dataset
Operation.prototype.apply = function (dataset) {
  return this.definition.fn(dataset, this.inputs);
}


module.exports = Operation;
