const Type = require('union-type');
const OperationTypes = require('../operation/types');

const Action = Type({
  StartUpload: [() => true],
  SetData: [Object],
  SetPage: [String],
  SetChart: [Object],
  SetMainDimensions: [Object],
  CreateFilter: [],
  CreateDeriver: [],
  CreateGrouping: [],
  DeleteOperation: [Number],
  ModifyOperation: [Number, Function, () => true],
  SetGridState: [String, Object],
});


const GroupAction = Type({
  StartEdit: [],
  Cancel: [],
  Delete: [],
  Save: [],

  SetColumns: [Array],

  CreateAggregator: [],
  SetAggregator: [Number, Object],
  DeleteAggregator: [Number]
})


module.exports = {Action, GroupAction};
