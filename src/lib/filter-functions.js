import R from 'ramda';

import {$, def, $Filter, $Dataset} from './sanctuary-types'
import * as DF from './dataset-functions';
import * as FILTERS from '../definitions/filters';


/**
 * Apply a filter across the dataset. Each filter receives arguments of two
 * types: columns and operands. Columns are indicated by the index of the
 * column in the records. Operands are provided by the user.
 */
const apply = def('apply', {},
  [$Filter, $.StrMap($.Any), $Dataset, $Dataset],
  (filter, inputs, dataset) => {
    return {
      headers: dataset.headers,
      records: filter.fn(inputs, dataset.records)
    }
  }
);


const applyOperation = R.curry((dataset, filter) => {
  return apply(FILTERS[filter.func], filter.inputs, dataset);
});


export {
  apply,
  applyOperation
};
