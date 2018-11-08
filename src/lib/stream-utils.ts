import xs, { Stream, MemoryStream, Operator, InternalListener } from "xstream";
import { zipObj } from './utils';

const NO = {};
function noop() {}
const NO_IL: InternalListener<any> = {
  _n: noop,
  _c: noop,
  _e: noop,
}


class FlatWithMemoryListener<T> implements InternalListener<T> {
  private out: MemoryStream<T>;
  private op: FlatWithMemory<T>;

  constructor(out: MemoryStream<T>, op: FlatWithMemory<T>) {
    this.out = out;
    this.op = op;
  }

  _n(t: T) {
    this.out._n(t);
  }

  _e(err: any) {
    this.out._e(err);
  }

  _c() {
    this.op.inner = NO as MemoryStream<T>;
    this.op.less();
  }
}


class FlatWithMemory<T> implements Operator<Stream<T>, T> {
  public type ='flatWithMemory';
  public ins: Stream<MemoryStream<T>>;
  public out: MemoryStream<T>;
  private open: boolean;
  public inner: MemoryStream<T>;
  private il: InternalListener<T>;
  private _v: T;
  private _has: boolean = false;

  constructor(ins: Stream<MemoryStream<T>>) {
    this.ins = ins;
    this.out = NO as MemoryStream<T>;
    this.open = true;
    this.inner = NO as MemoryStream<T>;
    this.il = NO_IL;
  }

  _start(out: MemoryStream<T>) {
    this.out = out;
    this.open = true;
    this.inner = NO as MemoryStream<T>;
    this.il = NO_IL;
    this.ins._add(this);
  }

  _stop(): void {
    this.ins._remove(this);
    if (this.inner !== NO) this.inner._remove(this.il);
    this.out = NO as MemoryStream<T>;
    this.open = true;
    this.inner = NO as MemoryStream<T>;
    this.il = NO_IL;
  }

  less(): void {
    const u = this.out;
    if (u === NO) return;
    if (!this.open && this.inner === NO) u._c();
  }

  _n(s: MemoryStream<T>) {
    const u = this.out;
    if (u === NO) return;
    const { inner, il } = this;
    if (inner !== NO && il !== NO_IL) inner._remove(il);
    (this.inner = s)._add(this.il = new FlatWithMemoryListener(u, this));
  }

  _e(err: any) {
    const u = this.out;
    if (u === NO) return;
    u._e(err);
  }

  _c() {
    this.open = false;
    this.less();
  }
}


export function flattenWithMemory(stream: Stream<MemoryStream<any>>): MemoryStream<any> {
  return new FlatWithMemory(stream);
}


export function objectStream(obj: {[k: string]: Stream<any>}): Stream<object> {
  const [keys, vals] = [Object.keys(obj), Object.values(obj)];
  return xs.combine(...vals).map(args => zipObj(keys, args));
}
