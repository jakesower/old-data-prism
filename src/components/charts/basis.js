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
    return {
      cx: x,
      cy: y,
      r: radius
    };
  }

  const line = (start, end) => {
    const s = project(start), e = project(end);

    return {
      x1: s.x, y1: s.y,
      x2: e.x, y2: e.y
    };
  }

  const rect = (topLeft, bottomRight) => {
    const tl = project(topLeft), br = project(bottomRight);

    return {
      x: tl.x,
      y: tl.y,
      width: br.x - tl.x,
      height: br.y - tl.y
    };
  }


  return {
    project,
    circle,
    line,
    rect,
    height,
    width,
  }

}
