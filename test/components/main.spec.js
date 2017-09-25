const assert = require('chai').assert;
const R = require('ramda');
const stream = require('flyd').stream;

const MainComponent = require('../../src/components/main');
const subject = MainComponent;
const {Dataset} = require('../../src/types');

const {Action, view, update, init} = MainComponent;

const croatia = Dataset(
  ['Date', 'Opponent', 'Goals For', 'Goals Against'],
  [ ['2014-06-12', 'Brazil',   '1', '3'],
    ['2014-06-18', 'Cameroon', '4', '0'],
    ['2014-06-23', 'Mexico',   '1', '3']
  ]
);

const blank = init(null);

describe('main component actions', function () {
  it ('sets the page', function () {
    const ns = update(Action.SetPage('Remix'), blank);
    assert.equal(ns.page, 'Remix');
    assert.doesNotThrow(view(ns));
  });

  it ('set dimensions', function () {
    const ns = update(Action.SetMainDimensions({height: 5, width: 5}), blank);
    assert.deepEqual(ns.mainDimensions, {height: 5, width: 5});
    assert.doesNotThrow(view(ns));
  });

  it ('toggles help', function () {
    const ns = update(Action.ToggleHelp, blank);
    assert.equal(ns.help, true);
    assert.doesNotThrow(view(ns));

    const ns2 = update(Action.ToggleHelp, ns);
    assert.equal(ns2.help, false);
    assert.doesNotThrow(view(ns2));
  });

  it ('toggles walkthrough', function () {
    const ns = update(Action.ToggleWalkthrough, blank);
    assert.equal(ns.walkthrough, true);
    assert.doesNotThrow(view(ns));

    const ns2 = update(Action.ToggleWalkthrough, ns);
    assert.equal(ns2.walkthrough, false);
    assert.doesNotThrow(view(ns2));
  });

  it ('sets good data', function () {
    const ns = update(Action.SetData({headers: ['One'], records: [['Thing']]}), blank);
    assert.deepEqual(ns.dataset, Dataset(['One'], [['Thing']]));
    assert.doesNotThrow(view(ns));
  });

  describe ('various app states', function () {
    const base = init(null);

    const states = [
      { page: 'Remix',
        dataset: croatia,
        operations: {
          active: 1,
          operations: [{
            definitionKey: 'Equality',
            id: 1,
            inputs: {a: "", b: ""},
            type: "Filter"
          }],
          uid: 2
        }
      },
      { page: 'Remix',
        dataset: croatia,
        operations: {
          active: 1,
          operations: [{
            id: 1,
            type: "Grouping"
          }],
          uid: 2
        }
      },
      { page: 'Chart',
        dataset: croatia,
        mainDimensions: {height: 500, width: 500},
        operations: {
          active: 1,
          operations: [{
            definitionKey: 'Equality',
            id: 1,
            inputs: {a: "", b: ""},
            type: "Filter"
          }],
          uid: 2
        }
      },
    ]

    states.forEach(ns => {
      it ("works", function () {
        view(stream(), R.merge(base, ns));
        assert.doesNotThrow(() => view(stream(), R.merge(base, ns)))
      })
    });
  });

  // SetPage: [String],
  // SetMainDimensions: [Object],
  // ToggleHelp: [],
  // ToggleWalkthrough: [],
  //
  // // Import
  // LoadLocalFile: [() => true],
  // LoadURI: [String],
  // SetData: [Object],
  //
  // // Prepare
  // SetOperations: [Object],
  // SetGridState: [String, Object],
  //
  // // Chart
  // SetChart: [Object]

});
