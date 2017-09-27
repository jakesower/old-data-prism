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

  // TODO: Ensure that Column values are always integers or null (or Maybe)
  return this.cata({
    User: (id, _, dataType) => dataType.test(v(id)),
    Column: (id, _, dataType) => {
      const col = dataset.columns()[v(id)];
      return col && col.valid(dataType);
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
    User: (id, _, dataType) => ({[id]: dataType.cast(inputs[id])}),
    Column: (id, _, dataType) => {
      const col = dataset.columns()[inputs[id]];
      const vals = R.map(v => dataType.cast(v), col.values);
      return {[id]: vals};
    },
    Multicolumn: (id, _, dataType) => {
      const cols = R.map(i => dataset.columns()[i], inputs[id]);
      const expanded = R.map(col => R.map(v => dataType.cast(v), col.values), cols);
      const vals = R.transpose(expanded);
      return {[id]: vals};
    }
  })
}

// Slot ~> a
Slot.prototype.defaultValue = function () {
  return this.cata({
    User: () => '',
    Column: () => null,
    Multicolumn: () => []
  });
}


module.exports = Slot;
