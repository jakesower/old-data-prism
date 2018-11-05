import { OperationSlot, OperationSlotDefinition } from '../types';

export function FreeSlot<T>(def: OperationSlotDefinition<T>): OperationSlot<T> {
  return { ...def,
    slotType: 'free',
    extract: (_dataSource, raw) => def.type.cast(raw),
    isValid: (_dataSource, raw) => def.type.test(raw),
  };
}

export function ColumnSlot<T>(def: OperationSlotDefinition<T>): OperationSlot<T> {
  return { ...def,
    slotType: 'column',
    extract: (dataSource, raw) => dataSource.columns[raw].map(def.type.cast),
    isValid: (dataSource, raw) => dataSource.columns[parseFloat(raw)].hasType(def.type),
  };
}
