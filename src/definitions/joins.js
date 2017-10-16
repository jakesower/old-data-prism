const R = require('ramda');
const h = require('snabbdom/h').default;

const Slot = require('../types/slot');
const DataType = require('../types/data-type');
const DataSlot = require('../types/data-slot');
const Column = require('../types/column');

const JoinCollector = require('../components/collectors/join-collector');
const {populateSlots, validateSlots} = require('../lib/definition-utils');

const col = R.curry((dataset, cName) =>
  h('span', {class: {"column-name": true}}, dataset.headers[cName])
)


const InnerJoin = {
  name: 'Inner Join',
  collector: JoinCollector,
  tags: ['join'],
  fn: ({sources, dataset: local}, inputs) => {
    const foreign = R.find(s => s.id === inputs.foreignSource, sources);
    const fKeyed = R.groupBy(R.nth(inputs.foreignKey), foreign);

    return R.reduce(
      (acc, l) => {
        const lk = R.nth(inputs.localKey, l);
        const fks = fKeyed[lk];
        const rows = fks ?
          R.chain(f => R.concat(l, f), fks) :
          [];

        return R.concat(acc, rows);
      },
      [],
      local
    );
  },
  display: () => 'Inner Join',
  valid: ({sources}, inputs) => R.none(R.isNil, R.values(inputs))
}


const LeftOuterJoin = {
  name: 'Left Outer Join',
  collector: JoinCollector,
  tags: ['join'],
  fn: ({sources, dataset: local}, inputs) => {
    const foreignSource = R.find(s => s.id === inputs.foreignSource, sources);
    const foreign = foreignSource.dataset;
    const emptyForeign = R.map(R.always(''), R.range(0, foreign.headers));
    const fKeyed = R.groupBy(R.nth(inputs.foreignKey), foreign.records);

    return R.reduce(
      (acc, l) => {
        const lk = R.nth(inputs.localKey, l);
        const fks = fKeyed[lk];
        const rows = fks ?
          R.chain(f => R.concat(l, f), fks) :
          R.concat(l, emptyForeign);

        return R.concat(acc, rows);
      },
      [],
      local
    );
  },
  display: () => 'Left Outer Join',
  valid: ({sources}, inputs) => R.none(R.isNil, R.values(inputs))
}


module.exports = {
  InnerJoin,
  LeftOuterJoin
};
