import { DataType, DataSource } from '../types';
import { Either, Ok, Err } from './monads/either';
import dataTypes from './data-types';
import { extractExpression } from './data-functions';


export interface OperationSlotDefinition {
  display: string,
  possibleValues?: string[],
}

export interface TypedOperationSlotDefinition<T> extends OperationSlotDefinition {
  type: DataType<T>
}


export interface OperationSlot<T> extends OperationSlotDefinition {
  slotType: 'free' | 'column' | 'expression' | 'multicolumn' | 'source' | 'enumerated',
  type: DataType<T>,
  extract: (dataSource: DataSource, input: string | string[], misc?: object) => Either<string,any>,
  possibleValues?: string[],
}


export function FreeSlot<T>(def: TypedOperationSlotDefinition<T>): OperationSlot<T> {
  return { ...def,
    slotType: 'free',
    extract: (_dataSource, raw: string) => def.type.testCast(raw),
  };
}

export function ColumnSlot<T>(def: TypedOperationSlotDefinition<T>): OperationSlot<T> {
  return { ...def,
    slotType: 'column',
    extract: (dataSource, raw: string) =>
      (raw !== '') && dataSource.columns[parseFloat(raw)].hasType(def.type) ?
        Ok(dataSource.columns[parseFloat(raw)].values.map(def.type.cast)) :
        Err("column blank or has wrong type"),
  };
}

export function ExpressionSlot(def: OperationSlotDefinition): OperationSlot<string> {
  return { ...def,
    type: dataTypes.String,
    slotType: 'expression',
    extract: (dataSource, raw: string) => extractExpression(dataSource, raw).mapErr(e => e.toString()),
  };
}

export function MultiColumnSlot<T>(def: TypedOperationSlotDefinition<T>): OperationSlot<T> {
  return { ...def,
    slotType: 'multicolumn',
    extract: (dataSource, raw: string[]) =>
      raw.every(col => dataSource.columns[parseFloat(col)].hasType(def.type)) ?
        Ok(raw.map(col => dataSource.columns[col].map(def.type.cast))) :
        Err("one or more columns have the wrong type"),
  };
}

export function EnumeratedSlot(def: OperationSlotDefinition): OperationSlot<string> {
  return { ...def,
    type: dataTypes.String,
    slotType: 'enumerated',
    extract: (_dataSource, raw: string) => Ok(raw),
  };
}

export function SourceSlot(def: OperationSlotDefinition): OperationSlot<string> {
  return { ...def,
    type: dataTypes.String,
    slotType: 'source',
    extract: (_dataSource, raw: string, misc: { sources: DataSource[] }) => Ok(misc.sources[parseFloat(raw)]),
  };
}
