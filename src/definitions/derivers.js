const R = require('ramda');
const h = require('snabbdom/h').default;

const DataType = require('../types/data-type');
const Slot = require('../types/slot');

const notEmpty = R.complement(R.empty);

const withKeys = R.mapObjIndexed((v, key) => R.merge({key}, v));
const col = R.curry((dataset, cName) =>
  h('span', {class: {"column-name": true}}, dataset.headers[cName]));

const makeDeriver = def =>
  R.merge(def, {
    fn: (dataset, inputs, columnName) => {
      // console.log({dataset, inputs})
      return dataset.appendColumn(Column(
        columnName,
        R.map(x => x.toString(), def.fn(inputs))
      ))
    }
  })


const FormattedDate = {
  name: "Formatted Date",

  slots: [
    Slot.Column('date', 'Date', DataType.Date),
    Slot.User('format', 'Format', DataType.NonEmptyString)
  ],

  fn: (args) => {return R.map(d => d.format(args.format), args.date)},
  display: (args, dataset) => `<span class="column-name">${dataset.headers[args.date]}</span> with format ${args.format}`
};


const Quantile = {
  name: "Quantile",

  slots: [
    Slot.Column('n', 'n', DataType.FiniteNumber),
    Slot.User('order', 'order', DataType.PositiveInteger)
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
  slots: [
    Slot.Multicolumn('addends', 'Addends', DataType.FiniteNumber)
  ],

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
    Slot.Column('minuend', 'Minuend', DataType.FiniteNumber),
    Slot.Column('subtrahend', 'Subtrahend', DataType.FiniteNumber)
  ],

  fn: args => R.zipWith(R.subtract, args.minuend, args.subtrahend),
  display: (args, dataset) =>
    h('div', {}, [
      col(dataset, args.minuend),
      ' - ',
      col(dataset, args.subtrahend),
    ])
};


const Round = {
  name: "Round",

  slots: [
    Slot.Column('num', 'Column', DataType.FiniteNumber),
    Slot.User('precision', 'Precision', DataType.Integer)
  ],

  fn: ({num, precision}) => {
    const m = Math.pow(10, precision * -1);
    return R.map(n => Math.round(m*n) / m, num);
  },
  display: (args, dataset) =>
    h('div', {}, [
      'Round ',
      col(dataset, args.num)
    ])
}


const Floor = {
  name: "Floor",

  slots: [
    Slot.Column('num', 'Column', DataType.FiniteNumber),
    Slot.User('precision', 'Precision', DataType.Integer)

  ],

  fn: ({num, precision}) => {
    const m = Math.pow(10, precision * -1);
    return R.map(n => Math.floor(m*n) / m, num);
  },
  display: (args, dataset) =>
    h('div', {}, [
      'Floor ',
      col(dataset, args.num)
    ])
}


const Ceiling = {
  name: "Ceiling",

  slots: [
    Slot.Column('num', 'Column', DataType.FiniteNumber),
    Slot.User('precision', 'Precision', DataType.Integer)
  ],

  fn: ({num, precision}) => {
    const m = Math.pow(10, precision * -1);
    return R.map(n => Math.ceil(m*n) / m, num);
  },
  display: (args, dataset) =>
    h('div', {}, [
      'Ceiling ',
      col(dataset, args.num)
    ])
}


const Logarithm = {
  name: "Logarithm",

  slots: [
    Slot.Column('num', 'Column', DataType.PositiveFiniteNumber),
    Slot.User('base', 'Base', DataType.PositiveFiniteNumber)
  ],

  // NOTE: this could benefit from "exit" checking to ensure the result is
  // actually a number and not NaN
  fn: ({num, base}) => {
    const den = Math.log(base);
    return R.map(n => Math.log(n) / den, num);
  },

  display: ({base, num}, dataset) =>
    h('div', {}, [
      `Log base ${base} of `,
      col(dataset, num)
    ])
}


const transforms = R.pipe(
  R.map(R.merge({createsColumn: true})),
  R.map(makeDeriver),
  withKeys
);

module.exports = transforms({
  FormattedDate,
  Quantile,
  Sum,
  Difference,
  Round,
  Floor,
  Ceiling,
  Logarithm,
});
