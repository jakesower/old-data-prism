import xs, { Stream } from "xstream";
import { zipObj } from './utils';
import { sampleWith } from './streams/sample-with';

export function objectStream(obj: {[k: string]: Stream<any>}): Stream<object> {
  const [keys, vals] = [Object.keys(obj), Object.values(obj)];
  return xs.combine(...vals).map(args => zipObj(keys, args));
}

export { sampleWith };
