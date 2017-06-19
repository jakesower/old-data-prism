const R = require('ramda');

const col = R.curry((dataset, cName) =>
  h('span', {class: {"column-name": true}}, dataset.headers[cName]));


const Count = {
  name: "Count",

  columnSlots: [],
  userInputs: [],

  fn: (group, us, cs) => group.length,
  // display: (us, cs, dataset) => `<span class="column-name">${dataset.headers[cs.date]}</span> with format ${us.format}`
};

module.exports = {
  Count,
};
