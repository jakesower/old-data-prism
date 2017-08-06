import Type from 'union-type';

const Action = Type({
  StartEdit: [],
  SetFunc: [Object, String],
  SetInput: [String, () => true],
  Cancel: [],
  Save: [],
  Delete: []
});

export {Action}
