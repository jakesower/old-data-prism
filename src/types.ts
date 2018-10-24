import { Stream } from 'most';
import { transpose } from './lib/utils';
import { populateSlots } from './lib/data-functions';
import { VNode } from '@cycle/dom';

export interface DataSource {
  id: string,
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
  collector: any,
  display: (source: DataSource, inputs: {[k: string]: any}) => VNode,
  fn: (source: DataSource, inputs: {[k: string]: any}) => DataSource,
  help?: string,
  name: string,
  slots: { [k in string]: OperationSlot<any> },
  tags: string[],
  valid?: (source: DataSource, inputs: {[k: string]: any}) => boolean,
}

export interface OperationSlotDefinition<T> {
  display: string,
  type: DataType<T>
}

export interface OperationSlot<T> extends OperationSlotDefinition<T> {
  slotType: string,
  extract: (dataSource: DataSource, input: string) => any,
}


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
    return Object.assign({}, this, { columns: this.columns.concat([column]) });
  })
});

const dataColumnPrototype = Object.create(null, {
  hasType: p(function (this: DataColumn, type: DataType<any>): boolean { return this.types.some(t => t.name === type.name )}),
});

const operationPrototype = Object.create(null, {
  apply: p(function (this: Operation, dataSource: DataSource, inputs: {[k in string]: string}): DataSource {
    return this.fn(dataSource, populateSlots(this.slots, inputs));
  }),
});


// TODO: consider using immutable js for some stuff
export function makeDataSource(attrs: { id: string, name: string, columns: DataColumn[], schema?: any }): DataSource {
  return Object.setPrototypeOf(Object.assign({}, attrs), sourcePrototype);
}

export function makeDataColumn(attrs): DataColumn {
  return Object.setPrototypeOf(Object.assign({}, attrs), dataColumnPrototype);
}

export function makeOperation(attrs) {
  return Object.setPrototypeOf(Object.assign({}, attrs), operationPrototype);
}
