const R = require('ramda');
const h = require('snabbdom/h').default;

const Dataset = require('../types/dataset');
const Column = require('../types/column');

const GroupCollector = require('../components/collectors/group-collector');

const mapIndexed = R.addIndex(R.map);

const Grouping = {
  name: "Grouping",
  tags: ["grouping"],
  display: "Grouping",
  help: "Well hai",

  valid: ({dataset}, inputs) => {
    const colsValid = R.length(inputs.columns) > 0;
    const aggsValid = R.all(inputs.aggregators.valid(dataset));

    return colsValid && aggsValid;
  },

  fn: ({dataset}, inputs) => {
    const {columns, aggregators} = inputs;

    const headers = R.map(R.nth(R.__, dataset.headers), columns);
    const groups = R.pipe(
      R.groupBy(record => JSON.stringify(R.map(R.nth(R.__, record), columns))),
      R.toPairs
    )(dataset.records);

    const groupingCols = R.pipe(
      R.nth(0),
      JSON.parse,
      mapIndexed((vals, i) => Column.autoSchema(headers[i], vals))
    )

    const groupedRows = R.map(agg =>
      R.map(group => agg.fn(group[1])), // returns a list of Columns
      aggregators
    );

    return Dataset(R.concat(groupingCols, groupedRows));
  },

  collector: GroupCollector,
}

const BucketGrouper = {

}


module.exports = {
  Grouping
};
