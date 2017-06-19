const Type = require('union-type');
const OperationTypes = require('../operation/types');

const Action = Type({
  StartUpload: [() => true],
  SetData: [Object],
  SetPage: [String],
  CreateFilter: [],
  CreateDeriver: [],
  DeleteOperation: [() => true],
  SetOperationState: [() => true, OperationTypes.Action],
  SetGridState: [String, Object],
});


module.exports = {Action};
