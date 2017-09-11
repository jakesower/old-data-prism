const R = require('ramda');
const daggy = require('daggy');

const Slot = daggy.taggedSum('Slot', {
  User: ['id', 'display', 'dataType'],
  Column: ['id', 'display', 'dataType'],
  Multicolumn: ['id', 'display', 'dataType'],
});


// Slot ~> Dataset -> StrMap -> Boolean
Slot.prototype.valid = function (dataset, inputs) {
  const v = id => inputs[id];

  return this.cata({
    User: (id, _, dataType) => dataType.test(v(id)),
    Column: (id, _, dataType) => {
      const col = dataset.columns()[v(id)];
      return col.valid(dataType);
    },
    Multicolumn: (id, _, dataType) => {
      const cols = R.map(c => dataset.columns()[c], v(id));
      return R.all(col => col.valid(dataType), cols);
    }
  });
}


// Assumes valid inputs
// Slot ~> Dataset -> StrMap -> StrMap
Slot.prototype.populate = function (dataset, inputs) {
  return this.cata({
    User: (id, _, dataType) => dataType.cast(inputs[id]),
    Column: (id, _, dataType) => {
      const col = dataset.columns()[inputs[id]];
      return R.map(dataType.cast, col.values);
    },
    Multicolumn: (id, _, dataType) => {
      const cols = R.map(i => dataset.columns()[i], inputs[id]);
      return R.map(col => R.map(dataType.cast, col.values), cols);
    }
  })
}


module.exports = Slot;
