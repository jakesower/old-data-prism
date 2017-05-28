const expect = require('chai').expect;
const Filter = require('../src/components/filter');
const FILTERS = require('../src/lib/filters');

const flyd = require('flyd');
const stream = flyd.stream;
const S = require('sanctuary');
const R = require('ramda');

const {Action, view, update, init} = Filter;

const careBears = {
  columns: ['Name', 'Belly Badge', 'Debut Year'],
  records: [
    ['Tenderheart Bear', 'Heart', '1982'],
    ['Grumpy Bear', 'Raincloud', '1982'],
    ['Messy Bear', 'Tornado', '2005'],
    ['Oopsy Bear', 'Shooting Star', '2007']
  ]
};

describe('filter actions', function() {
  const action$ = stream();
  const model$ = flyd.scan(S.flip(update), init, action$);

  it('can start an edit', function() {
    const model$$ = flyd.scan(S.flip(update), R.merge(init, {editing: false}), action$);

    action$(Action.StartEdit)
    expect(model$$()).to.have.property('editing', true);
  })
})
