const R = require('ramda');
const assert = require('chai').assert;
const moment = require('moment');

const {DataType, Slot} = require('../../src/types');

const o = R.map(v => ({value: v, display: v}));

const gameQuality = Slot.Free('quality', 'Quality of Game', DataType.PositiveFiniteNumber);
const falseSlot = Slot.Pool('false', 'False', DataType.Boolean, o(['false']));
const scores = Slot.Multipool('lowscores', 'Low Scores', DataType.FiniteNumber, o(['0', '1', '2']));


describe ('slot type', function() {
  it ('determines validity', function() {
    const invalids = [
      gameQuality.valid("lol"),
      falseSlot.valid("true"),
      falseSlot.valid("lol"),
      scores.valid(['1', '3']),
      scores.valid("lol")
    ];

    invalids.forEach(i => assert.equal(i, false));

    const valids = [
      gameQuality.valid("8"),
      falseSlot.valid('false'),
      scores.valid(['2', '0'])
    ];

    valids.forEach(v => assert.equal(v, true));
  });


});
