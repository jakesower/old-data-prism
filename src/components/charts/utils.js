const R = require('ramda');
const daggy = require('daggy');
const h = require('snabbdom/h').default;
const Basis = require('./basis');

const svg = (dimensions, xRange, yRange, padding, shapes) => {
  const {height, width} = dimensions;
  const basis = Basis(
    {height: height - padding * 2, width: width - padding * 2},
    xRange,
    yRange
  );

  return h('svg', {
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: `0 0 ${dimensions.width} ${dimensions.height}`,
      preserveAspectRatio: "xMidYMid",
      class: "chart scatter-plot"
    }},
    h('g', {attrs: {transform: `translate(${padding}, ${padding})`}},
      R.map(s => s.toSvg(basis), shapes)
    )
  )
}


module.exports = {
  svg,
}



//   const {height, width} = dimensions;
//   const chartHeight = Math.floor(height - padding - textHeight*2);
//
//   // X-Axis stuff
//
//   const xPadding = n => (n + 2) * padding;
//
//   // Discrete points n indicates the number of discrete categories
//   const xPoints = n => {
//     const xDelta = (width - xPadding(n)) / n;
//     return R.map(
//       m => ((m + 0.5) * (xDelta + padding)) + padding * 0.5,
//       R.range(0, n)
//     );
//   }
//
//   // Y-Axis stuff
//   const yScale = (minY, maxY) => chartHeight / (maxY - minY);
//
//   const yZero = (minY, maxY) =>
//     Math.abs(chartHeight - Math.round(yScale(minY, maxY) * minY * -1));
//
//   const yZeroLine = (minY, maxY) => {
//     const y = yZero(minY, maxY);
//     return h('line', {attrs: {
//       x1: 0, x2: width,
//       y1: y, y2: y,
//       class: "zero"}}
//     );
//   }
//
//   return {
//     chartHeight,
//     xPoints,
//     yScale,
//     yZero,
//     yZeroLine
//   }
// }
