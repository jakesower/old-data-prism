const assert = require('chai').assert;
const S = require('sanctuary');
const R = require('ramda');

const DSF = require('../src/lib/dataset-functions');
const DF = require('../src/lib/deriver-functions');
const FF = require('../src/lib/filter-functions');
const FILTERS = require('../src/definitions/filters');
const DERIVERS = require('../src/definitions/derivers');
const dataTypes = require('../src/definitions/data');

const {init} = require('../src/components/operation');

const careBears = {
  headers: ['Name', 'Belly Badge', 'Debut', 'Debut Year'],
  records: [
    ['Tenderheart Bear', 'Heart', '1982-09-24', '1982'],
    ['Grumpy Bear', 'Raincloud', '1982-09-24', '1982'],
    ['Messy Bear', 'Tornado', '2005-10-18', '2005'],
    ['Oopsy Bear', 'Shooting Star', '2007-08-04', '2007']
  ]
};

describe('operation functions', function() {
  it('reports invalid operations correctly', function() {
    const valid = [{

    }]
  });
});
