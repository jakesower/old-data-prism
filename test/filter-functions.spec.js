const assert = require('chai').assert;
const S = require('sanctuary');
const R = require('ramda');

const {relevantColumns} = require('../src/lib/filter-functions');
const DF = require('../src/lib/dataset-functions');

const careBears = {
  headers: ['Name', 'Belly Badge', 'Debut Year'],
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
  it('filters columns based on test predicates', function() {
    const expectations = {
      Equality: [DF.columns(careBears)],
      LT: [DF.columns(careBears).filter(c => c.header === 'Debut Year')]
    }

    R.mapObjIndexed(
      function(expected, k) {
        const cs = R.map(idx => relevantColumns(careBears, idx), SAMPLE_FILTERS[k].columnSlots);
        assert.deepEqual(cs, expected);
      },
      expectations
    )
  });


  it('applies filters properly', function() {
    const expectations = [
      { in: DF.apply(SAMPLE_FILTERS.Equality, {val: 1}, {val: "Heart"}),
      , out: {headers: careBears.headers, records: [careBears.records[0]]}}
    ];

    R.mapObjIndexed(
      function(expected, k) {
        assert.equal(expected.in(careBears), out)
      },
      expectations
    )
  })
});
