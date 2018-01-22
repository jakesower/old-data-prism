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
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Stream;
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

function Stream (source) {
  this.source = source
}

Stream.prototype.run = function (sink, scheduler) {
  return this.source.run(sink, scheduler)
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["f"] = tryDispose;
/* harmony export (immutable) */ __webpack_exports__["b"] = create;
/* harmony export (immutable) */ __webpack_exports__["c"] = empty;
/* harmony export (immutable) */ __webpack_exports__["a"] = all;
/* unused harmony export promised */
/* harmony export (immutable) */ __webpack_exports__["e"] = settable;
/* harmony export (immutable) */ __webpack_exports__["d"] = once;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Disposable__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SettableDisposable__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Promise__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__most_prelude__ = __webpack_require__(3);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */





var map = __WEBPACK_IMPORTED_MODULE_3__most_prelude__["j" /* map */]
var identity = __WEBPACK_IMPORTED_MODULE_3__most_prelude__["h" /* id */]

/**
 * Call disposable.dispose.  If it returns a promise, catch promise
 * error and forward it through the provided sink.
 * @param {number} t time
 * @param {{dispose: function}} disposable
 * @param {{error: function}} sink
 * @return {*} result of disposable.dispose
 */
function tryDispose (t, disposable, sink) {
  var result = disposeSafely(disposable)
  return Object(__WEBPACK_IMPORTED_MODULE_2__Promise__["a" /* isPromise */])(result)
    ? result.catch(function (e) {
      sink.error(t, e)
    })
    : result
}

/**
 * Create a new Disposable which will dispose its underlying resource
 * at most once.
 * @param {function} dispose function
 * @param {*?} data any data to be passed to disposer function
 * @return {Disposable}
 */
function create (dispose, data) {
  return once(new __WEBPACK_IMPORTED_MODULE_0__Disposable__["a" /* default */](dispose, data))
}

/**
 * Create a noop disposable. Can be used to satisfy a Disposable
 * requirement when no actual resource needs to be disposed.
 * @return {Disposable|exports|module.exports}
 */
function empty () {
  return new __WEBPACK_IMPORTED_MODULE_0__Disposable__["a" /* default */](identity, void 0)
}

/**
 * Create a disposable that will dispose all input disposables in parallel.
 * @param {Array<Disposable>} disposables
 * @return {Disposable}
 */
function all (disposables) {
  return create(disposeAll, disposables)
}

function disposeAll (disposables) {
  return Promise.all(map(disposeSafely, disposables))
}

function disposeSafely (disposable) {
  try {
    return disposable.dispose()
  } catch (e) {
    return Promise.reject(e)
  }
}

/**
 * Create a disposable from a promise for another disposable
 * @param {Promise<Disposable>} disposablePromise
 * @return {Disposable}
 */
function promised (disposablePromise) {
  return create(disposePromise, disposablePromise)
}

function disposePromise (disposablePromise) {
  return disposablePromise.then(disposeOne)
}

function disposeOne (disposable) {
  return disposable.dispose()
}

/**
 * Create a disposable proxy that allows its underlying disposable to
 * be set later.
 * @return {SettableDisposable}
 */
function settable () {
  return new __WEBPACK_IMPORTED_MODULE_1__SettableDisposable__["a" /* default */]()
}

/**
 * Wrap an existing disposable (which may not already have been once()d)
 * so that it will only dispose its underlying resource at most once.
 * @param {{ dispose: function() }} disposable
 * @return {Disposable} wrapped disposable
 */
function once (disposable) {
  return new __WEBPACK_IMPORTED_MODULE_0__Disposable__["a" /* default */](disposeMemoized, memoized(disposable))
}

function disposeMemoized (memoized) {
  if (!memoized.disposed) {
    memoized.disposed = true
    memoized.value = disposeSafely(memoized.disposable)
    memoized.disposable = void 0
  }

  return memoized.value
}

function memoized (disposable) {
  return { disposed: false, disposable: disposable, value: void 0 }
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Pipe;
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

/**
 * A sink mixin that simply forwards event, end, and error to
 * another sink.
 * @param sink
 * @constructor
 */
function Pipe (sink) {
  this.sink = sink
}

Pipe.prototype.event = function (t, x) {
  return this.sink.event(t, x)
}

Pipe.prototype.end = function (t, x) {
  return this.sink.end(t, x)
}

Pipe.prototype.error = function (t, e) {
  return this.sink.error(t, e)
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return cons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return append; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return drop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return tail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return reduce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return replace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return remove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return removeAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return findIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return isArrayLike; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return id; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return compose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return apply; });
/* unused harmony export curry2 */
/* unused harmony export curry3 */
/* unused harmony export curry4 */
/** @license MIT License (c) copyright 2010-2016 original author or authors */

// Non-mutating array operations

// cons :: a -> [a] -> [a]
// a with x prepended
function cons(x, a) {
  var l = a.length;
  var b = new Array(l + 1);
  b[0] = x;
  for (var i = 0; i < l; ++i) {
    b[i + 1] = a[i];
  }
  return b;
}

// append :: a -> [a] -> [a]
// a with x appended
function append(x, a) {
  var l = a.length;
  var b = new Array(l + 1);
  for (var i = 0; i < l; ++i) {
    b[i] = a[i];
  }

  b[l] = x;
  return b;
}

// drop :: Int -> [a] -> [a]
// drop first n elements
function drop(n, a) {
  // eslint-disable-line complexity
  if (n < 0) {
    throw new TypeError('n must be >= 0');
  }

  var l = a.length;
  if (n === 0 || l === 0) {
    return a;
  }

  if (n >= l) {
    return [];
  }

  return unsafeDrop(n, a, l - n);
}

// unsafeDrop :: Int -> [a] -> Int -> [a]
// Internal helper for drop
function unsafeDrop(n, a, l) {
  var b = new Array(l);
  for (var i = 0; i < l; ++i) {
    b[i] = a[n + i];
  }
  return b;
}

// tail :: [a] -> [a]
// drop head element
function tail(a) {
  return drop(1, a);
}

// copy :: [a] -> [a]
// duplicate a (shallow duplication)
function copy(a) {
  var l = a.length;
  var b = new Array(l);
  for (var i = 0; i < l; ++i) {
    b[i] = a[i];
  }
  return b;
}

// map :: (a -> b) -> [a] -> [b]
// transform each element with f
function map(f, a) {
  var l = a.length;
  var b = new Array(l);
  for (var i = 0; i < l; ++i) {
    b[i] = f(a[i]);
  }
  return b;
}

// reduce :: (a -> b -> a) -> a -> [b] -> a
// accumulate via left-fold
function reduce(f, z, a) {
  var r = z;
  for (var i = 0, l = a.length; i < l; ++i) {
    r = f(r, a[i], i);
  }
  return r;
}

// replace :: a -> Int -> [a]
// replace element at index
function replace(x, i, a) {
  // eslint-disable-line complexity
  if (i < 0) {
    throw new TypeError('i must be >= 0');
  }

  var l = a.length;
  var b = new Array(l);
  for (var j = 0; j < l; ++j) {
    b[j] = i === j ? x : a[j];
  }
  return b;
}

// remove :: Int -> [a] -> [a]
// remove element at index
function remove(i, a) {
  // eslint-disable-line complexity
  if (i < 0) {
    throw new TypeError('i must be >= 0');
  }

  var l = a.length;
  if (l === 0 || i >= l) {
    // exit early if index beyond end of array
    return a;
  }

  if (l === 1) {
    // exit early if index in bounds and length === 1
    return [];
  }

  return unsafeRemove(i, a, l - 1);
}

// unsafeRemove :: Int -> [a] -> Int -> [a]
// Internal helper to remove element at index
function unsafeRemove(i, a, l) {
  var b = new Array(l);
  var j = void 0;
  for (j = 0; j < i; ++j) {
    b[j] = a[j];
  }
  for (j = i; j < l; ++j) {
    b[j] = a[j + 1];
  }

  return b;
}

// removeAll :: (a -> boolean) -> [a] -> [a]
// remove all elements matching a predicate
function removeAll(f, a) {
  var l = a.length;
  var b = new Array(l);
  var j = 0;
  for (var x, i = 0; i < l; ++i) {
    x = a[i];
    if (!f(x)) {
      b[j] = x;
      ++j;
    }
  }

  b.length = j;
  return b;
}

// findIndex :: a -> [a] -> Int
// find index of x in a, from the left
function findIndex(x, a) {
  for (var i = 0, l = a.length; i < l; ++i) {
    if (x === a[i]) {
      return i;
    }
  }
  return -1;
}

// isArrayLike :: * -> boolean
// Return true iff x is array-like
function isArrayLike(x) {
  return x != null && typeof x.length === 'number' && typeof x !== 'function';
}

/** @license MIT License (c) copyright 2010-2016 original author or authors */

// id :: a -> a
var id = function id(x) {
  return x;
};

// compose :: (b -> c) -> (a -> b) -> (a -> c)
var compose = function compose(f, g) {
  return function (x) {
    return f(g(x));
  };
};

// apply :: (a -> b) -> a -> b
var apply = function apply(f, x) {
  return f(x);
};

// curry2 :: ((a, b) -> c) -> (a -> b -> c)
function curry2(f) {
  function curried(a, b) {
    switch (arguments.length) {
      case 0:
        return curried;
      case 1:
        return function (b) {
          return f(a, b);
        };
      default:
        return f(a, b);
    }
  }
  return curried;
}

// curry3 :: ((a, b, c) -> d) -> (a -> b -> c -> d)
function curry3(f) {
  function curried(a, b, c) {
    // eslint-disable-line complexity
    switch (arguments.length) {
      case 0:
        return curried;
      case 1:
        return curry2(function (b, c) {
          return f(a, b, c);
        });
      case 2:
        return function (c) {
          return f(a, b, c);
        };
      default:
        return f(a, b, c);
    }
  }
  return curried;
}

// curry4 :: ((a, b, c, d) -> e) -> (a -> b -> c -> d -> e)
function curry4(f) {
  function curried(a, b, c, d) {
    // eslint-disable-line complexity
    switch (arguments.length) {
      case 0:
        return curried;
      case 1:
        return curry3(function (b, c, d) {
          return f(a, b, c, d);
        });
      case 2:
        return curry2(function (c, d) {
          return f(a, b, c, d);
        });
      case 3:
        return function (d) {
          return f(a, b, c, d);
        };
      default:
        return f(a, b, c, d);
    }
  }
  return curried;
}

/** @license MIT License (c) copyright 2016 original author or authors */


//# sourceMappingURL=index.es.js.map


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = PropagateTask;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fatalError__ = __webpack_require__(8);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */



function PropagateTask (run, value, sink) {
  this._run = run
  this.value = value
  this.sink = sink
  this.active = true
}

PropagateTask.event = function (value, sink) {
  return new PropagateTask(emit, value, sink)
}

PropagateTask.end = function (value, sink) {
  return new PropagateTask(end, value, sink)
}

PropagateTask.error = function (value, sink) {
  return new PropagateTask(error, value, sink)
}

PropagateTask.prototype.dispose = function () {
  this.active = false
}

PropagateTask.prototype.run = function (t) {
  if (!this.active) {
    return
  }
  this._run(t, this.value, this.sink)
}

PropagateTask.prototype.error = function (t, e) {
  if (!this.active) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__fatalError__["a" /* default */])(e)
  }
  this.sink.error(t, e)
}

function error (t, e, sink) {
  sink.error(t, e)
}

function emit (t, x, sink) {
  sink.event(t, x)
}

function end (t, x, sink) {
  sink.end(t, x)
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = of;
/* harmony export (immutable) */ __webpack_exports__["a"] = empty;
/* harmony export (immutable) */ __webpack_exports__["b"] = never;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__disposable_dispose__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scheduler_PropagateTask__ = __webpack_require__(4);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */





/**
 * Stream containing only x
 * @param {*} x
 * @returns {Stream}
 */
function of (x) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new Just(x))
}

function Just (x) {
  this.value = x
}

Just.prototype.run = function (sink, scheduler) {
  return scheduler.asap(new __WEBPACK_IMPORTED_MODULE_2__scheduler_PropagateTask__["a" /* default */](runJust, this.value, sink))
}

function runJust (t, x, sink) {
  sink.event(t, x)
  sink.end(t, void 0)
}

/**
 * Stream containing no events and ends immediately
 * @returns {Stream}
 */
function empty () {
  return EMPTY
}

function EmptySource () {}

EmptySource.prototype.run = function (sink, scheduler) {
  var task = __WEBPACK_IMPORTED_MODULE_2__scheduler_PropagateTask__["a" /* default */].end(void 0, sink)
  scheduler.asap(task)

  return __WEBPACK_IMPORTED_MODULE_1__disposable_dispose__["b" /* create */](disposeEmpty, task)
}

function disposeEmpty (task) {
  return task.dispose()
}

var EMPTY = new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new EmptySource())

/**
 * Stream containing no events and never ends
 * @returns {Stream}
 */
function never () {
  return NEVER
}

function NeverSource () {}

NeverSource.prototype.run = function () {
  return __WEBPACK_IMPORTED_MODULE_1__disposable_dispose__["c" /* empty */]()
}

var NEVER = new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new NeverSource())


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = tryEvent;
/* harmony export (immutable) */ __webpack_exports__["a"] = tryEnd;
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

function tryEvent (t, x, sink) {
  try {
    sink.event(t, x)
  } catch (e) {
    sink.error(t, e)
  }
}

function tryEnd (t, x, sink) {
  try {
    sink.end(t, x)
  } catch (e) {
    sink.error(t, e)
  }
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = map;
/* harmony export (immutable) */ __webpack_exports__["a"] = constant;
/* harmony export (immutable) */ __webpack_exports__["c"] = tap;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fusion_Map__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sink_Pipe__ = __webpack_require__(2);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */





/**
 * Transform each value in the stream by applying f to each
 * @param {function(*):*} f mapping function
 * @param {Stream} stream stream to map
 * @returns {Stream} stream containing items transformed by f
 */
function map (f, stream) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](__WEBPACK_IMPORTED_MODULE_1__fusion_Map__["a" /* default */].create(f, stream.source))
}

/**
* Replace each value in the stream with x
* @param {*} x
* @param {Stream} stream
* @returns {Stream} stream containing items replaced with x
*/
function constant (x, stream) {
  return map(function () {
    return x
  }, stream)
}

/**
* Perform a side effect for each item in the stream
* @param {function(x:*):*} f side effect to execute for each item. The
*  return value will be discarded.
* @param {Stream} stream stream to tap
* @returns {Stream} new stream containing the same items as this stream
*/
function tap (f, stream) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new Tap(f, stream.source))
}

function Tap (f, source) {
  this.source = source
  this.f = f
}

Tap.prototype.run = function (sink, scheduler) {
  return this.source.run(new TapSink(this.f, sink), scheduler)
}

function TapSink (f, sink) {
  this.sink = sink
  this.f = f
}

TapSink.prototype.end = __WEBPACK_IMPORTED_MODULE_2__sink_Pipe__["a" /* default */].prototype.end
TapSink.prototype.error = __WEBPACK_IMPORTED_MODULE_2__sink_Pipe__["a" /* default */].prototype.error

TapSink.prototype.event = function (t, x) {
  var f = this.f
  f(x)
  this.sink.event(t, x)
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fatalError;
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

function fatalError (e) {
  setTimeout(function () {
    throw e
  }, 0)
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Scheduler__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ClockTimer__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Timeline__ = __webpack_require__(50);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */





var defaultScheduler = new __WEBPACK_IMPORTED_MODULE_0__Scheduler__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_1__ClockTimer__["a" /* default */](), new __WEBPACK_IMPORTED_MODULE_2__Timeline__["a" /* default */]())

/* harmony default export */ __webpack_exports__["a"] = (defaultScheduler);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = defer;
/* harmony export (immutable) */ __webpack_exports__["b"] = runTask;
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

function defer (task) {
  return Promise.resolve(task).then(runTask)
}

function runTask (task) {
  try {
    return task.run()
  } catch (e) {
    return task.error(e)
  }
}


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Map;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sink_Pipe__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Filter__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FilterMap__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__most_prelude__ = __webpack_require__(3);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */






function Map (f, source) {
  this.f = f
  this.source = source
}

/**
 * Create a mapped source, fusing adjacent map.map, filter.map,
 * and filter.map.map if possible
 * @param {function(*):*} f mapping function
 * @param {{run:function}} source source to map
 * @returns {Map|FilterMap} mapped source, possibly fused
 */
Map.create = function createMap (f, source) {
  if (source instanceof Map) {
    return new Map(__WEBPACK_IMPORTED_MODULE_3__most_prelude__["c" /* compose */](f, source.f), source.source)
  }

  if (source instanceof __WEBPACK_IMPORTED_MODULE_1__Filter__["a" /* default */]) {
    return new __WEBPACK_IMPORTED_MODULE_2__FilterMap__["a" /* default */](source.p, f, source.source)
  }

  return new Map(f, source)
}

Map.prototype.run = function (sink, scheduler) { // eslint-disable-line no-extend-native
  return this.source.run(new MapSink(this.f, sink), scheduler)
}

function MapSink (f, sink) {
  this.f = f
  this.sink = sink
}

MapSink.prototype.end = __WEBPACK_IMPORTED_MODULE_0__sink_Pipe__["a" /* default */].prototype.end
MapSink.prototype.error = __WEBPACK_IMPORTED_MODULE_0__sink_Pipe__["a" /* default */].prototype.error

MapSink.prototype.event = function (t, x) {
  var f = this.f
  this.sink.event(t, f(x))
}


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = IndexSink;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Pipe__ = __webpack_require__(2);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */



function IndexSink (i, sink) {
  this.sink = sink
  this.index = i
  this.active = true
  this.value = void 0
}

IndexSink.prototype.event = function (t, x) {
  if (!this.active) {
    return
  }
  this.value = x
  this.sink.event(t, this)
}

IndexSink.prototype.end = function (t, x) {
  if (!this.active) {
    return
  }
  this.active = false
  this.sink.end(t, { index: this.index, value: x })
}

IndexSink.prototype.error = __WEBPACK_IMPORTED_MODULE_0__Pipe__["a" /* default */].prototype.error


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = invoke;
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

function invoke (f, args) {
	/*eslint complexity: [2,7]*/
  switch (args.length) {
    case 0: return f()
    case 1: return f(args[0])
    case 2: return f(args[0], args[1])
    case 3: return f(args[0], args[1], args[2])
    case 4: return f(args[0], args[1], args[2], args[3])
    case 5: return f(args[0], args[1], args[2], args[3], args[4])
    default:
      return f.apply(void 0, args)
  }
}


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = mergeConcurrently;
/* harmony export (immutable) */ __webpack_exports__["b"] = mergeMapConcurrently;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__disposable_dispose__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__LinkedList__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__most_prelude__ = __webpack_require__(3);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */






function mergeConcurrently (concurrency, stream) {
  return mergeMapConcurrently(__WEBPACK_IMPORTED_MODULE_3__most_prelude__["h" /* id */], concurrency, stream)
}

function mergeMapConcurrently (f, concurrency, stream) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new MergeConcurrently(f, concurrency, stream.source))
}

function MergeConcurrently (f, concurrency, source) {
  this.f = f
  this.concurrency = concurrency
  this.source = source
}

MergeConcurrently.prototype.run = function (sink, scheduler) {
  return new Outer(this.f, this.concurrency, this.source, sink, scheduler)
}

function Outer (f, concurrency, source, sink, scheduler) {
  this.f = f
  this.concurrency = concurrency
  this.sink = sink
  this.scheduler = scheduler
  this.pending = []
  this.current = new __WEBPACK_IMPORTED_MODULE_2__LinkedList__["a" /* default */]()
  this.disposable = __WEBPACK_IMPORTED_MODULE_1__disposable_dispose__["d" /* once */](source.run(this, scheduler))
  this.active = true
}

Outer.prototype.event = function (t, x) {
  this._addInner(t, x)
}

Outer.prototype._addInner = function (t, x) {
  if (this.current.length < this.concurrency) {
    this._startInner(t, x)
  } else {
    this.pending.push(x)
  }
}

Outer.prototype._startInner = function (t, x) {
  try {
    this._initInner(t, x)
  } catch (e) {
    this.error(t, e)
  }
}

Outer.prototype._initInner = function (t, x) {
  var innerSink = new Inner(t, this, this.sink)
  innerSink.disposable = mapAndRun(this.f, x, innerSink, this.scheduler)
  this.current.add(innerSink)
}

function mapAndRun (f, x, sink, scheduler) {
  return f(x).source.run(sink, scheduler)
}

Outer.prototype.end = function (t, x) {
  this.active = false
  __WEBPACK_IMPORTED_MODULE_1__disposable_dispose__["f" /* tryDispose */](t, this.disposable, this.sink)
  this._checkEnd(t, x)
}

Outer.prototype.error = function (t, e) {
  this.active = false
  this.sink.error(t, e)
}

Outer.prototype.dispose = function () {
  this.active = false
  this.pending.length = 0
  return Promise.all([this.disposable.dispose(), this.current.dispose()])
}

Outer.prototype._endInner = function (t, x, inner) {
  this.current.remove(inner)
  __WEBPACK_IMPORTED_MODULE_1__disposable_dispose__["f" /* tryDispose */](t, inner, this)

  if (this.pending.length === 0) {
    this._checkEnd(t, x)
  } else {
    this._startInner(t, this.pending.shift())
  }
}

Outer.prototype._checkEnd = function (t, x) {
  if (!this.active && this.current.isEmpty()) {
    this.sink.end(t, x)
  }
}

function Inner (time, outer, sink) {
  this.prev = this.next = null
  this.time = time
  this.outer = outer
  this.sink = sink
  this.disposable = void 0
}

Inner.prototype.event = function (t, x) {
  this.sink.event(Math.max(t, this.time), x)
}

Inner.prototype.end = function (t, x) {
  this.outer._endInner(Math.max(t, this.time), x, this)
}

Inner.prototype.error = function (t, e) {
  this.outer.error(Math.max(t, this.time), e)
}

Inner.prototype.dispose = function () {
  return this.disposable.dispose()
}


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["init"] = init;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vnode__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__is__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__htmldomapi__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__h__ = __webpack_require__(18);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_3__h__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__thunk__ = __webpack_require__(28);
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
/* 16 */
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
/* 17 */
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
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = h;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vnode__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__is__ = __webpack_require__(17);


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
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = isIterable;
/* harmony export (immutable) */ __webpack_exports__["a"] = getIterator;
/* unused harmony export makeIterable */
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

/*global Set, Symbol*/
var iteratorSymbol
// Firefox ships a partial implementation using the name @@iterator.
// https://bugzilla.mozilla.org/show_bug.cgi?id=907077#c14
if (typeof Set === 'function' && typeof new Set()['@@iterator'] === 'function') {
  iteratorSymbol = '@@iterator'
} else {
  iteratorSymbol = typeof Symbol === 'function' && Symbol.iterator ||
  '_es6shim_iterator_'
}

function isIterable (o) {
  return typeof o[iteratorSymbol] === 'function'
}

function getIterator (o) {
  return o[iteratorSymbol]()
}

function makeIterable (f, o) {
  o[iteratorSymbol] = f
  return o
}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(40);


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = withDefaultScheduler;
/* unused harmony export withScheduler */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__disposable_dispose__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scheduler_defaultScheduler__ = __webpack_require__(9);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */




function withDefaultScheduler (source) {
  return withScheduler(source, __WEBPACK_IMPORTED_MODULE_1__scheduler_defaultScheduler__["a" /* default */])
}

function withScheduler (source, scheduler) {
  return new Promise(function (resolve, reject) {
    runSource(source, scheduler, resolve, reject)
  })
}

function runSource (source, scheduler, resolve, reject) {
  var disposable = __WEBPACK_IMPORTED_MODULE_0__disposable_dispose__["e" /* settable */]()
  var observer = new Drain(resolve, reject, disposable)

  disposable.setDisposable(source.run(observer, scheduler))
}

function Drain (end, error, disposable) {
  this._end = end
  this._error = error
  this._disposable = disposable
  this.active = true
}

Drain.prototype.event = function (t, x) {}

Drain.prototype.end = function (t, x) {
  if (!this.active) {
    return
  }
  this.active = false
  disposeThen(this._end, this._error, this._disposable, x)
}

Drain.prototype.error = function (t, e) {
  this.active = false
  disposeThen(this._error, this._error, this._disposable, e)
}

function disposeThen (end, error, disposable, x) {
  Promise.resolve(disposable.dispose()).then(function () {
    end(x)
  }, error)
}


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Filter;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sink_Pipe__ = __webpack_require__(2);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */



function Filter (p, source) {
  this.p = p
  this.source = source
}

/**
 * Create a filtered source, fusing adjacent filter.filter if possible
 * @param {function(x:*):boolean} p filtering predicate
 * @param {{run:function}} source source to filter
 * @returns {Filter} filtered source
 */
Filter.create = function createFilter (p, source) {
  if (source instanceof Filter) {
    return new Filter(and(source.p, p), source.source)
  }

  return new Filter(p, source)
}

Filter.prototype.run = function (sink, scheduler) {
  return this.source.run(new FilterSink(this.p, sink), scheduler)
}

function FilterSink (p, sink) {
  this.p = p
  this.sink = sink
}

FilterSink.prototype.end = __WEBPACK_IMPORTED_MODULE_0__sink_Pipe__["a" /* default */].prototype.end
FilterSink.prototype.error = __WEBPACK_IMPORTED_MODULE_0__sink_Pipe__["a" /* default */].prototype.error

FilterSink.prototype.event = function (t, x) {
  var p = this.p
  p(x) && this.sink.event(t, x)
}

function and (p, q) {
  return function (x) {
    return p(x) && q(x)
  }
}


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = continueWith;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__disposable_dispose__ = __webpack_require__(1);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */





function continueWith (f, stream) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new ContinueWith(f, stream.source))
}

function ContinueWith (f, source) {
  this.f = f
  this.source = source
}

ContinueWith.prototype.run = function (sink, scheduler) {
  return new ContinueWithSink(this.f, this.source, sink, scheduler)
}

function ContinueWithSink (f, source, sink, scheduler) {
  this.f = f
  this.sink = sink
  this.scheduler = scheduler
  this.active = true
  this.disposable = __WEBPACK_IMPORTED_MODULE_2__disposable_dispose__["d" /* once */](source.run(this, scheduler))
}

ContinueWithSink.prototype.error = __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__["a" /* default */].prototype.error

ContinueWithSink.prototype.event = function (t, x) {
  if (!this.active) {
    return
  }
  this.sink.event(t, x)
}

ContinueWithSink.prototype.end = function (t, x) {
  if (!this.active) {
    return
  }

  __WEBPACK_IMPORTED_MODULE_2__disposable_dispose__["f" /* tryDispose */](t, this.disposable, this.sink)
  this._startNext(t, x, this.sink)
}

ContinueWithSink.prototype._startNext = function (t, x, sink) {
  try {
    this.disposable = this._continue(this.f, x, sink)
  } catch (e) {
    sink.error(t, e)
  }
}

ContinueWithSink.prototype._continue = function (f, x, sink) {
  return f(x).source.run(sink, this.scheduler)
}

ContinueWithSink.prototype.dispose = function () {
  this.active = false
  return this.disposable.dispose()
}


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = combine;
/* harmony export (immutable) */ __webpack_exports__["b"] = combineArray;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__transform__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__source_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sink_Pipe__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sink_IndexSink__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__disposable_dispose__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__most_prelude__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__invoke__ = __webpack_require__(13);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */










var map = __WEBPACK_IMPORTED_MODULE_6__most_prelude__["j" /* map */]
var tail = __WEBPACK_IMPORTED_MODULE_6__most_prelude__["o" /* tail */]

/**
 * Combine latest events from all input streams
 * @param {function(...events):*} f function to combine most recent events
 * @returns {Stream} stream containing the result of applying f to the most recent
 *  event of each input stream, whenever a new event arrives on any stream.
 */
function combine (f /*, ...streams */) {
  return combineArray(f, tail(arguments))
}

/**
* Combine latest events from all input streams
* @param {function(...events):*} f function to combine most recent events
* @param {[Stream]} streams most recent events
* @returns {Stream} stream containing the result of applying f to the most recent
*  event of each input stream, whenever a new event arrives on any stream.
*/
function combineArray (f, streams) {
  var l = streams.length
  return l === 0 ? __WEBPACK_IMPORTED_MODULE_2__source_core__["a" /* empty */]()
  : l === 1 ? __WEBPACK_IMPORTED_MODULE_1__transform__["b" /* map */](f, streams[0])
  : new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](combineSources(f, streams))
}

function combineSources (f, streams) {
  return new Combine(f, map(getSource, streams))
}

function getSource (stream) {
  return stream.source
}

function Combine (f, sources) {
  this.f = f
  this.sources = sources
}

Combine.prototype.run = function (sink, scheduler) {
  var l = this.sources.length
  var disposables = new Array(l)
  var sinks = new Array(l)

  var mergeSink = new CombineSink(disposables, sinks, sink, this.f)

  for (var indexSink, i = 0; i < l; ++i) {
    indexSink = sinks[i] = new __WEBPACK_IMPORTED_MODULE_4__sink_IndexSink__["a" /* default */](i, mergeSink)
    disposables[i] = this.sources[i].run(indexSink, scheduler)
  }

  return __WEBPACK_IMPORTED_MODULE_5__disposable_dispose__["a" /* all */](disposables)
}

function CombineSink (disposables, sinks, sink, f) {
  this.sink = sink
  this.disposables = disposables
  this.sinks = sinks
  this.f = f

  var l = sinks.length
  this.awaiting = l
  this.values = new Array(l)
  this.hasValue = new Array(l)
  for (var i = 0; i < l; ++i) {
    this.hasValue[i] = false
  }

  this.activeCount = sinks.length
}

CombineSink.prototype.error = __WEBPACK_IMPORTED_MODULE_3__sink_Pipe__["a" /* default */].prototype.error

CombineSink.prototype.event = function (t, indexedValue) {
  var i = indexedValue.index
  var awaiting = this._updateReady(i)

  this.values[i] = indexedValue.value
  if (awaiting === 0) {
    this.sink.event(t, Object(__WEBPACK_IMPORTED_MODULE_7__invoke__["a" /* default */])(this.f, this.values))
  }
}

CombineSink.prototype._updateReady = function (index) {
  if (this.awaiting > 0) {
    if (!this.hasValue[index]) {
      this.hasValue[index] = true
      this.awaiting -= 1
    }
  }
  return this.awaiting
}

CombineSink.prototype.end = function (t, indexedValue) {
  __WEBPACK_IMPORTED_MODULE_5__disposable_dispose__["f" /* tryDispose */](t, this.disposables[indexedValue.index], this.sink)
  if (--this.activeCount === 0) {
    this.sink.end(t, indexedValue.value)
  }
}


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = flatMap;
/* harmony export (immutable) */ __webpack_exports__["b"] = join;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mergeConcurrently__ = __webpack_require__(14);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */



/**
 * Map each value in the stream to a new stream, and merge it into the
 * returned outer stream. Event arrival times are preserved.
 * @param {function(x:*):Stream} f chaining function, must return a Stream
 * @param {Stream} stream
 * @returns {Stream} new stream containing all events from each stream returned by f
 */
function flatMap (f, stream) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__mergeConcurrently__["b" /* mergeMapConcurrently */])(f, Infinity, stream)
}

/**
 * Monadic join. Flatten a Stream<Stream<X>> to Stream<X> by merging inner
 * streams to the outer. Event arrival times are preserved.
 * @param {Stream<Stream<X>>} stream stream of streams
 * @returns {Stream<X>} new stream containing all events of all inner streams
 */
function join (stream) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__mergeConcurrently__["a" /* mergeConcurrently */])(Infinity, stream)
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var snabbdom = __webpack_require__(15);
var counter_1 = __webpack_require__(29);
var snabClass = __webpack_require__(83);
var snabELs = __webpack_require__(84);
var snabAttrs = __webpack_require__(85);
var snabProps = __webpack_require__(86);
var h = snabbdom.h;
var patch = snabbdom.init([
    snabClass.default,
    snabELs.default,
    snabAttrs.default,
    snabProps.default,
]);
var root = document.querySelector('#app');
function pairwise(prev, current) {
    return { seed: current, value: [prev, current] };
}
var view$ = counter_1.default;
view$
    .loop(pairwise, document.querySelector('#main'))
    .observe(function (_a) {
    var a = _a[0], b = _a[1];
    return patch(a, b);
});


/***/ }),
/* 27 */
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
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return thunk; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__h__ = __webpack_require__(18);

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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var snabbdom_1 = __webpack_require__(15);
var elements_1 = __webpack_require__(30);
var component_1 = __webpack_require__(31);
var init = (function (init) { return init; });
var model = (function (state, actions) {
    // const dec: Stream<number> = actions.decrement.constant(-1);
    // const inc: Stream<number> = actions.increment.constant(1);
    // const delta = combine((a, b) => a + b, inc, dec);
    return { num: 0 };
});
var view = (function (state, actions) {
    return elements_1.div([
        snabbdom_1.h('button', { on: { click: actions.decrement } }, '-'),
        snabbdom_1.h('span', "69"),
        snabbdom_1.h('button', { on: { click: actions.increment } }, '-'),
    ]);
});
exports.default = component_1.makeComponent(init, view, {});


/***/ }),
/* 30 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected token (11:108)\nYou may need an appropriate loader to handle this file type.\n| exports.div = hh('div');\n| exports.span = hh('span');\n| exports.button = component_1.makeComponent({}, hh('button')({ on: { click: most_1.fromEvent } }), { click:  });\n| ");

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var most_1 = __webpack_require__(32);
var makeComponent = (function (init, view, actionStreams) {
    return most_1.just(view(init, {}));
});
exports.makeComponent = makeComponent;


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__most_prelude__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__source_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__source_from__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__source_periodic__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_symbol_observable__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_symbol_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_symbol_observable__);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Stream", function() { return __WEBPACK_IMPORTED_MODULE_0__Stream__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "of", function() { return __WEBPACK_IMPORTED_MODULE_2__source_core__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "just", function() { return __WEBPACK_IMPORTED_MODULE_2__source_core__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "empty", function() { return __WEBPACK_IMPORTED_MODULE_2__source_core__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "never", function() { return __WEBPACK_IMPORTED_MODULE_2__source_core__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "from", function() { return __WEBPACK_IMPORTED_MODULE_3__source_from__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "periodic", function() { return __WEBPACK_IMPORTED_MODULE_4__source_periodic__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__observable_subscribe__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__combinator_thru__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__source_fromEvent__ = __webpack_require__(52);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "fromEvent", function() { return __WEBPACK_IMPORTED_MODULE_8__source_fromEvent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__combinator_observe__ = __webpack_require__(56);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "observe", function() { return __WEBPACK_IMPORTED_MODULE_9__combinator_observe__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return __WEBPACK_IMPORTED_MODULE_9__combinator_observe__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "drain", function() { return __WEBPACK_IMPORTED_MODULE_9__combinator_observe__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__combinator_loop__ = __webpack_require__(58);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "loop", function() { return __WEBPACK_IMPORTED_MODULE_10__combinator_loop__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__combinator_accumulate__ = __webpack_require__(59);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "scan", function() { return __WEBPACK_IMPORTED_MODULE_11__combinator_accumulate__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "reduce", function() { return __WEBPACK_IMPORTED_MODULE_11__combinator_accumulate__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__source_unfold__ = __webpack_require__(60);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "unfold", function() { return __WEBPACK_IMPORTED_MODULE_12__source_unfold__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__source_iterate__ = __webpack_require__(61);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "iterate", function() { return __WEBPACK_IMPORTED_MODULE_13__source_iterate__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__source_generate__ = __webpack_require__(62);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "generate", function() { return __WEBPACK_IMPORTED_MODULE_14__source_generate__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__combinator_build__ = __webpack_require__(63);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "concat", function() { return __WEBPACK_IMPORTED_MODULE_15__combinator_build__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "startWith", function() { return __WEBPACK_IMPORTED_MODULE_15__combinator_build__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__combinator_transform__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__combinator_applicative__ = __webpack_require__(64);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return __WEBPACK_IMPORTED_MODULE_16__combinator_transform__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "constant", function() { return __WEBPACK_IMPORTED_MODULE_16__combinator_transform__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "tap", function() { return __WEBPACK_IMPORTED_MODULE_16__combinator_transform__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ap", function() { return __WEBPACK_IMPORTED_MODULE_17__combinator_applicative__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__combinator_transduce__ = __webpack_require__(65);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "transduce", function() { return __WEBPACK_IMPORTED_MODULE_18__combinator_transduce__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__combinator_flatMap__ = __webpack_require__(25);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "flatMap", function() { return __WEBPACK_IMPORTED_MODULE_19__combinator_flatMap__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "chain", function() { return __WEBPACK_IMPORTED_MODULE_19__combinator_flatMap__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "join", function() { return __WEBPACK_IMPORTED_MODULE_19__combinator_flatMap__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__combinator_continueWith__ = __webpack_require__(23);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "continueWith", function() { return __WEBPACK_IMPORTED_MODULE_20__combinator_continueWith__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "flatMapEnd", function() { return __WEBPACK_IMPORTED_MODULE_20__combinator_continueWith__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__combinator_concatMap__ = __webpack_require__(67);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "concatMap", function() { return __WEBPACK_IMPORTED_MODULE_21__combinator_concatMap__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__combinator_mergeConcurrently__ = __webpack_require__(14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "mergeConcurrently", function() { return __WEBPACK_IMPORTED_MODULE_22__combinator_mergeConcurrently__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__combinator_merge__ = __webpack_require__(68);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return __WEBPACK_IMPORTED_MODULE_23__combinator_merge__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "mergeArray", function() { return __WEBPACK_IMPORTED_MODULE_23__combinator_merge__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__combinator_combine__ = __webpack_require__(24);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "combine", function() { return __WEBPACK_IMPORTED_MODULE_24__combinator_combine__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "combineArray", function() { return __WEBPACK_IMPORTED_MODULE_24__combinator_combine__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__combinator_sample__ = __webpack_require__(69);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "sample", function() { return __WEBPACK_IMPORTED_MODULE_25__combinator_sample__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "sampleArray", function() { return __WEBPACK_IMPORTED_MODULE_25__combinator_sample__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "sampleWith", function() { return __WEBPACK_IMPORTED_MODULE_25__combinator_sample__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__combinator_zip__ = __webpack_require__(70);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "zip", function() { return __WEBPACK_IMPORTED_MODULE_26__combinator_zip__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "zipArray", function() { return __WEBPACK_IMPORTED_MODULE_26__combinator_zip__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__combinator_switch__ = __webpack_require__(72);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "switchLatest", function() { return __WEBPACK_IMPORTED_MODULE_27__combinator_switch__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "switch", function() { return __WEBPACK_IMPORTED_MODULE_27__combinator_switch__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__combinator_filter__ = __webpack_require__(73);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "filter", function() { return __WEBPACK_IMPORTED_MODULE_28__combinator_filter__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "skipRepeats", function() { return __WEBPACK_IMPORTED_MODULE_28__combinator_filter__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "distinct", function() { return __WEBPACK_IMPORTED_MODULE_28__combinator_filter__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "skipRepeatsWith", function() { return __WEBPACK_IMPORTED_MODULE_28__combinator_filter__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "distinctBy", function() { return __WEBPACK_IMPORTED_MODULE_28__combinator_filter__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__combinator_slice__ = __webpack_require__(74);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "take", function() { return __WEBPACK_IMPORTED_MODULE_29__combinator_slice__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "skip", function() { return __WEBPACK_IMPORTED_MODULE_29__combinator_slice__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "slice", function() { return __WEBPACK_IMPORTED_MODULE_29__combinator_slice__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "takeWhile", function() { return __WEBPACK_IMPORTED_MODULE_29__combinator_slice__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "skipWhile", function() { return __WEBPACK_IMPORTED_MODULE_29__combinator_slice__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "skipAfter", function() { return __WEBPACK_IMPORTED_MODULE_29__combinator_slice__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__combinator_timeslice__ = __webpack_require__(75);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "takeUntil", function() { return __WEBPACK_IMPORTED_MODULE_30__combinator_timeslice__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "until", function() { return __WEBPACK_IMPORTED_MODULE_30__combinator_timeslice__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "skipUntil", function() { return __WEBPACK_IMPORTED_MODULE_30__combinator_timeslice__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "since", function() { return __WEBPACK_IMPORTED_MODULE_30__combinator_timeslice__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "during", function() { return __WEBPACK_IMPORTED_MODULE_30__combinator_timeslice__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__combinator_delay__ = __webpack_require__(76);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "delay", function() { return __WEBPACK_IMPORTED_MODULE_31__combinator_delay__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__combinator_timestamp__ = __webpack_require__(77);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "timestamp", function() { return __WEBPACK_IMPORTED_MODULE_32__combinator_timestamp__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__combinator_limit__ = __webpack_require__(78);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "throttle", function() { return __WEBPACK_IMPORTED_MODULE_33__combinator_limit__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return __WEBPACK_IMPORTED_MODULE_33__combinator_limit__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__combinator_promises__ = __webpack_require__(79);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "fromPromise", function() { return __WEBPACK_IMPORTED_MODULE_34__combinator_promises__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "awaitPromises", function() { return __WEBPACK_IMPORTED_MODULE_34__combinator_promises__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "await", function() { return __WEBPACK_IMPORTED_MODULE_34__combinator_promises__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__combinator_errors__ = __webpack_require__(80);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "recoverWith", function() { return __WEBPACK_IMPORTED_MODULE_35__combinator_errors__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "flatMapError", function() { return __WEBPACK_IMPORTED_MODULE_35__combinator_errors__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "throwError", function() { return __WEBPACK_IMPORTED_MODULE_35__combinator_errors__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__most_multicast__ = __webpack_require__(82);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "multicast", function() { return __WEBPACK_IMPORTED_MODULE_36__most_multicast__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__scheduler_defaultScheduler__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "defaultScheduler", function() { return __WEBPACK_IMPORTED_MODULE_37__scheduler_defaultScheduler__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__scheduler_PropagateTask__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PropagateTask", function() { return __WEBPACK_IMPORTED_MODULE_38__scheduler_PropagateTask__["a"]; });
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */








/**
 * Core stream type
 * @type {Stream}
 */


// Add of and empty to constructor for fantasy-land compat
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].of = __WEBPACK_IMPORTED_MODULE_2__source_core__["c" /* of */]
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].empty = __WEBPACK_IMPORTED_MODULE_2__source_core__["a" /* empty */]
// Add from to constructor for ES Observable compat
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].from = __WEBPACK_IMPORTED_MODULE_3__source_from__["a" /* from */]


// -----------------------------------------------------------------------
// Draft ES Observable proposal interop
// https://github.com/zenparsing/es-observable



__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.subscribe = function (subscriber) {
  return Object(__WEBPACK_IMPORTED_MODULE_6__observable_subscribe__["a" /* subscribe */])(subscriber, this)
}

__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype[__WEBPACK_IMPORTED_MODULE_5_symbol_observable___default.a] = function () {
  return this
}

// -----------------------------------------------------------------------
// Fluent adapter



/**
 * Adapt a functional stream transform to fluent style.
 * It applies f to the this stream object
 * @param  {function(s: Stream): Stream} f function that
 * receives the stream itself and must return a new stream
 * @return {Stream}
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.thru = function (f) {
  return Object(__WEBPACK_IMPORTED_MODULE_7__combinator_thru__["a" /* thru */])(f, this)
}

// -----------------------------------------------------------------------
// Adapting other sources

/**
 * Create a stream of events from the supplied EventTarget or EventEmitter
 * @param {String} event event name
 * @param {EventTarget|EventEmitter} source EventTarget or EventEmitter. The source
 *  must support either addEventListener/removeEventListener (w3c EventTarget:
 *  http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget),
 *  or addListener/removeListener (node EventEmitter: http://nodejs.org/api/events.html)
 * @returns {Stream} stream of events of the specified type from the source
 */


// -----------------------------------------------------------------------
// Observing





/**
 * Process all the events in the stream
 * @returns {Promise} promise that fulfills when the stream ends, or rejects
 *  if the stream fails with an unhandled error.
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.observe = __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.forEach = function (f) {
  return Object(__WEBPACK_IMPORTED_MODULE_9__combinator_observe__["b" /* observe */])(f, this)
}

/**
 * Consume all events in the stream, without providing a function to process each.
 * This causes a stream to become active and begin emitting events, and is useful
 * in cases where all processing has been setup upstream via other combinators, and
 * there is no need to process the terminal events.
 * @returns {Promise} promise that fulfills when the stream ends, or rejects
 *  if the stream fails with an unhandled error.
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.drain = function () {
  return Object(__WEBPACK_IMPORTED_MODULE_9__combinator_observe__["a" /* drain */])(this)
}

// -------------------------------------------------------





/**
 * Generalized feedback loop. Call a stepper function for each event. The stepper
 * will be called with 2 params: the current seed and the an event value.  It must
 * return a new { seed, value } pair. The `seed` will be fed back into the next
 * invocation of stepper, and the `value` will be propagated as the event value.
 * @param {function(seed:*, value:*):{seed:*, value:*}} stepper loop step function
 * @param {*} seed initial seed value passed to first stepper call
 * @returns {Stream} new stream whose values are the `value` field of the objects
 * returned by the stepper
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.loop = function (stepper, seed) {
  return Object(__WEBPACK_IMPORTED_MODULE_10__combinator_loop__["a" /* loop */])(stepper, seed, this)
}

// -------------------------------------------------------





/**
 * Create a stream containing successive reduce results of applying f to
 * the previous reduce result and the current stream item.
 * @param {function(result:*, x:*):*} f reducer function
 * @param {*} initial initial value
 * @returns {Stream} new stream containing successive reduce results
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.scan = function (f, initial) {
  return Object(__WEBPACK_IMPORTED_MODULE_11__combinator_accumulate__["b" /* scan */])(f, initial, this)
}

/**
 * Reduce the stream to produce a single result.  Note that reducing an infinite
 * stream will return a Promise that never fulfills, but that may reject if an error
 * occurs.
 * @param {function(result:*, x:*):*} f reducer function
 * @param {*} initial optional initial value
 * @returns {Promise} promise for the file result of the reduce
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.reduce = function (f, initial) {
  return Object(__WEBPACK_IMPORTED_MODULE_11__combinator_accumulate__["a" /* reduce */])(f, initial, this)
}

// -----------------------------------------------------------------------
// Building and extending








/**
 * @param {Stream} tail
 * @returns {Stream} new stream containing all items in this followed by
 *  all items in tail
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.concat = function (tail) {
  return Object(__WEBPACK_IMPORTED_MODULE_15__combinator_build__["a" /* concat */])(this, tail)
}

/**
 * @param {*} x value to prepend
 * @returns {Stream} a new stream with x prepended
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.startWith = function (x) {
  return Object(__WEBPACK_IMPORTED_MODULE_15__combinator_build__["b" /* cons */])(x, this)
}

// -----------------------------------------------------------------------
// Transforming






/**
 * Transform each value in the stream by applying f to each
 * @param {function(*):*} f mapping function
 * @returns {Stream} stream containing items transformed by f
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.map = function (f) {
  return Object(__WEBPACK_IMPORTED_MODULE_16__combinator_transform__["b" /* map */])(f, this)
}

/**
 * Assume this stream contains functions, and apply each function to each item
 * in the provided stream.  This generates, in effect, a cross product.
 * @param {Stream} xs stream of items to which
 * @returns {Stream} stream containing the cross product of items
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.ap = function (xs) {
  return Object(__WEBPACK_IMPORTED_MODULE_17__combinator_applicative__["a" /* ap */])(this, xs)
}

/**
 * Replace each value in the stream with x
 * @param {*} x
 * @returns {Stream} stream containing items replaced with x
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.constant = function (x) {
  return Object(__WEBPACK_IMPORTED_MODULE_16__combinator_transform__["a" /* constant */])(x, this)
}

/**
 * Perform a side effect for each item in the stream
 * @param {function(x:*):*} f side effect to execute for each item. The
 *  return value will be discarded.
 * @returns {Stream} new stream containing the same items as this stream
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.tap = function (f) {
  return Object(__WEBPACK_IMPORTED_MODULE_16__combinator_transform__["c" /* tap */])(f, this)
}

// -----------------------------------------------------------------------
// Transducer support





/**
 * Transform this stream by passing its events through a transducer.
 * @param  {function} transducer transducer function
 * @return {Stream} stream of events transformed by the transducer
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.transduce = function (transducer) {
  return Object(__WEBPACK_IMPORTED_MODULE_18__combinator_transduce__["a" /* transduce */])(transducer, this)
}

// -----------------------------------------------------------------------
// FlatMapping



// @deprecated flatMap, use chain instead


/**
 * Map each value in the stream to a new stream, and merge it into the
 * returned outer stream. Event arrival times are preserved.
 * @param {function(x:*):Stream} f chaining function, must return a Stream
 * @returns {Stream} new stream containing all events from each stream returned by f
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.chain = function (f) {
  return Object(__WEBPACK_IMPORTED_MODULE_19__combinator_flatMap__["a" /* flatMap */])(f, this)
}

// @deprecated use chain instead
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.flatMap = __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.chain

  /**
 * Monadic join. Flatten a Stream<Stream<X>> to Stream<X> by merging inner
 * streams to the outer. Event arrival times are preserved.
 * @returns {Stream<X>} new stream containing all events of all inner streams
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.join = function () {
  return Object(__WEBPACK_IMPORTED_MODULE_19__combinator_flatMap__["b" /* join */])(this)
}



// @deprecated flatMapEnd, use continueWith instead


/**
 * Map the end event to a new stream, and begin emitting its values.
 * @param {function(x:*):Stream} f function that receives the end event value,
 * and *must* return a new Stream to continue with.
 * @returns {Stream} new stream that emits all events from the original stream,
 * followed by all events from the stream returned by f.
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.continueWith = function (f) {
  return Object(__WEBPACK_IMPORTED_MODULE_20__combinator_continueWith__["a" /* continueWith */])(f, this)
}

// @deprecated use continueWith instead
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.flatMapEnd = __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.continueWith





__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.concatMap = function (f) {
  return Object(__WEBPACK_IMPORTED_MODULE_21__combinator_concatMap__["a" /* concatMap */])(f, this)
}

// -----------------------------------------------------------------------
// Concurrent merging





/**
 * Flatten a Stream<Stream<X>> to Stream<X> by merging inner
 * streams to the outer, limiting the number of inner streams that may
 * be active concurrently.
 * @param {number} concurrency at most this many inner streams will be
 *  allowed to be active concurrently.
 * @return {Stream<X>} new stream containing all events of all inner
 *  streams, with limited concurrency.
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.mergeConcurrently = function (concurrency) {
  return Object(__WEBPACK_IMPORTED_MODULE_22__combinator_mergeConcurrently__["a" /* mergeConcurrently */])(concurrency, this)
}

// -----------------------------------------------------------------------
// Merging





/**
 * Merge this stream and all the provided streams
 * @returns {Stream} stream containing items from this stream and s in time
 * order.  If two events are simultaneous they will be merged in
 * arbitrary order.
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.merge = function (/* ...streams*/) {
  return Object(__WEBPACK_IMPORTED_MODULE_23__combinator_merge__["b" /* mergeArray */])(__WEBPACK_IMPORTED_MODULE_1__most_prelude__["d" /* cons */](this, arguments))
}

// -----------------------------------------------------------------------
// Combining





/**
 * Combine latest events from all input streams
 * @param {function(...events):*} f function to combine most recent events
 * @returns {Stream} stream containing the result of applying f to the most recent
 *  event of each input stream, whenever a new event arrives on any stream.
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.combine = function (f /*, ...streams*/) {
  return Object(__WEBPACK_IMPORTED_MODULE_24__combinator_combine__["b" /* combineArray */])(f, __WEBPACK_IMPORTED_MODULE_1__most_prelude__["n" /* replace */](this, 0, arguments))
}

// -----------------------------------------------------------------------
// Sampling





/**
 * When an event arrives on sampler, emit the latest event value from stream.
 * @param {Stream} sampler stream of events at whose arrival time
 *  signal's latest value will be propagated
 * @returns {Stream} sampled stream of values
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.sampleWith = function (sampler) {
  return Object(__WEBPACK_IMPORTED_MODULE_25__combinator_sample__["c" /* sampleWith */])(sampler, this)
}

/**
 * When an event arrives on this stream, emit the result of calling f with the latest
 * values of all streams being sampled
 * @param {function(...values):*} f function to apply to each set of sampled values
 * @returns {Stream} stream of sampled and transformed values
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.sample = function (f /* ...streams */) {
  return Object(__WEBPACK_IMPORTED_MODULE_25__combinator_sample__["b" /* sampleArray */])(f, this, __WEBPACK_IMPORTED_MODULE_1__most_prelude__["o" /* tail */](arguments))
}

// -----------------------------------------------------------------------
// Zipping





/**
 * Pair-wise combine items with those in s. Given 2 streams:
 * [1,2,3] zipWith f [4,5,6] -> [f(1,4),f(2,5),f(3,6)]
 * Note: zip causes fast streams to buffer and wait for slow streams.
 * @param {function(a:Stream, b:Stream, ...):*} f function to combine items
 * @returns {Stream} new stream containing pairs
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.zip = function (f /*, ...streams*/) {
  return Object(__WEBPACK_IMPORTED_MODULE_26__combinator_zip__["b" /* zipArray */])(f, __WEBPACK_IMPORTED_MODULE_1__most_prelude__["n" /* replace */](this, 0, arguments))
}

// -----------------------------------------------------------------------
// Switching



// @deprecated switch, use switchLatest instead


/**
 * Given a stream of streams, return a new stream that adopts the behavior
 * of the most recent inner stream.
 * @returns {Stream} switching stream
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.switchLatest = function () {
  return Object(__WEBPACK_IMPORTED_MODULE_27__combinator_switch__["a" /* switchLatest */])(this)
}

// @deprecated use switchLatest instead
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.switch = __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.switchLatest

// -----------------------------------------------------------------------
// Filtering



// @deprecated distinct, use skipRepeats instead
// @deprecated distinctBy, use skipRepeatsWith instead


/**
 * Retain only items matching a predicate
 * stream:                           -12345678-
 * filter(x => x % 2 === 0, stream): --2-4-6-8-
 * @param {function(x:*):boolean} p filtering predicate called for each item
 * @returns {Stream} stream containing only items for which predicate returns truthy
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.filter = function (p) {
  return Object(__WEBPACK_IMPORTED_MODULE_28__combinator_filter__["a" /* filter */])(p, this)
}

/**
 * Skip repeated events, using === to compare items
 * stream:           -abbcd-
 * distinct(stream): -ab-cd-
 * @returns {Stream} stream with no repeated events
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.skipRepeats = function () {
  return Object(__WEBPACK_IMPORTED_MODULE_28__combinator_filter__["b" /* skipRepeats */])(this)
}

/**
 * Skip repeated events, using supplied equals function to compare items
 * @param {function(a:*, b:*):boolean} equals function to compare items
 * @returns {Stream} stream with no repeated events
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.skipRepeatsWith = function (equals) {
  return Object(__WEBPACK_IMPORTED_MODULE_28__combinator_filter__["c" /* skipRepeatsWith */])(equals, this)
}

// -----------------------------------------------------------------------
// Slicing





/**
 * stream:          -abcd-
 * take(2, stream): -ab|
 * @param {Number} n take up to this many events
 * @returns {Stream} stream containing at most the first n items from this stream
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.take = function (n) {
  return Object(__WEBPACK_IMPORTED_MODULE_29__combinator_slice__["e" /* take */])(n, this)
}

/**
 * stream:          -abcd->
 * skip(2, stream): ---cd->
 * @param {Number} n skip this many events
 * @returns {Stream} stream not containing the first n events
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.skip = function (n) {
  return Object(__WEBPACK_IMPORTED_MODULE_29__combinator_slice__["a" /* skip */])(n, this)
}

/**
 * Slice a stream by event index. Equivalent to, but more efficient than
 * stream.take(end).skip(start);
 * NOTE: Negative start and end are not supported
 * @param {Number} start skip all events before the start index
 * @param {Number} end allow all events from the start index to the end index
 * @returns {Stream} stream containing items where start <= index < end
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.slice = function (start, end) {
  return Object(__WEBPACK_IMPORTED_MODULE_29__combinator_slice__["d" /* slice */])(start, end, this)
}

/**
 * stream:                        -123451234->
 * takeWhile(x => x < 5, stream): -1234|
 * @param {function(x:*):boolean} p predicate
 * @returns {Stream} stream containing items up to, but not including, the
 * first item for which p returns falsy.
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.takeWhile = function (p) {
  return Object(__WEBPACK_IMPORTED_MODULE_29__combinator_slice__["f" /* takeWhile */])(p, this)
}

/**
 * stream:                        -123451234->
 * skipWhile(x => x < 5, stream): -----51234->
 * @param {function(x:*):boolean} p predicate
 * @returns {Stream} stream containing items following *and including* the
 * first item for which p returns falsy.
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.skipWhile = function (p) {
  return Object(__WEBPACK_IMPORTED_MODULE_29__combinator_slice__["c" /* skipWhile */])(p, this)
}

/**
 * stream:                         -123456789->
 * skipAfter(x => x === 5, stream):-12345|
 * @param {function(x:*):boolean} p predicate
 * @returns {Stream} stream containing items up to, *and including*, the
 * first item for which p returns truthy.
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.skipAfter = function (p) {
  return Object(__WEBPACK_IMPORTED_MODULE_29__combinator_slice__["b" /* skipAfter */])(p, this)
}

// -----------------------------------------------------------------------
// Time slicing



// @deprecated takeUntil, use until instead
// @deprecated skipUntil, use since instead


/**
 * stream:                    -a-b-c-d-e-f-g->
 * signal:                    -------x
 * takeUntil(signal, stream): -a-b-c-|
 * @param {Stream} signal retain only events in stream before the first
 * event in signal
 * @returns {Stream} new stream containing only events that occur before
 * the first event in signal.
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.until = function (signal) {
  return Object(__WEBPACK_IMPORTED_MODULE_30__combinator_timeslice__["c" /* takeUntil */])(signal, this)
}

// @deprecated use until instead
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.takeUntil = __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.until

  /**
 * stream:                    -a-b-c-d-e-f-g->
 * signal:                    -------x
 * takeUntil(signal, stream): -------d-e-f-g->
 * @param {Stream} signal retain only events in stream at or after the first
 * event in signal
 * @returns {Stream} new stream containing only events that occur after
 * the first event in signal.
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.since = function (signal) {
  return Object(__WEBPACK_IMPORTED_MODULE_30__combinator_timeslice__["b" /* skipUntil */])(signal, this)
}

// @deprecated use since instead
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.skipUntil = __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.since

  /**
 * stream:                    -a-b-c-d-e-f-g->
 * timeWindow:                -----s
 * s:                               -----t
 * stream.during(timeWindow): -----c-d-e-|
 * @param {Stream<Stream>} timeWindow a stream whose first event (s) represents
 *  the window start time.  That event (s) is itself a stream whose first event (t)
 *  represents the window end time
 * @returns {Stream} new stream containing only events within the provided timespan
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.during = function (timeWindow) {
  return Object(__WEBPACK_IMPORTED_MODULE_30__combinator_timeslice__["a" /* during */])(timeWindow, this)
}

// -----------------------------------------------------------------------
// Delaying





/**
 * @param {Number} delayTime milliseconds to delay each item
 * @returns {Stream} new stream containing the same items, but delayed by ms
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.delay = function (delayTime) {
  return Object(__WEBPACK_IMPORTED_MODULE_31__combinator_delay__["a" /* delay */])(delayTime, this)
}

// -----------------------------------------------------------------------
// Getting event timestamp




/**
 * Expose event timestamps into the stream. Turns a Stream<X> into
 * Stream<{time:t, value:X}>
 * @returns {Stream<{time:number, value:*}>}
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.timestamp = function () {
  return Object(__WEBPACK_IMPORTED_MODULE_32__combinator_timestamp__["a" /* timestamp */])(this)
}

// -----------------------------------------------------------------------
// Rate limiting





/**
 * Limit the rate of events
 * stream:              abcd----abcd----
 * throttle(2, stream): a-c-----a-c-----
 * @param {Number} period time to suppress events
 * @returns {Stream} new stream that skips events for throttle period
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.throttle = function (period) {
  return Object(__WEBPACK_IMPORTED_MODULE_33__combinator_limit__["b" /* throttle */])(period, this)
}

/**
 * Wait for a burst of events to subside and emit only the last event in the burst
 * stream:              abcd----abcd----
 * debounce(2, stream): -----d-------d--
 * @param {Number} period events occuring more frequently than this
 *  on the provided scheduler will be suppressed
 * @returns {Stream} new debounced stream
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.debounce = function (period) {
  return Object(__WEBPACK_IMPORTED_MODULE_33__combinator_limit__["a" /* debounce */])(period, this)
}

// -----------------------------------------------------------------------
// Awaiting Promises



// @deprecated await, use awaitPromises instead


/**
 * Await promises, turning a Stream<Promise<X>> into Stream<X>.  Preserves
 * event order, but timeshifts events based on promise resolution time.
 * @returns {Stream<X>} stream containing non-promise values
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.awaitPromises = function () {
  return Object(__WEBPACK_IMPORTED_MODULE_34__combinator_promises__["a" /* awaitPromises */])(this)
}

// @deprecated use awaitPromises instead
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.await = __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.awaitPromises

// -----------------------------------------------------------------------
// Error handling



// @deprecated flatMapError, use recoverWith instead


/**
 * If this stream encounters an error, recover and continue with items from stream
 * returned by f.
 * stream:                  -a-b-c-X-
 * f(X):                           d-e-f-g-
 * flatMapError(f, stream): -a-b-c-d-e-f-g-
 * @param {function(error:*):Stream} f function which returns a new stream
 * @returns {Stream} new stream which will recover from an error by calling f
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.recoverWith = function (f) {
  return Object(__WEBPACK_IMPORTED_MODULE_35__combinator_errors__["a" /* flatMapError */])(f, this)
}

// @deprecated use recoverWith instead
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.flatMapError = __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.recoverWith

// -----------------------------------------------------------------------
// Multicasting





/**
 * Transform the stream into multicast stream.  That means that many subscribers
 * to the stream will not cause multiple invocations of the internal machinery.
 * @returns {Stream} new stream which will multicast events to all observers.
 */
__WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */].prototype.multicast = function () {
  return Object(__WEBPACK_IMPORTED_MODULE_36__most_multicast__["a" /* default */])(this)
}

// export the instance of the defaultScheduler for third-party libraries




// export an implementation of Task used internally for third-party libraries





/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Disposable;
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

/**
 * Create a new Disposable which will dispose its underlying resource.
 * @param {function} dispose function
 * @param {*?} data any data to be passed to disposer function
 * @constructor
 */
function Disposable (dispose, data) {
  this._dispose = dispose
  this._data = data
}

Disposable.prototype.dispose = function () {
  return this._dispose(this._data)
}


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = SettableDisposable;
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

function SettableDisposable () {
  this.disposable = void 0
  this.disposed = false
  this._resolve = void 0

  var self = this
  this.result = new Promise(function (resolve) {
    self._resolve = resolve
  })
}

SettableDisposable.prototype.setDisposable = function (disposable) {
  if (this.disposable !== void 0) {
    throw new Error('setDisposable called more than once')
  }

  this.disposable = disposable

  if (this.disposed) {
    this._resolve(disposable.dispose())
  }
}

SettableDisposable.prototype.dispose = function () {
  if (this.disposed) {
    return this.result
  }

  this.disposed = true

  if (this.disposable !== void 0) {
    this.result = this.disposable.dispose()
  }

  return this.result
}


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isPromise;
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

function isPromise (p) {
  return p !== null && typeof p === 'object' && typeof p.then === 'function'
}


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = from;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fromArray__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__iterable__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__fromIterable__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__observable_getObservable__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__observable_fromObservable__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__most_prelude__ = __webpack_require__(3);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */









function from (a) { // eslint-disable-line complexity
  if (a instanceof __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */]) {
    return a
  }

  var observable = Object(__WEBPACK_IMPORTED_MODULE_4__observable_getObservable__["a" /* default */])(a)
  if (observable != null) {
    return Object(__WEBPACK_IMPORTED_MODULE_5__observable_fromObservable__["a" /* fromObservable */])(observable)
  }

  if (Array.isArray(a) || Object(__WEBPACK_IMPORTED_MODULE_6__most_prelude__["i" /* isArrayLike */])(a)) {
    return Object(__WEBPACK_IMPORTED_MODULE_1__fromArray__["a" /* fromArray */])(a)
  }

  if (Object(__WEBPACK_IMPORTED_MODULE_2__iterable__["b" /* isIterable */])(a)) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__fromIterable__["a" /* fromIterable */])(a)
  }

  throw new TypeError('from(x) must be observable, iterable, or array-like: ' + a)
}


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fromArray;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scheduler_PropagateTask__ = __webpack_require__(4);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */




function fromArray (a) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new ArraySource(a))
}

function ArraySource (a) {
  this.array = a
}

ArraySource.prototype.run = function (sink, scheduler) {
  return scheduler.asap(new __WEBPACK_IMPORTED_MODULE_1__scheduler_PropagateTask__["a" /* default */](runProducer, this.array, sink))
}

function runProducer (t, array, sink) {
  for (var i = 0, l = array.length; i < l && this.active; ++i) {
    sink.event(t, array[i])
  }

  this.active && sink.end(t)
}


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fromIterable;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__iterable__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scheduler_PropagateTask__ = __webpack_require__(4);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */





function fromIterable (iterable) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new IterableSource(iterable))
}

function IterableSource (iterable) {
  this.iterable = iterable
}

IterableSource.prototype.run = function (sink, scheduler) {
  return scheduler.asap(new __WEBPACK_IMPORTED_MODULE_2__scheduler_PropagateTask__["a" /* default */](runProducer, Object(__WEBPACK_IMPORTED_MODULE_1__iterable__["a" /* getIterator */])(this.iterable), sink))
}

function runProducer (t, iterator, sink) {
  var r = iterator.next()

  while (!r.done && this.active) {
    sink.event(t, r.value)
    r = iterator.next()
  }

  sink.end(t, r.value)
}


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getObservable;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_symbol_observable__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_symbol_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_symbol_observable__);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */



function getObservable (o) { // eslint-disable-line complexity
  var obs = null
  if (o) {
  // Access foreign method only once
    var method = o[__WEBPACK_IMPORTED_MODULE_0_symbol_observable___default.a]
    if (typeof method === 'function') {
      obs = method.call(o)
      if (!(obs && typeof obs.subscribe === 'function')) {
        throw new TypeError('invalid observable ' + obs)
      }
    }
  }

  return obs
}


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = __webpack_require__(43);

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(41), __webpack_require__(42)(module)))

/***/ }),
/* 41 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fromObservable;
/* unused harmony export ObservableSource */
/* unused harmony export SubscriberSink */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__disposable_dispose__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__source_tryEvent__ = __webpack_require__(6);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */





function fromObservable (observable) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new ObservableSource(observable))
}

function ObservableSource (observable) {
  this.observable = observable
}

ObservableSource.prototype.run = function (sink, scheduler) {
  var sub = this.observable.subscribe(new SubscriberSink(sink, scheduler))
  if (typeof sub === 'function') {
    return __WEBPACK_IMPORTED_MODULE_1__disposable_dispose__["b" /* create */](sub)
  } else if (sub && typeof sub.unsubscribe === 'function') {
    return __WEBPACK_IMPORTED_MODULE_1__disposable_dispose__["b" /* create */](unsubscribe, sub)
  }

  throw new TypeError('Observable returned invalid subscription ' + String(sub))
}

function SubscriberSink (sink, scheduler) {
  this.sink = sink
  this.scheduler = scheduler
}

SubscriberSink.prototype.next = function (x) {
  Object(__WEBPACK_IMPORTED_MODULE_2__source_tryEvent__["b" /* tryEvent */])(this.scheduler.now(), x, this.sink)
}

SubscriberSink.prototype.complete = function (x) {
  Object(__WEBPACK_IMPORTED_MODULE_2__source_tryEvent__["a" /* tryEnd */])(this.scheduler.now(), x, this.sink)
}

SubscriberSink.prototype.error = function (e) {
  this.sink.error(this.scheduler.now(), e)
}

function unsubscribe (subscription) {
  return subscription.unsubscribe()
}


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = periodic;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scheduler_PropagateTask__ = __webpack_require__(4);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */




/**
 * Create a stream that emits the current time periodically
 * @param {Number} period periodicity of events in millis
 * @param {*} deprecatedValue @deprecated value to emit each period
 * @returns {Stream} new stream that emits the current time every period
 */
function periodic (period, deprecatedValue) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new Periodic(period, deprecatedValue))
}

function Periodic (period, value) {
  this.period = period
  this.value = value
}

Periodic.prototype.run = function (sink, scheduler) {
  return scheduler.periodic(this.period, __WEBPACK_IMPORTED_MODULE_1__scheduler_PropagateTask__["a" /* default */].event(this.value, sink))
}


/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = subscribe;
/* unused harmony export SubscribeObserver */
/* unused harmony export Subscription */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scheduler_defaultScheduler__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__disposable_dispose__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fatalError__ = __webpack_require__(8);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */





function subscribe (subscriber, stream) {
  if (Object(subscriber) !== subscriber) {
    throw new TypeError('subscriber must be an object')
  }

  var disposable = __WEBPACK_IMPORTED_MODULE_1__disposable_dispose__["e" /* settable */]()
  var observer = new SubscribeObserver(__WEBPACK_IMPORTED_MODULE_2__fatalError__["a" /* default */], subscriber, disposable)

  disposable.setDisposable(stream.source.run(observer, __WEBPACK_IMPORTED_MODULE_0__scheduler_defaultScheduler__["a" /* default */]))

  return new Subscription(disposable)
}

function SubscribeObserver (fatalError, subscriber, disposable) {
  this.fatalError = fatalError
  this.subscriber = subscriber
  this.disposable = disposable
}

SubscribeObserver.prototype.event = function (t, x) {
  if (!this.disposable.disposed && typeof this.subscriber.next === 'function') {
    this.subscriber.next(x)
  }
}

SubscribeObserver.prototype.end = function (t, x) {
  if (!this.disposable.disposed) {
    var s = this.subscriber
    var fatalError = this.fatalError
    Promise.resolve(this.disposable.dispose()).then(function () {
      if (typeof s.complete === 'function') {
        s.complete(x)
      }
    }).catch(function (e) {
      throwError(e, s, fatalError)
    })
  }
}

SubscribeObserver.prototype.error = function (t, e) {
  var s = this.subscriber
  var fatalError = this.fatalError
  Promise.resolve(this.disposable.dispose()).then(function () {
    throwError(e, s, fatalError)
  })
}

function Subscription (disposable) {
  this.disposable = disposable
}

Subscription.prototype.unsubscribe = function () {
  this.disposable.dispose()
}

function throwError (e1, subscriber, throwError) {
  if (typeof subscriber.error === 'function') {
    try {
      subscriber.error(e1)
    } catch (e2) {
      throwError(e2)
    }
  } else {
    throwError(e1)
  }
}


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Scheduler;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ScheduledTask__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__task__ = __webpack_require__(10);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */




function Scheduler (timer, timeline) {
  this.timer = timer
  this.timeline = timeline

  this._timer = null
  this._nextArrival = Infinity

  var self = this
  this._runReadyTasksBound = function () {
    self._runReadyTasks(self.now())
  }
}

Scheduler.prototype.now = function () {
  return this.timer.now()
}

Scheduler.prototype.asap = function (task) {
  return this.schedule(0, -1, task)
}

Scheduler.prototype.delay = function (delay, task) {
  return this.schedule(delay, -1, task)
}

Scheduler.prototype.periodic = function (period, task) {
  return this.schedule(0, period, task)
}

Scheduler.prototype.schedule = function (delay, period, task) {
  var now = this.now()
  var st = new __WEBPACK_IMPORTED_MODULE_0__ScheduledTask__["a" /* default */](now + Math.max(0, delay), period, task, this)

  this.timeline.add(st)
  this._scheduleNextRun(now)
  return st
}

Scheduler.prototype.cancel = function (task) {
  task.active = false
  if (this.timeline.remove(task)) {
    this._reschedule()
  }
}

Scheduler.prototype.cancelAll = function (f) {
  this.timeline.removeAll(f)
  this._reschedule()
}

Scheduler.prototype._reschedule = function () {
  if (this.timeline.isEmpty()) {
    this._unschedule()
  } else {
    this._scheduleNextRun(this.now())
  }
}

Scheduler.prototype._unschedule = function () {
  this.timer.clearTimer(this._timer)
  this._timer = null
}

Scheduler.prototype._scheduleNextRun = function (now) { // eslint-disable-line complexity
  if (this.timeline.isEmpty()) {
    return
  }

  var nextArrival = this.timeline.nextArrival()

  if (this._timer === null) {
    this._scheduleNextArrival(nextArrival, now)
  } else if (nextArrival < this._nextArrival) {
    this._unschedule()
    this._scheduleNextArrival(nextArrival, now)
  }
}

Scheduler.prototype._scheduleNextArrival = function (nextArrival, now) {
  this._nextArrival = nextArrival
  var delay = Math.max(0, nextArrival - now)
  this._timer = this.timer.setTimer(this._runReadyTasksBound, delay)
}

Scheduler.prototype._runReadyTasks = function (now) {
  this._timer = null
  this.timeline.runTasks(now, __WEBPACK_IMPORTED_MODULE_1__task__["b" /* runTask */])
  this._scheduleNextRun(this.now())
}


/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = ScheduledTask;
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

function ScheduledTask (delay, period, task, scheduler) {
  this.time = delay
  this.period = period
  this.task = task
  this.scheduler = scheduler
  this.active = true
}

ScheduledTask.prototype.run = function () {
  return this.task.run(this.time)
}

ScheduledTask.prototype.error = function (e) {
  return this.task.error(this.time, e)
}

ScheduledTask.prototype.dispose = function () {
  this.scheduler.cancel(this)
  return this.task.dispose()
}


/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = ClockTimer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__task__ = __webpack_require__(10);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */



/*global setTimeout, clearTimeout*/

function ClockTimer () {}

ClockTimer.prototype.now = Date.now

ClockTimer.prototype.setTimer = function (f, dt) {
  return dt <= 0 ? runAsap(f) : setTimeout(f, dt)
}

ClockTimer.prototype.clearTimer = function (t) {
  return t instanceof Asap ? t.cancel() : clearTimeout(t)
}

function Asap (f) {
  this.f = f
  this.active = true
}

Asap.prototype.run = function () {
  return this.active && this.f()
}

Asap.prototype.error = function (e) {
  throw e
}

Asap.prototype.cancel = function () {
  this.active = false
}

function runAsap (f) {
  var task = new Asap(f)
  Object(__WEBPACK_IMPORTED_MODULE_0__task__["a" /* defer */])(task)
  return task
}


/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Timeline;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__most_prelude__ = __webpack_require__(3);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */



function Timeline () {
  this.tasks = []
}

Timeline.prototype.nextArrival = function () {
  return this.isEmpty() ? Infinity : this.tasks[0].time
}

Timeline.prototype.isEmpty = function () {
  return this.tasks.length === 0
}

Timeline.prototype.add = function (st) {
  insertByTime(st, this.tasks)
}

Timeline.prototype.remove = function (st) {
  var i = binarySearch(st.time, this.tasks)

  if (i >= 0 && i < this.tasks.length) {
    var at = __WEBPACK_IMPORTED_MODULE_0__most_prelude__["g" /* findIndex */](st, this.tasks[i].events)
    if (at >= 0) {
      this.tasks[i].events.splice(at, 1)
      return true
    }
  }

  return false
}

Timeline.prototype.removeAll = function (f) {
  for (var i = 0, l = this.tasks.length; i < l; ++i) {
    removeAllFrom(f, this.tasks[i])
  }
}

Timeline.prototype.runTasks = function (t, runTask) {
  var tasks = this.tasks
  var l = tasks.length
  var i = 0

  while (i < l && tasks[i].time <= t) {
    ++i
  }

  this.tasks = tasks.slice(i)

  // Run all ready tasks
  for (var j = 0; j < i; ++j) {
    this.tasks = runTasks(runTask, tasks[j], this.tasks)
  }
}

function runTasks (runTask, timeslot, tasks) { // eslint-disable-line complexity
  var events = timeslot.events
  for (var i = 0; i < events.length; ++i) {
    var task = events[i]

    if (task.active) {
      runTask(task)

      // Reschedule periodic repeating tasks
      // Check active again, since a task may have canceled itself
      if (task.period >= 0 && task.active) {
        task.time = task.time + task.period
        insertByTime(task, tasks)
      }
    }
  }

  return tasks
}

function insertByTime (task, timeslots) { // eslint-disable-line complexity
  var l = timeslots.length

  if (l === 0) {
    timeslots.push(newTimeslot(task.time, [task]))
    return
  }

  var i = binarySearch(task.time, timeslots)

  if (i >= l) {
    timeslots.push(newTimeslot(task.time, [task]))
  } else if (task.time === timeslots[i].time) {
    timeslots[i].events.push(task)
  } else {
    timeslots.splice(i, 0, newTimeslot(task.time, [task]))
  }
}

function removeAllFrom (f, timeslot) {
  timeslot.events = __WEBPACK_IMPORTED_MODULE_0__most_prelude__["m" /* removeAll */](f, timeslot.events)
}

function binarySearch (t, sortedArray) { // eslint-disable-line complexity
  var lo = 0
  var hi = sortedArray.length
  var mid, y

  while (lo < hi) {
    mid = Math.floor((lo + hi) / 2)
    y = sortedArray[mid]

    if (t === y.time) {
      return mid
    } else if (t < y.time) {
      hi = mid
    } else {
      lo = mid + 1
    }
  }
  return hi
}

function newTimeslot (t, events) {
  return { time: t, events: events }
}


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = thru;
/** @license MIT License (c) copyright 2010-2017 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

function thru (f, stream) {
  return f(stream)
}


/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fromEvent;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EventTargetSource__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__EventEmitterSource__ = __webpack_require__(54);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */





/**
 * Create a stream from an EventTarget, such as a DOM Node, or EventEmitter.
 * @param {String} event event type name, e.g. 'click'
 * @param {EventTarget|EventEmitter} source EventTarget or EventEmitter
 * @param {*?} capture for DOM events, whether to use
 *  capturing--passed as 3rd parameter to addEventListener.
 * @returns {Stream} stream containing all events of the specified type
 * from the source.
 */
function fromEvent (event, source, capture) { // eslint-disable-line complexity
  var s

  if (typeof source.addEventListener === 'function' && typeof source.removeEventListener === 'function') {
    if (arguments.length < 3) {
      capture = false
    }

    s = new __WEBPACK_IMPORTED_MODULE_1__EventTargetSource__["a" /* default */](event, source, capture)
  } else if (typeof source.addListener === 'function' && typeof source.removeListener === 'function') {
    s = new __WEBPACK_IMPORTED_MODULE_2__EventEmitterSource__["a" /* default */](event, source)
  } else {
    throw new Error('source must support addEventListener/removeEventListener or addListener/removeListener')
  }

  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](s)
}


/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = EventTargetSource;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__disposable_dispose__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tryEvent__ = __webpack_require__(6);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */




function EventTargetSource (event, source, capture) {
  this.event = event
  this.source = source
  this.capture = capture
}

EventTargetSource.prototype.run = function (sink, scheduler) {
  function addEvent (e) {
    __WEBPACK_IMPORTED_MODULE_1__tryEvent__["b" /* tryEvent */](scheduler.now(), e, sink)
  }

  this.source.addEventListener(this.event, addEvent, this.capture)

  return __WEBPACK_IMPORTED_MODULE_0__disposable_dispose__["b" /* create */](disposeEventTarget,
    { target: this, addEvent: addEvent })
}

function disposeEventTarget (info) {
  var target = info.target
  target.source.removeEventListener(target.event, info.addEvent, target.capture)
}


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = EventEmitterSource;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sink_DeferredSink__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__disposable_dispose__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tryEvent__ = __webpack_require__(6);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */





function EventEmitterSource (event, source) {
  this.event = event
  this.source = source
}

EventEmitterSource.prototype.run = function (sink, scheduler) {
  // NOTE: Because EventEmitter allows events in the same call stack as
  // a listener is added, use a DeferredSink to buffer events
  // until the stack clears, then propagate.  This maintains most.js's
  // invariant that no event will be delivered in the same call stack
  // as an observer begins observing.
  var dsink = new __WEBPACK_IMPORTED_MODULE_0__sink_DeferredSink__["a" /* default */](sink)

  function addEventVariadic (a) {
    var l = arguments.length
    if (l > 1) {
      var arr = new Array(l)
      for (var i = 0; i < l; ++i) {
        arr[i] = arguments[i]
      }
      __WEBPACK_IMPORTED_MODULE_2__tryEvent__["b" /* tryEvent */](scheduler.now(), arr, dsink)
    } else {
      __WEBPACK_IMPORTED_MODULE_2__tryEvent__["b" /* tryEvent */](scheduler.now(), a, dsink)
    }
  }

  this.source.addListener(this.event, addEventVariadic)

  return __WEBPACK_IMPORTED_MODULE_1__disposable_dispose__["b" /* create */](disposeEventEmitter, { target: this, addEvent: addEventVariadic })
}

function disposeEventEmitter (info) {
  var target = info.target
  target.source.removeListener(target.event, info.addEvent)
}


/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = DeferredSink;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__task__ = __webpack_require__(10);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */



function DeferredSink (sink) {
  this.sink = sink
  this.events = []
  this.active = true
}

DeferredSink.prototype.event = function (t, x) {
  if (!this.active) {
    return
  }

  if (this.events.length === 0) {
    Object(__WEBPACK_IMPORTED_MODULE_0__task__["a" /* defer */])(new PropagateAllTask(this.sink, t, this.events))
  }

  this.events.push({ time: t, value: x })
}

DeferredSink.prototype.end = function (t, x) {
  if (!this.active) {
    return
  }

  this._end(new EndTask(t, x, this.sink))
}

DeferredSink.prototype.error = function (t, e) {
  this._end(new ErrorTask(t, e, this.sink))
}

DeferredSink.prototype._end = function (task) {
  this.active = false
  Object(__WEBPACK_IMPORTED_MODULE_0__task__["a" /* defer */])(task)
}

function PropagateAllTask (sink, time, events) {
  this.sink = sink
  this.events = events
  this.time = time
}

PropagateAllTask.prototype.run = function () {
  var events = this.events
  var sink = this.sink
  var event

  for (var i = 0, l = events.length; i < l; ++i) {
    event = events[i]
    this.time = event.time
    sink.event(event.time, event.value)
  }

  events.length = 0
}

PropagateAllTask.prototype.error = function (e) {
  this.sink.error(this.time, e)
}

function EndTask (t, x, sink) {
  this.time = t
  this.value = x
  this.sink = sink
}

EndTask.prototype.run = function () {
  this.sink.end(this.time, this.value)
}

EndTask.prototype.error = function (e) {
  this.sink.error(this.time, e)
}

function ErrorTask (t, e, sink) {
  this.time = t
  this.value = e
  this.sink = sink
}

ErrorTask.prototype.run = function () {
  this.sink.error(this.time, this.value)
}

ErrorTask.prototype.error = function (e) {
  throw e
}


/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = observe;
/* harmony export (immutable) */ __webpack_exports__["a"] = drain;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__runSource__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__transform__ = __webpack_require__(7);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */




/**
 * Observe all the event values in the stream in time order. The
 * provided function `f` will be called for each event value
 * @param {function(x:T):*} f function to call with each event value
 * @param {Stream<T>} stream stream to observe
 * @return {Promise} promise that fulfills after the stream ends without
 *  an error, or rejects if the stream ends with an error.
 */
function observe (f, stream) {
  return drain(Object(__WEBPACK_IMPORTED_MODULE_1__transform__["c" /* tap */])(f, stream))
}

/**
 * "Run" a stream by creating demand and consuming all events
 * @param {Stream<T>} stream stream to drain
 * @return {Promise} promise that fulfills after the stream ends without
 *  an error, or rejects if the stream ends with an error.
 */
function drain (stream) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__runSource__["a" /* withDefaultScheduler */])(stream.source)
}


/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = FilterMap;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sink_Pipe__ = __webpack_require__(2);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */



function FilterMap (p, f, source) {
  this.p = p
  this.f = f
  this.source = source
}

FilterMap.prototype.run = function (sink, scheduler) {
  return this.source.run(new FilterMapSink(this.p, this.f, sink), scheduler)
}

function FilterMapSink (p, f, sink) {
  this.p = p
  this.f = f
  this.sink = sink
}

FilterMapSink.prototype.event = function (t, x) {
  var f = this.f
  var p = this.p
  p(x) && this.sink.event(t, f(x))
}

FilterMapSink.prototype.end = __WEBPACK_IMPORTED_MODULE_0__sink_Pipe__["a" /* default */].prototype.end
FilterMapSink.prototype.error = __WEBPACK_IMPORTED_MODULE_0__sink_Pipe__["a" /* default */].prototype.error


/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loop;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__ = __webpack_require__(2);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */




/**
 * Generalized feedback loop. Call a stepper function for each event. The stepper
 * will be called with 2 params: the current seed and the an event value.  It must
 * return a new { seed, value } pair. The `seed` will be fed back into the next
 * invocation of stepper, and the `value` will be propagated as the event value.
 * @param {function(seed:*, value:*):{seed:*, value:*}} stepper loop step function
 * @param {*} seed initial seed value passed to first stepper call
 * @param {Stream} stream event stream
 * @returns {Stream} new stream whose values are the `value` field of the objects
 * returned by the stepper
 */
function loop (stepper, seed, stream) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new Loop(stepper, seed, stream.source))
}

function Loop (stepper, seed, source) {
  this.step = stepper
  this.seed = seed
  this.source = source
}

Loop.prototype.run = function (sink, scheduler) {
  return this.source.run(new LoopSink(this.step, this.seed, sink), scheduler)
}

function LoopSink (stepper, seed, sink) {
  this.step = stepper
  this.seed = seed
  this.sink = sink
}

LoopSink.prototype.error = __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__["a" /* default */].prototype.error

LoopSink.prototype.event = function (t, x) {
  var result = this.step(this.seed, x)
  this.seed = result.seed
  this.sink.event(t, result.value)
}

LoopSink.prototype.end = function (t) {
  this.sink.end(t, this.seed)
}


/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = scan;
/* harmony export (immutable) */ __webpack_exports__["a"] = reduce;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__runSource__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__disposable_dispose__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__scheduler_PropagateTask__ = __webpack_require__(4);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */







/**
 * Create a stream containing successive reduce results of applying f to
 * the previous reduce result and the current stream item.
 * @param {function(result:*, x:*):*} f reducer function
 * @param {*} initial initial value
 * @param {Stream} stream stream to scan
 * @returns {Stream} new stream containing successive reduce results
 */
function scan (f, initial, stream) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new Scan(f, initial, stream.source))
}

function Scan (f, z, source) {
  this.source = source
  this.f = f
  this.value = z
}

Scan.prototype.run = function (sink, scheduler) {
  var d1 = scheduler.asap(__WEBPACK_IMPORTED_MODULE_4__scheduler_PropagateTask__["a" /* default */].event(this.value, sink))
  var d2 = this.source.run(new ScanSink(this.f, this.value, sink), scheduler)
  return __WEBPACK_IMPORTED_MODULE_3__disposable_dispose__["a" /* all */]([d1, d2])
}

function ScanSink (f, z, sink) {
  this.f = f
  this.value = z
  this.sink = sink
}

ScanSink.prototype.event = function (t, x) {
  var f = this.f
  this.value = f(this.value, x)
  this.sink.event(t, this.value)
}

ScanSink.prototype.error = __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__["a" /* default */].prototype.error
ScanSink.prototype.end = __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__["a" /* default */].prototype.end

/**
* Reduce a stream to produce a single result.  Note that reducing an infinite
* stream will return a Promise that never fulfills, but that may reject if an error
* occurs.
* @param {function(result:*, x:*):*} f reducer function
* @param {*} initial initial value
* @param {Stream} stream to reduce
* @returns {Promise} promise for the file result of the reduce
*/
function reduce (f, initial, stream) {
  return Object(__WEBPACK_IMPORTED_MODULE_2__runSource__["a" /* withDefaultScheduler */])(new Reduce(f, initial, stream.source))
}

function Reduce (f, z, source) {
  this.source = source
  this.f = f
  this.value = z
}

Reduce.prototype.run = function (sink, scheduler) {
  return this.source.run(new ReduceSink(this.f, this.value, sink), scheduler)
}

function ReduceSink (f, z, sink) {
  this.f = f
  this.value = z
  this.sink = sink
}

ReduceSink.prototype.event = function (t, x) {
  var f = this.f
  this.value = f(this.value, x)
  this.sink.event(t, this.value)
}

ReduceSink.prototype.error = __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__["a" /* default */].prototype.error

ReduceSink.prototype.end = function (t) {
  this.sink.end(t, this.value)
}


/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = unfold;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(0);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */



/**
 * Compute a stream by unfolding tuples of future values from a seed value
 * Event times may be controlled by returning a Promise from f
 * @param {function(seed:*):{value:*, seed:*, done:boolean}|Promise<{value:*, seed:*, done:boolean}>} f unfolding function accepts
 *  a seed and returns a new tuple with a value, new seed, and boolean done flag.
 *  If tuple.done is true, the stream will end.
 * @param {*} seed seed value
 * @returns {Stream} stream containing all value of all tuples produced by the
 *  unfolding function.
 */
function unfold (f, seed) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new UnfoldSource(f, seed))
}

function UnfoldSource (f, seed) {
  this.f = f
  this.value = seed
}

UnfoldSource.prototype.run = function (sink, scheduler) {
  return new Unfold(this.f, this.value, sink, scheduler)
}

function Unfold (f, x, sink, scheduler) {
  this.f = f
  this.sink = sink
  this.scheduler = scheduler
  this.active = true

  var self = this
  function err (e) {
    self.sink.error(self.scheduler.now(), e)
  }

  function start (unfold) {
    return stepUnfold(unfold, x)
  }

  Promise.resolve(this).then(start).catch(err)
}

Unfold.prototype.dispose = function () {
  this.active = false
}

function stepUnfold (unfold, x) {
  var f = unfold.f
  return Promise.resolve(f(x)).then(function (tuple) {
    return continueUnfold(unfold, tuple)
  })
}

function continueUnfold (unfold, tuple) {
  if (tuple.done) {
    unfold.sink.end(unfold.scheduler.now(), tuple.value)
    return tuple.value
  }

  unfold.sink.event(unfold.scheduler.now(), tuple.value)

  if (!unfold.active) {
    return tuple.value
  }
  return stepUnfold(unfold, tuple.seed)
}


/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = iterate;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(0);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */



/**
 * Compute a stream by iteratively calling f to produce values
 * Event times may be controlled by returning a Promise from f
 * @param {function(x:*):*|Promise<*>} f
 * @param {*} x initial value
 * @returns {Stream}
 */
function iterate (f, x) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new IterateSource(f, x))
}

function IterateSource (f, x) {
  this.f = f
  this.value = x
}

IterateSource.prototype.run = function (sink, scheduler) {
  return new Iterate(this.f, this.value, sink, scheduler)
}

function Iterate (f, initial, sink, scheduler) {
  this.f = f
  this.sink = sink
  this.scheduler = scheduler
  this.active = true

  var x = initial

  var self = this
  function err (e) {
    self.sink.error(self.scheduler.now(), e)
  }

  function start (iterate) {
    return stepIterate(iterate, x)
  }

  Promise.resolve(this).then(start).catch(err)
}

Iterate.prototype.dispose = function () {
  this.active = false
}

function stepIterate (iterate, x) {
  iterate.sink.event(iterate.scheduler.now(), x)

  if (!iterate.active) {
    return x
  }

  var f = iterate.f
  return Promise.resolve(f(x)).then(function (y) {
    return continueIterate(iterate, y)
  })
}

function continueIterate (iterate, x) {
  return !iterate.active ? iterate.value : stepIterate(iterate, x)
}


/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = generate;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__most_prelude__ = __webpack_require__(3);
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */




/**
 * Compute a stream using an *async* generator, which yields promises
 * to control event times.
 * @param f
 * @returns {Stream}
 */
function generate (f /*, ...args */) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new GenerateSource(f, __WEBPACK_IMPORTED_MODULE_1__most_prelude__["o" /* tail */](arguments)))
}

function GenerateSource (f, args) {
  this.f = f
  this.args = args
}

GenerateSource.prototype.run = function (sink, scheduler) {
  return new Generate(this.f.apply(void 0, this.args), sink, scheduler)
}

function Generate (iterator, sink, scheduler) {
  this.iterator = iterator
  this.sink = sink
  this.scheduler = scheduler
  this.active = true

  var self = this
  function err (e) {
    self.sink.error(self.scheduler.now(), e)
  }

  Promise.resolve(this).then(next).catch(err)
}

function next (generate, x) {
  return generate.active ? handle(generate, generate.iterator.next(x)) : x
}

function handle (generate, result) {
  if (result.done) {
    return generate.sink.end(generate.scheduler.now(), result.value)
  }

  return Promise.resolve(result.value).then(function (x) {
    return emit(generate, x)
  }, function (e) {
    return error(generate, e)
  })
}

function emit (generate, x) {
  generate.sink.event(generate.scheduler.now(), x)
  return next(generate, x)
}

function error (generate, e) {
  return handle(generate, generate.iterator.throw(e))
}

Generate.prototype.dispose = function () {
  this.active = false
}


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = cons;
/* harmony export (immutable) */ __webpack_exports__["a"] = concat;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__source_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__continueWith__ = __webpack_require__(23);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */




/**
 * @param {*} x value to prepend
 * @param {Stream} stream
 * @returns {Stream} new stream with x prepended
 */
function cons (x, stream) {
  return concat(Object(__WEBPACK_IMPORTED_MODULE_0__source_core__["c" /* of */])(x), stream)
}

/**
* @param {Stream} left
* @param {Stream} right
* @returns {Stream} new stream containing all events in left followed by all
*  events in right.  This *timeshifts* right to the end of left.
*/
function concat (left, right) {
  return Object(__WEBPACK_IMPORTED_MODULE_1__continueWith__["a" /* continueWith */])(function () {
    return right
  }, left)
}


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = ap;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__combine__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__most_prelude__ = __webpack_require__(3);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */




/**
 * Assume fs is a stream containing functions, and apply the latest function
 * in fs to the latest value in xs.
 * fs:         --f---------g--------h------>
 * xs:         -a-------b-------c-------d-->
 * ap(fs, xs): --fa-----fb-gb---gc--hc--hd->
 * @param {Stream} fs stream of functions to apply to the latest x
 * @param {Stream} xs stream of values to which to apply all the latest f
 * @returns {Stream} stream containing all the applications of fs to xs
 */
function ap (fs, xs) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__combine__["a" /* combine */])(__WEBPACK_IMPORTED_MODULE_1__most_prelude__["b" /* apply */], fs, xs)
}


/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = transduce;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(0);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */



/**
 * Transform a stream by passing its events through a transducer.
 * @param  {function} transducer transducer function
 * @param  {Stream} stream stream whose events will be passed through the
 *  transducer
 * @return {Stream} stream of events transformed by the transducer
 */
function transduce (transducer, stream) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new Transduce(transducer, stream.source))
}

function Transduce (transducer, source) {
  this.transducer = transducer
  this.source = source
}

Transduce.prototype.run = function (sink, scheduler) {
  var xf = this.transducer(new Transformer(sink))
  return this.source.run(new TransduceSink(getTxHandler(xf), sink), scheduler)
}

function TransduceSink (adapter, sink) {
  this.xf = adapter
  this.sink = sink
}

TransduceSink.prototype.event = function (t, x) {
  var next = this.xf.step(t, x)

  return this.xf.isReduced(next)
    ? this.sink.end(t, this.xf.getResult(next))
    : next
}

TransduceSink.prototype.end = function (t, x) {
  return this.xf.result(x)
}

TransduceSink.prototype.error = function (t, e) {
  return this.sink.error(t, e)
}

function Transformer (sink) {
  this.time = -Infinity
  this.sink = sink
}

Transformer.prototype['@@transducer/init'] = Transformer.prototype.init = function () {}

Transformer.prototype['@@transducer/step'] = Transformer.prototype.step = function (t, x) {
  if (!isNaN(t)) {
    this.time = Math.max(t, this.time)
  }
  return this.sink.event(this.time, x)
}

Transformer.prototype['@@transducer/result'] = Transformer.prototype.result = function (x) {
  return this.sink.end(this.time, x)
}

/**
* Given an object supporting the new or legacy transducer protocol,
* create an adapter for it.
* @param {object} tx transform
* @returns {TxAdapter|LegacyTxAdapter}
*/
function getTxHandler (tx) {
  return typeof tx['@@transducer/step'] === 'function'
    ? new TxAdapter(tx)
    : new LegacyTxAdapter(tx)
}

/**
* Adapter for new official transducer protocol
* @param {object} tx transform
* @constructor
*/
function TxAdapter (tx) {
  this.tx = tx
}

TxAdapter.prototype.step = function (t, x) {
  return this.tx['@@transducer/step'](t, x)
}
TxAdapter.prototype.result = function (x) {
  return this.tx['@@transducer/result'](x)
}
TxAdapter.prototype.isReduced = function (x) {
  return x != null && x['@@transducer/reduced']
}
TxAdapter.prototype.getResult = function (x) {
  return x['@@transducer/value']
}

/**
* Adapter for older transducer protocol
* @param {object} tx transform
* @constructor
*/
function LegacyTxAdapter (tx) {
  this.tx = tx
}

LegacyTxAdapter.prototype.step = function (t, x) {
  return this.tx.step(t, x)
}
LegacyTxAdapter.prototype.result = function (x) {
  return this.tx.result(x)
}
LegacyTxAdapter.prototype.isReduced = function (x) {
  return x != null && x.__transducers_reduced__
}
LegacyTxAdapter.prototype.getResult = function (x) {
  return x.value
}


/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = LinkedList;
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

/**
 * Doubly linked list
 * @constructor
 */
function LinkedList () {
  this.head = null
  this.length = 0
}

/**
 * Add a node to the end of the list
 * @param {{prev:Object|null, next:Object|null, dispose:function}} x node to add
 */
LinkedList.prototype.add = function (x) {
  if (this.head !== null) {
    this.head.prev = x
    x.next = this.head
  }
  this.head = x
  ++this.length
}

/**
 * Remove the provided node from the list
 * @param {{prev:Object|null, next:Object|null, dispose:function}} x node to remove
 */
LinkedList.prototype.remove = function (x) { // eslint-disable-line  complexity
  --this.length
  if (x === this.head) {
    this.head = this.head.next
  }
  if (x.next !== null) {
    x.next.prev = x.prev
    x.next = null
  }
  if (x.prev !== null) {
    x.prev.next = x.next
    x.prev = null
  }
}

/**
 * @returns {boolean} true iff there are no nodes in the list
 */
LinkedList.prototype.isEmpty = function () {
  return this.length === 0
}

/**
 * Dispose all nodes
 * @returns {Promise} promise that fulfills when all nodes have been disposed,
 *  or rejects if an error occurs while disposing
 */
LinkedList.prototype.dispose = function () {
  if (this.isEmpty()) {
    return Promise.resolve()
  }

  var promises = []
  var x = this.head
  this.head = null
  this.length = 0

  while (x !== null) {
    promises.push(x.dispose())
    x = x.next
  }

  return Promise.all(promises)
}


/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = concatMap;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mergeConcurrently__ = __webpack_require__(14);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */



/**
 * Map each value in stream to a new stream, and concatenate them all
 * stream:              -a---b---cX
 * f(a):                 1-1-1-1X
 * f(b):                        -2-2-2-2X
 * f(c):                                -3-3-3-3X
 * stream.concatMap(f): -1-1-1-1-2-2-2-2-3-3-3-3X
 * @param {function(x:*):Stream} f function to map each value to a stream
 * @param {Stream} stream
 * @returns {Stream} new stream containing all events from each stream returned by f
 */
function concatMap (f, stream) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__mergeConcurrently__["b" /* mergeMapConcurrently */])(f, 1, stream)
}


/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = merge;
/* harmony export (immutable) */ __webpack_exports__["b"] = mergeArray;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sink_IndexSink__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__source_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__disposable_dispose__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__most_prelude__ = __webpack_require__(3);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */








var copy = __WEBPACK_IMPORTED_MODULE_5__most_prelude__["e" /* copy */]
var reduce = __WEBPACK_IMPORTED_MODULE_5__most_prelude__["k" /* reduce */]

/**
 * @returns {Stream} stream containing events from all streams in the argument
 * list in time order.  If two events are simultaneous they will be merged in
 * arbitrary order.
 */
function merge (/* ...streams*/) {
  return mergeArray(copy(arguments))
}

/**
 * @param {Array} streams array of stream to merge
 * @returns {Stream} stream containing events from all input observables
 * in time order.  If two events are simultaneous they will be merged in
 * arbitrary order.
 */
function mergeArray (streams) {
  var l = streams.length
  return l === 0 ? Object(__WEBPACK_IMPORTED_MODULE_3__source_core__["a" /* empty */])()
    : l === 1 ? streams[0]
    : new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](mergeSources(streams))
}

/**
 * This implements fusion/flattening for merge.  It will
 * fuse adjacent merge operations.  For example:
 * - a.merge(b).merge(c) effectively becomes merge(a, b, c)
 * - merge(a, merge(b, c)) effectively becomes merge(a, b, c)
 * It does this by concatenating the sources arrays of
 * any nested Merge sources, in effect "flattening" nested
 * merge operations into a single merge.
 */
function mergeSources (streams) {
  return new Merge(reduce(appendSources, [], streams))
}

function appendSources (sources, stream) {
  var source = stream.source
  return source instanceof Merge
    ? sources.concat(source.sources)
    : sources.concat(source)
}

function Merge (sources) {
  this.sources = sources
}

Merge.prototype.run = function (sink, scheduler) {
  var l = this.sources.length
  var disposables = new Array(l)
  var sinks = new Array(l)

  var mergeSink = new MergeSink(disposables, sinks, sink)

  for (var indexSink, i = 0; i < l; ++i) {
    indexSink = sinks[i] = new __WEBPACK_IMPORTED_MODULE_2__sink_IndexSink__["a" /* default */](i, mergeSink)
    disposables[i] = this.sources[i].run(indexSink, scheduler)
  }

  return __WEBPACK_IMPORTED_MODULE_4__disposable_dispose__["a" /* all */](disposables)
}

function MergeSink (disposables, sinks, sink) {
  this.sink = sink
  this.disposables = disposables
  this.activeCount = sinks.length
}

MergeSink.prototype.error = __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__["a" /* default */].prototype.error

MergeSink.prototype.event = function (t, indexValue) {
  this.sink.event(t, indexValue.value)
}

MergeSink.prototype.end = function (t, indexedValue) {
  __WEBPACK_IMPORTED_MODULE_4__disposable_dispose__["f" /* tryDispose */](t, this.disposables[indexedValue.index], this.sink)
  if (--this.activeCount === 0) {
    this.sink.end(t, indexedValue.value)
  }
}


/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = sample;
/* harmony export (immutable) */ __webpack_exports__["c"] = sampleWith;
/* harmony export (immutable) */ __webpack_exports__["b"] = sampleArray;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__disposable_dispose__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__most_prelude__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__invoke__ = __webpack_require__(13);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */







/**
 * When an event arrives on sampler, emit the result of calling f with the latest
 * values of all streams being sampled
 * @param {function(...values):*} f function to apply to each set of sampled values
 * @param {Stream} sampler streams will be sampled whenever an event arrives
 *  on sampler
 * @returns {Stream} stream of sampled and transformed values
 */
function sample (f, sampler /*, ...streams */) {
  return sampleArray(f, sampler, __WEBPACK_IMPORTED_MODULE_3__most_prelude__["f" /* drop */](2, arguments))
}

/**
 * When an event arrives on sampler, emit the latest event value from stream.
 * @param {Stream} sampler stream of events at whose arrival time
 *  stream's latest value will be propagated
 * @param {Stream} stream stream of values
 * @returns {Stream} sampled stream of values
 */
function sampleWith (sampler, stream) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new Sampler(__WEBPACK_IMPORTED_MODULE_3__most_prelude__["h" /* id */], sampler.source, [stream.source]))
}

function sampleArray (f, sampler, streams) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new Sampler(f, sampler.source, __WEBPACK_IMPORTED_MODULE_3__most_prelude__["j" /* map */](getSource, streams)))
}

function getSource (stream) {
  return stream.source
}

function Sampler (f, sampler, sources) {
  this.f = f
  this.sampler = sampler
  this.sources = sources
}

Sampler.prototype.run = function (sink, scheduler) {
  var l = this.sources.length
  var disposables = new Array(l + 1)
  var sinks = new Array(l)

  var sampleSink = new SampleSink(this.f, sinks, sink)

  for (var hold, i = 0; i < l; ++i) {
    hold = sinks[i] = new Hold(sampleSink)
    disposables[i] = this.sources[i].run(hold, scheduler)
  }

  disposables[i] = this.sampler.run(sampleSink, scheduler)

  return __WEBPACK_IMPORTED_MODULE_2__disposable_dispose__["a" /* all */](disposables)
}

function Hold (sink) {
  this.sink = sink
  this.hasValue = false
}

Hold.prototype.event = function (t, x) {
  this.value = x
  this.hasValue = true
  this.sink._notify(this)
}

Hold.prototype.end = function () {}
Hold.prototype.error = __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__["a" /* default */].prototype.error

function SampleSink (f, sinks, sink) {
  this.f = f
  this.sinks = sinks
  this.sink = sink
  this.active = false
}

SampleSink.prototype._notify = function () {
  if (!this.active) {
    this.active = this.sinks.every(hasValue)
  }
}

SampleSink.prototype.event = function (t) {
  if (this.active) {
    this.sink.event(t, Object(__WEBPACK_IMPORTED_MODULE_4__invoke__["a" /* default */])(this.f, __WEBPACK_IMPORTED_MODULE_3__most_prelude__["j" /* map */](getValue, this.sinks)))
  }
}

SampleSink.prototype.end = __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__["a" /* default */].prototype.end
SampleSink.prototype.error = __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__["a" /* default */].prototype.error

function hasValue (hold) {
  return hold.hasValue
}

function getValue (hold) {
  return hold.value
}


/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = zip;
/* harmony export (immutable) */ __webpack_exports__["b"] = zipArray;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__transform__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__source_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sink_Pipe__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sink_IndexSink__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__disposable_dispose__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__most_prelude__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__invoke__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Queue__ = __webpack_require__(71);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */











var map = __WEBPACK_IMPORTED_MODULE_6__most_prelude__["j" /* map */]
var tail = __WEBPACK_IMPORTED_MODULE_6__most_prelude__["o" /* tail */]

/**
 * Combine streams pairwise (or tuple-wise) by index by applying f to values
 * at corresponding indices.  The returned stream ends when any of the input
 * streams ends.
 * @param {function} f function to combine values
 * @returns {Stream} new stream with items at corresponding indices combined
 *  using f
 */
function zip (f /*, ...streams */) {
  return zipArray(f, tail(arguments))
}

/**
* Combine streams pairwise (or tuple-wise) by index by applying f to values
* at corresponding indices.  The returned stream ends when any of the input
* streams ends.
* @param {function} f function to combine values
* @param {[Stream]} streams streams to zip using f
* @returns {Stream} new stream with items at corresponding indices combined
*  using f
*/
function zipArray (f, streams) {
  return streams.length === 0 ? __WEBPACK_IMPORTED_MODULE_2__source_core__["a" /* empty */]()
: streams.length === 1 ? __WEBPACK_IMPORTED_MODULE_1__transform__["b" /* map */](f, streams[0])
: new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new Zip(f, map(getSource, streams)))
}

function getSource (stream) {
  return stream.source
}

function Zip (f, sources) {
  this.f = f
  this.sources = sources
}

Zip.prototype.run = function (sink, scheduler) {
  var l = this.sources.length
  var disposables = new Array(l)
  var sinks = new Array(l)
  var buffers = new Array(l)

  var zipSink = new ZipSink(this.f, buffers, sinks, sink)

  for (var indexSink, i = 0; i < l; ++i) {
    buffers[i] = new __WEBPACK_IMPORTED_MODULE_8__Queue__["a" /* default */]()
    indexSink = sinks[i] = new __WEBPACK_IMPORTED_MODULE_4__sink_IndexSink__["a" /* default */](i, zipSink)
    disposables[i] = this.sources[i].run(indexSink, scheduler)
  }

  return __WEBPACK_IMPORTED_MODULE_5__disposable_dispose__["a" /* all */](disposables)
}

function ZipSink (f, buffers, sinks, sink) {
  this.f = f
  this.sinks = sinks
  this.sink = sink
  this.buffers = buffers
}

ZipSink.prototype.event = function (t, indexedValue) { // eslint-disable-line complexity
  var buffers = this.buffers
  var buffer = buffers[indexedValue.index]

  buffer.push(indexedValue.value)

  if (buffer.length() === 1) {
    if (!ready(this.buffers)) {
      return
    }

    emitZipped(this.f, t, buffers, this.sink)

    if (ended(this.buffers, this.sinks)) {
      this.sink.end(t, void 0)
    }
  }
}

ZipSink.prototype.end = function (t, indexedValue) {
  var buffer = this.buffers[indexedValue.index]
  if (buffer.isEmpty()) {
    this.sink.end(t, indexedValue.value)
  }
}

ZipSink.prototype.error = __WEBPACK_IMPORTED_MODULE_3__sink_Pipe__["a" /* default */].prototype.error

function emitZipped (f, t, buffers, sink) {
  sink.event(t, Object(__WEBPACK_IMPORTED_MODULE_7__invoke__["a" /* default */])(f, map(head, buffers)))
}

function head (buffer) {
  return buffer.shift()
}

function ended (buffers, sinks) {
  for (var i = 0, l = buffers.length; i < l; ++i) {
    if (buffers[i].isEmpty() && !sinks[i].active) {
      return true
    }
  }
  return false
}

function ready (buffers) {
  for (var i = 0, l = buffers.length; i < l; ++i) {
    if (buffers[i].isEmpty()) {
      return false
    }
  }
  return true
}


/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Queue;
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

// Based on https://github.com/petkaantonov/deque

function Queue (capPow2) {
  this._capacity = capPow2 || 32
  this._length = 0
  this._head = 0
}

Queue.prototype.push = function (x) {
  var len = this._length
  this._checkCapacity(len + 1)

  var i = (this._head + len) & (this._capacity - 1)
  this[i] = x
  this._length = len + 1
}

Queue.prototype.shift = function () {
  var head = this._head
  var x = this[head]

  this[head] = void 0
  this._head = (head + 1) & (this._capacity - 1)
  this._length--
  return x
}

Queue.prototype.isEmpty = function () {
  return this._length === 0
}

Queue.prototype.length = function () {
  return this._length
}

Queue.prototype._checkCapacity = function (size) {
  if (this._capacity < size) {
    this._ensureCapacity(this._capacity << 1)
  }
}

Queue.prototype._ensureCapacity = function (capacity) {
  var oldCapacity = this._capacity
  this._capacity = capacity

  var last = this._head + this._length

  if (last > oldCapacity) {
    copy(this, 0, this, oldCapacity, last & (oldCapacity - 1))
  }
}

function copy (src, srcIndex, dst, dstIndex, len) {
  for (var j = 0; j < len; ++j) {
    dst[j + dstIndex] = src[j + srcIndex]
    src[j + srcIndex] = void 0
  }
}


/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = switchLatest;
/* unused harmony export switch */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__disposable_dispose__ = __webpack_require__(1);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */




/**
 * Given a stream of streams, return a new stream that adopts the behavior
 * of the most recent inner stream.
 * @param {Stream} stream of streams on which to switch
 * @returns {Stream} switching stream
 */
function switchLatest (stream) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new Switch(stream.source))
}



function Switch (source) {
  this.source = source
}

Switch.prototype.run = function (sink, scheduler) {
  var switchSink = new SwitchSink(sink, scheduler)
  return __WEBPACK_IMPORTED_MODULE_1__disposable_dispose__["a" /* all */]([switchSink, this.source.run(switchSink, scheduler)])
}

function SwitchSink (sink, scheduler) {
  this.sink = sink
  this.scheduler = scheduler
  this.current = null
  this.ended = false
}

SwitchSink.prototype.event = function (t, stream) {
  this._disposeCurrent(t) // TODO: capture the result of this dispose
  this.current = new Segment(t, Infinity, this, this.sink)
  this.current.disposable = stream.source.run(this.current, this.scheduler)
}

SwitchSink.prototype.end = function (t, x) {
  this.ended = true
  this._checkEnd(t, x)
}

SwitchSink.prototype.error = function (t, e) {
  this.ended = true
  this.sink.error(t, e)
}

SwitchSink.prototype.dispose = function () {
  return this._disposeCurrent(this.scheduler.now())
}

SwitchSink.prototype._disposeCurrent = function (t) {
  if (this.current !== null) {
    return this.current._dispose(t)
  }
}

SwitchSink.prototype._disposeInner = function (t, inner) {
  inner._dispose(t) // TODO: capture the result of this dispose
  if (inner === this.current) {
    this.current = null
  }
}

SwitchSink.prototype._checkEnd = function (t, x) {
  if (this.ended && this.current === null) {
    this.sink.end(t, x)
  }
}

SwitchSink.prototype._endInner = function (t, x, inner) {
  this._disposeInner(t, inner)
  this._checkEnd(t, x)
}

SwitchSink.prototype._errorInner = function (t, e, inner) {
  this._disposeInner(t, inner)
  this.sink.error(t, e)
}

function Segment (min, max, outer, sink) {
  this.min = min
  this.max = max
  this.outer = outer
  this.sink = sink
  this.disposable = __WEBPACK_IMPORTED_MODULE_1__disposable_dispose__["c" /* empty */]()
}

Segment.prototype.event = function (t, x) {
  if (t < this.max) {
    this.sink.event(Math.max(t, this.min), x)
  }
}

Segment.prototype.end = function (t, x) {
  this.outer._endInner(Math.max(t, this.min), x, this)
}

Segment.prototype.error = function (t, e) {
  this.outer._errorInner(Math.max(t, this.min), e, this)
}

Segment.prototype._dispose = function (t) {
  this.max = t
  __WEBPACK_IMPORTED_MODULE_1__disposable_dispose__["f" /* tryDispose */](t, this.disposable, this.sink)
}


/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = filter;
/* harmony export (immutable) */ __webpack_exports__["b"] = skipRepeats;
/* harmony export (immutable) */ __webpack_exports__["c"] = skipRepeatsWith;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fusion_Filter__ = __webpack_require__(22);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */





/**
 * Retain only items matching a predicate
 * @param {function(x:*):boolean} p filtering predicate called for each item
 * @param {Stream} stream stream to filter
 * @returns {Stream} stream containing only items for which predicate returns truthy
 */
function filter (p, stream) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](__WEBPACK_IMPORTED_MODULE_2__fusion_Filter__["a" /* default */].create(p, stream.source))
}

/**
 * Skip repeated events, using === to detect duplicates
 * @param {Stream} stream stream from which to omit repeated events
 * @returns {Stream} stream without repeated events
 */
function skipRepeats (stream) {
  return skipRepeatsWith(same, stream)
}

/**
 * Skip repeated events using the provided equals function to detect duplicates
 * @param {function(a:*, b:*):boolean} equals optional function to compare items
 * @param {Stream} stream stream from which to omit repeated events
 * @returns {Stream} stream without repeated events
 */
function skipRepeatsWith (equals, stream) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new SkipRepeats(equals, stream.source))
}

function SkipRepeats (equals, source) {
  this.equals = equals
  this.source = source
}

SkipRepeats.prototype.run = function (sink, scheduler) {
  return this.source.run(new SkipRepeatsSink(this.equals, sink), scheduler)
}

function SkipRepeatsSink (equals, sink) {
  this.equals = equals
  this.sink = sink
  this.value = void 0
  this.init = true
}

SkipRepeatsSink.prototype.end = __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__["a" /* default */].prototype.end
SkipRepeatsSink.prototype.error = __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__["a" /* default */].prototype.error

SkipRepeatsSink.prototype.event = function (t, x) {
  if (this.init) {
    this.init = false
    this.value = x
    this.sink.event(t, x)
  } else if (!this.equals(this.value, x)) {
    this.value = x
    this.sink.event(t, x)
  }
}

function same (a, b) {
  return a === b
}


/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["e"] = take;
/* harmony export (immutable) */ __webpack_exports__["a"] = skip;
/* harmony export (immutable) */ __webpack_exports__["d"] = slice;
/* harmony export (immutable) */ __webpack_exports__["f"] = takeWhile;
/* harmony export (immutable) */ __webpack_exports__["c"] = skipWhile;
/* harmony export (immutable) */ __webpack_exports__["b"] = skipAfter;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__source_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__disposable_dispose__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__fusion_Map__ = __webpack_require__(11);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */







/**
 * @param {number} n
 * @param {Stream} stream
 * @returns {Stream} new stream containing only up to the first n items from stream
 */
function take (n, stream) {
  return slice(0, n, stream)
}

/**
 * @param {number} n
 * @param {Stream} stream
 * @returns {Stream} new stream with the first n items removed
 */
function skip (n, stream) {
  return slice(n, Infinity, stream)
}

/**
 * Slice a stream by index. Negative start/end indexes are not supported
 * @param {number} start
 * @param {number} end
 * @param {Stream} stream
 * @returns {Stream} stream containing items where start <= index < end
 */
function slice (start, end, stream) {
  return end <= start ? __WEBPACK_IMPORTED_MODULE_2__source_core__["a" /* empty */]()
    : new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](sliceSource(start, end, stream.source))
}

function sliceSource (start, end, source) {
  return source instanceof __WEBPACK_IMPORTED_MODULE_4__fusion_Map__["a" /* default */] ? commuteMapSlice(start, end, source)
    : source instanceof Slice ? fuseSlice(start, end, source)
    : new Slice(start, end, source)
}

function commuteMapSlice (start, end, source) {
  return __WEBPACK_IMPORTED_MODULE_4__fusion_Map__["a" /* default */].create(source.f, sliceSource(start, end, source.source))
}

function fuseSlice (start, end, source) {
  start += source.min
  end = Math.min(end + source.min, source.max)
  return new Slice(start, end, source.source)
}

function Slice (min, max, source) {
  this.source = source
  this.min = min
  this.max = max
}

Slice.prototype.run = function (sink, scheduler) {
  var disposable = __WEBPACK_IMPORTED_MODULE_3__disposable_dispose__["e" /* settable */]()
  var sliceSink = new SliceSink(this.min, this.max - this.min, sink, disposable)

  disposable.setDisposable(this.source.run(sliceSink, scheduler))
  return disposable
}

function SliceSink (skip, take, sink, disposable) {
  this.sink = sink
  this.skip = skip
  this.take = take
  this.disposable = disposable
}

SliceSink.prototype.end = __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__["a" /* default */].prototype.end
SliceSink.prototype.error = __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__["a" /* default */].prototype.error

SliceSink.prototype.event = function (t, x) {
  /* eslint complexity: [1, 4] */
  if (this.skip > 0) {
    this.skip -= 1
    return
  }

  if (this.take === 0) {
    return
  }

  this.take -= 1
  this.sink.event(t, x)
  if (this.take === 0) {
    this.disposable.dispose()
    this.sink.end(t, x)
  }
}

function takeWhile (p, stream) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new TakeWhile(p, stream.source))
}

function TakeWhile (p, source) {
  this.p = p
  this.source = source
}

TakeWhile.prototype.run = function (sink, scheduler) {
  var disposable = __WEBPACK_IMPORTED_MODULE_3__disposable_dispose__["e" /* settable */]()
  var takeWhileSink = new TakeWhileSink(this.p, sink, disposable)

  disposable.setDisposable(this.source.run(takeWhileSink, scheduler))
  return disposable
}

function TakeWhileSink (p, sink, disposable) {
  this.p = p
  this.sink = sink
  this.active = true
  this.disposable = disposable
}

TakeWhileSink.prototype.end = __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__["a" /* default */].prototype.end
TakeWhileSink.prototype.error = __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__["a" /* default */].prototype.error

TakeWhileSink.prototype.event = function (t, x) {
  if (!this.active) {
    return
  }

  var p = this.p
  this.active = p(x)
  if (this.active) {
    this.sink.event(t, x)
  } else {
    this.disposable.dispose()
    this.sink.end(t, x)
  }
}

function skipWhile (p, stream) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new SkipWhile(p, stream.source))
}

function SkipWhile (p, source) {
  this.p = p
  this.source = source
}

SkipWhile.prototype.run = function (sink, scheduler) {
  return this.source.run(new SkipWhileSink(this.p, sink), scheduler)
}

function SkipWhileSink (p, sink) {
  this.p = p
  this.sink = sink
  this.skipping = true
}

SkipWhileSink.prototype.end = __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__["a" /* default */].prototype.end
SkipWhileSink.prototype.error = __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__["a" /* default */].prototype.error

SkipWhileSink.prototype.event = function (t, x) {
  if (this.skipping) {
    var p = this.p
    this.skipping = p(x)
    if (this.skipping) {
      return
    }
  }

  this.sink.event(t, x)
}

function skipAfter (p, stream) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new SkipAfter(p, stream.source))
}

function SkipAfter (p, source) {
  this.p = p
  this.source = source
}

SkipAfter.prototype.run = function run (sink, scheduler) {
  return this.source.run(new SkipAfterSink(this.p, sink), scheduler)
}

function SkipAfterSink (p, sink) {
  this.p = p
  this.sink = sink
  this.skipping = false
}

SkipAfterSink.prototype.event = function event (t, x) {
  if (this.skipping) {
    return
  }

  var p = this.p
  this.skipping = p(x)
  this.sink.event(t, x)

  if (this.skipping) {
    this.sink.end(t, x)
  }
}

SkipAfterSink.prototype.end = __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__["a" /* default */].prototype.end
SkipAfterSink.prototype.error = __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__["a" /* default */].prototype.error


/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = takeUntil;
/* harmony export (immutable) */ __webpack_exports__["b"] = skipUntil;
/* harmony export (immutable) */ __webpack_exports__["a"] = during;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__disposable_dispose__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__combinator_flatMap__ = __webpack_require__(25);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */






function takeUntil (signal, stream) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new Until(signal.source, stream.source))
}

function skipUntil (signal, stream) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new Since(signal.source, stream.source))
}

function during (timeWindow, stream) {
  return takeUntil(Object(__WEBPACK_IMPORTED_MODULE_3__combinator_flatMap__["b" /* join */])(timeWindow), skipUntil(timeWindow, stream))
}

function Until (maxSignal, source) {
  this.maxSignal = maxSignal
  this.source = source
}

Until.prototype.run = function (sink, scheduler) {
  var min = new Bound(-Infinity, sink)
  var max = new UpperBound(this.maxSignal, sink, scheduler)
  var disposable = this.source.run(new TimeWindowSink(min, max, sink), scheduler)

  return __WEBPACK_IMPORTED_MODULE_2__disposable_dispose__["a" /* all */]([min, max, disposable])
}

function Since (minSignal, source) {
  this.minSignal = minSignal
  this.source = source
}

Since.prototype.run = function (sink, scheduler) {
  var min = new LowerBound(this.minSignal, sink, scheduler)
  var max = new Bound(Infinity, sink)
  var disposable = this.source.run(new TimeWindowSink(min, max, sink), scheduler)

  return __WEBPACK_IMPORTED_MODULE_2__disposable_dispose__["a" /* all */]([min, max, disposable])
}

function Bound (value, sink) {
  this.value = value
  this.sink = sink
}

Bound.prototype.error = __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__["a" /* default */].prototype.error
Bound.prototype.event = noop
Bound.prototype.end = noop
Bound.prototype.dispose = noop

function TimeWindowSink (min, max, sink) {
  this.min = min
  this.max = max
  this.sink = sink
}

TimeWindowSink.prototype.event = function (t, x) {
  if (t >= this.min.value && t < this.max.value) {
    this.sink.event(t, x)
  }
}

TimeWindowSink.prototype.error = __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__["a" /* default */].prototype.error
TimeWindowSink.prototype.end = __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__["a" /* default */].prototype.end

function LowerBound (signal, sink, scheduler) {
  this.value = Infinity
  this.sink = sink
  this.disposable = signal.run(this, scheduler)
}

LowerBound.prototype.event = function (t /*, x */) {
  if (t < this.value) {
    this.value = t
  }
}

LowerBound.prototype.end = noop
LowerBound.prototype.error = __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__["a" /* default */].prototype.error

LowerBound.prototype.dispose = function () {
  return this.disposable.dispose()
}

function UpperBound (signal, sink, scheduler) {
  this.value = Infinity
  this.sink = sink
  this.disposable = signal.run(this, scheduler)
}

UpperBound.prototype.event = function (t, x) {
  if (t < this.value) {
    this.value = t
    this.sink.end(t, x)
  }
}

UpperBound.prototype.end = noop
UpperBound.prototype.error = __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__["a" /* default */].prototype.error

UpperBound.prototype.dispose = function () {
  return this.disposable.dispose()
}

function noop () {}


/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = delay;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__disposable_dispose__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__scheduler_PropagateTask__ = __webpack_require__(4);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */






/**
 * @param {Number} delayTime milliseconds to delay each item
 * @param {Stream} stream
 * @returns {Stream} new stream containing the same items, but delayed by ms
 */
function delay (delayTime, stream) {
  return delayTime <= 0 ? stream
    : new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new Delay(delayTime, stream.source))
}

function Delay (dt, source) {
  this.dt = dt
  this.source = source
}

Delay.prototype.run = function (sink, scheduler) {
  var delaySink = new DelaySink(this.dt, sink, scheduler)
  return __WEBPACK_IMPORTED_MODULE_2__disposable_dispose__["a" /* all */]([delaySink, this.source.run(delaySink, scheduler)])
}

function DelaySink (dt, sink, scheduler) {
  this.dt = dt
  this.sink = sink
  this.scheduler = scheduler
}

DelaySink.prototype.dispose = function () {
  var self = this
  this.scheduler.cancelAll(function (scheduledTask) {
    return scheduledTask.task.sink === self.sink
  })
}

DelaySink.prototype.event = function (t, x) {
  this.scheduler.delay(this.dt, __WEBPACK_IMPORTED_MODULE_3__scheduler_PropagateTask__["a" /* default */].event(x, this.sink))
}

DelaySink.prototype.end = function (t, x) {
  this.scheduler.delay(this.dt, __WEBPACK_IMPORTED_MODULE_3__scheduler_PropagateTask__["a" /* default */].end(x, this.sink))
}

DelaySink.prototype.error = __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__["a" /* default */].prototype.error


/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = timestamp;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__ = __webpack_require__(2);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */




function timestamp (stream) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new Timestamp(stream.source))
}

function Timestamp (source) {
  this.source = source
}

Timestamp.prototype.run = function (sink, scheduler) {
  return this.source.run(new TimestampSink(sink), scheduler)
}

function TimestampSink (sink) {
  this.sink = sink
}

TimestampSink.prototype.end = __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__["a" /* default */].prototype.end
TimestampSink.prototype.error = __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__["a" /* default */].prototype.error

TimestampSink.prototype.event = function (t, x) {
  this.sink.event(t, { time: t, value: x })
}


/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = throttle;
/* harmony export (immutable) */ __webpack_exports__["a"] = debounce;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scheduler_PropagateTask__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__fusion_Map__ = __webpack_require__(11);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */






/**
 * Limit the rate of events by suppressing events that occur too often
 * @param {Number} period time to suppress events
 * @param {Stream} stream
 * @returns {Stream}
 */
function throttle (period, stream) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](throttleSource(period, stream.source))
}

function throttleSource (period, source) {
  return source instanceof __WEBPACK_IMPORTED_MODULE_3__fusion_Map__["a" /* default */] ? commuteMapThrottle(period, source)
    : source instanceof Throttle ? fuseThrottle(period, source)
    : new Throttle(period, source)
}

function commuteMapThrottle (period, source) {
  return __WEBPACK_IMPORTED_MODULE_3__fusion_Map__["a" /* default */].create(source.f, throttleSource(period, source.source))
}

function fuseThrottle (period, source) {
  return new Throttle(Math.max(period, source.period), source.source)
}

function Throttle (period, source) {
  this.period = period
  this.source = source
}

Throttle.prototype.run = function (sink, scheduler) {
  return this.source.run(new ThrottleSink(this.period, sink), scheduler)
}

function ThrottleSink (period, sink) {
  this.time = 0
  this.period = period
  this.sink = sink
}

ThrottleSink.prototype.event = function (t, x) {
  if (t >= this.time) {
    this.time = t + this.period
    this.sink.event(t, x)
  }
}

ThrottleSink.prototype.end = __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__["a" /* default */].prototype.end

ThrottleSink.prototype.error = __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__["a" /* default */].prototype.error

/**
 * Wait for a burst of events to subside and emit only the last event in the burst
 * @param {Number} period events occuring more frequently than this
 *  will be suppressed
 * @param {Stream} stream stream to debounce
 * @returns {Stream} new debounced stream
 */
function debounce (period, stream) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new Debounce(period, stream.source))
}

function Debounce (dt, source) {
  this.dt = dt
  this.source = source
}

Debounce.prototype.run = function (sink, scheduler) {
  return new DebounceSink(this.dt, this.source, sink, scheduler)
}

function DebounceSink (dt, source, sink, scheduler) {
  this.dt = dt
  this.sink = sink
  this.scheduler = scheduler
  this.value = void 0
  this.timer = null
  this.disposable = source.run(this, scheduler)
}

DebounceSink.prototype.event = function (t, x) {
  this._clearTimer()
  this.value = x
  this.timer = this.scheduler.delay(this.dt, __WEBPACK_IMPORTED_MODULE_2__scheduler_PropagateTask__["a" /* default */].event(x, this.sink))
}

DebounceSink.prototype.end = function (t, x) {
  if (this._clearTimer()) {
    this.sink.event(t, this.value)
    this.value = void 0
  }
  this.sink.end(t, x)
}

DebounceSink.prototype.error = function (t, x) {
  this._clearTimer()
  this.sink.error(t, x)
}

DebounceSink.prototype.dispose = function () {
  this._clearTimer()
  return this.disposable.dispose()
}

DebounceSink.prototype._clearTimer = function () {
  if (this.timer === null) {
    return false
  }
  this.timer.dispose()
  this.timer = null
  return true
}


/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = fromPromise;
/* harmony export (immutable) */ __webpack_exports__["a"] = awaitPromises;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fatalError__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__source_core__ = __webpack_require__(5);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */





/**
 * Create a stream containing only the promise's fulfillment
 * value at the time it fulfills.
 * @param {Promise<T>} p promise
 * @return {Stream<T>} stream containing promise's fulfillment value.
 *  If the promise rejects, the stream will error
 */
function fromPromise (p) {
  return awaitPromises(Object(__WEBPACK_IMPORTED_MODULE_2__source_core__["c" /* of */])(p))
}

/**
 * Turn a Stream<Promise<T>> into Stream<T> by awaiting each promise.
 * Event order is preserved.
 * @param {Stream<Promise<T>>} stream
 * @return {Stream<T>} stream of fulfillment values.  The stream will
 * error if any promise rejects.
 */
function awaitPromises (stream) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new Await(stream.source))
}

function Await (source) {
  this.source = source
}

Await.prototype.run = function (sink, scheduler) {
  return this.source.run(new AwaitSink(sink, scheduler), scheduler)
}

function AwaitSink (sink, scheduler) {
  this.sink = sink
  this.scheduler = scheduler
  this.queue = Promise.resolve()
  var self = this

	// Pre-create closures, to avoid creating them per event
  this._eventBound = function (x) {
    self.sink.event(self.scheduler.now(), x)
  }

  this._endBound = function (x) {
    self.sink.end(self.scheduler.now(), x)
  }

  this._errorBound = function (e) {
    self.sink.error(self.scheduler.now(), e)
  }
}

AwaitSink.prototype.event = function (t, promise) {
  var self = this
  this.queue = this.queue.then(function () {
    return self._event(promise)
  }).catch(this._errorBound)
}

AwaitSink.prototype.end = function (t, x) {
  var self = this
  this.queue = this.queue.then(function () {
    return self._end(x)
  }).catch(this._errorBound)
}

AwaitSink.prototype.error = function (t, e) {
  var self = this
  // Don't resolve error values, propagate directly
  this.queue = this.queue.then(function () {
    return self._errorBound(e)
  }).catch(__WEBPACK_IMPORTED_MODULE_1__fatalError__["a" /* default */])
}

AwaitSink.prototype._event = function (promise) {
  return promise.then(this._eventBound)
}

AwaitSink.prototype._end = function (x) {
  return Promise.resolve(x).then(this._endBound)
}


/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = recoverWith;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return flatMapError; });
/* harmony export (immutable) */ __webpack_exports__["c"] = throwError;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sink_SafeSink__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__disposable_dispose__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__source_tryEvent__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__scheduler_PropagateTask__ = __webpack_require__(4);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */







/**
 * If stream encounters an error, recover and continue with items from stream
 * returned by f.
 * @param {function(error:*):Stream} f function which returns a new stream
 * @param {Stream} stream
 * @returns {Stream} new stream which will recover from an error by calling f
 */
function recoverWith (f, stream) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new RecoverWith(f, stream.source))
}

var flatMapError = recoverWith

/**
 * Create a stream containing only an error
 * @param {*} e error value, preferably an Error or Error subtype
 * @returns {Stream} new stream containing only an error
 */
function throwError (e) {
  return new __WEBPACK_IMPORTED_MODULE_0__Stream__["a" /* default */](new ErrorSource(e))
}

function ErrorSource (e) {
  this.value = e
}

ErrorSource.prototype.run = function (sink, scheduler) {
  return scheduler.asap(new __WEBPACK_IMPORTED_MODULE_4__scheduler_PropagateTask__["a" /* default */](runError, this.value, sink))
}

function runError (t, e, sink) {
  sink.error(t, e)
}

function RecoverWith (f, source) {
  this.f = f
  this.source = source
}

RecoverWith.prototype.run = function (sink, scheduler) {
  return new RecoverWithSink(this.f, this.source, sink, scheduler)
}

function RecoverWithSink (f, source, sink, scheduler) {
  this.f = f
  this.sink = new __WEBPACK_IMPORTED_MODULE_1__sink_SafeSink__["a" /* default */](sink)
  this.scheduler = scheduler
  this.disposable = source.run(this, scheduler)
}

RecoverWithSink.prototype.event = function (t, x) {
  __WEBPACK_IMPORTED_MODULE_3__source_tryEvent__["b" /* tryEvent */](t, x, this.sink)
}

RecoverWithSink.prototype.end = function (t, x) {
  __WEBPACK_IMPORTED_MODULE_3__source_tryEvent__["a" /* tryEnd */](t, x, this.sink)
}

RecoverWithSink.prototype.error = function (t, e) {
  var nextSink = this.sink.disable()

  __WEBPACK_IMPORTED_MODULE_2__disposable_dispose__["f" /* tryDispose */](t, this.disposable, this.sink)
  this._startNext(t, e, nextSink)
}

RecoverWithSink.prototype._startNext = function (t, x, sink) {
  try {
    this.disposable = this._continue(this.f, x, sink)
  } catch (e) {
    sink.error(t, e)
  }
}

RecoverWithSink.prototype._continue = function (f, x, sink) {
  var stream = f(x)
  return stream.source.run(sink, this.scheduler)
}

RecoverWithSink.prototype.dispose = function () {
  return this.disposable.dispose()
}


/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = SafeSink;
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

function SafeSink (sink) {
  this.sink = sink
  this.active = true
}

SafeSink.prototype.event = function (t, x) {
  if (!this.active) {
    return
  }
  this.sink.event(t, x)
}

SafeSink.prototype.end = function (t, x) {
  if (!this.active) {
    return
  }
  this.disable()
  this.sink.end(t, x)
}

SafeSink.prototype.error = function (t, e) {
  this.disable()
  this.sink.error(t, e)
}

SafeSink.prototype.disable = function () {
  this.active = false
  return this.sink
}


/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MulticastSource */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__most_prelude__ = __webpack_require__(3);


var MulticastDisposable = function MulticastDisposable (source, sink) {
  this.source = source
  this.sink = sink
  this.disposed = false
};

MulticastDisposable.prototype.dispose = function dispose () {
  if (this.disposed) {
    return
  }
  this.disposed = true
  var remaining = this.source.remove(this.sink)
  return remaining === 0 && this.source._dispose()
};

function tryEvent (t, x, sink) {
  try {
    sink.event(t, x)
  } catch (e) {
    sink.error(t, e)
  }
}

function tryEnd (t, x, sink) {
  try {
    sink.end(t, x)
  } catch (e) {
    sink.error(t, e)
  }
}

var dispose = function (disposable) { return disposable.dispose(); }

var emptyDisposable = {
  dispose: function dispose$1 () {}
}

var MulticastSource = function MulticastSource (source) {
  this.source = source
  this.sinks = []
  this._disposable = emptyDisposable
};

MulticastSource.prototype.run = function run (sink, scheduler) {
  var n = this.add(sink)
  if (n === 1) {
    this._disposable = this.source.run(this, scheduler)
  }
  return new MulticastDisposable(this, sink)
};

MulticastSource.prototype._dispose = function _dispose () {
  var disposable = this._disposable
  this._disposable = emptyDisposable
  return Promise.resolve(disposable).then(dispose)
};

MulticastSource.prototype.add = function add (sink) {
  this.sinks = Object(__WEBPACK_IMPORTED_MODULE_0__most_prelude__["a" /* append */])(sink, this.sinks)
  return this.sinks.length
};

MulticastSource.prototype.remove = function remove$1 (sink) {
  var i = Object(__WEBPACK_IMPORTED_MODULE_0__most_prelude__["g" /* findIndex */])(sink, this.sinks)
  // istanbul ignore next
  if (i >= 0) {
    this.sinks = Object(__WEBPACK_IMPORTED_MODULE_0__most_prelude__["l" /* remove */])(i, this.sinks)
  }

  return this.sinks.length
};

MulticastSource.prototype.event = function event (time, value) {
  var s = this.sinks
  if (s.length === 1) {
    return s[0].event(time, value)
  }
  for (var i = 0; i < s.length; ++i) {
    tryEvent(time, value, s[i])
  }
};

MulticastSource.prototype.end = function end (time, value) {
  var s = this.sinks
  for (var i = 0; i < s.length; ++i) {
    tryEnd(time, value, s[i])
  }
};

MulticastSource.prototype.error = function error (time, err) {
  var s = this.sinks
  for (var i = 0; i < s.length; ++i) {
    s[i].error(time, err)
  }
};

function multicast (stream) {
  var source = stream.source
  return source instanceof MulticastSource
    ? stream
    : new stream.constructor(new MulticastSource(source))
}

/* harmony default export */ __webpack_exports__["a"] = (multicast);
//# sourceMappingURL=multicast.es.js.map


/***/ }),
/* 83 */
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
/* 84 */
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
/* 85 */
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
/* 86 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmY2Y2Q0NTlmMWE1YmUxYTk1OTciLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL1N0cmVhbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvZGlzcG9zYWJsZS9kaXNwb3NlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zaW5rL1BpcGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Btb3N0L3ByZWx1ZGUvZGlzdC9pbmRleC5lcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc2NoZWR1bGVyL1Byb3BhZ2F0ZVRhc2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NvdXJjZS9jb3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zb3VyY2UvdHJ5RXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvdHJhbnNmb3JtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9mYXRhbEVycm9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zY2hlZHVsZXIvZGVmYXVsdFNjaGVkdWxlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvZnVzaW9uL01hcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc2luay9JbmRleFNpbmsuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2ludm9rZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9tZXJnZUNvbmN1cnJlbnRseS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vZXMvc25hYmJkb20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL2VzL3Zub2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9lcy9pcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vZXMvaC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9ydW5Tb3VyY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2Z1c2lvbi9GaWx0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvY29udGludWVXaXRoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL2NvbWJpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvZmxhdE1hcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL2VzL2h0bWxkb21hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL2VzL3RodW5rLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NvdW50ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9kaXNwb3NhYmxlL0Rpc3Bvc2FibGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2Rpc3Bvc2FibGUvU2V0dGFibGVEaXNwb3NhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9Qcm9taXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zb3VyY2UvZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc291cmNlL2Zyb21BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc291cmNlL2Zyb21JdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvb2JzZXJ2YWJsZS9nZXRPYnNlcnZhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zeW1ib2wtb2JzZXJ2YWJsZS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zeW1ib2wtb2JzZXJ2YWJsZS9saWIvcG9ueWZpbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL29ic2VydmFibGUvZnJvbU9ic2VydmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NvdXJjZS9wZXJpb2RpYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvb2JzZXJ2YWJsZS9zdWJzY3JpYmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NjaGVkdWxlci9TY2hlZHVsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NjaGVkdWxlci9TY2hlZHVsZWRUYXNrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zY2hlZHVsZXIvQ2xvY2tUaW1lci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc2NoZWR1bGVyL1RpbWVsaW5lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL3RocnUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NvdXJjZS9mcm9tRXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NvdXJjZS9FdmVudFRhcmdldFNvdXJjZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc291cmNlL0V2ZW50RW1pdHRlclNvdXJjZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc2luay9EZWZlcnJlZFNpbmsuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3Ivb2JzZXJ2ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvZnVzaW9uL0ZpbHRlck1hcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9sb29wLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL2FjY3VtdWxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NvdXJjZS91bmZvbGQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NvdXJjZS9pdGVyYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zb3VyY2UvZ2VuZXJhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvYnVpbGQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvYXBwbGljYXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvdHJhbnNkdWNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9MaW5rZWRMaXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL2NvbmNhdE1hcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9tZXJnZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9zYW1wbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvemlwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9RdWV1ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9zd2l0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvZmlsdGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL3NsaWNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL3RpbWVzbGljZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9kZWxheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci90aW1lc3RhbXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvbGltaXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvcHJvbWlzZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvZXJyb3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zaW5rL1NhZmVTaW5rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbW9zdC9tdWx0aWNhc3QvZGlzdC9tdWx0aWNhc3QuZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL21vZHVsZXMvY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL21vZHVsZXMvZXZlbnRsaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL21vZHVsZXMvYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vbW9kdWxlcy9wcm9wcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDN0RBO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNvQjtBQUNwQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLG1CQUFtQjtBQUMvQixZQUFZ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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVRO0FBQ1I7Ozs7Ozs7OztBQ2hSQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNyREE7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLEVBQUU7QUFDYixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7O0FDbkVBO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xCQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QixXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVLEVBQUU7QUFDWixVQUFVLE9BQU87QUFDakIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQSxVQUFVLGdCQUFnQjtBQUMxQjtBQUNBLFVBQVUsT0FBTztBQUNqQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUM5REE7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7O0FDUkE7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7Ozs7Ozs7QUNWQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDZEE7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxjQUFjO0FBQ3pCLFlBQVksY0FBYztBQUMxQixhQUFhLGNBQWM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxnREFBZ0Q7QUFDaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNoREE7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsOEJBQThCO0FBQ2xEOztBQUVBOzs7Ozs7OztBQzdCQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hCQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDeUI7O0FBRXpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7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Ozs7Ozs7QUN6QkE7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDc0I7QUFDdEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUM3QkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSw0QkFBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztzRENwQkE7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7O0FBRUEsc0NBQXNDLHVDQUF1QyxrQkFBa0I7O0FBRS9GLFNBQVM7OztBQUdUO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBLDRCOzs7Ozs7O0FDNUJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDOzs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNyQkE7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUN0QkE7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUMyQjs7QUFFM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDOUNBO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLEVBQUU7QUFDYixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDeEJBO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN6RUE7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDa0I7O0FBRWxCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFD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QTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2pOQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDZTs7QUFFZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUMvR0E7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ2xEQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCLG9CQUFvQjtBQUMxQzs7Ozs7Ozs7Ozs7OztBQzVCQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3ZIQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ3FCOztBQUVyQjtBQUNBO0FBQ0E7QUFDQSxXQUFXLFdBQVc7QUFDdEIsWUFBWSxVQUFVO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsWUFBWSxVQUFVO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQzs7Ozs7OztBQzlGQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQSxzQzs7Ozs7OztBQ3REQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBLGlDIiwiZmlsZSI6ImJ1aWxkL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI2KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmZjZjZDQ1OWYxYTViZTFhOTU5NyIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdHJlYW0gKHNvdXJjZSkge1xuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxufVxuXG5TdHJlYW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgcmV0dXJuIHRoaXMuc291cmNlLnJ1bihzaW5rLCBzY2hlZHVsZXIpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9TdHJlYW0uanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5pbXBvcnQgRGlzcG9zYWJsZSBmcm9tICcuL0Rpc3Bvc2FibGUnXG5pbXBvcnQgU2V0dGFibGVEaXNwb3NhYmxlIGZyb20gJy4vU2V0dGFibGVEaXNwb3NhYmxlJ1xuaW1wb3J0IHsgaXNQcm9taXNlIH0gZnJvbSAnLi4vUHJvbWlzZSdcbmltcG9ydCAqIGFzIGJhc2UgZnJvbSAnQG1vc3QvcHJlbHVkZSdcblxudmFyIG1hcCA9IGJhc2UubWFwXG52YXIgaWRlbnRpdHkgPSBiYXNlLmlkXG5cbi8qKlxuICogQ2FsbCBkaXNwb3NhYmxlLmRpc3Bvc2UuICBJZiBpdCByZXR1cm5zIGEgcHJvbWlzZSwgY2F0Y2ggcHJvbWlzZVxuICogZXJyb3IgYW5kIGZvcndhcmQgaXQgdGhyb3VnaCB0aGUgcHJvdmlkZWQgc2luay5cbiAqIEBwYXJhbSB7bnVtYmVyfSB0IHRpbWVcbiAqIEBwYXJhbSB7e2Rpc3Bvc2U6IGZ1bmN0aW9ufX0gZGlzcG9zYWJsZVxuICogQHBhcmFtIHt7ZXJyb3I6IGZ1bmN0aW9ufX0gc2lua1xuICogQHJldHVybiB7Kn0gcmVzdWx0IG9mIGRpc3Bvc2FibGUuZGlzcG9zZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJ5RGlzcG9zZSAodCwgZGlzcG9zYWJsZSwgc2luaykge1xuICB2YXIgcmVzdWx0ID0gZGlzcG9zZVNhZmVseShkaXNwb3NhYmxlKVxuICByZXR1cm4gaXNQcm9taXNlKHJlc3VsdClcbiAgICA/IHJlc3VsdC5jYXRjaChmdW5jdGlvbiAoZSkge1xuICAgICAgc2luay5lcnJvcih0LCBlKVxuICAgIH0pXG4gICAgOiByZXN1bHRcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgRGlzcG9zYWJsZSB3aGljaCB3aWxsIGRpc3Bvc2UgaXRzIHVuZGVybHlpbmcgcmVzb3VyY2VcbiAqIGF0IG1vc3Qgb25jZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGRpc3Bvc2UgZnVuY3Rpb25cbiAqIEBwYXJhbSB7Kj99IGRhdGEgYW55IGRhdGEgdG8gYmUgcGFzc2VkIHRvIGRpc3Bvc2VyIGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtEaXNwb3NhYmxlfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlIChkaXNwb3NlLCBkYXRhKSB7XG4gIHJldHVybiBvbmNlKG5ldyBEaXNwb3NhYmxlKGRpc3Bvc2UsIGRhdGEpKVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIG5vb3AgZGlzcG9zYWJsZS4gQ2FuIGJlIHVzZWQgdG8gc2F0aXNmeSBhIERpc3Bvc2FibGVcbiAqIHJlcXVpcmVtZW50IHdoZW4gbm8gYWN0dWFsIHJlc291cmNlIG5lZWRzIHRvIGJlIGRpc3Bvc2VkLlxuICogQHJldHVybiB7RGlzcG9zYWJsZXxleHBvcnRzfG1vZHVsZS5leHBvcnRzfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZW1wdHkgKCkge1xuICByZXR1cm4gbmV3IERpc3Bvc2FibGUoaWRlbnRpdHksIHZvaWQgMClcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBkaXNwb3NhYmxlIHRoYXQgd2lsbCBkaXNwb3NlIGFsbCBpbnB1dCBkaXNwb3NhYmxlcyBpbiBwYXJhbGxlbC5cbiAqIEBwYXJhbSB7QXJyYXk8RGlzcG9zYWJsZT59IGRpc3Bvc2FibGVzXG4gKiBAcmV0dXJuIHtEaXNwb3NhYmxlfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYWxsIChkaXNwb3NhYmxlcykge1xuICByZXR1cm4gY3JlYXRlKGRpc3Bvc2VBbGwsIGRpc3Bvc2FibGVzKVxufVxuXG5mdW5jdGlvbiBkaXNwb3NlQWxsIChkaXNwb3NhYmxlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwobWFwKGRpc3Bvc2VTYWZlbHksIGRpc3Bvc2FibGVzKSlcbn1cblxuZnVuY3Rpb24gZGlzcG9zZVNhZmVseSAoZGlzcG9zYWJsZSkge1xuICB0cnkge1xuICAgIHJldHVybiBkaXNwb3NhYmxlLmRpc3Bvc2UoKVxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGUpXG4gIH1cbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBkaXNwb3NhYmxlIGZyb20gYSBwcm9taXNlIGZvciBhbm90aGVyIGRpc3Bvc2FibGVcbiAqIEBwYXJhbSB7UHJvbWlzZTxEaXNwb3NhYmxlPn0gZGlzcG9zYWJsZVByb21pc2VcbiAqIEByZXR1cm4ge0Rpc3Bvc2FibGV9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9taXNlZCAoZGlzcG9zYWJsZVByb21pc2UpIHtcbiAgcmV0dXJuIGNyZWF0ZShkaXNwb3NlUHJvbWlzZSwgZGlzcG9zYWJsZVByb21pc2UpXG59XG5cbmZ1bmN0aW9uIGRpc3Bvc2VQcm9taXNlIChkaXNwb3NhYmxlUHJvbWlzZSkge1xuICByZXR1cm4gZGlzcG9zYWJsZVByb21pc2UudGhlbihkaXNwb3NlT25lKVxufVxuXG5mdW5jdGlvbiBkaXNwb3NlT25lIChkaXNwb3NhYmxlKSB7XG4gIHJldHVybiBkaXNwb3NhYmxlLmRpc3Bvc2UoKVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIGRpc3Bvc2FibGUgcHJveHkgdGhhdCBhbGxvd3MgaXRzIHVuZGVybHlpbmcgZGlzcG9zYWJsZSB0b1xuICogYmUgc2V0IGxhdGVyLlxuICogQHJldHVybiB7U2V0dGFibGVEaXNwb3NhYmxlfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0dGFibGUgKCkge1xuICByZXR1cm4gbmV3IFNldHRhYmxlRGlzcG9zYWJsZSgpXG59XG5cbi8qKlxuICogV3JhcCBhbiBleGlzdGluZyBkaXNwb3NhYmxlICh3aGljaCBtYXkgbm90IGFscmVhZHkgaGF2ZSBiZWVuIG9uY2UoKWQpXG4gKiBzbyB0aGF0IGl0IHdpbGwgb25seSBkaXNwb3NlIGl0cyB1bmRlcmx5aW5nIHJlc291cmNlIGF0IG1vc3Qgb25jZS5cbiAqIEBwYXJhbSB7eyBkaXNwb3NlOiBmdW5jdGlvbigpIH19IGRpc3Bvc2FibGVcbiAqIEByZXR1cm4ge0Rpc3Bvc2FibGV9IHdyYXBwZWQgZGlzcG9zYWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gb25jZSAoZGlzcG9zYWJsZSkge1xuICByZXR1cm4gbmV3IERpc3Bvc2FibGUoZGlzcG9zZU1lbW9pemVkLCBtZW1vaXplZChkaXNwb3NhYmxlKSlcbn1cblxuZnVuY3Rpb24gZGlzcG9zZU1lbW9pemVkIChtZW1vaXplZCkge1xuICBpZiAoIW1lbW9pemVkLmRpc3Bvc2VkKSB7XG4gICAgbWVtb2l6ZWQuZGlzcG9zZWQgPSB0cnVlXG4gICAgbWVtb2l6ZWQudmFsdWUgPSBkaXNwb3NlU2FmZWx5KG1lbW9pemVkLmRpc3Bvc2FibGUpXG4gICAgbWVtb2l6ZWQuZGlzcG9zYWJsZSA9IHZvaWQgMFxuICB9XG5cbiAgcmV0dXJuIG1lbW9pemVkLnZhbHVlXG59XG5cbmZ1bmN0aW9uIG1lbW9pemVkIChkaXNwb3NhYmxlKSB7XG4gIHJldHVybiB7IGRpc3Bvc2VkOiBmYWxzZSwgZGlzcG9zYWJsZTogZGlzcG9zYWJsZSwgdmFsdWU6IHZvaWQgMCB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9kaXNwb3NhYmxlL2Rpc3Bvc2UuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbi8qKlxuICogQSBzaW5rIG1peGluIHRoYXQgc2ltcGx5IGZvcndhcmRzIGV2ZW50LCBlbmQsIGFuZCBlcnJvciB0b1xuICogYW5vdGhlciBzaW5rLlxuICogQHBhcmFtIHNpbmtcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQaXBlIChzaW5rKSB7XG4gIHRoaXMuc2luayA9IHNpbmtcbn1cblxuUGlwZS5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgeCkge1xuICByZXR1cm4gdGhpcy5zaW5rLmV2ZW50KHQsIHgpXG59XG5cblBpcGUucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHJldHVybiB0aGlzLnNpbmsuZW5kKHQsIHgpXG59XG5cblBpcGUucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKHQsIGUpIHtcbiAgcmV0dXJuIHRoaXMuc2luay5lcnJvcih0LCBlKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc2luay9QaXBlLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuXG4vLyBOb24tbXV0YXRpbmcgYXJyYXkgb3BlcmF0aW9uc1xuXG4vLyBjb25zIDo6IGEgLT4gW2FdIC0+IFthXVxuLy8gYSB3aXRoIHggcHJlcGVuZGVkXG5mdW5jdGlvbiBjb25zKHgsIGEpIHtcbiAgdmFyIGwgPSBhLmxlbmd0aDtcbiAgdmFyIGIgPSBuZXcgQXJyYXkobCArIDEpO1xuICBiWzBdID0geDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyArK2kpIHtcbiAgICBiW2kgKyAxXSA9IGFbaV07XG4gIH1cbiAgcmV0dXJuIGI7XG59XG5cbi8vIGFwcGVuZCA6OiBhIC0+IFthXSAtPiBbYV1cbi8vIGEgd2l0aCB4IGFwcGVuZGVkXG5mdW5jdGlvbiBhcHBlbmQoeCwgYSkge1xuICB2YXIgbCA9IGEubGVuZ3RoO1xuICB2YXIgYiA9IG5ldyBBcnJheShsICsgMSk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgKytpKSB7XG4gICAgYltpXSA9IGFbaV07XG4gIH1cblxuICBiW2xdID0geDtcbiAgcmV0dXJuIGI7XG59XG5cbi8vIGRyb3AgOjogSW50IC0+IFthXSAtPiBbYV1cbi8vIGRyb3AgZmlyc3QgbiBlbGVtZW50c1xuZnVuY3Rpb24gZHJvcChuLCBhKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY29tcGxleGl0eVxuICBpZiAobiA8IDApIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCduIG11c3QgYmUgPj0gMCcpO1xuICB9XG5cbiAgdmFyIGwgPSBhLmxlbmd0aDtcbiAgaWYgKG4gPT09IDAgfHwgbCA9PT0gMCkge1xuICAgIHJldHVybiBhO1xuICB9XG5cbiAgaWYgKG4gPj0gbCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHJldHVybiB1bnNhZmVEcm9wKG4sIGEsIGwgLSBuKTtcbn1cblxuLy8gdW5zYWZlRHJvcCA6OiBJbnQgLT4gW2FdIC0+IEludCAtPiBbYV1cbi8vIEludGVybmFsIGhlbHBlciBmb3IgZHJvcFxuZnVuY3Rpb24gdW5zYWZlRHJvcChuLCBhLCBsKSB7XG4gIHZhciBiID0gbmV3IEFycmF5KGwpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGw7ICsraSkge1xuICAgIGJbaV0gPSBhW24gKyBpXTtcbiAgfVxuICByZXR1cm4gYjtcbn1cblxuLy8gdGFpbCA6OiBbYV0gLT4gW2FdXG4vLyBkcm9wIGhlYWQgZWxlbWVudFxuZnVuY3Rpb24gdGFpbChhKSB7XG4gIHJldHVybiBkcm9wKDEsIGEpO1xufVxuXG4vLyBjb3B5IDo6IFthXSAtPiBbYV1cbi8vIGR1cGxpY2F0ZSBhIChzaGFsbG93IGR1cGxpY2F0aW9uKVxuZnVuY3Rpb24gY29weShhKSB7XG4gIHZhciBsID0gYS5sZW5ndGg7XG4gIHZhciBiID0gbmV3IEFycmF5KGwpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGw7ICsraSkge1xuICAgIGJbaV0gPSBhW2ldO1xuICB9XG4gIHJldHVybiBiO1xufVxuXG4vLyBtYXAgOjogKGEgLT4gYikgLT4gW2FdIC0+IFtiXVxuLy8gdHJhbnNmb3JtIGVhY2ggZWxlbWVudCB3aXRoIGZcbmZ1bmN0aW9uIG1hcChmLCBhKSB7XG4gIHZhciBsID0gYS5sZW5ndGg7XG4gIHZhciBiID0gbmV3IEFycmF5KGwpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGw7ICsraSkge1xuICAgIGJbaV0gPSBmKGFbaV0pO1xuICB9XG4gIHJldHVybiBiO1xufVxuXG4vLyByZWR1Y2UgOjogKGEgLT4gYiAtPiBhKSAtPiBhIC0+IFtiXSAtPiBhXG4vLyBhY2N1bXVsYXRlIHZpYSBsZWZ0LWZvbGRcbmZ1bmN0aW9uIHJlZHVjZShmLCB6LCBhKSB7XG4gIHZhciByID0gejtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIHIgPSBmKHIsIGFbaV0sIGkpO1xuICB9XG4gIHJldHVybiByO1xufVxuXG4vLyByZXBsYWNlIDo6IGEgLT4gSW50IC0+IFthXVxuLy8gcmVwbGFjZSBlbGVtZW50IGF0IGluZGV4XG5mdW5jdGlvbiByZXBsYWNlKHgsIGksIGEpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjb21wbGV4aXR5XG4gIGlmIChpIDwgMCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2kgbXVzdCBiZSA+PSAwJyk7XG4gIH1cblxuICB2YXIgbCA9IGEubGVuZ3RoO1xuICB2YXIgYiA9IG5ldyBBcnJheShsKTtcbiAgZm9yICh2YXIgaiA9IDA7IGogPCBsOyArK2opIHtcbiAgICBiW2pdID0gaSA9PT0gaiA/IHggOiBhW2pdO1xuICB9XG4gIHJldHVybiBiO1xufVxuXG4vLyByZW1vdmUgOjogSW50IC0+IFthXSAtPiBbYV1cbi8vIHJlbW92ZSBlbGVtZW50IGF0IGluZGV4XG5mdW5jdGlvbiByZW1vdmUoaSwgYSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNvbXBsZXhpdHlcbiAgaWYgKGkgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaSBtdXN0IGJlID49IDAnKTtcbiAgfVxuXG4gIHZhciBsID0gYS5sZW5ndGg7XG4gIGlmIChsID09PSAwIHx8IGkgPj0gbCkge1xuICAgIC8vIGV4aXQgZWFybHkgaWYgaW5kZXggYmV5b25kIGVuZCBvZiBhcnJheVxuICAgIHJldHVybiBhO1xuICB9XG5cbiAgaWYgKGwgPT09IDEpIHtcbiAgICAvLyBleGl0IGVhcmx5IGlmIGluZGV4IGluIGJvdW5kcyBhbmQgbGVuZ3RoID09PSAxXG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgcmV0dXJuIHVuc2FmZVJlbW92ZShpLCBhLCBsIC0gMSk7XG59XG5cbi8vIHVuc2FmZVJlbW92ZSA6OiBJbnQgLT4gW2FdIC0+IEludCAtPiBbYV1cbi8vIEludGVybmFsIGhlbHBlciB0byByZW1vdmUgZWxlbWVudCBhdCBpbmRleFxuZnVuY3Rpb24gdW5zYWZlUmVtb3ZlKGksIGEsIGwpIHtcbiAgdmFyIGIgPSBuZXcgQXJyYXkobCk7XG4gIHZhciBqID0gdm9pZCAwO1xuICBmb3IgKGogPSAwOyBqIDwgaTsgKytqKSB7XG4gICAgYltqXSA9IGFbal07XG4gIH1cbiAgZm9yIChqID0gaTsgaiA8IGw7ICsraikge1xuICAgIGJbal0gPSBhW2ogKyAxXTtcbiAgfVxuXG4gIHJldHVybiBiO1xufVxuXG4vLyByZW1vdmVBbGwgOjogKGEgLT4gYm9vbGVhbikgLT4gW2FdIC0+IFthXVxuLy8gcmVtb3ZlIGFsbCBlbGVtZW50cyBtYXRjaGluZyBhIHByZWRpY2F0ZVxuZnVuY3Rpb24gcmVtb3ZlQWxsKGYsIGEpIHtcbiAgdmFyIGwgPSBhLmxlbmd0aDtcbiAgdmFyIGIgPSBuZXcgQXJyYXkobCk7XG4gIHZhciBqID0gMDtcbiAgZm9yICh2YXIgeCwgaSA9IDA7IGkgPCBsOyArK2kpIHtcbiAgICB4ID0gYVtpXTtcbiAgICBpZiAoIWYoeCkpIHtcbiAgICAgIGJbal0gPSB4O1xuICAgICAgKytqO1xuICAgIH1cbiAgfVxuXG4gIGIubGVuZ3RoID0gajtcbiAgcmV0dXJuIGI7XG59XG5cbi8vIGZpbmRJbmRleCA6OiBhIC0+IFthXSAtPiBJbnRcbi8vIGZpbmQgaW5kZXggb2YgeCBpbiBhLCBmcm9tIHRoZSBsZWZ0XG5mdW5jdGlvbiBmaW5kSW5kZXgoeCwgYSkge1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGEubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgaWYgKHggPT09IGFbaV0pIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8vIGlzQXJyYXlMaWtlIDo6ICogLT4gYm9vbGVhblxuLy8gUmV0dXJuIHRydWUgaWZmIHggaXMgYXJyYXktbGlrZVxuZnVuY3Rpb24gaXNBcnJheUxpa2UoeCkge1xuICByZXR1cm4geCAhPSBudWxsICYmIHR5cGVvZiB4Lmxlbmd0aCA9PT0gJ251bWJlcicgJiYgdHlwZW9mIHggIT09ICdmdW5jdGlvbic7XG59XG5cbi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuXG4vLyBpZCA6OiBhIC0+IGFcbnZhciBpZCA9IGZ1bmN0aW9uIGlkKHgpIHtcbiAgcmV0dXJuIHg7XG59O1xuXG4vLyBjb21wb3NlIDo6IChiIC0+IGMpIC0+IChhIC0+IGIpIC0+IChhIC0+IGMpXG52YXIgY29tcG9zZSA9IGZ1bmN0aW9uIGNvbXBvc2UoZiwgZykge1xuICByZXR1cm4gZnVuY3Rpb24gKHgpIHtcbiAgICByZXR1cm4gZihnKHgpKTtcbiAgfTtcbn07XG5cbi8vIGFwcGx5IDo6IChhIC0+IGIpIC0+IGEgLT4gYlxudmFyIGFwcGx5ID0gZnVuY3Rpb24gYXBwbHkoZiwgeCkge1xuICByZXR1cm4gZih4KTtcbn07XG5cbi8vIGN1cnJ5MiA6OiAoKGEsIGIpIC0+IGMpIC0+IChhIC0+IGIgLT4gYylcbmZ1bmN0aW9uIGN1cnJ5MihmKSB7XG4gIGZ1bmN0aW9uIGN1cnJpZWQoYSwgYikge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICByZXR1cm4gY3VycmllZDtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChiKSB7XG4gICAgICAgICAgcmV0dXJuIGYoYSwgYik7XG4gICAgICAgIH07XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZihhLCBiKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGN1cnJpZWQ7XG59XG5cbi8vIGN1cnJ5MyA6OiAoKGEsIGIsIGMpIC0+IGQpIC0+IChhIC0+IGIgLT4gYyAtPiBkKVxuZnVuY3Rpb24gY3VycnkzKGYpIHtcbiAgZnVuY3Rpb24gY3VycmllZChhLCBiLCBjKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjb21wbGV4aXR5XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHJldHVybiBjdXJyaWVkO1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gY3VycnkyKGZ1bmN0aW9uIChiLCBjKSB7XG4gICAgICAgICAgcmV0dXJuIGYoYSwgYiwgYyk7XG4gICAgICAgIH0pO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICByZXR1cm4gZihhLCBiLCBjKTtcbiAgICAgICAgfTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmKGEsIGIsIGMpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY3VycmllZDtcbn1cblxuLy8gY3Vycnk0IDo6ICgoYSwgYiwgYywgZCkgLT4gZSkgLT4gKGEgLT4gYiAtPiBjIC0+IGQgLT4gZSlcbmZ1bmN0aW9uIGN1cnJ5NChmKSB7XG4gIGZ1bmN0aW9uIGN1cnJpZWQoYSwgYiwgYywgZCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY29tcGxleGl0eVxuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICByZXR1cm4gY3VycmllZDtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIGN1cnJ5MyhmdW5jdGlvbiAoYiwgYywgZCkge1xuICAgICAgICAgIHJldHVybiBmKGEsIGIsIGMsIGQpO1xuICAgICAgICB9KTtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIGN1cnJ5MihmdW5jdGlvbiAoYywgZCkge1xuICAgICAgICAgIHJldHVybiBmKGEsIGIsIGMsIGQpO1xuICAgICAgICB9KTtcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgcmV0dXJuIGYoYSwgYiwgYywgZCk7XG4gICAgICAgIH07XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZihhLCBiLCBjLCBkKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGN1cnJpZWQ7XG59XG5cbi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cblxuZXhwb3J0IHsgY29ucywgYXBwZW5kLCBkcm9wLCB0YWlsLCBjb3B5LCBtYXAsIHJlZHVjZSwgcmVwbGFjZSwgcmVtb3ZlLCByZW1vdmVBbGwsIGZpbmRJbmRleCwgaXNBcnJheUxpa2UsIGlkLCBjb21wb3NlLCBhcHBseSwgY3VycnkyLCBjdXJyeTMsIGN1cnJ5NCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguZXMuanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AbW9zdC9wcmVsdWRlL2Rpc3QvaW5kZXguZXMuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBmYXRhbCBmcm9tICcuLi9mYXRhbEVycm9yJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQcm9wYWdhdGVUYXNrIChydW4sIHZhbHVlLCBzaW5rKSB7XG4gIHRoaXMuX3J1biA9IHJ1blxuICB0aGlzLnZhbHVlID0gdmFsdWVcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLmFjdGl2ZSA9IHRydWVcbn1cblxuUHJvcGFnYXRlVGFzay5ldmVudCA9IGZ1bmN0aW9uICh2YWx1ZSwgc2luaykge1xuICByZXR1cm4gbmV3IFByb3BhZ2F0ZVRhc2soZW1pdCwgdmFsdWUsIHNpbmspXG59XG5cblByb3BhZ2F0ZVRhc2suZW5kID0gZnVuY3Rpb24gKHZhbHVlLCBzaW5rKSB7XG4gIHJldHVybiBuZXcgUHJvcGFnYXRlVGFzayhlbmQsIHZhbHVlLCBzaW5rKVxufVxuXG5Qcm9wYWdhdGVUYXNrLmVycm9yID0gZnVuY3Rpb24gKHZhbHVlLCBzaW5rKSB7XG4gIHJldHVybiBuZXcgUHJvcGFnYXRlVGFzayhlcnJvciwgdmFsdWUsIHNpbmspXG59XG5cblByb3BhZ2F0ZVRhc2sucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuYWN0aXZlID0gZmFsc2Vcbn1cblxuUHJvcGFnYXRlVGFzay5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHQpIHtcbiAgaWYgKCF0aGlzLmFjdGl2ZSkge1xuICAgIHJldHVyblxuICB9XG4gIHRoaXMuX3J1bih0LCB0aGlzLnZhbHVlLCB0aGlzLnNpbmspXG59XG5cblByb3BhZ2F0ZVRhc2sucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKHQsIGUpIHtcbiAgaWYgKCF0aGlzLmFjdGl2ZSkge1xuICAgIHJldHVybiBmYXRhbChlKVxuICB9XG4gIHRoaXMuc2luay5lcnJvcih0LCBlKVxufVxuXG5mdW5jdGlvbiBlcnJvciAodCwgZSwgc2luaykge1xuICBzaW5rLmVycm9yKHQsIGUpXG59XG5cbmZ1bmN0aW9uIGVtaXQgKHQsIHgsIHNpbmspIHtcbiAgc2luay5ldmVudCh0LCB4KVxufVxuXG5mdW5jdGlvbiBlbmQgKHQsIHgsIHNpbmspIHtcbiAgc2luay5lbmQodCwgeClcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NjaGVkdWxlci9Qcm9wYWdhdGVUYXNrLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCAqIGFzIGRpc3Bvc2UgZnJvbSAnLi4vZGlzcG9zYWJsZS9kaXNwb3NlJ1xuaW1wb3J0IFByb3BhZ2F0ZVRhc2sgZnJvbSAnLi4vc2NoZWR1bGVyL1Byb3BhZ2F0ZVRhc2snXG5cbi8qKlxuICogU3RyZWFtIGNvbnRhaW5pbmcgb25seSB4XG4gKiBAcGFyYW0geyp9IHhcbiAqIEByZXR1cm5zIHtTdHJlYW19XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvZiAoeCkge1xuICByZXR1cm4gbmV3IFN0cmVhbShuZXcgSnVzdCh4KSlcbn1cblxuZnVuY3Rpb24gSnVzdCAoeCkge1xuICB0aGlzLnZhbHVlID0geFxufVxuXG5KdXN0LnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHJldHVybiBzY2hlZHVsZXIuYXNhcChuZXcgUHJvcGFnYXRlVGFzayhydW5KdXN0LCB0aGlzLnZhbHVlLCBzaW5rKSlcbn1cblxuZnVuY3Rpb24gcnVuSnVzdCAodCwgeCwgc2luaykge1xuICBzaW5rLmV2ZW50KHQsIHgpXG4gIHNpbmsuZW5kKHQsIHZvaWQgMClcbn1cblxuLyoqXG4gKiBTdHJlYW0gY29udGFpbmluZyBubyBldmVudHMgYW5kIGVuZHMgaW1tZWRpYXRlbHlcbiAqIEByZXR1cm5zIHtTdHJlYW19XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbXB0eSAoKSB7XG4gIHJldHVybiBFTVBUWVxufVxuXG5mdW5jdGlvbiBFbXB0eVNvdXJjZSAoKSB7fVxuXG5FbXB0eVNvdXJjZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICB2YXIgdGFzayA9IFByb3BhZ2F0ZVRhc2suZW5kKHZvaWQgMCwgc2luaylcbiAgc2NoZWR1bGVyLmFzYXAodGFzaylcblxuICByZXR1cm4gZGlzcG9zZS5jcmVhdGUoZGlzcG9zZUVtcHR5LCB0YXNrKVxufVxuXG5mdW5jdGlvbiBkaXNwb3NlRW1wdHkgKHRhc2spIHtcbiAgcmV0dXJuIHRhc2suZGlzcG9zZSgpXG59XG5cbnZhciBFTVBUWSA9IG5ldyBTdHJlYW0obmV3IEVtcHR5U291cmNlKCkpXG5cbi8qKlxuICogU3RyZWFtIGNvbnRhaW5pbmcgbm8gZXZlbnRzIGFuZCBuZXZlciBlbmRzXG4gKiBAcmV0dXJucyB7U3RyZWFtfVxuICovXG5leHBvcnQgZnVuY3Rpb24gbmV2ZXIgKCkge1xuICByZXR1cm4gTkVWRVJcbn1cblxuZnVuY3Rpb24gTmV2ZXJTb3VyY2UgKCkge31cblxuTmV2ZXJTb3VyY2UucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGRpc3Bvc2UuZW1wdHkoKVxufVxuXG52YXIgTkVWRVIgPSBuZXcgU3RyZWFtKG5ldyBOZXZlclNvdXJjZSgpKVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc291cmNlL2NvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmV4cG9ydCBmdW5jdGlvbiB0cnlFdmVudCAodCwgeCwgc2luaykge1xuICB0cnkge1xuICAgIHNpbmsuZXZlbnQodCwgeClcbiAgfSBjYXRjaCAoZSkge1xuICAgIHNpbmsuZXJyb3IodCwgZSlcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdHJ5RW5kICh0LCB4LCBzaW5rKSB7XG4gIHRyeSB7XG4gICAgc2luay5lbmQodCwgeClcbiAgfSBjYXRjaCAoZSkge1xuICAgIHNpbmsuZXJyb3IodCwgZSlcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc291cmNlL3RyeUV2ZW50LmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCBNYXAgZnJvbSAnLi4vZnVzaW9uL01hcCdcbmltcG9ydCBQaXBlIGZyb20gJy4uL3NpbmsvUGlwZSdcblxuLyoqXG4gKiBUcmFuc2Zvcm0gZWFjaCB2YWx1ZSBpbiB0aGUgc3RyZWFtIGJ5IGFwcGx5aW5nIGYgdG8gZWFjaFxuICogQHBhcmFtIHtmdW5jdGlvbigqKToqfSBmIG1hcHBpbmcgZnVuY3Rpb25cbiAqIEBwYXJhbSB7U3RyZWFtfSBzdHJlYW0gc3RyZWFtIHRvIG1hcFxuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIGNvbnRhaW5pbmcgaXRlbXMgdHJhbnNmb3JtZWQgYnkgZlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFwIChmLCBzdHJlYW0pIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0oTWFwLmNyZWF0ZShmLCBzdHJlYW0uc291cmNlKSlcbn1cblxuLyoqXG4qIFJlcGxhY2UgZWFjaCB2YWx1ZSBpbiB0aGUgc3RyZWFtIHdpdGggeFxuKiBAcGFyYW0geyp9IHhcbiogQHBhcmFtIHtTdHJlYW19IHN0cmVhbVxuKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gY29udGFpbmluZyBpdGVtcyByZXBsYWNlZCB3aXRoIHhcbiovXG5leHBvcnQgZnVuY3Rpb24gY29uc3RhbnQgKHgsIHN0cmVhbSkge1xuICByZXR1cm4gbWFwKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4geFxuICB9LCBzdHJlYW0pXG59XG5cbi8qKlxuKiBQZXJmb3JtIGEgc2lkZSBlZmZlY3QgZm9yIGVhY2ggaXRlbSBpbiB0aGUgc3RyZWFtXG4qIEBwYXJhbSB7ZnVuY3Rpb24oeDoqKToqfSBmIHNpZGUgZWZmZWN0IHRvIGV4ZWN1dGUgZm9yIGVhY2ggaXRlbS4gVGhlXG4qICByZXR1cm4gdmFsdWUgd2lsbCBiZSBkaXNjYXJkZWQuXG4qIEBwYXJhbSB7U3RyZWFtfSBzdHJlYW0gc3RyZWFtIHRvIHRhcFxuKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIGNvbnRhaW5pbmcgdGhlIHNhbWUgaXRlbXMgYXMgdGhpcyBzdHJlYW1cbiovXG5leHBvcnQgZnVuY3Rpb24gdGFwIChmLCBzdHJlYW0pIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IFRhcChmLCBzdHJlYW0uc291cmNlKSlcbn1cblxuZnVuY3Rpb24gVGFwIChmLCBzb3VyY2UpIHtcbiAgdGhpcy5zb3VyY2UgPSBzb3VyY2VcbiAgdGhpcy5mID0gZlxufVxuXG5UYXAucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgcmV0dXJuIHRoaXMuc291cmNlLnJ1bihuZXcgVGFwU2luayh0aGlzLmYsIHNpbmspLCBzY2hlZHVsZXIpXG59XG5cbmZ1bmN0aW9uIFRhcFNpbmsgKGYsIHNpbmspIHtcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLmYgPSBmXG59XG5cblRhcFNpbmsucHJvdG90eXBlLmVuZCA9IFBpcGUucHJvdG90eXBlLmVuZFxuVGFwU2luay5wcm90b3R5cGUuZXJyb3IgPSBQaXBlLnByb3RvdHlwZS5lcnJvclxuXG5UYXBTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHZhciBmID0gdGhpcy5mXG4gIGYoeClcbiAgdGhpcy5zaW5rLmV2ZW50KHQsIHgpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL3RyYW5zZm9ybS5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmF0YWxFcnJvciAoZSkge1xuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICB0aHJvdyBlXG4gIH0sIDApXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9mYXRhbEVycm9yLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU2NoZWR1bGVyIGZyb20gJy4vU2NoZWR1bGVyJ1xuaW1wb3J0IENsb2NrVGltZXIgZnJvbSAnLi9DbG9ja1RpbWVyJ1xuaW1wb3J0IFRpbWVsaW5lIGZyb20gJy4vVGltZWxpbmUnXG5cbnZhciBkZWZhdWx0U2NoZWR1bGVyID0gbmV3IFNjaGVkdWxlcihuZXcgQ2xvY2tUaW1lcigpLCBuZXcgVGltZWxpbmUoKSlcblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdFNjaGVkdWxlclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc2NoZWR1bGVyL2RlZmF1bHRTY2hlZHVsZXIuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZlciAodGFzaykge1xuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRhc2spLnRoZW4ocnVuVGFzaylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1blRhc2sgKHRhc2spIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gdGFzay5ydW4oKVxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRhc2suZXJyb3IoZSlcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvdGFzay5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBQaXBlIGZyb20gJy4uL3NpbmsvUGlwZSdcbmltcG9ydCBGaWx0ZXIgZnJvbSAnLi9GaWx0ZXInXG5pbXBvcnQgRmlsdGVyTWFwIGZyb20gJy4vRmlsdGVyTWFwJ1xuaW1wb3J0ICogYXMgYmFzZSBmcm9tICdAbW9zdC9wcmVsdWRlJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNYXAgKGYsIHNvdXJjZSkge1xuICB0aGlzLmYgPSBmXG4gIHRoaXMuc291cmNlID0gc291cmNlXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgbWFwcGVkIHNvdXJjZSwgZnVzaW5nIGFkamFjZW50IG1hcC5tYXAsIGZpbHRlci5tYXAsXG4gKiBhbmQgZmlsdGVyLm1hcC5tYXAgaWYgcG9zc2libGVcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKik6Kn0gZiBtYXBwaW5nIGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3tydW46ZnVuY3Rpb259fSBzb3VyY2Ugc291cmNlIHRvIG1hcFxuICogQHJldHVybnMge01hcHxGaWx0ZXJNYXB9IG1hcHBlZCBzb3VyY2UsIHBvc3NpYmx5IGZ1c2VkXG4gKi9cbk1hcC5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGVNYXAgKGYsIHNvdXJjZSkge1xuICBpZiAoc291cmNlIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgcmV0dXJuIG5ldyBNYXAoYmFzZS5jb21wb3NlKGYsIHNvdXJjZS5mKSwgc291cmNlLnNvdXJjZSlcbiAgfVxuXG4gIGlmIChzb3VyY2UgaW5zdGFuY2VvZiBGaWx0ZXIpIHtcbiAgICByZXR1cm4gbmV3IEZpbHRlck1hcChzb3VyY2UucCwgZiwgc291cmNlLnNvdXJjZSlcbiAgfVxuXG4gIHJldHVybiBuZXcgTWFwKGYsIHNvdXJjZSlcbn1cblxuTWFwLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZXh0ZW5kLW5hdGl2ZVxuICByZXR1cm4gdGhpcy5zb3VyY2UucnVuKG5ldyBNYXBTaW5rKHRoaXMuZiwgc2luayksIHNjaGVkdWxlcilcbn1cblxuZnVuY3Rpb24gTWFwU2luayAoZiwgc2luaykge1xuICB0aGlzLmYgPSBmXG4gIHRoaXMuc2luayA9IHNpbmtcbn1cblxuTWFwU2luay5wcm90b3R5cGUuZW5kID0gUGlwZS5wcm90b3R5cGUuZW5kXG5NYXBTaW5rLnByb3RvdHlwZS5lcnJvciA9IFBpcGUucHJvdG90eXBlLmVycm9yXG5cbk1hcFNpbmsucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgdmFyIGYgPSB0aGlzLmZcbiAgdGhpcy5zaW5rLmV2ZW50KHQsIGYoeCkpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9mdXNpb24vTWFwLmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFNpbmsgZnJvbSAnLi9QaXBlJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBJbmRleFNpbmsgKGksIHNpbmspIHtcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLmluZGV4ID0gaVxuICB0aGlzLmFjdGl2ZSA9IHRydWVcbiAgdGhpcy52YWx1ZSA9IHZvaWQgMFxufVxuXG5JbmRleFNpbmsucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgaWYgKCF0aGlzLmFjdGl2ZSkge1xuICAgIHJldHVyblxuICB9XG4gIHRoaXMudmFsdWUgPSB4XG4gIHRoaXMuc2luay5ldmVudCh0LCB0aGlzKVxufVxuXG5JbmRleFNpbmsucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIGlmICghdGhpcy5hY3RpdmUpIHtcbiAgICByZXR1cm5cbiAgfVxuICB0aGlzLmFjdGl2ZSA9IGZhbHNlXG4gIHRoaXMuc2luay5lbmQodCwgeyBpbmRleDogdGhpcy5pbmRleCwgdmFsdWU6IHggfSlcbn1cblxuSW5kZXhTaW5rLnByb3RvdHlwZS5lcnJvciA9IFNpbmsucHJvdG90eXBlLmVycm9yXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zaW5rL0luZGV4U2luay5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGludm9rZSAoZiwgYXJncykge1xuXHQvKmVzbGludCBjb21wbGV4aXR5OiBbMiw3XSovXG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiBmKClcbiAgICBjYXNlIDE6IHJldHVybiBmKGFyZ3NbMF0pXG4gICAgY2FzZSAyOiByZXR1cm4gZihhcmdzWzBdLCBhcmdzWzFdKVxuICAgIGNhc2UgMzogcmV0dXJuIGYoYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSlcbiAgICBjYXNlIDQ6IHJldHVybiBmKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pXG4gICAgY2FzZSA1OiByZXR1cm4gZihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdLCBhcmdzWzRdKVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZi5hcHBseSh2b2lkIDAsIGFyZ3MpXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2ludm9rZS5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBTdHJlYW0gZnJvbSAnLi4vU3RyZWFtJ1xuaW1wb3J0ICogYXMgZGlzcG9zZSBmcm9tICcuLi9kaXNwb3NhYmxlL2Rpc3Bvc2UnXG5pbXBvcnQgTGlua2VkTGlzdCBmcm9tICcuLi9MaW5rZWRMaXN0J1xuaW1wb3J0IHsgaWQgYXMgaWRlbnRpdHkgfSBmcm9tICdAbW9zdC9wcmVsdWRlJ1xuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VDb25jdXJyZW50bHkgKGNvbmN1cnJlbmN5LCBzdHJlYW0pIHtcbiAgcmV0dXJuIG1lcmdlTWFwQ29uY3VycmVudGx5KGlkZW50aXR5LCBjb25jdXJyZW5jeSwgc3RyZWFtKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VNYXBDb25jdXJyZW50bHkgKGYsIGNvbmN1cnJlbmN5LCBzdHJlYW0pIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IE1lcmdlQ29uY3VycmVudGx5KGYsIGNvbmN1cnJlbmN5LCBzdHJlYW0uc291cmNlKSlcbn1cblxuZnVuY3Rpb24gTWVyZ2VDb25jdXJyZW50bHkgKGYsIGNvbmN1cnJlbmN5LCBzb3VyY2UpIHtcbiAgdGhpcy5mID0gZlxuICB0aGlzLmNvbmN1cnJlbmN5ID0gY29uY3VycmVuY3lcbiAgdGhpcy5zb3VyY2UgPSBzb3VyY2Vcbn1cblxuTWVyZ2VDb25jdXJyZW50bHkucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgcmV0dXJuIG5ldyBPdXRlcih0aGlzLmYsIHRoaXMuY29uY3VycmVuY3ksIHRoaXMuc291cmNlLCBzaW5rLCBzY2hlZHVsZXIpXG59XG5cbmZ1bmN0aW9uIE91dGVyIChmLCBjb25jdXJyZW5jeSwgc291cmNlLCBzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdGhpcy5mID0gZlxuICB0aGlzLmNvbmN1cnJlbmN5ID0gY29uY3VycmVuY3lcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlclxuICB0aGlzLnBlbmRpbmcgPSBbXVxuICB0aGlzLmN1cnJlbnQgPSBuZXcgTGlua2VkTGlzdCgpXG4gIHRoaXMuZGlzcG9zYWJsZSA9IGRpc3Bvc2Uub25jZShzb3VyY2UucnVuKHRoaXMsIHNjaGVkdWxlcikpXG4gIHRoaXMuYWN0aXZlID0gdHJ1ZVxufVxuXG5PdXRlci5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgeCkge1xuICB0aGlzLl9hZGRJbm5lcih0LCB4KVxufVxuXG5PdXRlci5wcm90b3R5cGUuX2FkZElubmVyID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgaWYgKHRoaXMuY3VycmVudC5sZW5ndGggPCB0aGlzLmNvbmN1cnJlbmN5KSB7XG4gICAgdGhpcy5fc3RhcnRJbm5lcih0LCB4KVxuICB9IGVsc2Uge1xuICAgIHRoaXMucGVuZGluZy5wdXNoKHgpXG4gIH1cbn1cblxuT3V0ZXIucHJvdG90eXBlLl9zdGFydElubmVyID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgdHJ5IHtcbiAgICB0aGlzLl9pbml0SW5uZXIodCwgeClcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRoaXMuZXJyb3IodCwgZSlcbiAgfVxufVxuXG5PdXRlci5wcm90b3R5cGUuX2luaXRJbm5lciA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHZhciBpbm5lclNpbmsgPSBuZXcgSW5uZXIodCwgdGhpcywgdGhpcy5zaW5rKVxuICBpbm5lclNpbmsuZGlzcG9zYWJsZSA9IG1hcEFuZFJ1bih0aGlzLmYsIHgsIGlubmVyU2luaywgdGhpcy5zY2hlZHVsZXIpXG4gIHRoaXMuY3VycmVudC5hZGQoaW5uZXJTaW5rKVxufVxuXG5mdW5jdGlvbiBtYXBBbmRSdW4gKGYsIHgsIHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gZih4KS5zb3VyY2UucnVuKHNpbmssIHNjaGVkdWxlcilcbn1cblxuT3V0ZXIucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHRoaXMuYWN0aXZlID0gZmFsc2VcbiAgZGlzcG9zZS50cnlEaXNwb3NlKHQsIHRoaXMuZGlzcG9zYWJsZSwgdGhpcy5zaW5rKVxuICB0aGlzLl9jaGVja0VuZCh0LCB4KVxufVxuXG5PdXRlci5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAodCwgZSkge1xuICB0aGlzLmFjdGl2ZSA9IGZhbHNlXG4gIHRoaXMuc2luay5lcnJvcih0LCBlKVxufVxuXG5PdXRlci5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5hY3RpdmUgPSBmYWxzZVxuICB0aGlzLnBlbmRpbmcubGVuZ3RoID0gMFxuICByZXR1cm4gUHJvbWlzZS5hbGwoW3RoaXMuZGlzcG9zYWJsZS5kaXNwb3NlKCksIHRoaXMuY3VycmVudC5kaXNwb3NlKCldKVxufVxuXG5PdXRlci5wcm90b3R5cGUuX2VuZElubmVyID0gZnVuY3Rpb24gKHQsIHgsIGlubmVyKSB7XG4gIHRoaXMuY3VycmVudC5yZW1vdmUoaW5uZXIpXG4gIGRpc3Bvc2UudHJ5RGlzcG9zZSh0LCBpbm5lciwgdGhpcylcblxuICBpZiAodGhpcy5wZW5kaW5nLmxlbmd0aCA9PT0gMCkge1xuICAgIHRoaXMuX2NoZWNrRW5kKHQsIHgpXG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fc3RhcnRJbm5lcih0LCB0aGlzLnBlbmRpbmcuc2hpZnQoKSlcbiAgfVxufVxuXG5PdXRlci5wcm90b3R5cGUuX2NoZWNrRW5kID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgaWYgKCF0aGlzLmFjdGl2ZSAmJiB0aGlzLmN1cnJlbnQuaXNFbXB0eSgpKSB7XG4gICAgdGhpcy5zaW5rLmVuZCh0LCB4KVxuICB9XG59XG5cbmZ1bmN0aW9uIElubmVyICh0aW1lLCBvdXRlciwgc2luaykge1xuICB0aGlzLnByZXYgPSB0aGlzLm5leHQgPSBudWxsXG4gIHRoaXMudGltZSA9IHRpbWVcbiAgdGhpcy5vdXRlciA9IG91dGVyXG4gIHRoaXMuc2luayA9IHNpbmtcbiAgdGhpcy5kaXNwb3NhYmxlID0gdm9pZCAwXG59XG5cbklubmVyLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHRoaXMuc2luay5ldmVudChNYXRoLm1heCh0LCB0aGlzLnRpbWUpLCB4KVxufVxuXG5Jbm5lci5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgdGhpcy5vdXRlci5fZW5kSW5uZXIoTWF0aC5tYXgodCwgdGhpcy50aW1lKSwgeCwgdGhpcylcbn1cblxuSW5uZXIucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKHQsIGUpIHtcbiAgdGhpcy5vdXRlci5lcnJvcihNYXRoLm1heCh0LCB0aGlzLnRpbWUpLCBlKVxufVxuXG5Jbm5lci5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuZGlzcG9zYWJsZS5kaXNwb3NlKClcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvbWVyZ2VDb25jdXJyZW50bHkuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB2bm9kZSBmcm9tICcuL3Zub2RlJztcbmltcG9ydCAqIGFzIGlzIGZyb20gJy4vaXMnO1xuaW1wb3J0IGh0bWxEb21BcGkgZnJvbSAnLi9odG1sZG9tYXBpJztcbmZ1bmN0aW9uIGlzVW5kZWYocykgeyByZXR1cm4gcyA9PT0gdW5kZWZpbmVkOyB9XG5mdW5jdGlvbiBpc0RlZihzKSB7IHJldHVybiBzICE9PSB1bmRlZmluZWQ7IH1cbnZhciBlbXB0eU5vZGUgPSB2bm9kZSgnJywge30sIFtdLCB1bmRlZmluZWQsIHVuZGVmaW5lZCk7XG5mdW5jdGlvbiBzYW1lVm5vZGUodm5vZGUxLCB2bm9kZTIpIHtcbiAgICByZXR1cm4gdm5vZGUxLmtleSA9PT0gdm5vZGUyLmtleSAmJiB2bm9kZTEuc2VsID09PSB2bm9kZTIuc2VsO1xufVxuZnVuY3Rpb24gaXNWbm9kZSh2bm9kZSkge1xuICAgIHJldHVybiB2bm9kZS5zZWwgIT09IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUtleVRvT2xkSWR4KGNoaWxkcmVuLCBiZWdpbklkeCwgZW5kSWR4KSB7XG4gICAgdmFyIGksIG1hcCA9IHt9LCBrZXksIGNoO1xuICAgIGZvciAoaSA9IGJlZ2luSWR4OyBpIDw9IGVuZElkeDsgKytpKSB7XG4gICAgICAgIGNoID0gY2hpbGRyZW5baV07XG4gICAgICAgIGlmIChjaCAhPSBudWxsKSB7XG4gICAgICAgICAgICBrZXkgPSBjaC5rZXk7XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgbWFwW2tleV0gPSBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtYXA7XG59XG52YXIgaG9va3MgPSBbJ2NyZWF0ZScsICd1cGRhdGUnLCAncmVtb3ZlJywgJ2Rlc3Ryb3knLCAncHJlJywgJ3Bvc3QnXTtcbmV4cG9ydCB7IGggfSBmcm9tICcuL2gnO1xuZXhwb3J0IHsgdGh1bmsgfSBmcm9tICcuL3RodW5rJztcbmV4cG9ydCBmdW5jdGlvbiBpbml0KG1vZHVsZXMsIGRvbUFwaSkge1xuICAgIHZhciBpLCBqLCBjYnMgPSB7fTtcbiAgICB2YXIgYXBpID0gZG9tQXBpICE9PSB1bmRlZmluZWQgPyBkb21BcGkgOiBodG1sRG9tQXBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBob29rcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBjYnNbaG9va3NbaV1dID0gW107XG4gICAgICAgIGZvciAoaiA9IDA7IGogPCBtb2R1bGVzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICB2YXIgaG9vayA9IG1vZHVsZXNbal1baG9va3NbaV1dO1xuICAgICAgICAgICAgaWYgKGhvb2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNic1tob29rc1tpXV0ucHVzaChob29rKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBlbXB0eU5vZGVBdChlbG0pIHtcbiAgICAgICAgdmFyIGlkID0gZWxtLmlkID8gJyMnICsgZWxtLmlkIDogJyc7XG4gICAgICAgIHZhciBjID0gZWxtLmNsYXNzTmFtZSA/ICcuJyArIGVsbS5jbGFzc05hbWUuc3BsaXQoJyAnKS5qb2luKCcuJykgOiAnJztcbiAgICAgICAgcmV0dXJuIHZub2RlKGFwaS50YWdOYW1lKGVsbSkudG9Mb3dlckNhc2UoKSArIGlkICsgYywge30sIFtdLCB1bmRlZmluZWQsIGVsbSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZVJtQ2IoY2hpbGRFbG0sIGxpc3RlbmVycykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gcm1DYigpIHtcbiAgICAgICAgICAgIGlmICgtLWxpc3RlbmVycyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHZhciBwYXJlbnRfMSA9IGFwaS5wYXJlbnROb2RlKGNoaWxkRWxtKTtcbiAgICAgICAgICAgICAgICBhcGkucmVtb3ZlQ2hpbGQocGFyZW50XzEsIGNoaWxkRWxtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlRWxtKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpIHtcbiAgICAgICAgdmFyIGksIGRhdGEgPSB2bm9kZS5kYXRhO1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkuaW5pdCkpIHtcbiAgICAgICAgICAgICAgICBpKHZub2RlKTtcbiAgICAgICAgICAgICAgICBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlbiwgc2VsID0gdm5vZGUuc2VsO1xuICAgICAgICBpZiAoc2VsID09PSAnIScpIHtcbiAgICAgICAgICAgIGlmIChpc1VuZGVmKHZub2RlLnRleHQpKSB7XG4gICAgICAgICAgICAgICAgdm5vZGUudGV4dCA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdm5vZGUuZWxtID0gYXBpLmNyZWF0ZUNvbW1lbnQodm5vZGUudGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2VsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIFBhcnNlIHNlbGVjdG9yXG4gICAgICAgICAgICB2YXIgaGFzaElkeCA9IHNlbC5pbmRleE9mKCcjJyk7XG4gICAgICAgICAgICB2YXIgZG90SWR4ID0gc2VsLmluZGV4T2YoJy4nLCBoYXNoSWR4KTtcbiAgICAgICAgICAgIHZhciBoYXNoID0gaGFzaElkeCA+IDAgPyBoYXNoSWR4IDogc2VsLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBkb3QgPSBkb3RJZHggPiAwID8gZG90SWR4IDogc2VsLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciB0YWcgPSBoYXNoSWR4ICE9PSAtMSB8fCBkb3RJZHggIT09IC0xID8gc2VsLnNsaWNlKDAsIE1hdGgubWluKGhhc2gsIGRvdCkpIDogc2VsO1xuICAgICAgICAgICAgdmFyIGVsbSA9IHZub2RlLmVsbSA9IGlzRGVmKGRhdGEpICYmIGlzRGVmKGkgPSBkYXRhLm5zKSA/IGFwaS5jcmVhdGVFbGVtZW50TlMoaSwgdGFnKVxuICAgICAgICAgICAgICAgIDogYXBpLmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICAgICAgICAgIGlmIChoYXNoIDwgZG90KVxuICAgICAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ2lkJywgc2VsLnNsaWNlKGhhc2ggKyAxLCBkb3QpKTtcbiAgICAgICAgICAgIGlmIChkb3RJZHggPiAwKVxuICAgICAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgc2VsLnNsaWNlKGRvdCArIDEpLnJlcGxhY2UoL1xcLi9nLCAnICcpKTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMuY3JlYXRlLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGNicy5jcmVhdGVbaV0oZW1wdHlOb2RlLCB2bm9kZSk7XG4gICAgICAgICAgICBpZiAoaXMuYXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2ggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBpLmFwcGVuZENoaWxkKGVsbSwgY3JlYXRlRWxtKGNoLCBpbnNlcnRlZFZub2RlUXVldWUpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzLnByaW1pdGl2ZSh2bm9kZS50ZXh0KSkge1xuICAgICAgICAgICAgICAgIGFwaS5hcHBlbmRDaGlsZChlbG0sIGFwaS5jcmVhdGVUZXh0Tm9kZSh2bm9kZS50ZXh0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpID0gdm5vZGUuZGF0YS5ob29rOyAvLyBSZXVzZSB2YXJpYWJsZVxuICAgICAgICAgICAgaWYgKGlzRGVmKGkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkuY3JlYXRlKVxuICAgICAgICAgICAgICAgICAgICBpLmNyZWF0ZShlbXB0eU5vZGUsIHZub2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoaS5pbnNlcnQpXG4gICAgICAgICAgICAgICAgICAgIGluc2VydGVkVm5vZGVRdWV1ZS5wdXNoKHZub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZub2RlLmVsbSA9IGFwaS5jcmVhdGVUZXh0Tm9kZSh2bm9kZS50ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdm5vZGUuZWxtO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhZGRWbm9kZXMocGFyZW50RWxtLCBiZWZvcmUsIHZub2Rlcywgc3RhcnRJZHgsIGVuZElkeCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgICAgIGZvciAoOyBzdGFydElkeCA8PSBlbmRJZHg7ICsrc3RhcnRJZHgpIHtcbiAgICAgICAgICAgIHZhciBjaCA9IHZub2Rlc1tzdGFydElkeF07XG4gICAgICAgICAgICBpZiAoY2ggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBjcmVhdGVFbG0oY2gsIGluc2VydGVkVm5vZGVRdWV1ZSksIGJlZm9yZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gaW52b2tlRGVzdHJveUhvb2sodm5vZGUpIHtcbiAgICAgICAgdmFyIGksIGosIGRhdGEgPSB2bm9kZS5kYXRhO1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkuZGVzdHJveSkpXG4gICAgICAgICAgICAgICAgaSh2bm9kZSk7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLmRlc3Ryb3kubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgY2JzLmRlc3Ryb3lbaV0odm5vZGUpO1xuICAgICAgICAgICAgaWYgKHZub2RlLmNoaWxkcmVuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgdm5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICAgICAgaSA9IHZub2RlLmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPSBudWxsICYmIHR5cGVvZiBpICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnZva2VEZXN0cm95SG9vayhpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiByZW1vdmVWbm9kZXMocGFyZW50RWxtLCB2bm9kZXMsIHN0YXJ0SWR4LCBlbmRJZHgpIHtcbiAgICAgICAgZm9yICg7IHN0YXJ0SWR4IDw9IGVuZElkeDsgKytzdGFydElkeCkge1xuICAgICAgICAgICAgdmFyIGlfMSA9IHZvaWQgMCwgbGlzdGVuZXJzID0gdm9pZCAwLCBybSA9IHZvaWQgMCwgY2ggPSB2bm9kZXNbc3RhcnRJZHhdO1xuICAgICAgICAgICAgaWYgKGNoICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNEZWYoY2guc2VsKSkge1xuICAgICAgICAgICAgICAgICAgICBpbnZva2VEZXN0cm95SG9vayhjaCk7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycyA9IGNicy5yZW1vdmUubGVuZ3RoICsgMTtcbiAgICAgICAgICAgICAgICAgICAgcm0gPSBjcmVhdGVSbUNiKGNoLmVsbSwgbGlzdGVuZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpXzEgPSAwOyBpXzEgPCBjYnMucmVtb3ZlLmxlbmd0aDsgKytpXzEpXG4gICAgICAgICAgICAgICAgICAgICAgICBjYnMucmVtb3ZlW2lfMV0oY2gsIHJtKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRGVmKGlfMSA9IGNoLmRhdGEpICYmIGlzRGVmKGlfMSA9IGlfMS5ob29rKSAmJiBpc0RlZihpXzEgPSBpXzEucmVtb3ZlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaV8xKGNoLCBybSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBybSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhcGkucmVtb3ZlQ2hpbGQocGFyZW50RWxtLCBjaC5lbG0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiB1cGRhdGVDaGlsZHJlbihwYXJlbnRFbG0sIG9sZENoLCBuZXdDaCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgICAgIHZhciBvbGRTdGFydElkeCA9IDAsIG5ld1N0YXJ0SWR4ID0gMDtcbiAgICAgICAgdmFyIG9sZEVuZElkeCA9IG9sZENoLmxlbmd0aCAtIDE7XG4gICAgICAgIHZhciBvbGRTdGFydFZub2RlID0gb2xkQ2hbMF07XG4gICAgICAgIHZhciBvbGRFbmRWbm9kZSA9IG9sZENoW29sZEVuZElkeF07XG4gICAgICAgIHZhciBuZXdFbmRJZHggPSBuZXdDaC5sZW5ndGggLSAxO1xuICAgICAgICB2YXIgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWzBdO1xuICAgICAgICB2YXIgbmV3RW5kVm5vZGUgPSBuZXdDaFtuZXdFbmRJZHhdO1xuICAgICAgICB2YXIgb2xkS2V5VG9JZHg7XG4gICAgICAgIHZhciBpZHhJbk9sZDtcbiAgICAgICAgdmFyIGVsbVRvTW92ZTtcbiAgICAgICAgdmFyIGJlZm9yZTtcbiAgICAgICAgd2hpbGUgKG9sZFN0YXJ0SWR4IDw9IG9sZEVuZElkeCAmJiBuZXdTdGFydElkeCA8PSBuZXdFbmRJZHgpIHtcbiAgICAgICAgICAgIGlmIChvbGRTdGFydFZub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBvbGRTdGFydFZub2RlID0gb2xkQ2hbKytvbGRTdGFydElkeF07IC8vIFZub2RlIG1pZ2h0IGhhdmUgYmVlbiBtb3ZlZCBsZWZ0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChvbGRFbmRWbm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgb2xkRW5kVm5vZGUgPSBvbGRDaFstLW9sZEVuZElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChuZXdTdGFydFZub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChuZXdFbmRWbm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbmV3RW5kVm5vZGUgPSBuZXdDaFstLW5ld0VuZElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzYW1lVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3U3RhcnRWbm9kZSkpIHtcbiAgICAgICAgICAgICAgICBwYXRjaFZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgb2xkU3RhcnRWbm9kZSA9IG9sZENoWysrb2xkU3RhcnRJZHhdO1xuICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNhbWVWbm9kZShvbGRFbmRWbm9kZSwgbmV3RW5kVm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRFbmRWbm9kZSwgbmV3RW5kVm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgb2xkRW5kVm5vZGUgPSBvbGRDaFstLW9sZEVuZElkeF07XG4gICAgICAgICAgICAgICAgbmV3RW5kVm5vZGUgPSBuZXdDaFstLW5ld0VuZElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzYW1lVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3RW5kVm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRTdGFydFZub2RlLCBuZXdFbmRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgb2xkU3RhcnRWbm9kZS5lbG0sIGFwaS5uZXh0U2libGluZyhvbGRFbmRWbm9kZS5lbG0pKTtcbiAgICAgICAgICAgICAgICBvbGRTdGFydFZub2RlID0gb2xkQ2hbKytvbGRTdGFydElkeF07XG4gICAgICAgICAgICAgICAgbmV3RW5kVm5vZGUgPSBuZXdDaFstLW5ld0VuZElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzYW1lVm5vZGUob2xkRW5kVm5vZGUsIG5ld1N0YXJ0Vm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRFbmRWbm9kZSwgbmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgb2xkRW5kVm5vZGUuZWxtLCBvbGRTdGFydFZub2RlLmVsbSk7XG4gICAgICAgICAgICAgICAgb2xkRW5kVm5vZGUgPSBvbGRDaFstLW9sZEVuZElkeF07XG4gICAgICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKG9sZEtleVRvSWR4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgb2xkS2V5VG9JZHggPSBjcmVhdGVLZXlUb09sZElkeChvbGRDaCwgb2xkU3RhcnRJZHgsIG9sZEVuZElkeCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlkeEluT2xkID0gb2xkS2V5VG9JZHhbbmV3U3RhcnRWbm9kZS5rZXldO1xuICAgICAgICAgICAgICAgIGlmIChpc1VuZGVmKGlkeEluT2xkKSkge1xuICAgICAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgY3JlYXRlRWxtKG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSksIG9sZFN0YXJ0Vm5vZGUuZWxtKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWxtVG9Nb3ZlID0gb2xkQ2hbaWR4SW5PbGRdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxtVG9Nb3ZlLnNlbCAhPT0gbmV3U3RhcnRWbm9kZS5zZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBjcmVhdGVFbG0obmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0Y2hWbm9kZShlbG1Ub01vdmUsIG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbGRDaFtpZHhJbk9sZF0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgZWxtVG9Nb3ZlLmVsbSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9sZFN0YXJ0SWR4IDw9IG9sZEVuZElkeCB8fCBuZXdTdGFydElkeCA8PSBuZXdFbmRJZHgpIHtcbiAgICAgICAgICAgIGlmIChvbGRTdGFydElkeCA+IG9sZEVuZElkeCkge1xuICAgICAgICAgICAgICAgIGJlZm9yZSA9IG5ld0NoW25ld0VuZElkeCArIDFdID09IG51bGwgPyBudWxsIDogbmV3Q2hbbmV3RW5kSWR4ICsgMV0uZWxtO1xuICAgICAgICAgICAgICAgIGFkZFZub2RlcyhwYXJlbnRFbG0sIGJlZm9yZSwgbmV3Q2gsIG5ld1N0YXJ0SWR4LCBuZXdFbmRJZHgsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZW1vdmVWbm9kZXMocGFyZW50RWxtLCBvbGRDaCwgb2xkU3RhcnRJZHgsIG9sZEVuZElkeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcGF0Y2hWbm9kZShvbGRWbm9kZSwgdm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgICAgICB2YXIgaSwgaG9vaztcbiAgICAgICAgaWYgKGlzRGVmKGkgPSB2bm9kZS5kYXRhKSAmJiBpc0RlZihob29rID0gaS5ob29rKSAmJiBpc0RlZihpID0gaG9vay5wcmVwYXRjaCkpIHtcbiAgICAgICAgICAgIGkob2xkVm5vZGUsIHZub2RlKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZWxtID0gdm5vZGUuZWxtID0gb2xkVm5vZGUuZWxtO1xuICAgICAgICB2YXIgb2xkQ2ggPSBvbGRWbm9kZS5jaGlsZHJlbjtcbiAgICAgICAgdmFyIGNoID0gdm5vZGUuY2hpbGRyZW47XG4gICAgICAgIGlmIChvbGRWbm9kZSA9PT0gdm5vZGUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICh2bm9kZS5kYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMudXBkYXRlLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGNicy51cGRhdGVbaV0ob2xkVm5vZGUsIHZub2RlKTtcbiAgICAgICAgICAgIGkgPSB2bm9kZS5kYXRhLmhvb2s7XG4gICAgICAgICAgICBpZiAoaXNEZWYoaSkgJiYgaXNEZWYoaSA9IGkudXBkYXRlKSlcbiAgICAgICAgICAgICAgICBpKG9sZFZub2RlLCB2bm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzVW5kZWYodm5vZGUudGV4dCkpIHtcbiAgICAgICAgICAgIGlmIChpc0RlZihvbGRDaCkgJiYgaXNEZWYoY2gpKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9sZENoICE9PSBjaClcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlQ2hpbGRyZW4oZWxtLCBvbGRDaCwgY2gsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc0RlZihjaCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNEZWYob2xkVm5vZGUudGV4dCkpXG4gICAgICAgICAgICAgICAgICAgIGFwaS5zZXRUZXh0Q29udGVudChlbG0sICcnKTtcbiAgICAgICAgICAgICAgICBhZGRWbm9kZXMoZWxtLCBudWxsLCBjaCwgMCwgY2gubGVuZ3RoIC0gMSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzRGVmKG9sZENoKSkge1xuICAgICAgICAgICAgICAgIHJlbW92ZVZub2RlcyhlbG0sIG9sZENoLCAwLCBvbGRDaC5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzRGVmKG9sZFZub2RlLnRleHQpKSB7XG4gICAgICAgICAgICAgICAgYXBpLnNldFRleHRDb250ZW50KGVsbSwgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9sZFZub2RlLnRleHQgIT09IHZub2RlLnRleHQpIHtcbiAgICAgICAgICAgIGFwaS5zZXRUZXh0Q29udGVudChlbG0sIHZub2RlLnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0RlZihob29rKSAmJiBpc0RlZihpID0gaG9vay5wb3N0cGF0Y2gpKSB7XG4gICAgICAgICAgICBpKG9sZFZub2RlLCB2bm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHBhdGNoKG9sZFZub2RlLCB2bm9kZSkge1xuICAgICAgICB2YXIgaSwgZWxtLCBwYXJlbnQ7XG4gICAgICAgIHZhciBpbnNlcnRlZFZub2RlUXVldWUgPSBbXTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNicy5wcmUubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBjYnMucHJlW2ldKCk7XG4gICAgICAgIGlmICghaXNWbm9kZShvbGRWbm9kZSkpIHtcbiAgICAgICAgICAgIG9sZFZub2RlID0gZW1wdHlOb2RlQXQob2xkVm5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzYW1lVm5vZGUob2xkVm5vZGUsIHZub2RlKSkge1xuICAgICAgICAgICAgcGF0Y2hWbm9kZShvbGRWbm9kZSwgdm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbG0gPSBvbGRWbm9kZS5lbG07XG4gICAgICAgICAgICBwYXJlbnQgPSBhcGkucGFyZW50Tm9kZShlbG0pO1xuICAgICAgICAgICAgY3JlYXRlRWxtKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgaWYgKHBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50LCB2bm9kZS5lbG0sIGFwaS5uZXh0U2libGluZyhlbG0pKTtcbiAgICAgICAgICAgICAgICByZW1vdmVWbm9kZXMocGFyZW50LCBbb2xkVm5vZGVdLCAwLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpbnNlcnRlZFZub2RlUXVldWVbaV0uZGF0YS5ob29rLmluc2VydChpbnNlcnRlZFZub2RlUXVldWVbaV0pO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMucG9zdC5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIGNicy5wb3N0W2ldKCk7XG4gICAgICAgIHJldHVybiB2bm9kZTtcbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c25hYmJkb20uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc25hYmJkb20vZXMvc25hYmJkb20uanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBmdW5jdGlvbiB2bm9kZShzZWwsIGRhdGEsIGNoaWxkcmVuLCB0ZXh0LCBlbG0pIHtcbiAgICB2YXIga2V5ID0gZGF0YSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogZGF0YS5rZXk7XG4gICAgcmV0dXJuIHsgc2VsOiBzZWwsIGRhdGE6IGRhdGEsIGNoaWxkcmVuOiBjaGlsZHJlbixcbiAgICAgICAgdGV4dDogdGV4dCwgZWxtOiBlbG0sIGtleToga2V5IH07XG59XG5leHBvcnQgZGVmYXVsdCB2bm9kZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZub2RlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL2VzL3Zub2RlLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgdmFyIGFycmF5ID0gQXJyYXkuaXNBcnJheTtcbmV4cG9ydCBmdW5jdGlvbiBwcmltaXRpdmUocykge1xuICAgIHJldHVybiB0eXBlb2YgcyA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHMgPT09ICdudW1iZXInO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXMuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc25hYmJkb20vZXMvaXMuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IHZub2RlIH0gZnJvbSAnLi92bm9kZSc7XG5pbXBvcnQgKiBhcyBpcyBmcm9tICcuL2lzJztcbmZ1bmN0aW9uIGFkZE5TKGRhdGEsIGNoaWxkcmVuLCBzZWwpIHtcbiAgICBkYXRhLm5zID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcbiAgICBpZiAoc2VsICE9PSAnZm9yZWlnbk9iamVjdCcgJiYgY2hpbGRyZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGREYXRhID0gY2hpbGRyZW5baV0uZGF0YTtcbiAgICAgICAgICAgIGlmIChjaGlsZERhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGFkZE5TKGNoaWxkRGF0YSwgY2hpbGRyZW5baV0uY2hpbGRyZW4sIGNoaWxkcmVuW2ldLnNlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gaChzZWwsIGIsIGMpIHtcbiAgICB2YXIgZGF0YSA9IHt9LCBjaGlsZHJlbiwgdGV4dCwgaTtcbiAgICBpZiAoYyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRhdGEgPSBiO1xuICAgICAgICBpZiAoaXMuYXJyYXkoYykpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gYztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpcy5wcmltaXRpdmUoYykpIHtcbiAgICAgICAgICAgIHRleHQgPSBjO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGMgJiYgYy5zZWwpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gW2NdO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoaXMuYXJyYXkoYikpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gYjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpcy5wcmltaXRpdmUoYikpIHtcbiAgICAgICAgICAgIHRleHQgPSBiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGIgJiYgYi5zZWwpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gW2JdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGF0YSA9IGI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzLmFycmF5KGNoaWxkcmVuKSkge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChpcy5wcmltaXRpdmUoY2hpbGRyZW5baV0pKVxuICAgICAgICAgICAgICAgIGNoaWxkcmVuW2ldID0gdm5vZGUodW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgY2hpbGRyZW5baV0sIHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNlbFswXSA9PT0gJ3MnICYmIHNlbFsxXSA9PT0gJ3YnICYmIHNlbFsyXSA9PT0gJ2cnICYmXG4gICAgICAgIChzZWwubGVuZ3RoID09PSAzIHx8IHNlbFszXSA9PT0gJy4nIHx8IHNlbFszXSA9PT0gJyMnKSkge1xuICAgICAgICBhZGROUyhkYXRhLCBjaGlsZHJlbiwgc2VsKTtcbiAgICB9XG4gICAgcmV0dXJuIHZub2RlKHNlbCwgZGF0YSwgY2hpbGRyZW4sIHRleHQsIHVuZGVmaW5lZCk7XG59XG47XG5leHBvcnQgZGVmYXVsdCBoO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9lcy9oLmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuLypnbG9iYWwgU2V0LCBTeW1ib2wqL1xudmFyIGl0ZXJhdG9yU3ltYm9sXG4vLyBGaXJlZm94IHNoaXBzIGEgcGFydGlhbCBpbXBsZW1lbnRhdGlvbiB1c2luZyB0aGUgbmFtZSBAQGl0ZXJhdG9yLlxuLy8gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9OTA3MDc3I2MxNFxuaWYgKHR5cGVvZiBTZXQgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIG5ldyBTZXQoKVsnQEBpdGVyYXRvciddID09PSAnZnVuY3Rpb24nKSB7XG4gIGl0ZXJhdG9yU3ltYm9sID0gJ0BAaXRlcmF0b3InXG59IGVsc2Uge1xuICBpdGVyYXRvclN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLml0ZXJhdG9yIHx8XG4gICdfZXM2c2hpbV9pdGVyYXRvcl8nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0l0ZXJhYmxlIChvKSB7XG4gIHJldHVybiB0eXBlb2Ygb1tpdGVyYXRvclN5bWJvbF0gPT09ICdmdW5jdGlvbidcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEl0ZXJhdG9yIChvKSB7XG4gIHJldHVybiBvW2l0ZXJhdG9yU3ltYm9sXSgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlSXRlcmFibGUgKGYsIG8pIHtcbiAgb1tpdGVyYXRvclN5bWJvbF0gPSBmXG4gIHJldHVybiBvXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9pbmRleCcpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3ltYm9sLW9ic2VydmFibGUvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgKiBhcyBkaXNwb3NlIGZyb20gJy4vZGlzcG9zYWJsZS9kaXNwb3NlJ1xuaW1wb3J0IGRlZmF1bHRTY2hlZHVsZXIgZnJvbSAnLi9zY2hlZHVsZXIvZGVmYXVsdFNjaGVkdWxlcidcblxuZXhwb3J0IGZ1bmN0aW9uIHdpdGhEZWZhdWx0U2NoZWR1bGVyIChzb3VyY2UpIHtcbiAgcmV0dXJuIHdpdGhTY2hlZHVsZXIoc291cmNlLCBkZWZhdWx0U2NoZWR1bGVyKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gd2l0aFNjaGVkdWxlciAoc291cmNlLCBzY2hlZHVsZXIpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBydW5Tb3VyY2Uoc291cmNlLCBzY2hlZHVsZXIsIHJlc29sdmUsIHJlamVjdClcbiAgfSlcbn1cblxuZnVuY3Rpb24gcnVuU291cmNlIChzb3VyY2UsIHNjaGVkdWxlciwgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gIHZhciBkaXNwb3NhYmxlID0gZGlzcG9zZS5zZXR0YWJsZSgpXG4gIHZhciBvYnNlcnZlciA9IG5ldyBEcmFpbihyZXNvbHZlLCByZWplY3QsIGRpc3Bvc2FibGUpXG5cbiAgZGlzcG9zYWJsZS5zZXREaXNwb3NhYmxlKHNvdXJjZS5ydW4ob2JzZXJ2ZXIsIHNjaGVkdWxlcikpXG59XG5cbmZ1bmN0aW9uIERyYWluIChlbmQsIGVycm9yLCBkaXNwb3NhYmxlKSB7XG4gIHRoaXMuX2VuZCA9IGVuZFxuICB0aGlzLl9lcnJvciA9IGVycm9yXG4gIHRoaXMuX2Rpc3Bvc2FibGUgPSBkaXNwb3NhYmxlXG4gIHRoaXMuYWN0aXZlID0gdHJ1ZVxufVxuXG5EcmFpbi5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgeCkge31cblxuRHJhaW4ucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIGlmICghdGhpcy5hY3RpdmUpIHtcbiAgICByZXR1cm5cbiAgfVxuICB0aGlzLmFjdGl2ZSA9IGZhbHNlXG4gIGRpc3Bvc2VUaGVuKHRoaXMuX2VuZCwgdGhpcy5fZXJyb3IsIHRoaXMuX2Rpc3Bvc2FibGUsIHgpXG59XG5cbkRyYWluLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uICh0LCBlKSB7XG4gIHRoaXMuYWN0aXZlID0gZmFsc2VcbiAgZGlzcG9zZVRoZW4odGhpcy5fZXJyb3IsIHRoaXMuX2Vycm9yLCB0aGlzLl9kaXNwb3NhYmxlLCBlKVxufVxuXG5mdW5jdGlvbiBkaXNwb3NlVGhlbiAoZW5kLCBlcnJvciwgZGlzcG9zYWJsZSwgeCkge1xuICBQcm9taXNlLnJlc29sdmUoZGlzcG9zYWJsZS5kaXNwb3NlKCkpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIGVuZCh4KVxuICB9LCBlcnJvcilcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3J1blNvdXJjZS5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBQaXBlIGZyb20gJy4uL3NpbmsvUGlwZSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRmlsdGVyIChwLCBzb3VyY2UpIHtcbiAgdGhpcy5wID0gcFxuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIGZpbHRlcmVkIHNvdXJjZSwgZnVzaW5nIGFkamFjZW50IGZpbHRlci5maWx0ZXIgaWYgcG9zc2libGVcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oeDoqKTpib29sZWFufSBwIGZpbHRlcmluZyBwcmVkaWNhdGVcbiAqIEBwYXJhbSB7e3J1bjpmdW5jdGlvbn19IHNvdXJjZSBzb3VyY2UgdG8gZmlsdGVyXG4gKiBAcmV0dXJucyB7RmlsdGVyfSBmaWx0ZXJlZCBzb3VyY2VcbiAqL1xuRmlsdGVyLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZUZpbHRlciAocCwgc291cmNlKSB7XG4gIGlmIChzb3VyY2UgaW5zdGFuY2VvZiBGaWx0ZXIpIHtcbiAgICByZXR1cm4gbmV3IEZpbHRlcihhbmQoc291cmNlLnAsIHApLCBzb3VyY2Uuc291cmNlKVxuICB9XG5cbiAgcmV0dXJuIG5ldyBGaWx0ZXIocCwgc291cmNlKVxufVxuXG5GaWx0ZXIucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgcmV0dXJuIHRoaXMuc291cmNlLnJ1bihuZXcgRmlsdGVyU2luayh0aGlzLnAsIHNpbmspLCBzY2hlZHVsZXIpXG59XG5cbmZ1bmN0aW9uIEZpbHRlclNpbmsgKHAsIHNpbmspIHtcbiAgdGhpcy5wID0gcFxuICB0aGlzLnNpbmsgPSBzaW5rXG59XG5cbkZpbHRlclNpbmsucHJvdG90eXBlLmVuZCA9IFBpcGUucHJvdG90eXBlLmVuZFxuRmlsdGVyU2luay5wcm90b3R5cGUuZXJyb3IgPSBQaXBlLnByb3RvdHlwZS5lcnJvclxuXG5GaWx0ZXJTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHZhciBwID0gdGhpcy5wXG4gIHAoeCkgJiYgdGhpcy5zaW5rLmV2ZW50KHQsIHgpXG59XG5cbmZ1bmN0aW9uIGFuZCAocCwgcSkge1xuICByZXR1cm4gZnVuY3Rpb24gKHgpIHtcbiAgICByZXR1cm4gcCh4KSAmJiBxKHgpXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2Z1c2lvbi9GaWx0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCBQaXBlIGZyb20gJy4uL3NpbmsvUGlwZSdcbmltcG9ydCAqIGFzIGRpc3Bvc2UgZnJvbSAnLi4vZGlzcG9zYWJsZS9kaXNwb3NlJ1xuXG5leHBvcnQgZnVuY3Rpb24gY29udGludWVXaXRoIChmLCBzdHJlYW0pIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IENvbnRpbnVlV2l0aChmLCBzdHJlYW0uc291cmNlKSlcbn1cblxuZnVuY3Rpb24gQ29udGludWVXaXRoIChmLCBzb3VyY2UpIHtcbiAgdGhpcy5mID0gZlxuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxufVxuXG5Db250aW51ZVdpdGgucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgcmV0dXJuIG5ldyBDb250aW51ZVdpdGhTaW5rKHRoaXMuZiwgdGhpcy5zb3VyY2UsIHNpbmssIHNjaGVkdWxlcilcbn1cblxuZnVuY3Rpb24gQ29udGludWVXaXRoU2luayAoZiwgc291cmNlLCBzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdGhpcy5mID0gZlxuICB0aGlzLnNpbmsgPSBzaW5rXG4gIHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyXG4gIHRoaXMuYWN0aXZlID0gdHJ1ZVxuICB0aGlzLmRpc3Bvc2FibGUgPSBkaXNwb3NlLm9uY2Uoc291cmNlLnJ1bih0aGlzLCBzY2hlZHVsZXIpKVxufVxuXG5Db250aW51ZVdpdGhTaW5rLnByb3RvdHlwZS5lcnJvciA9IFBpcGUucHJvdG90eXBlLmVycm9yXG5cbkNvbnRpbnVlV2l0aFNpbmsucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgaWYgKCF0aGlzLmFjdGl2ZSkge1xuICAgIHJldHVyblxuICB9XG4gIHRoaXMuc2luay5ldmVudCh0LCB4KVxufVxuXG5Db250aW51ZVdpdGhTaW5rLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAodCwgeCkge1xuICBpZiAoIXRoaXMuYWN0aXZlKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBkaXNwb3NlLnRyeURpc3Bvc2UodCwgdGhpcy5kaXNwb3NhYmxlLCB0aGlzLnNpbmspXG4gIHRoaXMuX3N0YXJ0TmV4dCh0LCB4LCB0aGlzLnNpbmspXG59XG5cbkNvbnRpbnVlV2l0aFNpbmsucHJvdG90eXBlLl9zdGFydE5leHQgPSBmdW5jdGlvbiAodCwgeCwgc2luaykge1xuICB0cnkge1xuICAgIHRoaXMuZGlzcG9zYWJsZSA9IHRoaXMuX2NvbnRpbnVlKHRoaXMuZiwgeCwgc2luaylcbiAgfSBjYXRjaCAoZSkge1xuICAgIHNpbmsuZXJyb3IodCwgZSlcbiAgfVxufVxuXG5Db250aW51ZVdpdGhTaW5rLnByb3RvdHlwZS5fY29udGludWUgPSBmdW5jdGlvbiAoZiwgeCwgc2luaykge1xuICByZXR1cm4gZih4KS5zb3VyY2UucnVuKHNpbmssIHRoaXMuc2NoZWR1bGVyKVxufVxuXG5Db250aW51ZVdpdGhTaW5rLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmFjdGl2ZSA9IGZhbHNlXG4gIHJldHVybiB0aGlzLmRpc3Bvc2FibGUuZGlzcG9zZSgpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL2NvbnRpbnVlV2l0aC5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBTdHJlYW0gZnJvbSAnLi4vU3RyZWFtJ1xuaW1wb3J0ICogYXMgdHJhbnNmb3JtIGZyb20gJy4vdHJhbnNmb3JtJ1xuaW1wb3J0ICogYXMgY29yZSBmcm9tICcuLi9zb3VyY2UvY29yZSdcbmltcG9ydCBQaXBlIGZyb20gJy4uL3NpbmsvUGlwZSdcbmltcG9ydCBJbmRleFNpbmsgZnJvbSAnLi4vc2luay9JbmRleFNpbmsnXG5pbXBvcnQgKiBhcyBkaXNwb3NlIGZyb20gJy4uL2Rpc3Bvc2FibGUvZGlzcG9zZSdcbmltcG9ydCAqIGFzIGJhc2UgZnJvbSAnQG1vc3QvcHJlbHVkZSdcbmltcG9ydCBpbnZva2UgZnJvbSAnLi4vaW52b2tlJ1xuXG52YXIgbWFwID0gYmFzZS5tYXBcbnZhciB0YWlsID0gYmFzZS50YWlsXG5cbi8qKlxuICogQ29tYmluZSBsYXRlc3QgZXZlbnRzIGZyb20gYWxsIGlucHV0IHN0cmVhbXNcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oLi4uZXZlbnRzKToqfSBmIGZ1bmN0aW9uIHRvIGNvbWJpbmUgbW9zdCByZWNlbnQgZXZlbnRzXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gY29udGFpbmluZyB0aGUgcmVzdWx0IG9mIGFwcGx5aW5nIGYgdG8gdGhlIG1vc3QgcmVjZW50XG4gKiAgZXZlbnQgb2YgZWFjaCBpbnB1dCBzdHJlYW0sIHdoZW5ldmVyIGEgbmV3IGV2ZW50IGFycml2ZXMgb24gYW55IHN0cmVhbS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmUgKGYgLyosIC4uLnN0cmVhbXMgKi8pIHtcbiAgcmV0dXJuIGNvbWJpbmVBcnJheShmLCB0YWlsKGFyZ3VtZW50cykpXG59XG5cbi8qKlxuKiBDb21iaW5lIGxhdGVzdCBldmVudHMgZnJvbSBhbGwgaW5wdXQgc3RyZWFtc1xuKiBAcGFyYW0ge2Z1bmN0aW9uKC4uLmV2ZW50cyk6Kn0gZiBmdW5jdGlvbiB0byBjb21iaW5lIG1vc3QgcmVjZW50IGV2ZW50c1xuKiBAcGFyYW0ge1tTdHJlYW1dfSBzdHJlYW1zIG1vc3QgcmVjZW50IGV2ZW50c1xuKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gY29udGFpbmluZyB0aGUgcmVzdWx0IG9mIGFwcGx5aW5nIGYgdG8gdGhlIG1vc3QgcmVjZW50XG4qICBldmVudCBvZiBlYWNoIGlucHV0IHN0cmVhbSwgd2hlbmV2ZXIgYSBuZXcgZXZlbnQgYXJyaXZlcyBvbiBhbnkgc3RyZWFtLlxuKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lQXJyYXkgKGYsIHN0cmVhbXMpIHtcbiAgdmFyIGwgPSBzdHJlYW1zLmxlbmd0aFxuICByZXR1cm4gbCA9PT0gMCA/IGNvcmUuZW1wdHkoKVxuICA6IGwgPT09IDEgPyB0cmFuc2Zvcm0ubWFwKGYsIHN0cmVhbXNbMF0pXG4gIDogbmV3IFN0cmVhbShjb21iaW5lU291cmNlcyhmLCBzdHJlYW1zKSlcbn1cblxuZnVuY3Rpb24gY29tYmluZVNvdXJjZXMgKGYsIHN0cmVhbXMpIHtcbiAgcmV0dXJuIG5ldyBDb21iaW5lKGYsIG1hcChnZXRTb3VyY2UsIHN0cmVhbXMpKVxufVxuXG5mdW5jdGlvbiBnZXRTb3VyY2UgKHN0cmVhbSkge1xuICByZXR1cm4gc3RyZWFtLnNvdXJjZVxufVxuXG5mdW5jdGlvbiBDb21iaW5lIChmLCBzb3VyY2VzKSB7XG4gIHRoaXMuZiA9IGZcbiAgdGhpcy5zb3VyY2VzID0gc291cmNlc1xufVxuXG5Db21iaW5lLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHZhciBsID0gdGhpcy5zb3VyY2VzLmxlbmd0aFxuICB2YXIgZGlzcG9zYWJsZXMgPSBuZXcgQXJyYXkobClcbiAgdmFyIHNpbmtzID0gbmV3IEFycmF5KGwpXG5cbiAgdmFyIG1lcmdlU2luayA9IG5ldyBDb21iaW5lU2luayhkaXNwb3NhYmxlcywgc2lua3MsIHNpbmssIHRoaXMuZilcblxuICBmb3IgKHZhciBpbmRleFNpbmssIGkgPSAwOyBpIDwgbDsgKytpKSB7XG4gICAgaW5kZXhTaW5rID0gc2lua3NbaV0gPSBuZXcgSW5kZXhTaW5rKGksIG1lcmdlU2luaylcbiAgICBkaXNwb3NhYmxlc1tpXSA9IHRoaXMuc291cmNlc1tpXS5ydW4oaW5kZXhTaW5rLCBzY2hlZHVsZXIpXG4gIH1cblxuICByZXR1cm4gZGlzcG9zZS5hbGwoZGlzcG9zYWJsZXMpXG59XG5cbmZ1bmN0aW9uIENvbWJpbmVTaW5rIChkaXNwb3NhYmxlcywgc2lua3MsIHNpbmssIGYpIHtcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLmRpc3Bvc2FibGVzID0gZGlzcG9zYWJsZXNcbiAgdGhpcy5zaW5rcyA9IHNpbmtzXG4gIHRoaXMuZiA9IGZcblxuICB2YXIgbCA9IHNpbmtzLmxlbmd0aFxuICB0aGlzLmF3YWl0aW5nID0gbFxuICB0aGlzLnZhbHVlcyA9IG5ldyBBcnJheShsKVxuICB0aGlzLmhhc1ZhbHVlID0gbmV3IEFycmF5KGwpXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgKytpKSB7XG4gICAgdGhpcy5oYXNWYWx1ZVtpXSA9IGZhbHNlXG4gIH1cblxuICB0aGlzLmFjdGl2ZUNvdW50ID0gc2lua3MubGVuZ3RoXG59XG5cbkNvbWJpbmVTaW5rLnByb3RvdHlwZS5lcnJvciA9IFBpcGUucHJvdG90eXBlLmVycm9yXG5cbkNvbWJpbmVTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCBpbmRleGVkVmFsdWUpIHtcbiAgdmFyIGkgPSBpbmRleGVkVmFsdWUuaW5kZXhcbiAgdmFyIGF3YWl0aW5nID0gdGhpcy5fdXBkYXRlUmVhZHkoaSlcblxuICB0aGlzLnZhbHVlc1tpXSA9IGluZGV4ZWRWYWx1ZS52YWx1ZVxuICBpZiAoYXdhaXRpbmcgPT09IDApIHtcbiAgICB0aGlzLnNpbmsuZXZlbnQodCwgaW52b2tlKHRoaXMuZiwgdGhpcy52YWx1ZXMpKVxuICB9XG59XG5cbkNvbWJpbmVTaW5rLnByb3RvdHlwZS5fdXBkYXRlUmVhZHkgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgaWYgKHRoaXMuYXdhaXRpbmcgPiAwKSB7XG4gICAgaWYgKCF0aGlzLmhhc1ZhbHVlW2luZGV4XSkge1xuICAgICAgdGhpcy5oYXNWYWx1ZVtpbmRleF0gPSB0cnVlXG4gICAgICB0aGlzLmF3YWl0aW5nIC09IDFcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoaXMuYXdhaXRpbmdcbn1cblxuQ29tYmluZVNpbmsucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uICh0LCBpbmRleGVkVmFsdWUpIHtcbiAgZGlzcG9zZS50cnlEaXNwb3NlKHQsIHRoaXMuZGlzcG9zYWJsZXNbaW5kZXhlZFZhbHVlLmluZGV4XSwgdGhpcy5zaW5rKVxuICBpZiAoLS10aGlzLmFjdGl2ZUNvdW50ID09PSAwKSB7XG4gICAgdGhpcy5zaW5rLmVuZCh0LCBpbmRleGVkVmFsdWUudmFsdWUpXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvY29tYmluZS5qc1xuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCB7IG1lcmdlQ29uY3VycmVudGx5LCBtZXJnZU1hcENvbmN1cnJlbnRseSB9IGZyb20gJy4vbWVyZ2VDb25jdXJyZW50bHknXG5cbi8qKlxuICogTWFwIGVhY2ggdmFsdWUgaW4gdGhlIHN0cmVhbSB0byBhIG5ldyBzdHJlYW0sIGFuZCBtZXJnZSBpdCBpbnRvIHRoZVxuICogcmV0dXJuZWQgb3V0ZXIgc3RyZWFtLiBFdmVudCBhcnJpdmFsIHRpbWVzIGFyZSBwcmVzZXJ2ZWQuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHg6Kik6U3RyZWFtfSBmIGNoYWluaW5nIGZ1bmN0aW9uLCBtdXN0IHJldHVybiBhIFN0cmVhbVxuICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbVxuICogQHJldHVybnMge1N0cmVhbX0gbmV3IHN0cmVhbSBjb250YWluaW5nIGFsbCBldmVudHMgZnJvbSBlYWNoIHN0cmVhbSByZXR1cm5lZCBieSBmXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmbGF0TWFwIChmLCBzdHJlYW0pIHtcbiAgcmV0dXJuIG1lcmdlTWFwQ29uY3VycmVudGx5KGYsIEluZmluaXR5LCBzdHJlYW0pXG59XG5cbi8qKlxuICogTW9uYWRpYyBqb2luLiBGbGF0dGVuIGEgU3RyZWFtPFN0cmVhbTxYPj4gdG8gU3RyZWFtPFg+IGJ5IG1lcmdpbmcgaW5uZXJcbiAqIHN0cmVhbXMgdG8gdGhlIG91dGVyLiBFdmVudCBhcnJpdmFsIHRpbWVzIGFyZSBwcmVzZXJ2ZWQuXG4gKiBAcGFyYW0ge1N0cmVhbTxTdHJlYW08WD4+fSBzdHJlYW0gc3RyZWFtIG9mIHN0cmVhbXNcbiAqIEByZXR1cm5zIHtTdHJlYW08WD59IG5ldyBzdHJlYW0gY29udGFpbmluZyBhbGwgZXZlbnRzIG9mIGFsbCBpbm5lciBzdHJlYW1zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBqb2luIChzdHJlYW0pIHtcbiAgcmV0dXJuIG1lcmdlQ29uY3VycmVudGx5KEluZmluaXR5LCBzdHJlYW0pXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL2ZsYXRNYXAuanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIFIgZnJvbSAncmFtZGEnO1xuaW1wb3J0IHsgbG9vcCB9IGZyb20gJ21vc3QnO1xuaW1wb3J0ICogYXMgc25hYmJkb20gZnJvbSAnc25hYmJkb20nO1xuaW1wb3J0IENvdW50ZXIgZnJvbSAnLi9jb21wb25lbnRzL2NvdW50ZXInO1xuXG5pbXBvcnQgc25hYkNsYXNzID0gcmVxdWlyZSgnc25hYmJkb20vbW9kdWxlcy9jbGFzcycpO1xuaW1wb3J0IHNuYWJFTHMgPSByZXF1aXJlKCdzbmFiYmRvbS9tb2R1bGVzL2V2ZW50bGlzdGVuZXJzJyk7XG5pbXBvcnQgc25hYkF0dHJzID0gcmVxdWlyZSgnc25hYmJkb20vbW9kdWxlcy9hdHRyaWJ1dGVzJyk7XG5pbXBvcnQgc25hYlByb3BzID0gcmVxdWlyZSgnc25hYmJkb20vbW9kdWxlcy9wcm9wcycpO1xuXG5jb25zdCBoID0gc25hYmJkb20uaDtcblxuY29uc3QgcGF0Y2ggPSBzbmFiYmRvbS5pbml0KFtcbiAgc25hYkNsYXNzLmRlZmF1bHQsXG4gIHNuYWJFTHMuZGVmYXVsdCxcbiAgc25hYkF0dHJzLmRlZmF1bHQsXG4gIHNuYWJQcm9wcy5kZWZhdWx0LFxuXSk7XG5cbmNvbnN0IHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXBwJyk7XG5cbmZ1bmN0aW9uIHBhaXJ3aXNlKHByZXY6IGFueSwgY3VycmVudDogYW55KTogYW55IHtcbiAgcmV0dXJuIHsgc2VlZDogY3VycmVudCwgdmFsdWU6IFtwcmV2LCBjdXJyZW50XSB9O1xufVxuXG5jb25zdCB2aWV3JCA9IENvdW50ZXI7XG5cbnZpZXckXG4gIC5sb29wKHBhaXJ3aXNlLCAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haW4nKSBhcyBFbGVtZW50KSlcbiAgLm9ic2VydmUoKFthLCBiXSkgPT4gcGF0Y2goYSwgYikpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LnRzIiwiZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWdOYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG59XG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlVVJJLCBxdWFsaWZpZWROYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2VVUkksIHF1YWxpZmllZE5hbWUpO1xufVxuZnVuY3Rpb24gY3JlYXRlVGV4dE5vZGUodGV4dCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUNvbW1lbnQodGV4dCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVDb21tZW50KHRleHQpO1xufVxuZnVuY3Rpb24gaW5zZXJ0QmVmb3JlKHBhcmVudE5vZGUsIG5ld05vZGUsIHJlZmVyZW5jZU5vZGUpIHtcbiAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdOb2RlLCByZWZlcmVuY2VOb2RlKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZUNoaWxkKG5vZGUsIGNoaWxkKSB7XG4gICAgbm9kZS5yZW1vdmVDaGlsZChjaGlsZCk7XG59XG5mdW5jdGlvbiBhcHBlbmRDaGlsZChub2RlLCBjaGlsZCkge1xuICAgIG5vZGUuYXBwZW5kQ2hpbGQoY2hpbGQpO1xufVxuZnVuY3Rpb24gcGFyZW50Tm9kZShub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUucGFyZW50Tm9kZTtcbn1cbmZ1bmN0aW9uIG5leHRTaWJsaW5nKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5uZXh0U2libGluZztcbn1cbmZ1bmN0aW9uIHRhZ05hbWUoZWxtKSB7XG4gICAgcmV0dXJuIGVsbS50YWdOYW1lO1xufVxuZnVuY3Rpb24gc2V0VGV4dENvbnRlbnQobm9kZSwgdGV4dCkge1xuICAgIG5vZGUudGV4dENvbnRlbnQgPSB0ZXh0O1xufVxuZnVuY3Rpb24gZ2V0VGV4dENvbnRlbnQobm9kZSkge1xuICAgIHJldHVybiBub2RlLnRleHRDb250ZW50O1xufVxuZnVuY3Rpb24gaXNFbGVtZW50KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gMTtcbn1cbmZ1bmN0aW9uIGlzVGV4dChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDM7XG59XG5mdW5jdGlvbiBpc0NvbW1lbnQobm9kZSkge1xuICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSA4O1xufVxuZXhwb3J0IHZhciBodG1sRG9tQXBpID0ge1xuICAgIGNyZWF0ZUVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnQsXG4gICAgY3JlYXRlRWxlbWVudE5TOiBjcmVhdGVFbGVtZW50TlMsXG4gICAgY3JlYXRlVGV4dE5vZGU6IGNyZWF0ZVRleHROb2RlLFxuICAgIGNyZWF0ZUNvbW1lbnQ6IGNyZWF0ZUNvbW1lbnQsXG4gICAgaW5zZXJ0QmVmb3JlOiBpbnNlcnRCZWZvcmUsXG4gICAgcmVtb3ZlQ2hpbGQ6IHJlbW92ZUNoaWxkLFxuICAgIGFwcGVuZENoaWxkOiBhcHBlbmRDaGlsZCxcbiAgICBwYXJlbnROb2RlOiBwYXJlbnROb2RlLFxuICAgIG5leHRTaWJsaW5nOiBuZXh0U2libGluZyxcbiAgICB0YWdOYW1lOiB0YWdOYW1lLFxuICAgIHNldFRleHRDb250ZW50OiBzZXRUZXh0Q29udGVudCxcbiAgICBnZXRUZXh0Q29udGVudDogZ2V0VGV4dENvbnRlbnQsXG4gICAgaXNFbGVtZW50OiBpc0VsZW1lbnQsXG4gICAgaXNUZXh0OiBpc1RleHQsXG4gICAgaXNDb21tZW50OiBpc0NvbW1lbnQsXG59O1xuZXhwb3J0IGRlZmF1bHQgaHRtbERvbUFwaTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWh0bWxkb21hcGkuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc25hYmJkb20vZXMvaHRtbGRvbWFwaS5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgaCB9IGZyb20gJy4vaCc7XG5mdW5jdGlvbiBjb3B5VG9UaHVuayh2bm9kZSwgdGh1bmspIHtcbiAgICB0aHVuay5lbG0gPSB2bm9kZS5lbG07XG4gICAgdm5vZGUuZGF0YS5mbiA9IHRodW5rLmRhdGEuZm47XG4gICAgdm5vZGUuZGF0YS5hcmdzID0gdGh1bmsuZGF0YS5hcmdzO1xuICAgIHRodW5rLmRhdGEgPSB2bm9kZS5kYXRhO1xuICAgIHRodW5rLmNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW47XG4gICAgdGh1bmsudGV4dCA9IHZub2RlLnRleHQ7XG4gICAgdGh1bmsuZWxtID0gdm5vZGUuZWxtO1xufVxuZnVuY3Rpb24gaW5pdCh0aHVuaykge1xuICAgIHZhciBjdXIgPSB0aHVuay5kYXRhO1xuICAgIHZhciB2bm9kZSA9IGN1ci5mbi5hcHBseSh1bmRlZmluZWQsIGN1ci5hcmdzKTtcbiAgICBjb3B5VG9UaHVuayh2bm9kZSwgdGh1bmspO1xufVxuZnVuY3Rpb24gcHJlcGF0Y2gob2xkVm5vZGUsIHRodW5rKSB7XG4gICAgdmFyIGksIG9sZCA9IG9sZFZub2RlLmRhdGEsIGN1ciA9IHRodW5rLmRhdGE7XG4gICAgdmFyIG9sZEFyZ3MgPSBvbGQuYXJncywgYXJncyA9IGN1ci5hcmdzO1xuICAgIGlmIChvbGQuZm4gIT09IGN1ci5mbiB8fCBvbGRBcmdzLmxlbmd0aCAhPT0gYXJncy5sZW5ndGgpIHtcbiAgICAgICAgY29weVRvVGh1bmsoY3VyLmZuLmFwcGx5KHVuZGVmaW5lZCwgYXJncyksIHRodW5rKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAob2xkQXJnc1tpXSAhPT0gYXJnc1tpXSkge1xuICAgICAgICAgICAgY29weVRvVGh1bmsoY3VyLmZuLmFwcGx5KHVuZGVmaW5lZCwgYXJncyksIHRodW5rKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb3B5VG9UaHVuayhvbGRWbm9kZSwgdGh1bmspO1xufVxuZXhwb3J0IHZhciB0aHVuayA9IGZ1bmN0aW9uIHRodW5rKHNlbCwga2V5LCBmbiwgYXJncykge1xuICAgIGlmIChhcmdzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYXJncyA9IGZuO1xuICAgICAgICBmbiA9IGtleTtcbiAgICAgICAga2V5ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gaChzZWwsIHtcbiAgICAgICAga2V5OiBrZXksXG4gICAgICAgIGhvb2s6IHsgaW5pdDogaW5pdCwgcHJlcGF0Y2g6IHByZXBhdGNoIH0sXG4gICAgICAgIGZuOiBmbixcbiAgICAgICAgYXJnczogYXJnc1xuICAgIH0pO1xufTtcbmV4cG9ydCBkZWZhdWx0IHRodW5rO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGh1bmsuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc25hYmJkb20vZXMvdGh1bmsuanNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGggfSBmcm9tICdzbmFiYmRvbSc7XG5pbXBvcnQgeyBkaXYsIHNwYW4gfSBmcm9tICcuLi9saWIvZWxlbWVudHMnO1xuaW1wb3J0IHsgU3RyZWFtLCBjb21iaW5lIH0gZnJvbSAnbW9zdCc7XG5pbXBvcnQgeyBWTm9kZSB9IGZyb20gJ3NuYWJiZG9tL3Zub2RlJztcbmltcG9ydCB7IENvbXBvbmVudCwgVmlldywgbWFrZUNvbXBvbmVudCB9IGZyb20gJy4uL2xpYi9jb21wb25lbnQnO1xuXG5pbnRlcmZhY2UgSW5pdGlhbGl6ZXIge1xuICBudW06IG51bWJlclxufVxuXG5pbnRlcmZhY2UgTW9kZWwge1xuICBudW06IG51bWJlclxufVxuXG5pbnRlcmZhY2UgTW9kZWxPdXQge1xuICBudW06IENvbXBvbmVudDx7bnVtOiBudW1iZXJ9PlxufVxuXG5pbnRlcmZhY2UgQWN0aW9ucyB7XG4gIGRlY3JlbWVudDogU3RyZWFtPEV2ZW50PixcbiAgaW5jcmVtZW50OiBTdHJlYW08RXZlbnQ+LFxufVxuXG5pbnRlcmZhY2UgQWN0aW9uU3RyZWFtIHtcblxufVxuXG5jb25zdCBpbml0ID0gKChpbml0OiBJbml0aWFsaXplcik6IE1vZGVsID0+IGluaXQpO1xuXG5jb25zdCBtb2RlbCA9ICgoc3RhdGU6IE1vZGVsLCBhY3Rpb25zOiB7fSk6IHt9ID0+IHtcbiAgLy8gY29uc3QgZGVjOiBTdHJlYW08bnVtYmVyPiA9IGFjdGlvbnMuZGVjcmVtZW50LmNvbnN0YW50KC0xKTtcbiAgLy8gY29uc3QgaW5jOiBTdHJlYW08bnVtYmVyPiA9IGFjdGlvbnMuaW5jcmVtZW50LmNvbnN0YW50KDEpO1xuICAvLyBjb25zdCBkZWx0YSA9IGNvbWJpbmUoKGEsIGIpID0+IGEgKyBiLCBpbmMsIGRlYyk7XG5cbiAgcmV0dXJuIHtudW06IDB9O1xufSk7XG5cbmNvbnN0IHZpZXcgPSA8Vmlldz4oKHN0YXRlOiBNb2RlbCwgYWN0aW9ucykgPT5cbiAgZGl2KFtcbiAgICBoKCdidXR0b24nLCB7IG9uOiB7IGNsaWNrOiBhY3Rpb25zLmRlY3JlbWVudCB9fSwgJy0nKSxcbiAgICBoKCdzcGFuJywgXCI2OVwiKSxcbiAgICBoKCdidXR0b24nLCB7IG9uOiB7IGNsaWNrOiBhY3Rpb25zLmluY3JlbWVudCB9fSwgJy0nKSxcbiAgXSlcbik7XG5cbmV4cG9ydCBkZWZhdWx0IG1ha2VDb21wb25lbnQoaW5pdCwgdmlldywge30pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvY291bnRlci50cyIsImltcG9ydCB7IFN0cmVhbSwganVzdCB9IGZyb20gJ21vc3QnO1xuaW1wb3J0IHsgVk5vZGUgfSBmcm9tICdzbmFiYmRvbS92bm9kZSc7XG5cbmludGVyZmFjZSBTdHJlYW1NYXAge1xuICBbcHJvcE5hbWU6IHN0cmluZ106IFN0cmVhbTxhbnk+XG59XG5cbmludGVyZmFjZSBBY3Rpb25NYXAge1xuICBbcHJvcE5hbWU6IHN0cmluZ106IChldmVudDogRXZlbnQpID0+IFN0cmVhbTxhbnk+XG59XG5cbmludGVyZmFjZSBJbml0aWFsaXplciB7XG4gIChwcm9wczoge30pOiB7fVxufVxuXG5pbnRlcmZhY2UgVmlldyB7XG4gIChzdGF0ZToge30sIGFjdGlvbnM6IEFjdGlvbk1hcCk6IFZOb2RlXG59XG5cbmludGVyZmFjZSBDb21wb25lbnQ8QT4ge1xuICAoaW5pdDogSW5pdGlhbGl6ZXIpOiBTdHJlYW08Vk5vZGU+XG59XG5cbmNvbnN0IG1ha2VDb21wb25lbnQgPSAoKGluaXQ6IEluaXRpYWxpemVyLCB2aWV3OiBWaWV3LCBhY3Rpb25TdHJlYW1zOiBTdHJlYW1NYXApOiBTdHJlYW08Vk5vZGU+ID0+IHtcbiAgcmV0dXJuIGp1c3Qodmlldyhpbml0LCB7fSkpO1xufSk7XG5cbmV4cG9ydCB7IENvbXBvbmVudCwgbWFrZUNvbXBvbmVudCwgVmlldyB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2xpYi9jb21wb25lbnQudHMiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFN0cmVhbSBmcm9tICcuL1N0cmVhbSdcbmltcG9ydCAqIGFzIGJhc2UgZnJvbSAnQG1vc3QvcHJlbHVkZSdcbmltcG9ydCB7IG9mLCBlbXB0eSwgbmV2ZXIgfSBmcm9tICcuL3NvdXJjZS9jb3JlJ1xuaW1wb3J0IHsgZnJvbSB9IGZyb20gJy4vc291cmNlL2Zyb20nXG5pbXBvcnQgeyBwZXJpb2RpYyB9IGZyb20gJy4vc291cmNlL3BlcmlvZGljJ1xuaW1wb3J0IHN5bWJvbE9ic2VydmFibGUgZnJvbSAnc3ltYm9sLW9ic2VydmFibGUnXG5cbi8qKlxuICogQ29yZSBzdHJlYW0gdHlwZVxuICogQHR5cGUge1N0cmVhbX1cbiAqL1xuZXhwb3J0IHsgU3RyZWFtIH1cblxuLy8gQWRkIG9mIGFuZCBlbXB0eSB0byBjb25zdHJ1Y3RvciBmb3IgZmFudGFzeS1sYW5kIGNvbXBhdFxuU3RyZWFtLm9mID0gb2ZcblN0cmVhbS5lbXB0eSA9IGVtcHR5XG4vLyBBZGQgZnJvbSB0byBjb25zdHJ1Y3RvciBmb3IgRVMgT2JzZXJ2YWJsZSBjb21wYXRcblN0cmVhbS5mcm9tID0gZnJvbVxuZXhwb3J0IHsgb2YsIG9mIGFzIGp1c3QsIGVtcHR5LCBuZXZlciwgZnJvbSwgcGVyaW9kaWMgfVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRHJhZnQgRVMgT2JzZXJ2YWJsZSBwcm9wb3NhbCBpbnRlcm9wXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemVucGFyc2luZy9lcy1vYnNlcnZhYmxlXG5cbmltcG9ydCB7IHN1YnNjcmliZSB9IGZyb20gJy4vb2JzZXJ2YWJsZS9zdWJzY3JpYmUnXG5cblN0cmVhbS5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgcmV0dXJuIHN1YnNjcmliZShzdWJzY3JpYmVyLCB0aGlzKVxufVxuXG5TdHJlYW0ucHJvdG90eXBlW3N5bWJvbE9ic2VydmFibGVdID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpc1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRmx1ZW50IGFkYXB0ZXJcblxuaW1wb3J0IHsgdGhydSB9IGZyb20gJy4vY29tYmluYXRvci90aHJ1J1xuXG4vKipcbiAqIEFkYXB0IGEgZnVuY3Rpb25hbCBzdHJlYW0gdHJhbnNmb3JtIHRvIGZsdWVudCBzdHlsZS5cbiAqIEl0IGFwcGxpZXMgZiB0byB0aGUgdGhpcyBzdHJlYW0gb2JqZWN0XG4gKiBAcGFyYW0gIHtmdW5jdGlvbihzOiBTdHJlYW0pOiBTdHJlYW19IGYgZnVuY3Rpb24gdGhhdFxuICogcmVjZWl2ZXMgdGhlIHN0cmVhbSBpdHNlbGYgYW5kIG11c3QgcmV0dXJuIGEgbmV3IHN0cmVhbVxuICogQHJldHVybiB7U3RyZWFtfVxuICovXG5TdHJlYW0ucHJvdG90eXBlLnRocnUgPSBmdW5jdGlvbiAoZikge1xuICByZXR1cm4gdGhydShmLCB0aGlzKVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gQWRhcHRpbmcgb3RoZXIgc291cmNlc1xuXG4vKipcbiAqIENyZWF0ZSBhIHN0cmVhbSBvZiBldmVudHMgZnJvbSB0aGUgc3VwcGxpZWQgRXZlbnRUYXJnZXQgb3IgRXZlbnRFbWl0dGVyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgZXZlbnQgbmFtZVxuICogQHBhcmFtIHtFdmVudFRhcmdldHxFdmVudEVtaXR0ZXJ9IHNvdXJjZSBFdmVudFRhcmdldCBvciBFdmVudEVtaXR0ZXIuIFRoZSBzb3VyY2VcbiAqICBtdXN0IHN1cHBvcnQgZWl0aGVyIGFkZEV2ZW50TGlzdGVuZXIvcmVtb3ZlRXZlbnRMaXN0ZW5lciAodzNjIEV2ZW50VGFyZ2V0OlxuICogIGh0dHA6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0yLUV2ZW50cy9ldmVudHMuaHRtbCNFdmVudHMtRXZlbnRUYXJnZXQpLFxuICogIG9yIGFkZExpc3RlbmVyL3JlbW92ZUxpc3RlbmVyIChub2RlIEV2ZW50RW1pdHRlcjogaHR0cDovL25vZGVqcy5vcmcvYXBpL2V2ZW50cy5odG1sKVxuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIG9mIGV2ZW50cyBvZiB0aGUgc3BlY2lmaWVkIHR5cGUgZnJvbSB0aGUgc291cmNlXG4gKi9cbmV4cG9ydCB7IGZyb21FdmVudCB9IGZyb20gJy4vc291cmNlL2Zyb21FdmVudCdcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9ic2VydmluZ1xuXG5pbXBvcnQgeyBvYnNlcnZlLCBkcmFpbiB9IGZyb20gJy4vY29tYmluYXRvci9vYnNlcnZlJ1xuXG5leHBvcnQgeyBvYnNlcnZlLCBvYnNlcnZlIGFzIGZvckVhY2gsIGRyYWluIH1cblxuLyoqXG4gKiBQcm9jZXNzIGFsbCB0aGUgZXZlbnRzIGluIHRoZSBzdHJlYW1cbiAqIEByZXR1cm5zIHtQcm9taXNlfSBwcm9taXNlIHRoYXQgZnVsZmlsbHMgd2hlbiB0aGUgc3RyZWFtIGVuZHMsIG9yIHJlamVjdHNcbiAqICBpZiB0aGUgc3RyZWFtIGZhaWxzIHdpdGggYW4gdW5oYW5kbGVkIGVycm9yLlxuICovXG5TdHJlYW0ucHJvdG90eXBlLm9ic2VydmUgPSBTdHJlYW0ucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoZikge1xuICByZXR1cm4gb2JzZXJ2ZShmLCB0aGlzKVxufVxuXG4vKipcbiAqIENvbnN1bWUgYWxsIGV2ZW50cyBpbiB0aGUgc3RyZWFtLCB3aXRob3V0IHByb3ZpZGluZyBhIGZ1bmN0aW9uIHRvIHByb2Nlc3MgZWFjaC5cbiAqIFRoaXMgY2F1c2VzIGEgc3RyZWFtIHRvIGJlY29tZSBhY3RpdmUgYW5kIGJlZ2luIGVtaXR0aW5nIGV2ZW50cywgYW5kIGlzIHVzZWZ1bFxuICogaW4gY2FzZXMgd2hlcmUgYWxsIHByb2Nlc3NpbmcgaGFzIGJlZW4gc2V0dXAgdXBzdHJlYW0gdmlhIG90aGVyIGNvbWJpbmF0b3JzLCBhbmRcbiAqIHRoZXJlIGlzIG5vIG5lZWQgdG8gcHJvY2VzcyB0aGUgdGVybWluYWwgZXZlbnRzLlxuICogQHJldHVybnMge1Byb21pc2V9IHByb21pc2UgdGhhdCBmdWxmaWxscyB3aGVuIHRoZSBzdHJlYW0gZW5kcywgb3IgcmVqZWN0c1xuICogIGlmIHRoZSBzdHJlYW0gZmFpbHMgd2l0aCBhbiB1bmhhbmRsZWQgZXJyb3IuXG4gKi9cblN0cmVhbS5wcm90b3R5cGUuZHJhaW4gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBkcmFpbih0aGlzKVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmltcG9ydCB7IGxvb3AgfSBmcm9tICcuL2NvbWJpbmF0b3IvbG9vcCdcblxuZXhwb3J0IHsgbG9vcCB9XG5cbi8qKlxuICogR2VuZXJhbGl6ZWQgZmVlZGJhY2sgbG9vcC4gQ2FsbCBhIHN0ZXBwZXIgZnVuY3Rpb24gZm9yIGVhY2ggZXZlbnQuIFRoZSBzdGVwcGVyXG4gKiB3aWxsIGJlIGNhbGxlZCB3aXRoIDIgcGFyYW1zOiB0aGUgY3VycmVudCBzZWVkIGFuZCB0aGUgYW4gZXZlbnQgdmFsdWUuICBJdCBtdXN0XG4gKiByZXR1cm4gYSBuZXcgeyBzZWVkLCB2YWx1ZSB9IHBhaXIuIFRoZSBgc2VlZGAgd2lsbCBiZSBmZWQgYmFjayBpbnRvIHRoZSBuZXh0XG4gKiBpbnZvY2F0aW9uIG9mIHN0ZXBwZXIsIGFuZCB0aGUgYHZhbHVlYCB3aWxsIGJlIHByb3BhZ2F0ZWQgYXMgdGhlIGV2ZW50IHZhbHVlLlxuICogQHBhcmFtIHtmdW5jdGlvbihzZWVkOiosIHZhbHVlOiopOntzZWVkOiosIHZhbHVlOip9fSBzdGVwcGVyIGxvb3Agc3RlcCBmdW5jdGlvblxuICogQHBhcmFtIHsqfSBzZWVkIGluaXRpYWwgc2VlZCB2YWx1ZSBwYXNzZWQgdG8gZmlyc3Qgc3RlcHBlciBjYWxsXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIHdob3NlIHZhbHVlcyBhcmUgdGhlIGB2YWx1ZWAgZmllbGQgb2YgdGhlIG9iamVjdHNcbiAqIHJldHVybmVkIGJ5IHRoZSBzdGVwcGVyXG4gKi9cblN0cmVhbS5wcm90b3R5cGUubG9vcCA9IGZ1bmN0aW9uIChzdGVwcGVyLCBzZWVkKSB7XG4gIHJldHVybiBsb29wKHN0ZXBwZXIsIHNlZWQsIHRoaXMpXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuaW1wb3J0IHsgc2NhbiwgcmVkdWNlIH0gZnJvbSAnLi9jb21iaW5hdG9yL2FjY3VtdWxhdGUnXG5cbmV4cG9ydCB7IHNjYW4sIHJlZHVjZSB9XG5cbi8qKlxuICogQ3JlYXRlIGEgc3RyZWFtIGNvbnRhaW5pbmcgc3VjY2Vzc2l2ZSByZWR1Y2UgcmVzdWx0cyBvZiBhcHBseWluZyBmIHRvXG4gKiB0aGUgcHJldmlvdXMgcmVkdWNlIHJlc3VsdCBhbmQgdGhlIGN1cnJlbnQgc3RyZWFtIGl0ZW0uXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHJlc3VsdDoqLCB4OiopOip9IGYgcmVkdWNlciBmdW5jdGlvblxuICogQHBhcmFtIHsqfSBpbml0aWFsIGluaXRpYWwgdmFsdWVcbiAqIEByZXR1cm5zIHtTdHJlYW19IG5ldyBzdHJlYW0gY29udGFpbmluZyBzdWNjZXNzaXZlIHJlZHVjZSByZXN1bHRzXG4gKi9cblN0cmVhbS5wcm90b3R5cGUuc2NhbiA9IGZ1bmN0aW9uIChmLCBpbml0aWFsKSB7XG4gIHJldHVybiBzY2FuKGYsIGluaXRpYWwsIHRoaXMpXG59XG5cbi8qKlxuICogUmVkdWNlIHRoZSBzdHJlYW0gdG8gcHJvZHVjZSBhIHNpbmdsZSByZXN1bHQuICBOb3RlIHRoYXQgcmVkdWNpbmcgYW4gaW5maW5pdGVcbiAqIHN0cmVhbSB3aWxsIHJldHVybiBhIFByb21pc2UgdGhhdCBuZXZlciBmdWxmaWxscywgYnV0IHRoYXQgbWF5IHJlamVjdCBpZiBhbiBlcnJvclxuICogb2NjdXJzLlxuICogQHBhcmFtIHtmdW5jdGlvbihyZXN1bHQ6KiwgeDoqKToqfSBmIHJlZHVjZXIgZnVuY3Rpb25cbiAqIEBwYXJhbSB7Kn0gaW5pdGlhbCBvcHRpb25hbCBpbml0aWFsIHZhbHVlXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gcHJvbWlzZSBmb3IgdGhlIGZpbGUgcmVzdWx0IG9mIHRoZSByZWR1Y2VcbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5yZWR1Y2UgPSBmdW5jdGlvbiAoZiwgaW5pdGlhbCkge1xuICByZXR1cm4gcmVkdWNlKGYsIGluaXRpYWwsIHRoaXMpXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBCdWlsZGluZyBhbmQgZXh0ZW5kaW5nXG5cbmV4cG9ydCB7IHVuZm9sZCB9IGZyb20gJy4vc291cmNlL3VuZm9sZCdcbmV4cG9ydCB7IGl0ZXJhdGUgfSBmcm9tICcuL3NvdXJjZS9pdGVyYXRlJ1xuZXhwb3J0IHsgZ2VuZXJhdGUgfSBmcm9tICcuL3NvdXJjZS9nZW5lcmF0ZSdcbmltcG9ydCB7IGNvbmNhdCwgY29ucyBhcyBzdGFydFdpdGggfSBmcm9tICcuL2NvbWJpbmF0b3IvYnVpbGQnXG5cbmV4cG9ydCB7IGNvbmNhdCwgc3RhcnRXaXRoIH1cblxuLyoqXG4gKiBAcGFyYW0ge1N0cmVhbX0gdGFpbFxuICogQHJldHVybnMge1N0cmVhbX0gbmV3IHN0cmVhbSBjb250YWluaW5nIGFsbCBpdGVtcyBpbiB0aGlzIGZvbGxvd2VkIGJ5XG4gKiAgYWxsIGl0ZW1zIGluIHRhaWxcbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5jb25jYXQgPSBmdW5jdGlvbiAodGFpbCkge1xuICByZXR1cm4gY29uY2F0KHRoaXMsIHRhaWwpXG59XG5cbi8qKlxuICogQHBhcmFtIHsqfSB4IHZhbHVlIHRvIHByZXBlbmRcbiAqIEByZXR1cm5zIHtTdHJlYW19IGEgbmV3IHN0cmVhbSB3aXRoIHggcHJlcGVuZGVkXG4gKi9cblN0cmVhbS5wcm90b3R5cGUuc3RhcnRXaXRoID0gZnVuY3Rpb24gKHgpIHtcbiAgcmV0dXJuIHN0YXJ0V2l0aCh4LCB0aGlzKVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gVHJhbnNmb3JtaW5nXG5cbmltcG9ydCB7IG1hcCwgY29uc3RhbnQsIHRhcCB9IGZyb20gJy4vY29tYmluYXRvci90cmFuc2Zvcm0nXG5pbXBvcnQgeyBhcCB9IGZyb20gJy4vY29tYmluYXRvci9hcHBsaWNhdGl2ZSdcblxuZXhwb3J0IHsgbWFwLCBjb25zdGFudCwgdGFwLCBhcCB9XG5cbi8qKlxuICogVHJhbnNmb3JtIGVhY2ggdmFsdWUgaW4gdGhlIHN0cmVhbSBieSBhcHBseWluZyBmIHRvIGVhY2hcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKik6Kn0gZiBtYXBwaW5nIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gY29udGFpbmluZyBpdGVtcyB0cmFuc2Zvcm1lZCBieSBmXG4gKi9cblN0cmVhbS5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24gKGYpIHtcbiAgcmV0dXJuIG1hcChmLCB0aGlzKVxufVxuXG4vKipcbiAqIEFzc3VtZSB0aGlzIHN0cmVhbSBjb250YWlucyBmdW5jdGlvbnMsIGFuZCBhcHBseSBlYWNoIGZ1bmN0aW9uIHRvIGVhY2ggaXRlbVxuICogaW4gdGhlIHByb3ZpZGVkIHN0cmVhbS4gIFRoaXMgZ2VuZXJhdGVzLCBpbiBlZmZlY3QsIGEgY3Jvc3MgcHJvZHVjdC5cbiAqIEBwYXJhbSB7U3RyZWFtfSB4cyBzdHJlYW0gb2YgaXRlbXMgdG8gd2hpY2hcbiAqIEByZXR1cm5zIHtTdHJlYW19IHN0cmVhbSBjb250YWluaW5nIHRoZSBjcm9zcyBwcm9kdWN0IG9mIGl0ZW1zXG4gKi9cblN0cmVhbS5wcm90b3R5cGUuYXAgPSBmdW5jdGlvbiAoeHMpIHtcbiAgcmV0dXJuIGFwKHRoaXMsIHhzKVxufVxuXG4vKipcbiAqIFJlcGxhY2UgZWFjaCB2YWx1ZSBpbiB0aGUgc3RyZWFtIHdpdGggeFxuICogQHBhcmFtIHsqfSB4XG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gY29udGFpbmluZyBpdGVtcyByZXBsYWNlZCB3aXRoIHhcbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5jb25zdGFudCA9IGZ1bmN0aW9uICh4KSB7XG4gIHJldHVybiBjb25zdGFudCh4LCB0aGlzKVxufVxuXG4vKipcbiAqIFBlcmZvcm0gYSBzaWRlIGVmZmVjdCBmb3IgZWFjaCBpdGVtIGluIHRoZSBzdHJlYW1cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oeDoqKToqfSBmIHNpZGUgZWZmZWN0IHRvIGV4ZWN1dGUgZm9yIGVhY2ggaXRlbS4gVGhlXG4gKiAgcmV0dXJuIHZhbHVlIHdpbGwgYmUgZGlzY2FyZGVkLlxuICogQHJldHVybnMge1N0cmVhbX0gbmV3IHN0cmVhbSBjb250YWluaW5nIHRoZSBzYW1lIGl0ZW1zIGFzIHRoaXMgc3RyZWFtXG4gKi9cblN0cmVhbS5wcm90b3R5cGUudGFwID0gZnVuY3Rpb24gKGYpIHtcbiAgcmV0dXJuIHRhcChmLCB0aGlzKVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gVHJhbnNkdWNlciBzdXBwb3J0XG5cbmltcG9ydCB7IHRyYW5zZHVjZSB9IGZyb20gJy4vY29tYmluYXRvci90cmFuc2R1Y2UnXG5cbmV4cG9ydCB7IHRyYW5zZHVjZSB9XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoaXMgc3RyZWFtIGJ5IHBhc3NpbmcgaXRzIGV2ZW50cyB0aHJvdWdoIGEgdHJhbnNkdWNlci5cbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSB0cmFuc2R1Y2VyIHRyYW5zZHVjZXIgZnVuY3Rpb25cbiAqIEByZXR1cm4ge1N0cmVhbX0gc3RyZWFtIG9mIGV2ZW50cyB0cmFuc2Zvcm1lZCBieSB0aGUgdHJhbnNkdWNlclxuICovXG5TdHJlYW0ucHJvdG90eXBlLnRyYW5zZHVjZSA9IGZ1bmN0aW9uICh0cmFuc2R1Y2VyKSB7XG4gIHJldHVybiB0cmFuc2R1Y2UodHJhbnNkdWNlciwgdGhpcylcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEZsYXRNYXBwaW5nXG5cbmltcG9ydCB7IGZsYXRNYXAsIGpvaW4gfSBmcm9tICcuL2NvbWJpbmF0b3IvZmxhdE1hcCdcblxuLy8gQGRlcHJlY2F0ZWQgZmxhdE1hcCwgdXNlIGNoYWluIGluc3RlYWRcbmV4cG9ydCB7IGZsYXRNYXAsIGZsYXRNYXAgYXMgY2hhaW4sIGpvaW4gfVxuXG4vKipcbiAqIE1hcCBlYWNoIHZhbHVlIGluIHRoZSBzdHJlYW0gdG8gYSBuZXcgc3RyZWFtLCBhbmQgbWVyZ2UgaXQgaW50byB0aGVcbiAqIHJldHVybmVkIG91dGVyIHN0cmVhbS4gRXZlbnQgYXJyaXZhbCB0aW1lcyBhcmUgcHJlc2VydmVkLlxuICogQHBhcmFtIHtmdW5jdGlvbih4OiopOlN0cmVhbX0gZiBjaGFpbmluZyBmdW5jdGlvbiwgbXVzdCByZXR1cm4gYSBTdHJlYW1cbiAqIEByZXR1cm5zIHtTdHJlYW19IG5ldyBzdHJlYW0gY29udGFpbmluZyBhbGwgZXZlbnRzIGZyb20gZWFjaCBzdHJlYW0gcmV0dXJuZWQgYnkgZlxuICovXG5TdHJlYW0ucHJvdG90eXBlLmNoYWluID0gZnVuY3Rpb24gKGYpIHtcbiAgcmV0dXJuIGZsYXRNYXAoZiwgdGhpcylcbn1cblxuLy8gQGRlcHJlY2F0ZWQgdXNlIGNoYWluIGluc3RlYWRcblN0cmVhbS5wcm90b3R5cGUuZmxhdE1hcCA9IFN0cmVhbS5wcm90b3R5cGUuY2hhaW5cblxuICAvKipcbiAqIE1vbmFkaWMgam9pbi4gRmxhdHRlbiBhIFN0cmVhbTxTdHJlYW08WD4+IHRvIFN0cmVhbTxYPiBieSBtZXJnaW5nIGlubmVyXG4gKiBzdHJlYW1zIHRvIHRoZSBvdXRlci4gRXZlbnQgYXJyaXZhbCB0aW1lcyBhcmUgcHJlc2VydmVkLlxuICogQHJldHVybnMge1N0cmVhbTxYPn0gbmV3IHN0cmVhbSBjb250YWluaW5nIGFsbCBldmVudHMgb2YgYWxsIGlubmVyIHN0cmVhbXNcbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5qb2luID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gam9pbih0aGlzKVxufVxuXG5pbXBvcnQgeyBjb250aW51ZVdpdGggfSBmcm9tICcuL2NvbWJpbmF0b3IvY29udGludWVXaXRoJ1xuXG4vLyBAZGVwcmVjYXRlZCBmbGF0TWFwRW5kLCB1c2UgY29udGludWVXaXRoIGluc3RlYWRcbmV4cG9ydCB7IGNvbnRpbnVlV2l0aCwgY29udGludWVXaXRoIGFzIGZsYXRNYXBFbmQgfVxuXG4vKipcbiAqIE1hcCB0aGUgZW5kIGV2ZW50IHRvIGEgbmV3IHN0cmVhbSwgYW5kIGJlZ2luIGVtaXR0aW5nIGl0cyB2YWx1ZXMuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHg6Kik6U3RyZWFtfSBmIGZ1bmN0aW9uIHRoYXQgcmVjZWl2ZXMgdGhlIGVuZCBldmVudCB2YWx1ZSxcbiAqIGFuZCAqbXVzdCogcmV0dXJuIGEgbmV3IFN0cmVhbSB0byBjb250aW51ZSB3aXRoLlxuICogQHJldHVybnMge1N0cmVhbX0gbmV3IHN0cmVhbSB0aGF0IGVtaXRzIGFsbCBldmVudHMgZnJvbSB0aGUgb3JpZ2luYWwgc3RyZWFtLFxuICogZm9sbG93ZWQgYnkgYWxsIGV2ZW50cyBmcm9tIHRoZSBzdHJlYW0gcmV0dXJuZWQgYnkgZi5cbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5jb250aW51ZVdpdGggPSBmdW5jdGlvbiAoZikge1xuICByZXR1cm4gY29udGludWVXaXRoKGYsIHRoaXMpXG59XG5cbi8vIEBkZXByZWNhdGVkIHVzZSBjb250aW51ZVdpdGggaW5zdGVhZFxuU3RyZWFtLnByb3RvdHlwZS5mbGF0TWFwRW5kID0gU3RyZWFtLnByb3RvdHlwZS5jb250aW51ZVdpdGhcblxuaW1wb3J0IHsgY29uY2F0TWFwIH0gZnJvbSAnLi9jb21iaW5hdG9yL2NvbmNhdE1hcCdcblxuZXhwb3J0IHsgY29uY2F0TWFwIH1cblxuU3RyZWFtLnByb3RvdHlwZS5jb25jYXRNYXAgPSBmdW5jdGlvbiAoZikge1xuICByZXR1cm4gY29uY2F0TWFwKGYsIHRoaXMpXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBDb25jdXJyZW50IG1lcmdpbmdcblxuaW1wb3J0IHsgbWVyZ2VDb25jdXJyZW50bHkgfSBmcm9tICcuL2NvbWJpbmF0b3IvbWVyZ2VDb25jdXJyZW50bHknXG5cbmV4cG9ydCB7IG1lcmdlQ29uY3VycmVudGx5IH1cblxuLyoqXG4gKiBGbGF0dGVuIGEgU3RyZWFtPFN0cmVhbTxYPj4gdG8gU3RyZWFtPFg+IGJ5IG1lcmdpbmcgaW5uZXJcbiAqIHN0cmVhbXMgdG8gdGhlIG91dGVyLCBsaW1pdGluZyB0aGUgbnVtYmVyIG9mIGlubmVyIHN0cmVhbXMgdGhhdCBtYXlcbiAqIGJlIGFjdGl2ZSBjb25jdXJyZW50bHkuXG4gKiBAcGFyYW0ge251bWJlcn0gY29uY3VycmVuY3kgYXQgbW9zdCB0aGlzIG1hbnkgaW5uZXIgc3RyZWFtcyB3aWxsIGJlXG4gKiAgYWxsb3dlZCB0byBiZSBhY3RpdmUgY29uY3VycmVudGx5LlxuICogQHJldHVybiB7U3RyZWFtPFg+fSBuZXcgc3RyZWFtIGNvbnRhaW5pbmcgYWxsIGV2ZW50cyBvZiBhbGwgaW5uZXJcbiAqICBzdHJlYW1zLCB3aXRoIGxpbWl0ZWQgY29uY3VycmVuY3kuXG4gKi9cblN0cmVhbS5wcm90b3R5cGUubWVyZ2VDb25jdXJyZW50bHkgPSBmdW5jdGlvbiAoY29uY3VycmVuY3kpIHtcbiAgcmV0dXJuIG1lcmdlQ29uY3VycmVudGx5KGNvbmN1cnJlbmN5LCB0aGlzKVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gTWVyZ2luZ1xuXG5pbXBvcnQgeyBtZXJnZSwgbWVyZ2VBcnJheSB9IGZyb20gJy4vY29tYmluYXRvci9tZXJnZSdcblxuZXhwb3J0IHsgbWVyZ2UsIG1lcmdlQXJyYXkgfVxuXG4vKipcbiAqIE1lcmdlIHRoaXMgc3RyZWFtIGFuZCBhbGwgdGhlIHByb3ZpZGVkIHN0cmVhbXNcbiAqIEByZXR1cm5zIHtTdHJlYW19IHN0cmVhbSBjb250YWluaW5nIGl0ZW1zIGZyb20gdGhpcyBzdHJlYW0gYW5kIHMgaW4gdGltZVxuICogb3JkZXIuICBJZiB0d28gZXZlbnRzIGFyZSBzaW11bHRhbmVvdXMgdGhleSB3aWxsIGJlIG1lcmdlZCBpblxuICogYXJiaXRyYXJ5IG9yZGVyLlxuICovXG5TdHJlYW0ucHJvdG90eXBlLm1lcmdlID0gZnVuY3Rpb24gKC8qIC4uLnN0cmVhbXMqLykge1xuICByZXR1cm4gbWVyZ2VBcnJheShiYXNlLmNvbnModGhpcywgYXJndW1lbnRzKSlcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIENvbWJpbmluZ1xuXG5pbXBvcnQgeyBjb21iaW5lLCBjb21iaW5lQXJyYXkgfSBmcm9tICcuL2NvbWJpbmF0b3IvY29tYmluZSdcblxuZXhwb3J0IHsgY29tYmluZSwgY29tYmluZUFycmF5IH1cblxuLyoqXG4gKiBDb21iaW5lIGxhdGVzdCBldmVudHMgZnJvbSBhbGwgaW5wdXQgc3RyZWFtc1xuICogQHBhcmFtIHtmdW5jdGlvbiguLi5ldmVudHMpOip9IGYgZnVuY3Rpb24gdG8gY29tYmluZSBtb3N0IHJlY2VudCBldmVudHNcbiAqIEByZXR1cm5zIHtTdHJlYW19IHN0cmVhbSBjb250YWluaW5nIHRoZSByZXN1bHQgb2YgYXBwbHlpbmcgZiB0byB0aGUgbW9zdCByZWNlbnRcbiAqICBldmVudCBvZiBlYWNoIGlucHV0IHN0cmVhbSwgd2hlbmV2ZXIgYSBuZXcgZXZlbnQgYXJyaXZlcyBvbiBhbnkgc3RyZWFtLlxuICovXG5TdHJlYW0ucHJvdG90eXBlLmNvbWJpbmUgPSBmdW5jdGlvbiAoZiAvKiwgLi4uc3RyZWFtcyovKSB7XG4gIHJldHVybiBjb21iaW5lQXJyYXkoZiwgYmFzZS5yZXBsYWNlKHRoaXMsIDAsIGFyZ3VtZW50cykpXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBTYW1wbGluZ1xuXG5pbXBvcnQgeyBzYW1wbGUsIHNhbXBsZUFycmF5LCBzYW1wbGVXaXRoIH0gZnJvbSAnLi9jb21iaW5hdG9yL3NhbXBsZSdcblxuZXhwb3J0IHsgc2FtcGxlLCBzYW1wbGVBcnJheSwgc2FtcGxlV2l0aCB9XG5cbi8qKlxuICogV2hlbiBhbiBldmVudCBhcnJpdmVzIG9uIHNhbXBsZXIsIGVtaXQgdGhlIGxhdGVzdCBldmVudCB2YWx1ZSBmcm9tIHN0cmVhbS5cbiAqIEBwYXJhbSB7U3RyZWFtfSBzYW1wbGVyIHN0cmVhbSBvZiBldmVudHMgYXQgd2hvc2UgYXJyaXZhbCB0aW1lXG4gKiAgc2lnbmFsJ3MgbGF0ZXN0IHZhbHVlIHdpbGwgYmUgcHJvcGFnYXRlZFxuICogQHJldHVybnMge1N0cmVhbX0gc2FtcGxlZCBzdHJlYW0gb2YgdmFsdWVzXG4gKi9cblN0cmVhbS5wcm90b3R5cGUuc2FtcGxlV2l0aCA9IGZ1bmN0aW9uIChzYW1wbGVyKSB7XG4gIHJldHVybiBzYW1wbGVXaXRoKHNhbXBsZXIsIHRoaXMpXG59XG5cbi8qKlxuICogV2hlbiBhbiBldmVudCBhcnJpdmVzIG9uIHRoaXMgc3RyZWFtLCBlbWl0IHRoZSByZXN1bHQgb2YgY2FsbGluZyBmIHdpdGggdGhlIGxhdGVzdFxuICogdmFsdWVzIG9mIGFsbCBzdHJlYW1zIGJlaW5nIHNhbXBsZWRcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oLi4udmFsdWVzKToqfSBmIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggc2V0IG9mIHNhbXBsZWQgdmFsdWVzXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gb2Ygc2FtcGxlZCBhbmQgdHJhbnNmb3JtZWQgdmFsdWVzXG4gKi9cblN0cmVhbS5wcm90b3R5cGUuc2FtcGxlID0gZnVuY3Rpb24gKGYgLyogLi4uc3RyZWFtcyAqLykge1xuICByZXR1cm4gc2FtcGxlQXJyYXkoZiwgdGhpcywgYmFzZS50YWlsKGFyZ3VtZW50cykpXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBaaXBwaW5nXG5cbmltcG9ydCB7IHppcCwgemlwQXJyYXkgfSBmcm9tICcuL2NvbWJpbmF0b3IvemlwJ1xuXG5leHBvcnQgeyB6aXAsIHppcEFycmF5IH1cblxuLyoqXG4gKiBQYWlyLXdpc2UgY29tYmluZSBpdGVtcyB3aXRoIHRob3NlIGluIHMuIEdpdmVuIDIgc3RyZWFtczpcbiAqIFsxLDIsM10gemlwV2l0aCBmIFs0LDUsNl0gLT4gW2YoMSw0KSxmKDIsNSksZigzLDYpXVxuICogTm90ZTogemlwIGNhdXNlcyBmYXN0IHN0cmVhbXMgdG8gYnVmZmVyIGFuZCB3YWl0IGZvciBzbG93IHN0cmVhbXMuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKGE6U3RyZWFtLCBiOlN0cmVhbSwgLi4uKToqfSBmIGZ1bmN0aW9uIHRvIGNvbWJpbmUgaXRlbXNcbiAqIEByZXR1cm5zIHtTdHJlYW19IG5ldyBzdHJlYW0gY29udGFpbmluZyBwYWlyc1xuICovXG5TdHJlYW0ucHJvdG90eXBlLnppcCA9IGZ1bmN0aW9uIChmIC8qLCAuLi5zdHJlYW1zKi8pIHtcbiAgcmV0dXJuIHppcEFycmF5KGYsIGJhc2UucmVwbGFjZSh0aGlzLCAwLCBhcmd1bWVudHMpKVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gU3dpdGNoaW5nXG5cbmltcG9ydCB7IHN3aXRjaExhdGVzdCB9IGZyb20gJy4vY29tYmluYXRvci9zd2l0Y2gnXG5cbi8vIEBkZXByZWNhdGVkIHN3aXRjaCwgdXNlIHN3aXRjaExhdGVzdCBpbnN0ZWFkXG5leHBvcnQgeyBzd2l0Y2hMYXRlc3QsIHN3aXRjaExhdGVzdCBhcyBzd2l0Y2ggfVxuXG4vKipcbiAqIEdpdmVuIGEgc3RyZWFtIG9mIHN0cmVhbXMsIHJldHVybiBhIG5ldyBzdHJlYW0gdGhhdCBhZG9wdHMgdGhlIGJlaGF2aW9yXG4gKiBvZiB0aGUgbW9zdCByZWNlbnQgaW5uZXIgc3RyZWFtLlxuICogQHJldHVybnMge1N0cmVhbX0gc3dpdGNoaW5nIHN0cmVhbVxuICovXG5TdHJlYW0ucHJvdG90eXBlLnN3aXRjaExhdGVzdCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHN3aXRjaExhdGVzdCh0aGlzKVxufVxuXG4vLyBAZGVwcmVjYXRlZCB1c2Ugc3dpdGNoTGF0ZXN0IGluc3RlYWRcblN0cmVhbS5wcm90b3R5cGUuc3dpdGNoID0gU3RyZWFtLnByb3RvdHlwZS5zd2l0Y2hMYXRlc3RcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEZpbHRlcmluZ1xuXG5pbXBvcnQgeyBmaWx0ZXIsIHNraXBSZXBlYXRzLCBza2lwUmVwZWF0c1dpdGggfSBmcm9tICcuL2NvbWJpbmF0b3IvZmlsdGVyJ1xuXG4vLyBAZGVwcmVjYXRlZCBkaXN0aW5jdCwgdXNlIHNraXBSZXBlYXRzIGluc3RlYWRcbi8vIEBkZXByZWNhdGVkIGRpc3RpbmN0QnksIHVzZSBza2lwUmVwZWF0c1dpdGggaW5zdGVhZFxuZXhwb3J0IHsgZmlsdGVyLCBza2lwUmVwZWF0cywgc2tpcFJlcGVhdHMgYXMgZGlzdGluY3QsIHNraXBSZXBlYXRzV2l0aCwgc2tpcFJlcGVhdHNXaXRoIGFzIGRpc3RpbmN0QnkgfVxuXG4vKipcbiAqIFJldGFpbiBvbmx5IGl0ZW1zIG1hdGNoaW5nIGEgcHJlZGljYXRlXG4gKiBzdHJlYW06ICAgICAgICAgICAgICAgICAgICAgICAgICAgLTEyMzQ1Njc4LVxuICogZmlsdGVyKHggPT4geCAlIDIgPT09IDAsIHN0cmVhbSk6IC0tMi00LTYtOC1cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oeDoqKTpib29sZWFufSBwIGZpbHRlcmluZyBwcmVkaWNhdGUgY2FsbGVkIGZvciBlYWNoIGl0ZW1cbiAqIEByZXR1cm5zIHtTdHJlYW19IHN0cmVhbSBjb250YWluaW5nIG9ubHkgaXRlbXMgZm9yIHdoaWNoIHByZWRpY2F0ZSByZXR1cm5zIHRydXRoeVxuICovXG5TdHJlYW0ucHJvdG90eXBlLmZpbHRlciA9IGZ1bmN0aW9uIChwKSB7XG4gIHJldHVybiBmaWx0ZXIocCwgdGhpcylcbn1cblxuLyoqXG4gKiBTa2lwIHJlcGVhdGVkIGV2ZW50cywgdXNpbmcgPT09IHRvIGNvbXBhcmUgaXRlbXNcbiAqIHN0cmVhbTogICAgICAgICAgIC1hYmJjZC1cbiAqIGRpc3RpbmN0KHN0cmVhbSk6IC1hYi1jZC1cbiAqIEByZXR1cm5zIHtTdHJlYW19IHN0cmVhbSB3aXRoIG5vIHJlcGVhdGVkIGV2ZW50c1xuICovXG5TdHJlYW0ucHJvdG90eXBlLnNraXBSZXBlYXRzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gc2tpcFJlcGVhdHModGhpcylcbn1cblxuLyoqXG4gKiBTa2lwIHJlcGVhdGVkIGV2ZW50cywgdXNpbmcgc3VwcGxpZWQgZXF1YWxzIGZ1bmN0aW9uIHRvIGNvbXBhcmUgaXRlbXNcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oYToqLCBiOiopOmJvb2xlYW59IGVxdWFscyBmdW5jdGlvbiB0byBjb21wYXJlIGl0ZW1zXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gd2l0aCBubyByZXBlYXRlZCBldmVudHNcbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5za2lwUmVwZWF0c1dpdGggPSBmdW5jdGlvbiAoZXF1YWxzKSB7XG4gIHJldHVybiBza2lwUmVwZWF0c1dpdGgoZXF1YWxzLCB0aGlzKVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gU2xpY2luZ1xuXG5pbXBvcnQgeyB0YWtlLCBza2lwLCBzbGljZSwgdGFrZVdoaWxlLCBza2lwV2hpbGUsIHNraXBBZnRlciB9IGZyb20gJy4vY29tYmluYXRvci9zbGljZSdcblxuZXhwb3J0IHsgdGFrZSwgc2tpcCwgc2xpY2UsIHRha2VXaGlsZSwgc2tpcFdoaWxlLCBza2lwQWZ0ZXIgfVxuXG4vKipcbiAqIHN0cmVhbTogICAgICAgICAgLWFiY2QtXG4gKiB0YWtlKDIsIHN0cmVhbSk6IC1hYnxcbiAqIEBwYXJhbSB7TnVtYmVyfSBuIHRha2UgdXAgdG8gdGhpcyBtYW55IGV2ZW50c1xuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIGNvbnRhaW5pbmcgYXQgbW9zdCB0aGUgZmlyc3QgbiBpdGVtcyBmcm9tIHRoaXMgc3RyZWFtXG4gKi9cblN0cmVhbS5wcm90b3R5cGUudGFrZSA9IGZ1bmN0aW9uIChuKSB7XG4gIHJldHVybiB0YWtlKG4sIHRoaXMpXG59XG5cbi8qKlxuICogc3RyZWFtOiAgICAgICAgICAtYWJjZC0+XG4gKiBza2lwKDIsIHN0cmVhbSk6IC0tLWNkLT5cbiAqIEBwYXJhbSB7TnVtYmVyfSBuIHNraXAgdGhpcyBtYW55IGV2ZW50c1xuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIG5vdCBjb250YWluaW5nIHRoZSBmaXJzdCBuIGV2ZW50c1xuICovXG5TdHJlYW0ucHJvdG90eXBlLnNraXAgPSBmdW5jdGlvbiAobikge1xuICByZXR1cm4gc2tpcChuLCB0aGlzKVxufVxuXG4vKipcbiAqIFNsaWNlIGEgc3RyZWFtIGJ5IGV2ZW50IGluZGV4LiBFcXVpdmFsZW50IHRvLCBidXQgbW9yZSBlZmZpY2llbnQgdGhhblxuICogc3RyZWFtLnRha2UoZW5kKS5za2lwKHN0YXJ0KTtcbiAqIE5PVEU6IE5lZ2F0aXZlIHN0YXJ0IGFuZCBlbmQgYXJlIG5vdCBzdXBwb3J0ZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdGFydCBza2lwIGFsbCBldmVudHMgYmVmb3JlIHRoZSBzdGFydCBpbmRleFxuICogQHBhcmFtIHtOdW1iZXJ9IGVuZCBhbGxvdyBhbGwgZXZlbnRzIGZyb20gdGhlIHN0YXJ0IGluZGV4IHRvIHRoZSBlbmQgaW5kZXhcbiAqIEByZXR1cm5zIHtTdHJlYW19IHN0cmVhbSBjb250YWluaW5nIGl0ZW1zIHdoZXJlIHN0YXJ0IDw9IGluZGV4IDwgZW5kXG4gKi9cblN0cmVhbS5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICByZXR1cm4gc2xpY2Uoc3RhcnQsIGVuZCwgdGhpcylcbn1cblxuLyoqXG4gKiBzdHJlYW06ICAgICAgICAgICAgICAgICAgICAgICAgLTEyMzQ1MTIzNC0+XG4gKiB0YWtlV2hpbGUoeCA9PiB4IDwgNSwgc3RyZWFtKTogLTEyMzR8XG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHg6Kik6Ym9vbGVhbn0gcCBwcmVkaWNhdGVcbiAqIEByZXR1cm5zIHtTdHJlYW19IHN0cmVhbSBjb250YWluaW5nIGl0ZW1zIHVwIHRvLCBidXQgbm90IGluY2x1ZGluZywgdGhlXG4gKiBmaXJzdCBpdGVtIGZvciB3aGljaCBwIHJldHVybnMgZmFsc3kuXG4gKi9cblN0cmVhbS5wcm90b3R5cGUudGFrZVdoaWxlID0gZnVuY3Rpb24gKHApIHtcbiAgcmV0dXJuIHRha2VXaGlsZShwLCB0aGlzKVxufVxuXG4vKipcbiAqIHN0cmVhbTogICAgICAgICAgICAgICAgICAgICAgICAtMTIzNDUxMjM0LT5cbiAqIHNraXBXaGlsZSh4ID0+IHggPCA1LCBzdHJlYW0pOiAtLS0tLTUxMjM0LT5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oeDoqKTpib29sZWFufSBwIHByZWRpY2F0ZVxuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIGNvbnRhaW5pbmcgaXRlbXMgZm9sbG93aW5nICphbmQgaW5jbHVkaW5nKiB0aGVcbiAqIGZpcnN0IGl0ZW0gZm9yIHdoaWNoIHAgcmV0dXJucyBmYWxzeS5cbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5za2lwV2hpbGUgPSBmdW5jdGlvbiAocCkge1xuICByZXR1cm4gc2tpcFdoaWxlKHAsIHRoaXMpXG59XG5cbi8qKlxuICogc3RyZWFtOiAgICAgICAgICAgICAgICAgICAgICAgICAtMTIzNDU2Nzg5LT5cbiAqIHNraXBBZnRlcih4ID0+IHggPT09IDUsIHN0cmVhbSk6LTEyMzQ1fFxuICogQHBhcmFtIHtmdW5jdGlvbih4OiopOmJvb2xlYW59IHAgcHJlZGljYXRlXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gY29udGFpbmluZyBpdGVtcyB1cCB0bywgKmFuZCBpbmNsdWRpbmcqLCB0aGVcbiAqIGZpcnN0IGl0ZW0gZm9yIHdoaWNoIHAgcmV0dXJucyB0cnV0aHkuXG4gKi9cblN0cmVhbS5wcm90b3R5cGUuc2tpcEFmdGVyID0gZnVuY3Rpb24gKHApIHtcbiAgcmV0dXJuIHNraXBBZnRlcihwLCB0aGlzKVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gVGltZSBzbGljaW5nXG5cbmltcG9ydCB7IHRha2VVbnRpbCwgc2tpcFVudGlsLCBkdXJpbmcgfSBmcm9tICcuL2NvbWJpbmF0b3IvdGltZXNsaWNlJ1xuXG4vLyBAZGVwcmVjYXRlZCB0YWtlVW50aWwsIHVzZSB1bnRpbCBpbnN0ZWFkXG4vLyBAZGVwcmVjYXRlZCBza2lwVW50aWwsIHVzZSBzaW5jZSBpbnN0ZWFkXG5leHBvcnQgeyB0YWtlVW50aWwsIHRha2VVbnRpbCBhcyB1bnRpbCwgc2tpcFVudGlsLCBza2lwVW50aWwgYXMgc2luY2UsIGR1cmluZyB9XG5cbi8qKlxuICogc3RyZWFtOiAgICAgICAgICAgICAgICAgICAgLWEtYi1jLWQtZS1mLWctPlxuICogc2lnbmFsOiAgICAgICAgICAgICAgICAgICAgLS0tLS0tLXhcbiAqIHRha2VVbnRpbChzaWduYWwsIHN0cmVhbSk6IC1hLWItYy18XG4gKiBAcGFyYW0ge1N0cmVhbX0gc2lnbmFsIHJldGFpbiBvbmx5IGV2ZW50cyBpbiBzdHJlYW0gYmVmb3JlIHRoZSBmaXJzdFxuICogZXZlbnQgaW4gc2lnbmFsXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIGNvbnRhaW5pbmcgb25seSBldmVudHMgdGhhdCBvY2N1ciBiZWZvcmVcbiAqIHRoZSBmaXJzdCBldmVudCBpbiBzaWduYWwuXG4gKi9cblN0cmVhbS5wcm90b3R5cGUudW50aWwgPSBmdW5jdGlvbiAoc2lnbmFsKSB7XG4gIHJldHVybiB0YWtlVW50aWwoc2lnbmFsLCB0aGlzKVxufVxuXG4vLyBAZGVwcmVjYXRlZCB1c2UgdW50aWwgaW5zdGVhZFxuU3RyZWFtLnByb3RvdHlwZS50YWtlVW50aWwgPSBTdHJlYW0ucHJvdG90eXBlLnVudGlsXG5cbiAgLyoqXG4gKiBzdHJlYW06ICAgICAgICAgICAgICAgICAgICAtYS1iLWMtZC1lLWYtZy0+XG4gKiBzaWduYWw6ICAgICAgICAgICAgICAgICAgICAtLS0tLS0teFxuICogdGFrZVVudGlsKHNpZ25hbCwgc3RyZWFtKTogLS0tLS0tLWQtZS1mLWctPlxuICogQHBhcmFtIHtTdHJlYW19IHNpZ25hbCByZXRhaW4gb25seSBldmVudHMgaW4gc3RyZWFtIGF0IG9yIGFmdGVyIHRoZSBmaXJzdFxuICogZXZlbnQgaW4gc2lnbmFsXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIGNvbnRhaW5pbmcgb25seSBldmVudHMgdGhhdCBvY2N1ciBhZnRlclxuICogdGhlIGZpcnN0IGV2ZW50IGluIHNpZ25hbC5cbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5zaW5jZSA9IGZ1bmN0aW9uIChzaWduYWwpIHtcbiAgcmV0dXJuIHNraXBVbnRpbChzaWduYWwsIHRoaXMpXG59XG5cbi8vIEBkZXByZWNhdGVkIHVzZSBzaW5jZSBpbnN0ZWFkXG5TdHJlYW0ucHJvdG90eXBlLnNraXBVbnRpbCA9IFN0cmVhbS5wcm90b3R5cGUuc2luY2VcblxuICAvKipcbiAqIHN0cmVhbTogICAgICAgICAgICAgICAgICAgIC1hLWItYy1kLWUtZi1nLT5cbiAqIHRpbWVXaW5kb3c6ICAgICAgICAgICAgICAgIC0tLS0tc1xuICogczogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLS0tLS10XG4gKiBzdHJlYW0uZHVyaW5nKHRpbWVXaW5kb3cpOiAtLS0tLWMtZC1lLXxcbiAqIEBwYXJhbSB7U3RyZWFtPFN0cmVhbT59IHRpbWVXaW5kb3cgYSBzdHJlYW0gd2hvc2UgZmlyc3QgZXZlbnQgKHMpIHJlcHJlc2VudHNcbiAqICB0aGUgd2luZG93IHN0YXJ0IHRpbWUuICBUaGF0IGV2ZW50IChzKSBpcyBpdHNlbGYgYSBzdHJlYW0gd2hvc2UgZmlyc3QgZXZlbnQgKHQpXG4gKiAgcmVwcmVzZW50cyB0aGUgd2luZG93IGVuZCB0aW1lXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIGNvbnRhaW5pbmcgb25seSBldmVudHMgd2l0aGluIHRoZSBwcm92aWRlZCB0aW1lc3BhblxuICovXG5TdHJlYW0ucHJvdG90eXBlLmR1cmluZyA9IGZ1bmN0aW9uICh0aW1lV2luZG93KSB7XG4gIHJldHVybiBkdXJpbmcodGltZVdpbmRvdywgdGhpcylcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIERlbGF5aW5nXG5cbmltcG9ydCB7IGRlbGF5IH0gZnJvbSAnLi9jb21iaW5hdG9yL2RlbGF5J1xuXG5leHBvcnQgeyBkZWxheSB9XG5cbi8qKlxuICogQHBhcmFtIHtOdW1iZXJ9IGRlbGF5VGltZSBtaWxsaXNlY29uZHMgdG8gZGVsYXkgZWFjaCBpdGVtXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIGNvbnRhaW5pbmcgdGhlIHNhbWUgaXRlbXMsIGJ1dCBkZWxheWVkIGJ5IG1zXG4gKi9cblN0cmVhbS5wcm90b3R5cGUuZGVsYXkgPSBmdW5jdGlvbiAoZGVsYXlUaW1lKSB7XG4gIHJldHVybiBkZWxheShkZWxheVRpbWUsIHRoaXMpXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBHZXR0aW5nIGV2ZW50IHRpbWVzdGFtcFxuXG5pbXBvcnQgeyB0aW1lc3RhbXAgfSBmcm9tICcuL2NvbWJpbmF0b3IvdGltZXN0YW1wJ1xuZXhwb3J0IHsgdGltZXN0YW1wIH1cblxuLyoqXG4gKiBFeHBvc2UgZXZlbnQgdGltZXN0YW1wcyBpbnRvIHRoZSBzdHJlYW0uIFR1cm5zIGEgU3RyZWFtPFg+IGludG9cbiAqIFN0cmVhbTx7dGltZTp0LCB2YWx1ZTpYfT5cbiAqIEByZXR1cm5zIHtTdHJlYW08e3RpbWU6bnVtYmVyLCB2YWx1ZToqfT59XG4gKi9cblN0cmVhbS5wcm90b3R5cGUudGltZXN0YW1wID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGltZXN0YW1wKHRoaXMpXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBSYXRlIGxpbWl0aW5nXG5cbmltcG9ydCB7IHRocm90dGxlLCBkZWJvdW5jZSB9IGZyb20gJy4vY29tYmluYXRvci9saW1pdCdcblxuZXhwb3J0IHsgdGhyb3R0bGUsIGRlYm91bmNlIH1cblxuLyoqXG4gKiBMaW1pdCB0aGUgcmF0ZSBvZiBldmVudHNcbiAqIHN0cmVhbTogICAgICAgICAgICAgIGFiY2QtLS0tYWJjZC0tLS1cbiAqIHRocm90dGxlKDIsIHN0cmVhbSk6IGEtYy0tLS0tYS1jLS0tLS1cbiAqIEBwYXJhbSB7TnVtYmVyfSBwZXJpb2QgdGltZSB0byBzdXBwcmVzcyBldmVudHNcbiAqIEByZXR1cm5zIHtTdHJlYW19IG5ldyBzdHJlYW0gdGhhdCBza2lwcyBldmVudHMgZm9yIHRocm90dGxlIHBlcmlvZFxuICovXG5TdHJlYW0ucHJvdG90eXBlLnRocm90dGxlID0gZnVuY3Rpb24gKHBlcmlvZCkge1xuICByZXR1cm4gdGhyb3R0bGUocGVyaW9kLCB0aGlzKVxufVxuXG4vKipcbiAqIFdhaXQgZm9yIGEgYnVyc3Qgb2YgZXZlbnRzIHRvIHN1YnNpZGUgYW5kIGVtaXQgb25seSB0aGUgbGFzdCBldmVudCBpbiB0aGUgYnVyc3RcbiAqIHN0cmVhbTogICAgICAgICAgICAgIGFiY2QtLS0tYWJjZC0tLS1cbiAqIGRlYm91bmNlKDIsIHN0cmVhbSk6IC0tLS0tZC0tLS0tLS1kLS1cbiAqIEBwYXJhbSB7TnVtYmVyfSBwZXJpb2QgZXZlbnRzIG9jY3VyaW5nIG1vcmUgZnJlcXVlbnRseSB0aGFuIHRoaXNcbiAqICBvbiB0aGUgcHJvdmlkZWQgc2NoZWR1bGVyIHdpbGwgYmUgc3VwcHJlc3NlZFxuICogQHJldHVybnMge1N0cmVhbX0gbmV3IGRlYm91bmNlZCBzdHJlYW1cbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5kZWJvdW5jZSA9IGZ1bmN0aW9uIChwZXJpb2QpIHtcbiAgcmV0dXJuIGRlYm91bmNlKHBlcmlvZCwgdGhpcylcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEF3YWl0aW5nIFByb21pc2VzXG5cbmltcG9ydCB7IGZyb21Qcm9taXNlLCBhd2FpdFByb21pc2VzIH0gZnJvbSAnLi9jb21iaW5hdG9yL3Byb21pc2VzJ1xuXG4vLyBAZGVwcmVjYXRlZCBhd2FpdCwgdXNlIGF3YWl0UHJvbWlzZXMgaW5zdGVhZFxuZXhwb3J0IHsgZnJvbVByb21pc2UsIGF3YWl0UHJvbWlzZXMsIGF3YWl0UHJvbWlzZXMgYXMgYXdhaXQgfVxuXG4vKipcbiAqIEF3YWl0IHByb21pc2VzLCB0dXJuaW5nIGEgU3RyZWFtPFByb21pc2U8WD4+IGludG8gU3RyZWFtPFg+LiAgUHJlc2VydmVzXG4gKiBldmVudCBvcmRlciwgYnV0IHRpbWVzaGlmdHMgZXZlbnRzIGJhc2VkIG9uIHByb21pc2UgcmVzb2x1dGlvbiB0aW1lLlxuICogQHJldHVybnMge1N0cmVhbTxYPn0gc3RyZWFtIGNvbnRhaW5pbmcgbm9uLXByb21pc2UgdmFsdWVzXG4gKi9cblN0cmVhbS5wcm90b3R5cGUuYXdhaXRQcm9taXNlcyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGF3YWl0UHJvbWlzZXModGhpcylcbn1cblxuLy8gQGRlcHJlY2F0ZWQgdXNlIGF3YWl0UHJvbWlzZXMgaW5zdGVhZFxuU3RyZWFtLnByb3RvdHlwZS5hd2FpdCA9IFN0cmVhbS5wcm90b3R5cGUuYXdhaXRQcm9taXNlc1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXJyb3IgaGFuZGxpbmdcblxuaW1wb3J0IHsgcmVjb3ZlcldpdGgsIGZsYXRNYXBFcnJvciwgdGhyb3dFcnJvciB9IGZyb20gJy4vY29tYmluYXRvci9lcnJvcnMnXG5cbi8vIEBkZXByZWNhdGVkIGZsYXRNYXBFcnJvciwgdXNlIHJlY292ZXJXaXRoIGluc3RlYWRcbmV4cG9ydCB7IHJlY292ZXJXaXRoLCBmbGF0TWFwRXJyb3IsIHRocm93RXJyb3IgfVxuXG4vKipcbiAqIElmIHRoaXMgc3RyZWFtIGVuY291bnRlcnMgYW4gZXJyb3IsIHJlY292ZXIgYW5kIGNvbnRpbnVlIHdpdGggaXRlbXMgZnJvbSBzdHJlYW1cbiAqIHJldHVybmVkIGJ5IGYuXG4gKiBzdHJlYW06ICAgICAgICAgICAgICAgICAgLWEtYi1jLVgtXG4gKiBmKFgpOiAgICAgICAgICAgICAgICAgICAgICAgICAgIGQtZS1mLWctXG4gKiBmbGF0TWFwRXJyb3IoZiwgc3RyZWFtKTogLWEtYi1jLWQtZS1mLWctXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKGVycm9yOiopOlN0cmVhbX0gZiBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGEgbmV3IHN0cmVhbVxuICogQHJldHVybnMge1N0cmVhbX0gbmV3IHN0cmVhbSB3aGljaCB3aWxsIHJlY292ZXIgZnJvbSBhbiBlcnJvciBieSBjYWxsaW5nIGZcbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5yZWNvdmVyV2l0aCA9IGZ1bmN0aW9uIChmKSB7XG4gIHJldHVybiBmbGF0TWFwRXJyb3IoZiwgdGhpcylcbn1cblxuLy8gQGRlcHJlY2F0ZWQgdXNlIHJlY292ZXJXaXRoIGluc3RlYWRcblN0cmVhbS5wcm90b3R5cGUuZmxhdE1hcEVycm9yID0gU3RyZWFtLnByb3RvdHlwZS5yZWNvdmVyV2l0aFxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gTXVsdGljYXN0aW5nXG5cbmltcG9ydCBtdWx0aWNhc3QgZnJvbSAnQG1vc3QvbXVsdGljYXN0J1xuXG5leHBvcnQgeyBtdWx0aWNhc3QgfVxuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgc3RyZWFtIGludG8gbXVsdGljYXN0IHN0cmVhbS4gIFRoYXQgbWVhbnMgdGhhdCBtYW55IHN1YnNjcmliZXJzXG4gKiB0byB0aGUgc3RyZWFtIHdpbGwgbm90IGNhdXNlIG11bHRpcGxlIGludm9jYXRpb25zIG9mIHRoZSBpbnRlcm5hbCBtYWNoaW5lcnkuXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIHdoaWNoIHdpbGwgbXVsdGljYXN0IGV2ZW50cyB0byBhbGwgb2JzZXJ2ZXJzLlxuICovXG5TdHJlYW0ucHJvdG90eXBlLm11bHRpY2FzdCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIG11bHRpY2FzdCh0aGlzKVxufVxuXG4vLyBleHBvcnQgdGhlIGluc3RhbmNlIG9mIHRoZSBkZWZhdWx0U2NoZWR1bGVyIGZvciB0aGlyZC1wYXJ0eSBsaWJyYXJpZXNcbmltcG9ydCBkZWZhdWx0U2NoZWR1bGVyIGZyb20gJy4vc2NoZWR1bGVyL2RlZmF1bHRTY2hlZHVsZXInXG5cbmV4cG9ydCB7IGRlZmF1bHRTY2hlZHVsZXIgfVxuXG4vLyBleHBvcnQgYW4gaW1wbGVtZW50YXRpb24gb2YgVGFzayB1c2VkIGludGVybmFsbHkgZm9yIHRoaXJkLXBhcnR5IGxpYnJhcmllc1xuaW1wb3J0IFByb3BhZ2F0ZVRhc2sgZnJvbSAnLi9zY2hlZHVsZXIvUHJvcGFnYXRlVGFzaydcblxuZXhwb3J0IHsgUHJvcGFnYXRlVGFzayB9XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IERpc3Bvc2FibGUgd2hpY2ggd2lsbCBkaXNwb3NlIGl0cyB1bmRlcmx5aW5nIHJlc291cmNlLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZGlzcG9zZSBmdW5jdGlvblxuICogQHBhcmFtIHsqP30gZGF0YSBhbnkgZGF0YSB0byBiZSBwYXNzZWQgdG8gZGlzcG9zZXIgZnVuY3Rpb25cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEaXNwb3NhYmxlIChkaXNwb3NlLCBkYXRhKSB7XG4gIHRoaXMuX2Rpc3Bvc2UgPSBkaXNwb3NlXG4gIHRoaXMuX2RhdGEgPSBkYXRhXG59XG5cbkRpc3Bvc2FibGUucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLl9kaXNwb3NlKHRoaXMuX2RhdGEpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9kaXNwb3NhYmxlL0Rpc3Bvc2FibGUuanNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTZXR0YWJsZURpc3Bvc2FibGUgKCkge1xuICB0aGlzLmRpc3Bvc2FibGUgPSB2b2lkIDBcbiAgdGhpcy5kaXNwb3NlZCA9IGZhbHNlXG4gIHRoaXMuX3Jlc29sdmUgPSB2b2lkIDBcblxuICB2YXIgc2VsZiA9IHRoaXNcbiAgdGhpcy5yZXN1bHQgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgIHNlbGYuX3Jlc29sdmUgPSByZXNvbHZlXG4gIH0pXG59XG5cblNldHRhYmxlRGlzcG9zYWJsZS5wcm90b3R5cGUuc2V0RGlzcG9zYWJsZSA9IGZ1bmN0aW9uIChkaXNwb3NhYmxlKSB7XG4gIGlmICh0aGlzLmRpc3Bvc2FibGUgIT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0RGlzcG9zYWJsZSBjYWxsZWQgbW9yZSB0aGFuIG9uY2UnKVxuICB9XG5cbiAgdGhpcy5kaXNwb3NhYmxlID0gZGlzcG9zYWJsZVxuXG4gIGlmICh0aGlzLmRpc3Bvc2VkKSB7XG4gICAgdGhpcy5fcmVzb2x2ZShkaXNwb3NhYmxlLmRpc3Bvc2UoKSlcbiAgfVxufVxuXG5TZXR0YWJsZURpc3Bvc2FibGUucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmRpc3Bvc2VkKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzdWx0XG4gIH1cblxuICB0aGlzLmRpc3Bvc2VkID0gdHJ1ZVxuXG4gIGlmICh0aGlzLmRpc3Bvc2FibGUgIT09IHZvaWQgMCkge1xuICAgIHRoaXMucmVzdWx0ID0gdGhpcy5kaXNwb3NhYmxlLmRpc3Bvc2UoKVxuICB9XG5cbiAgcmV0dXJuIHRoaXMucmVzdWx0XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9kaXNwb3NhYmxlL1NldHRhYmxlRGlzcG9zYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Byb21pc2UgKHApIHtcbiAgcmV0dXJuIHAgIT09IG51bGwgJiYgdHlwZW9mIHAgPT09ICdvYmplY3QnICYmIHR5cGVvZiBwLnRoZW4gPT09ICdmdW5jdGlvbidcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL1Byb21pc2UuanNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCB7IGZyb21BcnJheSB9IGZyb20gJy4vZnJvbUFycmF5J1xuaW1wb3J0IHsgaXNJdGVyYWJsZSB9IGZyb20gJy4uL2l0ZXJhYmxlJ1xuaW1wb3J0IHsgZnJvbUl0ZXJhYmxlIH0gZnJvbSAnLi9mcm9tSXRlcmFibGUnXG5pbXBvcnQgZ2V0T2JzZXJ2YWJsZSBmcm9tICcuLi9vYnNlcnZhYmxlL2dldE9ic2VydmFibGUnXG5pbXBvcnQgeyBmcm9tT2JzZXJ2YWJsZSB9IGZyb20gJy4uL29ic2VydmFibGUvZnJvbU9ic2VydmFibGUnXG5pbXBvcnQgeyBpc0FycmF5TGlrZSB9IGZyb20gJ0Btb3N0L3ByZWx1ZGUnXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tIChhKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY29tcGxleGl0eVxuICBpZiAoYSBpbnN0YW5jZW9mIFN0cmVhbSkge1xuICAgIHJldHVybiBhXG4gIH1cblxuICB2YXIgb2JzZXJ2YWJsZSA9IGdldE9ic2VydmFibGUoYSlcbiAgaWYgKG9ic2VydmFibGUgIT0gbnVsbCkge1xuICAgIHJldHVybiBmcm9tT2JzZXJ2YWJsZShvYnNlcnZhYmxlKVxuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoYSkgfHwgaXNBcnJheUxpa2UoYSkpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5KGEpXG4gIH1cblxuICBpZiAoaXNJdGVyYWJsZShhKSkge1xuICAgIHJldHVybiBmcm9tSXRlcmFibGUoYSlcbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ2Zyb20oeCkgbXVzdCBiZSBvYnNlcnZhYmxlLCBpdGVyYWJsZSwgb3IgYXJyYXktbGlrZTogJyArIGEpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zb3VyY2UvZnJvbS5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBTdHJlYW0gZnJvbSAnLi4vU3RyZWFtJ1xuaW1wb3J0IFByb3BhZ2F0ZVRhc2sgZnJvbSAnLi4vc2NoZWR1bGVyL1Byb3BhZ2F0ZVRhc2snXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tQXJyYXkgKGEpIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IEFycmF5U291cmNlKGEpKVxufVxuXG5mdW5jdGlvbiBBcnJheVNvdXJjZSAoYSkge1xuICB0aGlzLmFycmF5ID0gYVxufVxuXG5BcnJheVNvdXJjZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gc2NoZWR1bGVyLmFzYXAobmV3IFByb3BhZ2F0ZVRhc2socnVuUHJvZHVjZXIsIHRoaXMuYXJyYXksIHNpbmspKVxufVxuXG5mdW5jdGlvbiBydW5Qcm9kdWNlciAodCwgYXJyYXksIHNpbmspIHtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcnJheS5sZW5ndGg7IGkgPCBsICYmIHRoaXMuYWN0aXZlOyArK2kpIHtcbiAgICBzaW5rLmV2ZW50KHQsIGFycmF5W2ldKVxuICB9XG5cbiAgdGhpcy5hY3RpdmUgJiYgc2luay5lbmQodClcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NvdXJjZS9mcm9tQXJyYXkuanNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCB7IGdldEl0ZXJhdG9yIH0gZnJvbSAnLi4vaXRlcmFibGUnXG5pbXBvcnQgUHJvcGFnYXRlVGFzayBmcm9tICcuLi9zY2hlZHVsZXIvUHJvcGFnYXRlVGFzaydcblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21JdGVyYWJsZSAoaXRlcmFibGUpIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IEl0ZXJhYmxlU291cmNlKGl0ZXJhYmxlKSlcbn1cblxuZnVuY3Rpb24gSXRlcmFibGVTb3VyY2UgKGl0ZXJhYmxlKSB7XG4gIHRoaXMuaXRlcmFibGUgPSBpdGVyYWJsZVxufVxuXG5JdGVyYWJsZVNvdXJjZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gc2NoZWR1bGVyLmFzYXAobmV3IFByb3BhZ2F0ZVRhc2socnVuUHJvZHVjZXIsIGdldEl0ZXJhdG9yKHRoaXMuaXRlcmFibGUpLCBzaW5rKSlcbn1cblxuZnVuY3Rpb24gcnVuUHJvZHVjZXIgKHQsIGl0ZXJhdG9yLCBzaW5rKSB7XG4gIHZhciByID0gaXRlcmF0b3IubmV4dCgpXG5cbiAgd2hpbGUgKCFyLmRvbmUgJiYgdGhpcy5hY3RpdmUpIHtcbiAgICBzaW5rLmV2ZW50KHQsIHIudmFsdWUpXG4gICAgciA9IGl0ZXJhdG9yLm5leHQoKVxuICB9XG5cbiAgc2luay5lbmQodCwgci52YWx1ZSlcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NvdXJjZS9mcm9tSXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgc3ltYm9sT2JzZXJ2YWJsZSBmcm9tICdzeW1ib2wtb2JzZXJ2YWJsZSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0T2JzZXJ2YWJsZSAobykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNvbXBsZXhpdHlcbiAgdmFyIG9icyA9IG51bGxcbiAgaWYgKG8pIHtcbiAgLy8gQWNjZXNzIGZvcmVpZ24gbWV0aG9kIG9ubHkgb25jZVxuICAgIHZhciBtZXRob2QgPSBvW3N5bWJvbE9ic2VydmFibGVdXG4gICAgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG9icyA9IG1ldGhvZC5jYWxsKG8pXG4gICAgICBpZiAoIShvYnMgJiYgdHlwZW9mIG9icy5zdWJzY3JpYmUgPT09ICdmdW5jdGlvbicpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludmFsaWQgb2JzZXJ2YWJsZSAnICsgb2JzKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYnNcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL29ic2VydmFibGUvZ2V0T2JzZXJ2YWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3BvbnlmaWxsID0gcmVxdWlyZSgnLi9wb255ZmlsbC5qcycpO1xuXG52YXIgX3BvbnlmaWxsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BvbnlmaWxsKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgcm9vdDsgLyogZ2xvYmFsIHdpbmRvdyAqL1xuXG5cbmlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IHNlbGY7XG59IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBnbG9iYWw7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBtb2R1bGU7XG59IGVsc2Uge1xuICByb290ID0gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbn1cblxudmFyIHJlc3VsdCA9ICgwLCBfcG9ueWZpbGwyWydkZWZhdWx0J10pKHJvb3QpO1xuZXhwb3J0c1snZGVmYXVsdCddID0gcmVzdWx0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2xpYi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cdGlmKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XHJcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcclxuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xyXG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRpZighbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xyXG5cdH1cclxuXHRyZXR1cm4gbW9kdWxlO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHN5bWJvbE9ic2VydmFibGVQb255ZmlsbDtcbmZ1bmN0aW9uIHN5bWJvbE9ic2VydmFibGVQb255ZmlsbChyb290KSB7XG5cdHZhciByZXN1bHQ7XG5cdHZhciBfU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cblx0aWYgKHR5cGVvZiBfU3ltYm9sID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0aWYgKF9TeW1ib2wub2JzZXJ2YWJsZSkge1xuXHRcdFx0cmVzdWx0ID0gX1N5bWJvbC5vYnNlcnZhYmxlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXN1bHQgPSBfU3ltYm9sKCdvYnNlcnZhYmxlJyk7XG5cdFx0XHRfU3ltYm9sLm9ic2VydmFibGUgPSByZXN1bHQ7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHJlc3VsdCA9ICdAQG9ic2VydmFibGUnO1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3ltYm9sLW9ic2VydmFibGUvbGliL3BvbnlmaWxsLmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFN0cmVhbSBmcm9tICcuLi9TdHJlYW0nXG5pbXBvcnQgKiBhcyBkaXNwb3NlIGZyb20gJy4uL2Rpc3Bvc2FibGUvZGlzcG9zZSdcbmltcG9ydCB7IHRyeUVuZCwgdHJ5RXZlbnQgfSBmcm9tICcuLi9zb3VyY2UvdHJ5RXZlbnQnXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tT2JzZXJ2YWJsZSAob2JzZXJ2YWJsZSkge1xuICByZXR1cm4gbmV3IFN0cmVhbShuZXcgT2JzZXJ2YWJsZVNvdXJjZShvYnNlcnZhYmxlKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE9ic2VydmFibGVTb3VyY2UgKG9ic2VydmFibGUpIHtcbiAgdGhpcy5vYnNlcnZhYmxlID0gb2JzZXJ2YWJsZVxufVxuXG5PYnNlcnZhYmxlU291cmNlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHZhciBzdWIgPSB0aGlzLm9ic2VydmFibGUuc3Vic2NyaWJlKG5ldyBTdWJzY3JpYmVyU2luayhzaW5rLCBzY2hlZHVsZXIpKVxuICBpZiAodHlwZW9mIHN1YiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBkaXNwb3NlLmNyZWF0ZShzdWIpXG4gIH0gZWxzZSBpZiAoc3ViICYmIHR5cGVvZiBzdWIudW5zdWJzY3JpYmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZGlzcG9zZS5jcmVhdGUodW5zdWJzY3JpYmUsIHN1YilcbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ09ic2VydmFibGUgcmV0dXJuZWQgaW52YWxpZCBzdWJzY3JpcHRpb24gJyArIFN0cmluZyhzdWIpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU3Vic2NyaWJlclNpbmsgKHNpbmssIHNjaGVkdWxlcikge1xuICB0aGlzLnNpbmsgPSBzaW5rXG4gIHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyXG59XG5cblN1YnNjcmliZXJTaW5rLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKHgpIHtcbiAgdHJ5RXZlbnQodGhpcy5zY2hlZHVsZXIubm93KCksIHgsIHRoaXMuc2luaylcbn1cblxuU3Vic2NyaWJlclNpbmsucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24gKHgpIHtcbiAgdHJ5RW5kKHRoaXMuc2NoZWR1bGVyLm5vdygpLCB4LCB0aGlzLnNpbmspXG59XG5cblN1YnNjcmliZXJTaW5rLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gIHRoaXMuc2luay5lcnJvcih0aGlzLnNjaGVkdWxlci5ub3coKSwgZSlcbn1cblxuZnVuY3Rpb24gdW5zdWJzY3JpYmUgKHN1YnNjcmlwdGlvbikge1xuICByZXR1cm4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKClcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL29ic2VydmFibGUvZnJvbU9ic2VydmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCBQcm9wYWdhdGVUYXNrIGZyb20gJy4uL3NjaGVkdWxlci9Qcm9wYWdhdGVUYXNrJ1xuXG4vKipcbiAqIENyZWF0ZSBhIHN0cmVhbSB0aGF0IGVtaXRzIHRoZSBjdXJyZW50IHRpbWUgcGVyaW9kaWNhbGx5XG4gKiBAcGFyYW0ge051bWJlcn0gcGVyaW9kIHBlcmlvZGljaXR5IG9mIGV2ZW50cyBpbiBtaWxsaXNcbiAqIEBwYXJhbSB7Kn0gZGVwcmVjYXRlZFZhbHVlIEBkZXByZWNhdGVkIHZhbHVlIHRvIGVtaXQgZWFjaCBwZXJpb2RcbiAqIEByZXR1cm5zIHtTdHJlYW19IG5ldyBzdHJlYW0gdGhhdCBlbWl0cyB0aGUgY3VycmVudCB0aW1lIGV2ZXJ5IHBlcmlvZFxuICovXG5leHBvcnQgZnVuY3Rpb24gcGVyaW9kaWMgKHBlcmlvZCwgZGVwcmVjYXRlZFZhbHVlKSB7XG4gIHJldHVybiBuZXcgU3RyZWFtKG5ldyBQZXJpb2RpYyhwZXJpb2QsIGRlcHJlY2F0ZWRWYWx1ZSkpXG59XG5cbmZ1bmN0aW9uIFBlcmlvZGljIChwZXJpb2QsIHZhbHVlKSB7XG4gIHRoaXMucGVyaW9kID0gcGVyaW9kXG4gIHRoaXMudmFsdWUgPSB2YWx1ZVxufVxuXG5QZXJpb2RpYy5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gc2NoZWR1bGVyLnBlcmlvZGljKHRoaXMucGVyaW9kLCBQcm9wYWdhdGVUYXNrLmV2ZW50KHRoaXMudmFsdWUsIHNpbmspKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc291cmNlL3BlcmlvZGljLmpzXG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IGRlZmF1bHRTY2hlZHVsZXIgZnJvbSAnLi4vc2NoZWR1bGVyL2RlZmF1bHRTY2hlZHVsZXInXG5pbXBvcnQgKiBhcyBkaXNwb3NlIGZyb20gJy4uL2Rpc3Bvc2FibGUvZGlzcG9zZSdcbmltcG9ydCBmYXRhbEVycm9yIGZyb20gJy4uL2ZhdGFsRXJyb3InXG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJzY3JpYmUgKHN1YnNjcmliZXIsIHN0cmVhbSkge1xuICBpZiAoT2JqZWN0KHN1YnNjcmliZXIpICE9PSBzdWJzY3JpYmVyKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignc3Vic2NyaWJlciBtdXN0IGJlIGFuIG9iamVjdCcpXG4gIH1cblxuICB2YXIgZGlzcG9zYWJsZSA9IGRpc3Bvc2Uuc2V0dGFibGUoKVxuICB2YXIgb2JzZXJ2ZXIgPSBuZXcgU3Vic2NyaWJlT2JzZXJ2ZXIoZmF0YWxFcnJvciwgc3Vic2NyaWJlciwgZGlzcG9zYWJsZSlcblxuICBkaXNwb3NhYmxlLnNldERpc3Bvc2FibGUoc3RyZWFtLnNvdXJjZS5ydW4ob2JzZXJ2ZXIsIGRlZmF1bHRTY2hlZHVsZXIpKVxuXG4gIHJldHVybiBuZXcgU3Vic2NyaXB0aW9uKGRpc3Bvc2FibGUpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTdWJzY3JpYmVPYnNlcnZlciAoZmF0YWxFcnJvciwgc3Vic2NyaWJlciwgZGlzcG9zYWJsZSkge1xuICB0aGlzLmZhdGFsRXJyb3IgPSBmYXRhbEVycm9yXG4gIHRoaXMuc3Vic2NyaWJlciA9IHN1YnNjcmliZXJcbiAgdGhpcy5kaXNwb3NhYmxlID0gZGlzcG9zYWJsZVxufVxuXG5TdWJzY3JpYmVPYnNlcnZlci5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgeCkge1xuICBpZiAoIXRoaXMuZGlzcG9zYWJsZS5kaXNwb3NlZCAmJiB0eXBlb2YgdGhpcy5zdWJzY3JpYmVyLm5leHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0aGlzLnN1YnNjcmliZXIubmV4dCh4KVxuICB9XG59XG5cblN1YnNjcmliZU9ic2VydmVyLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAodCwgeCkge1xuICBpZiAoIXRoaXMuZGlzcG9zYWJsZS5kaXNwb3NlZCkge1xuICAgIHZhciBzID0gdGhpcy5zdWJzY3JpYmVyXG4gICAgdmFyIGZhdGFsRXJyb3IgPSB0aGlzLmZhdGFsRXJyb3JcbiAgICBQcm9taXNlLnJlc29sdmUodGhpcy5kaXNwb3NhYmxlLmRpc3Bvc2UoKSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodHlwZW9mIHMuY29tcGxldGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcy5jb21wbGV0ZSh4KVxuICAgICAgfVxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICB0aHJvd0Vycm9yKGUsIHMsIGZhdGFsRXJyb3IpXG4gICAgfSlcbiAgfVxufVxuXG5TdWJzY3JpYmVPYnNlcnZlci5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAodCwgZSkge1xuICB2YXIgcyA9IHRoaXMuc3Vic2NyaWJlclxuICB2YXIgZmF0YWxFcnJvciA9IHRoaXMuZmF0YWxFcnJvclxuICBQcm9taXNlLnJlc29sdmUodGhpcy5kaXNwb3NhYmxlLmRpc3Bvc2UoKSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgdGhyb3dFcnJvcihlLCBzLCBmYXRhbEVycm9yKVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU3Vic2NyaXB0aW9uIChkaXNwb3NhYmxlKSB7XG4gIHRoaXMuZGlzcG9zYWJsZSA9IGRpc3Bvc2FibGVcbn1cblxuU3Vic2NyaXB0aW9uLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5kaXNwb3NhYmxlLmRpc3Bvc2UoKVxufVxuXG5mdW5jdGlvbiB0aHJvd0Vycm9yIChlMSwgc3Vic2NyaWJlciwgdGhyb3dFcnJvcikge1xuICBpZiAodHlwZW9mIHN1YnNjcmliZXIuZXJyb3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0cnkge1xuICAgICAgc3Vic2NyaWJlci5lcnJvcihlMSlcbiAgICB9IGNhdGNoIChlMikge1xuICAgICAgdGhyb3dFcnJvcihlMilcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3dFcnJvcihlMSlcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvb2JzZXJ2YWJsZS9zdWJzY3JpYmUuanNcbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU2NoZWR1bGVkVGFzayBmcm9tICcuL1NjaGVkdWxlZFRhc2snXG5pbXBvcnQgeyBydW5UYXNrIH0gZnJvbSAnLi4vdGFzaydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2NoZWR1bGVyICh0aW1lciwgdGltZWxpbmUpIHtcbiAgdGhpcy50aW1lciA9IHRpbWVyXG4gIHRoaXMudGltZWxpbmUgPSB0aW1lbGluZVxuXG4gIHRoaXMuX3RpbWVyID0gbnVsbFxuICB0aGlzLl9uZXh0QXJyaXZhbCA9IEluZmluaXR5XG5cbiAgdmFyIHNlbGYgPSB0aGlzXG4gIHRoaXMuX3J1blJlYWR5VGFza3NCb3VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBzZWxmLl9ydW5SZWFkeVRhc2tzKHNlbGYubm93KCkpXG4gIH1cbn1cblxuU2NoZWR1bGVyLnByb3RvdHlwZS5ub3cgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnRpbWVyLm5vdygpXG59XG5cblNjaGVkdWxlci5wcm90b3R5cGUuYXNhcCA9IGZ1bmN0aW9uICh0YXNrKSB7XG4gIHJldHVybiB0aGlzLnNjaGVkdWxlKDAsIC0xLCB0YXNrKVxufVxuXG5TY2hlZHVsZXIucHJvdG90eXBlLmRlbGF5ID0gZnVuY3Rpb24gKGRlbGF5LCB0YXNrKSB7XG4gIHJldHVybiB0aGlzLnNjaGVkdWxlKGRlbGF5LCAtMSwgdGFzaylcbn1cblxuU2NoZWR1bGVyLnByb3RvdHlwZS5wZXJpb2RpYyA9IGZ1bmN0aW9uIChwZXJpb2QsIHRhc2spIHtcbiAgcmV0dXJuIHRoaXMuc2NoZWR1bGUoMCwgcGVyaW9kLCB0YXNrKVxufVxuXG5TY2hlZHVsZXIucHJvdG90eXBlLnNjaGVkdWxlID0gZnVuY3Rpb24gKGRlbGF5LCBwZXJpb2QsIHRhc2spIHtcbiAgdmFyIG5vdyA9IHRoaXMubm93KClcbiAgdmFyIHN0ID0gbmV3IFNjaGVkdWxlZFRhc2sobm93ICsgTWF0aC5tYXgoMCwgZGVsYXkpLCBwZXJpb2QsIHRhc2ssIHRoaXMpXG5cbiAgdGhpcy50aW1lbGluZS5hZGQoc3QpXG4gIHRoaXMuX3NjaGVkdWxlTmV4dFJ1bihub3cpXG4gIHJldHVybiBzdFxufVxuXG5TY2hlZHVsZXIucHJvdG90eXBlLmNhbmNlbCA9IGZ1bmN0aW9uICh0YXNrKSB7XG4gIHRhc2suYWN0aXZlID0gZmFsc2VcbiAgaWYgKHRoaXMudGltZWxpbmUucmVtb3ZlKHRhc2spKSB7XG4gICAgdGhpcy5fcmVzY2hlZHVsZSgpXG4gIH1cbn1cblxuU2NoZWR1bGVyLnByb3RvdHlwZS5jYW5jZWxBbGwgPSBmdW5jdGlvbiAoZikge1xuICB0aGlzLnRpbWVsaW5lLnJlbW92ZUFsbChmKVxuICB0aGlzLl9yZXNjaGVkdWxlKClcbn1cblxuU2NoZWR1bGVyLnByb3RvdHlwZS5fcmVzY2hlZHVsZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMudGltZWxpbmUuaXNFbXB0eSgpKSB7XG4gICAgdGhpcy5fdW5zY2hlZHVsZSgpXG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fc2NoZWR1bGVOZXh0UnVuKHRoaXMubm93KCkpXG4gIH1cbn1cblxuU2NoZWR1bGVyLnByb3RvdHlwZS5fdW5zY2hlZHVsZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy50aW1lci5jbGVhclRpbWVyKHRoaXMuX3RpbWVyKVxuICB0aGlzLl90aW1lciA9IG51bGxcbn1cblxuU2NoZWR1bGVyLnByb3RvdHlwZS5fc2NoZWR1bGVOZXh0UnVuID0gZnVuY3Rpb24gKG5vdykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNvbXBsZXhpdHlcbiAgaWYgKHRoaXMudGltZWxpbmUuaXNFbXB0eSgpKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgbmV4dEFycml2YWwgPSB0aGlzLnRpbWVsaW5lLm5leHRBcnJpdmFsKClcblxuICBpZiAodGhpcy5fdGltZXIgPT09IG51bGwpIHtcbiAgICB0aGlzLl9zY2hlZHVsZU5leHRBcnJpdmFsKG5leHRBcnJpdmFsLCBub3cpXG4gIH0gZWxzZSBpZiAobmV4dEFycml2YWwgPCB0aGlzLl9uZXh0QXJyaXZhbCkge1xuICAgIHRoaXMuX3Vuc2NoZWR1bGUoKVxuICAgIHRoaXMuX3NjaGVkdWxlTmV4dEFycml2YWwobmV4dEFycml2YWwsIG5vdylcbiAgfVxufVxuXG5TY2hlZHVsZXIucHJvdG90eXBlLl9zY2hlZHVsZU5leHRBcnJpdmFsID0gZnVuY3Rpb24gKG5leHRBcnJpdmFsLCBub3cpIHtcbiAgdGhpcy5fbmV4dEFycml2YWwgPSBuZXh0QXJyaXZhbFxuICB2YXIgZGVsYXkgPSBNYXRoLm1heCgwLCBuZXh0QXJyaXZhbCAtIG5vdylcbiAgdGhpcy5fdGltZXIgPSB0aGlzLnRpbWVyLnNldFRpbWVyKHRoaXMuX3J1blJlYWR5VGFza3NCb3VuZCwgZGVsYXkpXG59XG5cblNjaGVkdWxlci5wcm90b3R5cGUuX3J1blJlYWR5VGFza3MgPSBmdW5jdGlvbiAobm93KSB7XG4gIHRoaXMuX3RpbWVyID0gbnVsbFxuICB0aGlzLnRpbWVsaW5lLnJ1blRhc2tzKG5vdywgcnVuVGFzaylcbiAgdGhpcy5fc2NoZWR1bGVOZXh0UnVuKHRoaXMubm93KCkpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zY2hlZHVsZXIvU2NoZWR1bGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2NoZWR1bGVkVGFzayAoZGVsYXksIHBlcmlvZCwgdGFzaywgc2NoZWR1bGVyKSB7XG4gIHRoaXMudGltZSA9IGRlbGF5XG4gIHRoaXMucGVyaW9kID0gcGVyaW9kXG4gIHRoaXMudGFzayA9IHRhc2tcbiAgdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXJcbiAgdGhpcy5hY3RpdmUgPSB0cnVlXG59XG5cblNjaGVkdWxlZFRhc2sucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMudGFzay5ydW4odGhpcy50aW1lKVxufVxuXG5TY2hlZHVsZWRUYXNrLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gIHJldHVybiB0aGlzLnRhc2suZXJyb3IodGhpcy50aW1lLCBlKVxufVxuXG5TY2hlZHVsZWRUYXNrLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnNjaGVkdWxlci5jYW5jZWwodGhpcylcbiAgcmV0dXJuIHRoaXMudGFzay5kaXNwb3NlKClcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NjaGVkdWxlci9TY2hlZHVsZWRUYXNrLmpzXG4vLyBtb2R1bGUgaWQgPSA0OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IHsgZGVmZXIgfSBmcm9tICcuLi90YXNrJ1xuXG4vKmdsb2JhbCBzZXRUaW1lb3V0LCBjbGVhclRpbWVvdXQqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDbG9ja1RpbWVyICgpIHt9XG5cbkNsb2NrVGltZXIucHJvdG90eXBlLm5vdyA9IERhdGUubm93XG5cbkNsb2NrVGltZXIucHJvdG90eXBlLnNldFRpbWVyID0gZnVuY3Rpb24gKGYsIGR0KSB7XG4gIHJldHVybiBkdCA8PSAwID8gcnVuQXNhcChmKSA6IHNldFRpbWVvdXQoZiwgZHQpXG59XG5cbkNsb2NrVGltZXIucHJvdG90eXBlLmNsZWFyVGltZXIgPSBmdW5jdGlvbiAodCkge1xuICByZXR1cm4gdCBpbnN0YW5jZW9mIEFzYXAgPyB0LmNhbmNlbCgpIDogY2xlYXJUaW1lb3V0KHQpXG59XG5cbmZ1bmN0aW9uIEFzYXAgKGYpIHtcbiAgdGhpcy5mID0gZlxuICB0aGlzLmFjdGl2ZSA9IHRydWVcbn1cblxuQXNhcC5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5hY3RpdmUgJiYgdGhpcy5mKClcbn1cblxuQXNhcC5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuICB0aHJvdyBlXG59XG5cbkFzYXAucHJvdG90eXBlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5hY3RpdmUgPSBmYWxzZVxufVxuXG5mdW5jdGlvbiBydW5Bc2FwIChmKSB7XG4gIHZhciB0YXNrID0gbmV3IEFzYXAoZilcbiAgZGVmZXIodGFzaylcbiAgcmV0dXJuIHRhc2tcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NjaGVkdWxlci9DbG9ja1RpbWVyLmpzXG4vLyBtb2R1bGUgaWQgPSA0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0ICogYXMgYmFzZSBmcm9tICdAbW9zdC9wcmVsdWRlJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBUaW1lbGluZSAoKSB7XG4gIHRoaXMudGFza3MgPSBbXVxufVxuXG5UaW1lbGluZS5wcm90b3R5cGUubmV4dEFycml2YWwgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmlzRW1wdHkoKSA/IEluZmluaXR5IDogdGhpcy50YXNrc1swXS50aW1lXG59XG5cblRpbWVsaW5lLnByb3RvdHlwZS5pc0VtcHR5ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy50YXNrcy5sZW5ndGggPT09IDBcbn1cblxuVGltZWxpbmUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChzdCkge1xuICBpbnNlcnRCeVRpbWUoc3QsIHRoaXMudGFza3MpXG59XG5cblRpbWVsaW5lLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoc3QpIHtcbiAgdmFyIGkgPSBiaW5hcnlTZWFyY2goc3QudGltZSwgdGhpcy50YXNrcylcblxuICBpZiAoaSA+PSAwICYmIGkgPCB0aGlzLnRhc2tzLmxlbmd0aCkge1xuICAgIHZhciBhdCA9IGJhc2UuZmluZEluZGV4KHN0LCB0aGlzLnRhc2tzW2ldLmV2ZW50cylcbiAgICBpZiAoYXQgPj0gMCkge1xuICAgICAgdGhpcy50YXNrc1tpXS5ldmVudHMuc3BsaWNlKGF0LCAxKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cblxuVGltZWxpbmUucHJvdG90eXBlLnJlbW92ZUFsbCA9IGZ1bmN0aW9uIChmKSB7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy50YXNrcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICByZW1vdmVBbGxGcm9tKGYsIHRoaXMudGFza3NbaV0pXG4gIH1cbn1cblxuVGltZWxpbmUucHJvdG90eXBlLnJ1blRhc2tzID0gZnVuY3Rpb24gKHQsIHJ1blRhc2spIHtcbiAgdmFyIHRhc2tzID0gdGhpcy50YXNrc1xuICB2YXIgbCA9IHRhc2tzLmxlbmd0aFxuICB2YXIgaSA9IDBcblxuICB3aGlsZSAoaSA8IGwgJiYgdGFza3NbaV0udGltZSA8PSB0KSB7XG4gICAgKytpXG4gIH1cblxuICB0aGlzLnRhc2tzID0gdGFza3Muc2xpY2UoaSlcblxuICAvLyBSdW4gYWxsIHJlYWR5IHRhc2tzXG4gIGZvciAodmFyIGogPSAwOyBqIDwgaTsgKytqKSB7XG4gICAgdGhpcy50YXNrcyA9IHJ1blRhc2tzKHJ1blRhc2ssIHRhc2tzW2pdLCB0aGlzLnRhc2tzKVxuICB9XG59XG5cbmZ1bmN0aW9uIHJ1blRhc2tzIChydW5UYXNrLCB0aW1lc2xvdCwgdGFza3MpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjb21wbGV4aXR5XG4gIHZhciBldmVudHMgPSB0aW1lc2xvdC5ldmVudHNcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgdGFzayA9IGV2ZW50c1tpXVxuXG4gICAgaWYgKHRhc2suYWN0aXZlKSB7XG4gICAgICBydW5UYXNrKHRhc2spXG5cbiAgICAgIC8vIFJlc2NoZWR1bGUgcGVyaW9kaWMgcmVwZWF0aW5nIHRhc2tzXG4gICAgICAvLyBDaGVjayBhY3RpdmUgYWdhaW4sIHNpbmNlIGEgdGFzayBtYXkgaGF2ZSBjYW5jZWxlZCBpdHNlbGZcbiAgICAgIGlmICh0YXNrLnBlcmlvZCA+PSAwICYmIHRhc2suYWN0aXZlKSB7XG4gICAgICAgIHRhc2sudGltZSA9IHRhc2sudGltZSArIHRhc2sucGVyaW9kXG4gICAgICAgIGluc2VydEJ5VGltZSh0YXNrLCB0YXNrcylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFza3Ncbn1cblxuZnVuY3Rpb24gaW5zZXJ0QnlUaW1lICh0YXNrLCB0aW1lc2xvdHMpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjb21wbGV4aXR5XG4gIHZhciBsID0gdGltZXNsb3RzLmxlbmd0aFxuXG4gIGlmIChsID09PSAwKSB7XG4gICAgdGltZXNsb3RzLnB1c2gobmV3VGltZXNsb3QodGFzay50aW1lLCBbdGFza10pKVxuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIGkgPSBiaW5hcnlTZWFyY2godGFzay50aW1lLCB0aW1lc2xvdHMpXG5cbiAgaWYgKGkgPj0gbCkge1xuICAgIHRpbWVzbG90cy5wdXNoKG5ld1RpbWVzbG90KHRhc2sudGltZSwgW3Rhc2tdKSlcbiAgfSBlbHNlIGlmICh0YXNrLnRpbWUgPT09IHRpbWVzbG90c1tpXS50aW1lKSB7XG4gICAgdGltZXNsb3RzW2ldLmV2ZW50cy5wdXNoKHRhc2spXG4gIH0gZWxzZSB7XG4gICAgdGltZXNsb3RzLnNwbGljZShpLCAwLCBuZXdUaW1lc2xvdCh0YXNrLnRpbWUsIFt0YXNrXSkpXG4gIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlQWxsRnJvbSAoZiwgdGltZXNsb3QpIHtcbiAgdGltZXNsb3QuZXZlbnRzID0gYmFzZS5yZW1vdmVBbGwoZiwgdGltZXNsb3QuZXZlbnRzKVxufVxuXG5mdW5jdGlvbiBiaW5hcnlTZWFyY2ggKHQsIHNvcnRlZEFycmF5KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY29tcGxleGl0eVxuICB2YXIgbG8gPSAwXG4gIHZhciBoaSA9IHNvcnRlZEFycmF5Lmxlbmd0aFxuICB2YXIgbWlkLCB5XG5cbiAgd2hpbGUgKGxvIDwgaGkpIHtcbiAgICBtaWQgPSBNYXRoLmZsb29yKChsbyArIGhpKSAvIDIpXG4gICAgeSA9IHNvcnRlZEFycmF5W21pZF1cblxuICAgIGlmICh0ID09PSB5LnRpbWUpIHtcbiAgICAgIHJldHVybiBtaWRcbiAgICB9IGVsc2UgaWYgKHQgPCB5LnRpbWUpIHtcbiAgICAgIGhpID0gbWlkXG4gICAgfSBlbHNlIHtcbiAgICAgIGxvID0gbWlkICsgMVxuICAgIH1cbiAgfVxuICByZXR1cm4gaGlcbn1cblxuZnVuY3Rpb24gbmV3VGltZXNsb3QgKHQsIGV2ZW50cykge1xuICByZXR1cm4geyB0aW1lOiB0LCBldmVudHM6IGV2ZW50cyB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zY2hlZHVsZXIvVGltZWxpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNyBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdGhydSAoZiwgc3RyZWFtKSB7XG4gIHJldHVybiBmKHN0cmVhbSlcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvdGhydS5qc1xuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBTdHJlYW0gZnJvbSAnLi4vU3RyZWFtJ1xuaW1wb3J0IEV2ZW50VGFyZ2V0U291cmNlIGZyb20gJy4vRXZlbnRUYXJnZXRTb3VyY2UnXG5pbXBvcnQgRXZlbnRFbWl0dGVyU291cmNlIGZyb20gJy4vRXZlbnRFbWl0dGVyU291cmNlJ1xuXG4vKipcbiAqIENyZWF0ZSBhIHN0cmVhbSBmcm9tIGFuIEV2ZW50VGFyZ2V0LCBzdWNoIGFzIGEgRE9NIE5vZGUsIG9yIEV2ZW50RW1pdHRlci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBldmVudCB0eXBlIG5hbWUsIGUuZy4gJ2NsaWNrJ1xuICogQHBhcmFtIHtFdmVudFRhcmdldHxFdmVudEVtaXR0ZXJ9IHNvdXJjZSBFdmVudFRhcmdldCBvciBFdmVudEVtaXR0ZXJcbiAqIEBwYXJhbSB7Kj99IGNhcHR1cmUgZm9yIERPTSBldmVudHMsIHdoZXRoZXIgdG8gdXNlXG4gKiAgY2FwdHVyaW5nLS1wYXNzZWQgYXMgM3JkIHBhcmFtZXRlciB0byBhZGRFdmVudExpc3RlbmVyLlxuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIGNvbnRhaW5pbmcgYWxsIGV2ZW50cyBvZiB0aGUgc3BlY2lmaWVkIHR5cGVcbiAqIGZyb20gdGhlIHNvdXJjZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZyb21FdmVudCAoZXZlbnQsIHNvdXJjZSwgY2FwdHVyZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNvbXBsZXhpdHlcbiAgdmFyIHNcblxuICBpZiAodHlwZW9mIHNvdXJjZS5hZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBzb3VyY2UucmVtb3ZlRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykge1xuICAgICAgY2FwdHVyZSA9IGZhbHNlXG4gICAgfVxuXG4gICAgcyA9IG5ldyBFdmVudFRhcmdldFNvdXJjZShldmVudCwgc291cmNlLCBjYXB0dXJlKVxuICB9IGVsc2UgaWYgKHR5cGVvZiBzb3VyY2UuYWRkTGlzdGVuZXIgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHNvdXJjZS5yZW1vdmVMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHMgPSBuZXcgRXZlbnRFbWl0dGVyU291cmNlKGV2ZW50LCBzb3VyY2UpXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzb3VyY2UgbXVzdCBzdXBwb3J0IGFkZEV2ZW50TGlzdGVuZXIvcmVtb3ZlRXZlbnRMaXN0ZW5lciBvciBhZGRMaXN0ZW5lci9yZW1vdmVMaXN0ZW5lcicpXG4gIH1cblxuICByZXR1cm4gbmV3IFN0cmVhbShzKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc291cmNlL2Zyb21FdmVudC5qc1xuLy8gbW9kdWxlIGlkID0gNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCAqIGFzIGRpc3Bvc2UgZnJvbSAnLi4vZGlzcG9zYWJsZS9kaXNwb3NlJ1xuaW1wb3J0ICogYXMgdHJ5RXZlbnQgZnJvbSAnLi90cnlFdmVudCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRXZlbnRUYXJnZXRTb3VyY2UgKGV2ZW50LCBzb3VyY2UsIGNhcHR1cmUpIHtcbiAgdGhpcy5ldmVudCA9IGV2ZW50XG4gIHRoaXMuc291cmNlID0gc291cmNlXG4gIHRoaXMuY2FwdHVyZSA9IGNhcHR1cmVcbn1cblxuRXZlbnRUYXJnZXRTb3VyY2UucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgZnVuY3Rpb24gYWRkRXZlbnQgKGUpIHtcbiAgICB0cnlFdmVudC50cnlFdmVudChzY2hlZHVsZXIubm93KCksIGUsIHNpbmspXG4gIH1cblxuICB0aGlzLnNvdXJjZS5hZGRFdmVudExpc3RlbmVyKHRoaXMuZXZlbnQsIGFkZEV2ZW50LCB0aGlzLmNhcHR1cmUpXG5cbiAgcmV0dXJuIGRpc3Bvc2UuY3JlYXRlKGRpc3Bvc2VFdmVudFRhcmdldCxcbiAgICB7IHRhcmdldDogdGhpcywgYWRkRXZlbnQ6IGFkZEV2ZW50IH0pXG59XG5cbmZ1bmN0aW9uIGRpc3Bvc2VFdmVudFRhcmdldCAoaW5mbykge1xuICB2YXIgdGFyZ2V0ID0gaW5mby50YXJnZXRcbiAgdGFyZ2V0LnNvdXJjZS5yZW1vdmVFdmVudExpc3RlbmVyKHRhcmdldC5ldmVudCwgaW5mby5hZGRFdmVudCwgdGFyZ2V0LmNhcHR1cmUpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zb3VyY2UvRXZlbnRUYXJnZXRTb3VyY2UuanNcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgRGVmZXJyZWRTaW5rIGZyb20gJy4uL3NpbmsvRGVmZXJyZWRTaW5rJ1xuaW1wb3J0ICogYXMgZGlzcG9zZSBmcm9tICcuLi9kaXNwb3NhYmxlL2Rpc3Bvc2UnXG5pbXBvcnQgKiBhcyB0cnlFdmVudCBmcm9tICcuL3RyeUV2ZW50J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBFdmVudEVtaXR0ZXJTb3VyY2UgKGV2ZW50LCBzb3VyY2UpIHtcbiAgdGhpcy5ldmVudCA9IGV2ZW50XG4gIHRoaXMuc291cmNlID0gc291cmNlXG59XG5cbkV2ZW50RW1pdHRlclNvdXJjZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICAvLyBOT1RFOiBCZWNhdXNlIEV2ZW50RW1pdHRlciBhbGxvd3MgZXZlbnRzIGluIHRoZSBzYW1lIGNhbGwgc3RhY2sgYXNcbiAgLy8gYSBsaXN0ZW5lciBpcyBhZGRlZCwgdXNlIGEgRGVmZXJyZWRTaW5rIHRvIGJ1ZmZlciBldmVudHNcbiAgLy8gdW50aWwgdGhlIHN0YWNrIGNsZWFycywgdGhlbiBwcm9wYWdhdGUuICBUaGlzIG1haW50YWlucyBtb3N0LmpzJ3NcbiAgLy8gaW52YXJpYW50IHRoYXQgbm8gZXZlbnQgd2lsbCBiZSBkZWxpdmVyZWQgaW4gdGhlIHNhbWUgY2FsbCBzdGFja1xuICAvLyBhcyBhbiBvYnNlcnZlciBiZWdpbnMgb2JzZXJ2aW5nLlxuICB2YXIgZHNpbmsgPSBuZXcgRGVmZXJyZWRTaW5rKHNpbmspXG5cbiAgZnVuY3Rpb24gYWRkRXZlbnRWYXJpYWRpYyAoYSkge1xuICAgIHZhciBsID0gYXJndW1lbnRzLmxlbmd0aFxuICAgIGlmIChsID4gMSkge1xuICAgICAgdmFyIGFyciA9IG5ldyBBcnJheShsKVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgYXJyW2ldID0gYXJndW1lbnRzW2ldXG4gICAgICB9XG4gICAgICB0cnlFdmVudC50cnlFdmVudChzY2hlZHVsZXIubm93KCksIGFyciwgZHNpbmspXG4gICAgfSBlbHNlIHtcbiAgICAgIHRyeUV2ZW50LnRyeUV2ZW50KHNjaGVkdWxlci5ub3coKSwgYSwgZHNpbmspXG4gICAgfVxuICB9XG5cbiAgdGhpcy5zb3VyY2UuYWRkTGlzdGVuZXIodGhpcy5ldmVudCwgYWRkRXZlbnRWYXJpYWRpYylcblxuICByZXR1cm4gZGlzcG9zZS5jcmVhdGUoZGlzcG9zZUV2ZW50RW1pdHRlciwgeyB0YXJnZXQ6IHRoaXMsIGFkZEV2ZW50OiBhZGRFdmVudFZhcmlhZGljIH0pXG59XG5cbmZ1bmN0aW9uIGRpc3Bvc2VFdmVudEVtaXR0ZXIgKGluZm8pIHtcbiAgdmFyIHRhcmdldCA9IGluZm8udGFyZ2V0XG4gIHRhcmdldC5zb3VyY2UucmVtb3ZlTGlzdGVuZXIodGFyZ2V0LmV2ZW50LCBpbmZvLmFkZEV2ZW50KVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc291cmNlL0V2ZW50RW1pdHRlclNvdXJjZS5qc1xuLy8gbW9kdWxlIGlkID0gNTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCB7IGRlZmVyIH0gZnJvbSAnLi4vdGFzaydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGVmZXJyZWRTaW5rIChzaW5rKSB7XG4gIHRoaXMuc2luayA9IHNpbmtcbiAgdGhpcy5ldmVudHMgPSBbXVxuICB0aGlzLmFjdGl2ZSA9IHRydWVcbn1cblxuRGVmZXJyZWRTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIGlmICghdGhpcy5hY3RpdmUpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmICh0aGlzLmV2ZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBkZWZlcihuZXcgUHJvcGFnYXRlQWxsVGFzayh0aGlzLnNpbmssIHQsIHRoaXMuZXZlbnRzKSlcbiAgfVxuXG4gIHRoaXMuZXZlbnRzLnB1c2goeyB0aW1lOiB0LCB2YWx1ZTogeCB9KVxufVxuXG5EZWZlcnJlZFNpbmsucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIGlmICghdGhpcy5hY3RpdmUpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHRoaXMuX2VuZChuZXcgRW5kVGFzayh0LCB4LCB0aGlzLnNpbmspKVxufVxuXG5EZWZlcnJlZFNpbmsucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKHQsIGUpIHtcbiAgdGhpcy5fZW5kKG5ldyBFcnJvclRhc2sodCwgZSwgdGhpcy5zaW5rKSlcbn1cblxuRGVmZXJyZWRTaW5rLnByb3RvdHlwZS5fZW5kID0gZnVuY3Rpb24gKHRhc2spIHtcbiAgdGhpcy5hY3RpdmUgPSBmYWxzZVxuICBkZWZlcih0YXNrKVxufVxuXG5mdW5jdGlvbiBQcm9wYWdhdGVBbGxUYXNrIChzaW5rLCB0aW1lLCBldmVudHMpIHtcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLmV2ZW50cyA9IGV2ZW50c1xuICB0aGlzLnRpbWUgPSB0aW1lXG59XG5cblByb3BhZ2F0ZUFsbFRhc2sucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuZXZlbnRzXG4gIHZhciBzaW5rID0gdGhpcy5zaW5rXG4gIHZhciBldmVudFxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gZXZlbnRzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGV2ZW50ID0gZXZlbnRzW2ldXG4gICAgdGhpcy50aW1lID0gZXZlbnQudGltZVxuICAgIHNpbmsuZXZlbnQoZXZlbnQudGltZSwgZXZlbnQudmFsdWUpXG4gIH1cblxuICBldmVudHMubGVuZ3RoID0gMFxufVxuXG5Qcm9wYWdhdGVBbGxUYXNrLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gIHRoaXMuc2luay5lcnJvcih0aGlzLnRpbWUsIGUpXG59XG5cbmZ1bmN0aW9uIEVuZFRhc2sgKHQsIHgsIHNpbmspIHtcbiAgdGhpcy50aW1lID0gdFxuICB0aGlzLnZhbHVlID0geFxuICB0aGlzLnNpbmsgPSBzaW5rXG59XG5cbkVuZFRhc2sucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5zaW5rLmVuZCh0aGlzLnRpbWUsIHRoaXMudmFsdWUpXG59XG5cbkVuZFRhc2sucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgdGhpcy5zaW5rLmVycm9yKHRoaXMudGltZSwgZSlcbn1cblxuZnVuY3Rpb24gRXJyb3JUYXNrICh0LCBlLCBzaW5rKSB7XG4gIHRoaXMudGltZSA9IHRcbiAgdGhpcy52YWx1ZSA9IGVcbiAgdGhpcy5zaW5rID0gc2lua1xufVxuXG5FcnJvclRhc2sucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5zaW5rLmVycm9yKHRoaXMudGltZSwgdGhpcy52YWx1ZSlcbn1cblxuRXJyb3JUYXNrLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gIHRocm93IGVcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NpbmsvRGVmZXJyZWRTaW5rLmpzXG4vLyBtb2R1bGUgaWQgPSA1NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IHsgd2l0aERlZmF1bHRTY2hlZHVsZXIgYXMgcnVuIH0gZnJvbSAnLi4vcnVuU291cmNlJ1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAnLi90cmFuc2Zvcm0nXG5cbi8qKlxuICogT2JzZXJ2ZSBhbGwgdGhlIGV2ZW50IHZhbHVlcyBpbiB0aGUgc3RyZWFtIGluIHRpbWUgb3JkZXIuIFRoZVxuICogcHJvdmlkZWQgZnVuY3Rpb24gYGZgIHdpbGwgYmUgY2FsbGVkIGZvciBlYWNoIGV2ZW50IHZhbHVlXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHg6VCk6Kn0gZiBmdW5jdGlvbiB0byBjYWxsIHdpdGggZWFjaCBldmVudCB2YWx1ZVxuICogQHBhcmFtIHtTdHJlYW08VD59IHN0cmVhbSBzdHJlYW0gdG8gb2JzZXJ2ZVxuICogQHJldHVybiB7UHJvbWlzZX0gcHJvbWlzZSB0aGF0IGZ1bGZpbGxzIGFmdGVyIHRoZSBzdHJlYW0gZW5kcyB3aXRob3V0XG4gKiAgYW4gZXJyb3IsIG9yIHJlamVjdHMgaWYgdGhlIHN0cmVhbSBlbmRzIHdpdGggYW4gZXJyb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvYnNlcnZlIChmLCBzdHJlYW0pIHtcbiAgcmV0dXJuIGRyYWluKHRhcChmLCBzdHJlYW0pKVxufVxuXG4vKipcbiAqIFwiUnVuXCIgYSBzdHJlYW0gYnkgY3JlYXRpbmcgZGVtYW5kIGFuZCBjb25zdW1pbmcgYWxsIGV2ZW50c1xuICogQHBhcmFtIHtTdHJlYW08VD59IHN0cmVhbSBzdHJlYW0gdG8gZHJhaW5cbiAqIEByZXR1cm4ge1Byb21pc2V9IHByb21pc2UgdGhhdCBmdWxmaWxscyBhZnRlciB0aGUgc3RyZWFtIGVuZHMgd2l0aG91dFxuICogIGFuIGVycm9yLCBvciByZWplY3RzIGlmIHRoZSBzdHJlYW0gZW5kcyB3aXRoIGFuIGVycm9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZHJhaW4gKHN0cmVhbSkge1xuICByZXR1cm4gcnVuKHN0cmVhbS5zb3VyY2UpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL29ic2VydmUuanNcbi8vIG1vZHVsZSBpZCA9IDU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgUGlwZSBmcm9tICcuLi9zaW5rL1BpcGUnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEZpbHRlck1hcCAocCwgZiwgc291cmNlKSB7XG4gIHRoaXMucCA9IHBcbiAgdGhpcy5mID0gZlxuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxufVxuXG5GaWx0ZXJNYXAucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgcmV0dXJuIHRoaXMuc291cmNlLnJ1bihuZXcgRmlsdGVyTWFwU2luayh0aGlzLnAsIHRoaXMuZiwgc2luayksIHNjaGVkdWxlcilcbn1cblxuZnVuY3Rpb24gRmlsdGVyTWFwU2luayAocCwgZiwgc2luaykge1xuICB0aGlzLnAgPSBwXG4gIHRoaXMuZiA9IGZcbiAgdGhpcy5zaW5rID0gc2lua1xufVxuXG5GaWx0ZXJNYXBTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHZhciBmID0gdGhpcy5mXG4gIHZhciBwID0gdGhpcy5wXG4gIHAoeCkgJiYgdGhpcy5zaW5rLmV2ZW50KHQsIGYoeCkpXG59XG5cbkZpbHRlck1hcFNpbmsucHJvdG90eXBlLmVuZCA9IFBpcGUucHJvdG90eXBlLmVuZFxuRmlsdGVyTWFwU2luay5wcm90b3R5cGUuZXJyb3IgPSBQaXBlLnByb3RvdHlwZS5lcnJvclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvZnVzaW9uL0ZpbHRlck1hcC5qc1xuLy8gbW9kdWxlIGlkID0gNTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBTdHJlYW0gZnJvbSAnLi4vU3RyZWFtJ1xuaW1wb3J0IFBpcGUgZnJvbSAnLi4vc2luay9QaXBlJ1xuXG4vKipcbiAqIEdlbmVyYWxpemVkIGZlZWRiYWNrIGxvb3AuIENhbGwgYSBzdGVwcGVyIGZ1bmN0aW9uIGZvciBlYWNoIGV2ZW50LiBUaGUgc3RlcHBlclxuICogd2lsbCBiZSBjYWxsZWQgd2l0aCAyIHBhcmFtczogdGhlIGN1cnJlbnQgc2VlZCBhbmQgdGhlIGFuIGV2ZW50IHZhbHVlLiAgSXQgbXVzdFxuICogcmV0dXJuIGEgbmV3IHsgc2VlZCwgdmFsdWUgfSBwYWlyLiBUaGUgYHNlZWRgIHdpbGwgYmUgZmVkIGJhY2sgaW50byB0aGUgbmV4dFxuICogaW52b2NhdGlvbiBvZiBzdGVwcGVyLCBhbmQgdGhlIGB2YWx1ZWAgd2lsbCBiZSBwcm9wYWdhdGVkIGFzIHRoZSBldmVudCB2YWx1ZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oc2VlZDoqLCB2YWx1ZToqKTp7c2VlZDoqLCB2YWx1ZToqfX0gc3RlcHBlciBsb29wIHN0ZXAgZnVuY3Rpb25cbiAqIEBwYXJhbSB7Kn0gc2VlZCBpbml0aWFsIHNlZWQgdmFsdWUgcGFzc2VkIHRvIGZpcnN0IHN0ZXBwZXIgY2FsbFxuICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbSBldmVudCBzdHJlYW1cbiAqIEByZXR1cm5zIHtTdHJlYW19IG5ldyBzdHJlYW0gd2hvc2UgdmFsdWVzIGFyZSB0aGUgYHZhbHVlYCBmaWVsZCBvZiB0aGUgb2JqZWN0c1xuICogcmV0dXJuZWQgYnkgdGhlIHN0ZXBwZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvb3AgKHN0ZXBwZXIsIHNlZWQsIHN0cmVhbSkge1xuICByZXR1cm4gbmV3IFN0cmVhbShuZXcgTG9vcChzdGVwcGVyLCBzZWVkLCBzdHJlYW0uc291cmNlKSlcbn1cblxuZnVuY3Rpb24gTG9vcCAoc3RlcHBlciwgc2VlZCwgc291cmNlKSB7XG4gIHRoaXMuc3RlcCA9IHN0ZXBwZXJcbiAgdGhpcy5zZWVkID0gc2VlZFxuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxufVxuXG5Mb29wLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHJldHVybiB0aGlzLnNvdXJjZS5ydW4obmV3IExvb3BTaW5rKHRoaXMuc3RlcCwgdGhpcy5zZWVkLCBzaW5rKSwgc2NoZWR1bGVyKVxufVxuXG5mdW5jdGlvbiBMb29wU2luayAoc3RlcHBlciwgc2VlZCwgc2luaykge1xuICB0aGlzLnN0ZXAgPSBzdGVwcGVyXG4gIHRoaXMuc2VlZCA9IHNlZWRcbiAgdGhpcy5zaW5rID0gc2lua1xufVxuXG5Mb29wU2luay5wcm90b3R5cGUuZXJyb3IgPSBQaXBlLnByb3RvdHlwZS5lcnJvclxuXG5Mb29wU2luay5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgeCkge1xuICB2YXIgcmVzdWx0ID0gdGhpcy5zdGVwKHRoaXMuc2VlZCwgeClcbiAgdGhpcy5zZWVkID0gcmVzdWx0LnNlZWRcbiAgdGhpcy5zaW5rLmV2ZW50KHQsIHJlc3VsdC52YWx1ZSlcbn1cblxuTG9vcFNpbmsucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uICh0KSB7XG4gIHRoaXMuc2luay5lbmQodCwgdGhpcy5zZWVkKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9sb29wLmpzXG4vLyBtb2R1bGUgaWQgPSA1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFN0cmVhbSBmcm9tICcuLi9TdHJlYW0nXG5pbXBvcnQgUGlwZSBmcm9tICcuLi9zaW5rL1BpcGUnXG5pbXBvcnQgeyB3aXRoRGVmYXVsdFNjaGVkdWxlciBhcyBydW5Tb3VyY2UgfSBmcm9tICcuLi9ydW5Tb3VyY2UnXG5pbXBvcnQgKiBhcyBkaXNwb3NlIGZyb20gJy4uL2Rpc3Bvc2FibGUvZGlzcG9zZSdcbmltcG9ydCBQcm9wYWdhdGVUYXNrIGZyb20gJy4uL3NjaGVkdWxlci9Qcm9wYWdhdGVUYXNrJ1xuXG4vKipcbiAqIENyZWF0ZSBhIHN0cmVhbSBjb250YWluaW5nIHN1Y2Nlc3NpdmUgcmVkdWNlIHJlc3VsdHMgb2YgYXBwbHlpbmcgZiB0b1xuICogdGhlIHByZXZpb3VzIHJlZHVjZSByZXN1bHQgYW5kIHRoZSBjdXJyZW50IHN0cmVhbSBpdGVtLlxuICogQHBhcmFtIHtmdW5jdGlvbihyZXN1bHQ6KiwgeDoqKToqfSBmIHJlZHVjZXIgZnVuY3Rpb25cbiAqIEBwYXJhbSB7Kn0gaW5pdGlhbCBpbml0aWFsIHZhbHVlXG4gKiBAcGFyYW0ge1N0cmVhbX0gc3RyZWFtIHN0cmVhbSB0byBzY2FuXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIGNvbnRhaW5pbmcgc3VjY2Vzc2l2ZSByZWR1Y2UgcmVzdWx0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2NhbiAoZiwgaW5pdGlhbCwgc3RyZWFtKSB7XG4gIHJldHVybiBuZXcgU3RyZWFtKG5ldyBTY2FuKGYsIGluaXRpYWwsIHN0cmVhbS5zb3VyY2UpKVxufVxuXG5mdW5jdGlvbiBTY2FuIChmLCB6LCBzb3VyY2UpIHtcbiAgdGhpcy5zb3VyY2UgPSBzb3VyY2VcbiAgdGhpcy5mID0gZlxuICB0aGlzLnZhbHVlID0gelxufVxuXG5TY2FuLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHZhciBkMSA9IHNjaGVkdWxlci5hc2FwKFByb3BhZ2F0ZVRhc2suZXZlbnQodGhpcy52YWx1ZSwgc2luaykpXG4gIHZhciBkMiA9IHRoaXMuc291cmNlLnJ1bihuZXcgU2NhblNpbmsodGhpcy5mLCB0aGlzLnZhbHVlLCBzaW5rKSwgc2NoZWR1bGVyKVxuICByZXR1cm4gZGlzcG9zZS5hbGwoW2QxLCBkMl0pXG59XG5cbmZ1bmN0aW9uIFNjYW5TaW5rIChmLCB6LCBzaW5rKSB7XG4gIHRoaXMuZiA9IGZcbiAgdGhpcy52YWx1ZSA9IHpcbiAgdGhpcy5zaW5rID0gc2lua1xufVxuXG5TY2FuU2luay5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgeCkge1xuICB2YXIgZiA9IHRoaXMuZlxuICB0aGlzLnZhbHVlID0gZih0aGlzLnZhbHVlLCB4KVxuICB0aGlzLnNpbmsuZXZlbnQodCwgdGhpcy52YWx1ZSlcbn1cblxuU2NhblNpbmsucHJvdG90eXBlLmVycm9yID0gUGlwZS5wcm90b3R5cGUuZXJyb3JcblNjYW5TaW5rLnByb3RvdHlwZS5lbmQgPSBQaXBlLnByb3RvdHlwZS5lbmRcblxuLyoqXG4qIFJlZHVjZSBhIHN0cmVhbSB0byBwcm9kdWNlIGEgc2luZ2xlIHJlc3VsdC4gIE5vdGUgdGhhdCByZWR1Y2luZyBhbiBpbmZpbml0ZVxuKiBzdHJlYW0gd2lsbCByZXR1cm4gYSBQcm9taXNlIHRoYXQgbmV2ZXIgZnVsZmlsbHMsIGJ1dCB0aGF0IG1heSByZWplY3QgaWYgYW4gZXJyb3Jcbiogb2NjdXJzLlxuKiBAcGFyYW0ge2Z1bmN0aW9uKHJlc3VsdDoqLCB4OiopOip9IGYgcmVkdWNlciBmdW5jdGlvblxuKiBAcGFyYW0geyp9IGluaXRpYWwgaW5pdGlhbCB2YWx1ZVxuKiBAcGFyYW0ge1N0cmVhbX0gc3RyZWFtIHRvIHJlZHVjZVxuKiBAcmV0dXJucyB7UHJvbWlzZX0gcHJvbWlzZSBmb3IgdGhlIGZpbGUgcmVzdWx0IG9mIHRoZSByZWR1Y2VcbiovXG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlIChmLCBpbml0aWFsLCBzdHJlYW0pIHtcbiAgcmV0dXJuIHJ1blNvdXJjZShuZXcgUmVkdWNlKGYsIGluaXRpYWwsIHN0cmVhbS5zb3VyY2UpKVxufVxuXG5mdW5jdGlvbiBSZWR1Y2UgKGYsIHosIHNvdXJjZSkge1xuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxuICB0aGlzLmYgPSBmXG4gIHRoaXMudmFsdWUgPSB6XG59XG5cblJlZHVjZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gdGhpcy5zb3VyY2UucnVuKG5ldyBSZWR1Y2VTaW5rKHRoaXMuZiwgdGhpcy52YWx1ZSwgc2luayksIHNjaGVkdWxlcilcbn1cblxuZnVuY3Rpb24gUmVkdWNlU2luayAoZiwgeiwgc2luaykge1xuICB0aGlzLmYgPSBmXG4gIHRoaXMudmFsdWUgPSB6XG4gIHRoaXMuc2luayA9IHNpbmtcbn1cblxuUmVkdWNlU2luay5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgeCkge1xuICB2YXIgZiA9IHRoaXMuZlxuICB0aGlzLnZhbHVlID0gZih0aGlzLnZhbHVlLCB4KVxuICB0aGlzLnNpbmsuZXZlbnQodCwgdGhpcy52YWx1ZSlcbn1cblxuUmVkdWNlU2luay5wcm90b3R5cGUuZXJyb3IgPSBQaXBlLnByb3RvdHlwZS5lcnJvclxuXG5SZWR1Y2VTaW5rLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAodCkge1xuICB0aGlzLnNpbmsuZW5kKHQsIHRoaXMudmFsdWUpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL2FjY3VtdWxhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDU5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcblxuLyoqXG4gKiBDb21wdXRlIGEgc3RyZWFtIGJ5IHVuZm9sZGluZyB0dXBsZXMgb2YgZnV0dXJlIHZhbHVlcyBmcm9tIGEgc2VlZCB2YWx1ZVxuICogRXZlbnQgdGltZXMgbWF5IGJlIGNvbnRyb2xsZWQgYnkgcmV0dXJuaW5nIGEgUHJvbWlzZSBmcm9tIGZcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oc2VlZDoqKTp7dmFsdWU6Kiwgc2VlZDoqLCBkb25lOmJvb2xlYW59fFByb21pc2U8e3ZhbHVlOiosIHNlZWQ6KiwgZG9uZTpib29sZWFufT59IGYgdW5mb2xkaW5nIGZ1bmN0aW9uIGFjY2VwdHNcbiAqICBhIHNlZWQgYW5kIHJldHVybnMgYSBuZXcgdHVwbGUgd2l0aCBhIHZhbHVlLCBuZXcgc2VlZCwgYW5kIGJvb2xlYW4gZG9uZSBmbGFnLlxuICogIElmIHR1cGxlLmRvbmUgaXMgdHJ1ZSwgdGhlIHN0cmVhbSB3aWxsIGVuZC5cbiAqIEBwYXJhbSB7Kn0gc2VlZCBzZWVkIHZhbHVlXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gY29udGFpbmluZyBhbGwgdmFsdWUgb2YgYWxsIHR1cGxlcyBwcm9kdWNlZCBieSB0aGVcbiAqICB1bmZvbGRpbmcgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bmZvbGQgKGYsIHNlZWQpIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IFVuZm9sZFNvdXJjZShmLCBzZWVkKSlcbn1cblxuZnVuY3Rpb24gVW5mb2xkU291cmNlIChmLCBzZWVkKSB7XG4gIHRoaXMuZiA9IGZcbiAgdGhpcy52YWx1ZSA9IHNlZWRcbn1cblxuVW5mb2xkU291cmNlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHJldHVybiBuZXcgVW5mb2xkKHRoaXMuZiwgdGhpcy52YWx1ZSwgc2luaywgc2NoZWR1bGVyKVxufVxuXG5mdW5jdGlvbiBVbmZvbGQgKGYsIHgsIHNpbmssIHNjaGVkdWxlcikge1xuICB0aGlzLmYgPSBmXG4gIHRoaXMuc2luayA9IHNpbmtcbiAgdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXJcbiAgdGhpcy5hY3RpdmUgPSB0cnVlXG5cbiAgdmFyIHNlbGYgPSB0aGlzXG4gIGZ1bmN0aW9uIGVyciAoZSkge1xuICAgIHNlbGYuc2luay5lcnJvcihzZWxmLnNjaGVkdWxlci5ub3coKSwgZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0ICh1bmZvbGQpIHtcbiAgICByZXR1cm4gc3RlcFVuZm9sZCh1bmZvbGQsIHgpXG4gIH1cblxuICBQcm9taXNlLnJlc29sdmUodGhpcykudGhlbihzdGFydCkuY2F0Y2goZXJyKVxufVxuXG5VbmZvbGQucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuYWN0aXZlID0gZmFsc2Vcbn1cblxuZnVuY3Rpb24gc3RlcFVuZm9sZCAodW5mb2xkLCB4KSB7XG4gIHZhciBmID0gdW5mb2xkLmZcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmKHgpKS50aGVuKGZ1bmN0aW9uICh0dXBsZSkge1xuICAgIHJldHVybiBjb250aW51ZVVuZm9sZCh1bmZvbGQsIHR1cGxlKVxuICB9KVxufVxuXG5mdW5jdGlvbiBjb250aW51ZVVuZm9sZCAodW5mb2xkLCB0dXBsZSkge1xuICBpZiAodHVwbGUuZG9uZSkge1xuICAgIHVuZm9sZC5zaW5rLmVuZCh1bmZvbGQuc2NoZWR1bGVyLm5vdygpLCB0dXBsZS52YWx1ZSlcbiAgICByZXR1cm4gdHVwbGUudmFsdWVcbiAgfVxuXG4gIHVuZm9sZC5zaW5rLmV2ZW50KHVuZm9sZC5zY2hlZHVsZXIubm93KCksIHR1cGxlLnZhbHVlKVxuXG4gIGlmICghdW5mb2xkLmFjdGl2ZSkge1xuICAgIHJldHVybiB0dXBsZS52YWx1ZVxuICB9XG4gIHJldHVybiBzdGVwVW5mb2xkKHVuZm9sZCwgdHVwbGUuc2VlZClcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NvdXJjZS91bmZvbGQuanNcbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcblxuLyoqXG4gKiBDb21wdXRlIGEgc3RyZWFtIGJ5IGl0ZXJhdGl2ZWx5IGNhbGxpbmcgZiB0byBwcm9kdWNlIHZhbHVlc1xuICogRXZlbnQgdGltZXMgbWF5IGJlIGNvbnRyb2xsZWQgYnkgcmV0dXJuaW5nIGEgUHJvbWlzZSBmcm9tIGZcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oeDoqKToqfFByb21pc2U8Kj59IGZcbiAqIEBwYXJhbSB7Kn0geCBpbml0aWFsIHZhbHVlXG4gKiBAcmV0dXJucyB7U3RyZWFtfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXRlcmF0ZSAoZiwgeCkge1xuICByZXR1cm4gbmV3IFN0cmVhbShuZXcgSXRlcmF0ZVNvdXJjZShmLCB4KSlcbn1cblxuZnVuY3Rpb24gSXRlcmF0ZVNvdXJjZSAoZiwgeCkge1xuICB0aGlzLmYgPSBmXG4gIHRoaXMudmFsdWUgPSB4XG59XG5cbkl0ZXJhdGVTb3VyY2UucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgcmV0dXJuIG5ldyBJdGVyYXRlKHRoaXMuZiwgdGhpcy52YWx1ZSwgc2luaywgc2NoZWR1bGVyKVxufVxuXG5mdW5jdGlvbiBJdGVyYXRlIChmLCBpbml0aWFsLCBzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdGhpcy5mID0gZlxuICB0aGlzLnNpbmsgPSBzaW5rXG4gIHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyXG4gIHRoaXMuYWN0aXZlID0gdHJ1ZVxuXG4gIHZhciB4ID0gaW5pdGlhbFxuXG4gIHZhciBzZWxmID0gdGhpc1xuICBmdW5jdGlvbiBlcnIgKGUpIHtcbiAgICBzZWxmLnNpbmsuZXJyb3Ioc2VsZi5zY2hlZHVsZXIubm93KCksIGUpXG4gIH1cblxuICBmdW5jdGlvbiBzdGFydCAoaXRlcmF0ZSkge1xuICAgIHJldHVybiBzdGVwSXRlcmF0ZShpdGVyYXRlLCB4KVxuICB9XG5cbiAgUHJvbWlzZS5yZXNvbHZlKHRoaXMpLnRoZW4oc3RhcnQpLmNhdGNoKGVycilcbn1cblxuSXRlcmF0ZS5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5hY3RpdmUgPSBmYWxzZVxufVxuXG5mdW5jdGlvbiBzdGVwSXRlcmF0ZSAoaXRlcmF0ZSwgeCkge1xuICBpdGVyYXRlLnNpbmsuZXZlbnQoaXRlcmF0ZS5zY2hlZHVsZXIubm93KCksIHgpXG5cbiAgaWYgKCFpdGVyYXRlLmFjdGl2ZSkge1xuICAgIHJldHVybiB4XG4gIH1cblxuICB2YXIgZiA9IGl0ZXJhdGUuZlxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGYoeCkpLnRoZW4oZnVuY3Rpb24gKHkpIHtcbiAgICByZXR1cm4gY29udGludWVJdGVyYXRlKGl0ZXJhdGUsIHkpXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGNvbnRpbnVlSXRlcmF0ZSAoaXRlcmF0ZSwgeCkge1xuICByZXR1cm4gIWl0ZXJhdGUuYWN0aXZlID8gaXRlcmF0ZS52YWx1ZSA6IHN0ZXBJdGVyYXRlKGl0ZXJhdGUsIHgpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zb3VyY2UvaXRlcmF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gNjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE0IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBTdHJlYW0gZnJvbSAnLi4vU3RyZWFtJ1xuaW1wb3J0ICogYXMgYmFzZSBmcm9tICdAbW9zdC9wcmVsdWRlJ1xuXG4vKipcbiAqIENvbXB1dGUgYSBzdHJlYW0gdXNpbmcgYW4gKmFzeW5jKiBnZW5lcmF0b3IsIHdoaWNoIHlpZWxkcyBwcm9taXNlc1xuICogdG8gY29udHJvbCBldmVudCB0aW1lcy5cbiAqIEBwYXJhbSBmXG4gKiBAcmV0dXJucyB7U3RyZWFtfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGUgKGYgLyosIC4uLmFyZ3MgKi8pIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IEdlbmVyYXRlU291cmNlKGYsIGJhc2UudGFpbChhcmd1bWVudHMpKSlcbn1cblxuZnVuY3Rpb24gR2VuZXJhdGVTb3VyY2UgKGYsIGFyZ3MpIHtcbiAgdGhpcy5mID0gZlxuICB0aGlzLmFyZ3MgPSBhcmdzXG59XG5cbkdlbmVyYXRlU291cmNlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHJldHVybiBuZXcgR2VuZXJhdGUodGhpcy5mLmFwcGx5KHZvaWQgMCwgdGhpcy5hcmdzKSwgc2luaywgc2NoZWR1bGVyKVxufVxuXG5mdW5jdGlvbiBHZW5lcmF0ZSAoaXRlcmF0b3IsIHNpbmssIHNjaGVkdWxlcikge1xuICB0aGlzLml0ZXJhdG9yID0gaXRlcmF0b3JcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlclxuICB0aGlzLmFjdGl2ZSA9IHRydWVcblxuICB2YXIgc2VsZiA9IHRoaXNcbiAgZnVuY3Rpb24gZXJyIChlKSB7XG4gICAgc2VsZi5zaW5rLmVycm9yKHNlbGYuc2NoZWR1bGVyLm5vdygpLCBlKVxuICB9XG5cbiAgUHJvbWlzZS5yZXNvbHZlKHRoaXMpLnRoZW4obmV4dCkuY2F0Y2goZXJyKVxufVxuXG5mdW5jdGlvbiBuZXh0IChnZW5lcmF0ZSwgeCkge1xuICByZXR1cm4gZ2VuZXJhdGUuYWN0aXZlID8gaGFuZGxlKGdlbmVyYXRlLCBnZW5lcmF0ZS5pdGVyYXRvci5uZXh0KHgpKSA6IHhcbn1cblxuZnVuY3Rpb24gaGFuZGxlIChnZW5lcmF0ZSwgcmVzdWx0KSB7XG4gIGlmIChyZXN1bHQuZG9uZSkge1xuICAgIHJldHVybiBnZW5lcmF0ZS5zaW5rLmVuZChnZW5lcmF0ZS5zY2hlZHVsZXIubm93KCksIHJlc3VsdC52YWx1ZSlcbiAgfVxuXG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzdWx0LnZhbHVlKS50aGVuKGZ1bmN0aW9uICh4KSB7XG4gICAgcmV0dXJuIGVtaXQoZ2VuZXJhdGUsIHgpXG4gIH0sIGZ1bmN0aW9uIChlKSB7XG4gICAgcmV0dXJuIGVycm9yKGdlbmVyYXRlLCBlKVxuICB9KVxufVxuXG5mdW5jdGlvbiBlbWl0IChnZW5lcmF0ZSwgeCkge1xuICBnZW5lcmF0ZS5zaW5rLmV2ZW50KGdlbmVyYXRlLnNjaGVkdWxlci5ub3coKSwgeClcbiAgcmV0dXJuIG5leHQoZ2VuZXJhdGUsIHgpXG59XG5cbmZ1bmN0aW9uIGVycm9yIChnZW5lcmF0ZSwgZSkge1xuICByZXR1cm4gaGFuZGxlKGdlbmVyYXRlLCBnZW5lcmF0ZS5pdGVyYXRvci50aHJvdyhlKSlcbn1cblxuR2VuZXJhdGUucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuYWN0aXZlID0gZmFsc2Vcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NvdXJjZS9nZW5lcmF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gNjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCB7IG9mIGFzIHN0cmVhbU9mIH0gZnJvbSAnLi4vc291cmNlL2NvcmUnXG5pbXBvcnQgeyBjb250aW51ZVdpdGggfSBmcm9tICcuL2NvbnRpbnVlV2l0aCdcblxuLyoqXG4gKiBAcGFyYW0geyp9IHggdmFsdWUgdG8gcHJlcGVuZFxuICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbVxuICogQHJldHVybnMge1N0cmVhbX0gbmV3IHN0cmVhbSB3aXRoIHggcHJlcGVuZGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb25zICh4LCBzdHJlYW0pIHtcbiAgcmV0dXJuIGNvbmNhdChzdHJlYW1PZih4KSwgc3RyZWFtKVxufVxuXG4vKipcbiogQHBhcmFtIHtTdHJlYW19IGxlZnRcbiogQHBhcmFtIHtTdHJlYW19IHJpZ2h0XG4qIEByZXR1cm5zIHtTdHJlYW19IG5ldyBzdHJlYW0gY29udGFpbmluZyBhbGwgZXZlbnRzIGluIGxlZnQgZm9sbG93ZWQgYnkgYWxsXG4qICBldmVudHMgaW4gcmlnaHQuICBUaGlzICp0aW1lc2hpZnRzKiByaWdodCB0byB0aGUgZW5kIG9mIGxlZnQuXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbmNhdCAobGVmdCwgcmlnaHQpIHtcbiAgcmV0dXJuIGNvbnRpbnVlV2l0aChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHJpZ2h0XG4gIH0sIGxlZnQpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL2J1aWxkLmpzXG4vLyBtb2R1bGUgaWQgPSA2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IHsgY29tYmluZSB9IGZyb20gJy4vY29tYmluZSdcbmltcG9ydCB7IGFwcGx5IH0gZnJvbSAnQG1vc3QvcHJlbHVkZSdcblxuLyoqXG4gKiBBc3N1bWUgZnMgaXMgYSBzdHJlYW0gY29udGFpbmluZyBmdW5jdGlvbnMsIGFuZCBhcHBseSB0aGUgbGF0ZXN0IGZ1bmN0aW9uXG4gKiBpbiBmcyB0byB0aGUgbGF0ZXN0IHZhbHVlIGluIHhzLlxuICogZnM6ICAgICAgICAgLS1mLS0tLS0tLS0tZy0tLS0tLS0taC0tLS0tLT5cbiAqIHhzOiAgICAgICAgIC1hLS0tLS0tLWItLS0tLS0tYy0tLS0tLS1kLS0+XG4gKiBhcChmcywgeHMpOiAtLWZhLS0tLS1mYi1nYi0tLWdjLS1oYy0taGQtPlxuICogQHBhcmFtIHtTdHJlYW19IGZzIHN0cmVhbSBvZiBmdW5jdGlvbnMgdG8gYXBwbHkgdG8gdGhlIGxhdGVzdCB4XG4gKiBAcGFyYW0ge1N0cmVhbX0geHMgc3RyZWFtIG9mIHZhbHVlcyB0byB3aGljaCB0byBhcHBseSBhbGwgdGhlIGxhdGVzdCBmXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gY29udGFpbmluZyBhbGwgdGhlIGFwcGxpY2F0aW9ucyBvZiBmcyB0byB4c1xuICovXG5leHBvcnQgZnVuY3Rpb24gYXAgKGZzLCB4cykge1xuICByZXR1cm4gY29tYmluZShhcHBseSwgZnMsIHhzKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9hcHBsaWNhdGl2ZS5qc1xuLy8gbW9kdWxlIGlkID0gNjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBTdHJlYW0gZnJvbSAnLi4vU3RyZWFtJ1xuXG4vKipcbiAqIFRyYW5zZm9ybSBhIHN0cmVhbSBieSBwYXNzaW5nIGl0cyBldmVudHMgdGhyb3VnaCBhIHRyYW5zZHVjZXIuXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gdHJhbnNkdWNlciB0cmFuc2R1Y2VyIGZ1bmN0aW9uXG4gKiBAcGFyYW0gIHtTdHJlYW19IHN0cmVhbSBzdHJlYW0gd2hvc2UgZXZlbnRzIHdpbGwgYmUgcGFzc2VkIHRocm91Z2ggdGhlXG4gKiAgdHJhbnNkdWNlclxuICogQHJldHVybiB7U3RyZWFtfSBzdHJlYW0gb2YgZXZlbnRzIHRyYW5zZm9ybWVkIGJ5IHRoZSB0cmFuc2R1Y2VyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2R1Y2UgKHRyYW5zZHVjZXIsIHN0cmVhbSkge1xuICByZXR1cm4gbmV3IFN0cmVhbShuZXcgVHJhbnNkdWNlKHRyYW5zZHVjZXIsIHN0cmVhbS5zb3VyY2UpKVxufVxuXG5mdW5jdGlvbiBUcmFuc2R1Y2UgKHRyYW5zZHVjZXIsIHNvdXJjZSkge1xuICB0aGlzLnRyYW5zZHVjZXIgPSB0cmFuc2R1Y2VyXG4gIHRoaXMuc291cmNlID0gc291cmNlXG59XG5cblRyYW5zZHVjZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICB2YXIgeGYgPSB0aGlzLnRyYW5zZHVjZXIobmV3IFRyYW5zZm9ybWVyKHNpbmspKVxuICByZXR1cm4gdGhpcy5zb3VyY2UucnVuKG5ldyBUcmFuc2R1Y2VTaW5rKGdldFR4SGFuZGxlcih4ZiksIHNpbmspLCBzY2hlZHVsZXIpXG59XG5cbmZ1bmN0aW9uIFRyYW5zZHVjZVNpbmsgKGFkYXB0ZXIsIHNpbmspIHtcbiAgdGhpcy54ZiA9IGFkYXB0ZXJcbiAgdGhpcy5zaW5rID0gc2lua1xufVxuXG5UcmFuc2R1Y2VTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHZhciBuZXh0ID0gdGhpcy54Zi5zdGVwKHQsIHgpXG5cbiAgcmV0dXJuIHRoaXMueGYuaXNSZWR1Y2VkKG5leHQpXG4gICAgPyB0aGlzLnNpbmsuZW5kKHQsIHRoaXMueGYuZ2V0UmVzdWx0KG5leHQpKVxuICAgIDogbmV4dFxufVxuXG5UcmFuc2R1Y2VTaW5rLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAodCwgeCkge1xuICByZXR1cm4gdGhpcy54Zi5yZXN1bHQoeClcbn1cblxuVHJhbnNkdWNlU2luay5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAodCwgZSkge1xuICByZXR1cm4gdGhpcy5zaW5rLmVycm9yKHQsIGUpXG59XG5cbmZ1bmN0aW9uIFRyYW5zZm9ybWVyIChzaW5rKSB7XG4gIHRoaXMudGltZSA9IC1JbmZpbml0eVxuICB0aGlzLnNpbmsgPSBzaW5rXG59XG5cblRyYW5zZm9ybWVyLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IFRyYW5zZm9ybWVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge31cblxuVHJhbnNmb3JtZXIucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gVHJhbnNmb3JtZXIucHJvdG90eXBlLnN0ZXAgPSBmdW5jdGlvbiAodCwgeCkge1xuICBpZiAoIWlzTmFOKHQpKSB7XG4gICAgdGhpcy50aW1lID0gTWF0aC5tYXgodCwgdGhpcy50aW1lKVxuICB9XG4gIHJldHVybiB0aGlzLnNpbmsuZXZlbnQodGhpcy50aW1lLCB4KVxufVxuXG5UcmFuc2Zvcm1lci5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IFRyYW5zZm9ybWVyLnByb3RvdHlwZS5yZXN1bHQgPSBmdW5jdGlvbiAoeCkge1xuICByZXR1cm4gdGhpcy5zaW5rLmVuZCh0aGlzLnRpbWUsIHgpXG59XG5cbi8qKlxuKiBHaXZlbiBhbiBvYmplY3Qgc3VwcG9ydGluZyB0aGUgbmV3IG9yIGxlZ2FjeSB0cmFuc2R1Y2VyIHByb3RvY29sLFxuKiBjcmVhdGUgYW4gYWRhcHRlciBmb3IgaXQuXG4qIEBwYXJhbSB7b2JqZWN0fSB0eCB0cmFuc2Zvcm1cbiogQHJldHVybnMge1R4QWRhcHRlcnxMZWdhY3lUeEFkYXB0ZXJ9XG4qL1xuZnVuY3Rpb24gZ2V0VHhIYW5kbGVyICh0eCkge1xuICByZXR1cm4gdHlwZW9mIHR4WydAQHRyYW5zZHVjZXIvc3RlcCddID09PSAnZnVuY3Rpb24nXG4gICAgPyBuZXcgVHhBZGFwdGVyKHR4KVxuICAgIDogbmV3IExlZ2FjeVR4QWRhcHRlcih0eClcbn1cblxuLyoqXG4qIEFkYXB0ZXIgZm9yIG5ldyBvZmZpY2lhbCB0cmFuc2R1Y2VyIHByb3RvY29sXG4qIEBwYXJhbSB7b2JqZWN0fSB0eCB0cmFuc2Zvcm1cbiogQGNvbnN0cnVjdG9yXG4qL1xuZnVuY3Rpb24gVHhBZGFwdGVyICh0eCkge1xuICB0aGlzLnR4ID0gdHhcbn1cblxuVHhBZGFwdGVyLnByb3RvdHlwZS5zdGVwID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgcmV0dXJuIHRoaXMudHhbJ0BAdHJhbnNkdWNlci9zdGVwJ10odCwgeClcbn1cblR4QWRhcHRlci5wcm90b3R5cGUucmVzdWx0ID0gZnVuY3Rpb24gKHgpIHtcbiAgcmV0dXJuIHRoaXMudHhbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSh4KVxufVxuVHhBZGFwdGVyLnByb3RvdHlwZS5pc1JlZHVjZWQgPSBmdW5jdGlvbiAoeCkge1xuICByZXR1cm4geCAhPSBudWxsICYmIHhbJ0BAdHJhbnNkdWNlci9yZWR1Y2VkJ11cbn1cblR4QWRhcHRlci5wcm90b3R5cGUuZ2V0UmVzdWx0ID0gZnVuY3Rpb24gKHgpIHtcbiAgcmV0dXJuIHhbJ0BAdHJhbnNkdWNlci92YWx1ZSddXG59XG5cbi8qKlxuKiBBZGFwdGVyIGZvciBvbGRlciB0cmFuc2R1Y2VyIHByb3RvY29sXG4qIEBwYXJhbSB7b2JqZWN0fSB0eCB0cmFuc2Zvcm1cbiogQGNvbnN0cnVjdG9yXG4qL1xuZnVuY3Rpb24gTGVnYWN5VHhBZGFwdGVyICh0eCkge1xuICB0aGlzLnR4ID0gdHhcbn1cblxuTGVnYWN5VHhBZGFwdGVyLnByb3RvdHlwZS5zdGVwID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgcmV0dXJuIHRoaXMudHguc3RlcCh0LCB4KVxufVxuTGVnYWN5VHhBZGFwdGVyLnByb3RvdHlwZS5yZXN1bHQgPSBmdW5jdGlvbiAoeCkge1xuICByZXR1cm4gdGhpcy50eC5yZXN1bHQoeClcbn1cbkxlZ2FjeVR4QWRhcHRlci5wcm90b3R5cGUuaXNSZWR1Y2VkID0gZnVuY3Rpb24gKHgpIHtcbiAgcmV0dXJuIHggIT0gbnVsbCAmJiB4Ll9fdHJhbnNkdWNlcnNfcmVkdWNlZF9fXG59XG5MZWdhY3lUeEFkYXB0ZXIucHJvdG90eXBlLmdldFJlc3VsdCA9IGZ1bmN0aW9uICh4KSB7XG4gIHJldHVybiB4LnZhbHVlXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL3RyYW5zZHVjZS5qc1xuLy8gbW9kdWxlIGlkID0gNjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbi8qKlxuICogRG91Ymx5IGxpbmtlZCBsaXN0XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTGlua2VkTGlzdCAoKSB7XG4gIHRoaXMuaGVhZCA9IG51bGxcbiAgdGhpcy5sZW5ndGggPSAwXG59XG5cbi8qKlxuICogQWRkIGEgbm9kZSB0byB0aGUgZW5kIG9mIHRoZSBsaXN0XG4gKiBAcGFyYW0ge3twcmV2Ok9iamVjdHxudWxsLCBuZXh0Ok9iamVjdHxudWxsLCBkaXNwb3NlOmZ1bmN0aW9ufX0geCBub2RlIHRvIGFkZFxuICovXG5MaW5rZWRMaXN0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoeCkge1xuICBpZiAodGhpcy5oZWFkICE9PSBudWxsKSB7XG4gICAgdGhpcy5oZWFkLnByZXYgPSB4XG4gICAgeC5uZXh0ID0gdGhpcy5oZWFkXG4gIH1cbiAgdGhpcy5oZWFkID0geFxuICArK3RoaXMubGVuZ3RoXG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBwcm92aWRlZCBub2RlIGZyb20gdGhlIGxpc3RcbiAqIEBwYXJhbSB7e3ByZXY6T2JqZWN0fG51bGwsIG5leHQ6T2JqZWN0fG51bGwsIGRpc3Bvc2U6ZnVuY3Rpb259fSB4IG5vZGUgdG8gcmVtb3ZlXG4gKi9cbkxpbmtlZExpc3QucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uICh4KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgIGNvbXBsZXhpdHlcbiAgLS10aGlzLmxlbmd0aFxuICBpZiAoeCA9PT0gdGhpcy5oZWFkKSB7XG4gICAgdGhpcy5oZWFkID0gdGhpcy5oZWFkLm5leHRcbiAgfVxuICBpZiAoeC5uZXh0ICE9PSBudWxsKSB7XG4gICAgeC5uZXh0LnByZXYgPSB4LnByZXZcbiAgICB4Lm5leHQgPSBudWxsXG4gIH1cbiAgaWYgKHgucHJldiAhPT0gbnVsbCkge1xuICAgIHgucHJldi5uZXh0ID0geC5uZXh0XG4gICAgeC5wcmV2ID0gbnVsbFxuICB9XG59XG5cbi8qKlxuICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWZmIHRoZXJlIGFyZSBubyBub2RlcyBpbiB0aGUgbGlzdFxuICovXG5MaW5rZWRMaXN0LnByb3RvdHlwZS5pc0VtcHR5ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5sZW5ndGggPT09IDBcbn1cblxuLyoqXG4gKiBEaXNwb3NlIGFsbCBub2Rlc1xuICogQHJldHVybnMge1Byb21pc2V9IHByb21pc2UgdGhhdCBmdWxmaWxscyB3aGVuIGFsbCBub2RlcyBoYXZlIGJlZW4gZGlzcG9zZWQsXG4gKiAgb3IgcmVqZWN0cyBpZiBhbiBlcnJvciBvY2N1cnMgd2hpbGUgZGlzcG9zaW5nXG4gKi9cbkxpbmtlZExpc3QucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmlzRW1wdHkoKSkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICB9XG5cbiAgdmFyIHByb21pc2VzID0gW11cbiAgdmFyIHggPSB0aGlzLmhlYWRcbiAgdGhpcy5oZWFkID0gbnVsbFxuICB0aGlzLmxlbmd0aCA9IDBcblxuICB3aGlsZSAoeCAhPT0gbnVsbCkge1xuICAgIHByb21pc2VzLnB1c2goeC5kaXNwb3NlKCkpXG4gICAgeCA9IHgubmV4dFxuICB9XG5cbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvTGlua2VkTGlzdC5qc1xuLy8gbW9kdWxlIGlkID0gNjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCB7IG1lcmdlTWFwQ29uY3VycmVudGx5IH0gZnJvbSAnLi9tZXJnZUNvbmN1cnJlbnRseSdcblxuLyoqXG4gKiBNYXAgZWFjaCB2YWx1ZSBpbiBzdHJlYW0gdG8gYSBuZXcgc3RyZWFtLCBhbmQgY29uY2F0ZW5hdGUgdGhlbSBhbGxcbiAqIHN0cmVhbTogICAgICAgICAgICAgIC1hLS0tYi0tLWNYXG4gKiBmKGEpOiAgICAgICAgICAgICAgICAgMS0xLTEtMVhcbiAqIGYoYik6ICAgICAgICAgICAgICAgICAgICAgICAgLTItMi0yLTJYXG4gKiBmKGMpOiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLTMtMy0zLTNYXG4gKiBzdHJlYW0uY29uY2F0TWFwKGYpOiAtMS0xLTEtMS0yLTItMi0yLTMtMy0zLTNYXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHg6Kik6U3RyZWFtfSBmIGZ1bmN0aW9uIHRvIG1hcCBlYWNoIHZhbHVlIHRvIGEgc3RyZWFtXG4gKiBAcGFyYW0ge1N0cmVhbX0gc3RyZWFtXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIGNvbnRhaW5pbmcgYWxsIGV2ZW50cyBmcm9tIGVhY2ggc3RyZWFtIHJldHVybmVkIGJ5IGZcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbmNhdE1hcCAoZiwgc3RyZWFtKSB7XG4gIHJldHVybiBtZXJnZU1hcENvbmN1cnJlbnRseShmLCAxLCBzdHJlYW0pXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL2NvbmNhdE1hcC5qc1xuLy8gbW9kdWxlIGlkID0gNjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBTdHJlYW0gZnJvbSAnLi4vU3RyZWFtJ1xuaW1wb3J0IFBpcGUgZnJvbSAnLi4vc2luay9QaXBlJ1xuaW1wb3J0IEluZGV4U2luayBmcm9tICcuLi9zaW5rL0luZGV4U2luaydcbmltcG9ydCB7IGVtcHR5IH0gZnJvbSAnLi4vc291cmNlL2NvcmUnXG5pbXBvcnQgKiBhcyBkaXNwb3NlIGZyb20gJy4uL2Rpc3Bvc2FibGUvZGlzcG9zZSdcbmltcG9ydCAqIGFzIGJhc2UgZnJvbSAnQG1vc3QvcHJlbHVkZSdcblxudmFyIGNvcHkgPSBiYXNlLmNvcHlcbnZhciByZWR1Y2UgPSBiYXNlLnJlZHVjZVxuXG4vKipcbiAqIEByZXR1cm5zIHtTdHJlYW19IHN0cmVhbSBjb250YWluaW5nIGV2ZW50cyBmcm9tIGFsbCBzdHJlYW1zIGluIHRoZSBhcmd1bWVudFxuICogbGlzdCBpbiB0aW1lIG9yZGVyLiAgSWYgdHdvIGV2ZW50cyBhcmUgc2ltdWx0YW5lb3VzIHRoZXkgd2lsbCBiZSBtZXJnZWQgaW5cbiAqIGFyYml0cmFyeSBvcmRlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlICgvKiAuLi5zdHJlYW1zKi8pIHtcbiAgcmV0dXJuIG1lcmdlQXJyYXkoY29weShhcmd1bWVudHMpKVxufVxuXG4vKipcbiAqIEBwYXJhbSB7QXJyYXl9IHN0cmVhbXMgYXJyYXkgb2Ygc3RyZWFtIHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gY29udGFpbmluZyBldmVudHMgZnJvbSBhbGwgaW5wdXQgb2JzZXJ2YWJsZXNcbiAqIGluIHRpbWUgb3JkZXIuICBJZiB0d28gZXZlbnRzIGFyZSBzaW11bHRhbmVvdXMgdGhleSB3aWxsIGJlIG1lcmdlZCBpblxuICogYXJiaXRyYXJ5IG9yZGVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VBcnJheSAoc3RyZWFtcykge1xuICB2YXIgbCA9IHN0cmVhbXMubGVuZ3RoXG4gIHJldHVybiBsID09PSAwID8gZW1wdHkoKVxuICAgIDogbCA9PT0gMSA/IHN0cmVhbXNbMF1cbiAgICA6IG5ldyBTdHJlYW0obWVyZ2VTb3VyY2VzKHN0cmVhbXMpKVxufVxuXG4vKipcbiAqIFRoaXMgaW1wbGVtZW50cyBmdXNpb24vZmxhdHRlbmluZyBmb3IgbWVyZ2UuICBJdCB3aWxsXG4gKiBmdXNlIGFkamFjZW50IG1lcmdlIG9wZXJhdGlvbnMuICBGb3IgZXhhbXBsZTpcbiAqIC0gYS5tZXJnZShiKS5tZXJnZShjKSBlZmZlY3RpdmVseSBiZWNvbWVzIG1lcmdlKGEsIGIsIGMpXG4gKiAtIG1lcmdlKGEsIG1lcmdlKGIsIGMpKSBlZmZlY3RpdmVseSBiZWNvbWVzIG1lcmdlKGEsIGIsIGMpXG4gKiBJdCBkb2VzIHRoaXMgYnkgY29uY2F0ZW5hdGluZyB0aGUgc291cmNlcyBhcnJheXMgb2ZcbiAqIGFueSBuZXN0ZWQgTWVyZ2Ugc291cmNlcywgaW4gZWZmZWN0IFwiZmxhdHRlbmluZ1wiIG5lc3RlZFxuICogbWVyZ2Ugb3BlcmF0aW9ucyBpbnRvIGEgc2luZ2xlIG1lcmdlLlxuICovXG5mdW5jdGlvbiBtZXJnZVNvdXJjZXMgKHN0cmVhbXMpIHtcbiAgcmV0dXJuIG5ldyBNZXJnZShyZWR1Y2UoYXBwZW5kU291cmNlcywgW10sIHN0cmVhbXMpKVxufVxuXG5mdW5jdGlvbiBhcHBlbmRTb3VyY2VzIChzb3VyY2VzLCBzdHJlYW0pIHtcbiAgdmFyIHNvdXJjZSA9IHN0cmVhbS5zb3VyY2VcbiAgcmV0dXJuIHNvdXJjZSBpbnN0YW5jZW9mIE1lcmdlXG4gICAgPyBzb3VyY2VzLmNvbmNhdChzb3VyY2Uuc291cmNlcylcbiAgICA6IHNvdXJjZXMuY29uY2F0KHNvdXJjZSlcbn1cblxuZnVuY3Rpb24gTWVyZ2UgKHNvdXJjZXMpIHtcbiAgdGhpcy5zb3VyY2VzID0gc291cmNlc1xufVxuXG5NZXJnZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICB2YXIgbCA9IHRoaXMuc291cmNlcy5sZW5ndGhcbiAgdmFyIGRpc3Bvc2FibGVzID0gbmV3IEFycmF5KGwpXG4gIHZhciBzaW5rcyA9IG5ldyBBcnJheShsKVxuXG4gIHZhciBtZXJnZVNpbmsgPSBuZXcgTWVyZ2VTaW5rKGRpc3Bvc2FibGVzLCBzaW5rcywgc2luaylcblxuICBmb3IgKHZhciBpbmRleFNpbmssIGkgPSAwOyBpIDwgbDsgKytpKSB7XG4gICAgaW5kZXhTaW5rID0gc2lua3NbaV0gPSBuZXcgSW5kZXhTaW5rKGksIG1lcmdlU2luaylcbiAgICBkaXNwb3NhYmxlc1tpXSA9IHRoaXMuc291cmNlc1tpXS5ydW4oaW5kZXhTaW5rLCBzY2hlZHVsZXIpXG4gIH1cblxuICByZXR1cm4gZGlzcG9zZS5hbGwoZGlzcG9zYWJsZXMpXG59XG5cbmZ1bmN0aW9uIE1lcmdlU2luayAoZGlzcG9zYWJsZXMsIHNpbmtzLCBzaW5rKSB7XG4gIHRoaXMuc2luayA9IHNpbmtcbiAgdGhpcy5kaXNwb3NhYmxlcyA9IGRpc3Bvc2FibGVzXG4gIHRoaXMuYWN0aXZlQ291bnQgPSBzaW5rcy5sZW5ndGhcbn1cblxuTWVyZ2VTaW5rLnByb3RvdHlwZS5lcnJvciA9IFBpcGUucHJvdG90eXBlLmVycm9yXG5cbk1lcmdlU2luay5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgaW5kZXhWYWx1ZSkge1xuICB0aGlzLnNpbmsuZXZlbnQodCwgaW5kZXhWYWx1ZS52YWx1ZSlcbn1cblxuTWVyZ2VTaW5rLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAodCwgaW5kZXhlZFZhbHVlKSB7XG4gIGRpc3Bvc2UudHJ5RGlzcG9zZSh0LCB0aGlzLmRpc3Bvc2FibGVzW2luZGV4ZWRWYWx1ZS5pbmRleF0sIHRoaXMuc2luaylcbiAgaWYgKC0tdGhpcy5hY3RpdmVDb3VudCA9PT0gMCkge1xuICAgIHRoaXMuc2luay5lbmQodCwgaW5kZXhlZFZhbHVlLnZhbHVlKVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL21lcmdlLmpzXG4vLyBtb2R1bGUgaWQgPSA2OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFN0cmVhbSBmcm9tICcuLi9TdHJlYW0nXG5pbXBvcnQgUGlwZSBmcm9tICcuLi9zaW5rL1BpcGUnXG5pbXBvcnQgKiBhcyBkaXNwb3NlIGZyb20gJy4uL2Rpc3Bvc2FibGUvZGlzcG9zZSdcbmltcG9ydCAqIGFzIGJhc2UgZnJvbSAnQG1vc3QvcHJlbHVkZSdcbmltcG9ydCBpbnZva2UgZnJvbSAnLi4vaW52b2tlJ1xuXG4vKipcbiAqIFdoZW4gYW4gZXZlbnQgYXJyaXZlcyBvbiBzYW1wbGVyLCBlbWl0IHRoZSByZXN1bHQgb2YgY2FsbGluZyBmIHdpdGggdGhlIGxhdGVzdFxuICogdmFsdWVzIG9mIGFsbCBzdHJlYW1zIGJlaW5nIHNhbXBsZWRcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oLi4udmFsdWVzKToqfSBmIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggc2V0IG9mIHNhbXBsZWQgdmFsdWVzXG4gKiBAcGFyYW0ge1N0cmVhbX0gc2FtcGxlciBzdHJlYW1zIHdpbGwgYmUgc2FtcGxlZCB3aGVuZXZlciBhbiBldmVudCBhcnJpdmVzXG4gKiAgb24gc2FtcGxlclxuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIG9mIHNhbXBsZWQgYW5kIHRyYW5zZm9ybWVkIHZhbHVlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2FtcGxlIChmLCBzYW1wbGVyIC8qLCAuLi5zdHJlYW1zICovKSB7XG4gIHJldHVybiBzYW1wbGVBcnJheShmLCBzYW1wbGVyLCBiYXNlLmRyb3AoMiwgYXJndW1lbnRzKSlcbn1cblxuLyoqXG4gKiBXaGVuIGFuIGV2ZW50IGFycml2ZXMgb24gc2FtcGxlciwgZW1pdCB0aGUgbGF0ZXN0IGV2ZW50IHZhbHVlIGZyb20gc3RyZWFtLlxuICogQHBhcmFtIHtTdHJlYW19IHNhbXBsZXIgc3RyZWFtIG9mIGV2ZW50cyBhdCB3aG9zZSBhcnJpdmFsIHRpbWVcbiAqICBzdHJlYW0ncyBsYXRlc3QgdmFsdWUgd2lsbCBiZSBwcm9wYWdhdGVkXG4gKiBAcGFyYW0ge1N0cmVhbX0gc3RyZWFtIHN0cmVhbSBvZiB2YWx1ZXNcbiAqIEByZXR1cm5zIHtTdHJlYW19IHNhbXBsZWQgc3RyZWFtIG9mIHZhbHVlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2FtcGxlV2l0aCAoc2FtcGxlciwgc3RyZWFtKSB7XG4gIHJldHVybiBuZXcgU3RyZWFtKG5ldyBTYW1wbGVyKGJhc2UuaWQsIHNhbXBsZXIuc291cmNlLCBbc3RyZWFtLnNvdXJjZV0pKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2FtcGxlQXJyYXkgKGYsIHNhbXBsZXIsIHN0cmVhbXMpIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IFNhbXBsZXIoZiwgc2FtcGxlci5zb3VyY2UsIGJhc2UubWFwKGdldFNvdXJjZSwgc3RyZWFtcykpKVxufVxuXG5mdW5jdGlvbiBnZXRTb3VyY2UgKHN0cmVhbSkge1xuICByZXR1cm4gc3RyZWFtLnNvdXJjZVxufVxuXG5mdW5jdGlvbiBTYW1wbGVyIChmLCBzYW1wbGVyLCBzb3VyY2VzKSB7XG4gIHRoaXMuZiA9IGZcbiAgdGhpcy5zYW1wbGVyID0gc2FtcGxlclxuICB0aGlzLnNvdXJjZXMgPSBzb3VyY2VzXG59XG5cblNhbXBsZXIucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdmFyIGwgPSB0aGlzLnNvdXJjZXMubGVuZ3RoXG4gIHZhciBkaXNwb3NhYmxlcyA9IG5ldyBBcnJheShsICsgMSlcbiAgdmFyIHNpbmtzID0gbmV3IEFycmF5KGwpXG5cbiAgdmFyIHNhbXBsZVNpbmsgPSBuZXcgU2FtcGxlU2luayh0aGlzLmYsIHNpbmtzLCBzaW5rKVxuXG4gIGZvciAodmFyIGhvbGQsIGkgPSAwOyBpIDwgbDsgKytpKSB7XG4gICAgaG9sZCA9IHNpbmtzW2ldID0gbmV3IEhvbGQoc2FtcGxlU2luaylcbiAgICBkaXNwb3NhYmxlc1tpXSA9IHRoaXMuc291cmNlc1tpXS5ydW4oaG9sZCwgc2NoZWR1bGVyKVxuICB9XG5cbiAgZGlzcG9zYWJsZXNbaV0gPSB0aGlzLnNhbXBsZXIucnVuKHNhbXBsZVNpbmssIHNjaGVkdWxlcilcblxuICByZXR1cm4gZGlzcG9zZS5hbGwoZGlzcG9zYWJsZXMpXG59XG5cbmZ1bmN0aW9uIEhvbGQgKHNpbmspIHtcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLmhhc1ZhbHVlID0gZmFsc2Vcbn1cblxuSG9sZC5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgeCkge1xuICB0aGlzLnZhbHVlID0geFxuICB0aGlzLmhhc1ZhbHVlID0gdHJ1ZVxuICB0aGlzLnNpbmsuX25vdGlmeSh0aGlzKVxufVxuXG5Ib2xkLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAoKSB7fVxuSG9sZC5wcm90b3R5cGUuZXJyb3IgPSBQaXBlLnByb3RvdHlwZS5lcnJvclxuXG5mdW5jdGlvbiBTYW1wbGVTaW5rIChmLCBzaW5rcywgc2luaykge1xuICB0aGlzLmYgPSBmXG4gIHRoaXMuc2lua3MgPSBzaW5rc1xuICB0aGlzLnNpbmsgPSBzaW5rXG4gIHRoaXMuYWN0aXZlID0gZmFsc2Vcbn1cblxuU2FtcGxlU2luay5wcm90b3R5cGUuX25vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCF0aGlzLmFjdGl2ZSkge1xuICAgIHRoaXMuYWN0aXZlID0gdGhpcy5zaW5rcy5ldmVyeShoYXNWYWx1ZSlcbiAgfVxufVxuXG5TYW1wbGVTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0KSB7XG4gIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgIHRoaXMuc2luay5ldmVudCh0LCBpbnZva2UodGhpcy5mLCBiYXNlLm1hcChnZXRWYWx1ZSwgdGhpcy5zaW5rcykpKVxuICB9XG59XG5cblNhbXBsZVNpbmsucHJvdG90eXBlLmVuZCA9IFBpcGUucHJvdG90eXBlLmVuZFxuU2FtcGxlU2luay5wcm90b3R5cGUuZXJyb3IgPSBQaXBlLnByb3RvdHlwZS5lcnJvclxuXG5mdW5jdGlvbiBoYXNWYWx1ZSAoaG9sZCkge1xuICByZXR1cm4gaG9sZC5oYXNWYWx1ZVxufVxuXG5mdW5jdGlvbiBnZXRWYWx1ZSAoaG9sZCkge1xuICByZXR1cm4gaG9sZC52YWx1ZVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9zYW1wbGUuanNcbi8vIG1vZHVsZSBpZCA9IDY5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCAqIGFzIHRyYW5zZm9ybSBmcm9tICcuL3RyYW5zZm9ybSdcbmltcG9ydCAqIGFzIGNvcmUgZnJvbSAnLi4vc291cmNlL2NvcmUnXG5pbXBvcnQgUGlwZSBmcm9tICcuLi9zaW5rL1BpcGUnXG5pbXBvcnQgSW5kZXhTaW5rIGZyb20gJy4uL3NpbmsvSW5kZXhTaW5rJ1xuaW1wb3J0ICogYXMgZGlzcG9zZSBmcm9tICcuLi9kaXNwb3NhYmxlL2Rpc3Bvc2UnXG5pbXBvcnQgKiBhcyBiYXNlIGZyb20gJ0Btb3N0L3ByZWx1ZGUnXG5pbXBvcnQgaW52b2tlIGZyb20gJy4uL2ludm9rZSdcbmltcG9ydCBRdWV1ZSBmcm9tICcuLi9RdWV1ZSdcblxudmFyIG1hcCA9IGJhc2UubWFwXG52YXIgdGFpbCA9IGJhc2UudGFpbFxuXG4vKipcbiAqIENvbWJpbmUgc3RyZWFtcyBwYWlyd2lzZSAob3IgdHVwbGUtd2lzZSkgYnkgaW5kZXggYnkgYXBwbHlpbmcgZiB0byB2YWx1ZXNcbiAqIGF0IGNvcnJlc3BvbmRpbmcgaW5kaWNlcy4gIFRoZSByZXR1cm5lZCBzdHJlYW0gZW5kcyB3aGVuIGFueSBvZiB0aGUgaW5wdXRcbiAqIHN0cmVhbXMgZW5kcy5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGYgZnVuY3Rpb24gdG8gY29tYmluZSB2YWx1ZXNcbiAqIEByZXR1cm5zIHtTdHJlYW19IG5ldyBzdHJlYW0gd2l0aCBpdGVtcyBhdCBjb3JyZXNwb25kaW5nIGluZGljZXMgY29tYmluZWRcbiAqICB1c2luZyBmXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB6aXAgKGYgLyosIC4uLnN0cmVhbXMgKi8pIHtcbiAgcmV0dXJuIHppcEFycmF5KGYsIHRhaWwoYXJndW1lbnRzKSlcbn1cblxuLyoqXG4qIENvbWJpbmUgc3RyZWFtcyBwYWlyd2lzZSAob3IgdHVwbGUtd2lzZSkgYnkgaW5kZXggYnkgYXBwbHlpbmcgZiB0byB2YWx1ZXNcbiogYXQgY29ycmVzcG9uZGluZyBpbmRpY2VzLiAgVGhlIHJldHVybmVkIHN0cmVhbSBlbmRzIHdoZW4gYW55IG9mIHRoZSBpbnB1dFxuKiBzdHJlYW1zIGVuZHMuXG4qIEBwYXJhbSB7ZnVuY3Rpb259IGYgZnVuY3Rpb24gdG8gY29tYmluZSB2YWx1ZXNcbiogQHBhcmFtIHtbU3RyZWFtXX0gc3RyZWFtcyBzdHJlYW1zIHRvIHppcCB1c2luZyBmXG4qIEByZXR1cm5zIHtTdHJlYW19IG5ldyBzdHJlYW0gd2l0aCBpdGVtcyBhdCBjb3JyZXNwb25kaW5nIGluZGljZXMgY29tYmluZWRcbiogIHVzaW5nIGZcbiovXG5leHBvcnQgZnVuY3Rpb24gemlwQXJyYXkgKGYsIHN0cmVhbXMpIHtcbiAgcmV0dXJuIHN0cmVhbXMubGVuZ3RoID09PSAwID8gY29yZS5lbXB0eSgpXG46IHN0cmVhbXMubGVuZ3RoID09PSAxID8gdHJhbnNmb3JtLm1hcChmLCBzdHJlYW1zWzBdKVxuOiBuZXcgU3RyZWFtKG5ldyBaaXAoZiwgbWFwKGdldFNvdXJjZSwgc3RyZWFtcykpKVxufVxuXG5mdW5jdGlvbiBnZXRTb3VyY2UgKHN0cmVhbSkge1xuICByZXR1cm4gc3RyZWFtLnNvdXJjZVxufVxuXG5mdW5jdGlvbiBaaXAgKGYsIHNvdXJjZXMpIHtcbiAgdGhpcy5mID0gZlxuICB0aGlzLnNvdXJjZXMgPSBzb3VyY2VzXG59XG5cblppcC5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICB2YXIgbCA9IHRoaXMuc291cmNlcy5sZW5ndGhcbiAgdmFyIGRpc3Bvc2FibGVzID0gbmV3IEFycmF5KGwpXG4gIHZhciBzaW5rcyA9IG5ldyBBcnJheShsKVxuICB2YXIgYnVmZmVycyA9IG5ldyBBcnJheShsKVxuXG4gIHZhciB6aXBTaW5rID0gbmV3IFppcFNpbmsodGhpcy5mLCBidWZmZXJzLCBzaW5rcywgc2luaylcblxuICBmb3IgKHZhciBpbmRleFNpbmssIGkgPSAwOyBpIDwgbDsgKytpKSB7XG4gICAgYnVmZmVyc1tpXSA9IG5ldyBRdWV1ZSgpXG4gICAgaW5kZXhTaW5rID0gc2lua3NbaV0gPSBuZXcgSW5kZXhTaW5rKGksIHppcFNpbmspXG4gICAgZGlzcG9zYWJsZXNbaV0gPSB0aGlzLnNvdXJjZXNbaV0ucnVuKGluZGV4U2luaywgc2NoZWR1bGVyKVxuICB9XG5cbiAgcmV0dXJuIGRpc3Bvc2UuYWxsKGRpc3Bvc2FibGVzKVxufVxuXG5mdW5jdGlvbiBaaXBTaW5rIChmLCBidWZmZXJzLCBzaW5rcywgc2luaykge1xuICB0aGlzLmYgPSBmXG4gIHRoaXMuc2lua3MgPSBzaW5rc1xuICB0aGlzLnNpbmsgPSBzaW5rXG4gIHRoaXMuYnVmZmVycyA9IGJ1ZmZlcnNcbn1cblxuWmlwU2luay5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgaW5kZXhlZFZhbHVlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY29tcGxleGl0eVxuICB2YXIgYnVmZmVycyA9IHRoaXMuYnVmZmVyc1xuICB2YXIgYnVmZmVyID0gYnVmZmVyc1tpbmRleGVkVmFsdWUuaW5kZXhdXG5cbiAgYnVmZmVyLnB1c2goaW5kZXhlZFZhbHVlLnZhbHVlKVxuXG4gIGlmIChidWZmZXIubGVuZ3RoKCkgPT09IDEpIHtcbiAgICBpZiAoIXJlYWR5KHRoaXMuYnVmZmVycykpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGVtaXRaaXBwZWQodGhpcy5mLCB0LCBidWZmZXJzLCB0aGlzLnNpbmspXG5cbiAgICBpZiAoZW5kZWQodGhpcy5idWZmZXJzLCB0aGlzLnNpbmtzKSkge1xuICAgICAgdGhpcy5zaW5rLmVuZCh0LCB2b2lkIDApXG4gICAgfVxuICB9XG59XG5cblppcFNpbmsucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uICh0LCBpbmRleGVkVmFsdWUpIHtcbiAgdmFyIGJ1ZmZlciA9IHRoaXMuYnVmZmVyc1tpbmRleGVkVmFsdWUuaW5kZXhdXG4gIGlmIChidWZmZXIuaXNFbXB0eSgpKSB7XG4gICAgdGhpcy5zaW5rLmVuZCh0LCBpbmRleGVkVmFsdWUudmFsdWUpXG4gIH1cbn1cblxuWmlwU2luay5wcm90b3R5cGUuZXJyb3IgPSBQaXBlLnByb3RvdHlwZS5lcnJvclxuXG5mdW5jdGlvbiBlbWl0WmlwcGVkIChmLCB0LCBidWZmZXJzLCBzaW5rKSB7XG4gIHNpbmsuZXZlbnQodCwgaW52b2tlKGYsIG1hcChoZWFkLCBidWZmZXJzKSkpXG59XG5cbmZ1bmN0aW9uIGhlYWQgKGJ1ZmZlcikge1xuICByZXR1cm4gYnVmZmVyLnNoaWZ0KClcbn1cblxuZnVuY3Rpb24gZW5kZWQgKGJ1ZmZlcnMsIHNpbmtzKSB7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gYnVmZmVycy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBpZiAoYnVmZmVyc1tpXS5pc0VtcHR5KCkgJiYgIXNpbmtzW2ldLmFjdGl2ZSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmZ1bmN0aW9uIHJlYWR5IChidWZmZXJzKSB7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gYnVmZmVycy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBpZiAoYnVmZmVyc1tpXS5pc0VtcHR5KCkpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci96aXAuanNcbi8vIG1vZHVsZSBpZCA9IDcwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG4vLyBCYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vcGV0a2FhbnRvbm92L2RlcXVlXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFF1ZXVlIChjYXBQb3cyKSB7XG4gIHRoaXMuX2NhcGFjaXR5ID0gY2FwUG93MiB8fCAzMlxuICB0aGlzLl9sZW5ndGggPSAwXG4gIHRoaXMuX2hlYWQgPSAwXG59XG5cblF1ZXVlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKHgpIHtcbiAgdmFyIGxlbiA9IHRoaXMuX2xlbmd0aFxuICB0aGlzLl9jaGVja0NhcGFjaXR5KGxlbiArIDEpXG5cbiAgdmFyIGkgPSAodGhpcy5faGVhZCArIGxlbikgJiAodGhpcy5fY2FwYWNpdHkgLSAxKVxuICB0aGlzW2ldID0geFxuICB0aGlzLl9sZW5ndGggPSBsZW4gKyAxXG59XG5cblF1ZXVlLnByb3RvdHlwZS5zaGlmdCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhlYWQgPSB0aGlzLl9oZWFkXG4gIHZhciB4ID0gdGhpc1toZWFkXVxuXG4gIHRoaXNbaGVhZF0gPSB2b2lkIDBcbiAgdGhpcy5faGVhZCA9IChoZWFkICsgMSkgJiAodGhpcy5fY2FwYWNpdHkgLSAxKVxuICB0aGlzLl9sZW5ndGgtLVxuICByZXR1cm4geFxufVxuXG5RdWV1ZS5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuX2xlbmd0aCA9PT0gMFxufVxuXG5RdWV1ZS5wcm90b3R5cGUubGVuZ3RoID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5fbGVuZ3RoXG59XG5cblF1ZXVlLnByb3RvdHlwZS5fY2hlY2tDYXBhY2l0eSA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIGlmICh0aGlzLl9jYXBhY2l0eSA8IHNpemUpIHtcbiAgICB0aGlzLl9lbnN1cmVDYXBhY2l0eSh0aGlzLl9jYXBhY2l0eSA8PCAxKVxuICB9XG59XG5cblF1ZXVlLnByb3RvdHlwZS5fZW5zdXJlQ2FwYWNpdHkgPSBmdW5jdGlvbiAoY2FwYWNpdHkpIHtcbiAgdmFyIG9sZENhcGFjaXR5ID0gdGhpcy5fY2FwYWNpdHlcbiAgdGhpcy5fY2FwYWNpdHkgPSBjYXBhY2l0eVxuXG4gIHZhciBsYXN0ID0gdGhpcy5faGVhZCArIHRoaXMuX2xlbmd0aFxuXG4gIGlmIChsYXN0ID4gb2xkQ2FwYWNpdHkpIHtcbiAgICBjb3B5KHRoaXMsIDAsIHRoaXMsIG9sZENhcGFjaXR5LCBsYXN0ICYgKG9sZENhcGFjaXR5IC0gMSkpXG4gIH1cbn1cblxuZnVuY3Rpb24gY29weSAoc3JjLCBzcmNJbmRleCwgZHN0LCBkc3RJbmRleCwgbGVuKSB7XG4gIGZvciAodmFyIGogPSAwOyBqIDwgbGVuOyArK2opIHtcbiAgICBkc3RbaiArIGRzdEluZGV4XSA9IHNyY1tqICsgc3JjSW5kZXhdXG4gICAgc3JjW2ogKyBzcmNJbmRleF0gPSB2b2lkIDBcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvUXVldWUuanNcbi8vIG1vZHVsZSBpZCA9IDcxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCAqIGFzIGRpc3Bvc2UgZnJvbSAnLi4vZGlzcG9zYWJsZS9kaXNwb3NlJ1xuXG4vKipcbiAqIEdpdmVuIGEgc3RyZWFtIG9mIHN0cmVhbXMsIHJldHVybiBhIG5ldyBzdHJlYW0gdGhhdCBhZG9wdHMgdGhlIGJlaGF2aW9yXG4gKiBvZiB0aGUgbW9zdCByZWNlbnQgaW5uZXIgc3RyZWFtLlxuICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbSBvZiBzdHJlYW1zIG9uIHdoaWNoIHRvIHN3aXRjaFxuICogQHJldHVybnMge1N0cmVhbX0gc3dpdGNoaW5nIHN0cmVhbVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3dpdGNoTGF0ZXN0IChzdHJlYW0pIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IFN3aXRjaChzdHJlYW0uc291cmNlKSlcbn1cblxuZXhwb3J0IHsgc3dpdGNoTGF0ZXN0IGFzIHN3aXRjaCB9XG5cbmZ1bmN0aW9uIFN3aXRjaCAoc291cmNlKSB7XG4gIHRoaXMuc291cmNlID0gc291cmNlXG59XG5cblN3aXRjaC5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICB2YXIgc3dpdGNoU2luayA9IG5ldyBTd2l0Y2hTaW5rKHNpbmssIHNjaGVkdWxlcilcbiAgcmV0dXJuIGRpc3Bvc2UuYWxsKFtzd2l0Y2hTaW5rLCB0aGlzLnNvdXJjZS5ydW4oc3dpdGNoU2luaywgc2NoZWR1bGVyKV0pXG59XG5cbmZ1bmN0aW9uIFN3aXRjaFNpbmsgKHNpbmssIHNjaGVkdWxlcikge1xuICB0aGlzLnNpbmsgPSBzaW5rXG4gIHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyXG4gIHRoaXMuY3VycmVudCA9IG51bGxcbiAgdGhpcy5lbmRlZCA9IGZhbHNlXG59XG5cblN3aXRjaFNpbmsucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHN0cmVhbSkge1xuICB0aGlzLl9kaXNwb3NlQ3VycmVudCh0KSAvLyBUT0RPOiBjYXB0dXJlIHRoZSByZXN1bHQgb2YgdGhpcyBkaXNwb3NlXG4gIHRoaXMuY3VycmVudCA9IG5ldyBTZWdtZW50KHQsIEluZmluaXR5LCB0aGlzLCB0aGlzLnNpbmspXG4gIHRoaXMuY3VycmVudC5kaXNwb3NhYmxlID0gc3RyZWFtLnNvdXJjZS5ydW4odGhpcy5jdXJyZW50LCB0aGlzLnNjaGVkdWxlcilcbn1cblxuU3dpdGNoU2luay5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgdGhpcy5lbmRlZCA9IHRydWVcbiAgdGhpcy5fY2hlY2tFbmQodCwgeClcbn1cblxuU3dpdGNoU2luay5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAodCwgZSkge1xuICB0aGlzLmVuZGVkID0gdHJ1ZVxuICB0aGlzLnNpbmsuZXJyb3IodCwgZSlcbn1cblxuU3dpdGNoU2luay5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuX2Rpc3Bvc2VDdXJyZW50KHRoaXMuc2NoZWR1bGVyLm5vdygpKVxufVxuXG5Td2l0Y2hTaW5rLnByb3RvdHlwZS5fZGlzcG9zZUN1cnJlbnQgPSBmdW5jdGlvbiAodCkge1xuICBpZiAodGhpcy5jdXJyZW50ICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudC5fZGlzcG9zZSh0KVxuICB9XG59XG5cblN3aXRjaFNpbmsucHJvdG90eXBlLl9kaXNwb3NlSW5uZXIgPSBmdW5jdGlvbiAodCwgaW5uZXIpIHtcbiAgaW5uZXIuX2Rpc3Bvc2UodCkgLy8gVE9ETzogY2FwdHVyZSB0aGUgcmVzdWx0IG9mIHRoaXMgZGlzcG9zZVxuICBpZiAoaW5uZXIgPT09IHRoaXMuY3VycmVudCkge1xuICAgIHRoaXMuY3VycmVudCA9IG51bGxcbiAgfVxufVxuXG5Td2l0Y2hTaW5rLnByb3RvdHlwZS5fY2hlY2tFbmQgPSBmdW5jdGlvbiAodCwgeCkge1xuICBpZiAodGhpcy5lbmRlZCAmJiB0aGlzLmN1cnJlbnQgPT09IG51bGwpIHtcbiAgICB0aGlzLnNpbmsuZW5kKHQsIHgpXG4gIH1cbn1cblxuU3dpdGNoU2luay5wcm90b3R5cGUuX2VuZElubmVyID0gZnVuY3Rpb24gKHQsIHgsIGlubmVyKSB7XG4gIHRoaXMuX2Rpc3Bvc2VJbm5lcih0LCBpbm5lcilcbiAgdGhpcy5fY2hlY2tFbmQodCwgeClcbn1cblxuU3dpdGNoU2luay5wcm90b3R5cGUuX2Vycm9ySW5uZXIgPSBmdW5jdGlvbiAodCwgZSwgaW5uZXIpIHtcbiAgdGhpcy5fZGlzcG9zZUlubmVyKHQsIGlubmVyKVxuICB0aGlzLnNpbmsuZXJyb3IodCwgZSlcbn1cblxuZnVuY3Rpb24gU2VnbWVudCAobWluLCBtYXgsIG91dGVyLCBzaW5rKSB7XG4gIHRoaXMubWluID0gbWluXG4gIHRoaXMubWF4ID0gbWF4XG4gIHRoaXMub3V0ZXIgPSBvdXRlclxuICB0aGlzLnNpbmsgPSBzaW5rXG4gIHRoaXMuZGlzcG9zYWJsZSA9IGRpc3Bvc2UuZW1wdHkoKVxufVxuXG5TZWdtZW50LnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIGlmICh0IDwgdGhpcy5tYXgpIHtcbiAgICB0aGlzLnNpbmsuZXZlbnQoTWF0aC5tYXgodCwgdGhpcy5taW4pLCB4KVxuICB9XG59XG5cblNlZ21lbnQucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHRoaXMub3V0ZXIuX2VuZElubmVyKE1hdGgubWF4KHQsIHRoaXMubWluKSwgeCwgdGhpcylcbn1cblxuU2VnbWVudC5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAodCwgZSkge1xuICB0aGlzLm91dGVyLl9lcnJvcklubmVyKE1hdGgubWF4KHQsIHRoaXMubWluKSwgZSwgdGhpcylcbn1cblxuU2VnbWVudC5wcm90b3R5cGUuX2Rpc3Bvc2UgPSBmdW5jdGlvbiAodCkge1xuICB0aGlzLm1heCA9IHRcbiAgZGlzcG9zZS50cnlEaXNwb3NlKHQsIHRoaXMuZGlzcG9zYWJsZSwgdGhpcy5zaW5rKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9zd2l0Y2guanNcbi8vIG1vZHVsZSBpZCA9IDcyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCBQaXBlIGZyb20gJy4uL3NpbmsvUGlwZSdcbmltcG9ydCBGaWx0ZXIgZnJvbSAnLi4vZnVzaW9uL0ZpbHRlcidcblxuLyoqXG4gKiBSZXRhaW4gb25seSBpdGVtcyBtYXRjaGluZyBhIHByZWRpY2F0ZVxuICogQHBhcmFtIHtmdW5jdGlvbih4OiopOmJvb2xlYW59IHAgZmlsdGVyaW5nIHByZWRpY2F0ZSBjYWxsZWQgZm9yIGVhY2ggaXRlbVxuICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbSBzdHJlYW0gdG8gZmlsdGVyXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gY29udGFpbmluZyBvbmx5IGl0ZW1zIGZvciB3aGljaCBwcmVkaWNhdGUgcmV0dXJucyB0cnV0aHlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlciAocCwgc3RyZWFtKSB7XG4gIHJldHVybiBuZXcgU3RyZWFtKEZpbHRlci5jcmVhdGUocCwgc3RyZWFtLnNvdXJjZSkpXG59XG5cbi8qKlxuICogU2tpcCByZXBlYXRlZCBldmVudHMsIHVzaW5nID09PSB0byBkZXRlY3QgZHVwbGljYXRlc1xuICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbSBzdHJlYW0gZnJvbSB3aGljaCB0byBvbWl0IHJlcGVhdGVkIGV2ZW50c1xuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIHdpdGhvdXQgcmVwZWF0ZWQgZXZlbnRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBza2lwUmVwZWF0cyAoc3RyZWFtKSB7XG4gIHJldHVybiBza2lwUmVwZWF0c1dpdGgoc2FtZSwgc3RyZWFtKVxufVxuXG4vKipcbiAqIFNraXAgcmVwZWF0ZWQgZXZlbnRzIHVzaW5nIHRoZSBwcm92aWRlZCBlcXVhbHMgZnVuY3Rpb24gdG8gZGV0ZWN0IGR1cGxpY2F0ZXNcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oYToqLCBiOiopOmJvb2xlYW59IGVxdWFscyBvcHRpb25hbCBmdW5jdGlvbiB0byBjb21wYXJlIGl0ZW1zXG4gKiBAcGFyYW0ge1N0cmVhbX0gc3RyZWFtIHN0cmVhbSBmcm9tIHdoaWNoIHRvIG9taXQgcmVwZWF0ZWQgZXZlbnRzXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gd2l0aG91dCByZXBlYXRlZCBldmVudHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNraXBSZXBlYXRzV2l0aCAoZXF1YWxzLCBzdHJlYW0pIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IFNraXBSZXBlYXRzKGVxdWFscywgc3RyZWFtLnNvdXJjZSkpXG59XG5cbmZ1bmN0aW9uIFNraXBSZXBlYXRzIChlcXVhbHMsIHNvdXJjZSkge1xuICB0aGlzLmVxdWFscyA9IGVxdWFsc1xuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxufVxuXG5Ta2lwUmVwZWF0cy5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gdGhpcy5zb3VyY2UucnVuKG5ldyBTa2lwUmVwZWF0c1NpbmsodGhpcy5lcXVhbHMsIHNpbmspLCBzY2hlZHVsZXIpXG59XG5cbmZ1bmN0aW9uIFNraXBSZXBlYXRzU2luayAoZXF1YWxzLCBzaW5rKSB7XG4gIHRoaXMuZXF1YWxzID0gZXF1YWxzXG4gIHRoaXMuc2luayA9IHNpbmtcbiAgdGhpcy52YWx1ZSA9IHZvaWQgMFxuICB0aGlzLmluaXQgPSB0cnVlXG59XG5cblNraXBSZXBlYXRzU2luay5wcm90b3R5cGUuZW5kID0gUGlwZS5wcm90b3R5cGUuZW5kXG5Ta2lwUmVwZWF0c1NpbmsucHJvdG90eXBlLmVycm9yID0gUGlwZS5wcm90b3R5cGUuZXJyb3JcblxuU2tpcFJlcGVhdHNTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIGlmICh0aGlzLmluaXQpIHtcbiAgICB0aGlzLmluaXQgPSBmYWxzZVxuICAgIHRoaXMudmFsdWUgPSB4XG4gICAgdGhpcy5zaW5rLmV2ZW50KHQsIHgpXG4gIH0gZWxzZSBpZiAoIXRoaXMuZXF1YWxzKHRoaXMudmFsdWUsIHgpKSB7XG4gICAgdGhpcy52YWx1ZSA9IHhcbiAgICB0aGlzLnNpbmsuZXZlbnQodCwgeClcbiAgfVxufVxuXG5mdW5jdGlvbiBzYW1lIChhLCBiKSB7XG4gIHJldHVybiBhID09PSBiXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL2ZpbHRlci5qc1xuLy8gbW9kdWxlIGlkID0gNzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBTdHJlYW0gZnJvbSAnLi4vU3RyZWFtJ1xuaW1wb3J0IFBpcGUgZnJvbSAnLi4vc2luay9QaXBlJ1xuaW1wb3J0ICogYXMgY29yZSBmcm9tICcuLi9zb3VyY2UvY29yZSdcbmltcG9ydCAqIGFzIGRpc3Bvc2UgZnJvbSAnLi4vZGlzcG9zYWJsZS9kaXNwb3NlJ1xuaW1wb3J0IE1hcCBmcm9tICcuLi9mdXNpb24vTWFwJ1xuXG4vKipcbiAqIEBwYXJhbSB7bnVtYmVyfSBuXG4gKiBAcGFyYW0ge1N0cmVhbX0gc3RyZWFtXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIGNvbnRhaW5pbmcgb25seSB1cCB0byB0aGUgZmlyc3QgbiBpdGVtcyBmcm9tIHN0cmVhbVxuICovXG5leHBvcnQgZnVuY3Rpb24gdGFrZSAobiwgc3RyZWFtKSB7XG4gIHJldHVybiBzbGljZSgwLCBuLCBzdHJlYW0pXG59XG5cbi8qKlxuICogQHBhcmFtIHtudW1iZXJ9IG5cbiAqIEBwYXJhbSB7U3RyZWFtfSBzdHJlYW1cbiAqIEByZXR1cm5zIHtTdHJlYW19IG5ldyBzdHJlYW0gd2l0aCB0aGUgZmlyc3QgbiBpdGVtcyByZW1vdmVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBza2lwIChuLCBzdHJlYW0pIHtcbiAgcmV0dXJuIHNsaWNlKG4sIEluZmluaXR5LCBzdHJlYW0pXG59XG5cbi8qKlxuICogU2xpY2UgYSBzdHJlYW0gYnkgaW5kZXguIE5lZ2F0aXZlIHN0YXJ0L2VuZCBpbmRleGVzIGFyZSBub3Qgc3VwcG9ydGVkXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnRcbiAqIEBwYXJhbSB7bnVtYmVyfSBlbmRcbiAqIEBwYXJhbSB7U3RyZWFtfSBzdHJlYW1cbiAqIEByZXR1cm5zIHtTdHJlYW19IHN0cmVhbSBjb250YWluaW5nIGl0ZW1zIHdoZXJlIHN0YXJ0IDw9IGluZGV4IDwgZW5kXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzbGljZSAoc3RhcnQsIGVuZCwgc3RyZWFtKSB7XG4gIHJldHVybiBlbmQgPD0gc3RhcnQgPyBjb3JlLmVtcHR5KClcbiAgICA6IG5ldyBTdHJlYW0oc2xpY2VTb3VyY2Uoc3RhcnQsIGVuZCwgc3RyZWFtLnNvdXJjZSkpXG59XG5cbmZ1bmN0aW9uIHNsaWNlU291cmNlIChzdGFydCwgZW5kLCBzb3VyY2UpIHtcbiAgcmV0dXJuIHNvdXJjZSBpbnN0YW5jZW9mIE1hcCA/IGNvbW11dGVNYXBTbGljZShzdGFydCwgZW5kLCBzb3VyY2UpXG4gICAgOiBzb3VyY2UgaW5zdGFuY2VvZiBTbGljZSA/IGZ1c2VTbGljZShzdGFydCwgZW5kLCBzb3VyY2UpXG4gICAgOiBuZXcgU2xpY2Uoc3RhcnQsIGVuZCwgc291cmNlKVxufVxuXG5mdW5jdGlvbiBjb21tdXRlTWFwU2xpY2UgKHN0YXJ0LCBlbmQsIHNvdXJjZSkge1xuICByZXR1cm4gTWFwLmNyZWF0ZShzb3VyY2UuZiwgc2xpY2VTb3VyY2Uoc3RhcnQsIGVuZCwgc291cmNlLnNvdXJjZSkpXG59XG5cbmZ1bmN0aW9uIGZ1c2VTbGljZSAoc3RhcnQsIGVuZCwgc291cmNlKSB7XG4gIHN0YXJ0ICs9IHNvdXJjZS5taW5cbiAgZW5kID0gTWF0aC5taW4oZW5kICsgc291cmNlLm1pbiwgc291cmNlLm1heClcbiAgcmV0dXJuIG5ldyBTbGljZShzdGFydCwgZW5kLCBzb3VyY2Uuc291cmNlKVxufVxuXG5mdW5jdGlvbiBTbGljZSAobWluLCBtYXgsIHNvdXJjZSkge1xuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxuICB0aGlzLm1pbiA9IG1pblxuICB0aGlzLm1heCA9IG1heFxufVxuXG5TbGljZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICB2YXIgZGlzcG9zYWJsZSA9IGRpc3Bvc2Uuc2V0dGFibGUoKVxuICB2YXIgc2xpY2VTaW5rID0gbmV3IFNsaWNlU2luayh0aGlzLm1pbiwgdGhpcy5tYXggLSB0aGlzLm1pbiwgc2luaywgZGlzcG9zYWJsZSlcblxuICBkaXNwb3NhYmxlLnNldERpc3Bvc2FibGUodGhpcy5zb3VyY2UucnVuKHNsaWNlU2luaywgc2NoZWR1bGVyKSlcbiAgcmV0dXJuIGRpc3Bvc2FibGVcbn1cblxuZnVuY3Rpb24gU2xpY2VTaW5rIChza2lwLCB0YWtlLCBzaW5rLCBkaXNwb3NhYmxlKSB7XG4gIHRoaXMuc2luayA9IHNpbmtcbiAgdGhpcy5za2lwID0gc2tpcFxuICB0aGlzLnRha2UgPSB0YWtlXG4gIHRoaXMuZGlzcG9zYWJsZSA9IGRpc3Bvc2FibGVcbn1cblxuU2xpY2VTaW5rLnByb3RvdHlwZS5lbmQgPSBQaXBlLnByb3RvdHlwZS5lbmRcblNsaWNlU2luay5wcm90b3R5cGUuZXJyb3IgPSBQaXBlLnByb3RvdHlwZS5lcnJvclxuXG5TbGljZVNpbmsucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgLyogZXNsaW50IGNvbXBsZXhpdHk6IFsxLCA0XSAqL1xuICBpZiAodGhpcy5za2lwID4gMCkge1xuICAgIHRoaXMuc2tpcCAtPSAxXG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAodGhpcy50YWtlID09PSAwKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB0aGlzLnRha2UgLT0gMVxuICB0aGlzLnNpbmsuZXZlbnQodCwgeClcbiAgaWYgKHRoaXMudGFrZSA9PT0gMCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZS5kaXNwb3NlKClcbiAgICB0aGlzLnNpbmsuZW5kKHQsIHgpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRha2VXaGlsZSAocCwgc3RyZWFtKSB7XG4gIHJldHVybiBuZXcgU3RyZWFtKG5ldyBUYWtlV2hpbGUocCwgc3RyZWFtLnNvdXJjZSkpXG59XG5cbmZ1bmN0aW9uIFRha2VXaGlsZSAocCwgc291cmNlKSB7XG4gIHRoaXMucCA9IHBcbiAgdGhpcy5zb3VyY2UgPSBzb3VyY2Vcbn1cblxuVGFrZVdoaWxlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHZhciBkaXNwb3NhYmxlID0gZGlzcG9zZS5zZXR0YWJsZSgpXG4gIHZhciB0YWtlV2hpbGVTaW5rID0gbmV3IFRha2VXaGlsZVNpbmsodGhpcy5wLCBzaW5rLCBkaXNwb3NhYmxlKVxuXG4gIGRpc3Bvc2FibGUuc2V0RGlzcG9zYWJsZSh0aGlzLnNvdXJjZS5ydW4odGFrZVdoaWxlU2luaywgc2NoZWR1bGVyKSlcbiAgcmV0dXJuIGRpc3Bvc2FibGVcbn1cblxuZnVuY3Rpb24gVGFrZVdoaWxlU2luayAocCwgc2luaywgZGlzcG9zYWJsZSkge1xuICB0aGlzLnAgPSBwXG4gIHRoaXMuc2luayA9IHNpbmtcbiAgdGhpcy5hY3RpdmUgPSB0cnVlXG4gIHRoaXMuZGlzcG9zYWJsZSA9IGRpc3Bvc2FibGVcbn1cblxuVGFrZVdoaWxlU2luay5wcm90b3R5cGUuZW5kID0gUGlwZS5wcm90b3R5cGUuZW5kXG5UYWtlV2hpbGVTaW5rLnByb3RvdHlwZS5lcnJvciA9IFBpcGUucHJvdG90eXBlLmVycm9yXG5cblRha2VXaGlsZVNpbmsucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgaWYgKCF0aGlzLmFjdGl2ZSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIHAgPSB0aGlzLnBcbiAgdGhpcy5hY3RpdmUgPSBwKHgpXG4gIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgIHRoaXMuc2luay5ldmVudCh0LCB4KVxuICB9IGVsc2Uge1xuICAgIHRoaXMuZGlzcG9zYWJsZS5kaXNwb3NlKClcbiAgICB0aGlzLnNpbmsuZW5kKHQsIHgpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNraXBXaGlsZSAocCwgc3RyZWFtKSB7XG4gIHJldHVybiBuZXcgU3RyZWFtKG5ldyBTa2lwV2hpbGUocCwgc3RyZWFtLnNvdXJjZSkpXG59XG5cbmZ1bmN0aW9uIFNraXBXaGlsZSAocCwgc291cmNlKSB7XG4gIHRoaXMucCA9IHBcbiAgdGhpcy5zb3VyY2UgPSBzb3VyY2Vcbn1cblxuU2tpcFdoaWxlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHJldHVybiB0aGlzLnNvdXJjZS5ydW4obmV3IFNraXBXaGlsZVNpbmsodGhpcy5wLCBzaW5rKSwgc2NoZWR1bGVyKVxufVxuXG5mdW5jdGlvbiBTa2lwV2hpbGVTaW5rIChwLCBzaW5rKSB7XG4gIHRoaXMucCA9IHBcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLnNraXBwaW5nID0gdHJ1ZVxufVxuXG5Ta2lwV2hpbGVTaW5rLnByb3RvdHlwZS5lbmQgPSBQaXBlLnByb3RvdHlwZS5lbmRcblNraXBXaGlsZVNpbmsucHJvdG90eXBlLmVycm9yID0gUGlwZS5wcm90b3R5cGUuZXJyb3JcblxuU2tpcFdoaWxlU2luay5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgeCkge1xuICBpZiAodGhpcy5za2lwcGluZykge1xuICAgIHZhciBwID0gdGhpcy5wXG4gICAgdGhpcy5za2lwcGluZyA9IHAoeClcbiAgICBpZiAodGhpcy5za2lwcGluZykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICB9XG5cbiAgdGhpcy5zaW5rLmV2ZW50KHQsIHgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBza2lwQWZ0ZXIgKHAsIHN0cmVhbSkge1xuICByZXR1cm4gbmV3IFN0cmVhbShuZXcgU2tpcEFmdGVyKHAsIHN0cmVhbS5zb3VyY2UpKVxufVxuXG5mdW5jdGlvbiBTa2lwQWZ0ZXIgKHAsIHNvdXJjZSkge1xuICB0aGlzLnAgPSBwXG4gIHRoaXMuc291cmNlID0gc291cmNlXG59XG5cblNraXBBZnRlci5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gcnVuIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgcmV0dXJuIHRoaXMuc291cmNlLnJ1bihuZXcgU2tpcEFmdGVyU2luayh0aGlzLnAsIHNpbmspLCBzY2hlZHVsZXIpXG59XG5cbmZ1bmN0aW9uIFNraXBBZnRlclNpbmsgKHAsIHNpbmspIHtcbiAgdGhpcy5wID0gcFxuICB0aGlzLnNpbmsgPSBzaW5rXG4gIHRoaXMuc2tpcHBpbmcgPSBmYWxzZVxufVxuXG5Ta2lwQWZ0ZXJTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uIGV2ZW50ICh0LCB4KSB7XG4gIGlmICh0aGlzLnNraXBwaW5nKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgcCA9IHRoaXMucFxuICB0aGlzLnNraXBwaW5nID0gcCh4KVxuICB0aGlzLnNpbmsuZXZlbnQodCwgeClcblxuICBpZiAodGhpcy5za2lwcGluZykge1xuICAgIHRoaXMuc2luay5lbmQodCwgeClcbiAgfVxufVxuXG5Ta2lwQWZ0ZXJTaW5rLnByb3RvdHlwZS5lbmQgPSBQaXBlLnByb3RvdHlwZS5lbmRcblNraXBBZnRlclNpbmsucHJvdG90eXBlLmVycm9yID0gUGlwZS5wcm90b3R5cGUuZXJyb3JcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3Ivc2xpY2UuanNcbi8vIG1vZHVsZSBpZCA9IDc0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCBQaXBlIGZyb20gJy4uL3NpbmsvUGlwZSdcbmltcG9ydCAqIGFzIGRpc3Bvc2UgZnJvbSAnLi4vZGlzcG9zYWJsZS9kaXNwb3NlJ1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJy4uL2NvbWJpbmF0b3IvZmxhdE1hcCdcblxuZXhwb3J0IGZ1bmN0aW9uIHRha2VVbnRpbCAoc2lnbmFsLCBzdHJlYW0pIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IFVudGlsKHNpZ25hbC5zb3VyY2UsIHN0cmVhbS5zb3VyY2UpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2tpcFVudGlsIChzaWduYWwsIHN0cmVhbSkge1xuICByZXR1cm4gbmV3IFN0cmVhbShuZXcgU2luY2Uoc2lnbmFsLnNvdXJjZSwgc3RyZWFtLnNvdXJjZSkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkdXJpbmcgKHRpbWVXaW5kb3csIHN0cmVhbSkge1xuICByZXR1cm4gdGFrZVVudGlsKGpvaW4odGltZVdpbmRvdyksIHNraXBVbnRpbCh0aW1lV2luZG93LCBzdHJlYW0pKVxufVxuXG5mdW5jdGlvbiBVbnRpbCAobWF4U2lnbmFsLCBzb3VyY2UpIHtcbiAgdGhpcy5tYXhTaWduYWwgPSBtYXhTaWduYWxcbiAgdGhpcy5zb3VyY2UgPSBzb3VyY2Vcbn1cblxuVW50aWwucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdmFyIG1pbiA9IG5ldyBCb3VuZCgtSW5maW5pdHksIHNpbmspXG4gIHZhciBtYXggPSBuZXcgVXBwZXJCb3VuZCh0aGlzLm1heFNpZ25hbCwgc2luaywgc2NoZWR1bGVyKVxuICB2YXIgZGlzcG9zYWJsZSA9IHRoaXMuc291cmNlLnJ1bihuZXcgVGltZVdpbmRvd1NpbmsobWluLCBtYXgsIHNpbmspLCBzY2hlZHVsZXIpXG5cbiAgcmV0dXJuIGRpc3Bvc2UuYWxsKFttaW4sIG1heCwgZGlzcG9zYWJsZV0pXG59XG5cbmZ1bmN0aW9uIFNpbmNlIChtaW5TaWduYWwsIHNvdXJjZSkge1xuICB0aGlzLm1pblNpZ25hbCA9IG1pblNpZ25hbFxuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxufVxuXG5TaW5jZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICB2YXIgbWluID0gbmV3IExvd2VyQm91bmQodGhpcy5taW5TaWduYWwsIHNpbmssIHNjaGVkdWxlcilcbiAgdmFyIG1heCA9IG5ldyBCb3VuZChJbmZpbml0eSwgc2luaylcbiAgdmFyIGRpc3Bvc2FibGUgPSB0aGlzLnNvdXJjZS5ydW4obmV3IFRpbWVXaW5kb3dTaW5rKG1pbiwgbWF4LCBzaW5rKSwgc2NoZWR1bGVyKVxuXG4gIHJldHVybiBkaXNwb3NlLmFsbChbbWluLCBtYXgsIGRpc3Bvc2FibGVdKVxufVxuXG5mdW5jdGlvbiBCb3VuZCAodmFsdWUsIHNpbmspIHtcbiAgdGhpcy52YWx1ZSA9IHZhbHVlXG4gIHRoaXMuc2luayA9IHNpbmtcbn1cblxuQm91bmQucHJvdG90eXBlLmVycm9yID0gUGlwZS5wcm90b3R5cGUuZXJyb3JcbkJvdW5kLnByb3RvdHlwZS5ldmVudCA9IG5vb3BcbkJvdW5kLnByb3RvdHlwZS5lbmQgPSBub29wXG5Cb3VuZC5wcm90b3R5cGUuZGlzcG9zZSA9IG5vb3BcblxuZnVuY3Rpb24gVGltZVdpbmRvd1NpbmsgKG1pbiwgbWF4LCBzaW5rKSB7XG4gIHRoaXMubWluID0gbWluXG4gIHRoaXMubWF4ID0gbWF4XG4gIHRoaXMuc2luayA9IHNpbmtcbn1cblxuVGltZVdpbmRvd1NpbmsucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgaWYgKHQgPj0gdGhpcy5taW4udmFsdWUgJiYgdCA8IHRoaXMubWF4LnZhbHVlKSB7XG4gICAgdGhpcy5zaW5rLmV2ZW50KHQsIHgpXG4gIH1cbn1cblxuVGltZVdpbmRvd1NpbmsucHJvdG90eXBlLmVycm9yID0gUGlwZS5wcm90b3R5cGUuZXJyb3JcblRpbWVXaW5kb3dTaW5rLnByb3RvdHlwZS5lbmQgPSBQaXBlLnByb3RvdHlwZS5lbmRcblxuZnVuY3Rpb24gTG93ZXJCb3VuZCAoc2lnbmFsLCBzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdGhpcy52YWx1ZSA9IEluZmluaXR5XG4gIHRoaXMuc2luayA9IHNpbmtcbiAgdGhpcy5kaXNwb3NhYmxlID0gc2lnbmFsLnJ1bih0aGlzLCBzY2hlZHVsZXIpXG59XG5cbkxvd2VyQm91bmQucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQgLyosIHggKi8pIHtcbiAgaWYgKHQgPCB0aGlzLnZhbHVlKSB7XG4gICAgdGhpcy52YWx1ZSA9IHRcbiAgfVxufVxuXG5Mb3dlckJvdW5kLnByb3RvdHlwZS5lbmQgPSBub29wXG5Mb3dlckJvdW5kLnByb3RvdHlwZS5lcnJvciA9IFBpcGUucHJvdG90eXBlLmVycm9yXG5cbkxvd2VyQm91bmQucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmRpc3Bvc2FibGUuZGlzcG9zZSgpXG59XG5cbmZ1bmN0aW9uIFVwcGVyQm91bmQgKHNpZ25hbCwgc2luaywgc2NoZWR1bGVyKSB7XG4gIHRoaXMudmFsdWUgPSBJbmZpbml0eVxuICB0aGlzLnNpbmsgPSBzaW5rXG4gIHRoaXMuZGlzcG9zYWJsZSA9IHNpZ25hbC5ydW4odGhpcywgc2NoZWR1bGVyKVxufVxuXG5VcHBlckJvdW5kLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIGlmICh0IDwgdGhpcy52YWx1ZSkge1xuICAgIHRoaXMudmFsdWUgPSB0XG4gICAgdGhpcy5zaW5rLmVuZCh0LCB4KVxuICB9XG59XG5cblVwcGVyQm91bmQucHJvdG90eXBlLmVuZCA9IG5vb3BcblVwcGVyQm91bmQucHJvdG90eXBlLmVycm9yID0gUGlwZS5wcm90b3R5cGUuZXJyb3JcblxuVXBwZXJCb3VuZC5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuZGlzcG9zYWJsZS5kaXNwb3NlKClcbn1cblxuZnVuY3Rpb24gbm9vcCAoKSB7fVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci90aW1lc2xpY2UuanNcbi8vIG1vZHVsZSBpZCA9IDc1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCBQaXBlIGZyb20gJy4uL3NpbmsvUGlwZSdcbmltcG9ydCAqIGFzIGRpc3Bvc2UgZnJvbSAnLi4vZGlzcG9zYWJsZS9kaXNwb3NlJ1xuaW1wb3J0IFByb3BhZ2F0ZVRhc2sgZnJvbSAnLi4vc2NoZWR1bGVyL1Byb3BhZ2F0ZVRhc2snXG5cbi8qKlxuICogQHBhcmFtIHtOdW1iZXJ9IGRlbGF5VGltZSBtaWxsaXNlY29uZHMgdG8gZGVsYXkgZWFjaCBpdGVtXG4gKiBAcGFyYW0ge1N0cmVhbX0gc3RyZWFtXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIGNvbnRhaW5pbmcgdGhlIHNhbWUgaXRlbXMsIGJ1dCBkZWxheWVkIGJ5IG1zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWxheSAoZGVsYXlUaW1lLCBzdHJlYW0pIHtcbiAgcmV0dXJuIGRlbGF5VGltZSA8PSAwID8gc3RyZWFtXG4gICAgOiBuZXcgU3RyZWFtKG5ldyBEZWxheShkZWxheVRpbWUsIHN0cmVhbS5zb3VyY2UpKVxufVxuXG5mdW5jdGlvbiBEZWxheSAoZHQsIHNvdXJjZSkge1xuICB0aGlzLmR0ID0gZHRcbiAgdGhpcy5zb3VyY2UgPSBzb3VyY2Vcbn1cblxuRGVsYXkucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdmFyIGRlbGF5U2luayA9IG5ldyBEZWxheVNpbmsodGhpcy5kdCwgc2luaywgc2NoZWR1bGVyKVxuICByZXR1cm4gZGlzcG9zZS5hbGwoW2RlbGF5U2luaywgdGhpcy5zb3VyY2UucnVuKGRlbGF5U2luaywgc2NoZWR1bGVyKV0pXG59XG5cbmZ1bmN0aW9uIERlbGF5U2luayAoZHQsIHNpbmssIHNjaGVkdWxlcikge1xuICB0aGlzLmR0ID0gZHRcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlclxufVxuXG5EZWxheVNpbmsucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpc1xuICB0aGlzLnNjaGVkdWxlci5jYW5jZWxBbGwoZnVuY3Rpb24gKHNjaGVkdWxlZFRhc2spIHtcbiAgICByZXR1cm4gc2NoZWR1bGVkVGFzay50YXNrLnNpbmsgPT09IHNlbGYuc2lua1xuICB9KVxufVxuXG5EZWxheVNpbmsucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgdGhpcy5zY2hlZHVsZXIuZGVsYXkodGhpcy5kdCwgUHJvcGFnYXRlVGFzay5ldmVudCh4LCB0aGlzLnNpbmspKVxufVxuXG5EZWxheVNpbmsucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHRoaXMuc2NoZWR1bGVyLmRlbGF5KHRoaXMuZHQsIFByb3BhZ2F0ZVRhc2suZW5kKHgsIHRoaXMuc2luaykpXG59XG5cbkRlbGF5U2luay5wcm90b3R5cGUuZXJyb3IgPSBQaXBlLnByb3RvdHlwZS5lcnJvclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9kZWxheS5qc1xuLy8gbW9kdWxlIGlkID0gNzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBTdHJlYW0gZnJvbSAnLi4vU3RyZWFtJ1xuaW1wb3J0IFBpcGUgZnJvbSAnLi4vc2luay9QaXBlJ1xuXG5leHBvcnQgZnVuY3Rpb24gdGltZXN0YW1wIChzdHJlYW0pIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IFRpbWVzdGFtcChzdHJlYW0uc291cmNlKSlcbn1cblxuZnVuY3Rpb24gVGltZXN0YW1wIChzb3VyY2UpIHtcbiAgdGhpcy5zb3VyY2UgPSBzb3VyY2Vcbn1cblxuVGltZXN0YW1wLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHJldHVybiB0aGlzLnNvdXJjZS5ydW4obmV3IFRpbWVzdGFtcFNpbmsoc2luayksIHNjaGVkdWxlcilcbn1cblxuZnVuY3Rpb24gVGltZXN0YW1wU2luayAoc2luaykge1xuICB0aGlzLnNpbmsgPSBzaW5rXG59XG5cblRpbWVzdGFtcFNpbmsucHJvdG90eXBlLmVuZCA9IFBpcGUucHJvdG90eXBlLmVuZFxuVGltZXN0YW1wU2luay5wcm90b3R5cGUuZXJyb3IgPSBQaXBlLnByb3RvdHlwZS5lcnJvclxuXG5UaW1lc3RhbXBTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHRoaXMuc2luay5ldmVudCh0LCB7IHRpbWU6IHQsIHZhbHVlOiB4IH0pXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL3RpbWVzdGFtcC5qc1xuLy8gbW9kdWxlIGlkID0gNzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBTdHJlYW0gZnJvbSAnLi4vU3RyZWFtJ1xuaW1wb3J0IFBpcGUgZnJvbSAnLi4vc2luay9QaXBlJ1xuaW1wb3J0IFByb3BhZ2F0ZVRhc2sgZnJvbSAnLi4vc2NoZWR1bGVyL1Byb3BhZ2F0ZVRhc2snXG5pbXBvcnQgTWFwIGZyb20gJy4uL2Z1c2lvbi9NYXAnXG5cbi8qKlxuICogTGltaXQgdGhlIHJhdGUgb2YgZXZlbnRzIGJ5IHN1cHByZXNzaW5nIGV2ZW50cyB0aGF0IG9jY3VyIHRvbyBvZnRlblxuICogQHBhcmFtIHtOdW1iZXJ9IHBlcmlvZCB0aW1lIHRvIHN1cHByZXNzIGV2ZW50c1xuICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbVxuICogQHJldHVybnMge1N0cmVhbX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRocm90dGxlIChwZXJpb2QsIHN0cmVhbSkge1xuICByZXR1cm4gbmV3IFN0cmVhbSh0aHJvdHRsZVNvdXJjZShwZXJpb2QsIHN0cmVhbS5zb3VyY2UpKVxufVxuXG5mdW5jdGlvbiB0aHJvdHRsZVNvdXJjZSAocGVyaW9kLCBzb3VyY2UpIHtcbiAgcmV0dXJuIHNvdXJjZSBpbnN0YW5jZW9mIE1hcCA/IGNvbW11dGVNYXBUaHJvdHRsZShwZXJpb2QsIHNvdXJjZSlcbiAgICA6IHNvdXJjZSBpbnN0YW5jZW9mIFRocm90dGxlID8gZnVzZVRocm90dGxlKHBlcmlvZCwgc291cmNlKVxuICAgIDogbmV3IFRocm90dGxlKHBlcmlvZCwgc291cmNlKVxufVxuXG5mdW5jdGlvbiBjb21tdXRlTWFwVGhyb3R0bGUgKHBlcmlvZCwgc291cmNlKSB7XG4gIHJldHVybiBNYXAuY3JlYXRlKHNvdXJjZS5mLCB0aHJvdHRsZVNvdXJjZShwZXJpb2QsIHNvdXJjZS5zb3VyY2UpKVxufVxuXG5mdW5jdGlvbiBmdXNlVGhyb3R0bGUgKHBlcmlvZCwgc291cmNlKSB7XG4gIHJldHVybiBuZXcgVGhyb3R0bGUoTWF0aC5tYXgocGVyaW9kLCBzb3VyY2UucGVyaW9kKSwgc291cmNlLnNvdXJjZSlcbn1cblxuZnVuY3Rpb24gVGhyb3R0bGUgKHBlcmlvZCwgc291cmNlKSB7XG4gIHRoaXMucGVyaW9kID0gcGVyaW9kXG4gIHRoaXMuc291cmNlID0gc291cmNlXG59XG5cblRocm90dGxlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHJldHVybiB0aGlzLnNvdXJjZS5ydW4obmV3IFRocm90dGxlU2luayh0aGlzLnBlcmlvZCwgc2luayksIHNjaGVkdWxlcilcbn1cblxuZnVuY3Rpb24gVGhyb3R0bGVTaW5rIChwZXJpb2QsIHNpbmspIHtcbiAgdGhpcy50aW1lID0gMFxuICB0aGlzLnBlcmlvZCA9IHBlcmlvZFxuICB0aGlzLnNpbmsgPSBzaW5rXG59XG5cblRocm90dGxlU2luay5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgeCkge1xuICBpZiAodCA+PSB0aGlzLnRpbWUpIHtcbiAgICB0aGlzLnRpbWUgPSB0ICsgdGhpcy5wZXJpb2RcbiAgICB0aGlzLnNpbmsuZXZlbnQodCwgeClcbiAgfVxufVxuXG5UaHJvdHRsZVNpbmsucHJvdG90eXBlLmVuZCA9IFBpcGUucHJvdG90eXBlLmVuZFxuXG5UaHJvdHRsZVNpbmsucHJvdG90eXBlLmVycm9yID0gUGlwZS5wcm90b3R5cGUuZXJyb3JcblxuLyoqXG4gKiBXYWl0IGZvciBhIGJ1cnN0IG9mIGV2ZW50cyB0byBzdWJzaWRlIGFuZCBlbWl0IG9ubHkgdGhlIGxhc3QgZXZlbnQgaW4gdGhlIGJ1cnN0XG4gKiBAcGFyYW0ge051bWJlcn0gcGVyaW9kIGV2ZW50cyBvY2N1cmluZyBtb3JlIGZyZXF1ZW50bHkgdGhhbiB0aGlzXG4gKiAgd2lsbCBiZSBzdXBwcmVzc2VkXG4gKiBAcGFyYW0ge1N0cmVhbX0gc3RyZWFtIHN0cmVhbSB0byBkZWJvdW5jZVxuICogQHJldHVybnMge1N0cmVhbX0gbmV3IGRlYm91bmNlZCBzdHJlYW1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlYm91bmNlIChwZXJpb2QsIHN0cmVhbSkge1xuICByZXR1cm4gbmV3IFN0cmVhbShuZXcgRGVib3VuY2UocGVyaW9kLCBzdHJlYW0uc291cmNlKSlcbn1cblxuZnVuY3Rpb24gRGVib3VuY2UgKGR0LCBzb3VyY2UpIHtcbiAgdGhpcy5kdCA9IGR0XG4gIHRoaXMuc291cmNlID0gc291cmNlXG59XG5cbkRlYm91bmNlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHJldHVybiBuZXcgRGVib3VuY2VTaW5rKHRoaXMuZHQsIHRoaXMuc291cmNlLCBzaW5rLCBzY2hlZHVsZXIpXG59XG5cbmZ1bmN0aW9uIERlYm91bmNlU2luayAoZHQsIHNvdXJjZSwgc2luaywgc2NoZWR1bGVyKSB7XG4gIHRoaXMuZHQgPSBkdFxuICB0aGlzLnNpbmsgPSBzaW5rXG4gIHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyXG4gIHRoaXMudmFsdWUgPSB2b2lkIDBcbiAgdGhpcy50aW1lciA9IG51bGxcbiAgdGhpcy5kaXNwb3NhYmxlID0gc291cmNlLnJ1bih0aGlzLCBzY2hlZHVsZXIpXG59XG5cbkRlYm91bmNlU2luay5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgeCkge1xuICB0aGlzLl9jbGVhclRpbWVyKClcbiAgdGhpcy52YWx1ZSA9IHhcbiAgdGhpcy50aW1lciA9IHRoaXMuc2NoZWR1bGVyLmRlbGF5KHRoaXMuZHQsIFByb3BhZ2F0ZVRhc2suZXZlbnQoeCwgdGhpcy5zaW5rKSlcbn1cblxuRGVib3VuY2VTaW5rLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAodCwgeCkge1xuICBpZiAodGhpcy5fY2xlYXJUaW1lcigpKSB7XG4gICAgdGhpcy5zaW5rLmV2ZW50KHQsIHRoaXMudmFsdWUpXG4gICAgdGhpcy52YWx1ZSA9IHZvaWQgMFxuICB9XG4gIHRoaXMuc2luay5lbmQodCwgeClcbn1cblxuRGVib3VuY2VTaW5rLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHRoaXMuX2NsZWFyVGltZXIoKVxuICB0aGlzLnNpbmsuZXJyb3IodCwgeClcbn1cblxuRGVib3VuY2VTaW5rLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLl9jbGVhclRpbWVyKClcbiAgcmV0dXJuIHRoaXMuZGlzcG9zYWJsZS5kaXNwb3NlKClcbn1cblxuRGVib3VuY2VTaW5rLnByb3RvdHlwZS5fY2xlYXJUaW1lciA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMudGltZXIgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICB0aGlzLnRpbWVyLmRpc3Bvc2UoKVxuICB0aGlzLnRpbWVyID0gbnVsbFxuICByZXR1cm4gdHJ1ZVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9saW1pdC5qc1xuLy8gbW9kdWxlIGlkID0gNzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBTdHJlYW0gZnJvbSAnLi4vU3RyZWFtJ1xuaW1wb3J0IGZhdGFsIGZyb20gJy4uL2ZhdGFsRXJyb3InXG5pbXBvcnQgeyBvZiBhcyBqdXN0IH0gZnJvbSAnLi4vc291cmNlL2NvcmUnXG5cbi8qKlxuICogQ3JlYXRlIGEgc3RyZWFtIGNvbnRhaW5pbmcgb25seSB0aGUgcHJvbWlzZSdzIGZ1bGZpbGxtZW50XG4gKiB2YWx1ZSBhdCB0aGUgdGltZSBpdCBmdWxmaWxscy5cbiAqIEBwYXJhbSB7UHJvbWlzZTxUPn0gcCBwcm9taXNlXG4gKiBAcmV0dXJuIHtTdHJlYW08VD59IHN0cmVhbSBjb250YWluaW5nIHByb21pc2UncyBmdWxmaWxsbWVudCB2YWx1ZS5cbiAqICBJZiB0aGUgcHJvbWlzZSByZWplY3RzLCB0aGUgc3RyZWFtIHdpbGwgZXJyb3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZyb21Qcm9taXNlIChwKSB7XG4gIHJldHVybiBhd2FpdFByb21pc2VzKGp1c3QocCkpXG59XG5cbi8qKlxuICogVHVybiBhIFN0cmVhbTxQcm9taXNlPFQ+PiBpbnRvIFN0cmVhbTxUPiBieSBhd2FpdGluZyBlYWNoIHByb21pc2UuXG4gKiBFdmVudCBvcmRlciBpcyBwcmVzZXJ2ZWQuXG4gKiBAcGFyYW0ge1N0cmVhbTxQcm9taXNlPFQ+Pn0gc3RyZWFtXG4gKiBAcmV0dXJuIHtTdHJlYW08VD59IHN0cmVhbSBvZiBmdWxmaWxsbWVudCB2YWx1ZXMuICBUaGUgc3RyZWFtIHdpbGxcbiAqIGVycm9yIGlmIGFueSBwcm9taXNlIHJlamVjdHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhd2FpdFByb21pc2VzIChzdHJlYW0pIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IEF3YWl0KHN0cmVhbS5zb3VyY2UpKVxufVxuXG5mdW5jdGlvbiBBd2FpdCAoc291cmNlKSB7XG4gIHRoaXMuc291cmNlID0gc291cmNlXG59XG5cbkF3YWl0LnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHJldHVybiB0aGlzLnNvdXJjZS5ydW4obmV3IEF3YWl0U2luayhzaW5rLCBzY2hlZHVsZXIpLCBzY2hlZHVsZXIpXG59XG5cbmZ1bmN0aW9uIEF3YWl0U2luayAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHRoaXMuc2luayA9IHNpbmtcbiAgdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXJcbiAgdGhpcy5xdWV1ZSA9IFByb21pc2UucmVzb2x2ZSgpXG4gIHZhciBzZWxmID0gdGhpc1xuXG5cdC8vIFByZS1jcmVhdGUgY2xvc3VyZXMsIHRvIGF2b2lkIGNyZWF0aW5nIHRoZW0gcGVyIGV2ZW50XG4gIHRoaXMuX2V2ZW50Qm91bmQgPSBmdW5jdGlvbiAoeCkge1xuICAgIHNlbGYuc2luay5ldmVudChzZWxmLnNjaGVkdWxlci5ub3coKSwgeClcbiAgfVxuXG4gIHRoaXMuX2VuZEJvdW5kID0gZnVuY3Rpb24gKHgpIHtcbiAgICBzZWxmLnNpbmsuZW5kKHNlbGYuc2NoZWR1bGVyLm5vdygpLCB4KVxuICB9XG5cbiAgdGhpcy5fZXJyb3JCb3VuZCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgc2VsZi5zaW5rLmVycm9yKHNlbGYuc2NoZWR1bGVyLm5vdygpLCBlKVxuICB9XG59XG5cbkF3YWl0U2luay5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgcHJvbWlzZSkge1xuICB2YXIgc2VsZiA9IHRoaXNcbiAgdGhpcy5xdWV1ZSA9IHRoaXMucXVldWUudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHNlbGYuX2V2ZW50KHByb21pc2UpXG4gIH0pLmNhdGNoKHRoaXMuX2Vycm9yQm91bmQpXG59XG5cbkF3YWl0U2luay5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzXG4gIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBzZWxmLl9lbmQoeClcbiAgfSkuY2F0Y2godGhpcy5fZXJyb3JCb3VuZClcbn1cblxuQXdhaXRTaW5rLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uICh0LCBlKSB7XG4gIHZhciBzZWxmID0gdGhpc1xuICAvLyBEb24ndCByZXNvbHZlIGVycm9yIHZhbHVlcywgcHJvcGFnYXRlIGRpcmVjdGx5XG4gIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBzZWxmLl9lcnJvckJvdW5kKGUpXG4gIH0pLmNhdGNoKGZhdGFsKVxufVxuXG5Bd2FpdFNpbmsucHJvdG90eXBlLl9ldmVudCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIHJldHVybiBwcm9taXNlLnRoZW4odGhpcy5fZXZlbnRCb3VuZClcbn1cblxuQXdhaXRTaW5rLnByb3RvdHlwZS5fZW5kID0gZnVuY3Rpb24gKHgpIHtcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh4KS50aGVuKHRoaXMuX2VuZEJvdW5kKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9wcm9taXNlcy5qc1xuLy8gbW9kdWxlIGlkID0gNzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBTdHJlYW0gZnJvbSAnLi4vU3RyZWFtJ1xuaW1wb3J0IFNhZmVTaW5rIGZyb20gJy4uL3NpbmsvU2FmZVNpbmsnXG5pbXBvcnQgKiBhcyBkaXNwb3NlIGZyb20gJy4uL2Rpc3Bvc2FibGUvZGlzcG9zZSdcbmltcG9ydCAqIGFzIHRyeUV2ZW50IGZyb20gJy4uL3NvdXJjZS90cnlFdmVudCdcbmltcG9ydCBQcm9wYWdhdGVUYXNrIGZyb20gJy4uL3NjaGVkdWxlci9Qcm9wYWdhdGVUYXNrJ1xuXG4vKipcbiAqIElmIHN0cmVhbSBlbmNvdW50ZXJzIGFuIGVycm9yLCByZWNvdmVyIGFuZCBjb250aW51ZSB3aXRoIGl0ZW1zIGZyb20gc3RyZWFtXG4gKiByZXR1cm5lZCBieSBmLlxuICogQHBhcmFtIHtmdW5jdGlvbihlcnJvcjoqKTpTdHJlYW19IGYgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhIG5ldyBzdHJlYW1cbiAqIEBwYXJhbSB7U3RyZWFtfSBzdHJlYW1cbiAqIEByZXR1cm5zIHtTdHJlYW19IG5ldyBzdHJlYW0gd2hpY2ggd2lsbCByZWNvdmVyIGZyb20gYW4gZXJyb3IgYnkgY2FsbGluZyBmXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWNvdmVyV2l0aCAoZiwgc3RyZWFtKSB7XG4gIHJldHVybiBuZXcgU3RyZWFtKG5ldyBSZWNvdmVyV2l0aChmLCBzdHJlYW0uc291cmNlKSlcbn1cblxuZXhwb3J0IHZhciBmbGF0TWFwRXJyb3IgPSByZWNvdmVyV2l0aFxuXG4vKipcbiAqIENyZWF0ZSBhIHN0cmVhbSBjb250YWluaW5nIG9ubHkgYW4gZXJyb3JcbiAqIEBwYXJhbSB7Kn0gZSBlcnJvciB2YWx1ZSwgcHJlZmVyYWJseSBhbiBFcnJvciBvciBFcnJvciBzdWJ0eXBlXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIGNvbnRhaW5pbmcgb25seSBhbiBlcnJvclxuICovXG5leHBvcnQgZnVuY3Rpb24gdGhyb3dFcnJvciAoZSkge1xuICByZXR1cm4gbmV3IFN0cmVhbShuZXcgRXJyb3JTb3VyY2UoZSkpXG59XG5cbmZ1bmN0aW9uIEVycm9yU291cmNlIChlKSB7XG4gIHRoaXMudmFsdWUgPSBlXG59XG5cbkVycm9yU291cmNlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHJldHVybiBzY2hlZHVsZXIuYXNhcChuZXcgUHJvcGFnYXRlVGFzayhydW5FcnJvciwgdGhpcy52YWx1ZSwgc2luaykpXG59XG5cbmZ1bmN0aW9uIHJ1bkVycm9yICh0LCBlLCBzaW5rKSB7XG4gIHNpbmsuZXJyb3IodCwgZSlcbn1cblxuZnVuY3Rpb24gUmVjb3ZlcldpdGggKGYsIHNvdXJjZSkge1xuICB0aGlzLmYgPSBmXG4gIHRoaXMuc291cmNlID0gc291cmNlXG59XG5cblJlY292ZXJXaXRoLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHJldHVybiBuZXcgUmVjb3ZlcldpdGhTaW5rKHRoaXMuZiwgdGhpcy5zb3VyY2UsIHNpbmssIHNjaGVkdWxlcilcbn1cblxuZnVuY3Rpb24gUmVjb3ZlcldpdGhTaW5rIChmLCBzb3VyY2UsIHNpbmssIHNjaGVkdWxlcikge1xuICB0aGlzLmYgPSBmXG4gIHRoaXMuc2luayA9IG5ldyBTYWZlU2luayhzaW5rKVxuICB0aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlclxuICB0aGlzLmRpc3Bvc2FibGUgPSBzb3VyY2UucnVuKHRoaXMsIHNjaGVkdWxlcilcbn1cblxuUmVjb3ZlcldpdGhTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHRyeUV2ZW50LnRyeUV2ZW50KHQsIHgsIHRoaXMuc2luaylcbn1cblxuUmVjb3ZlcldpdGhTaW5rLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAodCwgeCkge1xuICB0cnlFdmVudC50cnlFbmQodCwgeCwgdGhpcy5zaW5rKVxufVxuXG5SZWNvdmVyV2l0aFNpbmsucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKHQsIGUpIHtcbiAgdmFyIG5leHRTaW5rID0gdGhpcy5zaW5rLmRpc2FibGUoKVxuXG4gIGRpc3Bvc2UudHJ5RGlzcG9zZSh0LCB0aGlzLmRpc3Bvc2FibGUsIHRoaXMuc2luaylcbiAgdGhpcy5fc3RhcnROZXh0KHQsIGUsIG5leHRTaW5rKVxufVxuXG5SZWNvdmVyV2l0aFNpbmsucHJvdG90eXBlLl9zdGFydE5leHQgPSBmdW5jdGlvbiAodCwgeCwgc2luaykge1xuICB0cnkge1xuICAgIHRoaXMuZGlzcG9zYWJsZSA9IHRoaXMuX2NvbnRpbnVlKHRoaXMuZiwgeCwgc2luaylcbiAgfSBjYXRjaCAoZSkge1xuICAgIHNpbmsuZXJyb3IodCwgZSlcbiAgfVxufVxuXG5SZWNvdmVyV2l0aFNpbmsucHJvdG90eXBlLl9jb250aW51ZSA9IGZ1bmN0aW9uIChmLCB4LCBzaW5rKSB7XG4gIHZhciBzdHJlYW0gPSBmKHgpXG4gIHJldHVybiBzdHJlYW0uc291cmNlLnJ1bihzaW5rLCB0aGlzLnNjaGVkdWxlcilcbn1cblxuUmVjb3ZlcldpdGhTaW5rLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5kaXNwb3NhYmxlLmRpc3Bvc2UoKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9lcnJvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDgwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTYWZlU2luayAoc2luaykge1xuICB0aGlzLnNpbmsgPSBzaW5rXG4gIHRoaXMuYWN0aXZlID0gdHJ1ZVxufVxuXG5TYWZlU2luay5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgeCkge1xuICBpZiAoIXRoaXMuYWN0aXZlKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdGhpcy5zaW5rLmV2ZW50KHQsIHgpXG59XG5cblNhZmVTaW5rLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAodCwgeCkge1xuICBpZiAoIXRoaXMuYWN0aXZlKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdGhpcy5kaXNhYmxlKClcbiAgdGhpcy5zaW5rLmVuZCh0LCB4KVxufVxuXG5TYWZlU2luay5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAodCwgZSkge1xuICB0aGlzLmRpc2FibGUoKVxuICB0aGlzLnNpbmsuZXJyb3IodCwgZSlcbn1cblxuU2FmZVNpbmsucHJvdG90eXBlLmRpc2FibGUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuYWN0aXZlID0gZmFsc2VcbiAgcmV0dXJuIHRoaXMuc2lua1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc2luay9TYWZlU2luay5qc1xuLy8gbW9kdWxlIGlkID0gODFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgYXBwZW5kLCByZW1vdmUsIGZpbmRJbmRleCB9IGZyb20gJ0Btb3N0L3ByZWx1ZGUnO1xuXG52YXIgTXVsdGljYXN0RGlzcG9zYWJsZSA9IGZ1bmN0aW9uIE11bHRpY2FzdERpc3Bvc2FibGUgKHNvdXJjZSwgc2luaykge1xuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxuICB0aGlzLnNpbmsgPSBzaW5rXG4gIHRoaXMuZGlzcG9zZWQgPSBmYWxzZVxufTtcblxuTXVsdGljYXN0RGlzcG9zYWJsZS5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uIGRpc3Bvc2UgKCkge1xuICBpZiAodGhpcy5kaXNwb3NlZCkge1xuICAgIHJldHVyblxuICB9XG4gIHRoaXMuZGlzcG9zZWQgPSB0cnVlXG4gIHZhciByZW1haW5pbmcgPSB0aGlzLnNvdXJjZS5yZW1vdmUodGhpcy5zaW5rKVxuICByZXR1cm4gcmVtYWluaW5nID09PSAwICYmIHRoaXMuc291cmNlLl9kaXNwb3NlKClcbn07XG5cbmZ1bmN0aW9uIHRyeUV2ZW50ICh0LCB4LCBzaW5rKSB7XG4gIHRyeSB7XG4gICAgc2luay5ldmVudCh0LCB4KVxuICB9IGNhdGNoIChlKSB7XG4gICAgc2luay5lcnJvcih0LCBlKVxuICB9XG59XG5cbmZ1bmN0aW9uIHRyeUVuZCAodCwgeCwgc2luaykge1xuICB0cnkge1xuICAgIHNpbmsuZW5kKHQsIHgpXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBzaW5rLmVycm9yKHQsIGUpXG4gIH1cbn1cblxudmFyIGRpc3Bvc2UgPSBmdW5jdGlvbiAoZGlzcG9zYWJsZSkgeyByZXR1cm4gZGlzcG9zYWJsZS5kaXNwb3NlKCk7IH1cblxudmFyIGVtcHR5RGlzcG9zYWJsZSA9IHtcbiAgZGlzcG9zZTogZnVuY3Rpb24gZGlzcG9zZSQxICgpIHt9XG59XG5cbnZhciBNdWx0aWNhc3RTb3VyY2UgPSBmdW5jdGlvbiBNdWx0aWNhc3RTb3VyY2UgKHNvdXJjZSkge1xuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxuICB0aGlzLnNpbmtzID0gW11cbiAgdGhpcy5fZGlzcG9zYWJsZSA9IGVtcHR5RGlzcG9zYWJsZVxufTtcblxuTXVsdGljYXN0U291cmNlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiBydW4gKHNpbmssIHNjaGVkdWxlcikge1xuICB2YXIgbiA9IHRoaXMuYWRkKHNpbmspXG4gIGlmIChuID09PSAxKSB7XG4gICAgdGhpcy5fZGlzcG9zYWJsZSA9IHRoaXMuc291cmNlLnJ1bih0aGlzLCBzY2hlZHVsZXIpXG4gIH1cbiAgcmV0dXJuIG5ldyBNdWx0aWNhc3REaXNwb3NhYmxlKHRoaXMsIHNpbmspXG59O1xuXG5NdWx0aWNhc3RTb3VyY2UucHJvdG90eXBlLl9kaXNwb3NlID0gZnVuY3Rpb24gX2Rpc3Bvc2UgKCkge1xuICB2YXIgZGlzcG9zYWJsZSA9IHRoaXMuX2Rpc3Bvc2FibGVcbiAgdGhpcy5fZGlzcG9zYWJsZSA9IGVtcHR5RGlzcG9zYWJsZVxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRpc3Bvc2FibGUpLnRoZW4oZGlzcG9zZSlcbn07XG5cbk11bHRpY2FzdFNvdXJjZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkIChzaW5rKSB7XG4gIHRoaXMuc2lua3MgPSBhcHBlbmQoc2luaywgdGhpcy5zaW5rcylcbiAgcmV0dXJuIHRoaXMuc2lua3MubGVuZ3RoXG59O1xuXG5NdWx0aWNhc3RTb3VyY2UucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZSQxIChzaW5rKSB7XG4gIHZhciBpID0gZmluZEluZGV4KHNpbmssIHRoaXMuc2lua3MpXG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gIGlmIChpID49IDApIHtcbiAgICB0aGlzLnNpbmtzID0gcmVtb3ZlKGksIHRoaXMuc2lua3MpXG4gIH1cblxuICByZXR1cm4gdGhpcy5zaW5rcy5sZW5ndGhcbn07XG5cbk11bHRpY2FzdFNvdXJjZS5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiBldmVudCAodGltZSwgdmFsdWUpIHtcbiAgdmFyIHMgPSB0aGlzLnNpbmtzXG4gIGlmIChzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBzWzBdLmV2ZW50KHRpbWUsIHZhbHVlKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcy5sZW5ndGg7ICsraSkge1xuICAgIHRyeUV2ZW50KHRpbWUsIHZhbHVlLCBzW2ldKVxuICB9XG59O1xuXG5NdWx0aWNhc3RTb3VyY2UucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uIGVuZCAodGltZSwgdmFsdWUpIHtcbiAgdmFyIHMgPSB0aGlzLnNpbmtzXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcy5sZW5ndGg7ICsraSkge1xuICAgIHRyeUVuZCh0aW1lLCB2YWx1ZSwgc1tpXSlcbiAgfVxufTtcblxuTXVsdGljYXN0U291cmNlLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIGVycm9yICh0aW1lLCBlcnIpIHtcbiAgdmFyIHMgPSB0aGlzLnNpbmtzXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcy5sZW5ndGg7ICsraSkge1xuICAgIHNbaV0uZXJyb3IodGltZSwgZXJyKVxuICB9XG59O1xuXG5mdW5jdGlvbiBtdWx0aWNhc3QgKHN0cmVhbSkge1xuICB2YXIgc291cmNlID0gc3RyZWFtLnNvdXJjZVxuICByZXR1cm4gc291cmNlIGluc3RhbmNlb2YgTXVsdGljYXN0U291cmNlXG4gICAgPyBzdHJlYW1cbiAgICA6IG5ldyBzdHJlYW0uY29uc3RydWN0b3IobmV3IE11bHRpY2FzdFNvdXJjZShzb3VyY2UpKVxufVxuXG5leHBvcnQgeyBNdWx0aWNhc3RTb3VyY2UgfTtleHBvcnQgZGVmYXVsdCBtdWx0aWNhc3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tdWx0aWNhc3QuZXMuanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AbW9zdC9tdWx0aWNhc3QvZGlzdC9tdWx0aWNhc3QuZXMuanNcbi8vIG1vZHVsZSBpZCA9IDgyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gdXBkYXRlQ2xhc3Mob2xkVm5vZGUsIHZub2RlKSB7XG4gICAgdmFyIGN1ciwgbmFtZSwgZWxtID0gdm5vZGUuZWxtLCBvbGRDbGFzcyA9IG9sZFZub2RlLmRhdGEuY2xhc3MsIGtsYXNzID0gdm5vZGUuZGF0YS5jbGFzcztcbiAgICBpZiAoIW9sZENsYXNzICYmICFrbGFzcylcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChvbGRDbGFzcyA9PT0ga2xhc3MpXG4gICAgICAgIHJldHVybjtcbiAgICBvbGRDbGFzcyA9IG9sZENsYXNzIHx8IHt9O1xuICAgIGtsYXNzID0ga2xhc3MgfHwge307XG4gICAgZm9yIChuYW1lIGluIG9sZENsYXNzKSB7XG4gICAgICAgIGlmICgha2xhc3NbbmFtZV0pIHtcbiAgICAgICAgICAgIGVsbS5jbGFzc0xpc3QucmVtb3ZlKG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAobmFtZSBpbiBrbGFzcykge1xuICAgICAgICBjdXIgPSBrbGFzc1tuYW1lXTtcbiAgICAgICAgaWYgKGN1ciAhPT0gb2xkQ2xhc3NbbmFtZV0pIHtcbiAgICAgICAgICAgIGVsbS5jbGFzc0xpc3RbY3VyID8gJ2FkZCcgOiAncmVtb3ZlJ10obmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmNsYXNzTW9kdWxlID0geyBjcmVhdGU6IHVwZGF0ZUNsYXNzLCB1cGRhdGU6IHVwZGF0ZUNsYXNzIH07XG5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmNsYXNzTW9kdWxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2xhc3MuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc25hYmJkb20vbW9kdWxlcy9jbGFzcy5qc1xuLy8gbW9kdWxlIGlkID0gODNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBpbnZva2VIYW5kbGVyKGhhbmRsZXIsIHZub2RlLCBldmVudCkge1xuICAgIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIC8vIGNhbGwgZnVuY3Rpb24gaGFuZGxlclxuICAgICAgICBoYW5kbGVyLmNhbGwodm5vZGUsIGV2ZW50LCB2bm9kZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBoYW5kbGVyID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIC8vIGNhbGwgaGFuZGxlciB3aXRoIGFyZ3VtZW50c1xuICAgICAgICBpZiAodHlwZW9mIGhhbmRsZXJbMF0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgLy8gc3BlY2lhbCBjYXNlIGZvciBzaW5nbGUgYXJndW1lbnQgZm9yIHBlcmZvcm1hbmNlXG4gICAgICAgICAgICBpZiAoaGFuZGxlci5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyWzBdLmNhbGwodm5vZGUsIGhhbmRsZXJbMV0sIGV2ZW50LCB2bm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgYXJncyA9IGhhbmRsZXIuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgYXJncy5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBhcmdzLnB1c2godm5vZGUpO1xuICAgICAgICAgICAgICAgIGhhbmRsZXJbMF0uYXBwbHkodm5vZGUsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gY2FsbCBtdWx0aXBsZSBoYW5kbGVyc1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoYW5kbGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaW52b2tlSGFuZGxlcihoYW5kbGVyW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGhhbmRsZUV2ZW50KGV2ZW50LCB2bm9kZSkge1xuICAgIHZhciBuYW1lID0gZXZlbnQudHlwZSwgb24gPSB2bm9kZS5kYXRhLm9uO1xuICAgIC8vIGNhbGwgZXZlbnQgaGFuZGxlcihzKSBpZiBleGlzdHNcbiAgICBpZiAob24gJiYgb25bbmFtZV0pIHtcbiAgICAgICAgaW52b2tlSGFuZGxlcihvbltuYW1lXSwgdm5vZGUsIGV2ZW50KTtcbiAgICB9XG59XG5mdW5jdGlvbiBjcmVhdGVMaXN0ZW5lcigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlcihldmVudCkge1xuICAgICAgICBoYW5kbGVFdmVudChldmVudCwgaGFuZGxlci52bm9kZSk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZUV2ZW50TGlzdGVuZXJzKG9sZFZub2RlLCB2bm9kZSkge1xuICAgIHZhciBvbGRPbiA9IG9sZFZub2RlLmRhdGEub24sIG9sZExpc3RlbmVyID0gb2xkVm5vZGUubGlzdGVuZXIsIG9sZEVsbSA9IG9sZFZub2RlLmVsbSwgb24gPSB2bm9kZSAmJiB2bm9kZS5kYXRhLm9uLCBlbG0gPSAodm5vZGUgJiYgdm5vZGUuZWxtKSwgbmFtZTtcbiAgICAvLyBvcHRpbWl6YXRpb24gZm9yIHJldXNlZCBpbW11dGFibGUgaGFuZGxlcnNcbiAgICBpZiAob2xkT24gPT09IG9uKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gcmVtb3ZlIGV4aXN0aW5nIGxpc3RlbmVycyB3aGljaCBubyBsb25nZXIgdXNlZFxuICAgIGlmIChvbGRPbiAmJiBvbGRMaXN0ZW5lcikge1xuICAgICAgICAvLyBpZiBlbGVtZW50IGNoYW5nZWQgb3IgZGVsZXRlZCB3ZSByZW1vdmUgYWxsIGV4aXN0aW5nIGxpc3RlbmVycyB1bmNvbmRpdGlvbmFsbHlcbiAgICAgICAgaWYgKCFvbikge1xuICAgICAgICAgICAgZm9yIChuYW1lIGluIG9sZE9uKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGxpc3RlbmVyIGlmIGVsZW1lbnQgd2FzIGNoYW5nZWQgb3IgZXhpc3RpbmcgbGlzdGVuZXJzIHJlbW92ZWRcbiAgICAgICAgICAgICAgICBvbGRFbG0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBvbGRMaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChuYW1lIGluIG9sZE9uKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGxpc3RlbmVyIGlmIGV4aXN0aW5nIGxpc3RlbmVyIHJlbW92ZWRcbiAgICAgICAgICAgICAgICBpZiAoIW9uW25hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgIG9sZEVsbS5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIG9sZExpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGFkZCBuZXcgbGlzdGVuZXJzIHdoaWNoIGhhcyBub3QgYWxyZWFkeSBhdHRhY2hlZFxuICAgIGlmIChvbikge1xuICAgICAgICAvLyByZXVzZSBleGlzdGluZyBsaXN0ZW5lciBvciBjcmVhdGUgbmV3XG4gICAgICAgIHZhciBsaXN0ZW5lciA9IHZub2RlLmxpc3RlbmVyID0gb2xkVm5vZGUubGlzdGVuZXIgfHwgY3JlYXRlTGlzdGVuZXIoKTtcbiAgICAgICAgLy8gdXBkYXRlIHZub2RlIGZvciBsaXN0ZW5lclxuICAgICAgICBsaXN0ZW5lci52bm9kZSA9IHZub2RlO1xuICAgICAgICAvLyBpZiBlbGVtZW50IGNoYW5nZWQgb3IgYWRkZWQgd2UgYWRkIGFsbCBuZWVkZWQgbGlzdGVuZXJzIHVuY29uZGl0aW9uYWxseVxuICAgICAgICBpZiAoIW9sZE9uKSB7XG4gICAgICAgICAgICBmb3IgKG5hbWUgaW4gb24pIHtcbiAgICAgICAgICAgICAgICAvLyBhZGQgbGlzdGVuZXIgaWYgZWxlbWVudCB3YXMgY2hhbmdlZCBvciBuZXcgbGlzdGVuZXJzIGFkZGVkXG4gICAgICAgICAgICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobmFtZSBpbiBvbikge1xuICAgICAgICAgICAgICAgIC8vIGFkZCBsaXN0ZW5lciBpZiBuZXcgbGlzdGVuZXIgYWRkZWRcbiAgICAgICAgICAgICAgICBpZiAoIW9sZE9uW25hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5ldmVudExpc3RlbmVyc01vZHVsZSA9IHtcbiAgICBjcmVhdGU6IHVwZGF0ZUV2ZW50TGlzdGVuZXJzLFxuICAgIHVwZGF0ZTogdXBkYXRlRXZlbnRMaXN0ZW5lcnMsXG4gICAgZGVzdHJveTogdXBkYXRlRXZlbnRMaXN0ZW5lcnNcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmV2ZW50TGlzdGVuZXJzTW9kdWxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXZlbnRsaXN0ZW5lcnMuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc25hYmJkb20vbW9kdWxlcy9ldmVudGxpc3RlbmVycy5qc1xuLy8gbW9kdWxlIGlkID0gODRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgeGxpbmtOUyA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJztcbnZhciB4bWxOUyA9ICdodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2UnO1xudmFyIGNvbG9uQ2hhciA9IDU4O1xudmFyIHhDaGFyID0gMTIwO1xuZnVuY3Rpb24gdXBkYXRlQXR0cnMob2xkVm5vZGUsIHZub2RlKSB7XG4gICAgdmFyIGtleSwgZWxtID0gdm5vZGUuZWxtLCBvbGRBdHRycyA9IG9sZFZub2RlLmRhdGEuYXR0cnMsIGF0dHJzID0gdm5vZGUuZGF0YS5hdHRycztcbiAgICBpZiAoIW9sZEF0dHJzICYmICFhdHRycylcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChvbGRBdHRycyA9PT0gYXR0cnMpXG4gICAgICAgIHJldHVybjtcbiAgICBvbGRBdHRycyA9IG9sZEF0dHJzIHx8IHt9O1xuICAgIGF0dHJzID0gYXR0cnMgfHwge307XG4gICAgLy8gdXBkYXRlIG1vZGlmaWVkIGF0dHJpYnV0ZXMsIGFkZCBuZXcgYXR0cmlidXRlc1xuICAgIGZvciAoa2V5IGluIGF0dHJzKSB7XG4gICAgICAgIHZhciBjdXIgPSBhdHRyc1trZXldO1xuICAgICAgICB2YXIgb2xkID0gb2xkQXR0cnNba2V5XTtcbiAgICAgICAgaWYgKG9sZCAhPT0gY3VyKSB7XG4gICAgICAgICAgICBpZiAoY3VyID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZShrZXksIFwiXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY3VyID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGVsbS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChrZXkuY2hhckNvZGVBdCgwKSAhPT0geENoYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZShrZXksIGN1cik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGtleS5jaGFyQ29kZUF0KDMpID09PSBjb2xvbkNoYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXNzdW1lIHhtbCBuYW1lc3BhY2VcbiAgICAgICAgICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZU5TKHhtbE5TLCBrZXksIGN1cik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGtleS5jaGFyQ29kZUF0KDUpID09PSBjb2xvbkNoYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXNzdW1lIHhsaW5rIG5hbWVzcGFjZVxuICAgICAgICAgICAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlTlMoeGxpbmtOUywga2V5LCBjdXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZShrZXksIGN1cik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIHJlbW92ZSByZW1vdmVkIGF0dHJpYnV0ZXNcbiAgICAvLyB1c2UgYGluYCBvcGVyYXRvciBzaW5jZSB0aGUgcHJldmlvdXMgYGZvcmAgaXRlcmF0aW9uIHVzZXMgaXQgKC5pLmUuIGFkZCBldmVuIGF0dHJpYnV0ZXMgd2l0aCB1bmRlZmluZWQgdmFsdWUpXG4gICAgLy8gdGhlIG90aGVyIG9wdGlvbiBpcyB0byByZW1vdmUgYWxsIGF0dHJpYnV0ZXMgd2l0aCB2YWx1ZSA9PSB1bmRlZmluZWRcbiAgICBmb3IgKGtleSBpbiBvbGRBdHRycykge1xuICAgICAgICBpZiAoIShrZXkgaW4gYXR0cnMpKSB7XG4gICAgICAgICAgICBlbG0ucmVtb3ZlQXR0cmlidXRlKGtleSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmF0dHJpYnV0ZXNNb2R1bGUgPSB7IGNyZWF0ZTogdXBkYXRlQXR0cnMsIHVwZGF0ZTogdXBkYXRlQXR0cnMgfTtcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuYXR0cmlidXRlc01vZHVsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF0dHJpYnV0ZXMuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc25hYmJkb20vbW9kdWxlcy9hdHRyaWJ1dGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA4NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIHVwZGF0ZVByb3BzKG9sZFZub2RlLCB2bm9kZSkge1xuICAgIHZhciBrZXksIGN1ciwgb2xkLCBlbG0gPSB2bm9kZS5lbG0sIG9sZFByb3BzID0gb2xkVm5vZGUuZGF0YS5wcm9wcywgcHJvcHMgPSB2bm9kZS5kYXRhLnByb3BzO1xuICAgIGlmICghb2xkUHJvcHMgJiYgIXByb3BzKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKG9sZFByb3BzID09PSBwcm9wcylcbiAgICAgICAgcmV0dXJuO1xuICAgIG9sZFByb3BzID0gb2xkUHJvcHMgfHwge307XG4gICAgcHJvcHMgPSBwcm9wcyB8fCB7fTtcbiAgICBmb3IgKGtleSBpbiBvbGRQcm9wcykge1xuICAgICAgICBpZiAoIXByb3BzW2tleV0pIHtcbiAgICAgICAgICAgIGRlbGV0ZSBlbG1ba2V5XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGtleSBpbiBwcm9wcykge1xuICAgICAgICBjdXIgPSBwcm9wc1trZXldO1xuICAgICAgICBvbGQgPSBvbGRQcm9wc1trZXldO1xuICAgICAgICBpZiAob2xkICE9PSBjdXIgJiYgKGtleSAhPT0gJ3ZhbHVlJyB8fCBlbG1ba2V5XSAhPT0gY3VyKSkge1xuICAgICAgICAgICAgZWxtW2tleV0gPSBjdXI7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLnByb3BzTW9kdWxlID0geyBjcmVhdGU6IHVwZGF0ZVByb3BzLCB1cGRhdGU6IHVwZGF0ZVByb3BzIH07XG5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLnByb3BzTW9kdWxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJvcHMuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc25hYmJkb20vbW9kdWxlcy9wcm9wcy5qc1xuLy8gbW9kdWxlIGlkID0gODZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==