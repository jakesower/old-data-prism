const R = require('ramda');
const h = require('snabbdom/h').default;
const moment = require('moment');

const notEmpty = R.complement(R.empty);

const col = R.curry((dataset, cName) =>
  h('span', {class: {"column-name": true}}, dataset.headers[cName]));


const FormattedDate = {
  name: "Formatted Date",

  slots: [
    { type: "column",
      key: "date",
      display: "date",
      test: x => !isNaN(Date.parse(x))
    },
    { type: "user",
      key: "format",
      display: "format",
      test: notEmpty
    }
  ],

  fn: (args) => R.map(d => moment(d).format(args.format), args.date),
  display: (args, dataset) => `<span class="column-name">${dataset.headers[args.date]}</span> with format ${args.format}`
};


const Quantile = {
  name: "Quantile",

  slots: [
    { type: "column",
      key: "n",
      display: "n",
      test: x => !isNaN(x)
    },
    { type: "user",
      key: "order",
      display: "order",
      test: x => !isNaN(x)
    }
  ],

  fn: (args) => {
    const sorted = R.pipe(
      R.map(parseFloat),
      R.sort((a, b) => a - b)
    )(args.n);
    const frac = parseFloat(sorted.length) / parseFloat(args.order);
    const cutoffs = R.map(
      n => R.nth(Math.ceil(n*frac), sorted),
      R.range(0, parseInt(args.order)));

    return R.map(n =>
      (R.findLastIndex(m => parseFloat(n) >= m, cutoffs) + 1).toString()
      , args.n);
  },
  display: (args, dataset) => {
    const quartileNames = {
      '2': "median groups",
      '3': "terciles",
      '4': "quartiles",
      '5': "quintiles",
      '6': "sextiles",
      '7': "septiles",
      '8': "octiles",
      '10': "deciles",
      '12': "duo-deciles",
      '16': "hexadeciles",
      '20': "ventiles",
      '100': "percentiles",
      '1000': "permilles"
    };

    const name = quartileNames[args.order] || `${args.order}-quantile`;
    return h('div', {}, [
      `${name} on `,
      col(dataset, args.n)
    ]);
  }
};


const Sum = {
  name: "Summation",

  userInputs: [],
  slots: [{
    key: "addends",
    display: "addends",
    test: n => !isNaN(n),
    type: "multicolumn"
  }],

  fn: args => R.map(x => R.sum(x).toString(), args.addends),
  display: (args, dataset) => {
    const colSpans = R.map(col(dataset), args.addends);
    return h('div', {}, R.flatten([
      "Sum of ",
      R.intersperse(', ', colSpans)
    ]))
  }
}


const Difference = {
  name: "Difference",

  slots: [
    { key: "minuend",
      display: "minuend",
      test: n => !isNaN(n),
      type: "column"
    },
    { key: "subtrahend",
      display: "subtrahend",
      test: n => !isNaN(n),
      type: "column"
    }
  ],

  fn: args => R.zipWith(R.subtract, args.minuend, args.subtrahend),
  display: (args, dataset) =>
    h('div', {}, [
      col(dataset, args.minuend),
      ' - ',
      col(dataset, args.subtrahend),
    ])

}


const colNameSlot = {
  type: "user",
  key: "colName",
  display: "Column Name",
  test: notEmpty
};

const mergeDefaults = def => {
  return R.evolve({
    slots: R.append(colNameSlot)
  }, def)
}

module.exports = R.map(mergeDefaults, {
  FormattedDate,
  Quantile,
  Sum,
  Difference
});
