import { Stream } from 'most';

export interface Source {
  id: string,
  name: string,
  data: DataSource,
  schema?: any
}

export interface DataSource {
  columns: DataColumn[]
}

export interface DataColumn {
  name: string,
  values: string[],
  types: DataType<any>[]
}

export interface DataType<T> {
  name: string,
  test: (s: string) => boolean,
  cast: (s: string) => T
}

export type StateModifier<S> = Stream<((prevState: S) => S)>
