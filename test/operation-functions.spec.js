const assert = require('chai').assert;
const OPF = require('../src/lib/operation-functions'); // TODO: should in its own tests

const careBears = {
  headers: ['Name', 'Belly Badge', 'Debut', 'Debut Year'],
  records: [
    ['Tenderheart Bear', 'Heart', '1982-09-24', '1982'],
    ['Grumpy Bear', 'Raincloud', '1982-09-24', '1982'],
    ['Messy Bear', 'Tornado', '2005-10-18', '2005'],
    ['Oopsy Bear', 'Shooting Star', '2007-08-04', '2007']
  ]
};

describe('operation functions', function() {
  // it('applies a sequence of operations', function() {
  //   // Care Bears debuting on a Friday
  //   const ops = [
  //     {type: "Deriver", enabled: true, func: "FormattedDate", columns: {date: 2}, userInputs: {format: "ddd"}},
  //     {type: "Filter", enabled: true, func: "Equality", columns: {val: 4}, userInputs: {val: "Fri"}}
  //   ];
  //
  //   assert.deepEqual(OPF.applyOperations(careBears, ops), {
  //     headers: ['Name', 'Belly Badge', 'Debut', 'Debut Year', 'Formatted Date (Debut, ddd)'],
  //     records: [
  //       ['Tenderheart Bear', 'Heart', '1982-09-24', '1982', 'Fri'],
  //       ['Grumpy Bear', 'Raincloud', '1982-09-24', '1982', 'Fri']
  //     ]
  //   });
  // })

});
