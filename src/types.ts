import { VNode } from 'snabbdom/vnode';
import { Stream } from 'most';

export interface DataType {
  test: (xs: string[]) => boolean,
  cast: (xs: string[]) => any,
}

export interface DataSlot {
  type: string,
  id: string,
  display: string,
  dataType: DataType,
}

export interface Column {
  header: string,
  values: string[],
  types: {
    [typeName: string]: DataType
  },
}

export interface DataTable {
  columns: Column[]
}

export type Action<A> = (...args: any[]) => (model: A) => A;

export interface Component<A> {
  output: A,
  view: Stream<VNode>,
}

export interface OperationDefinition<A> {
  name: string,
  collector: Component<any, A>,
  tags: string[],
  fn: (dataTable: DataTable, inputs: string[]) => DataTable,
  display: (dataTable: DataTable, inputs: string[]) => VNode,
  valid: (dataTable: DataTable, inputs: string[]) => boolean,
  help?: string | VNode,
}

export interface Operation<A> {
  definition: OperationDefinition<A>,
  inputs: A
}

export interface Source {
  id: number,
  name: string,
  dataTable: DataTable,
  schema?: any,
}

export interface FreeSlot {
  id: string,
  display: string,
}

export interface PoolSlot {
  id: string,
  display: string,
  pool: string[],
}

export interface MultipoolSlot {
  id: string,
  display: string,
  pool: string[],
}

export type Slot = FreeSlot | PoolSlot | MultipoolSlot;
