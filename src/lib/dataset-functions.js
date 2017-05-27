const R = require('ramda');

const columnValues = function({columns, records}) {
  const mix = R.addIndex(R.map);

  return mix((col, idx) => ({
    column: col,
    values: R.map(R.nth(idx))(records)
  }), columns);
}

module.exports = {columnValues};
