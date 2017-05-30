const assert = require('chai').assert;
const Filter = require('../src/components/filter');
const FILTERS = require('../src/lib/filters');

const flyd = require('flyd');
const stream = flyd.stream;
const S = require('sanctuary');
const R = require('ramda');

const {Action, view, update, init} = Filter;

const careBears = {
  columns: ['Name', 'Belly Badge', 'Debut Year'],
  records: [
    ['Tenderheart Bear', 'Heart', '1982'],
    ['Grumpy Bear', 'Raincloud', '1982'],
    ['Messy Bear', 'Tornado', '2005'],
    ['Oopsy Bear', 'Shooting Star', '2007']
  ]
};


describe('filter actions', function() {
  const action$ = stream();
  const Model$ = m => flyd.scan(S.flip(update), R.merge(init(0), m), action$);

  it('can start an edit', function() {
    const model$ = Model$({editing: false});

    assert.equal(model$().editing, false);
    action$(Action.StartEdit)
    assert.equal(model$().editing, true);
  });


  it('can set a function', function() {
    const model$ = Model$({});

    action$(Action.SetFunc(S.Just(FILTERS.Equality.name)));
    assert(S.equals(model$().editState.func, S.Just("Equality")));
  });


  it('saves with valid arguments', function() {
    const model$ = Model$({
      editState: {
        func: S.Just("Equality"),
        columns: {column: 0},
        userSlots: {val: "Tenderheart Bear"}
      }
    });

    action$(Action.Save);

    assert.equal(model$().func, "Equality");
    assert.equal(model$().columns, {column: 0});
    assert.equal(model$().userSlots, {val: "Tenderheart Bear"});
    assert.equal(model$().editing, false);
  });


  it('resets the editing state on cancel if previously valid', function() {
    const model$ = Model$({
      func: FILTERS.Equality.name,
      columns: {column: 0},
      userSlots: {val: "Messy Bear"}
    });

    action$(Action.Cancel);
    assert.equal(model$().editing, false);
  })
})
