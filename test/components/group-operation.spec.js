const assert = require('chai').assert;
const GroupOperationComponent = require('../../src/components/group-operation');

const flyd = require('flyd');
const stream = flyd.stream;
const S = require('sanctuary');
const R = require('ramda');

const careBears = {
  headers: ['Name', 'Belly Badge', 'Debut Year', 'Gender', 'Favorite Number'],
  records: [
    ['Tenderheart Bear', 'Heart', '1982', 'Male', '2'],
    ['Grumpy Bear', 'Raincloud', '1982', 'Male', '3'],
    ['Funshine Bear', 'Sun', '1982', 'Genderqueer', '5'],
    ['Cheer Bear', 'Rainbow', '1982', 'Female', '7'],
    ['True Heart Bear', 'Star with Heart', '1986', 'Female', '11'],
    ['Messy Bear', 'Tornado', '2005', 'Male', '13'],
    ['Oopsy Bear', 'Shooting Star', '2007', 'Male', '17']
  ]
};

const AGGREGATORS = {
  Count: {
    key: "Count",
    columnSlots: [],
    userInputs: [],

    fn: (group, us, cs) => group.length.toString()
  },

  Maximum: {
    key: "Maximum",
    columnsSlots: [{
      key: "val",
      display: "Column",
      test: n => !isNaN(n),
    }],
    userInputs: []
  }
}

const {Action, view, update, init} = GroupOperationComponent;


describe('operation actions', function() {
  const Model$ = (a$, m) => flyd.scan(S.flip(update), R.merge(init(0), m), a$);
  const viewCheck = (a$, m) => () => view(AGGREGATORS, careBears, a$, m);


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


  it('stops editing on cancel', function() {
    const action$ = stream();
    const model$ = Model$(action$, {
      columns: {column: 2},
      aggregators: []
    });

    action$(Action.Cancel);
    assert.equal(model$().editing, false);
    assert.doesNotThrow(viewCheck(action$, model$()));
  });


  it('can generate a delete action (which has unspecified behavior)', function() {
    const action$ = stream();
    assert.doesNotThrow(action$(Action.Delete));
  });


  it('saves with valid arguments', function() {
    const action$ = stream();
    const model$ = Model$(action$, {
      editState: {
        columns: [2],
        aggregators: []
      }
    });

    action$(Action.Save);

    assert.deepEqual(model$().columns, [2]);
    assert.equal(model$().enabled, true);
    assert.equal(model$().editing, false);
    assert.doesNotThrow(viewCheck(action$, model$()));
  });


  it('adds columns', function() {
    const action$ = stream();
    const model$ = Model$(action$, {
      editState: {columns: [], aggregators: []}
    });

    action$(Action.AddColumn(1));

    assert.deepEqual(model$().editState.columns, [1]);
    assert.doesNotThrow(viewCheck(action$, model$()));
  });


  it('removes columns', function() {
    const action$ = stream();
    const model$ = Model$(action$, {});

    action$(Action.AddMultiColumn(2));
    action$(Action.AddMultiColumn(3));
    action$(Action.RemoveMultiColumn(2));

    assert.deepEqual(model$().editState.columns.addends, [3]);
    assert.doesNotThrow(viewCheck(action$, model$()));
  });


  it('adds aggregators', function() {
    const action$ = stream();
    const model$ = Model$(action$, {
      editState: {columns: [], aggregators: []}
    });

    action$(Action.CreateAggregator({func: 'Count', columnInputs: [], userInputs: []}));

    assert.deepEquals(model$().editState.aggregators, {func: 'Count', columnInputs: [], userInputs: []});
    assert.doesNotThrow(viewCheck(action$, model$()));
  });


  it('updates aggregators', function() {
    const action$ = stream();
    const model$ = Model$(action$, {
      editState: {columns: [], aggregators: []}
    });

    action$(Action.CreateAggregator({func: 'Count', columnInputs: [], userInputs: []}));

    assert.deepEquals(model$().editState.aggregators, {func: 'Count', columnInputs: [], userInputs: []});
    assert.doesNotThrow(viewCheck(action$, model$()));
  });


  it('adds aggregators', function() {
    const action$ = stream();
    const model$ = Model$(action$, {
      editState: {columns: [], aggregators: []}
    });

    action$(Action.CreateAggregator({
      func: 'Maximum',
      columnInputs: {val: 2},
      userInputs: []
    }));

    action$(Action.SetAggregator({}))

    assert.deepEquals(model$().editState.aggregators, {func: 'Count', columnInputs: [], userInputs: []});
    assert.doesNotThrow(viewCheck(action$, model$()));
  });
});
