import {InternalListener, Operator, Stream, MemoryStream} from 'xstream';

const NO = {};

class SampleWithListener<T> {
  constructor(private p: SampleWithOperator<T>) {
    p.il = this;
  }

  _n(t: T): void {
    const p = this.p;
    if (p.out === NO) return;
    p.up(t);
  }

  _e(err: any): void {
    this.p._e(err);
  }

  _c(): void {
    this.p.down(this);
  }
}

class SampleWithOperator<T> {
  public type = 'sampleWith';
  private signal: MemoryStream<T>;
  private stream: Stream<any>;
  public out: Stream<T>;
  private val: T;
  public il: SampleWithListener<T>;

  constructor(signal: MemoryStream<T>, stream: Stream<any>) {
    this.signal = signal;
    this.stream = stream;
  }

  _start(out: Stream<T>): void {
    this.out = out;
    this.signal._add(new SampleWithListener<T>(this));
    this.stream._add(this);
  }

  _stop(): void {
    this.out = NO as Stream<T>;
  }

  _n(_) {
    const u = this.out;
    if (u === NO) return;
    u._n(this.val);
  }

  _e(err: any): void {
    const out = this.out;
    if (out === NO) return;
    out._e(err);
  }

  _c(): void {
    const out = this.out;
    if (out === NO) return;
    out._c();
  }

  up(t: T): void {
    this.val = t;
  }

  down(l: SampleWithListener<T>): void {
    this.signal._remove(l);
  }
}

export function sampleWith(stream: Stream<any>) {
  return function <T>(signal: MemoryStream<T>) {
    return new Stream<T>(new SampleWithOperator(signal, stream));
  }
}
