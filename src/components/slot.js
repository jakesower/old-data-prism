const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');
const {targetValue} = require('../lib/utils');
const {validColumns} = require('../lib/dataset-functions');
const {select, checkbox} = require('./controls');
const multiselect = require('./multiselect');

const withBlank = R.prepend(h('option', {}, ''));
const columnOptions = (col, idx) => ({value: idx, display: col.header});
const fixedOptions = opt => ({val: opt, display: opt});


const slotWrapper = R.curry((title, vdom) => {
  return h('div', {class: {slot: true}}, [
    h('h3', {}, title),
    vdom
  ])
})


const build = R.curry((slot, inputs, dataset, change$) => {
  const sw = slotWrapper(slot.display);
  // console.log({slot, t: slot['@@tag']})
  // console.log(slot)
  // console.log(dataset.validColumns(slot.dataType))

  switch (slot['@@tag']) {
    case 'User':
      return sw(user(slot, inputs, change$));
    case 'Column':
      return sw(column(
        inputs[slot.id],
        R.addIndex(R.map)(columnOptions, dataset.validColumns(slot.dataType)),
        change$
      ));
    case 'Multicolumn':
      return sw(multicolumn(
        inputs[slot.id],
        R.map(columnOptions, dataset.validColumns(slot.dataType)),
        change$
      ));
  }
});


const user = (slot, inputs, change$) => {
  return slot.dataType.key === 'Enumerated' ?
      column(
        inputs[slot.id],
        R.map(fixedOptions, slot.dataType.values),
        change$
      ) :
    slot.dataType.key === 'Boolean' ?
      checkbox(
        inputs[slot.id],
        change$
      ) :
      textBox(slot, inputs[slot.id], change$)
}


const textBox = (slot, currentValue, change$) => {
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
    on: {keyup: R.compose(change$, targetValue)},
    class: classes
  }, [])
}


const column = (currentValue, options, change$) => {
  return select(
    currentValue,
    options,
    R.compose(change$, parseInt)
  );
}


const multicolumn = (currentValues, options, change$) => {
  const option = item => {
    return h('div', {}, item.display);
  };

  return h('div',
    {class: {multicolumn: true}},
    multiselect(options, currentValues, {change: change$})
  );
}


module.exports = {
  build,
  slotWrapper,
  column,
  multicolumn: (t, cv, o, e) => slotWrapper(t, multicolumn(cv, o, e)),
  user: (t, s, cv, e) => slotWrapper(t, textBox(s, cv, e))
};
