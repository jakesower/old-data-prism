const R = require('ramda');
const h = require('snabbdom/h').default;

const Slot = require('./slot');
const {select, checkbox, text} = require('./controls');
const multiselect = require('./multiselect');
const daggySwitch = require('../lib/daggy-switch');


module.exports = (action$, slot, pool, value) => {
  const switcher = daggySwitch({
    User: () => daggySwitch({
      _: () => text(value, action$),
      Boolean: () => checkbox(value, action$),
      Enumerated: () => select(value, R.map(v => ({value: v, display: v})), action$)
    })(slot.dataType),
    Column: () => select(value, pool, R.compose(action$, parseInt)),
    Multicolumn: () => multiselect(value, pool, action$)
  });

  return h('div', {class: {slot: true}}, switcher(slot));
}
