import { OperationSlot, OperationSlotDefinition } from '../types';

export function FreeSlot<T>(def: OperationSlotDefinition<T>): OperationSlot<T> {
  return { ...def,
    slotType: 'free',
    extract: (_dataSource, raw) => raw,
  };
}

export function ColumnSlot<T>(def: OperationSlotDefinition<T>): OperationSlot<T> {
  return { ...def,
    slotType: 'column',
    extract: (dataSource, raw) => dataSource.columns[raw],
  };
}
