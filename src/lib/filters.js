const R = require('ramda');
const h = require('snabbdom/h').default;

const col = R.curry((dataset, cName) =>
  h('span', {class: {"column-name": true}}, dataset.headers[cName]));



const Equality = {
  name: "Equality",

  columnSlots: [{
    key: "val",
    display: "Column",
    test: R.T
  }],

  userInputs: [{
    key: "val",
    display: "is equal to",
  }],

  fn: (us, cs) => us.val === cs.val,
  display: (us, cs, dataset) =>
    h('div', {}, [
      h('span', {class: {"column-name": true}}, dataset.headers[cs.val]),
      ` = ${us.val}`
    ])
};


const LT = {
  name: "Less Than",
  columnSlots: [{
    key: "val",
    display: "Column",
    test: n => !isNaN(n),
  }],
  userInputs: [{
    key: "val",
    display: "is less than",
    test: n => !isNaN(n),
  }],
  fn: (us, cs) => parseFloat(cs.val) < parseFloat(us.val),
  display: (us, cs, dataset) =>
    h('div', {}, [
      h('span', {class: {"column-name": true}}, dataset.headers[cs.val]),
      ` < ${us.val}`
    ])
};


const LTE = R.merge(LT, {
  name: "Less Than or Equal",
  fn: (us, cs) => parseFloat(cs.val) <= parseFloat(us.val),
  userInputs: [{
    key: "val",
    display: "is less or equal to",
    test: n => !isNaN(n),
  }],
  display: (us, cs, dataset) =>
    h('div', {}, [
      h('span', {class: {"column-name": true}}, dataset.headers[cs.val]),
      ` ≤ ${us.val}`
    ])
});


const GT = R.merge(LT, {
  name: "Greater Than",
  fn: (us, cs) => parseFloat(cs.val) > parseFloat(us.val),
  userInputs: [{
    key: "val",
    display: "is greater than",
    test: n => !isNaN(n),
  }],
  display: (us, cs, dataset) =>
    h('div', {}, [
      h('span', {class: {"column-name": true}}, dataset.headers[cs.val]),
      ` > ${us.val}`
    ])
});


const GTE = R.mergeDeepRight(LT, {
  name: "Greater Than or Equal",
  fn: (us, cs) => parseFloat(cs.val) >= parseFloat(us.val),
  userInputs: [{
    key: "val",
    display: "is greater or equal to",
    test: n => !isNaN(n),
  }],
  display: (us, cs, dataset) =>
    h('div', {}, [
      h('span', {class: {"column-name": true}}, dataset.headers[cs.val]),
      ` ≥ ${us.val}`
    ])
});



const defaultProp = R.curry((default_, prop, obj) =>
  R.assoc(prop, R.propOr(default_, prop, obj), obj));

const mergeDefaults = def => {
  return R.evolve({
    columnSlots: R.map(defaultProp('single', 'type'))
  }, def)
}

module.exports = R.map(mergeDefaults, {
  Equality,
  LT,
  LTE,
  GT,
  GTE,
})
