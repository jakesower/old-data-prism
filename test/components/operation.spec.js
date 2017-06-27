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
    key: "Equality",
    columnSlots: [{
      key: "val",
      test: R.T,
      type: 'single'
    }],
    userInputs: [{
      key: "val"
    }],
    fn: (us, cs) => us.val === cs.val,
    display: () => "hi"
  },

  LT: {
    key: "Less Than",
    columnSlots: [{
      key: "val",
      type: 'single',
      test: n => !isNaN(n),
    }],
    userInputs: [{
      key: "val",
      test: n => !isNaN(n),
    }],
    fn: (us, cs) => parseFloat(cs.val) < parseFloat(us.val),
    display: () => "hi"
  },

  Sum: {
    key: "Sum",
    columnSlots: [{
      key: "addends",
      test: R.T,
      type: 'list'
    }],
    userInputs: [],
    fn: (us, cs) => R.sum(cs.addends),
    display: () => "oh hai"
  }
}

const {Action, view, update, init} = OperationComponent;


describe('operation actions', function() {
  const Model$ = (a$, m) => flyd.scan(S.flip(update), R.merge(init('Operation', 0), m), a$);
  const viewCheck = (a$, m) => () => view(OPERATIONS, careBears, a$, m);


  it('renders with init data', function() {
    const action$ = stream();
    assert.doesNotThrow(viewCheck(action$, Model$(action$, {})()));
  });


  it('can start an edit', function() {
    const action$ = stream();
    const model$ = Model$(action$, {editing: false});

    assert.equal(model$().editing, false);
    action$(Action.StartEdit);
    assert.equal(model$().editing, true);
    assert.doesNotThrow(viewCheck(action$, model$()));
  });


  it('can set a function', function() {
    const action$ = stream();
    const model$ = Model$(action$, {});

    action$(Action.SetFunc(OPERATIONS, OPERATIONS.Equality.key));
    assert(S.equals(model$().editState.func, "Equality"));
    assert.deepEqual(model$().editState.columns, {val: null})
    assert.doesNotThrow(viewCheck(action$, model$()));
  });


  it('saves with valid arguments', function() {
    const action$ = stream();
    const model$ = Model$(action$, {
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
    assert.doesNotThrow(viewCheck(action$, model$()));
  });


  it('updates single columns', function() {
    const action$ = stream();
    const model$ = Model$(action$, {
      editState: {func: "Equality", columns: {val: null}, userInputs: {}}
    });

    action$(Action.SetColumn("val", 1));

    assert.equal(model$().editState.columns.val, 1);
    assert.doesNotThrow(viewCheck(action$, model$()));
  });


  it('updates columns with multiple values', function() {
    const action$ = stream();
    const model$ = Model$(action$, {});

    action$(Action.SetFunc(OPERATIONS, OPERATIONS.Sum.key));
    action$(Action.SetColumn('addends', [0, 3]));

    assert.deepEqual(model$().editState.columns.addends, [0, 3]);
    assert.doesNotThrow(viewCheck(action$, model$()));
  });


  it('updates user input', function() {
    const action$ = stream();
    const model$ = Model$(action$, {
      editState: {func: "Equality", columns: {val: null}, userInputs: {}}
    });

    action$(Action.SetUserInput("val", "moo"));

    assert.equal(model$().editState.userInputs.val, "moo");
    assert.doesNotThrow(viewCheck(action$, model$()));
  });


  it('stops editing on cancel', function() {
    const action$ = stream();
    const model$ = Model$(action$, {
      func: OPERATIONS.Equality.key,
      columns: {column: 0},
      userSlots: {val: "Messy Bear"}
    });

    action$(Action.Cancel);
    assert.equal(model$().editing, false);
    assert.doesNotThrow(viewCheck(action$, model$()));
  });


  it('can generate a delete action (which has unspecified behavior)', function() {
    const action$ = stream();
    assert.doesNotThrow(action$(Action.Delete));
  })
});
