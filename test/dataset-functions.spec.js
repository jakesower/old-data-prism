import { assert as assert  } from 'chai';
import S from 'sanctuary';
import R from 'ramda';

import * as DSF from '../src/lib/dataset-functions';
import * as DF from '../src/lib/deriver-functions';
import * as FF from '../src/lib/filter-functions';
import * as FILTERS from '../src/definitions/filters';
import * as DERIVERS from '../src/definitions/derivers';
import dataTypes from '../src/definitions/data';

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
      { test: dataTypes.String
      , expected: DSF.columns(careBears) },

      { test: dataTypes.FiniteNumber
      , expected: DSF.columns(careBears).filter(c => c.header === 'Debut Year') }
    ];

    R.forEach(
      function({test, expected}) {
        assert.deepEqual(DSF.validColumns(careBears, test), expected);
      },
      expectations
    );
  });
});
