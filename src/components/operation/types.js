const Type = require('union-type');

const Action = Type({
  StartEdit: [],
  StopEdit: [],
  SetDefinition: [Object],
  SetInput: [String, () => true],
  SetColumnName: [String],
  Delete: []
});

module.exports = {Action}
