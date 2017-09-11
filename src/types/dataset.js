const R = require('ramda');
const daggy = require('daggy');

const Column = require('./column');

const mapWithIndex = R.addIndex(R.map);


const Dataset = daggy.tagged('Dataset', ['headers', 'records']);

Dataset.prototype.columns = () => {
  const {headers, records} = this;
  const mapWithIndex = R.addIndex(R.map);

  return mapWithIndex((col, idx) =>
    Column(col, R.map(R.nth(idx))(records)),
    headers
  );
}

Dataset.prototype.appendColumn = column =>
  Dataset(
    R.append(column.header, this.headers),
    R.zipWith(R.append, column.values, this.records)
  );

Dataset.prototype.validColumns = dataType =>
  R.filter(col => col.hasType(dataType), this.columns());


module.exports = Dataset;
