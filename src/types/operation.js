const R = require('ramda');
const daggy = require('daggy');

const DSF = require('../lib/dataset-functions');
const {populateSlots} = require('../lib/operation-utils');


const Operation = daggy.taggedSum('Operation', {
  Empty: [],
  Filter: ['definition', 'inputs'],
  Deriver: ['definition', 'inputs'],
  Grouping: ['inputs'],
  Aggregation: ['definition', 'inputs'],
});

const {Filter, Deriver, Grouping} = Operation;

Operation.prototype.applyInvalid = function (dataset) {
  return this.cata({
    Empty: () => dataset,
    Filter: () => dataset,
    Deriver: () => dataset,
    Grouping: () => dataset,
    Aggregation: () => dataset,
  })
}

// Operation ~> Dataset -> StrMap -> Dataset
Operation.prototype.apply = function (dataset) {
  const base = (definition, inputs) => {
    const popInputs = populateSlots(definition, inputs, dataset);
    return definition.fn(dataset, popInputs);
  }

  return this.cata({
    Empty: () => dataset,
    Filter: base,
    Deriver: base,
    Grouping: (inputs) => applyGrouping(dataset, inputs),
    Aggregation: () => {throw("x_x I shouldn't be here since I return a value and not a dataset!")}
  });
}

Operation.prototype.valid = function (dataset) {
  const nonGrouping = ({slots}, inputs) => {
    return R.all(s => slotValid(dataset, inputs, s), slots);
  }

  return this.cata({
    Empty: () => false,
    Filter: nonGrouping,
    Deriver: nonGrouping,
    Aggregator: nonGrouping,
    Grouping: (inputs) =>
      inputs.columns.length > 0 &&
      R.all(a => a.valid(dataset, inputs), inputs.aggregators)
  })
}



function applyGrouping(dataset, {columns, aggregators}) {
  const applyAggregators = groups => {
    const applyAggregator = R.curry((dataset, aggregator) => {
      const inputs = populateSlots(aggregator.definition, aggregator.inputs, dataset);
      return aggregator.definition.fn(dataset, inputs);
    });

    const headers = R.concat(
      R.map(n => DSF.columns(dataset)[n].header, columns),
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

    return { headers, records };
  }

  return R.pipe(
    R.prop('records'),
    R.groupBy(row => JSON.stringify(R.map(c => row[c], columns))),
    R.toPairs,
    applyAggregators
  )(dataset);
}


function slotValid(dataset, inputs, slot) {
  const columnValid = (dataset, inputs, slot) => {
    const slotInput = DSF.columns(dataset)[inputs[slot.key]];
    return slotInput && validColumn(slot.dataType, slotInput);
  }

  const multicolumnValid = (dataset, inputs, slot) => {
    const slotInputs = R.map(R.prop(R.__, DSF.columns(dataset)), inputs[slot.key]);
    return slotInputs && R.all(validColumn(slot.dataType), slotInputs);
  }

  const userValid = (inputs, slot) =>
    slot.dataType.test(inputs[slot.key]);

  return (
    slot.sourceType === "column"      ? columnValid(dataset, inputs, slot) :
    slot.sourceType === "multicolumn" ? multicolumnValid(dataset, inputs, slot) :
                        /* user */      userValid(inputs, slot)
  );
}



module.exports = Operation;
