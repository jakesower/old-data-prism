import $ from 'sanctuary-def';
import R from 'ramda';

const $Column = $.RecordType({
  index: $.FiniteNumber,
  header: $.String,
  values: $.Array($.String)
});


const $Dataset = $.RecordType({
  headers: $.Array($.String),
  records: $.Array($.Array($.String))
});


const $DataType = $.RecordType({
  test: $.Function([$.String, $.Boolean]),
  cast: $.Function([$.String, $.Any])
});


const $Filter = $.RecordType({
  name: $.String,
  slots: $.Array($.RecordType({
    key: $.NonEmpty($.String),
    sourceType: $.EnumType('', '', ['column', 'user', 'multicolumn']),
    dataType: $DataType,
    display: $.NonEmpty($.String)
  })),
  fn: $.Function([$.Object, $.Object, $.Boolean]),
  display: $.Function([$.Object, $Dataset, $.Any])
});


const $Deriver = $.RecordType({
  name: $.String,
  slots: $.Array($.RecordType({
    key: $.NonEmpty($.String),
    sourceType: $.EnumType('', '', ['column', 'user', 'multicolumn']),
    dataType: $DataType,
    display: $.NonEmpty($.String),
  })),
  fn: $.Function([$.Object, $.Object, $.Boolean]),
  display: $.Function([$.Object, $Dataset, $.Any])
});


const $Aggregator = $.RecordType({
  name: $.String,
  columnSlots: $.Array($.RecordType({
    key: $.NonEmpty($.String),
    display: $.NonEmpty($.String),
    sourceType: $.EnumType('', '', ['single', 'list']),
    dataType: $DataType
  })),
  userInputs: $.Array($.RecordType({
    key: $.NonEmpty($.String),
    display: $.NonEmpty($.String)
  })),
  fn: $.Function([$.Object, $.Object, $.Boolean]),
  display: $.Function([$.Object, $.Object, $Dataset, $.Any])
});


const $Grouping = $.RecordType({
  columns: $.NonEmpty($.Array($.Number)),
  aggregators: $.Array($Aggregator)
});


const myTypes = {
  $Column,
  $Dataset,
  $Deriver,
  $Filter,
  $Aggregator,
  $Grouping,
  $DataType,
};

const env = $.env.concat(R.values(myTypes));
const def = $.create({checkTypes: !!process.env.CHECK_TYPES, env: env});

export {
  $Column,
  $Dataset,
  $Deriver,
  $Filter,
  $Aggregator,
  $Grouping,
  $DataType,
  def,
  $
};
