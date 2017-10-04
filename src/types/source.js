const R = require('ramda');
const daggy = require('daggy');

const Dataset = require('./dataset');
const Source = daggy.tagged('Source', ['name', 'dataset', 'schema']);


Source.fromDataset = function (name, dataset) {
  return Source(name, dataset, {});
}


module.exports = Source;
