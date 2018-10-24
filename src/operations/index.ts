import * as derivers from './derivers';
import { Operation } from '../types';

const operations: {[k in string]: Operation} = Object.assign({}, derivers);
export default operations;
