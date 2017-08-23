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

Types.Enumerated = values => ({
  test: R.contains(R.__, values),
  cast: R.identity,
  values
});

// Types.Enumerated = {
//   test: R.flip(R.contains),
//   cast: (enums, val) => val,
//   args: ['enums']
// }


const fleshOut = R.pipe(
  R.map(R.merge(typeDefaults)),
  R.mapObjIndexed((v, key) => R.merge({key}, v))
)


module.exports = fleshOut(Types);


const FullTypes = R.map(R.merge(typeDefaults), Types);
const DataType = daggy.taggedSum('DataType', R.map(R.prop('args'), FullTypes));

const tests = R.map(R.prop('test'), Types);
const casts = R.map(R.prop('cast'), Types);

DataType.prototype.test = function (val) {
  return this.cata(R.map(t =>
    function () {
      const args = Array.from(arguments);
      console.log(R.append(val, args))
      return t.apply(null, R.append(val, args));
    }, tests)
  );
}

DataType.prototype.cast = function (val) {
  return this.cata(R.map(t => () => t.call(null, val), casts));
}

DataType.prototype.getProp = function (prop) {
  return this.cata(R.map(t => R.always(t[prop]), FullTypes));
}

const traps = {
  get: (target, prop, receiver) =>
    R.has(prop, target) ? target[prop] : target.getProp(prop)
}

// module.exports = new Proxy(DataType, traps);
