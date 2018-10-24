import { div, span, VNode } from '@cycle/dom';
import { Operation, DataSource, makeDataColumn, OperationSlot } from '../types';
import { discoverTypes, mapRows } from '../lib/data-functions';
import dataTypes from '../lib/data-types';
import { merge } from '../lib/utils';
import { FreeSlot, ColumnSlot } from '../lib/slots';
import SlotCollector from '../components/collectors/slot-collector';

type PartialOperation = {
  [P in keyof Operation]?: Operation[P];
}

interface Deriver extends PartialOperation {
  deriverFn: (dataSource: DataSource, inputs: {[k: string]: any}) => string[],
  display: (source: DataSource, inputs: {[k: string]: any}) => VNode,
  name: string,
  slots: { [k in string]: OperationSlot<any> }
}

const col = (dataSource, cName) =>
  span({ class: {"column-name": true }}, dataSource.headers[cName]);

const colNameSlot = FreeSlot({ display: 'Column Name', type: dataTypes.String });

const makeDeriver = (def: Deriver): Operation => {
  return merge(def, {
    fn: (dataSource: DataSource, inputs: {[k in string]: any}) => {
      const vals = def.deriverFn(dataSource, inputs);
      return dataSource.appendColumn(makeDataColumn({
        name: inputs.columnName,
        values: vals,
        types: discoverTypes(vals)
      }));
    },
    help: 'help text',
    tags: ["deriver"],
    collector: SlotCollector,
  });
}


export const AbsoluteValue = makeDeriver({
  name: "Absolute Value",
  tags: ["math"],
  slots: {
    columnName: colNameSlot,
    num: ColumnSlot({ display: 'Column', type: dataTypes.FiniteNumber })
  },
  deriverFn: mapRows(({num}) => Math.abs(num).toString()),
  display: (dataSource, inputs) =>
    div({}, [
      'Absolute Value of ',
      col(dataSource, inputs.num)
    ])
});



// const Ceiling = makeDeriver({
//   name: "Ceiling",
//   tags: ["math"],
//   slots: [
//     DataSlot.Column('num', 'Column', DataType.FiniteNumber),
//     Slot.Free('precision', 'Precision', DataType.Integer)
//   ],
//   fn: ({num, precision}) => {
//     const m = Math.pow(10, precision * -1);
//     return R.map(n => Math.ceil(m*n) / m, num);
//   },
//   display: ({dataSource}, inputs) =>
//     h('div', {}, [
//       'Ceiling ',
//       col(dataSource, inputs.num)
//     ])
// });


// const Exponent = makeDeriver({
//   name: "Exponent",
//   tags: ["math"],
//   slots: [
//     DataSlot.Column('base', 'Base', DataType.FiniteNumber),
//     Slot.Free('exponent', 'Exponent', DataType.FiniteNumber)
//   ],
//   fn: ({base, exponent}) => Math.pow(base, exponent),
//   display: ({dataSource}, inputs) =>
//     h('div', {}, [
//       col(dataSource, inputs.base),
//       h('sup', {}, inputs.exponent)
//     ])
// });


// const Difference = makeDeriver({
//   name: "Difference",
//   tags: ["math"],
//   slots: [
//     DataSlot.Column('minuend', 'Minuend', DataType.FiniteNumber),
//     DataSlot.Column('subtrahend', 'Subtrahend', DataType.FiniteNumber)
//   ],
//   fn: inputs => R.zipWith(R.subtract, inputs.minuend, inputs.subtrahend),
//   display: ({dataSource}, inputs) =>
//     h('div', {}, [
//       col(dataSource, inputs.minuend),
//       ' - ',
//       col(dataSource, inputs.subtrahend),
//     ])
// });


// const Floor = makeDeriver({
//   name: "Floor",
//   tags: ["math"],
//   display: () => "Floor",
//   slots: [
//     DataSlot.Column('num', 'Column', DataType.FiniteNumber),
//     Slot.Free('precision', 'Precision', DataType.Integer)
//   ],
//   fn: ({num, precision}) => {
//     const m = Math.pow(10, precision * -1);
//     return R.map(n => Math.floor(m*n) / m, num);
//   }
// });


