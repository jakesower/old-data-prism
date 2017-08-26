const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');
const {targetValue} = require('../lib/utils');
const {validColumns} = require('../lib/dataset-functions');
const {select} = require('./controls');
const multiselect = require('./multiselect');

const withBlank = R.prepend(h('option', {}, ''));
const columnOptions = col => ({val: col.index, display: col.header});
const fixedOptions = opt => ({val: opt, display: opt});


const slotWrapper = R.curry((title, vdom) => {
  return h('div', {class: {slot: true}}, [
    h('h3', {}, title),
    vdom
  ])
})


const build = R.curry((slot, inputs, dataset, onChange) => {
  const sw = slotWrapper(slot.display);

  switch (slot.sourceType) {
    case 'user':
      return sw(user(slot, inputs, onChange));
    case 'column':
      return sw(column(
        inputs[slot.key],
        R.map(columnOptions, validColumns(dataset, slot.dataType)),
        onChange
      ));
    case 'multicolumn':
      return sw(multicolumn(
        inputs[slot.key],
        R.map(columnOptions, validColumns(dataset, slot.dataType)),
        onChange
      ));
  }
});


const user = (slot, inputs, onChange) => {
  return slot.dataType.key === 'Enumerated' ?
    column(
      inputs[slot.key],
      R.map(fixedOptions, slot.dataType.values),
      onChange
    ) :
    textBox(slot, inputs[slot.key], onChange)
}


const textBox = (slot, currentValue, onChange) => {
  const attrs = {
    value: currentValue,
    type: slot.dataType.htmlInputType || "text",
    pattern: slot.dataType.htmlPattern
  };

  const classes = {
    invalid: !slot.dataType.test(currentValue),
    empty: currentValue === ''
  };

  return h('input', {
    attrs: R.filter(R.complement(R.isNil), attrs),
    on: {keyup: R.compose(onChange, targetValue)},
    class: classes
  }, [])
}


const column = (currentValue, options, onChange) => {
  return select(
    currentValue,
    options,
    R.compose(onChange, parseInt)
  );
}


const multicolumn = (currentValues, options, onChange) => {
  const option = item => {
    return h('div', {}, item.display);
  };

  return h('div',
    {class: {multicolumn: true}},
    multiselect(options, currentValues, {change: onChange})
  );
}


module.exports = {
  build,
  slotWrapper,
  multicolumn: (t, cv, o, e) => slotWrapper(t, multicolumn(cv, o, e)),
  user: (t, s, cv, e) => slotWrapper(t, textBox(s, cv, e))
};
