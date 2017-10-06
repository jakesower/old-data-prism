const R = require('ramda');
const h = require('snabbdom/h').default;

const Slot = require('../types/slot');
const DataType = require('../types/data-type');
const DataSlot = require('../types/data-slot');
const Column = require('../types/column');

const SlotCollector = require('../components/collectors/slot-collector');
const {populateSlots, validateSlots} = require('../lib/definition-utils');

const withColNameSlot = R.prepend(Slot.Free('columnName', 'Column Name', DataType.String));

const col = R.curry((dataset, cName) =>
  h('span', {class: {"column-name": true}}, dataset.headers[cName])
)

const makeDeriver = def => {
  const colNameSlot = Slot.Free('columnName', 'Column Name', DataType.String);
  const slots = R.prepend(colNameSlot, def.slots);

  return R.merge(def, {
    fn: ({dataset}, inputs) => {
      const populated = populateSlots(dataset, inputs, slots);
      const vals = R.map(x => x.toString(), def.fn(populated));
      return dataset.appendColumn(Column(
        inputs.columnName,
        vals,
        Column.detectSchema(vals)
      ));
    },
    help: 'help text',
    tags: ["deriver"],
    collector: SlotCollector(slots),
    valid: ({dataset}, inputs) => validateSlots(dataset, inputs, slots)
  });
}


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
  display: ({dataset}, inputs) =>
    h('div', {}, [
      'Ceiling ',
      col(dataset, inputs.num)
    ])
});


const Difference = makeDeriver({
  name: "Difference",
  slots: [
    DataSlot.Column('minuend', 'Minuend', DataType.FiniteNumber),
    DataSlot.Column('subtrahend', 'Subtrahend', DataType.FiniteNumber)
  ],
  fn: inputs => R.zipWith(R.subtract, inputs.minuend, inputs.subtrahend),
  display: ({dataset}, inputs) =>
    h('div', {}, [
      col(dataset, inputs.minuend),
      ' - ',
      col(dataset, inputs.subtrahend),
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
  fn: (inputs) => {return R.map(d => d.format(inputs.format), inputs.date)},
  display: ({dataset}, inputs) => `<span class="column-name">${dataset.headers[inputs.date]}</span> with format ${inputs.format}`
});


const Logarithm = makeDeriver({
  name: "Logarithm",
  slots: [
    DataSlot.Column('num', 'Column', DataType.PositiveFiniteNumber),
    Slot.Free('base', 'Base', DataType.PositiveFiniteNumber)
  ],
  fn: ({num, base}) => R.map(n => Math.log(n) / Math.log(base), num),
  display: ({dataset}, {base, num}) =>
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

  fn: (inputs) => {
    const sorted = R.pipe(
      R.map(parseFloat),
      R.sort((a, b) => a - b)
    )(inputs.n);
    const frac = parseFloat(sorted.length) / parseFloat(inputs.order);
    const cutoffs = R.map(
      n => R.nth(Math.ceil(n*frac), sorted),
      R.range(0, parseInt(inputs.order)));

    return R.map(n =>
      R.findLastIndex(m => parseFloat(n) >= m, cutoffs) + 1
      , inputs.n);
  },

  display: ({dataset}, inputs) => {
    const quantileNames = {
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

    const name = quantileNames[inputs.order] || `${inputs.order}-quantile`;
    return h('div', {}, [
      `${name} on `,
      col(dataset, inputs.n)
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
  display: ({dataset}, inputs) =>
    h('div', {}, [
      'Round ',
      col(dataset, inputs.num)
    ])
});


const Sum = makeDeriver({
  name: "Summation",
  slots: [
    DataSlot.Multicolumn('addends', 'Addends', DataType.FiniteNumber)
  ],
  fn: inputs => R.map(R.sum, inputs.addends),
  display: ({dataset}, inputs) => {
    const colSpans = R.map(col(dataset), inputs.addends);
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
