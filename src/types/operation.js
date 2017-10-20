const R = require('ramda');
const daggy = require('daggy');

const operationPool = require('../definitions');
const Dataset = require('./dataset');

const Operation = daggy.tagged('Operation', ['definition', 'inputs']);

Operation.fromCollector = (key, inputs) => {
  const def = operationPool[key];
  return Operation(def, inputs);
}

// Operation ~> Dataset -> List Source -> Boolean
Operation.prototype.valid = function (dataset, sources) {
  return this.definition.valid({dataset, sources}, this.inputs);
}

// Operation ~> Dataset -> List Source -> Dataset
Operation.prototype.apply = function (dataset, sources) {
  return this.definition.fn({dataset, sources}, this.inputs);
}


module.exports = Operation;
