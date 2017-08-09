const R = require('ramda');
const h = require('snabbdom/h').default;
const moment = require('moment');

const notEmpty = R.complement(R.empty);
const dataTypes = require('./data');
const {appendColumn} = require('../lib/dataset-functions');

const withKeys = R.mapObjIndexed((v, key) => R.merge({key}, v));
const col = R.curry((dataset, cName) =>
  h('span', {class: {"column-name": true}}, dataset.headers[cName]));

const makeDeriver = fn =>
  (dataset, inputs) => {
    return appendColumn(dataset, {
      header: inputs.colName,
      values: fn(inputs)
    })
  }


const FormattedDate = {
  name: "Formatted Date",

  slots: [
    { sourceType: "column",
      dataType: dataTypes.Date,
      key: "date",
      display: "date",
    },
    { sourceType: "user",
      dataType: dataTypes.NonEmptyString,
      key: "format",
      display: "format",
    }
  ],

  fn: (args) => R.map(d => d.format(args.format), args.date),
  display: (args, dataset) => `<span class="column-name">${dataset.headers[args.date]}</span> with format ${args.format}`
};


const Quantile = {
  name: "Quantile",

  slots: [
    { sourceType: "column",
      dataType: dataTypes.FiniteNumber,
      key: "n",
      display: "n",
    },
    { sourceType: "user",
      dataType: dataTypes.FiniteNumber,
      key: "order",
      display: "order",
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
      R.findLastIndex(m => parseFloat(n) >= m, cutoffs) + 1
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
    dataType: dataTypes.FiniteNumber,
    sourceType: "multicolumn"
  }],

  fn: args => R.map(R.sum, args.addends),
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
      sourceType: "column",
      dataType: dataTypes.FiniteNumber,
    },
    { key: "subtrahend",
      display: "subtrahend",
      dataType: dataTypes.FiniteNumber,
      sourceType: "column"
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
  sourceType: "user",
  key: "colName",
  display: "Column Name",
  dataType: dataTypes.NonEmptyString,
};

const mergeDefaults = def => {
  return R.evolve({
    slots: R.append(colNameSlot)
  }, def)
}

module.exports = withKeys(R.map(mergeDefaults, {
  FormattedDate,
  Quantile,
  Sum,
  Difference
}));
