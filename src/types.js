const Type = require('union-type');


const Dataset = Type({
  columns: [Array],
  data: [Array]
});

module.exports = Type({
  StartUpload: [],
  SetData: [Dataset]
})
