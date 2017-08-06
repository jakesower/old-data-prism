import R from 'ramda';
import S from 'sanctuary';

import * as DF from './deriver-functions';
import * as FF from './filter-functions';
import * as GF from './grouping-functions';

const opHandlers = {
  Filter: FF.applyOperation,
  Deriver: DF.applyOperation,
  Grouping: GF.applyOperation
}


const applyOperation = (dataset, operation) => {
  return operation.enabled ?
    opHandlers[operation.type](dataset, operation) :
    dataset;
}

/**
 * Apply a sequence of operations to the dataset. In many ways, this is the
 * beating heart of the entire system.
 *
 * Dataset -> List (Dataset -> Dataset) -> Dataset
 */
 // const applyOperations = R.reduce(S.T);
const applyOperations = R.reduce(applyOperation);


export {
  applyOperation,
  applyOperations
};
