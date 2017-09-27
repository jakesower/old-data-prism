const R = require('ramda');
const assert = require('chai').assert;

const {Dataset, Operation, Slot, DataType, Column} = require('../../src/types');
const filterPool = require('../../src/definitions/filters');
const aggregatorPool = require('../../src/definitions/aggregators');

const empty = Operation.Empty({});

const sumDef = {
  name: "Sum",
  slots: [Slot.Multicolumn('addends', 'Addends', DataType.FiniteNumber)],
  display: () => "",
  fn: (dataset, inputs, columnName) => {
    const sum = R.reduce(R.add, 0);
    return dataset.appendColumn(Column(
      columnName,
      R.map(sum, inputs.addends)
    ));
  }
};

const sum = Operation.Deriver(sumDef, {addends: [2, 3]}, "Total Goals");

const colombia = Dataset(
  ['Date', 'Opponent', 'Goals For', 'Goals Against'],
  [ ['2014-06-14', 'Greece',      '3', '0'],
    ['2014-06-19', 'Ivory Coast', '2', '1'],
    ['2014-06-24', 'Japan',       '4', '1'],
    ['2014-06-28', 'Uruguay',     '2', '0'],
    ['2014-07-04', 'Brazil',      '1', '2']
  ]
);

describe ('operation type', function() {
  it ('applies functions to a dataset', function() {
    const appliedEmpty = empty.apply(colombia);
    assert.deepEqual(colombia, appliedEmpty);

    const appliedSum = sum.apply(colombia);
    assert.deepEqual(appliedSum.records[2], ['2014-06-24', 'Japan', '4', '1', '5']);
  });

  it ('looks up keys', function () {
    const found = Operation.lookup('Filter', 'Equality');
    assert.deepEqual(found, filterPool.Equality);
  });

  it ('constructs filter operations from definitions', function () {
    const op = Operation.fromDefinition({
      type: 'Filter',
      definitionKey: 'Equality',
      inputs: {a: 1, b: "Something"},
    });

    assert.deepEqual(op, Operation.Filter(filterPool.Equality, {a: 1, b: "Something"}));
  });

  it ('creates a grouping from its definition', function () {
    const op = Operation.fromDefinition({
      type: 'Grouping',
      columns: [3],
      aggregators: [],
      uid: 1,
      active: null
    });

    assert.deepEqual(op, Operation.Grouping(
      [3],
      []
    ))
  });

  it ('applies grouping functions to a dataset', function () {
    const op = Operation.fromDefinition({
      type: 'Grouping',
      columns: [3],
      aggregators: []
    });

    const ns = op.apply(colombia);

    assert.deepEqual(ns, Dataset(
      ['Goals Against'],
      [['0'], ['1'], ['2']]
    ))
  });

  it ('applies grouping functions with aggregators to a dataset', function () {
    const op = Operation.fromDefinition({
      type: 'Grouping',
      columns: [3],
      aggregators: [{
        type: 'Aggregator',
        definitionKey: 'Count',
        inputs: {columnName: 'Count'},
        id: 1
      }]
    });

    const ns = op.apply(colombia);

    assert.deepEqual(ns, Dataset(
      ['Goals Against', 'Count'],
      [['0', '2'], ['1', '2'], ['2', '1']]
    ))
  });

  it ('applies a column function to a dataset', function () {
    const op = Operation.fromDefinition({
      type: 'Columns',
      inputs: {columns: [0, 1]}
    });

    const ns = op.apply(colombia);

    assert.deepEqual(ns, Dataset(
      ['Date', 'Opponent'],
      [ ['2014-06-14', 'Greece'],
        ['2014-06-19', 'Ivory Coast'],
        ['2014-06-24', 'Japan'],
        ['2014-06-28', 'Uruguay'],
        ['2014-07-04', 'Brazil']
      ]
    ))
  })

});
