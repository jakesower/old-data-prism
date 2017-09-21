const assert = require('chai').assert;
const MainComponent = require('../../src/components/main');
const subject = MainComponent;

const R = require('ramda');
const {Dataset} = require('../../src/types');

const {Action, view, update, init} = MainComponent;

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
