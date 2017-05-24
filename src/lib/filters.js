const R = require('ramda');

const filters = [
  {
    name: "Equality",
    columnSlots: [{
      name: "Column",
      test: R.T
    }],
    userSlots: [{
      key: "val",
      name: ""
    }],
    fn: (us, cs) => us[0] === cs[0]
  }
];

module.exports = R.sortBy(R.prop('name'), filters);
