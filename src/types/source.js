const R = require('ramda');
const daggy = require('daggy');

const Dataset = require('./dataset');
const Source = daggy.tagged('Source', ['name', 'dataset', 'schema']);


Source.load = function (data) {
  return Source('', data, {});
}

Source.fromDataset = function (name, dataset) {
  return Source(name, dataset, {});
}


module.exports = Source;
