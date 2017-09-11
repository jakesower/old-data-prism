const R = require('ramda');
const daggy = require('daggy');
const moment = require('moment');

/**
 * These are not conventional simple data types. Each function within accepts
 * a string and attempts to deal with it.
 */

const DataType = daggy.taggedSum('DataType', {
  String: [],
  NonEmptyString: [],
  FiniteNumber: [],
  PositiveFiniteNumber: [],
  Integer: [],
  Date: [],
  Boolean: [],
  Enumerated: ['values']
});


// DataType ~> String -> Boolean
const finiteNum = x => !isNaN(parseFloat(x)) && isFinite(x)
DataType.prototype.test = function (val) {
  return this.cata({
    String: () => true,
    NonEmptyString: () => val !== "",
    FiniteNumber: () => finiteNum(val),
    PositiveFiniteNumber: () => finiteNum(val) && val > 0,
    Integer: () => finiteNum(val) && x % 1 === 0,
    Date: () => !isNaN(Date.parse(x)),
    Boolean: () => val === 'true' || val === 'false',
    Enumerated: (values) => R.contains(val, values),
  })
}


// DataType ~> String -> Any
DataType.prototype.cast = function (val) {
  return this.cata({
    String: () => val,
    NonEmptyString: () => val,
    FiniteNumber: () => parseFloat(val),
    PositiveFiniteNumber: () => parseFloat(val),
    Integer: () => parseFloat(val),
    Date: () => moment(val),
    Boolean: () => val === 'true',
    Enumerated: (values) => val,
  })
}

module.exports = DataType;
