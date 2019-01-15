import { go } from '../src/lib/utils';
import { Maybe } from '../src/lib/monads/maybe';
import { assert } from 'chai';
import 'mocha';

describe('go', () => {
  const just5 = Maybe.of(5);
  const just3 = Maybe.of(3);
  const nothing = Maybe.Nothing<number>();

  it('should return Nothing when encountering a Nothing', () => {
    const out1: Maybe<number> = go(function* () {
      const nada = yield nothing;
      const five = yield just5;
      return five + nada;
    });

    assert(out1.isNothing());

    const out2: Maybe<number> = go(function* () {
      const five = yield just5;
      const nada = yield nothing;
      return five + nada;
    });

    assert(out2.isNothing());
  });

  it('should return Just 8 with Just inputs', () => {
    const out: Maybe<number> = go(function* () {
      const three = yield just3;
      const five = yield just5;
      return three + five;
    });

    assert(out.hasValue(8));
  });
});
