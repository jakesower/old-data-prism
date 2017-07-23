const R = require('ramda');

const DSF = require('./dataset-functions');

// Operation -> Dataset -> StrMap (slotKey: value) -> StrMap (slotKey: value)
// Populates the operation's slots with appropriate inputs
const populateSlots = (operation, inputs, dataset) => {
  const dsCols = DSF.columns(dataset);
  const nthCol = n => dsCols[n];
  const colVal = R.pipe(nthCol, R.prop('values'));
  const colVals = v => R.transpose(R.map(colVal, v));

  const extractSlot = ({type, key}) =>
    type === 'user'   ? inputs[key] :
    type === 'column' ? colVal(inputs[key])
                      : colVals(inputs[key]);

  return R.pipe(
    // List Slot -> List StrMap Slot (keyed by key)
    R.map(s => ({[s.key]: s})),
    // List StrMap Slot -> StrMap Slot
    R.reduce(R.merge, {}),
    // StrMap Slot -> Populated Args
    R.map(extractSlot)
  )(operation.slots)
}

module.exports = {
  populateSlots
}
