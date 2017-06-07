const R = require('ramda');
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

    fn: (us, cs) => moment(cs.date).format(us.format)
  }
};
