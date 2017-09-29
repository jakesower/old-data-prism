const R = require('ramda');
const daggy = require('daggy');

const Slot = require('./slot');
const DataType = require('./data-type');

/**
 * DataSlots are a specialized kind of Slot. They natively operate on Datasets,
 * usually converting them into generic Slots.
*/
const DataSlot = daggy.taggedSum('DataSlot', {
  User: ['id', 'display', 'dataType'],
  Column: ['id', 'display', 'dataType'],
  Multicolumn: ['id', 'display', 'dataType'],
});


// DataSlot ~> Dataset -> Slot
DataSlot.prototype.toSlot = function (dataset) {
  const colPool = R.addIndex(R.map)(
    (c, idx) => ({display: c.header, value: idx}),
    dataset.columns()
  );

  return this.cata({
    User: Slot.Free,
    Column: (id, display, dataType) =>
      Slot.Pool(id, display, DataType.FiniteNumber, colPool),
    Multicolumn: (id, display, dataType) =>
      Slot.Multipool(id, display, DataType.FiniteNumber, colPool)
  });
}


// DataSlot ~> Dataset -> String -> Boolean
DataSlot.prototype.valid = function (dataset, value) {
  return this.cata({
    User: (id, _, dataType) => dataType.test(value),
    Column: (id, _, dataType) => {
      const col = dataset.columns()[value];
      return col && col.valid(dataType);
    },
    Multicolumn: (id, _, dataType) => {
      const cols = R.map(c => dataset.columns()[c], value);
      return R.all(col => col.valid(dataType), cols);
    }
  });
}


// Assumes valid inputs
// DataSlot ~> Dataset -> Any -> Any
DataSlot.prototype.populate = function (dataset, value) {
  return this.cata({
    User: (id, _, dataType) => dataType.cast(value),
    Column: (id, _, dataType) => {
      const col = dataset.columns()[value];
      return R.map(v => dataType.cast(v), col.values);
    },
    Multicolumn: (id, _, dataType) => {
      const cols = R.map(i => dataset.columns()[i], value);
      const expanded = R.map(col => R.map(v => dataType.cast(v), col.values), cols);
      return R.transpose(expanded);
    }
  })
}

// DataSlot ~> a
DataSlot.prototype.defaultValue = function () {
  return this.cata({
    User: () => '',
    Column: () => null,
    Multicolumn: () => []
  });
}


module.exports = DataSlot;
