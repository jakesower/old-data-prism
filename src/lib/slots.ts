import { DataType, DataSource } from '../types';
import * as math from 'mathjs';
import dataTypes from './data-types';
import { isSafe } from './utils';


export interface OperationSlotDefinition<T> {
  display: string,
  type: DataType<T>
}

export interface OperationSlot<T> extends OperationSlotDefinition<T> {
  slotType: 'free' | 'column' | 'expression' | 'multicolumn',
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
    extract: (dataSource, raw: string) => dataSource.columns[parseFloat(raw)].values.map(def.type.cast),
    isValid: (dataSource, raw: string) => (raw !== '') && dataSource.columns[parseFloat(raw)].hasType(def.type),
  };
}

export function ExpressionSlot(def: OperationSlotDefinition<any>): OperationSlot<string> {
  return { ...def,
    type: dataTypes.String,
    slotType: 'expression',
    extract: extractExpression,
    isValid: isSafe(extractExpression), // performance
  };
}

export function MultiColumnSlot<T>(def: OperationSlotDefinition<T>): OperationSlot<T> {
  return { ...def,
    slotType: 'multicolumn',
    extract: (dataSource, raw: string[]) => raw.map(col => dataSource.columns[col].map(def.type.cast)),
    isValid: (dataSource, raw: string[]) => raw.every(col => dataSource.columns[parseFloat(col)].hasType(def.type)),
  };
}


function extractExpression(dataSource: DataSource, raw: string): string[] {
  const pat = s => new RegExp('(?<!\\\\)\\{' + s + '\\}', 'g');
  const subbed = dataSource.columns.reduce((acc, col, idx) => acc.replace(pat(col.name), `v${idx}`), raw);
  const fn = math.compile(subbed);
  return dataSource.records.map(record => {
    const scope = record.reduce((acc, v, idx) => {
      const o = { ['v'+idx]: v };
      return { ...acc, ...o };
    }, {});
    return fn.eval(scope).toString();
  });
}
