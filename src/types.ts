import { Stream } from 'xstream';
import { VNode } from '@cycle/dom';
import * as sha1 from 'js-sha1';
import { transpose } from './lib/utils';
import { OperationSlot, OperationSlotDefinition } from './lib/slots';
import { DataType } from './lib/data-types';
import { Either } from './lib/monads/either';

export { DataType, OperationSlot, OperationSlotDefinition };

export interface DataSource {
  name?: string,
  columns: DataColumn[],
  fingerprint: string,
  schema?: any,

  appendColumn: (this: DataSource, column: DataColumn) => DataSource,
  empty: (this: DataSource) => boolean,
  headers: string[],
  numRecords: number,
  records: string[][],
}

interface DataColumnAttrs {
  fingerprint: string,
  name: string,
  values: string[],
  types: DataType<any>[]
}

export interface DataColumn extends DataColumnAttrs {
  hasType: (this: DataColumn, type: DataType<any>) => boolean,
}

// meant to be extended in collectors
export interface OperationError {
  message?: string,
}

export interface Operation {
  display: (source: DataSource, inputs: {[k: string]: any}) => VNode,
  fn: <T extends OperationError>(source: DataSource, inputs: {[k: string]: any}) => Either<T, DataSource>,
  name: string,
  tags: string[],
  collector: any,
  help?: string,
  // valid?: (source: DataSource, inputs: {[k: string]: any}) => boolean,
}

export type StreamObj = {[k: string]: Stream<any>};
export type Component = (cycleSources: StreamObj) => StreamObj;
export type Collector = (op: Operation) => {DOM: Stream<any>, value: Stream<any>};



export type StateModifier<S> = Stream<((prevState: S) => S)>
export type LocalStateModifier<T extends U, U> = Stream<(state: T) => U>


const p = value => ({ value, writable: false });
const g = get => ({ get });
const sourcePrototype = Object.create(null, {
  empty: p(function (this: DataSource): boolean { return this.numRecords === 0; }),
  headers: g(function (this: DataSource): string[] { return this.columns.map(c => c.name )}),
  numRecords: g(function (this: DataSource): number { return this.columns[0].values.length; }),
  records: g(function (this: DataSource): string[][] { return transpose(this.columns.map(c => c.values)); }),
  appendColumn: p(function (this: DataSource, column: DataColumn): DataSource {
    return makeDataSource(Object.assign({}, this, { columns: this.columns.concat([column]) }));
  })
});

const dataColumnPrototype = Object.create(null, {
  hasType: p(function (this: DataColumn, type: DataType<any>): boolean { return this.types.some(t => t.name === type.name )}),
});

// TODO: consider using immutable js for some stuff
export function makeDataSource(attrs: { name?: string, columns: DataColumn[] }): DataSource {
  const fingerprint = sha1(JSON.stringify([attrs.name].concat(attrs.columns.map(c => c.fingerprint))));
  return Object.setPrototypeOf(Object.assign({}, attrs, { fingerprint }), sourcePrototype);
}

export function makeDataColumn(attrs: { name: string, values: string[], types: DataType<any>[]}): DataColumn {
  const fingerprint = sha1(JSON.stringify([attrs.name].concat(attrs.values)));
  return Object.setPrototypeOf(Object.assign({}, attrs, { fingerprint }), dataColumnPrototype);
}


export interface Functor<T> {
  map<R>(fn: (value: T) => R): Functor<R>,
  [k: string]: any,
}

export interface Applicative<T> extends Functor<T> {
  // ap<R>(fn: Applicative<(t: T) => R>): Applicative<R>
}

export interface Monad<T> extends Applicative<T> {
  chain<R>(fn: (value: T) => Monad<R>): Monad<R>
}
