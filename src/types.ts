import { Stream } from 'xstream';
import { VNode } from '@cycle/dom';
import { transpose } from './lib/utils';
import { OperationSlot, OperationSlotDefinition } from './lib/slots';

export { OperationSlot, OperationSlotDefinition };

export interface DataSource {
  id?: string,
  name: string,
  columns: DataColumn[],
  schema?: any,

  appendColumn: (this: DataSource, column: DataColumn) => DataSource,
  empty: (this: DataSource) => boolean,
  headers: string[],
  numRecords: number,
  records: string[][],
}

interface DataColumnAttrs {
  idx?: number,
  name: string,
  values: string[],
  types: DataType<any>[]
}

export interface DataColumn extends DataColumnAttrs {
  hasType: (this: DataColumn, type: DataType<any>) => boolean,
}

export interface DataType<T> {
  name: string,
  test: (s: string) => boolean,
  cast: (s: string) => T
}

export interface Operation {
  display: (source: DataSource, inputs: {[k: string]: any}) => VNode,
  fn: (source: DataSource, inputs: {[k: string]: any}) => DataSource,
  name: string,
  tags: string[],
  collector: any,
  help?: string,
  valid: (source: DataSource, inputs: {[k: string]: any}) => boolean,
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
export function makeDataSource(attrs: { id?: string, name: string, columns: DataColumn[], schema?: any }): DataSource {
  return Object.setPrototypeOf(Object.assign({}, attrs), sourcePrototype);
}

export function makeDataColumn(attrs: { idx?: number, name: string, values: string[], types: DataType<any>[]}): DataColumn {
  return Object.setPrototypeOf(Object.assign({}, attrs), dataColumnPrototype);
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
