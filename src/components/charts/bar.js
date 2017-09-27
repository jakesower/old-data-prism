const R = require('ramda');
const h = require('snabbdom/h').default;
const {DataType, Slot} = require('../../types');
const {Shape, Range, Point} = require('./types');
const {paddedBasis, paddedSvg, toSvgTag} = require('./utils');

const mapIndexed = R.addIndex(R.map);

const slots = [
  Slot.Column('xAxis', 'Label', DataType.String),
  Slot.Column('yAxis', 'Value', DataType.FiniteNumber)
]


function fn(dataset, inputs, dimensions) {
  const {xAxis, yAxis} = inputs;
  if (R.isEmpty(xAxis) || R.isEmpty(yAxis)) return [];

  const textHeight = 20;

  const yVals = R.pipe(
    R.map(R.nth(yAxis)),
    R.map(parseFloat)
  )(dataset.records);

  const rangePipe = R.pipe(
    R.append(0),
    R.apply(R.juxt([Math.min, Math.max])),
    R.apply(Range)
  );

  const xRange = Range(0, R.length(dataset.records));
  const yRange = rangePipe(yVals);

  const basis = paddedBasis(dimensions, xRange, yRange, 10, 20);

  const yZero = toSvgTag(
    {class: {zero: true}},
    Shape.Line(Point(0, 0), Point(xRange.max, 0)).project(basis)
  );

  const barShape = (x, y) => y > 0 ?
    Shape.Rectangle(Point(x, y), Point(x + 1, 0)) :
    Shape.Rectangle(Point(x, 0), Point(x + 1, y));

  const pad = R.curry((padding, shape) => shape.pad(padding));
  const project = R.curry((basis, shape) => shape.project(basis));

  const bars = R.pipe(
    mapIndexed(R.flip(barShape)),
    R.map(project(basis)),
    R.map(pad(10)),
    R.map(toSvgTag({}))
  )(yVals);

  const columnLabels = R.pipe(
    R.map(R.nth(xAxis)),
    mapIndexed((label, idx) => {
      const xCoord = Point(idx+0.5, 0).project(basis).x;
      return h(
        'text',
        {attrs: {x: xCoord, y: dimensions.height - 20}},
        label
      );
    })
  )(dataset.records);

  const dataLabels = mapIndexed((yVal, idx) => {
    const barTop = Point(idx + 0.5, yVal).project(basis);
    const zeroPoint = Point(idx + 0.5, 0).project(basis);
    const yDelta = barTop.y - zeroPoint.y;
    const outside = Math.abs(yDelta) > textHeight;
    const above = (outside && yDelta > 0) || (!outside && yDelta < 0);
    const attrs = {
      x: barTop.x,
      y: above ? (barTop.y - 8) : (barTop.y + textHeight)
    };

    return h('text', {attrs}, yVal);
  })(yVals);

  return paddedSvg(dimensions, 10, {}, R.flatten([
    bars,
    [yZero],
    columnLabels,
    dataLabels
  ]));
}

module.exports = {
  slots,
  fn
};
