const R = require('ramda');
const S = require('sanctuary');
const {$, def, $Dataset, $Column, $DataType} = require('./sanctuary-types');

const columns = def('columns', {},
  [$Dataset, $.Array($Column)],
  ({headers, records}) => {
    const mapWithIndex = R.addIndex(R.map);

    return mapWithIndex((col, idx) => ({
      index: idx,
      header: col,
      values: R.map(R.nth(idx))(records)
    }), headers);
  }
);

const appendColumn = def('appendColumn', {},
  [$Dataset, $.RecordType({header: $.String, values: $.Array($.String)}), $Dataset],
  (dataset, column) => ({
    headers: R.append(column.header, dataset.headers),
    records: R.zipWith(R.append, column.values, dataset.records)
  })
);


const validColumn = def('validColumn', {},
  [$DataType, $Column, $.Boolean],
  ({test}, {values}) => R.all(test, values)
);

/**
 * Runs the columnSlot's predicates over the columns in the dataset, picking
 * out the names of columns that qualify
 */
const validColumns = def('validColumns', {},
  [$Dataset, $DataType, $.Array($Column)],
  (dataset, dataType) => R.filter(validColumn(dataType), columns(dataset))
);


module.exports = {
  columns,
  validColumn,
  validColumns,
  appendColumn
};
