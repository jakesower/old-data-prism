const R = require('ramda');

// const filters = require('./filters');
const derivers = require('./derivers');
const custom = require('./custom');
const groupings = require('./groupings');

module.exports = R.mergeAll([
  derivers,
  custom,
  groupings,
]);
