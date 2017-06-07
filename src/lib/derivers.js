const R = require('ramda');
const Type = require('union-type');
const moment = require('moment');
const math = require('mathjs');


module.exports = {
  FormattedDate: {
    name: "Formatted Date",

    columnSlots: [{
      name: "date",
      test: x => !isNaN(Date.parse(x))
    }],

    userInputs: [{
      name: "format",
      key: "format"
    }],

    fn: (us, cs) => R.map(d => moment(d).format(us.format), cs.date)
  },


  Quantile: {
    name: "Quantile",

    columnSlots: [{
      name: "n",
      test: x => !isNaN(x)
    }],

    userInputs: [{
      name: "order",
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
    }
  }
};
