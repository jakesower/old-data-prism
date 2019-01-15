import { Monad } from '../../types';
const Nothing = Symbol('Nothing');

export class Maybe<T> implements Monad<T> {
  private constructor(private value: T | (typeof Nothing)) {}

  // `of` is the strict constructor--anything may be wrapped in the Maybe,
  // including undefined and null values
  static of<T>(value: T): Maybe<T> {
    return new Maybe(value);
  }

  static fromValue<U>(valueOrFalsy: U | null | undefined): Maybe<U> {
    return (valueOrFalsy != undefined) ?
      new Maybe<U>(valueOrFalsy) :
      new Maybe<U>(Nothing);
  }

  static Nothing<U>() { return new Maybe<U>(Nothing); }

  withDefault<U>(defaultValue: U): (T|U) {
    return (this.value === Nothing) ? defaultValue : this.value;
  }

  map<R>(fn: (value: T) => R): Maybe<R> {
    return this.value === Nothing ? new Maybe<R>(Nothing) : new Maybe<R>(fn(this.value));
  }

  chain<R>(fn: (value: T) => Maybe<R>): Maybe<R> {
    return this.value === Nothing ? new Maybe<R>(Nothing) : fn(this.value);
  }

  isNothing(): boolean {
    return this.value === Nothing;
  }

  hasValue(other: T): boolean {
    return this.value === other;
  }
}
