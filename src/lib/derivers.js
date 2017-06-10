const R = require('ramda');
const Type = require('union-type');
const moment = require('moment');
const math = require('mathjs');


module.exports = {
  FormattedDate: {
    name: "Formatted Date",

    columnSlots: [{
      key: "date",
      display: "date",
      test: x => !isNaN(Date.parse(x))
    }],

    userInputs: [{
      key: "format",
      display: "moo"
    }],

    fn: (us, cs) => R.map(d => moment(d).format(us.format), cs.date),
    display: (us, cs) => `Meeza a display`
  },


  Quantile: {
    name: "Quantile",

    columnSlots: [{
      key: "n",
      display: "n",
      test: x => !isNaN(x)
    }],

    userInputs: [{
      key: "order",
      display: "xx",
      test: x => !isNaN(x)
    }],

    fn: (us, cs) => {
      const sorted = cs.n.map(x => parseFloat(x)).sort();
      const frac = parseFloat(sorted.length) / parseFloat(us.order);
      const cutoffs = R.map(
        n => R.nth(Math.ceil(n*frac), sorted),
        R.range(0, us.order));

      return R.map(n =>
        (R.findLastIndex(m => parseFloat(n) >= m, cutoffs) + 1).toString()
        , cs.n);
    },
    display: (us, cs) => `Meeza a display`
  }
};
