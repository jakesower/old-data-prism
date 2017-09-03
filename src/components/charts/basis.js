const R = require('ramda');
const h = require('snabbdom/h').default;
const {Point} = require('./types');

// Creates a canvas for plotting various shapes.
// x values increase left to right; y values increase bottom to top
module.exports = (dimensions, xRange, yRange) => {
  const {height, width} = dimensions;
  const xMin = xRange.min, xMax = xRange.max;
  const yMin = yRange.min, yMax = yRange.max;

  const project = ({x, y}) => {
    return Point(
      ((x - xMin) / xRange.length()) * width,
      height - (((y - yMin) / yRange.length()) * height)
    )
  }

  const circle = (center, radius) => {
    const {x, y} = project(center);
    // console.log({ix: center.x, iy: center.y, x, y, xMin, xMax, yMin, yMax})
    return h('circle', {attrs: {
      cx: Math.round(x),
      cy: Math.round(y),
      r: radius
    }});
  }

  const line = (start, end) => {
    const s = project(start), e = project(end);
    console.log({start, end, s, e})

    return h('line', {attrs: {
      x1: s.x, y1: s.y,
      x2: e.x, y2: e.y
    }})
  }

  return {
    project,
    circle,
    line,
    // rect,
  }

}
