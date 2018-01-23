import { over, lensProp } from 'ramda';

export const toggle = (prop: string) =>
  () => (model: any) => model[prop] = !model[prop];

export const assoc = (prop: string) =>
  (val: any) => (model: any) => model[prop] = val;

// export const lensAction = (prop: string) =>
//   (obj: any) => (model: any) => over(lensProp(prop), )
