const R = require('ramda');
const stream = require('flyd').stream;

const assert = require('chai').assert;

const OperationComponent = require('../../src/components/operation');
const GroupOperationComponent = require('../../src/components/group-operation');
const OperationListComponent = require('../../src/components/operation-list');
const {DataTypes, Dataset} = require('../../src/types');

const {Action, init, update, view} = OperationListComponent;
const filterPool = require('../../src/definitions/filters');


const southKorea = Dataset(
  ['Date', 'Opponent', 'Goals For', 'Goals Against'],
  [ ['2014-06-17', 'Russia',  '1', '1'],
    ['2014-06-22', 'Algeria', '2', '4'],
    ['2014-06-27', 'Belgium', '0', '1']
  ]
);

const states = {
  base: init(),
  withFilter: R.merge(
    init(),
    {uid: 2, operations: [OperationComponent.init('Filter', 1)]}
  ),
  withGrouping: R.merge(
    init(),
    {uid: 2, operations: [GroupOperationComponent.init('Grouping', 1)]}
  )
};
const viewState = view(stream(), southKorea);

describe('operation list component actions', function () {
  it ('renders the initial state', function () {
    assert.doesNotThrow(() => viewState(states.base));
  });

  it ('creates operations', function () {
    const ns = update(Action.CreateOperation('Filter'), states.base);
    assert.deepEqual(ns.operations, [OperationComponent.init('Filter', 1)])
    assert.doesNotThrow(() => viewState(ns));
  });

  it ('removes operations', function () {
    const ns = update(Action.DeleteOperation(1), states.withFilter);
    assert.deepEqual(ns.operations, []);
    assert.doesNotThrow(() => viewState(ns));
  });

  it ('sets active', function () {
    const ns = update(Action.SetActive(1), states.withFilter);
    assert.equal(ns.active, 1);
    assert.doesNotThrow(() => viewState(ns));
  });

  it ('sets operation state', function () {
    const ns = update(
      Action.SetOperation(1,
        OperationComponent.Action.SetDefinitionKey('Equality')
      ),
      states.withFilter
    );

    assert.equal(ns.operations[0].definitionKey, "Equality");
    assert.doesNotThrow(() => viewState(ns));
  });

  it ('renders various states', function () {
    const states = [
      { active: 1,
        operations: [{
          definitionKey: 'Equality',
          id: 1,
          inputs: {a: "", b: ""},
          type: "Filter"
        }],
        uid: 2
      },

      { active: 1,
        uid: 2,
        operations: [{
          id: 1,
          type: 'Columns',
          inputs: {}
        }]
      }
    ]

    states.forEach(ns =>
      viewState(ns)
    );
  });

});
