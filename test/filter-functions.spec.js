const assert = require('chai').assert;
const S = require('sanctuary');
const R = require('ramda');

const FF = require('../src/lib/filter-functions');
const DSF = require('../src/lib/dataset-functions');
const FILTERS = require('../src/lib/filters');
// 
// const {Operaation} = require('../src/types');

const careBears = {
  headers: ['Name', 'Belly Badge', 'Debut', 'Debut Year'],
  records: [
    ['Tenderheart Bear', 'Heart', '1982-09-24', '1982'],
    ['Grumpy Bear', 'Raincloud', '1982-09-24', '1982'],
    ['Messy Bear', 'Tornado', '2005-10-18', '2005'],
    ['Oopsy Bear', 'Shooting Star', '2007-08-04', '2007']
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
  it('applies contrived filters properly', function() {
    const expectations = [
      { in: FF.apply(SAMPLE_FILTERS.Equality, {val: 1}, {val: "Heart"})
      , out: [careBears.records[0]] },

      { in: FF.apply(SAMPLE_FILTERS.LT, {val: 3}, {val: "2001"})
      , out: R.slice(0, 2, careBears.records) }
    ];

    R.mapObjIndexed(
      function(expected, k) {
        assert.deepEqual(expected.in(careBears).records, expected.out)
      },
      expectations
    )
  });


  describe('real filters', function() {
    const testCases = {
      Equality: [
        { inCols: {val: 1}
        , inUser: {val: "Raincloud"}
        , out: R.slice(1, 2, careBears.records)}
      ],

      LT: [
        { inCols: {val: 3}
        , inUser: {val: "2001"}
        , out: R.slice(0, 2, careBears.records)
        }
      ]
    };

    it('has a test for every existing filter ^_^', function() {
      assert.deepEqual(R.keys(testCases), R.keys(FILTERS));
    });

    R.forEachObjIndexed(function(expectations, filterName) {
      const filter = FILTERS[filterName];

      it('has working tests for the ' + filter + ' filter', function() {
        R.forEach(function({inCols, inUser, out}) {
          assert.deepEqual(FF.apply(filter, inCols, inUser, careBears).records, out);
        }, expectations);
      })
    }, testCases);
  })
});
