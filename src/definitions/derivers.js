const R = require('ramda');
const h = require('snabbdom/h').default;

const Slot = require('../types/slot');
const DataType = require('../types/data-type');
const DataSlot = require('../types/data-slot');
const Column = require('../types/column');

const SlotCollector = require('../components/slot-collector');

const notEmpty = R.complement(R.empty);

const withKeys = R.mapObjIndexed((v, key) => R.merge({key}, v));
const col = R.curry((dataset, cName) =>
  h('span', {class: {"column-name": true}}, dataset.headers[cName]));

const makeDeriver = def =>
  R.merge(def, {
    fn: (dataset, inputs, columnName) => {
      return dataset.appendColumn(Column(
        columnName,
        R.map(x => x.toString(), def.fn(inputs))
      ))
    }
  })


const Floor = (function() {
  const slots = [
    Slot.Free('columnName', 'Column Name', DataType.String),
    DataSlot.Column('num', 'Column', DataType.FiniteNumber),
    DataSlot.User('precision', 'Precision', DataType.Integer)
  ];

  return {
    name: "Floor",

    collector: SlotCollector(slots),

    fn: (dataset, inputs) => {
      const f = ({num, precision}) => {
        const m = Math.pow(10, precision * -1);
        return R.map(n => Math.floor(m*n) / m, num);
      }

      const populated = R.pipe(
        R.map(slot => ({
          [slot.id]: DataSlot.is(slot) ?
            slot.populate(dataset, inputs[slot.id]) :
            slot.populate(inputs[slot.id]),
        })),
        R.mergeAll
      )(slots);

      return dataset.appendColumn(Column(
        inputs.columnName,
        R.map(x => x.toString(), f(populated))
      ))
    },

    display: (dataset, inputs) =>
      h('div', {}, [
        'Floor ',
        col(dataset, inputs.num)
      ]),

    valid: (dataset, inputs) => R.all(
      slot => Slot.is(slot) ?
        slot.valid(inputs[slot.id]) :
        slot.valid(dataset, inputs[slot.id]),
      slots
    )
  }
}());


// const transforms = R.pipe(
//   R.map(R.merge({createsColumn: true})),
//   R.map(makeDeriver),
//   withKeys
// );
const transforms = R.identity;

module.exports = transforms({
  Floor,
  // FormattedDate,
  // Quantile,
  // Sum,
  // Difference,
  // Round,
  // Ceiling,
  // Logarithm,
});
