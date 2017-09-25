const R = require('ramda');
const assert = require('chai').assert;

const {Dataset, Column, DataType, Operation, Slot} = require('../../src/types');

const germany = Dataset(
  ['Date', 'Opponent', 'Goals For', 'Goals Against'],
  [ ['2014-06-16', 'Portugal',      '4', '0'],
    ['2014-06-21', 'Ghana',         '2', '2'],
    ['2014-06-26', 'United States', '1', '0'],
    ['2014-06-30', 'Algeria',       '2', '1'],
    ['2014-07-05', 'France',        '1', '0'],
    ['2014-07-08', 'Brazil',        '7', '1'],
    ['2014-07-13', 'Argentina',     '1', '0']
  ]
);

describe ('dataset type', function() {
  it ('calculates columns correctly', function() {
    const cols = germany.columns();

    assert.equal(cols.length, 4);
    assert.deepEqual(cols[2], Column('Goals For', ['4', '2', '1', '2', '1', '7', '1']));
  });

  it ('appends columns', function() {
    const places = Column(
      'Location',
      ['Salvador', 'Fortaleza', 'Recife', 'Porto Alegre', 'Rio de Janeiro', 'Belo Horizonte', 'Rio de Janeiro']
    );

    const withLocation = germany.appendColumn(places);

    assert.deepEqual(withLocation.records[0], ['2014-06-16', 'Portugal', '4', '0', 'Salvador']);
  });

  it ('detects valid columns', function() {
    const numberColumns = germany.validColumns(DataType.FiniteNumber);
    assert.deepEqual(numberColumns.map(c => c.header), ['Goals For', 'Goals Against']);
  });

  it ('applies operations', function() {
    const operation = Operation.Filter(
      { fn: (ds, inputs) => Dataset(
            ds.headers,
            R.pipe(
              R.zip(R.__, inputs.a),
              R.filter(pair => pair[1] === 7),
              R.map(pair => pair[0])
            )(ds.records)),
        slots: [Slot.Column('a', 'A', DataType.FiniteNumber)]
      },
      { a: 2 }
    );

    const nextDS = germany.applyOperation(operation);
    assert.deepEqual(nextDS, Dataset(
      ['Date', 'Opponent', 'Goals For', 'Goals Against'],
      [['2014-07-08', 'Brazil', '7', '1']]
    ));
  });

  it ('applies valid operations', function () {
    const validOperation = Operation.Filter(
      { fn: (ds, inputs) => Dataset(
            ds.headers,
            R.pipe(
              R.zip(R.__, inputs.a),
              R.filter(pair => pair[1] === 7),
              R.map(pair => pair[0])
            )(ds.records)),
        slots: [Slot.Column('a', 'A', DataType.FiniteNumber)]
      },
      { a: 2 }
    );

    const invalidOperation = Operation.Filter(
      { fn: R.always(Dataset([], [[]])),
        slots: [Slot.User('b', 'B', DataType.FiniteNumber)]
      },
      { b: "Oh hai, I'm not a number" }
    );

    const nextDS = germany.applyValidOperations([validOperation, invalidOperation]);
    assert.deepEqual(nextDS, Dataset(
      ['Date', 'Opponent', 'Goals For', 'Goals Against'],
      [['2014-07-08', 'Brazil', '7', '1']]
    ));

  })

});
