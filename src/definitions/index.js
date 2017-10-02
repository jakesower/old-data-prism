const R = require('ramda');

// const filters = require('./filters');
const derivers = require('./derivers');
const custom = require('./custom');

module.exports = R.mergeAll([
  derivers,
  custom
]);
