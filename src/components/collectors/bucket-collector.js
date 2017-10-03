const R = require('ramda');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');
const Type = require('union-type');

const slotDom = require('./helpers/slot-dom');


const Action = Type({
  SetPoint: [Number, String]
});


const init = () => ({
  points: []
});


const update = Action.caseOn({
  SetPoint: (key, val, model) => R.assoc(key, val, model)
});


const view = (action$, dataset, model) => {
  const {points} = model;
  const point$ = i => forwardTo(action$, Action.SetPoint(i));

  const existing = R.addIndex(R.map)(
    (point, idx) => h('tr', {}, [
      h('td', {}, idx === 0 ? "less than" : points[idx-1]),
      h('td', {}, 'to'),
      h('td', {}, slotDom(point$(idx), Slot.Anonymous(DataType.Number), point))
    ]),
    points
  );

  const n = R.length(points);
  const newPoint = h('tr', {}, [
    h('td', {}, n === 0 ? "" : points[n-1]),
    h('td', {}, n === 0 ? "" : "to"),
    h('td', {}, slotDom(point$(n), Slot.Anonymous(DataType.Number), ""))
  ]);

  return h('table', {}, R.append(newPoint, existing));
}


module.exports = {Action, init, view, update};
