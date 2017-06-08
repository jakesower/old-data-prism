const R = require('ramda');

module.exports = {
  Equality: {
    name: "Equality",
    columnSlots: [{
      name: "val",
      display: "Column",
      test: R.T
    }],
    userInputs: [{
      key: "val",
      display: "is equal to",
      name: "Value"
    }],

    fn: (us, cs) => us.val === cs.val,
    // display: `${us.val} = ${cs.val}`
  },

  LT: {
    name: "Less Than",
    columnSlots: [{
      name: "val",
      display: "Column",
      test: n => !isNaN(n),
    }],
    userInputs: [{
      name: "val",
      display: "is less than",
      test: n => !isNaN(n),
    }],
    fn: (us, cs) => parseFloat(cs.val) < parseFloat(us.val)
  }
};
