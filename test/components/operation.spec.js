const assert = require('chai').assert;
const OperationComponent = require('../../src/components/operation');

const flyd = require('flyd');
const stream = flyd.stream;
const S = require('sanctuary');
const R = require('ramda');

const careBears = {
  headers: ['Name', 'Belly Badge', 'Debut Year'],
  records: [
    ['Tenderheart Bear', 'Heart', '1982'],
    ['Grumpy Bear', 'Raincloud', '1982'],
    ['Messy Bear', 'Tornado', '2005'],
    ['Oopsy Bear', 'Shooting Star', '2007']
  ]
};

const OPERATIONS = {
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
    fn: (us, cs) => us.val === cs.val,
    display: () => "hi"
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
    fn: (us, cs) => parseFloat(cs.val) < parseFloat(us.val),
    display: () => "hi"
  }
}

const {Action, view, update, init} = OperationComponent;


describe('operation actions', function() {
  const action$ = stream();
  const Model$ = m => flyd.scan(S.flip(update), R.merge(init('Operation', 0), m), action$);

  const viewCheck = m => () => view(OPERATIONS, careBears, action$, m); // just add model!


  it('renders with init data', function() {
    assert.doesNotThrow(viewCheck(Model$({})()));
  });


  it('can start an edit', function() {
    const model$ = Model$({editing: false});

    assert.equal(model$().editing, false);
    action$(Action.StartEdit);
    assert.equal(model$().editing, true);
    assert.doesNotThrow(viewCheck(model$()));
  });


  it('can set a function', function() {
    const model$ = Model$({});

    action$(Action.SetFunc(OPERATIONS.Equality.name));
    assert(S.equals(model$().editState.func, "Equality"));
    assert.doesNotThrow(viewCheck(model$()));
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
    assert.equal(model$().enabled, true);
    assert.equal(model$().editing, false);
    assert.doesNotThrow(viewCheck(model$()));
  });


  it('updates columns', function() {
    const model$ = Model$({
      editState: {func: "Equality", columns: {}, userInput: {}}
    });

    action$(Action.SetColumn("val", 1));

    assert.equal(model$().editState.columns.val, 1);
    assert.doesNotThrow(viewCheck(model$()));
  });


  it('updates user input', function() {
    const model$ = Model$({
      editState: {func: "Equality", columns: {}, userInput: {}}
    });

    action$(Action.SetUserInput("val", "moo"));

    assert.equal(model$().editState.userInputs.val, "moo");
    assert.doesNotThrow(viewCheck(model$()));
  });


  it('stops editing on cancel', function() {
    const model$ = Model$({
      func: OPERATIONS.Equality.name,
      columns: {column: 0},
      userSlots: {val: "Messy Bear"}
    });

    action$(Action.Cancel);
    assert.equal(model$().editing, false);
    assert.doesNotThrow(viewCheck(model$()));
  });


  it('can generate a delete action (which has unspecified behavior)', function() {
    assert.doesNotThrow(action$(Action.Delete));
  })
});
