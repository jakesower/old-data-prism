const R = require('ramda');
const DataType = require('../types/data-type');
const DataSlot = require('../types/data-slot');

const col = R.curry((dataset, cName) =>
  h('span', {class: {"column-name": true}}, dataset.headers[cName]));

/*
 * Aggregators are NOT operations. Rather they are functions that reduce
 * datasets to a single value.
 */

const Count = {
  name: "Count",
  slots: [],
  fn: (group, inputs) => group.records.length,
  display: () => 'Count'
};


const Mean = {
  name: "Mean",
  slots: [
    DataSlot.Column('a', 'Column', DataType.FiniteNumber)
  ],
  fn: (group, inputs) => R.mean(inputs.a),
  display: () => 'Mean'
};


const Median = {
  name: "Median",
  slots: [
    DataSlot.Column('a', 'Column', DataType.FiniteNumber)
  ],
  fn: (group, inputs) => R.median(inputs.a),
  display: (inputs, group) => 'Median'
};


const Maximum = {
  name: "Maximum",
  slots: [
    DataSlot.Column('a', 'Column', DataType.FiniteNumber)
  ],
  fn: (group, inputs) => R.max(inputs.a),
  display: () => 'Maximum'
};


const Minimum = {
  name: "Minimum",
  slots: [
    DataSlot.Column('a', 'Column', DataType.FiniteNumber)
  ],
  fn: (group, inputs) => R.min(inputs.a),
  display: () => 'minimum'
};


const Sum = {
  name: "Sum",
  slots: [
    DataSlot.Column('a', 'Column', DataType.FiniteNumber)
  ],
  fn: (group, inputs) => R.sum(inputs.a),
  display: () => 'Sum'
};


const Product = {
  name: "Product",
  slots: [
    DataSlot.Column('a', 'Column', DataType.FiniteNumber)
  ],
  fn: (group, inputs) => R.product(inputs.a),
  display: () => 'Product'
};



module.exports = {
  Count,
  Mean,
  Median,
  Maximum,
  Minimum,
  Sum,
  Product,
};
