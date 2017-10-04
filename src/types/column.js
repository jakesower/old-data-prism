const R = require('ramda');
const daggy = require('daggy');

const DataType = require('./data-type');


const Column = daggy.tagged('Column', ['name', 'values', 'schema']);

Column.autoSchema = function (name, values) {
  return Column(name, values, Column.detectSchema(values));
}

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

Column.prototype.length = function () {
  return R.length(this.values);
}


module.exports = Column;
