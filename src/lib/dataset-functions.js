const R = require('ramda');

const columns = function({headers, records}) {
  const mix = R.addIndex(R.map);

  return mix((col, idx) => ({
    index: idx,
    header: col,
    values: R.map(R.nth(idx))(records)
  }), headers);
}

module.exports = {columns};
