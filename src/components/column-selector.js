import R from 'ramda';
import S from 'sanctuary';
import { default as h  } from 'snabbdom/h';
import forwardTo from 'flyd-forwardto';
import { targetValue } from '../lib/utils';

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


export { single, multi };
