const Type = require('union-type');
const Maybe = require('ramda-fantasy').Maybe;


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
    SetFilterFn: [String]
  }),

  Dataset: Dataset
};
