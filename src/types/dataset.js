const R = require('ramda');
const daggy = require('daggy');

const Column = require('./column');

const mapWithIndex = R.addIndex(R.map);


const Dataset = daggy.tagged('Dataset', ['headers', 'records']);

Dataset.prototype.columns = function () {
  const {headers, records} = this;
  const mapWithIndex = R.addIndex(R.map);

  return mapWithIndex((col, idx) =>
    Column(col, R.map(R.nth(idx))(records)),
    headers
  );
}

Dataset.prototype.appendColumn = function (column) {
  return Dataset(
    R.append(column.header, this.headers),
    R.zipWith(R.append, R.map(x => x.toString(), column.values), this.records)
  );
}

Dataset.prototype.validColumns = function (dataType) {
  return R.filter(col => col.valid(dataType), this.columns());
}


module.exports = Dataset;
