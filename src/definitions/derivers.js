const R = require('ramda');
const h = require('snabbdom/h').default;

const Slot = require('../types/slot');
const DataType = require('../types/data-type');
const DataSlot = require('../types/data-slot');
const Column = require('../types/column');

const SlotCollector = require('../components/slot-collector');
const {populateSlots, validateSlots} = require('../lib/definition-utils');

const withColNameSlot = R.prepend(Slot.Free('columnName', 'Column Name', DataType.String));

const col = R.curry((dataset, cName) =>
  h('span', {class: {"column-name": true}}, dataset.headers[cName]));


const makeDeriver = def =>
  R.merge(def, {
    fn: (dataset, inputs) => {
      const populated = populateSlots(dataset, inputs, withColNameSlot(def.slots));
      return dataset.appendColumn(Column(
        inputs.columnName,
        R.map(x => x.toString(), def.fn(populated))
      ));
    },
    tags: ["deriver"],
    collector: SlotCollector(withColNameSlot(def.slots)),
    valid: (dataset, inputs) => validateSlots(dataset, inputs, withColNameSlot(def.slots))
  });


const Ceiling = makeDeriver({
  name: "Ceiling",
  slots: [
    DataSlot.Column('num', 'Column', DataType.FiniteNumber),
    Slot.Free('precision', 'Precision', DataType.Integer)
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
});


const Difference = makeDeriver({
  name: "Difference",
  slots: [
    DataSlot.Column('minuend', 'Minuend', DataType.FiniteNumber),
    DataSlot.Column('subtrahend', 'Subtrahend', DataType.FiniteNumber)
  ],
  fn: args => R.zipWith(R.subtract, args.minuend, args.subtrahend),
  display: (args, dataset) =>
    h('div', {}, [
      col(dataset, args.minuend),
      ' - ',
      col(dataset, args.subtrahend),
    ])
});


const Floor = makeDeriver({
  name: "Floor",
  display: () => "Floor",
  slots: [
    DataSlot.Column('num', 'Column', DataType.FiniteNumber),
    Slot.Free('precision', 'Precision', DataType.Integer)
  ],
  fn: ({num, precision}) => {
    const m = Math.pow(10, precision * -1);
    return R.map(n => Math.floor(m*n) / m, num);
  }
});


const FormattedDate = makeDeriver({
  name: "Formatted Date",
  slots: [
    DataSlot.Column('date', 'Date', DataType.Date),
    Slot.Free('format', 'Format', DataType.NonEmptyString)
  ],
  fn: (args) => {return R.map(d => d.format(args.format), args.date)},
  display: (args, dataset) => `<span class="column-name">${dataset.headers[args.date]}</span> with format ${args.format}`
});


const Logarithm = makeDeriver({
  name: "Logarithm",
  slots: [
    DataSlot.Column('num', 'Column', DataType.PositiveFiniteNumber),
    Slot.Free('base', 'Base', DataType.PositiveFiniteNumber)
  ],
  fn: ({num, base}) => R.map(n => Math.log(n) / Math.log(base), num),
  display: ({base, num}, dataset) =>
    h('div', {}, [
      `Log base ${base} of `,
      col(dataset, num)
    ])
});


const Quantile = makeDeriver({
  name: "Quantile",

  slots: [
    DataSlot.Column('n', 'n', DataType.FiniteNumber),
    Slot.Free('order', 'order', DataType.PositiveInteger)
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
});

const Round = makeDeriver({
  name: "Round",
  slots: [
    DataSlot.Column('num', 'Column', DataType.FiniteNumber),
    Slot.Free('precision', 'Precision', DataType.Integer)
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
});


const Sum = makeDeriver({
  name: "Summation",
  slots: [
    DataSlot.Multicolumn('addends', 'Addends', DataType.FiniteNumber)
  ],
  fn: args => R.map(R.sum, args.addends),
  display: (args, dataset) => {
    const colSpans = R.map(col(dataset), args.addends);
    return h('div', {}, R.flatten([
      "Sum of ",
      R.intersperse(', ', colSpans)
    ]))
  }
});


module.exports = {
  Ceiling,
  Difference,
  Floor,
  FormattedDate,
  Logarithm,
  Quantile,
  Round,
  Sum,
};
