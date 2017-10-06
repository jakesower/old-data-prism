const R = require('ramda');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');
const Type = require('union-type');

const slotDom = require('../helpers/slot-dom');
const daggySwitch = require('../../lib/daggy-switch');


module.exports = slots => {
  const Action = Type({
    SetInput: [String, () => true]
  });

  const init = () => R.pipe(
    R.map(slot => ({[slot.id]: slot.defaultValue()})),
    R.mergeAll
  )(slots);

  const update = Action.caseOn({
    SetInput: (key, val, model) => R.assoc(key, val, model)
  });

  const view = (action$, dataset, model) => {
    const slotStream = slot => forwardTo(action$, Action.SetInput(slot.id));

    return h('div', {},
      R.map(slot => {
        return h('div', {class: {slot: true}}, [
          h('h3', {}, slot.display),
          slotDom(slotStream(slot), slot.toSlot(dataset), model[slot.id])
        ])}, slots)
    );
  }

  return {Action, init, view, update};
}
