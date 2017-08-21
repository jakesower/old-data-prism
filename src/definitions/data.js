const moment = require('moment');

// Mutable for ease of construction. It can be treated as immutable upon
// export. See Rich Hickey quote. :)
let Types = {};

Types.String = {
  test: x => true,
  cast: x => x
}

Types.NonEmptyString = {
  test: x => x !== '',
  cast: x => x
}

Types.FiniteNumber = {
  test: x => !isNaN(parseFloat(x)) && isFinite(x),
  cast: parseFloat
}

Types.PositiveFiniteNumber = {
  test: x => Types.FiniteNumber.test(x) && x > 0,
  cast: parseFloat
}

Types.Integer = {
  test: x => Types.FiniteNumber.test(x) && x % 1 === 0,
  cast: parseInt
}

Types.Date = {
  test: x => !isNaN(Date.parse(x)),
  cast: moment
}


module.exports = Object.freeze(Types);
