const Type = require('union-type');

const Action = Type({
  StartEdit: [],
  SetFunc: [Object, String],
  SetInput: [String, () => true],
  Cancel: [],
  Save: [],
  Delete: []
});

module.exports = {Action}
