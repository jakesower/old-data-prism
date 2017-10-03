const R = require('ramda');
const h = require('snabbdom/h').default;

const DataType = require('../../types/data-type');
const DataSlot = require('../../types/data-slot');
const Slot = require('../../types/slot');

const {populateSlots, validateSlots} = require('../lib/definition-utils');

const col = R.curry((dataset, cName) =>
  h('span', {class: {"column-name": true}}, dataset.headers[cName]));


const rowFilter = def => {
  return R.merge(def, {
    fn: (dataset, inputs) => {
      const {records, headers} = dataset;
      const populated = populateSlots(dataset, inputs, def.slots);
      const rowN = n => R.map(i => Array.isArray(i) ? i[n] : i, populated);

      return {
        headers,
        records: R.addIndex(R.filter)(
          (rec, idx) => def.fn(rowN(idx)),
          records
        )
      };
    },

    help: def.help || 'TODO',
    collector: SlotCollector(def.slots),
    valid: (dataset, inputs) => validateSlots(dataset, inputs, def.slots),
    tags: R.append('filter', def.tags)
  });
}


// BEGIN ACTUAL FILTERS

const Equality = rowFilter({
  name: "Equality",
  slots: [
    DataSlot.Column('a', 'Column', DataType.String),
    Slot.Free('b', 'Equals', DataType.String),
  ],
  fn: inputs => inputs.a === inputs.b,
  display: (inputs, dataset) =>
    h('div', {}, [
      h('span', {class: {"column-name": true}}, dataset.headers[inputs.a]),
      ` = ${inputs.b}`
    ])
});


const LT = rowFilter({
  name: "Less Than",
  slots: [
    DataSlot.Column('base', 'Column', DataType.FiniteNumber),
    Slot.Free('target', 'is less than', DataType.FiniteNumber),
  ],
  fn: inputs => inputs.base < inputs.target,
  display: (inputs, dataset) =>
    h('div', {}, [
      h('span', {class: {"column-name": true}}, dataset.headers[inputs.base]),
      ` < ${inputs.target}`
    ])
});


const LTE = rowFilter({
  name: "Less Than or Equal",
  fn: inputs => inputs.base <= inputs.target,
  slots: [
    DataSlot.Column('base', 'Column', DataType.FiniteNumber),
    Slot.Free('target', 'is less than or equal to', DataType.FiniteNumber),
  ],
  display: (inputs, dataset) =>
    h('div', {}, [
      h('span', {class: {"column-name": true}}, dataset.headers[inputs.base]),
      ` ≤ ${inputs.target}`
    ])
});


const GT = rowFilter({
  name: "Greater Than",
  fn: inputs => inputs.base > inputs.target,
  slots: [
    DataSlot.Column('base', 'Column', DataType.FiniteNumber),
    Slot.Free('target', 'is greater than', DataType.FiniteNumber),
  ],
  display: (inputs, dataset) =>
    h('div', {}, [
      h('span', {class: {"column-name": true}}, dataset.headers[inputs.base]),
      ` > ${inputs.target}`
    ])
});


const GTE = rowFilter({
  name: "Greater Than or Equal",
  fn: inputs => inputs.base >= inputs.target,
  slots: [
    DataSlot.Column('base', 'Column', DataType.FiniteNumber),
    Slot.Free('target', 'is greater than or equal to', DataType.FiniteNumber),
  ],
  display: (inputs, dataset) =>
    h('div', {}, [
      h('span', {class: {"column-name": true}}, dataset.headers[inputs.base]),
      ` ≥ ${inputs.target}`
    ])
});

module.exports = {
  Equality,
  LT,
  LTE,
  GT,
  GTE,
};
