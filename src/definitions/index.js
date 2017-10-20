const R = require('ramda');

// const filters = require('./filters');
const derivers = require('./derivers');
const custom = require('./custom');
const groupings = require('./groupings');
const joins = require('./joins');

module.exports = R.mergeAll([
  derivers,
  custom,
  groupings,
  joins,
]);
