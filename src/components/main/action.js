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
  SetSourceName: [String],
  SetData: [Object],
  SetActiveSource: [Number],

  // Remix
  SetCollectorList: [Object],
  SetGridState: [String, Object],

  // Chart
  SetChart: [Object],
});
