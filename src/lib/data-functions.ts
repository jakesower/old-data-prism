import dataTypes from './data-types';
import { DataType, OperationSlot, DataSource, Operation } from '../types';
import { mapObj, mergeAll, zipObj } from './utils';

export function applyOperation(dataSource: DataSource, operation: Operation, inputs: {[k in string]: string}): DataSource {
  return operation.fn(dataSource, populateSlots(dataSource, operation.slots, inputs));
}

export function discoverTypes(vals: string[]): DataType<any>[] {
  return Object.values(dataTypes).filter(type => vals.every(type.test));
}

export function modifyStateAttr<T>(attr: keyof T, fn: (x: T[keyof T]) => T[keyof T]): (obj: T) => T {
  return obj => Object.assign({}, obj, {[attr]: fn(obj[attr]) });
}

export function populateSlots<T>(
  dataSource: DataSource,
  slots: {[k in string]: OperationSlot<T>},
  rawInputs: {[k: string]: string}): {[k: string]: T}
{
  // console.log({dataSource,slots,rawInputs})
  return mapObj(slots, (slot, key) => {
    switch (slot.slotType) {
      case "column":
        return dataSource.columns[rawInputs[key]].values.map(slot.type.cast);
      default:
       return slot.type.cast(rawInputs[key]);
    }
  });
}


// TODO: optimize
export function mapRows(fn: ((x: {[k: string]: any}) => string)): (dataSource: DataSource, inputs: {[k: string]: any}) => string[] {
  return function(dataSource, inputs) {
    console.log({ dataSource, inputs })
    const [ks, vs] = [Object.keys(inputs), Object.values(inputs)];
    let output: string[] = [];

    for (let i=0; i < dataSource.numRecords; i+=1) {
      let row = {};
      for (let j=0; j < ks.length; j+=1) {
        row[ks[j]] = Array.isArray(vs[j]) ? vs[j][i] : vs[j];
      }
      output.push(fn(row));
    }

    return output;
  }
}
