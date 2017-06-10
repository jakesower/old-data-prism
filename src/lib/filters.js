const R = require('ramda');

module.exports = {
  Equality: {
    name: "Equality",

    columnSlots: [{
      key: "val",
      display: "Column",
      test: R.T
    }],

    userInputs: [{
      key: "val",
      display: "is equal to",
    }],

    fn: (us, cs) => us.val === cs.val,
    display: (us, cs) => `${us.val} = ${cs.val}`
  },

  LT: {
    name: "Less Than",
    columnSlots: [{
      key: "val",
      display: "Column",
      test: n => !isNaN(n),
    }],
    userInputs: [{
      key: "val",
      display: "is less than",
      test: n => !isNaN(n),
    }],
    fn: (us, cs) => parseFloat(cs.val) < parseFloat(us.val),
    display: (us, cs) => `Meeza a display`
  }
};
