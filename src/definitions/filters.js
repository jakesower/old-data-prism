const R = require('ramda');
const h = require('snabbdom/h').default;

const dataTypes = require('./data');

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
    R.map(({key, sourceType}) =>
      sourceType === "user" ? args => R.always(args[key])
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
    { sourceType: "column",
      dataType: dataTypes.String,
      key: "a",
      display: "Column"
    },
    { sourceType: "user",
      dataType: dataTypes.String,
      key: "b",
      display: "is equal to"
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
    { sourceType: "column",
      dataType: dataTypes.FiniteNumber,
      key: "base",
      display: "Column",
    },
    { sourceType: "user",
      dataType: dataTypes.FiniteNumber,
      key: "target",
      display: "is less than",
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
  display: (inputs, dataset) =>
    h('div', {}, [
      h('span', {class: {"column-name": true}}, dataset.headers[inputs.base]),
      ` ≤ ${inputs.target}`
    ])
});


const GT = rowFilter({
  name: "Greater Than",
  fn: inputs => parseFloat(inputs.base) > parseFloat(inputs.target),
  slots: [
    LT.slots[0],
    R.merge(LT.slots[1], {display: "is greater than"})
  ],
  display: (inputs, dataset) =>
    h('div', {}, [
      h('span', {class: {"column-name": true}}, dataset.headers[inputs.base]),
      ` > ${inputs.target}`
    ])
});


const GTE = rowFilter({
  name: "Greater Than or Equal",
  fn: inputs => parseFloat(inputs.base) >= parseFloat(inputs.target),
  slots: [
    LT.slots[0],
    R.merge(LT.slots[1], {display: "is greater than or equal to"})
  ],
  display: (inputs, dataset) =>
    h('div', {}, [
      h('span', {class: {"column-name": true}}, dataset.headers[inputs.base]),
      ` ≥ ${inputs.target}`
    ])
});


module.exports = {
  Equality,
  LT,
  LTE,
  GT,
  GTE,
}
