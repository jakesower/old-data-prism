const R = require('ramda');
const Type = require('union-type');
const moment = require('moment');


const FormattedDate = {
  name: "Formatted Date",

  columnSlots: [{
    key: "date",
    display: "date",
    test: x => !isNaN(Date.parse(x))
  }],

  userInputs: [{
    key: "format",
    display: "moo"
  }],

  fn: (us, cs) => R.map(d => moment(d).format(us.format), cs.date),
  display: (us, cs, dataset) => `<span class="column-name">${dataset.headers[cs.date]}</span> with format ${us.format}`
};


const Quantile = {
  name: "Quantile",

  columnSlots: [{
    key: "n",
    display: "n",
    test: x => !isNaN(x)
  }],

  userInputs: [{
    key: "order",
    display: "xx",
    test: x => !isNaN(x)
  }],

  fn: (us, cs) => {
    const sorted = cs.n.map(x => parseFloat(x)).sort();
    const frac = parseFloat(sorted.length) / parseFloat(us.order);
    const cutoffs = R.map(
      n => R.nth(Math.ceil(n*frac), sorted),
      R.range(0, parseInt(us.order)));

    return R.map(n =>
      (R.findLastIndex(m => parseFloat(n) >= m, cutoffs) + 1).toString()
      , cs.n);
  },
  display: (us, cs, dataset) => {
    const quartileNames = {
      '2': "median groups",
      '3': "terciles",
      '4': "quartiles",
      '5': "quintiles",
      '6': "sextiles",
      '7': "septiles",
      '8': "octiles",
      '10': "deciles",
      '12': "duo-deciles",
      '16': "hexadeciles",
      '20': "ventiles",
      '100': "percentiles",
      '1000': "permilles"
    };

    const name = quartileNames[us.order] || `${us.order}-quantile`;
    return `${name} on <span class="column-name">${dataset.headers[cs.n]}</span>`;
  }
};


const Sum = {
  name: "Summation",

  userInputs: [],
  columnSlots: [{
    key: "addends",
    display: "addends",
    test: n => !isNan(n),
    type: "list"
  }],

  fn: (us, cs) => R.sum(R.values(cs.addends)),
  display: (us, cs, dataset) => {
    const colSpans = R.map(col(dataset), R.values(cs.addends));
    return h('div', {}, [
      `Sum of ${R.join(', ', colSpans)}`
    ])
  }
}


const defaultProp = R.curry((default_, prop, obj) =>
  R.assoc(prop, R.propOr(default_, prop, obj), obj));

const mergeDefaults = def => {
  return R.evolve({
    columnSlots: R.map(defaultProp('single', 'type'))
  }, def)
}

module.exports = R.map(mergeDefaults, {
  FormattedDate,
  Quantile,
  Sum
});
