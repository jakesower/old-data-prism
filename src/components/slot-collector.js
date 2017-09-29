const R = require('ramda');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');
const Type = require('union-type');

const {select, checkbox, text, multiselect} = require('./controls');
const daggySwitch = require('../lib/daggy-switch');


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
          slotVdom(slotStream(slot), slot.toSlot(dataset), model[slot.id])
        ])}, slots)
    );
  }

  return {Action, init, view, update};
}


function slotVdom(action$, slot, value) {
  const switcher = daggySwitch({
    Free: () => daggySwitch({
      _: () => text(value, action$),
      Boolean: () => checkbox(value, action$),
      Enumerated: () => select(value, R.map(v => ({value: v, display: v})), action$)
    })(slot.dataType),
    Anonymous: () => text(value, action$),
    Pool: () => select(value, slot.pool, action$),
    Multipool: () => multiselect(value, slot.pool, action$)
  });

  return h('div', {class: {slot: true}}, switcher(slot));
}
