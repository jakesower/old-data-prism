const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');
const {targetValue} = require('../lib/utils');

const withBlank = R.prepend(h('option', {}, ''));


const single = R.curry(function(items, action$, selected) {
  const option = item => {
    return h('option', {
      attrs: {
        selected: (item.val === selected),
        value: item.val
      }},
      item.display);
  };

  return h('select',
    { on: {change: R.compose(action$, targetValue)} },
    withBlank(S.map(option, items))
  );
});


const multi = R.curry(function(items, action$, selected) {
  const update = R.curry((idx, val) =>
    val === '' ? R.update(idx, val, selected) : R.remove(idx, 1, selected));

  const existing = R.addIndex(R.map)((val, idx) =>
    single(items, forwardTo(action$, update(idx)), val),
    selected);

  const newItem = single(items, forwardTo(action$, R.append(R.__, selected)), '');

  return h('div', {}, R.flatten([existing, newItem]));
});


const multi2 = R.curry(function(items, action$, selected) {
  return h('div', {class: {multiselect: true}}, [
    h('div', {class: {placeholder: true}}, 'Plz Chuuz'),
    h('div', {class: {items: true}},
      R.map(i => h('div', {class: {item: true}}, i.display), items)
    )
  ])
});


module.exports = { single, multi: multi2 };
