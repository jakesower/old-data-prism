const R = require('ramda');
const { gen } = require('testcheck');
const {DataType} = require('../../src/types');
const moment = require('moment');

// const map = {
//   String: () => gen.string,
//   NonEmptyString: () => gen.string.suchThat(s => s !== ''),
//   FiniteNumber: () => gen.number.suchThat(n => isFinite(n)).then(x => x.toString()),
//   PositiveFiniteNumber: () => gen.sPosNumber.suchThat(n => isFinite(n)).then(x => x.toString()),
//   Integer: () => gen.int.then(x => x.toString()),
//   PositiveInteger: () => gen.sPosInt.then(x => x.toString()),
//   Date: () => gen.intWithin(900000000, 1000000000).then(x => x.toString()),
//   Boolean: () => gen.boolean.then(x => x.toString()),
//   Enumerated: obj => gen.oneOf(obj.values).then(x => x.toString())
// };

const map = {
  String: () => gen.string,
  Number: () => gen.number,
  NonEmptyString: () => gen.string.suchThat(s => s !== ''),
  FiniteNumber: () => gen.number.suchThat(n => isFinite(n)),
  PositiveFiniteNumber: () => gen.posNumber.suchThat(n => isFinite(n) && n > 0),
  Integer: () => gen.int,
  PositiveInteger: () => gen.sPosInt,
  Date: () => gen.intWithin(900000000, 1000000000).then(moment),
  Boolean: () => gen.boolean,
  Enumerated: obj => gen.oneOf(obj.values)
};

const fromSlot = {
  User: slotType => map[slotType['@@tag']](slotType),
  Column: slotType => gen.array(map[slotType['@@tag']](slotType), {minSize: 1}),
  Multicolumn: slotType => gen.array(gen.array(map[slotType['@@tag']](slotType), {minSize: 1}), {minSize: 1}),
};


module.exports = slot => fromSlot[slot['@@tag']](slot.dataType);
