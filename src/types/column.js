const R = require('ramda');
const daggy = require('daggy');


const Column = daggy.tagged('Column', ['header', 'values']);

Column.prototype.valid = dataType => R.all(dataType.test, this.values);


module.exports = Column;
