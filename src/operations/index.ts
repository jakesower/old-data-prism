/************************************************************************
 * NOTE: Aggregators are not proper operations and are not exported here.
 */

import * as derivers from './derivers';
import * as groupings from './groupings';
import * as misc from './misc';
import * as joins from './joins';
import { SlotOperation } from '../components/collectors/slot-collector';
import { GroupOperation } from '../components/collectors/group-collector';
import { ColumnOperation } from '../components/collectors/column-collector';
import { JoinOperation } from '../components/collectors/join-collector';

export type OperationType = SlotOperation | GroupOperation | ColumnOperation | JoinOperation;

const operations: {[k: string]: OperationType} = Object.assign({}, derivers, groupings, misc, joins);
export default operations;
