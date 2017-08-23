const R = require('ramda');
const moment = require('moment');
const daggy = require('daggy');

const typeDefaults = {
  htmlInputType: "text",
  htmlTest: "",
  args: []
};

// Mutable for ease of construction. It can be treated as immutable upon
// export. See Rich Hickey quote. :)
let Types = {};

Types.String = {
  test: x => true,
  cast: x => x,
}

Types.NonEmptyString = {
  test: x => x !== '',
  cast: x => x,
  htmlPattern: ".+"
}

// Useful regex for matching any JS number
// "(?:NaN|-?(?:(?:\\d+|\\d*\\.\\d+)(?:[E|e][+|-]?\\d+)?|Infinity))"

Types.FiniteNumber = {
  // test: x => {console.log(x); return !isNaN(parseFloat(x)) && isFinite(x)},
  test: x => !isNaN(parseFloat(x)) && isFinite(x),
  cast: parseFloat,
}

Types.PositiveFiniteNumber = {
  test: x => Types.FiniteNumber.test(x) && x > 0,
  cast: parseFloat,
  // htmlPattern: "(?:(?:\\d+|\\d*\\.\\d+)(?:[E|e][+|-]?\\d+)?)"
}

Types.Integer = {
  test: x => Types.FiniteNumber.test(x) && x % 1 === 0,
  cast: parseInt,
  htmlInputType: "number"
}

Types.Date = {
  test: x => !isNaN(Date.parse(x)),
  cast: moment
}

Types.Enumerated = {
  test: R.flip(R.contains),
  cast: (enums, val) => val,
  args: ['enums']
}

const FullTypes = R.map(R.merge(typeDefaults), Types);

module.exports = FullTypes
//
//
// console.log(FullTypes)
// const DataType = daggy.taggedSum('DataType', R.map(R.prop('args'), FullTypes));
//
// const tests = R.map(R.prop('test'), Types);
// const casts = R.map(R.prop('cast'), Types);
// console.log(tests)
//
// DataType.prototype.test = function (val) {
//   return this.cata(R.map(t =>
//     function () {
//       const args = Array.from(arguments);
//       console.log(R.append(val, args))
//       return t.apply(null, R.append(val, args));
//     }, tests)
//   );
// }
//
// DataType.prototype.cast = function (val) {
//   return this.cata(R.map(t => () => t.call(null, val), casts));
// }
//
// const traps = {
//   get: (target, prop, receiver) =>
//     R.has(prop, target) ? target.prop :
//     R.has(prop, FullTypes) ? FullTypes
// }
//
// module.exports = DataType;
//
// // DataType.prototype.
//
//
// // module.exports = Object.freeze(
// //   R.map(R.merge(typeDefaults), Types)
// // );
