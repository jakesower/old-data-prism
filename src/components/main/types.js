const Type = require('union-type');
const OperationTypes = require('../operation/types');

const Dataset = Type({
  columns: [Array],
  records: [Array]
});


const Operation = Type({
  Filter: [Object],
  Deriver: [Object]
});

Operation.map = fn =>
  Operation.case({
    Filter: v => Operation.Filter(fn(v)),
    Deriver: v => Operation.Deriver(fn(v))
  });

const Action = Type({
  StartUpload: [() => true],
  SetData: [Object],   // TODO: use Dataset here (perhaps when union-type is updated?)
  SetPage: [Number],
  CreateFilter: [],
  SetOperationState: [Operation, OperationTypes.Action]
});


module.exports = {Dataset, Operation, Action};
