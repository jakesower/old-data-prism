const R = require('ramda');
const daggy = require('daggy');

const DataType = require('./data-type');


const Column = daggy.tagged('Column', ['name', 'values', 'schema']);

Column.detectSchema = function (values) {
  // TODO: this could be traversed more efficiently using impliedTypes
  const types = R.filter(
    t => R.all(v => t.test(v), values),
    DataType.unitTypes
  );

  return {types};
}

Column.prototype.hasType = function (dataType) {
  // YUCK on the toString calls, but daggy thinks DataType.String === DataType.FiniteNumber @_@
  return R.contains(dataType.toString(), this.schema.types.toString());
}


module.exports = Column;
