const R = require('ramda');
const h = require('snabbdom/h').default;

const col = R.curry((dataset, cName) =>
  h('span', {class: {"column-name": true}}, dataset.headers[cName]));

// Helper function for filters that filter on a simple row-by-row basis
// (StrMap Inputs -> Boolean) -> (Dataset -> Dataset)
const rowFilter = def => {
  // Create a function that takes in slot arguments and returns a function that
  // in turn takes a record and returns a value for consumption by the filter
  // function.
  const argFns = R.pipe(
    R.map(s => ({[s.key]: s})),
    R.reduce(R.merge, {}),
    R.map(({key, type}) =>
      type === "user" ? args => R.always(args[key])
                      : args => R.nth(args[key]))
  )(def.slots);

  return R.merge(def, {
    fn: (args, records) => {
      const extractors = R.map(af => af(args), argFns);
      const row = rec => R.map(x => x(rec), extractors);

      return R.filter(rec => def.fn(row(rec)), records);
    }
  });
}


// BEGIN ACTUAL FILTERS

const Equality = rowFilter({
  name: "Equality",

  slots: [
    { type: "column",
      key: "a",
      display: "Column",
      test: R.T
    },
    { type: "user",
      key: "b",
      display: "is equal to",
      test: R.T
    }
  ],

  fn: inputs => inputs.a === inputs.b,
  display: (inputs, dataset) =>
    h('div', {}, [
      h('span', {class: {"column-name": true}}, dataset.headers[inputs.a]),
      ` = ${inputs.b}`
    ])
});


const LT = rowFilter({
  name: "Less Than",
  slots: [
    { type: "column",
      key: "base",
      display: "Column",
      test: n => !isNaN(n),
    },
    { type: "user",
      key: "target",
      display: "is less than",
      test: n => !isNaN(n),
    }
  ],
  fn: inputs => parseFloat(inputs.base) < parseFloat(inputs.target),
  display: (inputs, dataset) =>
    h('div', {}, [
      h('span', {class: {"column-name": true}}, dataset.headers[inputs.base]),
      ` < ${inputs.target}`
    ])
});


const LTE = rowFilter({
  name: "Less Than or Equal",
  fn: inputs => parseFloat(inputs.base) <= parseFloat(inputs.target),
  slots: [
    LT.slots[0],
    R.merge(LT.slots[1], {display: "is less than or equal to"})
  ],
  display: (us, cs, dataset) =>
    h('div', {}, [
      h('span', {class: {"column-name": true}}, dataset.headers[inputs.base]),
      ` ≤ ${us.val}`
    ])
});


const GT = rowFilter({
  name: "Greater Than",
  fn: inputs => parseFloat(inputs.base) > parseFloat(inputs.target),
  slots: [
    LT.slots[0],
    R.merge(LT.slots[1], {display: "is greater than"})
  ],
  display: (us, cs, dataset) =>
    h('div', {}, [
      h('span', {class: {"column-name": true}}, dataset.headers[inputs.base]),
      ` > ${us.val}`
    ])
});


const GTE = rowFilter({
  name: "Greater Than or Equal",
  fn: inputs => parseFloat(inputs.base) >= parseFloat(inputs.target),
  slots: [
    LT.slots[0],
    R.merge(LT.slots[1], {display: "is greater than or equal to"})
  ],
  display: (us, cs, dataset) =>
    h('div', {}, [
      h('span', {class: {"column-name": true}}, dataset.headers[inputs.base]),
      ` ≥ ${us.val}`
    ])
});


module.exports = {
  Equality,
  LT,
  LTE,
  GT,
  GTE,
}
