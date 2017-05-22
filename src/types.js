const Type = require('union-type');


const Dataset = Type({
  columns: [String],
  data: [Array]
});

module.exports = Type({
  StartUpload: [],
  SetData: [Dataset]
})
