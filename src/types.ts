import { Stream } from 'most';
import { transpose } from './lib/utils';

export interface Source {
  id: string,
  name: string,
  data: DataSource,
  schema?: any,

  columns: DataColumn[],
  empty: (this: Source) => boolean,
  headers: string[],
  numRecords: number,
  records: string[][],
}

export interface DataSource {
  columns: DataColumn[]
}

interface DataColumnAttrs {
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

export type StateModifier<S> = Stream<((prevState: S) => S)>
export type LocalStateModifier<T extends U, U> = Stream<(state: T) => U>


const p = value => ({ value, writable: false });
const g = get => ({ get });
const sourcePrototype = Object.create(null, {
  columns: g(function (this: Source): DataColumn[] { return this.data.columns; }),
  empty: p(function (this: Source): boolean { return this.numRecords === 0; }),
  headers: g(function (this: Source): string[] { return this.data.columns.map(c => c.name )}),
  numRecords: g(function (this: Source): number { return this.data.columns[0].values.length; }),
  records: g(function (this: Source): string[][] { return transpose(this.data.columns.map(c => c.values)); }),
});

const dataColumnPrototype = Object.create(null, {
  hasType: p(function (this: DataColumn, type: DataType<any>): boolean { return this.types.some(t => t.name === type.name )}),
})


// TODO: consider using immutable js for some stuff
export function makeSource(attrs: { id: string, name: string, data: DataSource, schema?: any }): Source {
  return Object.setPrototypeOf(Object.assign({}, attrs), sourcePrototype);
}

export function makeDataColumn(attrs): DataColumn {
  return Object.setPrototypeOf(Object.assign({}, attrs), dataColumnPrototype);
}
