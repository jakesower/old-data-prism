import Type from 'union-type';
import * as OperationTypes from '../operation/types';

const Action = Type({
  StartUpload: [() => true],
  SetData: [Object],
  SetPage: [String],
  SetChart: [Object],
  SetMainDimensions: [Object],
  CreateFilter: [],
  CreateDeriver: [],
  CreateGrouping: [],
  DeleteOperation: [Number],
  ModifyOperation: [Number, Function, () => true],
  SetGridState: [String, Object],
});


const GroupAction = Type({
  StartEdit: [],
  Cancel: [],
  Delete: [],
  Save: [],

  SetColumns: [Array],

  CreateAggregator: [],
  SetAggregator: [Number, Object],
  DeleteAggregator: [Number]
})


export {Action, GroupAction};
