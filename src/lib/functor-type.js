const R = require('ramda');
const Type = require('union-type');

/**
 * Goal: Define a union-type with an additional `map` function. Example:
 *
 * ColorPoint = FunctorType({
 *   Red: [Number, Number], // x,y coords
 *   Blue: [Number, Number]
 * });
 *
 * const moveRight = (x,y) => ({x+1, y});
 * const red = ColorPoint.Red(0, 0);
 *
 * ColorPoint.map(moveRight, red); // => ColorPoint.Red(1, 0)
 *
 * The key is that the Red type is kept even though moveRight has no notion of
 * ColorPoints.
 */

module.exports = definition => {
  // Native union-type Type
  const utType = Type(definition);

  // wrap :: SubType -> (a -> b) -> (a -> SubType b)
  const wrap = (subType, fn) => v => utType.subType(fn(v));

  // funcDef :: StrMap SubType (a -> b) -> StrMap SubType a -> SubType b
  const funcDef = R.mapObjIndexed(function(t, subType) {
    const wrapped =
    R.curry(wrap(out[tName])), definition)
  }

  utType.map = fn => Action.case(funcDef);

  return utType;
}
