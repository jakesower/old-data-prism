import dataTypes from './data-types';
import { filterObj } from './utils';

export function discoverTypes(vals) {
  return filterObj(dataTypes, type => vals.every(type.test));
}
