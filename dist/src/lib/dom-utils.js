"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@cycle/dom");
const xstream_1 = require("xstream");
function indexedOptions(opts, selVal) {
    const blank = dom_1.option({ attrs: { value: "" } }, "");
    const vdom = opts.map((opt, idx) => dom_1.option({ attrs: { value: idx, selected: idx === selVal } }, opt));
    return [blank].concat(vdom);
}
exports.indexedOptions = indexedOptions;
function path(domElement) {
    let out = [];
    let elt = domElement;
    while (elt) {
        out[out.length] = elt;
        elt = elt.parentNode;
    }
    return out;
}
exports.path = path;
function optionsList(opts) {
    return opts.map(opt => dom_1.option({ attrs: { value: opt } }, opt));
}
exports.optionsList = optionsList;
function scopedEvent(DOM, eventType) {
    const scopes = DOM.namespace.filter(s => s.type === 'selector').map(n => n.scope);
    const match = elt => scopes.some(s => elt.matches(s));
    return DOM.events(eventType).map(ev => {
        return path(ev.target).find(match);
    });
}
exports.scopedEvent = scopedEvent;
function targetValue(ev) {
    return ev.target.value;
}
exports.targetValue = targetValue;
function extractFile(element$) {
    const loaded$ = xstream_1.default.create({
        start: () => { },
        stop: () => { }
    });
    element$.addListener({
        next: element => {
            var file = (element.files || [])[0];
            var fileName = file.name.replace(/\.csv$/, '').replace(/_/g, ' ');
            var r = new FileReader();
            r.onload = function () {
                loaded$.shamefullySendNext({
                    body: this.result,
                    name: fileName,
                });
            };
            r.readAsText(file);
        },
    });
    return loaded$;
}
exports.extractFile = extractFile;
;
