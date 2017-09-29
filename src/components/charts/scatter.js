const R = require('ramda');
const h = require('snabbdom/h').default;
const {DataType, DataSlot} = require('../../types');

const {Shape, Range, Point} = require('./types');
const {paddedBasis, paddedSvg, toSvgTag} = require('./utils');

const slots = [
  DataSlot.Column('rowAxis', 'Row Axis', DataType.String),
  DataSlot.Multicolumn('colAxes', 'Column Axes', DataType.FiniteNumber),
  Slot.Free('invert', 'Invert', DataType.Boolean)
]


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

  // const categories = invert ?
  //   R.map(c => columns[c].header, colAxes) :
  //   R.map(R.nth(R.__, dataset.records), rowAxis);
  const numCategories = R.length(invert ? dataset.records : colAxes);
  const xRange = Range(0, numCategories);
  const yRange = rangePipe(grid);

  const basis = paddedBasis(dimensions, xRange, yRange, 10, 0);

  const xs = R.range(0, numCategories);
  const toCircle = ({x, y}) => Shape.Circle(Point(x + 0.5, y), 4);
  const catGrid = R.flatten(
    R.zipWith(
      (x, pts) => R.map(y => ({x, y}), pts),
      xs, grid
    )
  );

  const circles = R.pipe(
    R.map(toCircle),
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
      circles,
      [yZero]
    ])
  );
}

module.exports = {
  slots,
  fn
};
