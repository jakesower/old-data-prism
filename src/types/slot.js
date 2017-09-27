const R = require('ramda');
const daggy = require('daggy');

const Slot = daggy.taggedSum('Slot', {
  Anonymous: ['display'],
  Free: ['id', 'display', 'dataType'],
  Pool: ['id', 'display', 'dataType', 'pool'],
  Multipool: ['id', 'display', 'dataType', 'pool'],
});


// Slot ~> StrMap -> Boolean
Slot.prototype.valid = function (value) {
  const inPool = R.curry((pool, v) => R.contains(v, R.map(R.prop('value'), pool)));

  return this.cata({
    Anonymous: _ => true,
    Free: (_, _1, dataType) => dataType.test(value),
    Pool: (_, _1, dataType, pool) => dataType.test(value) && inPool(pool, value),
    Multipool: (_, _1, dataType, pool) =>
      R.all
        (R.allPass([v => dataType.test(v), inPool(pool)]))
        (value)
  });
}

// Slot ~> a
Slot.prototype.defaultValue = function () {
  return this.cata({
    Anonymous: () => '',
    Free: () => '',
    Pool: () => ({display: '', value: ''}),
    Multipool: () => []
  });
}


module.exports = Slot;
