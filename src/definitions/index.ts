import { mergeAll } from 'ramda';

// const filters = require('./filters');
import derivers from './derivers';
import custom from './custom';
import groupings from './groupings';
import joins from './joins';

export default mergeAll([
  derivers,
  custom,
  groupings,
  joins,
]);
