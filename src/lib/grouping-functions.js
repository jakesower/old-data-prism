const R = require('ramda');

const {$, def, $Dataset, $Grouping} = require('./sanctuary-types');
const DSF = require('./dataset-functions');
const AGGREGATORS = require('./aggregators');


const applyAggregator = R.curry((group, aggregator) => {
  return AGGREGATORS[aggregator.func].fn(group, aggregator.args).toString();
});

/**
 * Apply a grouping and a set of aggregators to a dataset. This transforms the
 * dataset into a completely new one. Each group will be reduced to a single
 * record in the new dataset.
 *
 * Dataset -> Grouping -> (String, Array Records) -> Dataset
 */
const applyAggregators = R.curry((dataset, grouping, groups) => {
  const aggregators = grouping.aggregators;

  const headers = R.concat(
    R.map(n => DSF.columns(dataset)[n].header, grouping.columns),
    R.map(a => 'Hi', grouping.aggregators)
  );

  const records = R.map(group => {
    return R.concat(
      JSON.parse(group[0]),
      R.map(applyAggregator(group[1]), grouping.aggregators)
    )
  }, groups);

  return { headers, records };
});


const group = columns => R.groupBy(
  R.pipe(
    row => R.map(c => row[c], columns),
    JSON.stringify
  )
);


const applyOperation = R.curry((dataset, grouping) => {
  return R.pipe(
    R.prop('records'),
    group(grouping.columns),
    R.toPairs,
    applyAggregators(dataset, grouping)
  )(dataset);
});


module.exports = {
  applyOperation
};
