const Type = require('union-type');

module.exports = Type({
  // General
  SetPage: [String],
  SetMainDimensions: [Object],
  ToggleHelp: [],
  ToggleWalkthrough: [],

  // Import
  LoadLocalFile: [() => true],
  LoadURI: [String],
  SetData: [Object],

  // Prepare
  SetOperations: [Object],
  SetGridState: [String, Object],

  // Chart
  SetChart: [Object],
});
