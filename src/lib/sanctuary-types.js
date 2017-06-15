const $ = require('sanctuary-def');
const R = require('ramda');


const $Column = $.RecordType({
  index: $.FiniteNumber,
  header: $.String,
  values: $.Array($.String)
});


const $Dataset = $.RecordType({
  headers: $.Array($.String),
  records: $.Array($.Array($.String))
});


const $Filter = $.RecordType({
  name: $.String,
  columnSlots: $.Array($.RecordType({
    key: $.NonEmpty($.String),
    display: $.NonEmpty($.String),
    test: $.Function([$.String, $.Boolean])
  })),
  userInputs: $.Array($.RecordType({
    key: $.NonEmpty($.String),
    display: $.NonEmpty($.String)
  })),
  fn: $.Function([$.Object, $.Object, $.Boolean]),
  display: $.Function([$.Object, $.Object, $Dataset, $.Any])
});


const $Deriver = $.RecordType({
  name: $.String,
  columnSlots: $.Array($.RecordType({
    key: $.NonEmpty($.String),
    display: $.NonEmpty($.String),
    type: $.EnumType('', '', ['single', 'list']),
    test: $.Function([$.String, $.Boolean])
  })),
  userInputs: $.Array($.RecordType({
    key: $.NonEmpty($.String),
    display: $.NonEmpty($.String)
  })),
  fn: $.Function([$.Object, $.Object, $.Boolean]),
  display: $.Function([$.Object, $.Object, $Dataset, $.Any])
});


const myTypes = {
  $Column,
  $Dataset,
  $Deriver,
  $Filter,
};

const env = $.env.concat(R.values(myTypes));

module.exports = R.merge(myTypes, {
  def: $.create({checkTypes: !!process.env.CHECK_TYPES, env: env}),
  '$': $
})
