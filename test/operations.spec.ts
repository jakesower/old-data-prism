import { assert } from 'chai';
import 'mocha';
import { compileTestData } from './test-utils';
import { Expression, Quantile } from '../src/operations/derivers'
import { Grouping } from '../src/operations/groupings';

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
