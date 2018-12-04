/************************************************************************
 * NOTE: Aggregators are not proper operations and are not exported here.
 */

import * as derivers from './derivers';
import * as groupings from './groupings';
import * as misc from './misc';
import { SlotOperation } from '../components/collectors/slot-collector';
import { GroupOperation } from '../components/collectors/group-collector';
import { ColumnOperation } from '../components/collectors/column-collector';

export type OperationType = SlotOperation | GroupOperation | ColumnOperation;

const operations: {[k: string]: OperationType} = Object.assign({}, derivers, groupings, misc);
export default operations;
