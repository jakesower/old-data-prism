const R = require('ramda');
const h = require('snabbdom/h').default;

const Slot = require('../types/slot');
const DataType = require('../types/data-type');
const DataSlot = require('../types/data-slot');
const Column = require('../types/column');

const JoinCollector = require('../components/collectors/join-collector');
const {populateSlots, validateSlots} = require('../lib/definition-utils');
const {join} = require('../lib/relational-functions');

const col = R.curry((dataset, cName) =>
  h('span', {class: {"column-name": true}}, dataset.headers[cName])
)


const InnerJoin = {
  name: 'Inner Join',
  collector: JoinCollector,
  tags: ['join'],
  fn: ({sources, dataset: local}, inputs) => {
    const foreign = R.find(s => s.id === inputs.foreignSource, sources);
    return join(local, foreign, inputs.localKey, inputs.foreignKey, R.always([]));
  },
  display: () => 'Inner Join',
  valid: ({sources}, inputs) => R.none(R.isNil, R.values(inputs))
}


const LeftOuterJoin = {
  name: 'Left Outer Join',
  collector: JoinCollector,
  tags: ['join'],
  fn: ({sources, dataset: local}, inputs) => {
    const foreign = R.find(s => s.id === inputs.foreignSource, sources);
    const emptyForeign = R.map(R.always(''), R.range(0, foreign.headers));

    return join(local, foreign, inputs.localKey, inputs.foreignKey, R.concat(R.__, emptyForeign));
  },
  display: () => 'Left Outer Join',
  valid: ({sources}, inputs) => R.none(R.isNil, R.values(inputs))
}


const RightOuterJoin = {
  name: 'Right Outer Join',
  collector: JoinCollector,
  tags: ['join'],
  fn: ({sources, dataset: local}, inputs) => {
    const foreign = R.find(s => s.id === inputs.foreignSource, sources);
    const emptyForeign = R.map(R.always(''), R.range(0, foreign.headers));

    return join(foreign, local, inputs.foreignKey, inputs.localKey, R.concat(R.__, emptyForeign));
  },
  display: () => 'Right Outer Join',
  valid: ({sources}, inputs) => R.none(R.isNil, R.values(inputs))
}


module.exports = {
  InnerJoin,
  LeftOuterJoin,
  RightOuterJoin,
};
