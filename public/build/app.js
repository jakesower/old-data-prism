/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["j"] = id;
/* harmony export (immutable) */ __webpack_exports__["b"] = apply;
/* harmony export (immutable) */ __webpack_exports__["l"] = mixin;
/* harmony export (immutable) */ __webpack_exports__["a"] = add;
/* harmony export (immutable) */ __webpack_exports__["d"] = compose;
/* harmony export (immutable) */ __webpack_exports__["k"] = impurePush;
/* harmony export (immutable) */ __webpack_exports__["e"] = cons;
/* harmony export (immutable) */ __webpack_exports__["g"] = curry3;
/* harmony export (immutable) */ __webpack_exports__["f"] = curry2;
/* unused harmony export flip */
/* unused harmony export foldlArray */
/* harmony export (immutable) */ __webpack_exports__["i"] = foldlArray1;
/* harmony export (immutable) */ __webpack_exports__["c"] = arrayFlatten;
/* harmony export (immutable) */ __webpack_exports__["h"] = deepEqual;
function id(a) {
    return a;
}
function apply(f, a) {
    return f(a);
}
function mixin(derivedCtor, baseCtors) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            if (!(name in derivedCtor) && !(name in derivedCtor.prototype)) {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            }
        });
    });
}
function add(n, m) {
    return n + m;
}
function compose(f, g) {
    return (a) => f(g(a));
}
function impurePush(arr, a) {
    arr.push(a);
    return arr;
}
function cons(a, as) {
    return [a].concat(as);
}
function curry3(f) {
    return a => b => c => f(a, b, c);
}
function curry2(f) {
    return a => b => f(a, b);
}
function flip(f) {
    return (b, a) => f(a, b);
}
function foldlArray(f, init, a) {
    for (let i = 0; i < a.length; ++i) {
        init = f(init, a[i]);
    }
    return init;
}
function foldlArray1(f, a) {
    let init = a[0];
    for (let i = 1; i < a.length; ++i) {
        init = f(init, a[i]);
    }
    return init;
}
function arrayFlatten(m) {
    let result = [];
    for (let i = 0; i < m.length; ++i) {
        for (let j = 0; j < m[i].length; ++j) {
            result.push(m[i][j]);
        }
    }
    return result;
}
function deepEqual(a, b) {
    if (typeof a === "object" && typeof b === "object") {
        const aKeys = Object.keys(a);
        for (const key of aKeys) {
            if (!deepEqual(a[key], b[key])) {
                return false;
            }
        }
        return true;
    }
    else {
        return a === b;
    }
}
//# sourceMappingURL=utils.js.map

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export __extends */
/* unused harmony export __assign */
/* unused harmony export __rest */
/* harmony export (immutable) */ __webpack_exports__["a"] = __decorate;
/* unused harmony export __param */
/* unused harmony export __metadata */
/* unused harmony export __awaiter */
/* unused harmony export __generator */
/* unused harmony export __exportStar */
/* unused harmony export __values */
/* unused harmony export __read */
/* unused harmony export __spread */
/* unused harmony export __await */
/* unused harmony export __asyncGenerator */
/* unused harmony export __asyncDelegator */
/* unused harmony export __asyncValues */
/* unused harmony export __makeTemplateObject */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { if (o[n]) i[n] = function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; }; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Behavior; });
/* harmony export (immutable) */ __webpack_exports__["l"] = isBehavior;
/* harmony export (immutable) */ __webpack_exports__["n"] = producerBehavior;
/* harmony export (immutable) */ __webpack_exports__["q"] = sinkBehavior;
/* harmony export (immutable) */ __webpack_exports__["j"] = at;
/* harmony export (immutable) */ __webpack_exports__["i"] = ap;
/* harmony export (immutable) */ __webpack_exports__["x"] = when;
/* harmony export (immutable) */ __webpack_exports__["r"] = snapshotAt;
/* harmony export (immutable) */ __webpack_exports__["k"] = fromFunction;
/* harmony export (immutable) */ __webpack_exports__["t"] = switchTo;
/* harmony export (immutable) */ __webpack_exports__["u"] = switcher;
/* harmony export (immutable) */ __webpack_exports__["v"] = testBehavior;
/* harmony export (immutable) */ __webpack_exports__["o"] = scan;
/* harmony export (immutable) */ __webpack_exports__["p"] = scanCombine;
/* harmony export (immutable) */ __webpack_exports__["s"] = stepper;
/* harmony export (immutable) */ __webpack_exports__["w"] = toggle;
/* harmony export (immutable) */ __webpack_exports__["m"] = moment;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__linkedlist__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__funkia_jabz__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__future__ = __webpack_require__(9);






let Behavior = class Behavior extends __WEBPACK_IMPORTED_MODULE_3__common__["d" /* Reactive */] {
    constructor() {
        super();
        this.multi = true;
        this.nrOfPullers = 0;
    }
    static is(a) {
        return isBehavior(a);
    }
    map(fn) {
        return new MapBehavior(this, fn);
    }
    mapTo(v) {
        return new ConstantBehavior(v);
    }
    static of(v) {
        return new ConstantBehavior(v);
    }
    of(v) {
        return new ConstantBehavior(v);
    }
    ap(f) {
        return new ApBehavior(f, this);
    }
    lift() {
        // TODO: Experiment with faster specialized `lift` implementation
        const f = arguments[0];
        switch (arguments.length - 1) {
            case 1:
                return arguments[1].map(f);
            case 2:
                return arguments[2].ap(arguments[1].map((a) => (b) => f(a, b)));
            case 3:
                return arguments[3].ap(arguments[2].ap(arguments[1].map((a) => (b) => (c) => f(a, b, c))));
        }
    }
    chain(fn) {
        return new ChainBehavior(this, fn);
    }
    at() {
        return this.state === 0 /* Push */ ? this.last : this.pull();
    }
    push(a) {
        this.last = this.pull();
        this.child.push(this.last);
    }
    pull() {
        return this.last;
    }
    activate() {
        super.activate();
        if (this.state === 0 /* Push */) {
            this.last = this.pull();
        }
    }
    changePullers(n) {
        this.nrOfPullers += n;
        Object(__WEBPACK_IMPORTED_MODULE_3__common__["f" /* changePullersParents */])(n, this.parents);
    }
    semantic() {
        throw new Error("The behavior does not have a semantic representation");
    }
    log(prefix) {
        this.subscribe(a => console.log(`${prefix || ""} `, a));
        return this;
    }
};
Behavior.multi = true;
Behavior = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __WEBPACK_IMPORTED_MODULE_2__funkia_jabz__["c" /* monad */]
], Behavior);

function isBehavior(b) {
    return typeof b === "object" && ("at" in b);
}
class ProducerBehavior extends Behavior {
    push(a) {
        const changed = a !== this.last;
        this.last = a;
        if (this.state === 0 /* Push */ && changed) {
            this.child.push(a);
        }
    }
    changePullers(n) {
        this.nrOfPullers += n;
        if (this.nrOfPullers > 0 && this.state === 3 /* Inactive */) {
            this.state = 1 /* Pull */;
            this.activateProducer();
        }
        else if (this.nrOfPullers === 0 && this.state === 1 /* Pull */) {
            this.deactivateProducer();
        }
    }
    activate() {
        if (this.state === 3 /* Inactive */) {
            this.activateProducer();
        }
        this.state = 0 /* Push */;
    }
    deactivate() {
        if (this.nrOfPullers === 0) {
            this.state = 3 /* Inactive */;
            this.deactivateProducer();
        }
        else {
            this.state = 1 /* Pull */;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["f"] = ProducerBehavior;

class ProducerBehaviorFromFunction extends ProducerBehavior {
    constructor(activateFn, initial) {
        super();
        this.activateFn = activateFn;
        this.initial = initial;
        this.last = initial;
    }
    activateProducer() {
        this.state = 0 /* Push */;
        this.deactivateFn = this.activateFn(this.push.bind(this));
    }
    deactivateProducer() {
        this.state = 3 /* Inactive */;
        this.deactivateFn();
    }
}
function producerBehavior(activate, initial) {
    return new ProducerBehaviorFromFunction(activate, initial);
}
class SinkBehavior extends ProducerBehavior {
    constructor(last) {
        super();
        this.last = last;
    }
    activateProducer() { }
    deactivateProducer() { }
}
/* harmony export (immutable) */ __webpack_exports__["g"] = SinkBehavior;

/**
 * Creates a behavior for imperative pushing.
 */
function sinkBehavior(initial) {
    return new SinkBehavior(initial);
}
/**
 * Impure function that gets the current value of a behavior. For a
 * pure variant see `sample`.
 */
function at(b) {
    return b.at();
}
class MapBehavior extends Behavior {
    constructor(parent, f) {
        super();
        this.parent = parent;
        this.f = f;
        this.parents = Object(__WEBPACK_IMPORTED_MODULE_1__linkedlist__["a" /* cons */])(parent);
    }
    push(a) {
        this.last = this.f(a);
        this.child.push(this.last);
    }
    pull() {
        const newVal = this.parent.at();
        if (this.oldVal !== newVal) {
            this.oldVal = newVal;
            this.cached = this.f(newVal);
        }
        return this.cached;
    }
    semantic() {
        const g = this.parent.semantic();
        return (t) => this.f(g(t));
    }
}
/* harmony export (immutable) */ __webpack_exports__["e"] = MapBehavior;

class ApBehavior extends Behavior {
    constructor(fn, val) {
        super();
        this.fn = fn;
        this.val = val;
        this.parents = Object(__WEBPACK_IMPORTED_MODULE_1__linkedlist__["a" /* cons */])(fn, Object(__WEBPACK_IMPORTED_MODULE_1__linkedlist__["a" /* cons */])(val));
    }
    push() {
        const fn = at(this.fn);
        const val = at(this.val);
        this.last = fn(val);
        this.child.push(this.last);
    }
    pull() {
        return this.fn.at()(this.val.at());
    }
}
/**
 * Apply a function valued behavior to a value behavior.
 *
 * @param fnB behavior of functions from `A` to `B`
 * @param valB A behavior of `A`
 * @returns Behavior of the function in `fnB` applied to the value in `valB`
 */
function ap(fnB, valB) {
    return valB.ap(fnB);
}
class ChainOuter extends Behavior {
    constructor(child, parent) {
        super();
        this.child = child;
        this.parent = parent;
        this.parents = Object(__WEBPACK_IMPORTED_MODULE_1__linkedlist__["a" /* cons */])(parent);
    }
    push(a) {
        this.child.pushOuter(a);
    }
}
class ChainBehavior extends Behavior {
    constructor(outer, fn) {
        super();
        this.outer = outer;
        this.fn = fn;
        // Create the outer consumer
        this.outerConsumer = new ChainOuter(this, outer);
        this.parents = Object(__WEBPACK_IMPORTED_MODULE_1__linkedlist__["a" /* cons */])(this.outerConsumer);
    }
    activate() {
        // Make the consumers listen to inner and outer behavior
        this.outer.addListener(this.outerConsumer);
        if (this.outer.state === 0 /* Push */) {
            this.innerB = this.fn(this.outer.at());
            this.innerB.addListener(this);
            this.state = this.innerB.state;
            this.last = at(this.innerB);
        }
    }
    pushOuter(a) {
        // The outer behavior has changed. This means that we will have to
        // call our function, which will result in a new inner behavior.
        // We therefore stop listening to the old inner behavior and begin
        // listening to the new one.
        if (this.innerB !== undefined) {
            this.innerB.removeListener(this);
        }
        const newInner = this.innerB = this.fn(a);
        newInner.addListener(this);
        this.state = newInner.state;
        this.changeStateDown(this.state);
        if (this.state === 0 /* Push */) {
            this.push(newInner.at());
        }
    }
    push(b) {
        this.last = b;
        this.child.push(b);
    }
    pull() {
        return this.fn(this.outer.at()).at();
    }
}
/** @private */
class WhenBehavior extends Behavior {
    constructor(parent) {
        super();
        this.parent = parent;
        this.push(at(parent));
    }
    push(val) {
        if (val === true) {
            this.last = __WEBPACK_IMPORTED_MODULE_4__future__["b" /* Future */].of({});
        }
        else {
            this.last = new __WEBPACK_IMPORTED_MODULE_4__future__["a" /* BehaviorFuture */](this.parent);
        }
    }
    pull() {
        return this.last;
    }
}
function when(b) {
    return new WhenBehavior(b);
}
// FIXME: This can probably be made less ugly.
/** @private */
class SnapshotBehavior extends Behavior {
    constructor(parent, future) {
        super();
        this.parent = parent;
        if (future.state === 4 /* Done */) {
            // Future has occurred at some point in the past
            this.afterFuture = true;
            this.state = parent.state;
            parent.addListener(this);
            this.last = __WEBPACK_IMPORTED_MODULE_4__future__["b" /* Future */].of(at(parent));
        }
        else {
            this.afterFuture = false;
            this.state = 0 /* Push */;
            this.last = __WEBPACK_IMPORTED_MODULE_4__future__["e" /* sinkFuture */]();
            future.addListener(this);
        }
    }
    push(val) {
        if (this.afterFuture === false) {
            // The push is coming from the Future, it has just occurred.
            this.afterFuture = true;
            this.last.resolve(at(this.parent));
            this.parent.addListener(this);
        }
        else {
            // We are receiving an update from `parent` after `future` has
            // occurred.
            this.last = __WEBPACK_IMPORTED_MODULE_4__future__["b" /* Future */].of(val);
        }
    }
    pull() {
        return this.last;
    }
}
function snapshotAt(b, f) {
    return new SnapshotBehavior(b, f);
}
/** Behaviors that are always active */
class ActiveBehavior extends Behavior {
    // noop methods, behavior is always active
    activate() { }
    deactivate() { }
    changePullers() { }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ActiveBehavior;

class StatefulBehavior extends ActiveBehavior {
    constructor(a, b, c) {
        super();
        this.a = a;
        this.b = b;
        this.c = c;
        this.state = 2 /* OnlyPull */;
    }
}
/* harmony export (immutable) */ __webpack_exports__["h"] = StatefulBehavior;

class ConstantBehavior extends ActiveBehavior {
    constructor(last) {
        super();
        this.last = last;
        this.state = 0 /* Push */;
    }
    semantic() {
        return (_) => this.last;
    }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = ConstantBehavior;

/** @private */
class FunctionBehavior extends ActiveBehavior {
    constructor(fn) {
        super();
        this.fn = fn;
        this.state = 2 /* OnlyPull */;
    }
    pull() {
        return this.fn();
    }
}
/* harmony export (immutable) */ __webpack_exports__["d"] = FunctionBehavior;

function fromFunction(fn) {
    return new FunctionBehavior(fn);
}
/** @private */
class SwitcherBehavior extends ActiveBehavior {
    constructor(b, next) {
        super();
        this.b = b;
        b.addListener(this);
        this.state = b.state;
        if (this.state === 0 /* Push */) {
            this.last = at(b);
        }
        // FIXME: Using `bind` is hardly optimal for performance.
        next.subscribe(this.doSwitch.bind(this));
    }
    push(val) {
        this.last = val;
        if (this.child !== undefined) {
            this.child.push(val);
        }
    }
    pull() {
        return at(this.b);
    }
    doSwitch(newB) {
        this.b.removeListener(this);
        this.b = newB;
        newB.addListener(this);
        const newState = newB.state;
        if (newState === 0 /* Push */) {
            this.push(newB.at());
        }
        this.state = newState;
        if (this.child !== undefined) {
            this.child.changeStateDown(this.state);
        }
    }
}
/**
 * From an initial behavior and a future of a behavior, `switcher`
 * creates a new behavior that acts exactly like `initial` until
 * `next` occurs, after which it acts like the behavior it contains.
 */
function switchTo(init, next) {
    return new SwitcherBehavior(init, next);
}
function switcher(init, stream) {
    return fromFunction(() => new SwitcherBehavior(init, stream));
}
class TestBehavior extends Behavior {
    constructor(semanticBehavior) {
        super();
        this.semanticBehavior = semanticBehavior;
    }
    semantic() {
        return this.semanticBehavior;
    }
}
function testBehavior(b) {
    return new TestBehavior(b);
}
/** @private */
class ActiveScanBehavior extends ActiveBehavior {
    constructor(f, last, parent) {
        super();
        this.f = f;
        this.last = last;
        this.parent = parent;
        this.state = 0 /* Push */;
        parent.addListener(this);
    }
    push(val) {
        this.last = this.f(val, this.last);
        if (this.child) {
            this.child.push(this.last);
        }
    }
}
class ScanBehavior extends StatefulBehavior {
    pull() {
        return new ActiveScanBehavior(this.a, this.b, this.c);
    }
    semantic() {
        const stream = this.c.semantic();
        return (t1) => testBehavior((t2) => stream
            .filter(({ time }) => t1 <= time && time <= t2)
            .map((o) => o.value)
            .reduce((acc, cur) => this.a(cur, acc), this.b));
    }
}
function scan(f, initial, source) {
    return new ScanBehavior(f, initial, source);
}
class IndexReactive extends __WEBPACK_IMPORTED_MODULE_3__common__["d" /* Reactive */] {
    constructor(index, parent) {
        super();
        this.index = index;
        this.parents = Object(__WEBPACK_IMPORTED_MODULE_1__linkedlist__["a" /* cons */])(parent);
    }
    push(a) {
        this.child.pushIdx(a, this.index);
    }
}
class ActiveScanCombineBehavior extends ActiveBehavior {
    constructor(streams, last) {
        super();
        this.last = last;
        this.state = 0 /* Push */;
        this.accumulators = [];
        for (let i = 0; i < streams.length; ++i) {
            const [s, f] = streams[i];
            this.accumulators.push(f);
            const indexReactive = new IndexReactive(i, s);
            indexReactive.addListener(this);
            this.parents = Object(__WEBPACK_IMPORTED_MODULE_1__linkedlist__["a" /* cons */])(indexReactive, this.parents);
        }
    }
    pushIdx(a, index) {
        this.last = this.accumulators[index](a, this.last);
        if (this.child) {
            this.child.push(this.last);
        }
    }
}
class ScanCombineBehavior extends StatefulBehavior {
    pull() {
        return new ActiveScanCombineBehavior(this.a, this.b);
    }
}
function scanCombine(pairs, initial) {
    return new ScanCombineBehavior(pairs, initial);
}
const firstArg = (a, b) => a;
/**
 * Creates a Behavior whose value is the last occurrence in the stream.
 * @param initial - the initial value that the behavior has
 * @param steps - the stream that will change the value of the behavior
 */
function stepper(initial, steps) {
    return scan(firstArg, initial, steps);
}
/**
 *
 * @param initial the initial value
 * @param turnOn the streams that turn the behavior on
 * @param turnOff the streams that turn the behavior off
 */
function toggle(initial, turnOn, turnOff) {
    return stepper(initial, turnOn.mapTo(true).combine(turnOff.mapTo(false)));
}
class MomentBehavior extends Behavior {
    constructor(f) {
        super();
        this.f = f;
        this.sampleBound = (b) => this.sample(b);
    }
    activate() {
        try {
            this.last = this.f(this.sampleBound);
            this.state = 0 /* Push */;
        }
        catch (error) {
            if ("placeholder" in error) {
                const placeholder = error.placeholder;
                Object(__WEBPACK_IMPORTED_MODULE_3__common__["h" /* removeListenerParents */])(this, this.parents);
                placeholder.addListener(this);
                this.parents = Object(__WEBPACK_IMPORTED_MODULE_1__linkedlist__["a" /* cons */])(placeholder);
            }
            else {
                throw error;
            }
        }
    }
    push() {
        Object(__WEBPACK_IMPORTED_MODULE_3__common__["h" /* removeListenerParents */])(this, this.parents);
        this.parents = undefined;
        this.child.push(this.last = this.f(this.sampleBound));
    }
    sample(b) {
        b.addListener(this);
        this.parents = Object(__WEBPACK_IMPORTED_MODULE_1__linkedlist__["a" /* cons */])(b, this.parents);
        return b.at();
    }
}
function moment(f) {
    return new MomentBehavior(f);
}
//# sourceMappingURL=behavior.js.map

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["g"] = apply;
/* harmony export (immutable) */ __webpack_exports__["k"] = filter;
/* harmony export (immutable) */ __webpack_exports__["t"] = split;
/* harmony export (immutable) */ __webpack_exports__["l"] = filterApply;
/* harmony export (immutable) */ __webpack_exports__["n"] = keepWhen;
/* harmony export (immutable) */ __webpack_exports__["p"] = scanS;
/* harmony export (immutable) */ __webpack_exports__["v"] = switchStream;
/* harmony export (immutable) */ __webpack_exports__["h"] = changes;
/* harmony export (immutable) */ __webpack_exports__["o"] = producerStream;
/* harmony export (immutable) */ __webpack_exports__["q"] = sinkStream;
/* harmony export (immutable) */ __webpack_exports__["u"] = subscribe;
/* harmony export (immutable) */ __webpack_exports__["r"] = snapshot;
/* harmony export (immutable) */ __webpack_exports__["s"] = snapshotWith;
/* harmony export (immutable) */ __webpack_exports__["i"] = combine;
/* harmony export (immutable) */ __webpack_exports__["m"] = isStream;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__linkedlist__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__behavior__ = __webpack_require__(2);



/**
 * A stream is a list of occurrences over time. Each occurrence
 * happens at a point in time and has an associated value.
 */
class Stream extends __WEBPACK_IMPORTED_MODULE_0__common__["d" /* Reactive */] {
    constructor() {
        super();
    }
    combine(stream) {
        return new CombineStream(stream, this);
    }
    map(f) {
        return new MapStream(this, f);
    }
    mapTo(b) {
        return new MapToStream(this, b);
    }
    filter(fn) {
        return new FilterStream(this, fn);
    }
    scanS(fn, startingValue) {
        return Object(__WEBPACK_IMPORTED_MODULE_2__behavior__["k" /* fromFunction */])(() => new ScanStream(fn, startingValue, this));
    }
    scan(fn, init) {
        return Object(__WEBPACK_IMPORTED_MODULE_2__behavior__["o" /* scan */])(fn, init, this);
    }
    log(prefix) {
        this.subscribe(a => console.log(`${prefix || ""} `, a));
        return this;
    }
    /* istanbul ignore next */
    semantic() {
        throw new Error("The stream does not have a semantic representation");
    }
}
/* harmony export (immutable) */ __webpack_exports__["f"] = Stream;

class MapStream extends Stream {
    constructor(parent, f) {
        super();
        this.f = f;
        this.parents = Object(__WEBPACK_IMPORTED_MODULE_1__linkedlist__["a" /* cons */])(parent);
    }
    semantic() {
        const s = this.parents.value.semantic();
        return s.map(({ time, value }) => ({ time, value: this.f(value) }));
    }
    push(a) {
        this.child.push(this.f(a));
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = MapStream;

class MapToStream extends Stream {
    constructor(parent, b) {
        super();
        this.b = b;
        this.parents = Object(__WEBPACK_IMPORTED_MODULE_1__linkedlist__["a" /* cons */])(parent);
    }
    semantic() {
        const s = this.parents.value.semantic();
        return s.map(({ time }) => ({ time, value: this.b }));
    }
    push(a) {
        this.child.push(this.b);
    }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = MapToStream;

class FilterStream extends Stream {
    constructor(parent, fn) {
        super();
        this.parent = parent;
        this.fn = fn;
        this.parents = Object(__WEBPACK_IMPORTED_MODULE_1__linkedlist__["a" /* cons */])(parent);
    }
    semantic() {
        const s = this.parent.semantic();
        return s.filter(({ value }) => this.fn(value));
    }
    push(a) {
        if (this.fn(a) === true) {
            this.child.push(a);
        }
    }
}
function apply(behavior, stream) {
    return stream.map((a) => behavior.at()(a));
}
/**
 * @param fn A predicate function that returns a boolean for `A`.
 * @param stream The stream to filter.
 * @returns Stream that only contains the occurrences from `stream`
 * for which `fn` returns true.
 */
function filter(predicate, s) {
    return s.filter(predicate);
}
function split(predicate, stream) {
    // It should be possible to implement this in a faster way where
    // `predicate` is only called once for each occurrence
    return [stream.filter(predicate), stream.filter((a) => !predicate(a))];
}
function filterApply(predicate, stream) {
    return stream.filter((a) => predicate.at()(a));
}
function keepWhen(stream, behavior) {
    return stream.filter((_) => behavior.at());
}
/** For stateful streams that are always active */
class ActiveStream extends Stream {
    activate() { }
    deactivate() { }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ActiveStream;

class EmptyStream extends ActiveStream {
    constructor() {
        super();
    }
    semantic() {
        return [];
    }
    /* istanbul ignore next */
    push(a) {
        throw new Error("You cannot push to an empty stream");
    }
}
const empty = new EmptyStream();
/* harmony export (immutable) */ __webpack_exports__["j"] = empty;

class ScanStream extends ActiveStream {
    constructor(fn, last, parent) {
        super();
        this.fn = fn;
        this.last = last;
        this.parent = parent;
        parent.addListener(this);
    }
    semantic() {
        const s = this.parent.semantic();
        let acc = this.last;
        return s.map(({ time, value }) => {
            acc = this.fn(value, acc);
            return { time, value: acc };
        });
    }
    push(a) {
        const val = this.last = this.fn(a, this.last);
        this.child.push(val);
    }
}
/**
 * The returned  initially has the initial value, on each occurrence
 * in `source` the function is applied to the current value of the
 * behavior and the value of the occurrence, the returned value
 * becomes the next value of the behavior.
 */
function scanS(fn, startingValue, stream) {
    return stream.scanS(fn, startingValue);
}
/** @private */
class SwitchOuter {
    constructor(s) {
        this.s = s;
    }
    changeStateDown(state) { }
    push(a) {
        this.s.doSwitch(a);
    }
}
class SwitchBehaviorStream extends Stream {
    constructor(b) {
        super();
        this.b = b;
    }
    activate() {
        this.outerConsumer = new SwitchOuter(this);
        this.b.addListener(this.outerConsumer);
        this.currentSource = this.b.at();
        this.currentSource.addListener(this);
    }
    deactivate() {
        this.currentSource.removeListener(this);
        this.b.removeListener(this.outerConsumer);
    }
    push(a) {
        this.child.push(a);
    }
    doSwitch(newStream) {
        this.currentSource.removeListener(this);
        newStream.addListener(this);
        this.currentSource = newStream;
    }
}
function switchStream(b) {
    return new SwitchBehaviorStream(b);
}
class ChangesStream extends Stream {
    constructor(parent) {
        super();
        this.parents = Object(__WEBPACK_IMPORTED_MODULE_1__linkedlist__["a" /* cons */])(parent);
    }
    push(a) {
        this.child.push(a);
    }
}
function changes(b) {
    return new ChangesStream(b);
}
class CombineStream extends Stream {
    constructor(s1, s2) {
        super();
        this.s1 = s1;
        this.s2 = s2;
        this.parents = Object(__WEBPACK_IMPORTED_MODULE_1__linkedlist__["a" /* cons */])(s1, Object(__WEBPACK_IMPORTED_MODULE_1__linkedlist__["a" /* cons */])(s2));
    }
    semantic() {
        const result = [];
        const a = this.s1.semantic();
        const b = this.s2.semantic();
        for (let i = 0, j = 0; i < a.length || j < b.length;) {
            if (j === b.length || (i < a.length && a[i].time <= b[j].time)) {
                result.push(a[i]);
                i++;
            }
            else {
                result.push(b[j]);
                j++;
            }
        }
        return result;
    }
    push(a) {
        this.child.push(a);
    }
}
class ProducerStream extends Stream {
    /* istanbul ignore next */
    semantic() {
        throw new Error("A producer stream does not have a semantic representation");
    }
    push(a) {
        this.child.push(a);
    }
}
/* harmony export (immutable) */ __webpack_exports__["d"] = ProducerStream;

class ProducerStreamFromFunction extends ProducerStream {
    constructor(activateFn) {
        super();
        this.activateFn = activateFn;
    }
    activate() {
        this.state = 0 /* Push */;
        this.deactivateFn = this.activateFn(this.push.bind(this));
    }
    deactivate() {
        this.state = 3 /* Inactive */;
        this.deactivateFn();
    }
}
function producerStream(activate) {
    return new ProducerStreamFromFunction(activate);
}
class SinkStream extends ProducerStream {
    constructor() {
        super();
        this.pushing = false;
    }
    push(a) {
        if (this.pushing === true) {
            this.child.push(a);
        }
    }
    activate() {
        this.pushing = true;
    }
    deactivate() {
        this.pushing = false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["e"] = SinkStream;

function sinkStream() {
    return new SinkStream();
}
function subscribe(fn, stream) {
    stream.subscribe(fn);
}
class SnapshotStream extends Stream {
    constructor(behavior, stream) {
        super();
        this.behavior = behavior;
        this.stream = stream;
    }
    push(a) {
        this.child.push(this.behavior.at());
    }
    activate() {
        this.behavior.changePullers(1);
        this.stream.addListener(this);
    }
    deactivate() {
        this.behavior.changePullers(-1);
        this.stream.removeListener(this);
    }
    semantic() {
        const b = this.behavior.semantic();
        return this.stream.semantic().map(({ time }) => ({ time, value: b(time) }));
    }
}
function snapshot(b, s) {
    return new SnapshotStream(b, s);
}
class SnapshotWithStream extends Stream {
    constructor(fn, behavior, stream) {
        super();
        this.fn = fn;
        this.behavior = behavior;
        this.stream = stream;
    }
    push(a) {
        this.child.push(this.fn(a, this.behavior.at()));
    }
    activate() {
        this.stream.addListener(this);
    }
    deactivate() {
        this.stream.removeListener(this);
    }
}
function snapshotWith(f, b, s) {
    return new SnapshotWithStream(f, b, s);
}
function combine(...streams) {
    // FIXME: More performant implementation with benchmark
    return streams.reduce((s1, s2) => s1.combine(s2), empty);
}
function isStream(s) {
    return typeof s === "object" && ("scanS" in s);
}
//# sourceMappingURL=stream.js.map

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export applicative */
/* harmony export (immutable) */ __webpack_exports__["c"] = of;
/* unused harmony export ap */
/* harmony export (immutable) */ __webpack_exports__["b"] = lift;
/* harmony export (immutable) */ __webpack_exports__["d"] = seq;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__functor__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);


class AbstractApplicative extends __WEBPACK_IMPORTED_MODULE_0__functor__["a" /* AbstractFunctor */] {
    ap(f) {
        return this.lift(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* apply */], f, this);
    }
    lift() {
        const f = arguments[0];
        switch (arguments.length - 1) {
            case 1:
                return arguments[1].map(f);
            case 2:
                return arguments[2].ap(arguments[1].map(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["f" /* curry2 */])(f)));
            case 3:
                return arguments[3].ap(arguments[2].ap(arguments[1].map(Object(__WEBPACK_IMPORTED_MODULE_1__utils__["g" /* curry3 */])(f))));
        }
    }
    map(f) {
        return this.ap(this.of(f));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AbstractApplicative;

function applicative(constructor) {
    const prototype = constructor.prototype;
    if (!("of" in prototype)) {
        throw new TypeError("Can't derive applicative. `of` method missing.");
    }
    if (!("ap" in prototype) && !("lift" in prototype)) {
        throw new TypeError("Can't derive applicative. Either `lift` or `ap` method must be defined.");
    }
    Object(__WEBPACK_IMPORTED_MODULE_1__utils__["l" /* mixin */])(constructor, [__WEBPACK_IMPORTED_MODULE_0__functor__["a" /* AbstractFunctor */], AbstractApplicative]);
}
function isArrayConstructor(a) {
    return a === Array;
}
function of(d, a) {
    if (isArrayConstructor(d)) {
        return [a];
    }
    else {
        return d.of(a);
    }
}
function arrayLift(f, args, indices) {
    if (args.length === indices.length) {
        let values = [];
        for (let i = 0; i < args.length; ++i) {
            values[i] = args[i][indices[i]];
        }
        return [f.apply(undefined, values)];
    }
    else {
        let results = [];
        for (let i = 0; i < args[indices.length].length; ++i) {
            results = results.concat(arrayLift(f, args, indices.concat(i)));
        }
        return results;
    }
}
function ap(fa, ba) {
    return ba.ap(fa);
}
// implementation
function lift(f, ...args) {
    if (Array.isArray(args[0])) {
        return arrayLift(f, args, []);
    }
    else {
        return args[0].lift(f, ...args);
    }
}
function seq(a, b) {
    return ap(Object(__WEBPACK_IMPORTED_MODULE_0__functor__["b" /* mapTo */])(__WEBPACK_IMPORTED_MODULE_1__utils__["j" /* id */], a), b);
}
//# sourceMappingURL=applicative.js.map

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = monad;
/* unused harmony export flatten */
/* unused harmony export chain */
/* unused harmony export beginGo */
/* harmony export (immutable) */ __webpack_exports__["b"] = go;
/* unused harmony export fgo */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);

class AbstractMonad {
    chain(f) {
        return this.map(f).flatten();
    }
    flatten() {
        return this.chain(__WEBPACK_IMPORTED_MODULE_0__utils__["j" /* id */]);
    }
    map(f) {
        return this.chain((a) => this.of(f(a)));
    }
    mapTo(b) {
        return this.chain(_ => this.of(b));
    }
    ap(m) {
        return m.chain(f => this.chain(a => this.of(f(a))));
    }
    lift(f, ...ms) {
        const { of } = ms[0];
        switch (f.length) {
            case 1:
                return ms[0].map(f);
            case 2:
                return ms[0].chain((a) => ms[1].chain((b) => of(f(a, b))));
            case 3:
                return ms[0].chain((a) => ms[1].chain((b) => ms[2].chain((c) => of(f(a, b, c)))));
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AbstractMonad;

function monad(constructor) {
    const p = constructor.prototype;
    if (!("of" in p)) {
        throw new TypeError("Can't derive monad. `of` method missing.");
    }
    if (!("chain" in p) && !("flatten" in p && "map" in p)) {
        throw new TypeError("Can't derive monad. Either `chain` or `flatten` and `map` method must be defined.");
    }
    if (!("multi" in p)) {
        p.multi = false;
    }
    if (!("multi" in constructor)) {
        constructor.multi = false;
    }
    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["l" /* mixin */])(constructor, [AbstractMonad]);
}
function flatten(m) {
    if (Array.isArray(m)) {
        return Object(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* arrayFlatten */])(m);
    }
    else {
        return m.flatten();
    }
}
function arrayChain(f, m) {
    let result = [];
    for (let i = 0; i < m.length; ++i) {
        const added = f(m[i]);
        for (let j = 0; j < added.length; ++j) {
            result.push(added[j]);
        }
    }
    return result;
}
function chain(f, m) {
    if (Array.isArray(m)) {
        return arrayChain(f, m);
    }
    else {
        return m.chain(f);
    }
}
function reportErrorInGenerator(value) {
    throw new Error("An incorrect value was yielded inside a generator function: " +
        value.toString());
}
function singleGo(doing, m, check) {
    function doRec(v) {
        const result = doing.next(v);
        if (result.done === true) {
            return m.of(result.value);
        }
        else if (check(result.value) === true) {
            return result.value.chain(doRec);
        }
        else {
            reportErrorInGenerator(result.value);
        }
    }
    return m.chain(doRec);
}
function multiGo(gen, m, check, args) {
    const doRec = function (v, stateSoFar) {
        const doing = gen(...args);
        for (const it of stateSoFar) {
            doing.next(it);
        }
        const result = doing.next(v);
        if (result.done === true) {
            return m.of(result.value);
        }
        else if (check(result.value) === true) {
            const newStateSoFar = stateSoFar.concat(v);
            return result.value.chain((vv) => doRec(vv, newStateSoFar));
        }
        else {
            reportErrorInGenerator(result.value);
        }
    };
    return m.chain(vv => doRec(vv, [undefined]));
}
function hasChain(value) {
    return value.chain !== undefined;
}
function beginGo(gen, monad, args = []) {
    const iterator = gen(...args);
    const { done, value } = iterator.next();
    if (done === true) {
        if (monad !== undefined) {
            return monad.of(value);
        }
        else {
            throw new Error("The generator function never yielded a monad and no monad was specified.");
        }
    }
    const check = monad !== undefined && monad.is ? monad.is : hasChain;
    if (!check(value)) {
        reportErrorInGenerator(value);
    }
    if (value.multi === true) {
        return multiGo(gen, value, check, args);
    }
    else {
        return singleGo(iterator, value, check);
    }
}
function go(gen, monad) {
    return beginGo(gen, monad, []);
}
function fgo(gen, monad) {
    return (...args) => beginGo(gen, monad, args);
}
//# sourceMappingURL=monad.js.map

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["e"] = addListenerParents;
/* harmony export (immutable) */ __webpack_exports__["h"] = removeListenerParents;
/* harmony export (immutable) */ __webpack_exports__["f"] = changePullersParents;
/* harmony export (immutable) */ __webpack_exports__["g"] = observe;
function isBehavior(b) {
    return typeof b === "object" && ("at" in b);
}
class PushOnlyObserver {
    constructor(callback, source) {
        this.callback = callback;
        this.source = source;
        source.addListener(this);
        if (isBehavior(source) && source.state === 0 /* Push */) {
            callback(source.at());
        }
    }
    push(a) {
        this.callback(a);
    }
    deactivate() {
        this.source.removeListener(this);
    }
    changeStateDown(state) { }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = PushOnlyObserver;

class MultiObserver {
    constructor(c1, c2) {
        this.listeners = [c1, c2];
    }
    push(a) {
        for (let i = this.listeners.length - 1; 0 <= i; --i) {
            this.listeners[i].push(a);
        }
    }
    changeStateDown(state) {
        for (let i = this.listeners.length - 1; 0 <= i; --i) {
            this.listeners[i].changeStateDown(state);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = MultiObserver;

function addListenerParents(child, parents, state) {
    const parentState = parents.value.addListener(child);
    const newState = parentState !== 0 /* Push */ ? parentState : state;
    if (parents.tail !== undefined) {
        return addListenerParents(child, parents.tail, newState);
    }
    else {
        return newState;
    }
}
function removeListenerParents(child, parents) {
    parents.value.removeListener(child);
    if (parents.tail !== undefined) {
        removeListenerParents(child, parents.tail);
    }
}
function changePullersParents(n, parents) {
    if (parents === undefined) {
        return;
    }
    if (isBehavior(parents.value)) {
        parents.value.changePullers(n);
    }
    changePullersParents(n, parents.tail);
}
class Reactive {
    constructor() {
        this.state = 3 /* Inactive */;
        this.nrOfListeners = 0;
    }
    addListener(c) {
        const nr = ++this.nrOfListeners;
        if (nr === 1) {
            this.child = c;
            this.activate();
        }
        else if (nr === 2) {
            this.child = new MultiObserver(this.child, c);
        }
        else {
            this.child.listeners.push(c);
        }
        return this.state;
    }
    removeListener(listener) {
        const nr = --this.nrOfListeners;
        if (nr === 0) {
            this.child = undefined;
            if (this.state !== 4 /* Done */) {
                this.deactivate();
            }
        }
        else if (nr === 1) {
            const l = this.child.listeners;
            this.child = l[l[0] === listener ? 1 : 0];
        }
        else {
            const l = this.child.listeners;
            // The indexOf here is O(n), where n is the number of listeners,
            // if using a linked list it should be possible to perform the
            // unsubscribe operation in constant time.
            const idx = l.indexOf(listener);
            if (idx !== -1) {
                if (idx !== l.length - 1) {
                    l[idx] = l[l.length - 1];
                }
                l.length--; // remove the last element of the list
            }
        }
    }
    changeStateDown(state) {
        if (this.child !== undefined) {
            this.child.changeStateDown(state);
        }
    }
    subscribe(callback) {
        return new PushOnlyObserver(callback, this);
    }
    observe(push, beginPulling, endPulling) {
        return new CbObserver(push, beginPulling, endPulling, this);
    }
    activate() {
        this.state = addListenerParents(this, this.parents, 0 /* Push */);
    }
    deactivate(done = false) {
        removeListenerParents(this, this.parents);
        this.state = done === true ? 4 /* Done */ : 3 /* Inactive */;
    }
}
/* harmony export (immutable) */ __webpack_exports__["d"] = Reactive;

class CbObserver {
    constructor(_push, _beginPulling, _endPulling, source) {
        this._push = _push;
        this._beginPulling = _beginPulling;
        this._endPulling = _endPulling;
        this.source = source;
        source.addListener(this);
        if (source.state === 1 /* Pull */ || source.state === 2 /* OnlyPull */) {
            _beginPulling();
        }
        else if (isBehavior(source) && source.state === 0 /* Push */) {
            _push(source.last);
        }
    }
    push(a) {
        this._push(a);
    }
    changeStateDown(state) {
        if (state === 1 /* Pull */ || state === 2 /* OnlyPull */) {
            this._beginPulling();
        }
        else {
            this._endPulling();
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CbObserver;

/**
 * Observe a behavior for the purpose of running side-effects based on
 * the value of the behavior.
 * @param push Called with all values that the behavior pushes
 * through.
 * @param beginPulling Called when the consumer should begin pulling
 * values from the behavior.
 * @param endPulling Called when the consumer should stop pulling.
 * @param behavior The behavior to consume.
 */
function observe(push, beginPulling, endPulling, behavior) {
    return behavior.observe(push, beginPulling, endPulling);
}
//# sourceMappingURL=common.js.map

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = cons;
/* harmony export (immutable) */ __webpack_exports__["b"] = fromArray;
class Cons {
    constructor(value, tail) {
        this.value = value;
        this.tail = tail;
    }
}
/* unused harmony export Cons */

function cons(value, tail) {
    return new Cons(value, tail);
}
function fromArray(values) {
    let list = cons(values[0]);
    for (let i = 1; i < values.length; ++i) {
        list = cons(values[i], list);
    }
    return list;
}
/**
 * A doubly linked list. Updates are done by mutating. Prepend, append
 * and remove all run in O(1) time.
 */
/* Not used yet. The plan is to use it to keep track of subscribed children.
export class LinkedList<A> {
  size: number;
  head: Node<A> | undefined;
  tail: Node<A> | undefined;
  constructor() {
    this.size = 0;
  }
  append(a: A): LinkedList<A> {
    const tail = this.tail;
    const newNode = new Node(a, tail, undefined);
    tail.next = newNode;
    this.tail = newNode;
    this.size++;
    return this;
  }
  remove(node: Node<A>): LinkedList<A> {
    if (node.next !== undefined) {
      node.next.prev = node.prev;
    }
    if (node.prev !== undefined) {
      node.prev.next = node.next;
    }
    if (this.head === node) {
      this.head = node.next;
    }
    if (this.tail === node) {
      this.tail = node.prev;
    }
    return this;
  }
}

export class Node<A> {
  constructor(
    public value: A,
    public prev: Node<A> | undefined,
    public next: Node<A> | undefined
  ) { }
}
*/ 
//# sourceMappingURL=linkedlist.js.map

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__semigroup__ = __webpack_require__(13);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__monoid__ = __webpack_require__(14);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__functor__ = __webpack_require__(15);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__applicative__ = __webpack_require__(4);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__applicative__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__monad__ = __webpack_require__(5);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_4__monad__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__monad__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__maybe__ = __webpack_require__(16);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__foldable__ = __webpack_require__(10);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__traversable__ = __webpack_require__(17);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__either__ = __webpack_require__(11);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__conslist__ = __webpack_require__(26);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__infinitelist__ = __webpack_require__(27);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__io__ = __webpack_require__(28);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_11__io__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__writer__ = __webpack_require__(30);
/* unused harmony namespace reexport */





// Note: Maybe must be exported before foldable so that circular
// dependencies between foldable and maybe are resolved correctly








//# sourceMappingURL=index.js.map

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Future; });
/* harmony export (immutable) */ __webpack_exports__["e"] = sinkFuture;
/* harmony export (immutable) */ __webpack_exports__["d"] = fromPromise;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__funkia_jabz__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__linkedlist__ = __webpack_require__(7);




/**
 * A future is a thing that occurs at some point in time with a value.
 * It can be understood as a pair consisting of the time the future
 * occurs and its associated value. It is quite like a JavaScript
 * promise.
 */
let Future = class Future extends __WEBPACK_IMPORTED_MODULE_2__common__["d" /* Reactive */] {
    constructor() {
        super();
        this.multi = false;
    }
    resolve(val) {
        this.deactivate(true);
        this.value = val;
        if (this.child !== undefined) {
            this.child.push(val);
        }
    }
    addListener(c) {
        if (this.state === 4 /* Done */) {
            c.push(this.value);
            return 4 /* Done */;
        }
        else {
            return super.addListener(c);
        }
    }
    combine(future) {
        return new CombineFuture(this, future);
    }
    // A future is a functor, when the future occurs we can feed its
    // result through the mapping function
    map(f) {
        return new MapFuture(f, this);
    }
    mapTo(b) {
        return new MapToFuture(b, this);
    }
    // A future is an applicative. `of` gives a future that has always
    // occurred at all points in time.
    static of(b) {
        return new OfFuture(b);
    }
    of(b) {
        return new OfFuture(b);
    }
    lift(f, ...args) {
        return f.length === 1 ? new MapFuture(f, args[0])
            : new LiftFuture(f, args);
    }
    // A future is a monad. Once the first future occurs `chain` passes
    // its value through the chain function and the future it returns is
    // the one returned by `chain`.
    chain(f) {
        return new ChainFuture(f, this);
    }
};
Future = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __WEBPACK_IMPORTED_MODULE_1__funkia_jabz__["c" /* monad */]
], Future);

class CombineFuture extends Future {
    constructor(future1, future2) {
        super();
        this.future1 = future1;
        this.future2 = future2;
        this.parents = Object(__WEBPACK_IMPORTED_MODULE_3__linkedlist__["a" /* cons */])(future1, Object(__WEBPACK_IMPORTED_MODULE_3__linkedlist__["a" /* cons */])(future2));
    }
    push(val) {
        this.resolve(val);
    }
}
class MapFuture extends Future {
    constructor(f, parent) {
        super();
        this.f = f;
        this.parents = Object(__WEBPACK_IMPORTED_MODULE_3__linkedlist__["a" /* cons */])(parent);
    }
    push(val) {
        this.resolve(this.f(val));
    }
}
class MapToFuture extends Future {
    constructor(value, parent) {
        super();
        this.value = value;
        this.parents = Object(__WEBPACK_IMPORTED_MODULE_3__linkedlist__["a" /* cons */])(parent);
    }
    push(_) {
        this.resolve(this.value);
    }
}
class OfFuture extends Future {
    constructor(value) {
        super();
        this.value = value;
        this.state = 4 /* Done */;
    }
    /* istanbul ignore next */
    push(_) {
        throw new Error("A PureFuture should never be pushed to.");
    }
}
class LiftFuture extends Future {
    constructor(f, futures) {
        super();
        this.f = f;
        this.futures = futures;
        this.missing = futures.length;
        this.parents = Object(__WEBPACK_IMPORTED_MODULE_3__linkedlist__["b" /* fromArray */])(futures);
    }
    push(_) {
        if (--this.missing === 0) {
            // All the dependencies have occurred.
            for (let i = 0; i < this.futures.length; ++i) {
                this.futures[i] = this.futures[i].value;
            }
            this.resolve(this.f.apply(undefined, this.futures));
        }
    }
}
class ChainFuture extends Future {
    constructor(f, parent) {
        super();
        this.f = f;
        this.parent = parent;
        this.parentOccurred = false;
        this.parents = Object(__WEBPACK_IMPORTED_MODULE_3__linkedlist__["a" /* cons */])(parent);
    }
    push(val) {
        if (this.parentOccurred === false) {
            // The first future occurred. We can now call `f` with its value
            // and listen to the future it returns.
            this.parentOccurred = true;
            const newFuture = this.f(val);
            newFuture.addListener(this);
        }
        else {
            this.resolve(val);
        }
    }
}
/**
 * A Sink is a producer that one can imperatively resolve.
 * @private
 */
class SinkFuture extends Future {
    /* istanbul ignore next */
    push(val) {
        throw new Error("A sink should not be pushed to.");
    }
    activate() { }
    deactivate() { }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = SinkFuture;

function sinkFuture() {
    return new SinkFuture();
}
function fromPromise(p) {
    const future = sinkFuture();
    p.then(future.resolve.bind(future));
    return future;
}
/**
 * Create a future from a pushing behavior. The future occurs when the
 * behavior pushes its next value. Constructing a BehaviorFuture is
 * impure and should not be done directly.
 * @private
 */
class BehaviorFuture extends SinkFuture {
    constructor(b) {
        super();
        this.b = b;
        b.addListener(this);
    }
    /* istanbul ignore next */
    changeStateDown() {
        throw new Error("Behavior future does not support pushing behavior");
    }
    push(a) {
        this.b.removeListener(this);
        this.resolve(a);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BehaviorFuture;

//# sourceMappingURL=future.js.map

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = foldable;
/* unused harmony export foldMap */
/* unused harmony export foldr */
/* unused harmony export foldl */
/* unused harmony export size */
/* unused harmony export isEmpty */
/* unused harmony export take */
/* unused harmony export find */
/* unused harmony export findLast */
/* unused harmony export findIndex */
/* unused harmony export findLastIndex */
/* unused harmony export shortFoldl */
/* unused harmony export all */
/* unused harmony export any */
/* unused harmony export toArray */
/* unused harmony export sequence_ */
/* unused harmony export foldrM */
/* unused harmony export maximum */
/* unused harmony export minimum */
/* unused harmony export sum */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__applicative__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__maybe__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__either__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(0);




function incr(_, acc) {
    return acc + 1;
}
class AbstractFoldable {
    foldl(f, init) {
        return this.foldr((a, r) => (acc) => r(f(acc, a)), __WEBPACK_IMPORTED_MODULE_3__utils__["j" /* id */])(init);
    }
    shortFoldr(f, acc) {
        return Object(__WEBPACK_IMPORTED_MODULE_2__either__["a" /* fromEither */])(this.foldr((a, eb) => (Object(__WEBPACK_IMPORTED_MODULE_2__either__["b" /* isRight */])(eb) ? f(a, Object(__WEBPACK_IMPORTED_MODULE_2__either__["a" /* fromEither */])(eb)) : eb), Object(__WEBPACK_IMPORTED_MODULE_2__either__["d" /* right */])(acc)));
    }
    shortFoldl(f, acc) {
        return Object(__WEBPACK_IMPORTED_MODULE_2__either__["a" /* fromEither */])(this.foldl((eb, a) => (Object(__WEBPACK_IMPORTED_MODULE_2__either__["b" /* isRight */])(eb) ? f(Object(__WEBPACK_IMPORTED_MODULE_2__either__["a" /* fromEither */])(eb), a) : eb), Object(__WEBPACK_IMPORTED_MODULE_2__either__["d" /* right */])(acc)));
    }
    size() {
        return this.foldr(incr, 0);
    }
    maximum() {
        return this.foldr(Math.max, -Infinity);
    }
    minimum() {
        return this.foldr(Math.min, Infinity);
    }
    sum() {
        return this.foldr(__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* add */], 0);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AbstractFoldable;

function foldable(constructor) {
    const p = constructor.prototype;
    if (!("foldr" in p)) {
        throw new TypeError("Can't derive foldable. `foldr` method missing.");
    }
    Object(__WEBPACK_IMPORTED_MODULE_3__utils__["l" /* mixin */])(constructor, [AbstractFoldable]);
}
function foldMap(f, a) {
    return foldr((a, b) => f.create(a).combine(b), f.identity(), a);
}
function foldr(f, init, a) {
    if (a instanceof Array) {
        for (let i = a.length - 1; 0 <= i; --i) {
            init = f(a[i], init);
        }
        return init;
    }
    else {
        return a.foldr(f, init);
    }
}
function foldl(f, init, a) {
    if (a instanceof Array) {
        for (let i = 0; i < a.length; ++i) {
            init = f(init, a[i]);
        }
        return init;
    }
    else {
        return a.foldl(f, init);
    }
}
function size(a) {
    if (a instanceof Array) {
        return a.length;
    }
    else {
        return a.size();
    }
}
function isEmpty(a) {
    if (a instanceof Array) {
        return a.length === 0;
    }
    else {
        return a.shortFoldl((_, a) => Object(__WEBPACK_IMPORTED_MODULE_2__either__["c" /* left */])(false), true);
    }
}
function take(n, t) {
    const list = [];
    if (n === 0) {
        return list;
    }
    else {
        return t.shortFoldl((list, a) => {
            list.push(a);
            return (list.length === n ? __WEBPACK_IMPORTED_MODULE_2__either__["c" /* left */] : __WEBPACK_IMPORTED_MODULE_2__either__["d" /* right */])(list);
        }, list);
    }
}
function find(f, t) {
    return t.shortFoldl((acc, a) => (f(a) ? Object(__WEBPACK_IMPORTED_MODULE_2__either__["c" /* left */])(Object(__WEBPACK_IMPORTED_MODULE_1__maybe__["a" /* just */])(a)) : Object(__WEBPACK_IMPORTED_MODULE_2__either__["d" /* right */])(acc)), __WEBPACK_IMPORTED_MODULE_1__maybe__["b" /* nothing */]);
}
function findLast(f, t) {
    return t.shortFoldr((a, acc) => (f(a) ? Object(__WEBPACK_IMPORTED_MODULE_2__either__["c" /* left */])(Object(__WEBPACK_IMPORTED_MODULE_1__maybe__["a" /* just */])(a)) : Object(__WEBPACK_IMPORTED_MODULE_2__either__["d" /* right */])(acc)), __WEBPACK_IMPORTED_MODULE_1__maybe__["b" /* nothing */]);
}
function findIndex(f, t) {
    const idx = t.shortFoldl((idx, a) => (f(a) ? Object(__WEBPACK_IMPORTED_MODULE_2__either__["c" /* left */])(-idx) : Object(__WEBPACK_IMPORTED_MODULE_2__either__["d" /* right */])(idx - 1)), 0);
    return idx >= 0 ? Object(__WEBPACK_IMPORTED_MODULE_1__maybe__["a" /* just */])(idx) : __WEBPACK_IMPORTED_MODULE_1__maybe__["b" /* nothing */];
}
function findLastIndex(f, t) {
    const idx = t.shortFoldr((a, idx) => (f(a) ? Object(__WEBPACK_IMPORTED_MODULE_2__either__["c" /* left */])(-idx) : Object(__WEBPACK_IMPORTED_MODULE_2__either__["d" /* right */])(idx - 1)), -1);
    return idx >= 0 ? Object(__WEBPACK_IMPORTED_MODULE_1__maybe__["a" /* just */])(t.size() - idx) : __WEBPACK_IMPORTED_MODULE_1__maybe__["b" /* nothing */];
}
function shortFoldl(f, acc, l) {
    return l.shortFoldl(f, acc);
}
function all(pred, foldable) {
    return shortFoldl((_, val) => (pred(val) === true ? Object(__WEBPACK_IMPORTED_MODULE_2__either__["d" /* right */])(true) : Object(__WEBPACK_IMPORTED_MODULE_2__either__["c" /* left */])(false)), true, foldable);
}
function any(pred, foldable) {
    return shortFoldl((_, val) => (pred(val) === true ? Object(__WEBPACK_IMPORTED_MODULE_2__either__["c" /* left */])(true) : Object(__WEBPACK_IMPORTED_MODULE_2__either__["d" /* right */])(false)), false, foldable);
}
function toArray(t) {
    if (Array.isArray(t)) {
        return t;
    }
    else {
        return t.foldl(__WEBPACK_IMPORTED_MODULE_3__utils__["k" /* impurePush */], []);
    }
}
function sequence_(d, t) {
    return foldr(__WEBPACK_IMPORTED_MODULE_0__applicative__["d" /* seq */], Object(__WEBPACK_IMPORTED_MODULE_0__applicative__["c" /* of */])(d, undefined), t);
}
function foldrM(f, mb, t) {
    return foldr((a, mb) => mb.chain(b => f(a, b)), mb, t);
}
function maximum(t) {
    return t.maximum();
}
function minimum(t) {
    return t.minimum();
}
function sum(t) {
    return t.sum();
}
//# sourceMappingURL=foldable.js.map

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export EitherTag */
/* harmony export (immutable) */ __webpack_exports__["c"] = left;
/* harmony export (immutable) */ __webpack_exports__["d"] = right;
/* unused harmony export isLeft */
/* harmony export (immutable) */ __webpack_exports__["b"] = isRight;
/* harmony export (immutable) */ __webpack_exports__["a"] = fromEither;
var EitherTag;
(function (EitherTag) {
    EitherTag[EitherTag["Left"] = 0] = "Left";
    EitherTag[EitherTag["Right"] = 1] = "Right";
})(EitherTag || (EitherTag = {}));
class Either {
    static of(b) {
        return new Right(b);
    }
    of(b) {
        return new Right(b);
    }
    ap(a) {
        if (a.tag === EitherTag.Left) {
            return a;
        }
        else {
            return this.map(a.val);
        }
    }
    lift(f, ...args) {
        for (let i = 0; i < args.length; i++) {
            if (args[i].tag === EitherTag.Left) {
                return args[i];
            }
        }
        let rights = [];
        for (let i = 0; i < args.length; i++) {
            rights.push(args[i].val);
        }
        return new Right(f(...rights));
    }
}
/* unused harmony export Either */

class Left extends Either {
    constructor(a) {
        super();
        this.tag = EitherTag.Left;
        this.val = a;
    }
    match(m) {
        return m.left(this.val);
    }
    map(f) {
        // return this as Left<A, C>;
        return new Left(this.val);
    }
    mapTo(c) {
        return new Left(this.val);
    }
}
/* unused harmony export Left */

class Right extends Either {
    constructor(b) {
        super();
        this.tag = EitherTag.Right;
        this.val = b;
    }
    match(m) {
        return m.right(this.val);
    }
    map(f) {
        // return this as Left<A, C>;
        return new Right(f(this.val));
    }
    mapTo(c) {
        return new Right(c);
    }
}
/* unused harmony export Right */

function left(a) {
    return new Left(a);
}
function right(b) {
    return new Right(b);
}
function isLeft(a) {
    return a.tag === EitherTag.Left;
}
function isRight(a) {
    return a.tag === EitherTag.Right;
}
function fromEither(e) {
    return e.val;
}
//# sourceMappingURL=either.js.map

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["map"] = map;
/* harmony export (immutable) */ __webpack_exports__["publish"] = publish;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(6);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PushOnlyObserver", function() { return __WEBPACK_IMPORTED_MODULE_0__common__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MultiObserver", function() { return __WEBPACK_IMPORTED_MODULE_0__common__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "addListenerParents", function() { return __WEBPACK_IMPORTED_MODULE_0__common__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "removeListenerParents", function() { return __WEBPACK_IMPORTED_MODULE_0__common__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "changePullersParents", function() { return __WEBPACK_IMPORTED_MODULE_0__common__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Reactive", function() { return __WEBPACK_IMPORTED_MODULE_0__common__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CbObserver", function() { return __WEBPACK_IMPORTED_MODULE_0__common__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "observe", function() { return __WEBPACK_IMPORTED_MODULE_0__common__["g"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__behavior__ = __webpack_require__(2);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Behavior", function() { return __WEBPACK_IMPORTED_MODULE_1__behavior__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "isBehavior", function() { return __WEBPACK_IMPORTED_MODULE_1__behavior__["l"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ProducerBehavior", function() { return __WEBPACK_IMPORTED_MODULE_1__behavior__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "producerBehavior", function() { return __WEBPACK_IMPORTED_MODULE_1__behavior__["n"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SinkBehavior", function() { return __WEBPACK_IMPORTED_MODULE_1__behavior__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "sinkBehavior", function() { return __WEBPACK_IMPORTED_MODULE_1__behavior__["q"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "at", function() { return __WEBPACK_IMPORTED_MODULE_1__behavior__["j"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MapBehavior", function() { return __WEBPACK_IMPORTED_MODULE_1__behavior__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ap", function() { return __WEBPACK_IMPORTED_MODULE_1__behavior__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "when", function() { return __WEBPACK_IMPORTED_MODULE_1__behavior__["x"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "snapshotAt", function() { return __WEBPACK_IMPORTED_MODULE_1__behavior__["r"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ActiveBehavior", function() { return __WEBPACK_IMPORTED_MODULE_1__behavior__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "StatefulBehavior", function() { return __WEBPACK_IMPORTED_MODULE_1__behavior__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ConstantBehavior", function() { return __WEBPACK_IMPORTED_MODULE_1__behavior__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FunctionBehavior", function() { return __WEBPACK_IMPORTED_MODULE_1__behavior__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "fromFunction", function() { return __WEBPACK_IMPORTED_MODULE_1__behavior__["k"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "switchTo", function() { return __WEBPACK_IMPORTED_MODULE_1__behavior__["t"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "switcher", function() { return __WEBPACK_IMPORTED_MODULE_1__behavior__["u"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "testBehavior", function() { return __WEBPACK_IMPORTED_MODULE_1__behavior__["v"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "scan", function() { return __WEBPACK_IMPORTED_MODULE_1__behavior__["o"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "scanCombine", function() { return __WEBPACK_IMPORTED_MODULE_1__behavior__["p"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "stepper", function() { return __WEBPACK_IMPORTED_MODULE_1__behavior__["s"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "toggle", function() { return __WEBPACK_IMPORTED_MODULE_1__behavior__["w"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "moment", function() { return __WEBPACK_IMPORTED_MODULE_1__behavior__["m"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stream__ = __webpack_require__(3);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Stream", function() { return __WEBPACK_IMPORTED_MODULE_2__stream__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MapStream", function() { return __WEBPACK_IMPORTED_MODULE_2__stream__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MapToStream", function() { return __WEBPACK_IMPORTED_MODULE_2__stream__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "apply", function() { return __WEBPACK_IMPORTED_MODULE_2__stream__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "filter", function() { return __WEBPACK_IMPORTED_MODULE_2__stream__["k"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "split", function() { return __WEBPACK_IMPORTED_MODULE_2__stream__["t"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "filterApply", function() { return __WEBPACK_IMPORTED_MODULE_2__stream__["l"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "keepWhen", function() { return __WEBPACK_IMPORTED_MODULE_2__stream__["n"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ActiveStream", function() { return __WEBPACK_IMPORTED_MODULE_2__stream__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "empty", function() { return __WEBPACK_IMPORTED_MODULE_2__stream__["j"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "scanS", function() { return __WEBPACK_IMPORTED_MODULE_2__stream__["p"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "switchStream", function() { return __WEBPACK_IMPORTED_MODULE_2__stream__["v"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "changes", function() { return __WEBPACK_IMPORTED_MODULE_2__stream__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ProducerStream", function() { return __WEBPACK_IMPORTED_MODULE_2__stream__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "producerStream", function() { return __WEBPACK_IMPORTED_MODULE_2__stream__["o"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SinkStream", function() { return __WEBPACK_IMPORTED_MODULE_2__stream__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "sinkStream", function() { return __WEBPACK_IMPORTED_MODULE_2__stream__["q"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "subscribe", function() { return __WEBPACK_IMPORTED_MODULE_2__stream__["u"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "snapshot", function() { return __WEBPACK_IMPORTED_MODULE_2__stream__["r"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "snapshotWith", function() { return __WEBPACK_IMPORTED_MODULE_2__stream__["s"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "combine", function() { return __WEBPACK_IMPORTED_MODULE_2__stream__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "isStream", function() { return __WEBPACK_IMPORTED_MODULE_2__stream__["m"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__future__ = __webpack_require__(9);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Future", function() { return __WEBPACK_IMPORTED_MODULE_3__future__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SinkFuture", function() { return __WEBPACK_IMPORTED_MODULE_3__future__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "sinkFuture", function() { return __WEBPACK_IMPORTED_MODULE_3__future__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "fromPromise", function() { return __WEBPACK_IMPORTED_MODULE_3__future__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BehaviorFuture", function() { return __WEBPACK_IMPORTED_MODULE_3__future__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__now__ = __webpack_require__(31);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Now", function() { return __WEBPACK_IMPORTED_MODULE_4__now__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "sample", function() { return __WEBPACK_IMPORTED_MODULE_4__now__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "perform", function() { return __WEBPACK_IMPORTED_MODULE_4__now__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "performStream", function() { return __WEBPACK_IMPORTED_MODULE_4__now__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "performStreamLatest", function() { return __WEBPACK_IMPORTED_MODULE_4__now__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "performStreamOrdered", function() { return __WEBPACK_IMPORTED_MODULE_4__now__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "plan", function() { return __WEBPACK_IMPORTED_MODULE_4__now__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "runNow", function() { return __WEBPACK_IMPORTED_MODULE_4__now__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "testNow", function() { return __WEBPACK_IMPORTED_MODULE_4__now__["j"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "loopNow", function() { return __WEBPACK_IMPORTED_MODULE_4__now__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dom__ = __webpack_require__(32);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "streamFromEvent", function() { return __WEBPACK_IMPORTED_MODULE_5__dom__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "behaviorFromEvent", function() { return __WEBPACK_IMPORTED_MODULE_5__dom__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__time__ = __webpack_require__(33);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DelayStream", function() { return __WEBPACK_IMPORTED_MODULE_6__time__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "delay", function() { return __WEBPACK_IMPORTED_MODULE_6__time__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "throttle", function() { return __WEBPACK_IMPORTED_MODULE_6__time__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return __WEBPACK_IMPORTED_MODULE_6__time__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "time", function() { return __WEBPACK_IMPORTED_MODULE_6__time__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "timeFrom", function() { return __WEBPACK_IMPORTED_MODULE_6__time__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "integrate", function() { return __WEBPACK_IMPORTED_MODULE_6__time__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__placeholder__ = __webpack_require__(19);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Placeholder", function() { return __WEBPACK_IMPORTED_MODULE_7__placeholder__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "placeholder", function() { return __WEBPACK_IMPORTED_MODULE_7__placeholder__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__animation__ = __webpack_require__(34);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "transitionBehavior", function() { return __WEBPACK_IMPORTED_MODULE_8__animation__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "interpolate", function() { return __WEBPACK_IMPORTED_MODULE_8__animation__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "capToRange", function() { return __WEBPACK_IMPORTED_MODULE_8__animation__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "linear", function() { return __WEBPACK_IMPORTED_MODULE_8__animation__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "easeIn", function() { return __WEBPACK_IMPORTED_MODULE_8__animation__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "easeOut", function() { return __WEBPACK_IMPORTED_MODULE_8__animation__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "easeInOut", function() { return __WEBPACK_IMPORTED_MODULE_8__animation__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__test__ = __webpack_require__(35);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "testStreamFromArray", function() { return __WEBPACK_IMPORTED_MODULE_9__test__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "testStreamFromObject", function() { return __WEBPACK_IMPORTED_MODULE_9__test__["b"]; });










function map(fn, b) {
    return b.map(fn);
}
function publish(a, stream) {
    stream.push(a);
}
//# sourceMappingURL=index.js.map

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = combine;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);

function combineTwo(a, b) {
    return a.combine(b);
}
function combine(...a) {
    if (Array.isArray(a[0])) {
        return Object(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* arrayFlatten */])(a);
    }
    else if (typeof a[0] === "string") {
        return a.join("");
    }
    else {
        return Object(__WEBPACK_IMPORTED_MODULE_0__utils__["i" /* foldlArray1 */])(combineTwo, a);
    }
}
//# sourceMappingURL=semigroup.js.map

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = identity;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__semigroup__ = __webpack_require__(13);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__semigroup__["a"]; });

function identity(m) {
    if (m === Array) {
        return [];
    }
    else if (m === String) {
        return "";
    }
    else {
        return m.identity();
    }
}

//# sourceMappingURL=monoid.js.map

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export functor */
/* unused harmony export map */
/* harmony export (immutable) */ __webpack_exports__["b"] = mapTo;
/* unused harmony export mapMap */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);

function arrayMap(f, as) {
    let newArr = [];
    for (const a of as) {
        newArr.push(f(a));
    }
    return newArr;
}
function repeat(a, length) {
    let newArr = [];
    for (let i = 0; i < length; ++i) {
        newArr.push(a);
    }
    return newArr;
}
class AbstractFunctor {
    mapTo(b) {
        return this.map((_) => b);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AbstractFunctor;

function functor(constructor) {
    if (!("map" in constructor.prototype)) {
        throw new TypeError("Can't derive functor. `map` method missing.");
    }
    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["l" /* mixin */])(constructor, [AbstractFunctor]);
}
function map(f, functor) {
    if (Array.isArray(functor)) {
        return arrayMap(f, functor);
    }
    else {
        return functor.map(f);
    }
}
function mapTo(b, functor) {
    if (Array.isArray(functor)) {
        return repeat(b, functor.length);
    }
    else {
        return functor.mapTo(b);
    }
}
function mapMap(f, functor) {
    return map((fa) => map(f, fa), functor);
}
//# sourceMappingURL=functor.js.map

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = just;
/* unused harmony export isNothing */
/* unused harmony export isJust */
/* unused harmony export fromMaybe */
/* unused harmony export maybe */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foldable__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);



class Maybe {
    constructor() {
        this.multi = false;
    }
    of(v) {
        return just(v);
    }
    static of(v) {
        return just(v);
    }
    static is(a) {
        return typeof a === "object" && a.isMaybe === true;
    }
    flatten() {
        return this.match({
            nothing: () => nothing,
            just: __WEBPACK_IMPORTED_MODULE_2__utils__["j" /* id */]
        });
    }
    lift() {
        const f = arguments[0];
        for (let i = 1; i < arguments.length; ++i) {
            if (isNothing(arguments[i])) {
                return nothing;
            }
        }
        switch (arguments.length - 1) {
            case 1:
                return just(f(arguments[1].val));
            case 2:
                return just(f(arguments[1].val, arguments[2].val));
            case 3:
                return just(f(arguments[1].val, arguments[2].val, arguments[3].val));
        }
    }
    sequence(a, m) {
        return m.match({
            nothing: () => a.of(nothing),
            just: v => v.map(just)
        });
    }
}
/* unused harmony export Maybe */

Maybe.multi = false;
let Nothing = class Nothing extends Maybe {
    constructor() {
        super();
        this.isMaybe = true;
    }
    match(m) {
        return m.nothing();
    }
    chain(f) {
        return nothing;
    }
    map(f) {
        return nothing;
    }
    mapTo(b) {
        return nothing;
    }
    ap(a) {
        return nothing;
    }
    foldr(f, init) {
        return init;
    }
    foldl(f, init) {
        return init;
    }
    size() {
        return 0;
    }
    traverse(a, f) {
        return a.of(nothing);
    }
};
Nothing = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __WEBPACK_IMPORTED_MODULE_1__foldable__["b" /* foldable */]
], Nothing);
let Just = Just_1 = class Just extends Maybe {
    constructor(val) {
        super();
        this.isMaybe = true;
        this.val = val;
    }
    match(m) {
        return m.just(this.val);
    }
    chain(f) {
        return f(this.val);
    }
    map(f) {
        return new Just_1(f(this.val));
    }
    mapTo(b) {
        return new Just_1(b);
    }
    ap(m) {
        return m.match({
            nothing: () => nothing,
            just: f => new Just_1(f(this.val))
        });
    }
    foldr(f, init) {
        return f(this.val, init);
    }
    foldl(f, init) {
        return f(init, this.val);
    }
    size() {
        return 1;
    }
    traverse(a, f) {
        return f(this.val).map(just);
    }
};
Just = Just_1 = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __WEBPACK_IMPORTED_MODULE_1__foldable__["b" /* foldable */]
], Just);
function just(v) {
    return new Just(v);
}
const nothing = new Nothing();
/* harmony export (immutable) */ __webpack_exports__["b"] = nothing;

function isNothing(m) {
    return m === nothing;
}
function isJust(m) {
    return m !== nothing;
}
function fromMaybe(a, m) {
    return m === nothing ? a : m.val;
}
function maybe(b, f, m) {
    return m === nothing ? b : f(m.val);
}
var Just_1;
//# sourceMappingURL=maybe.js.map

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = traversable;
/* unused harmony export sequence */
/* unused harmony export traverse */
/* unused harmony export mapAccumR */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__foldable__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__applicative__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__identity__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__monoids_endo__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__const__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__(0);






class AbstractTraversable extends __WEBPACK_IMPORTED_MODULE_0__foldable__["a" /* AbstractFoldable */] {
    map(f) {
        return this.traverse(__WEBPACK_IMPORTED_MODULE_2__identity__["a" /* default */], (a) => __WEBPACK_IMPORTED_MODULE_2__identity__["a" /* default */].of(f(a))).extract();
    }
    mapTo(b) {
        return this.map((_) => b);
    }
    traverse(a, f) {
        return this.sequence(a, this.map(f));
    }
    sequence(a, t) {
        return t.traverse(a, __WEBPACK_IMPORTED_MODULE_5__utils__["j" /* id */]);
    }
    foldr(f, acc) {
        const f2 = (a) => new __WEBPACK_IMPORTED_MODULE_4__const__["a" /* ConstEndo */](new __WEBPACK_IMPORTED_MODULE_3__monoids_endo__["a" /* default */]((b) => f(a, b)));
        return __WEBPACK_IMPORTED_MODULE_3__monoids_endo__["a" /* default */].toFunction(this.traverse(__WEBPACK_IMPORTED_MODULE_4__const__["a" /* ConstEndo */], f2).get())(acc);
    }
}
/* unused harmony export AbstractTraversable */

function traversable(constructor) {
    const p = constructor.prototype;
    if (!("map" in p && "sequence" in p) && !("traverse" in p)) {
        throw new TypeError("Can't derive traversable. Either `traverse` or `map` and `sequence` must be defined.");
    }
    Object(__WEBPACK_IMPORTED_MODULE_5__utils__["l" /* mixin */])(constructor, [AbstractTraversable, __WEBPACK_IMPORTED_MODULE_0__foldable__["a" /* AbstractFoldable */]]);
}
function arraySequence(a, t) {
    let result = a.of([]);
    const lift = result.lift;
    for (let i = t.length - 1; i >= 0; --i) {
        result = lift(__WEBPACK_IMPORTED_MODULE_5__utils__["e" /* cons */], t[i], result);
    }
    return result;
}
function arrayTraverse(a, f, t) {
    let result = a.of([]);
    const lift = result.lift;
    for (let i = t.length - 1; i >= 0; --i) {
        result = lift(__WEBPACK_IMPORTED_MODULE_5__utils__["e" /* cons */], f(t[i]), result);
    }
    return result;
}
function sequence(a, t) {
    if (t instanceof Array) {
        return arraySequence(a, t);
    }
    else {
        return t.sequence(a, t);
    }
}
function traverse(a, f, t) {
    if (t instanceof Array) {
        return arrayTraverse(a, f, t);
    }
    else {
        return t.traverse(a, f);
    }
}
class AnApplicative extends __WEBPACK_IMPORTED_MODULE_1__applicative__["a" /* AbstractApplicative */] {
    constructor(f) {
        super();
        this.f = f;
    }
    of(b) {
        return new AnApplicative((a) => [a, b]);
    }
    static of(b) {
        return new AnApplicative((a) => [a, b]);
    }
    ap(fa) {
        return new AnApplicative((a) => {
            const [a1, b] = this.f(a);
            const [a2, f] = fa.f(a1);
            return [a2, f(b)];
        });
    }
    run(a) {
        return this.f(a);
    }
}
function mapAccumR(f, init, t) {
    return t.traverse(AnApplicative, (a) => new AnApplicative((c) => f(c, a))).run(init);
}
//# sourceMappingURL=traversable.js.map

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);

class Endo {
    constructor(fn) {
        this.fn = fn;
    }
    static identity() {
        return endoId;
    }
    identity() {
        return endoId;
    }
    combine(e) {
        return new Endo(Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* compose */])(this.fn, e.fn));
    }
    static create(f) {
        return new Endo(f);
    }
    static toFunction(e) {
        return e.fn;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Endo;

const endoId = new Endo(x => x);
//# sourceMappingURL=endo.js.map

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = placeholder;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__behavior__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stream__ = __webpack_require__(3);


class SamplePlaceholderError {
    constructor(placeholder) {
        this.placeholder = placeholder;
        this.message = "Attempt to sample non-replaced placeholder";
    }
    toString() {
        return this.message;
    }
}
class Placeholder extends __WEBPACK_IMPORTED_MODULE_0__behavior__["b" /* Behavior */] {
    replaceWith(parent) {
        this.source = parent;
        if (this.child !== undefined) {
            this.activate();
            if (Object(__WEBPACK_IMPORTED_MODULE_0__behavior__["l" /* isBehavior */])(parent) && this.state === 0 /* Push */) {
                this.push(parent.at());
            }
        }
        if (Object(__WEBPACK_IMPORTED_MODULE_0__behavior__["l" /* isBehavior */])(parent)) {
            parent.changePullers(this.nrOfPullers);
        }
    }
    push(a) {
        this.last = a;
        this.child.push(a);
    }
    pull() {
        if (this.source === undefined) {
            throw new SamplePlaceholderError(this);
        }
        return this.source.pull();
    }
    activate() {
        if (this.source !== undefined) {
            this.source.addListener(this);
            this.state = this.source.state;
            this.changeStateDown(this.state);
        }
    }
    deactivate(done = false) {
        this.state = 3 /* Inactive */;
        if (this.source !== undefined) {
            this.source.removeListener(this);
        }
    }
    changePullers(n) {
        this.nrOfPullers += n;
        if (this.source !== undefined) {
            this.source.changePullers(n);
        }
    }
    map(fn) {
        return new MapPlaceholder(this, fn);
    }
    mapTo(b) {
        return (new MapToPlaceholder(this, b));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Placeholder;

class MapPlaceholder extends __WEBPACK_IMPORTED_MODULE_0__behavior__["e" /* MapBehavior */] {
}
class MapToPlaceholder extends __WEBPACK_IMPORTED_MODULE_1__stream__["c" /* MapToStream */] {
}
function install(target, source) {
    for (const key of Object.getOwnPropertyNames(source.prototype)) {
        if (target.prototype[key] === undefined) {
            target.prototype[key] = source.prototype[key];
        }
    }
}
function installMethods() {
    install(Placeholder, __WEBPACK_IMPORTED_MODULE_1__stream__["f" /* Stream */]);
    MapPlaceholder.prototype.map = Placeholder.prototype.map;
    MapPlaceholder.prototype.mapTo = Placeholder.prototype.mapTo;
    MapToPlaceholder.prototype.map = Placeholder.prototype.map;
    MapToPlaceholder.prototype.mapTo = Placeholder.prototype.mapTo;
    install(MapPlaceholder, __WEBPACK_IMPORTED_MODULE_1__stream__["f" /* Stream */]);
    install(MapToPlaceholder, __WEBPACK_IMPORTED_MODULE_0__behavior__["b" /* Behavior */]);
}
function placeholder() {
    if (Placeholder.prototype.scanS === undefined) {
        // The methods are installed lazily when the placeholder is first
        // used. This avoids a top-level impure expression that would
        // prevent tree-shaking.
        installMethods();
    }
    return new Placeholder();
}
//# sourceMappingURL=placeholder.js.map

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = vnode;
function vnode(sel, data, children, text, elm) {
    var key = data === undefined ? undefined : data.key;
    return { sel: sel, data: data, children: children,
        text: text, elm: elm, key: key };
}
/* harmony default export */ __webpack_exports__["a"] = (vnode);
//# sourceMappingURL=vnode.js.map

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return array; });
/* harmony export (immutable) */ __webpack_exports__["b"] = primitive;
var array = Array.isArray;
function primitive(s) {
    return typeof s === 'string' || typeof s === 'number';
}
//# sourceMappingURL=is.js.map

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = h;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vnode__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__is__ = __webpack_require__(21);


function addNS(data, children, sel) {
    data.ns = 'http://www.w3.org/2000/svg';
    if (sel !== 'foreignObject' && children !== undefined) {
        for (var i = 0; i < children.length; ++i) {
            var childData = children[i].data;
            if (childData !== undefined) {
                addNS(childData, children[i].children, children[i].sel);
            }
        }
    }
}
function h(sel, b, c) {
    var data = {}, children, text, i;
    if (c !== undefined) {
        data = b;
        if (__WEBPACK_IMPORTED_MODULE_1__is__["a" /* array */](c)) {
            children = c;
        }
        else if (__WEBPACK_IMPORTED_MODULE_1__is__["b" /* primitive */](c)) {
            text = c;
        }
        else if (c && c.sel) {
            children = [c];
        }
    }
    else if (b !== undefined) {
        if (__WEBPACK_IMPORTED_MODULE_1__is__["a" /* array */](b)) {
            children = b;
        }
        else if (__WEBPACK_IMPORTED_MODULE_1__is__["b" /* primitive */](b)) {
            text = b;
        }
        else if (b && b.sel) {
            children = [b];
        }
        else {
            data = b;
        }
    }
    if (__WEBPACK_IMPORTED_MODULE_1__is__["a" /* array */](children)) {
        for (i = 0; i < children.length; ++i) {
            if (__WEBPACK_IMPORTED_MODULE_1__is__["b" /* primitive */](children[i]))
                children[i] = Object(__WEBPACK_IMPORTED_MODULE_0__vnode__["b" /* vnode */])(undefined, undefined, undefined, children[i], undefined);
        }
    }
    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&
        (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {
        addNS(data, children, sel);
    }
    return Object(__WEBPACK_IMPORTED_MODULE_0__vnode__["b" /* vnode */])(sel, data, children, text, undefined);
}
;
/* unused harmony default export */ var _unused_webpack_default_export = (h);
//# sourceMappingURL=h.js.map

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hareactive_1 = __webpack_require__(12);
var snabbdom = __webpack_require__(36);
var snabClass = __webpack_require__(39);
var snabELs = __webpack_require__(40);
var snabAttrs = __webpack_require__(41);
var snabProps = __webpack_require__(42);
var h = snabbdom.h;
var patch = snabbdom.init([
    snabClass.default,
    snabELs.default,
    snabAttrs.default,
    snabProps.default,
]);
var root = document.body;
var three = Promise.resolve(3);
var f = hareactive_1.fromPromise(three);
hareactive_1.perform(console.log('hi'));
// runNow()
patch(root, h('div', 'oh hai'));


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__monad__ = __webpack_require__(5);


let Identity = Identity_1 = class Identity {
    constructor(val) {
        this.val = val;
        this.multi = false;
    }
    static of(a) {
        return new Identity_1(a);
    }
    of(a) {
        return new Identity_1(a);
    }
    ap(f) {
        return new Identity_1(f.val(this.val));
    }
    extract() {
        return this.val;
    }
    map(f) {
        return new Identity_1(f(this.val));
    }
    mapTo(b) {
        return this.of(b);
    }
    flatten() {
        return this.val;
    }
    chain(f) {
        return f(this.val);
    }
};
Identity.multi = false;
Identity = Identity_1 = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __WEBPACK_IMPORTED_MODULE_1__monad__["c" /* monad */]
], Identity);
/* harmony default export */ __webpack_exports__["a"] = (Identity);
var Identity_1;
//# sourceMappingURL=identity.js.map

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__applicative__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__monoids_endo__ = __webpack_require__(18);


class ConstEndo extends __WEBPACK_IMPORTED_MODULE_0__applicative__["a" /* AbstractApplicative */] {
    constructor(m) {
        super();
        this.m = m;
    }
    map(f) {
        return this;
    }
    static of(b) {
        return new ConstEndo(__WEBPACK_IMPORTED_MODULE_1__monoids_endo__["a" /* default */].identity());
    }
    of(b) {
        return new ConstEndo(__WEBPACK_IMPORTED_MODULE_1__monoids_endo__["a" /* default */].identity());
    }
    ap(a) {
        return new ConstEndo(a.m.combine(this.m));
    }
    get() {
        return this.m;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ConstEndo;

//# sourceMappingURL=const.js.map

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Cons */
/* unused harmony export cons */
/* unused harmony export fromArray */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__applicative__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__traversable__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__monad__ = __webpack_require__(5);




let Cons = class Cons {
    constructor(val, tail) {
        this.val = val;
        this.tail = tail;
    }
    combine(c) {
        return this === nil ? c : cons(this.val, this.tail.combine(c));
    }
    identity() {
        return nil;
    }
    of(b) {
        return cons(b, nil);
    }
    chain(f) {
        return this === nil ? nil : f(this.val).combine(this.tail.chain(f));
    }
    traverse(a, f) {
        return this === nil
            ? a.of(nil)
            : Object(__WEBPACK_IMPORTED_MODULE_1__applicative__["b" /* lift */])(cons, f(this.val), this.tail.traverse(a, f));
    }
};
Cons = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __WEBPACK_IMPORTED_MODULE_3__monad__["c" /* monad */],
    __WEBPACK_IMPORTED_MODULE_2__traversable__["a" /* traversable */]
], Cons);

const nil = new Cons(undefined, undefined);
/* unused harmony export nil */

function cons(a, as) {
    return new Cons(a, as);
}
function fromArray(as) {
    return as.length === 0 ? nil : cons(as[0], fromArray(as.slice(1)));
}
//# sourceMappingURL=conslist.js.map

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export repeat */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__either__ = __webpack_require__(11);


class InfiniteList {
    constructor(fn) {
        this.fn = fn;
    }
    map(f) {
        return new InfiniteList(Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* compose */])(f, this.fn));
    }
    mapTo(b) {
        return repeat(b);
    }
    of(b) {
        return repeat(b);
    }
    ap(a) {
        return new InfiniteList(i => a.fn(i)(this.fn(i)));
    }
    lift(...args) {
        return new InfiniteList(i => {
            const vals = [];
            for (let j = 1; j < args.length; ++j) {
                vals[j - 1] = args[j].fn(i);
            }
            return args[0].apply(undefined, vals);
        });
    }
    foldr(f, init) {
        throw new Error("Cannot perform strict foldr on infinite list");
    }
    foldl(f, init) {
        throw new Error("Cannot perform strict foldl on infinite list");
    }
    shortFoldr(f, init) {
        throw new Error("Cannot call shortFoldr on infinite list");
    }
    shortFoldl(f, init) {
        let acc = Object(__WEBPACK_IMPORTED_MODULE_1__either__["d" /* right */])(init);
        let idx = 0;
        while (Object(__WEBPACK_IMPORTED_MODULE_1__either__["b" /* isRight */])(acc)) {
            acc = f(Object(__WEBPACK_IMPORTED_MODULE_1__either__["a" /* fromEither */])(acc), this.fn(idx));
            idx++;
        }
        return Object(__WEBPACK_IMPORTED_MODULE_1__either__["a" /* fromEither */])(acc);
    }
    size() {
        return Infinity;
    }
    maximum() {
        return Infinity;
    }
    minimum() {
        return 0;
    }
    sum() {
        return Infinity;
    }
}
/* unused harmony export InfiniteList */

function repeat(a) {
    return new InfiniteList(_ => a);
}
const naturals = new InfiniteList(__WEBPACK_IMPORTED_MODULE_0__utils__["j" /* id */]);
/* unused harmony export naturals */

//# sourceMappingURL=infinitelist.js.map

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export withEffects */
/* unused harmony export withEffectsP */
/* unused harmony export call */
/* unused harmony export callP */
/* unused harmony export throwE */
/* unused harmony export catchE */
/* unused harmony export doRunIO */
/* harmony export (immutable) */ __webpack_exports__["a"] = runIO;
/* unused harmony export testIO */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__freer__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);


class Call {
    constructor(fn, args) {
        this.fn = fn;
        this.args = args;
        this.type = "call";
    }
}
/* unused harmony export Call */

class CallP {
    constructor(fn, args) {
        this.fn = fn;
        this.args = args;
        this.type = "callP";
    }
}
/* unused harmony export CallP */

class ThrowE {
    constructor(error) {
        this.error = error;
        this.type = "throwE";
    }
}
/* unused harmony export ThrowE */

class CatchE {
    constructor(handler, io) {
        this.handler = handler;
        this.io = io;
        this.type = "catchE";
    }
}
/* unused harmony export CatchE */

const IO = __WEBPACK_IMPORTED_MODULE_0__freer__["a" /* Freer */];
/* unused harmony export IO */

function withEffects(fn) {
    return (...args) => Object(__WEBPACK_IMPORTED_MODULE_0__freer__["b" /* liftF */])(new Call(fn, args));
}
function withEffectsP(fn) {
    return (...args) => Object(__WEBPACK_IMPORTED_MODULE_0__freer__["b" /* liftF */])(new CallP(fn, args));
}
function call(fn, ...args) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__freer__["b" /* liftF */])(new Call(fn, args));
}
function callP(fn, ...args) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__freer__["b" /* liftF */])(new CallP(fn, args));
}
function throwE(error) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__freer__["b" /* liftF */])(new ThrowE(error));
}
function catchE(errorHandler, io) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__freer__["b" /* liftF */])(new CatchE(errorHandler, io));
}
function doRunIO(e) {
    return e.match({
        pure: a => Promise.resolve(a),
        bind: (io, cont) => {
            switch (io.type) {
                case "call":
                    return runIO(cont(io.fn(...io.args)));
                case "callP":
                    return io.fn(...io.args).then((a) => runIO(cont(a)));
                case "catchE":
                    return doRunIO(io.io)
                        .then((a) => runIO(cont(a)))
                        .catch((err) => doRunIO(io.handler(err)));
                case "throwE":
                    return Promise.reject(io.error);
            }
        }
    });
}
function runIO(e) {
    return doRunIO(e);
}
function doTestIO(e, arr, ending, idx) {
    e.match({
        pure: a2 => {
            if (ending !== a2) {
                throw new Error(`Pure value invalid, expected ${ending} but saw ${a2}`);
            }
        },
        bind: (io, cont) => {
            const [{ val: io2 }, a] = arr[idx];
            if (!Object(__WEBPACK_IMPORTED_MODULE_1__utils__["h" /* deepEqual */])(io, io2)) {
                throw new Error(`Value invalid, expected ${io2} but saw ${io}`);
            }
            else {
                doTestIO(cont(a), arr, ending, idx + 1);
            }
        }
    });
}
function testIO(e, arr, a) {
    doTestIO(e, arr, a, 0);
}
//# sourceMappingURL=io.js.map

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Pure */
/* unused harmony export Bind */
/* harmony export (immutable) */ __webpack_exports__["b"] = liftF;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__monad__ = __webpack_require__(5);


class Freer extends __WEBPACK_IMPORTED_MODULE_1__monad__["a" /* AbstractMonad */] {
    static of(b) {
        return new Pure(b);
    }
    of(b) {
        return new Pure(b);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Freer;

Freer.multi = false;
let Pure = Pure_1 = class Pure extends Freer {
    constructor(a) {
        super();
        this.a = a;
    }
    match(m) {
        return m.pure(this.a);
    }
    map(f) {
        return new Pure_1(f(this.a));
    }
    chain(f) {
        return f(this.a);
    }
};
Pure = Pure_1 = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __WEBPACK_IMPORTED_MODULE_1__monad__["c" /* monad */]
], Pure);

function pure(a) {
    return new Pure(a);
}
let Bind = Bind_1 = class Bind extends Freer {
    constructor(val, f) {
        super();
        this.val = val;
        this.f = f;
    }
    match(m) {
        return m.bind(this.val, this.f);
    }
    map(f) {
        return new Bind_1(this.val, (a) => this.f(a).map(f));
    }
    chain(f) {
        return new Bind_1(this.val, (a) => this.f(a).chain(f));
    }
};
Bind = Bind_1 = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __WEBPACK_IMPORTED_MODULE_1__monad__["c" /* monad */]
], Bind);

function liftF(fa) {
    return new Bind(fa, pure);
}
var Pure_1, Bind_1;
//# sourceMappingURL=freer.js.map

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export runWriter */
/* unused harmony export createWriter */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__monoid__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__monad__ = __webpack_require__(5);


class Writer extends __WEBPACK_IMPORTED_MODULE_1__monad__["a" /* AbstractMonad */] {
    constructor(identity, state, value) {
        super();
        this.identity = identity;
        this.state = state;
        this.value = value;
        this.multi = false;
    }
    of(value) {
        return new Writer(this.identity, this.identity, value);
    }
    chain(f) {
        const { state, value } = f(this.value);
        return new Writer(this.identity, Object(__WEBPACK_IMPORTED_MODULE_0__monoid__["a" /* combine */])(this.state, state), value);
    }
}
/* unused harmony export Writer */

function runWriter(w) {
    return [w.state, w.value];
}
function createWriter(mc) {
    const identityElm = Object(__WEBPACK_IMPORTED_MODULE_0__monoid__["b" /* identity */])(mc);
    return {
        tell(w) {
            return new Writer(identityElm, w, {});
        },
        listen(m) {
            const value = [m.value, m.state];
            return new Writer(identityElm, m.state, value);
        },
        of(a) {
            return new Writer(identityElm, identityElm, a);
        },
        multi: false
    };
}
//# sourceMappingURL=writer.js.map

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Now; });
/* harmony export (immutable) */ __webpack_exports__["i"] = sample;
/* harmony export (immutable) */ __webpack_exports__["c"] = perform;
/* harmony export (immutable) */ __webpack_exports__["d"] = performStream;
/* harmony export (immutable) */ __webpack_exports__["e"] = performStreamLatest;
/* harmony export (immutable) */ __webpack_exports__["f"] = performStreamOrdered;
/* harmony export (immutable) */ __webpack_exports__["g"] = plan;
/* harmony export (immutable) */ __webpack_exports__["h"] = runNow;
/* harmony export (immutable) */ __webpack_exports__["j"] = testNow;
/* harmony export (immutable) */ __webpack_exports__["b"] = loopNow;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__funkia_jabz__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__placeholder__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__future__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__behavior__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__stream__ = __webpack_require__(3);






let Now = class Now {
    constructor() {
        this.multi = false;
        this.isNow = true;
    }
    static is(a) {
        return typeof a === "object" && a.isNow === true;
    }
    of(b) {
        return new OfNow(b);
    }
    static of(b) {
        return new OfNow(b);
    }
    chain(f) {
        return new ChainNow(this, f);
    }
    test(t) {
        throw new Error("The Now computation does not support testing yet");
    }
};
Now.multi = false;
Now = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __WEBPACK_IMPORTED_MODULE_1__funkia_jabz__["c" /* monad */]
], Now);

class OfNow extends Now {
    constructor(value) {
        super();
        this.value = value;
    }
    run() {
        return this.value;
    }
    test(_) {
        return this.value;
    }
}
class ChainNow extends Now {
    constructor(first, f) {
        super();
        this.first = first;
        this.f = f;
    }
    run() {
        return this.f(this.first.run()).run();
    }
    test(t) {
        return this.f(this.first.test(t)).test(t);
    }
}
class SampleNow extends Now {
    constructor(b) {
        super();
        this.b = b;
    }
    run() {
        return Object(__WEBPACK_IMPORTED_MODULE_4__behavior__["j" /* at */])(this.b);
    }
    test(t) {
        return this.b.semantic()(t);
    }
}
function sample(b) {
    return new SampleNow(b);
}
class PerformNow extends Now {
    constructor(comp) {
        super();
        this.comp = comp;
    }
    run() {
        return Object(__WEBPACK_IMPORTED_MODULE_3__future__["d" /* fromPromise */])(Object(__WEBPACK_IMPORTED_MODULE_1__funkia_jabz__["d" /* runIO */])(this.comp));
    }
}
function perform(comp) {
    return new PerformNow(comp);
}
class PerformIOStream extends __WEBPACK_IMPORTED_MODULE_5__stream__["a" /* ActiveStream */] {
    constructor(s) {
        super();
        s.addListener(this);
        this.state = 0 /* Push */;
    }
    push(io) {
        Object(__WEBPACK_IMPORTED_MODULE_1__funkia_jabz__["d" /* runIO */])(io).then((a) => {
            if (this.child !== undefined) {
                this.child.push(a);
            }
        });
    }
}
class PerformStreamNow extends Now {
    constructor(s) {
        super();
        this.s = s;
    }
    run() {
        return new PerformIOStream(this.s);
    }
}
function performStream(s) {
    return new PerformStreamNow(s);
}
class PerformIOStreamLatest extends __WEBPACK_IMPORTED_MODULE_5__stream__["a" /* ActiveStream */] {
    constructor(s) {
        super();
        this.next = 0;
        this.newest = 0;
        this.running = 0;
        s.addListener(this);
    }
    push(io) {
        const time = ++this.next;
        this.running++;
        Object(__WEBPACK_IMPORTED_MODULE_1__funkia_jabz__["d" /* runIO */])(io).then((a) => {
            this.running--;
            if (time > this.newest) {
                if (this.running === 0) {
                    this.next = 0;
                    this.newest = 0;
                }
                else {
                    this.newest = time;
                }
                if (this.child !== undefined) {
                    this.child.push(a);
                }
            }
        });
    }
}
class PerformStreamNowLatest extends Now {
    constructor(s) {
        super();
        this.s = s;
    }
    run() {
        return new PerformIOStreamLatest(this.s);
    }
}
function performStreamLatest(s) {
    return new PerformStreamNowLatest(s);
}
class PerformIOStreamOrdered extends __WEBPACK_IMPORTED_MODULE_5__stream__["a" /* ActiveStream */] {
    constructor(s) {
        super();
        this.nextId = 0;
        this.next = 0;
        this.buffer = []; // Object-wrapper to support a result as undefined
        s.addListener(this);
    }
    push(io) {
        const id = this.nextId++;
        Object(__WEBPACK_IMPORTED_MODULE_1__funkia_jabz__["d" /* runIO */])(io).then((a) => {
            if (id === this.next) {
                this.buffer[0] = { value: a };
                this.pushFromBuffer();
            }
            else {
                this.buffer[id - this.next] = { value: a };
            }
        });
    }
    pushFromBuffer() {
        while (this.buffer[0] !== undefined) {
            const { value } = this.buffer.shift();
            if (this.child !== undefined) {
                this.child.push(value);
            }
            this.next++;
        }
    }
}
class PerformStreamNowOrdered extends Now {
    constructor(s) {
        super();
        this.s = s;
    }
    run() {
        return new PerformIOStreamOrdered(this.s);
    }
}
function performStreamOrdered(s) {
    return new PerformStreamNowOrdered(s);
}
function run(now) {
    return now.run();
}
class PlanNow extends Now {
    constructor(future) {
        super();
        this.future = future;
    }
    run() {
        return this.future.map(run);
    }
}
function plan(future) {
    return new PlanNow(future);
}
function runNow(now) {
    return new Promise((resolve, reject) => {
        now.run().subscribe(resolve);
    });
}
/**
 * Test run a now computation without executing its side-effects.
 * @param now The now computation to test.
 * @param time The point in time at which the now computation should
 * be run. Defaults to 0.
 */
function testNow(now, time = 0) {
    return now.test(time);
}
const placeholderProxyHandler = {
    get: function (target, name) {
        if (!(name in target)) {
            target[name] = Object(__WEBPACK_IMPORTED_MODULE_2__placeholder__["b" /* placeholder */])();
        }
        return target[name];
    }
};
class LoopNow extends Now {
    constructor(fn, placeholderNames) {
        super();
        this.fn = fn;
        this.placeholderNames = placeholderNames;
    }
    run() {
        let placeholderObject;
        if (this.placeholderNames === undefined) {
            placeholderObject = new Proxy({}, placeholderProxyHandler);
        }
        else {
            placeholderObject = {};
            for (const name of this.placeholderNames) {
                placeholderObject[name] = Object(__WEBPACK_IMPORTED_MODULE_2__placeholder__["b" /* placeholder */])();
            }
        }
        const result = this.fn(placeholderObject).run();
        const returned = Object.keys(result);
        for (const name of returned) {
            placeholderObject[name].replaceWith(result[name]);
        }
        return result;
    }
}
function loopNow(fn, names) {
    return new LoopNow(fn, names);
}
//# sourceMappingURL=now.js.map

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = streamFromEvent;
/* harmony export (immutable) */ __webpack_exports__["a"] = behaviorFromEvent;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stream__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__behavior__ = __webpack_require__(2);


class DomEventStream extends __WEBPACK_IMPORTED_MODULE_0__stream__["d" /* ProducerStream */] {
    constructor(target, eventName, extractor) {
        super();
        this.target = target;
        this.eventName = eventName;
        this.extractor = extractor;
    }
    handleEvent(event) {
        this.push(this.extractor(event, this.target));
    }
    activate() {
        this.target.addEventListener(this.eventName, this);
    }
    deactivate() {
        this.target.removeEventListener(this.eventName, this);
    }
}
function id(a) {
    return a;
}
function streamFromEvent(target, eventName, extractor = id) {
    return new DomEventStream(target, eventName, extractor);
}
class DomEventBehavior extends __WEBPACK_IMPORTED_MODULE_1__behavior__["f" /* ProducerBehavior */] {
    constructor(target, eventName, initial, extractor) {
        super();
        this.target = target;
        this.eventName = eventName;
        this.extractor = extractor;
        this.last = initial;
    }
    handleEvent(event) {
        this.push(this.extractor(event, this.target));
    }
    activateProducer() {
        this.target.addEventListener(this.eventName, this);
    }
    deactivateProducer() {
        this.target.removeEventListener(this.eventName, this);
    }
}
function behaviorFromEvent(target, eventName, initial, extractor = id) {
    return new DomEventBehavior(target, eventName, initial, extractor);
}
//# sourceMappingURL=dom.js.map

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = delay;
/* harmony export (immutable) */ __webpack_exports__["e"] = throttle;
/* harmony export (immutable) */ __webpack_exports__["b"] = debounce;
/* harmony export (immutable) */ __webpack_exports__["d"] = integrate;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__linkedlist__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stream__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__behavior__ = __webpack_require__(2);



/*
 * Time related behaviors and functions
 */
class DelayStream extends __WEBPACK_IMPORTED_MODULE_1__stream__["f" /* Stream */] {
    constructor(parent, ms) {
        super();
        this.ms = ms;
        this.parents = Object(__WEBPACK_IMPORTED_MODULE_0__linkedlist__["a" /* cons */])(parent);
    }
    semantic() {
        const s = this.parents.value.semantic();
        return s.map(({ time, value }) => ({ time: time + this.ms, value }));
    }
    push(a) {
        setTimeout(() => this.child.push(a), this.ms);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DelayStream;

function delay(ms, stream) {
    return new DelayStream(stream, ms);
}
class ThrottleStream extends __WEBPACK_IMPORTED_MODULE_1__stream__["f" /* Stream */] {
    constructor(parent, ms) {
        super();
        this.ms = ms;
        this.isSilenced = false;
        this.parents = Object(__WEBPACK_IMPORTED_MODULE_0__linkedlist__["a" /* cons */])(parent);
    }
    push(a) {
        if (!this.isSilenced) {
            this.child.push(a);
            this.isSilenced = true;
            setTimeout(() => {
                this.isSilenced = false;
            }, this.ms);
        }
    }
}
function throttle(ms, stream) {
    return new ThrottleStream(stream, ms);
}
class DebounceStream extends __WEBPACK_IMPORTED_MODULE_1__stream__["f" /* Stream */] {
    constructor(parent, ms) {
        super();
        this.ms = ms;
        this.timer = undefined;
        this.parents = Object(__WEBPACK_IMPORTED_MODULE_0__linkedlist__["a" /* cons */])(parent);
    }
    push(a) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.child.push(a);
        }, this.ms);
    }
}
function debounce(ms, stream) {
    return new DebounceStream(stream, ms);
}
class TimeFromBehavior extends __WEBPACK_IMPORTED_MODULE_2__behavior__["b" /* Behavior */] {
    constructor() {
        super();
        this.startTime = Date.now();
        this.state = 1 /* Pull */;
    }
    pull() {
        return Date.now() - this.startTime;
    }
}
class TimeBehavior extends __WEBPACK_IMPORTED_MODULE_2__behavior__["d" /* FunctionBehavior */] {
    constructor() {
        super(Date.now);
    }
    semantic() {
        return (time) => time;
    }
}
/**
 * A behavior whose value is the number of milliseconds elapsed in
 * UNIX epoch. I.e. its current value is equal to the value got by
 * calling `Date.now`.
 */
const time = new TimeBehavior();
/* harmony export (immutable) */ __webpack_exports__["f"] = time;

/**
 * A behavior giving access to continuous time. When sampled the outer
 * behavior gives a behavior with values that contain the difference
 * between the current sample time and the time at which the outer
 * behavior was sampled.
 */
const timeFrom = Object(__WEBPACK_IMPORTED_MODULE_2__behavior__["k" /* fromFunction */])(() => new TimeFromBehavior());
/* harmony export (immutable) */ __webpack_exports__["g"] = timeFrom;

class IntegrateBehavior extends __WEBPACK_IMPORTED_MODULE_2__behavior__["b" /* Behavior */] {
    constructor(parent) {
        super();
        this.parent = parent;
        this.lastPullTime = Date.now();
        this.state = 1 /* Pull */;
        this.value = 0;
    }
    pull() {
        const currentPullTime = Date.now();
        const deltaSeconds = (currentPullTime - this.lastPullTime) / 1000;
        this.value += deltaSeconds * this.parent.at();
        this.lastPullTime = currentPullTime;
        return this.value;
    }
}
function integrate(behavior) {
    return Object(__WEBPACK_IMPORTED_MODULE_2__behavior__["k" /* fromFunction */])(() => new IntegrateBehavior(behavior));
}
//# sourceMappingURL=time.js.map

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["g"] = transitionBehavior;
/* harmony export (immutable) */ __webpack_exports__["e"] = interpolate;
/* harmony export (immutable) */ __webpack_exports__["a"] = capToRange;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__funkia_jabz__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1____ = __webpack_require__(12);


function transitionBehavior(config, initial, triggerStream, timeB = __WEBPACK_IMPORTED_MODULE_1____["time"]) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__funkia_jabz__["a" /* go */])(function* () {
        const rangeValueB = yield Object(__WEBPACK_IMPORTED_MODULE_1____["scan"])((newV, prev) => ({ from: prev.to, to: newV }), { from: initial, to: initial }, triggerStream);
        const initialStartTime = yield timeB;
        const startTimeB = yield Object(__WEBPACK_IMPORTED_MODULE_1____["stepper"])(initialStartTime, Object(__WEBPACK_IMPORTED_MODULE_1____["snapshot"])(timeB, triggerStream));
        const transition = Object(__WEBPACK_IMPORTED_MODULE_0__funkia_jabz__["b" /* lift */])((range, startTime, now) => {
            const endTime = startTime + config.duration;
            const scaled = interpolate(startTime, endTime, 0, 1, capToRange(startTime, endTime, now - config.delay));
            return interpolate(0, 1, range.from, range.to, config.timingFunction(scaled));
        }, rangeValueB, startTimeB, timeB);
        return transition;
    });
}
function interpolate(fromA, toA, fromB, toB, a) {
    if (a < fromA || a > toA) {
        throw `The number ${a} is not between the bounds [${fromA}, ${toA}]`;
    }
    const spanA = toA - fromA;
    const spanB = toB - fromB;
    const relationA = (a - fromA) / spanA;
    return relationA * spanB + fromB;
}
function capToRange(lower, upper, a) {
    return Math.min(Math.max(lower, a), upper);
}
const linear = t => t;
/* harmony export (immutable) */ __webpack_exports__["f"] = linear;

const easeIn = p => t => Math.pow(t, p);
/* harmony export (immutable) */ __webpack_exports__["b"] = easeIn;

const easeOut = p => t => 1 - (Math.pow((1 - t), p));
/* harmony export (immutable) */ __webpack_exports__["d"] = easeOut;

const easeInOut = p => t => (t < .5) ? easeIn(p)(t * 2) / 2
    : easeOut(p)(t * 2 - 1) / 2 + .5;
/* harmony export (immutable) */ __webpack_exports__["c"] = easeInOut;

//# sourceMappingURL=animation.js.map

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = testStreamFromArray;
/* harmony export (immutable) */ __webpack_exports__["b"] = testStreamFromObject;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stream__ = __webpack_require__(3);

class TestStream extends __WEBPACK_IMPORTED_MODULE_0__stream__["f" /* Stream */] {
    constructor(semanticStream) {
        super();
        this.semanticStream = semanticStream;
    }
    semantic() {
        return this.semanticStream;
    }
    /* istanbul ignore next */
    activate() {
        throw new Error("You cannot activate a TestStream");
    }
    /* istanbul ignore next */
    deactivate() {
        throw new Error("You cannot deactivate a TestStream");
    }
    /* istanbul ignore next */
    push(a) {
        throw new Error("You cannot push to a TestStream");
    }
}
function testStreamFromArray(array) {
    const semanticStream = array.map((value, time) => ({ value, time }));
    return new TestStream(semanticStream);
}
function testStreamFromObject(object) {
    const semanticStream = Object.keys(object).map((key) => ({ time: parseFloat(key), value: object[key] }));
    return new TestStream(semanticStream);
}
//# sourceMappingURL=test.js.map

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["init"] = init;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vnode__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__is__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__htmldomapi__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__h__ = __webpack_require__(22);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_3__h__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__thunk__ = __webpack_require__(38);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "thunk", function() { return __WEBPACK_IMPORTED_MODULE_4__thunk__["a"]; });



function isUndef(s) { return s === undefined; }
function isDef(s) { return s !== undefined; }
var emptyNode = Object(__WEBPACK_IMPORTED_MODULE_0__vnode__["a" /* default */])('', {}, [], undefined, undefined);
function sameVnode(vnode1, vnode2) {
    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}
function isVnode(vnode) {
    return vnode.sel !== undefined;
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
    var i, map = {}, key, ch;
    for (i = beginIdx; i <= endIdx; ++i) {
        ch = children[i];
        if (ch != null) {
            key = ch.key;
            if (key !== undefined)
                map[key] = i;
        }
    }
    return map;
}
var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];


function init(modules, domApi) {
    var i, j, cbs = {};
    var api = domApi !== undefined ? domApi : __WEBPACK_IMPORTED_MODULE_2__htmldomapi__["a" /* default */];
    for (i = 0; i < hooks.length; ++i) {
        cbs[hooks[i]] = [];
        for (j = 0; j < modules.length; ++j) {
            var hook = modules[j][hooks[i]];
            if (hook !== undefined) {
                cbs[hooks[i]].push(hook);
            }
        }
    }
    function emptyNodeAt(elm) {
        var id = elm.id ? '#' + elm.id : '';
        var c = elm.className ? '.' + elm.className.split(' ').join('.') : '';
        return Object(__WEBPACK_IMPORTED_MODULE_0__vnode__["a" /* default */])(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
    }
    function createRmCb(childElm, listeners) {
        return function rmCb() {
            if (--listeners === 0) {
                var parent_1 = api.parentNode(childElm);
                api.removeChild(parent_1, childElm);
            }
        };
    }
    function createElm(vnode, insertedVnodeQueue) {
        var i, data = vnode.data;
        if (data !== undefined) {
            if (isDef(i = data.hook) && isDef(i = i.init)) {
                i(vnode);
                data = vnode.data;
            }
        }
        var children = vnode.children, sel = vnode.sel;
        if (sel === '!') {
            if (isUndef(vnode.text)) {
                vnode.text = '';
            }
            vnode.elm = api.createComment(vnode.text);
        }
        else if (sel !== undefined) {
            // Parse selector
            var hashIdx = sel.indexOf('#');
            var dotIdx = sel.indexOf('.', hashIdx);
            var hash = hashIdx > 0 ? hashIdx : sel.length;
            var dot = dotIdx > 0 ? dotIdx : sel.length;
            var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
            var elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag)
                : api.createElement(tag);
            if (hash < dot)
                elm.setAttribute('id', sel.slice(hash + 1, dot));
            if (dotIdx > 0)
                elm.setAttribute('class', sel.slice(dot + 1).replace(/\./g, ' '));
            for (i = 0; i < cbs.create.length; ++i)
                cbs.create[i](emptyNode, vnode);
            if (__WEBPACK_IMPORTED_MODULE_1__is__["a" /* array */](children)) {
                for (i = 0; i < children.length; ++i) {
                    var ch = children[i];
                    if (ch != null) {
                        api.appendChild(elm, createElm(ch, insertedVnodeQueue));
                    }
                }
            }
            else if (__WEBPACK_IMPORTED_MODULE_1__is__["b" /* primitive */](vnode.text)) {
                api.appendChild(elm, api.createTextNode(vnode.text));
            }
            i = vnode.data.hook; // Reuse variable
            if (isDef(i)) {
                if (i.create)
                    i.create(emptyNode, vnode);
                if (i.insert)
                    insertedVnodeQueue.push(vnode);
            }
        }
        else {
            vnode.elm = api.createTextNode(vnode.text);
        }
        return vnode.elm;
    }
    function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
        for (; startIdx <= endIdx; ++startIdx) {
            var ch = vnodes[startIdx];
            if (ch != null) {
                api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
            }
        }
    }
    function invokeDestroyHook(vnode) {
        var i, j, data = vnode.data;
        if (data !== undefined) {
            if (isDef(i = data.hook) && isDef(i = i.destroy))
                i(vnode);
            for (i = 0; i < cbs.destroy.length; ++i)
                cbs.destroy[i](vnode);
            if (vnode.children !== undefined) {
                for (j = 0; j < vnode.children.length; ++j) {
                    i = vnode.children[j];
                    if (i != null && typeof i !== "string") {
                        invokeDestroyHook(i);
                    }
                }
            }
        }
    }
    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
        for (; startIdx <= endIdx; ++startIdx) {
            var i_1 = void 0, listeners = void 0, rm = void 0, ch = vnodes[startIdx];
            if (ch != null) {
                if (isDef(ch.sel)) {
                    invokeDestroyHook(ch);
                    listeners = cbs.remove.length + 1;
                    rm = createRmCb(ch.elm, listeners);
                    for (i_1 = 0; i_1 < cbs.remove.length; ++i_1)
                        cbs.remove[i_1](ch, rm);
                    if (isDef(i_1 = ch.data) && isDef(i_1 = i_1.hook) && isDef(i_1 = i_1.remove)) {
                        i_1(ch, rm);
                    }
                    else {
                        rm();
                    }
                }
                else {
                    api.removeChild(parentElm, ch.elm);
                }
            }
        }
    }
    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
        var oldStartIdx = 0, newStartIdx = 0;
        var oldEndIdx = oldCh.length - 1;
        var oldStartVnode = oldCh[0];
        var oldEndVnode = oldCh[oldEndIdx];
        var newEndIdx = newCh.length - 1;
        var newStartVnode = newCh[0];
        var newEndVnode = newCh[newEndIdx];
        var oldKeyToIdx;
        var idxInOld;
        var elmToMove;
        var before;
        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (oldStartVnode == null) {
                oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
            }
            else if (oldEndVnode == null) {
                oldEndVnode = oldCh[--oldEndIdx];
            }
            else if (newStartVnode == null) {
                newStartVnode = newCh[++newStartIdx];
            }
            else if (newEndVnode == null) {
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newStartVnode)) {
                patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
                oldStartVnode = oldCh[++oldStartIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else if (sameVnode(oldEndVnode, newEndVnode)) {
                patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
                oldEndVnode = oldCh[--oldEndIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newEndVnode)) {
                patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
                oldStartVnode = oldCh[++oldStartIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldEndVnode, newStartVnode)) {
                patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                oldEndVnode = oldCh[--oldEndIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else {
                if (oldKeyToIdx === undefined) {
                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                }
                idxInOld = oldKeyToIdx[newStartVnode.key];
                if (isUndef(idxInOld)) {
                    api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    newStartVnode = newCh[++newStartIdx];
                }
                else {
                    elmToMove = oldCh[idxInOld];
                    if (elmToMove.sel !== newStartVnode.sel) {
                        api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    }
                    else {
                        patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
                        oldCh[idxInOld] = undefined;
                        api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
                    }
                    newStartVnode = newCh[++newStartIdx];
                }
            }
        }
        if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
            if (oldStartIdx > oldEndIdx) {
                before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
                addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
            }
            else {
                removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
            }
        }
    }
    function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
        var i, hook;
        if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
            i(oldVnode, vnode);
        }
        var elm = vnode.elm = oldVnode.elm;
        var oldCh = oldVnode.children;
        var ch = vnode.children;
        if (oldVnode === vnode)
            return;
        if (vnode.data !== undefined) {
            for (i = 0; i < cbs.update.length; ++i)
                cbs.update[i](oldVnode, vnode);
            i = vnode.data.hook;
            if (isDef(i) && isDef(i = i.update))
                i(oldVnode, vnode);
        }
        if (isUndef(vnode.text)) {
            if (isDef(oldCh) && isDef(ch)) {
                if (oldCh !== ch)
                    updateChildren(elm, oldCh, ch, insertedVnodeQueue);
            }
            else if (isDef(ch)) {
                if (isDef(oldVnode.text))
                    api.setTextContent(elm, '');
                addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
            }
            else if (isDef(oldCh)) {
                removeVnodes(elm, oldCh, 0, oldCh.length - 1);
            }
            else if (isDef(oldVnode.text)) {
                api.setTextContent(elm, '');
            }
        }
        else if (oldVnode.text !== vnode.text) {
            api.setTextContent(elm, vnode.text);
        }
        if (isDef(hook) && isDef(i = hook.postpatch)) {
            i(oldVnode, vnode);
        }
    }
    return function patch(oldVnode, vnode) {
        var i, elm, parent;
        var insertedVnodeQueue = [];
        for (i = 0; i < cbs.pre.length; ++i)
            cbs.pre[i]();
        if (!isVnode(oldVnode)) {
            oldVnode = emptyNodeAt(oldVnode);
        }
        if (sameVnode(oldVnode, vnode)) {
            patchVnode(oldVnode, vnode, insertedVnodeQueue);
        }
        else {
            elm = oldVnode.elm;
            parent = api.parentNode(elm);
            createElm(vnode, insertedVnodeQueue);
            if (parent !== null) {
                api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
                removeVnodes(parent, [oldVnode], 0, 0);
            }
        }
        for (i = 0; i < insertedVnodeQueue.length; ++i) {
            insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
        }
        for (i = 0; i < cbs.post.length; ++i)
            cbs.post[i]();
        return vnode;
    };
}
//# sourceMappingURL=snabbdom.js.map

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export htmlDomApi */
function createElement(tagName) {
    return document.createElement(tagName);
}
function createElementNS(namespaceURI, qualifiedName) {
    return document.createElementNS(namespaceURI, qualifiedName);
}
function createTextNode(text) {
    return document.createTextNode(text);
}
function createComment(text) {
    return document.createComment(text);
}
function insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
    node.removeChild(child);
}
function appendChild(node, child) {
    node.appendChild(child);
}
function parentNode(node) {
    return node.parentNode;
}
function nextSibling(node) {
    return node.nextSibling;
}
function tagName(elm) {
    return elm.tagName;
}
function setTextContent(node, text) {
    node.textContent = text;
}
function getTextContent(node) {
    return node.textContent;
}
function isElement(node) {
    return node.nodeType === 1;
}
function isText(node) {
    return node.nodeType === 3;
}
function isComment(node) {
    return node.nodeType === 8;
}
var htmlDomApi = {
    createElement: createElement,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    createComment: createComment,
    insertBefore: insertBefore,
    removeChild: removeChild,
    appendChild: appendChild,
    parentNode: parentNode,
    nextSibling: nextSibling,
    tagName: tagName,
    setTextContent: setTextContent,
    getTextContent: getTextContent,
    isElement: isElement,
    isText: isText,
    isComment: isComment,
};
/* harmony default export */ __webpack_exports__["a"] = (htmlDomApi);
//# sourceMappingURL=htmldomapi.js.map

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return thunk; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__h__ = __webpack_require__(22);

function copyToThunk(vnode, thunk) {
    thunk.elm = vnode.elm;
    vnode.data.fn = thunk.data.fn;
    vnode.data.args = thunk.data.args;
    thunk.data = vnode.data;
    thunk.children = vnode.children;
    thunk.text = vnode.text;
    thunk.elm = vnode.elm;
}
function init(thunk) {
    var cur = thunk.data;
    var vnode = cur.fn.apply(undefined, cur.args);
    copyToThunk(vnode, thunk);
}
function prepatch(oldVnode, thunk) {
    var i, old = oldVnode.data, cur = thunk.data;
    var oldArgs = old.args, args = cur.args;
    if (old.fn !== cur.fn || oldArgs.length !== args.length) {
        copyToThunk(cur.fn.apply(undefined, args), thunk);
        return;
    }
    for (i = 0; i < args.length; ++i) {
        if (oldArgs[i] !== args[i]) {
            copyToThunk(cur.fn.apply(undefined, args), thunk);
            return;
        }
    }
    copyToThunk(oldVnode, thunk);
}
var thunk = function thunk(sel, key, fn, args) {
    if (args === undefined) {
        args = fn;
        fn = key;
        key = undefined;
    }
    return Object(__WEBPACK_IMPORTED_MODULE_0__h__["a" /* h */])(sel, {
        key: key,
        hook: { init: init, prepatch: prepatch },
        fn: fn,
        args: args
    });
};
/* unused harmony default export */ var _unused_webpack_default_export = (thunk);
//# sourceMappingURL=thunk.js.map

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function updateClass(oldVnode, vnode) {
    var cur, name, elm = vnode.elm, oldClass = oldVnode.data.class, klass = vnode.data.class;
    if (!oldClass && !klass)
        return;
    if (oldClass === klass)
        return;
    oldClass = oldClass || {};
    klass = klass || {};
    for (name in oldClass) {
        if (!klass[name]) {
            elm.classList.remove(name);
        }
    }
    for (name in klass) {
        cur = klass[name];
        if (cur !== oldClass[name]) {
            elm.classList[cur ? 'add' : 'remove'](name);
        }
    }
}
exports.classModule = { create: updateClass, update: updateClass };
exports.default = exports.classModule;
//# sourceMappingURL=class.js.map

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function invokeHandler(handler, vnode, event) {
    if (typeof handler === "function") {
        // call function handler
        handler.call(vnode, event, vnode);
    }
    else if (typeof handler === "object") {
        // call handler with arguments
        if (typeof handler[0] === "function") {
            // special case for single argument for performance
            if (handler.length === 2) {
                handler[0].call(vnode, handler[1], event, vnode);
            }
            else {
                var args = handler.slice(1);
                args.push(event);
                args.push(vnode);
                handler[0].apply(vnode, args);
            }
        }
        else {
            // call multiple handlers
            for (var i = 0; i < handler.length; i++) {
                invokeHandler(handler[i]);
            }
        }
    }
}
function handleEvent(event, vnode) {
    var name = event.type, on = vnode.data.on;
    // call event handler(s) if exists
    if (on && on[name]) {
        invokeHandler(on[name], vnode, event);
    }
}
function createListener() {
    return function handler(event) {
        handleEvent(event, handler.vnode);
    };
}
function updateEventListeners(oldVnode, vnode) {
    var oldOn = oldVnode.data.on, oldListener = oldVnode.listener, oldElm = oldVnode.elm, on = vnode && vnode.data.on, elm = (vnode && vnode.elm), name;
    // optimization for reused immutable handlers
    if (oldOn === on) {
        return;
    }
    // remove existing listeners which no longer used
    if (oldOn && oldListener) {
        // if element changed or deleted we remove all existing listeners unconditionally
        if (!on) {
            for (name in oldOn) {
                // remove listener if element was changed or existing listeners removed
                oldElm.removeEventListener(name, oldListener, false);
            }
        }
        else {
            for (name in oldOn) {
                // remove listener if existing listener removed
                if (!on[name]) {
                    oldElm.removeEventListener(name, oldListener, false);
                }
            }
        }
    }
    // add new listeners which has not already attached
    if (on) {
        // reuse existing listener or create new
        var listener = vnode.listener = oldVnode.listener || createListener();
        // update vnode for listener
        listener.vnode = vnode;
        // if element changed or added we add all needed listeners unconditionally
        if (!oldOn) {
            for (name in on) {
                // add listener if element was changed or new listeners added
                elm.addEventListener(name, listener, false);
            }
        }
        else {
            for (name in on) {
                // add listener if new listener added
                if (!oldOn[name]) {
                    elm.addEventListener(name, listener, false);
                }
            }
        }
    }
}
exports.eventListenersModule = {
    create: updateEventListeners,
    update: updateEventListeners,
    destroy: updateEventListeners
};
exports.default = exports.eventListenersModule;
//# sourceMappingURL=eventlisteners.js.map

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var xlinkNS = 'http://www.w3.org/1999/xlink';
var xmlNS = 'http://www.w3.org/XML/1998/namespace';
var colonChar = 58;
var xChar = 120;
function updateAttrs(oldVnode, vnode) {
    var key, elm = vnode.elm, oldAttrs = oldVnode.data.attrs, attrs = vnode.data.attrs;
    if (!oldAttrs && !attrs)
        return;
    if (oldAttrs === attrs)
        return;
    oldAttrs = oldAttrs || {};
    attrs = attrs || {};
    // update modified attributes, add new attributes
    for (key in attrs) {
        var cur = attrs[key];
        var old = oldAttrs[key];
        if (old !== cur) {
            if (cur === true) {
                elm.setAttribute(key, "");
            }
            else if (cur === false) {
                elm.removeAttribute(key);
            }
            else {
                if (key.charCodeAt(0) !== xChar) {
                    elm.setAttribute(key, cur);
                }
                else if (key.charCodeAt(3) === colonChar) {
                    // Assume xml namespace
                    elm.setAttributeNS(xmlNS, key, cur);
                }
                else if (key.charCodeAt(5) === colonChar) {
                    // Assume xlink namespace
                    elm.setAttributeNS(xlinkNS, key, cur);
                }
                else {
                    elm.setAttribute(key, cur);
                }
            }
        }
    }
    // remove removed attributes
    // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
    // the other option is to remove all attributes with value == undefined
    for (key in oldAttrs) {
        if (!(key in attrs)) {
            elm.removeAttribute(key);
        }
    }
}
exports.attributesModule = { create: updateAttrs, update: updateAttrs };
exports.default = exports.attributesModule;
//# sourceMappingURL=attributes.js.map

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function updateProps(oldVnode, vnode) {
    var key, cur, old, elm = vnode.elm, oldProps = oldVnode.data.props, props = vnode.data.props;
    if (!oldProps && !props)
        return;
    if (oldProps === props)
        return;
    oldProps = oldProps || {};
    props = props || {};
    for (key in oldProps) {
        if (!props[key]) {
            delete elm[key];
        }
    }
    for (key in props) {
        cur = props[key];
        old = oldProps[key];
        if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
            elm[key] = cur;
        }
    }
}
exports.propsModule = { create: updateProps, update: updateProps };
exports.default = exports.propsModule;
//# sourceMappingURL=props.js.map

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjVkMDFkNjQxMDcyZGRmZTZjYWMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BmdW5raWEvamFiei9kaXN0L2VzL3V0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BmdW5raWEvaGFyZWFjdGl2ZS9kaXN0L2VzL2JlaGF2aW9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZnVua2lhL2hhcmVhY3RpdmUvZGlzdC9lcy9zdHJlYW0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BmdW5raWEvamFiei9kaXN0L2VzL2FwcGxpY2F0aXZlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZnVua2lhL2phYnovZGlzdC9lcy9tb25hZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZ1bmtpYS9oYXJlYWN0aXZlL2Rpc3QvZXMvY29tbW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZnVua2lhL2hhcmVhY3RpdmUvZGlzdC9lcy9saW5rZWRsaXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZnVua2lhL2phYnovZGlzdC9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZ1bmtpYS9oYXJlYWN0aXZlL2Rpc3QvZXMvZnV0dXJlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZnVua2lhL2phYnovZGlzdC9lcy9mb2xkYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZ1bmtpYS9qYWJ6L2Rpc3QvZXMvZWl0aGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZnVua2lhL2hhcmVhY3RpdmUvZGlzdC9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZ1bmtpYS9qYWJ6L2Rpc3QvZXMvc2VtaWdyb3VwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZnVua2lhL2phYnovZGlzdC9lcy9tb25vaWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BmdW5raWEvamFiei9kaXN0L2VzL2Z1bmN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BmdW5raWEvamFiei9kaXN0L2VzL21heWJlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZnVua2lhL2phYnovZGlzdC9lcy90cmF2ZXJzYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZ1bmtpYS9qYWJ6L2Rpc3QvZXMvbW9ub2lkcy9lbmRvLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZnVua2lhL2hhcmVhY3RpdmUvZGlzdC9lcy9wbGFjZWhvbGRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vZXMvdm5vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL2VzL2lzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9lcy9oLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZ1bmtpYS9qYWJ6L2Rpc3QvZXMvaWRlbnRpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BmdW5raWEvamFiei9kaXN0L2VzL2NvbnN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZnVua2lhL2phYnovZGlzdC9lcy9jb25zbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZ1bmtpYS9qYWJ6L2Rpc3QvZXMvaW5maW5pdGVsaXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZnVua2lhL2phYnovZGlzdC9lcy9pby5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZ1bmtpYS9qYWJ6L2Rpc3QvZXMvZnJlZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BmdW5raWEvamFiei9kaXN0L2VzL3dyaXRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZ1bmtpYS9oYXJlYWN0aXZlL2Rpc3QvZXMvbm93LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZnVua2lhL2hhcmVhY3RpdmUvZGlzdC9lcy9kb20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BmdW5raWEvaGFyZWFjdGl2ZS9kaXN0L2VzL3RpbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BmdW5raWEvaGFyZWFjdGl2ZS9kaXN0L2VzL2FuaW1hdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZ1bmtpYS9oYXJlYWN0aXZlL2Rpc3QvZXMvdGVzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vZXMvc25hYmJkb20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL2VzL2h0bWxkb21hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL2VzL3RodW5rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9tb2R1bGVzL2NsYXNzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9tb2R1bGVzL2V2ZW50bGlzdGVuZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9tb2R1bGVzL2F0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL21vZHVsZXMvcHJvcHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGNBQWM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGNBQWM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGNBQWM7QUFDakMsdUJBQXVCLGlCQUFpQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pFQTtBQUFBO0FBQ0E7QUFDQSwrREFBK0Q7QUFDL0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU0sZ0JBQWdCLHNDQUFzQyxpQkFBaUIsRUFBRTtBQUMvRSxxQkFBcUIsdURBQXVEOztBQUU1RTtBQUNBO0FBQ0EsbUJBQW1CLHNCQUFzQjtBQUN6QztBQUNBOztBQUVBO0FBQ0EsNENBQTRDLE9BQU87QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTRELGNBQWM7QUFDMUU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxRQUFRO0FBQ3BEO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBbUMsb0NBQW9DO0FBQ3ZFOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLGlFQUFpRSx1QkFBdUIsRUFBRSw0QkFBNEI7QUFDcko7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxhQUFhLDZCQUE2QiwwQkFBMEIsYUFBYSxFQUFFLHFCQUFxQjtBQUN4RyxnQkFBZ0IscURBQXFELG9FQUFvRSxhQUFhLEVBQUU7QUFDeEosc0JBQXNCLHNCQUFzQixxQkFBcUIsR0FBRztBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkMsa0NBQWtDLFNBQVM7QUFDM0Msa0NBQWtDLFdBQVcsVUFBVTtBQUN2RCx5Q0FBeUMsY0FBYztBQUN2RDtBQUNBLDZHQUE2RyxPQUFPLFVBQVU7QUFDOUgsZ0ZBQWdGLGlCQUFpQixPQUFPO0FBQ3hHLHdEQUF3RCxnQkFBZ0IsUUFBUSxPQUFPO0FBQ3ZGLDhDQUE4QyxnQkFBZ0IsZ0JBQWdCLE9BQU87QUFDckY7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBLFNBQVMsWUFBWSxhQUFhLE9BQU8sRUFBRSxVQUFVLFdBQVc7QUFDaEUsbUNBQW1DLFNBQVM7QUFDNUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixNQUFNLGdCQUFnQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixzQkFBc0I7QUFDdkM7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCLHNCQUFzQjtBQUNsRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixzRkFBc0YsYUFBYSxFQUFFO0FBQ3RILHNCQUFzQixnQ0FBZ0MscUNBQXFDLDBDQUEwQyxFQUFFLEVBQUUsR0FBRztBQUM1SSwyQkFBMkIsTUFBTSxlQUFlLEVBQUUsWUFBWSxvQkFBb0IsRUFBRTtBQUNwRixzQkFBc0Isb0dBQW9HO0FBQzFILDZCQUE2Qix1QkFBdUI7QUFDcEQsNEJBQTRCLHdCQUF3QjtBQUNwRCwyQkFBMkIseURBQXlEO0FBQ3BGOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsNENBQTRDLFNBQVMsRUFBRSxxREFBcUQsYUFBYSxFQUFFO0FBQzVJLHlCQUF5QixnQ0FBZ0Msb0JBQW9CLGdEQUFnRCxnQkFBZ0IsR0FBRztBQUNoSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0NBQWdDLHVDQUF1QyxhQUFhLEVBQUUsRUFBRSxPQUFPLGtCQUFrQjtBQUNqSDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyS0E7QUFDZTtBQUNDO0FBQ2dEO0FBQy9CO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLGFBQWE7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QiwwQkFBMEI7QUFDMUI7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUZBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLGtCQUFrQjtBQUNsQixxQkFBcUI7QUFDckI7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixPQUFPO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25pQm1CO0FBQ0o7QUFDYztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsYUFBYTtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGNBQWMsT0FBTyw2QkFBNkI7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLE9BQU8sT0FBTyxzQkFBc0I7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsUUFBUTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLGtCQUFrQjtBQUNsQjtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGNBQWM7QUFDckM7QUFDQSxvQkFBb0I7QUFDcEIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDhCQUE4QjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsT0FBTyxPQUFPLHVCQUF1QjtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0M7Ozs7Ozs7Ozs7Ozs7O0FDM1VpQztBQUNVO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixpQkFBaUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGlDQUFpQztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUM7Ozs7Ozs7Ozs7Ozs7O0FDekVrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxLQUFLO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBLHVCQUF1QixrQkFBa0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxjQUFjO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUM7Ozs7Ozs7Ozs7QUM3SUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxRQUFRO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQzs7Ozs7Ozs7O0FDbktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG1CQUFtQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQzs7Ozs7Ozs7Ozs7Ozs7QUNmQTtBQUNnQjtBQUNHO0FBQ087QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ1E7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHlCQUF5QjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsa0JBQWtCO0FBQ2xCO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0Esa0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzTGtCO0FBQ007QUFDbUI7QUFDTjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxRQUFRO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGNBQWM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DOzs7Ozs7Ozs7Ozs7O0FDeElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw4QkFBOEI7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsaUJBQWlCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsaUJBQWlCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUM7Ozs7Ozs7OztBQ2hCb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDOzs7Ozs7Ozs7O0FDZmtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDUTtBQUNSLGtDOzs7Ozs7Ozs7Ozs7QUNiZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFlBQVk7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUM7Ozs7Ozs7Ozs7Ozs7OztBQzdDQTtBQUNtQjtBQUNOO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDOzs7Ozs7Ozs7Ozs7Ozs7OztBQzNJMkI7QUFDRztBQUM5QjtBQUNBO0FBQ29CO0FBQ007QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLFFBQVE7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsUUFBUTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDOzs7Ozs7OztBQ3hGa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBLGdDOzs7Ozs7Ozs7O0FDdEI0QztBQUNkO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Qzs7Ozs7Ozs7QUN6RkE7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQSxpQzs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Qjs7Ozs7Ozs7OztBQ0pnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixxQkFBcUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIscUJBQXFCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCOzs7Ozs7Ozs7QUN0REEsMkNBQStGO0FBQy9GLHVDQUFxQztBQUVyQyx3Q0FBcUQ7QUFDckQsc0NBQTREO0FBQzVELHdDQUEwRDtBQUMxRCx3Q0FBcUQ7QUFFckQsSUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUVyQixJQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBQzFCLFNBQVMsQ0FBQyxPQUFPO0lBQ2pCLE9BQU8sQ0FBQyxPQUFPO0lBQ2YsU0FBUyxDQUFDLE9BQU87SUFDakIsU0FBUyxDQUFDLE9BQU87Q0FDbEIsQ0FBQyxDQUFDO0FBRUgsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztBQUUzQixJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pDLElBQU0sQ0FBQyxHQUFHLHdCQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDN0Isb0JBQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRTFCLFdBQVc7QUFDWCxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7OztBQ3pCaEM7QUFDZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0M7Ozs7Ozs7OztBQ3RDOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0EsaUM7Ozs7Ozs7Ozs7Ozs7O0FDdkJBO0FBQ2U7QUFDTztBQUNOO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNRO0FBQ1I7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0M7Ozs7Ozs7Ozs7QUN2Q3NCO0FBQ2U7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsaUJBQWlCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBLHdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5RHVCO0FBQ0g7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRSxPQUFPLFdBQVcsR0FBRztBQUNyRjtBQUNBLFNBQVM7QUFDVDtBQUNBLG9CQUFvQixXQUFXO0FBQy9CO0FBQ0EsMkRBQTJELElBQUksV0FBVyxHQUFHO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Qjs7Ozs7Ozs7Ozs7O0FDM0ZBO0FBQytCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ1E7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDOzs7Ozs7Ozs7OztBQ3pENEI7QUFDSjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGVBQWU7QUFDOUI7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hELFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxrQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQ0E7QUFDdUI7QUFDRDtBQUNBO0FBQ1Q7QUFDVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixRQUFRO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQjs7Ozs7Ozs7Ozs7QUNqUXlCO0FBQ0U7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCOzs7Ozs7Ozs7Ozs7OztBQzlDZTtBQUNFO0FBQ2tDO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsY0FBYyxPQUFPLDhCQUE4QjtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDOzs7Ozs7Ozs7Ozs7QUM5R21CO0FBQ3FCO0FBQ3hDO0FBQ0E7QUFDQSxvR0FBeUQsMEJBQTBCLElBQUksNkJBQTZCO0FBQ3BIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsRUFBRSw4QkFBOEIsTUFBTSxJQUFJLElBQUk7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQSxxQzs7Ozs7Ozs7OztBQ2hDaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0QsY0FBYztBQUN0RTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQsNENBQTRDO0FBQzFHO0FBQ0E7QUFDQSxnQzs7Ozs7Ozs7Ozs7Ozs7OztBQzlCQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsd0JBQXdCO0FBQzdDLG1CQUFtQix3QkFBd0I7QUFDM0Msc0ZBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CLHNCQUFzQixhQUFhO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ1k7QUFDSTtBQUNoQjtBQUNBO0FBQ0E7QUFDQSxlQUFlLGtCQUFrQjtBQUNqQztBQUNBLG1CQUFtQixvQkFBb0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEhBQWdFO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHVCQUF1QjtBQUM5QztBQUNBO0FBQ0EsMkJBQTJCLHFCQUFxQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLG9CQUFvQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHdCQUF3QjtBQUMvQztBQUNBO0FBQ0EsMkJBQTJCLDJCQUEyQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLG9CQUFvQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMseUJBQXlCO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHVCQUF1QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG9CQUFvQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwrQkFBK0I7QUFDbEQ7QUFDQTtBQUNBLG1CQUFtQixxQkFBcUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQzs7Ozs7OztBQy9TQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDOzs7Ozs7Ozs7QUMvRFk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlDQUFpQztBQUNoRDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxpQzs7Ozs7OztBQzVDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQSxpQzs7Ozs7OztBQ3hCQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixvQkFBb0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQzs7Ozs7OztBQzlGQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQSxzQzs7Ozs7OztBQ3REQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBLGlDIiwiZmlsZSI6ImJ1aWxkL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyNWQwMWQ2NDEwNzJkZGZlNmNhYyIsImV4cG9ydCBmdW5jdGlvbiBpZChhKSB7XG4gICAgcmV0dXJuIGE7XG59XG5leHBvcnQgZnVuY3Rpb24gYXBwbHkoZiwgYSkge1xuICAgIHJldHVybiBmKGEpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG1peGluKGRlcml2ZWRDdG9yLCBiYXNlQ3RvcnMpIHtcbiAgICBiYXNlQ3RvcnMuZm9yRWFjaChiYXNlQ3RvciA9PiB7XG4gICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGJhc2VDdG9yLnByb3RvdHlwZSkuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgICAgIGlmICghKG5hbWUgaW4gZGVyaXZlZEN0b3IpICYmICEobmFtZSBpbiBkZXJpdmVkQ3Rvci5wcm90b3R5cGUpKSB7XG4gICAgICAgICAgICAgICAgZGVyaXZlZEN0b3IucHJvdG90eXBlW25hbWVdID0gYmFzZUN0b3IucHJvdG90eXBlW25hbWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhZGQobiwgbSkge1xuICAgIHJldHVybiBuICsgbTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb21wb3NlKGYsIGcpIHtcbiAgICByZXR1cm4gKGEpID0+IGYoZyhhKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gaW1wdXJlUHVzaChhcnIsIGEpIHtcbiAgICBhcnIucHVzaChhKTtcbiAgICByZXR1cm4gYXJyO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbnMoYSwgYXMpIHtcbiAgICByZXR1cm4gW2FdLmNvbmNhdChhcyk7XG59XG5leHBvcnQgZnVuY3Rpb24gY3VycnkzKGYpIHtcbiAgICByZXR1cm4gYSA9PiBiID0+IGMgPT4gZihhLCBiLCBjKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjdXJyeTIoZikge1xuICAgIHJldHVybiBhID0+IGIgPT4gZihhLCBiKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmbGlwKGYpIHtcbiAgICByZXR1cm4gKGIsIGEpID0+IGYoYSwgYik7XG59XG5leHBvcnQgZnVuY3Rpb24gZm9sZGxBcnJheShmLCBpbml0LCBhKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGluaXQgPSBmKGluaXQsIGFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gaW5pdDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmb2xkbEFycmF5MShmLCBhKSB7XG4gICAgbGV0IGluaXQgPSBhWzBdO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgYS5sZW5ndGg7ICsraSkge1xuICAgICAgICBpbml0ID0gZihpbml0LCBhW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGluaXQ7XG59XG5leHBvcnQgZnVuY3Rpb24gYXJyYXlGbGF0dGVuKG0pIHtcbiAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbVtpXS5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2gobVtpXVtqXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkZWVwRXF1YWwoYSwgYikge1xuICAgIGlmICh0eXBlb2YgYSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgYiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBjb25zdCBhS2V5cyA9IE9iamVjdC5rZXlzKGEpO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBhS2V5cykge1xuICAgICAgICAgICAgaWYgKCFkZWVwRXF1YWwoYVtrZXldLCBiW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGEgPT09IGI7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXRpbHMuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGZ1bmtpYS9qYWJ6L2Rpc3QvZXMvdXRpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSB5W29wWzBdICYgMiA/IFwicmV0dXJuXCIgOiBvcFswXSA/IFwidGhyb3dcIiA6IFwibmV4dFwiXSkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbMCwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgIH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlmIChvW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9OyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyB0c2xpYl8xIGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgY29ucyB9IGZyb20gXCIuL2xpbmtlZGxpc3RcIjtcbmltcG9ydCB7IG1vbmFkIH0gZnJvbSBcIkBmdW5raWEvamFielwiO1xuaW1wb3J0IHsgUmVhY3RpdmUsIHJlbW92ZUxpc3RlbmVyUGFyZW50cywgY2hhbmdlUHVsbGVyc1BhcmVudHMgfSBmcm9tIFwiLi9jb21tb25cIjtcbmltcG9ydCB7IEZ1dHVyZSwgQmVoYXZpb3JGdXR1cmUgfSBmcm9tIFwiLi9mdXR1cmVcIjtcbmltcG9ydCAqIGFzIEYgZnJvbSBcIi4vZnV0dXJlXCI7XG5sZXQgQmVoYXZpb3IgPSBjbGFzcyBCZWhhdmlvciBleHRlbmRzIFJlYWN0aXZlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5tdWx0aSA9IHRydWU7XG4gICAgICAgIHRoaXMubnJPZlB1bGxlcnMgPSAwO1xuICAgIH1cbiAgICBzdGF0aWMgaXMoYSkge1xuICAgICAgICByZXR1cm4gaXNCZWhhdmlvcihhKTtcbiAgICB9XG4gICAgbWFwKGZuKSB7XG4gICAgICAgIHJldHVybiBuZXcgTWFwQmVoYXZpb3IodGhpcywgZm4pO1xuICAgIH1cbiAgICBtYXBUbyh2KSB7XG4gICAgICAgIHJldHVybiBuZXcgQ29uc3RhbnRCZWhhdmlvcih2KTtcbiAgICB9XG4gICAgc3RhdGljIG9mKHYpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDb25zdGFudEJlaGF2aW9yKHYpO1xuICAgIH1cbiAgICBvZih2KSB7XG4gICAgICAgIHJldHVybiBuZXcgQ29uc3RhbnRCZWhhdmlvcih2KTtcbiAgICB9XG4gICAgYXAoZikge1xuICAgICAgICByZXR1cm4gbmV3IEFwQmVoYXZpb3IoZiwgdGhpcyk7XG4gICAgfVxuICAgIGxpZnQoKSB7XG4gICAgICAgIC8vIFRPRE86IEV4cGVyaW1lbnQgd2l0aCBmYXN0ZXIgc3BlY2lhbGl6ZWQgYGxpZnRgIGltcGxlbWVudGF0aW9uXG4gICAgICAgIGNvbnN0IGYgPSBhcmd1bWVudHNbMF07XG4gICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJndW1lbnRzWzFdLm1hcChmKTtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJndW1lbnRzWzJdLmFwKGFyZ3VtZW50c1sxXS5tYXAoKGEpID0+IChiKSA9PiBmKGEsIGIpKSk7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFyZ3VtZW50c1szXS5hcChhcmd1bWVudHNbMl0uYXAoYXJndW1lbnRzWzFdLm1hcCgoYSkgPT4gKGIpID0+IChjKSA9PiBmKGEsIGIsIGMpKSkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNoYWluKGZuKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ2hhaW5CZWhhdmlvcih0aGlzLCBmbik7XG4gICAgfVxuICAgIGF0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gMCAvKiBQdXNoICovID8gdGhpcy5sYXN0IDogdGhpcy5wdWxsKCk7XG4gICAgfVxuICAgIHB1c2goYSkge1xuICAgICAgICB0aGlzLmxhc3QgPSB0aGlzLnB1bGwoKTtcbiAgICAgICAgdGhpcy5jaGlsZC5wdXNoKHRoaXMubGFzdCk7XG4gICAgfVxuICAgIHB1bGwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxhc3Q7XG4gICAgfVxuICAgIGFjdGl2YXRlKCkge1xuICAgICAgICBzdXBlci5hY3RpdmF0ZSgpO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PT0gMCAvKiBQdXNoICovKSB7XG4gICAgICAgICAgICB0aGlzLmxhc3QgPSB0aGlzLnB1bGwoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGFuZ2VQdWxsZXJzKG4pIHtcbiAgICAgICAgdGhpcy5uck9mUHVsbGVycyArPSBuO1xuICAgICAgICBjaGFuZ2VQdWxsZXJzUGFyZW50cyhuLCB0aGlzLnBhcmVudHMpO1xuICAgIH1cbiAgICBzZW1hbnRpYygpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGJlaGF2aW9yIGRvZXMgbm90IGhhdmUgYSBzZW1hbnRpYyByZXByZXNlbnRhdGlvblwiKTtcbiAgICB9XG4gICAgbG9nKHByZWZpeCkge1xuICAgICAgICB0aGlzLnN1YnNjcmliZShhID0+IGNvbnNvbGUubG9nKGAke3ByZWZpeCB8fCBcIlwifSBgLCBhKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn07XG5CZWhhdmlvci5tdWx0aSA9IHRydWU7XG5CZWhhdmlvciA9IHRzbGliXzEuX19kZWNvcmF0ZShbXG4gICAgbW9uYWRcbl0sIEJlaGF2aW9yKTtcbmV4cG9ydCB7IEJlaGF2aW9yIH07XG5leHBvcnQgZnVuY3Rpb24gaXNCZWhhdmlvcihiKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBiID09PSBcIm9iamVjdFwiICYmIChcImF0XCIgaW4gYik7XG59XG5leHBvcnQgY2xhc3MgUHJvZHVjZXJCZWhhdmlvciBleHRlbmRzIEJlaGF2aW9yIHtcbiAgICBwdXNoKGEpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlZCA9IGEgIT09IHRoaXMubGFzdDtcbiAgICAgICAgdGhpcy5sYXN0ID0gYTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT09IDAgLyogUHVzaCAqLyAmJiBjaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkLnB1c2goYSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2hhbmdlUHVsbGVycyhuKSB7XG4gICAgICAgIHRoaXMubnJPZlB1bGxlcnMgKz0gbjtcbiAgICAgICAgaWYgKHRoaXMubnJPZlB1bGxlcnMgPiAwICYmIHRoaXMuc3RhdGUgPT09IDMgLyogSW5hY3RpdmUgKi8pIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAxIC8qIFB1bGwgKi87XG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlUHJvZHVjZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLm5yT2ZQdWxsZXJzID09PSAwICYmIHRoaXMuc3RhdGUgPT09IDEgLyogUHVsbCAqLykge1xuICAgICAgICAgICAgdGhpcy5kZWFjdGl2YXRlUHJvZHVjZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhY3RpdmF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT09IDMgLyogSW5hY3RpdmUgKi8pIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGVQcm9kdWNlcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGUgPSAwIC8qIFB1c2ggKi87XG4gICAgfVxuICAgIGRlYWN0aXZhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLm5yT2ZQdWxsZXJzID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gMyAvKiBJbmFjdGl2ZSAqLztcbiAgICAgICAgICAgIHRoaXMuZGVhY3RpdmF0ZVByb2R1Y2VyKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gMSAvKiBQdWxsICovO1xuICAgICAgICB9XG4gICAgfVxufVxuY2xhc3MgUHJvZHVjZXJCZWhhdmlvckZyb21GdW5jdGlvbiBleHRlbmRzIFByb2R1Y2VyQmVoYXZpb3Ige1xuICAgIGNvbnN0cnVjdG9yKGFjdGl2YXRlRm4sIGluaXRpYWwpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZUZuID0gYWN0aXZhdGVGbjtcbiAgICAgICAgdGhpcy5pbml0aWFsID0gaW5pdGlhbDtcbiAgICAgICAgdGhpcy5sYXN0ID0gaW5pdGlhbDtcbiAgICB9XG4gICAgYWN0aXZhdGVQcm9kdWNlcigpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IDAgLyogUHVzaCAqLztcbiAgICAgICAgdGhpcy5kZWFjdGl2YXRlRm4gPSB0aGlzLmFjdGl2YXRlRm4odGhpcy5wdXNoLmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBkZWFjdGl2YXRlUHJvZHVjZXIoKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSAzIC8qIEluYWN0aXZlICovO1xuICAgICAgICB0aGlzLmRlYWN0aXZhdGVGbigpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBwcm9kdWNlckJlaGF2aW9yKGFjdGl2YXRlLCBpbml0aWFsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9kdWNlckJlaGF2aW9yRnJvbUZ1bmN0aW9uKGFjdGl2YXRlLCBpbml0aWFsKTtcbn1cbmV4cG9ydCBjbGFzcyBTaW5rQmVoYXZpb3IgZXh0ZW5kcyBQcm9kdWNlckJlaGF2aW9yIHtcbiAgICBjb25zdHJ1Y3RvcihsYXN0KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubGFzdCA9IGxhc3Q7XG4gICAgfVxuICAgIGFjdGl2YXRlUHJvZHVjZXIoKSB7IH1cbiAgICBkZWFjdGl2YXRlUHJvZHVjZXIoKSB7IH1cbn1cbi8qKlxuICogQ3JlYXRlcyBhIGJlaGF2aW9yIGZvciBpbXBlcmF0aXZlIHB1c2hpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaW5rQmVoYXZpb3IoaW5pdGlhbCkge1xuICAgIHJldHVybiBuZXcgU2lua0JlaGF2aW9yKGluaXRpYWwpO1xufVxuLyoqXG4gKiBJbXB1cmUgZnVuY3Rpb24gdGhhdCBnZXRzIHRoZSBjdXJyZW50IHZhbHVlIG9mIGEgYmVoYXZpb3IuIEZvciBhXG4gKiBwdXJlIHZhcmlhbnQgc2VlIGBzYW1wbGVgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXQoYikge1xuICAgIHJldHVybiBiLmF0KCk7XG59XG5leHBvcnQgY2xhc3MgTWFwQmVoYXZpb3IgZXh0ZW5kcyBCZWhhdmlvciB7XG4gICAgY29uc3RydWN0b3IocGFyZW50LCBmKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgICAgICB0aGlzLmYgPSBmO1xuICAgICAgICB0aGlzLnBhcmVudHMgPSBjb25zKHBhcmVudCk7XG4gICAgfVxuICAgIHB1c2goYSkge1xuICAgICAgICB0aGlzLmxhc3QgPSB0aGlzLmYoYSk7XG4gICAgICAgIHRoaXMuY2hpbGQucHVzaCh0aGlzLmxhc3QpO1xuICAgIH1cbiAgICBwdWxsKCkge1xuICAgICAgICBjb25zdCBuZXdWYWwgPSB0aGlzLnBhcmVudC5hdCgpO1xuICAgICAgICBpZiAodGhpcy5vbGRWYWwgIT09IG5ld1ZhbCkge1xuICAgICAgICAgICAgdGhpcy5vbGRWYWwgPSBuZXdWYWw7XG4gICAgICAgICAgICB0aGlzLmNhY2hlZCA9IHRoaXMuZihuZXdWYWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlZDtcbiAgICB9XG4gICAgc2VtYW50aWMoKSB7XG4gICAgICAgIGNvbnN0IGcgPSB0aGlzLnBhcmVudC5zZW1hbnRpYygpO1xuICAgICAgICByZXR1cm4gKHQpID0+IHRoaXMuZihnKHQpKTtcbiAgICB9XG59XG5jbGFzcyBBcEJlaGF2aW9yIGV4dGVuZHMgQmVoYXZpb3Ige1xuICAgIGNvbnN0cnVjdG9yKGZuLCB2YWwpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5mbiA9IGZuO1xuICAgICAgICB0aGlzLnZhbCA9IHZhbDtcbiAgICAgICAgdGhpcy5wYXJlbnRzID0gY29ucyhmbiwgY29ucyh2YWwpKTtcbiAgICB9XG4gICAgcHVzaCgpIHtcbiAgICAgICAgY29uc3QgZm4gPSBhdCh0aGlzLmZuKTtcbiAgICAgICAgY29uc3QgdmFsID0gYXQodGhpcy52YWwpO1xuICAgICAgICB0aGlzLmxhc3QgPSBmbih2YWwpO1xuICAgICAgICB0aGlzLmNoaWxkLnB1c2godGhpcy5sYXN0KTtcbiAgICB9XG4gICAgcHVsbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm4uYXQoKSh0aGlzLnZhbC5hdCgpKTtcbiAgICB9XG59XG4vKipcbiAqIEFwcGx5IGEgZnVuY3Rpb24gdmFsdWVkIGJlaGF2aW9yIHRvIGEgdmFsdWUgYmVoYXZpb3IuXG4gKlxuICogQHBhcmFtIGZuQiBiZWhhdmlvciBvZiBmdW5jdGlvbnMgZnJvbSBgQWAgdG8gYEJgXG4gKiBAcGFyYW0gdmFsQiBBIGJlaGF2aW9yIG9mIGBBYFxuICogQHJldHVybnMgQmVoYXZpb3Igb2YgdGhlIGZ1bmN0aW9uIGluIGBmbkJgIGFwcGxpZWQgdG8gdGhlIHZhbHVlIGluIGB2YWxCYFxuICovXG5leHBvcnQgZnVuY3Rpb24gYXAoZm5CLCB2YWxCKSB7XG4gICAgcmV0dXJuIHZhbEIuYXAoZm5CKTtcbn1cbmNsYXNzIENoYWluT3V0ZXIgZXh0ZW5kcyBCZWhhdmlvciB7XG4gICAgY29uc3RydWN0b3IoY2hpbGQsIHBhcmVudCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmNoaWxkID0gY2hpbGQ7XG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgICAgICB0aGlzLnBhcmVudHMgPSBjb25zKHBhcmVudCk7XG4gICAgfVxuICAgIHB1c2goYSkge1xuICAgICAgICB0aGlzLmNoaWxkLnB1c2hPdXRlcihhKTtcbiAgICB9XG59XG5jbGFzcyBDaGFpbkJlaGF2aW9yIGV4dGVuZHMgQmVoYXZpb3Ige1xuICAgIGNvbnN0cnVjdG9yKG91dGVyLCBmbikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLm91dGVyID0gb3V0ZXI7XG4gICAgICAgIHRoaXMuZm4gPSBmbjtcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBvdXRlciBjb25zdW1lclxuICAgICAgICB0aGlzLm91dGVyQ29uc3VtZXIgPSBuZXcgQ2hhaW5PdXRlcih0aGlzLCBvdXRlcik7XG4gICAgICAgIHRoaXMucGFyZW50cyA9IGNvbnModGhpcy5vdXRlckNvbnN1bWVyKTtcbiAgICB9XG4gICAgYWN0aXZhdGUoKSB7XG4gICAgICAgIC8vIE1ha2UgdGhlIGNvbnN1bWVycyBsaXN0ZW4gdG8gaW5uZXIgYW5kIG91dGVyIGJlaGF2aW9yXG4gICAgICAgIHRoaXMub3V0ZXIuYWRkTGlzdGVuZXIodGhpcy5vdXRlckNvbnN1bWVyKTtcbiAgICAgICAgaWYgKHRoaXMub3V0ZXIuc3RhdGUgPT09IDAgLyogUHVzaCAqLykge1xuICAgICAgICAgICAgdGhpcy5pbm5lckIgPSB0aGlzLmZuKHRoaXMub3V0ZXIuYXQoKSk7XG4gICAgICAgICAgICB0aGlzLmlubmVyQi5hZGRMaXN0ZW5lcih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmlubmVyQi5zdGF0ZTtcbiAgICAgICAgICAgIHRoaXMubGFzdCA9IGF0KHRoaXMuaW5uZXJCKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdXNoT3V0ZXIoYSkge1xuICAgICAgICAvLyBUaGUgb3V0ZXIgYmVoYXZpb3IgaGFzIGNoYW5nZWQuIFRoaXMgbWVhbnMgdGhhdCB3ZSB3aWxsIGhhdmUgdG9cbiAgICAgICAgLy8gY2FsbCBvdXIgZnVuY3Rpb24sIHdoaWNoIHdpbGwgcmVzdWx0IGluIGEgbmV3IGlubmVyIGJlaGF2aW9yLlxuICAgICAgICAvLyBXZSB0aGVyZWZvcmUgc3RvcCBsaXN0ZW5pbmcgdG8gdGhlIG9sZCBpbm5lciBiZWhhdmlvciBhbmQgYmVnaW5cbiAgICAgICAgLy8gbGlzdGVuaW5nIHRvIHRoZSBuZXcgb25lLlxuICAgICAgICBpZiAodGhpcy5pbm5lckIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5pbm5lckIucmVtb3ZlTGlzdGVuZXIodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV3SW5uZXIgPSB0aGlzLmlubmVyQiA9IHRoaXMuZm4oYSk7XG4gICAgICAgIG5ld0lubmVyLmFkZExpc3RlbmVyKHRoaXMpO1xuICAgICAgICB0aGlzLnN0YXRlID0gbmV3SW5uZXIuc3RhdGU7XG4gICAgICAgIHRoaXMuY2hhbmdlU3RhdGVEb3duKHRoaXMuc3RhdGUpO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PT0gMCAvKiBQdXNoICovKSB7XG4gICAgICAgICAgICB0aGlzLnB1c2gobmV3SW5uZXIuYXQoKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVzaChiKSB7XG4gICAgICAgIHRoaXMubGFzdCA9IGI7XG4gICAgICAgIHRoaXMuY2hpbGQucHVzaChiKTtcbiAgICB9XG4gICAgcHVsbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm4odGhpcy5vdXRlci5hdCgpKS5hdCgpO1xuICAgIH1cbn1cbi8qKiBAcHJpdmF0ZSAqL1xuY2xhc3MgV2hlbkJlaGF2aW9yIGV4dGVuZHMgQmVoYXZpb3Ige1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgdGhpcy5wdXNoKGF0KHBhcmVudCkpO1xuICAgIH1cbiAgICBwdXNoKHZhbCkge1xuICAgICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLmxhc3QgPSBGdXR1cmUub2Yoe30pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sYXN0ID0gbmV3IEJlaGF2aW9yRnV0dXJlKHRoaXMucGFyZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWxsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sYXN0O1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiB3aGVuKGIpIHtcbiAgICByZXR1cm4gbmV3IFdoZW5CZWhhdmlvcihiKTtcbn1cbi8vIEZJWE1FOiBUaGlzIGNhbiBwcm9iYWJseSBiZSBtYWRlIGxlc3MgdWdseS5cbi8qKiBAcHJpdmF0ZSAqL1xuY2xhc3MgU25hcHNob3RCZWhhdmlvciBleHRlbmRzIEJlaGF2aW9yIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnQsIGZ1dHVyZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgaWYgKGZ1dHVyZS5zdGF0ZSA9PT0gNCAvKiBEb25lICovKSB7XG4gICAgICAgICAgICAvLyBGdXR1cmUgaGFzIG9jY3VycmVkIGF0IHNvbWUgcG9pbnQgaW4gdGhlIHBhc3RcbiAgICAgICAgICAgIHRoaXMuYWZ0ZXJGdXR1cmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHBhcmVudC5zdGF0ZTtcbiAgICAgICAgICAgIHBhcmVudC5hZGRMaXN0ZW5lcih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMubGFzdCA9IEZ1dHVyZS5vZihhdChwYXJlbnQpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWZ0ZXJGdXR1cmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAwIC8qIFB1c2ggKi87XG4gICAgICAgICAgICB0aGlzLmxhc3QgPSBGLnNpbmtGdXR1cmUoKTtcbiAgICAgICAgICAgIGZ1dHVyZS5hZGRMaXN0ZW5lcih0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdXNoKHZhbCkge1xuICAgICAgICBpZiAodGhpcy5hZnRlckZ1dHVyZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIC8vIFRoZSBwdXNoIGlzIGNvbWluZyBmcm9tIHRoZSBGdXR1cmUsIGl0IGhhcyBqdXN0IG9jY3VycmVkLlxuICAgICAgICAgICAgdGhpcy5hZnRlckZ1dHVyZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxhc3QucmVzb2x2ZShhdCh0aGlzLnBhcmVudCkpO1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQuYWRkTGlzdGVuZXIodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBXZSBhcmUgcmVjZWl2aW5nIGFuIHVwZGF0ZSBmcm9tIGBwYXJlbnRgIGFmdGVyIGBmdXR1cmVgIGhhc1xuICAgICAgICAgICAgLy8gb2NjdXJyZWQuXG4gICAgICAgICAgICB0aGlzLmxhc3QgPSBGdXR1cmUub2YodmFsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWxsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sYXN0O1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBzbmFwc2hvdEF0KGIsIGYpIHtcbiAgICByZXR1cm4gbmV3IFNuYXBzaG90QmVoYXZpb3IoYiwgZik7XG59XG4vKiogQmVoYXZpb3JzIHRoYXQgYXJlIGFsd2F5cyBhY3RpdmUgKi9cbmV4cG9ydCBjbGFzcyBBY3RpdmVCZWhhdmlvciBleHRlbmRzIEJlaGF2aW9yIHtcbiAgICAvLyBub29wIG1ldGhvZHMsIGJlaGF2aW9yIGlzIGFsd2F5cyBhY3RpdmVcbiAgICBhY3RpdmF0ZSgpIHsgfVxuICAgIGRlYWN0aXZhdGUoKSB7IH1cbiAgICBjaGFuZ2VQdWxsZXJzKCkgeyB9XG59XG5leHBvcnQgY2xhc3MgU3RhdGVmdWxCZWhhdmlvciBleHRlbmRzIEFjdGl2ZUJlaGF2aW9yIHtcbiAgICBjb25zdHJ1Y3RvcihhLCBiLCBjKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYSA9IGE7XG4gICAgICAgIHRoaXMuYiA9IGI7XG4gICAgICAgIHRoaXMuYyA9IGM7XG4gICAgICAgIHRoaXMuc3RhdGUgPSAyIC8qIE9ubHlQdWxsICovO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBDb25zdGFudEJlaGF2aW9yIGV4dGVuZHMgQWN0aXZlQmVoYXZpb3Ige1xuICAgIGNvbnN0cnVjdG9yKGxhc3QpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5sYXN0ID0gbGFzdDtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IDAgLyogUHVzaCAqLztcbiAgICB9XG4gICAgc2VtYW50aWMoKSB7XG4gICAgICAgIHJldHVybiAoXykgPT4gdGhpcy5sYXN0O1xuICAgIH1cbn1cbi8qKiBAcHJpdmF0ZSAqL1xuZXhwb3J0IGNsYXNzIEZ1bmN0aW9uQmVoYXZpb3IgZXh0ZW5kcyBBY3RpdmVCZWhhdmlvciB7XG4gICAgY29uc3RydWN0b3IoZm4pIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5mbiA9IGZuO1xuICAgICAgICB0aGlzLnN0YXRlID0gMiAvKiBPbmx5UHVsbCAqLztcbiAgICB9XG4gICAgcHVsbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm4oKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gZnJvbUZ1bmN0aW9uKGZuKSB7XG4gICAgcmV0dXJuIG5ldyBGdW5jdGlvbkJlaGF2aW9yKGZuKTtcbn1cbi8qKiBAcHJpdmF0ZSAqL1xuY2xhc3MgU3dpdGNoZXJCZWhhdmlvciBleHRlbmRzIEFjdGl2ZUJlaGF2aW9yIHtcbiAgICBjb25zdHJ1Y3RvcihiLCBuZXh0KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYiA9IGI7XG4gICAgICAgIGIuYWRkTGlzdGVuZXIodGhpcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBiLnN0YXRlO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PT0gMCAvKiBQdXNoICovKSB7XG4gICAgICAgICAgICB0aGlzLmxhc3QgPSBhdChiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBGSVhNRTogVXNpbmcgYGJpbmRgIGlzIGhhcmRseSBvcHRpbWFsIGZvciBwZXJmb3JtYW5jZS5cbiAgICAgICAgbmV4dC5zdWJzY3JpYmUodGhpcy5kb1N3aXRjaC5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgcHVzaCh2YWwpIHtcbiAgICAgICAgdGhpcy5sYXN0ID0gdmFsO1xuICAgICAgICBpZiAodGhpcy5jaGlsZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkLnB1c2godmFsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWxsKCkge1xuICAgICAgICByZXR1cm4gYXQodGhpcy5iKTtcbiAgICB9XG4gICAgZG9Td2l0Y2gobmV3Qikge1xuICAgICAgICB0aGlzLmIucmVtb3ZlTGlzdGVuZXIodGhpcyk7XG4gICAgICAgIHRoaXMuYiA9IG5ld0I7XG4gICAgICAgIG5ld0IuYWRkTGlzdGVuZXIodGhpcyk7XG4gICAgICAgIGNvbnN0IG5ld1N0YXRlID0gbmV3Qi5zdGF0ZTtcbiAgICAgICAgaWYgKG5ld1N0YXRlID09PSAwIC8qIFB1c2ggKi8pIHtcbiAgICAgICAgICAgIHRoaXMucHVzaChuZXdCLmF0KCkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgaWYgKHRoaXMuY2hpbGQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5jaGlsZC5jaGFuZ2VTdGF0ZURvd24odGhpcy5zdGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIEZyb20gYW4gaW5pdGlhbCBiZWhhdmlvciBhbmQgYSBmdXR1cmUgb2YgYSBiZWhhdmlvciwgYHN3aXRjaGVyYFxuICogY3JlYXRlcyBhIG5ldyBiZWhhdmlvciB0aGF0IGFjdHMgZXhhY3RseSBsaWtlIGBpbml0aWFsYCB1bnRpbFxuICogYG5leHRgIG9jY3VycywgYWZ0ZXIgd2hpY2ggaXQgYWN0cyBsaWtlIHRoZSBiZWhhdmlvciBpdCBjb250YWlucy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN3aXRjaFRvKGluaXQsIG5leHQpIHtcbiAgICByZXR1cm4gbmV3IFN3aXRjaGVyQmVoYXZpb3IoaW5pdCwgbmV4dCk7XG59XG5leHBvcnQgZnVuY3Rpb24gc3dpdGNoZXIoaW5pdCwgc3RyZWFtKSB7XG4gICAgcmV0dXJuIGZyb21GdW5jdGlvbigoKSA9PiBuZXcgU3dpdGNoZXJCZWhhdmlvcihpbml0LCBzdHJlYW0pKTtcbn1cbmNsYXNzIFRlc3RCZWhhdmlvciBleHRlbmRzIEJlaGF2aW9yIHtcbiAgICBjb25zdHJ1Y3RvcihzZW1hbnRpY0JlaGF2aW9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc2VtYW50aWNCZWhhdmlvciA9IHNlbWFudGljQmVoYXZpb3I7XG4gICAgfVxuICAgIHNlbWFudGljKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW1hbnRpY0JlaGF2aW9yO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0QmVoYXZpb3IoYikge1xuICAgIHJldHVybiBuZXcgVGVzdEJlaGF2aW9yKGIpO1xufVxuLyoqIEBwcml2YXRlICovXG5jbGFzcyBBY3RpdmVTY2FuQmVoYXZpb3IgZXh0ZW5kcyBBY3RpdmVCZWhhdmlvciB7XG4gICAgY29uc3RydWN0b3IoZiwgbGFzdCwgcGFyZW50KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZiA9IGY7XG4gICAgICAgIHRoaXMubGFzdCA9IGxhc3Q7XG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgICAgICB0aGlzLnN0YXRlID0gMCAvKiBQdXNoICovO1xuICAgICAgICBwYXJlbnQuYWRkTGlzdGVuZXIodGhpcyk7XG4gICAgfVxuICAgIHB1c2godmFsKSB7XG4gICAgICAgIHRoaXMubGFzdCA9IHRoaXMuZih2YWwsIHRoaXMubGFzdCk7XG4gICAgICAgIGlmICh0aGlzLmNoaWxkKSB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkLnB1c2godGhpcy5sYXN0KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmNsYXNzIFNjYW5CZWhhdmlvciBleHRlbmRzIFN0YXRlZnVsQmVoYXZpb3Ige1xuICAgIHB1bGwoKSB7XG4gICAgICAgIHJldHVybiBuZXcgQWN0aXZlU2NhbkJlaGF2aW9yKHRoaXMuYSwgdGhpcy5iLCB0aGlzLmMpO1xuICAgIH1cbiAgICBzZW1hbnRpYygpIHtcbiAgICAgICAgY29uc3Qgc3RyZWFtID0gdGhpcy5jLnNlbWFudGljKCk7XG4gICAgICAgIHJldHVybiAodDEpID0+IHRlc3RCZWhhdmlvcigodDIpID0+IHN0cmVhbVxuICAgICAgICAgICAgLmZpbHRlcigoeyB0aW1lIH0pID0+IHQxIDw9IHRpbWUgJiYgdGltZSA8PSB0MilcbiAgICAgICAgICAgIC5tYXAoKG8pID0+IG8udmFsdWUpXG4gICAgICAgICAgICAucmVkdWNlKChhY2MsIGN1cikgPT4gdGhpcy5hKGN1ciwgYWNjKSwgdGhpcy5iKSk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHNjYW4oZiwgaW5pdGlhbCwgc291cmNlKSB7XG4gICAgcmV0dXJuIG5ldyBTY2FuQmVoYXZpb3IoZiwgaW5pdGlhbCwgc291cmNlKTtcbn1cbmNsYXNzIEluZGV4UmVhY3RpdmUgZXh0ZW5kcyBSZWFjdGl2ZSB7XG4gICAgY29uc3RydWN0b3IoaW5kZXgsIHBhcmVudCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMucGFyZW50cyA9IGNvbnMocGFyZW50KTtcbiAgICB9XG4gICAgcHVzaChhKSB7XG4gICAgICAgIHRoaXMuY2hpbGQucHVzaElkeChhLCB0aGlzLmluZGV4KTtcbiAgICB9XG59XG5jbGFzcyBBY3RpdmVTY2FuQ29tYmluZUJlaGF2aW9yIGV4dGVuZHMgQWN0aXZlQmVoYXZpb3Ige1xuICAgIGNvbnN0cnVjdG9yKHN0cmVhbXMsIGxhc3QpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5sYXN0ID0gbGFzdDtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IDAgLyogUHVzaCAqLztcbiAgICAgICAgdGhpcy5hY2N1bXVsYXRvcnMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHJlYW1zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBjb25zdCBbcywgZl0gPSBzdHJlYW1zW2ldO1xuICAgICAgICAgICAgdGhpcy5hY2N1bXVsYXRvcnMucHVzaChmKTtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4UmVhY3RpdmUgPSBuZXcgSW5kZXhSZWFjdGl2ZShpLCBzKTtcbiAgICAgICAgICAgIGluZGV4UmVhY3RpdmUuYWRkTGlzdGVuZXIodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnBhcmVudHMgPSBjb25zKGluZGV4UmVhY3RpdmUsIHRoaXMucGFyZW50cyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVzaElkeChhLCBpbmRleCkge1xuICAgICAgICB0aGlzLmxhc3QgPSB0aGlzLmFjY3VtdWxhdG9yc1tpbmRleF0oYSwgdGhpcy5sYXN0KTtcbiAgICAgICAgaWYgKHRoaXMuY2hpbGQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGQucHVzaCh0aGlzLmxhc3QpO1xuICAgICAgICB9XG4gICAgfVxufVxuY2xhc3MgU2NhbkNvbWJpbmVCZWhhdmlvciBleHRlbmRzIFN0YXRlZnVsQmVoYXZpb3Ige1xuICAgIHB1bGwoKSB7XG4gICAgICAgIHJldHVybiBuZXcgQWN0aXZlU2NhbkNvbWJpbmVCZWhhdmlvcih0aGlzLmEsIHRoaXMuYik7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHNjYW5Db21iaW5lKHBhaXJzLCBpbml0aWFsKSB7XG4gICAgcmV0dXJuIG5ldyBTY2FuQ29tYmluZUJlaGF2aW9yKHBhaXJzLCBpbml0aWFsKTtcbn1cbmNvbnN0IGZpcnN0QXJnID0gKGEsIGIpID0+IGE7XG4vKipcbiAqIENyZWF0ZXMgYSBCZWhhdmlvciB3aG9zZSB2YWx1ZSBpcyB0aGUgbGFzdCBvY2N1cnJlbmNlIGluIHRoZSBzdHJlYW0uXG4gKiBAcGFyYW0gaW5pdGlhbCAtIHRoZSBpbml0aWFsIHZhbHVlIHRoYXQgdGhlIGJlaGF2aW9yIGhhc1xuICogQHBhcmFtIHN0ZXBzIC0gdGhlIHN0cmVhbSB0aGF0IHdpbGwgY2hhbmdlIHRoZSB2YWx1ZSBvZiB0aGUgYmVoYXZpb3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0ZXBwZXIoaW5pdGlhbCwgc3RlcHMpIHtcbiAgICByZXR1cm4gc2NhbihmaXJzdEFyZywgaW5pdGlhbCwgc3RlcHMpO1xufVxuLyoqXG4gKlxuICogQHBhcmFtIGluaXRpYWwgdGhlIGluaXRpYWwgdmFsdWVcbiAqIEBwYXJhbSB0dXJuT24gdGhlIHN0cmVhbXMgdGhhdCB0dXJuIHRoZSBiZWhhdmlvciBvblxuICogQHBhcmFtIHR1cm5PZmYgdGhlIHN0cmVhbXMgdGhhdCB0dXJuIHRoZSBiZWhhdmlvciBvZmZcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZShpbml0aWFsLCB0dXJuT24sIHR1cm5PZmYpIHtcbiAgICByZXR1cm4gc3RlcHBlcihpbml0aWFsLCB0dXJuT24ubWFwVG8odHJ1ZSkuY29tYmluZSh0dXJuT2ZmLm1hcFRvKGZhbHNlKSkpO1xufVxuY2xhc3MgTW9tZW50QmVoYXZpb3IgZXh0ZW5kcyBCZWhhdmlvciB7XG4gICAgY29uc3RydWN0b3IoZikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmYgPSBmO1xuICAgICAgICB0aGlzLnNhbXBsZUJvdW5kID0gKGIpID0+IHRoaXMuc2FtcGxlKGIpO1xuICAgIH1cbiAgICBhY3RpdmF0ZSgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMubGFzdCA9IHRoaXMuZih0aGlzLnNhbXBsZUJvdW5kKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAwIC8qIFB1c2ggKi87XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoXCJwbGFjZWhvbGRlclwiIGluIGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSBlcnJvci5wbGFjZWhvbGRlcjtcbiAgICAgICAgICAgICAgICByZW1vdmVMaXN0ZW5lclBhcmVudHModGhpcywgdGhpcy5wYXJlbnRzKTtcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlci5hZGRMaXN0ZW5lcih0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudHMgPSBjb25zKHBsYWNlaG9sZGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHB1c2goKSB7XG4gICAgICAgIHJlbW92ZUxpc3RlbmVyUGFyZW50cyh0aGlzLCB0aGlzLnBhcmVudHMpO1xuICAgICAgICB0aGlzLnBhcmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuY2hpbGQucHVzaCh0aGlzLmxhc3QgPSB0aGlzLmYodGhpcy5zYW1wbGVCb3VuZCkpO1xuICAgIH1cbiAgICBzYW1wbGUoYikge1xuICAgICAgICBiLmFkZExpc3RlbmVyKHRoaXMpO1xuICAgICAgICB0aGlzLnBhcmVudHMgPSBjb25zKGIsIHRoaXMucGFyZW50cyk7XG4gICAgICAgIHJldHVybiBiLmF0KCk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIG1vbWVudChmKSB7XG4gICAgcmV0dXJuIG5ldyBNb21lbnRCZWhhdmlvcihmKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJlaGF2aW9yLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BmdW5raWEvaGFyZWFjdGl2ZS9kaXN0L2VzL2JlaGF2aW9yLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IFJlYWN0aXZlIH0gZnJvbSBcIi4vY29tbW9uXCI7XG5pbXBvcnQgeyBjb25zIH0gZnJvbSBcIi4vbGlua2VkbGlzdFwiO1xuaW1wb3J0IHsgZnJvbUZ1bmN0aW9uLCBzY2FuIH0gZnJvbSBcIi4vYmVoYXZpb3JcIjtcbi8qKlxuICogQSBzdHJlYW0gaXMgYSBsaXN0IG9mIG9jY3VycmVuY2VzIG92ZXIgdGltZS4gRWFjaCBvY2N1cnJlbmNlXG4gKiBoYXBwZW5zIGF0IGEgcG9pbnQgaW4gdGltZSBhbmQgaGFzIGFuIGFzc29jaWF0ZWQgdmFsdWUuXG4gKi9cbmV4cG9ydCBjbGFzcyBTdHJlYW0gZXh0ZW5kcyBSZWFjdGl2ZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuICAgIGNvbWJpbmUoc3RyZWFtKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ29tYmluZVN0cmVhbShzdHJlYW0sIHRoaXMpO1xuICAgIH1cbiAgICBtYXAoZikge1xuICAgICAgICByZXR1cm4gbmV3IE1hcFN0cmVhbSh0aGlzLCBmKTtcbiAgICB9XG4gICAgbWFwVG8oYikge1xuICAgICAgICByZXR1cm4gbmV3IE1hcFRvU3RyZWFtKHRoaXMsIGIpO1xuICAgIH1cbiAgICBmaWx0ZXIoZm4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBGaWx0ZXJTdHJlYW0odGhpcywgZm4pO1xuICAgIH1cbiAgICBzY2FuUyhmbiwgc3RhcnRpbmdWYWx1ZSkge1xuICAgICAgICByZXR1cm4gZnJvbUZ1bmN0aW9uKCgpID0+IG5ldyBTY2FuU3RyZWFtKGZuLCBzdGFydGluZ1ZhbHVlLCB0aGlzKSk7XG4gICAgfVxuICAgIHNjYW4oZm4sIGluaXQpIHtcbiAgICAgICAgcmV0dXJuIHNjYW4oZm4sIGluaXQsIHRoaXMpO1xuICAgIH1cbiAgICBsb2cocHJlZml4KSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlKGEgPT4gY29uc29sZS5sb2coYCR7cHJlZml4IHx8IFwiXCJ9IGAsIGEpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgc2VtYW50aWMoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHJlYW0gZG9lcyBub3QgaGF2ZSBhIHNlbWFudGljIHJlcHJlc2VudGF0aW9uXCIpO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBNYXBTdHJlYW0gZXh0ZW5kcyBTdHJlYW0ge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudCwgZikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmYgPSBmO1xuICAgICAgICB0aGlzLnBhcmVudHMgPSBjb25zKHBhcmVudCk7XG4gICAgfVxuICAgIHNlbWFudGljKCkge1xuICAgICAgICBjb25zdCBzID0gdGhpcy5wYXJlbnRzLnZhbHVlLnNlbWFudGljKCk7XG4gICAgICAgIHJldHVybiBzLm1hcCgoeyB0aW1lLCB2YWx1ZSB9KSA9PiAoeyB0aW1lLCB2YWx1ZTogdGhpcy5mKHZhbHVlKSB9KSk7XG4gICAgfVxuICAgIHB1c2goYSkge1xuICAgICAgICB0aGlzLmNoaWxkLnB1c2godGhpcy5mKGEpKTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgTWFwVG9TdHJlYW0gZXh0ZW5kcyBTdHJlYW0ge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudCwgYikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmIgPSBiO1xuICAgICAgICB0aGlzLnBhcmVudHMgPSBjb25zKHBhcmVudCk7XG4gICAgfVxuICAgIHNlbWFudGljKCkge1xuICAgICAgICBjb25zdCBzID0gdGhpcy5wYXJlbnRzLnZhbHVlLnNlbWFudGljKCk7XG4gICAgICAgIHJldHVybiBzLm1hcCgoeyB0aW1lIH0pID0+ICh7IHRpbWUsIHZhbHVlOiB0aGlzLmIgfSkpO1xuICAgIH1cbiAgICBwdXNoKGEpIHtcbiAgICAgICAgdGhpcy5jaGlsZC5wdXNoKHRoaXMuYik7XG4gICAgfVxufVxuY2xhc3MgRmlsdGVyU3RyZWFtIGV4dGVuZHMgU3RyZWFtIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnQsIGZuKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgICAgICB0aGlzLmZuID0gZm47XG4gICAgICAgIHRoaXMucGFyZW50cyA9IGNvbnMocGFyZW50KTtcbiAgICB9XG4gICAgc2VtYW50aWMoKSB7XG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLnBhcmVudC5zZW1hbnRpYygpO1xuICAgICAgICByZXR1cm4gcy5maWx0ZXIoKHsgdmFsdWUgfSkgPT4gdGhpcy5mbih2YWx1ZSkpO1xuICAgIH1cbiAgICBwdXNoKGEpIHtcbiAgICAgICAgaWYgKHRoaXMuZm4oYSkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGQucHVzaChhKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBhcHBseShiZWhhdmlvciwgc3RyZWFtKSB7XG4gICAgcmV0dXJuIHN0cmVhbS5tYXAoKGEpID0+IGJlaGF2aW9yLmF0KCkoYSkpO1xufVxuLyoqXG4gKiBAcGFyYW0gZm4gQSBwcmVkaWNhdGUgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgYm9vbGVhbiBmb3IgYEFgLlxuICogQHBhcmFtIHN0cmVhbSBUaGUgc3RyZWFtIHRvIGZpbHRlci5cbiAqIEByZXR1cm5zIFN0cmVhbSB0aGF0IG9ubHkgY29udGFpbnMgdGhlIG9jY3VycmVuY2VzIGZyb20gYHN0cmVhbWBcbiAqIGZvciB3aGljaCBgZm5gIHJldHVybnMgdHJ1ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlcihwcmVkaWNhdGUsIHMpIHtcbiAgICByZXR1cm4gcy5maWx0ZXIocHJlZGljYXRlKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzcGxpdChwcmVkaWNhdGUsIHN0cmVhbSkge1xuICAgIC8vIEl0IHNob3VsZCBiZSBwb3NzaWJsZSB0byBpbXBsZW1lbnQgdGhpcyBpbiBhIGZhc3RlciB3YXkgd2hlcmVcbiAgICAvLyBgcHJlZGljYXRlYCBpcyBvbmx5IGNhbGxlZCBvbmNlIGZvciBlYWNoIG9jY3VycmVuY2VcbiAgICByZXR1cm4gW3N0cmVhbS5maWx0ZXIocHJlZGljYXRlKSwgc3RyZWFtLmZpbHRlcigoYSkgPT4gIXByZWRpY2F0ZShhKSldO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlckFwcGx5KHByZWRpY2F0ZSwgc3RyZWFtKSB7XG4gICAgcmV0dXJuIHN0cmVhbS5maWx0ZXIoKGEpID0+IHByZWRpY2F0ZS5hdCgpKGEpKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBrZWVwV2hlbihzdHJlYW0sIGJlaGF2aW9yKSB7XG4gICAgcmV0dXJuIHN0cmVhbS5maWx0ZXIoKF8pID0+IGJlaGF2aW9yLmF0KCkpO1xufVxuLyoqIEZvciBzdGF0ZWZ1bCBzdHJlYW1zIHRoYXQgYXJlIGFsd2F5cyBhY3RpdmUgKi9cbmV4cG9ydCBjbGFzcyBBY3RpdmVTdHJlYW0gZXh0ZW5kcyBTdHJlYW0ge1xuICAgIGFjdGl2YXRlKCkgeyB9XG4gICAgZGVhY3RpdmF0ZSgpIHsgfVxufVxuY2xhc3MgRW1wdHlTdHJlYW0gZXh0ZW5kcyBBY3RpdmVTdHJlYW0ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cbiAgICBzZW1hbnRpYygpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIHB1c2goYSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJZb3UgY2Fubm90IHB1c2ggdG8gYW4gZW1wdHkgc3RyZWFtXCIpO1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBlbXB0eSA9IG5ldyBFbXB0eVN0cmVhbSgpO1xuY2xhc3MgU2NhblN0cmVhbSBleHRlbmRzIEFjdGl2ZVN0cmVhbSB7XG4gICAgY29uc3RydWN0b3IoZm4sIGxhc3QsIHBhcmVudCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmZuID0gZm47XG4gICAgICAgIHRoaXMubGFzdCA9IGxhc3Q7XG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgICAgICBwYXJlbnQuYWRkTGlzdGVuZXIodGhpcyk7XG4gICAgfVxuICAgIHNlbWFudGljKCkge1xuICAgICAgICBjb25zdCBzID0gdGhpcy5wYXJlbnQuc2VtYW50aWMoKTtcbiAgICAgICAgbGV0IGFjYyA9IHRoaXMubGFzdDtcbiAgICAgICAgcmV0dXJuIHMubWFwKCh7IHRpbWUsIHZhbHVlIH0pID0+IHtcbiAgICAgICAgICAgIGFjYyA9IHRoaXMuZm4odmFsdWUsIGFjYyk7XG4gICAgICAgICAgICByZXR1cm4geyB0aW1lLCB2YWx1ZTogYWNjIH07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwdXNoKGEpIHtcbiAgICAgICAgY29uc3QgdmFsID0gdGhpcy5sYXN0ID0gdGhpcy5mbihhLCB0aGlzLmxhc3QpO1xuICAgICAgICB0aGlzLmNoaWxkLnB1c2godmFsKTtcbiAgICB9XG59XG4vKipcbiAqIFRoZSByZXR1cm5lZCAgaW5pdGlhbGx5IGhhcyB0aGUgaW5pdGlhbCB2YWx1ZSwgb24gZWFjaCBvY2N1cnJlbmNlXG4gKiBpbiBgc291cmNlYCB0aGUgZnVuY3Rpb24gaXMgYXBwbGllZCB0byB0aGUgY3VycmVudCB2YWx1ZSBvZiB0aGVcbiAqIGJlaGF2aW9yIGFuZCB0aGUgdmFsdWUgb2YgdGhlIG9jY3VycmVuY2UsIHRoZSByZXR1cm5lZCB2YWx1ZVxuICogYmVjb21lcyB0aGUgbmV4dCB2YWx1ZSBvZiB0aGUgYmVoYXZpb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzY2FuUyhmbiwgc3RhcnRpbmdWYWx1ZSwgc3RyZWFtKSB7XG4gICAgcmV0dXJuIHN0cmVhbS5zY2FuUyhmbiwgc3RhcnRpbmdWYWx1ZSk7XG59XG4vKiogQHByaXZhdGUgKi9cbmNsYXNzIFN3aXRjaE91dGVyIHtcbiAgICBjb25zdHJ1Y3RvcihzKSB7XG4gICAgICAgIHRoaXMucyA9IHM7XG4gICAgfVxuICAgIGNoYW5nZVN0YXRlRG93bihzdGF0ZSkgeyB9XG4gICAgcHVzaChhKSB7XG4gICAgICAgIHRoaXMucy5kb1N3aXRjaChhKTtcbiAgICB9XG59XG5jbGFzcyBTd2l0Y2hCZWhhdmlvclN0cmVhbSBleHRlbmRzIFN0cmVhbSB7XG4gICAgY29uc3RydWN0b3IoYikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmIgPSBiO1xuICAgIH1cbiAgICBhY3RpdmF0ZSgpIHtcbiAgICAgICAgdGhpcy5vdXRlckNvbnN1bWVyID0gbmV3IFN3aXRjaE91dGVyKHRoaXMpO1xuICAgICAgICB0aGlzLmIuYWRkTGlzdGVuZXIodGhpcy5vdXRlckNvbnN1bWVyKTtcbiAgICAgICAgdGhpcy5jdXJyZW50U291cmNlID0gdGhpcy5iLmF0KCk7XG4gICAgICAgIHRoaXMuY3VycmVudFNvdXJjZS5hZGRMaXN0ZW5lcih0aGlzKTtcbiAgICB9XG4gICAgZGVhY3RpdmF0ZSgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U291cmNlLnJlbW92ZUxpc3RlbmVyKHRoaXMpO1xuICAgICAgICB0aGlzLmIucmVtb3ZlTGlzdGVuZXIodGhpcy5vdXRlckNvbnN1bWVyKTtcbiAgICB9XG4gICAgcHVzaChhKSB7XG4gICAgICAgIHRoaXMuY2hpbGQucHVzaChhKTtcbiAgICB9XG4gICAgZG9Td2l0Y2gobmV3U3RyZWFtKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFNvdXJjZS5yZW1vdmVMaXN0ZW5lcih0aGlzKTtcbiAgICAgICAgbmV3U3RyZWFtLmFkZExpc3RlbmVyKHRoaXMpO1xuICAgICAgICB0aGlzLmN1cnJlbnRTb3VyY2UgPSBuZXdTdHJlYW07XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHN3aXRjaFN0cmVhbShiKSB7XG4gICAgcmV0dXJuIG5ldyBTd2l0Y2hCZWhhdmlvclN0cmVhbShiKTtcbn1cbmNsYXNzIENoYW5nZXNTdHJlYW0gZXh0ZW5kcyBTdHJlYW0ge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnBhcmVudHMgPSBjb25zKHBhcmVudCk7XG4gICAgfVxuICAgIHB1c2goYSkge1xuICAgICAgICB0aGlzLmNoaWxkLnB1c2goYSk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZXMoYikge1xuICAgIHJldHVybiBuZXcgQ2hhbmdlc1N0cmVhbShiKTtcbn1cbmNsYXNzIENvbWJpbmVTdHJlYW0gZXh0ZW5kcyBTdHJlYW0ge1xuICAgIGNvbnN0cnVjdG9yKHMxLCBzMikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnMxID0gczE7XG4gICAgICAgIHRoaXMuczIgPSBzMjtcbiAgICAgICAgdGhpcy5wYXJlbnRzID0gY29ucyhzMSwgY29ucyhzMikpO1xuICAgIH1cbiAgICBzZW1hbnRpYygpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgIGNvbnN0IGEgPSB0aGlzLnMxLnNlbWFudGljKCk7XG4gICAgICAgIGNvbnN0IGIgPSB0aGlzLnMyLnNlbWFudGljKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBqID0gMDsgaSA8IGEubGVuZ3RoIHx8IGogPCBiLmxlbmd0aDspIHtcbiAgICAgICAgICAgIGlmIChqID09PSBiLmxlbmd0aCB8fCAoaSA8IGEubGVuZ3RoICYmIGFbaV0udGltZSA8PSBiW2pdLnRpbWUpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goYVtpXSk7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goYltqXSk7XG4gICAgICAgICAgICAgICAgaisrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHB1c2goYSkge1xuICAgICAgICB0aGlzLmNoaWxkLnB1c2goYSk7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFByb2R1Y2VyU3RyZWFtIGV4dGVuZHMgU3RyZWFtIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIHNlbWFudGljKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBIHByb2R1Y2VyIHN0cmVhbSBkb2VzIG5vdCBoYXZlIGEgc2VtYW50aWMgcmVwcmVzZW50YXRpb25cIik7XG4gICAgfVxuICAgIHB1c2goYSkge1xuICAgICAgICB0aGlzLmNoaWxkLnB1c2goYSk7XG4gICAgfVxufVxuY2xhc3MgUHJvZHVjZXJTdHJlYW1Gcm9tRnVuY3Rpb24gZXh0ZW5kcyBQcm9kdWNlclN0cmVhbSB7XG4gICAgY29uc3RydWN0b3IoYWN0aXZhdGVGbikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmFjdGl2YXRlRm4gPSBhY3RpdmF0ZUZuO1xuICAgIH1cbiAgICBhY3RpdmF0ZSgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IDAgLyogUHVzaCAqLztcbiAgICAgICAgdGhpcy5kZWFjdGl2YXRlRm4gPSB0aGlzLmFjdGl2YXRlRm4odGhpcy5wdXNoLmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBkZWFjdGl2YXRlKCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gMyAvKiBJbmFjdGl2ZSAqLztcbiAgICAgICAgdGhpcy5kZWFjdGl2YXRlRm4oKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gcHJvZHVjZXJTdHJlYW0oYWN0aXZhdGUpIHtcbiAgICByZXR1cm4gbmV3IFByb2R1Y2VyU3RyZWFtRnJvbUZ1bmN0aW9uKGFjdGl2YXRlKTtcbn1cbmV4cG9ydCBjbGFzcyBTaW5rU3RyZWFtIGV4dGVuZHMgUHJvZHVjZXJTdHJlYW0ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnB1c2hpbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgcHVzaChhKSB7XG4gICAgICAgIGlmICh0aGlzLnB1c2hpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGQucHVzaChhKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhY3RpdmF0ZSgpIHtcbiAgICAgICAgdGhpcy5wdXNoaW5nID0gdHJ1ZTtcbiAgICB9XG4gICAgZGVhY3RpdmF0ZSgpIHtcbiAgICAgICAgdGhpcy5wdXNoaW5nID0gZmFsc2U7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHNpbmtTdHJlYW0oKSB7XG4gICAgcmV0dXJuIG5ldyBTaW5rU3RyZWFtKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gc3Vic2NyaWJlKGZuLCBzdHJlYW0pIHtcbiAgICBzdHJlYW0uc3Vic2NyaWJlKGZuKTtcbn1cbmNsYXNzIFNuYXBzaG90U3RyZWFtIGV4dGVuZHMgU3RyZWFtIHtcbiAgICBjb25zdHJ1Y3RvcihiZWhhdmlvciwgc3RyZWFtKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYmVoYXZpb3IgPSBiZWhhdmlvcjtcbiAgICAgICAgdGhpcy5zdHJlYW0gPSBzdHJlYW07XG4gICAgfVxuICAgIHB1c2goYSkge1xuICAgICAgICB0aGlzLmNoaWxkLnB1c2godGhpcy5iZWhhdmlvci5hdCgpKTtcbiAgICB9XG4gICAgYWN0aXZhdGUoKSB7XG4gICAgICAgIHRoaXMuYmVoYXZpb3IuY2hhbmdlUHVsbGVycygxKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkTGlzdGVuZXIodGhpcyk7XG4gICAgfVxuICAgIGRlYWN0aXZhdGUoKSB7XG4gICAgICAgIHRoaXMuYmVoYXZpb3IuY2hhbmdlUHVsbGVycygtMSk7XG4gICAgICAgIHRoaXMuc3RyZWFtLnJlbW92ZUxpc3RlbmVyKHRoaXMpO1xuICAgIH1cbiAgICBzZW1hbnRpYygpIHtcbiAgICAgICAgY29uc3QgYiA9IHRoaXMuYmVoYXZpb3Iuc2VtYW50aWMoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyZWFtLnNlbWFudGljKCkubWFwKCh7IHRpbWUgfSkgPT4gKHsgdGltZSwgdmFsdWU6IGIodGltZSkgfSkpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBzbmFwc2hvdChiLCBzKSB7XG4gICAgcmV0dXJuIG5ldyBTbmFwc2hvdFN0cmVhbShiLCBzKTtcbn1cbmNsYXNzIFNuYXBzaG90V2l0aFN0cmVhbSBleHRlbmRzIFN0cmVhbSB7XG4gICAgY29uc3RydWN0b3IoZm4sIGJlaGF2aW9yLCBzdHJlYW0pIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5mbiA9IGZuO1xuICAgICAgICB0aGlzLmJlaGF2aW9yID0gYmVoYXZpb3I7XG4gICAgICAgIHRoaXMuc3RyZWFtID0gc3RyZWFtO1xuICAgIH1cbiAgICBwdXNoKGEpIHtcbiAgICAgICAgdGhpcy5jaGlsZC5wdXNoKHRoaXMuZm4oYSwgdGhpcy5iZWhhdmlvci5hdCgpKSk7XG4gICAgfVxuICAgIGFjdGl2YXRlKCkge1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRMaXN0ZW5lcih0aGlzKTtcbiAgICB9XG4gICAgZGVhY3RpdmF0ZSgpIHtcbiAgICAgICAgdGhpcy5zdHJlYW0ucmVtb3ZlTGlzdGVuZXIodGhpcyk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHNuYXBzaG90V2l0aChmLCBiLCBzKSB7XG4gICAgcmV0dXJuIG5ldyBTbmFwc2hvdFdpdGhTdHJlYW0oZiwgYiwgcyk7XG59XG5leHBvcnQgZnVuY3Rpb24gY29tYmluZSguLi5zdHJlYW1zKSB7XG4gICAgLy8gRklYTUU6IE1vcmUgcGVyZm9ybWFudCBpbXBsZW1lbnRhdGlvbiB3aXRoIGJlbmNobWFya1xuICAgIHJldHVybiBzdHJlYW1zLnJlZHVjZSgoczEsIHMyKSA9PiBzMS5jb21iaW5lKHMyKSwgZW1wdHkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyZWFtKHMpIHtcbiAgICByZXR1cm4gdHlwZW9mIHMgPT09IFwib2JqZWN0XCIgJiYgKFwic2NhblNcIiBpbiBzKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0cmVhbS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZnVua2lhL2hhcmVhY3RpdmUvZGlzdC9lcy9zdHJlYW0uanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgQWJzdHJhY3RGdW5jdG9yLCBtYXBUbyB9IGZyb20gXCIuL2Z1bmN0b3JcIjtcbmltcG9ydCB7IGlkLCBtaXhpbiwgYXBwbHksIGN1cnJ5MiwgY3VycnkzIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmV4cG9ydCBjbGFzcyBBYnN0cmFjdEFwcGxpY2F0aXZlIGV4dGVuZHMgQWJzdHJhY3RGdW5jdG9yIHtcbiAgICBhcChmKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpZnQoYXBwbHksIGYsIHRoaXMpO1xuICAgIH1cbiAgICBsaWZ0KCkge1xuICAgICAgICBjb25zdCBmID0gYXJndW1lbnRzWzBdO1xuICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFyZ3VtZW50c1sxXS5tYXAoZik7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFyZ3VtZW50c1syXS5hcChhcmd1bWVudHNbMV0ubWFwKGN1cnJ5MihmKSkpO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiBhcmd1bWVudHNbM10uYXAoYXJndW1lbnRzWzJdLmFwKGFyZ3VtZW50c1sxXS5tYXAoY3VycnkzKGYpKSkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG1hcChmKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFwKHRoaXMub2YoZikpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBhcHBsaWNhdGl2ZShjb25zdHJ1Y3Rvcikge1xuICAgIGNvbnN0IHByb3RvdHlwZSA9IGNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgICBpZiAoIShcIm9mXCIgaW4gcHJvdG90eXBlKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2FuJ3QgZGVyaXZlIGFwcGxpY2F0aXZlLiBgb2ZgIG1ldGhvZCBtaXNzaW5nLlwiKTtcbiAgICB9XG4gICAgaWYgKCEoXCJhcFwiIGluIHByb3RvdHlwZSkgJiYgIShcImxpZnRcIiBpbiBwcm90b3R5cGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW4ndCBkZXJpdmUgYXBwbGljYXRpdmUuIEVpdGhlciBgbGlmdGAgb3IgYGFwYCBtZXRob2QgbXVzdCBiZSBkZWZpbmVkLlwiKTtcbiAgICB9XG4gICAgbWl4aW4oY29uc3RydWN0b3IsIFtBYnN0cmFjdEZ1bmN0b3IsIEFic3RyYWN0QXBwbGljYXRpdmVdKTtcbn1cbmZ1bmN0aW9uIGlzQXJyYXlDb25zdHJ1Y3RvcihhKSB7XG4gICAgcmV0dXJuIGEgPT09IEFycmF5O1xufVxuZXhwb3J0IGZ1bmN0aW9uIG9mKGQsIGEpIHtcbiAgICBpZiAoaXNBcnJheUNvbnN0cnVjdG9yKGQpKSB7XG4gICAgICAgIHJldHVybiBbYV07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZC5vZihhKTtcbiAgICB9XG59XG5mdW5jdGlvbiBhcnJheUxpZnQoZiwgYXJncywgaW5kaWNlcykge1xuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gaW5kaWNlcy5sZW5ndGgpIHtcbiAgICAgICAgbGV0IHZhbHVlcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhbHVlc1tpXSA9IGFyZ3NbaV1baW5kaWNlc1tpXV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtmLmFwcGx5KHVuZGVmaW5lZCwgdmFsdWVzKV07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBsZXQgcmVzdWx0cyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3NbaW5kaWNlcy5sZW5ndGhdLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5jb25jYXQoYXJyYXlMaWZ0KGYsIGFyZ3MsIGluZGljZXMuY29uY2F0KGkpKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGFwKGZhLCBiYSkge1xuICAgIHJldHVybiBiYS5hcChmYSk7XG59XG4vLyBpbXBsZW1lbnRhdGlvblxuZXhwb3J0IGZ1bmN0aW9uIGxpZnQoZiwgLi4uYXJncykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFyZ3NbMF0pKSB7XG4gICAgICAgIHJldHVybiBhcnJheUxpZnQoZiwgYXJncywgW10pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbMF0ubGlmdChmLCAuLi5hcmdzKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gc2VxKGEsIGIpIHtcbiAgICByZXR1cm4gYXAobWFwVG8oaWQsIGEpLCBiKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcGxpY2F0aXZlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BmdW5raWEvamFiei9kaXN0L2VzL2FwcGxpY2F0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IG1peGluLCBpZCwgYXJyYXlGbGF0dGVuIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmV4cG9ydCBjbGFzcyBBYnN0cmFjdE1vbmFkIHtcbiAgICBjaGFpbihmKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcChmKS5mbGF0dGVuKCk7XG4gICAgfVxuICAgIGZsYXR0ZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYWluKGlkKTtcbiAgICB9XG4gICAgbWFwKGYpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhaW4oKGEpID0+IHRoaXMub2YoZihhKSkpO1xuICAgIH1cbiAgICBtYXBUbyhiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYWluKF8gPT4gdGhpcy5vZihiKSk7XG4gICAgfVxuICAgIGFwKG0pIHtcbiAgICAgICAgcmV0dXJuIG0uY2hhaW4oZiA9PiB0aGlzLmNoYWluKGEgPT4gdGhpcy5vZihmKGEpKSkpO1xuICAgIH1cbiAgICBsaWZ0KGYsIC4uLm1zKSB7XG4gICAgICAgIGNvbnN0IHsgb2YgfSA9IG1zWzBdO1xuICAgICAgICBzd2l0Y2ggKGYubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1zWzBdLm1hcChmKTtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gbXNbMF0uY2hhaW4oKGEpID0+IG1zWzFdLmNoYWluKChiKSA9PiBvZihmKGEsIGIpKSkpO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiBtc1swXS5jaGFpbigoYSkgPT4gbXNbMV0uY2hhaW4oKGIpID0+IG1zWzJdLmNoYWluKChjKSA9PiBvZihmKGEsIGIsIGMpKSkpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBtb25hZChjb25zdHJ1Y3Rvcikge1xuICAgIGNvbnN0IHAgPSBjb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gICAgaWYgKCEoXCJvZlwiIGluIHApKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW4ndCBkZXJpdmUgbW9uYWQuIGBvZmAgbWV0aG9kIG1pc3NpbmcuXCIpO1xuICAgIH1cbiAgICBpZiAoIShcImNoYWluXCIgaW4gcCkgJiYgIShcImZsYXR0ZW5cIiBpbiBwICYmIFwibWFwXCIgaW4gcCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbid0IGRlcml2ZSBtb25hZC4gRWl0aGVyIGBjaGFpbmAgb3IgYGZsYXR0ZW5gIGFuZCBgbWFwYCBtZXRob2QgbXVzdCBiZSBkZWZpbmVkLlwiKTtcbiAgICB9XG4gICAgaWYgKCEoXCJtdWx0aVwiIGluIHApKSB7XG4gICAgICAgIHAubXVsdGkgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCEoXCJtdWx0aVwiIGluIGNvbnN0cnVjdG9yKSkge1xuICAgICAgICBjb25zdHJ1Y3Rvci5tdWx0aSA9IGZhbHNlO1xuICAgIH1cbiAgICBtaXhpbihjb25zdHJ1Y3RvciwgW0Fic3RyYWN0TW9uYWRdKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuKG0pIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShtKSkge1xuICAgICAgICByZXR1cm4gYXJyYXlGbGF0dGVuKG0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG0uZmxhdHRlbigpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFycmF5Q2hhaW4oZiwgbSkge1xuICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG0ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY29uc3QgYWRkZWQgPSBmKG1baV0pO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFkZGVkLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChhZGRlZFtqXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjaGFpbihmLCBtKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobSkpIHtcbiAgICAgICAgcmV0dXJuIGFycmF5Q2hhaW4oZiwgbSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gbS5jaGFpbihmKTtcbiAgICB9XG59XG5mdW5jdGlvbiByZXBvcnRFcnJvckluR2VuZXJhdG9yKHZhbHVlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQW4gaW5jb3JyZWN0IHZhbHVlIHdhcyB5aWVsZGVkIGluc2lkZSBhIGdlbmVyYXRvciBmdW5jdGlvbjogXCIgK1xuICAgICAgICB2YWx1ZS50b1N0cmluZygpKTtcbn1cbmZ1bmN0aW9uIHNpbmdsZUdvKGRvaW5nLCBtLCBjaGVjaykge1xuICAgIGZ1bmN0aW9uIGRvUmVjKHYpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gZG9pbmcubmV4dCh2KTtcbiAgICAgICAgaWYgKHJlc3VsdC5kb25lID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gbS5vZihyZXN1bHQudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNoZWNrKHJlc3VsdC52YWx1ZSkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQudmFsdWUuY2hhaW4oZG9SZWMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVwb3J0RXJyb3JJbkdlbmVyYXRvcihyZXN1bHQudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtLmNoYWluKGRvUmVjKTtcbn1cbmZ1bmN0aW9uIG11bHRpR28oZ2VuLCBtLCBjaGVjaywgYXJncykge1xuICAgIGNvbnN0IGRvUmVjID0gZnVuY3Rpb24gKHYsIHN0YXRlU29GYXIpIHtcbiAgICAgICAgY29uc3QgZG9pbmcgPSBnZW4oLi4uYXJncyk7XG4gICAgICAgIGZvciAoY29uc3QgaXQgb2Ygc3RhdGVTb0Zhcikge1xuICAgICAgICAgICAgZG9pbmcubmV4dChpdCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gZG9pbmcubmV4dCh2KTtcbiAgICAgICAgaWYgKHJlc3VsdC5kb25lID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gbS5vZihyZXN1bHQudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNoZWNrKHJlc3VsdC52YWx1ZSkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1N0YXRlU29GYXIgPSBzdGF0ZVNvRmFyLmNvbmNhdCh2KTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQudmFsdWUuY2hhaW4oKHZ2KSA9PiBkb1JlYyh2diwgbmV3U3RhdGVTb0ZhcikpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVwb3J0RXJyb3JJbkdlbmVyYXRvcihyZXN1bHQudmFsdWUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gbS5jaGFpbih2diA9PiBkb1JlYyh2diwgW3VuZGVmaW5lZF0pKTtcbn1cbmZ1bmN0aW9uIGhhc0NoYWluKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLmNoYWluICE9PSB1bmRlZmluZWQ7XG59XG5leHBvcnQgZnVuY3Rpb24gYmVnaW5HbyhnZW4sIG1vbmFkLCBhcmdzID0gW10pIHtcbiAgICBjb25zdCBpdGVyYXRvciA9IGdlbiguLi5hcmdzKTtcbiAgICBjb25zdCB7IGRvbmUsIHZhbHVlIH0gPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgaWYgKGRvbmUgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKG1vbmFkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBtb25hZC5vZih2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgZ2VuZXJhdG9yIGZ1bmN0aW9uIG5ldmVyIHlpZWxkZWQgYSBtb25hZCBhbmQgbm8gbW9uYWQgd2FzIHNwZWNpZmllZC5cIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgY2hlY2sgPSBtb25hZCAhPT0gdW5kZWZpbmVkICYmIG1vbmFkLmlzID8gbW9uYWQuaXMgOiBoYXNDaGFpbjtcbiAgICBpZiAoIWNoZWNrKHZhbHVlKSkge1xuICAgICAgICByZXBvcnRFcnJvckluR2VuZXJhdG9yKHZhbHVlKTtcbiAgICB9XG4gICAgaWYgKHZhbHVlLm11bHRpID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBtdWx0aUdvKGdlbiwgdmFsdWUsIGNoZWNrLCBhcmdzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBzaW5nbGVHbyhpdGVyYXRvciwgdmFsdWUsIGNoZWNrKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gZ28oZ2VuLCBtb25hZCkge1xuICAgIHJldHVybiBiZWdpbkdvKGdlbiwgbW9uYWQsIFtdKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmZ28oZ2VuLCBtb25hZCkge1xuICAgIHJldHVybiAoLi4uYXJncykgPT4gYmVnaW5HbyhnZW4sIG1vbmFkLCBhcmdzKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1vbmFkLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BmdW5raWEvamFiei9kaXN0L2VzL21vbmFkLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIGlzQmVoYXZpb3IoYikge1xuICAgIHJldHVybiB0eXBlb2YgYiA9PT0gXCJvYmplY3RcIiAmJiAoXCJhdFwiIGluIGIpO1xufVxuZXhwb3J0IGNsYXNzIFB1c2hPbmx5T2JzZXJ2ZXIge1xuICAgIGNvbnN0cnVjdG9yKGNhbGxiYWNrLCBzb3VyY2UpIHtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgICAgc291cmNlLmFkZExpc3RlbmVyKHRoaXMpO1xuICAgICAgICBpZiAoaXNCZWhhdmlvcihzb3VyY2UpICYmIHNvdXJjZS5zdGF0ZSA9PT0gMCAvKiBQdXNoICovKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhzb3VyY2UuYXQoKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVzaChhKSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2soYSk7XG4gICAgfVxuICAgIGRlYWN0aXZhdGUoKSB7XG4gICAgICAgIHRoaXMuc291cmNlLnJlbW92ZUxpc3RlbmVyKHRoaXMpO1xuICAgIH1cbiAgICBjaGFuZ2VTdGF0ZURvd24oc3RhdGUpIHsgfVxufVxuZXhwb3J0IGNsYXNzIE11bHRpT2JzZXJ2ZXIge1xuICAgIGNvbnN0cnVjdG9yKGMxLCBjMikge1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IFtjMSwgYzJdO1xuICAgIH1cbiAgICBwdXNoKGEpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMubGlzdGVuZXJzLmxlbmd0aCAtIDE7IDAgPD0gaTsgLS1pKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1tpXS5wdXNoKGEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNoYW5nZVN0YXRlRG93bihzdGF0ZSkge1xuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5saXN0ZW5lcnMubGVuZ3RoIC0gMTsgMCA8PSBpOyAtLWkpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW2ldLmNoYW5nZVN0YXRlRG93bihzdGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gYWRkTGlzdGVuZXJQYXJlbnRzKGNoaWxkLCBwYXJlbnRzLCBzdGF0ZSkge1xuICAgIGNvbnN0IHBhcmVudFN0YXRlID0gcGFyZW50cy52YWx1ZS5hZGRMaXN0ZW5lcihjaGlsZCk7XG4gICAgY29uc3QgbmV3U3RhdGUgPSBwYXJlbnRTdGF0ZSAhPT0gMCAvKiBQdXNoICovID8gcGFyZW50U3RhdGUgOiBzdGF0ZTtcbiAgICBpZiAocGFyZW50cy50YWlsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGFkZExpc3RlbmVyUGFyZW50cyhjaGlsZCwgcGFyZW50cy50YWlsLCBuZXdTdGF0ZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyUGFyZW50cyhjaGlsZCwgcGFyZW50cykge1xuICAgIHBhcmVudHMudmFsdWUucmVtb3ZlTGlzdGVuZXIoY2hpbGQpO1xuICAgIGlmIChwYXJlbnRzLnRhaWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZW1vdmVMaXN0ZW5lclBhcmVudHMoY2hpbGQsIHBhcmVudHMudGFpbCk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZVB1bGxlcnNQYXJlbnRzKG4sIHBhcmVudHMpIHtcbiAgICBpZiAocGFyZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGlzQmVoYXZpb3IocGFyZW50cy52YWx1ZSkpIHtcbiAgICAgICAgcGFyZW50cy52YWx1ZS5jaGFuZ2VQdWxsZXJzKG4pO1xuICAgIH1cbiAgICBjaGFuZ2VQdWxsZXJzUGFyZW50cyhuLCBwYXJlbnRzLnRhaWwpO1xufVxuZXhwb3J0IGNsYXNzIFJlYWN0aXZlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IDMgLyogSW5hY3RpdmUgKi87XG4gICAgICAgIHRoaXMubnJPZkxpc3RlbmVycyA9IDA7XG4gICAgfVxuICAgIGFkZExpc3RlbmVyKGMpIHtcbiAgICAgICAgY29uc3QgbnIgPSArK3RoaXMubnJPZkxpc3RlbmVycztcbiAgICAgICAgaWYgKG5yID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkID0gYztcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuciA9PT0gMikge1xuICAgICAgICAgICAgdGhpcy5jaGlsZCA9IG5ldyBNdWx0aU9ic2VydmVyKHRoaXMuY2hpbGQsIGMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jaGlsZC5saXN0ZW5lcnMucHVzaChjKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgICB9XG4gICAgcmVtb3ZlTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgICAgICAgY29uc3QgbnIgPSAtLXRoaXMubnJPZkxpc3RlbmVycztcbiAgICAgICAgaWYgKG5yID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT09IDQgLyogRG9uZSAqLykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVhY3RpdmF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5yID09PSAxKSB7XG4gICAgICAgICAgICBjb25zdCBsID0gdGhpcy5jaGlsZC5saXN0ZW5lcnM7XG4gICAgICAgICAgICB0aGlzLmNoaWxkID0gbFtsWzBdID09PSBsaXN0ZW5lciA/IDEgOiAwXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGwgPSB0aGlzLmNoaWxkLmxpc3RlbmVycztcbiAgICAgICAgICAgIC8vIFRoZSBpbmRleE9mIGhlcmUgaXMgTyhuKSwgd2hlcmUgbiBpcyB0aGUgbnVtYmVyIG9mIGxpc3RlbmVycyxcbiAgICAgICAgICAgIC8vIGlmIHVzaW5nIGEgbGlua2VkIGxpc3QgaXQgc2hvdWxkIGJlIHBvc3NpYmxlIHRvIHBlcmZvcm0gdGhlXG4gICAgICAgICAgICAvLyB1bnN1YnNjcmliZSBvcGVyYXRpb24gaW4gY29uc3RhbnQgdGltZS5cbiAgICAgICAgICAgIGNvbnN0IGlkeCA9IGwuaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgICAgICAgICBpZiAoaWR4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGlmIChpZHggIT09IGwubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICBsW2lkeF0gPSBsW2wubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGwubGVuZ3RoLS07IC8vIHJlbW92ZSB0aGUgbGFzdCBlbGVtZW50IG9mIHRoZSBsaXN0XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2hhbmdlU3RhdGVEb3duKHN0YXRlKSB7XG4gICAgICAgIGlmICh0aGlzLmNoaWxkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGQuY2hhbmdlU3RhdGVEb3duKHN0YXRlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdWJzY3JpYmUoY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQdXNoT25seU9ic2VydmVyKGNhbGxiYWNrLCB0aGlzKTtcbiAgICB9XG4gICAgb2JzZXJ2ZShwdXNoLCBiZWdpblB1bGxpbmcsIGVuZFB1bGxpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDYk9ic2VydmVyKHB1c2gsIGJlZ2luUHVsbGluZywgZW5kUHVsbGluZywgdGhpcyk7XG4gICAgfVxuICAgIGFjdGl2YXRlKCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gYWRkTGlzdGVuZXJQYXJlbnRzKHRoaXMsIHRoaXMucGFyZW50cywgMCAvKiBQdXNoICovKTtcbiAgICB9XG4gICAgZGVhY3RpdmF0ZShkb25lID0gZmFsc2UpIHtcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXJQYXJlbnRzKHRoaXMsIHRoaXMucGFyZW50cyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBkb25lID09PSB0cnVlID8gNCAvKiBEb25lICovIDogMyAvKiBJbmFjdGl2ZSAqLztcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgQ2JPYnNlcnZlciB7XG4gICAgY29uc3RydWN0b3IoX3B1c2gsIF9iZWdpblB1bGxpbmcsIF9lbmRQdWxsaW5nLCBzb3VyY2UpIHtcbiAgICAgICAgdGhpcy5fcHVzaCA9IF9wdXNoO1xuICAgICAgICB0aGlzLl9iZWdpblB1bGxpbmcgPSBfYmVnaW5QdWxsaW5nO1xuICAgICAgICB0aGlzLl9lbmRQdWxsaW5nID0gX2VuZFB1bGxpbmc7XG4gICAgICAgIHRoaXMuc291cmNlID0gc291cmNlO1xuICAgICAgICBzb3VyY2UuYWRkTGlzdGVuZXIodGhpcyk7XG4gICAgICAgIGlmIChzb3VyY2Uuc3RhdGUgPT09IDEgLyogUHVsbCAqLyB8fCBzb3VyY2Uuc3RhdGUgPT09IDIgLyogT25seVB1bGwgKi8pIHtcbiAgICAgICAgICAgIF9iZWdpblB1bGxpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc0JlaGF2aW9yKHNvdXJjZSkgJiYgc291cmNlLnN0YXRlID09PSAwIC8qIFB1c2ggKi8pIHtcbiAgICAgICAgICAgIF9wdXNoKHNvdXJjZS5sYXN0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdXNoKGEpIHtcbiAgICAgICAgdGhpcy5fcHVzaChhKTtcbiAgICB9XG4gICAgY2hhbmdlU3RhdGVEb3duKHN0YXRlKSB7XG4gICAgICAgIGlmIChzdGF0ZSA9PT0gMSAvKiBQdWxsICovIHx8IHN0YXRlID09PSAyIC8qIE9ubHlQdWxsICovKSB7XG4gICAgICAgICAgICB0aGlzLl9iZWdpblB1bGxpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2VuZFB1bGxpbmcoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogT2JzZXJ2ZSBhIGJlaGF2aW9yIGZvciB0aGUgcHVycG9zZSBvZiBydW5uaW5nIHNpZGUtZWZmZWN0cyBiYXNlZCBvblxuICogdGhlIHZhbHVlIG9mIHRoZSBiZWhhdmlvci5cbiAqIEBwYXJhbSBwdXNoIENhbGxlZCB3aXRoIGFsbCB2YWx1ZXMgdGhhdCB0aGUgYmVoYXZpb3IgcHVzaGVzXG4gKiB0aHJvdWdoLlxuICogQHBhcmFtIGJlZ2luUHVsbGluZyBDYWxsZWQgd2hlbiB0aGUgY29uc3VtZXIgc2hvdWxkIGJlZ2luIHB1bGxpbmdcbiAqIHZhbHVlcyBmcm9tIHRoZSBiZWhhdmlvci5cbiAqIEBwYXJhbSBlbmRQdWxsaW5nIENhbGxlZCB3aGVuIHRoZSBjb25zdW1lciBzaG91bGQgc3RvcCBwdWxsaW5nLlxuICogQHBhcmFtIGJlaGF2aW9yIFRoZSBiZWhhdmlvciB0byBjb25zdW1lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JzZXJ2ZShwdXNoLCBiZWdpblB1bGxpbmcsIGVuZFB1bGxpbmcsIGJlaGF2aW9yKSB7XG4gICAgcmV0dXJuIGJlaGF2aW9yLm9ic2VydmUocHVzaCwgYmVnaW5QdWxsaW5nLCBlbmRQdWxsaW5nKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbW1vbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZnVua2lhL2hhcmVhY3RpdmUvZGlzdC9lcy9jb21tb24uanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGNsYXNzIENvbnMge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlLCB0YWlsKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy50YWlsID0gdGFpbDtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gY29ucyh2YWx1ZSwgdGFpbCkge1xuICAgIHJldHVybiBuZXcgQ29ucyh2YWx1ZSwgdGFpbCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZnJvbUFycmF5KHZhbHVlcykge1xuICAgIGxldCBsaXN0ID0gY29ucyh2YWx1ZXNbMF0pO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdmFsdWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGxpc3QgPSBjb25zKHZhbHVlc1tpXSwgbGlzdCk7XG4gICAgfVxuICAgIHJldHVybiBsaXN0O1xufVxuLyoqXG4gKiBBIGRvdWJseSBsaW5rZWQgbGlzdC4gVXBkYXRlcyBhcmUgZG9uZSBieSBtdXRhdGluZy4gUHJlcGVuZCwgYXBwZW5kXG4gKiBhbmQgcmVtb3ZlIGFsbCBydW4gaW4gTygxKSB0aW1lLlxuICovXG4vKiBOb3QgdXNlZCB5ZXQuIFRoZSBwbGFuIGlzIHRvIHVzZSBpdCB0byBrZWVwIHRyYWNrIG9mIHN1YnNjcmliZWQgY2hpbGRyZW4uXG5leHBvcnQgY2xhc3MgTGlua2VkTGlzdDxBPiB7XG4gIHNpemU6IG51bWJlcjtcbiAgaGVhZDogTm9kZTxBPiB8IHVuZGVmaW5lZDtcbiAgdGFpbDogTm9kZTxBPiB8IHVuZGVmaW5lZDtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zaXplID0gMDtcbiAgfVxuICBhcHBlbmQoYTogQSk6IExpbmtlZExpc3Q8QT4ge1xuICAgIGNvbnN0IHRhaWwgPSB0aGlzLnRhaWw7XG4gICAgY29uc3QgbmV3Tm9kZSA9IG5ldyBOb2RlKGEsIHRhaWwsIHVuZGVmaW5lZCk7XG4gICAgdGFpbC5uZXh0ID0gbmV3Tm9kZTtcbiAgICB0aGlzLnRhaWwgPSBuZXdOb2RlO1xuICAgIHRoaXMuc2l6ZSsrO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHJlbW92ZShub2RlOiBOb2RlPEE+KTogTGlua2VkTGlzdDxBPiB7XG4gICAgaWYgKG5vZGUubmV4dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBub2RlLm5leHQucHJldiA9IG5vZGUucHJldjtcbiAgICB9XG4gICAgaWYgKG5vZGUucHJldiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBub2RlLnByZXYubmV4dCA9IG5vZGUubmV4dDtcbiAgICB9XG4gICAgaWYgKHRoaXMuaGVhZCA9PT0gbm9kZSkge1xuICAgICAgdGhpcy5oZWFkID0gbm9kZS5uZXh0O1xuICAgIH1cbiAgICBpZiAodGhpcy50YWlsID09PSBub2RlKSB7XG4gICAgICB0aGlzLnRhaWwgPSBub2RlLnByZXY7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBOb2RlPEE+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHZhbHVlOiBBLFxuICAgIHB1YmxpYyBwcmV2OiBOb2RlPEE+IHwgdW5kZWZpbmVkLFxuICAgIHB1YmxpYyBuZXh0OiBOb2RlPEE+IHwgdW5kZWZpbmVkXG4gICkgeyB9XG59XG4qLyBcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpbmtlZGxpc3QuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGZ1bmtpYS9oYXJlYWN0aXZlL2Rpc3QvZXMvbGlua2VkbGlzdC5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgKiBmcm9tIFwiLi9zZW1pZ3JvdXBcIjtcbmV4cG9ydCAqIGZyb20gXCIuL21vbm9pZFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vZnVuY3RvclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vYXBwbGljYXRpdmVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL21vbmFkXCI7XG4vLyBOb3RlOiBNYXliZSBtdXN0IGJlIGV4cG9ydGVkIGJlZm9yZSBmb2xkYWJsZSBzbyB0aGF0IGNpcmN1bGFyXG4vLyBkZXBlbmRlbmNpZXMgYmV0d2VlbiBmb2xkYWJsZSBhbmQgbWF5YmUgYXJlIHJlc29sdmVkIGNvcnJlY3RseVxuZXhwb3J0ICogZnJvbSBcIi4vbWF5YmVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2ZvbGRhYmxlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi90cmF2ZXJzYWJsZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vZWl0aGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9jb25zbGlzdFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vaW5maW5pdGVsaXN0XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9pb1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vd3JpdGVyXCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZnVua2lhL2phYnovZGlzdC9lcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyB0c2xpYl8xIGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgbW9uYWQgfSBmcm9tIFwiQGZ1bmtpYS9qYWJ6XCI7XG5pbXBvcnQgeyBSZWFjdGl2ZSB9IGZyb20gXCIuL2NvbW1vblwiO1xuaW1wb3J0IHsgY29ucywgZnJvbUFycmF5IH0gZnJvbSBcIi4vbGlua2VkbGlzdFwiO1xuLyoqXG4gKiBBIGZ1dHVyZSBpcyBhIHRoaW5nIHRoYXQgb2NjdXJzIGF0IHNvbWUgcG9pbnQgaW4gdGltZSB3aXRoIGEgdmFsdWUuXG4gKiBJdCBjYW4gYmUgdW5kZXJzdG9vZCBhcyBhIHBhaXIgY29uc2lzdGluZyBvZiB0aGUgdGltZSB0aGUgZnV0dXJlXG4gKiBvY2N1cnMgYW5kIGl0cyBhc3NvY2lhdGVkIHZhbHVlLiBJdCBpcyBxdWl0ZSBsaWtlIGEgSmF2YVNjcmlwdFxuICogcHJvbWlzZS5cbiAqL1xubGV0IEZ1dHVyZSA9IGNsYXNzIEZ1dHVyZSBleHRlbmRzIFJlYWN0aXZlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5tdWx0aSA9IGZhbHNlO1xuICAgIH1cbiAgICByZXNvbHZlKHZhbCkge1xuICAgICAgICB0aGlzLmRlYWN0aXZhdGUodHJ1ZSk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWw7XG4gICAgICAgIGlmICh0aGlzLmNoaWxkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGQucHVzaCh2YWwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFkZExpc3RlbmVyKGMpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT09IDQgLyogRG9uZSAqLykge1xuICAgICAgICAgICAgYy5wdXNoKHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIDQgLyogRG9uZSAqLztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5hZGRMaXN0ZW5lcihjKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb21iaW5lKGZ1dHVyZSkge1xuICAgICAgICByZXR1cm4gbmV3IENvbWJpbmVGdXR1cmUodGhpcywgZnV0dXJlKTtcbiAgICB9XG4gICAgLy8gQSBmdXR1cmUgaXMgYSBmdW5jdG9yLCB3aGVuIHRoZSBmdXR1cmUgb2NjdXJzIHdlIGNhbiBmZWVkIGl0c1xuICAgIC8vIHJlc3VsdCB0aHJvdWdoIHRoZSBtYXBwaW5nIGZ1bmN0aW9uXG4gICAgbWFwKGYpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNYXBGdXR1cmUoZiwgdGhpcyk7XG4gICAgfVxuICAgIG1hcFRvKGIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNYXBUb0Z1dHVyZShiLCB0aGlzKTtcbiAgICB9XG4gICAgLy8gQSBmdXR1cmUgaXMgYW4gYXBwbGljYXRpdmUuIGBvZmAgZ2l2ZXMgYSBmdXR1cmUgdGhhdCBoYXMgYWx3YXlzXG4gICAgLy8gb2NjdXJyZWQgYXQgYWxsIHBvaW50cyBpbiB0aW1lLlxuICAgIHN0YXRpYyBvZihiKSB7XG4gICAgICAgIHJldHVybiBuZXcgT2ZGdXR1cmUoYik7XG4gICAgfVxuICAgIG9mKGIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPZkZ1dHVyZShiKTtcbiAgICB9XG4gICAgbGlmdChmLCAuLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiBmLmxlbmd0aCA9PT0gMSA/IG5ldyBNYXBGdXR1cmUoZiwgYXJnc1swXSlcbiAgICAgICAgICAgIDogbmV3IExpZnRGdXR1cmUoZiwgYXJncyk7XG4gICAgfVxuICAgIC8vIEEgZnV0dXJlIGlzIGEgbW9uYWQuIE9uY2UgdGhlIGZpcnN0IGZ1dHVyZSBvY2N1cnMgYGNoYWluYCBwYXNzZXNcbiAgICAvLyBpdHMgdmFsdWUgdGhyb3VnaCB0aGUgY2hhaW4gZnVuY3Rpb24gYW5kIHRoZSBmdXR1cmUgaXQgcmV0dXJucyBpc1xuICAgIC8vIHRoZSBvbmUgcmV0dXJuZWQgYnkgYGNoYWluYC5cbiAgICBjaGFpbihmKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ2hhaW5GdXR1cmUoZiwgdGhpcyk7XG4gICAgfVxufTtcbkZ1dHVyZSA9IHRzbGliXzEuX19kZWNvcmF0ZShbXG4gICAgbW9uYWRcbl0sIEZ1dHVyZSk7XG5leHBvcnQgeyBGdXR1cmUgfTtcbmNsYXNzIENvbWJpbmVGdXR1cmUgZXh0ZW5kcyBGdXR1cmUge1xuICAgIGNvbnN0cnVjdG9yKGZ1dHVyZTEsIGZ1dHVyZTIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5mdXR1cmUxID0gZnV0dXJlMTtcbiAgICAgICAgdGhpcy5mdXR1cmUyID0gZnV0dXJlMjtcbiAgICAgICAgdGhpcy5wYXJlbnRzID0gY29ucyhmdXR1cmUxLCBjb25zKGZ1dHVyZTIpKTtcbiAgICB9XG4gICAgcHVzaCh2YWwpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlKHZhbCk7XG4gICAgfVxufVxuY2xhc3MgTWFwRnV0dXJlIGV4dGVuZHMgRnV0dXJlIHtcbiAgICBjb25zdHJ1Y3RvcihmLCBwYXJlbnQpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5mID0gZjtcbiAgICAgICAgdGhpcy5wYXJlbnRzID0gY29ucyhwYXJlbnQpO1xuICAgIH1cbiAgICBwdXNoKHZhbCkge1xuICAgICAgICB0aGlzLnJlc29sdmUodGhpcy5mKHZhbCkpO1xuICAgIH1cbn1cbmNsYXNzIE1hcFRvRnV0dXJlIGV4dGVuZHMgRnV0dXJlIHtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSwgcGFyZW50KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5wYXJlbnRzID0gY29ucyhwYXJlbnQpO1xuICAgIH1cbiAgICBwdXNoKF8pIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlKHRoaXMudmFsdWUpO1xuICAgIH1cbn1cbmNsYXNzIE9mRnV0dXJlIGV4dGVuZHMgRnV0dXJlIHtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc3RhdGUgPSA0IC8qIERvbmUgKi87XG4gICAgfVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgcHVzaChfKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkEgUHVyZUZ1dHVyZSBzaG91bGQgbmV2ZXIgYmUgcHVzaGVkIHRvLlwiKTtcbiAgICB9XG59XG5jbGFzcyBMaWZ0RnV0dXJlIGV4dGVuZHMgRnV0dXJlIHtcbiAgICBjb25zdHJ1Y3RvcihmLCBmdXR1cmVzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZiA9IGY7XG4gICAgICAgIHRoaXMuZnV0dXJlcyA9IGZ1dHVyZXM7XG4gICAgICAgIHRoaXMubWlzc2luZyA9IGZ1dHVyZXMubGVuZ3RoO1xuICAgICAgICB0aGlzLnBhcmVudHMgPSBmcm9tQXJyYXkoZnV0dXJlcyk7XG4gICAgfVxuICAgIHB1c2goXykge1xuICAgICAgICBpZiAoLS10aGlzLm1pc3NpbmcgPT09IDApIHtcbiAgICAgICAgICAgIC8vIEFsbCB0aGUgZGVwZW5kZW5jaWVzIGhhdmUgb2NjdXJyZWQuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZnV0dXJlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZnV0dXJlc1tpXSA9IHRoaXMuZnV0dXJlc1tpXS52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZSh0aGlzLmYuYXBwbHkodW5kZWZpbmVkLCB0aGlzLmZ1dHVyZXMpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmNsYXNzIENoYWluRnV0dXJlIGV4dGVuZHMgRnV0dXJlIHtcbiAgICBjb25zdHJ1Y3RvcihmLCBwYXJlbnQpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5mID0gZjtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIHRoaXMucGFyZW50T2NjdXJyZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wYXJlbnRzID0gY29ucyhwYXJlbnQpO1xuICAgIH1cbiAgICBwdXNoKHZhbCkge1xuICAgICAgICBpZiAodGhpcy5wYXJlbnRPY2N1cnJlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIC8vIFRoZSBmaXJzdCBmdXR1cmUgb2NjdXJyZWQuIFdlIGNhbiBub3cgY2FsbCBgZmAgd2l0aCBpdHMgdmFsdWVcbiAgICAgICAgICAgIC8vIGFuZCBsaXN0ZW4gdG8gdGhlIGZ1dHVyZSBpdCByZXR1cm5zLlxuICAgICAgICAgICAgdGhpcy5wYXJlbnRPY2N1cnJlZCA9IHRydWU7XG4gICAgICAgICAgICBjb25zdCBuZXdGdXR1cmUgPSB0aGlzLmYodmFsKTtcbiAgICAgICAgICAgIG5ld0Z1dHVyZS5hZGRMaXN0ZW5lcih0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZSh2YWwpO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBBIFNpbmsgaXMgYSBwcm9kdWNlciB0aGF0IG9uZSBjYW4gaW1wZXJhdGl2ZWx5IHJlc29sdmUuXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgY2xhc3MgU2lua0Z1dHVyZSBleHRlbmRzIEZ1dHVyZSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBwdXNoKHZhbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBIHNpbmsgc2hvdWxkIG5vdCBiZSBwdXNoZWQgdG8uXCIpO1xuICAgIH1cbiAgICBhY3RpdmF0ZSgpIHsgfVxuICAgIGRlYWN0aXZhdGUoKSB7IH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBzaW5rRnV0dXJlKCkge1xuICAgIHJldHVybiBuZXcgU2lua0Z1dHVyZSgpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZyb21Qcm9taXNlKHApIHtcbiAgICBjb25zdCBmdXR1cmUgPSBzaW5rRnV0dXJlKCk7XG4gICAgcC50aGVuKGZ1dHVyZS5yZXNvbHZlLmJpbmQoZnV0dXJlKSk7XG4gICAgcmV0dXJuIGZ1dHVyZTtcbn1cbi8qKlxuICogQ3JlYXRlIGEgZnV0dXJlIGZyb20gYSBwdXNoaW5nIGJlaGF2aW9yLiBUaGUgZnV0dXJlIG9jY3VycyB3aGVuIHRoZVxuICogYmVoYXZpb3IgcHVzaGVzIGl0cyBuZXh0IHZhbHVlLiBDb25zdHJ1Y3RpbmcgYSBCZWhhdmlvckZ1dHVyZSBpc1xuICogaW1wdXJlIGFuZCBzaG91bGQgbm90IGJlIGRvbmUgZGlyZWN0bHkuXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgY2xhc3MgQmVoYXZpb3JGdXR1cmUgZXh0ZW5kcyBTaW5rRnV0dXJlIHtcbiAgICBjb25zdHJ1Y3RvcihiKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYiA9IGI7XG4gICAgICAgIGIuYWRkTGlzdGVuZXIodGhpcyk7XG4gICAgfVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgY2hhbmdlU3RhdGVEb3duKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCZWhhdmlvciBmdXR1cmUgZG9lcyBub3Qgc3VwcG9ydCBwdXNoaW5nIGJlaGF2aW9yXCIpO1xuICAgIH1cbiAgICBwdXNoKGEpIHtcbiAgICAgICAgdGhpcy5iLnJlbW92ZUxpc3RlbmVyKHRoaXMpO1xuICAgICAgICB0aGlzLnJlc29sdmUoYSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZnV0dXJlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BmdW5raWEvaGFyZWFjdGl2ZS9kaXN0L2VzL2Z1dHVyZS5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBvZiwgc2VxIH0gZnJvbSBcIi4vYXBwbGljYXRpdmVcIjtcbmltcG9ydCB7IGp1c3QsIG5vdGhpbmcgfSBmcm9tIFwiLi9tYXliZVwiO1xuaW1wb3J0IHsgbGVmdCwgcmlnaHQsIGlzUmlnaHQsIGZyb21FaXRoZXIgfSBmcm9tIFwiLi9laXRoZXJcIjtcbmltcG9ydCB7IG1peGluLCBhZGQsIGlkLCBpbXB1cmVQdXNoIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmZ1bmN0aW9uIGluY3IoXywgYWNjKSB7XG4gICAgcmV0dXJuIGFjYyArIDE7XG59XG5leHBvcnQgY2xhc3MgQWJzdHJhY3RGb2xkYWJsZSB7XG4gICAgZm9sZGwoZiwgaW5pdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb2xkcigoYSwgcikgPT4gKGFjYykgPT4gcihmKGFjYywgYSkpLCBpZCkoaW5pdCk7XG4gICAgfVxuICAgIHNob3J0Rm9sZHIoZiwgYWNjKSB7XG4gICAgICAgIHJldHVybiBmcm9tRWl0aGVyKHRoaXMuZm9sZHIoKGEsIGViKSA9PiAoaXNSaWdodChlYikgPyBmKGEsIGZyb21FaXRoZXIoZWIpKSA6IGViKSwgcmlnaHQoYWNjKSkpO1xuICAgIH1cbiAgICBzaG9ydEZvbGRsKGYsIGFjYykge1xuICAgICAgICByZXR1cm4gZnJvbUVpdGhlcih0aGlzLmZvbGRsKChlYiwgYSkgPT4gKGlzUmlnaHQoZWIpID8gZihmcm9tRWl0aGVyKGViKSwgYSkgOiBlYiksIHJpZ2h0KGFjYykpKTtcbiAgICB9XG4gICAgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9sZHIoaW5jciwgMCk7XG4gICAgfVxuICAgIG1heGltdW0oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvbGRyKE1hdGgubWF4LCAtSW5maW5pdHkpO1xuICAgIH1cbiAgICBtaW5pbXVtKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb2xkcihNYXRoLm1pbiwgSW5maW5pdHkpO1xuICAgIH1cbiAgICBzdW0oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvbGRyKGFkZCwgMCk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGZvbGRhYmxlKGNvbnN0cnVjdG9yKSB7XG4gICAgY29uc3QgcCA9IGNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgICBpZiAoIShcImZvbGRyXCIgaW4gcCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbid0IGRlcml2ZSBmb2xkYWJsZS4gYGZvbGRyYCBtZXRob2QgbWlzc2luZy5cIik7XG4gICAgfVxuICAgIG1peGluKGNvbnN0cnVjdG9yLCBbQWJzdHJhY3RGb2xkYWJsZV0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZvbGRNYXAoZiwgYSkge1xuICAgIHJldHVybiBmb2xkcigoYSwgYikgPT4gZi5jcmVhdGUoYSkuY29tYmluZShiKSwgZi5pZGVudGl0eSgpLCBhKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmb2xkcihmLCBpbml0LCBhKSB7XG4gICAgaWYgKGEgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBmb3IgKGxldCBpID0gYS5sZW5ndGggLSAxOyAwIDw9IGk7IC0taSkge1xuICAgICAgICAgICAgaW5pdCA9IGYoYVtpXSwgaW5pdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluaXQ7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gYS5mb2xkcihmLCBpbml0KTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gZm9sZGwoZiwgaW5pdCwgYSkge1xuICAgIGlmIChhIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpbml0ID0gZihpbml0LCBhW2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5pdDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBhLmZvbGRsKGYsIGluaXQpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBzaXplKGEpIHtcbiAgICBpZiAoYSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHJldHVybiBhLmxlbmd0aDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBhLnNpemUoKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eShhKSB7XG4gICAgaWYgKGEgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICByZXR1cm4gYS5sZW5ndGggPT09IDA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gYS5zaG9ydEZvbGRsKChfLCBhKSA9PiBsZWZ0KGZhbHNlKSwgdHJ1ZSk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHRha2UobiwgdCkge1xuICAgIGNvbnN0IGxpc3QgPSBbXTtcbiAgICBpZiAobiA9PT0gMCkge1xuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB0LnNob3J0Rm9sZGwoKGxpc3QsIGEpID0+IHtcbiAgICAgICAgICAgIGxpc3QucHVzaChhKTtcbiAgICAgICAgICAgIHJldHVybiAobGlzdC5sZW5ndGggPT09IG4gPyBsZWZ0IDogcmlnaHQpKGxpc3QpO1xuICAgICAgICB9LCBsaXN0KTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gZmluZChmLCB0KSB7XG4gICAgcmV0dXJuIHQuc2hvcnRGb2xkbCgoYWNjLCBhKSA9PiAoZihhKSA/IGxlZnQoanVzdChhKSkgOiByaWdodChhY2MpKSwgbm90aGluZyk7XG59XG5leHBvcnQgZnVuY3Rpb24gZmluZExhc3QoZiwgdCkge1xuICAgIHJldHVybiB0LnNob3J0Rm9sZHIoKGEsIGFjYykgPT4gKGYoYSkgPyBsZWZ0KGp1c3QoYSkpIDogcmlnaHQoYWNjKSksIG5vdGhpbmcpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRJbmRleChmLCB0KSB7XG4gICAgY29uc3QgaWR4ID0gdC5zaG9ydEZvbGRsKChpZHgsIGEpID0+IChmKGEpID8gbGVmdCgtaWR4KSA6IHJpZ2h0KGlkeCAtIDEpKSwgMCk7XG4gICAgcmV0dXJuIGlkeCA+PSAwID8ganVzdChpZHgpIDogbm90aGluZztcbn1cbmV4cG9ydCBmdW5jdGlvbiBmaW5kTGFzdEluZGV4KGYsIHQpIHtcbiAgICBjb25zdCBpZHggPSB0LnNob3J0Rm9sZHIoKGEsIGlkeCkgPT4gKGYoYSkgPyBsZWZ0KC1pZHgpIDogcmlnaHQoaWR4IC0gMSkpLCAtMSk7XG4gICAgcmV0dXJuIGlkeCA+PSAwID8ganVzdCh0LnNpemUoKSAtIGlkeCkgOiBub3RoaW5nO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNob3J0Rm9sZGwoZiwgYWNjLCBsKSB7XG4gICAgcmV0dXJuIGwuc2hvcnRGb2xkbChmLCBhY2MpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFsbChwcmVkLCBmb2xkYWJsZSkge1xuICAgIHJldHVybiBzaG9ydEZvbGRsKChfLCB2YWwpID0+IChwcmVkKHZhbCkgPT09IHRydWUgPyByaWdodCh0cnVlKSA6IGxlZnQoZmFsc2UpKSwgdHJ1ZSwgZm9sZGFibGUpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFueShwcmVkLCBmb2xkYWJsZSkge1xuICAgIHJldHVybiBzaG9ydEZvbGRsKChfLCB2YWwpID0+IChwcmVkKHZhbCkgPT09IHRydWUgPyBsZWZ0KHRydWUpIDogcmlnaHQoZmFsc2UpKSwgZmFsc2UsIGZvbGRhYmxlKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB0b0FycmF5KHQpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0KSkge1xuICAgICAgICByZXR1cm4gdDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB0LmZvbGRsKGltcHVyZVB1c2gsIFtdKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gc2VxdWVuY2VfKGQsIHQpIHtcbiAgICByZXR1cm4gZm9sZHIoc2VxLCBvZihkLCB1bmRlZmluZWQpLCB0KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmb2xkck0oZiwgbWIsIHQpIHtcbiAgICByZXR1cm4gZm9sZHIoKGEsIG1iKSA9PiBtYi5jaGFpbihiID0+IGYoYSwgYikpLCBtYiwgdCk7XG59XG5leHBvcnQgZnVuY3Rpb24gbWF4aW11bSh0KSB7XG4gICAgcmV0dXJuIHQubWF4aW11bSgpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG1pbmltdW0odCkge1xuICAgIHJldHVybiB0Lm1pbmltdW0oKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzdW0odCkge1xuICAgIHJldHVybiB0LnN1bSgpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Zm9sZGFibGUuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGZ1bmtpYS9qYWJ6L2Rpc3QvZXMvZm9sZGFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCB2YXIgRWl0aGVyVGFnO1xuKGZ1bmN0aW9uIChFaXRoZXJUYWcpIHtcbiAgICBFaXRoZXJUYWdbRWl0aGVyVGFnW1wiTGVmdFwiXSA9IDBdID0gXCJMZWZ0XCI7XG4gICAgRWl0aGVyVGFnW0VpdGhlclRhZ1tcIlJpZ2h0XCJdID0gMV0gPSBcIlJpZ2h0XCI7XG59KShFaXRoZXJUYWcgfHwgKEVpdGhlclRhZyA9IHt9KSk7XG5leHBvcnQgY2xhc3MgRWl0aGVyIHtcbiAgICBzdGF0aWMgb2YoYikge1xuICAgICAgICByZXR1cm4gbmV3IFJpZ2h0KGIpO1xuICAgIH1cbiAgICBvZihiKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmlnaHQoYik7XG4gICAgfVxuICAgIGFwKGEpIHtcbiAgICAgICAgaWYgKGEudGFnID09PSBFaXRoZXJUYWcuTGVmdCkge1xuICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXAoYS52YWwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxpZnQoZiwgLi4uYXJncykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChhcmdzW2ldLnRhZyA9PT0gRWl0aGVyVGFnLkxlZnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJnc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgcmlnaHRzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmlnaHRzLnB1c2goYXJnc1tpXS52YWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUmlnaHQoZiguLi5yaWdodHMpKTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgTGVmdCBleHRlbmRzIEVpdGhlciB7XG4gICAgY29uc3RydWN0b3IoYSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnRhZyA9IEVpdGhlclRhZy5MZWZ0O1xuICAgICAgICB0aGlzLnZhbCA9IGE7XG4gICAgfVxuICAgIG1hdGNoKG0pIHtcbiAgICAgICAgcmV0dXJuIG0ubGVmdCh0aGlzLnZhbCk7XG4gICAgfVxuICAgIG1hcChmKSB7XG4gICAgICAgIC8vIHJldHVybiB0aGlzIGFzIExlZnQ8QSwgQz47XG4gICAgICAgIHJldHVybiBuZXcgTGVmdCh0aGlzLnZhbCk7XG4gICAgfVxuICAgIG1hcFRvKGMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBMZWZ0KHRoaXMudmFsKTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgUmlnaHQgZXh0ZW5kcyBFaXRoZXIge1xuICAgIGNvbnN0cnVjdG9yKGIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy50YWcgPSBFaXRoZXJUYWcuUmlnaHQ7XG4gICAgICAgIHRoaXMudmFsID0gYjtcbiAgICB9XG4gICAgbWF0Y2gobSkge1xuICAgICAgICByZXR1cm4gbS5yaWdodCh0aGlzLnZhbCk7XG4gICAgfVxuICAgIG1hcChmKSB7XG4gICAgICAgIC8vIHJldHVybiB0aGlzIGFzIExlZnQ8QSwgQz47XG4gICAgICAgIHJldHVybiBuZXcgUmlnaHQoZih0aGlzLnZhbCkpO1xuICAgIH1cbiAgICBtYXBUbyhjKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmlnaHQoYyk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGxlZnQoYSkge1xuICAgIHJldHVybiBuZXcgTGVmdChhKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiByaWdodChiKSB7XG4gICAgcmV0dXJuIG5ldyBSaWdodChiKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0xlZnQoYSkge1xuICAgIHJldHVybiBhLnRhZyA9PT0gRWl0aGVyVGFnLkxlZnQ7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNSaWdodChhKSB7XG4gICAgcmV0dXJuIGEudGFnID09PSBFaXRoZXJUYWcuUmlnaHQ7XG59XG5leHBvcnQgZnVuY3Rpb24gZnJvbUVpdGhlcihlKSB7XG4gICAgcmV0dXJuIGUudmFsO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZWl0aGVyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BmdW5raWEvamFiei9kaXN0L2VzL2VpdGhlci5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0ICogZnJvbSBcIi4vY29tbW9uXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9iZWhhdmlvclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vc3RyZWFtXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9mdXR1cmVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL25vd1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vZG9tXCI7XG5leHBvcnQgKiBmcm9tIFwiLi90aW1lXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9wbGFjZWhvbGRlclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vYW5pbWF0aW9uXCI7XG5leHBvcnQgKiBmcm9tIFwiLi90ZXN0XCI7XG5leHBvcnQgZnVuY3Rpb24gbWFwKGZuLCBiKSB7XG4gICAgcmV0dXJuIGIubWFwKGZuKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwdWJsaXNoKGEsIHN0cmVhbSkge1xuICAgIHN0cmVhbS5wdXNoKGEpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGZ1bmtpYS9oYXJlYWN0aXZlL2Rpc3QvZXMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGZvbGRsQXJyYXkxLCBhcnJheUZsYXR0ZW4gfSBmcm9tIFwiLi91dGlsc1wiO1xuZnVuY3Rpb24gY29tYmluZVR3byhhLCBiKSB7XG4gICAgcmV0dXJuIGEuY29tYmluZShiKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lKC4uLmEpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhWzBdKSkge1xuICAgICAgICByZXR1cm4gYXJyYXlGbGF0dGVuKGEpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgYVswXSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm4gYS5qb2luKFwiXCIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZvbGRsQXJyYXkxKGNvbWJpbmVUd28sIGEpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlbWlncm91cC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZnVua2lhL2phYnovZGlzdC9lcy9zZW1pZ3JvdXAuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGNvbWJpbmUgfSBmcm9tIFwiLi9zZW1pZ3JvdXBcIjtcbmV4cG9ydCBmdW5jdGlvbiBpZGVudGl0eShtKSB7XG4gICAgaWYgKG0gPT09IEFycmF5KSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgZWxzZSBpZiAobSA9PT0gU3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG0uaWRlbnRpdHkoKTtcbiAgICB9XG59XG5leHBvcnQgeyBjb21iaW5lIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tb25vaWQuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGZ1bmtpYS9qYWJ6L2Rpc3QvZXMvbW9ub2lkLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBtaXhpbiB9IGZyb20gXCIuL3V0aWxzXCI7XG5mdW5jdGlvbiBhcnJheU1hcChmLCBhcykge1xuICAgIGxldCBuZXdBcnIgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGEgb2YgYXMpIHtcbiAgICAgICAgbmV3QXJyLnB1c2goZihhKSk7XG4gICAgfVxuICAgIHJldHVybiBuZXdBcnI7XG59XG5mdW5jdGlvbiByZXBlYXQoYSwgbGVuZ3RoKSB7XG4gICAgbGV0IG5ld0FyciA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgbmV3QXJyLnB1c2goYSk7XG4gICAgfVxuICAgIHJldHVybiBuZXdBcnI7XG59XG5leHBvcnQgY2xhc3MgQWJzdHJhY3RGdW5jdG9yIHtcbiAgICBtYXBUbyhiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcCgoXykgPT4gYik7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGZ1bmN0b3IoY29uc3RydWN0b3IpIHtcbiAgICBpZiAoIShcIm1hcFwiIGluIGNvbnN0cnVjdG9yLnByb3RvdHlwZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbid0IGRlcml2ZSBmdW5jdG9yLiBgbWFwYCBtZXRob2QgbWlzc2luZy5cIik7XG4gICAgfVxuICAgIG1peGluKGNvbnN0cnVjdG9yLCBbQWJzdHJhY3RGdW5jdG9yXSk7XG59XG5leHBvcnQgZnVuY3Rpb24gbWFwKGYsIGZ1bmN0b3IpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShmdW5jdG9yKSkge1xuICAgICAgICByZXR1cm4gYXJyYXlNYXAoZiwgZnVuY3Rvcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZnVuY3Rvci5tYXAoZik7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIG1hcFRvKGIsIGZ1bmN0b3IpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShmdW5jdG9yKSkge1xuICAgICAgICByZXR1cm4gcmVwZWF0KGIsIGZ1bmN0b3IubGVuZ3RoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBmdW5jdG9yLm1hcFRvKGIpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBtYXBNYXAoZiwgZnVuY3Rvcikge1xuICAgIHJldHVybiBtYXAoKGZhKSA9PiBtYXAoZiwgZmEpLCBmdW5jdG9yKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZ1bmN0b3IuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGZ1bmtpYS9qYWJ6L2Rpc3QvZXMvZnVuY3Rvci5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgdHNsaWJfMSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IGZvbGRhYmxlIH0gZnJvbSBcIi4vZm9sZGFibGVcIjtcbmltcG9ydCB7IGlkIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmV4cG9ydCBjbGFzcyBNYXliZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubXVsdGkgPSBmYWxzZTtcbiAgICB9XG4gICAgb2Yodikge1xuICAgICAgICByZXR1cm4ganVzdCh2KTtcbiAgICB9XG4gICAgc3RhdGljIG9mKHYpIHtcbiAgICAgICAgcmV0dXJuIGp1c3Qodik7XG4gICAgfVxuICAgIHN0YXRpYyBpcyhhKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgYSA9PT0gXCJvYmplY3RcIiAmJiBhLmlzTWF5YmUgPT09IHRydWU7XG4gICAgfVxuICAgIGZsYXR0ZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hdGNoKHtcbiAgICAgICAgICAgIG5vdGhpbmc6ICgpID0+IG5vdGhpbmcsXG4gICAgICAgICAgICBqdXN0OiBpZFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgbGlmdCgpIHtcbiAgICAgICAgY29uc3QgZiA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChpc05vdGhpbmcoYXJndW1lbnRzW2ldKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBub3RoaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4ganVzdChmKGFyZ3VtZW50c1sxXS52YWwpKTtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4ganVzdChmKGFyZ3VtZW50c1sxXS52YWwsIGFyZ3VtZW50c1syXS52YWwpKTtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4ganVzdChmKGFyZ3VtZW50c1sxXS52YWwsIGFyZ3VtZW50c1syXS52YWwsIGFyZ3VtZW50c1szXS52YWwpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXF1ZW5jZShhLCBtKSB7XG4gICAgICAgIHJldHVybiBtLm1hdGNoKHtcbiAgICAgICAgICAgIG5vdGhpbmc6ICgpID0+IGEub2Yobm90aGluZyksXG4gICAgICAgICAgICBqdXN0OiB2ID0+IHYubWFwKGp1c3QpXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbk1heWJlLm11bHRpID0gZmFsc2U7XG5sZXQgTm90aGluZyA9IGNsYXNzIE5vdGhpbmcgZXh0ZW5kcyBNYXliZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaXNNYXliZSA9IHRydWU7XG4gICAgfVxuICAgIG1hdGNoKG0pIHtcbiAgICAgICAgcmV0dXJuIG0ubm90aGluZygpO1xuICAgIH1cbiAgICBjaGFpbihmKSB7XG4gICAgICAgIHJldHVybiBub3RoaW5nO1xuICAgIH1cbiAgICBtYXAoZikge1xuICAgICAgICByZXR1cm4gbm90aGluZztcbiAgICB9XG4gICAgbWFwVG8oYikge1xuICAgICAgICByZXR1cm4gbm90aGluZztcbiAgICB9XG4gICAgYXAoYSkge1xuICAgICAgICByZXR1cm4gbm90aGluZztcbiAgICB9XG4gICAgZm9sZHIoZiwgaW5pdCkge1xuICAgICAgICByZXR1cm4gaW5pdDtcbiAgICB9XG4gICAgZm9sZGwoZiwgaW5pdCkge1xuICAgICAgICByZXR1cm4gaW5pdDtcbiAgICB9XG4gICAgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHRyYXZlcnNlKGEsIGYpIHtcbiAgICAgICAgcmV0dXJuIGEub2Yobm90aGluZyk7XG4gICAgfVxufTtcbk5vdGhpbmcgPSB0c2xpYl8xLl9fZGVjb3JhdGUoW1xuICAgIGZvbGRhYmxlXG5dLCBOb3RoaW5nKTtcbmxldCBKdXN0ID0gSnVzdF8xID0gY2xhc3MgSnVzdCBleHRlbmRzIE1heWJlIHtcbiAgICBjb25zdHJ1Y3Rvcih2YWwpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5pc01heWJlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy52YWwgPSB2YWw7XG4gICAgfVxuICAgIG1hdGNoKG0pIHtcbiAgICAgICAgcmV0dXJuIG0uanVzdCh0aGlzLnZhbCk7XG4gICAgfVxuICAgIGNoYWluKGYpIHtcbiAgICAgICAgcmV0dXJuIGYodGhpcy52YWwpO1xuICAgIH1cbiAgICBtYXAoZikge1xuICAgICAgICByZXR1cm4gbmV3IEp1c3RfMShmKHRoaXMudmFsKSk7XG4gICAgfVxuICAgIG1hcFRvKGIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBKdXN0XzEoYik7XG4gICAgfVxuICAgIGFwKG0pIHtcbiAgICAgICAgcmV0dXJuIG0ubWF0Y2goe1xuICAgICAgICAgICAgbm90aGluZzogKCkgPT4gbm90aGluZyxcbiAgICAgICAgICAgIGp1c3Q6IGYgPT4gbmV3IEp1c3RfMShmKHRoaXMudmFsKSlcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZvbGRyKGYsIGluaXQpIHtcbiAgICAgICAgcmV0dXJuIGYodGhpcy52YWwsIGluaXQpO1xuICAgIH1cbiAgICBmb2xkbChmLCBpbml0KSB7XG4gICAgICAgIHJldHVybiBmKGluaXQsIHRoaXMudmFsKTtcbiAgICB9XG4gICAgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIHRyYXZlcnNlKGEsIGYpIHtcbiAgICAgICAgcmV0dXJuIGYodGhpcy52YWwpLm1hcChqdXN0KTtcbiAgICB9XG59O1xuSnVzdCA9IEp1c3RfMSA9IHRzbGliXzEuX19kZWNvcmF0ZShbXG4gICAgZm9sZGFibGVcbl0sIEp1c3QpO1xuZXhwb3J0IGZ1bmN0aW9uIGp1c3Qodikge1xuICAgIHJldHVybiBuZXcgSnVzdCh2KTtcbn1cbmV4cG9ydCBjb25zdCBub3RoaW5nID0gbmV3IE5vdGhpbmcoKTtcbmV4cG9ydCBmdW5jdGlvbiBpc05vdGhpbmcobSkge1xuICAgIHJldHVybiBtID09PSBub3RoaW5nO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzSnVzdChtKSB7XG4gICAgcmV0dXJuIG0gIT09IG5vdGhpbmc7XG59XG5leHBvcnQgZnVuY3Rpb24gZnJvbU1heWJlKGEsIG0pIHtcbiAgICByZXR1cm4gbSA9PT0gbm90aGluZyA/IGEgOiBtLnZhbDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBtYXliZShiLCBmLCBtKSB7XG4gICAgcmV0dXJuIG0gPT09IG5vdGhpbmcgPyBiIDogZihtLnZhbCk7XG59XG52YXIgSnVzdF8xO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWF5YmUuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGZ1bmtpYS9qYWJ6L2Rpc3QvZXMvbWF5YmUuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IEFic3RyYWN0Rm9sZGFibGUgfSBmcm9tIFwiLi9mb2xkYWJsZVwiO1xuaW1wb3J0IHsgQWJzdHJhY3RBcHBsaWNhdGl2ZSB9IGZyb20gXCIuL2FwcGxpY2F0aXZlXCI7XG5pbXBvcnQgSWRlbnRpdHkgZnJvbSBcIi4vaWRlbnRpdHlcIjtcbmltcG9ydCBFbmRvIGZyb20gXCIuL21vbm9pZHMvZW5kb1wiO1xuaW1wb3J0IHsgQ29uc3RFbmRvIH0gZnJvbSBcIi4vY29uc3RcIjtcbmltcG9ydCB7IGlkLCBtaXhpbiwgY29ucyB9IGZyb20gXCIuL3V0aWxzXCI7XG5leHBvcnQgY2xhc3MgQWJzdHJhY3RUcmF2ZXJzYWJsZSBleHRlbmRzIEFic3RyYWN0Rm9sZGFibGUge1xuICAgIG1hcChmKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYXZlcnNlKElkZW50aXR5LCAoYSkgPT4gSWRlbnRpdHkub2YoZihhKSkpLmV4dHJhY3QoKTtcbiAgICB9XG4gICAgbWFwVG8oYikge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAoKF8pID0+IGIpO1xuICAgIH1cbiAgICB0cmF2ZXJzZShhLCBmKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlcXVlbmNlKGEsIHRoaXMubWFwKGYpKTtcbiAgICB9XG4gICAgc2VxdWVuY2UoYSwgdCkge1xuICAgICAgICByZXR1cm4gdC50cmF2ZXJzZShhLCBpZCk7XG4gICAgfVxuICAgIGZvbGRyKGYsIGFjYykge1xuICAgICAgICBjb25zdCBmMiA9IChhKSA9PiBuZXcgQ29uc3RFbmRvKG5ldyBFbmRvKChiKSA9PiBmKGEsIGIpKSk7XG4gICAgICAgIHJldHVybiBFbmRvLnRvRnVuY3Rpb24odGhpcy50cmF2ZXJzZShDb25zdEVuZG8sIGYyKS5nZXQoKSkoYWNjKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gdHJhdmVyc2FibGUoY29uc3RydWN0b3IpIHtcbiAgICBjb25zdCBwID0gY29uc3RydWN0b3IucHJvdG90eXBlO1xuICAgIGlmICghKFwibWFwXCIgaW4gcCAmJiBcInNlcXVlbmNlXCIgaW4gcCkgJiYgIShcInRyYXZlcnNlXCIgaW4gcCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbid0IGRlcml2ZSB0cmF2ZXJzYWJsZS4gRWl0aGVyIGB0cmF2ZXJzZWAgb3IgYG1hcGAgYW5kIGBzZXF1ZW5jZWAgbXVzdCBiZSBkZWZpbmVkLlwiKTtcbiAgICB9XG4gICAgbWl4aW4oY29uc3RydWN0b3IsIFtBYnN0cmFjdFRyYXZlcnNhYmxlLCBBYnN0cmFjdEZvbGRhYmxlXSk7XG59XG5mdW5jdGlvbiBhcnJheVNlcXVlbmNlKGEsIHQpIHtcbiAgICBsZXQgcmVzdWx0ID0gYS5vZihbXSk7XG4gICAgY29uc3QgbGlmdCA9IHJlc3VsdC5saWZ0O1xuICAgIGZvciAobGV0IGkgPSB0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHJlc3VsdCA9IGxpZnQoY29ucywgdFtpXSwgcmVzdWx0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIGFycmF5VHJhdmVyc2UoYSwgZiwgdCkge1xuICAgIGxldCByZXN1bHQgPSBhLm9mKFtdKTtcbiAgICBjb25zdCBsaWZ0ID0gcmVzdWx0LmxpZnQ7XG4gICAgZm9yIChsZXQgaSA9IHQubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgcmVzdWx0ID0gbGlmdChjb25zLCBmKHRbaV0pLCByZXN1bHQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNlcXVlbmNlKGEsIHQpIHtcbiAgICBpZiAodCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHJldHVybiBhcnJheVNlcXVlbmNlKGEsIHQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHQuc2VxdWVuY2UoYSwgdCk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNlKGEsIGYsIHQpIHtcbiAgICBpZiAodCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHJldHVybiBhcnJheVRyYXZlcnNlKGEsIGYsIHQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHQudHJhdmVyc2UoYSwgZik7XG4gICAgfVxufVxuY2xhc3MgQW5BcHBsaWNhdGl2ZSBleHRlbmRzIEFic3RyYWN0QXBwbGljYXRpdmUge1xuICAgIGNvbnN0cnVjdG9yKGYpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5mID0gZjtcbiAgICB9XG4gICAgb2YoYikge1xuICAgICAgICByZXR1cm4gbmV3IEFuQXBwbGljYXRpdmUoKGEpID0+IFthLCBiXSk7XG4gICAgfVxuICAgIHN0YXRpYyBvZihiKSB7XG4gICAgICAgIHJldHVybiBuZXcgQW5BcHBsaWNhdGl2ZSgoYSkgPT4gW2EsIGJdKTtcbiAgICB9XG4gICAgYXAoZmEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBbkFwcGxpY2F0aXZlKChhKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBbYTEsIGJdID0gdGhpcy5mKGEpO1xuICAgICAgICAgICAgY29uc3QgW2EyLCBmXSA9IGZhLmYoYTEpO1xuICAgICAgICAgICAgcmV0dXJuIFthMiwgZihiKV07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBydW4oYSkge1xuICAgICAgICByZXR1cm4gdGhpcy5mKGEpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBtYXBBY2N1bVIoZiwgaW5pdCwgdCkge1xuICAgIHJldHVybiB0LnRyYXZlcnNlKEFuQXBwbGljYXRpdmUsIChhKSA9PiBuZXcgQW5BcHBsaWNhdGl2ZSgoYykgPT4gZihjLCBhKSkpLnJ1bihpbml0KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRyYXZlcnNhYmxlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BmdW5raWEvamFiei9kaXN0L2VzL3RyYXZlcnNhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBjb21wb3NlIH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmRvIHtcbiAgICBjb25zdHJ1Y3Rvcihmbikge1xuICAgICAgICB0aGlzLmZuID0gZm47XG4gICAgfVxuICAgIHN0YXRpYyBpZGVudGl0eSgpIHtcbiAgICAgICAgcmV0dXJuIGVuZG9JZDtcbiAgICB9XG4gICAgaWRlbnRpdHkoKSB7XG4gICAgICAgIHJldHVybiBlbmRvSWQ7XG4gICAgfVxuICAgIGNvbWJpbmUoZSkge1xuICAgICAgICByZXR1cm4gbmV3IEVuZG8oY29tcG9zZSh0aGlzLmZuLCBlLmZuKSk7XG4gICAgfVxuICAgIHN0YXRpYyBjcmVhdGUoZikge1xuICAgICAgICByZXR1cm4gbmV3IEVuZG8oZik7XG4gICAgfVxuICAgIHN0YXRpYyB0b0Z1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIGUuZm47XG4gICAgfVxufVxuY29uc3QgZW5kb0lkID0gbmV3IEVuZG8oeCA9PiB4KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVuZG8uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGZ1bmtpYS9qYWJ6L2Rpc3QvZXMvbW9ub2lkcy9lbmRvLmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBCZWhhdmlvciwgaXNCZWhhdmlvciwgTWFwQmVoYXZpb3IgfSBmcm9tIFwiLi9iZWhhdmlvclwiO1xuaW1wb3J0IHsgU3RyZWFtLCBNYXBUb1N0cmVhbSB9IGZyb20gXCIuL3N0cmVhbVwiO1xuY2xhc3MgU2FtcGxlUGxhY2Vob2xkZXJFcnJvciB7XG4gICAgY29uc3RydWN0b3IocGxhY2Vob2xkZXIpIHtcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBcIkF0dGVtcHQgdG8gc2FtcGxlIG5vbi1yZXBsYWNlZCBwbGFjZWhvbGRlclwiO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgUGxhY2Vob2xkZXIgZXh0ZW5kcyBCZWhhdmlvciB7XG4gICAgcmVwbGFjZVdpdGgocGFyZW50KSB7XG4gICAgICAgIHRoaXMuc291cmNlID0gcGFyZW50O1xuICAgICAgICBpZiAodGhpcy5jaGlsZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlKCk7XG4gICAgICAgICAgICBpZiAoaXNCZWhhdmlvcihwYXJlbnQpICYmIHRoaXMuc3RhdGUgPT09IDAgLyogUHVzaCAqLykge1xuICAgICAgICAgICAgICAgIHRoaXMucHVzaChwYXJlbnQuYXQoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQmVoYXZpb3IocGFyZW50KSkge1xuICAgICAgICAgICAgcGFyZW50LmNoYW5nZVB1bGxlcnModGhpcy5uck9mUHVsbGVycyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVzaChhKSB7XG4gICAgICAgIHRoaXMubGFzdCA9IGE7XG4gICAgICAgIHRoaXMuY2hpbGQucHVzaChhKTtcbiAgICB9XG4gICAgcHVsbCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc291cmNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBTYW1wbGVQbGFjZWhvbGRlckVycm9yKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNvdXJjZS5wdWxsKCk7XG4gICAgfVxuICAgIGFjdGl2YXRlKCkge1xuICAgICAgICBpZiAodGhpcy5zb3VyY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zb3VyY2UuYWRkTGlzdGVuZXIodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5zb3VyY2Uuc3RhdGU7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlRG93bih0aGlzLnN0YXRlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkZWFjdGl2YXRlKGRvbmUgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLnN0YXRlID0gMyAvKiBJbmFjdGl2ZSAqLztcbiAgICAgICAgaWYgKHRoaXMuc291cmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc291cmNlLnJlbW92ZUxpc3RlbmVyKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNoYW5nZVB1bGxlcnMobikge1xuICAgICAgICB0aGlzLm5yT2ZQdWxsZXJzICs9IG47XG4gICAgICAgIGlmICh0aGlzLnNvdXJjZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnNvdXJjZS5jaGFuZ2VQdWxsZXJzKG4pO1xuICAgICAgICB9XG4gICAgfVxuICAgIG1hcChmbikge1xuICAgICAgICByZXR1cm4gbmV3IE1hcFBsYWNlaG9sZGVyKHRoaXMsIGZuKTtcbiAgICB9XG4gICAgbWFwVG8oYikge1xuICAgICAgICByZXR1cm4gKG5ldyBNYXBUb1BsYWNlaG9sZGVyKHRoaXMsIGIpKTtcbiAgICB9XG59XG5jbGFzcyBNYXBQbGFjZWhvbGRlciBleHRlbmRzIE1hcEJlaGF2aW9yIHtcbn1cbmNsYXNzIE1hcFRvUGxhY2Vob2xkZXIgZXh0ZW5kcyBNYXBUb1N0cmVhbSB7XG59XG5mdW5jdGlvbiBpbnN0YWxsKHRhcmdldCwgc291cmNlKSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc291cmNlLnByb3RvdHlwZSkpIHtcbiAgICAgICAgaWYgKHRhcmdldC5wcm90b3R5cGVba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0YXJnZXQucHJvdG90eXBlW2tleV0gPSBzb3VyY2UucHJvdG90eXBlW2tleV07XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBpbnN0YWxsTWV0aG9kcygpIHtcbiAgICBpbnN0YWxsKFBsYWNlaG9sZGVyLCBTdHJlYW0pO1xuICAgIE1hcFBsYWNlaG9sZGVyLnByb3RvdHlwZS5tYXAgPSBQbGFjZWhvbGRlci5wcm90b3R5cGUubWFwO1xuICAgIE1hcFBsYWNlaG9sZGVyLnByb3RvdHlwZS5tYXBUbyA9IFBsYWNlaG9sZGVyLnByb3RvdHlwZS5tYXBUbztcbiAgICBNYXBUb1BsYWNlaG9sZGVyLnByb3RvdHlwZS5tYXAgPSBQbGFjZWhvbGRlci5wcm90b3R5cGUubWFwO1xuICAgIE1hcFRvUGxhY2Vob2xkZXIucHJvdG90eXBlLm1hcFRvID0gUGxhY2Vob2xkZXIucHJvdG90eXBlLm1hcFRvO1xuICAgIGluc3RhbGwoTWFwUGxhY2Vob2xkZXIsIFN0cmVhbSk7XG4gICAgaW5zdGFsbChNYXBUb1BsYWNlaG9sZGVyLCBCZWhhdmlvcik7XG59XG5leHBvcnQgZnVuY3Rpb24gcGxhY2Vob2xkZXIoKSB7XG4gICAgaWYgKFBsYWNlaG9sZGVyLnByb3RvdHlwZS5zY2FuUyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIFRoZSBtZXRob2RzIGFyZSBpbnN0YWxsZWQgbGF6aWx5IHdoZW4gdGhlIHBsYWNlaG9sZGVyIGlzIGZpcnN0XG4gICAgICAgIC8vIHVzZWQuIFRoaXMgYXZvaWRzIGEgdG9wLWxldmVsIGltcHVyZSBleHByZXNzaW9uIHRoYXQgd291bGRcbiAgICAgICAgLy8gcHJldmVudCB0cmVlLXNoYWtpbmcuXG4gICAgICAgIGluc3RhbGxNZXRob2RzKCk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUGxhY2Vob2xkZXIoKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBsYWNlaG9sZGVyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BmdW5raWEvaGFyZWFjdGl2ZS9kaXN0L2VzL3BsYWNlaG9sZGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZnVuY3Rpb24gdm5vZGUoc2VsLCBkYXRhLCBjaGlsZHJlbiwgdGV4dCwgZWxtKSB7XG4gICAgdmFyIGtleSA9IGRhdGEgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IGRhdGEua2V5O1xuICAgIHJldHVybiB7IHNlbDogc2VsLCBkYXRhOiBkYXRhLCBjaGlsZHJlbjogY2hpbGRyZW4sXG4gICAgICAgIHRleHQ6IHRleHQsIGVsbTogZWxtLCBrZXk6IGtleSB9O1xufVxuZXhwb3J0IGRlZmF1bHQgdm5vZGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD12bm9kZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9lcy92bm9kZS5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IHZhciBhcnJheSA9IEFycmF5LmlzQXJyYXk7XG5leHBvcnQgZnVuY3Rpb24gcHJpbWl0aXZlKHMpIHtcbiAgICByZXR1cm4gdHlwZW9mIHMgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBzID09PSAnbnVtYmVyJztcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL2VzL2lzLmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyB2bm9kZSB9IGZyb20gJy4vdm5vZGUnO1xuaW1wb3J0ICogYXMgaXMgZnJvbSAnLi9pcyc7XG5mdW5jdGlvbiBhZGROUyhkYXRhLCBjaGlsZHJlbiwgc2VsKSB7XG4gICAgZGF0YS5ucyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG4gICAgaWYgKHNlbCAhPT0gJ2ZvcmVpZ25PYmplY3QnICYmIGNoaWxkcmVuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdmFyIGNoaWxkRGF0YSA9IGNoaWxkcmVuW2ldLmRhdGE7XG4gICAgICAgICAgICBpZiAoY2hpbGREYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBhZGROUyhjaGlsZERhdGEsIGNoaWxkcmVuW2ldLmNoaWxkcmVuLCBjaGlsZHJlbltpXS5zZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGgoc2VsLCBiLCBjKSB7XG4gICAgdmFyIGRhdGEgPSB7fSwgY2hpbGRyZW4sIHRleHQsIGk7XG4gICAgaWYgKGMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkYXRhID0gYjtcbiAgICAgICAgaWYgKGlzLmFycmF5KGMpKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IGM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXMucHJpbWl0aXZlKGMpKSB7XG4gICAgICAgICAgICB0ZXh0ID0gYztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjICYmIGMuc2VsKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IFtjXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChiICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGlzLmFycmF5KGIpKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IGI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXMucHJpbWl0aXZlKGIpKSB7XG4gICAgICAgICAgICB0ZXh0ID0gYjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChiICYmIGIuc2VsKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IFtiXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhdGEgPSBiO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChpcy5hcnJheShjaGlsZHJlbikpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAoaXMucHJpbWl0aXZlKGNoaWxkcmVuW2ldKSlcbiAgICAgICAgICAgICAgICBjaGlsZHJlbltpXSA9IHZub2RlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGNoaWxkcmVuW2ldLCB1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChzZWxbMF0gPT09ICdzJyAmJiBzZWxbMV0gPT09ICd2JyAmJiBzZWxbMl0gPT09ICdnJyAmJlxuICAgICAgICAoc2VsLmxlbmd0aCA9PT0gMyB8fCBzZWxbM10gPT09ICcuJyB8fCBzZWxbM10gPT09ICcjJykpIHtcbiAgICAgICAgYWRkTlMoZGF0YSwgY2hpbGRyZW4sIHNlbCk7XG4gICAgfVxuICAgIHJldHVybiB2bm9kZShzZWwsIGRhdGEsIGNoaWxkcmVuLCB0ZXh0LCB1bmRlZmluZWQpO1xufVxuO1xuZXhwb3J0IGRlZmF1bHQgaDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWguanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc25hYmJkb20vZXMvaC5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgUiBmcm9tICdyYW1kYSc7XG5pbXBvcnQgeyBydW5Ob3csIHRpbWUsIGZyb21Qcm9taXNlLCBzbmFwc2hvdCwgc2FtcGxlLCBOb3csIHBlcmZvcm0gfSBmcm9tICdAZnVua2lhL2hhcmVhY3RpdmUnO1xuaW1wb3J0ICogYXMgc25hYmJkb20gZnJvbSAnc25hYmJkb20nO1xuXG5pbXBvcnQgc25hYkNsYXNzID0gcmVxdWlyZSgnc25hYmJkb20vbW9kdWxlcy9jbGFzcycpO1xuaW1wb3J0IHNuYWJFTHMgPSByZXF1aXJlKCdzbmFiYmRvbS9tb2R1bGVzL2V2ZW50bGlzdGVuZXJzJyk7XG5pbXBvcnQgc25hYkF0dHJzID0gcmVxdWlyZSgnc25hYmJkb20vbW9kdWxlcy9hdHRyaWJ1dGVzJyk7XG5pbXBvcnQgc25hYlByb3BzID0gcmVxdWlyZSgnc25hYmJkb20vbW9kdWxlcy9wcm9wcycpO1xuXG5jb25zdCBoID0gc25hYmJkb20uaDtcblxuY29uc3QgcGF0Y2ggPSBzbmFiYmRvbS5pbml0KFtcbiAgc25hYkNsYXNzLmRlZmF1bHQsXG4gIHNuYWJFTHMuZGVmYXVsdCxcbiAgc25hYkF0dHJzLmRlZmF1bHQsXG4gIHNuYWJQcm9wcy5kZWZhdWx0LFxuXSk7XG5cbmNvbnN0IHJvb3QgPSBkb2N1bWVudC5ib2R5O1xuXG5jb25zdCB0aHJlZSA9IFByb21pc2UucmVzb2x2ZSgzKTtcbmNvbnN0IGYgPSBmcm9tUHJvbWlzZSh0aHJlZSk7XG5wZXJmb3JtKGNvbnNvbGUubG9nKCdoaScpKVxuXG4vLyBydW5Ob3coKVxucGF0Y2gocm9vdCwgaCgnZGl2JywgJ29oIGhhaScpKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC50cyIsImltcG9ydCAqIGFzIHRzbGliXzEgZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBtb25hZCB9IGZyb20gXCIuL21vbmFkXCI7XG5sZXQgSWRlbnRpdHkgPSBJZGVudGl0eV8xID0gY2xhc3MgSWRlbnRpdHkge1xuICAgIGNvbnN0cnVjdG9yKHZhbCkge1xuICAgICAgICB0aGlzLnZhbCA9IHZhbDtcbiAgICAgICAgdGhpcy5tdWx0aSA9IGZhbHNlO1xuICAgIH1cbiAgICBzdGF0aWMgb2YoYSkge1xuICAgICAgICByZXR1cm4gbmV3IElkZW50aXR5XzEoYSk7XG4gICAgfVxuICAgIG9mKGEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJZGVudGl0eV8xKGEpO1xuICAgIH1cbiAgICBhcChmKSB7XG4gICAgICAgIHJldHVybiBuZXcgSWRlbnRpdHlfMShmLnZhbCh0aGlzLnZhbCkpO1xuICAgIH1cbiAgICBleHRyYWN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWw7XG4gICAgfVxuICAgIG1hcChmKSB7XG4gICAgICAgIHJldHVybiBuZXcgSWRlbnRpdHlfMShmKHRoaXMudmFsKSk7XG4gICAgfVxuICAgIG1hcFRvKGIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub2YoYik7XG4gICAgfVxuICAgIGZsYXR0ZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbDtcbiAgICB9XG4gICAgY2hhaW4oZikge1xuICAgICAgICByZXR1cm4gZih0aGlzLnZhbCk7XG4gICAgfVxufTtcbklkZW50aXR5Lm11bHRpID0gZmFsc2U7XG5JZGVudGl0eSA9IElkZW50aXR5XzEgPSB0c2xpYl8xLl9fZGVjb3JhdGUoW1xuICAgIG1vbmFkXG5dLCBJZGVudGl0eSk7XG5leHBvcnQgZGVmYXVsdCBJZGVudGl0eTtcbnZhciBJZGVudGl0eV8xO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aWRlbnRpdHkuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGZ1bmtpYS9qYWJ6L2Rpc3QvZXMvaWRlbnRpdHkuanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IEFic3RyYWN0QXBwbGljYXRpdmUgfSBmcm9tIFwiLi9hcHBsaWNhdGl2ZVwiO1xuaW1wb3J0IEVuZG8gZnJvbSBcIi4vbW9ub2lkcy9lbmRvXCI7XG5leHBvcnQgY2xhc3MgQ29uc3RFbmRvIGV4dGVuZHMgQWJzdHJhY3RBcHBsaWNhdGl2ZSB7XG4gICAgY29uc3RydWN0b3IobSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLm0gPSBtO1xuICAgIH1cbiAgICBtYXAoZikge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc3RhdGljIG9mKGIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDb25zdEVuZG8oRW5kby5pZGVudGl0eSgpKTtcbiAgICB9XG4gICAgb2YoYikge1xuICAgICAgICByZXR1cm4gbmV3IENvbnN0RW5kbyhFbmRvLmlkZW50aXR5KCkpO1xuICAgIH1cbiAgICBhcChhKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ29uc3RFbmRvKGEubS5jb21iaW5lKHRoaXMubSkpO1xuICAgIH1cbiAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm07XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uc3QuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGZ1bmtpYS9qYWJ6L2Rpc3QvZXMvY29uc3QuanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIHRzbGliXzEgZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBsaWZ0IH0gZnJvbSBcIi4vYXBwbGljYXRpdmVcIjtcbmltcG9ydCB7IHRyYXZlcnNhYmxlIH0gZnJvbSBcIi4vdHJhdmVyc2FibGVcIjtcbmltcG9ydCB7IG1vbmFkIH0gZnJvbSBcIi4vbW9uYWRcIjtcbmxldCBDb25zID0gY2xhc3MgQ29ucyB7XG4gICAgY29uc3RydWN0b3IodmFsLCB0YWlsKSB7XG4gICAgICAgIHRoaXMudmFsID0gdmFsO1xuICAgICAgICB0aGlzLnRhaWwgPSB0YWlsO1xuICAgIH1cbiAgICBjb21iaW5lKGMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMgPT09IG5pbCA/IGMgOiBjb25zKHRoaXMudmFsLCB0aGlzLnRhaWwuY29tYmluZShjKSk7XG4gICAgfVxuICAgIGlkZW50aXR5KCkge1xuICAgICAgICByZXR1cm4gbmlsO1xuICAgIH1cbiAgICBvZihiKSB7XG4gICAgICAgIHJldHVybiBjb25zKGIsIG5pbCk7XG4gICAgfVxuICAgIGNoYWluKGYpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMgPT09IG5pbCA/IG5pbCA6IGYodGhpcy52YWwpLmNvbWJpbmUodGhpcy50YWlsLmNoYWluKGYpKTtcbiAgICB9XG4gICAgdHJhdmVyc2UoYSwgZikge1xuICAgICAgICByZXR1cm4gdGhpcyA9PT0gbmlsXG4gICAgICAgICAgICA/IGEub2YobmlsKVxuICAgICAgICAgICAgOiBsaWZ0KGNvbnMsIGYodGhpcy52YWwpLCB0aGlzLnRhaWwudHJhdmVyc2UoYSwgZikpO1xuICAgIH1cbn07XG5Db25zID0gdHNsaWJfMS5fX2RlY29yYXRlKFtcbiAgICBtb25hZCxcbiAgICB0cmF2ZXJzYWJsZVxuXSwgQ29ucyk7XG5leHBvcnQgeyBDb25zIH07XG5leHBvcnQgY29uc3QgbmlsID0gbmV3IENvbnModW5kZWZpbmVkLCB1bmRlZmluZWQpO1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnMoYSwgYXMpIHtcbiAgICByZXR1cm4gbmV3IENvbnMoYSwgYXMpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZyb21BcnJheShhcykge1xuICAgIHJldHVybiBhcy5sZW5ndGggPT09IDAgPyBuaWwgOiBjb25zKGFzWzBdLCBmcm9tQXJyYXkoYXMuc2xpY2UoMSkpKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnNsaXN0LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BmdW5raWEvamFiei9kaXN0L2VzL2NvbnNsaXN0LmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBpZCwgY29tcG9zZSB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgeyBmcm9tRWl0aGVyLCByaWdodCwgaXNSaWdodCB9IGZyb20gXCIuL2VpdGhlclwiO1xuZXhwb3J0IGNsYXNzIEluZmluaXRlTGlzdCB7XG4gICAgY29uc3RydWN0b3IoZm4pIHtcbiAgICAgICAgdGhpcy5mbiA9IGZuO1xuICAgIH1cbiAgICBtYXAoZikge1xuICAgICAgICByZXR1cm4gbmV3IEluZmluaXRlTGlzdChjb21wb3NlKGYsIHRoaXMuZm4pKTtcbiAgICB9XG4gICAgbWFwVG8oYikge1xuICAgICAgICByZXR1cm4gcmVwZWF0KGIpO1xuICAgIH1cbiAgICBvZihiKSB7XG4gICAgICAgIHJldHVybiByZXBlYXQoYik7XG4gICAgfVxuICAgIGFwKGEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbmZpbml0ZUxpc3QoaSA9PiBhLmZuKGkpKHRoaXMuZm4oaSkpKTtcbiAgICB9XG4gICAgbGlmdCguLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiBuZXcgSW5maW5pdGVMaXN0KGkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFscyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCBhcmdzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICAgICAgdmFsc1tqIC0gMV0gPSBhcmdzW2pdLmZuKGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFyZ3NbMF0uYXBwbHkodW5kZWZpbmVkLCB2YWxzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZvbGRyKGYsIGluaXQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHBlcmZvcm0gc3RyaWN0IGZvbGRyIG9uIGluZmluaXRlIGxpc3RcIik7XG4gICAgfVxuICAgIGZvbGRsKGYsIGluaXQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHBlcmZvcm0gc3RyaWN0IGZvbGRsIG9uIGluZmluaXRlIGxpc3RcIik7XG4gICAgfVxuICAgIHNob3J0Rm9sZHIoZiwgaW5pdCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgY2FsbCBzaG9ydEZvbGRyIG9uIGluZmluaXRlIGxpc3RcIik7XG4gICAgfVxuICAgIHNob3J0Rm9sZGwoZiwgaW5pdCkge1xuICAgICAgICBsZXQgYWNjID0gcmlnaHQoaW5pdCk7XG4gICAgICAgIGxldCBpZHggPSAwO1xuICAgICAgICB3aGlsZSAoaXNSaWdodChhY2MpKSB7XG4gICAgICAgICAgICBhY2MgPSBmKGZyb21FaXRoZXIoYWNjKSwgdGhpcy5mbihpZHgpKTtcbiAgICAgICAgICAgIGlkeCsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmcm9tRWl0aGVyKGFjYyk7XG4gICAgfVxuICAgIHNpemUoKSB7XG4gICAgICAgIHJldHVybiBJbmZpbml0eTtcbiAgICB9XG4gICAgbWF4aW11bSgpIHtcbiAgICAgICAgcmV0dXJuIEluZmluaXR5O1xuICAgIH1cbiAgICBtaW5pbXVtKCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgc3VtKCkge1xuICAgICAgICByZXR1cm4gSW5maW5pdHk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHJlcGVhdChhKSB7XG4gICAgcmV0dXJuIG5ldyBJbmZpbml0ZUxpc3QoXyA9PiBhKTtcbn1cbmV4cG9ydCBjb25zdCBuYXR1cmFscyA9IG5ldyBJbmZpbml0ZUxpc3QoaWQpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5maW5pdGVsaXN0LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BmdW5raWEvamFiei9kaXN0L2VzL2luZmluaXRlbGlzdC5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgRnJlZXIsIGxpZnRGIH0gZnJvbSBcIi4vZnJlZXJcIjtcbmltcG9ydCB7IGRlZXBFcXVhbCB9IGZyb20gXCIuL3V0aWxzXCI7XG5leHBvcnQgY2xhc3MgQ2FsbCB7XG4gICAgY29uc3RydWN0b3IoZm4sIGFyZ3MpIHtcbiAgICAgICAgdGhpcy5mbiA9IGZuO1xuICAgICAgICB0aGlzLmFyZ3MgPSBhcmdzO1xuICAgICAgICB0aGlzLnR5cGUgPSBcImNhbGxcIjtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgQ2FsbFAge1xuICAgIGNvbnN0cnVjdG9yKGZuLCBhcmdzKSB7XG4gICAgICAgIHRoaXMuZm4gPSBmbjtcbiAgICAgICAgdGhpcy5hcmdzID0gYXJncztcbiAgICAgICAgdGhpcy50eXBlID0gXCJjYWxsUFwiO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBUaHJvd0Uge1xuICAgIGNvbnN0cnVjdG9yKGVycm9yKSB7XG4gICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgdGhpcy50eXBlID0gXCJ0aHJvd0VcIjtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgQ2F0Y2hFIHtcbiAgICBjb25zdHJ1Y3RvcihoYW5kbGVyLCBpbykge1xuICAgICAgICB0aGlzLmhhbmRsZXIgPSBoYW5kbGVyO1xuICAgICAgICB0aGlzLmlvID0gaW87XG4gICAgICAgIHRoaXMudHlwZSA9IFwiY2F0Y2hFXCI7XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IElPID0gRnJlZXI7XG5leHBvcnQgZnVuY3Rpb24gd2l0aEVmZmVjdHMoZm4pIHtcbiAgICByZXR1cm4gKC4uLmFyZ3MpID0+IGxpZnRGKG5ldyBDYWxsKGZuLCBhcmdzKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gd2l0aEVmZmVjdHNQKGZuKSB7XG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiBsaWZ0RihuZXcgQ2FsbFAoZm4sIGFyZ3MpKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjYWxsKGZuLCAuLi5hcmdzKSB7XG4gICAgcmV0dXJuIGxpZnRGKG5ldyBDYWxsKGZuLCBhcmdzKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gY2FsbFAoZm4sIC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gbGlmdEYobmV3IENhbGxQKGZuLCBhcmdzKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gdGhyb3dFKGVycm9yKSB7XG4gICAgcmV0dXJuIGxpZnRGKG5ldyBUaHJvd0UoZXJyb3IpKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjYXRjaEUoZXJyb3JIYW5kbGVyLCBpbykge1xuICAgIHJldHVybiBsaWZ0RihuZXcgQ2F0Y2hFKGVycm9ySGFuZGxlciwgaW8pKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkb1J1bklPKGUpIHtcbiAgICByZXR1cm4gZS5tYXRjaCh7XG4gICAgICAgIHB1cmU6IGEgPT4gUHJvbWlzZS5yZXNvbHZlKGEpLFxuICAgICAgICBiaW5kOiAoaW8sIGNvbnQpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaW8udHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjYWxsXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBydW5JTyhjb250KGlvLmZuKC4uLmlvLmFyZ3MpKSk7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNhbGxQXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpby5mbiguLi5pby5hcmdzKS50aGVuKChhKSA9PiBydW5JTyhjb250KGEpKSk7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNhdGNoRVwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9SdW5JTyhpby5pbylcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChhKSA9PiBydW5JTyhjb250KGEpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiBkb1J1bklPKGlvLmhhbmRsZXIoZXJyKSkpO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ0aHJvd0VcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGlvLmVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJ1bklPKGUpIHtcbiAgICByZXR1cm4gZG9SdW5JTyhlKTtcbn1cbmZ1bmN0aW9uIGRvVGVzdElPKGUsIGFyciwgZW5kaW5nLCBpZHgpIHtcbiAgICBlLm1hdGNoKHtcbiAgICAgICAgcHVyZTogYTIgPT4ge1xuICAgICAgICAgICAgaWYgKGVuZGluZyAhPT0gYTIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFB1cmUgdmFsdWUgaW52YWxpZCwgZXhwZWN0ZWQgJHtlbmRpbmd9IGJ1dCBzYXcgJHthMn1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYmluZDogKGlvLCBjb250KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBbeyB2YWw6IGlvMiB9LCBhXSA9IGFycltpZHhdO1xuICAgICAgICAgICAgaWYgKCFkZWVwRXF1YWwoaW8sIGlvMikpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFZhbHVlIGludmFsaWQsIGV4cGVjdGVkICR7aW8yfSBidXQgc2F3ICR7aW99YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb1Rlc3RJTyhjb250KGEpLCBhcnIsIGVuZGluZywgaWR4ICsgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0SU8oZSwgYXJyLCBhKSB7XG4gICAgZG9UZXN0SU8oZSwgYXJyLCBhLCAwKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlvLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BmdW5raWEvamFiei9kaXN0L2VzL2lvLmpzXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyB0c2xpYl8xIGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgQWJzdHJhY3RNb25hZCwgbW9uYWQgfSBmcm9tIFwiLi9tb25hZFwiO1xuZXhwb3J0IGNsYXNzIEZyZWVyIGV4dGVuZHMgQWJzdHJhY3RNb25hZCB7XG4gICAgc3RhdGljIG9mKGIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQdXJlKGIpO1xuICAgIH1cbiAgICBvZihiKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHVyZShiKTtcbiAgICB9XG59XG5GcmVlci5tdWx0aSA9IGZhbHNlO1xubGV0IFB1cmUgPSBQdXJlXzEgPSBjbGFzcyBQdXJlIGV4dGVuZHMgRnJlZXIge1xuICAgIGNvbnN0cnVjdG9yKGEpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5hID0gYTtcbiAgICB9XG4gICAgbWF0Y2gobSkge1xuICAgICAgICByZXR1cm4gbS5wdXJlKHRoaXMuYSk7XG4gICAgfVxuICAgIG1hcChmKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHVyZV8xKGYodGhpcy5hKSk7XG4gICAgfVxuICAgIGNoYWluKGYpIHtcbiAgICAgICAgcmV0dXJuIGYodGhpcy5hKTtcbiAgICB9XG59O1xuUHVyZSA9IFB1cmVfMSA9IHRzbGliXzEuX19kZWNvcmF0ZShbXG4gICAgbW9uYWRcbl0sIFB1cmUpO1xuZXhwb3J0IHsgUHVyZSB9O1xuZnVuY3Rpb24gcHVyZShhKSB7XG4gICAgcmV0dXJuIG5ldyBQdXJlKGEpO1xufVxubGV0IEJpbmQgPSBCaW5kXzEgPSBjbGFzcyBCaW5kIGV4dGVuZHMgRnJlZXIge1xuICAgIGNvbnN0cnVjdG9yKHZhbCwgZikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnZhbCA9IHZhbDtcbiAgICAgICAgdGhpcy5mID0gZjtcbiAgICB9XG4gICAgbWF0Y2gobSkge1xuICAgICAgICByZXR1cm4gbS5iaW5kKHRoaXMudmFsLCB0aGlzLmYpO1xuICAgIH1cbiAgICBtYXAoZikge1xuICAgICAgICByZXR1cm4gbmV3IEJpbmRfMSh0aGlzLnZhbCwgKGEpID0+IHRoaXMuZihhKS5tYXAoZikpO1xuICAgIH1cbiAgICBjaGFpbihmKSB7XG4gICAgICAgIHJldHVybiBuZXcgQmluZF8xKHRoaXMudmFsLCAoYSkgPT4gdGhpcy5mKGEpLmNoYWluKGYpKTtcbiAgICB9XG59O1xuQmluZCA9IEJpbmRfMSA9IHRzbGliXzEuX19kZWNvcmF0ZShbXG4gICAgbW9uYWRcbl0sIEJpbmQpO1xuZXhwb3J0IHsgQmluZCB9O1xuZXhwb3J0IGZ1bmN0aW9uIGxpZnRGKGZhKSB7XG4gICAgcmV0dXJuIG5ldyBCaW5kKGZhLCBwdXJlKTtcbn1cbnZhciBQdXJlXzEsIEJpbmRfMTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZyZWVyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BmdW5raWEvamFiei9kaXN0L2VzL2ZyZWVyLmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBjb21iaW5lLCBpZGVudGl0eSB9IGZyb20gXCIuL21vbm9pZFwiO1xuaW1wb3J0IHsgQWJzdHJhY3RNb25hZCB9IGZyb20gXCIuL21vbmFkXCI7XG5leHBvcnQgY2xhc3MgV3JpdGVyIGV4dGVuZHMgQWJzdHJhY3RNb25hZCB7XG4gICAgY29uc3RydWN0b3IoaWRlbnRpdHksIHN0YXRlLCB2YWx1ZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmlkZW50aXR5ID0gaWRlbnRpdHk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLm11bHRpID0gZmFsc2U7XG4gICAgfVxuICAgIG9mKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBuZXcgV3JpdGVyKHRoaXMuaWRlbnRpdHksIHRoaXMuaWRlbnRpdHksIHZhbHVlKTtcbiAgICB9XG4gICAgY2hhaW4oZikge1xuICAgICAgICBjb25zdCB7IHN0YXRlLCB2YWx1ZSB9ID0gZih0aGlzLnZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBXcml0ZXIodGhpcy5pZGVudGl0eSwgY29tYmluZSh0aGlzLnN0YXRlLCBzdGF0ZSksIHZhbHVlKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gcnVuV3JpdGVyKHcpIHtcbiAgICByZXR1cm4gW3cuc3RhdGUsIHcudmFsdWVdO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVdyaXRlcihtYykge1xuICAgIGNvbnN0IGlkZW50aXR5RWxtID0gaWRlbnRpdHkobWMpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHRlbGwodykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBXcml0ZXIoaWRlbnRpdHlFbG0sIHcsIHt9KTtcbiAgICAgICAgfSxcbiAgICAgICAgbGlzdGVuKG0pIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gW20udmFsdWUsIG0uc3RhdGVdO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBXcml0ZXIoaWRlbnRpdHlFbG0sIG0uc3RhdGUsIHZhbHVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgb2YoYSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBXcml0ZXIoaWRlbnRpdHlFbG0sIGlkZW50aXR5RWxtLCBhKTtcbiAgICAgICAgfSxcbiAgICAgICAgbXVsdGk6IGZhbHNlXG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdyaXRlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZnVua2lhL2phYnovZGlzdC9lcy93cml0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIHRzbGliXzEgZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBydW5JTywgbW9uYWQgfSBmcm9tIFwiQGZ1bmtpYS9qYWJ6XCI7XG5pbXBvcnQgeyBwbGFjZWhvbGRlciB9IGZyb20gXCIuL3BsYWNlaG9sZGVyXCI7XG5pbXBvcnQgeyBmcm9tUHJvbWlzZSB9IGZyb20gXCIuL2Z1dHVyZVwiO1xuaW1wb3J0IHsgYXQgfSBmcm9tIFwiLi9iZWhhdmlvclwiO1xuaW1wb3J0IHsgQWN0aXZlU3RyZWFtIH0gZnJvbSBcIi4vc3RyZWFtXCI7XG5sZXQgTm93ID0gY2xhc3MgTm93IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5tdWx0aSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTm93ID0gdHJ1ZTtcbiAgICB9XG4gICAgc3RhdGljIGlzKGEpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBhID09PSBcIm9iamVjdFwiICYmIGEuaXNOb3cgPT09IHRydWU7XG4gICAgfVxuICAgIG9mKGIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPZk5vdyhiKTtcbiAgICB9XG4gICAgc3RhdGljIG9mKGIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPZk5vdyhiKTtcbiAgICB9XG4gICAgY2hhaW4oZikge1xuICAgICAgICByZXR1cm4gbmV3IENoYWluTm93KHRoaXMsIGYpO1xuICAgIH1cbiAgICB0ZXN0KHQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIE5vdyBjb21wdXRhdGlvbiBkb2VzIG5vdCBzdXBwb3J0IHRlc3RpbmcgeWV0XCIpO1xuICAgIH1cbn07XG5Ob3cubXVsdGkgPSBmYWxzZTtcbk5vdyA9IHRzbGliXzEuX19kZWNvcmF0ZShbXG4gICAgbW9uYWRcbl0sIE5vdyk7XG5leHBvcnQgeyBOb3cgfTtcbmNsYXNzIE9mTm93IGV4dGVuZHMgTm93IHtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuICAgIHJ1bigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfVxuICAgIHRlc3QoXykge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9XG59XG5jbGFzcyBDaGFpbk5vdyBleHRlbmRzIE5vdyB7XG4gICAgY29uc3RydWN0b3IoZmlyc3QsIGYpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5maXJzdCA9IGZpcnN0O1xuICAgICAgICB0aGlzLmYgPSBmO1xuICAgIH1cbiAgICBydW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmYodGhpcy5maXJzdC5ydW4oKSkucnVuKCk7XG4gICAgfVxuICAgIHRlc3QodCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mKHRoaXMuZmlyc3QudGVzdCh0KSkudGVzdCh0KTtcbiAgICB9XG59XG5jbGFzcyBTYW1wbGVOb3cgZXh0ZW5kcyBOb3cge1xuICAgIGNvbnN0cnVjdG9yKGIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5iID0gYjtcbiAgICB9XG4gICAgcnVuKCkge1xuICAgICAgICByZXR1cm4gYXQodGhpcy5iKTtcbiAgICB9XG4gICAgdGVzdCh0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmIuc2VtYW50aWMoKSh0KTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gc2FtcGxlKGIpIHtcbiAgICByZXR1cm4gbmV3IFNhbXBsZU5vdyhiKTtcbn1cbmNsYXNzIFBlcmZvcm1Ob3cgZXh0ZW5kcyBOb3cge1xuICAgIGNvbnN0cnVjdG9yKGNvbXApIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5jb21wID0gY29tcDtcbiAgICB9XG4gICAgcnVuKCkge1xuICAgICAgICByZXR1cm4gZnJvbVByb21pc2UocnVuSU8odGhpcy5jb21wKSk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHBlcmZvcm0oY29tcCkge1xuICAgIHJldHVybiBuZXcgUGVyZm9ybU5vdyhjb21wKTtcbn1cbmNsYXNzIFBlcmZvcm1JT1N0cmVhbSBleHRlbmRzIEFjdGl2ZVN0cmVhbSB7XG4gICAgY29uc3RydWN0b3Iocykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBzLmFkZExpc3RlbmVyKHRoaXMpO1xuICAgICAgICB0aGlzLnN0YXRlID0gMCAvKiBQdXNoICovO1xuICAgIH1cbiAgICBwdXNoKGlvKSB7XG4gICAgICAgIHJ1bklPKGlvKS50aGVuKChhKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5jaGlsZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZC5wdXNoKGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5jbGFzcyBQZXJmb3JtU3RyZWFtTm93IGV4dGVuZHMgTm93IHtcbiAgICBjb25zdHJ1Y3RvcihzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucyA9IHM7XG4gICAgfVxuICAgIHJ1bigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQZXJmb3JtSU9TdHJlYW0odGhpcy5zKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gcGVyZm9ybVN0cmVhbShzKSB7XG4gICAgcmV0dXJuIG5ldyBQZXJmb3JtU3RyZWFtTm93KHMpO1xufVxuY2xhc3MgUGVyZm9ybUlPU3RyZWFtTGF0ZXN0IGV4dGVuZHMgQWN0aXZlU3RyZWFtIHtcbiAgICBjb25zdHJ1Y3RvcihzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAgIHRoaXMubmV3ZXN0ID0gMDtcbiAgICAgICAgdGhpcy5ydW5uaW5nID0gMDtcbiAgICAgICAgcy5hZGRMaXN0ZW5lcih0aGlzKTtcbiAgICB9XG4gICAgcHVzaChpbykge1xuICAgICAgICBjb25zdCB0aW1lID0gKyt0aGlzLm5leHQ7XG4gICAgICAgIHRoaXMucnVubmluZysrO1xuICAgICAgICBydW5JTyhpbykudGhlbigoYSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ydW5uaW5nLS07XG4gICAgICAgICAgICBpZiAodGltZSA+IHRoaXMubmV3ZXN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucnVubmluZyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5ld2VzdCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5ld2VzdCA9IHRpbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoaWxkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZC5wdXNoKGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuY2xhc3MgUGVyZm9ybVN0cmVhbU5vd0xhdGVzdCBleHRlbmRzIE5vdyB7XG4gICAgY29uc3RydWN0b3Iocykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnMgPSBzO1xuICAgIH1cbiAgICBydW4oKSB7XG4gICAgICAgIHJldHVybiBuZXcgUGVyZm9ybUlPU3RyZWFtTGF0ZXN0KHRoaXMucyk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHBlcmZvcm1TdHJlYW1MYXRlc3Qocykge1xuICAgIHJldHVybiBuZXcgUGVyZm9ybVN0cmVhbU5vd0xhdGVzdChzKTtcbn1cbmNsYXNzIFBlcmZvcm1JT1N0cmVhbU9yZGVyZWQgZXh0ZW5kcyBBY3RpdmVTdHJlYW0ge1xuICAgIGNvbnN0cnVjdG9yKHMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5uZXh0SWQgPSAwO1xuICAgICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgICB0aGlzLmJ1ZmZlciA9IFtdOyAvLyBPYmplY3Qtd3JhcHBlciB0byBzdXBwb3J0IGEgcmVzdWx0IGFzIHVuZGVmaW5lZFxuICAgICAgICBzLmFkZExpc3RlbmVyKHRoaXMpO1xuICAgIH1cbiAgICBwdXNoKGlvKSB7XG4gICAgICAgIGNvbnN0IGlkID0gdGhpcy5uZXh0SWQrKztcbiAgICAgICAgcnVuSU8oaW8pLnRoZW4oKGEpID0+IHtcbiAgICAgICAgICAgIGlmIChpZCA9PT0gdGhpcy5uZXh0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5idWZmZXJbMF0gPSB7IHZhbHVlOiBhIH07XG4gICAgICAgICAgICAgICAgdGhpcy5wdXNoRnJvbUJ1ZmZlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5idWZmZXJbaWQgLSB0aGlzLm5leHRdID0geyB2YWx1ZTogYSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcHVzaEZyb21CdWZmZXIoKSB7XG4gICAgICAgIHdoaWxlICh0aGlzLmJ1ZmZlclswXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCB7IHZhbHVlIH0gPSB0aGlzLmJ1ZmZlci5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGQucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm5leHQrKztcbiAgICAgICAgfVxuICAgIH1cbn1cbmNsYXNzIFBlcmZvcm1TdHJlYW1Ob3dPcmRlcmVkIGV4dGVuZHMgTm93IHtcbiAgICBjb25zdHJ1Y3RvcihzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucyA9IHM7XG4gICAgfVxuICAgIHJ1bigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQZXJmb3JtSU9TdHJlYW1PcmRlcmVkKHRoaXMucyk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHBlcmZvcm1TdHJlYW1PcmRlcmVkKHMpIHtcbiAgICByZXR1cm4gbmV3IFBlcmZvcm1TdHJlYW1Ob3dPcmRlcmVkKHMpO1xufVxuZnVuY3Rpb24gcnVuKG5vdykge1xuICAgIHJldHVybiBub3cucnVuKCk7XG59XG5jbGFzcyBQbGFuTm93IGV4dGVuZHMgTm93IHtcbiAgICBjb25zdHJ1Y3RvcihmdXR1cmUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5mdXR1cmUgPSBmdXR1cmU7XG4gICAgfVxuICAgIHJ1bigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZnV0dXJlLm1hcChydW4pO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBwbGFuKGZ1dHVyZSkge1xuICAgIHJldHVybiBuZXcgUGxhbk5vdyhmdXR1cmUpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJ1bk5vdyhub3cpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBub3cucnVuKCkuc3Vic2NyaWJlKHJlc29sdmUpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBUZXN0IHJ1biBhIG5vdyBjb21wdXRhdGlvbiB3aXRob3V0IGV4ZWN1dGluZyBpdHMgc2lkZS1lZmZlY3RzLlxuICogQHBhcmFtIG5vdyBUaGUgbm93IGNvbXB1dGF0aW9uIHRvIHRlc3QuXG4gKiBAcGFyYW0gdGltZSBUaGUgcG9pbnQgaW4gdGltZSBhdCB3aGljaCB0aGUgbm93IGNvbXB1dGF0aW9uIHNob3VsZFxuICogYmUgcnVuLiBEZWZhdWx0cyB0byAwLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdGVzdE5vdyhub3csIHRpbWUgPSAwKSB7XG4gICAgcmV0dXJuIG5vdy50ZXN0KHRpbWUpO1xufVxuY29uc3QgcGxhY2Vob2xkZXJQcm94eUhhbmRsZXIgPSB7XG4gICAgZ2V0OiBmdW5jdGlvbiAodGFyZ2V0LCBuYW1lKSB7XG4gICAgICAgIGlmICghKG5hbWUgaW4gdGFyZ2V0KSkge1xuICAgICAgICAgICAgdGFyZ2V0W25hbWVdID0gcGxhY2Vob2xkZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGFyZ2V0W25hbWVdO1xuICAgIH1cbn07XG5jbGFzcyBMb29wTm93IGV4dGVuZHMgTm93IHtcbiAgICBjb25zdHJ1Y3RvcihmbiwgcGxhY2Vob2xkZXJOYW1lcykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmZuID0gZm47XG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXJOYW1lcyA9IHBsYWNlaG9sZGVyTmFtZXM7XG4gICAgfVxuICAgIHJ1bigpIHtcbiAgICAgICAgbGV0IHBsYWNlaG9sZGVyT2JqZWN0O1xuICAgICAgICBpZiAodGhpcy5wbGFjZWhvbGRlck5hbWVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyT2JqZWN0ID0gbmV3IFByb3h5KHt9LCBwbGFjZWhvbGRlclByb3h5SGFuZGxlcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwbGFjZWhvbGRlck9iamVjdCA9IHt9O1xuICAgICAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIHRoaXMucGxhY2Vob2xkZXJOYW1lcykge1xuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyT2JqZWN0W25hbWVdID0gcGxhY2Vob2xkZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmZuKHBsYWNlaG9sZGVyT2JqZWN0KS5ydW4oKTtcbiAgICAgICAgY29uc3QgcmV0dXJuZWQgPSBPYmplY3Qua2V5cyhyZXN1bHQpO1xuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgcmV0dXJuZWQpIHtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyT2JqZWN0W25hbWVdLnJlcGxhY2VXaXRoKHJlc3VsdFtuYW1lXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gbG9vcE5vdyhmbiwgbmFtZXMpIHtcbiAgICByZXR1cm4gbmV3IExvb3BOb3coZm4sIG5hbWVzKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5vdy5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZnVua2lhL2hhcmVhY3RpdmUvZGlzdC9lcy9ub3cuanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IFByb2R1Y2VyU3RyZWFtIH0gZnJvbSBcIi4vc3RyZWFtXCI7XG5pbXBvcnQgeyBQcm9kdWNlckJlaGF2aW9yIH0gZnJvbSBcIi4vYmVoYXZpb3JcIjtcbmNsYXNzIERvbUV2ZW50U3RyZWFtIGV4dGVuZHMgUHJvZHVjZXJTdHJlYW0ge1xuICAgIGNvbnN0cnVjdG9yKHRhcmdldCwgZXZlbnROYW1lLCBleHRyYWN0b3IpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgIHRoaXMuZXZlbnROYW1lID0gZXZlbnROYW1lO1xuICAgICAgICB0aGlzLmV4dHJhY3RvciA9IGV4dHJhY3RvcjtcbiAgICB9XG4gICAgaGFuZGxlRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wdXNoKHRoaXMuZXh0cmFjdG9yKGV2ZW50LCB0aGlzLnRhcmdldCkpO1xuICAgIH1cbiAgICBhY3RpdmF0ZSgpIHtcbiAgICAgICAgdGhpcy50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmV2ZW50TmFtZSwgdGhpcyk7XG4gICAgfVxuICAgIGRlYWN0aXZhdGUoKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5ldmVudE5hbWUsIHRoaXMpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGlkKGEpIHtcbiAgICByZXR1cm4gYTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzdHJlYW1Gcm9tRXZlbnQodGFyZ2V0LCBldmVudE5hbWUsIGV4dHJhY3RvciA9IGlkKSB7XG4gICAgcmV0dXJuIG5ldyBEb21FdmVudFN0cmVhbSh0YXJnZXQsIGV2ZW50TmFtZSwgZXh0cmFjdG9yKTtcbn1cbmNsYXNzIERvbUV2ZW50QmVoYXZpb3IgZXh0ZW5kcyBQcm9kdWNlckJlaGF2aW9yIHtcbiAgICBjb25zdHJ1Y3Rvcih0YXJnZXQsIGV2ZW50TmFtZSwgaW5pdGlhbCwgZXh0cmFjdG9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICB0aGlzLmV2ZW50TmFtZSA9IGV2ZW50TmFtZTtcbiAgICAgICAgdGhpcy5leHRyYWN0b3IgPSBleHRyYWN0b3I7XG4gICAgICAgIHRoaXMubGFzdCA9IGluaXRpYWw7XG4gICAgfVxuICAgIGhhbmRsZUV2ZW50KGV2ZW50KSB7XG4gICAgICAgIHRoaXMucHVzaCh0aGlzLmV4dHJhY3RvcihldmVudCwgdGhpcy50YXJnZXQpKTtcbiAgICB9XG4gICAgYWN0aXZhdGVQcm9kdWNlcigpIHtcbiAgICAgICAgdGhpcy50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmV2ZW50TmFtZSwgdGhpcyk7XG4gICAgfVxuICAgIGRlYWN0aXZhdGVQcm9kdWNlcigpIHtcbiAgICAgICAgdGhpcy50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLmV2ZW50TmFtZSwgdGhpcyk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGJlaGF2aW9yRnJvbUV2ZW50KHRhcmdldCwgZXZlbnROYW1lLCBpbml0aWFsLCBleHRyYWN0b3IgPSBpZCkge1xuICAgIHJldHVybiBuZXcgRG9tRXZlbnRCZWhhdmlvcih0YXJnZXQsIGV2ZW50TmFtZSwgaW5pdGlhbCwgZXh0cmFjdG9yKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRvbS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZnVua2lhL2hhcmVhY3RpdmUvZGlzdC9lcy9kb20uanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGNvbnMgfSBmcm9tIFwiLi9saW5rZWRsaXN0XCI7XG5pbXBvcnQgeyBTdHJlYW0gfSBmcm9tIFwiLi9zdHJlYW1cIjtcbmltcG9ydCB7IEJlaGF2aW9yLCBGdW5jdGlvbkJlaGF2aW9yLCBmcm9tRnVuY3Rpb24gfSBmcm9tIFwiLi9iZWhhdmlvclwiO1xuLypcbiAqIFRpbWUgcmVsYXRlZCBiZWhhdmlvcnMgYW5kIGZ1bmN0aW9uc1xuICovXG5leHBvcnQgY2xhc3MgRGVsYXlTdHJlYW0gZXh0ZW5kcyBTdHJlYW0ge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudCwgbXMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5tcyA9IG1zO1xuICAgICAgICB0aGlzLnBhcmVudHMgPSBjb25zKHBhcmVudCk7XG4gICAgfVxuICAgIHNlbWFudGljKCkge1xuICAgICAgICBjb25zdCBzID0gdGhpcy5wYXJlbnRzLnZhbHVlLnNlbWFudGljKCk7XG4gICAgICAgIHJldHVybiBzLm1hcCgoeyB0aW1lLCB2YWx1ZSB9KSA9PiAoeyB0aW1lOiB0aW1lICsgdGhpcy5tcywgdmFsdWUgfSkpO1xuICAgIH1cbiAgICBwdXNoKGEpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNoaWxkLnB1c2goYSksIHRoaXMubXMpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBkZWxheShtcywgc3RyZWFtKSB7XG4gICAgcmV0dXJuIG5ldyBEZWxheVN0cmVhbShzdHJlYW0sIG1zKTtcbn1cbmNsYXNzIFRocm90dGxlU3RyZWFtIGV4dGVuZHMgU3RyZWFtIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnQsIG1zKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubXMgPSBtcztcbiAgICAgICAgdGhpcy5pc1NpbGVuY2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucGFyZW50cyA9IGNvbnMocGFyZW50KTtcbiAgICB9XG4gICAgcHVzaChhKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1NpbGVuY2VkKSB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkLnB1c2goYSk7XG4gICAgICAgICAgICB0aGlzLmlzU2lsZW5jZWQgPSB0cnVlO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1NpbGVuY2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9LCB0aGlzLm1zKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiB0aHJvdHRsZShtcywgc3RyZWFtKSB7XG4gICAgcmV0dXJuIG5ldyBUaHJvdHRsZVN0cmVhbShzdHJlYW0sIG1zKTtcbn1cbmNsYXNzIERlYm91bmNlU3RyZWFtIGV4dGVuZHMgU3RyZWFtIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnQsIG1zKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubXMgPSBtcztcbiAgICAgICAgdGhpcy50aW1lciA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5wYXJlbnRzID0gY29ucyhwYXJlbnQpO1xuICAgIH1cbiAgICBwdXNoKGEpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICAgICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkLnB1c2goYSk7XG4gICAgICAgIH0sIHRoaXMubXMpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBkZWJvdW5jZShtcywgc3RyZWFtKSB7XG4gICAgcmV0dXJuIG5ldyBEZWJvdW5jZVN0cmVhbShzdHJlYW0sIG1zKTtcbn1cbmNsYXNzIFRpbWVGcm9tQmVoYXZpb3IgZXh0ZW5kcyBCZWhhdmlvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IDEgLyogUHVsbCAqLztcbiAgICB9XG4gICAgcHVsbCgpIHtcbiAgICAgICAgcmV0dXJuIERhdGUubm93KCkgLSB0aGlzLnN0YXJ0VGltZTtcbiAgICB9XG59XG5jbGFzcyBUaW1lQmVoYXZpb3IgZXh0ZW5kcyBGdW5jdGlvbkJlaGF2aW9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoRGF0ZS5ub3cpO1xuICAgIH1cbiAgICBzZW1hbnRpYygpIHtcbiAgICAgICAgcmV0dXJuICh0aW1lKSA9PiB0aW1lO1xuICAgIH1cbn1cbi8qKlxuICogQSBiZWhhdmlvciB3aG9zZSB2YWx1ZSBpcyB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBlbGFwc2VkIGluXG4gKiBVTklYIGVwb2NoLiBJLmUuIGl0cyBjdXJyZW50IHZhbHVlIGlzIGVxdWFsIHRvIHRoZSB2YWx1ZSBnb3QgYnlcbiAqIGNhbGxpbmcgYERhdGUubm93YC5cbiAqL1xuZXhwb3J0IGNvbnN0IHRpbWUgPSBuZXcgVGltZUJlaGF2aW9yKCk7XG4vKipcbiAqIEEgYmVoYXZpb3IgZ2l2aW5nIGFjY2VzcyB0byBjb250aW51b3VzIHRpbWUuIFdoZW4gc2FtcGxlZCB0aGUgb3V0ZXJcbiAqIGJlaGF2aW9yIGdpdmVzIGEgYmVoYXZpb3Igd2l0aCB2YWx1ZXMgdGhhdCBjb250YWluIHRoZSBkaWZmZXJlbmNlXG4gKiBiZXR3ZWVuIHRoZSBjdXJyZW50IHNhbXBsZSB0aW1lIGFuZCB0aGUgdGltZSBhdCB3aGljaCB0aGUgb3V0ZXJcbiAqIGJlaGF2aW9yIHdhcyBzYW1wbGVkLlxuICovXG5leHBvcnQgY29uc3QgdGltZUZyb20gPSBmcm9tRnVuY3Rpb24oKCkgPT4gbmV3IFRpbWVGcm9tQmVoYXZpb3IoKSk7XG5jbGFzcyBJbnRlZ3JhdGVCZWhhdmlvciBleHRlbmRzIEJlaGF2aW9yIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnQpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIHRoaXMubGFzdFB1bGxUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IDEgLyogUHVsbCAqLztcbiAgICAgICAgdGhpcy52YWx1ZSA9IDA7XG4gICAgfVxuICAgIHB1bGwoKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRQdWxsVGltZSA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IGRlbHRhU2Vjb25kcyA9IChjdXJyZW50UHVsbFRpbWUgLSB0aGlzLmxhc3RQdWxsVGltZSkgLyAxMDAwO1xuICAgICAgICB0aGlzLnZhbHVlICs9IGRlbHRhU2Vjb25kcyAqIHRoaXMucGFyZW50LmF0KCk7XG4gICAgICAgIHRoaXMubGFzdFB1bGxUaW1lID0gY3VycmVudFB1bGxUaW1lO1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gaW50ZWdyYXRlKGJlaGF2aW9yKSB7XG4gICAgcmV0dXJuIGZyb21GdW5jdGlvbigoKSA9PiBuZXcgSW50ZWdyYXRlQmVoYXZpb3IoYmVoYXZpb3IpKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRpbWUuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGZ1bmtpYS9oYXJlYWN0aXZlL2Rpc3QvZXMvdGltZS5qc1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgbGlmdCwgZ28gfSBmcm9tIFwiQGZ1bmtpYS9qYWJ6XCI7XG5pbXBvcnQgeyBzdGVwcGVyLCB0aW1lLCBzY2FuLCBzbmFwc2hvdCB9IGZyb20gXCIuL1wiO1xuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zaXRpb25CZWhhdmlvcihjb25maWcsIGluaXRpYWwsIHRyaWdnZXJTdHJlYW0sIHRpbWVCID0gdGltZSkge1xuICAgIHJldHVybiBnbyhmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCByYW5nZVZhbHVlQiA9IHlpZWxkIHNjYW4oKG5ld1YsIHByZXYpID0+ICh7IGZyb206IHByZXYudG8sIHRvOiBuZXdWIH0pLCB7IGZyb206IGluaXRpYWwsIHRvOiBpbml0aWFsIH0sIHRyaWdnZXJTdHJlYW0pO1xuICAgICAgICBjb25zdCBpbml0aWFsU3RhcnRUaW1lID0geWllbGQgdGltZUI7XG4gICAgICAgIGNvbnN0IHN0YXJ0VGltZUIgPSB5aWVsZCBzdGVwcGVyKGluaXRpYWxTdGFydFRpbWUsIHNuYXBzaG90KHRpbWVCLCB0cmlnZ2VyU3RyZWFtKSk7XG4gICAgICAgIGNvbnN0IHRyYW5zaXRpb24gPSBsaWZ0KChyYW5nZSwgc3RhcnRUaW1lLCBub3cpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVuZFRpbWUgPSBzdGFydFRpbWUgKyBjb25maWcuZHVyYXRpb247XG4gICAgICAgICAgICBjb25zdCBzY2FsZWQgPSBpbnRlcnBvbGF0ZShzdGFydFRpbWUsIGVuZFRpbWUsIDAsIDEsIGNhcFRvUmFuZ2Uoc3RhcnRUaW1lLCBlbmRUaW1lLCBub3cgLSBjb25maWcuZGVsYXkpKTtcbiAgICAgICAgICAgIHJldHVybiBpbnRlcnBvbGF0ZSgwLCAxLCByYW5nZS5mcm9tLCByYW5nZS50bywgY29uZmlnLnRpbWluZ0Z1bmN0aW9uKHNjYWxlZCkpO1xuICAgICAgICB9LCByYW5nZVZhbHVlQiwgc3RhcnRUaW1lQiwgdGltZUIpO1xuICAgICAgICByZXR1cm4gdHJhbnNpdGlvbjtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpbnRlcnBvbGF0ZShmcm9tQSwgdG9BLCBmcm9tQiwgdG9CLCBhKSB7XG4gICAgaWYgKGEgPCBmcm9tQSB8fCBhID4gdG9BKSB7XG4gICAgICAgIHRocm93IGBUaGUgbnVtYmVyICR7YX0gaXMgbm90IGJldHdlZW4gdGhlIGJvdW5kcyBbJHtmcm9tQX0sICR7dG9BfV1gO1xuICAgIH1cbiAgICBjb25zdCBzcGFuQSA9IHRvQSAtIGZyb21BO1xuICAgIGNvbnN0IHNwYW5CID0gdG9CIC0gZnJvbUI7XG4gICAgY29uc3QgcmVsYXRpb25BID0gKGEgLSBmcm9tQSkgLyBzcGFuQTtcbiAgICByZXR1cm4gcmVsYXRpb25BICogc3BhbkIgKyBmcm9tQjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjYXBUb1JhbmdlKGxvd2VyLCB1cHBlciwgYSkge1xuICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heChsb3dlciwgYSksIHVwcGVyKTtcbn1cbmV4cG9ydCBjb25zdCBsaW5lYXIgPSB0ID0+IHQ7XG5leHBvcnQgY29uc3QgZWFzZUluID0gcCA9PiB0ID0+IE1hdGgucG93KHQsIHApO1xuZXhwb3J0IGNvbnN0IGVhc2VPdXQgPSBwID0+IHQgPT4gMSAtIChNYXRoLnBvdygoMSAtIHQpLCBwKSk7XG5leHBvcnQgY29uc3QgZWFzZUluT3V0ID0gcCA9PiB0ID0+ICh0IDwgLjUpID8gZWFzZUluKHApKHQgKiAyKSAvIDJcbiAgICA6IGVhc2VPdXQocCkodCAqIDIgLSAxKSAvIDIgKyAuNTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFuaW1hdGlvbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AZnVua2lhL2hhcmVhY3RpdmUvZGlzdC9lcy9hbmltYXRpb24uanNcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IFN0cmVhbSB9IGZyb20gXCIuL3N0cmVhbVwiO1xuY2xhc3MgVGVzdFN0cmVhbSBleHRlbmRzIFN0cmVhbSB7XG4gICAgY29uc3RydWN0b3Ioc2VtYW50aWNTdHJlYW0pIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zZW1hbnRpY1N0cmVhbSA9IHNlbWFudGljU3RyZWFtO1xuICAgIH1cbiAgICBzZW1hbnRpYygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VtYW50aWNTdHJlYW07XG4gICAgfVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgYWN0aXZhdGUoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIllvdSBjYW5ub3QgYWN0aXZhdGUgYSBUZXN0U3RyZWFtXCIpO1xuICAgIH1cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGRlYWN0aXZhdGUoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIllvdSBjYW5ub3QgZGVhY3RpdmF0ZSBhIFRlc3RTdHJlYW1cIik7XG4gICAgfVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgcHVzaChhKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIllvdSBjYW5ub3QgcHVzaCB0byBhIFRlc3RTdHJlYW1cIik7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHRlc3RTdHJlYW1Gcm9tQXJyYXkoYXJyYXkpIHtcbiAgICBjb25zdCBzZW1hbnRpY1N0cmVhbSA9IGFycmF5Lm1hcCgodmFsdWUsIHRpbWUpID0+ICh7IHZhbHVlLCB0aW1lIH0pKTtcbiAgICByZXR1cm4gbmV3IFRlc3RTdHJlYW0oc2VtYW50aWNTdHJlYW0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHRlc3RTdHJlYW1Gcm9tT2JqZWN0KG9iamVjdCkge1xuICAgIGNvbnN0IHNlbWFudGljU3RyZWFtID0gT2JqZWN0LmtleXMob2JqZWN0KS5tYXAoKGtleSkgPT4gKHsgdGltZTogcGFyc2VGbG9hdChrZXkpLCB2YWx1ZTogb2JqZWN0W2tleV0gfSkpO1xuICAgIHJldHVybiBuZXcgVGVzdFN0cmVhbShzZW1hbnRpY1N0cmVhbSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD10ZXN0LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BmdW5raWEvaGFyZWFjdGl2ZS9kaXN0L2VzL3Rlc3QuanNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB2bm9kZSBmcm9tICcuL3Zub2RlJztcbmltcG9ydCAqIGFzIGlzIGZyb20gJy4vaXMnO1xuaW1wb3J0IGh0bWxEb21BcGkgZnJvbSAnLi9odG1sZG9tYXBpJztcbmZ1bmN0aW9uIGlzVW5kZWYocykgeyByZXR1cm4gcyA9PT0gdW5kZWZpbmVkOyB9XG5mdW5jdGlvbiBpc0RlZihzKSB7IHJldHVybiBzICE9PSB1bmRlZmluZWQ7IH1cbnZhciBlbXB0eU5vZGUgPSB2bm9kZSgnJywge30sIFtdLCB1bmRlZmluZWQsIHVuZGVmaW5lZCk7XG5mdW5jdGlvbiBzYW1lVm5vZGUodm5vZGUxLCB2bm9kZTIpIHtcbiAgICByZXR1cm4gdm5vZGUxLmtleSA9PT0gdm5vZGUyLmtleSAmJiB2bm9kZTEuc2VsID09PSB2bm9kZTIuc2VsO1xufVxuZnVuY3Rpb24gaXNWbm9kZSh2bm9kZSkge1xuICAgIHJldHVybiB2bm9kZS5zZWwgIT09IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUtleVRvT2xkSWR4KGNoaWxkcmVuLCBiZWdpbklkeCwgZW5kSWR4KSB7XG4gICAgdmFyIGksIG1hcCA9IHt9LCBrZXksIGNoO1xuICAgIGZvciAoaSA9IGJlZ2luSWR4OyBpIDw9IGVuZElkeDsgKytpKSB7XG4gICAgICAgIGNoID0gY2hpbGRyZW5baV07XG4gICAgICAgIGlmIChjaCAhPSBudWxsKSB7XG4gICAgICAgICAgICBrZXkgPSBjaC5rZXk7XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgbWFwW2tleV0gPSBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtYXA7XG59XG52YXIgaG9va3MgPSBbJ2NyZWF0ZScsICd1cGRhdGUnLCAncmVtb3ZlJywgJ2Rlc3Ryb3knLCAncHJlJywgJ3Bvc3QnXTtcbmV4cG9ydCB7IGggfSBmcm9tICcuL2gnO1xuZXhwb3J0IHsgdGh1bmsgfSBmcm9tICcuL3RodW5rJztcbmV4cG9ydCBmdW5jdGlvbiBpbml0KG1vZHVsZXMsIGRvbUFwaSkge1xuICAgIHZhciBpLCBqLCBjYnMgPSB7fTtcbiAgICB2YXIgYXBpID0gZG9tQXBpICE9PSB1bmRlZmluZWQgPyBkb21BcGkgOiBodG1sRG9tQXBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBob29rcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBjYnNbaG9va3NbaV1dID0gW107XG4gICAgICAgIGZvciAoaiA9IDA7IGogPCBtb2R1bGVzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICB2YXIgaG9vayA9IG1vZHVsZXNbal1baG9va3NbaV1dO1xuICAgICAgICAgICAgaWYgKGhvb2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNic1tob29rc1tpXV0ucHVzaChob29rKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBlbXB0eU5vZGVBdChlbG0pIHtcbiAgICAgICAgdmFyIGlkID0gZWxtLmlkID8gJyMnICsgZWxtLmlkIDogJyc7XG4gICAgICAgIHZhciBjID0gZWxtLmNsYXNzTmFtZSA/ICcuJyArIGVsbS5jbGFzc05hbWUuc3BsaXQoJyAnKS5qb2luKCcuJykgOiAnJztcbiAgICAgICAgcmV0dXJuIHZub2RlKGFwaS50YWdOYW1lKGVsbSkudG9Mb3dlckNhc2UoKSArIGlkICsgYywge30sIFtdLCB1bmRlZmluZWQsIGVsbSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZVJtQ2IoY2hpbGRFbG0sIGxpc3RlbmVycykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gcm1DYigpIHtcbiAgICAgICAgICAgIGlmICgtLWxpc3RlbmVycyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHZhciBwYXJlbnRfMSA9IGFwaS5wYXJlbnROb2RlKGNoaWxkRWxtKTtcbiAgICAgICAgICAgICAgICBhcGkucmVtb3ZlQ2hpbGQocGFyZW50XzEsIGNoaWxkRWxtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlRWxtKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpIHtcbiAgICAgICAgdmFyIGksIGRhdGEgPSB2bm9kZS5kYXRhO1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkuaW5pdCkpIHtcbiAgICAgICAgICAgICAgICBpKHZub2RlKTtcbiAgICAgICAgICAgICAgICBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlbiwgc2VsID0gdm5vZGUuc2VsO1xuICAgICAgICBpZiAoc2VsID09PSAnIScpIHtcbiAgICAgICAgICAgIGlmIChpc1VuZGVmKHZub2RlLnRleHQpKSB7XG4gICAgICAgICAgICAgICAgdm5vZGUudGV4dCA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdm5vZGUuZWxtID0gYXBpLmNyZWF0ZUNvbW1lbnQodm5vZGUudGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2VsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIFBhcnNlIHNlbGVjdG9yXG4gICAgICAgICAgICB2YXIgaGFzaElkeCA9IHNlbC5pbmRleE9mKCcjJyk7XG4gICAgICAgICAgICB2YXIgZG90SWR4ID0gc2VsLmluZGV4T2YoJy4nLCBoYXNoSWR4KTtcbiAgICAgICAgICAgIHZhciBoYXNoID0gaGFzaElkeCA+IDAgPyBoYXNoSWR4IDogc2VsLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBkb3QgPSBkb3RJZHggPiAwID8gZG90SWR4IDogc2VsLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciB0YWcgPSBoYXNoSWR4ICE9PSAtMSB8fCBkb3RJZHggIT09IC0xID8gc2VsLnNsaWNlKDAsIE1hdGgubWluKGhhc2gsIGRvdCkpIDogc2VsO1xuICAgICAgICAgICAgdmFyIGVsbSA9IHZub2RlLmVsbSA9IGlzRGVmKGRhdGEpICYmIGlzRGVmKGkgPSBkYXRhLm5zKSA/IGFwaS5jcmVhdGVFbGVtZW50TlMoaSwgdGFnKVxuICAgICAgICAgICAgICAgIDogYXBpLmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICAgICAgICAgIGlmIChoYXNoIDwgZG90KVxuICAgICAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ2lkJywgc2VsLnNsaWNlKGhhc2ggKyAxLCBkb3QpKTtcbiAgICAgICAgICAgIGlmIChkb3RJZHggPiAwKVxuICAgICAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgc2VsLnNsaWNlKGRvdCArIDEpLnJlcGxhY2UoL1xcLi9nLCAnICcpKTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMuY3JlYXRlLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGNicy5jcmVhdGVbaV0oZW1wdHlOb2RlLCB2bm9kZSk7XG4gICAgICAgICAgICBpZiAoaXMuYXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2ggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBpLmFwcGVuZENoaWxkKGVsbSwgY3JlYXRlRWxtKGNoLCBpbnNlcnRlZFZub2RlUXVldWUpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzLnByaW1pdGl2ZSh2bm9kZS50ZXh0KSkge1xuICAgICAgICAgICAgICAgIGFwaS5hcHBlbmRDaGlsZChlbG0sIGFwaS5jcmVhdGVUZXh0Tm9kZSh2bm9kZS50ZXh0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpID0gdm5vZGUuZGF0YS5ob29rOyAvLyBSZXVzZSB2YXJpYWJsZVxuICAgICAgICAgICAgaWYgKGlzRGVmKGkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkuY3JlYXRlKVxuICAgICAgICAgICAgICAgICAgICBpLmNyZWF0ZShlbXB0eU5vZGUsIHZub2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoaS5pbnNlcnQpXG4gICAgICAgICAgICAgICAgICAgIGluc2VydGVkVm5vZGVRdWV1ZS5wdXNoKHZub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZub2RlLmVsbSA9IGFwaS5jcmVhdGVUZXh0Tm9kZSh2bm9kZS50ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdm5vZGUuZWxtO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhZGRWbm9kZXMocGFyZW50RWxtLCBiZWZvcmUsIHZub2Rlcywgc3RhcnRJZHgsIGVuZElkeCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgICAgIGZvciAoOyBzdGFydElkeCA8PSBlbmRJZHg7ICsrc3RhcnRJZHgpIHtcbiAgICAgICAgICAgIHZhciBjaCA9IHZub2Rlc1tzdGFydElkeF07XG4gICAgICAgICAgICBpZiAoY2ggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBjcmVhdGVFbG0oY2gsIGluc2VydGVkVm5vZGVRdWV1ZSksIGJlZm9yZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gaW52b2tlRGVzdHJveUhvb2sodm5vZGUpIHtcbiAgICAgICAgdmFyIGksIGosIGRhdGEgPSB2bm9kZS5kYXRhO1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkuZGVzdHJveSkpXG4gICAgICAgICAgICAgICAgaSh2bm9kZSk7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLmRlc3Ryb3kubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgY2JzLmRlc3Ryb3lbaV0odm5vZGUpO1xuICAgICAgICAgICAgaWYgKHZub2RlLmNoaWxkcmVuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgdm5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICAgICAgaSA9IHZub2RlLmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPSBudWxsICYmIHR5cGVvZiBpICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnZva2VEZXN0cm95SG9vayhpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiByZW1vdmVWbm9kZXMocGFyZW50RWxtLCB2bm9kZXMsIHN0YXJ0SWR4LCBlbmRJZHgpIHtcbiAgICAgICAgZm9yICg7IHN0YXJ0SWR4IDw9IGVuZElkeDsgKytzdGFydElkeCkge1xuICAgICAgICAgICAgdmFyIGlfMSA9IHZvaWQgMCwgbGlzdGVuZXJzID0gdm9pZCAwLCBybSA9IHZvaWQgMCwgY2ggPSB2bm9kZXNbc3RhcnRJZHhdO1xuICAgICAgICAgICAgaWYgKGNoICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNEZWYoY2guc2VsKSkge1xuICAgICAgICAgICAgICAgICAgICBpbnZva2VEZXN0cm95SG9vayhjaCk7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycyA9IGNicy5yZW1vdmUubGVuZ3RoICsgMTtcbiAgICAgICAgICAgICAgICAgICAgcm0gPSBjcmVhdGVSbUNiKGNoLmVsbSwgbGlzdGVuZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpXzEgPSAwOyBpXzEgPCBjYnMucmVtb3ZlLmxlbmd0aDsgKytpXzEpXG4gICAgICAgICAgICAgICAgICAgICAgICBjYnMucmVtb3ZlW2lfMV0oY2gsIHJtKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRGVmKGlfMSA9IGNoLmRhdGEpICYmIGlzRGVmKGlfMSA9IGlfMS5ob29rKSAmJiBpc0RlZihpXzEgPSBpXzEucmVtb3ZlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaV8xKGNoLCBybSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBybSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhcGkucmVtb3ZlQ2hpbGQocGFyZW50RWxtLCBjaC5lbG0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiB1cGRhdGVDaGlsZHJlbihwYXJlbnRFbG0sIG9sZENoLCBuZXdDaCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgICAgIHZhciBvbGRTdGFydElkeCA9IDAsIG5ld1N0YXJ0SWR4ID0gMDtcbiAgICAgICAgdmFyIG9sZEVuZElkeCA9IG9sZENoLmxlbmd0aCAtIDE7XG4gICAgICAgIHZhciBvbGRTdGFydFZub2RlID0gb2xkQ2hbMF07XG4gICAgICAgIHZhciBvbGRFbmRWbm9kZSA9IG9sZENoW29sZEVuZElkeF07XG4gICAgICAgIHZhciBuZXdFbmRJZHggPSBuZXdDaC5sZW5ndGggLSAxO1xuICAgICAgICB2YXIgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWzBdO1xuICAgICAgICB2YXIgbmV3RW5kVm5vZGUgPSBuZXdDaFtuZXdFbmRJZHhdO1xuICAgICAgICB2YXIgb2xkS2V5VG9JZHg7XG4gICAgICAgIHZhciBpZHhJbk9sZDtcbiAgICAgICAgdmFyIGVsbVRvTW92ZTtcbiAgICAgICAgdmFyIGJlZm9yZTtcbiAgICAgICAgd2hpbGUgKG9sZFN0YXJ0SWR4IDw9IG9sZEVuZElkeCAmJiBuZXdTdGFydElkeCA8PSBuZXdFbmRJZHgpIHtcbiAgICAgICAgICAgIGlmIChvbGRTdGFydFZub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBvbGRTdGFydFZub2RlID0gb2xkQ2hbKytvbGRTdGFydElkeF07IC8vIFZub2RlIG1pZ2h0IGhhdmUgYmVlbiBtb3ZlZCBsZWZ0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChvbGRFbmRWbm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgb2xkRW5kVm5vZGUgPSBvbGRDaFstLW9sZEVuZElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChuZXdTdGFydFZub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChuZXdFbmRWbm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbmV3RW5kVm5vZGUgPSBuZXdDaFstLW5ld0VuZElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzYW1lVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3U3RhcnRWbm9kZSkpIHtcbiAgICAgICAgICAgICAgICBwYXRjaFZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgb2xkU3RhcnRWbm9kZSA9IG9sZENoWysrb2xkU3RhcnRJZHhdO1xuICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNhbWVWbm9kZShvbGRFbmRWbm9kZSwgbmV3RW5kVm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRFbmRWbm9kZSwgbmV3RW5kVm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgb2xkRW5kVm5vZGUgPSBvbGRDaFstLW9sZEVuZElkeF07XG4gICAgICAgICAgICAgICAgbmV3RW5kVm5vZGUgPSBuZXdDaFstLW5ld0VuZElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzYW1lVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3RW5kVm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRTdGFydFZub2RlLCBuZXdFbmRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgb2xkU3RhcnRWbm9kZS5lbG0sIGFwaS5uZXh0U2libGluZyhvbGRFbmRWbm9kZS5lbG0pKTtcbiAgICAgICAgICAgICAgICBvbGRTdGFydFZub2RlID0gb2xkQ2hbKytvbGRTdGFydElkeF07XG4gICAgICAgICAgICAgICAgbmV3RW5kVm5vZGUgPSBuZXdDaFstLW5ld0VuZElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzYW1lVm5vZGUob2xkRW5kVm5vZGUsIG5ld1N0YXJ0Vm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRFbmRWbm9kZSwgbmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgb2xkRW5kVm5vZGUuZWxtLCBvbGRTdGFydFZub2RlLmVsbSk7XG4gICAgICAgICAgICAgICAgb2xkRW5kVm5vZGUgPSBvbGRDaFstLW9sZEVuZElkeF07XG4gICAgICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKG9sZEtleVRvSWR4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgb2xkS2V5VG9JZHggPSBjcmVhdGVLZXlUb09sZElkeChvbGRDaCwgb2xkU3RhcnRJZHgsIG9sZEVuZElkeCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlkeEluT2xkID0gb2xkS2V5VG9JZHhbbmV3U3RhcnRWbm9kZS5rZXldO1xuICAgICAgICAgICAgICAgIGlmIChpc1VuZGVmKGlkeEluT2xkKSkge1xuICAgICAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgY3JlYXRlRWxtKG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSksIG9sZFN0YXJ0Vm5vZGUuZWxtKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWxtVG9Nb3ZlID0gb2xkQ2hbaWR4SW5PbGRdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxtVG9Nb3ZlLnNlbCAhPT0gbmV3U3RhcnRWbm9kZS5zZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBjcmVhdGVFbG0obmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShlbG1Ub01vdmUsIG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbGRDaFtpZHhJbk9sZF0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgZWxtVG9Nb3ZlLmVsbSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9sZFN0YXJ0SWR4IDw9IG9sZEVuZElkeCB8fCBuZXdTdGFydElkeCA8PSBuZXdFbmRJZHgpIHtcbiAgICAgICAgICAgIGlmIChvbGRTdGFydElkeCA+IG9sZEVuZElkeCkge1xuICAgICAgICAgICAgICAgIGJlZm9yZSA9IG5ld0NoW25ld0VuZElkeCArIDFdID09IG51bGwgPyBudWxsIDogbmV3Q2hbbmV3RW5kSWR4ICsgMV0uZWxtO1xuICAgICAgICAgICAgICAgIGFkZFZub2RlcyhwYXJlbnRFbG0sIGJlZm9yZSwgbmV3Q2gsIG5ld1N0YXJ0SWR4LCBuZXdFbmRJZHgsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZW1vdmVWbm9kZXMocGFyZW50RWxtLCBvbGRDaCwgb2xkU3RhcnRJZHgsIG9sZEVuZElkeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcGF0Y2hWbm9kZShvbGRWbm9kZSwgdm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgICAgICB2YXIgaSwgaG9vaztcbiAgICAgICAgaWYgKGlzRGVmKGkgPSB2bm9kZS5kYXRhKSAmJiBpc0RlZihob29rID0gaS5ob29rKSAmJiBpc0RlZihpID0gaG9vay5wcmVwYXRjaCkpIHtcbiAgICAgICAgICAgIGkob2xkVm5vZGUsIHZub2RlKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZWxtID0gdm5vZGUuZWxtID0gb2xkVm5vZGUuZWxtO1xuICAgICAgICB2YXIgb2xkQ2ggPSBvbGRWbm9kZS5jaGlsZHJlbjtcbiAgICAgICAgdmFyIGNoID0gdm5vZGUuY2hpbGRyZW47XG4gICAgICAgIGlmIChvbGRWbm9kZSA9PT0gdm5vZGUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICh2bm9kZS5kYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMudXBkYXRlLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGNicy51cGRhdGVbaV0ob2xkVm5vZGUsIHZub2RlKTtcbiAgICAgICAgICAgIGkgPSB2bm9kZS5kYXRhLmhvb2s7XG4gICAgICAgICAgICBpZiAoaXNEZWYoaSkgJiYgaXNEZWYoaSA9IGkudXBkYXRlKSlcbiAgICAgICAgICAgICAgICBpKG9sZFZub2RlLCB2bm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzVW5kZWYodm5vZGUudGV4dCkpIHtcbiAgICAgICAgICAgIGlmIChpc0RlZihvbGRDaCkgJiYgaXNEZWYoY2gpKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9sZENoICE9PSBjaClcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlQ2hpbGRyZW4oZWxtLCBvbGRDaCwgY2gsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc0RlZihjaCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNEZWYob2xkVm5vZGUudGV4dCkpXG4gICAgICAgICAgICAgICAgICAgIGFwaS5zZXRUZXh0Q29udGVudChlbG0sICcnKTtcbiAgICAgICAgICAgICAgICBhZGRWbm9kZXMoZWxtLCBudWxsLCBjaCwgMCwgY2gubGVuZ3RoIC0gMSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzRGVmKG9sZENoKSkge1xuICAgICAgICAgICAgICAgIHJlbW92ZVZub2RlcyhlbG0sIG9sZENoLCAwLCBvbGRDaC5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzRGVmKG9sZFZub2RlLnRleHQpKSB7XG4gICAgICAgICAgICAgICAgYXBpLnNldFRleHRDb250ZW50KGVsbSwgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9sZFZub2RlLnRleHQgIT09IHZub2RlLnRleHQpIHtcbiAgICAgICAgICAgIGFwaS5zZXRUZXh0Q29udGVudChlbG0sIHZub2RlLnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0RlZihob29rKSAmJiBpc0RlZihpID0gaG9vay5wb3N0cGF0Y2gpKSB7XG4gICAgICAgICAgICBpKG9sZFZub2RlLCB2bm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHBhdGNoKG9sZFZub2RlLCB2bm9kZSkge1xuICAgICAgICB2YXIgaSwgZWxtLCBwYXJlbnQ7XG4gICAgICAgIHZhciBpbnNlcnRlZFZub2RlUXVldWUgPSBbXTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNicy5wcmUubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBjYnMucHJlW2ldKCk7XG4gICAgICAgIGlmICghaXNWbm9kZShvbGRWbm9kZSkpIHtcbiAgICAgICAgICAgIG9sZFZub2RlID0gZW1wdHlOb2RlQXQob2xkVm5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzYW1lVm5vZGUob2xkVm5vZGUsIHZub2RlKSkge1xuICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRWbm9kZSwgdm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbG0gPSBvbGRWbm9kZS5lbG07XG4gICAgICAgICAgICBwYXJlbnQgPSBhcGkucGFyZW50Tm9kZShlbG0pO1xuICAgICAgICAgICAgY3JlYXRlRWxtKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgaWYgKHBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50LCB2bm9kZS5lbG0sIGFwaS5uZXh0U2libGluZyhlbG0pKTtcbiAgICAgICAgICAgICAgICByZW1vdmVWbm9kZXMocGFyZW50LCBbb2xkVm5vZGVdLCAwLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpbnNlcnRlZFZub2RlUXVldWVbaV0uZGF0YS5ob29rLmluc2VydChpbnNlcnRlZFZub2RlUXVldWVbaV0pO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMucG9zdC5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIGNicy5wb3N0W2ldKCk7XG4gICAgICAgIHJldHVybiB2bm9kZTtcbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c25hYmJkb20uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc25hYmJkb20vZXMvc25hYmJkb20uanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnTmFtZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xufVxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudE5TKG5hbWVzcGFjZVVSSSwgcXVhbGlmaWVkTmFtZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlVVJJLCBxdWFsaWZpZWROYW1lKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVRleHROb2RlKHRleHQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG59XG5mdW5jdGlvbiBjcmVhdGVDb21tZW50KHRleHQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCh0ZXh0KTtcbn1cbmZ1bmN0aW9uIGluc2VydEJlZm9yZShwYXJlbnROb2RlLCBuZXdOb2RlLCByZWZlcmVuY2VOb2RlKSB7XG4gICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3Tm9kZSwgcmVmZXJlbmNlTm9kZSk7XG59XG5mdW5jdGlvbiByZW1vdmVDaGlsZChub2RlLCBjaGlsZCkge1xuICAgIG5vZGUucmVtb3ZlQ2hpbGQoY2hpbGQpO1xufVxuZnVuY3Rpb24gYXBwZW5kQ2hpbGQobm9kZSwgY2hpbGQpIHtcbiAgICBub2RlLmFwcGVuZENoaWxkKGNoaWxkKTtcbn1cbmZ1bmN0aW9uIHBhcmVudE5vZGUobm9kZSkge1xuICAgIHJldHVybiBub2RlLnBhcmVudE5vZGU7XG59XG5mdW5jdGlvbiBuZXh0U2libGluZyhub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubmV4dFNpYmxpbmc7XG59XG5mdW5jdGlvbiB0YWdOYW1lKGVsbSkge1xuICAgIHJldHVybiBlbG0udGFnTmFtZTtcbn1cbmZ1bmN0aW9uIHNldFRleHRDb250ZW50KG5vZGUsIHRleHQpIHtcbiAgICBub2RlLnRleHRDb250ZW50ID0gdGV4dDtcbn1cbmZ1bmN0aW9uIGdldFRleHRDb250ZW50KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS50ZXh0Q29udGVudDtcbn1cbmZ1bmN0aW9uIGlzRWxlbWVudChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDE7XG59XG5mdW5jdGlvbiBpc1RleHQobm9kZSkge1xuICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSAzO1xufVxuZnVuY3Rpb24gaXNDb21tZW50KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gODtcbn1cbmV4cG9ydCB2YXIgaHRtbERvbUFwaSA9IHtcbiAgICBjcmVhdGVFbGVtZW50OiBjcmVhdGVFbGVtZW50LFxuICAgIGNyZWF0ZUVsZW1lbnROUzogY3JlYXRlRWxlbWVudE5TLFxuICAgIGNyZWF0ZVRleHROb2RlOiBjcmVhdGVUZXh0Tm9kZSxcbiAgICBjcmVhdGVDb21tZW50OiBjcmVhdGVDb21tZW50LFxuICAgIGluc2VydEJlZm9yZTogaW5zZXJ0QmVmb3JlLFxuICAgIHJlbW92ZUNoaWxkOiByZW1vdmVDaGlsZCxcbiAgICBhcHBlbmRDaGlsZDogYXBwZW5kQ2hpbGQsXG4gICAgcGFyZW50Tm9kZTogcGFyZW50Tm9kZSxcbiAgICBuZXh0U2libGluZzogbmV4dFNpYmxpbmcsXG4gICAgdGFnTmFtZTogdGFnTmFtZSxcbiAgICBzZXRUZXh0Q29udGVudDogc2V0VGV4dENvbnRlbnQsXG4gICAgZ2V0VGV4dENvbnRlbnQ6IGdldFRleHRDb250ZW50LFxuICAgIGlzRWxlbWVudDogaXNFbGVtZW50LFxuICAgIGlzVGV4dDogaXNUZXh0LFxuICAgIGlzQ29tbWVudDogaXNDb21tZW50LFxufTtcbmV4cG9ydCBkZWZhdWx0IGh0bWxEb21BcGk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1odG1sZG9tYXBpLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL2VzL2h0bWxkb21hcGkuanNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGggfSBmcm9tICcuL2gnO1xuZnVuY3Rpb24gY29weVRvVGh1bmsodm5vZGUsIHRodW5rKSB7XG4gICAgdGh1bmsuZWxtID0gdm5vZGUuZWxtO1xuICAgIHZub2RlLmRhdGEuZm4gPSB0aHVuay5kYXRhLmZuO1xuICAgIHZub2RlLmRhdGEuYXJncyA9IHRodW5rLmRhdGEuYXJncztcbiAgICB0aHVuay5kYXRhID0gdm5vZGUuZGF0YTtcbiAgICB0aHVuay5jaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuO1xuICAgIHRodW5rLnRleHQgPSB2bm9kZS50ZXh0O1xuICAgIHRodW5rLmVsbSA9IHZub2RlLmVsbTtcbn1cbmZ1bmN0aW9uIGluaXQodGh1bmspIHtcbiAgICB2YXIgY3VyID0gdGh1bmsuZGF0YTtcbiAgICB2YXIgdm5vZGUgPSBjdXIuZm4uYXBwbHkodW5kZWZpbmVkLCBjdXIuYXJncyk7XG4gICAgY29weVRvVGh1bmsodm5vZGUsIHRodW5rKTtcbn1cbmZ1bmN0aW9uIHByZXBhdGNoKG9sZFZub2RlLCB0aHVuaykge1xuICAgIHZhciBpLCBvbGQgPSBvbGRWbm9kZS5kYXRhLCBjdXIgPSB0aHVuay5kYXRhO1xuICAgIHZhciBvbGRBcmdzID0gb2xkLmFyZ3MsIGFyZ3MgPSBjdXIuYXJncztcbiAgICBpZiAob2xkLmZuICE9PSBjdXIuZm4gfHwgb2xkQXJncy5sZW5ndGggIT09IGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNvcHlUb1RodW5rKGN1ci5mbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpLCB0aHVuayk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKG9sZEFyZ3NbaV0gIT09IGFyZ3NbaV0pIHtcbiAgICAgICAgICAgIGNvcHlUb1RodW5rKGN1ci5mbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpLCB0aHVuayk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29weVRvVGh1bmsob2xkVm5vZGUsIHRodW5rKTtcbn1cbmV4cG9ydCB2YXIgdGh1bmsgPSBmdW5jdGlvbiB0aHVuayhzZWwsIGtleSwgZm4sIGFyZ3MpIHtcbiAgICBpZiAoYXJncyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGFyZ3MgPSBmbjtcbiAgICAgICAgZm4gPSBrZXk7XG4gICAgICAgIGtleSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIGgoc2VsLCB7XG4gICAgICAgIGtleToga2V5LFxuICAgICAgICBob29rOiB7IGluaXQ6IGluaXQsIHByZXBhdGNoOiBwcmVwYXRjaCB9LFxuICAgICAgICBmbjogZm4sXG4gICAgICAgIGFyZ3M6IGFyZ3NcbiAgICB9KTtcbn07XG5leHBvcnQgZGVmYXVsdCB0aHVuaztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRodW5rLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL2VzL3RodW5rLmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIHVwZGF0ZUNsYXNzKG9sZFZub2RlLCB2bm9kZSkge1xuICAgIHZhciBjdXIsIG5hbWUsIGVsbSA9IHZub2RlLmVsbSwgb2xkQ2xhc3MgPSBvbGRWbm9kZS5kYXRhLmNsYXNzLCBrbGFzcyA9IHZub2RlLmRhdGEuY2xhc3M7XG4gICAgaWYgKCFvbGRDbGFzcyAmJiAha2xhc3MpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAob2xkQ2xhc3MgPT09IGtsYXNzKVxuICAgICAgICByZXR1cm47XG4gICAgb2xkQ2xhc3MgPSBvbGRDbGFzcyB8fCB7fTtcbiAgICBrbGFzcyA9IGtsYXNzIHx8IHt9O1xuICAgIGZvciAobmFtZSBpbiBvbGRDbGFzcykge1xuICAgICAgICBpZiAoIWtsYXNzW25hbWVdKSB7XG4gICAgICAgICAgICBlbG0uY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKG5hbWUgaW4ga2xhc3MpIHtcbiAgICAgICAgY3VyID0ga2xhc3NbbmFtZV07XG4gICAgICAgIGlmIChjdXIgIT09IG9sZENsYXNzW25hbWVdKSB7XG4gICAgICAgICAgICBlbG0uY2xhc3NMaXN0W2N1ciA/ICdhZGQnIDogJ3JlbW92ZSddKG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5jbGFzc01vZHVsZSA9IHsgY3JlYXRlOiB1cGRhdGVDbGFzcywgdXBkYXRlOiB1cGRhdGVDbGFzcyB9O1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5jbGFzc01vZHVsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNsYXNzLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL21vZHVsZXMvY2xhc3MuanNcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gaW52b2tlSGFuZGxlcihoYW5kbGVyLCB2bm9kZSwgZXZlbnQpIHtcbiAgICBpZiAodHlwZW9mIGhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAvLyBjYWxsIGZ1bmN0aW9uIGhhbmRsZXJcbiAgICAgICAgaGFuZGxlci5jYWxsKHZub2RlLCBldmVudCwgdm5vZGUpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAvLyBjYWxsIGhhbmRsZXIgd2l0aCBhcmd1bWVudHNcbiAgICAgICAgaWYgKHR5cGVvZiBoYW5kbGVyWzBdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIC8vIHNwZWNpYWwgY2FzZSBmb3Igc2luZ2xlIGFyZ3VtZW50IGZvciBwZXJmb3JtYW5jZVxuICAgICAgICAgICAgaWYgKGhhbmRsZXIubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlclswXS5jYWxsKHZub2RlLCBoYW5kbGVyWzFdLCBldmVudCwgdm5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBoYW5kbGVyLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgIGFyZ3MucHVzaChldmVudCk7XG4gICAgICAgICAgICAgICAgYXJncy5wdXNoKHZub2RlKTtcbiAgICAgICAgICAgICAgICBoYW5kbGVyWzBdLmFwcGx5KHZub2RlLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNhbGwgbXVsdGlwbGUgaGFuZGxlcnNcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGFuZGxlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGludm9rZUhhbmRsZXIoaGFuZGxlcltpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBoYW5kbGVFdmVudChldmVudCwgdm5vZGUpIHtcbiAgICB2YXIgbmFtZSA9IGV2ZW50LnR5cGUsIG9uID0gdm5vZGUuZGF0YS5vbjtcbiAgICAvLyBjYWxsIGV2ZW50IGhhbmRsZXIocykgaWYgZXhpc3RzXG4gICAgaWYgKG9uICYmIG9uW25hbWVdKSB7XG4gICAgICAgIGludm9rZUhhbmRsZXIob25bbmFtZV0sIHZub2RlLCBldmVudCk7XG4gICAgfVxufVxuZnVuY3Rpb24gY3JlYXRlTGlzdGVuZXIoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgaGFuZGxlRXZlbnQoZXZlbnQsIGhhbmRsZXIudm5vZGUpO1xuICAgIH07XG59XG5mdW5jdGlvbiB1cGRhdGVFdmVudExpc3RlbmVycyhvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICB2YXIgb2xkT24gPSBvbGRWbm9kZS5kYXRhLm9uLCBvbGRMaXN0ZW5lciA9IG9sZFZub2RlLmxpc3RlbmVyLCBvbGRFbG0gPSBvbGRWbm9kZS5lbG0sIG9uID0gdm5vZGUgJiYgdm5vZGUuZGF0YS5vbiwgZWxtID0gKHZub2RlICYmIHZub2RlLmVsbSksIG5hbWU7XG4gICAgLy8gb3B0aW1pemF0aW9uIGZvciByZXVzZWQgaW1tdXRhYmxlIGhhbmRsZXJzXG4gICAgaWYgKG9sZE9uID09PSBvbikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIHJlbW92ZSBleGlzdGluZyBsaXN0ZW5lcnMgd2hpY2ggbm8gbG9uZ2VyIHVzZWRcbiAgICBpZiAob2xkT24gJiYgb2xkTGlzdGVuZXIpIHtcbiAgICAgICAgLy8gaWYgZWxlbWVudCBjaGFuZ2VkIG9yIGRlbGV0ZWQgd2UgcmVtb3ZlIGFsbCBleGlzdGluZyBsaXN0ZW5lcnMgdW5jb25kaXRpb25hbGx5XG4gICAgICAgIGlmICghb24pIHtcbiAgICAgICAgICAgIGZvciAobmFtZSBpbiBvbGRPbikge1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBsaXN0ZW5lciBpZiBlbGVtZW50IHdhcyBjaGFuZ2VkIG9yIGV4aXN0aW5nIGxpc3RlbmVycyByZW1vdmVkXG4gICAgICAgICAgICAgICAgb2xkRWxtLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgb2xkTGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobmFtZSBpbiBvbGRPbikge1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBsaXN0ZW5lciBpZiBleGlzdGluZyBsaXN0ZW5lciByZW1vdmVkXG4gICAgICAgICAgICAgICAgaWYgKCFvbltuYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICBvbGRFbG0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBvbGRMaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBhZGQgbmV3IGxpc3RlbmVycyB3aGljaCBoYXMgbm90IGFscmVhZHkgYXR0YWNoZWRcbiAgICBpZiAob24pIHtcbiAgICAgICAgLy8gcmV1c2UgZXhpc3RpbmcgbGlzdGVuZXIgb3IgY3JlYXRlIG5ld1xuICAgICAgICB2YXIgbGlzdGVuZXIgPSB2bm9kZS5saXN0ZW5lciA9IG9sZFZub2RlLmxpc3RlbmVyIHx8IGNyZWF0ZUxpc3RlbmVyKCk7XG4gICAgICAgIC8vIHVwZGF0ZSB2bm9kZSBmb3IgbGlzdGVuZXJcbiAgICAgICAgbGlzdGVuZXIudm5vZGUgPSB2bm9kZTtcbiAgICAgICAgLy8gaWYgZWxlbWVudCBjaGFuZ2VkIG9yIGFkZGVkIHdlIGFkZCBhbGwgbmVlZGVkIGxpc3RlbmVycyB1bmNvbmRpdGlvbmFsbHlcbiAgICAgICAgaWYgKCFvbGRPbikge1xuICAgICAgICAgICAgZm9yIChuYW1lIGluIG9uKSB7XG4gICAgICAgICAgICAgICAgLy8gYWRkIGxpc3RlbmVyIGlmIGVsZW1lbnQgd2FzIGNoYW5nZWQgb3IgbmV3IGxpc3RlbmVycyBhZGRlZFxuICAgICAgICAgICAgICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKG5hbWUgaW4gb24pIHtcbiAgICAgICAgICAgICAgICAvLyBhZGQgbGlzdGVuZXIgaWYgbmV3IGxpc3RlbmVyIGFkZGVkXG4gICAgICAgICAgICAgICAgaWYgKCFvbGRPbltuYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICBlbG0uYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuZXZlbnRMaXN0ZW5lcnNNb2R1bGUgPSB7XG4gICAgY3JlYXRlOiB1cGRhdGVFdmVudExpc3RlbmVycyxcbiAgICB1cGRhdGU6IHVwZGF0ZUV2ZW50TGlzdGVuZXJzLFxuICAgIGRlc3Ryb3k6IHVwZGF0ZUV2ZW50TGlzdGVuZXJzXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5ldmVudExpc3RlbmVyc01vZHVsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV2ZW50bGlzdGVuZXJzLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL21vZHVsZXMvZXZlbnRsaXN0ZW5lcnMuanNcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHhsaW5rTlMgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc7XG52YXIgeG1sTlMgPSAnaHR0cDovL3d3dy53My5vcmcvWE1MLzE5OTgvbmFtZXNwYWNlJztcbnZhciBjb2xvbkNoYXIgPSA1ODtcbnZhciB4Q2hhciA9IDEyMDtcbmZ1bmN0aW9uIHVwZGF0ZUF0dHJzKG9sZFZub2RlLCB2bm9kZSkge1xuICAgIHZhciBrZXksIGVsbSA9IHZub2RlLmVsbSwgb2xkQXR0cnMgPSBvbGRWbm9kZS5kYXRhLmF0dHJzLCBhdHRycyA9IHZub2RlLmRhdGEuYXR0cnM7XG4gICAgaWYgKCFvbGRBdHRycyAmJiAhYXR0cnMpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAob2xkQXR0cnMgPT09IGF0dHJzKVxuICAgICAgICByZXR1cm47XG4gICAgb2xkQXR0cnMgPSBvbGRBdHRycyB8fCB7fTtcbiAgICBhdHRycyA9IGF0dHJzIHx8IHt9O1xuICAgIC8vIHVwZGF0ZSBtb2RpZmllZCBhdHRyaWJ1dGVzLCBhZGQgbmV3IGF0dHJpYnV0ZXNcbiAgICBmb3IgKGtleSBpbiBhdHRycykge1xuICAgICAgICB2YXIgY3VyID0gYXR0cnNba2V5XTtcbiAgICAgICAgdmFyIG9sZCA9IG9sZEF0dHJzW2tleV07XG4gICAgICAgIGlmIChvbGQgIT09IGN1cikge1xuICAgICAgICAgICAgaWYgKGN1ciA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoa2V5LCBcIlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGN1ciA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBlbG0ucmVtb3ZlQXR0cmlidXRlKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5LmNoYXJDb2RlQXQoMCkgIT09IHhDaGFyKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoa2V5LCBjdXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrZXkuY2hhckNvZGVBdCgzKSA9PT0gY29sb25DaGFyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFzc3VtZSB4bWwgbmFtZXNwYWNlXG4gICAgICAgICAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGVOUyh4bWxOUywga2V5LCBjdXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrZXkuY2hhckNvZGVBdCg1KSA9PT0gY29sb25DaGFyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFzc3VtZSB4bGluayBuYW1lc3BhY2VcbiAgICAgICAgICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZU5TKHhsaW5rTlMsIGtleSwgY3VyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoa2V5LCBjdXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyByZW1vdmUgcmVtb3ZlZCBhdHRyaWJ1dGVzXG4gICAgLy8gdXNlIGBpbmAgb3BlcmF0b3Igc2luY2UgdGhlIHByZXZpb3VzIGBmb3JgIGl0ZXJhdGlvbiB1c2VzIGl0ICguaS5lLiBhZGQgZXZlbiBhdHRyaWJ1dGVzIHdpdGggdW5kZWZpbmVkIHZhbHVlKVxuICAgIC8vIHRoZSBvdGhlciBvcHRpb24gaXMgdG8gcmVtb3ZlIGFsbCBhdHRyaWJ1dGVzIHdpdGggdmFsdWUgPT0gdW5kZWZpbmVkXG4gICAgZm9yIChrZXkgaW4gb2xkQXR0cnMpIHtcbiAgICAgICAgaWYgKCEoa2V5IGluIGF0dHJzKSkge1xuICAgICAgICAgICAgZWxtLnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5hdHRyaWJ1dGVzTW9kdWxlID0geyBjcmVhdGU6IHVwZGF0ZUF0dHJzLCB1cGRhdGU6IHVwZGF0ZUF0dHJzIH07XG5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmF0dHJpYnV0ZXNNb2R1bGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hdHRyaWJ1dGVzLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL21vZHVsZXMvYXR0cmlidXRlcy5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiB1cGRhdGVQcm9wcyhvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICB2YXIga2V5LCBjdXIsIG9sZCwgZWxtID0gdm5vZGUuZWxtLCBvbGRQcm9wcyA9IG9sZFZub2RlLmRhdGEucHJvcHMsIHByb3BzID0gdm5vZGUuZGF0YS5wcm9wcztcbiAgICBpZiAoIW9sZFByb3BzICYmICFwcm9wcylcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChvbGRQcm9wcyA9PT0gcHJvcHMpXG4gICAgICAgIHJldHVybjtcbiAgICBvbGRQcm9wcyA9IG9sZFByb3BzIHx8IHt9O1xuICAgIHByb3BzID0gcHJvcHMgfHwge307XG4gICAgZm9yIChrZXkgaW4gb2xkUHJvcHMpIHtcbiAgICAgICAgaWYgKCFwcm9wc1trZXldKSB7XG4gICAgICAgICAgICBkZWxldGUgZWxtW2tleV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChrZXkgaW4gcHJvcHMpIHtcbiAgICAgICAgY3VyID0gcHJvcHNba2V5XTtcbiAgICAgICAgb2xkID0gb2xkUHJvcHNba2V5XTtcbiAgICAgICAgaWYgKG9sZCAhPT0gY3VyICYmIChrZXkgIT09ICd2YWx1ZScgfHwgZWxtW2tleV0gIT09IGN1cikpIHtcbiAgICAgICAgICAgIGVsbVtrZXldID0gY3VyO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5wcm9wc01vZHVsZSA9IHsgY3JlYXRlOiB1cGRhdGVQcm9wcywgdXBkYXRlOiB1cGRhdGVQcm9wcyB9O1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5wcm9wc01vZHVsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByb3BzLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL21vZHVsZXMvcHJvcHMuanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=