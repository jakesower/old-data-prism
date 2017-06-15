const assert = require('chai').assert;
const S = require('sanctuary');
const R = require('ramda');

const FF = require('../src/lib/filter-functions');
const DSF = require('../src/lib/dataset-functions');
const FILTERS = require('../src/lib/filters');

// console.log(R.map(R.prop('columnSlots'), FILTERS))


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
      key: "val",
      test: R.T,
      type: "single",
      display: "val"
    }],
    userInputs: [{
      key: "val",
      display: "val"
    }],
    fn: (us, cs) => us.val === cs.val,
    display: () => 'hi'
  },

  LT: {
    name: "Less Than",
    columnSlots: [{
      key: "val",
      display: "val",
      test: n => !isNaN(n),
      type: "single"
    }],
    userInputs: [{
      key: "val",
      display: "val",
    }],
    fn: (us, cs) => parseFloat(cs.val) < parseFloat(us.val),
    display: () => 'hi'
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


  it('applies list filters properly', function() {

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
        , inUser: {val: "2005"}
        , out: R.slice(0, 2, careBears.records)
        }
      ],

      LTE: [
        { inCols: {val: 3}
        , inUser: {val: "2005"}
        , out: R.slice(0, 3, careBears.records)
        }
      ],

      GT: [
        { inCols: {val: 3}
        , inUser: {val: "2005"}
        , out: R.slice(3, 4, careBears.records)
        }
      ],

      GTE: [
        { inCols: {val: 3}
        , inUser: {val: "2005"}
        , out: R.slice(2, 4, careBears.records)
        }
      ],
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
