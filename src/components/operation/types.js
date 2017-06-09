const Type = require('union-type');

const Action = Type({
  StartEdit: [],
  SetFunc: [String],
  SetColumn: [String, Number],
  SetUserInput: [String, String],
  Cancel: [],
  Save: [],
  Delete: []
});

module.exports = {Action}
