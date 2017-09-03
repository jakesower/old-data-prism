const daggy = require('daggy');


const Point = daggy.tagged('Point', ['x', 'y']);

const Range = daggy.tagged('Range', ['min', 'max']);
Range.prototype.length = function() { return this.max - this.min; }

const Shape = daggy.taggedSum('Shape', {
  Circle: ['center', 'radius'],
  // Rectangle: ['topLeft', 'bottomRight'],
  Line: ['start', 'end'],
});
Shape.prototype.toSvg = function (basis) {
  return this.cata({
    Circle: basis.circle,
    // Rectangle: basis.rect,
    Line: basis.line,
  })
};

module.exports = {
  Point,
  Range,
  Shape,
}
