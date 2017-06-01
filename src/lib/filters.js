const R = require('ramda');

module.exports = {
  Equality: {
    name: "Equality",
    columnSlots: [{
      name: "Column",
      test: R.T
    }],
    userInputs: [{
      key: "val",
      name: ""
    }],
    fn: (us, cs) => us[0] === cs[0]
  }
};
