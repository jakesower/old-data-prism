const Type = require('union-type');

const Action = Type({
  StartEdit: [],
  SetDefinition: [Object],
  SetInput: [String, () => true],
  SetColumnName: [String],
  Cancel: [],
  Delete: []
});

module.exports = {Action}
