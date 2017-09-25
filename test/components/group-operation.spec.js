const R = require('ramda');
const stream = require('flyd').stream;

const assert = require('chai').assert;

const OperationComponent = require('../../src/components/operation');
const GroupOperationComponent = require('../../src/components/group-operation');
const {DataTypes, Dataset} = require('../../src/types');

const {Action, init, update, view} = GroupOperationComponent;

const aggregatorPool = require('../../src/definitions/aggregators');


const spain = Dataset(
  ['Date', 'Opponent', 'Goals For', 'Goals Against', 'Outcome'],
  [ ['2014-06-13', 'Netherlands', '1', '5', 'Loss'],
    ['2014-06-18', 'Chile',       '0', '2', 'Loss'],
    ['2014-06-23', 'Australia',   '3', '0', 'Win']
  ]
);

const states = {
  base: init(1),
  withCols: R.merge(
    init(1),
    {uid: 1, columns: [4]}
  ),
  withAgg: R.merge(
    init(1),
    {uid: 2, columns: [4], aggregators: [OperationComponent.init('Aggregator', 1)]}
  )
};

const viewCheck = (m, editing) => view(
  {set$: stream(), delete$: stream(), setActive$: stream()},
  {dataset: spain, aggregatorPool, editing},
  m,
);


describe('operation list component actions', function () {
  it ('renders the initial state', function () {
    viewCheck(states.base, false);
    viewCheck(states.base, true);
  });

  it ('sets columns', function () {
    const ns = update(Action.SetColumns([4]), states.base);
    assert.deepEqual(ns.columns, [4]);
    viewCheck(ns, false);
    viewCheck(ns, true);
  });

  it ('creates aggregators', function () {
    const ns = update(Action.CreateAggregator, states.withCols);
    assert.deepEqual(ns.aggregators, [OperationComponent.init('Aggregator', 1)])
    viewCheck(ns, false);
    viewCheck(ns, true);
  });

  it ('removes aggregators', function () {
    const ns = update(Action.DeleteAggregator(1), states.withAgg);
    assert.deepEqual(ns.aggregators, []);
    viewCheck(ns, false);
    viewCheck(ns, true);
  });

  it ('sets active', function () {
    const ns = update(Action.SetActive(1), states.withAgg);
    assert.equal(ns.active, 1);
    viewCheck(ns, false);
    viewCheck(ns, true);
  });

  it ('sets aggregator state', function () {
    const oAct = OperationComponent.Action.SetDefinitionKey('Count');
    const ns = update(
      Action.SetAggregator(1, oAct),
      states.withAgg
    );

    assert.equal(ns.aggregators[0].definitionKey, "Count");
    viewCheck(ns, false);
    viewCheck(ns, true);
  });

  it ('renders various states', function () {
  });

});
