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
  Number: [],
  FiniteNumber: [],
  PositiveFiniteNumber: [],
  Integer: [],
  PositiveInteger: [],
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
    Number: () => !isNaN(parseFloat(val)),
    FiniteNumber: () => finiteNum(val),
    PositiveFiniteNumber: () => finiteNum(val) && val > 0,
    Integer: () => finiteNum(val) && val % 1 === 0,
    PositiveInteger: () => finiteNum(val) && val % 1 === 0 && val > 0,
    Date: () => !isNaN(Date.parse(val)),
    Boolean: () => val === 'true' || val === 'false',
    Enumerated: (values) => R.contains(val, values),
  })
}


// DataType ~> String -> Any
DataType.prototype.cast = function (val) {
  return this.cata({
    String: () => val,
    NonEmptyString: () => val,
    Number: () => parseFloat(val),
    FiniteNumber: () => parseFloat(val),
    PositiveFiniteNumber: () => parseFloat(val),
    Integer: () => parseFloat(val),
    PositiveInteger: () => parseFloat(val),
    Date: () => moment(val),
    Boolean: () => val === 'true',
    Enumerated: (values) => val,
  })
}

module.exports = DataType;
