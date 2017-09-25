const assert = require('chai').assert;
const { check, property, gen, sample } = require('testcheck');
const slotGen = require('../helpers/testcheck-slot');

const OperationComponent = require('../../src/components/operation');
const {DataTypes, Dataset} = require('../../src/types');

const filterPool = require('../../src/definitions/filters');
const deriverPool = require('../../src/definitions/derivers');
const aggregatorPool = require('../../src/definitions/aggregators');

const R = require('ramda');
const stream = require('flyd').stream;

const {Action, init, update, view} = OperationComponent;

const runTestCheck = process.env.TESTCHECK === 'true';


const ecuador = Dataset(
  ['Date', 'Opponent', 'Goals For', 'Goals Against'],
  [ ['2014-06-15', 'Switzerland', '1', '2'],
    ['2014-06-20', 'Honduras',    '2', '1'],
    ['2014-06-25', 'France',      '0', '0']
  ]
);

const samples = {
  filter: filterPool.Equality,
  deriver: deriverPool.Sum,
  aggregator: aggregatorPool.Mean
};


baseViewCheck = (itemPool, m, editing) => view(
  {set$: stream(), delete$: stream(), setActive$: stream()},
  {dataset: ecuador, itemPool, editing},
  m
);


describe('operation component actions', function () {
  // TODO: check the outputs of derivers and aggregators for type
  const checkOp = (model, o) => {
    const ns = update(Action.SetDefinitionKey(o.key), model);
    const gens = R.map(slotGen, o.slots);
    const fCheck = function(inputs) {
      const ins = R.zipObj(R.map(R.prop('id'), o.slots), Array.from(arguments));
      return o.fn(ecuador, ins, '');
    }
    const args = R.append(fCheck, gens);
    const prop = R.apply(property, args);
    const result = check(prop).result;

    if (result !== true) {
      console.log(`failed on ${o.name}`);
      R.map(g => console.log(sample(g)), gens);
    }

    return result;
  }


  describe('filters', function () {
    const model = init('Filter', 1);
    const sample = R.values(filterPool)[0];
    const viewCheck = (m, editing) => baseViewCheck(filterPool, m, editing);

    it ('sets definition', function () {
      const ns = update(Action.SetDefinitionKey(sample.key), model);
      assert.equal(ns.definitionKey, sample.key);
      assert.doesNotThrow(() => viewCheck(ns, true));
      assert.doesNotThrow(() => viewCheck(ns, false));
    });

    it ('set an input', function () {
      const ns = update(Action.SetInput('a', 'moo'), model);
      assert.equal(ns.inputs.a, 'moo');
      assert.doesNotThrow(() => viewCheck(ns, true));
      assert.doesNotThrow(() => viewCheck(ns, false));
    });

    it ('renders all filters', function () {
      R.forEach(
        o => {
          const ns = update(Action.SetDefinitionKey(o.key), model);
          assert.doesNotThrow(() => viewCheck(ns, true));
          assert.doesNotThrow(() => viewCheck(ns, false));
        },
        R.values(filterPool)
      );
    });

    if (runTestCheck) {
      R.values(filterPool).forEach(o => {
        it ('handles testcheck based on type', function () {
          assert.equal(checkOp(model, o), true);
        });
      });
    }
  });

  describe('derivers', function () {
    const model = init('Deriver', 2);
    const sample = R.values(deriverPool)[0];
    const viewCheck = (m, editing) => baseViewCheck(deriverPool, m, editing);

    it ('sets definition', function () {
      const ns = update(Action.SetDefinitionKey(sample.key), model);
      assert.equal(ns.definitionKey, sample.key);
      assert.doesNotThrow(() => viewCheck(ns, true));
      assert.doesNotThrow(() => viewCheck(ns, false));
    });

    it ('sets an input', function () {
      const ns = update(Action.SetInput('addends', [2, 3]), model);
      assert.deepEqual(ns.inputs.addends, [2, 3]);
      assert.doesNotThrow(() => viewCheck(ns, true));
      assert.doesNotThrow(() => viewCheck(ns, false));
    });

    it ('renders all derivers', function () {
      R.forEach(
        o => {
          const ns = update(Action.SetDefinitionKey(o.key), model);
          assert.doesNotThrow(() => viewCheck(ns, true));
          assert.doesNotThrow(() => viewCheck(ns, false));
        },
        R.values(deriverPool)
      );
    });

    if (runTestCheck) {
      R.values(deriverPool).forEach(o => {
        it ('handles testcheck based on type', function () {
          assert.equal(checkOp(model, o), true);
        });
      });
    }
  });

  describe('aggregators', function () {
    const model = init('Aggregator', 3);
    const sample = R.values(aggregatorPool)[0];
    const viewCheck = (m, editing) => baseViewCheck(aggregatorPool, m, editing);

    it ('sets definition', function () {
      const ns = update(Action.SetDefinitionKey(sample.key), model);
      assert.equal(ns.definitionKey, sample.key);
      assert.doesNotThrow(() => viewCheck(ns, true));
      assert.doesNotThrow(() => viewCheck(ns, false));
    });

    it ('sets an input', function () {
      const ns = update(Action.SetInput('a', 2), model);
      assert.deepEqual(ns.inputs.a, 2);
      assert.doesNotThrow(() => viewCheck(ns, true));
      assert.doesNotThrow(() => viewCheck(ns, false));
    });

    it ('renders all aggregators', function () {
      R.forEach(
        o => {
          const ns = update(Action.SetDefinitionKey(o.key), model);
          assert.doesNotThrow(() => viewCheck(ns, true));
          assert.doesNotThrow(() => viewCheck(ns, false));
        },
        R.values(aggregatorPool)
      );
    });

    if (runTestCheck) {
      R.values(aggregatorPool).forEach(o => {
        it ('handles testcheck based on type', function () {
          assert.equal(checkOp(model, o), true);
        });
      });
    }
  });


  console.log(runTestCheck ?
    "Ran with testcheck. To speed things up, run without (yarn run test)." :
    "Ran without testcheck. To check all ops, run with (yarn run test-check)"
  )

});
