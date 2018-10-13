import dataTypes from './data-types';
import { DataType, Source } from '../types';

export function discoverTypes(vals: string[]): DataType<any>[] {
  return Object.values(dataTypes).filter(type => vals.every(type.test));
}


export function numRecords(s: Source): number {
  return s.data.columns[0].values.length;
}
