import { Stream, combineArray } from "most";

export function filterObj<T>(obj: {[k: string]: T}, predicate: (item: T) => boolean): {[k: string]: T} {
  const es = Object.entries(obj);
  const passed = es.filter(e => predicate(e[1]));
  return objFromPairs(passed);
}

export function objectStream(obj: {[k: string]: Stream<any>}): Stream<{}> {
  const [keys, vals] = [Object.keys(obj), Object.values(obj)];
  return combineArray((...args) => zipObj(keys, args), vals);
}

export function objFromPairs<T>(pairs: [string, T][]): {[k: string]: T} {
  return pairs.reduce((out, pair) => {
    const o = {[pair[0]]: pair[1]};
    return { ...out, ...o };
  }, {});
}


export function transpose<T>(xss: T[][]): T[][] {
  return xss[0].map((_, i) => xss.map(row => row[i]));
}

export function zip<T, U>(l1: T[], l2: U[]): [T, U][] {
  let out: [T, U][] = [];
  for (let i = 0; i < Math.min(l1.length, l2.length); i += 1) {
    out.push([ l1[i], l2[i] ]);
  }
  return out;
}

export function zipObj(keys: string[], vals: any[]): {} {
  return keys.reduce((out, key, idx) => {
    const o = {[key]: vals[idx]};
    return { ...out, ...o };
  }, {});
}
