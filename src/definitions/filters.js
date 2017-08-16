const R = require('ramda');
const h = require('snabbdom/h').default;

const dataTypes = require('./data');

const withKeys = R.mapObjIndexed((v, key) => R.merge({key}, v));
const col = R.curry((dataset, cName) =>
  h('span', {class: {"column-name": true}}, dataset.headers[cName]));

// Helper function for filters that filter on a simple row-by-row basis
// (StrMap Inputs -> Boolean) -> (Dataset -> Dataset)
const rowFilter = def => {
  return R.merge(def, {
    fn: (dataset, inputs) => {
      const {records, headers} = dataset;
      const rowN = n => R.map(i => Array.isArray(i) ? i[n] : i, inputs);

      return {
        headers,
        records: R.addIndex(R.filter)(
          (rec, idx) => def.fn(rowN(idx)),
          records
        )
      };
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
  fn: inputs => inputs.base > inputs.target,
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


module.exports = withKeys({
  Equality,
  LT,
  LTE,
  GT,
  GTE,
});
