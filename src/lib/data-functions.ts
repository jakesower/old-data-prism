import * as parseCsv from 'csv-parse';
import dataTypes from './data-types';
import { DataType, OperationSlot, DataSource, Operation, makeDataSource, makeDataColumn } from '../types';
import { mapObj, transpose, zip } from './utils';
import * as math from 'mathjs';
import xs, { Stream } from 'xstream';

export function discoverTypes(vals: string[]): DataType<any>[] {
  return Object.values(dataTypes).filter(type => vals.every(type.test));
}


export function modifyStateAttr<T>(attr: keyof T, fn: (x: T[keyof T]) => T[keyof T]): (obj: T) => T {
  return obj => Object.assign({}, obj, {[attr]: fn(obj[attr]) });
}


export function populateSlots(
  dataSource: DataSource,
  slots: {[k in string]: OperationSlot<any>},
  rawInputs: {[k: string]: string}): {[k: string]: any}
{
  return mapObj(slots, (slot, key) => slot.extract(dataSource, rawInputs[key]));
}


// TODO: optimize
export function mapRows(fn: ((x: {[k: string]: any}) => string)): (dataSource: DataSource, inputs: {[k: string]: any}) => string[] {
  return function(dataSource, inputs) {
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


export function csvToDataSource(raw: Stream<{ body: string, name?: string, }>): Stream<DataSource> {
  return raw
    .map(({ body, name }) => {
      const p = new Promise((resolve, reject) => {
        parseCsv(body, {}, (err, data: string[][]) => {
          if (err) {
            reject(err);
          } else {
            const headers = data[0];
            const records = data.slice(1);
            const pairs = zip(headers, transpose(records));

            const columns = pairs.map(pair => makeDataColumn({
              name: pair[0],
              values: pair[1],
              types: discoverTypes(pair[1]),
            }));

            const s: DataSource = makeDataSource({
              name,
              columns,
            });

            resolve(s);
          }
        });
      });

      return xs.fromPromise(p);
    })
    .flatten() as Stream<DataSource>;
}


export function compileExpression(dataSource: DataSource, raw: string) {
  const pat = s => new RegExp('\\{' + s + '\\}', 'g');
  const subbed = dataSource.columns.reduce((acc, col, idx) => acc.replace(pat(col.name), `v${idx}`), raw);
  const fn = math.compile(subbed);
  return record => {
    const scope = record.reduce((acc, v, idx) => {
      const o = { ['v'+idx]: v };
      return { ...acc, ...o };
    }, {});
    return fn.eval(scope).toString();
  };
}


export function extractExpression(dataSource: DataSource, raw: string): string[] {
  const fn = compileExpression(dataSource, raw);
  return dataSource.records.map(fn);
}
