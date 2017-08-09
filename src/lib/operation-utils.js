const R = require('ramda');

const DSF = require('./dataset-functions');

// Operation -> Dataset -> StrMap (slotKey: value) -> StrMap (slotKey: value)
// Populates the operation's slots with appropriate inputs. This includes type
// casting.
const populateSlots = (operation, inputs, dataset) => {
  console.log({ operation, inputs, dataset })
  const dsCols = DSF.columns(dataset);
  const nthCol = n => dsCols[n];
  const colVal = R.curry((dataType, colIdx) =>
    R.pipe(
      nthCol,
      R.prop('values'),
      R.map(dataType.cast)
    )(colIdx)
  );

  const colVals = (dataType, v) => R.transpose(R.map(colVal(dataType), v));

  const extractSlot = ({sourceType, dataType, key}) =>
    sourceType === 'user'   ? inputs[key] :
    sourceType === 'column' ? colVal(dataType, inputs[key])
        /* 'multicolumn' */ : colVals(dataType, inputs[key]);

  return R.pipe(
    // List Slot -> List StrMap Slot (keyed by slot key)
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
