const assert = require('chai').assert;
const S = require('sanctuary');
const R = require('ramda');
const moment = require('moment');

const DF = require('../src/lib/deriver-functions');
const DSF = require('../src/lib/dataset-functions');
const DERIVERS = require('../src/lib/derivers');

const careBears = {
  headers: ['Name', 'Belly Badge', 'Debut', 'Generation'],
  records: [
    ['Tenderheart Bear', 'Heart', '1982-09-24', '1'],
    ['Grumpy Bear', 'Raincloud', '1982-09-24', '1'],
    ['Messy Bear', 'Tornado', '2005-10-18', '3'],
    ['Oopsy Bear', 'Shooting Star', '2007-08-04', '4']
  ]
};

const SAMPLE_DERIVERS = {
  FormattedDate: {
    name: "Formatted Date",

    columnSlots: [{
      name: "date",
      test: x => !isNan(Date.parse(x))
    }],
    userInputs: [{
      name: "format",
      key: "format"
    }],

    fn: (us, cs) => R.map(d => moment(d).format(us.format), cs.date)
  }
}

const derivedValues = R.pipe(
  DSF.columns,
  R.last,
  R.prop('values')
);


describe('derivers', function() {
  it('applies contrived derivers properly', function() {
    const expectations = [
      { in: DF.apply(SAMPLE_DERIVERS.FormattedDate, {date: 2}, {format: "YYYY"})
      , out: ["1982", "1982", "2005", "2007"] },
    ];

    R.mapObjIndexed(
      function(expected, k) {
        const result = expected.in(careBears);

        assert.deepEqual(derivedValues(result), expected.out)
      },
      expectations
    )
  });


  describe('real derivers', function() {
    const testCases = {
      FormattedDate: [
        { inCols: {date: 2}
        , inUser: {format: "ddd"}
        , out: ["Fri", "Fri", "Tue", "Sat"] }
      ],

      Quantile: [
        { inCols: {n: 3}
        , inUser: {order: 2}
        , out: ["1", "1", "2", "2"]},

        { inCols: {n: 3}
        , inUser: {order: 3}
        , out: ["1", "1", "2", "3"]}
      ]
    };

    it('has a set of tests for every existing deriver ^_^', function() {
      assert.deepEqual(R.keys(testCases), R.keys(DERIVERS));
    });

    R.forEachObjIndexed(function(expectations, deriverName) {
      const deriver = DERIVERS[deriverName];

      it('has working tests for the ' + deriver.name + ' deriver', function() {
        R.forEach(function({inCols, inUser, out}) {
          const result = DF.apply(deriver, inCols, inUser, careBears);

          assert.deepEqual(derivedValues(result), out);
        }, expectations);
      })
    }, testCases);
  })
});
