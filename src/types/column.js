const R = require('ramda');
const daggy = require('daggy');


const Column = daggy.tagged('Column', ['header', 'values']);

Column.prototype.valid = function (dataType) {
  return R.all(v => dataType.test(v), this.values);
}


module.exports = Column;
