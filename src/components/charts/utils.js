const R = require('ramda');
const daggy = require('daggy');
const h = require('snabbdom/h').default;
const Basis = require('./basis');

const paddedBasis = (dimensions, xRange, yRange, padding, textHeight) => {
  const {height, width} = dimensions;
  return Basis(
    { height: height - (padding * 2) - textHeight,
      width: width - padding * 2
    },
    xRange,
    yRange
  );
}

const defaultSvgAttrs = dimensions => ({
  attrs: {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: `0 0 ${dimensions.width} ${dimensions.height}`,
    preserveAspectRatio: "xMidYMid"
  },
  class: {chart: true}
});

const paddedSvg = (dimensions, padding, attrs, body) => {
  return h('svg',
    R.mergeDeepRight(defaultSvgAttrs(dimensions), attrs),
    h('g', {attrs: {transform: `translate(${padding}, ${padding})`}}, body)
  )
}

const toSvgTag = R.curry((attrs, shape) => h(
  shape.svgTag(),
  R.mergeDeepRight({attrs: shape.svgAttrs()}, attrs)
));



module.exports = {
  paddedSvg,
  paddedBasis,
  toSvgTag,
}
