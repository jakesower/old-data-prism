const R = require('ramda');
const daggy = require('daggy');


const Operation = daggy.taggedSum('Operation', {
  Filter: ['key', 'definition'],
  Deriver: ['key', 'definition'],
  Grouping: ['key', 'definition'],
});

const {Filter, Deriver, Grouping} = Operation;

Operation.prototype.applyInvalid = function (dataset) {
  return this.cata({
    Filter: () => dataset,
    Deriver: () => dataset,
    Grouping: () => dataset
  })
}

Operation.prototype.apply = function (dataset, inputs) {
  const base = (operation) => {
    const inputs = populateSlots(operation.definition, operation.inputs, dataset);
    return operation.definition.fn(dataset, inputs, operation.columnName);
  }

  return this.cata({
    Filter: base(this),
    Deriver: base(this),
    Grouping: {}
  })
}

Operation.prototype.valid = function (dataset, inputs) {

}




module.exports = Operation;
