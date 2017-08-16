const derivers = require('./derivers');
const filters = require('./filters');
const aggregators = require('./aggregators');

module.exports = {
  Filter: filters,
  Deriver: derivers,
  Aggregator: aggregators,
};
