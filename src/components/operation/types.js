const Type = require('union-type');

const Action = Type({
  StartEdit: [],
  SetFunc: [Object, String],
  SetColumn: [String, Number],
  SetMultiColumn: [String, Number, Number],
  AddMultiColumn: [String, Number],
  RemoveMultiColumn: [String, Number],
  SetUserInput: [String, String],
  Cancel: [],
  Save: [],
  Delete: []
});

module.exports = {Action}
