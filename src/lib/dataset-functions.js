const R = require('ramda');

const columns = function({headers, records}) {
  const mapWithIndex = R.addIndex(R.map);

  return mapWithIndex((col, idx) => ({
    index: idx,
    header: col,
    values: R.map(R.nth(idx))(records)
  }), headers);
}

module.exports = {columns};
