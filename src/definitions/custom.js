const R = require('ramda');
const h = require('snabbdom/h').default;

const {populateSlots} = require('../lib/definition-utils');

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
        outcomeReducer,
        R.sortBy((a, b) => (a.points - b.points) === 0 ? (a.goalDiff - b.goalDiff) : (a.points - b.points)),
        R.addIndex(R.map)((t, i) => [(i+1).toString(), t.team, t.points.toString(), t.goalDiff.toString()])
      )(rows);

      return Dataset(
        ['Rank', 'Team', 'Points', 'Goal Difference'],
        outcomes
      );
    },

    display: (dataset, inputs) =>
      h('div', {}, [
        'Soccer Rankings'
      ]),

    valid: (dataset, inputs) => R.all(
      slot => Slot.is(slot) ?
        slot.valid(inputs[slot.id]) :
        slot.valid(dataset, inputs[slot.id]),
      slots
    )
  }
}());
