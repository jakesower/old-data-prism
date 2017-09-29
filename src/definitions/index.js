// const filters = require('./filters');
const derivers = require('./derivers');
const custom = require('./custom');
// const aggregators = require('./aggregators');

module.exports = R.mergeAll([
  derivers,
  custom,
]);
