const R = require('ramda');
const h = require('snabbdom/h').default;
const {DataType, DataSlot} = require('../../types');

const {Shape, Range, Point} = require('./types');
const {paddedBasis, paddedSvg, toSvgTag} = require('./utils');

const slots = [
  DataSlot.Column('rowAxis', 'Row Axis', DataType.String),
  DataSlot.Multicolumn('colAxes', 'Column Axes', DataType.FiniteNumber),
  DataSlot.User('invert', 'Invert', DataType.Boolean)
];


function fn(dataset, inputs, dimensions) {
  const {rowAxis, colAxes, invert} = inputs;
  if (R.isEmpty(rowAxis) || R.isEmpty(colAxes)) return [];

  const columns = dataset.columns();
  const rangePipe = R.pipe(
    R.flatten,
    R.map(parseFloat),
    R.append(0),
    R.apply(R.juxt([Math.min, Math.max])),
    R.apply(Range)
  );

  const rawPoints = R.map(c => columns[c].values, colAxes);
  const grid = invert ? R.transpose(rawPoints) : rawPoints;

  const numCategories = R.length(invert ? colAxes : dataset.records);
  const xRange = Range(0, numCategories - 1);
  const yRange = rangePipe(grid);

  const basis = paddedBasis(dimensions, xRange, yRange, 10, 0);

  const xs = R.range(0, numCategories);
  const toPath = pts => Shape.Path(pts);
  const catGrid = R.map(
    R.addIndex(R.map)((y, idx) => Point(idx, y))
  )(grid);

  const paths = R.pipe(
    R.map(toPath),
    R.map(c => c.project(basis)),
    R.map(toSvgTag({}))
  )(catGrid);

  const yZero = toSvgTag(
    {class: {zero: true}},
    Shape.Line(Point(0, 0), Point(xRange.max, 0)).project(basis)
  );

  return paddedSvg(dimensions, 10,
    {class: {'scatter-plot': true}},
    R.flatten([
      paths,
      [yZero]
    ])
  );
}

module.exports = {
  slots,
  fn
};
