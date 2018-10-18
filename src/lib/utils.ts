import { Stream, combineArray } from "most";

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

export function eq(x: any, y: any): boolean {
  if (Array.isArray(x) && Array(y)) {
    return x.length === y.length && x.every((xi, idx) => eq(xi, y[idx]));
  }

  if (isPojo(x) && isPojo(y)) {
    return eq(Object.entries(x), Object.entries(y));
  }

  return x === y;
}

export function filterObj<T>(obj: {[k: string]: T}, predicate: (item: T) => boolean): {[k: string]: T} {
  const es = Object.entries(obj);
  const passed = es.filter(e => predicate(e[1]));
  return objFromPairs(passed);
}

export function isPojo(obj): boolean {
  return obj !== null && typeof obj === "object" && Object.getPrototypeOf(obj) === Object.prototype;
}

export function merge<T1, T2>(a: T1, b: T2): T1 & T2 {
  console.log({a, b, c: Object.assign({}, a, b)})
  return Object.assign({}, a, b);
}

export function mergeAll<T>(...args: {[k in string]: T}[]): ({[k in string]: T}) {
  const init: ({[k in string]: T}) = {};
  return args.reduce((merged, arg) => ({ ...merged, ...arg }), init);
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

export function pipe(fns: ((x: any) => any)[]): (x: any) => any {
  return fns.reduce((acc, fn) => val => fn(acc(val)), x => x);
}

export function pipeThru(val: any, fns: ((x: any) => any)[]): any {
  return pipe(fns)(val);
}

export function prepend<T>(elt: T, ary: T[]): T[] {
  return [elt].concat(ary);
}


export function setIn<T extends U, K extends keyof T, U>(fn: (obj: T) => {[P in K]: T[P]}, obj: T): U {
  return Object.assign({}, obj, fn(obj));
}


export function setInC<T extends U, K extends keyof T, U>(fn: (obj: T) => {[P in K]: T[P]}): (obj: T) => U {
  return obj => Object.assign({}, obj, fn(obj));
}


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
