import * as moment from "moment";
import { div, span, VNode } from '@cycle/dom';
import { nth, range, findLastIndex } from 'ramda';
import { DataSource, makeDataColumn, OperationSlot } from '../types';
import { discoverTypes, mapRows, populateSlots, compileExpression } from '../lib/data-functions';
import dataTypes from '../lib/data-types';
import { merge, sort, eq, pairs, reverse, round, go } from '../lib/utils';
import { FreeSlot, ColumnSlot, ExpressionSlot } from '../lib/slots';
import { SlotCollector, SlotOperation } from '../components/collectors/slot-collector';
import { SlotPairCollector, SlotPairOperation } from '../components/collectors/slot-pair-collector';
import { Err, Ok } from "../lib/monads/either";

type PartialOperation = {
  [P in keyof SlotOperation]?: SlotOperation[P];
}

interface Deriver extends PartialOperation {
  deriverFn: (dataSource: DataSource, inputs: {[k: string]: any}) => string[],
  display: (source: DataSource, inputs: {[k: string]: any}) => VNode,
  name: string,
  slots: { [k in string]: OperationSlot<any> },
  valid?: (source: DataSource, inputs: {[k: string]: any}) => boolean,
}

const col = (dataSource, cName) =>
  span('.column-name', dataSource.headers[cName]);

const colNameSlot = FreeSlot({ display: 'Column Name', type: dataTypes.NonEmptyString });

const slotsMissing = (slots: {[k: string]: OperationSlot<any>}, inputs: {[k: string]: string}): boolean => {
  return !eq(Object.keys(slots), Object.keys(inputs));
}

const makeDeriver = (def: Deriver): SlotOperation => {
  return merge(def, {
    fn: (dataSource: DataSource, inputs: {[k in string]: string}) => go(function* () {
      if (slotsMissing(def.slots, inputs) || (def.valid && !def.valid(dataSource, inputs))) {
        return Err("invalid input");
      }
      const populated = yield populateSlots(dataSource, def.slots, inputs);
      const vals = def.deriverFn(dataSource, populated);
      return dataSource.appendColumn(makeDataColumn({
        name: inputs.columnName,
        values: vals,
        types: discoverTypes(vals)
      }));
    }),
    collector: SlotCollector,
    help: 'help text',
    tags: def.tags ? def.tags.concat(["deriver"]) : ["deriver"],
  });
}


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


export const Round = makeDeriver({
  name: "Round",
  tags: ["math"],
  slots: {
    columnName: colNameSlot,
    column: ColumnSlot({ display: 'Column', type: dataTypes.FiniteNumber }),
    precision: FreeSlot({ display: 'Precision', type: dataTypes.FiniteNumber }),
  },
  deriverFn: mapRows(({ column, precision }) => round(column, precision).toString()),
  display: (dataSource, inputs) =>
  div({}, [
    'Round ',
    col(dataSource, inputs.column)
  ])
})


export const MapValues: SlotPairOperation = {
  name: 'Map Values',
  tags: [],
  collector: SlotPairCollector,
  fn: (dataSource, inputs: { values: { result: string, condition: string }[], otherwise: string, columnName: string}) => {
    const fn: (row: string[]) => string = reverse(inputs.values).reduce((onion, {condition, result}) => {
      const test = compileExpression(dataSource, condition);
      const out = /\{/.test(result) ? compileExpression(dataSource, result) : _ => result;
      return row => (test(row) === 'true') ? out(row) : onion(row);
    }, _ => inputs.otherwise);

    const values = dataSource.records.map(fn);

    return Ok(dataSource.appendColumn(makeDataColumn({
      values,
      name: inputs.columnName,
      types: discoverTypes(values),
    })));
  },
  display: (dataSource, inputs) => div('Map Values'),
};


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

    fn: (dataSource, inputs) => go(function* () {
      if (slotsMissing(slots, inputs)) { return Err("missing inputs"); }
      const populated = yield populateSlots(dataSource, slots, inputs);
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
      }));
    }),

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
