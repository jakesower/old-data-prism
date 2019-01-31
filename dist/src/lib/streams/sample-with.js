"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xstream_1 = require("xstream");
const NO = {};
class SampleWithListener {
    constructor(p) {
        this.p = p;
        p.il = this;
    }
    _n(t) {
        const p = this.p;
        if (p.out === NO)
            return;
        p.up(t);
    }
    _e(err) {
        this.p._e(err);
    }
    _c() {
        this.p.down(this);
    }
}
class SampleWithOperator {
    constructor(signal, stream) {
        this.type = 'sampleWith';
        this.signal = signal;
        this.stream = stream;
    }
    _start(out) {
        this.out = out;
        this.signal._add(new SampleWithListener(this));
        this.stream._add(this);
    }
    _stop() {
        this.out = NO;
    }
    _n(_) {
        const u = this.out;
        if (u === NO)
            return;
        u._n(this.val);
    }
    _e(err) {
        const out = this.out;
        if (out === NO)
            return;
        out._e(err);
    }
    _c() {
        const out = this.out;
        if (out === NO)
            return;
        out._c();
    }
    up(t) {
        this.val = t;
    }
    down(l) {
        this.signal._remove(l);
    }
}
function sampleWith(stream) {
    return function (signal) {
        return new xstream_1.Stream(new SampleWithOperator(signal, stream));
    };
}
exports.sampleWith = sampleWith;
