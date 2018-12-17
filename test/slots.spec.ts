import { assert } from 'chai';
import 'mocha';
import { ExpressionSlot } from '../src/lib/slots';
import { compileTestData } from './test-utils';
import dataTypes from '../src/lib/data-types';
import { eq } from '../src/lib/utils';

const testData = compileTestData({
  Date: ['2014-06-14', '2014-06-20', '2014-06-24'],
  Opponent: ['England', 'Costa Rica', 'Uruguay'],
  GF: ['2', '0', '0'],
  GA: ['1', '1', '1'],
});

describe('expression slot', () => {
  const slot = ExpressionSlot({ display: 'Test' });

  it('should compile a proper expression', () => {
    const exp = "{GF} + {GA}";
    const vals = slot.extract(testData, exp);
    assert(eq(vals, ['3', '1', '1']));
  });
});
