const assert = require('chai').assert;
const S = require('sanctuary');
const R = require('ramda');
const moment = require('moment');

// const GF = require('../src/lib/grouping-functions');
const DSF = require('../src/lib/dataset-functions');
const AGGREGATORS = require('../src/definitions/aggregators');

const careBears = {
  headers: ['Name', 'Belly Badge', 'Debut Year', 'Gender', 'Favorite Number'],
  records: [
    ['Tenderheart Bear', 'Heart', '1982', 'Male', '2'],
    ['Grumpy Bear', 'Raincloud', '1982', 'Male', '3'],
    ['Funshine Bear', 'Sun', '1982', 'Genderqueer', '5'],
    ['Cheer Bear', 'Rainbow', '1982', 'Female', '7'],
    ['True Heart Bear', 'Star with Heart', '1986', 'Female', '11'],
    ['Messy Bear', 'Tornado', '2005', 'Male', '13'],
    ['Oopsy Bear', 'Shooting Star', '2007', 'Male', '17']
  ]
};


describe('groupings', function() {
  describe('real groupings', function() {
    const testCases = [
      {
        input: {
          columns: ['3'],
          aggregators: [
            {
              func: 'Count',
              args: []
            }
          ]
        },
        outputRecords: [['Male', '4'], ['Genderqueer', '1'], ['Female', '2']]
      }
    ];

    // it('has a set of tests for every existing deriver ^_^', function() {
    //   assert.deepEqual(R.keys(testCases), R.keys(DERIVERS));
    // });

    R.forEach(function({input, outputRecords}) {
      it('has working tests for aggregators', function() {
        const result = GF.applyOperation(careBears, input);

        assert.deepEqual(result.records, outputRecords);
      })
    }, testCases);
  })
});
