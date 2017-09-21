// const assert = require('chai').assert;
// const OperationComponent = require('../../src/components/operation');
// const dataTypes = require('../../src/definitions/data');
//
// const flyd = require('flyd');
// const stream = flyd.stream;
// const S = require('sanctuary');
// const R = require('ramda');
//
// const careBears = {
//   headers: ['Name', 'Belly Badge', 'Debut Year'],
//   records: [
//     ['Tenderheart Bear', 'Heart', '1982'],
//     ['Grumpy Bear', 'Raincloud', '1982'],
//     ['Messy Bear', 'Tornado', '2005'],
//     ['Oopsy Bear', 'Shooting Star', '2007']
//   ]
// };
//
// const OPERATIONS = {
//   Equality: {
//     name: "Equality",
//     slots: [
//       { key: "val",
//         display: 'val',
//         dataType: dataTypes.String,
//         sourceType: 'column'
//       },
//       { key: "val2",
//         display: 'val',
//         dataType: dataTypes.String,
//         sourceType: 'user'
//       }
//     ],
//     fn: inputs => inputs.val === inputs.val2,
//     display: () => "hi"
//   },
//
//   LT: {
//     name: "Less Than",
//     slots: [
//       { key: "val",
//         sourceType: 'column',
//         dataType: dataTypes.FiniteNumber,
//       },
//       { key: "val",
//         sourceType: 'user',
//         dataType: dataTypes.FiniteNumber,
//       }
//     ],
//     fn: inputs => parseFloat(inputs.val) < parseFloat(inputs.val2),
//     display: () => "hi"
//   },
//
//   Sum: {
//     name: "Sum",
//     slots: [{
//       key: "addends",
//       sourceType: 'multicolumn',
//       dataType: dataTypes.FiniteNumber,
//     }],
//     fn: inputs => R.sum(inputs.addends),
//     display: () => "oh hai"
//   }
// }
//
// const {Action, view, update, init} = OperationComponent;
//
//
// describe('operation actions', function() {
//   const Model$ = (a$, m) => flyd.scan(S.flip(update), R.merge(init('Operation', 0), m), a$);
//   const viewCheck = (a$, m) => () => view(OPERATIONS, careBears, a$, m);
//
//
//   it('renders with init data', function() {
//     const action$ = stream();
//     assert.doesNotThrow(viewCheck(action$, Model$(action$, {})()));
//   });
//
//
//   it('can start an edit', function() {
//     const action$ = stream();
//     const model$ = Model$(action$, {editing: false});
//
//     assert.equal(model$().editing, false);
//     action$(Action.StartEdit);
//     assert.equal(model$().editing, true);
//     assert.doesNotThrow(viewCheck(action$, model$()));
//   });
//
//
//   it('can set a definition', function() {
//     const action$ = stream();
//     const model$ = Model$(action$, {});
//
//     action$(Action.SetDefinition(OPERATIONS.Equality));
//
//     assert.equal(model$().editState.definition.name, 'Equality');
//     assert.deepEqual(model$().editState.inputs, {val: '', val2: ''})
//     assert.doesNotThrow(viewCheck(action$, model$()));
//   });
//
//
//   it('saves with valid arguments', function() {
//     const action$ = stream();
//     const model$ = Model$(action$, {
//       editState: {
//         definition: OPERATIONS.Equality,
//         inputs: {val: 0, val2: "Tenderheart Bear"}
//       }
//     });
//
//     action$(Action.Save);
//
//     assert.equal(model$().definition.name, "Equality");
//     assert.deepEqual(model$().inputs, {val: 0, val2: "Tenderheart Bear"});
//     assert.equal(model$().enabled, true);
//     assert.equal(model$().editing, false);
//     assert.doesNotThrow(viewCheck(action$, model$()));
//   });
//
//
//   it('updates single column inputs', function() {
//     const action$ = stream();
//     const model$ = Model$(action$, {
//       editState: {definition: OPERATIONS.Equality, inputs: {val: null}}
//     });
//
//     action$(Action.SetInput("val", 1));
//
//     assert.equal(model$().editState.inputs.val, 1);
//     assert.doesNotThrow(viewCheck(action$, model$()));
//   });
//
//
//   it('updates columns with multiple values', function() {
//     const action$ = stream();
//     const model$ = Model$(action$, {});
//
//     action$(Action.SetDefinition(OPERATIONS.Sum));
//     action$(Action.SetInput('addends', [0, 3]));
//
//     assert.deepEqual(model$().editState.inputs.addends, [0, 3]);
//     assert.doesNotThrow(viewCheck(action$, model$()));
//   });
//
//
//   it('updates text input', function() {
//     const action$ = stream();
//     const model$ = Model$(action$, {
//       editState: {definition: OPERATIONS.Equality, inputs: {val: null}}
//     });
//
//     action$(Action.SetInput("val", "moo"));
//
//     assert.equal(model$().editState.inputs.val, "moo");
//     assert.doesNotThrow(viewCheck(action$, model$()));
//   });
//
//
//   it('stops editing on cancel', function() {
//     const action$ = stream();
//     const model$ = Model$(action$, {
//       definition: OPERATIONS.Equality,
//       slots: {column: 0, val: "Messy Bear"}
//     });
//
//     action$(Action.Cancel);
//     assert.equal(model$().editing, false);
//     assert.doesNotThrow(viewCheck(action$, model$()));
//   });
//
//
//   it('can generate a delete action (which has unspecified behavior)', function() {
//     const action$ = stream();
//     assert.doesNotThrow(action$(Action.Delete));
//   })
// });
