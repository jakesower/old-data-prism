const R = require('ramda');
const DataTypes = require('./data');

const col = R.curry((dataset, cName) =>
  h('span', {class: {"column-name": true}}, dataset.headers[cName]));


const Count = {
  name: "Count",

  slots: [],

  fn: (group, args) => group.length,
  // display: (us, cs, dataset) => `<span class="column-name">${dataset.headers[cs.date]}</span> with format ${us.format}`
  display: () => 'Count'
};

module.exports = {
  Count,
};