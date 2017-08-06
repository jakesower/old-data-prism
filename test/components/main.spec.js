import { assert as assert  } from 'chai';
import MainComponent from '../../src/components/main';

import flyd from 'flyd';
const stream = flyd.stream;
import S from 'sanctuary';
import R from 'ramda';

const careBears = {
  headers: ['Name', 'Belly Badge', 'Debut Year'],
  records: [
    ['Tenderheart Bear', 'Heart', '1982'],
    ['Grumpy Bear', 'Raincloud', '1982'],
    ['Messy Bear', 'Tornado', '2005'],
    ['Oopsy Bear', 'Shooting Star', '2007']
  ]
};

const {Action, view, update, init} = MainComponent;

const sampleFilter = {
  type: 'Filter',
  id: 0,
  enabled: true,
  editing: false,

  func: "Equality",
  columns: {val: 1},
  userInputs: {val: 'Tornado'},

  editState: {}
};


describe('main component actions', function() {
  const sampleInit = R.merge(init(null), {dataset: careBears});
  const action$ = stream();
  const Model$ = m => flyd.scan(S.flip(update), R.merge(sampleInit, m), action$);

  const viewCheck = m => () => view(action$, m); // just add model!


  it('renders with an initial state', function() {
    assert.doesNotThrow(viewCheck(Model$({})()));
  });


  it('can start an edit', function() {
    const model$ = Model$({
      operations: [sampleFilter]
    });

    action$(Action.DeleteOperation(0));
    assert.deepEqual(model$().operations, []);
    assert.doesNotThrow(viewCheck(model$()));
  });


});
