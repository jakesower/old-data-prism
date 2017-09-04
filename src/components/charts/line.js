const R = require('ramda');
const h = require('snabbdom/h').default;
const dataTypes = require('../../definitions/data');
const DSF = require('../../lib/dataset-functions');

const {Shape, Range, Point} = require('./types');
const {paddedBasis, paddedSvg, toSvgTag} = require('./utils');

const slots = [
  { key: "rowAxis",
    display: "Row Axis",
    sourceType: "column",
    dataType: dataTypes.String // special cases handled in code
  },
  { key: "colAxes",
    display: "Column Axes",
    sourceType: "multicolumn",
    dataType: dataTypes.FiniteNumber
  },
  { key: "invert",
    display: "Invert",
    sourceType: "user",
    dataType: dataTypes.Boolean
  }
]


function fn(dataset, inputs, dimensions) {
  const {rowAxis, colAxes, invert} = inputs;
  if (R.isEmpty(rowAxis) || R.isEmpty(colAxes)) return [];

  const columns = DSF.columns(dataset);
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
  const numCategories = R.length(invert ? colAxes : dataset.records);
  const xRange = Range(0, numCategories);
  const yRange = rangePipe(grid);

  const basis = paddedBasis(dimensions, xRange, yRange, 10, 0);

  const xs = R.range(0, numCategories);
  const toPath = pts => Shape.Path(pts);
  // need to fully expand y from an array to individual points
  // const catGrid = R.zipWith(
  //   (x, pts) => R.chain(y => Point(x, y), pts),
  //   xs, grid
  // );
  const catGrid = R.map(
    R.addIndex(R.map)((y, idx) => Point(idx+0.5, y))
  )(grid);

  console.log({grid, catGrid})

  const paths = R.pipe(
    // R.tap(console.log),
    // R.unnest,
    R.tap(console.log),
    R.map(toPath),
    // R.tap(console.log),
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
