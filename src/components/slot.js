const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');
const {targetValue} = require('../lib/utils');
const multiselect = require('./multiselect');

const withBlank = R.prepend(h('option', {}, ''));


const slotWrapper = (title, vdom) => {
  return h('div', {class: {slot: true}}, [
    h('h3', {}, title),
    vdom
  ])
}


const moo = (slot, currentValue, events) => {
  const handlers = {user, column, multicolumn};
  return slotWrapper(slot.display, handler(slot, currentValue, events));
}


const user = (slot, currentValue, events) => {
  const attrs = {
    value: currentValue,
    type: slot.dataType.htmlInputType || "text",
    pattern: slot.dataType.htmlPattern
  };

  const classes = {
    invalid: !slot.dataType.test(currentValue),
    empty: currentValue === ''
  };

  return slotWrapper(slot.display,
    h('input', {
      attrs: R.filter(R.complement(R.isNil), attrs),
      on: events,
      class: classes
    }, [])
  );
}


const column = (title, currentValue, options, events) => {
  const option = item => {
    return h('option', {
      attrs: {
        selected: (item.val === currentValue),
        value: item.val
      }},
      item.display);
  };

  return slotWrapper(title,
    h(
      'select',
      {on: events},
      withBlank(S.map(option, options))
    )
  );
}


const multicolumn = (title, currentValues, options, events) => {
  const option = item => {
    return h('div', {}, item.display);
  };

  return slotWrapper(title,
    h('div',
      {class: {multicolumn: true}},
      multiselect(options, currentValues, events)
    )
  )
}


module.exports = {user, column, multicolumn};
