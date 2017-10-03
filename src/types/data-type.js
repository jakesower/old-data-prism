const R = require('ramda');
const daggy = require('daggy');
const moment = require('moment');

/**
 * These are not conventional simple data types. Each function within accepts
 * a string and attempts to deal with it.
 */

const sumTypes = {
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
};

const DataType = daggy.taggedSum('DataType', sumTypes);

DataType.types = R.map(k => DataType[k], R.keys(sumTypes));
DataType.unitTypes = R.filter(t => DataType.is(t), DataType.types);

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


DataType.prototype.impliedTypes = function () {
  const inherit = R.pipe( // array of types come in
    R.chain(t => R.append(t, t.impliedTypes)),
    R.uniq
  )

  return this.cata({
    String: () => [],
    NonEmptyString: () => [DataType.String],
    Number: () => inherit([DataType.NonEmptyString]),
    FiniteNumber: () => inherit([DataType.Number]),
    PositiveFiniteNumber: () => inherit([DataType.FiniteNumber]),
    Integer: () => inherit([DataType.Number]),
    PositiveInteger: () => inherit([DataType.Integer, DataType.PositiveFiniteNumber]),
    Date: () => [DataType.String],
    Boolean: () => inherit([DataType.NonEmptyString]),
    Enumerated: (values) => []
  });
}

module.exports = DataType;
