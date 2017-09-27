const R = require('ramda');

module.exports = R.curry((switcher, dValue) => {
  const tag = dValue['@@tag'];

  return R.has(tag, switcher) ?
    switcher[tag](dValue) :
    switcher['_'](dValue);
})
