const R = require('ramda');
const Type = require('union-type');
const moment = require('moment');


module.exports = {
  FormattedDate: {
    name: "Formatted Date",

    columnSlots: [{
      name: "date",
      test: x => !isNan(Date.parse(x))
    }],
    userInputs: [{
      name: "format",
      key: "format"
    }],

    fn: (us, cs) => R.map(d => moment(d).format(us.format), cs.date)
  }
};
