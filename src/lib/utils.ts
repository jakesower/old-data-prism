import { over, set, lensPath } from "ramda";

type Ord = number | string | boolean | Date;
type ObjType<T> = {
  [Symbol.iterator]: IterableIterator<string>
}

export function ascend<T>(fn: ((x: T) => any)): (a: T, b: T) => number {
  return function(a, b) {
    const fa = fn(a);
    const fb = fn(b);

    return (fa > fb) ? 1 : ((fa < fb) ? -1 : 0);
  }
}

export function clamp(min: number, max: number, val: number): number {
  return (val > max) ? max : ((val < min) ? min : val);
}

export function descend<T>(fn: ((x: T) => any)): (a: T, b: T) => number {
  return function(a, b) {
    const fa = fn(a);
    const fb = fn(b);
    return (fa > fb) ? -1 : ((fa < fb) ? 1 : 0);
  }
}

export function encase<T,U>(fn: (...args: any[]) => T, safetyVal: U): (...args: any[]) => T|U {
  return function (...args) {
    try {
      return fn(...args);
    } catch (e) {
      return safetyVal;
    }
  };
}

export function eq(x: any, y: any): boolean {
  if (Array.isArray(x) && Array(y)) {
    return x.length === y.length && x.every((xi, idx) => eq(xi, y[idx]));
  }

  if (isPojo(x) && isPojo(y)) {
    return eq(Object.entries(x), Object.entries(y));
  }

  return x === y;
}

export function fill<T>(numElts: number, filler: T): T[] {
  let out = <T[]>[];
  for (let i=0; i<numElts; i+=1) {
    out[i] = filler;
  }
  return out;
}

export function filterObj<T>(obj: {[k: string]: T}, predicate: (item: T) => boolean): {[k: string]: T} {
  const es = Object.entries(obj);
  const passed = es.filter(e => predicate(e[1]));
  return objFromPairs(passed);
}

export function flatten<T>(list: T | Array<T> | Array<T[]>): T[] {
  return makeFlat(list, true);
}

export function groupBy<T>(list: T[], fn: (item: T) => string): {[k: string]: T[]} {
  let groups = {};
  const ll = list.length;
  for (let i=0; i<ll; i+=1) {
    const g = fn(list[i]);
    groups[g] = groups[g] || [];
    groups[g][groups[g].length] = list[i];
  }
  return groups;
}

export function go(generator: () => IterableIterator<any>, wrapperMonad?: any) {
  const recur = ({value, done}, gen, monad) => {
    if (done) { return monad.of(value); }
    let m = monad ? monad : value.constructor;
    return value.chain(v => recur(gen.next(v), gen, m));
  }

  let g = generator();
  return recur(g.next(), g, wrapperMonad);
}

// e.g. {a: {inner: 'thing'}, b: {other: 'item'}} => [{key: 'a', inner: 'thing'}, {key: 'b', other: 'item'}]
export function inlineKey<T, K extends keyof T>(obj: T): (T[K] & { key: string })[] {
  let result = <(T[K] & { key: string })[]>[];
  const keys = Object.keys(obj);
  for (let key of keys) {
    result.push(Object.assign({}, obj[key], { key }));
  }
  return result;
}

export function isPojo(obj): boolean {
  return obj !== null && typeof obj === "object" && Object.getPrototypeOf(obj) === Object.prototype;
}

export function isSafe(fn: (...args: any[]) => any): (...args: any[]) => boolean {
  return function (...args) {
    try {
      fn(...args);
      return true;
    } catch (e) {
      return false;
    }
  }
}

export function last<T>(list: T[]): T {
  return list[list.length - 1];
}

export function mapObj<T,U>(obj: {[k in string]: T}, fn: (x: T, idx: string) => U): ({[k in string]: U}) {
  const [keys, vals] = [Object.keys(obj), Object.values(obj)];
  const mappedVals = vals.map((v, idx) => fn(v, keys[idx]));
  return zipObj(keys, mappedVals);
}

export function mapObjValues<T,U>(obj: {[k in string]: T}, fn: (x: T, idx: string) => U): U[] {
  const [keys, vals] = [Object.keys(obj), Object.values(obj)];
  const mappedVals = vals.map((v, idx) => fn(v, keys[idx]));
  return mappedVals;
}

export function merge<T1, T2>(a: T1, b: T2): T1 & T2 {
  return Object.assign({}, a, b);
}

