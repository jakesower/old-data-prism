const assert = require('chai').assert;
const S = require('sanctuary');
const R = require('ramda');

const {relevantColumns} = require('../src/lib/filter-functions');

const careBears = {
  columns: ['Name', 'Belly Badge', 'Debut Year'],
  records: [
    ['Tenderheart Bear', 'Heart', '1982'],
    ['Grumpy Bear', 'Raincloud', '1982'],
    ['Messy Bear', 'Tornado', '2005'],
    ['Oopsy Bear', 'Shooting Star', '2007']
  ]
};

const SAMPLE_FILTERS = {
  Equality: {
    name: "Equality",
    columnSlots: [{
      name: "val",
      test: R.T
    }],
    userInputs: [{
      key: "val",
      name: ""
    }],
    fn: (us, cs) => us.val === cs.val
  },

  LT: {
    name: "Less Than",
    columnSlots: [{
      name: "val",
      test: n => !isNaN(n),
    }],
    userInputs: [{
      name: "val",
      test: n => !isNaN(n),
    }],
    fn: (us, cs) => parseFloat(cs.val) < parseFloat(us.val)
  }
}


describe('filters', function() {
  it('filters columns on a test predicate', function() {
    const rcs = relevantColumns(careBears, SAMPLE_FILTERS.Equality.columnSlots[0]);
    assert.deepEqual(rcs, ['Name', 'Belly Badge', 'Debut Year']);
  })
});
