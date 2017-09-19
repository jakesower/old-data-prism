const R = require('ramda');
const assert = require('chai').assert;
const moment = require('moment');

const {Dataset, DataType, Slot} = require('../../src/types');

const iran = Dataset(
  ['Date', 'Opponent', 'Goals For', 'Goals Against'],
  [ ['2014-06-16', 'Nigeria',                '0', '0'],
    ['2014-06-21', 'Argentina',              '0', '1'],
    ['2014-06-25', 'Bosnia and Herzegovina', '1', '3'],
  ]
);

const gameQuality = Slot.User('quality', 'Quality of Game', DataType.PositiveFiniteNumber);
const date = Slot.Column('date', 'Date of Play', DataType.Date);
const scores = Slot.Multicolumn('scores', 'Scores', DataType.FiniteNumber);


describe ('slot type', function() {
  it ('determines validity', function() {
    const invalids = [
      gameQuality.valid(iran, {quality: "lol"}),
      date.valid(iran, {date: 1}),
      scores.valid(iran, {scores: [1, 2]})
    ];

    invalids.forEach(i => assert.equal(i, false));

    const valids = [
      gameQuality.valid(iran, {quality: "8"}),
      date.valid(iran, {date: 0}),
      scores.valid(iran, {scores: [3, 2]})
    ];

    valids.forEach(i => assert.equal(i, true));
  });


  it ('populates', function() {
    const pops = {quality: '8', date: 0, scores: [2, 3]};

    const gqPop = gameQuality.populate(iran, pops);
    const dPop = date.populate(iran, pops);
    const sPop = scores.populate(iran, pops);

    assert.equal(gqPop.quality, 8);
    assert.deepEqual(dPop.date, ['2014-06-16', '2014-06-21', '2014-06-25'].map(d => moment(d)));
    assert.deepEqual(sPop.scores, [[0, 0], [0, 1], [1, 3]]);
  });

});
