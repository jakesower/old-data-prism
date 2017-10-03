const R = require('ramda');
const h = require('snabbdom/h').default;

const Dataset = require('../types/dataset');
const DataType = require('../types/data-type');
const DataSlot = require('../types/data-slot');
const Column = require('../types/column');
const {populateSlots} = require('../lib/definition-utils');

const SlotCollector = require('../components/collectors/slot-collector');

const SoccerRanking = (function() {
  const slots = [
    DataSlot.Column('homeTeam', 'Home Team Name', DataType.String),
    DataSlot.Column('homeScore', 'Home Team Score', DataType.FiniteNumber),
    DataSlot.Column('awayTeam', 'Away Team Name', DataType.String),
    DataSlot.Column('awayScore', 'Away Team Score', DataType.FiniteNumber),
  ];

  return {
    name: "Soccer Ranking",
    collector: SlotCollector(slots),
    tags: ["soccer"],

    fn: (dataset, inputs) => {
      const {homeTeam, homeScore, awayTeam, awayScore} = populateSlots(dataset, inputs, slots);
      const rows = R.transpose([homeTeam, homeScore, awayTeam, awayScore]);

      const points = (a, b) => (a - b) > 0 ? 3 : (a - b) < 0 ? 0 : 1;

      const toLines = R.chain(([homeTeam, homeScore, awayTeam, awayScore]) => [
        {team: homeTeam, points: points(homeScore, awayScore), goalDiff: homeScore - awayScore},
        {team: awayTeam, points: points(awayScore, homeScore), goalDiff: awayScore - homeScore}
      ]);

      const outcomeReducer = R.reduce(
        (acc, t) => ({points: acc.points + t.points, goalDiff: acc.goalDiff + t.goalDiff}),
        {points: 0, goalDiff: 0}
      );

      const outcomes = R.pipe(
        toLines,
        R.groupBy(R.prop('team')),
        R.map(outcomeReducer),
        R.mapObjIndexed((v, k) => R.merge({team: k}, v)),
        R.values,
        R.sortWith([R.descend(R.prop('points')), R.descend(R.prop('goalDiff'))]),
        R.addIndex(R.map)((t, i) => [(i+1).toString(), t.team, t.points.toString(), t.goalDiff.toString()])
      )(rows);

      return Dataset.fromCSV({
        headers: ['Rank', 'Team', 'Points', 'Goal Difference'],
        records: outcomes
      });
    },

    display: (dataset, inputs) =>
      h('div', {}, [
        'Soccer Rankings'
      ]),

    valid: (dataset, inputs) => R.all(
      slot => slot.valid(dataset, inputs[slot.id]),
      slots
    )
  }
}());

module.exports = {
  SoccerRanking
}
