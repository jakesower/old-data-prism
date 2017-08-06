import Type from 'union-type';

import * as DF from './deriver-functions';
import * as FF from './filter-functions';

const Operation = Type({
  Filter(Object),
  Deriver(Object)
});

const Operation.caseOn({
  Filter: f => DF.apply(f.)
})
