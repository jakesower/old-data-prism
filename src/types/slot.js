const R = require('ramda');
const daggy = require('daggy');

const Slot = daggy.taggedSum('Slot', {
  Anonymous: ['display'],
  Free: ['id', 'display', 'dataType'],
  Pool: ['id', 'display', 'dataType', 'pool'],
  Multipool: ['id', 'display', 'dataType', 'pool'],
});


// Slot ~> Slot
Slot.prototype.toSlot = function () { return this; }


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

// Slot ~> Any -> Any
Slot.prototype.populate = function (value) {
  return this.cata({
    Anonymous: () => value,
    Free: (_, _1, dataType) => dataType.cast(value),
    Pool: (_, _1, dataType, _2) => dataType.cast(value),
    Multipool: (_, _1, dataType, _2) => R.map(v => dataType.cast(v), value)
  })
}


module.exports = Slot;
