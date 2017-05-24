const Type = require('union-type');


const Dataset = Type({
  columns: [Array],
  records: [Array]
});

module.exports = Type({
  StartUpload: [],
  SetData: [Object],   // TODO: use Dataset here (perhaps when union-type is updated?)
  SetPage: [Number],
  CreateFilter: [],
  SetFilterFn: [String]
})
