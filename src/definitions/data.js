// Mutable for ease of construction. It can be treated as immutable upon
// export. See Rich Hickey quote. :)
let Types = {};

Types.String = {
  test: x => true,
  cast: x => x
}

Types.Float = {
  test: x => !isNaN(parseFloat(x)) && isFinite(x),
  cast: parseFloat
}

Types.Integer = {
  test: x => Types.Float.test(x) && x % 1 === 0,
  cast: parseInt
}


module.exports = Object.freeze(Types);
