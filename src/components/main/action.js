const Type = require('union-type');

module.exports = Type({
  // General
  SetPage: [String],
  SetMainDimensions: [Object],
  ToggleHelp: [],
  ToggleWalkthrough: [],

  // Source
  LoadLocalFile: [() => true],
  LoadURI: [String],
  CreateSource: [String, Object],
  SetActiveSource: [() => true],

  // Remix
  SetCollectorList: [Object],
  SetGridState: [Object],

  // Chart
  SetChart: [Object],
});
