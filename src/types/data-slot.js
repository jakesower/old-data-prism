const R = require('ramda');
const daggy = require('daggy');

const Slot = require('./slot');
const DataType = require('./data-type');

/**
 * DataSlots are a specialized kind of Slot. They natively operate on Datasets,
 * usually converting them into generic Slots.
*/
const DataSlot = daggy.taggedSum('DataSlot', {
  Column: ['id', 'display', 'dataType'],
  Multicolumn: ['id', 'display', 'dataType'],
});


// DataSlot ~> Dataset -> Slot
DataSlot.prototype.toSlot = function (dataset) {
  const colPool = R.pipe(
    R.zip(R.range(0, R.length(dataset.columns))),
    R.filter(pair => pair[1].hasType(this.dataType)),
    R.map(pair => ({display: pair[1].name, value: pair[0]}))
  )(dataset.columns);

  return this.cata({
    Column: (id, display, dataType) =>
      Slot.Pool(id, display, DataType.FiniteNumber, colPool),
    Multicolumn: (id, display, dataType) =>
      Slot.Multipool(id, display, DataType.FiniteNumber, colPool)
  });
}


// DataSlot ~> Dataset -> String -> Boolean
DataSlot.prototype.valid = function (dataset, value) {
  return this.cata({
    Column: (id, _, dataType) => {
      const col = dataset.columns[value];
      return col && col.hasType(dataType);
    },
    Multicolumn: (id, _, dataType) => {
      const cols = R.map(c => dataset.columns[c], value);
      return R.all(col => col.hasType(dataType), cols);
    }
  });
}


// Assumes valid inputs
// DataSlot ~> Dataset -> Any -> Any
DataSlot.prototype.populate = function (dataset, value) {
  return this.cata({
    Column: (id, _, dataType) => {
      const col = dataset.columns[value];
      return R.map(v => dataType.cast(v), col.values);
    },
    Multicolumn: (id, _, dataType) => {
      const cols = R.map(i => dataset.columns[i], value);
      const expanded = R.map(col => R.map(v => dataType.cast(v), col.values), cols);
      return R.transpose(expanded);
    }
  })
}

// DataSlot ~> a
DataSlot.prototype.defaultValue = function () {
  return this.cata({
    Column: () => null,
    Multicolumn: () => []
  });
}


module.exports = DataSlot;
