const assert = require('chai').assert;
const S = require('sanctuary');
const R = require('ramda');

const FF = require('../src/lib/filter-functions');
const DSF = require('../src/lib/dataset-functions');
const FILTERS = require('../src/definitions/filters');
const dataTypes = require('../src/definitions/data');


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
    slots: [
      { key: "val",
        dataType: dataTypes.String,
        sourceType: "user",
        display: "val"
      },
      { key: "val2",
        dataType: dataTypes.String,
        sourceType: "user",
        display: "val"
      }
    ],
    fn: (args, records) =>
      R.filter(r => R.nth(args.val, r) === args.val2, records),
    display: () => 'hi'
  },

  LT: {
    name: "Less Than",
    slots: [
      { key: "val",
        display: "val",
        dataType: dataTypes.FiniteNumber,
        sourceType: "column",
      },
      { key: "val2",
        display: "val",
        dataType: dataTypes.FiniteNumber,
        sourceType: "user",
      }
    ],
    fn: (args, records) => R.filter(r => R.nth(args.val, r) < args.val2, records),
    display: () => 'hi'
  }
}


describe('filters', function() {
  it('applies contrived filters properly', function() {
    const expectations = [
      { in: FF.apply(SAMPLE_FILTERS.Equality, {val: 1, val2: "Heart"})
      , out: [careBears.records[0]] },

      { in: FF.apply(SAMPLE_FILTERS.LT, {val: 3, val2: "2001"})
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
        { input: {a: 1, b: "Raincloud"}
        , out: R.slice(1, 2, careBears.records)}
      ],

      LT: [
        { input: {base: 3, target: "2005"}
        , out: R.slice(0, 2, careBears.records)
        }
      ],

      LTE: [
        { input: {base: 3, target: "2005"}
        , out: R.slice(0, 3, careBears.records)
        }
      ],

      GT: [
        { input: {base: 3, target: "2005"}
        , out: R.slice(3, 4, careBears.records)
        }
      ],

      GTE: [
        { input: {base: 3, target: "2005"}
        , out: R.slice(2, 4, careBears.records)
        }
      ],
    };

    it('has a test for every existing filter ^_^', function() {
      assert.deepEqual(R.keys(testCases), R.keys(FILTERS));
    });

    R.forEachObjIndexed(function(expectations, filterName) {
      const filter = FILTERS[filterName];

      it('has working tests for the ' + filter.name + ' filter', function() {
        R.forEach(function({input, out}) {
          assert.deepEqual(FF.apply(filter, input, careBears).records, out);
        }, expectations);
      })
    }, testCases);
  })
});
