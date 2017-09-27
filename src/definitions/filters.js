const R = require('ramda');
const h = require('snabbdom/h').default;

const DataType = require('../types/data-type');
const DataSlot = require('../types/data-slot');

const withKeys = R.mapObjIndexed((v, key) => R.merge({key}, v));
const col = R.curry((dataset, cName) =>
  h('span', {class: {"column-name": true}}, dataset.headers[cName]));

// Helper function for filters that filter on a simple row-by-row basis
// (StrMap Inputs -> Boolean) -> (Dataset -> Dataset)
const rowFilter = def => {
  return R.merge(def, {
    fn: R.nAry(3, (dataset, inputs) => {
      const {records, headers} = dataset;
      const rowN = n => R.map(i => Array.isArray(i) ? i[n] : i, inputs);

      return {
        headers,
        records: R.addIndex(R.filter)(
          (rec, idx) => def.fn(rowN(idx)),
          records
        )
      };
    })
  });
}


// BEGIN ACTUAL FILTERS

const Equality = rowFilter({
  name: "Equality",

  slots: [
    DataSlot.Column('a', 'Column', DataType.String),
    DataSlot.User('b', 'Equals', DataType.String),
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
    DataSlot.User('target', 'is less than', DataType.FiniteNumber),
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
    DataSlot.User('target', 'is less than or equal to', DataType.FiniteNumber),
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
    DataSlot.User('target', 'is greater than', DataType.FiniteNumber),
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
    DataSlot.User('target', 'is greater than or equal to', DataType.FiniteNumber),
  ],
  display: (inputs, dataset) =>
    h('div', {}, [
      h('span', {class: {"column-name": true}}, dataset.headers[inputs.base]),
      ` ≥ ${inputs.target}`
    ])
});


const transforms = R.pipe(
  withKeys,
  R.map(R.merge({createsColumn: false}))
);

module.exports = transforms({
  Equality,
  LT,
  LTE,
  GT,
  GTE,
});
