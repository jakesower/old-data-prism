const R = require('ramda');
const DataType = require('../types/data-type');
const Slot = require('../types/slot');

const withKeys = R.mapObjIndexed((v, key) => R.merge({key}, v));
const col = R.curry((dataset, cName) =>
  h('span', {class: {"column-name": true}}, dataset.headers[cName]));


const Count = {
  name: "Count",

  slots: [],

  fn: (group, inputs) => group.records.length,
  // display: (us, cs, dataset) => `<span class="column-name">${dataset.headers[cs.date]}</span> with format ${us.format}`
  display: () => 'Count'
};


const Mean = {
  name: "Mean",
  slots: [
    Slot.Column('a', 'Column', DataType.FiniteNumber)
  ],
  fn: (group, inputs) => R.mean(inputs.a),
  display: () => 'Mean'
};


const Median = {
  name: "Median",
  slots: [
    Slot.Column('a', 'Column', DataType.FiniteNumber)
  ],
  fn: (group, inputs) => R.median(inputs.a),
  display: (inputs, group) => 'Median'
  // display: (inputs, group) => JSON.stringify({inputs, group})
};


const Maximum = {
  name: "Maximum",
  slots: [
    Slot.Column('a', 'Column', DataType.FiniteNumber)
  ],
  fn: (group, inputs) => R.max(inputs.a),
  display: () => 'Maximum'
};


const Minimum = {
  name: "Minimum",
  slots: [
    Slot.Column('a', 'Column', DataType.FiniteNumber)
  ],
  fn: (group, inputs) => R.min(inputs.a),
  display: () => 'minimum'
};


const Sum = {
  name: "Sum",
  slots: [
    Slot.Column('a', 'Column', DataType.FiniteNumber)
  ],
  fn: (group, inputs) => R.sum(inputs.a),
  display: () => 'Sum'
};


const Product = {
  name: "Product",
  slots: [
    Slot.Column('a', 'Column', DataType.FiniteNumber)
  ],
  fn: (group, inputs) => R.product(inputs.a),
  display: () => 'Product'
};



const transforms = R.pipe(
  R.map(R.merge({createsColumn: true})),
  withKeys
);

module.exports = transforms({
  Count,
  Mean,
  Median,
  Maximum,
  Minimum,
  Sum,
  Product,
});