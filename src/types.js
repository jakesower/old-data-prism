const Type = require('union-type');
const Filter = require('./components/filter');

const Dataset = Type({
  columns: [Array],
  records: [Array]
});


module.exports = {
  Action: Type({
    StartUpload: [],
    SetData: [Object],   // TODO: use Dataset here (perhaps when union-type is updated?)
    SetPage: [Number],
    CreateFilter: [],
    SetFilterState: [Object, Filter.Action]
  }),

  Dataset: Dataset
};
