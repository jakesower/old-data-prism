const assert = require('chai').assert;
const { check, property, gen, sample } = require('testcheck');
const slotGen = require('../helpers/testcheck-slot');

const ChartComponent = require('../../src/components/chart');
const {DataTypes, Dataset} = require('../../src/types');

const R = require('ramda');
const stream = require('flyd').stream;

const {Action, init, update, view} = ChartComponent;


const italy = Dataset(
  ['Date', 'Opponent', 'Goals For', 'Goals Against'],
  [ ['2014-06-14', 'England',    '2', '1'],
    ['2014-06-20', 'Costa Rica', '0', '1'],
    ['2014-06-24', 'Uruguay',    '0', '1']
  ]
);

viewCheck = m => view(
  stream(),
  {dataset: italy, dimensions: {height: 500, width: 500}},
  m
);

const states = {
  base: init(),
  scatter: update(Action.SetType('scatterPlot'), init())
};


describe('chart actions', function () {
  it ('sets type', function () {
    const ns = update(Action.SetType('scatterPlot'), states.base);
    assert.equal(ns.type, 'scatterPlot');
    viewCheck(ns);
  });

  it ('sets input', function () {
    const ns = update(Action.SetInput('rowAxis', 2), states.scatter);
    assert.equal(ns.inputs.rowAxis, 2);
    viewCheck(ns);
  });

  describe ('runs all chart types', function () {
    const chartTypes = ['bar', 'scatterPlot', 'line'];
    chartTypes.forEach(t => {
      it ('works with ' + t + ' charts', function () {
        const ns = update(Action.SetType(t), states.base);
        viewCheck(ns);
      });
    });
  });
});
