import { Stream } from 'most';

export interface Source {
  id: String,
  name: String,
  data: DataSource,
  schema?: any
}

export interface DataSource {
  columns: DataColumn[]
}

export interface DataColumn {
  name: String,
  values: String[],
  types: DataType<any>[]
}

export interface DataType<T> {
  name: string,
  test: (s: string) => Boolean,
  cast: (s: string) => T
}

export type StateModifier<S> = Stream<((prevState: S) => S)>
