const Type = require('union-type');
const OperationTypes = require('../operation/types');

const Action = Type({
  StartUpload: [() => true],
  SetData: [Object],
  SetPage: [String],
  CreateFilter: [],
  CreateDeriver: [],
  CreateGrouping: [],
  DeleteOperation: [() => true],
  SetOperationState: [() => true, OperationTypes.Action],
  SetGridState: [String, Object],
});


const GroupAction = Type({
  StartEdit: [],
  Cancel: [],
  Delete: [],

  AddColumn: [Number],
  RemoveColumn: [Number],

  AddAggregator: [Object],
  SetAggregator: [Number, Object],
  RemoveAggregator: [Number]
})


module.exports = {Action};
