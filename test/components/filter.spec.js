const assert = require('chai').assert;
const Filter = require('../../src/components/filter');

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

const FILTERS = {
  Equality: {
    name: "Equality",
    columnSlots: [{
      name: "val",
      test: R.T
    }],
    userInputs: [{
      key: "val",
      name: ""
    }],
    fn: (us, cs) => us.val === cs.val
  },

  LT: {
    name: "Less Than",
    columnSlots: [{
      name: "val",
      test: n => !isNaN(n),
    }],
    userInputs: [{
      name: "val",
      test: n => !isNaN(n),
    }],
    fn: (us, cs) => parseFloat(cs.val) < parseFloat(us.val)
  }
}


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

    action$(Action.SetFunc(FILTERS.Equality.name));
    assert(S.equals(model$().editState.func, "Equality"));
  });


  it('saves with valid arguments', function() {
    const model$ = Model$({
      editState: {
        func: "Equality",
        columns: {column: 0},
        userInputs: {val: "Tenderheart Bear"}
      }
    });

    action$(Action.Save);

    assert.equal(model$().func, "Equality");
    assert.deepEqual(model$().columns, {column: 0});
    assert.deepEqual(model$().userInputs, {val: "Tenderheart Bear"});
    assert.equal(model$().editing, false);
  });


  it('stops editing on cancel', function() {
    const model$ = Model$({
      func: FILTERS.Equality.name,
      columns: {column: 0},
      userSlots: {val: "Messy Bear"}
    });

    action$(Action.Cancel);
    assert.equal(model$().editing, false);
  });


  it('can generate a delete action (which has unspecified behavior)', function() {
    assert.doesNotThrow(action$(Action.Delete));
  })
});
