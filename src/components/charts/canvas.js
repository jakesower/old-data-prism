const R = require('ramda');
const daggy = require('daggy');
const h = require('snabbdom/h').default;

// Creates a canvas for plotting various shapes.
// x values increase left to right; y values increase bottom to top
const CoordinateSystem = (dimensions, xRange, yRange) => {
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
    console.log({ix: center.x, iy: center.y, x, y, xMin, xMax, yMin, yMax})
    return h('circle', {attrs: {
      cx: Math.round(x),
      cy: Math.round(y),
      r: radius
    }});
  }

  return {
    circle,
    // line,
    // rect,
  }

}

const Point = daggy.tagged('Point', ['x', 'y']);
const Range = daggy.tagged('Range', ['min', 'max']);
Range.prototype.length = function() { return this.max - this.min; }


module.exports = {
  CoordinateSystem,
  Point,
  Range
}
