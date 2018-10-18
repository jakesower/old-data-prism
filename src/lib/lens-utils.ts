const LENS = Symbol('lens');

interface Lens<T, U> {
  get: (obj: T) => U,
  set: (val: U, obj: T) => T,
  [LENS]: true,
}

function lensify(obj) {
  return obj[LENS] ? obj : {
    get: prop => obj[prop],
    set: (prop, val) => Object.assign({}, obj, {[prop]: val })
  }
}

export function lensProp<T, U>(prop: string): Lens<T, U> {
  return {
    get: obj => lensify(obj).get(prop),
    set: (val, obj) => lensify(obj).set(prop, val),
    [LENS]: true,
  };
}

export function lensGet<T, U>(lens: Lens<T, U>, obj: T): U {
  return lens.get(obj);
}

export function lensSet<T, U>(lens: Lens<T, U>): (val: U, obj: T) => T {
  return lens.set;
}


