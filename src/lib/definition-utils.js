const R = require('ramda');

const Slot = require('../types/slot');
const DataSlot = require('../types/data-slot');


const populateSlots = (dataset, inputs, slots) => R.pipe(
  R.map(slot => ({
    [slot.id]: DataSlot.is(slot) ?
      slot.populate(dataset, inputs[slot.id]) :
      slot.populate(inputs[slot.id]),
  })),
  R.mergeAll
)(slots);

const validateSlots = (dataset, inputs, slots) => R.all(
  slot => Slot.is(slot) ?
    slot.valid(inputs[slot.id]) :
    slot.valid(dataset, inputs[slot.id]),
  slots
);

module.exports = {populateSlots, validateSlots};
