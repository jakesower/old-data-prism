import R from 'ramda';

import {$, def, $Deriver, $Dataset} from './sanctuary-types'
import * as DSF from './dataset-functions';
import * as DERIVERS from '../definitions/derivers';
import { populateSlots } from './operation-utils';

/**
 * Apply a deriver across the dataset. Each deriver receives arguments of two
 * types: columns and operands. Columns are indicated by the index of the
 * column in the records. Operands are provided by the user. A new dataset with
 * the derived column will be returned.
 *
 * Filter -> StrMap Integer/String -> Dataset -> Dataset
 */
const apply = def('apply', {},
  [$Deriver, $.StrMap($.Any), $Dataset, $Dataset],
  (deriver, inputs, dataset) => {
    return DSF.appendColumn(dataset, {
      header: `${inputs.colName}`,
      values: deriver
        .fn(populateSlots(deriver, inputs, dataset))
        .map(x => x.toString())
    })
  }
);


const applyOperation = R.curry((dataset, deriver) => {
  return apply(DERIVERS[deriver.func], deriver.inputs, dataset);
});


export {
  apply,
  applyOperation
};
