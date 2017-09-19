const R = require('ramda');
const assert = require('chai').assert;

const {Column, DataType} = require('../../src/types');

const scores = Column('scores', ['1', '2', '3']);


describe ('column type', function() {
  it ('determines validity', function() {
    assert.equal(scores.valid(DataType.Boolean), false);
    assert.equal(scores.valid(DataType.FiniteNumber), true);
  });

});
