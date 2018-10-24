import dataTypes from './data-types';
import { DataType, OperationSlot, DataSource } from '../types';
import { mapObj, mergeAll, zipObj } from './utils';

export function discoverTypes(vals: string[]): DataType<any>[] {
  return Object.values(dataTypes).filter(type => vals.every(type.test));
}

export function modifyStateAttr<T>(attr: keyof T, fn: (x: T[keyof T]) => T[keyof T]): (obj: T) => T {
  return obj => Object.assign({}, obj, {[attr]: fn(obj[attr]) });
}

export function populateSlots<T>(slots: {[k in string]: OperationSlot<T>}, rawInputs: {[k in string]: string}): {[k in string]: T} {
  return mapObj(slots, (slot, key) => slot.type.cast(rawInputs[key]));
}

// TODO: optimize
export function mapRows(fn: ((x: {[k in string]: any}) => string)): (dataSource: DataSource, inputs: {[k in string]: any}) => string[] {
  return function(dataSource, inputs) {
    const [ks, vs] = [Object.keys(inputs), Object.values(inputs)];
    let output: string[] = [];

    for (let i=0;i<dataSource.numRecords;i+=1) { // record number
      for (let j=0;j<ks.length;j+=1) {           // column index
        const rowVals = vs.map(v => Array.isArray(v) ? v[j] : v);
        output.push(fn(zipObj(ks, rowVals)));
      }
    }

    return output;
  }
}
