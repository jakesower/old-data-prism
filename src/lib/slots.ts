import { DataType, DataSource } from '../types';
import dataTypes from './data-types';
import { isSafe } from './utils';
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
  extract: (dataSource: DataSource, input: string | string[], misc?: object) => any,
  isValid: (dataSource: DataSource, input: string | string[]) => boolean,
  possibleValues?: string[],
}


export function FreeSlot<T>(def: TypedOperationSlotDefinition<T>): OperationSlot<T> {
  return { ...def,
    slotType: 'free',
    extract: (_dataSource, raw: string) => def.type.cast(raw),
    isValid: (_dataSource, raw: string) => def.type.test(raw),
  };
}

export function ColumnSlot<T>(def: TypedOperationSlotDefinition<T>): OperationSlot<T> {
  return { ...def,
    slotType: 'column',
    extract: (dataSource, raw: string) => dataSource.columns[parseFloat(raw)].values.map(def.type.cast),
    isValid: (dataSource, raw: string) => (raw !== '') && dataSource.columns[parseFloat(raw)].hasType(def.type),
  };
}

export function ExpressionSlot(def: OperationSlotDefinition): OperationSlot<string> {
  return { ...def,
    type: dataTypes.String,
    slotType: 'expression',
    extract: extractExpression,
    isValid: _ => true, //isSafe(extractExpression), // performance
  };
}

export function MultiColumnSlot<T>(def: TypedOperationSlotDefinition<T>): OperationSlot<T> {
  return { ...def,
    slotType: 'multicolumn',
    extract: (dataSource, raw: string[]) => raw.map(col => dataSource.columns[col].map(def.type.cast)),
    isValid: (dataSource, raw: string[]) => raw.every(col => dataSource.columns[parseFloat(col)].hasType(def.type)),
  };
}

export function EnumeratedSlot(def: OperationSlotDefinition): OperationSlot<string> {
  return { ...def,
    type: dataTypes.String,
    slotType: 'enumerated',
    extract: (_dataSource, raw: string) => raw,
    isValid: _ => true,
  };
}

export function SourceSlot(def: OperationSlotDefinition): OperationSlot<string> {
  return { ...def,
    type: dataTypes.String,
    slotType: 'source',
    extract: (_dataSource, raw: string, misc: { sources: DataSource[] }) => misc.sources[parseFloat(raw)],
    isValid: _ => true,
  };
}
