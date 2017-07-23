const Type = require('union-type');

const DF = require('./deriver-functions');
const FF = require('./filter-functions');

const Operation = Type({
  Filter(Object),
  Deriver(Object)
});

const Operation.caseOn({
  Filter: f => DF.apply(f.)
})
