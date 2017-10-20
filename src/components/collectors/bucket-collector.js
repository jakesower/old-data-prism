const R = require('ramda');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');
const Type = require('union-type');

const slotDom = require('../helpers/slot-dom');


const Action = Type({
  SetComparator: [String],
  SetPoint: [Number, String],
  SetDefault: [String]
});


const init = () => ({
  points: [],
  comparator: '<',
  default: ''
});


const update = Action.caseOn({
  SetComparator: R.assoc('comparator'),
  SetPoint: (key, val, model) => R.assoc(key, val, model),
  SetDefault: R.assoc('default')
});


const view = (action$, dataset, model) => {
  const {points} = model;
  const point$ = i => forwardTo(action$, Action.SetPoint(i));
  const default$ = forwardTo(action$, Action.SetDefault);
  const comparator$ = forwardTo(action$, Action.SetComparator);

  const comparatorSlot = Slot.Pool('comparator', 'Comparator', DataType.String,
    R.map(o => {display: o, value: o}, ['<', '≤', '>', '≥'])
  );

  return h('table', {}, R.reduce(R.concat, [],
    h('tr', {}, [
      h('td', {}, 'Comparator'),
      h('td', {}, slotDom(comparator$, comparatorSlot))
    ]),

    R.addIndex(R.map)(
      (point, idx) => h('tr', {}, [
        h('td', {}, idx === 0 ? model.comparator : points[idx-1]),
        h('td', {}, slotDom(point$(idx), Slot.Anonymous(DataType.Number), point))
      ]),
      points
    ),

    h('tr', {}, [
      h('td', {}, model.comparator),
      h('td', {}, slotDom(point$(n), Slot.Anonymous(DataType.Number), ""))
    ]),

    h('tr', {}, [
      h('td', {}, ''),
      h('td', {}, slotDom(default$, Slot.Anonymous(DataType.Number), ""))
    ])
  ));
}


module.exports = {Action, init, view, update};