// const FormattedDate = makeDeriver({
//   name: "Formatted Date",
//   tags: ["time"],
//   slots: [
//     DataSlot.Column('date', 'Date', DataType.Date),
//     Slot.Free('format', 'Format', DataType.NonEmptyString)
//   ],
//   fn: (inputs) => {return R.map(d => d.format(inputs.format), inputs.date)},
//   display: ({dataSource}, inputs) => `<span class="column-name">${dataSource.headers[inputs.date]}</span> with format ${inputs.format}`
// });


// const Logarithm = makeDeriver({
//   name: "Logarithm",
//   tags: ["math"],
//   slots: [
//     DataSlot.Column('num', 'Column', DataType.PositiveFiniteNumber),
//     Slot.Free('base', 'Base', DataType.PositiveFiniteNumber)
//   ],
//   fn: ({num, base}) => R.map(n => Math.log(n) / Math.log(base), num),
//   display: ({dataSource}, {base, num}) =>
//     h('div', {}, [
//       `Log base ${base} of `,
//       col(dataSource, num)
//     ])
// });


// const Quantile = makeDeriver({
//   name: "Quantile",
//   tags: ["math", "bucketers"],

//   slots: [
//     DataSlot.Column('n', 'n', DataType.FiniteNumber),
//     Slot.Free('order', 'order', DataType.PositiveInteger)
//   ],

//   fn: (inputs) => {
//     const sorted = R.pipe(
//       R.map(parseFloat),
//       R.sort((a, b) => a - b)
//     )(inputs.n);
//     const frac = parseFloat(sorted.length) / parseFloat(inputs.order);
//     const cutoffs = R.map(
//       n => R.nth(Math.ceil(n*frac), sorted),
//       R.range(0, parseInt(inputs.order)));

//     return R.map(n =>
//       R.findLastIndex(m => parseFloat(n) >= m, cutoffs) + 1
//       , inputs.n);
//   },

//   display: ({dataSource}, inputs) => {
//     const quantileNames = {
//       '2': "median groups",
//       '3': "terciles",
//       '4': "quartiles",
//       '5': "quintiles",
//       '6': "sextiles",
//       '7': "septiles",
//       '8': "octiles",
//       '10': "deciles",
//       '12': "duo-deciles",
//       '16': "hexadeciles",
//       '20': "ventiles",
//       '100': "percentiles",
//       '1000': "permilles"
//     };

//     const name = quantileNames[inputs.order] || `${inputs.order}-quantile`;
//     return h('div', {}, [
//       `${name} on `,
//       col(dataSource, inputs.n)
//     ]);
//   }
// });

// const Round = makeDeriver({
//   name: "Round",
//   tags: ["math"],
//   slots: [
//     DataSlot.Column('num', 'Column', DataType.FiniteNumber),
//     Slot.Free('precision', 'Precision', DataType.Integer)
//   ],
//   fn: ({num, precision}) => {
//     const m = Math.pow(10, precision * -1);
//     return R.map(n => Math.round(m*n) / m, num);
//   },
//   display: ({dataSource}, inputs) =>
//     h('div', {}, [
//       'Round ',
//       col(dataSource, inputs.num)
//     ])
// });


// const Sum = makeDeriver({
//   name: "Summation",
//   tags: ["math"],
//   slots: [
//     DataSlot.Multicolumn('addends', 'Addends', DataType.FiniteNumber)
//   ],
//   fn: inputs => R.map(R.sum, inputs.addends),
//   display: ({dataSource}, inputs) => {
//     const colSpans = R.map(col(dataSource), inputs.addends);
//     return h('div', {}, R.flatten([
//       "Sum of ",
//       R.intersperse(', ', colSpans)
//     ]))
//   }
// });


// module.exports = {
//   AbsoluteValue,
//   Ceiling,
//   Difference,
//   Exponent,
//   Floor,
//   FormattedDate,
//   Logarithm,
//   Quantile,
//   Round,
//   Sum,
// };
