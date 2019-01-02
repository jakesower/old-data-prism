import { assert } from 'chai';
import 'mocha';
import { compileTestData } from './test-utils';
import { Expression, Quantile, MapValues } from '../src/operations/derivers'
import { Grouping } from '../src/operations/groupings';
import { Join } from '../src/operations/joins';

const testData = compileTestData({
  Date: ['2014-06-14', '2014-06-14', '2014-06-19', '2014-06-20', '2014-06-24', '2014-06-24'],
  Home: ['Uruguay', 'England', 'Uruguay', 'Italy', 'Italy', 'Costa Rica'],
  Away: ['Costa Rica', 'Italy', 'England', 'Costa Rica', 'Uruguay', 'England'],
  HGs: ['1', '1', '2', '0', '0', '0'],
  AGs: ['3', '2', '1', '1', '1', '0'],
});

describe('derivers', () => {
  describe('Quantile', () => {
    const inputs = { columnName: 'Test', column: "3", order: "3" };

    it('should compute correctly', () => {
      const result = Quantile.fn(testData, inputs);
      const col = result.columns[5];
      assert.equal(col.name, 'Test');
      assert.deepEqual(col.values, ['3', '3', '3', '2', '2', '2']);
    });
  });

  describe('Expression', () => {
    const inputs = { columnName: 'Test', expression: "{HGs} - {AGs}" };

    it('should compute correctly', () => {
      const result = Expression.fn(testData, inputs);
      const col = result.columns[5];
      assert.equal(col.name, 'Test');
      assert.deepEqual(col.values, ['-2', '-1', '1', '-1', '-1', '0']);
    });
  });

  describe('Map Values', () => {
    const inputs = {
      columnName: 'Test',
      values: [
        { condition: '{HGs} > {AGs}', result: 'Home Win' },
        { condition: '{AGs} > {HGs}', result: 'Away Win' },
      ],
      otherwise: 'Tie',
    };

    it('should compute', () => {
      const result = MapValues.fn(testData, inputs);
      const col = result.columns[5];
      assert.equal(col.name, 'Test');
      assert.deepEqual(col.values, ['Away Win', 'Away Win', 'Home Win', 'Away Win', 'Away Win', 'Tie']);
    });
  })
});


describe('groupings', () => {
  describe('Grouping', () => {
    const inputs = {
      groupBasis: ["1"],
      aggregators: [
        { aggregator: 'Count', inputs: { columnName: 'Count' }},
        { aggregator: 'Sum', inputs: { columnName: 'Sum', a: '3' }}
      ]
    };

    it('should compute correctly', () => {
      const result = Grouping.fn(testData, inputs);
      const home = result.columns[0];
      const count = result.columns[1];
      const sum = result.columns[2];

      assert.equal(home.name, 'Home');
      assert.deepEqual(home.values, ['Uruguay', 'England', 'Italy', 'Costa Rica']);
      assert.equal(count.name, 'Count');
      assert.deepEqual(count.values, ['2', '1', '2', '1']);
      assert.equal(sum.name, 'Sum');
      assert.deepEqual(sum.values, ['3', '1', '0', '0']);
    });
  });
});



describe('joins', () => {
  const capitalData = compileTestData({
    Country: ['England', 'Uruguay', 'Italy', 'Canada', 'Madagascar'],
    Capital: ['London', 'Montevideo', 'Rome', 'Ottawa', 'Antananarivo'],
  });
  const baseInput = { foreignSource: capitalData, localKey: 'Home', foreignKey: 'Country' };

  it('should work for inner join', () => {
    const inputs = { ...baseInput, joinMethod: 'Inner' };
    const result = Join.fn(testData, inputs);

    assert.equal(result.columns.length, 7);
    assert.equal(result.records.length, 5);
    assert.deepEqual(['2014-06-14', 'Uruguay', 'Costa Rica', '1', '3', 'Uruguay', 'Montevideo'], result.records[0]);
  });

  it('should work for left join', () => {
    const inputs = { ...baseInput, joinMethod: 'Left' };
    const result = Join.fn(testData, inputs);

    assert.equal(result.columns.length, 7);
    assert.equal(result.records.length, 6);
    assert.deepEqual(['2014-06-14', 'Uruguay', 'Costa Rica', '1', '3', 'Uruguay', 'Montevideo'], result.records[0]);
    assert.deepEqual(['2014-06-24', 'Costa Rica', 'England', '0', '0', '', ''], result.records[5]);
  });

  it('should work for right join', () => {
    const inputs = { ...baseInput, joinMethod: 'Right' };
    const result = Join.fn(testData, inputs);

    assert.equal(result.columns.length, 7);
    assert.equal(result.records.length, 7);
    assert.deepEqual(['2014-06-14', 'Uruguay', 'Costa Rica', '1', '3', 'Uruguay', 'Montevideo'], result.records[1]);
    assert.deepEqual(['', '', '', '', '', 'Canada', 'Ottawa'], result.records[5]);
  });
});
