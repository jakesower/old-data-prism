import dataTypes from './data-types';
import { DataType, Source } from '../types';

export function discoverTypes(vals: string[]): DataType<any>[] {
  return Object.values(dataTypes).filter(type => vals.every(type.test));
}


export function modifyStateAttr<T>(attr: keyof T, fn: (x: T[keyof T]) => T[keyof T]): (obj: T) => T {
  return obj => Object.assign({}, obj, {[attr]: fn(obj[attr]) });
}
