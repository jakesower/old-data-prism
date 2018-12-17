import { makeDataSource, DataSource, makeDataColumn } from "../src/types";
import { mapObjValues } from "../src/lib/utils";
import { discoverTypes } from '../src/lib/data-functions';

export function compileTestData(raw: {[k: string]: string[]}): DataSource {
  const columns = mapObjValues(raw, (vals, key) => makeDataColumn({
    name: key,
    values: vals,
    types: discoverTypes(vals),
  }));

  return makeDataSource({ columns });
}
