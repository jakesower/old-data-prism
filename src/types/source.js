const R = require('ramda');
const daggy = require('daggy');

const Dataset = require('./dataset');
const Source = daggy.tagged('Source', ['name', 'dataset', 'schema']);


Source.empty = Source('', Dataset.empty, {});

Source.load = function ({id, name, data, schema}) {
  return Source(name, Dataset.fromCSV(data), schema);
}

Source.fromDataset = function (name, dataset) {
  return Source(name, dataset, {});
}


module.exports = Source;
