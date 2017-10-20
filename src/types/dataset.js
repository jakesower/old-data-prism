const R = require('ramda');
const daggy = require('daggy');

const Column = require('./column');

const mapWithIndex = R.addIndex(R.map);


const Dataset = daggy.tagged('Dataset', ['columns']);

Dataset.fromCSV = function (csv) {
  // console.log(csv)
  const {headers, records} = csv;
  const pairs = R.zip(headers, R.transpose(records));

  const columns = R.map(
    pair => Column(pair[0], pair[1], Column.detectSchema(pair[1])),
    pairs
  );

  return Dataset(columns);
}

Object.defineProperty(Dataset.prototype, 'records', {
  get: function () {
    const colVals = R.map(R.prop('values'), this.columns);
    const grid = R.reduce(R.flip(R.append), [], colVals);

    return R.transpose(grid);
  }
});

Object.defineProperty(Dataset.prototype, 'headers', {
  get: function () { return R.map(R.prop('name'), this.columns)}
});

Dataset.prototype.appendColumn = function (column) {
  return Dataset(R.append(column, this.columns));
}

Dataset.prototype.validColumns = function (dataType) {
  return R.filter(col => col.valid(dataType), this.columns);
}

Dataset.prototype.applyOperation = function (operation) {
  return operation.apply(this);
}

Dataset.prototype.length = function () {
  return this.columns[0].length;
}

// Dataset ~> List Operation -> List Source -> Dataset
// Applies a list of operations, so long as they are all valid. If an invalid
// operation is encountered, it returns the last result.
Dataset.prototype.applyValidOperations = function (operations, sources) {
  return R.reduce(
    (acc, op) => op.valid(acc, sources) ? op.apply(acc, sources) : R.reduced(acc),
    this,
    operations
  );
}


module.exports = Dataset;