export function mergeAll<T>(...args: {[k in string]: T}[]): ({[k in string]: T}) {
  const init: ({[k in string]: T}) = {};
  return args.reduce((merged, arg) => ({ ...merged, ...arg }), init);
}

export function objFromPairs<T>(pairs: [string, T][]): {[k: string]: T} {
  return pairs.reduce((out, pair) => {
    const o = {[pair[0]]: pair[1]};
    return { ...out, ...o };
  }, {});
}

export function pairs<T>(obj: {[k: string]: T}): [string, T][] {
  const keys = Object.keys(obj);
  let result = <([string, T])[]>[];
  for (let key of keys) {
    result.push([key, obj[key]]);
  }
  return result;
}

export function pipe(fns: ((x: any) => any)[]): (x: any) => any {
  return fns.reduce((acc, fn) => val => fn(acc(val)), x => x);
}

export function pipeThru(val: any, fns: ((x: any) => any)[]): any {
  return pipe(fns)(val);
}

export function prepend<T>(elt: T, ary: T[]): T[] {
  return [elt].concat(ary);
}

export function setIn(path) {
  return set(lensPath(path));
}

export function setOver(path) {
  return over(lensPath(path));
}


// export function setIn<T extends U, K extends keyof T, U>(fn: (obj: T) => {[P in K]: T[P]}, obj: T): U {
//   return Object.assign({}, obj, fn(obj));
// }


// export function setInC<T extends U, K extends keyof T, U>(fn: (obj: T) => {[P in K]: T[P]}): (obj: T) => U {
//   return obj => Object.assign({}, obj, fn(obj));
// }


export function sort<T>(xs: T[]): T[] {
  if (xs.length === 0) { return []; }
  const first = xs[0];
  const rest = xs.slice(1);
  let lts: T[] = [];
  let gts: T[] = [];
  let eqs: T[] = [first];
  for (let i = 0; i < rest.length; i += 1) {
    const v = rest[i];

    if (v > first) { gts.push(rest[i]); }
    else if (v === first) { eqs.push(rest[i]); }
    else { lts.push(rest[i]) }
  }

  return sort(lts).concat(eqs).concat(sort(gts));
}

export function sortBy<T>(fn: (a: T, b: T) => number, xs: T[]): T[] {
  if (xs.length === 0) { return []; }
  const first = xs[0];
  const rest = xs.slice(1);
  let lts: T[] = [];
  let gts: T[] = [];
  let eqs: T[] = [first];
  for (let i = 0; i < rest.length; i += 1) {
    const comp = fn(rest[i], first);

    if (comp > 0) { gts.push(rest[i]); }
    else if (comp === 0) { eqs.push(rest[i]); }
    else { lts.push(rest[i]) }
  }

  return sortBy(fn, lts).concat(eqs).concat(sortBy(fn, gts));
}

export function sortWith<T>(fn: (a: T) => Ord, xs: T[]): T[] {
  if (xs.length === 0) { return []; }
  const first = xs[0];
  const fx = fn(first);
  const rest = xs.slice(1);
  let lts: T[] = [];
  let gts: T[] = [];
  let eqs: T[] = [first];
  for (let i = 0; i < rest.length; i += 1) {
    const fy = fn(rest[i]);

    if (fy > fx) { gts.push(rest[i]); }
    else if (fy < fx) { lts.push(rest[i]); }
    else { eqs.push(rest[i]) }
  }

  return sortWith(fn, lts).concat(eqs).concat(sortWith(fn, gts));
}

export function toggle<T>(vals: T[], val: T): T[] {
  return vals.includes(val) ?
    vals.filter(v => v !== val) :
    [...vals, val];
}

export function transpose<T>(xss: T[][]): T[][] {
  return xss[0].map((_, i) => xss.map(row => row[i]));
}

export function unnest<T>(list: Array<T> | Array<T[]>): T[] {
  return makeFlat(list, false);
}

export function values<T>(obj: {[k: string]: T}): T[] {
  return Object.keys(obj).map(k => obj[k]);
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


function makeFlat<T>(list, recursive): T[] {
  let result: T[] = [];
  let idx = 0;
  let ilen = list.length;

  while (idx < ilen) {
    if (Array.isArray(list[idx])) {
      let item = list[idx];
      let value = recursive ? makeFlat(list[idx], true) : list[idx];
      let j = 0;
      let jlen = value.length;
      while (j < jlen) {
        result[result.length] = value[j];
        j += 1;
      }
    } else {
      result[result.length] = list[idx];
    }
    idx += 1;
  }

  return result;
}
