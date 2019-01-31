"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const either_1 = require("./monads/either");
function ascend(fn) {
    return function (a, b) {
        const fa = fn(a);
        const fb = fn(b);
        return (fa > fb) ? 1 : ((fa < fb) ? -1 : 0);
    };
}
exports.ascend = ascend;
function asValues(obj, fn) {
    const keys = Object.keys(obj);
    return zipObj(keys, fn(Object.values(obj)));
}
exports.asValues = asValues;
function clamp(min, max, val) {
    return (val > max) ? max : ((val < min) ? min : val);
}
exports.clamp = clamp;
function descend(fn) {
    return function (a, b) {
        const fa = fn(a);
        const fb = fn(b);
        return (fa > fb) ? -1 : ((fa < fb) ? 1 : 0);
    };
}
exports.descend = descend;
function encaseError(fn) {
    return function (...args) {
        try {
            return either_1.Ok(fn(...args));
        }
        catch (e) {
            return either_1.Err(e);
        }
    };
}
exports.encaseError = encaseError;
function eq(x, y) {
    if (Array.isArray(x) && Array(y)) {
        return x.length === y.length && x.every((xi, idx) => eq(xi, y[idx]));
    }
    if (isPojo(x) && isPojo(y)) {
        return eq(Object.entries(x), Object.entries(y));
    }
    return x === y;
}
exports.eq = eq;
function fill(numElts, filler) {
    let out = [];
    for (let i = 0; i < numElts; i += 1) {
        out[i] = filler;
    }
    return out;
}
exports.fill = fill;
function filterObj(obj, predicate) {
    const es = Object.entries(obj);
    const passed = es.filter(e => predicate(e[1]));
    return objFromPairs(passed);
}
exports.filterObj = filterObj;
function flatten(list) {
    return makeFlat(list, true);
}
exports.flatten = flatten;
function groupBy(list, fn) {
    let groups = {};
    const ll = list.length;
    for (let i = 0; i < ll; i += 1) {
        const g = fn(list[i]);
        groups[g] = groups[g] || [];
        groups[g][groups[g].length] = list[i];
    }
    return groups;
}
exports.groupBy = groupBy;
function go(generator, wrapperMonad) {
    const recur = ({ value, done }, gen, monad) => {
        if (done) {
            return monad.of(value);
        }
        let m = monad ? monad : value.constructor;
        return value.chain(v => recur(gen.next(v), gen, m));
    };
    let g = generator();
    return recur(g.next(), g, wrapperMonad);
}
exports.go = go;
// e.g. {a: {inner: 'thing'}, b: {other: 'item'}} => [{key: 'a', inner: 'thing'}, {key: 'b', other: 'item'}]
function inlineKey(obj) {
    let result = [];
    const keys = Object.keys(obj);
    for (let key of keys) {
        result.push(Object.assign({}, obj[key], { key }));
    }
    return result;
}
exports.inlineKey = inlineKey;
function intersection(xs, ys) {
    return xs.filter(value => -1 !== ys.indexOf(value));
}
exports.intersection = intersection;
function isPojo(obj) {
    return obj !== null && typeof obj === "object" && Object.getPrototypeOf(obj) === Object.prototype;
}
exports.isPojo = isPojo;
function isSafe(fn) {
    return function (...args) {
        try {
            fn(...args);
            return true;
        }
        catch (e) {
            return false;
        }
    };
}
exports.isSafe = isSafe;
function last(list) {
    return list[list.length - 1];
}
exports.last = last;
function mapObj(obj, fn) {
    const [keys, vals] = [Object.keys(obj), Object.values(obj)];
    const mappedVals = vals.map((v, idx) => fn(v, keys[idx]));
    return zipObj(keys, mappedVals);
}
exports.mapObj = mapObj;
function mapObjValues(obj, fn) {
    const [keys, vals] = [Object.keys(obj), Object.values(obj)];
    const mappedVals = vals.map((v, idx) => fn(v, keys[idx]));
    return mappedVals;
}
exports.mapObjValues = mapObjValues;
function merge(a, b) {
    return Object.assign({}, a, b);
}
exports.merge = merge;
function mergeAll(...args) {
    const init = {};
    return args.reduce((merged, arg) => (Object.assign({}, merged, arg)), init);
}
exports.mergeAll = mergeAll;
// square matrices only for now
function reflectUTMatrix(matrix) {
    const l = matrix.length;
    let out = [...matrix];
    for (let i = 1; i < l; i += 1) {
        for (let j = 0; j < i; j += 1) {
            out[i][j] = matrix[j][i];
        }
    }
    return out;
}
exports.reflectUTMatrix = reflectUTMatrix;
function reverse(xs) {
    const l = xs.length;
    const o = l - 1;
    let out = [];
    for (let i = 0; i < l; i += 1) {
        out[i] = xs[o - i];
    }
    return out;
}
exports.reverse = reverse;
function objFromPairs(pairs) {
    return pairs.reduce((out, pair) => {
        const o = { [pair[0]]: pair[1] };
        return Object.assign({}, out, o);
    }, {});
}
exports.objFromPairs = objFromPairs;
function pairs(obj) {
    const keys = Object.keys(obj);
    let result = [];
    for (let key of keys) {
        result.push([key, obj[key]]);
    }
    return result;
}
exports.pairs = pairs;
function pipe(fns) {
    return fns.reduce((acc, fn) => val => fn(acc(val)), x => x);
}
exports.pipe = pipe;
function pipeThru(val, fns) {
    return pipe(fns)(val);
}
exports.pipeThru = pipeThru;
function prepend(elt, ary) {
    return [elt].concat(ary);
}
exports.prepend = prepend;
function round(n, precision) {
    const mult = Math.pow(10, -precision);
    return Math.round(n * mult) / mult;
}
exports.round = round;
function setIn(path) {
    return ramda_1.set(ramda_1.lensPath(path));
}
exports.setIn = setIn;
function setOver(path) {
    return ramda_1.over(ramda_1.lensPath(path));
}
exports.setOver = setOver;
// export function setIn<T extends U, K extends keyof T, U>(fn: (obj: T) => {[P in K]: T[P]}, obj: T): U {
//   return Object.assign({}, obj, fn(obj));
// }
// export function setInC<T extends U, K extends keyof T, U>(fn: (obj: T) => {[P in K]: T[P]}): (obj: T) => U {
//   return obj => Object.assign({}, obj, fn(obj));
// }
function sort(xs) {
    if (xs.length === 0) {
        return [];
    }
    const first = xs[0];
    const rest = xs.slice(1);
    let lts = [];
    let gts = [];
    let eqs = [first];
    for (let i = 0; i < rest.length; i += 1) {
        const v = rest[i];
        if (v > first) {
            gts.push(rest[i]);
        }
        else if (v === first) {
            eqs.push(rest[i]);
        }
        else {
            lts.push(rest[i]);
        }
    }
    return sort(lts).concat(eqs).concat(sort(gts));
}
exports.sort = sort;
function sortBy(fn, xs) {
    if (xs.length === 0) {
        return [];
    }
    const first = xs[0];
    const rest = xs.slice(1);
    let lts = [];
    let gts = [];
    let eqs = [first];
    for (let i = 0; i < rest.length; i += 1) {
        const comp = fn(rest[i], first);
        if (comp > 0) {
            gts.push(rest[i]);
        }
        else if (comp === 0) {
            eqs.push(rest[i]);
        }
        else {
            lts.push(rest[i]);
        }
    }
    return sortBy(fn, lts).concat(eqs).concat(sortBy(fn, gts));
}
exports.sortBy = sortBy;
function sortWith(fn, xs) {
    if (xs.length === 0) {
        return [];
    }
    const first = xs[0];
    const fx = fn(first);
    const rest = xs.slice(1);
    let lts = [];
    let gts = [];
    let eqs = [first];
    for (let i = 0; i < rest.length; i += 1) {
        const fy = fn(rest[i]);
        if (fy > fx) {
            gts.push(rest[i]);
        }
        else if (fy < fx) {
            lts.push(rest[i]);
        }
        else {
            eqs.push(rest[i]);
        }
    }
    return sortWith(fn, lts).concat(eqs).concat(sortWith(fn, gts));
}
exports.sortWith = sortWith;
function toggle(vals, val) {
    return vals.includes(val) ?
        vals.filter(v => v !== val) :
        [...vals, val];
}
exports.toggle = toggle;
function transpose(xss) {
    return xss[0].map((_, i) => xss.map(row => row[i]));
}
exports.transpose = transpose;
// export function upperTriangularPairs<T>(xs: T[], includeSame: boolean): [T, T][] {
//   const o = includeSame ? 0 : 1;
//   const l = xs.length;
//   let pairs: [T, T][] = [];
//   for (let i=0; i<l; i+=1) {
//     for (let j=(i+o); j<l; j+=1) {
//       pairs.push([xs[i], xs[j]]);
//     }
//   }
//   return pairs;
// }
// export function filledUpperTriangularMatrix<T,U>(xs: T[], includeSame: boolean, filler: U): (T|U)[][] {
//   let rows = [];
//   for (let i=0)
// }
function crossMatrixMap(xs, ys, fn) {
    const xl = xs.length, yl = ys.length;
    const out = [];
    for (let i = 0; i < xl; i += 1) {
        let row = [];
        for (let j = 0; j < yl; j += 1) {
            row[j] = fn(xs[i], ys[j], i, j);
        }
        out[i] = row;
    }
    return out;
}
exports.crossMatrixMap = crossMatrixMap;
function upperTriangularMatrixMap(xs, ys, fn, filler, includeSame) {
    const fn2 = includeSame ?
        (x, y, xidx, yidx) => (xidx <= yidx ? fn(x, y) : filler) :
        (x, y, xidx, yidx) => (xidx < yidx ? fn(x, y) : filler);
    return crossMatrixMap(xs, ys, fn2);
}
exports.upperTriangularMatrixMap = upperTriangularMatrixMap;
function unnest(list) {
    return makeFlat(list, false);
}
exports.unnest = unnest;
function values(obj) {
    return Object.keys(obj).map(k => obj[k]);
}
exports.values = values;
function zip(l1, l2) {
    let out = [];
    for (let i = 0; i < Math.min(l1.length, l2.length); i += 1) {
        out.push([l1[i], l2[i]]);
    }
    return out;
}
exports.zip = zip;
function zipObj(keys, vals) {
    return keys.reduce((out, key, idx) => {
        const o = { [key]: vals[idx] };
        return Object.assign({}, out, o);
    }, {});
}
exports.zipObj = zipObj;
function zipWith(fn, xs, ys) {
    const l = Math.min(xs.length, ys.length);
    let out = [];
    for (let i = 0; i < l; i += 1) {
        out[i] = fn(xs[i], ys[i]);
    }
    return out;
}
exports.zipWith = zipWith;
function makeFlat(list, recursive) {
    let result = [];
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
        }
        else {
            result[result.length] = list[idx];
        }
        idx += 1;
    }
    return result;
}
