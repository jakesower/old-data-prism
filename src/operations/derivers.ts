import * as moment from "moment";
import { div, span, VNode } from '@cycle/dom';
import { nth, range, findLastIndex } from 'ramda';
import { DataSource, makeDataColumn, OperationSlot } from '../types';
import { discoverTypes, mapRows, populateSlots } from '../lib/data-functions';
import dataTypes from '../lib/data-types';
import { merge, sort, eq, pairs } from '../lib/utils';
import { FreeSlot, ColumnSlot, ExpressionSlot } from '../lib/slots';
import { SlotCollector, SlotOperation } from '../components/collectors/slot-collector';

type PartialOperation = {
  [P in keyof SlotOperation]?: SlotOperation[P];
}

interface Deriver extends PartialOperation {
  deriverFn: (dataSource: DataSource, inputs: {[k: string]: any}) => string[],
  display: (source: DataSource, inputs: {[k: string]: any}) => VNode,
  name: string,
  slots: { [k in string]: OperationSlot<any> }
}

const col = (dataSource, cName) =>
  span('.column-name', dataSource.headers[cName]);

const colNameSlot = FreeSlot({ display: 'Column Name', type: dataTypes.NonEmptyString });

const validateSlots = (slots: {[k: string]: OperationSlot<any>}) => (dataSource: DataSource, inputs: {[k: string]: string}): boolean => {
  console.log({ a: Object.keys(slots), b: Object.keys(inputs)})
  if (!eq(Object.keys(slots), Object.keys(inputs))) { return false; }
  console.log(pairs(inputs).forEach(([k, input]) => console.log({ k, input, x: slots[k].isValid(dataSource, input)})))
  return pairs(inputs).every(([k, input]) => slots[k].isValid(dataSource, input));
}

const makeDeriver = (def: Deriver): SlotOperation => {
  return merge(def, {
    fn: (dataSource: DataSource, inputs: {[k in string]: string}) => {
      const populated = populateSlots(dataSource, def.slots, inputs);
      const vals = def.deriverFn(dataSource, populated);
      return dataSource.appendColumn(makeDataColumn({
        name: inputs.columnName,
        values: vals,
        types: discoverTypes(vals)
      }));
    },
    collector: SlotCollector,
    help: 'help text',
    tags: def.tags ? def.tags.concat(["deriver"]) : ["deriver"],
    valid: (ds, i) => validateSlots(def.slots)(ds, i) && (def.valid ? def.valid(ds, i) : true),
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


export const Expression = makeDeriver({
  name: "Expression",
  tags: ["math"],
  slots: {
    columnName: colNameSlot,
    expression: ExpressionSlot({ display: "Expression" }),
  },
  deriverFn: (_, inputs) => inputs.expression,
  display: (_, inputs) => div(['Expression Column ', span('.column-name', inputs.columnName)]),
});


export const Index = makeDeriver({
  name: "Index",
  slots: {
    columnName: colNameSlot,
  },
  deriverFn: (dataSource, _) => dataSource.records.map((_, idx) => (idx+1).toString()),
  display: _ => div('Add Index'),
})



export const FormatDate = makeDeriver({
  name: "Format Date",
  tags: ["date", "time"],
  slots: {
    columnName: colNameSlot,
    date: ColumnSlot({ display: 'Column', type: dataTypes.Date }),
    format: FreeSlot({ display: 'Format', type: dataTypes.String })
  },
  deriverFn: mapRows(({ date, format }) => date.format(format)),
  display: (dataSource, inputs) =>
    div({}, [
      'Formatted ',
      col(dataSource, inputs.num)
    ])
});


export const ParseDate = makeDeriver({
  name: "Parse Date",
  tags: ["date", "time"],
  slots: {
    columnName: colNameSlot,
    date: ColumnSlot({ display: 'Column', type: dataTypes.String }),
    format: FreeSlot({ display: 'Pattern', type: dataTypes.String })
  },
  deriverFn: mapRows(({ date, format }) => moment(date, format).toString()),
  display: (dataSource, inputs) =>
    div({}, [
      'Formatted ',
      col(dataSource, inputs.num)
    ])
});


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



export const Quantile: SlotOperation = (function () {
  const slots = {
    columnName: colNameSlot,
    column: ColumnSlot({ display: 'Column', type: dataTypes.FiniteNumber }),
    order: FreeSlot({ display: 'Order', type: dataTypes.PositiveFiniteNumber }),
  };

  return {
    name: "Quantile",
    tags: ["math", "bucketers"],
    collector: SlotCollector,
    slots,
    valid: validateSlots(slots),

    fn: (dataSource, inputs) => {
      const populated = populateSlots(dataSource, slots, inputs);
      const sorted = sort(populated.column);
      const frac = sorted.length / populated.order;
      const cutoffs = range(0, parseInt(populated.order)).map(
        n => nth(Math.ceil(n*frac), sorted)
      );

      const qCol = populated.column.map(n => (findLastIndex((m: number) => parseFloat(n) >= m, cutoffs) + 1).toString());
      return dataSource.appendColumn(makeDataColumn({
        name: populated.columnName,
        values: qCol,
        types: discoverTypes(qCol) // TODO
      }))
    },

    display: (dataSource, inputs) => {
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
      return div({}, [
        `${name} on `,
        col(dataSource, inputs.column)
      ]);
    }
  }
}());

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

// name: "Absolute Value",
// tags: ["math"],
// slots: {
//   columnName: colNameSlot,
//   num: ColumnSlot({ display: 'Column', type: dataTypes.FiniteNumber })
// },
// deriverFn: mapRows(({num}) => Math.abs(num).toString()),
// display: (dataSource, inputs) =>
//   div({}, [
//     'Absolute Value of ',
//     col(dataSource, inputs.num)
//   ])

// const Sum = makeDeriver({
//   name: "Summation",
//   tags: ["math"],
//   slots: {
//     columnName: colNameSlot,
//     addends: MultiColumnSlot({ display: 'Column', type: dataTypes.FiniteNumber }),
//   },
//   deriverFn: mapRows(({addends}) => R.map(R.sum, inputs.addends),
//   display: (dataSource, inputs) => {
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
