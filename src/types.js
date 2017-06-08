const Type = require('union-type');
const OperationComponent = require('./components/operation');

const Dataset = Type({
  columns: [Array],
  records: [Array]
});


const Operation = Type({
  Filter: [Object],
  Deriver: [Object]
});


const Action = Type({
  StartUpload: [],
  SetData: [Object],   // TODO: use Dataset here (perhaps when union-type is updated?)
  SetPage: [Number],
  CreateOperation: Operation,
  SetOpearationState: [Operation, OperationComponent.Action]
});


module.exports = {Dataset, Operation, Action};
