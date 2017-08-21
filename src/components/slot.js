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


const user = (title, currentValue, events) => {
  return slotWrapper(title,
    h('input', {
      attrs: {value: currentValue},
      on: events
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
