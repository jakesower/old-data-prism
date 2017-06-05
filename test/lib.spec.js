const expect = require('chai').expect;
const datasetFunctions = require('../src/lib/dataset-functions');

const careBears = {
  headers: ['Name', 'Belly Badge', 'Home'],
  records: [
    ['Tenderheart', 'Heart', 'Care-a-Lot'],
    ['Grumpy Bear', 'Raincloud', 'Care-a-Lot']
  ]
}

describe('dataset functions', function() {
  it('extracts columns with values', function() {
    const cVals = datasetFunctions.columns(careBears);

    expect(cVals[1]).to.deep.equal({
      index: 1,
      header: 'Belly Badge',
      values: ['Heart', 'Raincloud']
    })
  })
})
