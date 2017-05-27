const R = require('ramda');

module.exports = {
  Equality: {
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
};
