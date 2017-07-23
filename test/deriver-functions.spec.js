const assert = require('chai').assert;
const S = require('sanctuary');
const R = require('ramda');
const moment = require('moment');

const DF = require('../src/lib/deriver-functions');
const DSF = require('../src/lib/dataset-functions');
const DERIVERS = require('../src/definitions/derivers');

const careBears = {
  headers: ['Name', 'Lucky Number', 'Debut', 'Generation'],
  records: [
    ['Tenderheart Bear', '2', '1982-09-24', '1'],
    ['Grumpy Bear', '3', '1982-09-24', '1'],
    ['Messy Bear', '5', '2005-10-18', '3'],
    ['Oopsy Bear', '7', '2007-08-04', '4']
  ]
};

const SAMPLE_DERIVERS = {
  FormattedDate: {
    name: "Formatted Date",

    slots: [
      { key: "date",
        display: "date",
        type: "column",
        test: x => !isNaN(Date.parse(x))
      },
      {
        display: "format",
        key: "format",
        test: R.complement(R.empty),
        type: "user"
      }
    ],

    fn: inputs => R.map(d => moment(d).format(inputs.format), inputs.date),
    display: () => "derived"
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
      { in: DF.apply(SAMPLE_DERIVERS.FormattedDate, {date: 2, format: "YYYY"})
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
        { input: {date: 2, format: "ddd"}
        , out: ["Fri", "Fri", "Tue", "Sat"] }
      ],

      Quantile: [
        { input: {n: 3, order: "2"}
        , out: ["1", "1", "2", "2"]},

        { input: {n: 3, order: "3"}
        , out: ["1", "1", "2", "3"]}
      ],

      Sum: [
        { input: {addends: [1, 3]}
        , out: ["3", "4", "8", "11"]
        }
      ]
    };

    it('has a set of tests for every existing deriver ^_^', function() {
      assert.deepEqual(R.keys(testCases), R.keys(DERIVERS));
    });

    R.forEachObjIndexed(function(expectations, deriverName) {
      const deriver = DERIVERS[deriverName];

      it('has working tests for the ' + deriver.name + ' deriver', function() {
        R.forEach(function({input, out}) {
          const result = DF.apply(deriver, input, careBears);

          assert.deepEqual(derivedValues(result), out);
        }, expectations);
      })
    }, testCases);
  })
});
