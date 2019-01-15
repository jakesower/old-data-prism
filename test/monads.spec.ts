import { assert } from 'chai';
import 'mocha';
import { Ok, Err, Either } from '../src/lib/monads/either';

describe('the either monad', () => {
  const ok1: Either<number, number> = Ok(5);
  const ok2: Either<number, number> = Ok(7);
  const err1: Either<number, number> = Err(10);

  it('works as expected with an Ok value', () => {
    assert.isTrue(ok1.isOk(), 'isOk');
    assert.isTrue(!ok1.isErr(), 'isErr');
    assert.equal(ok1.map(x => x + 1).recoverWith(0), 6);
    assert.equal(ok1.chain(o1 => ok2.chain(o2 => Ok(o1 + o2))).recoverWith(0), 12);
    assert.equal(ok1.mapErr(x => x + 1).recoverWith(0), 5);
    assert.isTrue(ok1.toMaybe().hasValue(5), 'toMaybe');
  });


  it('works as expected with an Err value', () => {
    assert.isTrue(!err1.isOk());
    assert.isTrue(err1.isErr());
    assert.isTrue(err1.map(x => x + 1).hasValue(10));
    assert.isTrue(err1.chain(o1 => ok2.chain(o2 => Ok(o1 + o2))).hasValue(10));
    assert.isTrue(ok1.chain(o1 => err1.chain(o2 => Ok(o1 + o2))).hasValue(10));
    assert.isTrue(err1.mapErr(x => x + 1).hasValue(11));
    assert.isTrue(err1.toMaybe().isNothing());
    assert.equal(err1.recoverWith(0), 0);
  });
});
