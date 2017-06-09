const Type = require('union-type');
const OperationTypes = require('../operation/types');

const Dataset = Type({
  columns: [Array],
  records: [Array]
});


const Action = Type({
  StartUpload: [() => true],
  SetData: [Object],   // TODO: use Dataset here (perhaps when union-type is updated?)
  SetPage: [Number],
  CreateFilter: [],
  SetOperationState: [() => true, OperationTypes.Action]
});


module.exports = {Dataset, Action};
