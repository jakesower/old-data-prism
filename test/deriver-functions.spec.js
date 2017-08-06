import { assert as assert  } from 'chai';
import S from 'sanctuary';
import R from 'ramda';
import moment from 'moment';

import * as DF from '../src/lib/deriver-functions';
import * as DSF from '../src/lib/dataset-functions';
import * as DERIVERS from '../src/definitions/derivers';
import dataTypes from '../src/definitions/data';

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
        sourceType: "column",
        dataType: dataTypes.Date
      },
      { display: "format",
        key: "format",
        dataType: dataTypes.NonEmptyString,
        sourceType: "user"
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
      ],

      Difference: [
        { input: {minuend: 1, subtrahend: 3}
        , out: ["1", "2", "2", "3"]
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
