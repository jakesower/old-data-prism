const R = require('ramda');
const h = require('snabbdom/h').default;
const {targetValue} = require('../lib/utils');
const {validColumns} = require('../lib/dataset-functions');

const withBlank = R.prepend(h('option', {}, ''));


const select = (currentValue, options, onChange) => {
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
    {on: {change: R.compose(onChange, targetValue)}},
    withBlank(R.map(option, options))
  );
}


module.exports = {
  select
};
