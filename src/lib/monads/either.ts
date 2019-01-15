// import { Monad } from '../types';
import { Maybe } from './maybe';
import { zipObj } from '../utils';

const SErr = Symbol('SErr');
const SOk = Symbol('SOk');


export class Either<E,O> { // implements Monad<T> {
  private constructor(
    private type: (typeof SErr) | (typeof SOk),
    private value: E|O)
    {}

  // `of` is the strict constructor--anything may be wrapped in the Either,
  // including undefined and null values
  static of<T,U>(value: U): Either<T,U> {
    return new Either(SOk, value);
  }

  static Err<T,U>(value: T): Either<T,U> {
    return new Either(SErr, value);
  }

  static Ok<T,U>(value: U): Either<T,U> {
    return new Either(SOk, value);
  }

  recoverWith<T>(defaultValue: T): (T|O) {
    return (this.type === SErr) ? defaultValue : <O>this.value;
  }

  map<T>(fn: (value: O) => T): Either<E,T> {
    return this.type === SErr ?
      new Either<E,T>(SErr, <E>this.value) :
      new Either(SOk, fn(<O>this.value));
  }

  chain<T>(fn: (value: O) => Either<E,T>): Either<E,T> {
    return this.type === SErr ?
      new Either<E,T>(SErr, <E>this.value) :
      fn(<O>this.value);
  }

  mapErr<T>(fn: (value: E) => T): Either<T,O> {
    return this.type === SErr ?
      new Either(SErr, fn(<E>this.value)) :
      new Either(SOk, <O>this.value);
  }

  isOk(): boolean {
    return this.type === SOk;
  }

  isErr(): boolean {
    return this.type === SErr;
  }

  toMaybe(): Maybe<O> {
    return this.type === SErr ? Maybe.Nothing<O>() : Maybe.of(<O>this.value);
  }

  hasValue(value: E|O): boolean {
    return this.value === value;
  }

  getOkValue(): O {
    if (this.type === SErr) {
      throw "tried to extract an Ok value from an Err Either!";
    }
    return <O>this.value;
  }
}


export const Ok = Either.Ok;
export const Err = Either.Err;

export function sequenceList<T,U>(eithers: Either<T,U>[]): Either<T,U[]> {
  const l = eithers.length;
  const out = <U[]>[];
  for (let i=0; i<l; i+=1) {
    const e = eithers[i];
    if (e.isErr()) { return (e as unknown as Either<T, U[]>); }
    out[i] = e.recoverWith(null) as U;
  }
  return Ok(out);
}

export function sequenceObj<T,U>(eithers: {[k: string]: Either<T,U>}): Either<T,{[k: string]: U}> {
  const keys = Object.keys(eithers);
  const vals = Object.values(eithers);
  const l = vals.length;
  const out = <U[]>[];
  for (let i=0; i<l; i+=1) {
    const e = vals[i];
    if (e.isErr()) { return (e as unknown as Either<T,{[k: string]: U}>); }
    out[i] = e.recoverWith(null) as U;
  }
  return Ok(zipObj(keys, out));
}
