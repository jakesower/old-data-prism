/************************************************************************
 * NOTE: Aggregators are not proper operations and are not exported here.
 */

import * as derivers from './derivers';
import * as groupings from './groupings';
import { SlotOperation } from '../components/collectors/slot-collector';
import { GroupOperation } from '../components/collectors/group-collector';

export type OperationType = SlotOperation | GroupOperation;

const operations: {[k: string]: OperationType} = Object.assign({}, derivers, groupings);
export default operations;
