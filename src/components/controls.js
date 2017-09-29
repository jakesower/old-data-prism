const R = require('ramda');
const h = require('snabbdom/h').default;
const {targetValue} = require('../lib/utils');
const multiselect = require('./multiselect');

const withBlank = R.prepend(h('option', {}, ''));


const select = (currentValue, options, change$) => {
  const option = item => {
    return h('option', {
      attrs: {
        selected: (item.value.toString() === currentValue),
        value: item.value
      }},
      item.display);
  };

  return h(
    'select',
    {on: {change: R.compose(change$, targetValue)}},
    withBlank(R.map(option, options))
  );
}


const checkbox = (currentValue, change$) => {
  return h(
    'input',
    { attrs: {type: 'checkbox'}
    , on: {click: R.compose(change$, cb => cb.target.checked)}
    }
  )
}


const text = (currentValue, change$) => {
  return h(
    'input',
    { attrs: {type: 'text', value: currentValue}
    , on: {keyup: R.compose(change$, targetValue)}
    }
  )
}


module.exports = {
  select,
  multiselect,
  checkbox,
  text,
};
