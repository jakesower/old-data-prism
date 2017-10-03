const R = require('ramda');

// const filters = require('./filters');
const derivers = require('./derivers');
const custom = require('./custom');
const grouping = require('./grouping');

module.exports = R.mergeAll([
  derivers,
  custom,
  grouping,
]);
