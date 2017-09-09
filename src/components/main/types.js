const Type = require('union-type');
const OperationTypes = require('../operation/types');

const Action = Type({
  // General
  SetMainDimensions: [Object],
  ToggleHelp: [],
  ToggleWalkthrough: [],

  // Import
  LoadLocalFile: [() => true],
  LoadURI: [String],
  SetData: [Object],

  // Prepare
  SetPage: [String],
  SetActiveOperation: [() => true], // Maybe Number
  CreateFilter: [],
  CreateDeriver: [],
  CreateGrouping: [],
  DeleteOperation: [Number],
  ModifyOperation: [Number, Function, () => true],
  SetGridState: [String, Object],

  // Chart
  SetChart: [Object],
});


const GroupAction = Type({
  StartEdit: [],
  StopEdit: [],
  Delete: [],

  SetColumnName: [String],
  SetColumns: [Array],

  SetActiveAggregator: [() => true],
  CreateAggregator: [],
  SetAggregator: [Number, Object],
  DeleteAggregator: [Number]
})


module.exports = {Action, GroupAction};
