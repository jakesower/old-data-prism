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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = h;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vnode__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__is__ = __webpack_require__(1);


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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var snabbdom = __webpack_require__(4);
var counter_1 = __webpack_require__(33);
var snabClass = __webpack_require__(7);
var snabELs = __webpack_require__(8);
var snabAttrs = __webpack_require__(9);
var snabProps = __webpack_require__(10);
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["init"] = init;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vnode__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__is__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__htmldomapi__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__h__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_3__h__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__thunk__ = __webpack_require__(6);
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
/* 5 */
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return thunk; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__h__ = __webpack_require__(2);

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
/* 7 */
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
/* 8 */
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
/* 9 */
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
/* 10 */
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

/***/ }),
/* 11 */
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
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["f"] = tryDispose;
/* harmony export (immutable) */ __webpack_exports__["b"] = create;
/* harmony export (immutable) */ __webpack_exports__["c"] = empty;
/* harmony export (immutable) */ __webpack_exports__["a"] = all;
/* unused harmony export promised */
/* harmony export (immutable) */ __webpack_exports__["e"] = settable;
/* harmony export (immutable) */ __webpack_exports__["d"] = once;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Disposable__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SettableDisposable__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Promise__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__most_prelude__ = __webpack_require__(14);
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
/* 13 */
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
/* 14 */
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
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = PropagateTask;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fatalError__ = __webpack_require__(19);
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
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = of;
/* harmony export (immutable) */ __webpack_exports__["a"] = empty;
/* harmony export (immutable) */ __webpack_exports__["b"] = never;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__disposable_dispose__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scheduler_PropagateTask__ = __webpack_require__(15);
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
/* 17 */
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
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = map;
/* harmony export (immutable) */ __webpack_exports__["a"] = constant;
/* harmony export (immutable) */ __webpack_exports__["c"] = tap;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fusion_Map__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sink_Pipe__ = __webpack_require__(13);
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
/* 19 */
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
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Scheduler__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ClockTimer__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Timeline__ = __webpack_require__(53);
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */





var defaultScheduler = new __WEBPACK_IMPORTED_MODULE_0__Scheduler__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_1__ClockTimer__["a" /* default */](), new __WEBPACK_IMPORTED_MODULE_2__Timeline__["a" /* default */]())

/* harmony default export */ __webpack_exports__["a"] = (defaultScheduler);


/***/ }),
/* 21 */
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
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Map;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sink_Pipe__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Filter__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FilterMap__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__most_prelude__ = __webpack_require__(14);
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
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = IndexSink;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Pipe__ = __webpack_require__(13);
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
/* 24 */
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
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = mergeConcurrently;
/* harmony export (immutable) */ __webpack_exports__["b"] = mergeMapConcurrently;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__disposable_dispose__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__LinkedList__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__most_prelude__ = __webpack_require__(14);
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
/* 26 */
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(43);


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = withDefaultScheduler;
/* unused harmony export withScheduler */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__disposable_dispose__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scheduler_defaultScheduler__ = __webpack_require__(20);
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
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Filter;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sink_Pipe__ = __webpack_require__(13);
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
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = continueWith;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__disposable_dispose__ = __webpack_require__(12);
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
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = combine;
/* harmony export (immutable) */ __webpack_exports__["b"] = combineArray;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__transform__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__source_core__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sink_Pipe__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sink_IndexSink__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__disposable_dispose__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__most_prelude__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__invoke__ = __webpack_require__(24);
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
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = flatMap;
/* harmony export (immutable) */ __webpack_exports__["b"] = join;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mergeConcurrently__ = __webpack_require__(25);
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var snabbdom_1 = __webpack_require__(4);
var most_1 = __webpack_require__(35);
var component_1 = __webpack_require__(34);
var init = (function (init) { return init; });
var model = (function (state, actionStreams) {
    var dec = actionStreams.decrement.constant(-1);
    var inc = actionStreams.increment.constant(1);
    var delta = most_1.combine(function (a, b) { return a + b; }, inc, dec);
    return { num: 0 };
});
var view = (function (state, actions) {
    return snabbdom_1.h('div', [
        snabbdom_1.h('button', { on: { click: actions.decrement } }, '-'),
        snabbdom_1.h('span', state.num.toString()),
        snabbdom_1.h('button', { on: { click: actions.increment } }, '-'),
    ]);
});
exports.default = component_1.Component(init, view, {});


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var most_1 = __webpack_require__(35);
var Component = (function (init, view, actionStreams) {
    return most_1.just(view(init, {}));
});
exports.Component = Component;


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__most_prelude__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__source_core__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__source_from__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__source_periodic__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_symbol_observable__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_symbol_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_symbol_observable__);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Stream", function() { return __WEBPACK_IMPORTED_MODULE_0__Stream__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "of", function() { return __WEBPACK_IMPORTED_MODULE_2__source_core__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "just", function() { return __WEBPACK_IMPORTED_MODULE_2__source_core__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "empty", function() { return __WEBPACK_IMPORTED_MODULE_2__source_core__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "never", function() { return __WEBPACK_IMPORTED_MODULE_2__source_core__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "from", function() { return __WEBPACK_IMPORTED_MODULE_3__source_from__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "periodic", function() { return __WEBPACK_IMPORTED_MODULE_4__source_periodic__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__observable_subscribe__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__combinator_thru__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__source_fromEvent__ = __webpack_require__(55);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "fromEvent", function() { return __WEBPACK_IMPORTED_MODULE_8__source_fromEvent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__combinator_observe__ = __webpack_require__(59);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "observe", function() { return __WEBPACK_IMPORTED_MODULE_9__combinator_observe__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return __WEBPACK_IMPORTED_MODULE_9__combinator_observe__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "drain", function() { return __WEBPACK_IMPORTED_MODULE_9__combinator_observe__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__combinator_loop__ = __webpack_require__(61);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "loop", function() { return __WEBPACK_IMPORTED_MODULE_10__combinator_loop__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__combinator_accumulate__ = __webpack_require__(62);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "scan", function() { return __WEBPACK_IMPORTED_MODULE_11__combinator_accumulate__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "reduce", function() { return __WEBPACK_IMPORTED_MODULE_11__combinator_accumulate__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__source_unfold__ = __webpack_require__(63);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "unfold", function() { return __WEBPACK_IMPORTED_MODULE_12__source_unfold__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__source_iterate__ = __webpack_require__(64);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "iterate", function() { return __WEBPACK_IMPORTED_MODULE_13__source_iterate__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__source_generate__ = __webpack_require__(65);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "generate", function() { return __WEBPACK_IMPORTED_MODULE_14__source_generate__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__combinator_build__ = __webpack_require__(66);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "concat", function() { return __WEBPACK_IMPORTED_MODULE_15__combinator_build__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "startWith", function() { return __WEBPACK_IMPORTED_MODULE_15__combinator_build__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__combinator_transform__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__combinator_applicative__ = __webpack_require__(67);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return __WEBPACK_IMPORTED_MODULE_16__combinator_transform__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "constant", function() { return __WEBPACK_IMPORTED_MODULE_16__combinator_transform__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "tap", function() { return __WEBPACK_IMPORTED_MODULE_16__combinator_transform__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ap", function() { return __WEBPACK_IMPORTED_MODULE_17__combinator_applicative__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__combinator_transduce__ = __webpack_require__(68);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "transduce", function() { return __WEBPACK_IMPORTED_MODULE_18__combinator_transduce__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__combinator_flatMap__ = __webpack_require__(32);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "flatMap", function() { return __WEBPACK_IMPORTED_MODULE_19__combinator_flatMap__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "chain", function() { return __WEBPACK_IMPORTED_MODULE_19__combinator_flatMap__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "join", function() { return __WEBPACK_IMPORTED_MODULE_19__combinator_flatMap__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__combinator_continueWith__ = __webpack_require__(30);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "continueWith", function() { return __WEBPACK_IMPORTED_MODULE_20__combinator_continueWith__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "flatMapEnd", function() { return __WEBPACK_IMPORTED_MODULE_20__combinator_continueWith__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__combinator_concatMap__ = __webpack_require__(70);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "concatMap", function() { return __WEBPACK_IMPORTED_MODULE_21__combinator_concatMap__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__combinator_mergeConcurrently__ = __webpack_require__(25);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "mergeConcurrently", function() { return __WEBPACK_IMPORTED_MODULE_22__combinator_mergeConcurrently__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__combinator_merge__ = __webpack_require__(71);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return __WEBPACK_IMPORTED_MODULE_23__combinator_merge__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "mergeArray", function() { return __WEBPACK_IMPORTED_MODULE_23__combinator_merge__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__combinator_combine__ = __webpack_require__(31);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "combine", function() { return __WEBPACK_IMPORTED_MODULE_24__combinator_combine__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "combineArray", function() { return __WEBPACK_IMPORTED_MODULE_24__combinator_combine__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__combinator_sample__ = __webpack_require__(72);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "sample", function() { return __WEBPACK_IMPORTED_MODULE_25__combinator_sample__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "sampleArray", function() { return __WEBPACK_IMPORTED_MODULE_25__combinator_sample__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "sampleWith", function() { return __WEBPACK_IMPORTED_MODULE_25__combinator_sample__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__combinator_zip__ = __webpack_require__(73);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "zip", function() { return __WEBPACK_IMPORTED_MODULE_26__combinator_zip__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "zipArray", function() { return __WEBPACK_IMPORTED_MODULE_26__combinator_zip__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__combinator_switch__ = __webpack_require__(75);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "switchLatest", function() { return __WEBPACK_IMPORTED_MODULE_27__combinator_switch__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "switch", function() { return __WEBPACK_IMPORTED_MODULE_27__combinator_switch__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__combinator_filter__ = __webpack_require__(76);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "filter", function() { return __WEBPACK_IMPORTED_MODULE_28__combinator_filter__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "skipRepeats", function() { return __WEBPACK_IMPORTED_MODULE_28__combinator_filter__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "distinct", function() { return __WEBPACK_IMPORTED_MODULE_28__combinator_filter__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "skipRepeatsWith", function() { return __WEBPACK_IMPORTED_MODULE_28__combinator_filter__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "distinctBy", function() { return __WEBPACK_IMPORTED_MODULE_28__combinator_filter__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__combinator_slice__ = __webpack_require__(77);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "take", function() { return __WEBPACK_IMPORTED_MODULE_29__combinator_slice__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "skip", function() { return __WEBPACK_IMPORTED_MODULE_29__combinator_slice__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "slice", function() { return __WEBPACK_IMPORTED_MODULE_29__combinator_slice__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "takeWhile", function() { return __WEBPACK_IMPORTED_MODULE_29__combinator_slice__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "skipWhile", function() { return __WEBPACK_IMPORTED_MODULE_29__combinator_slice__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "skipAfter", function() { return __WEBPACK_IMPORTED_MODULE_29__combinator_slice__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__combinator_timeslice__ = __webpack_require__(78);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "takeUntil", function() { return __WEBPACK_IMPORTED_MODULE_30__combinator_timeslice__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "until", function() { return __WEBPACK_IMPORTED_MODULE_30__combinator_timeslice__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "skipUntil", function() { return __WEBPACK_IMPORTED_MODULE_30__combinator_timeslice__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "since", function() { return __WEBPACK_IMPORTED_MODULE_30__combinator_timeslice__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "during", function() { return __WEBPACK_IMPORTED_MODULE_30__combinator_timeslice__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__combinator_delay__ = __webpack_require__(79);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "delay", function() { return __WEBPACK_IMPORTED_MODULE_31__combinator_delay__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__combinator_timestamp__ = __webpack_require__(80);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "timestamp", function() { return __WEBPACK_IMPORTED_MODULE_32__combinator_timestamp__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__combinator_limit__ = __webpack_require__(81);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "throttle", function() { return __WEBPACK_IMPORTED_MODULE_33__combinator_limit__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return __WEBPACK_IMPORTED_MODULE_33__combinator_limit__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__combinator_promises__ = __webpack_require__(82);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "fromPromise", function() { return __WEBPACK_IMPORTED_MODULE_34__combinator_promises__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "awaitPromises", function() { return __WEBPACK_IMPORTED_MODULE_34__combinator_promises__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "await", function() { return __WEBPACK_IMPORTED_MODULE_34__combinator_promises__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__combinator_errors__ = __webpack_require__(83);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "recoverWith", function() { return __WEBPACK_IMPORTED_MODULE_35__combinator_errors__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "flatMapError", function() { return __WEBPACK_IMPORTED_MODULE_35__combinator_errors__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "throwError", function() { return __WEBPACK_IMPORTED_MODULE_35__combinator_errors__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__most_multicast__ = __webpack_require__(85);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "multicast", function() { return __WEBPACK_IMPORTED_MODULE_36__most_multicast__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__scheduler_defaultScheduler__ = __webpack_require__(20);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "defaultScheduler", function() { return __WEBPACK_IMPORTED_MODULE_37__scheduler_defaultScheduler__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__scheduler_PropagateTask__ = __webpack_require__(15);
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
/* 36 */
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
/* 37 */
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
/* 38 */
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
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = from;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fromArray__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__iterable__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__fromIterable__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__observable_getObservable__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__observable_fromObservable__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__most_prelude__ = __webpack_require__(14);
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
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fromArray;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scheduler_PropagateTask__ = __webpack_require__(15);
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
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fromIterable;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__iterable__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scheduler_PropagateTask__ = __webpack_require__(15);
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
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getObservable;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_symbol_observable__ = __webpack_require__(27);
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = __webpack_require__(46);

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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44), __webpack_require__(45)(module)))

/***/ }),
/* 44 */
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
/* 45 */
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
/* 46 */
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
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fromObservable;
/* unused harmony export ObservableSource */
/* unused harmony export SubscriberSink */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__disposable_dispose__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__source_tryEvent__ = __webpack_require__(17);
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
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = periodic;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scheduler_PropagateTask__ = __webpack_require__(15);
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
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = subscribe;
/* unused harmony export SubscribeObserver */
/* unused harmony export Subscription */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scheduler_defaultScheduler__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__disposable_dispose__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fatalError__ = __webpack_require__(19);
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
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Scheduler;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ScheduledTask__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__task__ = __webpack_require__(21);
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
/* 51 */
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
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = ClockTimer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__task__ = __webpack_require__(21);
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
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Timeline;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__most_prelude__ = __webpack_require__(14);
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
/* 54 */
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
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fromEvent;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EventTargetSource__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__EventEmitterSource__ = __webpack_require__(57);
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
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = EventTargetSource;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__disposable_dispose__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tryEvent__ = __webpack_require__(17);
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
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = EventEmitterSource;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sink_DeferredSink__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__disposable_dispose__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tryEvent__ = __webpack_require__(17);
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
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = DeferredSink;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__task__ = __webpack_require__(21);
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
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = observe;
/* harmony export (immutable) */ __webpack_exports__["a"] = drain;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__runSource__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__transform__ = __webpack_require__(18);
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
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = FilterMap;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sink_Pipe__ = __webpack_require__(13);
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
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loop;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__ = __webpack_require__(13);
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
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = scan;
/* harmony export (immutable) */ __webpack_exports__["a"] = reduce;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__runSource__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__disposable_dispose__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__scheduler_PropagateTask__ = __webpack_require__(15);
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
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = unfold;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(11);
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
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = iterate;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(11);
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
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = generate;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__most_prelude__ = __webpack_require__(14);
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
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = cons;
/* harmony export (immutable) */ __webpack_exports__["a"] = concat;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__source_core__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__continueWith__ = __webpack_require__(30);
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
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = ap;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__combine__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__most_prelude__ = __webpack_require__(14);
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
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = transduce;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(11);
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
/* 69 */
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
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = concatMap;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mergeConcurrently__ = __webpack_require__(25);
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
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = merge;
/* harmony export (immutable) */ __webpack_exports__["b"] = mergeArray;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sink_IndexSink__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__source_core__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__disposable_dispose__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__most_prelude__ = __webpack_require__(14);
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
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = sample;
/* harmony export (immutable) */ __webpack_exports__["c"] = sampleWith;
/* harmony export (immutable) */ __webpack_exports__["b"] = sampleArray;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__disposable_dispose__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__most_prelude__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__invoke__ = __webpack_require__(24);
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
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = zip;
/* harmony export (immutable) */ __webpack_exports__["b"] = zipArray;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__transform__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__source_core__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sink_Pipe__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sink_IndexSink__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__disposable_dispose__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__most_prelude__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__invoke__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Queue__ = __webpack_require__(74);
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
/* 74 */
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
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = switchLatest;
/* unused harmony export switch */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__disposable_dispose__ = __webpack_require__(12);
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
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = filter;
/* harmony export (immutable) */ __webpack_exports__["b"] = skipRepeats;
/* harmony export (immutable) */ __webpack_exports__["c"] = skipRepeatsWith;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fusion_Filter__ = __webpack_require__(29);
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
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["e"] = take;
/* harmony export (immutable) */ __webpack_exports__["a"] = skip;
/* harmony export (immutable) */ __webpack_exports__["d"] = slice;
/* harmony export (immutable) */ __webpack_exports__["f"] = takeWhile;
/* harmony export (immutable) */ __webpack_exports__["c"] = skipWhile;
/* harmony export (immutable) */ __webpack_exports__["b"] = skipAfter;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__source_core__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__disposable_dispose__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__fusion_Map__ = __webpack_require__(22);
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
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = takeUntil;
/* harmony export (immutable) */ __webpack_exports__["b"] = skipUntil;
/* harmony export (immutable) */ __webpack_exports__["a"] = during;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__disposable_dispose__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__combinator_flatMap__ = __webpack_require__(32);
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
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = delay;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__disposable_dispose__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__scheduler_PropagateTask__ = __webpack_require__(15);
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
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = timestamp;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__ = __webpack_require__(13);
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
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = throttle;
/* harmony export (immutable) */ __webpack_exports__["a"] = debounce;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sink_Pipe__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scheduler_PropagateTask__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__fusion_Map__ = __webpack_require__(22);
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
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = fromPromise;
/* harmony export (immutable) */ __webpack_exports__["a"] = awaitPromises;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fatalError__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__source_core__ = __webpack_require__(16);
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
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = recoverWith;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return flatMapError; });
/* harmony export (immutable) */ __webpack_exports__["c"] = throwError;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stream__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sink_SafeSink__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__disposable_dispose__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__source_tryEvent__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__scheduler_PropagateTask__ = __webpack_require__(15);
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
/* 84 */
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
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MulticastSource */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__most_prelude__ = __webpack_require__(14);


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


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmI0NDA5NTZlODQ0MGJkMTgyOWIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL2VzL3Zub2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9lcy9pcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vZXMvaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL2VzL3NuYWJiZG9tLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9lcy9odG1sZG9tYXBpLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9lcy90aHVuay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vbW9kdWxlcy9jbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vbW9kdWxlcy9ldmVudGxpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc25hYmJkb20vbW9kdWxlcy9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9tb2R1bGVzL3Byb3BzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9TdHJlYW0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2Rpc3Bvc2FibGUvZGlzcG9zZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc2luay9QaXBlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbW9zdC9wcmVsdWRlL2Rpc3QvaW5kZXguZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NjaGVkdWxlci9Qcm9wYWdhdGVUYXNrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zb3VyY2UvY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc291cmNlL3RyeUV2ZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL3RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvZmF0YWxFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc2NoZWR1bGVyL2RlZmF1bHRTY2hlZHVsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2Z1c2lvbi9NYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NpbmsvSW5kZXhTaW5rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9pbnZva2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvbWVyZ2VDb25jdXJyZW50bHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2l0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zeW1ib2wtb2JzZXJ2YWJsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvcnVuU291cmNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9mdXNpb24vRmlsdGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL2NvbnRpbnVlV2l0aC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9jb21iaW5lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL2ZsYXRNYXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY291bnRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2NvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2Rpc3Bvc2FibGUvRGlzcG9zYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvZGlzcG9zYWJsZS9TZXR0YWJsZURpc3Bvc2FibGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL1Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NvdXJjZS9mcm9tLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zb3VyY2UvZnJvbUFycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zb3VyY2UvZnJvbUl0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9vYnNlcnZhYmxlL2dldE9ic2VydmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2xpYi9wb255ZmlsbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvb2JzZXJ2YWJsZS9mcm9tT2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc291cmNlL3BlcmlvZGljLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9vYnNlcnZhYmxlL3N1YnNjcmliZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc2NoZWR1bGVyL1NjaGVkdWxlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc2NoZWR1bGVyL1NjaGVkdWxlZFRhc2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NjaGVkdWxlci9DbG9ja1RpbWVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zY2hlZHVsZXIvVGltZWxpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvdGhydS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc291cmNlL2Zyb21FdmVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc291cmNlL0V2ZW50VGFyZ2V0U291cmNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zb3VyY2UvRXZlbnRFbWl0dGVyU291cmNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zaW5rL0RlZmVycmVkU2luay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9vYnNlcnZlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9mdXNpb24vRmlsdGVyTWFwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL2xvb3AuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvYWNjdW11bGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc291cmNlL3VuZm9sZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc291cmNlL2l0ZXJhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NvdXJjZS9nZW5lcmF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9idWlsZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9hcHBsaWNhdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci90cmFuc2R1Y2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL0xpbmtlZExpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvY29uY2F0TWFwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL21lcmdlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL3NhbXBsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci96aXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL1F1ZXVlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL3N3aXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3Ivc2xpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvdGltZXNsaWNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL2RlbGF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL3RpbWVzdGFtcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9saW1pdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9wcm9taXNlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NpbmsvU2FmZVNpbmsuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Btb3N0L211bHRpY2FzdC9kaXN0L211bHRpY2FzdC5lcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQzdEQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLGlDOzs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCOzs7Ozs7Ozs7O0FDSmdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHFCQUFxQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Es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O0FDL1NBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0M7Ozs7Ozs7OztBQy9EWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUNBQWlDO0FBQ2hEO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLGlDOzs7Ozs7O0FDNUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBLGlDOzs7Ozs7O0FDeEJBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLG9CQUFvQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDOzs7Ozs7O0FDOUZBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBLHNDOzs7Ozs7O0FDdERBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0EsaUM7Ozs7Ozs7QUN6QkE7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ29CO0FBQ3BCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVksbUJBQW1CO0FBQy9CLFlBQVksaUJBQWlCO0FBQzdCLFlBQVksRUFBRTtBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixXQUFXLEdBQUc7QUFDZCxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLGtCQUFrQjtBQUM3QixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsb0JBQW9CO0FBQy9CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHVCQUF1QjtBQUNuQyxZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7Ozs7Ozs7O0FDckhBO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hCQTtBQUFBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixPQUFPO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixPQUFPO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRVE7QUFDUjs7Ozs7Ozs7O0FDaFJBO0FBQUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3JEQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsRUFBRTtBQUNiLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNB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Q0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM1SEE7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDMUJBOzs7Ozs7Ozs7OztBQ0FBO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7QUNsREE7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsc0JBQXNCO0FBQ2pDLFlBQVksY0FBYztBQUMxQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDOUNBO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7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QUNBLDRCOzs7Ozs7O0FDNUJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDOzs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNyQkE7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUN0QkE7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUMyQjs7QUFFM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDOUNBO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLEVBQUU7QUFDYixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDeEJBO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN6RUE7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDa0I7O0FBRWxCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQy9GQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN2QkE7QUFBQTtBQUNBO0FBQ0E7O0FBRWdCOztBQUVoQjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFF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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDN0RBO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFUTs7QUFFUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDN0dBO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxzQkFBc0I7QUFDakMsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVywyQkFBMkI7QUFDdEMsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JFQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2pOQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDZTs7QUFFZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUMvR0E7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Q0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDMUZBO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2hDb0M7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDLDZCQUE2Qjs7QUFFbEU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGNBQWM7QUFDL0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsY0FBYztBQUMvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixjQUFjO0FBQy9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRTJCO0FBQzNCIiwiZmlsZSI6ImJ1aWxkL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGZiNDQwOTU2ZTg0NDBiZDE4MjliIiwiZXhwb3J0IGZ1bmN0aW9uIHZub2RlKHNlbCwgZGF0YSwgY2hpbGRyZW4sIHRleHQsIGVsbSkge1xuICAgIHZhciBrZXkgPSBkYXRhID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBkYXRhLmtleTtcbiAgICByZXR1cm4geyBzZWw6IHNlbCwgZGF0YTogZGF0YSwgY2hpbGRyZW46IGNoaWxkcmVuLFxuICAgICAgICB0ZXh0OiB0ZXh0LCBlbG06IGVsbSwga2V5OiBrZXkgfTtcbn1cbmV4cG9ydCBkZWZhdWx0IHZub2RlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dm5vZGUuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc25hYmJkb20vZXMvdm5vZGUuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IHZhciBhcnJheSA9IEFycmF5LmlzQXJyYXk7XG5leHBvcnQgZnVuY3Rpb24gcHJpbWl0aXZlKHMpIHtcbiAgICByZXR1cm4gdHlwZW9mIHMgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBzID09PSAnbnVtYmVyJztcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL2VzL2lzLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IHZub2RlIH0gZnJvbSAnLi92bm9kZSc7XG5pbXBvcnQgKiBhcyBpcyBmcm9tICcuL2lzJztcbmZ1bmN0aW9uIGFkZE5TKGRhdGEsIGNoaWxkcmVuLCBzZWwpIHtcbiAgICBkYXRhLm5zID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcbiAgICBpZiAoc2VsICE9PSAnZm9yZWlnbk9iamVjdCcgJiYgY2hpbGRyZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGREYXRhID0gY2hpbGRyZW5baV0uZGF0YTtcbiAgICAgICAgICAgIGlmIChjaGlsZERhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGFkZE5TKGNoaWxkRGF0YSwgY2hpbGRyZW5baV0uY2hpbGRyZW4sIGNoaWxkcmVuW2ldLnNlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gaChzZWwsIGIsIGMpIHtcbiAgICB2YXIgZGF0YSA9IHt9LCBjaGlsZHJlbiwgdGV4dCwgaTtcbiAgICBpZiAoYyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRhdGEgPSBiO1xuICAgICAgICBpZiAoaXMuYXJyYXkoYykpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gYztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpcy5wcmltaXRpdmUoYykpIHtcbiAgICAgICAgICAgIHRleHQgPSBjO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGMgJiYgYy5zZWwpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gW2NdO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoaXMuYXJyYXkoYikpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gYjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpcy5wcmltaXRpdmUoYikpIHtcbiAgICAgICAgICAgIHRleHQgPSBiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGIgJiYgYi5zZWwpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gW2JdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGF0YSA9IGI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzLmFycmF5KGNoaWxkcmVuKSkge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChpcy5wcmltaXRpdmUoY2hpbGRyZW5baV0pKVxuICAgICAgICAgICAgICAgIGNoaWxkcmVuW2ldID0gdm5vZGUodW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgY2hpbGRyZW5baV0sIHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNlbFswXSA9PT0gJ3MnICYmIHNlbFsxXSA9PT0gJ3YnICYmIHNlbFsyXSA9PT0gJ2cnICYmXG4gICAgICAgIChzZWwubGVuZ3RoID09PSAzIHx8IHNlbFszXSA9PT0gJy4nIHx8IHNlbFszXSA9PT0gJyMnKSkge1xuICAgICAgICBhZGROUyhkYXRhLCBjaGlsZHJlbiwgc2VsKTtcbiAgICB9XG4gICAgcmV0dXJuIHZub2RlKHNlbCwgZGF0YSwgY2hpbGRyZW4sIHRleHQsIHVuZGVmaW5lZCk7XG59XG47XG5leHBvcnQgZGVmYXVsdCBoO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9lcy9oLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIFIgZnJvbSAncmFtZGEnO1xuaW1wb3J0IHsgbG9vcCB9IGZyb20gJ21vc3QnO1xuaW1wb3J0ICogYXMgc25hYmJkb20gZnJvbSAnc25hYmJkb20nO1xuaW1wb3J0IENvdW50ZXIgZnJvbSAnLi9jb21wb25lbnRzL2NvdW50ZXInO1xuXG5pbXBvcnQgc25hYkNsYXNzID0gcmVxdWlyZSgnc25hYmJkb20vbW9kdWxlcy9jbGFzcycpO1xuaW1wb3J0IHNuYWJFTHMgPSByZXF1aXJlKCdzbmFiYmRvbS9tb2R1bGVzL2V2ZW50bGlzdGVuZXJzJyk7XG5pbXBvcnQgc25hYkF0dHJzID0gcmVxdWlyZSgnc25hYmJkb20vbW9kdWxlcy9hdHRyaWJ1dGVzJyk7XG5pbXBvcnQgc25hYlByb3BzID0gcmVxdWlyZSgnc25hYmJkb20vbW9kdWxlcy9wcm9wcycpO1xuXG5jb25zdCBoID0gc25hYmJkb20uaDtcblxuY29uc3QgcGF0Y2ggPSBzbmFiYmRvbS5pbml0KFtcbiAgc25hYkNsYXNzLmRlZmF1bHQsXG4gIHNuYWJFTHMuZGVmYXVsdCxcbiAgc25hYkF0dHJzLmRlZmF1bHQsXG4gIHNuYWJQcm9wcy5kZWZhdWx0LFxuXSk7XG5cbmNvbnN0IHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXBwJyk7XG5cbmZ1bmN0aW9uIHBhaXJ3aXNlKHByZXY6IGFueSwgY3VycmVudDogYW55KTogYW55IHtcbiAgcmV0dXJuIHsgc2VlZDogY3VycmVudCwgdmFsdWU6IFtwcmV2LCBjdXJyZW50XSB9O1xufVxuXG5jb25zdCB2aWV3JCA9IENvdW50ZXI7XG5cbnZpZXckXG4gIC5sb29wKHBhaXJ3aXNlLCAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haW4nKSBhcyBFbGVtZW50KSlcbiAgLm9ic2VydmUoKFthLCBiXSkgPT4gcGF0Y2goYSwgYikpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LnRzIiwiaW1wb3J0IHZub2RlIGZyb20gJy4vdm5vZGUnO1xuaW1wb3J0ICogYXMgaXMgZnJvbSAnLi9pcyc7XG5pbXBvcnQgaHRtbERvbUFwaSBmcm9tICcuL2h0bWxkb21hcGknO1xuZnVuY3Rpb24gaXNVbmRlZihzKSB7IHJldHVybiBzID09PSB1bmRlZmluZWQ7IH1cbmZ1bmN0aW9uIGlzRGVmKHMpIHsgcmV0dXJuIHMgIT09IHVuZGVmaW5lZDsgfVxudmFyIGVtcHR5Tm9kZSA9IHZub2RlKCcnLCB7fSwgW10sIHVuZGVmaW5lZCwgdW5kZWZpbmVkKTtcbmZ1bmN0aW9uIHNhbWVWbm9kZSh2bm9kZTEsIHZub2RlMikge1xuICAgIHJldHVybiB2bm9kZTEua2V5ID09PSB2bm9kZTIua2V5ICYmIHZub2RlMS5zZWwgPT09IHZub2RlMi5zZWw7XG59XG5mdW5jdGlvbiBpc1Zub2RlKHZub2RlKSB7XG4gICAgcmV0dXJuIHZub2RlLnNlbCAhPT0gdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gY3JlYXRlS2V5VG9PbGRJZHgoY2hpbGRyZW4sIGJlZ2luSWR4LCBlbmRJZHgpIHtcbiAgICB2YXIgaSwgbWFwID0ge30sIGtleSwgY2g7XG4gICAgZm9yIChpID0gYmVnaW5JZHg7IGkgPD0gZW5kSWR4OyArK2kpIHtcbiAgICAgICAgY2ggPSBjaGlsZHJlbltpXTtcbiAgICAgICAgaWYgKGNoICE9IG51bGwpIHtcbiAgICAgICAgICAgIGtleSA9IGNoLmtleTtcbiAgICAgICAgICAgIGlmIChrZXkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBtYXBba2V5XSA9IGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1hcDtcbn1cbnZhciBob29rcyA9IFsnY3JlYXRlJywgJ3VwZGF0ZScsICdyZW1vdmUnLCAnZGVzdHJveScsICdwcmUnLCAncG9zdCddO1xuZXhwb3J0IHsgaCB9IGZyb20gJy4vaCc7XG5leHBvcnQgeyB0aHVuayB9IGZyb20gJy4vdGh1bmsnO1xuZXhwb3J0IGZ1bmN0aW9uIGluaXQobW9kdWxlcywgZG9tQXBpKSB7XG4gICAgdmFyIGksIGosIGNicyA9IHt9O1xuICAgIHZhciBhcGkgPSBkb21BcGkgIT09IHVuZGVmaW5lZCA/IGRvbUFwaSA6IGh0bWxEb21BcGk7XG4gICAgZm9yIChpID0gMDsgaSA8IGhvb2tzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNic1tob29rc1tpXV0gPSBbXTtcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IG1vZHVsZXMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgIHZhciBob29rID0gbW9kdWxlc1tqXVtob29rc1tpXV07XG4gICAgICAgICAgICBpZiAoaG9vayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY2JzW2hvb2tzW2ldXS5wdXNoKGhvb2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGVtcHR5Tm9kZUF0KGVsbSkge1xuICAgICAgICB2YXIgaWQgPSBlbG0uaWQgPyAnIycgKyBlbG0uaWQgOiAnJztcbiAgICAgICAgdmFyIGMgPSBlbG0uY2xhc3NOYW1lID8gJy4nICsgZWxtLmNsYXNzTmFtZS5zcGxpdCgnICcpLmpvaW4oJy4nKSA6ICcnO1xuICAgICAgICByZXR1cm4gdm5vZGUoYXBpLnRhZ05hbWUoZWxtKS50b0xvd2VyQ2FzZSgpICsgaWQgKyBjLCB7fSwgW10sIHVuZGVmaW5lZCwgZWxtKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlUm1DYihjaGlsZEVsbSwgbGlzdGVuZXJzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBybUNiKCkge1xuICAgICAgICAgICAgaWYgKC0tbGlzdGVuZXJzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudF8xID0gYXBpLnBhcmVudE5vZGUoY2hpbGRFbG0pO1xuICAgICAgICAgICAgICAgIGFwaS5yZW1vdmVDaGlsZChwYXJlbnRfMSwgY2hpbGRFbG0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVFbG0odm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgICAgICB2YXIgaSwgZGF0YSA9IHZub2RlLmRhdGE7XG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChpc0RlZihpID0gZGF0YS5ob29rKSAmJiBpc0RlZihpID0gaS5pbml0KSkge1xuICAgICAgICAgICAgICAgIGkodm5vZGUpO1xuICAgICAgICAgICAgICAgIGRhdGEgPSB2bm9kZS5kYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuLCBzZWwgPSB2bm9kZS5zZWw7XG4gICAgICAgIGlmIChzZWwgPT09ICchJykge1xuICAgICAgICAgICAgaWYgKGlzVW5kZWYodm5vZGUudGV4dCkpIHtcbiAgICAgICAgICAgICAgICB2bm9kZS50ZXh0ID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2bm9kZS5lbG0gPSBhcGkuY3JlYXRlQ29tbWVudCh2bm9kZS50ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzZWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gUGFyc2Ugc2VsZWN0b3JcbiAgICAgICAgICAgIHZhciBoYXNoSWR4ID0gc2VsLmluZGV4T2YoJyMnKTtcbiAgICAgICAgICAgIHZhciBkb3RJZHggPSBzZWwuaW5kZXhPZignLicsIGhhc2hJZHgpO1xuICAgICAgICAgICAgdmFyIGhhc2ggPSBoYXNoSWR4ID4gMCA/IGhhc2hJZHggOiBzZWwubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGRvdCA9IGRvdElkeCA+IDAgPyBkb3RJZHggOiBzZWwubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIHRhZyA9IGhhc2hJZHggIT09IC0xIHx8IGRvdElkeCAhPT0gLTEgPyBzZWwuc2xpY2UoMCwgTWF0aC5taW4oaGFzaCwgZG90KSkgOiBzZWw7XG4gICAgICAgICAgICB2YXIgZWxtID0gdm5vZGUuZWxtID0gaXNEZWYoZGF0YSkgJiYgaXNEZWYoaSA9IGRhdGEubnMpID8gYXBpLmNyZWF0ZUVsZW1lbnROUyhpLCB0YWcpXG4gICAgICAgICAgICAgICAgOiBhcGkuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgICAgICAgICAgaWYgKGhhc2ggPCBkb3QpXG4gICAgICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZSgnaWQnLCBzZWwuc2xpY2UoaGFzaCArIDEsIGRvdCkpO1xuICAgICAgICAgICAgaWYgKGRvdElkeCA+IDApXG4gICAgICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBzZWwuc2xpY2UoZG90ICsgMSkucmVwbGFjZSgvXFwuL2csICcgJykpO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNicy5jcmVhdGUubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgY2JzLmNyZWF0ZVtpXShlbXB0eU5vZGUsIHZub2RlKTtcbiAgICAgICAgICAgIGlmIChpcy5hcnJheShjaGlsZHJlbikpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoID0gY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcGkuYXBwZW5kQ2hpbGQoZWxtLCBjcmVhdGVFbG0oY2gsIGluc2VydGVkVm5vZGVRdWV1ZSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXMucHJpbWl0aXZlKHZub2RlLnRleHQpKSB7XG4gICAgICAgICAgICAgICAgYXBpLmFwcGVuZENoaWxkKGVsbSwgYXBpLmNyZWF0ZVRleHROb2RlKHZub2RlLnRleHQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkgPSB2bm9kZS5kYXRhLmhvb2s7IC8vIFJldXNlIHZhcmlhYmxlXG4gICAgICAgICAgICBpZiAoaXNEZWYoaSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaS5jcmVhdGUpXG4gICAgICAgICAgICAgICAgICAgIGkuY3JlYXRlKGVtcHR5Tm9kZSwgdm5vZGUpO1xuICAgICAgICAgICAgICAgIGlmIChpLmluc2VydClcbiAgICAgICAgICAgICAgICAgICAgaW5zZXJ0ZWRWbm9kZVF1ZXVlLnB1c2godm5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdm5vZGUuZWxtID0gYXBpLmNyZWF0ZVRleHROb2RlKHZub2RlLnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2bm9kZS5lbG07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFkZFZub2RlcyhwYXJlbnRFbG0sIGJlZm9yZSwgdm5vZGVzLCBzdGFydElkeCwgZW5kSWR4LCBpbnNlcnRlZFZub2RlUXVldWUpIHtcbiAgICAgICAgZm9yICg7IHN0YXJ0SWR4IDw9IGVuZElkeDsgKytzdGFydElkeCkge1xuICAgICAgICAgICAgdmFyIGNoID0gdm5vZGVzW3N0YXJ0SWR4XTtcbiAgICAgICAgICAgIGlmIChjaCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIGNyZWF0ZUVsbShjaCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSwgYmVmb3JlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBpbnZva2VEZXN0cm95SG9vayh2bm9kZSkge1xuICAgICAgICB2YXIgaSwgaiwgZGF0YSA9IHZub2RlLmRhdGE7XG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChpc0RlZihpID0gZGF0YS5ob29rKSAmJiBpc0RlZihpID0gaS5kZXN0cm95KSlcbiAgICAgICAgICAgICAgICBpKHZub2RlKTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMuZGVzdHJveS5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBjYnMuZGVzdHJveVtpXSh2bm9kZSk7XG4gICAgICAgICAgICBpZiAodm5vZGUuY2hpbGRyZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCB2bm9kZS5jaGlsZHJlbi5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgICAgICAgICBpID0gdm5vZGUuY2hpbGRyZW5bal07XG4gICAgICAgICAgICAgICAgICAgIGlmIChpICE9IG51bGwgJiYgdHlwZW9mIGkgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGludm9rZURlc3Ryb3lIb29rKGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbW92ZVZub2RlcyhwYXJlbnRFbG0sIHZub2Rlcywgc3RhcnRJZHgsIGVuZElkeCkge1xuICAgICAgICBmb3IgKDsgc3RhcnRJZHggPD0gZW5kSWR4OyArK3N0YXJ0SWR4KSB7XG4gICAgICAgICAgICB2YXIgaV8xID0gdm9pZCAwLCBsaXN0ZW5lcnMgPSB2b2lkIDAsIHJtID0gdm9pZCAwLCBjaCA9IHZub2Rlc1tzdGFydElkeF07XG4gICAgICAgICAgICBpZiAoY2ggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChpc0RlZihjaC5zZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIGludm9rZURlc3Ryb3lIb29rKGNoKTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzID0gY2JzLnJlbW92ZS5sZW5ndGggKyAxO1xuICAgICAgICAgICAgICAgICAgICBybSA9IGNyZWF0ZVJtQ2IoY2guZWxtLCBsaXN0ZW5lcnMpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGlfMSA9IDA7IGlfMSA8IGNicy5yZW1vdmUubGVuZ3RoOyArK2lfMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNicy5yZW1vdmVbaV8xXShjaCwgcm0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNEZWYoaV8xID0gY2guZGF0YSkgJiYgaXNEZWYoaV8xID0gaV8xLmhvb2spICYmIGlzRGVmKGlfMSA9IGlfMS5yZW1vdmUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpXzEoY2gsIHJtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJtKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFwaS5yZW1vdmVDaGlsZChwYXJlbnRFbG0sIGNoLmVsbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNoaWxkcmVuKHBhcmVudEVsbSwgb2xkQ2gsIG5ld0NoLCBpbnNlcnRlZFZub2RlUXVldWUpIHtcbiAgICAgICAgdmFyIG9sZFN0YXJ0SWR4ID0gMCwgbmV3U3RhcnRJZHggPSAwO1xuICAgICAgICB2YXIgb2xkRW5kSWR4ID0gb2xkQ2gubGVuZ3RoIC0gMTtcbiAgICAgICAgdmFyIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFswXTtcbiAgICAgICAgdmFyIG9sZEVuZFZub2RlID0gb2xkQ2hbb2xkRW5kSWR4XTtcbiAgICAgICAgdmFyIG5ld0VuZElkeCA9IG5ld0NoLmxlbmd0aCAtIDE7XG4gICAgICAgIHZhciBuZXdTdGFydFZub2RlID0gbmV3Q2hbMF07XG4gICAgICAgIHZhciBuZXdFbmRWbm9kZSA9IG5ld0NoW25ld0VuZElkeF07XG4gICAgICAgIHZhciBvbGRLZXlUb0lkeDtcbiAgICAgICAgdmFyIGlkeEluT2xkO1xuICAgICAgICB2YXIgZWxtVG9Nb3ZlO1xuICAgICAgICB2YXIgYmVmb3JlO1xuICAgICAgICB3aGlsZSAob2xkU3RhcnRJZHggPD0gb2xkRW5kSWR4ICYmIG5ld1N0YXJ0SWR4IDw9IG5ld0VuZElkeCkge1xuICAgICAgICAgICAgaWYgKG9sZFN0YXJ0Vm5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFsrK29sZFN0YXJ0SWR4XTsgLy8gVm5vZGUgbWlnaHQgaGF2ZSBiZWVuIG1vdmVkIGxlZnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG9sZEVuZFZub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBvbGRFbmRWbm9kZSA9IG9sZENoWy0tb2xkRW5kSWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5ld1N0YXJ0Vm5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5ld0VuZFZub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBuZXdFbmRWbm9kZSA9IG5ld0NoWy0tbmV3RW5kSWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNhbWVWbm9kZShvbGRTdGFydFZub2RlLCBuZXdTdGFydFZub2RlKSkge1xuICAgICAgICAgICAgICAgIHBhdGNoVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgICAgICBvbGRTdGFydFZub2RlID0gb2xkQ2hbKytvbGRTdGFydElkeF07XG4gICAgICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2FtZVZub2RlKG9sZEVuZFZub2RlLCBuZXdFbmRWbm9kZSkpIHtcbiAgICAgICAgICAgICAgICBwYXRjaFZub2RlKG9sZEVuZFZub2RlLCBuZXdFbmRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgICAgICBvbGRFbmRWbm9kZSA9IG9sZENoWy0tb2xkRW5kSWR4XTtcbiAgICAgICAgICAgICAgICBuZXdFbmRWbm9kZSA9IG5ld0NoWy0tbmV3RW5kSWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNhbWVWbm9kZShvbGRTdGFydFZub2RlLCBuZXdFbmRWbm9kZSkpIHtcbiAgICAgICAgICAgICAgICBwYXRjaFZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld0VuZFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBvbGRTdGFydFZub2RlLmVsbSwgYXBpLm5leHRTaWJsaW5nKG9sZEVuZFZub2RlLmVsbSkpO1xuICAgICAgICAgICAgICAgIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFsrK29sZFN0YXJ0SWR4XTtcbiAgICAgICAgICAgICAgICBuZXdFbmRWbm9kZSA9IG5ld0NoWy0tbmV3RW5kSWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNhbWVWbm9kZShvbGRFbmRWbm9kZSwgbmV3U3RhcnRWbm9kZSkpIHtcbiAgICAgICAgICAgICAgICBwYXRjaFZub2RlKG9sZEVuZFZub2RlLCBuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBvbGRFbmRWbm9kZS5lbG0sIG9sZFN0YXJ0Vm5vZGUuZWxtKTtcbiAgICAgICAgICAgICAgICBvbGRFbmRWbm9kZSA9IG9sZENoWy0tb2xkRW5kSWR4XTtcbiAgICAgICAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAob2xkS2V5VG9JZHggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBvbGRLZXlUb0lkeCA9IGNyZWF0ZUtleVRvT2xkSWR4KG9sZENoLCBvbGRTdGFydElkeCwgb2xkRW5kSWR4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWR4SW5PbGQgPSBvbGRLZXlUb0lkeFtuZXdTdGFydFZub2RlLmtleV07XG4gICAgICAgICAgICAgICAgaWYgKGlzVW5kZWYoaWR4SW5PbGQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBjcmVhdGVFbG0obmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICAgICAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbG1Ub01vdmUgPSBvbGRDaFtpZHhJbk9sZF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbG1Ub01vdmUuc2VsICE9PSBuZXdTdGFydFZub2RlLnNlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIGNyZWF0ZUVsbShuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpLCBvbGRTdGFydFZub2RlLmVsbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRjaFZub2RlKGVsbVRvTW92ZSwgbmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9sZENoW2lkeEluT2xkXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBlbG1Ub01vdmUuZWxtLCBvbGRTdGFydFZub2RlLmVsbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAob2xkU3RhcnRJZHggPD0gb2xkRW5kSWR4IHx8IG5ld1N0YXJ0SWR4IDw9IG5ld0VuZElkeCkge1xuICAgICAgICAgICAgaWYgKG9sZFN0YXJ0SWR4ID4gb2xkRW5kSWR4KSB7XG4gICAgICAgICAgICAgICAgYmVmb3JlID0gbmV3Q2hbbmV3RW5kSWR4ICsgMV0gPT0gbnVsbCA/IG51bGwgOiBuZXdDaFtuZXdFbmRJZHggKyAxXS5lbG07XG4gICAgICAgICAgICAgICAgYWRkVm5vZGVzKHBhcmVudEVsbSwgYmVmb3JlLCBuZXdDaCwgbmV3U3RhcnRJZHgsIG5ld0VuZElkeCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlbW92ZVZub2RlcyhwYXJlbnRFbG0sIG9sZENoLCBvbGRTdGFydElkeCwgb2xkRW5kSWR4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBwYXRjaFZub2RlKG9sZFZub2RlLCB2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgICAgIHZhciBpLCBob29rO1xuICAgICAgICBpZiAoaXNEZWYoaSA9IHZub2RlLmRhdGEpICYmIGlzRGVmKGhvb2sgPSBpLmhvb2spICYmIGlzRGVmKGkgPSBob29rLnByZXBhdGNoKSkge1xuICAgICAgICAgICAgaShvbGRWbm9kZSwgdm5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbG0gPSB2bm9kZS5lbG0gPSBvbGRWbm9kZS5lbG07XG4gICAgICAgIHZhciBvbGRDaCA9IG9sZFZub2RlLmNoaWxkcmVuO1xuICAgICAgICB2YXIgY2ggPSB2bm9kZS5jaGlsZHJlbjtcbiAgICAgICAgaWYgKG9sZFZub2RlID09PSB2bm9kZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKHZub2RlLmRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNicy51cGRhdGUubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgY2JzLnVwZGF0ZVtpXShvbGRWbm9kZSwgdm5vZGUpO1xuICAgICAgICAgICAgaSA9IHZub2RlLmRhdGEuaG9vaztcbiAgICAgICAgICAgIGlmIChpc0RlZihpKSAmJiBpc0RlZihpID0gaS51cGRhdGUpKVxuICAgICAgICAgICAgICAgIGkob2xkVm5vZGUsIHZub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNVbmRlZih2bm9kZS50ZXh0KSkge1xuICAgICAgICAgICAgaWYgKGlzRGVmKG9sZENoKSAmJiBpc0RlZihjaCkpIHtcbiAgICAgICAgICAgICAgICBpZiAob2xkQ2ggIT09IGNoKVxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVDaGlsZHJlbihlbG0sIG9sZENoLCBjaCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzRGVmKGNoKSkge1xuICAgICAgICAgICAgICAgIGlmIChpc0RlZihvbGRWbm9kZS50ZXh0KSlcbiAgICAgICAgICAgICAgICAgICAgYXBpLnNldFRleHRDb250ZW50KGVsbSwgJycpO1xuICAgICAgICAgICAgICAgIGFkZFZub2RlcyhlbG0sIG51bGwsIGNoLCAwLCBjaC5sZW5ndGggLSAxLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNEZWYob2xkQ2gpKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlVm5vZGVzKGVsbSwgb2xkQ2gsIDAsIG9sZENoLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNEZWYob2xkVm5vZGUudGV4dCkpIHtcbiAgICAgICAgICAgICAgICBhcGkuc2V0VGV4dENvbnRlbnQoZWxtLCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob2xkVm5vZGUudGV4dCAhPT0gdm5vZGUudGV4dCkge1xuICAgICAgICAgICAgYXBpLnNldFRleHRDb250ZW50KGVsbSwgdm5vZGUudGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRGVmKGhvb2spICYmIGlzRGVmKGkgPSBob29rLnBvc3RwYXRjaCkpIHtcbiAgICAgICAgICAgIGkob2xkVm5vZGUsIHZub2RlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gcGF0Y2gob2xkVm5vZGUsIHZub2RlKSB7XG4gICAgICAgIHZhciBpLCBlbG0sIHBhcmVudDtcbiAgICAgICAgdmFyIGluc2VydGVkVm5vZGVRdWV1ZSA9IFtdO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLnByZS5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIGNicy5wcmVbaV0oKTtcbiAgICAgICAgaWYgKCFpc1Zub2RlKG9sZFZub2RlKSkge1xuICAgICAgICAgICAgb2xkVm5vZGUgPSBlbXB0eU5vZGVBdChvbGRWbm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNhbWVWbm9kZShvbGRWbm9kZSwgdm5vZGUpKSB7XG4gICAgICAgICAgICBwYXRjaFZub2RlKG9sZFZub2RlLCB2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVsbSA9IG9sZFZub2RlLmVsbTtcbiAgICAgICAgICAgIHBhcmVudCA9IGFwaS5wYXJlbnROb2RlKGVsbSk7XG4gICAgICAgICAgICBjcmVhdGVFbG0odm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgICBpZiAocGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnQsIHZub2RlLmVsbSwgYXBpLm5leHRTaWJsaW5nKGVsbSkpO1xuICAgICAgICAgICAgICAgIHJlbW92ZVZub2RlcyhwYXJlbnQsIFtvbGRWbm9kZV0sIDAsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBpbnNlcnRlZFZub2RlUXVldWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGluc2VydGVkVm5vZGVRdWV1ZVtpXS5kYXRhLmhvb2suaW5zZXJ0KGluc2VydGVkVm5vZGVRdWV1ZVtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNicy5wb3N0Lmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgY2JzLnBvc3RbaV0oKTtcbiAgICAgICAgcmV0dXJuIHZub2RlO1xuICAgIH07XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zbmFiYmRvbS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9lcy9zbmFiYmRvbS5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZ05hbWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2VVUkksIHF1YWxpZmllZE5hbWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKG5hbWVzcGFjZVVSSSwgcXVhbGlmaWVkTmFtZSk7XG59XG5mdW5jdGlvbiBjcmVhdGVUZXh0Tm9kZSh0ZXh0KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpO1xufVxuZnVuY3Rpb24gY3JlYXRlQ29tbWVudCh0ZXh0KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQodGV4dCk7XG59XG5mdW5jdGlvbiBpbnNlcnRCZWZvcmUocGFyZW50Tm9kZSwgbmV3Tm9kZSwgcmVmZXJlbmNlTm9kZSkge1xuICAgIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld05vZGUsIHJlZmVyZW5jZU5vZGUpO1xufVxuZnVuY3Rpb24gcmVtb3ZlQ2hpbGQobm9kZSwgY2hpbGQpIHtcbiAgICBub2RlLnJlbW92ZUNoaWxkKGNoaWxkKTtcbn1cbmZ1bmN0aW9uIGFwcGVuZENoaWxkKG5vZGUsIGNoaWxkKSB7XG4gICAgbm9kZS5hcHBlbmRDaGlsZChjaGlsZCk7XG59XG5mdW5jdGlvbiBwYXJlbnROb2RlKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5wYXJlbnROb2RlO1xufVxuZnVuY3Rpb24gbmV4dFNpYmxpbmcobm9kZSkge1xuICAgIHJldHVybiBub2RlLm5leHRTaWJsaW5nO1xufVxuZnVuY3Rpb24gdGFnTmFtZShlbG0pIHtcbiAgICByZXR1cm4gZWxtLnRhZ05hbWU7XG59XG5mdW5jdGlvbiBzZXRUZXh0Q29udGVudChub2RlLCB0ZXh0KSB7XG4gICAgbm9kZS50ZXh0Q29udGVudCA9IHRleHQ7XG59XG5mdW5jdGlvbiBnZXRUZXh0Q29udGVudChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUudGV4dENvbnRlbnQ7XG59XG5mdW5jdGlvbiBpc0VsZW1lbnQobm9kZSkge1xuICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSAxO1xufVxuZnVuY3Rpb24gaXNUZXh0KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gMztcbn1cbmZ1bmN0aW9uIGlzQ29tbWVudChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDg7XG59XG5leHBvcnQgdmFyIGh0bWxEb21BcGkgPSB7XG4gICAgY3JlYXRlRWxlbWVudDogY3JlYXRlRWxlbWVudCxcbiAgICBjcmVhdGVFbGVtZW50TlM6IGNyZWF0ZUVsZW1lbnROUyxcbiAgICBjcmVhdGVUZXh0Tm9kZTogY3JlYXRlVGV4dE5vZGUsXG4gICAgY3JlYXRlQ29tbWVudDogY3JlYXRlQ29tbWVudCxcbiAgICBpbnNlcnRCZWZvcmU6IGluc2VydEJlZm9yZSxcbiAgICByZW1vdmVDaGlsZDogcmVtb3ZlQ2hpbGQsXG4gICAgYXBwZW5kQ2hpbGQ6IGFwcGVuZENoaWxkLFxuICAgIHBhcmVudE5vZGU6IHBhcmVudE5vZGUsXG4gICAgbmV4dFNpYmxpbmc6IG5leHRTaWJsaW5nLFxuICAgIHRhZ05hbWU6IHRhZ05hbWUsXG4gICAgc2V0VGV4dENvbnRlbnQ6IHNldFRleHRDb250ZW50LFxuICAgIGdldFRleHRDb250ZW50OiBnZXRUZXh0Q29udGVudCxcbiAgICBpc0VsZW1lbnQ6IGlzRWxlbWVudCxcbiAgICBpc1RleHQ6IGlzVGV4dCxcbiAgICBpc0NvbW1lbnQ6IGlzQ29tbWVudCxcbn07XG5leHBvcnQgZGVmYXVsdCBodG1sRG9tQXBpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aHRtbGRvbWFwaS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9lcy9odG1sZG9tYXBpLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGggfSBmcm9tICcuL2gnO1xuZnVuY3Rpb24gY29weVRvVGh1bmsodm5vZGUsIHRodW5rKSB7XG4gICAgdGh1bmsuZWxtID0gdm5vZGUuZWxtO1xuICAgIHZub2RlLmRhdGEuZm4gPSB0aHVuay5kYXRhLmZuO1xuICAgIHZub2RlLmRhdGEuYXJncyA9IHRodW5rLmRhdGEuYXJncztcbiAgICB0aHVuay5kYXRhID0gdm5vZGUuZGF0YTtcbiAgICB0aHVuay5jaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuO1xuICAgIHRodW5rLnRleHQgPSB2bm9kZS50ZXh0O1xuICAgIHRodW5rLmVsbSA9IHZub2RlLmVsbTtcbn1cbmZ1bmN0aW9uIGluaXQodGh1bmspIHtcbiAgICB2YXIgY3VyID0gdGh1bmsuZGF0YTtcbiAgICB2YXIgdm5vZGUgPSBjdXIuZm4uYXBwbHkodW5kZWZpbmVkLCBjdXIuYXJncyk7XG4gICAgY29weVRvVGh1bmsodm5vZGUsIHRodW5rKTtcbn1cbmZ1bmN0aW9uIHByZXBhdGNoKG9sZFZub2RlLCB0aHVuaykge1xuICAgIHZhciBpLCBvbGQgPSBvbGRWbm9kZS5kYXRhLCBjdXIgPSB0aHVuay5kYXRhO1xuICAgIHZhciBvbGRBcmdzID0gb2xkLmFyZ3MsIGFyZ3MgPSBjdXIuYXJncztcbiAgICBpZiAob2xkLmZuICE9PSBjdXIuZm4gfHwgb2xkQXJncy5sZW5ndGggIT09IGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNvcHlUb1RodW5rKGN1ci5mbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpLCB0aHVuayk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKG9sZEFyZ3NbaV0gIT09IGFyZ3NbaV0pIHtcbiAgICAgICAgICAgIGNvcHlUb1RodW5rKGN1ci5mbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpLCB0aHVuayk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29weVRvVGh1bmsob2xkVm5vZGUsIHRodW5rKTtcbn1cbmV4cG9ydCB2YXIgdGh1bmsgPSBmdW5jdGlvbiB0aHVuayhzZWwsIGtleSwgZm4sIGFyZ3MpIHtcbiAgICBpZiAoYXJncyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGFyZ3MgPSBmbjtcbiAgICAgICAgZm4gPSBrZXk7XG4gICAgICAgIGtleSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIGgoc2VsLCB7XG4gICAgICAgIGtleToga2V5LFxuICAgICAgICBob29rOiB7IGluaXQ6IGluaXQsIHByZXBhdGNoOiBwcmVwYXRjaCB9LFxuICAgICAgICBmbjogZm4sXG4gICAgICAgIGFyZ3M6IGFyZ3NcbiAgICB9KTtcbn07XG5leHBvcnQgZGVmYXVsdCB0aHVuaztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRodW5rLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL2VzL3RodW5rLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gdXBkYXRlQ2xhc3Mob2xkVm5vZGUsIHZub2RlKSB7XG4gICAgdmFyIGN1ciwgbmFtZSwgZWxtID0gdm5vZGUuZWxtLCBvbGRDbGFzcyA9IG9sZFZub2RlLmRhdGEuY2xhc3MsIGtsYXNzID0gdm5vZGUuZGF0YS5jbGFzcztcbiAgICBpZiAoIW9sZENsYXNzICYmICFrbGFzcylcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChvbGRDbGFzcyA9PT0ga2xhc3MpXG4gICAgICAgIHJldHVybjtcbiAgICBvbGRDbGFzcyA9IG9sZENsYXNzIHx8IHt9O1xuICAgIGtsYXNzID0ga2xhc3MgfHwge307XG4gICAgZm9yIChuYW1lIGluIG9sZENsYXNzKSB7XG4gICAgICAgIGlmICgha2xhc3NbbmFtZV0pIHtcbiAgICAgICAgICAgIGVsbS5jbGFzc0xpc3QucmVtb3ZlKG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAobmFtZSBpbiBrbGFzcykge1xuICAgICAgICBjdXIgPSBrbGFzc1tuYW1lXTtcbiAgICAgICAgaWYgKGN1ciAhPT0gb2xkQ2xhc3NbbmFtZV0pIHtcbiAgICAgICAgICAgIGVsbS5jbGFzc0xpc3RbY3VyID8gJ2FkZCcgOiAncmVtb3ZlJ10obmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmNsYXNzTW9kdWxlID0geyBjcmVhdGU6IHVwZGF0ZUNsYXNzLCB1cGRhdGU6IHVwZGF0ZUNsYXNzIH07XG5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmNsYXNzTW9kdWxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2xhc3MuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc25hYmJkb20vbW9kdWxlcy9jbGFzcy5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGludm9rZUhhbmRsZXIoaGFuZGxlciwgdm5vZGUsIGV2ZW50KSB7XG4gICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgLy8gY2FsbCBmdW5jdGlvbiBoYW5kbGVyXG4gICAgICAgIGhhbmRsZXIuY2FsbCh2bm9kZSwgZXZlbnQsIHZub2RlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGhhbmRsZXIgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgLy8gY2FsbCBoYW5kbGVyIHdpdGggYXJndW1lbnRzXG4gICAgICAgIGlmICh0eXBlb2YgaGFuZGxlclswXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAvLyBzcGVjaWFsIGNhc2UgZm9yIHNpbmdsZSBhcmd1bWVudCBmb3IgcGVyZm9ybWFuY2VcbiAgICAgICAgICAgIGlmIChoYW5kbGVyLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIGhhbmRsZXJbMF0uY2FsbCh2bm9kZSwgaGFuZGxlclsxXSwgZXZlbnQsIHZub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBhcmdzID0gaGFuZGxlci5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICBhcmdzLnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh2bm9kZSk7XG4gICAgICAgICAgICAgICAgaGFuZGxlclswXS5hcHBseSh2bm9kZSwgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBjYWxsIG11bHRpcGxlIGhhbmRsZXJzXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhhbmRsZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpbnZva2VIYW5kbGVyKGhhbmRsZXJbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gaGFuZGxlRXZlbnQoZXZlbnQsIHZub2RlKSB7XG4gICAgdmFyIG5hbWUgPSBldmVudC50eXBlLCBvbiA9IHZub2RlLmRhdGEub247XG4gICAgLy8gY2FsbCBldmVudCBoYW5kbGVyKHMpIGlmIGV4aXN0c1xuICAgIGlmIChvbiAmJiBvbltuYW1lXSkge1xuICAgICAgICBpbnZva2VIYW5kbGVyKG9uW25hbWVdLCB2bm9kZSwgZXZlbnQpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNyZWF0ZUxpc3RlbmVyKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBoYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGhhbmRsZUV2ZW50KGV2ZW50LCBoYW5kbGVyLnZub2RlKTtcbiAgICB9O1xufVxuZnVuY3Rpb24gdXBkYXRlRXZlbnRMaXN0ZW5lcnMob2xkVm5vZGUsIHZub2RlKSB7XG4gICAgdmFyIG9sZE9uID0gb2xkVm5vZGUuZGF0YS5vbiwgb2xkTGlzdGVuZXIgPSBvbGRWbm9kZS5saXN0ZW5lciwgb2xkRWxtID0gb2xkVm5vZGUuZWxtLCBvbiA9IHZub2RlICYmIHZub2RlLmRhdGEub24sIGVsbSA9ICh2bm9kZSAmJiB2bm9kZS5lbG0pLCBuYW1lO1xuICAgIC8vIG9wdGltaXphdGlvbiBmb3IgcmV1c2VkIGltbXV0YWJsZSBoYW5kbGVyc1xuICAgIGlmIChvbGRPbiA9PT0gb24pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyByZW1vdmUgZXhpc3RpbmcgbGlzdGVuZXJzIHdoaWNoIG5vIGxvbmdlciB1c2VkXG4gICAgaWYgKG9sZE9uICYmIG9sZExpc3RlbmVyKSB7XG4gICAgICAgIC8vIGlmIGVsZW1lbnQgY2hhbmdlZCBvciBkZWxldGVkIHdlIHJlbW92ZSBhbGwgZXhpc3RpbmcgbGlzdGVuZXJzIHVuY29uZGl0aW9uYWxseVxuICAgICAgICBpZiAoIW9uKSB7XG4gICAgICAgICAgICBmb3IgKG5hbWUgaW4gb2xkT24pIHtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgbGlzdGVuZXIgaWYgZWxlbWVudCB3YXMgY2hhbmdlZCBvciBleGlzdGluZyBsaXN0ZW5lcnMgcmVtb3ZlZFxuICAgICAgICAgICAgICAgIG9sZEVsbS5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIG9sZExpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKG5hbWUgaW4gb2xkT24pIHtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgbGlzdGVuZXIgaWYgZXhpc3RpbmcgbGlzdGVuZXIgcmVtb3ZlZFxuICAgICAgICAgICAgICAgIGlmICghb25bbmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgb2xkRWxtLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgb2xkTGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gYWRkIG5ldyBsaXN0ZW5lcnMgd2hpY2ggaGFzIG5vdCBhbHJlYWR5IGF0dGFjaGVkXG4gICAgaWYgKG9uKSB7XG4gICAgICAgIC8vIHJldXNlIGV4aXN0aW5nIGxpc3RlbmVyIG9yIGNyZWF0ZSBuZXdcbiAgICAgICAgdmFyIGxpc3RlbmVyID0gdm5vZGUubGlzdGVuZXIgPSBvbGRWbm9kZS5saXN0ZW5lciB8fCBjcmVhdGVMaXN0ZW5lcigpO1xuICAgICAgICAvLyB1cGRhdGUgdm5vZGUgZm9yIGxpc3RlbmVyXG4gICAgICAgIGxpc3RlbmVyLnZub2RlID0gdm5vZGU7XG4gICAgICAgIC8vIGlmIGVsZW1lbnQgY2hhbmdlZCBvciBhZGRlZCB3ZSBhZGQgYWxsIG5lZWRlZCBsaXN0ZW5lcnMgdW5jb25kaXRpb25hbGx5XG4gICAgICAgIGlmICghb2xkT24pIHtcbiAgICAgICAgICAgIGZvciAobmFtZSBpbiBvbikge1xuICAgICAgICAgICAgICAgIC8vIGFkZCBsaXN0ZW5lciBpZiBlbGVtZW50IHdhcyBjaGFuZ2VkIG9yIG5ldyBsaXN0ZW5lcnMgYWRkZWRcbiAgICAgICAgICAgICAgICBlbG0uYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChuYW1lIGluIG9uKSB7XG4gICAgICAgICAgICAgICAgLy8gYWRkIGxpc3RlbmVyIGlmIG5ldyBsaXN0ZW5lciBhZGRlZFxuICAgICAgICAgICAgICAgIGlmICghb2xkT25bbmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmV2ZW50TGlzdGVuZXJzTW9kdWxlID0ge1xuICAgIGNyZWF0ZTogdXBkYXRlRXZlbnRMaXN0ZW5lcnMsXG4gICAgdXBkYXRlOiB1cGRhdGVFdmVudExpc3RlbmVycyxcbiAgICBkZXN0cm95OiB1cGRhdGVFdmVudExpc3RlbmVyc1xufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZXZlbnRMaXN0ZW5lcnNNb2R1bGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ldmVudGxpc3RlbmVycy5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zbmFiYmRvbS9tb2R1bGVzL2V2ZW50bGlzdGVuZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHhsaW5rTlMgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc7XG52YXIgeG1sTlMgPSAnaHR0cDovL3d3dy53My5vcmcvWE1MLzE5OTgvbmFtZXNwYWNlJztcbnZhciBjb2xvbkNoYXIgPSA1ODtcbnZhciB4Q2hhciA9IDEyMDtcbmZ1bmN0aW9uIHVwZGF0ZUF0dHJzKG9sZFZub2RlLCB2bm9kZSkge1xuICAgIHZhciBrZXksIGVsbSA9IHZub2RlLmVsbSwgb2xkQXR0cnMgPSBvbGRWbm9kZS5kYXRhLmF0dHJzLCBhdHRycyA9IHZub2RlLmRhdGEuYXR0cnM7XG4gICAgaWYgKCFvbGRBdHRycyAmJiAhYXR0cnMpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAob2xkQXR0cnMgPT09IGF0dHJzKVxuICAgICAgICByZXR1cm47XG4gICAgb2xkQXR0cnMgPSBvbGRBdHRycyB8fCB7fTtcbiAgICBhdHRycyA9IGF0dHJzIHx8IHt9O1xuICAgIC8vIHVwZGF0ZSBtb2RpZmllZCBhdHRyaWJ1dGVzLCBhZGQgbmV3IGF0dHJpYnV0ZXNcbiAgICBmb3IgKGtleSBpbiBhdHRycykge1xuICAgICAgICB2YXIgY3VyID0gYXR0cnNba2V5XTtcbiAgICAgICAgdmFyIG9sZCA9IG9sZEF0dHJzW2tleV07XG4gICAgICAgIGlmIChvbGQgIT09IGN1cikge1xuICAgICAgICAgICAgaWYgKGN1ciA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoa2V5LCBcIlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGN1ciA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBlbG0ucmVtb3ZlQXR0cmlidXRlKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5LmNoYXJDb2RlQXQoMCkgIT09IHhDaGFyKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoa2V5LCBjdXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrZXkuY2hhckNvZGVBdCgzKSA9PT0gY29sb25DaGFyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFzc3VtZSB4bWwgbmFtZXNwYWNlXG4gICAgICAgICAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGVOUyh4bWxOUywga2V5LCBjdXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrZXkuY2hhckNvZGVBdCg1KSA9PT0gY29sb25DaGFyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFzc3VtZSB4bGluayBuYW1lc3BhY2VcbiAgICAgICAgICAgICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZU5TKHhsaW5rTlMsIGtleSwgY3VyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoa2V5LCBjdXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyByZW1vdmUgcmVtb3ZlZCBhdHRyaWJ1dGVzXG4gICAgLy8gdXNlIGBpbmAgb3BlcmF0b3Igc2luY2UgdGhlIHByZXZpb3VzIGBmb3JgIGl0ZXJhdGlvbiB1c2VzIGl0ICguaS5lLiBhZGQgZXZlbiBhdHRyaWJ1dGVzIHdpdGggdW5kZWZpbmVkIHZhbHVlKVxuICAgIC8vIHRoZSBvdGhlciBvcHRpb24gaXMgdG8gcmVtb3ZlIGFsbCBhdHRyaWJ1dGVzIHdpdGggdmFsdWUgPT0gdW5kZWZpbmVkXG4gICAgZm9yIChrZXkgaW4gb2xkQXR0cnMpIHtcbiAgICAgICAgaWYgKCEoa2V5IGluIGF0dHJzKSkge1xuICAgICAgICAgICAgZWxtLnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5hdHRyaWJ1dGVzTW9kdWxlID0geyBjcmVhdGU6IHVwZGF0ZUF0dHJzLCB1cGRhdGU6IHVwZGF0ZUF0dHJzIH07XG5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmF0dHJpYnV0ZXNNb2R1bGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hdHRyaWJ1dGVzLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NuYWJiZG9tL21vZHVsZXMvYXR0cmlidXRlcy5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIHVwZGF0ZVByb3BzKG9sZFZub2RlLCB2bm9kZSkge1xuICAgIHZhciBrZXksIGN1ciwgb2xkLCBlbG0gPSB2bm9kZS5lbG0sIG9sZFByb3BzID0gb2xkVm5vZGUuZGF0YS5wcm9wcywgcHJvcHMgPSB2bm9kZS5kYXRhLnByb3BzO1xuICAgIGlmICghb2xkUHJvcHMgJiYgIXByb3BzKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKG9sZFByb3BzID09PSBwcm9wcylcbiAgICAgICAgcmV0dXJuO1xuICAgIG9sZFByb3BzID0gb2xkUHJvcHMgfHwge307XG4gICAgcHJvcHMgPSBwcm9wcyB8fCB7fTtcbiAgICBmb3IgKGtleSBpbiBvbGRQcm9wcykge1xuICAgICAgICBpZiAoIXByb3BzW2tleV0pIHtcbiAgICAgICAgICAgIGRlbGV0ZSBlbG1ba2V5XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGtleSBpbiBwcm9wcykge1xuICAgICAgICBjdXIgPSBwcm9wc1trZXldO1xuICAgICAgICBvbGQgPSBvbGRQcm9wc1trZXldO1xuICAgICAgICBpZiAob2xkICE9PSBjdXIgJiYgKGtleSAhPT0gJ3ZhbHVlJyB8fCBlbG1ba2V5XSAhPT0gY3VyKSkge1xuICAgICAgICAgICAgZWxtW2tleV0gPSBjdXI7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLnByb3BzTW9kdWxlID0geyBjcmVhdGU6IHVwZGF0ZVByb3BzLCB1cGRhdGU6IHVwZGF0ZVByb3BzIH07XG5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLnByb3BzTW9kdWxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJvcHMuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc25hYmJkb20vbW9kdWxlcy9wcm9wcy5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFN0cmVhbSAoc291cmNlKSB7XG4gIHRoaXMuc291cmNlID0gc291cmNlXG59XG5cblN0cmVhbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gdGhpcy5zb3VyY2UucnVuKHNpbmssIHNjaGVkdWxlcilcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL1N0cmVhbS5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5pbXBvcnQgRGlzcG9zYWJsZSBmcm9tICcuL0Rpc3Bvc2FibGUnXG5pbXBvcnQgU2V0dGFibGVEaXNwb3NhYmxlIGZyb20gJy4vU2V0dGFibGVEaXNwb3NhYmxlJ1xuaW1wb3J0IHsgaXNQcm9taXNlIH0gZnJvbSAnLi4vUHJvbWlzZSdcbmltcG9ydCAqIGFzIGJhc2UgZnJvbSAnQG1vc3QvcHJlbHVkZSdcblxudmFyIG1hcCA9IGJhc2UubWFwXG52YXIgaWRlbnRpdHkgPSBiYXNlLmlkXG5cbi8qKlxuICogQ2FsbCBkaXNwb3NhYmxlLmRpc3Bvc2UuICBJZiBpdCByZXR1cm5zIGEgcHJvbWlzZSwgY2F0Y2ggcHJvbWlzZVxuICogZXJyb3IgYW5kIGZvcndhcmQgaXQgdGhyb3VnaCB0aGUgcHJvdmlkZWQgc2luay5cbiAqIEBwYXJhbSB7bnVtYmVyfSB0IHRpbWVcbiAqIEBwYXJhbSB7e2Rpc3Bvc2U6IGZ1bmN0aW9ufX0gZGlzcG9zYWJsZVxuICogQHBhcmFtIHt7ZXJyb3I6IGZ1bmN0aW9ufX0gc2lua1xuICogQHJldHVybiB7Kn0gcmVzdWx0IG9mIGRpc3Bvc2FibGUuZGlzcG9zZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJ5RGlzcG9zZSAodCwgZGlzcG9zYWJsZSwgc2luaykge1xuICB2YXIgcmVzdWx0ID0gZGlzcG9zZVNhZmVseShkaXNwb3NhYmxlKVxuICByZXR1cm4gaXNQcm9taXNlKHJlc3VsdClcbiAgICA/IHJlc3VsdC5jYXRjaChmdW5jdGlvbiAoZSkge1xuICAgICAgc2luay5lcnJvcih0LCBlKVxuICAgIH0pXG4gICAgOiByZXN1bHRcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgRGlzcG9zYWJsZSB3aGljaCB3aWxsIGRpc3Bvc2UgaXRzIHVuZGVybHlpbmcgcmVzb3VyY2VcbiAqIGF0IG1vc3Qgb25jZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGRpc3Bvc2UgZnVuY3Rpb25cbiAqIEBwYXJhbSB7Kj99IGRhdGEgYW55IGRhdGEgdG8gYmUgcGFzc2VkIHRvIGRpc3Bvc2VyIGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtEaXNwb3NhYmxlfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlIChkaXNwb3NlLCBkYXRhKSB7XG4gIHJldHVybiBvbmNlKG5ldyBEaXNwb3NhYmxlKGRpc3Bvc2UsIGRhdGEpKVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIG5vb3AgZGlzcG9zYWJsZS4gQ2FuIGJlIHVzZWQgdG8gc2F0aXNmeSBhIERpc3Bvc2FibGVcbiAqIHJlcXVpcmVtZW50IHdoZW4gbm8gYWN0dWFsIHJlc291cmNlIG5lZWRzIHRvIGJlIGRpc3Bvc2VkLlxuICogQHJldHVybiB7RGlzcG9zYWJsZXxleHBvcnRzfG1vZHVsZS5leHBvcnRzfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZW1wdHkgKCkge1xuICByZXR1cm4gbmV3IERpc3Bvc2FibGUoaWRlbnRpdHksIHZvaWQgMClcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBkaXNwb3NhYmxlIHRoYXQgd2lsbCBkaXNwb3NlIGFsbCBpbnB1dCBkaXNwb3NhYmxlcyBpbiBwYXJhbGxlbC5cbiAqIEBwYXJhbSB7QXJyYXk8RGlzcG9zYWJsZT59IGRpc3Bvc2FibGVzXG4gKiBAcmV0dXJuIHtEaXNwb3NhYmxlfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYWxsIChkaXNwb3NhYmxlcykge1xuICByZXR1cm4gY3JlYXRlKGRpc3Bvc2VBbGwsIGRpc3Bvc2FibGVzKVxufVxuXG5mdW5jdGlvbiBkaXNwb3NlQWxsIChkaXNwb3NhYmxlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwobWFwKGRpc3Bvc2VTYWZlbHksIGRpc3Bvc2FibGVzKSlcbn1cblxuZnVuY3Rpb24gZGlzcG9zZVNhZmVseSAoZGlzcG9zYWJsZSkge1xuICB0cnkge1xuICAgIHJldHVybiBkaXNwb3NhYmxlLmRpc3Bvc2UoKVxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGUpXG4gIH1cbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBkaXNwb3NhYmxlIGZyb20gYSBwcm9taXNlIGZvciBhbm90aGVyIGRpc3Bvc2FibGVcbiAqIEBwYXJhbSB7UHJvbWlzZTxEaXNwb3NhYmxlPn0gZGlzcG9zYWJsZVByb21pc2VcbiAqIEByZXR1cm4ge0Rpc3Bvc2FibGV9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9taXNlZCAoZGlzcG9zYWJsZVByb21pc2UpIHtcbiAgcmV0dXJuIGNyZWF0ZShkaXNwb3NlUHJvbWlzZSwgZGlzcG9zYWJsZVByb21pc2UpXG59XG5cbmZ1bmN0aW9uIGRpc3Bvc2VQcm9taXNlIChkaXNwb3NhYmxlUHJvbWlzZSkge1xuICByZXR1cm4gZGlzcG9zYWJsZVByb21pc2UudGhlbihkaXNwb3NlT25lKVxufVxuXG5mdW5jdGlvbiBkaXNwb3NlT25lIChkaXNwb3NhYmxlKSB7XG4gIHJldHVybiBkaXNwb3NhYmxlLmRpc3Bvc2UoKVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIGRpc3Bvc2FibGUgcHJveHkgdGhhdCBhbGxvd3MgaXRzIHVuZGVybHlpbmcgZGlzcG9zYWJsZSB0b1xuICogYmUgc2V0IGxhdGVyLlxuICogQHJldHVybiB7U2V0dGFibGVEaXNwb3NhYmxlfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0dGFibGUgKCkge1xuICByZXR1cm4gbmV3IFNldHRhYmxlRGlzcG9zYWJsZSgpXG59XG5cbi8qKlxuICogV3JhcCBhbiBleGlzdGluZyBkaXNwb3NhYmxlICh3aGljaCBtYXkgbm90IGFscmVhZHkgaGF2ZSBiZWVuIG9uY2UoKWQpXG4gKiBzbyB0aGF0IGl0IHdpbGwgb25seSBkaXNwb3NlIGl0cyB1bmRlcmx5aW5nIHJlc291cmNlIGF0IG1vc3Qgb25jZS5cbiAqIEBwYXJhbSB7eyBkaXNwb3NlOiBmdW5jdGlvbigpIH19IGRpc3Bvc2FibGVcbiAqIEByZXR1cm4ge0Rpc3Bvc2FibGV9IHdyYXBwZWQgZGlzcG9zYWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gb25jZSAoZGlzcG9zYWJsZSkge1xuICByZXR1cm4gbmV3IERpc3Bvc2FibGUoZGlzcG9zZU1lbW9pemVkLCBtZW1vaXplZChkaXNwb3NhYmxlKSlcbn1cblxuZnVuY3Rpb24gZGlzcG9zZU1lbW9pemVkIChtZW1vaXplZCkge1xuICBpZiAoIW1lbW9pemVkLmRpc3Bvc2VkKSB7XG4gICAgbWVtb2l6ZWQuZGlzcG9zZWQgPSB0cnVlXG4gICAgbWVtb2l6ZWQudmFsdWUgPSBkaXNwb3NlU2FmZWx5KG1lbW9pemVkLmRpc3Bvc2FibGUpXG4gICAgbWVtb2l6ZWQuZGlzcG9zYWJsZSA9IHZvaWQgMFxuICB9XG5cbiAgcmV0dXJuIG1lbW9pemVkLnZhbHVlXG59XG5cbmZ1bmN0aW9uIG1lbW9pemVkIChkaXNwb3NhYmxlKSB7XG4gIHJldHVybiB7IGRpc3Bvc2VkOiBmYWxzZSwgZGlzcG9zYWJsZTogZGlzcG9zYWJsZSwgdmFsdWU6IHZvaWQgMCB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9kaXNwb3NhYmxlL2Rpc3Bvc2UuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG4vKipcbiAqIEEgc2luayBtaXhpbiB0aGF0IHNpbXBseSBmb3J3YXJkcyBldmVudCwgZW5kLCBhbmQgZXJyb3IgdG9cbiAqIGFub3RoZXIgc2luay5cbiAqIEBwYXJhbSBzaW5rXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGlwZSAoc2luaykge1xuICB0aGlzLnNpbmsgPSBzaW5rXG59XG5cblBpcGUucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgcmV0dXJuIHRoaXMuc2luay5ldmVudCh0LCB4KVxufVxuXG5QaXBlLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAodCwgeCkge1xuICByZXR1cm4gdGhpcy5zaW5rLmVuZCh0LCB4KVxufVxuXG5QaXBlLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uICh0LCBlKSB7XG4gIHJldHVybiB0aGlzLnNpbmsuZXJyb3IodCwgZSlcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NpbmsvUGlwZS5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG5cbi8vIE5vbi1tdXRhdGluZyBhcnJheSBvcGVyYXRpb25zXG5cbi8vIGNvbnMgOjogYSAtPiBbYV0gLT4gW2FdXG4vLyBhIHdpdGggeCBwcmVwZW5kZWRcbmZ1bmN0aW9uIGNvbnMoeCwgYSkge1xuICB2YXIgbCA9IGEubGVuZ3RoO1xuICB2YXIgYiA9IG5ldyBBcnJheShsICsgMSk7XG4gIGJbMF0gPSB4O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGw7ICsraSkge1xuICAgIGJbaSArIDFdID0gYVtpXTtcbiAgfVxuICByZXR1cm4gYjtcbn1cblxuLy8gYXBwZW5kIDo6IGEgLT4gW2FdIC0+IFthXVxuLy8gYSB3aXRoIHggYXBwZW5kZWRcbmZ1bmN0aW9uIGFwcGVuZCh4LCBhKSB7XG4gIHZhciBsID0gYS5sZW5ndGg7XG4gIHZhciBiID0gbmV3IEFycmF5KGwgKyAxKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyArK2kpIHtcbiAgICBiW2ldID0gYVtpXTtcbiAgfVxuXG4gIGJbbF0gPSB4O1xuICByZXR1cm4gYjtcbn1cblxuLy8gZHJvcCA6OiBJbnQgLT4gW2FdIC0+IFthXVxuLy8gZHJvcCBmaXJzdCBuIGVsZW1lbnRzXG5mdW5jdGlvbiBkcm9wKG4sIGEpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjb21wbGV4aXR5XG4gIGlmIChuIDwgMCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ24gbXVzdCBiZSA+PSAwJyk7XG4gIH1cblxuICB2YXIgbCA9IGEubGVuZ3RoO1xuICBpZiAobiA9PT0gMCB8fCBsID09PSAwKSB7XG4gICAgcmV0dXJuIGE7XG4gIH1cblxuICBpZiAobiA+PSBsKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgcmV0dXJuIHVuc2FmZURyb3AobiwgYSwgbCAtIG4pO1xufVxuXG4vLyB1bnNhZmVEcm9wIDo6IEludCAtPiBbYV0gLT4gSW50IC0+IFthXVxuLy8gSW50ZXJuYWwgaGVscGVyIGZvciBkcm9wXG5mdW5jdGlvbiB1bnNhZmVEcm9wKG4sIGEsIGwpIHtcbiAgdmFyIGIgPSBuZXcgQXJyYXkobCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgKytpKSB7XG4gICAgYltpXSA9IGFbbiArIGldO1xuICB9XG4gIHJldHVybiBiO1xufVxuXG4vLyB0YWlsIDo6IFthXSAtPiBbYV1cbi8vIGRyb3AgaGVhZCBlbGVtZW50XG5mdW5jdGlvbiB0YWlsKGEpIHtcbiAgcmV0dXJuIGRyb3AoMSwgYSk7XG59XG5cbi8vIGNvcHkgOjogW2FdIC0+IFthXVxuLy8gZHVwbGljYXRlIGEgKHNoYWxsb3cgZHVwbGljYXRpb24pXG5mdW5jdGlvbiBjb3B5KGEpIHtcbiAgdmFyIGwgPSBhLmxlbmd0aDtcbiAgdmFyIGIgPSBuZXcgQXJyYXkobCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgKytpKSB7XG4gICAgYltpXSA9IGFbaV07XG4gIH1cbiAgcmV0dXJuIGI7XG59XG5cbi8vIG1hcCA6OiAoYSAtPiBiKSAtPiBbYV0gLT4gW2JdXG4vLyB0cmFuc2Zvcm0gZWFjaCBlbGVtZW50IHdpdGggZlxuZnVuY3Rpb24gbWFwKGYsIGEpIHtcbiAgdmFyIGwgPSBhLmxlbmd0aDtcbiAgdmFyIGIgPSBuZXcgQXJyYXkobCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgKytpKSB7XG4gICAgYltpXSA9IGYoYVtpXSk7XG4gIH1cbiAgcmV0dXJuIGI7XG59XG5cbi8vIHJlZHVjZSA6OiAoYSAtPiBiIC0+IGEpIC0+IGEgLT4gW2JdIC0+IGFcbi8vIGFjY3VtdWxhdGUgdmlhIGxlZnQtZm9sZFxuZnVuY3Rpb24gcmVkdWNlKGYsIHosIGEpIHtcbiAgdmFyIHIgPSB6O1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGEubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgciA9IGYociwgYVtpXSwgaSk7XG4gIH1cbiAgcmV0dXJuIHI7XG59XG5cbi8vIHJlcGxhY2UgOjogYSAtPiBJbnQgLT4gW2FdXG4vLyByZXBsYWNlIGVsZW1lbnQgYXQgaW5kZXhcbmZ1bmN0aW9uIHJlcGxhY2UoeCwgaSwgYSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNvbXBsZXhpdHlcbiAgaWYgKGkgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaSBtdXN0IGJlID49IDAnKTtcbiAgfVxuXG4gIHZhciBsID0gYS5sZW5ndGg7XG4gIHZhciBiID0gbmV3IEFycmF5KGwpO1xuICBmb3IgKHZhciBqID0gMDsgaiA8IGw7ICsraikge1xuICAgIGJbal0gPSBpID09PSBqID8geCA6IGFbal07XG4gIH1cbiAgcmV0dXJuIGI7XG59XG5cbi8vIHJlbW92ZSA6OiBJbnQgLT4gW2FdIC0+IFthXVxuLy8gcmVtb3ZlIGVsZW1lbnQgYXQgaW5kZXhcbmZ1bmN0aW9uIHJlbW92ZShpLCBhKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY29tcGxleGl0eVxuICBpZiAoaSA8IDApIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpIG11c3QgYmUgPj0gMCcpO1xuICB9XG5cbiAgdmFyIGwgPSBhLmxlbmd0aDtcbiAgaWYgKGwgPT09IDAgfHwgaSA+PSBsKSB7XG4gICAgLy8gZXhpdCBlYXJseSBpZiBpbmRleCBiZXlvbmQgZW5kIG9mIGFycmF5XG4gICAgcmV0dXJuIGE7XG4gIH1cblxuICBpZiAobCA9PT0gMSkge1xuICAgIC8vIGV4aXQgZWFybHkgaWYgaW5kZXggaW4gYm91bmRzIGFuZCBsZW5ndGggPT09IDFcbiAgICByZXR1cm4gW107XG4gIH1cblxuICByZXR1cm4gdW5zYWZlUmVtb3ZlKGksIGEsIGwgLSAxKTtcbn1cblxuLy8gdW5zYWZlUmVtb3ZlIDo6IEludCAtPiBbYV0gLT4gSW50IC0+IFthXVxuLy8gSW50ZXJuYWwgaGVscGVyIHRvIHJlbW92ZSBlbGVtZW50IGF0IGluZGV4XG5mdW5jdGlvbiB1bnNhZmVSZW1vdmUoaSwgYSwgbCkge1xuICB2YXIgYiA9IG5ldyBBcnJheShsKTtcbiAgdmFyIGogPSB2b2lkIDA7XG4gIGZvciAoaiA9IDA7IGogPCBpOyArK2opIHtcbiAgICBiW2pdID0gYVtqXTtcbiAgfVxuICBmb3IgKGogPSBpOyBqIDwgbDsgKytqKSB7XG4gICAgYltqXSA9IGFbaiArIDFdO1xuICB9XG5cbiAgcmV0dXJuIGI7XG59XG5cbi8vIHJlbW92ZUFsbCA6OiAoYSAtPiBib29sZWFuKSAtPiBbYV0gLT4gW2FdXG4vLyByZW1vdmUgYWxsIGVsZW1lbnRzIG1hdGNoaW5nIGEgcHJlZGljYXRlXG5mdW5jdGlvbiByZW1vdmVBbGwoZiwgYSkge1xuICB2YXIgbCA9IGEubGVuZ3RoO1xuICB2YXIgYiA9IG5ldyBBcnJheShsKTtcbiAgdmFyIGogPSAwO1xuICBmb3IgKHZhciB4LCBpID0gMDsgaSA8IGw7ICsraSkge1xuICAgIHggPSBhW2ldO1xuICAgIGlmICghZih4KSkge1xuICAgICAgYltqXSA9IHg7XG4gICAgICArK2o7XG4gICAgfVxuICB9XG5cbiAgYi5sZW5ndGggPSBqO1xuICByZXR1cm4gYjtcbn1cblxuLy8gZmluZEluZGV4IDo6IGEgLT4gW2FdIC0+IEludFxuLy8gZmluZCBpbmRleCBvZiB4IGluIGEsIGZyb20gdGhlIGxlZnRcbmZ1bmN0aW9uIGZpbmRJbmRleCh4LCBhKSB7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gYS5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBpZiAoeCA9PT0gYVtpXSkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLy8gaXNBcnJheUxpa2UgOjogKiAtPiBib29sZWFuXG4vLyBSZXR1cm4gdHJ1ZSBpZmYgeCBpcyBhcnJheS1saWtlXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh4KSB7XG4gIHJldHVybiB4ICE9IG51bGwgJiYgdHlwZW9mIHgubGVuZ3RoID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgeCAhPT0gJ2Z1bmN0aW9uJztcbn1cblxuLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG5cbi8vIGlkIDo6IGEgLT4gYVxudmFyIGlkID0gZnVuY3Rpb24gaWQoeCkge1xuICByZXR1cm4geDtcbn07XG5cbi8vIGNvbXBvc2UgOjogKGIgLT4gYykgLT4gKGEgLT4gYikgLT4gKGEgLT4gYylcbnZhciBjb21wb3NlID0gZnVuY3Rpb24gY29tcG9zZShmLCBnKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiBmKGcoeCkpO1xuICB9O1xufTtcblxuLy8gYXBwbHkgOjogKGEgLT4gYikgLT4gYSAtPiBiXG52YXIgYXBwbHkgPSBmdW5jdGlvbiBhcHBseShmLCB4KSB7XG4gIHJldHVybiBmKHgpO1xufTtcblxuLy8gY3VycnkyIDo6ICgoYSwgYikgLT4gYykgLT4gKGEgLT4gYiAtPiBjKVxuZnVuY3Rpb24gY3VycnkyKGYpIHtcbiAgZnVuY3Rpb24gY3VycmllZChhLCBiKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHJldHVybiBjdXJyaWVkO1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGIpIHtcbiAgICAgICAgICByZXR1cm4gZihhLCBiKTtcbiAgICAgICAgfTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmKGEsIGIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY3VycmllZDtcbn1cblxuLy8gY3VycnkzIDo6ICgoYSwgYiwgYykgLT4gZCkgLT4gKGEgLT4gYiAtPiBjIC0+IGQpXG5mdW5jdGlvbiBjdXJyeTMoZikge1xuICBmdW5jdGlvbiBjdXJyaWVkKGEsIGIsIGMpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNvbXBsZXhpdHlcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIGN1cnJpZWQ7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBjdXJyeTIoZnVuY3Rpb24gKGIsIGMpIHtcbiAgICAgICAgICByZXR1cm4gZihhLCBiLCBjKTtcbiAgICAgICAgfSk7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoYykge1xuICAgICAgICAgIHJldHVybiBmKGEsIGIsIGMpO1xuICAgICAgICB9O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGYoYSwgYiwgYyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBjdXJyaWVkO1xufVxuXG4vLyBjdXJyeTQgOjogKChhLCBiLCBjLCBkKSAtPiBlKSAtPiAoYSAtPiBiIC0+IGMgLT4gZCAtPiBlKVxuZnVuY3Rpb24gY3Vycnk0KGYpIHtcbiAgZnVuY3Rpb24gY3VycmllZChhLCBiLCBjLCBkKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjb21wbGV4aXR5XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHJldHVybiBjdXJyaWVkO1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gY3VycnkzKGZ1bmN0aW9uIChiLCBjLCBkKSB7XG4gICAgICAgICAgcmV0dXJuIGYoYSwgYiwgYywgZCk7XG4gICAgICAgIH0pO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gY3VycnkyKGZ1bmN0aW9uIChjLCBkKSB7XG4gICAgICAgICAgcmV0dXJuIGYoYSwgYiwgYywgZCk7XG4gICAgICAgIH0pO1xuICAgICAgY2FzZSAzOlxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICByZXR1cm4gZihhLCBiLCBjLCBkKTtcbiAgICAgICAgfTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmKGEsIGIsIGMsIGQpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY3VycmllZDtcbn1cblxuLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuXG5leHBvcnQgeyBjb25zLCBhcHBlbmQsIGRyb3AsIHRhaWwsIGNvcHksIG1hcCwgcmVkdWNlLCByZXBsYWNlLCByZW1vdmUsIHJlbW92ZUFsbCwgZmluZEluZGV4LCBpc0FycmF5TGlrZSwgaWQsIGNvbXBvc2UsIGFwcGx5LCBjdXJyeTIsIGN1cnJ5MywgY3Vycnk0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5lcy5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0Btb3N0L3ByZWx1ZGUvZGlzdC9pbmRleC5lcy5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBmYXRhbCBmcm9tICcuLi9mYXRhbEVycm9yJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQcm9wYWdhdGVUYXNrIChydW4sIHZhbHVlLCBzaW5rKSB7XG4gIHRoaXMuX3J1biA9IHJ1blxuICB0aGlzLnZhbHVlID0gdmFsdWVcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLmFjdGl2ZSA9IHRydWVcbn1cblxuUHJvcGFnYXRlVGFzay5ldmVudCA9IGZ1bmN0aW9uICh2YWx1ZSwgc2luaykge1xuICByZXR1cm4gbmV3IFByb3BhZ2F0ZVRhc2soZW1pdCwgdmFsdWUsIHNpbmspXG59XG5cblByb3BhZ2F0ZVRhc2suZW5kID0gZnVuY3Rpb24gKHZhbHVlLCBzaW5rKSB7XG4gIHJldHVybiBuZXcgUHJvcGFnYXRlVGFzayhlbmQsIHZhbHVlLCBzaW5rKVxufVxuXG5Qcm9wYWdhdGVUYXNrLmVycm9yID0gZnVuY3Rpb24gKHZhbHVlLCBzaW5rKSB7XG4gIHJldHVybiBuZXcgUHJvcGFnYXRlVGFzayhlcnJvciwgdmFsdWUsIHNpbmspXG59XG5cblByb3BhZ2F0ZVRhc2sucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuYWN0aXZlID0gZmFsc2Vcbn1cblxuUHJvcGFnYXRlVGFzay5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHQpIHtcbiAgaWYgKCF0aGlzLmFjdGl2ZSkge1xuICAgIHJldHVyblxuICB9XG4gIHRoaXMuX3J1bih0LCB0aGlzLnZhbHVlLCB0aGlzLnNpbmspXG59XG5cblByb3BhZ2F0ZVRhc2sucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKHQsIGUpIHtcbiAgaWYgKCF0aGlzLmFjdGl2ZSkge1xuICAgIHJldHVybiBmYXRhbChlKVxuICB9XG4gIHRoaXMuc2luay5lcnJvcih0LCBlKVxufVxuXG5mdW5jdGlvbiBlcnJvciAodCwgZSwgc2luaykge1xuICBzaW5rLmVycm9yKHQsIGUpXG59XG5cbmZ1bmN0aW9uIGVtaXQgKHQsIHgsIHNpbmspIHtcbiAgc2luay5ldmVudCh0LCB4KVxufVxuXG5mdW5jdGlvbiBlbmQgKHQsIHgsIHNpbmspIHtcbiAgc2luay5lbmQodCwgeClcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NjaGVkdWxlci9Qcm9wYWdhdGVUYXNrLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFN0cmVhbSBmcm9tICcuLi9TdHJlYW0nXG5pbXBvcnQgKiBhcyBkaXNwb3NlIGZyb20gJy4uL2Rpc3Bvc2FibGUvZGlzcG9zZSdcbmltcG9ydCBQcm9wYWdhdGVUYXNrIGZyb20gJy4uL3NjaGVkdWxlci9Qcm9wYWdhdGVUYXNrJ1xuXG4vKipcbiAqIFN0cmVhbSBjb250YWluaW5nIG9ubHkgeFxuICogQHBhcmFtIHsqfSB4XG4gKiBAcmV0dXJucyB7U3RyZWFtfVxuICovXG5leHBvcnQgZnVuY3Rpb24gb2YgKHgpIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IEp1c3QoeCkpXG59XG5cbmZ1bmN0aW9uIEp1c3QgKHgpIHtcbiAgdGhpcy52YWx1ZSA9IHhcbn1cblxuSnVzdC5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gc2NoZWR1bGVyLmFzYXAobmV3IFByb3BhZ2F0ZVRhc2socnVuSnVzdCwgdGhpcy52YWx1ZSwgc2luaykpXG59XG5cbmZ1bmN0aW9uIHJ1bkp1c3QgKHQsIHgsIHNpbmspIHtcbiAgc2luay5ldmVudCh0LCB4KVxuICBzaW5rLmVuZCh0LCB2b2lkIDApXG59XG5cbi8qKlxuICogU3RyZWFtIGNvbnRhaW5pbmcgbm8gZXZlbnRzIGFuZCBlbmRzIGltbWVkaWF0ZWx5XG4gKiBAcmV0dXJucyB7U3RyZWFtfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZW1wdHkgKCkge1xuICByZXR1cm4gRU1QVFlcbn1cblxuZnVuY3Rpb24gRW1wdHlTb3VyY2UgKCkge31cblxuRW1wdHlTb3VyY2UucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdmFyIHRhc2sgPSBQcm9wYWdhdGVUYXNrLmVuZCh2b2lkIDAsIHNpbmspXG4gIHNjaGVkdWxlci5hc2FwKHRhc2spXG5cbiAgcmV0dXJuIGRpc3Bvc2UuY3JlYXRlKGRpc3Bvc2VFbXB0eSwgdGFzaylcbn1cblxuZnVuY3Rpb24gZGlzcG9zZUVtcHR5ICh0YXNrKSB7XG4gIHJldHVybiB0YXNrLmRpc3Bvc2UoKVxufVxuXG52YXIgRU1QVFkgPSBuZXcgU3RyZWFtKG5ldyBFbXB0eVNvdXJjZSgpKVxuXG4vKipcbiAqIFN0cmVhbSBjb250YWluaW5nIG5vIGV2ZW50cyBhbmQgbmV2ZXIgZW5kc1xuICogQHJldHVybnMge1N0cmVhbX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5ldmVyICgpIHtcbiAgcmV0dXJuIE5FVkVSXG59XG5cbmZ1bmN0aW9uIE5ldmVyU291cmNlICgpIHt9XG5cbk5ldmVyU291cmNlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBkaXNwb3NlLmVtcHR5KClcbn1cblxudmFyIE5FVkVSID0gbmV3IFN0cmVhbShuZXcgTmV2ZXJTb3VyY2UoKSlcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NvdXJjZS9jb3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHRyeUV2ZW50ICh0LCB4LCBzaW5rKSB7XG4gIHRyeSB7XG4gICAgc2luay5ldmVudCh0LCB4KVxuICB9IGNhdGNoIChlKSB7XG4gICAgc2luay5lcnJvcih0LCBlKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0cnlFbmQgKHQsIHgsIHNpbmspIHtcbiAgdHJ5IHtcbiAgICBzaW5rLmVuZCh0LCB4KVxuICB9IGNhdGNoIChlKSB7XG4gICAgc2luay5lcnJvcih0LCBlKVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zb3VyY2UvdHJ5RXZlbnQuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCBNYXAgZnJvbSAnLi4vZnVzaW9uL01hcCdcbmltcG9ydCBQaXBlIGZyb20gJy4uL3NpbmsvUGlwZSdcblxuLyoqXG4gKiBUcmFuc2Zvcm0gZWFjaCB2YWx1ZSBpbiB0aGUgc3RyZWFtIGJ5IGFwcGx5aW5nIGYgdG8gZWFjaFxuICogQHBhcmFtIHtmdW5jdGlvbigqKToqfSBmIG1hcHBpbmcgZnVuY3Rpb25cbiAqIEBwYXJhbSB7U3RyZWFtfSBzdHJlYW0gc3RyZWFtIHRvIG1hcFxuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIGNvbnRhaW5pbmcgaXRlbXMgdHJhbnNmb3JtZWQgYnkgZlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFwIChmLCBzdHJlYW0pIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0oTWFwLmNyZWF0ZShmLCBzdHJlYW0uc291cmNlKSlcbn1cblxuLyoqXG4qIFJlcGxhY2UgZWFjaCB2YWx1ZSBpbiB0aGUgc3RyZWFtIHdpdGggeFxuKiBAcGFyYW0geyp9IHhcbiogQHBhcmFtIHtTdHJlYW19IHN0cmVhbVxuKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gY29udGFpbmluZyBpdGVtcyByZXBsYWNlZCB3aXRoIHhcbiovXG5leHBvcnQgZnVuY3Rpb24gY29uc3RhbnQgKHgsIHN0cmVhbSkge1xuICByZXR1cm4gbWFwKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4geFxuICB9LCBzdHJlYW0pXG59XG5cbi8qKlxuKiBQZXJmb3JtIGEgc2lkZSBlZmZlY3QgZm9yIGVhY2ggaXRlbSBpbiB0aGUgc3RyZWFtXG4qIEBwYXJhbSB7ZnVuY3Rpb24oeDoqKToqfSBmIHNpZGUgZWZmZWN0IHRvIGV4ZWN1dGUgZm9yIGVhY2ggaXRlbS4gVGhlXG4qICByZXR1cm4gdmFsdWUgd2lsbCBiZSBkaXNjYXJkZWQuXG4qIEBwYXJhbSB7U3RyZWFtfSBzdHJlYW0gc3RyZWFtIHRvIHRhcFxuKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIGNvbnRhaW5pbmcgdGhlIHNhbWUgaXRlbXMgYXMgdGhpcyBzdHJlYW1cbiovXG5leHBvcnQgZnVuY3Rpb24gdGFwIChmLCBzdHJlYW0pIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IFRhcChmLCBzdHJlYW0uc291cmNlKSlcbn1cblxuZnVuY3Rpb24gVGFwIChmLCBzb3VyY2UpIHtcbiAgdGhpcy5zb3VyY2UgPSBzb3VyY2VcbiAgdGhpcy5mID0gZlxufVxuXG5UYXAucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgcmV0dXJuIHRoaXMuc291cmNlLnJ1bihuZXcgVGFwU2luayh0aGlzLmYsIHNpbmspLCBzY2hlZHVsZXIpXG59XG5cbmZ1bmN0aW9uIFRhcFNpbmsgKGYsIHNpbmspIHtcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLmYgPSBmXG59XG5cblRhcFNpbmsucHJvdG90eXBlLmVuZCA9IFBpcGUucHJvdG90eXBlLmVuZFxuVGFwU2luay5wcm90b3R5cGUuZXJyb3IgPSBQaXBlLnByb3RvdHlwZS5lcnJvclxuXG5UYXBTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHZhciBmID0gdGhpcy5mXG4gIGYoeClcbiAgdGhpcy5zaW5rLmV2ZW50KHQsIHgpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL3RyYW5zZm9ybS5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZhdGFsRXJyb3IgKGUpIHtcbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgdGhyb3cgZVxuICB9LCAwKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvZmF0YWxFcnJvci5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBTY2hlZHVsZXIgZnJvbSAnLi9TY2hlZHVsZXInXG5pbXBvcnQgQ2xvY2tUaW1lciBmcm9tICcuL0Nsb2NrVGltZXInXG5pbXBvcnQgVGltZWxpbmUgZnJvbSAnLi9UaW1lbGluZSdcblxudmFyIGRlZmF1bHRTY2hlZHVsZXIgPSBuZXcgU2NoZWR1bGVyKG5ldyBDbG9ja1RpbWVyKCksIG5ldyBUaW1lbGluZSgpKVxuXG5leHBvcnQgZGVmYXVsdCBkZWZhdWx0U2NoZWR1bGVyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zY2hlZHVsZXIvZGVmYXVsdFNjaGVkdWxlci5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZlciAodGFzaykge1xuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRhc2spLnRoZW4ocnVuVGFzaylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1blRhc2sgKHRhc2spIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gdGFzay5ydW4oKVxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRhc2suZXJyb3IoZSlcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvdGFzay5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBQaXBlIGZyb20gJy4uL3NpbmsvUGlwZSdcbmltcG9ydCBGaWx0ZXIgZnJvbSAnLi9GaWx0ZXInXG5pbXBvcnQgRmlsdGVyTWFwIGZyb20gJy4vRmlsdGVyTWFwJ1xuaW1wb3J0ICogYXMgYmFzZSBmcm9tICdAbW9zdC9wcmVsdWRlJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNYXAgKGYsIHNvdXJjZSkge1xuICB0aGlzLmYgPSBmXG4gIHRoaXMuc291cmNlID0gc291cmNlXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgbWFwcGVkIHNvdXJjZSwgZnVzaW5nIGFkamFjZW50IG1hcC5tYXAsIGZpbHRlci5tYXAsXG4gKiBhbmQgZmlsdGVyLm1hcC5tYXAgaWYgcG9zc2libGVcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKik6Kn0gZiBtYXBwaW5nIGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3tydW46ZnVuY3Rpb259fSBzb3VyY2Ugc291cmNlIHRvIG1hcFxuICogQHJldHVybnMge01hcHxGaWx0ZXJNYXB9IG1hcHBlZCBzb3VyY2UsIHBvc3NpYmx5IGZ1c2VkXG4gKi9cbk1hcC5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGVNYXAgKGYsIHNvdXJjZSkge1xuICBpZiAoc291cmNlIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgcmV0dXJuIG5ldyBNYXAoYmFzZS5jb21wb3NlKGYsIHNvdXJjZS5mKSwgc291cmNlLnNvdXJjZSlcbiAgfVxuXG4gIGlmIChzb3VyY2UgaW5zdGFuY2VvZiBGaWx0ZXIpIHtcbiAgICByZXR1cm4gbmV3IEZpbHRlck1hcChzb3VyY2UucCwgZiwgc291cmNlLnNvdXJjZSlcbiAgfVxuXG4gIHJldHVybiBuZXcgTWFwKGYsIHNvdXJjZSlcbn1cblxuTWFwLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZXh0ZW5kLW5hdGl2ZVxuICByZXR1cm4gdGhpcy5zb3VyY2UucnVuKG5ldyBNYXBTaW5rKHRoaXMuZiwgc2luayksIHNjaGVkdWxlcilcbn1cblxuZnVuY3Rpb24gTWFwU2luayAoZiwgc2luaykge1xuICB0aGlzLmYgPSBmXG4gIHRoaXMuc2luayA9IHNpbmtcbn1cblxuTWFwU2luay5wcm90b3R5cGUuZW5kID0gUGlwZS5wcm90b3R5cGUuZW5kXG5NYXBTaW5rLnByb3RvdHlwZS5lcnJvciA9IFBpcGUucHJvdG90eXBlLmVycm9yXG5cbk1hcFNpbmsucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgdmFyIGYgPSB0aGlzLmZcbiAgdGhpcy5zaW5rLmV2ZW50KHQsIGYoeCkpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9mdXNpb24vTWFwLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFNpbmsgZnJvbSAnLi9QaXBlJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBJbmRleFNpbmsgKGksIHNpbmspIHtcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLmluZGV4ID0gaVxuICB0aGlzLmFjdGl2ZSA9IHRydWVcbiAgdGhpcy52YWx1ZSA9IHZvaWQgMFxufVxuXG5JbmRleFNpbmsucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgaWYgKCF0aGlzLmFjdGl2ZSkge1xuICAgIHJldHVyblxuICB9XG4gIHRoaXMudmFsdWUgPSB4XG4gIHRoaXMuc2luay5ldmVudCh0LCB0aGlzKVxufVxuXG5JbmRleFNpbmsucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIGlmICghdGhpcy5hY3RpdmUpIHtcbiAgICByZXR1cm5cbiAgfVxuICB0aGlzLmFjdGl2ZSA9IGZhbHNlXG4gIHRoaXMuc2luay5lbmQodCwgeyBpbmRleDogdGhpcy5pbmRleCwgdmFsdWU6IHggfSlcbn1cblxuSW5kZXhTaW5rLnByb3RvdHlwZS5lcnJvciA9IFNpbmsucHJvdG90eXBlLmVycm9yXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zaW5rL0luZGV4U2luay5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGludm9rZSAoZiwgYXJncykge1xuXHQvKmVzbGludCBjb21wbGV4aXR5OiBbMiw3XSovXG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiBmKClcbiAgICBjYXNlIDE6IHJldHVybiBmKGFyZ3NbMF0pXG4gICAgY2FzZSAyOiByZXR1cm4gZihhcmdzWzBdLCBhcmdzWzFdKVxuICAgIGNhc2UgMzogcmV0dXJuIGYoYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSlcbiAgICBjYXNlIDQ6IHJldHVybiBmKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pXG4gICAgY2FzZSA1OiByZXR1cm4gZihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdLCBhcmdzWzRdKVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZi5hcHBseSh2b2lkIDAsIGFyZ3MpXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2ludm9rZS5qc1xuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBTdHJlYW0gZnJvbSAnLi4vU3RyZWFtJ1xuaW1wb3J0ICogYXMgZGlzcG9zZSBmcm9tICcuLi9kaXNwb3NhYmxlL2Rpc3Bvc2UnXG5pbXBvcnQgTGlua2VkTGlzdCBmcm9tICcuLi9MaW5rZWRMaXN0J1xuaW1wb3J0IHsgaWQgYXMgaWRlbnRpdHkgfSBmcm9tICdAbW9zdC9wcmVsdWRlJ1xuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VDb25jdXJyZW50bHkgKGNvbmN1cnJlbmN5LCBzdHJlYW0pIHtcbiAgcmV0dXJuIG1lcmdlTWFwQ29uY3VycmVudGx5KGlkZW50aXR5LCBjb25jdXJyZW5jeSwgc3RyZWFtKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VNYXBDb25jdXJyZW50bHkgKGYsIGNvbmN1cnJlbmN5LCBzdHJlYW0pIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IE1lcmdlQ29uY3VycmVudGx5KGYsIGNvbmN1cnJlbmN5LCBzdHJlYW0uc291cmNlKSlcbn1cblxuZnVuY3Rpb24gTWVyZ2VDb25jdXJyZW50bHkgKGYsIGNvbmN1cnJlbmN5LCBzb3VyY2UpIHtcbiAgdGhpcy5mID0gZlxuICB0aGlzLmNvbmN1cnJlbmN5ID0gY29uY3VycmVuY3lcbiAgdGhpcy5zb3VyY2UgPSBzb3VyY2Vcbn1cblxuTWVyZ2VDb25jdXJyZW50bHkucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgcmV0dXJuIG5ldyBPdXRlcih0aGlzLmYsIHRoaXMuY29uY3VycmVuY3ksIHRoaXMuc291cmNlLCBzaW5rLCBzY2hlZHVsZXIpXG59XG5cbmZ1bmN0aW9uIE91dGVyIChmLCBjb25jdXJyZW5jeSwgc291cmNlLCBzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdGhpcy5mID0gZlxuICB0aGlzLmNvbmN1cnJlbmN5ID0gY29uY3VycmVuY3lcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlclxuICB0aGlzLnBlbmRpbmcgPSBbXVxuICB0aGlzLmN1cnJlbnQgPSBuZXcgTGlua2VkTGlzdCgpXG4gIHRoaXMuZGlzcG9zYWJsZSA9IGRpc3Bvc2Uub25jZShzb3VyY2UucnVuKHRoaXMsIHNjaGVkdWxlcikpXG4gIHRoaXMuYWN0aXZlID0gdHJ1ZVxufVxuXG5PdXRlci5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgeCkge1xuICB0aGlzLl9hZGRJbm5lcih0LCB4KVxufVxuXG5PdXRlci5wcm90b3R5cGUuX2FkZElubmVyID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgaWYgKHRoaXMuY3VycmVudC5sZW5ndGggPCB0aGlzLmNvbmN1cnJlbmN5KSB7XG4gICAgdGhpcy5fc3RhcnRJbm5lcih0LCB4KVxuICB9IGVsc2Uge1xuICAgIHRoaXMucGVuZGluZy5wdXNoKHgpXG4gIH1cbn1cblxuT3V0ZXIucHJvdG90eXBlLl9zdGFydElubmVyID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgdHJ5IHtcbiAgICB0aGlzLl9pbml0SW5uZXIodCwgeClcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRoaXMuZXJyb3IodCwgZSlcbiAgfVxufVxuXG5PdXRlci5wcm90b3R5cGUuX2luaXRJbm5lciA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHZhciBpbm5lclNpbmsgPSBuZXcgSW5uZXIodCwgdGhpcywgdGhpcy5zaW5rKVxuICBpbm5lclNpbmsuZGlzcG9zYWJsZSA9IG1hcEFuZFJ1bih0aGlzLmYsIHgsIGlubmVyU2luaywgdGhpcy5zY2hlZHVsZXIpXG4gIHRoaXMuY3VycmVudC5hZGQoaW5uZXJTaW5rKVxufVxuXG5mdW5jdGlvbiBtYXBBbmRSdW4gKGYsIHgsIHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gZih4KS5zb3VyY2UucnVuKHNpbmssIHNjaGVkdWxlcilcbn1cblxuT3V0ZXIucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHRoaXMuYWN0aXZlID0gZmFsc2VcbiAgZGlzcG9zZS50cnlEaXNwb3NlKHQsIHRoaXMuZGlzcG9zYWJsZSwgdGhpcy5zaW5rKVxuICB0aGlzLl9jaGVja0VuZCh0LCB4KVxufVxuXG5PdXRlci5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAodCwgZSkge1xuICB0aGlzLmFjdGl2ZSA9IGZhbHNlXG4gIHRoaXMuc2luay5lcnJvcih0LCBlKVxufVxuXG5PdXRlci5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5hY3RpdmUgPSBmYWxzZVxuICB0aGlzLnBlbmRpbmcubGVuZ3RoID0gMFxuICByZXR1cm4gUHJvbWlzZS5hbGwoW3RoaXMuZGlzcG9zYWJsZS5kaXNwb3NlKCksIHRoaXMuY3VycmVudC5kaXNwb3NlKCldKVxufVxuXG5PdXRlci5wcm90b3R5cGUuX2VuZElubmVyID0gZnVuY3Rpb24gKHQsIHgsIGlubmVyKSB7XG4gIHRoaXMuY3VycmVudC5yZW1vdmUoaW5uZXIpXG4gIGRpc3Bvc2UudHJ5RGlzcG9zZSh0LCBpbm5lciwgdGhpcylcblxuICBpZiAodGhpcy5wZW5kaW5nLmxlbmd0aCA9PT0gMCkge1xuICAgIHRoaXMuX2NoZWNrRW5kKHQsIHgpXG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fc3RhcnRJbm5lcih0LCB0aGlzLnBlbmRpbmcuc2hpZnQoKSlcbiAgfVxufVxuXG5PdXRlci5wcm90b3R5cGUuX2NoZWNrRW5kID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgaWYgKCF0aGlzLmFjdGl2ZSAmJiB0aGlzLmN1cnJlbnQuaXNFbXB0eSgpKSB7XG4gICAgdGhpcy5zaW5rLmVuZCh0LCB4KVxuICB9XG59XG5cbmZ1bmN0aW9uIElubmVyICh0aW1lLCBvdXRlciwgc2luaykge1xuICB0aGlzLnByZXYgPSB0aGlzLm5leHQgPSBudWxsXG4gIHRoaXMudGltZSA9IHRpbWVcbiAgdGhpcy5vdXRlciA9IG91dGVyXG4gIHRoaXMuc2luayA9IHNpbmtcbiAgdGhpcy5kaXNwb3NhYmxlID0gdm9pZCAwXG59XG5cbklubmVyLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHRoaXMuc2luay5ldmVudChNYXRoLm1heCh0LCB0aGlzLnRpbWUpLCB4KVxufVxuXG5Jbm5lci5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgdGhpcy5vdXRlci5fZW5kSW5uZXIoTWF0aC5tYXgodCwgdGhpcy50aW1lKSwgeCwgdGhpcylcbn1cblxuSW5uZXIucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKHQsIGUpIHtcbiAgdGhpcy5vdXRlci5lcnJvcihNYXRoLm1heCh0LCB0aGlzLnRpbWUpLCBlKVxufVxuXG5Jbm5lci5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuZGlzcG9zYWJsZS5kaXNwb3NlKClcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvbWVyZ2VDb25jdXJyZW50bHkuanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG4vKmdsb2JhbCBTZXQsIFN5bWJvbCovXG52YXIgaXRlcmF0b3JTeW1ib2xcbi8vIEZpcmVmb3ggc2hpcHMgYSBwYXJ0aWFsIGltcGxlbWVudGF0aW9uIHVzaW5nIHRoZSBuYW1lIEBAaXRlcmF0b3IuXG4vLyBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD05MDcwNzcjYzE0XG5pZiAodHlwZW9mIFNldCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgbmV3IFNldCgpWydAQGl0ZXJhdG9yJ10gPT09ICdmdW5jdGlvbicpIHtcbiAgaXRlcmF0b3JTeW1ib2wgPSAnQEBpdGVyYXRvcidcbn0gZWxzZSB7XG4gIGl0ZXJhdG9yU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3IgfHxcbiAgJ19lczZzaGltX2l0ZXJhdG9yXydcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSXRlcmFibGUgKG8pIHtcbiAgcmV0dXJuIHR5cGVvZiBvW2l0ZXJhdG9yU3ltYm9sXSA9PT0gJ2Z1bmN0aW9uJ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SXRlcmF0b3IgKG8pIHtcbiAgcmV0dXJuIG9baXRlcmF0b3JTeW1ib2xdKClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VJdGVyYWJsZSAoZiwgbykge1xuICBvW2l0ZXJhdG9yU3ltYm9sXSA9IGZcbiAgcmV0dXJuIG9cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2l0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2luZGV4Jyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zeW1ib2wtb2JzZXJ2YWJsZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCAqIGFzIGRpc3Bvc2UgZnJvbSAnLi9kaXNwb3NhYmxlL2Rpc3Bvc2UnXG5pbXBvcnQgZGVmYXVsdFNjaGVkdWxlciBmcm9tICcuL3NjaGVkdWxlci9kZWZhdWx0U2NoZWR1bGVyJ1xuXG5leHBvcnQgZnVuY3Rpb24gd2l0aERlZmF1bHRTY2hlZHVsZXIgKHNvdXJjZSkge1xuICByZXR1cm4gd2l0aFNjaGVkdWxlcihzb3VyY2UsIGRlZmF1bHRTY2hlZHVsZXIpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3aXRoU2NoZWR1bGVyIChzb3VyY2UsIHNjaGVkdWxlcikge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHJ1blNvdXJjZShzb3VyY2UsIHNjaGVkdWxlciwgcmVzb2x2ZSwgcmVqZWN0KVxuICB9KVxufVxuXG5mdW5jdGlvbiBydW5Tb3VyY2UgKHNvdXJjZSwgc2NoZWR1bGVyLCByZXNvbHZlLCByZWplY3QpIHtcbiAgdmFyIGRpc3Bvc2FibGUgPSBkaXNwb3NlLnNldHRhYmxlKClcbiAgdmFyIG9ic2VydmVyID0gbmV3IERyYWluKHJlc29sdmUsIHJlamVjdCwgZGlzcG9zYWJsZSlcblxuICBkaXNwb3NhYmxlLnNldERpc3Bvc2FibGUoc291cmNlLnJ1bihvYnNlcnZlciwgc2NoZWR1bGVyKSlcbn1cblxuZnVuY3Rpb24gRHJhaW4gKGVuZCwgZXJyb3IsIGRpc3Bvc2FibGUpIHtcbiAgdGhpcy5fZW5kID0gZW5kXG4gIHRoaXMuX2Vycm9yID0gZXJyb3JcbiAgdGhpcy5fZGlzcG9zYWJsZSA9IGRpc3Bvc2FibGVcbiAgdGhpcy5hY3RpdmUgPSB0cnVlXG59XG5cbkRyYWluLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7fVxuXG5EcmFpbi5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgaWYgKCF0aGlzLmFjdGl2ZSkge1xuICAgIHJldHVyblxuICB9XG4gIHRoaXMuYWN0aXZlID0gZmFsc2VcbiAgZGlzcG9zZVRoZW4odGhpcy5fZW5kLCB0aGlzLl9lcnJvciwgdGhpcy5fZGlzcG9zYWJsZSwgeClcbn1cblxuRHJhaW4ucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKHQsIGUpIHtcbiAgdGhpcy5hY3RpdmUgPSBmYWxzZVxuICBkaXNwb3NlVGhlbih0aGlzLl9lcnJvciwgdGhpcy5fZXJyb3IsIHRoaXMuX2Rpc3Bvc2FibGUsIGUpXG59XG5cbmZ1bmN0aW9uIGRpc3Bvc2VUaGVuIChlbmQsIGVycm9yLCBkaXNwb3NhYmxlLCB4KSB7XG4gIFByb21pc2UucmVzb2x2ZShkaXNwb3NhYmxlLmRpc3Bvc2UoKSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgZW5kKHgpXG4gIH0sIGVycm9yKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvcnVuU291cmNlLmpzXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFBpcGUgZnJvbSAnLi4vc2luay9QaXBlJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBGaWx0ZXIgKHAsIHNvdXJjZSkge1xuICB0aGlzLnAgPSBwXG4gIHRoaXMuc291cmNlID0gc291cmNlXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgZmlsdGVyZWQgc291cmNlLCBmdXNpbmcgYWRqYWNlbnQgZmlsdGVyLmZpbHRlciBpZiBwb3NzaWJsZVxuICogQHBhcmFtIHtmdW5jdGlvbih4OiopOmJvb2xlYW59IHAgZmlsdGVyaW5nIHByZWRpY2F0ZVxuICogQHBhcmFtIHt7cnVuOmZ1bmN0aW9ufX0gc291cmNlIHNvdXJjZSB0byBmaWx0ZXJcbiAqIEByZXR1cm5zIHtGaWx0ZXJ9IGZpbHRlcmVkIHNvdXJjZVxuICovXG5GaWx0ZXIuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlRmlsdGVyIChwLCBzb3VyY2UpIHtcbiAgaWYgKHNvdXJjZSBpbnN0YW5jZW9mIEZpbHRlcikge1xuICAgIHJldHVybiBuZXcgRmlsdGVyKGFuZChzb3VyY2UucCwgcCksIHNvdXJjZS5zb3VyY2UpXG4gIH1cblxuICByZXR1cm4gbmV3IEZpbHRlcihwLCBzb3VyY2UpXG59XG5cbkZpbHRlci5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gdGhpcy5zb3VyY2UucnVuKG5ldyBGaWx0ZXJTaW5rKHRoaXMucCwgc2luayksIHNjaGVkdWxlcilcbn1cblxuZnVuY3Rpb24gRmlsdGVyU2luayAocCwgc2luaykge1xuICB0aGlzLnAgPSBwXG4gIHRoaXMuc2luayA9IHNpbmtcbn1cblxuRmlsdGVyU2luay5wcm90b3R5cGUuZW5kID0gUGlwZS5wcm90b3R5cGUuZW5kXG5GaWx0ZXJTaW5rLnByb3RvdHlwZS5lcnJvciA9IFBpcGUucHJvdG90eXBlLmVycm9yXG5cbkZpbHRlclNpbmsucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgdmFyIHAgPSB0aGlzLnBcbiAgcCh4KSAmJiB0aGlzLnNpbmsuZXZlbnQodCwgeClcbn1cblxuZnVuY3Rpb24gYW5kIChwLCBxKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiBwKHgpICYmIHEoeClcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvZnVzaW9uL0ZpbHRlci5qc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBTdHJlYW0gZnJvbSAnLi4vU3RyZWFtJ1xuaW1wb3J0IFBpcGUgZnJvbSAnLi4vc2luay9QaXBlJ1xuaW1wb3J0ICogYXMgZGlzcG9zZSBmcm9tICcuLi9kaXNwb3NhYmxlL2Rpc3Bvc2UnXG5cbmV4cG9ydCBmdW5jdGlvbiBjb250aW51ZVdpdGggKGYsIHN0cmVhbSkge1xuICByZXR1cm4gbmV3IFN0cmVhbShuZXcgQ29udGludWVXaXRoKGYsIHN0cmVhbS5zb3VyY2UpKVxufVxuXG5mdW5jdGlvbiBDb250aW51ZVdpdGggKGYsIHNvdXJjZSkge1xuICB0aGlzLmYgPSBmXG4gIHRoaXMuc291cmNlID0gc291cmNlXG59XG5cbkNvbnRpbnVlV2l0aC5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gbmV3IENvbnRpbnVlV2l0aFNpbmsodGhpcy5mLCB0aGlzLnNvdXJjZSwgc2luaywgc2NoZWR1bGVyKVxufVxuXG5mdW5jdGlvbiBDb250aW51ZVdpdGhTaW5rIChmLCBzb3VyY2UsIHNpbmssIHNjaGVkdWxlcikge1xuICB0aGlzLmYgPSBmXG4gIHRoaXMuc2luayA9IHNpbmtcbiAgdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXJcbiAgdGhpcy5hY3RpdmUgPSB0cnVlXG4gIHRoaXMuZGlzcG9zYWJsZSA9IGRpc3Bvc2Uub25jZShzb3VyY2UucnVuKHRoaXMsIHNjaGVkdWxlcikpXG59XG5cbkNvbnRpbnVlV2l0aFNpbmsucHJvdG90eXBlLmVycm9yID0gUGlwZS5wcm90b3R5cGUuZXJyb3JcblxuQ29udGludWVXaXRoU2luay5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgeCkge1xuICBpZiAoIXRoaXMuYWN0aXZlKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdGhpcy5zaW5rLmV2ZW50KHQsIHgpXG59XG5cbkNvbnRpbnVlV2l0aFNpbmsucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIGlmICghdGhpcy5hY3RpdmUpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGRpc3Bvc2UudHJ5RGlzcG9zZSh0LCB0aGlzLmRpc3Bvc2FibGUsIHRoaXMuc2luaylcbiAgdGhpcy5fc3RhcnROZXh0KHQsIHgsIHRoaXMuc2luaylcbn1cblxuQ29udGludWVXaXRoU2luay5wcm90b3R5cGUuX3N0YXJ0TmV4dCA9IGZ1bmN0aW9uICh0LCB4LCBzaW5rKSB7XG4gIHRyeSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlID0gdGhpcy5fY29udGludWUodGhpcy5mLCB4LCBzaW5rKVxuICB9IGNhdGNoIChlKSB7XG4gICAgc2luay5lcnJvcih0LCBlKVxuICB9XG59XG5cbkNvbnRpbnVlV2l0aFNpbmsucHJvdG90eXBlLl9jb250aW51ZSA9IGZ1bmN0aW9uIChmLCB4LCBzaW5rKSB7XG4gIHJldHVybiBmKHgpLnNvdXJjZS5ydW4oc2luaywgdGhpcy5zY2hlZHVsZXIpXG59XG5cbkNvbnRpbnVlV2l0aFNpbmsucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuYWN0aXZlID0gZmFsc2VcbiAgcmV0dXJuIHRoaXMuZGlzcG9zYWJsZS5kaXNwb3NlKClcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvY29udGludWVXaXRoLmpzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFN0cmVhbSBmcm9tICcuLi9TdHJlYW0nXG5pbXBvcnQgKiBhcyB0cmFuc2Zvcm0gZnJvbSAnLi90cmFuc2Zvcm0nXG5pbXBvcnQgKiBhcyBjb3JlIGZyb20gJy4uL3NvdXJjZS9jb3JlJ1xuaW1wb3J0IFBpcGUgZnJvbSAnLi4vc2luay9QaXBlJ1xuaW1wb3J0IEluZGV4U2luayBmcm9tICcuLi9zaW5rL0luZGV4U2luaydcbmltcG9ydCAqIGFzIGRpc3Bvc2UgZnJvbSAnLi4vZGlzcG9zYWJsZS9kaXNwb3NlJ1xuaW1wb3J0ICogYXMgYmFzZSBmcm9tICdAbW9zdC9wcmVsdWRlJ1xuaW1wb3J0IGludm9rZSBmcm9tICcuLi9pbnZva2UnXG5cbnZhciBtYXAgPSBiYXNlLm1hcFxudmFyIHRhaWwgPSBiYXNlLnRhaWxcblxuLyoqXG4gKiBDb21iaW5lIGxhdGVzdCBldmVudHMgZnJvbSBhbGwgaW5wdXQgc3RyZWFtc1xuICogQHBhcmFtIHtmdW5jdGlvbiguLi5ldmVudHMpOip9IGYgZnVuY3Rpb24gdG8gY29tYmluZSBtb3N0IHJlY2VudCBldmVudHNcbiAqIEByZXR1cm5zIHtTdHJlYW19IHN0cmVhbSBjb250YWluaW5nIHRoZSByZXN1bHQgb2YgYXBwbHlpbmcgZiB0byB0aGUgbW9zdCByZWNlbnRcbiAqICBldmVudCBvZiBlYWNoIGlucHV0IHN0cmVhbSwgd2hlbmV2ZXIgYSBuZXcgZXZlbnQgYXJyaXZlcyBvbiBhbnkgc3RyZWFtLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tYmluZSAoZiAvKiwgLi4uc3RyZWFtcyAqLykge1xuICByZXR1cm4gY29tYmluZUFycmF5KGYsIHRhaWwoYXJndW1lbnRzKSlcbn1cblxuLyoqXG4qIENvbWJpbmUgbGF0ZXN0IGV2ZW50cyBmcm9tIGFsbCBpbnB1dCBzdHJlYW1zXG4qIEBwYXJhbSB7ZnVuY3Rpb24oLi4uZXZlbnRzKToqfSBmIGZ1bmN0aW9uIHRvIGNvbWJpbmUgbW9zdCByZWNlbnQgZXZlbnRzXG4qIEBwYXJhbSB7W1N0cmVhbV19IHN0cmVhbXMgbW9zdCByZWNlbnQgZXZlbnRzXG4qIEByZXR1cm5zIHtTdHJlYW19IHN0cmVhbSBjb250YWluaW5nIHRoZSByZXN1bHQgb2YgYXBwbHlpbmcgZiB0byB0aGUgbW9zdCByZWNlbnRcbiogIGV2ZW50IG9mIGVhY2ggaW5wdXQgc3RyZWFtLCB3aGVuZXZlciBhIG5ldyBldmVudCBhcnJpdmVzIG9uIGFueSBzdHJlYW0uXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVBcnJheSAoZiwgc3RyZWFtcykge1xuICB2YXIgbCA9IHN0cmVhbXMubGVuZ3RoXG4gIHJldHVybiBsID09PSAwID8gY29yZS5lbXB0eSgpXG4gIDogbCA9PT0gMSA/IHRyYW5zZm9ybS5tYXAoZiwgc3RyZWFtc1swXSlcbiAgOiBuZXcgU3RyZWFtKGNvbWJpbmVTb3VyY2VzKGYsIHN0cmVhbXMpKVxufVxuXG5mdW5jdGlvbiBjb21iaW5lU291cmNlcyAoZiwgc3RyZWFtcykge1xuICByZXR1cm4gbmV3IENvbWJpbmUoZiwgbWFwKGdldFNvdXJjZSwgc3RyZWFtcykpXG59XG5cbmZ1bmN0aW9uIGdldFNvdXJjZSAoc3RyZWFtKSB7XG4gIHJldHVybiBzdHJlYW0uc291cmNlXG59XG5cbmZ1bmN0aW9uIENvbWJpbmUgKGYsIHNvdXJjZXMpIHtcbiAgdGhpcy5mID0gZlxuICB0aGlzLnNvdXJjZXMgPSBzb3VyY2VzXG59XG5cbkNvbWJpbmUucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdmFyIGwgPSB0aGlzLnNvdXJjZXMubGVuZ3RoXG4gIHZhciBkaXNwb3NhYmxlcyA9IG5ldyBBcnJheShsKVxuICB2YXIgc2lua3MgPSBuZXcgQXJyYXkobClcblxuICB2YXIgbWVyZ2VTaW5rID0gbmV3IENvbWJpbmVTaW5rKGRpc3Bvc2FibGVzLCBzaW5rcywgc2luaywgdGhpcy5mKVxuXG4gIGZvciAodmFyIGluZGV4U2luaywgaSA9IDA7IGkgPCBsOyArK2kpIHtcbiAgICBpbmRleFNpbmsgPSBzaW5rc1tpXSA9IG5ldyBJbmRleFNpbmsoaSwgbWVyZ2VTaW5rKVxuICAgIGRpc3Bvc2FibGVzW2ldID0gdGhpcy5zb3VyY2VzW2ldLnJ1bihpbmRleFNpbmssIHNjaGVkdWxlcilcbiAgfVxuXG4gIHJldHVybiBkaXNwb3NlLmFsbChkaXNwb3NhYmxlcylcbn1cblxuZnVuY3Rpb24gQ29tYmluZVNpbmsgKGRpc3Bvc2FibGVzLCBzaW5rcywgc2luaywgZikge1xuICB0aGlzLnNpbmsgPSBzaW5rXG4gIHRoaXMuZGlzcG9zYWJsZXMgPSBkaXNwb3NhYmxlc1xuICB0aGlzLnNpbmtzID0gc2lua3NcbiAgdGhpcy5mID0gZlxuXG4gIHZhciBsID0gc2lua3MubGVuZ3RoXG4gIHRoaXMuYXdhaXRpbmcgPSBsXG4gIHRoaXMudmFsdWVzID0gbmV3IEFycmF5KGwpXG4gIHRoaXMuaGFzVmFsdWUgPSBuZXcgQXJyYXkobClcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyArK2kpIHtcbiAgICB0aGlzLmhhc1ZhbHVlW2ldID0gZmFsc2VcbiAgfVxuXG4gIHRoaXMuYWN0aXZlQ291bnQgPSBzaW5rcy5sZW5ndGhcbn1cblxuQ29tYmluZVNpbmsucHJvdG90eXBlLmVycm9yID0gUGlwZS5wcm90b3R5cGUuZXJyb3JcblxuQ29tYmluZVNpbmsucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIGluZGV4ZWRWYWx1ZSkge1xuICB2YXIgaSA9IGluZGV4ZWRWYWx1ZS5pbmRleFxuICB2YXIgYXdhaXRpbmcgPSB0aGlzLl91cGRhdGVSZWFkeShpKVxuXG4gIHRoaXMudmFsdWVzW2ldID0gaW5kZXhlZFZhbHVlLnZhbHVlXG4gIGlmIChhd2FpdGluZyA9PT0gMCkge1xuICAgIHRoaXMuc2luay5ldmVudCh0LCBpbnZva2UodGhpcy5mLCB0aGlzLnZhbHVlcykpXG4gIH1cbn1cblxuQ29tYmluZVNpbmsucHJvdG90eXBlLl91cGRhdGVSZWFkeSA9IGZ1bmN0aW9uIChpbmRleCkge1xuICBpZiAodGhpcy5hd2FpdGluZyA+IDApIHtcbiAgICBpZiAoIXRoaXMuaGFzVmFsdWVbaW5kZXhdKSB7XG4gICAgICB0aGlzLmhhc1ZhbHVlW2luZGV4XSA9IHRydWVcbiAgICAgIHRoaXMuYXdhaXRpbmcgLT0gMVxuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcy5hd2FpdGluZ1xufVxuXG5Db21iaW5lU2luay5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKHQsIGluZGV4ZWRWYWx1ZSkge1xuICBkaXNwb3NlLnRyeURpc3Bvc2UodCwgdGhpcy5kaXNwb3NhYmxlc1tpbmRleGVkVmFsdWUuaW5kZXhdLCB0aGlzLnNpbmspXG4gIGlmICgtLXRoaXMuYWN0aXZlQ291bnQgPT09IDApIHtcbiAgICB0aGlzLnNpbmsuZW5kKHQsIGluZGV4ZWRWYWx1ZS52YWx1ZSlcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9jb21iaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IHsgbWVyZ2VDb25jdXJyZW50bHksIG1lcmdlTWFwQ29uY3VycmVudGx5IH0gZnJvbSAnLi9tZXJnZUNvbmN1cnJlbnRseSdcblxuLyoqXG4gKiBNYXAgZWFjaCB2YWx1ZSBpbiB0aGUgc3RyZWFtIHRvIGEgbmV3IHN0cmVhbSwgYW5kIG1lcmdlIGl0IGludG8gdGhlXG4gKiByZXR1cm5lZCBvdXRlciBzdHJlYW0uIEV2ZW50IGFycml2YWwgdGltZXMgYXJlIHByZXNlcnZlZC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oeDoqKTpTdHJlYW19IGYgY2hhaW5pbmcgZnVuY3Rpb24sIG11c3QgcmV0dXJuIGEgU3RyZWFtXG4gKiBAcGFyYW0ge1N0cmVhbX0gc3RyZWFtXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIGNvbnRhaW5pbmcgYWxsIGV2ZW50cyBmcm9tIGVhY2ggc3RyZWFtIHJldHVybmVkIGJ5IGZcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZsYXRNYXAgKGYsIHN0cmVhbSkge1xuICByZXR1cm4gbWVyZ2VNYXBDb25jdXJyZW50bHkoZiwgSW5maW5pdHksIHN0cmVhbSlcbn1cblxuLyoqXG4gKiBNb25hZGljIGpvaW4uIEZsYXR0ZW4gYSBTdHJlYW08U3RyZWFtPFg+PiB0byBTdHJlYW08WD4gYnkgbWVyZ2luZyBpbm5lclxuICogc3RyZWFtcyB0byB0aGUgb3V0ZXIuIEV2ZW50IGFycml2YWwgdGltZXMgYXJlIHByZXNlcnZlZC5cbiAqIEBwYXJhbSB7U3RyZWFtPFN0cmVhbTxYPj59IHN0cmVhbSBzdHJlYW0gb2Ygc3RyZWFtc1xuICogQHJldHVybnMge1N0cmVhbTxYPn0gbmV3IHN0cmVhbSBjb250YWluaW5nIGFsbCBldmVudHMgb2YgYWxsIGlubmVyIHN0cmVhbXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGpvaW4gKHN0cmVhbSkge1xuICByZXR1cm4gbWVyZ2VDb25jdXJyZW50bHkoSW5maW5pdHksIHN0cmVhbSlcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvZmxhdE1hcC5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgaCB9IGZyb20gJ3NuYWJiZG9tJztcbmltcG9ydCB7IFN0cmVhbSwgY29tYmluZSB9IGZyb20gJ21vc3QnO1xuaW1wb3J0IHsgVk5vZGUgfSBmcm9tICdzbmFiYmRvbS92bm9kZSc7XG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXcgfSBmcm9tICcuLi9saWIvY29tcG9uZW50JztcblxuaW50ZXJmYWNlIEluaXRpYWxpemVyIHtcbiAgbnVtOiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIE1vZGVsIHtcbiAgbnVtOiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIEFjdGlvbnMge1xuICBkZWNyZW1lbnQ6IFN0cmVhbTxudW1iZXI+LFxuICBpbmNyZW1lbnQ6IFN0cmVhbTxudW1iZXI+LFxufVxuXG5jb25zdCBpbml0ID0gKChpbml0OiBJbml0aWFsaXplcik6IE1vZGVsID0+IGluaXQpO1xuXG5jb25zdCBtb2RlbCA9ICgoc3RhdGU6IE1vZGVsLCBhY3Rpb25TdHJlYW1zOiB7fSk6IHt9ID0+IHtcbiAgY29uc3QgZGVjID0gYWN0aW9uU3RyZWFtcy5kZWNyZW1lbnQuY29uc3RhbnQoLTEpO1xuICBjb25zdCBpbmMgPSBhY3Rpb25TdHJlYW1zLmluY3JlbWVudC5jb25zdGFudCgxKTtcbiAgY29uc3QgZGVsdGEgPSBjb21iaW5lKChhLCBiKSA9PiBhICsgYiwgaW5jLCBkZWMpO1xuXG4gIHJldHVybiB7bnVtOiAwfTtcbn0pO1xuXG5jb25zdCB2aWV3ID0gPFZpZXc+KChzdGF0ZTogTW9kZWwsIGFjdGlvbnMpID0+XG4gIGgoJ2RpdicsIFtcbiAgICBoKCdidXR0b24nLCB7IG9uOiB7IGNsaWNrOiBhY3Rpb25zLmRlY3JlbWVudCB9fSwgJy0nKSxcbiAgICBoKCdzcGFuJywgc3RhdGUubnVtLnRvU3RyaW5nKCkpLFxuICAgIGgoJ2J1dHRvbicsIHsgb246IHsgY2xpY2s6IGFjdGlvbnMuaW5jcmVtZW50IH19LCAnLScpLFxuICBdKVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9uZW50KGluaXQsIHZpZXcsIHt9KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL2NvdW50ZXIudHMiLCJpbXBvcnQgeyBTdHJlYW0sIGp1c3QgfSBmcm9tICdtb3N0JztcbmltcG9ydCB7IFZOb2RlIH0gZnJvbSAnc25hYmJkb20vdm5vZGUnO1xuXG5pbnRlcmZhY2UgU3RyZWFtTWFwIHtcbiAgW3Byb3BOYW1lOiBzdHJpbmddOiBTdHJlYW08YW55PlxufVxuXG5pbnRlcmZhY2UgQWN0aW9uTWFwIHtcbiAgW3Byb3BOYW1lOiBzdHJpbmddOiAoZXZlbnQ6IEV2ZW50KSA9PiBTdHJlYW08YW55PlxufVxuXG5pbnRlcmZhY2UgSW5pdGlhbGl6ZXIge1xuICAocHJvcHM6IHt9KToge31cbn1cblxuaW50ZXJmYWNlIFZpZXcge1xuICAoc3RhdGU6IHt9LCBhY3Rpb25zOiBBY3Rpb25NYXApOiBWTm9kZVxufVxuXG5pbnRlcmZhY2UgSUNvbXBvbmVudCB7XG4gIChpbml0OiBJbml0aWFsaXplcik6IFN0cmVhbTxWTm9kZT5cbn1cblxuY29uc3QgQ29tcG9uZW50ID0gKChpbml0OiBJbml0aWFsaXplciwgdmlldzogVmlldywgYWN0aW9uU3RyZWFtczogU3RyZWFtTWFwKTogU3RyZWFtPFZOb2RlPiA9PiB7XG4gIHJldHVybiBqdXN0KHZpZXcoaW5pdCwge30pKTtcbn0pO1xuXG5leHBvcnQgeyBDb21wb25lbnQsIFZpZXcgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9saWIvY29tcG9uZW50LnRzIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBTdHJlYW0gZnJvbSAnLi9TdHJlYW0nXG5pbXBvcnQgKiBhcyBiYXNlIGZyb20gJ0Btb3N0L3ByZWx1ZGUnXG5pbXBvcnQgeyBvZiwgZW1wdHksIG5ldmVyIH0gZnJvbSAnLi9zb3VyY2UvY29yZSdcbmltcG9ydCB7IGZyb20gfSBmcm9tICcuL3NvdXJjZS9mcm9tJ1xuaW1wb3J0IHsgcGVyaW9kaWMgfSBmcm9tICcuL3NvdXJjZS9wZXJpb2RpYydcbmltcG9ydCBzeW1ib2xPYnNlcnZhYmxlIGZyb20gJ3N5bWJvbC1vYnNlcnZhYmxlJ1xuXG4vKipcbiAqIENvcmUgc3RyZWFtIHR5cGVcbiAqIEB0eXBlIHtTdHJlYW19XG4gKi9cbmV4cG9ydCB7IFN0cmVhbSB9XG5cbi8vIEFkZCBvZiBhbmQgZW1wdHkgdG8gY29uc3RydWN0b3IgZm9yIGZhbnRhc3ktbGFuZCBjb21wYXRcblN0cmVhbS5vZiA9IG9mXG5TdHJlYW0uZW1wdHkgPSBlbXB0eVxuLy8gQWRkIGZyb20gdG8gY29uc3RydWN0b3IgZm9yIEVTIE9ic2VydmFibGUgY29tcGF0XG5TdHJlYW0uZnJvbSA9IGZyb21cbmV4cG9ydCB7IG9mLCBvZiBhcyBqdXN0LCBlbXB0eSwgbmV2ZXIsIGZyb20sIHBlcmlvZGljIH1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIERyYWZ0IEVTIE9ic2VydmFibGUgcHJvcG9zYWwgaW50ZXJvcFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3plbnBhcnNpbmcvZXMtb2JzZXJ2YWJsZVxuXG5pbXBvcnQgeyBzdWJzY3JpYmUgfSBmcm9tICcuL29ic2VydmFibGUvc3Vic2NyaWJlJ1xuXG5TdHJlYW0ucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gIHJldHVybiBzdWJzY3JpYmUoc3Vic2NyaWJlciwgdGhpcylcbn1cblxuU3RyZWFtLnByb3RvdHlwZVtzeW1ib2xPYnNlcnZhYmxlXSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEZsdWVudCBhZGFwdGVyXG5cbmltcG9ydCB7IHRocnUgfSBmcm9tICcuL2NvbWJpbmF0b3IvdGhydSdcblxuLyoqXG4gKiBBZGFwdCBhIGZ1bmN0aW9uYWwgc3RyZWFtIHRyYW5zZm9ybSB0byBmbHVlbnQgc3R5bGUuXG4gKiBJdCBhcHBsaWVzIGYgdG8gdGhlIHRoaXMgc3RyZWFtIG9iamVjdFxuICogQHBhcmFtICB7ZnVuY3Rpb24oczogU3RyZWFtKTogU3RyZWFtfSBmIGZ1bmN0aW9uIHRoYXRcbiAqIHJlY2VpdmVzIHRoZSBzdHJlYW0gaXRzZWxmIGFuZCBtdXN0IHJldHVybiBhIG5ldyBzdHJlYW1cbiAqIEByZXR1cm4ge1N0cmVhbX1cbiAqL1xuU3RyZWFtLnByb3RvdHlwZS50aHJ1ID0gZnVuY3Rpb24gKGYpIHtcbiAgcmV0dXJuIHRocnUoZiwgdGhpcylcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEFkYXB0aW5nIG90aGVyIHNvdXJjZXNcblxuLyoqXG4gKiBDcmVhdGUgYSBzdHJlYW0gb2YgZXZlbnRzIGZyb20gdGhlIHN1cHBsaWVkIEV2ZW50VGFyZ2V0IG9yIEV2ZW50RW1pdHRlclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IGV2ZW50IG5hbWVcbiAqIEBwYXJhbSB7RXZlbnRUYXJnZXR8RXZlbnRFbWl0dGVyfSBzb3VyY2UgRXZlbnRUYXJnZXQgb3IgRXZlbnRFbWl0dGVyLiBUaGUgc291cmNlXG4gKiAgbXVzdCBzdXBwb3J0IGVpdGhlciBhZGRFdmVudExpc3RlbmVyL3JlbW92ZUV2ZW50TGlzdGVuZXIgKHczYyBFdmVudFRhcmdldDpcbiAqICBodHRwOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMi1FdmVudHMvZXZlbnRzLmh0bWwjRXZlbnRzLUV2ZW50VGFyZ2V0KSxcbiAqICBvciBhZGRMaXN0ZW5lci9yZW1vdmVMaXN0ZW5lciAobm9kZSBFdmVudEVtaXR0ZXI6IGh0dHA6Ly9ub2RlanMub3JnL2FwaS9ldmVudHMuaHRtbClcbiAqIEByZXR1cm5zIHtTdHJlYW19IHN0cmVhbSBvZiBldmVudHMgb2YgdGhlIHNwZWNpZmllZCB0eXBlIGZyb20gdGhlIHNvdXJjZVxuICovXG5leHBvcnQgeyBmcm9tRXZlbnQgfSBmcm9tICcuL3NvdXJjZS9mcm9tRXZlbnQnXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPYnNlcnZpbmdcblxuaW1wb3J0IHsgb2JzZXJ2ZSwgZHJhaW4gfSBmcm9tICcuL2NvbWJpbmF0b3Ivb2JzZXJ2ZSdcblxuZXhwb3J0IHsgb2JzZXJ2ZSwgb2JzZXJ2ZSBhcyBmb3JFYWNoLCBkcmFpbiB9XG5cbi8qKlxuICogUHJvY2VzcyBhbGwgdGhlIGV2ZW50cyBpbiB0aGUgc3RyZWFtXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gcHJvbWlzZSB0aGF0IGZ1bGZpbGxzIHdoZW4gdGhlIHN0cmVhbSBlbmRzLCBvciByZWplY3RzXG4gKiAgaWYgdGhlIHN0cmVhbSBmYWlscyB3aXRoIGFuIHVuaGFuZGxlZCBlcnJvci5cbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5vYnNlcnZlID0gU3RyZWFtLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGYpIHtcbiAgcmV0dXJuIG9ic2VydmUoZiwgdGhpcylcbn1cblxuLyoqXG4gKiBDb25zdW1lIGFsbCBldmVudHMgaW4gdGhlIHN0cmVhbSwgd2l0aG91dCBwcm92aWRpbmcgYSBmdW5jdGlvbiB0byBwcm9jZXNzIGVhY2guXG4gKiBUaGlzIGNhdXNlcyBhIHN0cmVhbSB0byBiZWNvbWUgYWN0aXZlIGFuZCBiZWdpbiBlbWl0dGluZyBldmVudHMsIGFuZCBpcyB1c2VmdWxcbiAqIGluIGNhc2VzIHdoZXJlIGFsbCBwcm9jZXNzaW5nIGhhcyBiZWVuIHNldHVwIHVwc3RyZWFtIHZpYSBvdGhlciBjb21iaW5hdG9ycywgYW5kXG4gKiB0aGVyZSBpcyBubyBuZWVkIHRvIHByb2Nlc3MgdGhlIHRlcm1pbmFsIGV2ZW50cy5cbiAqIEByZXR1cm5zIHtQcm9taXNlfSBwcm9taXNlIHRoYXQgZnVsZmlsbHMgd2hlbiB0aGUgc3RyZWFtIGVuZHMsIG9yIHJlamVjdHNcbiAqICBpZiB0aGUgc3RyZWFtIGZhaWxzIHdpdGggYW4gdW5oYW5kbGVkIGVycm9yLlxuICovXG5TdHJlYW0ucHJvdG90eXBlLmRyYWluID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZHJhaW4odGhpcylcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5pbXBvcnQgeyBsb29wIH0gZnJvbSAnLi9jb21iaW5hdG9yL2xvb3AnXG5cbmV4cG9ydCB7IGxvb3AgfVxuXG4vKipcbiAqIEdlbmVyYWxpemVkIGZlZWRiYWNrIGxvb3AuIENhbGwgYSBzdGVwcGVyIGZ1bmN0aW9uIGZvciBlYWNoIGV2ZW50LiBUaGUgc3RlcHBlclxuICogd2lsbCBiZSBjYWxsZWQgd2l0aCAyIHBhcmFtczogdGhlIGN1cnJlbnQgc2VlZCBhbmQgdGhlIGFuIGV2ZW50IHZhbHVlLiAgSXQgbXVzdFxuICogcmV0dXJuIGEgbmV3IHsgc2VlZCwgdmFsdWUgfSBwYWlyLiBUaGUgYHNlZWRgIHdpbGwgYmUgZmVkIGJhY2sgaW50byB0aGUgbmV4dFxuICogaW52b2NhdGlvbiBvZiBzdGVwcGVyLCBhbmQgdGhlIGB2YWx1ZWAgd2lsbCBiZSBwcm9wYWdhdGVkIGFzIHRoZSBldmVudCB2YWx1ZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oc2VlZDoqLCB2YWx1ZToqKTp7c2VlZDoqLCB2YWx1ZToqfX0gc3RlcHBlciBsb29wIHN0ZXAgZnVuY3Rpb25cbiAqIEBwYXJhbSB7Kn0gc2VlZCBpbml0aWFsIHNlZWQgdmFsdWUgcGFzc2VkIHRvIGZpcnN0IHN0ZXBwZXIgY2FsbFxuICogQHJldHVybnMge1N0cmVhbX0gbmV3IHN0cmVhbSB3aG9zZSB2YWx1ZXMgYXJlIHRoZSBgdmFsdWVgIGZpZWxkIG9mIHRoZSBvYmplY3RzXG4gKiByZXR1cm5lZCBieSB0aGUgc3RlcHBlclxuICovXG5TdHJlYW0ucHJvdG90eXBlLmxvb3AgPSBmdW5jdGlvbiAoc3RlcHBlciwgc2VlZCkge1xuICByZXR1cm4gbG9vcChzdGVwcGVyLCBzZWVkLCB0aGlzKVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmltcG9ydCB7IHNjYW4sIHJlZHVjZSB9IGZyb20gJy4vY29tYmluYXRvci9hY2N1bXVsYXRlJ1xuXG5leHBvcnQgeyBzY2FuLCByZWR1Y2UgfVxuXG4vKipcbiAqIENyZWF0ZSBhIHN0cmVhbSBjb250YWluaW5nIHN1Y2Nlc3NpdmUgcmVkdWNlIHJlc3VsdHMgb2YgYXBwbHlpbmcgZiB0b1xuICogdGhlIHByZXZpb3VzIHJlZHVjZSByZXN1bHQgYW5kIHRoZSBjdXJyZW50IHN0cmVhbSBpdGVtLlxuICogQHBhcmFtIHtmdW5jdGlvbihyZXN1bHQ6KiwgeDoqKToqfSBmIHJlZHVjZXIgZnVuY3Rpb25cbiAqIEBwYXJhbSB7Kn0gaW5pdGlhbCBpbml0aWFsIHZhbHVlXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIGNvbnRhaW5pbmcgc3VjY2Vzc2l2ZSByZWR1Y2UgcmVzdWx0c1xuICovXG5TdHJlYW0ucHJvdG90eXBlLnNjYW4gPSBmdW5jdGlvbiAoZiwgaW5pdGlhbCkge1xuICByZXR1cm4gc2NhbihmLCBpbml0aWFsLCB0aGlzKVxufVxuXG4vKipcbiAqIFJlZHVjZSB0aGUgc3RyZWFtIHRvIHByb2R1Y2UgYSBzaW5nbGUgcmVzdWx0LiAgTm90ZSB0aGF0IHJlZHVjaW5nIGFuIGluZmluaXRlXG4gKiBzdHJlYW0gd2lsbCByZXR1cm4gYSBQcm9taXNlIHRoYXQgbmV2ZXIgZnVsZmlsbHMsIGJ1dCB0aGF0IG1heSByZWplY3QgaWYgYW4gZXJyb3JcbiAqIG9jY3Vycy5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24ocmVzdWx0OiosIHg6Kik6Kn0gZiByZWR1Y2VyIGZ1bmN0aW9uXG4gKiBAcGFyYW0geyp9IGluaXRpYWwgb3B0aW9uYWwgaW5pdGlhbCB2YWx1ZVxuICogQHJldHVybnMge1Byb21pc2V9IHByb21pc2UgZm9yIHRoZSBmaWxlIHJlc3VsdCBvZiB0aGUgcmVkdWNlXG4gKi9cblN0cmVhbS5wcm90b3R5cGUucmVkdWNlID0gZnVuY3Rpb24gKGYsIGluaXRpYWwpIHtcbiAgcmV0dXJuIHJlZHVjZShmLCBpbml0aWFsLCB0aGlzKVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gQnVpbGRpbmcgYW5kIGV4dGVuZGluZ1xuXG5leHBvcnQgeyB1bmZvbGQgfSBmcm9tICcuL3NvdXJjZS91bmZvbGQnXG5leHBvcnQgeyBpdGVyYXRlIH0gZnJvbSAnLi9zb3VyY2UvaXRlcmF0ZSdcbmV4cG9ydCB7IGdlbmVyYXRlIH0gZnJvbSAnLi9zb3VyY2UvZ2VuZXJhdGUnXG5pbXBvcnQgeyBjb25jYXQsIGNvbnMgYXMgc3RhcnRXaXRoIH0gZnJvbSAnLi9jb21iaW5hdG9yL2J1aWxkJ1xuXG5leHBvcnQgeyBjb25jYXQsIHN0YXJ0V2l0aCB9XG5cbi8qKlxuICogQHBhcmFtIHtTdHJlYW19IHRhaWxcbiAqIEByZXR1cm5zIHtTdHJlYW19IG5ldyBzdHJlYW0gY29udGFpbmluZyBhbGwgaXRlbXMgaW4gdGhpcyBmb2xsb3dlZCBieVxuICogIGFsbCBpdGVtcyBpbiB0YWlsXG4gKi9cblN0cmVhbS5wcm90b3R5cGUuY29uY2F0ID0gZnVuY3Rpb24gKHRhaWwpIHtcbiAgcmV0dXJuIGNvbmNhdCh0aGlzLCB0YWlsKVxufVxuXG4vKipcbiAqIEBwYXJhbSB7Kn0geCB2YWx1ZSB0byBwcmVwZW5kXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBhIG5ldyBzdHJlYW0gd2l0aCB4IHByZXBlbmRlZFxuICovXG5TdHJlYW0ucHJvdG90eXBlLnN0YXJ0V2l0aCA9IGZ1bmN0aW9uICh4KSB7XG4gIHJldHVybiBzdGFydFdpdGgoeCwgdGhpcylcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFRyYW5zZm9ybWluZ1xuXG5pbXBvcnQgeyBtYXAsIGNvbnN0YW50LCB0YXAgfSBmcm9tICcuL2NvbWJpbmF0b3IvdHJhbnNmb3JtJ1xuaW1wb3J0IHsgYXAgfSBmcm9tICcuL2NvbWJpbmF0b3IvYXBwbGljYXRpdmUnXG5cbmV4cG9ydCB7IG1hcCwgY29uc3RhbnQsIHRhcCwgYXAgfVxuXG4vKipcbiAqIFRyYW5zZm9ybSBlYWNoIHZhbHVlIGluIHRoZSBzdHJlYW0gYnkgYXBwbHlpbmcgZiB0byBlYWNoXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCopOip9IGYgbWFwcGluZyBmdW5jdGlvblxuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIGNvbnRhaW5pbmcgaXRlbXMgdHJhbnNmb3JtZWQgYnkgZlxuICovXG5TdHJlYW0ucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uIChmKSB7XG4gIHJldHVybiBtYXAoZiwgdGhpcylcbn1cblxuLyoqXG4gKiBBc3N1bWUgdGhpcyBzdHJlYW0gY29udGFpbnMgZnVuY3Rpb25zLCBhbmQgYXBwbHkgZWFjaCBmdW5jdGlvbiB0byBlYWNoIGl0ZW1cbiAqIGluIHRoZSBwcm92aWRlZCBzdHJlYW0uICBUaGlzIGdlbmVyYXRlcywgaW4gZWZmZWN0LCBhIGNyb3NzIHByb2R1Y3QuXG4gKiBAcGFyYW0ge1N0cmVhbX0geHMgc3RyZWFtIG9mIGl0ZW1zIHRvIHdoaWNoXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gY29udGFpbmluZyB0aGUgY3Jvc3MgcHJvZHVjdCBvZiBpdGVtc1xuICovXG5TdHJlYW0ucHJvdG90eXBlLmFwID0gZnVuY3Rpb24gKHhzKSB7XG4gIHJldHVybiBhcCh0aGlzLCB4cylcbn1cblxuLyoqXG4gKiBSZXBsYWNlIGVhY2ggdmFsdWUgaW4gdGhlIHN0cmVhbSB3aXRoIHhcbiAqIEBwYXJhbSB7Kn0geFxuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIGNvbnRhaW5pbmcgaXRlbXMgcmVwbGFjZWQgd2l0aCB4XG4gKi9cblN0cmVhbS5wcm90b3R5cGUuY29uc3RhbnQgPSBmdW5jdGlvbiAoeCkge1xuICByZXR1cm4gY29uc3RhbnQoeCwgdGhpcylcbn1cblxuLyoqXG4gKiBQZXJmb3JtIGEgc2lkZSBlZmZlY3QgZm9yIGVhY2ggaXRlbSBpbiB0aGUgc3RyZWFtXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHg6Kik6Kn0gZiBzaWRlIGVmZmVjdCB0byBleGVjdXRlIGZvciBlYWNoIGl0ZW0uIFRoZVxuICogIHJldHVybiB2YWx1ZSB3aWxsIGJlIGRpc2NhcmRlZC5cbiAqIEByZXR1cm5zIHtTdHJlYW19IG5ldyBzdHJlYW0gY29udGFpbmluZyB0aGUgc2FtZSBpdGVtcyBhcyB0aGlzIHN0cmVhbVxuICovXG5TdHJlYW0ucHJvdG90eXBlLnRhcCA9IGZ1bmN0aW9uIChmKSB7XG4gIHJldHVybiB0YXAoZiwgdGhpcylcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFRyYW5zZHVjZXIgc3VwcG9ydFxuXG5pbXBvcnQgeyB0cmFuc2R1Y2UgfSBmcm9tICcuL2NvbWJpbmF0b3IvdHJhbnNkdWNlJ1xuXG5leHBvcnQgeyB0cmFuc2R1Y2UgfVxuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGlzIHN0cmVhbSBieSBwYXNzaW5nIGl0cyBldmVudHMgdGhyb3VnaCBhIHRyYW5zZHVjZXIuXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gdHJhbnNkdWNlciB0cmFuc2R1Y2VyIGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtTdHJlYW19IHN0cmVhbSBvZiBldmVudHMgdHJhbnNmb3JtZWQgYnkgdGhlIHRyYW5zZHVjZXJcbiAqL1xuU3RyZWFtLnByb3RvdHlwZS50cmFuc2R1Y2UgPSBmdW5jdGlvbiAodHJhbnNkdWNlcikge1xuICByZXR1cm4gdHJhbnNkdWNlKHRyYW5zZHVjZXIsIHRoaXMpXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBGbGF0TWFwcGluZ1xuXG5pbXBvcnQgeyBmbGF0TWFwLCBqb2luIH0gZnJvbSAnLi9jb21iaW5hdG9yL2ZsYXRNYXAnXG5cbi8vIEBkZXByZWNhdGVkIGZsYXRNYXAsIHVzZSBjaGFpbiBpbnN0ZWFkXG5leHBvcnQgeyBmbGF0TWFwLCBmbGF0TWFwIGFzIGNoYWluLCBqb2luIH1cblxuLyoqXG4gKiBNYXAgZWFjaCB2YWx1ZSBpbiB0aGUgc3RyZWFtIHRvIGEgbmV3IHN0cmVhbSwgYW5kIG1lcmdlIGl0IGludG8gdGhlXG4gKiByZXR1cm5lZCBvdXRlciBzdHJlYW0uIEV2ZW50IGFycml2YWwgdGltZXMgYXJlIHByZXNlcnZlZC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oeDoqKTpTdHJlYW19IGYgY2hhaW5pbmcgZnVuY3Rpb24sIG11c3QgcmV0dXJuIGEgU3RyZWFtXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIGNvbnRhaW5pbmcgYWxsIGV2ZW50cyBmcm9tIGVhY2ggc3RyZWFtIHJldHVybmVkIGJ5IGZcbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5jaGFpbiA9IGZ1bmN0aW9uIChmKSB7XG4gIHJldHVybiBmbGF0TWFwKGYsIHRoaXMpXG59XG5cbi8vIEBkZXByZWNhdGVkIHVzZSBjaGFpbiBpbnN0ZWFkXG5TdHJlYW0ucHJvdG90eXBlLmZsYXRNYXAgPSBTdHJlYW0ucHJvdG90eXBlLmNoYWluXG5cbiAgLyoqXG4gKiBNb25hZGljIGpvaW4uIEZsYXR0ZW4gYSBTdHJlYW08U3RyZWFtPFg+PiB0byBTdHJlYW08WD4gYnkgbWVyZ2luZyBpbm5lclxuICogc3RyZWFtcyB0byB0aGUgb3V0ZXIuIEV2ZW50IGFycml2YWwgdGltZXMgYXJlIHByZXNlcnZlZC5cbiAqIEByZXR1cm5zIHtTdHJlYW08WD59IG5ldyBzdHJlYW0gY29udGFpbmluZyBhbGwgZXZlbnRzIG9mIGFsbCBpbm5lciBzdHJlYW1zXG4gKi9cblN0cmVhbS5wcm90b3R5cGUuam9pbiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGpvaW4odGhpcylcbn1cblxuaW1wb3J0IHsgY29udGludWVXaXRoIH0gZnJvbSAnLi9jb21iaW5hdG9yL2NvbnRpbnVlV2l0aCdcblxuLy8gQGRlcHJlY2F0ZWQgZmxhdE1hcEVuZCwgdXNlIGNvbnRpbnVlV2l0aCBpbnN0ZWFkXG5leHBvcnQgeyBjb250aW51ZVdpdGgsIGNvbnRpbnVlV2l0aCBhcyBmbGF0TWFwRW5kIH1cblxuLyoqXG4gKiBNYXAgdGhlIGVuZCBldmVudCB0byBhIG5ldyBzdHJlYW0sIGFuZCBiZWdpbiBlbWl0dGluZyBpdHMgdmFsdWVzLlxuICogQHBhcmFtIHtmdW5jdGlvbih4OiopOlN0cmVhbX0gZiBmdW5jdGlvbiB0aGF0IHJlY2VpdmVzIHRoZSBlbmQgZXZlbnQgdmFsdWUsXG4gKiBhbmQgKm11c3QqIHJldHVybiBhIG5ldyBTdHJlYW0gdG8gY29udGludWUgd2l0aC5cbiAqIEByZXR1cm5zIHtTdHJlYW19IG5ldyBzdHJlYW0gdGhhdCBlbWl0cyBhbGwgZXZlbnRzIGZyb20gdGhlIG9yaWdpbmFsIHN0cmVhbSxcbiAqIGZvbGxvd2VkIGJ5IGFsbCBldmVudHMgZnJvbSB0aGUgc3RyZWFtIHJldHVybmVkIGJ5IGYuXG4gKi9cblN0cmVhbS5wcm90b3R5cGUuY29udGludWVXaXRoID0gZnVuY3Rpb24gKGYpIHtcbiAgcmV0dXJuIGNvbnRpbnVlV2l0aChmLCB0aGlzKVxufVxuXG4vLyBAZGVwcmVjYXRlZCB1c2UgY29udGludWVXaXRoIGluc3RlYWRcblN0cmVhbS5wcm90b3R5cGUuZmxhdE1hcEVuZCA9IFN0cmVhbS5wcm90b3R5cGUuY29udGludWVXaXRoXG5cbmltcG9ydCB7IGNvbmNhdE1hcCB9IGZyb20gJy4vY29tYmluYXRvci9jb25jYXRNYXAnXG5cbmV4cG9ydCB7IGNvbmNhdE1hcCB9XG5cblN0cmVhbS5wcm90b3R5cGUuY29uY2F0TWFwID0gZnVuY3Rpb24gKGYpIHtcbiAgcmV0dXJuIGNvbmNhdE1hcChmLCB0aGlzKVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gQ29uY3VycmVudCBtZXJnaW5nXG5cbmltcG9ydCB7IG1lcmdlQ29uY3VycmVudGx5IH0gZnJvbSAnLi9jb21iaW5hdG9yL21lcmdlQ29uY3VycmVudGx5J1xuXG5leHBvcnQgeyBtZXJnZUNvbmN1cnJlbnRseSB9XG5cbi8qKlxuICogRmxhdHRlbiBhIFN0cmVhbTxTdHJlYW08WD4+IHRvIFN0cmVhbTxYPiBieSBtZXJnaW5nIGlubmVyXG4gKiBzdHJlYW1zIHRvIHRoZSBvdXRlciwgbGltaXRpbmcgdGhlIG51bWJlciBvZiBpbm5lciBzdHJlYW1zIHRoYXQgbWF5XG4gKiBiZSBhY3RpdmUgY29uY3VycmVudGx5LlxuICogQHBhcmFtIHtudW1iZXJ9IGNvbmN1cnJlbmN5IGF0IG1vc3QgdGhpcyBtYW55IGlubmVyIHN0cmVhbXMgd2lsbCBiZVxuICogIGFsbG93ZWQgdG8gYmUgYWN0aXZlIGNvbmN1cnJlbnRseS5cbiAqIEByZXR1cm4ge1N0cmVhbTxYPn0gbmV3IHN0cmVhbSBjb250YWluaW5nIGFsbCBldmVudHMgb2YgYWxsIGlubmVyXG4gKiAgc3RyZWFtcywgd2l0aCBsaW1pdGVkIGNvbmN1cnJlbmN5LlxuICovXG5TdHJlYW0ucHJvdG90eXBlLm1lcmdlQ29uY3VycmVudGx5ID0gZnVuY3Rpb24gKGNvbmN1cnJlbmN5KSB7XG4gIHJldHVybiBtZXJnZUNvbmN1cnJlbnRseShjb25jdXJyZW5jeSwgdGhpcylcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE1lcmdpbmdcblxuaW1wb3J0IHsgbWVyZ2UsIG1lcmdlQXJyYXkgfSBmcm9tICcuL2NvbWJpbmF0b3IvbWVyZ2UnXG5cbmV4cG9ydCB7IG1lcmdlLCBtZXJnZUFycmF5IH1cblxuLyoqXG4gKiBNZXJnZSB0aGlzIHN0cmVhbSBhbmQgYWxsIHRoZSBwcm92aWRlZCBzdHJlYW1zXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gY29udGFpbmluZyBpdGVtcyBmcm9tIHRoaXMgc3RyZWFtIGFuZCBzIGluIHRpbWVcbiAqIG9yZGVyLiAgSWYgdHdvIGV2ZW50cyBhcmUgc2ltdWx0YW5lb3VzIHRoZXkgd2lsbCBiZSBtZXJnZWQgaW5cbiAqIGFyYml0cmFyeSBvcmRlci5cbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5tZXJnZSA9IGZ1bmN0aW9uICgvKiAuLi5zdHJlYW1zKi8pIHtcbiAgcmV0dXJuIG1lcmdlQXJyYXkoYmFzZS5jb25zKHRoaXMsIGFyZ3VtZW50cykpXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBDb21iaW5pbmdcblxuaW1wb3J0IHsgY29tYmluZSwgY29tYmluZUFycmF5IH0gZnJvbSAnLi9jb21iaW5hdG9yL2NvbWJpbmUnXG5cbmV4cG9ydCB7IGNvbWJpbmUsIGNvbWJpbmVBcnJheSB9XG5cbi8qKlxuICogQ29tYmluZSBsYXRlc3QgZXZlbnRzIGZyb20gYWxsIGlucHV0IHN0cmVhbXNcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oLi4uZXZlbnRzKToqfSBmIGZ1bmN0aW9uIHRvIGNvbWJpbmUgbW9zdCByZWNlbnQgZXZlbnRzXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gY29udGFpbmluZyB0aGUgcmVzdWx0IG9mIGFwcGx5aW5nIGYgdG8gdGhlIG1vc3QgcmVjZW50XG4gKiAgZXZlbnQgb2YgZWFjaCBpbnB1dCBzdHJlYW0sIHdoZW5ldmVyIGEgbmV3IGV2ZW50IGFycml2ZXMgb24gYW55IHN0cmVhbS5cbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5jb21iaW5lID0gZnVuY3Rpb24gKGYgLyosIC4uLnN0cmVhbXMqLykge1xuICByZXR1cm4gY29tYmluZUFycmF5KGYsIGJhc2UucmVwbGFjZSh0aGlzLCAwLCBhcmd1bWVudHMpKVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gU2FtcGxpbmdcblxuaW1wb3J0IHsgc2FtcGxlLCBzYW1wbGVBcnJheSwgc2FtcGxlV2l0aCB9IGZyb20gJy4vY29tYmluYXRvci9zYW1wbGUnXG5cbmV4cG9ydCB7IHNhbXBsZSwgc2FtcGxlQXJyYXksIHNhbXBsZVdpdGggfVxuXG4vKipcbiAqIFdoZW4gYW4gZXZlbnQgYXJyaXZlcyBvbiBzYW1wbGVyLCBlbWl0IHRoZSBsYXRlc3QgZXZlbnQgdmFsdWUgZnJvbSBzdHJlYW0uXG4gKiBAcGFyYW0ge1N0cmVhbX0gc2FtcGxlciBzdHJlYW0gb2YgZXZlbnRzIGF0IHdob3NlIGFycml2YWwgdGltZVxuICogIHNpZ25hbCdzIGxhdGVzdCB2YWx1ZSB3aWxsIGJlIHByb3BhZ2F0ZWRcbiAqIEByZXR1cm5zIHtTdHJlYW19IHNhbXBsZWQgc3RyZWFtIG9mIHZhbHVlc1xuICovXG5TdHJlYW0ucHJvdG90eXBlLnNhbXBsZVdpdGggPSBmdW5jdGlvbiAoc2FtcGxlcikge1xuICByZXR1cm4gc2FtcGxlV2l0aChzYW1wbGVyLCB0aGlzKVxufVxuXG4vKipcbiAqIFdoZW4gYW4gZXZlbnQgYXJyaXZlcyBvbiB0aGlzIHN0cmVhbSwgZW1pdCB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgZiB3aXRoIHRoZSBsYXRlc3RcbiAqIHZhbHVlcyBvZiBhbGwgc3RyZWFtcyBiZWluZyBzYW1wbGVkXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKC4uLnZhbHVlcyk6Kn0gZiBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIHNldCBvZiBzYW1wbGVkIHZhbHVlc1xuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIG9mIHNhbXBsZWQgYW5kIHRyYW5zZm9ybWVkIHZhbHVlc1xuICovXG5TdHJlYW0ucHJvdG90eXBlLnNhbXBsZSA9IGZ1bmN0aW9uIChmIC8qIC4uLnN0cmVhbXMgKi8pIHtcbiAgcmV0dXJuIHNhbXBsZUFycmF5KGYsIHRoaXMsIGJhc2UudGFpbChhcmd1bWVudHMpKVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gWmlwcGluZ1xuXG5pbXBvcnQgeyB6aXAsIHppcEFycmF5IH0gZnJvbSAnLi9jb21iaW5hdG9yL3ppcCdcblxuZXhwb3J0IHsgemlwLCB6aXBBcnJheSB9XG5cbi8qKlxuICogUGFpci13aXNlIGNvbWJpbmUgaXRlbXMgd2l0aCB0aG9zZSBpbiBzLiBHaXZlbiAyIHN0cmVhbXM6XG4gKiBbMSwyLDNdIHppcFdpdGggZiBbNCw1LDZdIC0+IFtmKDEsNCksZigyLDUpLGYoMyw2KV1cbiAqIE5vdGU6IHppcCBjYXVzZXMgZmFzdCBzdHJlYW1zIHRvIGJ1ZmZlciBhbmQgd2FpdCBmb3Igc2xvdyBzdHJlYW1zLlxuICogQHBhcmFtIHtmdW5jdGlvbihhOlN0cmVhbSwgYjpTdHJlYW0sIC4uLik6Kn0gZiBmdW5jdGlvbiB0byBjb21iaW5lIGl0ZW1zXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIGNvbnRhaW5pbmcgcGFpcnNcbiAqL1xuU3RyZWFtLnByb3RvdHlwZS56aXAgPSBmdW5jdGlvbiAoZiAvKiwgLi4uc3RyZWFtcyovKSB7XG4gIHJldHVybiB6aXBBcnJheShmLCBiYXNlLnJlcGxhY2UodGhpcywgMCwgYXJndW1lbnRzKSlcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFN3aXRjaGluZ1xuXG5pbXBvcnQgeyBzd2l0Y2hMYXRlc3QgfSBmcm9tICcuL2NvbWJpbmF0b3Ivc3dpdGNoJ1xuXG4vLyBAZGVwcmVjYXRlZCBzd2l0Y2gsIHVzZSBzd2l0Y2hMYXRlc3QgaW5zdGVhZFxuZXhwb3J0IHsgc3dpdGNoTGF0ZXN0LCBzd2l0Y2hMYXRlc3QgYXMgc3dpdGNoIH1cblxuLyoqXG4gKiBHaXZlbiBhIHN0cmVhbSBvZiBzdHJlYW1zLCByZXR1cm4gYSBuZXcgc3RyZWFtIHRoYXQgYWRvcHRzIHRoZSBiZWhhdmlvclxuICogb2YgdGhlIG1vc3QgcmVjZW50IGlubmVyIHN0cmVhbS5cbiAqIEByZXR1cm5zIHtTdHJlYW19IHN3aXRjaGluZyBzdHJlYW1cbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5zd2l0Y2hMYXRlc3QgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBzd2l0Y2hMYXRlc3QodGhpcylcbn1cblxuLy8gQGRlcHJlY2F0ZWQgdXNlIHN3aXRjaExhdGVzdCBpbnN0ZWFkXG5TdHJlYW0ucHJvdG90eXBlLnN3aXRjaCA9IFN0cmVhbS5wcm90b3R5cGUuc3dpdGNoTGF0ZXN0XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBGaWx0ZXJpbmdcblxuaW1wb3J0IHsgZmlsdGVyLCBza2lwUmVwZWF0cywgc2tpcFJlcGVhdHNXaXRoIH0gZnJvbSAnLi9jb21iaW5hdG9yL2ZpbHRlcidcblxuLy8gQGRlcHJlY2F0ZWQgZGlzdGluY3QsIHVzZSBza2lwUmVwZWF0cyBpbnN0ZWFkXG4vLyBAZGVwcmVjYXRlZCBkaXN0aW5jdEJ5LCB1c2Ugc2tpcFJlcGVhdHNXaXRoIGluc3RlYWRcbmV4cG9ydCB7IGZpbHRlciwgc2tpcFJlcGVhdHMsIHNraXBSZXBlYXRzIGFzIGRpc3RpbmN0LCBza2lwUmVwZWF0c1dpdGgsIHNraXBSZXBlYXRzV2l0aCBhcyBkaXN0aW5jdEJ5IH1cblxuLyoqXG4gKiBSZXRhaW4gb25seSBpdGVtcyBtYXRjaGluZyBhIHByZWRpY2F0ZVxuICogc3RyZWFtOiAgICAgICAgICAgICAgICAgICAgICAgICAgIC0xMjM0NTY3OC1cbiAqIGZpbHRlcih4ID0+IHggJSAyID09PSAwLCBzdHJlYW0pOiAtLTItNC02LTgtXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHg6Kik6Ym9vbGVhbn0gcCBmaWx0ZXJpbmcgcHJlZGljYXRlIGNhbGxlZCBmb3IgZWFjaCBpdGVtXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gY29udGFpbmluZyBvbmx5IGl0ZW1zIGZvciB3aGljaCBwcmVkaWNhdGUgcmV0dXJucyB0cnV0aHlcbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5maWx0ZXIgPSBmdW5jdGlvbiAocCkge1xuICByZXR1cm4gZmlsdGVyKHAsIHRoaXMpXG59XG5cbi8qKlxuICogU2tpcCByZXBlYXRlZCBldmVudHMsIHVzaW5nID09PSB0byBjb21wYXJlIGl0ZW1zXG4gKiBzdHJlYW06ICAgICAgICAgICAtYWJiY2QtXG4gKiBkaXN0aW5jdChzdHJlYW0pOiAtYWItY2QtXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gd2l0aCBubyByZXBlYXRlZCBldmVudHNcbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5za2lwUmVwZWF0cyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHNraXBSZXBlYXRzKHRoaXMpXG59XG5cbi8qKlxuICogU2tpcCByZXBlYXRlZCBldmVudHMsIHVzaW5nIHN1cHBsaWVkIGVxdWFscyBmdW5jdGlvbiB0byBjb21wYXJlIGl0ZW1zXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKGE6KiwgYjoqKTpib29sZWFufSBlcXVhbHMgZnVuY3Rpb24gdG8gY29tcGFyZSBpdGVtc1xuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIHdpdGggbm8gcmVwZWF0ZWQgZXZlbnRzXG4gKi9cblN0cmVhbS5wcm90b3R5cGUuc2tpcFJlcGVhdHNXaXRoID0gZnVuY3Rpb24gKGVxdWFscykge1xuICByZXR1cm4gc2tpcFJlcGVhdHNXaXRoKGVxdWFscywgdGhpcylcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFNsaWNpbmdcblxuaW1wb3J0IHsgdGFrZSwgc2tpcCwgc2xpY2UsIHRha2VXaGlsZSwgc2tpcFdoaWxlLCBza2lwQWZ0ZXIgfSBmcm9tICcuL2NvbWJpbmF0b3Ivc2xpY2UnXG5cbmV4cG9ydCB7IHRha2UsIHNraXAsIHNsaWNlLCB0YWtlV2hpbGUsIHNraXBXaGlsZSwgc2tpcEFmdGVyIH1cblxuLyoqXG4gKiBzdHJlYW06ICAgICAgICAgIC1hYmNkLVxuICogdGFrZSgyLCBzdHJlYW0pOiAtYWJ8XG4gKiBAcGFyYW0ge051bWJlcn0gbiB0YWtlIHVwIHRvIHRoaXMgbWFueSBldmVudHNcbiAqIEByZXR1cm5zIHtTdHJlYW19IHN0cmVhbSBjb250YWluaW5nIGF0IG1vc3QgdGhlIGZpcnN0IG4gaXRlbXMgZnJvbSB0aGlzIHN0cmVhbVxuICovXG5TdHJlYW0ucHJvdG90eXBlLnRha2UgPSBmdW5jdGlvbiAobikge1xuICByZXR1cm4gdGFrZShuLCB0aGlzKVxufVxuXG4vKipcbiAqIHN0cmVhbTogICAgICAgICAgLWFiY2QtPlxuICogc2tpcCgyLCBzdHJlYW0pOiAtLS1jZC0+XG4gKiBAcGFyYW0ge051bWJlcn0gbiBza2lwIHRoaXMgbWFueSBldmVudHNcbiAqIEByZXR1cm5zIHtTdHJlYW19IHN0cmVhbSBub3QgY29udGFpbmluZyB0aGUgZmlyc3QgbiBldmVudHNcbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5za2lwID0gZnVuY3Rpb24gKG4pIHtcbiAgcmV0dXJuIHNraXAobiwgdGhpcylcbn1cblxuLyoqXG4gKiBTbGljZSBhIHN0cmVhbSBieSBldmVudCBpbmRleC4gRXF1aXZhbGVudCB0bywgYnV0IG1vcmUgZWZmaWNpZW50IHRoYW5cbiAqIHN0cmVhbS50YWtlKGVuZCkuc2tpcChzdGFydCk7XG4gKiBOT1RFOiBOZWdhdGl2ZSBzdGFydCBhbmQgZW5kIGFyZSBub3Qgc3VwcG9ydGVkXG4gKiBAcGFyYW0ge051bWJlcn0gc3RhcnQgc2tpcCBhbGwgZXZlbnRzIGJlZm9yZSB0aGUgc3RhcnQgaW5kZXhcbiAqIEBwYXJhbSB7TnVtYmVyfSBlbmQgYWxsb3cgYWxsIGV2ZW50cyBmcm9tIHRoZSBzdGFydCBpbmRleCB0byB0aGUgZW5kIGluZGV4XG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gY29udGFpbmluZyBpdGVtcyB3aGVyZSBzdGFydCA8PSBpbmRleCA8IGVuZFxuICovXG5TdHJlYW0ucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgcmV0dXJuIHNsaWNlKHN0YXJ0LCBlbmQsIHRoaXMpXG59XG5cbi8qKlxuICogc3RyZWFtOiAgICAgICAgICAgICAgICAgICAgICAgIC0xMjM0NTEyMzQtPlxuICogdGFrZVdoaWxlKHggPT4geCA8IDUsIHN0cmVhbSk6IC0xMjM0fFxuICogQHBhcmFtIHtmdW5jdGlvbih4OiopOmJvb2xlYW59IHAgcHJlZGljYXRlXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gY29udGFpbmluZyBpdGVtcyB1cCB0bywgYnV0IG5vdCBpbmNsdWRpbmcsIHRoZVxuICogZmlyc3QgaXRlbSBmb3Igd2hpY2ggcCByZXR1cm5zIGZhbHN5LlxuICovXG5TdHJlYW0ucHJvdG90eXBlLnRha2VXaGlsZSA9IGZ1bmN0aW9uIChwKSB7XG4gIHJldHVybiB0YWtlV2hpbGUocCwgdGhpcylcbn1cblxuLyoqXG4gKiBzdHJlYW06ICAgICAgICAgICAgICAgICAgICAgICAgLTEyMzQ1MTIzNC0+XG4gKiBza2lwV2hpbGUoeCA9PiB4IDwgNSwgc3RyZWFtKTogLS0tLS01MTIzNC0+XG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHg6Kik6Ym9vbGVhbn0gcCBwcmVkaWNhdGVcbiAqIEByZXR1cm5zIHtTdHJlYW19IHN0cmVhbSBjb250YWluaW5nIGl0ZW1zIGZvbGxvd2luZyAqYW5kIGluY2x1ZGluZyogdGhlXG4gKiBmaXJzdCBpdGVtIGZvciB3aGljaCBwIHJldHVybnMgZmFsc3kuXG4gKi9cblN0cmVhbS5wcm90b3R5cGUuc2tpcFdoaWxlID0gZnVuY3Rpb24gKHApIHtcbiAgcmV0dXJuIHNraXBXaGlsZShwLCB0aGlzKVxufVxuXG4vKipcbiAqIHN0cmVhbTogICAgICAgICAgICAgICAgICAgICAgICAgLTEyMzQ1Njc4OS0+XG4gKiBza2lwQWZ0ZXIoeCA9PiB4ID09PSA1LCBzdHJlYW0pOi0xMjM0NXxcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oeDoqKTpib29sZWFufSBwIHByZWRpY2F0ZVxuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIGNvbnRhaW5pbmcgaXRlbXMgdXAgdG8sICphbmQgaW5jbHVkaW5nKiwgdGhlXG4gKiBmaXJzdCBpdGVtIGZvciB3aGljaCBwIHJldHVybnMgdHJ1dGh5LlxuICovXG5TdHJlYW0ucHJvdG90eXBlLnNraXBBZnRlciA9IGZ1bmN0aW9uIChwKSB7XG4gIHJldHVybiBza2lwQWZ0ZXIocCwgdGhpcylcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFRpbWUgc2xpY2luZ1xuXG5pbXBvcnQgeyB0YWtlVW50aWwsIHNraXBVbnRpbCwgZHVyaW5nIH0gZnJvbSAnLi9jb21iaW5hdG9yL3RpbWVzbGljZSdcblxuLy8gQGRlcHJlY2F0ZWQgdGFrZVVudGlsLCB1c2UgdW50aWwgaW5zdGVhZFxuLy8gQGRlcHJlY2F0ZWQgc2tpcFVudGlsLCB1c2Ugc2luY2UgaW5zdGVhZFxuZXhwb3J0IHsgdGFrZVVudGlsLCB0YWtlVW50aWwgYXMgdW50aWwsIHNraXBVbnRpbCwgc2tpcFVudGlsIGFzIHNpbmNlLCBkdXJpbmcgfVxuXG4vKipcbiAqIHN0cmVhbTogICAgICAgICAgICAgICAgICAgIC1hLWItYy1kLWUtZi1nLT5cbiAqIHNpZ25hbDogICAgICAgICAgICAgICAgICAgIC0tLS0tLS14XG4gKiB0YWtlVW50aWwoc2lnbmFsLCBzdHJlYW0pOiAtYS1iLWMtfFxuICogQHBhcmFtIHtTdHJlYW19IHNpZ25hbCByZXRhaW4gb25seSBldmVudHMgaW4gc3RyZWFtIGJlZm9yZSB0aGUgZmlyc3RcbiAqIGV2ZW50IGluIHNpZ25hbFxuICogQHJldHVybnMge1N0cmVhbX0gbmV3IHN0cmVhbSBjb250YWluaW5nIG9ubHkgZXZlbnRzIHRoYXQgb2NjdXIgYmVmb3JlXG4gKiB0aGUgZmlyc3QgZXZlbnQgaW4gc2lnbmFsLlxuICovXG5TdHJlYW0ucHJvdG90eXBlLnVudGlsID0gZnVuY3Rpb24gKHNpZ25hbCkge1xuICByZXR1cm4gdGFrZVVudGlsKHNpZ25hbCwgdGhpcylcbn1cblxuLy8gQGRlcHJlY2F0ZWQgdXNlIHVudGlsIGluc3RlYWRcblN0cmVhbS5wcm90b3R5cGUudGFrZVVudGlsID0gU3RyZWFtLnByb3RvdHlwZS51bnRpbFxuXG4gIC8qKlxuICogc3RyZWFtOiAgICAgICAgICAgICAgICAgICAgLWEtYi1jLWQtZS1mLWctPlxuICogc2lnbmFsOiAgICAgICAgICAgICAgICAgICAgLS0tLS0tLXhcbiAqIHRha2VVbnRpbChzaWduYWwsIHN0cmVhbSk6IC0tLS0tLS1kLWUtZi1nLT5cbiAqIEBwYXJhbSB7U3RyZWFtfSBzaWduYWwgcmV0YWluIG9ubHkgZXZlbnRzIGluIHN0cmVhbSBhdCBvciBhZnRlciB0aGUgZmlyc3RcbiAqIGV2ZW50IGluIHNpZ25hbFxuICogQHJldHVybnMge1N0cmVhbX0gbmV3IHN0cmVhbSBjb250YWluaW5nIG9ubHkgZXZlbnRzIHRoYXQgb2NjdXIgYWZ0ZXJcbiAqIHRoZSBmaXJzdCBldmVudCBpbiBzaWduYWwuXG4gKi9cblN0cmVhbS5wcm90b3R5cGUuc2luY2UgPSBmdW5jdGlvbiAoc2lnbmFsKSB7XG4gIHJldHVybiBza2lwVW50aWwoc2lnbmFsLCB0aGlzKVxufVxuXG4vLyBAZGVwcmVjYXRlZCB1c2Ugc2luY2UgaW5zdGVhZFxuU3RyZWFtLnByb3RvdHlwZS5za2lwVW50aWwgPSBTdHJlYW0ucHJvdG90eXBlLnNpbmNlXG5cbiAgLyoqXG4gKiBzdHJlYW06ICAgICAgICAgICAgICAgICAgICAtYS1iLWMtZC1lLWYtZy0+XG4gKiB0aW1lV2luZG93OiAgICAgICAgICAgICAgICAtLS0tLXNcbiAqIHM6ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0tLS0tdFxuICogc3RyZWFtLmR1cmluZyh0aW1lV2luZG93KTogLS0tLS1jLWQtZS18XG4gKiBAcGFyYW0ge1N0cmVhbTxTdHJlYW0+fSB0aW1lV2luZG93IGEgc3RyZWFtIHdob3NlIGZpcnN0IGV2ZW50IChzKSByZXByZXNlbnRzXG4gKiAgdGhlIHdpbmRvdyBzdGFydCB0aW1lLiAgVGhhdCBldmVudCAocykgaXMgaXRzZWxmIGEgc3RyZWFtIHdob3NlIGZpcnN0IGV2ZW50ICh0KVxuICogIHJlcHJlc2VudHMgdGhlIHdpbmRvdyBlbmQgdGltZVxuICogQHJldHVybnMge1N0cmVhbX0gbmV3IHN0cmVhbSBjb250YWluaW5nIG9ubHkgZXZlbnRzIHdpdGhpbiB0aGUgcHJvdmlkZWQgdGltZXNwYW5cbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5kdXJpbmcgPSBmdW5jdGlvbiAodGltZVdpbmRvdykge1xuICByZXR1cm4gZHVyaW5nKHRpbWVXaW5kb3csIHRoaXMpXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBEZWxheWluZ1xuXG5pbXBvcnQgeyBkZWxheSB9IGZyb20gJy4vY29tYmluYXRvci9kZWxheSdcblxuZXhwb3J0IHsgZGVsYXkgfVxuXG4vKipcbiAqIEBwYXJhbSB7TnVtYmVyfSBkZWxheVRpbWUgbWlsbGlzZWNvbmRzIHRvIGRlbGF5IGVhY2ggaXRlbVxuICogQHJldHVybnMge1N0cmVhbX0gbmV3IHN0cmVhbSBjb250YWluaW5nIHRoZSBzYW1lIGl0ZW1zLCBidXQgZGVsYXllZCBieSBtc1xuICovXG5TdHJlYW0ucHJvdG90eXBlLmRlbGF5ID0gZnVuY3Rpb24gKGRlbGF5VGltZSkge1xuICByZXR1cm4gZGVsYXkoZGVsYXlUaW1lLCB0aGlzKVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gR2V0dGluZyBldmVudCB0aW1lc3RhbXBcblxuaW1wb3J0IHsgdGltZXN0YW1wIH0gZnJvbSAnLi9jb21iaW5hdG9yL3RpbWVzdGFtcCdcbmV4cG9ydCB7IHRpbWVzdGFtcCB9XG5cbi8qKlxuICogRXhwb3NlIGV2ZW50IHRpbWVzdGFtcHMgaW50byB0aGUgc3RyZWFtLiBUdXJucyBhIFN0cmVhbTxYPiBpbnRvXG4gKiBTdHJlYW08e3RpbWU6dCwgdmFsdWU6WH0+XG4gKiBAcmV0dXJucyB7U3RyZWFtPHt0aW1lOm51bWJlciwgdmFsdWU6Kn0+fVxuICovXG5TdHJlYW0ucHJvdG90eXBlLnRpbWVzdGFtcCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRpbWVzdGFtcCh0aGlzKVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUmF0ZSBsaW1pdGluZ1xuXG5pbXBvcnQgeyB0aHJvdHRsZSwgZGVib3VuY2UgfSBmcm9tICcuL2NvbWJpbmF0b3IvbGltaXQnXG5cbmV4cG9ydCB7IHRocm90dGxlLCBkZWJvdW5jZSB9XG5cbi8qKlxuICogTGltaXQgdGhlIHJhdGUgb2YgZXZlbnRzXG4gKiBzdHJlYW06ICAgICAgICAgICAgICBhYmNkLS0tLWFiY2QtLS0tXG4gKiB0aHJvdHRsZSgyLCBzdHJlYW0pOiBhLWMtLS0tLWEtYy0tLS0tXG4gKiBAcGFyYW0ge051bWJlcn0gcGVyaW9kIHRpbWUgdG8gc3VwcHJlc3MgZXZlbnRzXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIHRoYXQgc2tpcHMgZXZlbnRzIGZvciB0aHJvdHRsZSBwZXJpb2RcbiAqL1xuU3RyZWFtLnByb3RvdHlwZS50aHJvdHRsZSA9IGZ1bmN0aW9uIChwZXJpb2QpIHtcbiAgcmV0dXJuIHRocm90dGxlKHBlcmlvZCwgdGhpcylcbn1cblxuLyoqXG4gKiBXYWl0IGZvciBhIGJ1cnN0IG9mIGV2ZW50cyB0byBzdWJzaWRlIGFuZCBlbWl0IG9ubHkgdGhlIGxhc3QgZXZlbnQgaW4gdGhlIGJ1cnN0XG4gKiBzdHJlYW06ICAgICAgICAgICAgICBhYmNkLS0tLWFiY2QtLS0tXG4gKiBkZWJvdW5jZSgyLCBzdHJlYW0pOiAtLS0tLWQtLS0tLS0tZC0tXG4gKiBAcGFyYW0ge051bWJlcn0gcGVyaW9kIGV2ZW50cyBvY2N1cmluZyBtb3JlIGZyZXF1ZW50bHkgdGhhbiB0aGlzXG4gKiAgb24gdGhlIHByb3ZpZGVkIHNjaGVkdWxlciB3aWxsIGJlIHN1cHByZXNzZWRcbiAqIEByZXR1cm5zIHtTdHJlYW19IG5ldyBkZWJvdW5jZWQgc3RyZWFtXG4gKi9cblN0cmVhbS5wcm90b3R5cGUuZGVib3VuY2UgPSBmdW5jdGlvbiAocGVyaW9kKSB7XG4gIHJldHVybiBkZWJvdW5jZShwZXJpb2QsIHRoaXMpXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBBd2FpdGluZyBQcm9taXNlc1xuXG5pbXBvcnQgeyBmcm9tUHJvbWlzZSwgYXdhaXRQcm9taXNlcyB9IGZyb20gJy4vY29tYmluYXRvci9wcm9taXNlcydcblxuLy8gQGRlcHJlY2F0ZWQgYXdhaXQsIHVzZSBhd2FpdFByb21pc2VzIGluc3RlYWRcbmV4cG9ydCB7IGZyb21Qcm9taXNlLCBhd2FpdFByb21pc2VzLCBhd2FpdFByb21pc2VzIGFzIGF3YWl0IH1cblxuLyoqXG4gKiBBd2FpdCBwcm9taXNlcywgdHVybmluZyBhIFN0cmVhbTxQcm9taXNlPFg+PiBpbnRvIFN0cmVhbTxYPi4gIFByZXNlcnZlc1xuICogZXZlbnQgb3JkZXIsIGJ1dCB0aW1lc2hpZnRzIGV2ZW50cyBiYXNlZCBvbiBwcm9taXNlIHJlc29sdXRpb24gdGltZS5cbiAqIEByZXR1cm5zIHtTdHJlYW08WD59IHN0cmVhbSBjb250YWluaW5nIG5vbi1wcm9taXNlIHZhbHVlc1xuICovXG5TdHJlYW0ucHJvdG90eXBlLmF3YWl0UHJvbWlzZXMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBhd2FpdFByb21pc2VzKHRoaXMpXG59XG5cbi8vIEBkZXByZWNhdGVkIHVzZSBhd2FpdFByb21pc2VzIGluc3RlYWRcblN0cmVhbS5wcm90b3R5cGUuYXdhaXQgPSBTdHJlYW0ucHJvdG90eXBlLmF3YWl0UHJvbWlzZXNcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEVycm9yIGhhbmRsaW5nXG5cbmltcG9ydCB7IHJlY292ZXJXaXRoLCBmbGF0TWFwRXJyb3IsIHRocm93RXJyb3IgfSBmcm9tICcuL2NvbWJpbmF0b3IvZXJyb3JzJ1xuXG4vLyBAZGVwcmVjYXRlZCBmbGF0TWFwRXJyb3IsIHVzZSByZWNvdmVyV2l0aCBpbnN0ZWFkXG5leHBvcnQgeyByZWNvdmVyV2l0aCwgZmxhdE1hcEVycm9yLCB0aHJvd0Vycm9yIH1cblxuLyoqXG4gKiBJZiB0aGlzIHN0cmVhbSBlbmNvdW50ZXJzIGFuIGVycm9yLCByZWNvdmVyIGFuZCBjb250aW51ZSB3aXRoIGl0ZW1zIGZyb20gc3RyZWFtXG4gKiByZXR1cm5lZCBieSBmLlxuICogc3RyZWFtOiAgICAgICAgICAgICAgICAgIC1hLWItYy1YLVxuICogZihYKTogICAgICAgICAgICAgICAgICAgICAgICAgICBkLWUtZi1nLVxuICogZmxhdE1hcEVycm9yKGYsIHN0cmVhbSk6IC1hLWItYy1kLWUtZi1nLVxuICogQHBhcmFtIHtmdW5jdGlvbihlcnJvcjoqKTpTdHJlYW19IGYgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhIG5ldyBzdHJlYW1cbiAqIEByZXR1cm5zIHtTdHJlYW19IG5ldyBzdHJlYW0gd2hpY2ggd2lsbCByZWNvdmVyIGZyb20gYW4gZXJyb3IgYnkgY2FsbGluZyBmXG4gKi9cblN0cmVhbS5wcm90b3R5cGUucmVjb3ZlcldpdGggPSBmdW5jdGlvbiAoZikge1xuICByZXR1cm4gZmxhdE1hcEVycm9yKGYsIHRoaXMpXG59XG5cbi8vIEBkZXByZWNhdGVkIHVzZSByZWNvdmVyV2l0aCBpbnN0ZWFkXG5TdHJlYW0ucHJvdG90eXBlLmZsYXRNYXBFcnJvciA9IFN0cmVhbS5wcm90b3R5cGUucmVjb3ZlcldpdGhcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE11bHRpY2FzdGluZ1xuXG5pbXBvcnQgbXVsdGljYXN0IGZyb20gJ0Btb3N0L211bHRpY2FzdCdcblxuZXhwb3J0IHsgbXVsdGljYXN0IH1cblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIHN0cmVhbSBpbnRvIG11bHRpY2FzdCBzdHJlYW0uICBUaGF0IG1lYW5zIHRoYXQgbWFueSBzdWJzY3JpYmVyc1xuICogdG8gdGhlIHN0cmVhbSB3aWxsIG5vdCBjYXVzZSBtdWx0aXBsZSBpbnZvY2F0aW9ucyBvZiB0aGUgaW50ZXJuYWwgbWFjaGluZXJ5LlxuICogQHJldHVybnMge1N0cmVhbX0gbmV3IHN0cmVhbSB3aGljaCB3aWxsIG11bHRpY2FzdCBldmVudHMgdG8gYWxsIG9ic2VydmVycy5cbiAqL1xuU3RyZWFtLnByb3RvdHlwZS5tdWx0aWNhc3QgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBtdWx0aWNhc3QodGhpcylcbn1cblxuLy8gZXhwb3J0IHRoZSBpbnN0YW5jZSBvZiB0aGUgZGVmYXVsdFNjaGVkdWxlciBmb3IgdGhpcmQtcGFydHkgbGlicmFyaWVzXG5pbXBvcnQgZGVmYXVsdFNjaGVkdWxlciBmcm9tICcuL3NjaGVkdWxlci9kZWZhdWx0U2NoZWR1bGVyJ1xuXG5leHBvcnQgeyBkZWZhdWx0U2NoZWR1bGVyIH1cblxuLy8gZXhwb3J0IGFuIGltcGxlbWVudGF0aW9uIG9mIFRhc2sgdXNlZCBpbnRlcm5hbGx5IGZvciB0aGlyZC1wYXJ0eSBsaWJyYXJpZXNcbmltcG9ydCBQcm9wYWdhdGVUYXNrIGZyb20gJy4vc2NoZWR1bGVyL1Byb3BhZ2F0ZVRhc2snXG5cbmV4cG9ydCB7IFByb3BhZ2F0ZVRhc2sgfVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBEaXNwb3NhYmxlIHdoaWNoIHdpbGwgZGlzcG9zZSBpdHMgdW5kZXJseWluZyByZXNvdXJjZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGRpc3Bvc2UgZnVuY3Rpb25cbiAqIEBwYXJhbSB7Kj99IGRhdGEgYW55IGRhdGEgdG8gYmUgcGFzc2VkIHRvIGRpc3Bvc2VyIGZ1bmN0aW9uXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGlzcG9zYWJsZSAoZGlzcG9zZSwgZGF0YSkge1xuICB0aGlzLl9kaXNwb3NlID0gZGlzcG9zZVxuICB0aGlzLl9kYXRhID0gZGF0YVxufVxuXG5EaXNwb3NhYmxlLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5fZGlzcG9zZSh0aGlzLl9kYXRhKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvZGlzcG9zYWJsZS9EaXNwb3NhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2V0dGFibGVEaXNwb3NhYmxlICgpIHtcbiAgdGhpcy5kaXNwb3NhYmxlID0gdm9pZCAwXG4gIHRoaXMuZGlzcG9zZWQgPSBmYWxzZVxuICB0aGlzLl9yZXNvbHZlID0gdm9pZCAwXG5cbiAgdmFyIHNlbGYgPSB0aGlzXG4gIHRoaXMucmVzdWx0ID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICBzZWxmLl9yZXNvbHZlID0gcmVzb2x2ZVxuICB9KVxufVxuXG5TZXR0YWJsZURpc3Bvc2FibGUucHJvdG90eXBlLnNldERpc3Bvc2FibGUgPSBmdW5jdGlvbiAoZGlzcG9zYWJsZSkge1xuICBpZiAodGhpcy5kaXNwb3NhYmxlICE9PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldERpc3Bvc2FibGUgY2FsbGVkIG1vcmUgdGhhbiBvbmNlJylcbiAgfVxuXG4gIHRoaXMuZGlzcG9zYWJsZSA9IGRpc3Bvc2FibGVcblxuICBpZiAodGhpcy5kaXNwb3NlZCkge1xuICAgIHRoaXMuX3Jlc29sdmUoZGlzcG9zYWJsZS5kaXNwb3NlKCkpXG4gIH1cbn1cblxuU2V0dGFibGVEaXNwb3NhYmxlLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5kaXNwb3NlZCkge1xuICAgIHJldHVybiB0aGlzLnJlc3VsdFxuICB9XG5cbiAgdGhpcy5kaXNwb3NlZCA9IHRydWVcblxuICBpZiAodGhpcy5kaXNwb3NhYmxlICE9PSB2b2lkIDApIHtcbiAgICB0aGlzLnJlc3VsdCA9IHRoaXMuZGlzcG9zYWJsZS5kaXNwb3NlKClcbiAgfVxuXG4gIHJldHVybiB0aGlzLnJlc3VsdFxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvZGlzcG9zYWJsZS9TZXR0YWJsZURpc3Bvc2FibGUuanNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaXNQcm9taXNlIChwKSB7XG4gIHJldHVybiBwICE9PSBudWxsICYmIHR5cGVvZiBwID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgcC50aGVuID09PSAnZnVuY3Rpb24nXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9Qcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFN0cmVhbSBmcm9tICcuLi9TdHJlYW0nXG5pbXBvcnQgeyBmcm9tQXJyYXkgfSBmcm9tICcuL2Zyb21BcnJheSdcbmltcG9ydCB7IGlzSXRlcmFibGUgfSBmcm9tICcuLi9pdGVyYWJsZSdcbmltcG9ydCB7IGZyb21JdGVyYWJsZSB9IGZyb20gJy4vZnJvbUl0ZXJhYmxlJ1xuaW1wb3J0IGdldE9ic2VydmFibGUgZnJvbSAnLi4vb2JzZXJ2YWJsZS9nZXRPYnNlcnZhYmxlJ1xuaW1wb3J0IHsgZnJvbU9ic2VydmFibGUgfSBmcm9tICcuLi9vYnNlcnZhYmxlL2Zyb21PYnNlcnZhYmxlJ1xuaW1wb3J0IHsgaXNBcnJheUxpa2UgfSBmcm9tICdAbW9zdC9wcmVsdWRlJ1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbSAoYSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNvbXBsZXhpdHlcbiAgaWYgKGEgaW5zdGFuY2VvZiBTdHJlYW0pIHtcbiAgICByZXR1cm4gYVxuICB9XG5cbiAgdmFyIG9ic2VydmFibGUgPSBnZXRPYnNlcnZhYmxlKGEpXG4gIGlmIChvYnNlcnZhYmxlICE9IG51bGwpIHtcbiAgICByZXR1cm4gZnJvbU9ic2VydmFibGUob2JzZXJ2YWJsZSlcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KGEpIHx8IGlzQXJyYXlMaWtlKGEpKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheShhKVxuICB9XG5cbiAgaWYgKGlzSXRlcmFibGUoYSkpIHtcbiAgICByZXR1cm4gZnJvbUl0ZXJhYmxlKGEpXG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdmcm9tKHgpIG11c3QgYmUgb2JzZXJ2YWJsZSwgaXRlcmFibGUsIG9yIGFycmF5LWxpa2U6ICcgKyBhKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc291cmNlL2Zyb20uanNcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCBQcm9wYWdhdGVUYXNrIGZyb20gJy4uL3NjaGVkdWxlci9Qcm9wYWdhdGVUYXNrJ1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbUFycmF5IChhKSB7XG4gIHJldHVybiBuZXcgU3RyZWFtKG5ldyBBcnJheVNvdXJjZShhKSlcbn1cblxuZnVuY3Rpb24gQXJyYXlTb3VyY2UgKGEpIHtcbiAgdGhpcy5hcnJheSA9IGFcbn1cblxuQXJyYXlTb3VyY2UucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgcmV0dXJuIHNjaGVkdWxlci5hc2FwKG5ldyBQcm9wYWdhdGVUYXNrKHJ1blByb2R1Y2VyLCB0aGlzLmFycmF5LCBzaW5rKSlcbn1cblxuZnVuY3Rpb24gcnVuUHJvZHVjZXIgKHQsIGFycmF5LCBzaW5rKSB7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJyYXkubGVuZ3RoOyBpIDwgbCAmJiB0aGlzLmFjdGl2ZTsgKytpKSB7XG4gICAgc2luay5ldmVudCh0LCBhcnJheVtpXSlcbiAgfVxuXG4gIHRoaXMuYWN0aXZlICYmIHNpbmsuZW5kKHQpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zb3VyY2UvZnJvbUFycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFN0cmVhbSBmcm9tICcuLi9TdHJlYW0nXG5pbXBvcnQgeyBnZXRJdGVyYXRvciB9IGZyb20gJy4uL2l0ZXJhYmxlJ1xuaW1wb3J0IFByb3BhZ2F0ZVRhc2sgZnJvbSAnLi4vc2NoZWR1bGVyL1Byb3BhZ2F0ZVRhc2snXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tSXRlcmFibGUgKGl0ZXJhYmxlKSB7XG4gIHJldHVybiBuZXcgU3RyZWFtKG5ldyBJdGVyYWJsZVNvdXJjZShpdGVyYWJsZSkpXG59XG5cbmZ1bmN0aW9uIEl0ZXJhYmxlU291cmNlIChpdGVyYWJsZSkge1xuICB0aGlzLml0ZXJhYmxlID0gaXRlcmFibGVcbn1cblxuSXRlcmFibGVTb3VyY2UucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgcmV0dXJuIHNjaGVkdWxlci5hc2FwKG5ldyBQcm9wYWdhdGVUYXNrKHJ1blByb2R1Y2VyLCBnZXRJdGVyYXRvcih0aGlzLml0ZXJhYmxlKSwgc2luaykpXG59XG5cbmZ1bmN0aW9uIHJ1blByb2R1Y2VyICh0LCBpdGVyYXRvciwgc2luaykge1xuICB2YXIgciA9IGl0ZXJhdG9yLm5leHQoKVxuXG4gIHdoaWxlICghci5kb25lICYmIHRoaXMuYWN0aXZlKSB7XG4gICAgc2luay5ldmVudCh0LCByLnZhbHVlKVxuICAgIHIgPSBpdGVyYXRvci5uZXh0KClcbiAgfVxuXG4gIHNpbmsuZW5kKHQsIHIudmFsdWUpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zb3VyY2UvZnJvbUl0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IHN5bWJvbE9ic2VydmFibGUgZnJvbSAnc3ltYm9sLW9ic2VydmFibGUnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE9ic2VydmFibGUgKG8pIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjb21wbGV4aXR5XG4gIHZhciBvYnMgPSBudWxsXG4gIGlmIChvKSB7XG4gIC8vIEFjY2VzcyBmb3JlaWduIG1ldGhvZCBvbmx5IG9uY2VcbiAgICB2YXIgbWV0aG9kID0gb1tzeW1ib2xPYnNlcnZhYmxlXVxuICAgIGlmICh0eXBlb2YgbWV0aG9kID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvYnMgPSBtZXRob2QuY2FsbChvKVxuICAgICAgaWYgKCEob2JzICYmIHR5cGVvZiBvYnMuc3Vic2NyaWJlID09PSAnZnVuY3Rpb24nKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpbnZhbGlkIG9ic2VydmFibGUgJyArIG9icylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JzXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9vYnNlcnZhYmxlL2dldE9ic2VydmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9wb255ZmlsbCA9IHJlcXVpcmUoJy4vcG9ueWZpbGwuanMnKTtcblxudmFyIF9wb255ZmlsbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb255ZmlsbCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIHJvb3Q7IC8qIGdsb2JhbCB3aW5kb3cgKi9cblxuXG5pZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBzZWxmO1xufSBlbHNlIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gZ2xvYmFsO1xufSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gbW9kdWxlO1xufSBlbHNlIHtcbiAgcm9vdCA9IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG59XG5cbnZhciByZXN1bHQgPSAoMCwgX3BvbnlmaWxsMlsnZGVmYXVsdCddKShyb290KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHJlc3VsdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zeW1ib2wtb2JzZXJ2YWJsZS9saWIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxyXG5cdFx0ZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcclxuXHRpZighbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xyXG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XHJcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcclxuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxyXG5cdFx0aWYoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcclxuXHR9XHJcblx0cmV0dXJuIG1vZHVsZTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzXG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzWydkZWZhdWx0J10gPSBzeW1ib2xPYnNlcnZhYmxlUG9ueWZpbGw7XG5mdW5jdGlvbiBzeW1ib2xPYnNlcnZhYmxlUG9ueWZpbGwocm9vdCkge1xuXHR2YXIgcmVzdWx0O1xuXHR2YXIgX1N5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5cdGlmICh0eXBlb2YgX1N5bWJvbCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdGlmIChfU3ltYm9sLm9ic2VydmFibGUpIHtcblx0XHRcdHJlc3VsdCA9IF9TeW1ib2wub2JzZXJ2YWJsZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0ID0gX1N5bWJvbCgnb2JzZXJ2YWJsZScpO1xuXHRcdFx0X1N5bWJvbC5vYnNlcnZhYmxlID0gcmVzdWx0O1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRyZXN1bHQgPSAnQEBvYnNlcnZhYmxlJztcblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2xpYi9wb255ZmlsbC5qc1xuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBTdHJlYW0gZnJvbSAnLi4vU3RyZWFtJ1xuaW1wb3J0ICogYXMgZGlzcG9zZSBmcm9tICcuLi9kaXNwb3NhYmxlL2Rpc3Bvc2UnXG5pbXBvcnQgeyB0cnlFbmQsIHRyeUV2ZW50IH0gZnJvbSAnLi4vc291cmNlL3RyeUV2ZW50J1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbU9ic2VydmFibGUgKG9ic2VydmFibGUpIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IE9ic2VydmFibGVTb3VyY2Uob2JzZXJ2YWJsZSkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBPYnNlcnZhYmxlU291cmNlIChvYnNlcnZhYmxlKSB7XG4gIHRoaXMub2JzZXJ2YWJsZSA9IG9ic2VydmFibGVcbn1cblxuT2JzZXJ2YWJsZVNvdXJjZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICB2YXIgc3ViID0gdGhpcy5vYnNlcnZhYmxlLnN1YnNjcmliZShuZXcgU3Vic2NyaWJlclNpbmsoc2luaywgc2NoZWR1bGVyKSlcbiAgaWYgKHR5cGVvZiBzdWIgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZGlzcG9zZS5jcmVhdGUoc3ViKVxuICB9IGVsc2UgaWYgKHN1YiAmJiB0eXBlb2Ygc3ViLnVuc3Vic2NyaWJlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGRpc3Bvc2UuY3JlYXRlKHVuc3Vic2NyaWJlLCBzdWIpXG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdPYnNlcnZhYmxlIHJldHVybmVkIGludmFsaWQgc3Vic2NyaXB0aW9uICcgKyBTdHJpbmcoc3ViKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFN1YnNjcmliZXJTaW5rIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlclxufVxuXG5TdWJzY3JpYmVyU2luay5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICh4KSB7XG4gIHRyeUV2ZW50KHRoaXMuc2NoZWR1bGVyLm5vdygpLCB4LCB0aGlzLnNpbmspXG59XG5cblN1YnNjcmliZXJTaW5rLnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uICh4KSB7XG4gIHRyeUVuZCh0aGlzLnNjaGVkdWxlci5ub3coKSwgeCwgdGhpcy5zaW5rKVxufVxuXG5TdWJzY3JpYmVyU2luay5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuICB0aGlzLnNpbmsuZXJyb3IodGhpcy5zY2hlZHVsZXIubm93KCksIGUpXG59XG5cbmZ1bmN0aW9uIHVuc3Vic2NyaWJlIChzdWJzY3JpcHRpb24pIHtcbiAgcmV0dXJuIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9vYnNlcnZhYmxlL2Zyb21PYnNlcnZhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFN0cmVhbSBmcm9tICcuLi9TdHJlYW0nXG5pbXBvcnQgUHJvcGFnYXRlVGFzayBmcm9tICcuLi9zY2hlZHVsZXIvUHJvcGFnYXRlVGFzaydcblxuLyoqXG4gKiBDcmVhdGUgYSBzdHJlYW0gdGhhdCBlbWl0cyB0aGUgY3VycmVudCB0aW1lIHBlcmlvZGljYWxseVxuICogQHBhcmFtIHtOdW1iZXJ9IHBlcmlvZCBwZXJpb2RpY2l0eSBvZiBldmVudHMgaW4gbWlsbGlzXG4gKiBAcGFyYW0geyp9IGRlcHJlY2F0ZWRWYWx1ZSBAZGVwcmVjYXRlZCB2YWx1ZSB0byBlbWl0IGVhY2ggcGVyaW9kXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIHRoYXQgZW1pdHMgdGhlIGN1cnJlbnQgdGltZSBldmVyeSBwZXJpb2RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBlcmlvZGljIChwZXJpb2QsIGRlcHJlY2F0ZWRWYWx1ZSkge1xuICByZXR1cm4gbmV3IFN0cmVhbShuZXcgUGVyaW9kaWMocGVyaW9kLCBkZXByZWNhdGVkVmFsdWUpKVxufVxuXG5mdW5jdGlvbiBQZXJpb2RpYyAocGVyaW9kLCB2YWx1ZSkge1xuICB0aGlzLnBlcmlvZCA9IHBlcmlvZFxuICB0aGlzLnZhbHVlID0gdmFsdWVcbn1cblxuUGVyaW9kaWMucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgcmV0dXJuIHNjaGVkdWxlci5wZXJpb2RpYyh0aGlzLnBlcmlvZCwgUHJvcGFnYXRlVGFzay5ldmVudCh0aGlzLnZhbHVlLCBzaW5rKSlcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NvdXJjZS9wZXJpb2RpYy5qc1xuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBkZWZhdWx0U2NoZWR1bGVyIGZyb20gJy4uL3NjaGVkdWxlci9kZWZhdWx0U2NoZWR1bGVyJ1xuaW1wb3J0ICogYXMgZGlzcG9zZSBmcm9tICcuLi9kaXNwb3NhYmxlL2Rpc3Bvc2UnXG5pbXBvcnQgZmF0YWxFcnJvciBmcm9tICcuLi9mYXRhbEVycm9yJ1xuXG5leHBvcnQgZnVuY3Rpb24gc3Vic2NyaWJlIChzdWJzY3JpYmVyLCBzdHJlYW0pIHtcbiAgaWYgKE9iamVjdChzdWJzY3JpYmVyKSAhPT0gc3Vic2NyaWJlcikge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3N1YnNjcmliZXIgbXVzdCBiZSBhbiBvYmplY3QnKVxuICB9XG5cbiAgdmFyIGRpc3Bvc2FibGUgPSBkaXNwb3NlLnNldHRhYmxlKClcbiAgdmFyIG9ic2VydmVyID0gbmV3IFN1YnNjcmliZU9ic2VydmVyKGZhdGFsRXJyb3IsIHN1YnNjcmliZXIsIGRpc3Bvc2FibGUpXG5cbiAgZGlzcG9zYWJsZS5zZXREaXNwb3NhYmxlKHN0cmVhbS5zb3VyY2UucnVuKG9ic2VydmVyLCBkZWZhdWx0U2NoZWR1bGVyKSlcblxuICByZXR1cm4gbmV3IFN1YnNjcmlwdGlvbihkaXNwb3NhYmxlKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU3Vic2NyaWJlT2JzZXJ2ZXIgKGZhdGFsRXJyb3IsIHN1YnNjcmliZXIsIGRpc3Bvc2FibGUpIHtcbiAgdGhpcy5mYXRhbEVycm9yID0gZmF0YWxFcnJvclxuICB0aGlzLnN1YnNjcmliZXIgPSBzdWJzY3JpYmVyXG4gIHRoaXMuZGlzcG9zYWJsZSA9IGRpc3Bvc2FibGVcbn1cblxuU3Vic2NyaWJlT2JzZXJ2ZXIucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgaWYgKCF0aGlzLmRpc3Bvc2FibGUuZGlzcG9zZWQgJiYgdHlwZW9mIHRoaXMuc3Vic2NyaWJlci5uZXh0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhpcy5zdWJzY3JpYmVyLm5leHQoeClcbiAgfVxufVxuXG5TdWJzY3JpYmVPYnNlcnZlci5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgaWYgKCF0aGlzLmRpc3Bvc2FibGUuZGlzcG9zZWQpIHtcbiAgICB2YXIgcyA9IHRoaXMuc3Vic2NyaWJlclxuICAgIHZhciBmYXRhbEVycm9yID0gdGhpcy5mYXRhbEVycm9yXG4gICAgUHJvbWlzZS5yZXNvbHZlKHRoaXMuZGlzcG9zYWJsZS5kaXNwb3NlKCkpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHR5cGVvZiBzLmNvbXBsZXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHMuY29tcGxldGUoeClcbiAgICAgIH1cbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xuICAgICAgdGhyb3dFcnJvcihlLCBzLCBmYXRhbEVycm9yKVxuICAgIH0pXG4gIH1cbn1cblxuU3Vic2NyaWJlT2JzZXJ2ZXIucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKHQsIGUpIHtcbiAgdmFyIHMgPSB0aGlzLnN1YnNjcmliZXJcbiAgdmFyIGZhdGFsRXJyb3IgPSB0aGlzLmZhdGFsRXJyb3JcbiAgUHJvbWlzZS5yZXNvbHZlKHRoaXMuZGlzcG9zYWJsZS5kaXNwb3NlKCkpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIHRocm93RXJyb3IoZSwgcywgZmF0YWxFcnJvcilcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFN1YnNjcmlwdGlvbiAoZGlzcG9zYWJsZSkge1xuICB0aGlzLmRpc3Bvc2FibGUgPSBkaXNwb3NhYmxlXG59XG5cblN1YnNjcmlwdGlvbi5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZGlzcG9zYWJsZS5kaXNwb3NlKClcbn1cblxuZnVuY3Rpb24gdGhyb3dFcnJvciAoZTEsIHN1YnNjcmliZXIsIHRocm93RXJyb3IpIHtcbiAgaWYgKHR5cGVvZiBzdWJzY3JpYmVyLmVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdHJ5IHtcbiAgICAgIHN1YnNjcmliZXIuZXJyb3IoZTEpXG4gICAgfSBjYXRjaCAoZTIpIHtcbiAgICAgIHRocm93RXJyb3IoZTIpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93RXJyb3IoZTEpXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL29ic2VydmFibGUvc3Vic2NyaWJlLmpzXG4vLyBtb2R1bGUgaWQgPSA0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFNjaGVkdWxlZFRhc2sgZnJvbSAnLi9TY2hlZHVsZWRUYXNrJ1xuaW1wb3J0IHsgcnVuVGFzayB9IGZyb20gJy4uL3Rhc2snXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNjaGVkdWxlciAodGltZXIsIHRpbWVsaW5lKSB7XG4gIHRoaXMudGltZXIgPSB0aW1lclxuICB0aGlzLnRpbWVsaW5lID0gdGltZWxpbmVcblxuICB0aGlzLl90aW1lciA9IG51bGxcbiAgdGhpcy5fbmV4dEFycml2YWwgPSBJbmZpbml0eVxuXG4gIHZhciBzZWxmID0gdGhpc1xuICB0aGlzLl9ydW5SZWFkeVRhc2tzQm91bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2VsZi5fcnVuUmVhZHlUYXNrcyhzZWxmLm5vdygpKVxuICB9XG59XG5cblNjaGVkdWxlci5wcm90b3R5cGUubm93ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy50aW1lci5ub3coKVxufVxuXG5TY2hlZHVsZXIucHJvdG90eXBlLmFzYXAgPSBmdW5jdGlvbiAodGFzaykge1xuICByZXR1cm4gdGhpcy5zY2hlZHVsZSgwLCAtMSwgdGFzaylcbn1cblxuU2NoZWR1bGVyLnByb3RvdHlwZS5kZWxheSA9IGZ1bmN0aW9uIChkZWxheSwgdGFzaykge1xuICByZXR1cm4gdGhpcy5zY2hlZHVsZShkZWxheSwgLTEsIHRhc2spXG59XG5cblNjaGVkdWxlci5wcm90b3R5cGUucGVyaW9kaWMgPSBmdW5jdGlvbiAocGVyaW9kLCB0YXNrKSB7XG4gIHJldHVybiB0aGlzLnNjaGVkdWxlKDAsIHBlcmlvZCwgdGFzaylcbn1cblxuU2NoZWR1bGVyLnByb3RvdHlwZS5zY2hlZHVsZSA9IGZ1bmN0aW9uIChkZWxheSwgcGVyaW9kLCB0YXNrKSB7XG4gIHZhciBub3cgPSB0aGlzLm5vdygpXG4gIHZhciBzdCA9IG5ldyBTY2hlZHVsZWRUYXNrKG5vdyArIE1hdGgubWF4KDAsIGRlbGF5KSwgcGVyaW9kLCB0YXNrLCB0aGlzKVxuXG4gIHRoaXMudGltZWxpbmUuYWRkKHN0KVxuICB0aGlzLl9zY2hlZHVsZU5leHRSdW4obm93KVxuICByZXR1cm4gc3Rcbn1cblxuU2NoZWR1bGVyLnByb3RvdHlwZS5jYW5jZWwgPSBmdW5jdGlvbiAodGFzaykge1xuICB0YXNrLmFjdGl2ZSA9IGZhbHNlXG4gIGlmICh0aGlzLnRpbWVsaW5lLnJlbW92ZSh0YXNrKSkge1xuICAgIHRoaXMuX3Jlc2NoZWR1bGUoKVxuICB9XG59XG5cblNjaGVkdWxlci5wcm90b3R5cGUuY2FuY2VsQWxsID0gZnVuY3Rpb24gKGYpIHtcbiAgdGhpcy50aW1lbGluZS5yZW1vdmVBbGwoZilcbiAgdGhpcy5fcmVzY2hlZHVsZSgpXG59XG5cblNjaGVkdWxlci5wcm90b3R5cGUuX3Jlc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLnRpbWVsaW5lLmlzRW1wdHkoKSkge1xuICAgIHRoaXMuX3Vuc2NoZWR1bGUoKVxuICB9IGVsc2Uge1xuICAgIHRoaXMuX3NjaGVkdWxlTmV4dFJ1bih0aGlzLm5vdygpKVxuICB9XG59XG5cblNjaGVkdWxlci5wcm90b3R5cGUuX3Vuc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMudGltZXIuY2xlYXJUaW1lcih0aGlzLl90aW1lcilcbiAgdGhpcy5fdGltZXIgPSBudWxsXG59XG5cblNjaGVkdWxlci5wcm90b3R5cGUuX3NjaGVkdWxlTmV4dFJ1biA9IGZ1bmN0aW9uIChub3cpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjb21wbGV4aXR5XG4gIGlmICh0aGlzLnRpbWVsaW5lLmlzRW1wdHkoKSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIG5leHRBcnJpdmFsID0gdGhpcy50aW1lbGluZS5uZXh0QXJyaXZhbCgpXG5cbiAgaWYgKHRoaXMuX3RpbWVyID09PSBudWxsKSB7XG4gICAgdGhpcy5fc2NoZWR1bGVOZXh0QXJyaXZhbChuZXh0QXJyaXZhbCwgbm93KVxuICB9IGVsc2UgaWYgKG5leHRBcnJpdmFsIDwgdGhpcy5fbmV4dEFycml2YWwpIHtcbiAgICB0aGlzLl91bnNjaGVkdWxlKClcbiAgICB0aGlzLl9zY2hlZHVsZU5leHRBcnJpdmFsKG5leHRBcnJpdmFsLCBub3cpXG4gIH1cbn1cblxuU2NoZWR1bGVyLnByb3RvdHlwZS5fc2NoZWR1bGVOZXh0QXJyaXZhbCA9IGZ1bmN0aW9uIChuZXh0QXJyaXZhbCwgbm93KSB7XG4gIHRoaXMuX25leHRBcnJpdmFsID0gbmV4dEFycml2YWxcbiAgdmFyIGRlbGF5ID0gTWF0aC5tYXgoMCwgbmV4dEFycml2YWwgLSBub3cpXG4gIHRoaXMuX3RpbWVyID0gdGhpcy50aW1lci5zZXRUaW1lcih0aGlzLl9ydW5SZWFkeVRhc2tzQm91bmQsIGRlbGF5KVxufVxuXG5TY2hlZHVsZXIucHJvdG90eXBlLl9ydW5SZWFkeVRhc2tzID0gZnVuY3Rpb24gKG5vdykge1xuICB0aGlzLl90aW1lciA9IG51bGxcbiAgdGhpcy50aW1lbGluZS5ydW5UYXNrcyhub3csIHJ1blRhc2spXG4gIHRoaXMuX3NjaGVkdWxlTmV4dFJ1bih0aGlzLm5vdygpKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc2NoZWR1bGVyL1NjaGVkdWxlci5qc1xuLy8gbW9kdWxlIGlkID0gNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNjaGVkdWxlZFRhc2sgKGRlbGF5LCBwZXJpb2QsIHRhc2ssIHNjaGVkdWxlcikge1xuICB0aGlzLnRpbWUgPSBkZWxheVxuICB0aGlzLnBlcmlvZCA9IHBlcmlvZFxuICB0aGlzLnRhc2sgPSB0YXNrXG4gIHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyXG4gIHRoaXMuYWN0aXZlID0gdHJ1ZVxufVxuXG5TY2hlZHVsZWRUYXNrLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnRhc2sucnVuKHRoaXMudGltZSlcbn1cblxuU2NoZWR1bGVkVGFzay5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuICByZXR1cm4gdGhpcy50YXNrLmVycm9yKHRoaXMudGltZSwgZSlcbn1cblxuU2NoZWR1bGVkVGFzay5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5zY2hlZHVsZXIuY2FuY2VsKHRoaXMpXG4gIHJldHVybiB0aGlzLnRhc2suZGlzcG9zZSgpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zY2hlZHVsZXIvU2NoZWR1bGVkVGFzay5qc1xuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCB7IGRlZmVyIH0gZnJvbSAnLi4vdGFzaydcblxuLypnbG9iYWwgc2V0VGltZW91dCwgY2xlYXJUaW1lb3V0Ki9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2xvY2tUaW1lciAoKSB7fVxuXG5DbG9ja1RpbWVyLnByb3RvdHlwZS5ub3cgPSBEYXRlLm5vd1xuXG5DbG9ja1RpbWVyLnByb3RvdHlwZS5zZXRUaW1lciA9IGZ1bmN0aW9uIChmLCBkdCkge1xuICByZXR1cm4gZHQgPD0gMCA/IHJ1bkFzYXAoZikgOiBzZXRUaW1lb3V0KGYsIGR0KVxufVxuXG5DbG9ja1RpbWVyLnByb3RvdHlwZS5jbGVhclRpbWVyID0gZnVuY3Rpb24gKHQpIHtcbiAgcmV0dXJuIHQgaW5zdGFuY2VvZiBBc2FwID8gdC5jYW5jZWwoKSA6IGNsZWFyVGltZW91dCh0KVxufVxuXG5mdW5jdGlvbiBBc2FwIChmKSB7XG4gIHRoaXMuZiA9IGZcbiAgdGhpcy5hY3RpdmUgPSB0cnVlXG59XG5cbkFzYXAucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuYWN0aXZlICYmIHRoaXMuZigpXG59XG5cbkFzYXAucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgdGhyb3cgZVxufVxuXG5Bc2FwLnByb3RvdHlwZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuYWN0aXZlID0gZmFsc2Vcbn1cblxuZnVuY3Rpb24gcnVuQXNhcCAoZikge1xuICB2YXIgdGFzayA9IG5ldyBBc2FwKGYpXG4gIGRlZmVyKHRhc2spXG4gIHJldHVybiB0YXNrXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zY2hlZHVsZXIvQ2xvY2tUaW1lci5qc1xuLy8gbW9kdWxlIGlkID0gNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCAqIGFzIGJhc2UgZnJvbSAnQG1vc3QvcHJlbHVkZSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVGltZWxpbmUgKCkge1xuICB0aGlzLnRhc2tzID0gW11cbn1cblxuVGltZWxpbmUucHJvdG90eXBlLm5leHRBcnJpdmFsID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5pc0VtcHR5KCkgPyBJbmZpbml0eSA6IHRoaXMudGFza3NbMF0udGltZVxufVxuXG5UaW1lbGluZS5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMudGFza3MubGVuZ3RoID09PSAwXG59XG5cblRpbWVsaW5lLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoc3QpIHtcbiAgaW5zZXJ0QnlUaW1lKHN0LCB0aGlzLnRhc2tzKVxufVxuXG5UaW1lbGluZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKHN0KSB7XG4gIHZhciBpID0gYmluYXJ5U2VhcmNoKHN0LnRpbWUsIHRoaXMudGFza3MpXG5cbiAgaWYgKGkgPj0gMCAmJiBpIDwgdGhpcy50YXNrcy5sZW5ndGgpIHtcbiAgICB2YXIgYXQgPSBiYXNlLmZpbmRJbmRleChzdCwgdGhpcy50YXNrc1tpXS5ldmVudHMpXG4gICAgaWYgKGF0ID49IDApIHtcbiAgICAgIHRoaXMudGFza3NbaV0uZXZlbnRzLnNwbGljZShhdCwgMSlcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlXG59XG5cblRpbWVsaW5lLnByb3RvdHlwZS5yZW1vdmVBbGwgPSBmdW5jdGlvbiAoZikge1xuICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMudGFza3MubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgcmVtb3ZlQWxsRnJvbShmLCB0aGlzLnRhc2tzW2ldKVxuICB9XG59XG5cblRpbWVsaW5lLnByb3RvdHlwZS5ydW5UYXNrcyA9IGZ1bmN0aW9uICh0LCBydW5UYXNrKSB7XG4gIHZhciB0YXNrcyA9IHRoaXMudGFza3NcbiAgdmFyIGwgPSB0YXNrcy5sZW5ndGhcbiAgdmFyIGkgPSAwXG5cbiAgd2hpbGUgKGkgPCBsICYmIHRhc2tzW2ldLnRpbWUgPD0gdCkge1xuICAgICsraVxuICB9XG5cbiAgdGhpcy50YXNrcyA9IHRhc2tzLnNsaWNlKGkpXG5cbiAgLy8gUnVuIGFsbCByZWFkeSB0YXNrc1xuICBmb3IgKHZhciBqID0gMDsgaiA8IGk7ICsraikge1xuICAgIHRoaXMudGFza3MgPSBydW5UYXNrcyhydW5UYXNrLCB0YXNrc1tqXSwgdGhpcy50YXNrcylcbiAgfVxufVxuXG5mdW5jdGlvbiBydW5UYXNrcyAocnVuVGFzaywgdGltZXNsb3QsIHRhc2tzKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY29tcGxleGl0eVxuICB2YXIgZXZlbnRzID0gdGltZXNsb3QuZXZlbnRzXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIHRhc2sgPSBldmVudHNbaV1cblxuICAgIGlmICh0YXNrLmFjdGl2ZSkge1xuICAgICAgcnVuVGFzayh0YXNrKVxuXG4gICAgICAvLyBSZXNjaGVkdWxlIHBlcmlvZGljIHJlcGVhdGluZyB0YXNrc1xuICAgICAgLy8gQ2hlY2sgYWN0aXZlIGFnYWluLCBzaW5jZSBhIHRhc2sgbWF5IGhhdmUgY2FuY2VsZWQgaXRzZWxmXG4gICAgICBpZiAodGFzay5wZXJpb2QgPj0gMCAmJiB0YXNrLmFjdGl2ZSkge1xuICAgICAgICB0YXNrLnRpbWUgPSB0YXNrLnRpbWUgKyB0YXNrLnBlcmlvZFxuICAgICAgICBpbnNlcnRCeVRpbWUodGFzaywgdGFza3MpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhc2tzXG59XG5cbmZ1bmN0aW9uIGluc2VydEJ5VGltZSAodGFzaywgdGltZXNsb3RzKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY29tcGxleGl0eVxuICB2YXIgbCA9IHRpbWVzbG90cy5sZW5ndGhcblxuICBpZiAobCA9PT0gMCkge1xuICAgIHRpbWVzbG90cy5wdXNoKG5ld1RpbWVzbG90KHRhc2sudGltZSwgW3Rhc2tdKSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBpID0gYmluYXJ5U2VhcmNoKHRhc2sudGltZSwgdGltZXNsb3RzKVxuXG4gIGlmIChpID49IGwpIHtcbiAgICB0aW1lc2xvdHMucHVzaChuZXdUaW1lc2xvdCh0YXNrLnRpbWUsIFt0YXNrXSkpXG4gIH0gZWxzZSBpZiAodGFzay50aW1lID09PSB0aW1lc2xvdHNbaV0udGltZSkge1xuICAgIHRpbWVzbG90c1tpXS5ldmVudHMucHVzaCh0YXNrKVxuICB9IGVsc2Uge1xuICAgIHRpbWVzbG90cy5zcGxpY2UoaSwgMCwgbmV3VGltZXNsb3QodGFzay50aW1lLCBbdGFza10pKVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUFsbEZyb20gKGYsIHRpbWVzbG90KSB7XG4gIHRpbWVzbG90LmV2ZW50cyA9IGJhc2UucmVtb3ZlQWxsKGYsIHRpbWVzbG90LmV2ZW50cylcbn1cblxuZnVuY3Rpb24gYmluYXJ5U2VhcmNoICh0LCBzb3J0ZWRBcnJheSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNvbXBsZXhpdHlcbiAgdmFyIGxvID0gMFxuICB2YXIgaGkgPSBzb3J0ZWRBcnJheS5sZW5ndGhcbiAgdmFyIG1pZCwgeVxuXG4gIHdoaWxlIChsbyA8IGhpKSB7XG4gICAgbWlkID0gTWF0aC5mbG9vcigobG8gKyBoaSkgLyAyKVxuICAgIHkgPSBzb3J0ZWRBcnJheVttaWRdXG5cbiAgICBpZiAodCA9PT0geS50aW1lKSB7XG4gICAgICByZXR1cm4gbWlkXG4gICAgfSBlbHNlIGlmICh0IDwgeS50aW1lKSB7XG4gICAgICBoaSA9IG1pZFxuICAgIH0gZWxzZSB7XG4gICAgICBsbyA9IG1pZCArIDFcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGhpXG59XG5cbmZ1bmN0aW9uIG5ld1RpbWVzbG90ICh0LCBldmVudHMpIHtcbiAgcmV0dXJuIHsgdGltZTogdCwgZXZlbnRzOiBldmVudHMgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc2NoZWR1bGVyL1RpbWVsaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTcgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHRocnUgKGYsIHN0cmVhbSkge1xuICByZXR1cm4gZihzdHJlYW0pXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL3RocnUuanNcbi8vIG1vZHVsZSBpZCA9IDU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCBFdmVudFRhcmdldFNvdXJjZSBmcm9tICcuL0V2ZW50VGFyZ2V0U291cmNlJ1xuaW1wb3J0IEV2ZW50RW1pdHRlclNvdXJjZSBmcm9tICcuL0V2ZW50RW1pdHRlclNvdXJjZSdcblxuLyoqXG4gKiBDcmVhdGUgYSBzdHJlYW0gZnJvbSBhbiBFdmVudFRhcmdldCwgc3VjaCBhcyBhIERPTSBOb2RlLCBvciBFdmVudEVtaXR0ZXIuXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgZXZlbnQgdHlwZSBuYW1lLCBlLmcuICdjbGljaydcbiAqIEBwYXJhbSB7RXZlbnRUYXJnZXR8RXZlbnRFbWl0dGVyfSBzb3VyY2UgRXZlbnRUYXJnZXQgb3IgRXZlbnRFbWl0dGVyXG4gKiBAcGFyYW0geyo/fSBjYXB0dXJlIGZvciBET00gZXZlbnRzLCB3aGV0aGVyIHRvIHVzZVxuICogIGNhcHR1cmluZy0tcGFzc2VkIGFzIDNyZCBwYXJhbWV0ZXIgdG8gYWRkRXZlbnRMaXN0ZW5lci5cbiAqIEByZXR1cm5zIHtTdHJlYW19IHN0cmVhbSBjb250YWluaW5nIGFsbCBldmVudHMgb2YgdGhlIHNwZWNpZmllZCB0eXBlXG4gKiBmcm9tIHRoZSBzb3VyY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmcm9tRXZlbnQgKGV2ZW50LCBzb3VyY2UsIGNhcHR1cmUpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjb21wbGV4aXR5XG4gIHZhciBzXG5cbiAgaWYgKHR5cGVvZiBzb3VyY2UuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygc291cmNlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcbiAgICAgIGNhcHR1cmUgPSBmYWxzZVxuICAgIH1cblxuICAgIHMgPSBuZXcgRXZlbnRUYXJnZXRTb3VyY2UoZXZlbnQsIHNvdXJjZSwgY2FwdHVyZSlcbiAgfSBlbHNlIGlmICh0eXBlb2Ygc291cmNlLmFkZExpc3RlbmVyID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBzb3VyY2UucmVtb3ZlTGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBzID0gbmV3IEV2ZW50RW1pdHRlclNvdXJjZShldmVudCwgc291cmNlKVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignc291cmNlIG11c3Qgc3VwcG9ydCBhZGRFdmVudExpc3RlbmVyL3JlbW92ZUV2ZW50TGlzdGVuZXIgb3IgYWRkTGlzdGVuZXIvcmVtb3ZlTGlzdGVuZXInKVxuICB9XG5cbiAgcmV0dXJuIG5ldyBTdHJlYW0ocylcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NvdXJjZS9mcm9tRXZlbnQuanNcbi8vIG1vZHVsZSBpZCA9IDU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgKiBhcyBkaXNwb3NlIGZyb20gJy4uL2Rpc3Bvc2FibGUvZGlzcG9zZSdcbmltcG9ydCAqIGFzIHRyeUV2ZW50IGZyb20gJy4vdHJ5RXZlbnQnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEV2ZW50VGFyZ2V0U291cmNlIChldmVudCwgc291cmNlLCBjYXB0dXJlKSB7XG4gIHRoaXMuZXZlbnQgPSBldmVudFxuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxuICB0aGlzLmNhcHR1cmUgPSBjYXB0dXJlXG59XG5cbkV2ZW50VGFyZ2V0U291cmNlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIGZ1bmN0aW9uIGFkZEV2ZW50IChlKSB7XG4gICAgdHJ5RXZlbnQudHJ5RXZlbnQoc2NoZWR1bGVyLm5vdygpLCBlLCBzaW5rKVxuICB9XG5cbiAgdGhpcy5zb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmV2ZW50LCBhZGRFdmVudCwgdGhpcy5jYXB0dXJlKVxuXG4gIHJldHVybiBkaXNwb3NlLmNyZWF0ZShkaXNwb3NlRXZlbnRUYXJnZXQsXG4gICAgeyB0YXJnZXQ6IHRoaXMsIGFkZEV2ZW50OiBhZGRFdmVudCB9KVxufVxuXG5mdW5jdGlvbiBkaXNwb3NlRXZlbnRUYXJnZXQgKGluZm8pIHtcbiAgdmFyIHRhcmdldCA9IGluZm8udGFyZ2V0XG4gIHRhcmdldC5zb3VyY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcih0YXJnZXQuZXZlbnQsIGluZm8uYWRkRXZlbnQsIHRhcmdldC5jYXB0dXJlKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc291cmNlL0V2ZW50VGFyZ2V0U291cmNlLmpzXG4vLyBtb2R1bGUgaWQgPSA1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IERlZmVycmVkU2luayBmcm9tICcuLi9zaW5rL0RlZmVycmVkU2luaydcbmltcG9ydCAqIGFzIGRpc3Bvc2UgZnJvbSAnLi4vZGlzcG9zYWJsZS9kaXNwb3NlJ1xuaW1wb3J0ICogYXMgdHJ5RXZlbnQgZnJvbSAnLi90cnlFdmVudCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRXZlbnRFbWl0dGVyU291cmNlIChldmVudCwgc291cmNlKSB7XG4gIHRoaXMuZXZlbnQgPSBldmVudFxuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxufVxuXG5FdmVudEVtaXR0ZXJTb3VyY2UucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgLy8gTk9URTogQmVjYXVzZSBFdmVudEVtaXR0ZXIgYWxsb3dzIGV2ZW50cyBpbiB0aGUgc2FtZSBjYWxsIHN0YWNrIGFzXG4gIC8vIGEgbGlzdGVuZXIgaXMgYWRkZWQsIHVzZSBhIERlZmVycmVkU2luayB0byBidWZmZXIgZXZlbnRzXG4gIC8vIHVudGlsIHRoZSBzdGFjayBjbGVhcnMsIHRoZW4gcHJvcGFnYXRlLiAgVGhpcyBtYWludGFpbnMgbW9zdC5qcydzXG4gIC8vIGludmFyaWFudCB0aGF0IG5vIGV2ZW50IHdpbGwgYmUgZGVsaXZlcmVkIGluIHRoZSBzYW1lIGNhbGwgc3RhY2tcbiAgLy8gYXMgYW4gb2JzZXJ2ZXIgYmVnaW5zIG9ic2VydmluZy5cbiAgdmFyIGRzaW5rID0gbmV3IERlZmVycmVkU2luayhzaW5rKVxuXG4gIGZ1bmN0aW9uIGFkZEV2ZW50VmFyaWFkaWMgKGEpIHtcbiAgICB2YXIgbCA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICBpZiAobCA+IDEpIHtcbiAgICAgIHZhciBhcnIgPSBuZXcgQXJyYXkobClcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgKytpKSB7XG4gICAgICAgIGFycltpXSA9IGFyZ3VtZW50c1tpXVxuICAgICAgfVxuICAgICAgdHJ5RXZlbnQudHJ5RXZlbnQoc2NoZWR1bGVyLm5vdygpLCBhcnIsIGRzaW5rKVxuICAgIH0gZWxzZSB7XG4gICAgICB0cnlFdmVudC50cnlFdmVudChzY2hlZHVsZXIubm93KCksIGEsIGRzaW5rKVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuc291cmNlLmFkZExpc3RlbmVyKHRoaXMuZXZlbnQsIGFkZEV2ZW50VmFyaWFkaWMpXG5cbiAgcmV0dXJuIGRpc3Bvc2UuY3JlYXRlKGRpc3Bvc2VFdmVudEVtaXR0ZXIsIHsgdGFyZ2V0OiB0aGlzLCBhZGRFdmVudDogYWRkRXZlbnRWYXJpYWRpYyB9KVxufVxuXG5mdW5jdGlvbiBkaXNwb3NlRXZlbnRFbWl0dGVyIChpbmZvKSB7XG4gIHZhciB0YXJnZXQgPSBpbmZvLnRhcmdldFxuICB0YXJnZXQuc291cmNlLnJlbW92ZUxpc3RlbmVyKHRhcmdldC5ldmVudCwgaW5mby5hZGRFdmVudClcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NvdXJjZS9FdmVudEVtaXR0ZXJTb3VyY2UuanNcbi8vIG1vZHVsZSBpZCA9IDU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgeyBkZWZlciB9IGZyb20gJy4uL3Rhc2snXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERlZmVycmVkU2luayAoc2luaykge1xuICB0aGlzLnNpbmsgPSBzaW5rXG4gIHRoaXMuZXZlbnRzID0gW11cbiAgdGhpcy5hY3RpdmUgPSB0cnVlXG59XG5cbkRlZmVycmVkU2luay5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgeCkge1xuICBpZiAoIXRoaXMuYWN0aXZlKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAodGhpcy5ldmVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgZGVmZXIobmV3IFByb3BhZ2F0ZUFsbFRhc2sodGhpcy5zaW5rLCB0LCB0aGlzLmV2ZW50cykpXG4gIH1cblxuICB0aGlzLmV2ZW50cy5wdXNoKHsgdGltZTogdCwgdmFsdWU6IHggfSlcbn1cblxuRGVmZXJyZWRTaW5rLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAodCwgeCkge1xuICBpZiAoIXRoaXMuYWN0aXZlKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB0aGlzLl9lbmQobmV3IEVuZFRhc2sodCwgeCwgdGhpcy5zaW5rKSlcbn1cblxuRGVmZXJyZWRTaW5rLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uICh0LCBlKSB7XG4gIHRoaXMuX2VuZChuZXcgRXJyb3JUYXNrKHQsIGUsIHRoaXMuc2luaykpXG59XG5cbkRlZmVycmVkU2luay5wcm90b3R5cGUuX2VuZCA9IGZ1bmN0aW9uICh0YXNrKSB7XG4gIHRoaXMuYWN0aXZlID0gZmFsc2VcbiAgZGVmZXIodGFzaylcbn1cblxuZnVuY3Rpb24gUHJvcGFnYXRlQWxsVGFzayAoc2luaywgdGltZSwgZXZlbnRzKSB7XG4gIHRoaXMuc2luayA9IHNpbmtcbiAgdGhpcy5ldmVudHMgPSBldmVudHNcbiAgdGhpcy50aW1lID0gdGltZVxufVxuXG5Qcm9wYWdhdGVBbGxUYXNrLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBldmVudHMgPSB0aGlzLmV2ZW50c1xuICB2YXIgc2luayA9IHRoaXMuc2lua1xuICB2YXIgZXZlbnRcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGV2ZW50cy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBldmVudCA9IGV2ZW50c1tpXVxuICAgIHRoaXMudGltZSA9IGV2ZW50LnRpbWVcbiAgICBzaW5rLmV2ZW50KGV2ZW50LnRpbWUsIGV2ZW50LnZhbHVlKVxuICB9XG5cbiAgZXZlbnRzLmxlbmd0aCA9IDBcbn1cblxuUHJvcGFnYXRlQWxsVGFzay5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuICB0aGlzLnNpbmsuZXJyb3IodGhpcy50aW1lLCBlKVxufVxuXG5mdW5jdGlvbiBFbmRUYXNrICh0LCB4LCBzaW5rKSB7XG4gIHRoaXMudGltZSA9IHRcbiAgdGhpcy52YWx1ZSA9IHhcbiAgdGhpcy5zaW5rID0gc2lua1xufVxuXG5FbmRUYXNrLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuc2luay5lbmQodGhpcy50aW1lLCB0aGlzLnZhbHVlKVxufVxuXG5FbmRUYXNrLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gIHRoaXMuc2luay5lcnJvcih0aGlzLnRpbWUsIGUpXG59XG5cbmZ1bmN0aW9uIEVycm9yVGFzayAodCwgZSwgc2luaykge1xuICB0aGlzLnRpbWUgPSB0XG4gIHRoaXMudmFsdWUgPSBlXG4gIHRoaXMuc2luayA9IHNpbmtcbn1cblxuRXJyb3JUYXNrLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuc2luay5lcnJvcih0aGlzLnRpbWUsIHRoaXMudmFsdWUpXG59XG5cbkVycm9yVGFzay5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuICB0aHJvdyBlXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zaW5rL0RlZmVycmVkU2luay5qc1xuLy8gbW9kdWxlIGlkID0gNThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCB7IHdpdGhEZWZhdWx0U2NoZWR1bGVyIGFzIHJ1biB9IGZyb20gJy4uL3J1blNvdXJjZSdcbmltcG9ydCB7IHRhcCB9IGZyb20gJy4vdHJhbnNmb3JtJ1xuXG4vKipcbiAqIE9ic2VydmUgYWxsIHRoZSBldmVudCB2YWx1ZXMgaW4gdGhlIHN0cmVhbSBpbiB0aW1lIG9yZGVyLiBUaGVcbiAqIHByb3ZpZGVkIGZ1bmN0aW9uIGBmYCB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaCBldmVudCB2YWx1ZVxuICogQHBhcmFtIHtmdW5jdGlvbih4OlQpOip9IGYgZnVuY3Rpb24gdG8gY2FsbCB3aXRoIGVhY2ggZXZlbnQgdmFsdWVcbiAqIEBwYXJhbSB7U3RyZWFtPFQ+fSBzdHJlYW0gc3RyZWFtIHRvIG9ic2VydmVcbiAqIEByZXR1cm4ge1Byb21pc2V9IHByb21pc2UgdGhhdCBmdWxmaWxscyBhZnRlciB0aGUgc3RyZWFtIGVuZHMgd2l0aG91dFxuICogIGFuIGVycm9yLCBvciByZWplY3RzIGlmIHRoZSBzdHJlYW0gZW5kcyB3aXRoIGFuIGVycm9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JzZXJ2ZSAoZiwgc3RyZWFtKSB7XG4gIHJldHVybiBkcmFpbih0YXAoZiwgc3RyZWFtKSlcbn1cblxuLyoqXG4gKiBcIlJ1blwiIGEgc3RyZWFtIGJ5IGNyZWF0aW5nIGRlbWFuZCBhbmQgY29uc3VtaW5nIGFsbCBldmVudHNcbiAqIEBwYXJhbSB7U3RyZWFtPFQ+fSBzdHJlYW0gc3RyZWFtIHRvIGRyYWluXG4gKiBAcmV0dXJuIHtQcm9taXNlfSBwcm9taXNlIHRoYXQgZnVsZmlsbHMgYWZ0ZXIgdGhlIHN0cmVhbSBlbmRzIHdpdGhvdXRcbiAqICBhbiBlcnJvciwgb3IgcmVqZWN0cyBpZiB0aGUgc3RyZWFtIGVuZHMgd2l0aCBhbiBlcnJvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRyYWluIChzdHJlYW0pIHtcbiAgcmV0dXJuIHJ1bihzdHJlYW0uc291cmNlKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9vYnNlcnZlLmpzXG4vLyBtb2R1bGUgaWQgPSA1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFBpcGUgZnJvbSAnLi4vc2luay9QaXBlJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBGaWx0ZXJNYXAgKHAsIGYsIHNvdXJjZSkge1xuICB0aGlzLnAgPSBwXG4gIHRoaXMuZiA9IGZcbiAgdGhpcy5zb3VyY2UgPSBzb3VyY2Vcbn1cblxuRmlsdGVyTWFwLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHJldHVybiB0aGlzLnNvdXJjZS5ydW4obmV3IEZpbHRlck1hcFNpbmsodGhpcy5wLCB0aGlzLmYsIHNpbmspLCBzY2hlZHVsZXIpXG59XG5cbmZ1bmN0aW9uIEZpbHRlck1hcFNpbmsgKHAsIGYsIHNpbmspIHtcbiAgdGhpcy5wID0gcFxuICB0aGlzLmYgPSBmXG4gIHRoaXMuc2luayA9IHNpbmtcbn1cblxuRmlsdGVyTWFwU2luay5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgeCkge1xuICB2YXIgZiA9IHRoaXMuZlxuICB2YXIgcCA9IHRoaXMucFxuICBwKHgpICYmIHRoaXMuc2luay5ldmVudCh0LCBmKHgpKVxufVxuXG5GaWx0ZXJNYXBTaW5rLnByb3RvdHlwZS5lbmQgPSBQaXBlLnByb3RvdHlwZS5lbmRcbkZpbHRlck1hcFNpbmsucHJvdG90eXBlLmVycm9yID0gUGlwZS5wcm90b3R5cGUuZXJyb3JcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2Z1c2lvbi9GaWx0ZXJNYXAuanNcbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCBQaXBlIGZyb20gJy4uL3NpbmsvUGlwZSdcblxuLyoqXG4gKiBHZW5lcmFsaXplZCBmZWVkYmFjayBsb29wLiBDYWxsIGEgc3RlcHBlciBmdW5jdGlvbiBmb3IgZWFjaCBldmVudC4gVGhlIHN0ZXBwZXJcbiAqIHdpbGwgYmUgY2FsbGVkIHdpdGggMiBwYXJhbXM6IHRoZSBjdXJyZW50IHNlZWQgYW5kIHRoZSBhbiBldmVudCB2YWx1ZS4gIEl0IG11c3RcbiAqIHJldHVybiBhIG5ldyB7IHNlZWQsIHZhbHVlIH0gcGFpci4gVGhlIGBzZWVkYCB3aWxsIGJlIGZlZCBiYWNrIGludG8gdGhlIG5leHRcbiAqIGludm9jYXRpb24gb2Ygc3RlcHBlciwgYW5kIHRoZSBgdmFsdWVgIHdpbGwgYmUgcHJvcGFnYXRlZCBhcyB0aGUgZXZlbnQgdmFsdWUuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHNlZWQ6KiwgdmFsdWU6Kik6e3NlZWQ6KiwgdmFsdWU6Kn19IHN0ZXBwZXIgbG9vcCBzdGVwIGZ1bmN0aW9uXG4gKiBAcGFyYW0geyp9IHNlZWQgaW5pdGlhbCBzZWVkIHZhbHVlIHBhc3NlZCB0byBmaXJzdCBzdGVwcGVyIGNhbGxcbiAqIEBwYXJhbSB7U3RyZWFtfSBzdHJlYW0gZXZlbnQgc3RyZWFtXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIHdob3NlIHZhbHVlcyBhcmUgdGhlIGB2YWx1ZWAgZmllbGQgb2YgdGhlIG9iamVjdHNcbiAqIHJldHVybmVkIGJ5IHRoZSBzdGVwcGVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb29wIChzdGVwcGVyLCBzZWVkLCBzdHJlYW0pIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IExvb3Aoc3RlcHBlciwgc2VlZCwgc3RyZWFtLnNvdXJjZSkpXG59XG5cbmZ1bmN0aW9uIExvb3AgKHN0ZXBwZXIsIHNlZWQsIHNvdXJjZSkge1xuICB0aGlzLnN0ZXAgPSBzdGVwcGVyXG4gIHRoaXMuc2VlZCA9IHNlZWRcbiAgdGhpcy5zb3VyY2UgPSBzb3VyY2Vcbn1cblxuTG9vcC5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gdGhpcy5zb3VyY2UucnVuKG5ldyBMb29wU2luayh0aGlzLnN0ZXAsIHRoaXMuc2VlZCwgc2luayksIHNjaGVkdWxlcilcbn1cblxuZnVuY3Rpb24gTG9vcFNpbmsgKHN0ZXBwZXIsIHNlZWQsIHNpbmspIHtcbiAgdGhpcy5zdGVwID0gc3RlcHBlclxuICB0aGlzLnNlZWQgPSBzZWVkXG4gIHRoaXMuc2luayA9IHNpbmtcbn1cblxuTG9vcFNpbmsucHJvdG90eXBlLmVycm9yID0gUGlwZS5wcm90b3R5cGUuZXJyb3JcblxuTG9vcFNpbmsucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgdmFyIHJlc3VsdCA9IHRoaXMuc3RlcCh0aGlzLnNlZWQsIHgpXG4gIHRoaXMuc2VlZCA9IHJlc3VsdC5zZWVkXG4gIHRoaXMuc2luay5ldmVudCh0LCByZXN1bHQudmFsdWUpXG59XG5cbkxvb3BTaW5rLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAodCkge1xuICB0aGlzLnNpbmsuZW5kKHQsIHRoaXMuc2VlZClcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvbG9vcC5qc1xuLy8gbW9kdWxlIGlkID0gNjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBTdHJlYW0gZnJvbSAnLi4vU3RyZWFtJ1xuaW1wb3J0IFBpcGUgZnJvbSAnLi4vc2luay9QaXBlJ1xuaW1wb3J0IHsgd2l0aERlZmF1bHRTY2hlZHVsZXIgYXMgcnVuU291cmNlIH0gZnJvbSAnLi4vcnVuU291cmNlJ1xuaW1wb3J0ICogYXMgZGlzcG9zZSBmcm9tICcuLi9kaXNwb3NhYmxlL2Rpc3Bvc2UnXG5pbXBvcnQgUHJvcGFnYXRlVGFzayBmcm9tICcuLi9zY2hlZHVsZXIvUHJvcGFnYXRlVGFzaydcblxuLyoqXG4gKiBDcmVhdGUgYSBzdHJlYW0gY29udGFpbmluZyBzdWNjZXNzaXZlIHJlZHVjZSByZXN1bHRzIG9mIGFwcGx5aW5nIGYgdG9cbiAqIHRoZSBwcmV2aW91cyByZWR1Y2UgcmVzdWx0IGFuZCB0aGUgY3VycmVudCBzdHJlYW0gaXRlbS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24ocmVzdWx0OiosIHg6Kik6Kn0gZiByZWR1Y2VyIGZ1bmN0aW9uXG4gKiBAcGFyYW0geyp9IGluaXRpYWwgaW5pdGlhbCB2YWx1ZVxuICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbSBzdHJlYW0gdG8gc2NhblxuICogQHJldHVybnMge1N0cmVhbX0gbmV3IHN0cmVhbSBjb250YWluaW5nIHN1Y2Nlc3NpdmUgcmVkdWNlIHJlc3VsdHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNjYW4gKGYsIGluaXRpYWwsIHN0cmVhbSkge1xuICByZXR1cm4gbmV3IFN0cmVhbShuZXcgU2NhbihmLCBpbml0aWFsLCBzdHJlYW0uc291cmNlKSlcbn1cblxuZnVuY3Rpb24gU2NhbiAoZiwgeiwgc291cmNlKSB7XG4gIHRoaXMuc291cmNlID0gc291cmNlXG4gIHRoaXMuZiA9IGZcbiAgdGhpcy52YWx1ZSA9IHpcbn1cblxuU2Nhbi5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICB2YXIgZDEgPSBzY2hlZHVsZXIuYXNhcChQcm9wYWdhdGVUYXNrLmV2ZW50KHRoaXMudmFsdWUsIHNpbmspKVxuICB2YXIgZDIgPSB0aGlzLnNvdXJjZS5ydW4obmV3IFNjYW5TaW5rKHRoaXMuZiwgdGhpcy52YWx1ZSwgc2luayksIHNjaGVkdWxlcilcbiAgcmV0dXJuIGRpc3Bvc2UuYWxsKFtkMSwgZDJdKVxufVxuXG5mdW5jdGlvbiBTY2FuU2luayAoZiwgeiwgc2luaykge1xuICB0aGlzLmYgPSBmXG4gIHRoaXMudmFsdWUgPSB6XG4gIHRoaXMuc2luayA9IHNpbmtcbn1cblxuU2NhblNpbmsucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgdmFyIGYgPSB0aGlzLmZcbiAgdGhpcy52YWx1ZSA9IGYodGhpcy52YWx1ZSwgeClcbiAgdGhpcy5zaW5rLmV2ZW50KHQsIHRoaXMudmFsdWUpXG59XG5cblNjYW5TaW5rLnByb3RvdHlwZS5lcnJvciA9IFBpcGUucHJvdG90eXBlLmVycm9yXG5TY2FuU2luay5wcm90b3R5cGUuZW5kID0gUGlwZS5wcm90b3R5cGUuZW5kXG5cbi8qKlxuKiBSZWR1Y2UgYSBzdHJlYW0gdG8gcHJvZHVjZSBhIHNpbmdsZSByZXN1bHQuICBOb3RlIHRoYXQgcmVkdWNpbmcgYW4gaW5maW5pdGVcbiogc3RyZWFtIHdpbGwgcmV0dXJuIGEgUHJvbWlzZSB0aGF0IG5ldmVyIGZ1bGZpbGxzLCBidXQgdGhhdCBtYXkgcmVqZWN0IGlmIGFuIGVycm9yXG4qIG9jY3Vycy5cbiogQHBhcmFtIHtmdW5jdGlvbihyZXN1bHQ6KiwgeDoqKToqfSBmIHJlZHVjZXIgZnVuY3Rpb25cbiogQHBhcmFtIHsqfSBpbml0aWFsIGluaXRpYWwgdmFsdWVcbiogQHBhcmFtIHtTdHJlYW19IHN0cmVhbSB0byByZWR1Y2VcbiogQHJldHVybnMge1Byb21pc2V9IHByb21pc2UgZm9yIHRoZSBmaWxlIHJlc3VsdCBvZiB0aGUgcmVkdWNlXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZSAoZiwgaW5pdGlhbCwgc3RyZWFtKSB7XG4gIHJldHVybiBydW5Tb3VyY2UobmV3IFJlZHVjZShmLCBpbml0aWFsLCBzdHJlYW0uc291cmNlKSlcbn1cblxuZnVuY3Rpb24gUmVkdWNlIChmLCB6LCBzb3VyY2UpIHtcbiAgdGhpcy5zb3VyY2UgPSBzb3VyY2VcbiAgdGhpcy5mID0gZlxuICB0aGlzLnZhbHVlID0gelxufVxuXG5SZWR1Y2UucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgcmV0dXJuIHRoaXMuc291cmNlLnJ1bihuZXcgUmVkdWNlU2luayh0aGlzLmYsIHRoaXMudmFsdWUsIHNpbmspLCBzY2hlZHVsZXIpXG59XG5cbmZ1bmN0aW9uIFJlZHVjZVNpbmsgKGYsIHosIHNpbmspIHtcbiAgdGhpcy5mID0gZlxuICB0aGlzLnZhbHVlID0gelxuICB0aGlzLnNpbmsgPSBzaW5rXG59XG5cblJlZHVjZVNpbmsucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgdmFyIGYgPSB0aGlzLmZcbiAgdGhpcy52YWx1ZSA9IGYodGhpcy52YWx1ZSwgeClcbiAgdGhpcy5zaW5rLmV2ZW50KHQsIHRoaXMudmFsdWUpXG59XG5cblJlZHVjZVNpbmsucHJvdG90eXBlLmVycm9yID0gUGlwZS5wcm90b3R5cGUuZXJyb3JcblxuUmVkdWNlU2luay5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKHQpIHtcbiAgdGhpcy5zaW5rLmVuZCh0LCB0aGlzLnZhbHVlKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9hY2N1bXVsYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSA2MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFN0cmVhbSBmcm9tICcuLi9TdHJlYW0nXG5cbi8qKlxuICogQ29tcHV0ZSBhIHN0cmVhbSBieSB1bmZvbGRpbmcgdHVwbGVzIG9mIGZ1dHVyZSB2YWx1ZXMgZnJvbSBhIHNlZWQgdmFsdWVcbiAqIEV2ZW50IHRpbWVzIG1heSBiZSBjb250cm9sbGVkIGJ5IHJldHVybmluZyBhIFByb21pc2UgZnJvbSBmXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHNlZWQ6Kik6e3ZhbHVlOiosIHNlZWQ6KiwgZG9uZTpib29sZWFufXxQcm9taXNlPHt2YWx1ZToqLCBzZWVkOiosIGRvbmU6Ym9vbGVhbn0+fSBmIHVuZm9sZGluZyBmdW5jdGlvbiBhY2NlcHRzXG4gKiAgYSBzZWVkIGFuZCByZXR1cm5zIGEgbmV3IHR1cGxlIHdpdGggYSB2YWx1ZSwgbmV3IHNlZWQsIGFuZCBib29sZWFuIGRvbmUgZmxhZy5cbiAqICBJZiB0dXBsZS5kb25lIGlzIHRydWUsIHRoZSBzdHJlYW0gd2lsbCBlbmQuXG4gKiBAcGFyYW0geyp9IHNlZWQgc2VlZCB2YWx1ZVxuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIGNvbnRhaW5pbmcgYWxsIHZhbHVlIG9mIGFsbCB0dXBsZXMgcHJvZHVjZWQgYnkgdGhlXG4gKiAgdW5mb2xkaW5nIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdW5mb2xkIChmLCBzZWVkKSB7XG4gIHJldHVybiBuZXcgU3RyZWFtKG5ldyBVbmZvbGRTb3VyY2UoZiwgc2VlZCkpXG59XG5cbmZ1bmN0aW9uIFVuZm9sZFNvdXJjZSAoZiwgc2VlZCkge1xuICB0aGlzLmYgPSBmXG4gIHRoaXMudmFsdWUgPSBzZWVkXG59XG5cblVuZm9sZFNvdXJjZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gbmV3IFVuZm9sZCh0aGlzLmYsIHRoaXMudmFsdWUsIHNpbmssIHNjaGVkdWxlcilcbn1cblxuZnVuY3Rpb24gVW5mb2xkIChmLCB4LCBzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdGhpcy5mID0gZlxuICB0aGlzLnNpbmsgPSBzaW5rXG4gIHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyXG4gIHRoaXMuYWN0aXZlID0gdHJ1ZVxuXG4gIHZhciBzZWxmID0gdGhpc1xuICBmdW5jdGlvbiBlcnIgKGUpIHtcbiAgICBzZWxmLnNpbmsuZXJyb3Ioc2VsZi5zY2hlZHVsZXIubm93KCksIGUpXG4gIH1cblxuICBmdW5jdGlvbiBzdGFydCAodW5mb2xkKSB7XG4gICAgcmV0dXJuIHN0ZXBVbmZvbGQodW5mb2xkLCB4KVxuICB9XG5cbiAgUHJvbWlzZS5yZXNvbHZlKHRoaXMpLnRoZW4oc3RhcnQpLmNhdGNoKGVycilcbn1cblxuVW5mb2xkLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmFjdGl2ZSA9IGZhbHNlXG59XG5cbmZ1bmN0aW9uIHN0ZXBVbmZvbGQgKHVuZm9sZCwgeCkge1xuICB2YXIgZiA9IHVuZm9sZC5mXG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoZih4KSkudGhlbihmdW5jdGlvbiAodHVwbGUpIHtcbiAgICByZXR1cm4gY29udGludWVVbmZvbGQodW5mb2xkLCB0dXBsZSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gY29udGludWVVbmZvbGQgKHVuZm9sZCwgdHVwbGUpIHtcbiAgaWYgKHR1cGxlLmRvbmUpIHtcbiAgICB1bmZvbGQuc2luay5lbmQodW5mb2xkLnNjaGVkdWxlci5ub3coKSwgdHVwbGUudmFsdWUpXG4gICAgcmV0dXJuIHR1cGxlLnZhbHVlXG4gIH1cblxuICB1bmZvbGQuc2luay5ldmVudCh1bmZvbGQuc2NoZWR1bGVyLm5vdygpLCB0dXBsZS52YWx1ZSlcblxuICBpZiAoIXVuZm9sZC5hY3RpdmUpIHtcbiAgICByZXR1cm4gdHVwbGUudmFsdWVcbiAgfVxuICByZXR1cm4gc3RlcFVuZm9sZCh1bmZvbGQsIHR1cGxlLnNlZWQpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zb3VyY2UvdW5mb2xkLmpzXG4vLyBtb2R1bGUgaWQgPSA2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFN0cmVhbSBmcm9tICcuLi9TdHJlYW0nXG5cbi8qKlxuICogQ29tcHV0ZSBhIHN0cmVhbSBieSBpdGVyYXRpdmVseSBjYWxsaW5nIGYgdG8gcHJvZHVjZSB2YWx1ZXNcbiAqIEV2ZW50IHRpbWVzIG1heSBiZSBjb250cm9sbGVkIGJ5IHJldHVybmluZyBhIFByb21pc2UgZnJvbSBmXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHg6Kik6KnxQcm9taXNlPCo+fSBmXG4gKiBAcGFyYW0geyp9IHggaW5pdGlhbCB2YWx1ZVxuICogQHJldHVybnMge1N0cmVhbX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGl0ZXJhdGUgKGYsIHgpIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IEl0ZXJhdGVTb3VyY2UoZiwgeCkpXG59XG5cbmZ1bmN0aW9uIEl0ZXJhdGVTb3VyY2UgKGYsIHgpIHtcbiAgdGhpcy5mID0gZlxuICB0aGlzLnZhbHVlID0geFxufVxuXG5JdGVyYXRlU291cmNlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHJldHVybiBuZXcgSXRlcmF0ZSh0aGlzLmYsIHRoaXMudmFsdWUsIHNpbmssIHNjaGVkdWxlcilcbn1cblxuZnVuY3Rpb24gSXRlcmF0ZSAoZiwgaW5pdGlhbCwgc2luaywgc2NoZWR1bGVyKSB7XG4gIHRoaXMuZiA9IGZcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlclxuICB0aGlzLmFjdGl2ZSA9IHRydWVcblxuICB2YXIgeCA9IGluaXRpYWxcblxuICB2YXIgc2VsZiA9IHRoaXNcbiAgZnVuY3Rpb24gZXJyIChlKSB7XG4gICAgc2VsZi5zaW5rLmVycm9yKHNlbGYuc2NoZWR1bGVyLm5vdygpLCBlKVxuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnQgKGl0ZXJhdGUpIHtcbiAgICByZXR1cm4gc3RlcEl0ZXJhdGUoaXRlcmF0ZSwgeClcbiAgfVxuXG4gIFByb21pc2UucmVzb2x2ZSh0aGlzKS50aGVuKHN0YXJ0KS5jYXRjaChlcnIpXG59XG5cbkl0ZXJhdGUucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuYWN0aXZlID0gZmFsc2Vcbn1cblxuZnVuY3Rpb24gc3RlcEl0ZXJhdGUgKGl0ZXJhdGUsIHgpIHtcbiAgaXRlcmF0ZS5zaW5rLmV2ZW50KGl0ZXJhdGUuc2NoZWR1bGVyLm5vdygpLCB4KVxuXG4gIGlmICghaXRlcmF0ZS5hY3RpdmUpIHtcbiAgICByZXR1cm4geFxuICB9XG5cbiAgdmFyIGYgPSBpdGVyYXRlLmZcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmKHgpKS50aGVuKGZ1bmN0aW9uICh5KSB7XG4gICAgcmV0dXJuIGNvbnRpbnVlSXRlcmF0ZShpdGVyYXRlLCB5KVxuICB9KVxufVxuXG5mdW5jdGlvbiBjb250aW51ZUl0ZXJhdGUgKGl0ZXJhdGUsIHgpIHtcbiAgcmV0dXJuICFpdGVyYXRlLmFjdGl2ZSA/IGl0ZXJhdGUudmFsdWUgOiBzdGVwSXRlcmF0ZShpdGVyYXRlLCB4KVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvc291cmNlL2l0ZXJhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNCBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCAqIGFzIGJhc2UgZnJvbSAnQG1vc3QvcHJlbHVkZSdcblxuLyoqXG4gKiBDb21wdXRlIGEgc3RyZWFtIHVzaW5nIGFuICphc3luYyogZ2VuZXJhdG9yLCB3aGljaCB5aWVsZHMgcHJvbWlzZXNcbiAqIHRvIGNvbnRyb2wgZXZlbnQgdGltZXMuXG4gKiBAcGFyYW0gZlxuICogQHJldHVybnMge1N0cmVhbX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlIChmIC8qLCAuLi5hcmdzICovKSB7XG4gIHJldHVybiBuZXcgU3RyZWFtKG5ldyBHZW5lcmF0ZVNvdXJjZShmLCBiYXNlLnRhaWwoYXJndW1lbnRzKSkpXG59XG5cbmZ1bmN0aW9uIEdlbmVyYXRlU291cmNlIChmLCBhcmdzKSB7XG4gIHRoaXMuZiA9IGZcbiAgdGhpcy5hcmdzID0gYXJnc1xufVxuXG5HZW5lcmF0ZVNvdXJjZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gbmV3IEdlbmVyYXRlKHRoaXMuZi5hcHBseSh2b2lkIDAsIHRoaXMuYXJncyksIHNpbmssIHNjaGVkdWxlcilcbn1cblxuZnVuY3Rpb24gR2VuZXJhdGUgKGl0ZXJhdG9yLCBzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdGhpcy5pdGVyYXRvciA9IGl0ZXJhdG9yXG4gIHRoaXMuc2luayA9IHNpbmtcbiAgdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXJcbiAgdGhpcy5hY3RpdmUgPSB0cnVlXG5cbiAgdmFyIHNlbGYgPSB0aGlzXG4gIGZ1bmN0aW9uIGVyciAoZSkge1xuICAgIHNlbGYuc2luay5lcnJvcihzZWxmLnNjaGVkdWxlci5ub3coKSwgZSlcbiAgfVxuXG4gIFByb21pc2UucmVzb2x2ZSh0aGlzKS50aGVuKG5leHQpLmNhdGNoKGVycilcbn1cblxuZnVuY3Rpb24gbmV4dCAoZ2VuZXJhdGUsIHgpIHtcbiAgcmV0dXJuIGdlbmVyYXRlLmFjdGl2ZSA/IGhhbmRsZShnZW5lcmF0ZSwgZ2VuZXJhdGUuaXRlcmF0b3IubmV4dCh4KSkgOiB4XG59XG5cbmZ1bmN0aW9uIGhhbmRsZSAoZ2VuZXJhdGUsIHJlc3VsdCkge1xuICBpZiAocmVzdWx0LmRvbmUpIHtcbiAgICByZXR1cm4gZ2VuZXJhdGUuc2luay5lbmQoZ2VuZXJhdGUuc2NoZWR1bGVyLm5vdygpLCByZXN1bHQudmFsdWUpXG4gIH1cblxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3VsdC52YWx1ZSkudGhlbihmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiBlbWl0KGdlbmVyYXRlLCB4KVxuICB9LCBmdW5jdGlvbiAoZSkge1xuICAgIHJldHVybiBlcnJvcihnZW5lcmF0ZSwgZSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gZW1pdCAoZ2VuZXJhdGUsIHgpIHtcbiAgZ2VuZXJhdGUuc2luay5ldmVudChnZW5lcmF0ZS5zY2hlZHVsZXIubm93KCksIHgpXG4gIHJldHVybiBuZXh0KGdlbmVyYXRlLCB4KVxufVxuXG5mdW5jdGlvbiBlcnJvciAoZ2VuZXJhdGUsIGUpIHtcbiAgcmV0dXJuIGhhbmRsZShnZW5lcmF0ZSwgZ2VuZXJhdGUuaXRlcmF0b3IudGhyb3coZSkpXG59XG5cbkdlbmVyYXRlLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmFjdGl2ZSA9IGZhbHNlXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9zb3VyY2UvZ2VuZXJhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDY1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgeyBvZiBhcyBzdHJlYW1PZiB9IGZyb20gJy4uL3NvdXJjZS9jb3JlJ1xuaW1wb3J0IHsgY29udGludWVXaXRoIH0gZnJvbSAnLi9jb250aW51ZVdpdGgnXG5cbi8qKlxuICogQHBhcmFtIHsqfSB4IHZhbHVlIHRvIHByZXBlbmRcbiAqIEBwYXJhbSB7U3RyZWFtfSBzdHJlYW1cbiAqIEByZXR1cm5zIHtTdHJlYW19IG5ldyBzdHJlYW0gd2l0aCB4IHByZXBlbmRlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gY29ucyAoeCwgc3RyZWFtKSB7XG4gIHJldHVybiBjb25jYXQoc3RyZWFtT2YoeCksIHN0cmVhbSlcbn1cblxuLyoqXG4qIEBwYXJhbSB7U3RyZWFtfSBsZWZ0XG4qIEBwYXJhbSB7U3RyZWFtfSByaWdodFxuKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIGNvbnRhaW5pbmcgYWxsIGV2ZW50cyBpbiBsZWZ0IGZvbGxvd2VkIGJ5IGFsbFxuKiAgZXZlbnRzIGluIHJpZ2h0LiAgVGhpcyAqdGltZXNoaWZ0cyogcmlnaHQgdG8gdGhlIGVuZCBvZiBsZWZ0LlxuKi9cbmV4cG9ydCBmdW5jdGlvbiBjb25jYXQgKGxlZnQsIHJpZ2h0KSB7XG4gIHJldHVybiBjb250aW51ZVdpdGgoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiByaWdodFxuICB9LCBsZWZ0KVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9idWlsZC5qc1xuLy8gbW9kdWxlIGlkID0gNjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCB7IGNvbWJpbmUgfSBmcm9tICcuL2NvbWJpbmUnXG5pbXBvcnQgeyBhcHBseSB9IGZyb20gJ0Btb3N0L3ByZWx1ZGUnXG5cbi8qKlxuICogQXNzdW1lIGZzIGlzIGEgc3RyZWFtIGNvbnRhaW5pbmcgZnVuY3Rpb25zLCBhbmQgYXBwbHkgdGhlIGxhdGVzdCBmdW5jdGlvblxuICogaW4gZnMgdG8gdGhlIGxhdGVzdCB2YWx1ZSBpbiB4cy5cbiAqIGZzOiAgICAgICAgIC0tZi0tLS0tLS0tLWctLS0tLS0tLWgtLS0tLS0+XG4gKiB4czogICAgICAgICAtYS0tLS0tLS1iLS0tLS0tLWMtLS0tLS0tZC0tPlxuICogYXAoZnMsIHhzKTogLS1mYS0tLS0tZmItZ2ItLS1nYy0taGMtLWhkLT5cbiAqIEBwYXJhbSB7U3RyZWFtfSBmcyBzdHJlYW0gb2YgZnVuY3Rpb25zIHRvIGFwcGx5IHRvIHRoZSBsYXRlc3QgeFxuICogQHBhcmFtIHtTdHJlYW19IHhzIHN0cmVhbSBvZiB2YWx1ZXMgdG8gd2hpY2ggdG8gYXBwbHkgYWxsIHRoZSBsYXRlc3QgZlxuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIGNvbnRhaW5pbmcgYWxsIHRoZSBhcHBsaWNhdGlvbnMgb2YgZnMgdG8geHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwIChmcywgeHMpIHtcbiAgcmV0dXJuIGNvbWJpbmUoYXBwbHksIGZzLCB4cylcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvYXBwbGljYXRpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDY3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcblxuLyoqXG4gKiBUcmFuc2Zvcm0gYSBzdHJlYW0gYnkgcGFzc2luZyBpdHMgZXZlbnRzIHRocm91Z2ggYSB0cmFuc2R1Y2VyLlxuICogQHBhcmFtICB7ZnVuY3Rpb259IHRyYW5zZHVjZXIgdHJhbnNkdWNlciBmdW5jdGlvblxuICogQHBhcmFtICB7U3RyZWFtfSBzdHJlYW0gc3RyZWFtIHdob3NlIGV2ZW50cyB3aWxsIGJlIHBhc3NlZCB0aHJvdWdoIHRoZVxuICogIHRyYW5zZHVjZXJcbiAqIEByZXR1cm4ge1N0cmVhbX0gc3RyZWFtIG9mIGV2ZW50cyB0cmFuc2Zvcm1lZCBieSB0aGUgdHJhbnNkdWNlclxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNkdWNlICh0cmFuc2R1Y2VyLCBzdHJlYW0pIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IFRyYW5zZHVjZSh0cmFuc2R1Y2VyLCBzdHJlYW0uc291cmNlKSlcbn1cblxuZnVuY3Rpb24gVHJhbnNkdWNlICh0cmFuc2R1Y2VyLCBzb3VyY2UpIHtcbiAgdGhpcy50cmFuc2R1Y2VyID0gdHJhbnNkdWNlclxuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxufVxuXG5UcmFuc2R1Y2UucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdmFyIHhmID0gdGhpcy50cmFuc2R1Y2VyKG5ldyBUcmFuc2Zvcm1lcihzaW5rKSlcbiAgcmV0dXJuIHRoaXMuc291cmNlLnJ1bihuZXcgVHJhbnNkdWNlU2luayhnZXRUeEhhbmRsZXIoeGYpLCBzaW5rKSwgc2NoZWR1bGVyKVxufVxuXG5mdW5jdGlvbiBUcmFuc2R1Y2VTaW5rIChhZGFwdGVyLCBzaW5rKSB7XG4gIHRoaXMueGYgPSBhZGFwdGVyXG4gIHRoaXMuc2luayA9IHNpbmtcbn1cblxuVHJhbnNkdWNlU2luay5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgeCkge1xuICB2YXIgbmV4dCA9IHRoaXMueGYuc3RlcCh0LCB4KVxuXG4gIHJldHVybiB0aGlzLnhmLmlzUmVkdWNlZChuZXh0KVxuICAgID8gdGhpcy5zaW5rLmVuZCh0LCB0aGlzLnhmLmdldFJlc3VsdChuZXh0KSlcbiAgICA6IG5leHRcbn1cblxuVHJhbnNkdWNlU2luay5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgcmV0dXJuIHRoaXMueGYucmVzdWx0KHgpXG59XG5cblRyYW5zZHVjZVNpbmsucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKHQsIGUpIHtcbiAgcmV0dXJuIHRoaXMuc2luay5lcnJvcih0LCBlKVxufVxuXG5mdW5jdGlvbiBUcmFuc2Zvcm1lciAoc2luaykge1xuICB0aGlzLnRpbWUgPSAtSW5maW5pdHlcbiAgdGhpcy5zaW5rID0gc2lua1xufVxuXG5UcmFuc2Zvcm1lci5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBUcmFuc2Zvcm1lci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHt9XG5cblRyYW5zZm9ybWVyLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IFRyYW5zZm9ybWVyLnByb3RvdHlwZS5zdGVwID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgaWYgKCFpc05hTih0KSkge1xuICAgIHRoaXMudGltZSA9IE1hdGgubWF4KHQsIHRoaXMudGltZSlcbiAgfVxuICByZXR1cm4gdGhpcy5zaW5rLmV2ZW50KHRoaXMudGltZSwgeClcbn1cblxuVHJhbnNmb3JtZXIucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBUcmFuc2Zvcm1lci5wcm90b3R5cGUucmVzdWx0ID0gZnVuY3Rpb24gKHgpIHtcbiAgcmV0dXJuIHRoaXMuc2luay5lbmQodGhpcy50aW1lLCB4KVxufVxuXG4vKipcbiogR2l2ZW4gYW4gb2JqZWN0IHN1cHBvcnRpbmcgdGhlIG5ldyBvciBsZWdhY3kgdHJhbnNkdWNlciBwcm90b2NvbCxcbiogY3JlYXRlIGFuIGFkYXB0ZXIgZm9yIGl0LlxuKiBAcGFyYW0ge29iamVjdH0gdHggdHJhbnNmb3JtXG4qIEByZXR1cm5zIHtUeEFkYXB0ZXJ8TGVnYWN5VHhBZGFwdGVyfVxuKi9cbmZ1bmN0aW9uIGdldFR4SGFuZGxlciAodHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB0eFsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gbmV3IFR4QWRhcHRlcih0eClcbiAgICA6IG5ldyBMZWdhY3lUeEFkYXB0ZXIodHgpXG59XG5cbi8qKlxuKiBBZGFwdGVyIGZvciBuZXcgb2ZmaWNpYWwgdHJhbnNkdWNlciBwcm90b2NvbFxuKiBAcGFyYW0ge29iamVjdH0gdHggdHJhbnNmb3JtXG4qIEBjb25zdHJ1Y3RvclxuKi9cbmZ1bmN0aW9uIFR4QWRhcHRlciAodHgpIHtcbiAgdGhpcy50eCA9IHR4XG59XG5cblR4QWRhcHRlci5wcm90b3R5cGUuc3RlcCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHJldHVybiB0aGlzLnR4WydAQHRyYW5zZHVjZXIvc3RlcCddKHQsIHgpXG59XG5UeEFkYXB0ZXIucHJvdG90eXBlLnJlc3VsdCA9IGZ1bmN0aW9uICh4KSB7XG4gIHJldHVybiB0aGlzLnR4WydAQHRyYW5zZHVjZXIvcmVzdWx0J10oeClcbn1cblR4QWRhcHRlci5wcm90b3R5cGUuaXNSZWR1Y2VkID0gZnVuY3Rpb24gKHgpIHtcbiAgcmV0dXJuIHggIT0gbnVsbCAmJiB4WydAQHRyYW5zZHVjZXIvcmVkdWNlZCddXG59XG5UeEFkYXB0ZXIucHJvdG90eXBlLmdldFJlc3VsdCA9IGZ1bmN0aW9uICh4KSB7XG4gIHJldHVybiB4WydAQHRyYW5zZHVjZXIvdmFsdWUnXVxufVxuXG4vKipcbiogQWRhcHRlciBmb3Igb2xkZXIgdHJhbnNkdWNlciBwcm90b2NvbFxuKiBAcGFyYW0ge29iamVjdH0gdHggdHJhbnNmb3JtXG4qIEBjb25zdHJ1Y3RvclxuKi9cbmZ1bmN0aW9uIExlZ2FjeVR4QWRhcHRlciAodHgpIHtcbiAgdGhpcy50eCA9IHR4XG59XG5cbkxlZ2FjeVR4QWRhcHRlci5wcm90b3R5cGUuc3RlcCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHJldHVybiB0aGlzLnR4LnN0ZXAodCwgeClcbn1cbkxlZ2FjeVR4QWRhcHRlci5wcm90b3R5cGUucmVzdWx0ID0gZnVuY3Rpb24gKHgpIHtcbiAgcmV0dXJuIHRoaXMudHgucmVzdWx0KHgpXG59XG5MZWdhY3lUeEFkYXB0ZXIucHJvdG90eXBlLmlzUmVkdWNlZCA9IGZ1bmN0aW9uICh4KSB7XG4gIHJldHVybiB4ICE9IG51bGwgJiYgeC5fX3RyYW5zZHVjZXJzX3JlZHVjZWRfX1xufVxuTGVnYWN5VHhBZGFwdGVyLnByb3RvdHlwZS5nZXRSZXN1bHQgPSBmdW5jdGlvbiAoeCkge1xuICByZXR1cm4geC52YWx1ZVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci90cmFuc2R1Y2UuanNcbi8vIG1vZHVsZSBpZCA9IDY4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG4vKipcbiAqIERvdWJseSBsaW5rZWQgbGlzdFxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExpbmtlZExpc3QgKCkge1xuICB0aGlzLmhlYWQgPSBudWxsXG4gIHRoaXMubGVuZ3RoID0gMFxufVxuXG4vKipcbiAqIEFkZCBhIG5vZGUgdG8gdGhlIGVuZCBvZiB0aGUgbGlzdFxuICogQHBhcmFtIHt7cHJldjpPYmplY3R8bnVsbCwgbmV4dDpPYmplY3R8bnVsbCwgZGlzcG9zZTpmdW5jdGlvbn19IHggbm9kZSB0byBhZGRcbiAqL1xuTGlua2VkTGlzdC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHgpIHtcbiAgaWYgKHRoaXMuaGVhZCAhPT0gbnVsbCkge1xuICAgIHRoaXMuaGVhZC5wcmV2ID0geFxuICAgIHgubmV4dCA9IHRoaXMuaGVhZFxuICB9XG4gIHRoaXMuaGVhZCA9IHhcbiAgKyt0aGlzLmxlbmd0aFxufVxuXG4vKipcbiAqIFJlbW92ZSB0aGUgcHJvdmlkZWQgbm9kZSBmcm9tIHRoZSBsaXN0XG4gKiBAcGFyYW0ge3twcmV2Ok9iamVjdHxudWxsLCBuZXh0Ok9iamVjdHxudWxsLCBkaXNwb3NlOmZ1bmN0aW9ufX0geCBub2RlIHRvIHJlbW92ZVxuICovXG5MaW5rZWRMaXN0LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoeCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lICBjb21wbGV4aXR5XG4gIC0tdGhpcy5sZW5ndGhcbiAgaWYgKHggPT09IHRoaXMuaGVhZCkge1xuICAgIHRoaXMuaGVhZCA9IHRoaXMuaGVhZC5uZXh0XG4gIH1cbiAgaWYgKHgubmV4dCAhPT0gbnVsbCkge1xuICAgIHgubmV4dC5wcmV2ID0geC5wcmV2XG4gICAgeC5uZXh0ID0gbnVsbFxuICB9XG4gIGlmICh4LnByZXYgIT09IG51bGwpIHtcbiAgICB4LnByZXYubmV4dCA9IHgubmV4dFxuICAgIHgucHJldiA9IG51bGxcbiAgfVxufVxuXG4vKipcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmZiB0aGVyZSBhcmUgbm8gbm9kZXMgaW4gdGhlIGxpc3RcbiAqL1xuTGlua2VkTGlzdC5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMubGVuZ3RoID09PSAwXG59XG5cbi8qKlxuICogRGlzcG9zZSBhbGwgbm9kZXNcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBwcm9taXNlIHRoYXQgZnVsZmlsbHMgd2hlbiBhbGwgbm9kZXMgaGF2ZSBiZWVuIGRpc3Bvc2VkLFxuICogIG9yIHJlamVjdHMgaWYgYW4gZXJyb3Igb2NjdXJzIHdoaWxlIGRpc3Bvc2luZ1xuICovXG5MaW5rZWRMaXN0LnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5pc0VtcHR5KCkpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgfVxuXG4gIHZhciBwcm9taXNlcyA9IFtdXG4gIHZhciB4ID0gdGhpcy5oZWFkXG4gIHRoaXMuaGVhZCA9IG51bGxcbiAgdGhpcy5sZW5ndGggPSAwXG5cbiAgd2hpbGUgKHggIT09IG51bGwpIHtcbiAgICBwcm9taXNlcy5wdXNoKHguZGlzcG9zZSgpKVxuICAgIHggPSB4Lm5leHRcbiAgfVxuXG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcylcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL0xpbmtlZExpc3QuanNcbi8vIG1vZHVsZSBpZCA9IDY5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgeyBtZXJnZU1hcENvbmN1cnJlbnRseSB9IGZyb20gJy4vbWVyZ2VDb25jdXJyZW50bHknXG5cbi8qKlxuICogTWFwIGVhY2ggdmFsdWUgaW4gc3RyZWFtIHRvIGEgbmV3IHN0cmVhbSwgYW5kIGNvbmNhdGVuYXRlIHRoZW0gYWxsXG4gKiBzdHJlYW06ICAgICAgICAgICAgICAtYS0tLWItLS1jWFxuICogZihhKTogICAgICAgICAgICAgICAgIDEtMS0xLTFYXG4gKiBmKGIpOiAgICAgICAgICAgICAgICAgICAgICAgIC0yLTItMi0yWFxuICogZihjKTogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0zLTMtMy0zWFxuICogc3RyZWFtLmNvbmNhdE1hcChmKTogLTEtMS0xLTEtMi0yLTItMi0zLTMtMy0zWFxuICogQHBhcmFtIHtmdW5jdGlvbih4OiopOlN0cmVhbX0gZiBmdW5jdGlvbiB0byBtYXAgZWFjaCB2YWx1ZSB0byBhIHN0cmVhbVxuICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbVxuICogQHJldHVybnMge1N0cmVhbX0gbmV3IHN0cmVhbSBjb250YWluaW5nIGFsbCBldmVudHMgZnJvbSBlYWNoIHN0cmVhbSByZXR1cm5lZCBieSBmXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb25jYXRNYXAgKGYsIHN0cmVhbSkge1xuICByZXR1cm4gbWVyZ2VNYXBDb25jdXJyZW50bHkoZiwgMSwgc3RyZWFtKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9jb25jYXRNYXAuanNcbi8vIG1vZHVsZSBpZCA9IDcwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCBQaXBlIGZyb20gJy4uL3NpbmsvUGlwZSdcbmltcG9ydCBJbmRleFNpbmsgZnJvbSAnLi4vc2luay9JbmRleFNpbmsnXG5pbXBvcnQgeyBlbXB0eSB9IGZyb20gJy4uL3NvdXJjZS9jb3JlJ1xuaW1wb3J0ICogYXMgZGlzcG9zZSBmcm9tICcuLi9kaXNwb3NhYmxlL2Rpc3Bvc2UnXG5pbXBvcnQgKiBhcyBiYXNlIGZyb20gJ0Btb3N0L3ByZWx1ZGUnXG5cbnZhciBjb3B5ID0gYmFzZS5jb3B5XG52YXIgcmVkdWNlID0gYmFzZS5yZWR1Y2VcblxuLyoqXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gY29udGFpbmluZyBldmVudHMgZnJvbSBhbGwgc3RyZWFtcyBpbiB0aGUgYXJndW1lbnRcbiAqIGxpc3QgaW4gdGltZSBvcmRlci4gIElmIHR3byBldmVudHMgYXJlIHNpbXVsdGFuZW91cyB0aGV5IHdpbGwgYmUgbWVyZ2VkIGluXG4gKiBhcmJpdHJhcnkgb3JkZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZSAoLyogLi4uc3RyZWFtcyovKSB7XG4gIHJldHVybiBtZXJnZUFycmF5KGNvcHkoYXJndW1lbnRzKSlcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0FycmF5fSBzdHJlYW1zIGFycmF5IG9mIHN0cmVhbSB0byBtZXJnZVxuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIGNvbnRhaW5pbmcgZXZlbnRzIGZyb20gYWxsIGlucHV0IG9ic2VydmFibGVzXG4gKiBpbiB0aW1lIG9yZGVyLiAgSWYgdHdvIGV2ZW50cyBhcmUgc2ltdWx0YW5lb3VzIHRoZXkgd2lsbCBiZSBtZXJnZWQgaW5cbiAqIGFyYml0cmFyeSBvcmRlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlQXJyYXkgKHN0cmVhbXMpIHtcbiAgdmFyIGwgPSBzdHJlYW1zLmxlbmd0aFxuICByZXR1cm4gbCA9PT0gMCA/IGVtcHR5KClcbiAgICA6IGwgPT09IDEgPyBzdHJlYW1zWzBdXG4gICAgOiBuZXcgU3RyZWFtKG1lcmdlU291cmNlcyhzdHJlYW1zKSlcbn1cblxuLyoqXG4gKiBUaGlzIGltcGxlbWVudHMgZnVzaW9uL2ZsYXR0ZW5pbmcgZm9yIG1lcmdlLiAgSXQgd2lsbFxuICogZnVzZSBhZGphY2VudCBtZXJnZSBvcGVyYXRpb25zLiAgRm9yIGV4YW1wbGU6XG4gKiAtIGEubWVyZ2UoYikubWVyZ2UoYykgZWZmZWN0aXZlbHkgYmVjb21lcyBtZXJnZShhLCBiLCBjKVxuICogLSBtZXJnZShhLCBtZXJnZShiLCBjKSkgZWZmZWN0aXZlbHkgYmVjb21lcyBtZXJnZShhLCBiLCBjKVxuICogSXQgZG9lcyB0aGlzIGJ5IGNvbmNhdGVuYXRpbmcgdGhlIHNvdXJjZXMgYXJyYXlzIG9mXG4gKiBhbnkgbmVzdGVkIE1lcmdlIHNvdXJjZXMsIGluIGVmZmVjdCBcImZsYXR0ZW5pbmdcIiBuZXN0ZWRcbiAqIG1lcmdlIG9wZXJhdGlvbnMgaW50byBhIHNpbmdsZSBtZXJnZS5cbiAqL1xuZnVuY3Rpb24gbWVyZ2VTb3VyY2VzIChzdHJlYW1zKSB7XG4gIHJldHVybiBuZXcgTWVyZ2UocmVkdWNlKGFwcGVuZFNvdXJjZXMsIFtdLCBzdHJlYW1zKSlcbn1cblxuZnVuY3Rpb24gYXBwZW5kU291cmNlcyAoc291cmNlcywgc3RyZWFtKSB7XG4gIHZhciBzb3VyY2UgPSBzdHJlYW0uc291cmNlXG4gIHJldHVybiBzb3VyY2UgaW5zdGFuY2VvZiBNZXJnZVxuICAgID8gc291cmNlcy5jb25jYXQoc291cmNlLnNvdXJjZXMpXG4gICAgOiBzb3VyY2VzLmNvbmNhdChzb3VyY2UpXG59XG5cbmZ1bmN0aW9uIE1lcmdlIChzb3VyY2VzKSB7XG4gIHRoaXMuc291cmNlcyA9IHNvdXJjZXNcbn1cblxuTWVyZ2UucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdmFyIGwgPSB0aGlzLnNvdXJjZXMubGVuZ3RoXG4gIHZhciBkaXNwb3NhYmxlcyA9IG5ldyBBcnJheShsKVxuICB2YXIgc2lua3MgPSBuZXcgQXJyYXkobClcblxuICB2YXIgbWVyZ2VTaW5rID0gbmV3IE1lcmdlU2luayhkaXNwb3NhYmxlcywgc2lua3MsIHNpbmspXG5cbiAgZm9yICh2YXIgaW5kZXhTaW5rLCBpID0gMDsgaSA8IGw7ICsraSkge1xuICAgIGluZGV4U2luayA9IHNpbmtzW2ldID0gbmV3IEluZGV4U2luayhpLCBtZXJnZVNpbmspXG4gICAgZGlzcG9zYWJsZXNbaV0gPSB0aGlzLnNvdXJjZXNbaV0ucnVuKGluZGV4U2luaywgc2NoZWR1bGVyKVxuICB9XG5cbiAgcmV0dXJuIGRpc3Bvc2UuYWxsKGRpc3Bvc2FibGVzKVxufVxuXG5mdW5jdGlvbiBNZXJnZVNpbmsgKGRpc3Bvc2FibGVzLCBzaW5rcywgc2luaykge1xuICB0aGlzLnNpbmsgPSBzaW5rXG4gIHRoaXMuZGlzcG9zYWJsZXMgPSBkaXNwb3NhYmxlc1xuICB0aGlzLmFjdGl2ZUNvdW50ID0gc2lua3MubGVuZ3RoXG59XG5cbk1lcmdlU2luay5wcm90b3R5cGUuZXJyb3IgPSBQaXBlLnByb3RvdHlwZS5lcnJvclxuXG5NZXJnZVNpbmsucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIGluZGV4VmFsdWUpIHtcbiAgdGhpcy5zaW5rLmV2ZW50KHQsIGluZGV4VmFsdWUudmFsdWUpXG59XG5cbk1lcmdlU2luay5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKHQsIGluZGV4ZWRWYWx1ZSkge1xuICBkaXNwb3NlLnRyeURpc3Bvc2UodCwgdGhpcy5kaXNwb3NhYmxlc1tpbmRleGVkVmFsdWUuaW5kZXhdLCB0aGlzLnNpbmspXG4gIGlmICgtLXRoaXMuYWN0aXZlQ291bnQgPT09IDApIHtcbiAgICB0aGlzLnNpbmsuZW5kKHQsIGluZGV4ZWRWYWx1ZS52YWx1ZSlcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9tZXJnZS5qc1xuLy8gbW9kdWxlIGlkID0gNzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChjKSBjb3B5cmlnaHQgMjAxMC0yMDE2IG9yaWdpbmFsIGF1dGhvciBvciBhdXRob3JzICovXG4vKiogQGF1dGhvciBCcmlhbiBDYXZhbGllciAqL1xuLyoqIEBhdXRob3IgSm9obiBIYW5uICovXG5cbmltcG9ydCBTdHJlYW0gZnJvbSAnLi4vU3RyZWFtJ1xuaW1wb3J0IFBpcGUgZnJvbSAnLi4vc2luay9QaXBlJ1xuaW1wb3J0ICogYXMgZGlzcG9zZSBmcm9tICcuLi9kaXNwb3NhYmxlL2Rpc3Bvc2UnXG5pbXBvcnQgKiBhcyBiYXNlIGZyb20gJ0Btb3N0L3ByZWx1ZGUnXG5pbXBvcnQgaW52b2tlIGZyb20gJy4uL2ludm9rZSdcblxuLyoqXG4gKiBXaGVuIGFuIGV2ZW50IGFycml2ZXMgb24gc2FtcGxlciwgZW1pdCB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgZiB3aXRoIHRoZSBsYXRlc3RcbiAqIHZhbHVlcyBvZiBhbGwgc3RyZWFtcyBiZWluZyBzYW1wbGVkXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKC4uLnZhbHVlcyk6Kn0gZiBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIHNldCBvZiBzYW1wbGVkIHZhbHVlc1xuICogQHBhcmFtIHtTdHJlYW19IHNhbXBsZXIgc3RyZWFtcyB3aWxsIGJlIHNhbXBsZWQgd2hlbmV2ZXIgYW4gZXZlbnQgYXJyaXZlc1xuICogIG9uIHNhbXBsZXJcbiAqIEByZXR1cm5zIHtTdHJlYW19IHN0cmVhbSBvZiBzYW1wbGVkIGFuZCB0cmFuc2Zvcm1lZCB2YWx1ZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhbXBsZSAoZiwgc2FtcGxlciAvKiwgLi4uc3RyZWFtcyAqLykge1xuICByZXR1cm4gc2FtcGxlQXJyYXkoZiwgc2FtcGxlciwgYmFzZS5kcm9wKDIsIGFyZ3VtZW50cykpXG59XG5cbi8qKlxuICogV2hlbiBhbiBldmVudCBhcnJpdmVzIG9uIHNhbXBsZXIsIGVtaXQgdGhlIGxhdGVzdCBldmVudCB2YWx1ZSBmcm9tIHN0cmVhbS5cbiAqIEBwYXJhbSB7U3RyZWFtfSBzYW1wbGVyIHN0cmVhbSBvZiBldmVudHMgYXQgd2hvc2UgYXJyaXZhbCB0aW1lXG4gKiAgc3RyZWFtJ3MgbGF0ZXN0IHZhbHVlIHdpbGwgYmUgcHJvcGFnYXRlZFxuICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbSBzdHJlYW0gb2YgdmFsdWVzXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzYW1wbGVkIHN0cmVhbSBvZiB2YWx1ZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhbXBsZVdpdGggKHNhbXBsZXIsIHN0cmVhbSkge1xuICByZXR1cm4gbmV3IFN0cmVhbShuZXcgU2FtcGxlcihiYXNlLmlkLCBzYW1wbGVyLnNvdXJjZSwgW3N0cmVhbS5zb3VyY2VdKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhbXBsZUFycmF5IChmLCBzYW1wbGVyLCBzdHJlYW1zKSB7XG4gIHJldHVybiBuZXcgU3RyZWFtKG5ldyBTYW1wbGVyKGYsIHNhbXBsZXIuc291cmNlLCBiYXNlLm1hcChnZXRTb3VyY2UsIHN0cmVhbXMpKSlcbn1cblxuZnVuY3Rpb24gZ2V0U291cmNlIChzdHJlYW0pIHtcbiAgcmV0dXJuIHN0cmVhbS5zb3VyY2Vcbn1cblxuZnVuY3Rpb24gU2FtcGxlciAoZiwgc2FtcGxlciwgc291cmNlcykge1xuICB0aGlzLmYgPSBmXG4gIHRoaXMuc2FtcGxlciA9IHNhbXBsZXJcbiAgdGhpcy5zb3VyY2VzID0gc291cmNlc1xufVxuXG5TYW1wbGVyLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHZhciBsID0gdGhpcy5zb3VyY2VzLmxlbmd0aFxuICB2YXIgZGlzcG9zYWJsZXMgPSBuZXcgQXJyYXkobCArIDEpXG4gIHZhciBzaW5rcyA9IG5ldyBBcnJheShsKVxuXG4gIHZhciBzYW1wbGVTaW5rID0gbmV3IFNhbXBsZVNpbmsodGhpcy5mLCBzaW5rcywgc2luaylcblxuICBmb3IgKHZhciBob2xkLCBpID0gMDsgaSA8IGw7ICsraSkge1xuICAgIGhvbGQgPSBzaW5rc1tpXSA9IG5ldyBIb2xkKHNhbXBsZVNpbmspXG4gICAgZGlzcG9zYWJsZXNbaV0gPSB0aGlzLnNvdXJjZXNbaV0ucnVuKGhvbGQsIHNjaGVkdWxlcilcbiAgfVxuXG4gIGRpc3Bvc2FibGVzW2ldID0gdGhpcy5zYW1wbGVyLnJ1bihzYW1wbGVTaW5rLCBzY2hlZHVsZXIpXG5cbiAgcmV0dXJuIGRpc3Bvc2UuYWxsKGRpc3Bvc2FibGVzKVxufVxuXG5mdW5jdGlvbiBIb2xkIChzaW5rKSB7XG4gIHRoaXMuc2luayA9IHNpbmtcbiAgdGhpcy5oYXNWYWx1ZSA9IGZhbHNlXG59XG5cbkhvbGQucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgdGhpcy52YWx1ZSA9IHhcbiAgdGhpcy5oYXNWYWx1ZSA9IHRydWVcbiAgdGhpcy5zaW5rLl9ub3RpZnkodGhpcylcbn1cblxuSG9sZC5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKCkge31cbkhvbGQucHJvdG90eXBlLmVycm9yID0gUGlwZS5wcm90b3R5cGUuZXJyb3JcblxuZnVuY3Rpb24gU2FtcGxlU2luayAoZiwgc2lua3MsIHNpbmspIHtcbiAgdGhpcy5mID0gZlxuICB0aGlzLnNpbmtzID0gc2lua3NcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLmFjdGl2ZSA9IGZhbHNlXG59XG5cblNhbXBsZVNpbmsucHJvdG90eXBlLl9ub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghdGhpcy5hY3RpdmUpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IHRoaXMuc2lua3MuZXZlcnkoaGFzVmFsdWUpXG4gIH1cbn1cblxuU2FtcGxlU2luay5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCkge1xuICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICB0aGlzLnNpbmsuZXZlbnQodCwgaW52b2tlKHRoaXMuZiwgYmFzZS5tYXAoZ2V0VmFsdWUsIHRoaXMuc2lua3MpKSlcbiAgfVxufVxuXG5TYW1wbGVTaW5rLnByb3RvdHlwZS5lbmQgPSBQaXBlLnByb3RvdHlwZS5lbmRcblNhbXBsZVNpbmsucHJvdG90eXBlLmVycm9yID0gUGlwZS5wcm90b3R5cGUuZXJyb3JcblxuZnVuY3Rpb24gaGFzVmFsdWUgKGhvbGQpIHtcbiAgcmV0dXJuIGhvbGQuaGFzVmFsdWVcbn1cblxuZnVuY3Rpb24gZ2V0VmFsdWUgKGhvbGQpIHtcbiAgcmV0dXJuIGhvbGQudmFsdWVcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3Ivc2FtcGxlLmpzXG4vLyBtb2R1bGUgaWQgPSA3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFN0cmVhbSBmcm9tICcuLi9TdHJlYW0nXG5pbXBvcnQgKiBhcyB0cmFuc2Zvcm0gZnJvbSAnLi90cmFuc2Zvcm0nXG5pbXBvcnQgKiBhcyBjb3JlIGZyb20gJy4uL3NvdXJjZS9jb3JlJ1xuaW1wb3J0IFBpcGUgZnJvbSAnLi4vc2luay9QaXBlJ1xuaW1wb3J0IEluZGV4U2luayBmcm9tICcuLi9zaW5rL0luZGV4U2luaydcbmltcG9ydCAqIGFzIGRpc3Bvc2UgZnJvbSAnLi4vZGlzcG9zYWJsZS9kaXNwb3NlJ1xuaW1wb3J0ICogYXMgYmFzZSBmcm9tICdAbW9zdC9wcmVsdWRlJ1xuaW1wb3J0IGludm9rZSBmcm9tICcuLi9pbnZva2UnXG5pbXBvcnQgUXVldWUgZnJvbSAnLi4vUXVldWUnXG5cbnZhciBtYXAgPSBiYXNlLm1hcFxudmFyIHRhaWwgPSBiYXNlLnRhaWxcblxuLyoqXG4gKiBDb21iaW5lIHN0cmVhbXMgcGFpcndpc2UgKG9yIHR1cGxlLXdpc2UpIGJ5IGluZGV4IGJ5IGFwcGx5aW5nIGYgdG8gdmFsdWVzXG4gKiBhdCBjb3JyZXNwb25kaW5nIGluZGljZXMuICBUaGUgcmV0dXJuZWQgc3RyZWFtIGVuZHMgd2hlbiBhbnkgb2YgdGhlIGlucHV0XG4gKiBzdHJlYW1zIGVuZHMuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmIGZ1bmN0aW9uIHRvIGNvbWJpbmUgdmFsdWVzXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIHdpdGggaXRlbXMgYXQgY29ycmVzcG9uZGluZyBpbmRpY2VzIGNvbWJpbmVkXG4gKiAgdXNpbmcgZlxuICovXG5leHBvcnQgZnVuY3Rpb24gemlwIChmIC8qLCAuLi5zdHJlYW1zICovKSB7XG4gIHJldHVybiB6aXBBcnJheShmLCB0YWlsKGFyZ3VtZW50cykpXG59XG5cbi8qKlxuKiBDb21iaW5lIHN0cmVhbXMgcGFpcndpc2UgKG9yIHR1cGxlLXdpc2UpIGJ5IGluZGV4IGJ5IGFwcGx5aW5nIGYgdG8gdmFsdWVzXG4qIGF0IGNvcnJlc3BvbmRpbmcgaW5kaWNlcy4gIFRoZSByZXR1cm5lZCBzdHJlYW0gZW5kcyB3aGVuIGFueSBvZiB0aGUgaW5wdXRcbiogc3RyZWFtcyBlbmRzLlxuKiBAcGFyYW0ge2Z1bmN0aW9ufSBmIGZ1bmN0aW9uIHRvIGNvbWJpbmUgdmFsdWVzXG4qIEBwYXJhbSB7W1N0cmVhbV19IHN0cmVhbXMgc3RyZWFtcyB0byB6aXAgdXNpbmcgZlxuKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIHdpdGggaXRlbXMgYXQgY29ycmVzcG9uZGluZyBpbmRpY2VzIGNvbWJpbmVkXG4qICB1c2luZyBmXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIHppcEFycmF5IChmLCBzdHJlYW1zKSB7XG4gIHJldHVybiBzdHJlYW1zLmxlbmd0aCA9PT0gMCA/IGNvcmUuZW1wdHkoKVxuOiBzdHJlYW1zLmxlbmd0aCA9PT0gMSA/IHRyYW5zZm9ybS5tYXAoZiwgc3RyZWFtc1swXSlcbjogbmV3IFN0cmVhbShuZXcgWmlwKGYsIG1hcChnZXRTb3VyY2UsIHN0cmVhbXMpKSlcbn1cblxuZnVuY3Rpb24gZ2V0U291cmNlIChzdHJlYW0pIHtcbiAgcmV0dXJuIHN0cmVhbS5zb3VyY2Vcbn1cblxuZnVuY3Rpb24gWmlwIChmLCBzb3VyY2VzKSB7XG4gIHRoaXMuZiA9IGZcbiAgdGhpcy5zb3VyY2VzID0gc291cmNlc1xufVxuXG5aaXAucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdmFyIGwgPSB0aGlzLnNvdXJjZXMubGVuZ3RoXG4gIHZhciBkaXNwb3NhYmxlcyA9IG5ldyBBcnJheShsKVxuICB2YXIgc2lua3MgPSBuZXcgQXJyYXkobClcbiAgdmFyIGJ1ZmZlcnMgPSBuZXcgQXJyYXkobClcblxuICB2YXIgemlwU2luayA9IG5ldyBaaXBTaW5rKHRoaXMuZiwgYnVmZmVycywgc2lua3MsIHNpbmspXG5cbiAgZm9yICh2YXIgaW5kZXhTaW5rLCBpID0gMDsgaSA8IGw7ICsraSkge1xuICAgIGJ1ZmZlcnNbaV0gPSBuZXcgUXVldWUoKVxuICAgIGluZGV4U2luayA9IHNpbmtzW2ldID0gbmV3IEluZGV4U2luayhpLCB6aXBTaW5rKVxuICAgIGRpc3Bvc2FibGVzW2ldID0gdGhpcy5zb3VyY2VzW2ldLnJ1bihpbmRleFNpbmssIHNjaGVkdWxlcilcbiAgfVxuXG4gIHJldHVybiBkaXNwb3NlLmFsbChkaXNwb3NhYmxlcylcbn1cblxuZnVuY3Rpb24gWmlwU2luayAoZiwgYnVmZmVycywgc2lua3MsIHNpbmspIHtcbiAgdGhpcy5mID0gZlxuICB0aGlzLnNpbmtzID0gc2lua3NcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLmJ1ZmZlcnMgPSBidWZmZXJzXG59XG5cblppcFNpbmsucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIGluZGV4ZWRWYWx1ZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNvbXBsZXhpdHlcbiAgdmFyIGJ1ZmZlcnMgPSB0aGlzLmJ1ZmZlcnNcbiAgdmFyIGJ1ZmZlciA9IGJ1ZmZlcnNbaW5kZXhlZFZhbHVlLmluZGV4XVxuXG4gIGJ1ZmZlci5wdXNoKGluZGV4ZWRWYWx1ZS52YWx1ZSlcblxuICBpZiAoYnVmZmVyLmxlbmd0aCgpID09PSAxKSB7XG4gICAgaWYgKCFyZWFkeSh0aGlzLmJ1ZmZlcnMpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBlbWl0WmlwcGVkKHRoaXMuZiwgdCwgYnVmZmVycywgdGhpcy5zaW5rKVxuXG4gICAgaWYgKGVuZGVkKHRoaXMuYnVmZmVycywgdGhpcy5zaW5rcykpIHtcbiAgICAgIHRoaXMuc2luay5lbmQodCwgdm9pZCAwKVxuICAgIH1cbiAgfVxufVxuXG5aaXBTaW5rLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAodCwgaW5kZXhlZFZhbHVlKSB7XG4gIHZhciBidWZmZXIgPSB0aGlzLmJ1ZmZlcnNbaW5kZXhlZFZhbHVlLmluZGV4XVxuICBpZiAoYnVmZmVyLmlzRW1wdHkoKSkge1xuICAgIHRoaXMuc2luay5lbmQodCwgaW5kZXhlZFZhbHVlLnZhbHVlKVxuICB9XG59XG5cblppcFNpbmsucHJvdG90eXBlLmVycm9yID0gUGlwZS5wcm90b3R5cGUuZXJyb3JcblxuZnVuY3Rpb24gZW1pdFppcHBlZCAoZiwgdCwgYnVmZmVycywgc2luaykge1xuICBzaW5rLmV2ZW50KHQsIGludm9rZShmLCBtYXAoaGVhZCwgYnVmZmVycykpKVxufVxuXG5mdW5jdGlvbiBoZWFkIChidWZmZXIpIHtcbiAgcmV0dXJuIGJ1ZmZlci5zaGlmdCgpXG59XG5cbmZ1bmN0aW9uIGVuZGVkIChidWZmZXJzLCBzaW5rcykge1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGJ1ZmZlcnMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgaWYgKGJ1ZmZlcnNbaV0uaXNFbXB0eSgpICYmICFzaW5rc1tpXS5hY3RpdmUpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG5mdW5jdGlvbiByZWFkeSAoYnVmZmVycykge1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGJ1ZmZlcnMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgaWYgKGJ1ZmZlcnNbaV0uaXNFbXB0eSgpKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvemlwLmpzXG4vLyBtb2R1bGUgaWQgPSA3M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuLy8gQmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL3BldGthYW50b25vdi9kZXF1ZVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBRdWV1ZSAoY2FwUG93Mikge1xuICB0aGlzLl9jYXBhY2l0eSA9IGNhcFBvdzIgfHwgMzJcbiAgdGhpcy5fbGVuZ3RoID0gMFxuICB0aGlzLl9oZWFkID0gMFxufVxuXG5RdWV1ZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uICh4KSB7XG4gIHZhciBsZW4gPSB0aGlzLl9sZW5ndGhcbiAgdGhpcy5fY2hlY2tDYXBhY2l0eShsZW4gKyAxKVxuXG4gIHZhciBpID0gKHRoaXMuX2hlYWQgKyBsZW4pICYgKHRoaXMuX2NhcGFjaXR5IC0gMSlcbiAgdGhpc1tpXSA9IHhcbiAgdGhpcy5fbGVuZ3RoID0gbGVuICsgMVxufVxuXG5RdWV1ZS5wcm90b3R5cGUuc2hpZnQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBoZWFkID0gdGhpcy5faGVhZFxuICB2YXIgeCA9IHRoaXNbaGVhZF1cblxuICB0aGlzW2hlYWRdID0gdm9pZCAwXG4gIHRoaXMuX2hlYWQgPSAoaGVhZCArIDEpICYgKHRoaXMuX2NhcGFjaXR5IC0gMSlcbiAgdGhpcy5fbGVuZ3RoLS1cbiAgcmV0dXJuIHhcbn1cblxuUXVldWUucHJvdG90eXBlLmlzRW1wdHkgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLl9sZW5ndGggPT09IDBcbn1cblxuUXVldWUucHJvdG90eXBlLmxlbmd0aCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuX2xlbmd0aFxufVxuXG5RdWV1ZS5wcm90b3R5cGUuX2NoZWNrQ2FwYWNpdHkgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICBpZiAodGhpcy5fY2FwYWNpdHkgPCBzaXplKSB7XG4gICAgdGhpcy5fZW5zdXJlQ2FwYWNpdHkodGhpcy5fY2FwYWNpdHkgPDwgMSlcbiAgfVxufVxuXG5RdWV1ZS5wcm90b3R5cGUuX2Vuc3VyZUNhcGFjaXR5ID0gZnVuY3Rpb24gKGNhcGFjaXR5KSB7XG4gIHZhciBvbGRDYXBhY2l0eSA9IHRoaXMuX2NhcGFjaXR5XG4gIHRoaXMuX2NhcGFjaXR5ID0gY2FwYWNpdHlcblxuICB2YXIgbGFzdCA9IHRoaXMuX2hlYWQgKyB0aGlzLl9sZW5ndGhcblxuICBpZiAobGFzdCA+IG9sZENhcGFjaXR5KSB7XG4gICAgY29weSh0aGlzLCAwLCB0aGlzLCBvbGRDYXBhY2l0eSwgbGFzdCAmIChvbGRDYXBhY2l0eSAtIDEpKVxuICB9XG59XG5cbmZ1bmN0aW9uIGNvcHkgKHNyYywgc3JjSW5kZXgsIGRzdCwgZHN0SW5kZXgsIGxlbikge1xuICBmb3IgKHZhciBqID0gMDsgaiA8IGxlbjsgKytqKSB7XG4gICAgZHN0W2ogKyBkc3RJbmRleF0gPSBzcmNbaiArIHNyY0luZGV4XVxuICAgIHNyY1tqICsgc3JjSW5kZXhdID0gdm9pZCAwXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL1F1ZXVlLmpzXG4vLyBtb2R1bGUgaWQgPSA3NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFN0cmVhbSBmcm9tICcuLi9TdHJlYW0nXG5pbXBvcnQgKiBhcyBkaXNwb3NlIGZyb20gJy4uL2Rpc3Bvc2FibGUvZGlzcG9zZSdcblxuLyoqXG4gKiBHaXZlbiBhIHN0cmVhbSBvZiBzdHJlYW1zLCByZXR1cm4gYSBuZXcgc3RyZWFtIHRoYXQgYWRvcHRzIHRoZSBiZWhhdmlvclxuICogb2YgdGhlIG1vc3QgcmVjZW50IGlubmVyIHN0cmVhbS5cbiAqIEBwYXJhbSB7U3RyZWFtfSBzdHJlYW0gb2Ygc3RyZWFtcyBvbiB3aGljaCB0byBzd2l0Y2hcbiAqIEByZXR1cm5zIHtTdHJlYW19IHN3aXRjaGluZyBzdHJlYW1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN3aXRjaExhdGVzdCAoc3RyZWFtKSB7XG4gIHJldHVybiBuZXcgU3RyZWFtKG5ldyBTd2l0Y2goc3RyZWFtLnNvdXJjZSkpXG59XG5cbmV4cG9ydCB7IHN3aXRjaExhdGVzdCBhcyBzd2l0Y2ggfVxuXG5mdW5jdGlvbiBTd2l0Y2ggKHNvdXJjZSkge1xuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxufVxuXG5Td2l0Y2gucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdmFyIHN3aXRjaFNpbmsgPSBuZXcgU3dpdGNoU2luayhzaW5rLCBzY2hlZHVsZXIpXG4gIHJldHVybiBkaXNwb3NlLmFsbChbc3dpdGNoU2luaywgdGhpcy5zb3VyY2UucnVuKHN3aXRjaFNpbmssIHNjaGVkdWxlcildKVxufVxuXG5mdW5jdGlvbiBTd2l0Y2hTaW5rIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlclxuICB0aGlzLmN1cnJlbnQgPSBudWxsXG4gIHRoaXMuZW5kZWQgPSBmYWxzZVxufVxuXG5Td2l0Y2hTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCBzdHJlYW0pIHtcbiAgdGhpcy5fZGlzcG9zZUN1cnJlbnQodCkgLy8gVE9ETzogY2FwdHVyZSB0aGUgcmVzdWx0IG9mIHRoaXMgZGlzcG9zZVxuICB0aGlzLmN1cnJlbnQgPSBuZXcgU2VnbWVudCh0LCBJbmZpbml0eSwgdGhpcywgdGhpcy5zaW5rKVxuICB0aGlzLmN1cnJlbnQuZGlzcG9zYWJsZSA9IHN0cmVhbS5zb3VyY2UucnVuKHRoaXMuY3VycmVudCwgdGhpcy5zY2hlZHVsZXIpXG59XG5cblN3aXRjaFNpbmsucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHRoaXMuZW5kZWQgPSB0cnVlXG4gIHRoaXMuX2NoZWNrRW5kKHQsIHgpXG59XG5cblN3aXRjaFNpbmsucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKHQsIGUpIHtcbiAgdGhpcy5lbmRlZCA9IHRydWVcbiAgdGhpcy5zaW5rLmVycm9yKHQsIGUpXG59XG5cblN3aXRjaFNpbmsucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLl9kaXNwb3NlQ3VycmVudCh0aGlzLnNjaGVkdWxlci5ub3coKSlcbn1cblxuU3dpdGNoU2luay5wcm90b3R5cGUuX2Rpc3Bvc2VDdXJyZW50ID0gZnVuY3Rpb24gKHQpIHtcbiAgaWYgKHRoaXMuY3VycmVudCAhPT0gbnVsbCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnQuX2Rpc3Bvc2UodClcbiAgfVxufVxuXG5Td2l0Y2hTaW5rLnByb3RvdHlwZS5fZGlzcG9zZUlubmVyID0gZnVuY3Rpb24gKHQsIGlubmVyKSB7XG4gIGlubmVyLl9kaXNwb3NlKHQpIC8vIFRPRE86IGNhcHR1cmUgdGhlIHJlc3VsdCBvZiB0aGlzIGRpc3Bvc2VcbiAgaWYgKGlubmVyID09PSB0aGlzLmN1cnJlbnQpIHtcbiAgICB0aGlzLmN1cnJlbnQgPSBudWxsXG4gIH1cbn1cblxuU3dpdGNoU2luay5wcm90b3R5cGUuX2NoZWNrRW5kID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgaWYgKHRoaXMuZW5kZWQgJiYgdGhpcy5jdXJyZW50ID09PSBudWxsKSB7XG4gICAgdGhpcy5zaW5rLmVuZCh0LCB4KVxuICB9XG59XG5cblN3aXRjaFNpbmsucHJvdG90eXBlLl9lbmRJbm5lciA9IGZ1bmN0aW9uICh0LCB4LCBpbm5lcikge1xuICB0aGlzLl9kaXNwb3NlSW5uZXIodCwgaW5uZXIpXG4gIHRoaXMuX2NoZWNrRW5kKHQsIHgpXG59XG5cblN3aXRjaFNpbmsucHJvdG90eXBlLl9lcnJvcklubmVyID0gZnVuY3Rpb24gKHQsIGUsIGlubmVyKSB7XG4gIHRoaXMuX2Rpc3Bvc2VJbm5lcih0LCBpbm5lcilcbiAgdGhpcy5zaW5rLmVycm9yKHQsIGUpXG59XG5cbmZ1bmN0aW9uIFNlZ21lbnQgKG1pbiwgbWF4LCBvdXRlciwgc2luaykge1xuICB0aGlzLm1pbiA9IG1pblxuICB0aGlzLm1heCA9IG1heFxuICB0aGlzLm91dGVyID0gb3V0ZXJcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLmRpc3Bvc2FibGUgPSBkaXNwb3NlLmVtcHR5KClcbn1cblxuU2VnbWVudC5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgeCkge1xuICBpZiAodCA8IHRoaXMubWF4KSB7XG4gICAgdGhpcy5zaW5rLmV2ZW50KE1hdGgubWF4KHQsIHRoaXMubWluKSwgeClcbiAgfVxufVxuXG5TZWdtZW50LnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAodCwgeCkge1xuICB0aGlzLm91dGVyLl9lbmRJbm5lcihNYXRoLm1heCh0LCB0aGlzLm1pbiksIHgsIHRoaXMpXG59XG5cblNlZ21lbnQucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKHQsIGUpIHtcbiAgdGhpcy5vdXRlci5fZXJyb3JJbm5lcihNYXRoLm1heCh0LCB0aGlzLm1pbiksIGUsIHRoaXMpXG59XG5cblNlZ21lbnQucHJvdG90eXBlLl9kaXNwb3NlID0gZnVuY3Rpb24gKHQpIHtcbiAgdGhpcy5tYXggPSB0XG4gIGRpc3Bvc2UudHJ5RGlzcG9zZSh0LCB0aGlzLmRpc3Bvc2FibGUsIHRoaXMuc2luaylcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3Ivc3dpdGNoLmpzXG4vLyBtb2R1bGUgaWQgPSA3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFN0cmVhbSBmcm9tICcuLi9TdHJlYW0nXG5pbXBvcnQgUGlwZSBmcm9tICcuLi9zaW5rL1BpcGUnXG5pbXBvcnQgRmlsdGVyIGZyb20gJy4uL2Z1c2lvbi9GaWx0ZXInXG5cbi8qKlxuICogUmV0YWluIG9ubHkgaXRlbXMgbWF0Y2hpbmcgYSBwcmVkaWNhdGVcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oeDoqKTpib29sZWFufSBwIGZpbHRlcmluZyBwcmVkaWNhdGUgY2FsbGVkIGZvciBlYWNoIGl0ZW1cbiAqIEBwYXJhbSB7U3RyZWFtfSBzdHJlYW0gc3RyZWFtIHRvIGZpbHRlclxuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIGNvbnRhaW5pbmcgb25seSBpdGVtcyBmb3Igd2hpY2ggcHJlZGljYXRlIHJldHVybnMgdHJ1dGh5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXIgKHAsIHN0cmVhbSkge1xuICByZXR1cm4gbmV3IFN0cmVhbShGaWx0ZXIuY3JlYXRlKHAsIHN0cmVhbS5zb3VyY2UpKVxufVxuXG4vKipcbiAqIFNraXAgcmVwZWF0ZWQgZXZlbnRzLCB1c2luZyA9PT0gdG8gZGV0ZWN0IGR1cGxpY2F0ZXNcbiAqIEBwYXJhbSB7U3RyZWFtfSBzdHJlYW0gc3RyZWFtIGZyb20gd2hpY2ggdG8gb21pdCByZXBlYXRlZCBldmVudHNcbiAqIEByZXR1cm5zIHtTdHJlYW19IHN0cmVhbSB3aXRob3V0IHJlcGVhdGVkIGV2ZW50c1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2tpcFJlcGVhdHMgKHN0cmVhbSkge1xuICByZXR1cm4gc2tpcFJlcGVhdHNXaXRoKHNhbWUsIHN0cmVhbSlcbn1cblxuLyoqXG4gKiBTa2lwIHJlcGVhdGVkIGV2ZW50cyB1c2luZyB0aGUgcHJvdmlkZWQgZXF1YWxzIGZ1bmN0aW9uIHRvIGRldGVjdCBkdXBsaWNhdGVzXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKGE6KiwgYjoqKTpib29sZWFufSBlcXVhbHMgb3B0aW9uYWwgZnVuY3Rpb24gdG8gY29tcGFyZSBpdGVtc1xuICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbSBzdHJlYW0gZnJvbSB3aGljaCB0byBvbWl0IHJlcGVhdGVkIGV2ZW50c1xuICogQHJldHVybnMge1N0cmVhbX0gc3RyZWFtIHdpdGhvdXQgcmVwZWF0ZWQgZXZlbnRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBza2lwUmVwZWF0c1dpdGggKGVxdWFscywgc3RyZWFtKSB7XG4gIHJldHVybiBuZXcgU3RyZWFtKG5ldyBTa2lwUmVwZWF0cyhlcXVhbHMsIHN0cmVhbS5zb3VyY2UpKVxufVxuXG5mdW5jdGlvbiBTa2lwUmVwZWF0cyAoZXF1YWxzLCBzb3VyY2UpIHtcbiAgdGhpcy5lcXVhbHMgPSBlcXVhbHNcbiAgdGhpcy5zb3VyY2UgPSBzb3VyY2Vcbn1cblxuU2tpcFJlcGVhdHMucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgcmV0dXJuIHRoaXMuc291cmNlLnJ1bihuZXcgU2tpcFJlcGVhdHNTaW5rKHRoaXMuZXF1YWxzLCBzaW5rKSwgc2NoZWR1bGVyKVxufVxuXG5mdW5jdGlvbiBTa2lwUmVwZWF0c1NpbmsgKGVxdWFscywgc2luaykge1xuICB0aGlzLmVxdWFscyA9IGVxdWFsc1xuICB0aGlzLnNpbmsgPSBzaW5rXG4gIHRoaXMudmFsdWUgPSB2b2lkIDBcbiAgdGhpcy5pbml0ID0gdHJ1ZVxufVxuXG5Ta2lwUmVwZWF0c1NpbmsucHJvdG90eXBlLmVuZCA9IFBpcGUucHJvdG90eXBlLmVuZFxuU2tpcFJlcGVhdHNTaW5rLnByb3RvdHlwZS5lcnJvciA9IFBpcGUucHJvdG90eXBlLmVycm9yXG5cblNraXBSZXBlYXRzU2luay5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgeCkge1xuICBpZiAodGhpcy5pbml0KSB7XG4gICAgdGhpcy5pbml0ID0gZmFsc2VcbiAgICB0aGlzLnZhbHVlID0geFxuICAgIHRoaXMuc2luay5ldmVudCh0LCB4KVxuICB9IGVsc2UgaWYgKCF0aGlzLmVxdWFscyh0aGlzLnZhbHVlLCB4KSkge1xuICAgIHRoaXMudmFsdWUgPSB4XG4gICAgdGhpcy5zaW5rLmV2ZW50KHQsIHgpXG4gIH1cbn1cblxuZnVuY3Rpb24gc2FtZSAoYSwgYikge1xuICByZXR1cm4gYSA9PT0gYlxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci9maWx0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDc2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCBQaXBlIGZyb20gJy4uL3NpbmsvUGlwZSdcbmltcG9ydCAqIGFzIGNvcmUgZnJvbSAnLi4vc291cmNlL2NvcmUnXG5pbXBvcnQgKiBhcyBkaXNwb3NlIGZyb20gJy4uL2Rpc3Bvc2FibGUvZGlzcG9zZSdcbmltcG9ydCBNYXAgZnJvbSAnLi4vZnVzaW9uL01hcCdcblxuLyoqXG4gKiBAcGFyYW0ge251bWJlcn0gblxuICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbVxuICogQHJldHVybnMge1N0cmVhbX0gbmV3IHN0cmVhbSBjb250YWluaW5nIG9ubHkgdXAgdG8gdGhlIGZpcnN0IG4gaXRlbXMgZnJvbSBzdHJlYW1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRha2UgKG4sIHN0cmVhbSkge1xuICByZXR1cm4gc2xpY2UoMCwgbiwgc3RyZWFtKVxufVxuXG4vKipcbiAqIEBwYXJhbSB7bnVtYmVyfSBuXG4gKiBAcGFyYW0ge1N0cmVhbX0gc3RyZWFtXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIHdpdGggdGhlIGZpcnN0IG4gaXRlbXMgcmVtb3ZlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2tpcCAobiwgc3RyZWFtKSB7XG4gIHJldHVybiBzbGljZShuLCBJbmZpbml0eSwgc3RyZWFtKVxufVxuXG4vKipcbiAqIFNsaWNlIGEgc3RyZWFtIGJ5IGluZGV4LiBOZWdhdGl2ZSBzdGFydC9lbmQgaW5kZXhlcyBhcmUgbm90IHN1cHBvcnRlZFxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0XG4gKiBAcGFyYW0ge251bWJlcn0gZW5kXG4gKiBAcGFyYW0ge1N0cmVhbX0gc3RyZWFtXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBzdHJlYW0gY29udGFpbmluZyBpdGVtcyB3aGVyZSBzdGFydCA8PSBpbmRleCA8IGVuZFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2xpY2UgKHN0YXJ0LCBlbmQsIHN0cmVhbSkge1xuICByZXR1cm4gZW5kIDw9IHN0YXJ0ID8gY29yZS5lbXB0eSgpXG4gICAgOiBuZXcgU3RyZWFtKHNsaWNlU291cmNlKHN0YXJ0LCBlbmQsIHN0cmVhbS5zb3VyY2UpKVxufVxuXG5mdW5jdGlvbiBzbGljZVNvdXJjZSAoc3RhcnQsIGVuZCwgc291cmNlKSB7XG4gIHJldHVybiBzb3VyY2UgaW5zdGFuY2VvZiBNYXAgPyBjb21tdXRlTWFwU2xpY2Uoc3RhcnQsIGVuZCwgc291cmNlKVxuICAgIDogc291cmNlIGluc3RhbmNlb2YgU2xpY2UgPyBmdXNlU2xpY2Uoc3RhcnQsIGVuZCwgc291cmNlKVxuICAgIDogbmV3IFNsaWNlKHN0YXJ0LCBlbmQsIHNvdXJjZSlcbn1cblxuZnVuY3Rpb24gY29tbXV0ZU1hcFNsaWNlIChzdGFydCwgZW5kLCBzb3VyY2UpIHtcbiAgcmV0dXJuIE1hcC5jcmVhdGUoc291cmNlLmYsIHNsaWNlU291cmNlKHN0YXJ0LCBlbmQsIHNvdXJjZS5zb3VyY2UpKVxufVxuXG5mdW5jdGlvbiBmdXNlU2xpY2UgKHN0YXJ0LCBlbmQsIHNvdXJjZSkge1xuICBzdGFydCArPSBzb3VyY2UubWluXG4gIGVuZCA9IE1hdGgubWluKGVuZCArIHNvdXJjZS5taW4sIHNvdXJjZS5tYXgpXG4gIHJldHVybiBuZXcgU2xpY2Uoc3RhcnQsIGVuZCwgc291cmNlLnNvdXJjZSlcbn1cblxuZnVuY3Rpb24gU2xpY2UgKG1pbiwgbWF4LCBzb3VyY2UpIHtcbiAgdGhpcy5zb3VyY2UgPSBzb3VyY2VcbiAgdGhpcy5taW4gPSBtaW5cbiAgdGhpcy5tYXggPSBtYXhcbn1cblxuU2xpY2UucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdmFyIGRpc3Bvc2FibGUgPSBkaXNwb3NlLnNldHRhYmxlKClcbiAgdmFyIHNsaWNlU2luayA9IG5ldyBTbGljZVNpbmsodGhpcy5taW4sIHRoaXMubWF4IC0gdGhpcy5taW4sIHNpbmssIGRpc3Bvc2FibGUpXG5cbiAgZGlzcG9zYWJsZS5zZXREaXNwb3NhYmxlKHRoaXMuc291cmNlLnJ1bihzbGljZVNpbmssIHNjaGVkdWxlcikpXG4gIHJldHVybiBkaXNwb3NhYmxlXG59XG5cbmZ1bmN0aW9uIFNsaWNlU2luayAoc2tpcCwgdGFrZSwgc2luaywgZGlzcG9zYWJsZSkge1xuICB0aGlzLnNpbmsgPSBzaW5rXG4gIHRoaXMuc2tpcCA9IHNraXBcbiAgdGhpcy50YWtlID0gdGFrZVxuICB0aGlzLmRpc3Bvc2FibGUgPSBkaXNwb3NhYmxlXG59XG5cblNsaWNlU2luay5wcm90b3R5cGUuZW5kID0gUGlwZS5wcm90b3R5cGUuZW5kXG5TbGljZVNpbmsucHJvdG90eXBlLmVycm9yID0gUGlwZS5wcm90b3R5cGUuZXJyb3JcblxuU2xpY2VTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIC8qIGVzbGludCBjb21wbGV4aXR5OiBbMSwgNF0gKi9cbiAgaWYgKHRoaXMuc2tpcCA+IDApIHtcbiAgICB0aGlzLnNraXAgLT0gMVxuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKHRoaXMudGFrZSA9PT0gMCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdGhpcy50YWtlIC09IDFcbiAgdGhpcy5zaW5rLmV2ZW50KHQsIHgpXG4gIGlmICh0aGlzLnRha2UgPT09IDApIHtcbiAgICB0aGlzLmRpc3Bvc2FibGUuZGlzcG9zZSgpXG4gICAgdGhpcy5zaW5rLmVuZCh0LCB4KVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0YWtlV2hpbGUgKHAsIHN0cmVhbSkge1xuICByZXR1cm4gbmV3IFN0cmVhbShuZXcgVGFrZVdoaWxlKHAsIHN0cmVhbS5zb3VyY2UpKVxufVxuXG5mdW5jdGlvbiBUYWtlV2hpbGUgKHAsIHNvdXJjZSkge1xuICB0aGlzLnAgPSBwXG4gIHRoaXMuc291cmNlID0gc291cmNlXG59XG5cblRha2VXaGlsZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICB2YXIgZGlzcG9zYWJsZSA9IGRpc3Bvc2Uuc2V0dGFibGUoKVxuICB2YXIgdGFrZVdoaWxlU2luayA9IG5ldyBUYWtlV2hpbGVTaW5rKHRoaXMucCwgc2luaywgZGlzcG9zYWJsZSlcblxuICBkaXNwb3NhYmxlLnNldERpc3Bvc2FibGUodGhpcy5zb3VyY2UucnVuKHRha2VXaGlsZVNpbmssIHNjaGVkdWxlcikpXG4gIHJldHVybiBkaXNwb3NhYmxlXG59XG5cbmZ1bmN0aW9uIFRha2VXaGlsZVNpbmsgKHAsIHNpbmssIGRpc3Bvc2FibGUpIHtcbiAgdGhpcy5wID0gcFxuICB0aGlzLnNpbmsgPSBzaW5rXG4gIHRoaXMuYWN0aXZlID0gdHJ1ZVxuICB0aGlzLmRpc3Bvc2FibGUgPSBkaXNwb3NhYmxlXG59XG5cblRha2VXaGlsZVNpbmsucHJvdG90eXBlLmVuZCA9IFBpcGUucHJvdG90eXBlLmVuZFxuVGFrZVdoaWxlU2luay5wcm90b3R5cGUuZXJyb3IgPSBQaXBlLnByb3RvdHlwZS5lcnJvclxuXG5UYWtlV2hpbGVTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIGlmICghdGhpcy5hY3RpdmUpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBwID0gdGhpcy5wXG4gIHRoaXMuYWN0aXZlID0gcCh4KVxuICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICB0aGlzLnNpbmsuZXZlbnQodCwgeClcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmRpc3Bvc2FibGUuZGlzcG9zZSgpXG4gICAgdGhpcy5zaW5rLmVuZCh0LCB4KVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBza2lwV2hpbGUgKHAsIHN0cmVhbSkge1xuICByZXR1cm4gbmV3IFN0cmVhbShuZXcgU2tpcFdoaWxlKHAsIHN0cmVhbS5zb3VyY2UpKVxufVxuXG5mdW5jdGlvbiBTa2lwV2hpbGUgKHAsIHNvdXJjZSkge1xuICB0aGlzLnAgPSBwXG4gIHRoaXMuc291cmNlID0gc291cmNlXG59XG5cblNraXBXaGlsZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gdGhpcy5zb3VyY2UucnVuKG5ldyBTa2lwV2hpbGVTaW5rKHRoaXMucCwgc2luayksIHNjaGVkdWxlcilcbn1cblxuZnVuY3Rpb24gU2tpcFdoaWxlU2luayAocCwgc2luaykge1xuICB0aGlzLnAgPSBwXG4gIHRoaXMuc2luayA9IHNpbmtcbiAgdGhpcy5za2lwcGluZyA9IHRydWVcbn1cblxuU2tpcFdoaWxlU2luay5wcm90b3R5cGUuZW5kID0gUGlwZS5wcm90b3R5cGUuZW5kXG5Ta2lwV2hpbGVTaW5rLnByb3RvdHlwZS5lcnJvciA9IFBpcGUucHJvdG90eXBlLmVycm9yXG5cblNraXBXaGlsZVNpbmsucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgaWYgKHRoaXMuc2tpcHBpbmcpIHtcbiAgICB2YXIgcCA9IHRoaXMucFxuICAgIHRoaXMuc2tpcHBpbmcgPSBwKHgpXG4gICAgaWYgKHRoaXMuc2tpcHBpbmcpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgfVxuXG4gIHRoaXMuc2luay5ldmVudCh0LCB4KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2tpcEFmdGVyIChwLCBzdHJlYW0pIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IFNraXBBZnRlcihwLCBzdHJlYW0uc291cmNlKSlcbn1cblxuZnVuY3Rpb24gU2tpcEFmdGVyIChwLCBzb3VyY2UpIHtcbiAgdGhpcy5wID0gcFxuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxufVxuXG5Ta2lwQWZ0ZXIucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIHJ1biAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHJldHVybiB0aGlzLnNvdXJjZS5ydW4obmV3IFNraXBBZnRlclNpbmsodGhpcy5wLCBzaW5rKSwgc2NoZWR1bGVyKVxufVxuXG5mdW5jdGlvbiBTa2lwQWZ0ZXJTaW5rIChwLCBzaW5rKSB7XG4gIHRoaXMucCA9IHBcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLnNraXBwaW5nID0gZmFsc2Vcbn1cblxuU2tpcEFmdGVyU2luay5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiBldmVudCAodCwgeCkge1xuICBpZiAodGhpcy5za2lwcGluZykge1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIHAgPSB0aGlzLnBcbiAgdGhpcy5za2lwcGluZyA9IHAoeClcbiAgdGhpcy5zaW5rLmV2ZW50KHQsIHgpXG5cbiAgaWYgKHRoaXMuc2tpcHBpbmcpIHtcbiAgICB0aGlzLnNpbmsuZW5kKHQsIHgpXG4gIH1cbn1cblxuU2tpcEFmdGVyU2luay5wcm90b3R5cGUuZW5kID0gUGlwZS5wcm90b3R5cGUuZW5kXG5Ta2lwQWZ0ZXJTaW5rLnByb3RvdHlwZS5lcnJvciA9IFBpcGUucHJvdG90eXBlLmVycm9yXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb3N0L3NyYy9jb21iaW5hdG9yL3NsaWNlLmpzXG4vLyBtb2R1bGUgaWQgPSA3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFN0cmVhbSBmcm9tICcuLi9TdHJlYW0nXG5pbXBvcnQgUGlwZSBmcm9tICcuLi9zaW5rL1BpcGUnXG5pbXBvcnQgKiBhcyBkaXNwb3NlIGZyb20gJy4uL2Rpc3Bvc2FibGUvZGlzcG9zZSdcbmltcG9ydCB7IGpvaW4gfSBmcm9tICcuLi9jb21iaW5hdG9yL2ZsYXRNYXAnXG5cbmV4cG9ydCBmdW5jdGlvbiB0YWtlVW50aWwgKHNpZ25hbCwgc3RyZWFtKSB7XG4gIHJldHVybiBuZXcgU3RyZWFtKG5ldyBVbnRpbChzaWduYWwuc291cmNlLCBzdHJlYW0uc291cmNlKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNraXBVbnRpbCAoc2lnbmFsLCBzdHJlYW0pIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IFNpbmNlKHNpZ25hbC5zb3VyY2UsIHN0cmVhbS5zb3VyY2UpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZHVyaW5nICh0aW1lV2luZG93LCBzdHJlYW0pIHtcbiAgcmV0dXJuIHRha2VVbnRpbChqb2luKHRpbWVXaW5kb3cpLCBza2lwVW50aWwodGltZVdpbmRvdywgc3RyZWFtKSlcbn1cblxuZnVuY3Rpb24gVW50aWwgKG1heFNpZ25hbCwgc291cmNlKSB7XG4gIHRoaXMubWF4U2lnbmFsID0gbWF4U2lnbmFsXG4gIHRoaXMuc291cmNlID0gc291cmNlXG59XG5cblVudGlsLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHZhciBtaW4gPSBuZXcgQm91bmQoLUluZmluaXR5LCBzaW5rKVxuICB2YXIgbWF4ID0gbmV3IFVwcGVyQm91bmQodGhpcy5tYXhTaWduYWwsIHNpbmssIHNjaGVkdWxlcilcbiAgdmFyIGRpc3Bvc2FibGUgPSB0aGlzLnNvdXJjZS5ydW4obmV3IFRpbWVXaW5kb3dTaW5rKG1pbiwgbWF4LCBzaW5rKSwgc2NoZWR1bGVyKVxuXG4gIHJldHVybiBkaXNwb3NlLmFsbChbbWluLCBtYXgsIGRpc3Bvc2FibGVdKVxufVxuXG5mdW5jdGlvbiBTaW5jZSAobWluU2lnbmFsLCBzb3VyY2UpIHtcbiAgdGhpcy5taW5TaWduYWwgPSBtaW5TaWduYWxcbiAgdGhpcy5zb3VyY2UgPSBzb3VyY2Vcbn1cblxuU2luY2UucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdmFyIG1pbiA9IG5ldyBMb3dlckJvdW5kKHRoaXMubWluU2lnbmFsLCBzaW5rLCBzY2hlZHVsZXIpXG4gIHZhciBtYXggPSBuZXcgQm91bmQoSW5maW5pdHksIHNpbmspXG4gIHZhciBkaXNwb3NhYmxlID0gdGhpcy5zb3VyY2UucnVuKG5ldyBUaW1lV2luZG93U2luayhtaW4sIG1heCwgc2luayksIHNjaGVkdWxlcilcblxuICByZXR1cm4gZGlzcG9zZS5hbGwoW21pbiwgbWF4LCBkaXNwb3NhYmxlXSlcbn1cblxuZnVuY3Rpb24gQm91bmQgKHZhbHVlLCBzaW5rKSB7XG4gIHRoaXMudmFsdWUgPSB2YWx1ZVxuICB0aGlzLnNpbmsgPSBzaW5rXG59XG5cbkJvdW5kLnByb3RvdHlwZS5lcnJvciA9IFBpcGUucHJvdG90eXBlLmVycm9yXG5Cb3VuZC5wcm90b3R5cGUuZXZlbnQgPSBub29wXG5Cb3VuZC5wcm90b3R5cGUuZW5kID0gbm9vcFxuQm91bmQucHJvdG90eXBlLmRpc3Bvc2UgPSBub29wXG5cbmZ1bmN0aW9uIFRpbWVXaW5kb3dTaW5rIChtaW4sIG1heCwgc2luaykge1xuICB0aGlzLm1pbiA9IG1pblxuICB0aGlzLm1heCA9IG1heFxuICB0aGlzLnNpbmsgPSBzaW5rXG59XG5cblRpbWVXaW5kb3dTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIGlmICh0ID49IHRoaXMubWluLnZhbHVlICYmIHQgPCB0aGlzLm1heC52YWx1ZSkge1xuICAgIHRoaXMuc2luay5ldmVudCh0LCB4KVxuICB9XG59XG5cblRpbWVXaW5kb3dTaW5rLnByb3RvdHlwZS5lcnJvciA9IFBpcGUucHJvdG90eXBlLmVycm9yXG5UaW1lV2luZG93U2luay5wcm90b3R5cGUuZW5kID0gUGlwZS5wcm90b3R5cGUuZW5kXG5cbmZ1bmN0aW9uIExvd2VyQm91bmQgKHNpZ25hbCwgc2luaywgc2NoZWR1bGVyKSB7XG4gIHRoaXMudmFsdWUgPSBJbmZpbml0eVxuICB0aGlzLnNpbmsgPSBzaW5rXG4gIHRoaXMuZGlzcG9zYWJsZSA9IHNpZ25hbC5ydW4odGhpcywgc2NoZWR1bGVyKVxufVxuXG5Mb3dlckJvdW5kLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0IC8qLCB4ICovKSB7XG4gIGlmICh0IDwgdGhpcy52YWx1ZSkge1xuICAgIHRoaXMudmFsdWUgPSB0XG4gIH1cbn1cblxuTG93ZXJCb3VuZC5wcm90b3R5cGUuZW5kID0gbm9vcFxuTG93ZXJCb3VuZC5wcm90b3R5cGUuZXJyb3IgPSBQaXBlLnByb3RvdHlwZS5lcnJvclxuXG5Mb3dlckJvdW5kLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5kaXNwb3NhYmxlLmRpc3Bvc2UoKVxufVxuXG5mdW5jdGlvbiBVcHBlckJvdW5kIChzaWduYWwsIHNpbmssIHNjaGVkdWxlcikge1xuICB0aGlzLnZhbHVlID0gSW5maW5pdHlcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLmRpc3Bvc2FibGUgPSBzaWduYWwucnVuKHRoaXMsIHNjaGVkdWxlcilcbn1cblxuVXBwZXJCb3VuZC5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgeCkge1xuICBpZiAodCA8IHRoaXMudmFsdWUpIHtcbiAgICB0aGlzLnZhbHVlID0gdFxuICAgIHRoaXMuc2luay5lbmQodCwgeClcbiAgfVxufVxuXG5VcHBlckJvdW5kLnByb3RvdHlwZS5lbmQgPSBub29wXG5VcHBlckJvdW5kLnByb3RvdHlwZS5lcnJvciA9IFBpcGUucHJvdG90eXBlLmVycm9yXG5cblVwcGVyQm91bmQucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmRpc3Bvc2FibGUuZGlzcG9zZSgpXG59XG5cbmZ1bmN0aW9uIG5vb3AgKCkge31cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvdGltZXNsaWNlLmpzXG4vLyBtb2R1bGUgaWQgPSA3OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuaW1wb3J0IFN0cmVhbSBmcm9tICcuLi9TdHJlYW0nXG5pbXBvcnQgUGlwZSBmcm9tICcuLi9zaW5rL1BpcGUnXG5pbXBvcnQgKiBhcyBkaXNwb3NlIGZyb20gJy4uL2Rpc3Bvc2FibGUvZGlzcG9zZSdcbmltcG9ydCBQcm9wYWdhdGVUYXNrIGZyb20gJy4uL3NjaGVkdWxlci9Qcm9wYWdhdGVUYXNrJ1xuXG4vKipcbiAqIEBwYXJhbSB7TnVtYmVyfSBkZWxheVRpbWUgbWlsbGlzZWNvbmRzIHRvIGRlbGF5IGVhY2ggaXRlbVxuICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbVxuICogQHJldHVybnMge1N0cmVhbX0gbmV3IHN0cmVhbSBjb250YWluaW5nIHRoZSBzYW1lIGl0ZW1zLCBidXQgZGVsYXllZCBieSBtc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGVsYXkgKGRlbGF5VGltZSwgc3RyZWFtKSB7XG4gIHJldHVybiBkZWxheVRpbWUgPD0gMCA/IHN0cmVhbVxuICAgIDogbmV3IFN0cmVhbShuZXcgRGVsYXkoZGVsYXlUaW1lLCBzdHJlYW0uc291cmNlKSlcbn1cblxuZnVuY3Rpb24gRGVsYXkgKGR0LCBzb3VyY2UpIHtcbiAgdGhpcy5kdCA9IGR0XG4gIHRoaXMuc291cmNlID0gc291cmNlXG59XG5cbkRlbGF5LnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoc2luaywgc2NoZWR1bGVyKSB7XG4gIHZhciBkZWxheVNpbmsgPSBuZXcgRGVsYXlTaW5rKHRoaXMuZHQsIHNpbmssIHNjaGVkdWxlcilcbiAgcmV0dXJuIGRpc3Bvc2UuYWxsKFtkZWxheVNpbmssIHRoaXMuc291cmNlLnJ1bihkZWxheVNpbmssIHNjaGVkdWxlcildKVxufVxuXG5mdW5jdGlvbiBEZWxheVNpbmsgKGR0LCBzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdGhpcy5kdCA9IGR0XG4gIHRoaXMuc2luayA9IHNpbmtcbiAgdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXJcbn1cblxuRGVsYXlTaW5rLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZiA9IHRoaXNcbiAgdGhpcy5zY2hlZHVsZXIuY2FuY2VsQWxsKGZ1bmN0aW9uIChzY2hlZHVsZWRUYXNrKSB7XG4gICAgcmV0dXJuIHNjaGVkdWxlZFRhc2sudGFzay5zaW5rID09PSBzZWxmLnNpbmtcbiAgfSlcbn1cblxuRGVsYXlTaW5rLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHRoaXMuc2NoZWR1bGVyLmRlbGF5KHRoaXMuZHQsIFByb3BhZ2F0ZVRhc2suZXZlbnQoeCwgdGhpcy5zaW5rKSlcbn1cblxuRGVsYXlTaW5rLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAodCwgeCkge1xuICB0aGlzLnNjaGVkdWxlci5kZWxheSh0aGlzLmR0LCBQcm9wYWdhdGVUYXNrLmVuZCh4LCB0aGlzLnNpbmspKVxufVxuXG5EZWxheVNpbmsucHJvdG90eXBlLmVycm9yID0gUGlwZS5wcm90b3R5cGUuZXJyb3JcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvZGVsYXkuanNcbi8vIG1vZHVsZSBpZCA9IDc5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCBQaXBlIGZyb20gJy4uL3NpbmsvUGlwZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHRpbWVzdGFtcCAoc3RyZWFtKSB7XG4gIHJldHVybiBuZXcgU3RyZWFtKG5ldyBUaW1lc3RhbXAoc3RyZWFtLnNvdXJjZSkpXG59XG5cbmZ1bmN0aW9uIFRpbWVzdGFtcCAoc291cmNlKSB7XG4gIHRoaXMuc291cmNlID0gc291cmNlXG59XG5cblRpbWVzdGFtcC5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gdGhpcy5zb3VyY2UucnVuKG5ldyBUaW1lc3RhbXBTaW5rKHNpbmspLCBzY2hlZHVsZXIpXG59XG5cbmZ1bmN0aW9uIFRpbWVzdGFtcFNpbmsgKHNpbmspIHtcbiAgdGhpcy5zaW5rID0gc2lua1xufVxuXG5UaW1lc3RhbXBTaW5rLnByb3RvdHlwZS5lbmQgPSBQaXBlLnByb3RvdHlwZS5lbmRcblRpbWVzdGFtcFNpbmsucHJvdG90eXBlLmVycm9yID0gUGlwZS5wcm90b3R5cGUuZXJyb3JcblxuVGltZXN0YW1wU2luay5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgeCkge1xuICB0aGlzLnNpbmsuZXZlbnQodCwgeyB0aW1lOiB0LCB2YWx1ZTogeCB9KVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9zdC9zcmMvY29tYmluYXRvci90aW1lc3RhbXAuanNcbi8vIG1vZHVsZSBpZCA9IDgwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCBQaXBlIGZyb20gJy4uL3NpbmsvUGlwZSdcbmltcG9ydCBQcm9wYWdhdGVUYXNrIGZyb20gJy4uL3NjaGVkdWxlci9Qcm9wYWdhdGVUYXNrJ1xuaW1wb3J0IE1hcCBmcm9tICcuLi9mdXNpb24vTWFwJ1xuXG4vKipcbiAqIExpbWl0IHRoZSByYXRlIG9mIGV2ZW50cyBieSBzdXBwcmVzc2luZyBldmVudHMgdGhhdCBvY2N1ciB0b28gb2Z0ZW5cbiAqIEBwYXJhbSB7TnVtYmVyfSBwZXJpb2QgdGltZSB0byBzdXBwcmVzcyBldmVudHNcbiAqIEBwYXJhbSB7U3RyZWFtfSBzdHJlYW1cbiAqIEByZXR1cm5zIHtTdHJlYW19XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0aHJvdHRsZSAocGVyaW9kLCBzdHJlYW0pIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0odGhyb3R0bGVTb3VyY2UocGVyaW9kLCBzdHJlYW0uc291cmNlKSlcbn1cblxuZnVuY3Rpb24gdGhyb3R0bGVTb3VyY2UgKHBlcmlvZCwgc291cmNlKSB7XG4gIHJldHVybiBzb3VyY2UgaW5zdGFuY2VvZiBNYXAgPyBjb21tdXRlTWFwVGhyb3R0bGUocGVyaW9kLCBzb3VyY2UpXG4gICAgOiBzb3VyY2UgaW5zdGFuY2VvZiBUaHJvdHRsZSA/IGZ1c2VUaHJvdHRsZShwZXJpb2QsIHNvdXJjZSlcbiAgICA6IG5ldyBUaHJvdHRsZShwZXJpb2QsIHNvdXJjZSlcbn1cblxuZnVuY3Rpb24gY29tbXV0ZU1hcFRocm90dGxlIChwZXJpb2QsIHNvdXJjZSkge1xuICByZXR1cm4gTWFwLmNyZWF0ZShzb3VyY2UuZiwgdGhyb3R0bGVTb3VyY2UocGVyaW9kLCBzb3VyY2Uuc291cmNlKSlcbn1cblxuZnVuY3Rpb24gZnVzZVRocm90dGxlIChwZXJpb2QsIHNvdXJjZSkge1xuICByZXR1cm4gbmV3IFRocm90dGxlKE1hdGgubWF4KHBlcmlvZCwgc291cmNlLnBlcmlvZCksIHNvdXJjZS5zb3VyY2UpXG59XG5cbmZ1bmN0aW9uIFRocm90dGxlIChwZXJpb2QsIHNvdXJjZSkge1xuICB0aGlzLnBlcmlvZCA9IHBlcmlvZFxuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxufVxuXG5UaHJvdHRsZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gdGhpcy5zb3VyY2UucnVuKG5ldyBUaHJvdHRsZVNpbmsodGhpcy5wZXJpb2QsIHNpbmspLCBzY2hlZHVsZXIpXG59XG5cbmZ1bmN0aW9uIFRocm90dGxlU2luayAocGVyaW9kLCBzaW5rKSB7XG4gIHRoaXMudGltZSA9IDBcbiAgdGhpcy5wZXJpb2QgPSBwZXJpb2RcbiAgdGhpcy5zaW5rID0gc2lua1xufVxuXG5UaHJvdHRsZVNpbmsucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgaWYgKHQgPj0gdGhpcy50aW1lKSB7XG4gICAgdGhpcy50aW1lID0gdCArIHRoaXMucGVyaW9kXG4gICAgdGhpcy5zaW5rLmV2ZW50KHQsIHgpXG4gIH1cbn1cblxuVGhyb3R0bGVTaW5rLnByb3RvdHlwZS5lbmQgPSBQaXBlLnByb3RvdHlwZS5lbmRcblxuVGhyb3R0bGVTaW5rLnByb3RvdHlwZS5lcnJvciA9IFBpcGUucHJvdG90eXBlLmVycm9yXG5cbi8qKlxuICogV2FpdCBmb3IgYSBidXJzdCBvZiBldmVudHMgdG8gc3Vic2lkZSBhbmQgZW1pdCBvbmx5IHRoZSBsYXN0IGV2ZW50IGluIHRoZSBidXJzdFxuICogQHBhcmFtIHtOdW1iZXJ9IHBlcmlvZCBldmVudHMgb2NjdXJpbmcgbW9yZSBmcmVxdWVudGx5IHRoYW4gdGhpc1xuICogIHdpbGwgYmUgc3VwcHJlc3NlZFxuICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbSBzdHJlYW0gdG8gZGVib3VuY2VcbiAqIEByZXR1cm5zIHtTdHJlYW19IG5ldyBkZWJvdW5jZWQgc3RyZWFtXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWJvdW5jZSAocGVyaW9kLCBzdHJlYW0pIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IERlYm91bmNlKHBlcmlvZCwgc3RyZWFtLnNvdXJjZSkpXG59XG5cbmZ1bmN0aW9uIERlYm91bmNlIChkdCwgc291cmNlKSB7XG4gIHRoaXMuZHQgPSBkdFxuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxufVxuXG5EZWJvdW5jZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gbmV3IERlYm91bmNlU2luayh0aGlzLmR0LCB0aGlzLnNvdXJjZSwgc2luaywgc2NoZWR1bGVyKVxufVxuXG5mdW5jdGlvbiBEZWJvdW5jZVNpbmsgKGR0LCBzb3VyY2UsIHNpbmssIHNjaGVkdWxlcikge1xuICB0aGlzLmR0ID0gZHRcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlclxuICB0aGlzLnZhbHVlID0gdm9pZCAwXG4gIHRoaXMudGltZXIgPSBudWxsXG4gIHRoaXMuZGlzcG9zYWJsZSA9IHNvdXJjZS5ydW4odGhpcywgc2NoZWR1bGVyKVxufVxuXG5EZWJvdW5jZVNpbmsucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgdGhpcy5fY2xlYXJUaW1lcigpXG4gIHRoaXMudmFsdWUgPSB4XG4gIHRoaXMudGltZXIgPSB0aGlzLnNjaGVkdWxlci5kZWxheSh0aGlzLmR0LCBQcm9wYWdhdGVUYXNrLmV2ZW50KHgsIHRoaXMuc2luaykpXG59XG5cbkRlYm91bmNlU2luay5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgaWYgKHRoaXMuX2NsZWFyVGltZXIoKSkge1xuICAgIHRoaXMuc2luay5ldmVudCh0LCB0aGlzLnZhbHVlKVxuICAgIHRoaXMudmFsdWUgPSB2b2lkIDBcbiAgfVxuICB0aGlzLnNpbmsuZW5kKHQsIHgpXG59XG5cbkRlYm91bmNlU2luay5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAodCwgeCkge1xuICB0aGlzLl9jbGVhclRpbWVyKClcbiAgdGhpcy5zaW5rLmVycm9yKHQsIHgpXG59XG5cbkRlYm91bmNlU2luay5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5fY2xlYXJUaW1lcigpXG4gIHJldHVybiB0aGlzLmRpc3Bvc2FibGUuZGlzcG9zZSgpXG59XG5cbkRlYm91bmNlU2luay5wcm90b3R5cGUuX2NsZWFyVGltZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLnRpbWVyID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgdGhpcy50aW1lci5kaXNwb3NlKClcbiAgdGhpcy50aW1lciA9IG51bGxcbiAgcmV0dXJuIHRydWVcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvbGltaXQuanNcbi8vIG1vZHVsZSBpZCA9IDgxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCBmYXRhbCBmcm9tICcuLi9mYXRhbEVycm9yJ1xuaW1wb3J0IHsgb2YgYXMganVzdCB9IGZyb20gJy4uL3NvdXJjZS9jb3JlJ1xuXG4vKipcbiAqIENyZWF0ZSBhIHN0cmVhbSBjb250YWluaW5nIG9ubHkgdGhlIHByb21pc2UncyBmdWxmaWxsbWVudFxuICogdmFsdWUgYXQgdGhlIHRpbWUgaXQgZnVsZmlsbHMuXG4gKiBAcGFyYW0ge1Byb21pc2U8VD59IHAgcHJvbWlzZVxuICogQHJldHVybiB7U3RyZWFtPFQ+fSBzdHJlYW0gY29udGFpbmluZyBwcm9taXNlJ3MgZnVsZmlsbG1lbnQgdmFsdWUuXG4gKiAgSWYgdGhlIHByb21pc2UgcmVqZWN0cywgdGhlIHN0cmVhbSB3aWxsIGVycm9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmcm9tUHJvbWlzZSAocCkge1xuICByZXR1cm4gYXdhaXRQcm9taXNlcyhqdXN0KHApKVxufVxuXG4vKipcbiAqIFR1cm4gYSBTdHJlYW08UHJvbWlzZTxUPj4gaW50byBTdHJlYW08VD4gYnkgYXdhaXRpbmcgZWFjaCBwcm9taXNlLlxuICogRXZlbnQgb3JkZXIgaXMgcHJlc2VydmVkLlxuICogQHBhcmFtIHtTdHJlYW08UHJvbWlzZTxUPj59IHN0cmVhbVxuICogQHJldHVybiB7U3RyZWFtPFQ+fSBzdHJlYW0gb2YgZnVsZmlsbG1lbnQgdmFsdWVzLiAgVGhlIHN0cmVhbSB3aWxsXG4gKiBlcnJvciBpZiBhbnkgcHJvbWlzZSByZWplY3RzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXdhaXRQcm9taXNlcyAoc3RyZWFtKSB7XG4gIHJldHVybiBuZXcgU3RyZWFtKG5ldyBBd2FpdChzdHJlYW0uc291cmNlKSlcbn1cblxuZnVuY3Rpb24gQXdhaXQgKHNvdXJjZSkge1xuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxufVxuXG5Bd2FpdC5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gdGhpcy5zb3VyY2UucnVuKG5ldyBBd2FpdFNpbmsoc2luaywgc2NoZWR1bGVyKSwgc2NoZWR1bGVyKVxufVxuXG5mdW5jdGlvbiBBd2FpdFNpbmsgKHNpbmssIHNjaGVkdWxlcikge1xuICB0aGlzLnNpbmsgPSBzaW5rXG4gIHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyXG4gIHRoaXMucXVldWUgPSBQcm9taXNlLnJlc29sdmUoKVxuICB2YXIgc2VsZiA9IHRoaXNcblxuXHQvLyBQcmUtY3JlYXRlIGNsb3N1cmVzLCB0byBhdm9pZCBjcmVhdGluZyB0aGVtIHBlciBldmVudFxuICB0aGlzLl9ldmVudEJvdW5kID0gZnVuY3Rpb24gKHgpIHtcbiAgICBzZWxmLnNpbmsuZXZlbnQoc2VsZi5zY2hlZHVsZXIubm93KCksIHgpXG4gIH1cblxuICB0aGlzLl9lbmRCb3VuZCA9IGZ1bmN0aW9uICh4KSB7XG4gICAgc2VsZi5zaW5rLmVuZChzZWxmLnNjaGVkdWxlci5ub3coKSwgeClcbiAgfVxuXG4gIHRoaXMuX2Vycm9yQm91bmQgPSBmdW5jdGlvbiAoZSkge1xuICAgIHNlbGYuc2luay5lcnJvcihzZWxmLnNjaGVkdWxlci5ub3coKSwgZSlcbiAgfVxufVxuXG5Bd2FpdFNpbmsucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHByb21pc2UpIHtcbiAgdmFyIHNlbGYgPSB0aGlzXG4gIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBzZWxmLl9ldmVudChwcm9taXNlKVxuICB9KS5jYXRjaCh0aGlzLl9lcnJvckJvdW5kKVxufVxuXG5Bd2FpdFNpbmsucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uICh0LCB4KSB7XG4gIHZhciBzZWxmID0gdGhpc1xuICB0aGlzLnF1ZXVlID0gdGhpcy5xdWV1ZS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gc2VsZi5fZW5kKHgpXG4gIH0pLmNhdGNoKHRoaXMuX2Vycm9yQm91bmQpXG59XG5cbkF3YWl0U2luay5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAodCwgZSkge1xuICB2YXIgc2VsZiA9IHRoaXNcbiAgLy8gRG9uJ3QgcmVzb2x2ZSBlcnJvciB2YWx1ZXMsIHByb3BhZ2F0ZSBkaXJlY3RseVxuICB0aGlzLnF1ZXVlID0gdGhpcy5xdWV1ZS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gc2VsZi5fZXJyb3JCb3VuZChlKVxuICB9KS5jYXRjaChmYXRhbClcbn1cblxuQXdhaXRTaW5rLnByb3RvdHlwZS5fZXZlbnQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICByZXR1cm4gcHJvbWlzZS50aGVuKHRoaXMuX2V2ZW50Qm91bmQpXG59XG5cbkF3YWl0U2luay5wcm90b3R5cGUuX2VuZCA9IGZ1bmN0aW9uICh4KSB7XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoeCkudGhlbih0aGlzLl9lbmRCb3VuZClcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvcHJvbWlzZXMuanNcbi8vIG1vZHVsZSBpZCA9IDgyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoYykgY29weXJpZ2h0IDIwMTAtMjAxNiBvcmlnaW5hbCBhdXRob3Igb3IgYXV0aG9ycyAqL1xuLyoqIEBhdXRob3IgQnJpYW4gQ2F2YWxpZXIgKi9cbi8qKiBAYXV0aG9yIEpvaG4gSGFubiAqL1xuXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL1N0cmVhbSdcbmltcG9ydCBTYWZlU2luayBmcm9tICcuLi9zaW5rL1NhZmVTaW5rJ1xuaW1wb3J0ICogYXMgZGlzcG9zZSBmcm9tICcuLi9kaXNwb3NhYmxlL2Rpc3Bvc2UnXG5pbXBvcnQgKiBhcyB0cnlFdmVudCBmcm9tICcuLi9zb3VyY2UvdHJ5RXZlbnQnXG5pbXBvcnQgUHJvcGFnYXRlVGFzayBmcm9tICcuLi9zY2hlZHVsZXIvUHJvcGFnYXRlVGFzaydcblxuLyoqXG4gKiBJZiBzdHJlYW0gZW5jb3VudGVycyBhbiBlcnJvciwgcmVjb3ZlciBhbmQgY29udGludWUgd2l0aCBpdGVtcyBmcm9tIHN0cmVhbVxuICogcmV0dXJuZWQgYnkgZi5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oZXJyb3I6Kik6U3RyZWFtfSBmIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYSBuZXcgc3RyZWFtXG4gKiBAcGFyYW0ge1N0cmVhbX0gc3RyZWFtXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBuZXcgc3RyZWFtIHdoaWNoIHdpbGwgcmVjb3ZlciBmcm9tIGFuIGVycm9yIGJ5IGNhbGxpbmcgZlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVjb3ZlcldpdGggKGYsIHN0cmVhbSkge1xuICByZXR1cm4gbmV3IFN0cmVhbShuZXcgUmVjb3ZlcldpdGgoZiwgc3RyZWFtLnNvdXJjZSkpXG59XG5cbmV4cG9ydCB2YXIgZmxhdE1hcEVycm9yID0gcmVjb3ZlcldpdGhcblxuLyoqXG4gKiBDcmVhdGUgYSBzdHJlYW0gY29udGFpbmluZyBvbmx5IGFuIGVycm9yXG4gKiBAcGFyYW0geyp9IGUgZXJyb3IgdmFsdWUsIHByZWZlcmFibHkgYW4gRXJyb3Igb3IgRXJyb3Igc3VidHlwZVxuICogQHJldHVybnMge1N0cmVhbX0gbmV3IHN0cmVhbSBjb250YWluaW5nIG9ubHkgYW4gZXJyb3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRocm93RXJyb3IgKGUpIHtcbiAgcmV0dXJuIG5ldyBTdHJlYW0obmV3IEVycm9yU291cmNlKGUpKVxufVxuXG5mdW5jdGlvbiBFcnJvclNvdXJjZSAoZSkge1xuICB0aGlzLnZhbHVlID0gZVxufVxuXG5FcnJvclNvdXJjZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gc2NoZWR1bGVyLmFzYXAobmV3IFByb3BhZ2F0ZVRhc2socnVuRXJyb3IsIHRoaXMudmFsdWUsIHNpbmspKVxufVxuXG5mdW5jdGlvbiBydW5FcnJvciAodCwgZSwgc2luaykge1xuICBzaW5rLmVycm9yKHQsIGUpXG59XG5cbmZ1bmN0aW9uIFJlY292ZXJXaXRoIChmLCBzb3VyY2UpIHtcbiAgdGhpcy5mID0gZlxuICB0aGlzLnNvdXJjZSA9IHNvdXJjZVxufVxuXG5SZWNvdmVyV2l0aC5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHNpbmssIHNjaGVkdWxlcikge1xuICByZXR1cm4gbmV3IFJlY292ZXJXaXRoU2luayh0aGlzLmYsIHRoaXMuc291cmNlLCBzaW5rLCBzY2hlZHVsZXIpXG59XG5cbmZ1bmN0aW9uIFJlY292ZXJXaXRoU2luayAoZiwgc291cmNlLCBzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdGhpcy5mID0gZlxuICB0aGlzLnNpbmsgPSBuZXcgU2FmZVNpbmsoc2luaylcbiAgdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXJcbiAgdGhpcy5kaXNwb3NhYmxlID0gc291cmNlLnJ1bih0aGlzLCBzY2hlZHVsZXIpXG59XG5cblJlY292ZXJXaXRoU2luay5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbiAodCwgeCkge1xuICB0cnlFdmVudC50cnlFdmVudCh0LCB4LCB0aGlzLnNpbmspXG59XG5cblJlY292ZXJXaXRoU2luay5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgdHJ5RXZlbnQudHJ5RW5kKHQsIHgsIHRoaXMuc2luaylcbn1cblxuUmVjb3ZlcldpdGhTaW5rLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uICh0LCBlKSB7XG4gIHZhciBuZXh0U2luayA9IHRoaXMuc2luay5kaXNhYmxlKClcblxuICBkaXNwb3NlLnRyeURpc3Bvc2UodCwgdGhpcy5kaXNwb3NhYmxlLCB0aGlzLnNpbmspXG4gIHRoaXMuX3N0YXJ0TmV4dCh0LCBlLCBuZXh0U2luaylcbn1cblxuUmVjb3ZlcldpdGhTaW5rLnByb3RvdHlwZS5fc3RhcnROZXh0ID0gZnVuY3Rpb24gKHQsIHgsIHNpbmspIHtcbiAgdHJ5IHtcbiAgICB0aGlzLmRpc3Bvc2FibGUgPSB0aGlzLl9jb250aW51ZSh0aGlzLmYsIHgsIHNpbmspXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBzaW5rLmVycm9yKHQsIGUpXG4gIH1cbn1cblxuUmVjb3ZlcldpdGhTaW5rLnByb3RvdHlwZS5fY29udGludWUgPSBmdW5jdGlvbiAoZiwgeCwgc2luaykge1xuICB2YXIgc3RyZWFtID0gZih4KVxuICByZXR1cm4gc3RyZWFtLnNvdXJjZS5ydW4oc2luaywgdGhpcy5zY2hlZHVsZXIpXG59XG5cblJlY292ZXJXaXRoU2luay5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuZGlzcG9zYWJsZS5kaXNwb3NlKClcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL2NvbWJpbmF0b3IvZXJyb3JzLmpzXG4vLyBtb2R1bGUgaWQgPSA4M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKGMpIGNvcHlyaWdodCAyMDEwLTIwMTYgb3JpZ2luYWwgYXV0aG9yIG9yIGF1dGhvcnMgKi9cbi8qKiBAYXV0aG9yIEJyaWFuIENhdmFsaWVyICovXG4vKiogQGF1dGhvciBKb2huIEhhbm4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2FmZVNpbmsgKHNpbmspIHtcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLmFjdGl2ZSA9IHRydWVcbn1cblxuU2FmZVNpbmsucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgaWYgKCF0aGlzLmFjdGl2ZSkge1xuICAgIHJldHVyblxuICB9XG4gIHRoaXMuc2luay5ldmVudCh0LCB4KVxufVxuXG5TYWZlU2luay5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKHQsIHgpIHtcbiAgaWYgKCF0aGlzLmFjdGl2ZSkge1xuICAgIHJldHVyblxuICB9XG4gIHRoaXMuZGlzYWJsZSgpXG4gIHRoaXMuc2luay5lbmQodCwgeClcbn1cblxuU2FmZVNpbmsucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKHQsIGUpIHtcbiAgdGhpcy5kaXNhYmxlKClcbiAgdGhpcy5zaW5rLmVycm9yKHQsIGUpXG59XG5cblNhZmVTaW5rLnByb3RvdHlwZS5kaXNhYmxlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmFjdGl2ZSA9IGZhbHNlXG4gIHJldHVybiB0aGlzLnNpbmtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vc3Qvc3JjL3NpbmsvU2FmZVNpbmsuanNcbi8vIG1vZHVsZSBpZCA9IDg0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGFwcGVuZCwgcmVtb3ZlLCBmaW5kSW5kZXggfSBmcm9tICdAbW9zdC9wcmVsdWRlJztcblxudmFyIE11bHRpY2FzdERpc3Bvc2FibGUgPSBmdW5jdGlvbiBNdWx0aWNhc3REaXNwb3NhYmxlIChzb3VyY2UsIHNpbmspIHtcbiAgdGhpcy5zb3VyY2UgPSBzb3VyY2VcbiAgdGhpcy5zaW5rID0gc2lua1xuICB0aGlzLmRpc3Bvc2VkID0gZmFsc2Vcbn07XG5cbk11bHRpY2FzdERpc3Bvc2FibGUucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiBkaXNwb3NlICgpIHtcbiAgaWYgKHRoaXMuZGlzcG9zZWQpIHtcbiAgICByZXR1cm5cbiAgfVxuICB0aGlzLmRpc3Bvc2VkID0gdHJ1ZVxuICB2YXIgcmVtYWluaW5nID0gdGhpcy5zb3VyY2UucmVtb3ZlKHRoaXMuc2luaylcbiAgcmV0dXJuIHJlbWFpbmluZyA9PT0gMCAmJiB0aGlzLnNvdXJjZS5fZGlzcG9zZSgpXG59O1xuXG5mdW5jdGlvbiB0cnlFdmVudCAodCwgeCwgc2luaykge1xuICB0cnkge1xuICAgIHNpbmsuZXZlbnQodCwgeClcbiAgfSBjYXRjaCAoZSkge1xuICAgIHNpbmsuZXJyb3IodCwgZSlcbiAgfVxufVxuXG5mdW5jdGlvbiB0cnlFbmQgKHQsIHgsIHNpbmspIHtcbiAgdHJ5IHtcbiAgICBzaW5rLmVuZCh0LCB4KVxuICB9IGNhdGNoIChlKSB7XG4gICAgc2luay5lcnJvcih0LCBlKVxuICB9XG59XG5cbnZhciBkaXNwb3NlID0gZnVuY3Rpb24gKGRpc3Bvc2FibGUpIHsgcmV0dXJuIGRpc3Bvc2FibGUuZGlzcG9zZSgpOyB9XG5cbnZhciBlbXB0eURpc3Bvc2FibGUgPSB7XG4gIGRpc3Bvc2U6IGZ1bmN0aW9uIGRpc3Bvc2UkMSAoKSB7fVxufVxuXG52YXIgTXVsdGljYXN0U291cmNlID0gZnVuY3Rpb24gTXVsdGljYXN0U291cmNlIChzb3VyY2UpIHtcbiAgdGhpcy5zb3VyY2UgPSBzb3VyY2VcbiAgdGhpcy5zaW5rcyA9IFtdXG4gIHRoaXMuX2Rpc3Bvc2FibGUgPSBlbXB0eURpc3Bvc2FibGVcbn07XG5cbk11bHRpY2FzdFNvdXJjZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gcnVuIChzaW5rLCBzY2hlZHVsZXIpIHtcbiAgdmFyIG4gPSB0aGlzLmFkZChzaW5rKVxuICBpZiAobiA9PT0gMSkge1xuICAgIHRoaXMuX2Rpc3Bvc2FibGUgPSB0aGlzLnNvdXJjZS5ydW4odGhpcywgc2NoZWR1bGVyKVxuICB9XG4gIHJldHVybiBuZXcgTXVsdGljYXN0RGlzcG9zYWJsZSh0aGlzLCBzaW5rKVxufTtcblxuTXVsdGljYXN0U291cmNlLnByb3RvdHlwZS5fZGlzcG9zZSA9IGZ1bmN0aW9uIF9kaXNwb3NlICgpIHtcbiAgdmFyIGRpc3Bvc2FibGUgPSB0aGlzLl9kaXNwb3NhYmxlXG4gIHRoaXMuX2Rpc3Bvc2FibGUgPSBlbXB0eURpc3Bvc2FibGVcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkaXNwb3NhYmxlKS50aGVuKGRpc3Bvc2UpXG59O1xuXG5NdWx0aWNhc3RTb3VyY2UucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZCAoc2luaykge1xuICB0aGlzLnNpbmtzID0gYXBwZW5kKHNpbmssIHRoaXMuc2lua3MpXG4gIHJldHVybiB0aGlzLnNpbmtzLmxlbmd0aFxufTtcblxuTXVsdGljYXN0U291cmNlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUkMSAoc2luaykge1xuICB2YXIgaSA9IGZpbmRJbmRleChzaW5rLCB0aGlzLnNpbmtzKVxuICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICBpZiAoaSA+PSAwKSB7XG4gICAgdGhpcy5zaW5rcyA9IHJlbW92ZShpLCB0aGlzLnNpbmtzKVxuICB9XG5cbiAgcmV0dXJuIHRoaXMuc2lua3MubGVuZ3RoXG59O1xuXG5NdWx0aWNhc3RTb3VyY2UucHJvdG90eXBlLmV2ZW50ID0gZnVuY3Rpb24gZXZlbnQgKHRpbWUsIHZhbHVlKSB7XG4gIHZhciBzID0gdGhpcy5zaW5rc1xuICBpZiAocy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gc1swXS5ldmVudCh0aW1lLCB2YWx1ZSlcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHMubGVuZ3RoOyArK2kpIHtcbiAgICB0cnlFdmVudCh0aW1lLCB2YWx1ZSwgc1tpXSlcbiAgfVxufTtcblxuTXVsdGljYXN0U291cmNlLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiBlbmQgKHRpbWUsIHZhbHVlKSB7XG4gIHZhciBzID0gdGhpcy5zaW5rc1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHMubGVuZ3RoOyArK2kpIHtcbiAgICB0cnlFbmQodGltZSwgdmFsdWUsIHNbaV0pXG4gIH1cbn07XG5cbk11bHRpY2FzdFNvdXJjZS5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiBlcnJvciAodGltZSwgZXJyKSB7XG4gIHZhciBzID0gdGhpcy5zaW5rc1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHMubGVuZ3RoOyArK2kpIHtcbiAgICBzW2ldLmVycm9yKHRpbWUsIGVycilcbiAgfVxufTtcblxuZnVuY3Rpb24gbXVsdGljYXN0IChzdHJlYW0pIHtcbiAgdmFyIHNvdXJjZSA9IHN0cmVhbS5zb3VyY2VcbiAgcmV0dXJuIHNvdXJjZSBpbnN0YW5jZW9mIE11bHRpY2FzdFNvdXJjZVxuICAgID8gc3RyZWFtXG4gICAgOiBuZXcgc3RyZWFtLmNvbnN0cnVjdG9yKG5ldyBNdWx0aWNhc3RTb3VyY2Uoc291cmNlKSlcbn1cblxuZXhwb3J0IHsgTXVsdGljYXN0U291cmNlIH07ZXhwb3J0IGRlZmF1bHQgbXVsdGljYXN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bXVsdGljYXN0LmVzLmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQG1vc3QvbXVsdGljYXN0L2Rpc3QvbXVsdGljYXN0LmVzLmpzXG4vLyBtb2R1bGUgaWQgPSA4NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9