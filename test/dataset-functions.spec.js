const assert = require('chai').assert;
const S = require('sanctuary');
const R = require('ramda');

const DSF = require('../src/lib/dataset-functions');
const DF = require('../src/lib/deriver-functions');
const FF = require('../src/lib/filter-functions');
const OPF = require('../src/lib/operation-functions'); // TODO: should in its own tests
const FILTERS = require('../src/lib/filters');
const DERIVERS = require('../src/lib/derivers');

const careBears = {
  headers: ['Name', 'Belly Badge', 'Debut', 'Debut Year'],
  records: [
    ['Tenderheart Bear', 'Heart', '1982-09-24', '1982'],
    ['Grumpy Bear', 'Raincloud', '1982-09-24', '1982'],
    ['Messy Bear', 'Tornado', '2005-10-18', '2005'],
    ['Oopsy Bear', 'Shooting Star', '2007-08-04', '2007']
  ]
};

describe('dataset functions', function() {
  it('calculates columns right', function() {
    const columns = DSF.columns(careBears);

    assert.equal(columns.length, careBears.headers.length);
    assert.deepEqual(R.slice(0, 2, columns), [
      {header: 'Name', index: 0, values: ['Tenderheart Bear', 'Grumpy Bear', 'Messy Bear', 'Oopsy Bear']},
      {header: 'Belly Badge', index: 1, values: ['Heart', 'Raincloud', 'Tornado', 'Shooting Star']}
    ])
  });


  it('appends columns', function() {
    const appended = DSF.appendColumn(careBears, {
      header: 'Name (Spanish)',
      values: ['Corazón Tierno', 'Osito Gruñón', 'Osito Sucio', 'Revoltosito']
    });

    assert.deepEqual(appended.headers, ['Name', 'Belly Badge', 'Debut', 'Debut Year', 'Name (Spanish)']);
    assert.deepEqual(R.slice(0, 2, appended.records), [
      ['Tenderheart Bear', 'Heart', '1982-09-24', '1982', 'Corazón Tierno'],
      ['Grumpy Bear', 'Raincloud', '1982-09-24', '1982', 'Osito Gruñón']
    ])
  });


  it('finds relevant columns based on column tests', function() {
    const expectations = [
      { test: R.T
      , expected: DSF.columns(careBears) },

      { test: n => !isNaN(n)
      , expected: DSF.columns(careBears).filter(c => c.header === 'Debut Year') }
    ];

    R.forEach(
      function({test, expected}) {
        assert.deepEqual(DSF.relevantColumns(careBears, test), expected);
      },
      expectations
    );
  });


  // TODO: move into operation test
  it('applies a sequence of operations', function() {
    // Care Bears debuting on a Friday
    const ops = [
      {type: "Deriver", enabled: true, func: "FormattedDate", columns: {date: 2}, userInputs: {format: "ddd"}},
      {type: "Filter", enabled: true, func: "Equality", columns: {val: 4}, userInputs: {val: "Fri"}}
    ];

    assert.deepEqual(OPF.applyOperations(careBears, ops), {
      headers: ['Name', 'Belly Badge', 'Debut', 'Debut Year', 'Formatted Date (Debut, ddd)'],
      records: [
        ['Tenderheart Bear', 'Heart', '1982-09-24', '1982', 'Fri'],
        ['Grumpy Bear', 'Raincloud', '1982-09-24', '1982', 'Fri']
      ]
    });
  })

});
