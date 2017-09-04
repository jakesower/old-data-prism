const daggy = require('daggy');


const Point = daggy.tagged('Point', ['x', 'y']);

Point.prototype.project = function (basis) {
  return basis.project({x: this.x, y: this.y});
}

const Range = daggy.tagged('Range', ['min', 'max']);
Range.prototype.length = function() { return this.max - this.min; }

const Shape = daggy.taggedSum('Shape', {
  Circle: ['center', 'radius'],
  Rectangle: ['topLeft', 'bottomRight'],
  Line: ['start', 'end'],
});

const {Circle, Rectangle, Line} = Shape;

Shape.prototype.svgAttrs = function () {
  return this.cata({
    Circle: ({x, y}, r) => ({cx: x, cy: y, r}),
    Rectangle: (tl, br) => ({
      x: tl.x,
      y: tl.y,
      width: br.x - tl.x,
      height: br.y - tl.y
    }),
    Line: (s, e) => ({
      x1: s.x,
      y1: s.y,
      x2: e.x,
      y2: e.y
    })
  })
}

Shape.prototype.coords = function (basis) {
  return this.cata({
    Circle: basis.circle,
    Rectangle: basis.rect,
    Line: basis.line,
  })
};

Shape.prototype.project = function (basis) {
  return this.cata({
    Circle: (c, r) => Circle(basis.project(c), r),
    Rectangle: (tl, br) => Rectangle(basis.project(tl), basis.project(br)),
    Line: (s, e) => Line(basis.project(s), basis.project(e))
  })
};

Shape.prototype.svgTag = function () {
  return this.cata({
    Circle: () => 'circle',
    Rectangle: () => 'rect',
    Line: () => 'line',
  })
};

Shape.prototype.pad = function (padding) {
  return this.cata({
    // Circle: (center, radius) => Circle(center, radius - padding),
    Circle: (c, r) => Circle(c, r),
    Rectangle: (topLeft, bottomRight) => {
      const tlx = topLeft.x + padding;
      const brx = bottomRight.x - padding;

      return Rectangle(Point(tlx, topLeft.y), Point(brx, bottomRight.y));
    },
    Line: (s, e) => Line(s, e)
  })
}

module.exports = {
  Point,
  Range,
  Shape,
}
