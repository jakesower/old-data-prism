const Type = require('union-type');

const Action = Type({
  StartEdit: [],
  SetDefinition: [Object],
  SetInput: [String, () => true],
  Cancel: [],
  Save: [],
  Delete: []
});

module.exports = {Action}
