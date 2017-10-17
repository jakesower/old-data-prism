const R = require('ramda');

const Dataset = require('../types/dataset');

// Dataset -> Dataset -> Number -> Number -> Function -> Dataset
const join = (local, foreign, localKeyIdx, foreignKeyIdx, noMatchFn) => {
  const foreignKeyGroups = R.groupBy(R.nth(foreignKeyIdx), foreign.records);
  const joiner = (acc, l) => {
    const localKey = R.nth(localKeyIdx, l);
    const foreignMatches = foreignKeyGroups[localKey];

    const rows = foreignMatches ?
      R.chain(f => R.concat(l, f), foreignMatches) :
      noMatchFn(l);

    return R.concat(acc, rows);
  };

  const rows = R.reduce(joiner, [], local.records);

  return Dataset.fromCsv({
    headers: R.concat(local.headers, foreign.headers),
    records: rows
  });
}


module.exports = {join};
