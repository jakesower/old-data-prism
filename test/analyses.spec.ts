import { assert } from 'chai';
import 'mocha';
import { compileTestData } from './test-utils';
import { LinearRegression } from '../src/analyses/regressions';

const testData = compileTestData({
  Subject: ['1', '2', '3', '4', '5', '6'],
  Age: ['43', '21', '25', '42', '57', '59'],
  Glucose: ['99', '65', '79', '75', '87', '81'],
});

describe('regressions', () => {
  describe('linear regression', () => {
    const xs = testData.columns[1].values.map(n => parseFloat(n));
    const ys = testData.columns[2].values.map(n => parseFloat(n));
    const result = LinearRegression.fn(xs, ys);

    assert.equal(5298, Math.round(result*10000));
  });
});
