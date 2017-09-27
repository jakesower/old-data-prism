const R = require('ramda');
const h = require('snabbdom/h').default;

const {select, checkbox, text, multiselect} = require('./controls');
const daggySwitch = require('../lib/daggy-switch');


module.exports = (action$, slot, value) => {
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
