import { DataType, DataSource } from '../types';


export interface OperationSlotDefinition<T> {
  display: string,
  type: DataType<T>
}

export interface OperationSlot<T> extends OperationSlotDefinition<T> {
  slotType: 'free' | 'column' | 'multicolumn',
  extract: (dataSource: DataSource, input: string | string[]) => T | T[] | T[][],
  isValid: (dataSource: DataSource, input: string | string[]) => boolean,
}


export function FreeSlot<T>(def: OperationSlotDefinition<T>): OperationSlot<T> {
  return { ...def,
    slotType: 'free',
    extract: (_dataSource, raw: string) => def.type.cast(raw),
    isValid: (_dataSource, raw: string) => def.type.test(raw),
  };
}

export function ColumnSlot<T>(def: OperationSlotDefinition<T>): OperationSlot<T> {
  return { ...def,
    slotType: 'column',
    extract: (dataSource, raw: string) => dataSource.columns[raw].map(def.type.cast),
    isValid: (dataSource, raw: string) => dataSource.columns[parseFloat(raw)].hasType(def.type),
  };
}


export function MultiColumnSlot<T>(def: OperationSlotDefinition<T>): OperationSlot<T> {
  return { ...def,
    slotType: 'multicolumn',
    extract: (dataSource, raw: string[]) => raw.map(col => dataSource.columns[col].map(def.type.cast)),
    isValid: (dataSource, raw: string[]) => raw.every(col => dataSource.columns[parseFloat(col)].hasType(def.type)),
  };
}
