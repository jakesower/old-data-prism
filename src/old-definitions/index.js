const filters = require('./filters');
const derivers = require('./derivers');
const aggregators = require('./aggregators');

module.exports = {
  Filter: filters,
  Deriver: derivers,
  Aggregator: aggregators,
};
