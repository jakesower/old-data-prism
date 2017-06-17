const Type = require('union-type');
const OperationTypes = require('../operation/types');

const Action = Type({
  StartUpload: [() => true],
  SetData: [Object],   // TODO: use Dataset here (perhaps when union-type is updated?)
  SetPage: [Number], // <-- for the grid; should be put in component
  SetTab: [String],  // <-- really should be SetPage
  CreateFilter: [],
  CreateDeriver: [],
  DeleteOperation: [() => true],
  SetOperationState: [() => true, OperationTypes.Action]
});


module.exports = {Action};
