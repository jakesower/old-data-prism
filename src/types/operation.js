const R = require('ramda');
const daggy = require('daggy');

const deriverPool = require('../definitions/derivers');
const filterPool = require('../definitions/filters');
const aggregatorPool = require('../definitions/aggregators');

const Dataset = require('./dataset');


const Operation = daggy.taggedSum('Operation', {
  Empty: [],
  Filter: ['definition', 'inputs'],
  Deriver: ['definition', 'inputs', 'columnName'],
  Grouping: ['columns', 'aggregators'],
  Aggregator: ['definition', 'inputs', 'columnName'],
  Columns: ['columns'],
});

const {Empty, Filter, Deriver, Grouping, Columns} = Operation;


// String -> String -> StrMap
Operation.lookup = (type, key) =>{
  const pools = {Filter: filterPool, Deriver: deriverPool, Aggregator: aggregatorPool};
  return R.path([type, key], pools);
}


// StrMap -> Operation
// Takes the raw UI stuff and turns it into an Operation
Operation.fromDefinition = ({definitionKey, inputs, columnName, type, aggregators, columns}) => {
  return type === 'Grouping' ?
    Grouping(columns, R.map(a => Operation.fromDefinition(a), aggregators)) :
    type === 'Columns' ?
      Columns(inputs.columns) :
      R.isNil(definitionKey) ?
        Empty(inputs) :
        type === 'Filter' ?
          Filter(Operation.lookup('Filter', definitionKey), inputs) :
          Operation[type](Operation.lookup(type, definitionKey), inputs, inputs.columnName);
}

// Operation ~> Dataset -> Dataset
Operation.prototype.applyInvalid = function (dataset) {
  return this.cata({
    Empty: () => dataset,
    Filter: () => dataset,
    Deriver: () => dataset,
    Grouping: () => dataset,
    Aggregator: () => dataset,
    Columns: () => dataset,
  })
}


// Operation ~> Dataset -> Dataset
Operation.prototype.apply = function (dataset) {
  const base = (definition, inputs, columnName) => {
    const popInputs = this.populateSlots(dataset);
    return definition.fn(dataset, popInputs, columnName);
  }

  return this.cata({
    Empty: () => dataset,
    Filter: R.binary(base), // filters don't have names
    Deriver: base,
    Grouping: (columns, aggregators) => applyGrouping(dataset, columns, aggregators),
    Columns: columns => {
      const nths = row => R.map(n => row[n], columns);
      return Dataset(
        nths(dataset.headers),
        R.map(nths, dataset.records)
      );
    },
    Aggregator: () => {throw("x_x I shouldn't be here since I return a value and not a dataset!")}
  });
}


// Operation ~> Dataset -> Boolean
Operation.prototype.valid = function (dataset) {
  const nonGrouping = ({slots}, inputs) => {
    return R.all(s => s.valid(dataset, inputs), slots);
  }

  return this.cata({
    Empty: () => false,
    Filter: nonGrouping,
    Deriver: nonGrouping,
    Aggregator: nonGrouping,
    Grouping: (columns, aggregators) =>
      columns.length > 0 &&
      R.all(a => a.valid(dataset), aggregators),
    Columns: columns => R.length(columns) > 0
  })
}


// Operation ~> Dataset -> StrMap
Operation.prototype.populateSlots = function (dataset) {
  const base = ({slots}, inputs) => {
    return R.pipe(
      R.map(s => s.populate(dataset, inputs)),
      R.mergeAll
    )(slots);
  }

  return this.cata({
    Empty: () => ({}),
    Filter: base,
    Deriver: base,
    Aggregator: base,
    Grouping: (_, aggregators) => R.map(a => a.populateSlots(dataset), aggregators),
    Columns: () => ({})
  })
}



// TODO: refactor me plz
function applyGrouping(dataset, columns, aggregators) {
  const applyAggregators = groups => {
    const applyAggregator = R.curry((dataset, aggregator) => {
      const inputs = aggregator.populateSlots(dataset);
      return aggregator.definition.fn(dataset, inputs).toString();
    });

    const headers = R.concat(
      R.map(n => dataset.columns()[n].header, columns),
      R.map(R.prop('columnName'), aggregators)
    );

    const records = R.map(group => {
      return R.concat(
        JSON.parse(group[0]),
        R.map(applyAggregator({
          headers: dataset.headers,
          records: group[1]
        }), aggregators)
      )
    }, groups);

    return Dataset(headers, records);
  }

  return R.pipe(
    R.prop('records'),
    R.groupBy(row => JSON.stringify(R.map(c => row[c], columns))),
    R.toPairs,
    applyAggregators
  )(dataset);
}


module.exports = Operation;
