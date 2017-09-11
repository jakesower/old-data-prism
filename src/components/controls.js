const R = require('ramda');
const h = require('snabbdom/h').default;
const {targetValue} = require('../lib/utils');
const {validColumns} = require('../lib/dataset-functions');

const withBlank = R.prepend(h('option', {}, ''));


const select = (currentValue, options, change$) => {
  const option = item => {
    return h('option', {
      attrs: {
        selected: (item.val === currentValue),
        value: item.val
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


module.exports = {
  select,
  checkbox,
};
