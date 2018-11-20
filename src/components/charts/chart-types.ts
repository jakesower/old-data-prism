// class CPoint {
//   public x: number;
//   public y: number;

//   constructor(x, y) {
//     this.x = x; this.y = y;
//   }

//   project(basis: Basis): CPoint {
//     return basis.project(this);
//   }
// }


// class CRange {
//   public min: number;
//   public max: number;

//   constructor(min, max) {
//     this.min = min; this.max = max;
//   }

//   length() {
//     return this.max - this.min;
//   }
// }

// class Basis {
//   public dimensions: { height: number, width: number };
//   public xRange: CRange;
//   public yRange: CRange;

//   constructor(dimensions, xRange, yRange) {
//     this.dimensions = dimensions; this.xRange = xRange; this.yRange = yRange;
//   }

//   project(point: CPoint): CPoint {
//     const { x, y } = point;
//     const { xRange, yRange } = this;
//     const { width, height } = this.dimensions;

//     return new CPoint(
//       ((x - xRange.min) / xRange.length()) * width,
//       height - (((y - yRange.min) / yRange.length()) * height)
//     )
//   }
// }


// class Circle implements Shape {
//   readonly center: CPoint;
//   readonly radius: number;

//   constructor(center: CPoint, radius: number) {
//     this.center = center; this.radius = radius;
//   }

//   svgAttrs() {
//     const { x, y } = this.center;
//     return { cx: x, cy: y, r: this.radius};
//   }

//   project(basis: Basis) {
//     return new Circle(basis.project(this.center), this.radius);
//   }

//   svgTag() {
//     return 'circle';
//   }

//   pad(_padding) {
//     return this;
//   }
// }

// function makeCircle(center: CPoint, radius: number): Shape {
//   return {
//     svgTag: 'circle',
//     svgAttrs: { cx: center.x, cy: center.y, r: radius },
//     project: (basis: Basis) => makeCircle(basis.project(center), radius),
//     pad: _ => makeCircle(center, radius),
//   };
// }

// function makeRectangle(topLeft: CPoint, bottomRight: CPoint): Shape {
//   return {
//     svgTag: 'rect',
//     svgAttrs: {
//       x: topLeft.x,
//       y: topLeft.y,
//       width: bottomRight.x - topLeft.x,
//       height: bottomRight.y - topLeft.y
//     },
//     project: (basis: Basis) => makeRectangle(basis.project(topLeft), basis.project(bottomRight)),
//     pad: (padding: number) => {
//       const tlx = topLeft.x + padding;
//       const brx = bottomRight.x - padding;

//       return makeRectangle(Point(tlx, topLeft.y), Point(brx, bottomRight.y));
//     },
//   };
// }

interface BaseShape {
  // svgAttrs: () => object,
  // svgTag: () => string;
  svgAttrs: object,
  svgTag: string,
  project: (basis: IBasis) => Shape,
  pad: (padding: number) => Shape,
};

interface ICircle extends BaseShape {}
interface IRectangle extends BaseShape {}
interface ILine extends BaseShape {}
interface IPath extends BaseShape {}

export type Shape = ICircle | IRectangle | ILine | IPath;

interface IDimensions { height: number, width: number };

interface IPoint {
  x: number,
  y: number,
  project: (basis: IBasis) => IPoint,
};

interface IRange {
  min: number,
  max: number,
  length: number,
};

interface IBasis {
  dimensions: IDimensions,
  xRange: IRange,
  yRange: IRange,
  project: (point: IPoint) => IPoint,
};


export function Point(x: number, y: number): IPoint {
  return { x, y,
    project: basis => basis.project(Point(x, y)),
  };
}

export function Range(min: number, max: number): IRange {
  return { min, max,
    length: max - min,
  };
}

export function Basis(dimensions: IDimensions, xRange: IRange, yRange: IRange): IBasis {
  return { dimensions, xRange, yRange,
    project: (point: IPoint): IPoint => {
      const { height, width } = dimensions;
      const { x, y } = point;
      const xMin = xRange.min;
      const yMin = yRange.min;

      return Point(
        (x - xMin) / xRange.length * width,
        height - (((y - yMin) / yRange.length) * height)
      );
    }
  };
}

export function Circle(center: IPoint, radius: number): ICircle {
  return {
    svgTag: 'circle',
    svgAttrs: { cx: center.x, cy: center.y, r: radius },
    project: (basis: IBasis) => Circle(basis.project(center), radius),
    pad: _ => Circle(center, radius),
  };
}

export function Rectangle(topLeft: IPoint, bottomRight: IPoint): IRectangle {
  return {
    svgTag: 'rect',
    svgAttrs: {
      x: topLeft.x,
      y: topLeft.y,
      width: bottomRight.x - topLeft.x,
      height: bottomRight.y - topLeft.y
    },
    project: (basis: IBasis) => Rectangle(basis.project(topLeft), basis.project(bottomRight)),
    pad: (padding: number) => {
      const tlx = topLeft.x + padding;
      const brx = bottomRight.x - padding;

      return Rectangle(Point(tlx, topLeft.y), Point(brx, bottomRight.y));
    },
  };
}

export function Line(start: IPoint, end: IPoint): ILine {
  return {
    svgTag: 'line',
    svgAttrs: { x1: start.x, x2: end.x, y1: start.y, y2: end.y },
    project: (basis: IBasis) => Line(basis.project(start), basis.project(end)),
    pad: _ => Line(start, end),
  };
}

export function Path(points: IPoint[]): IPath {
  return {
    svgTag: 'line',
    svgAttrs: (() => {
      const [head, ...tail] = points;
      const pathStr = tail.reduce(
        (acc, pt) => `${acc} L ${pt.x} ${pt.y}`,
        `M ${head.x} ${head.y}`,
      );
      return {d: pathStr};
    })(),
    project: (basis: IBasis) => Path(points.map(basis.project)),
    pad: _ => Path(points),
  };
}


// export interface Point { x: number, y: number };
// export interface Basis { dimensions: { height: number, width: number }, xRange: Range, yRange: Range };
// export interface Range { min: number, max: number };

// export function project(point: Point, basis: Basis): Point {
//   const { x, y } = point;
//   const { dimensions, xRange, yRange } = basis;
//   const xMin = xRange.min, yMin = yRange.min;
//   const { height, width } = dimensions;
//   const xWidth = xRange.max - xRange.min;
//   const yWidth = yRange.max - yRange.min;

//   return Point(
//      ((x - xMin) / xWidth) * width,
//     height - (((y - yMin) / yWidth) * height)
//   )
// }


// export function Circle(center, radius) {

// }

// const Shape = daggy.taggedSum('Shape', {
//   Circle: ['center', 'radius'],
//   Rectangle: ['topLeft', 'bottomRight'],
//   Line: ['start', 'end'],
//   Path: ['pts'],
// });

// const {Circle, Rectangle, Line, Path} = Shape;

// Shape.prototype.svgAttrs = function () {
//   return this.cata({
//     Circle: ({x, y}, r) => ({cx: x, cy: y, r}),
//     Rectangle: (tl, br) => ({
//       x: tl.x,
//       y: tl.y,
//       width: br.x - tl.x,
//       height: br.y - tl.y
//     }),
//     Line: (s, e) => ({
//       x1: s.x,
//       y1: s.y,
//       x2: e.x,
//       y2: e.y
//     }),
//     Path: pts => {
//       const head = R.head(pts);
//       const pathStr = R.reduce(
//         (acc, pt) => `${acc} L ${pt.x} ${pt.y}`,
//         `M ${head.x} ${head.y}`,
//         R.tail(pts)
//       );

//       return {d: pathStr};
//     }
//   })
// }

// Shape.prototype.project = function (basis) {
//   return this.cata({
//     Circle: (c, r) => Circle(basis.project(c), r),
//     Rectangle: (tl, br) => Rectangle(basis.project(tl), basis.project(br)),
//     Line: (s, e) => Line(basis.project(s), basis.project(e)),
//     Path: (pts) => Path(R.map(basis.project, pts)),
//   })
// };

// Shape.prototype.svgTag = function () {
//   return this.cata({
//     Circle: () => 'circle',
//     Rectangle: () => 'rect',
//     Line: () => 'line',
//     Path: () => 'path',
//   })
// };

// Shape.prototype.pad = function (padding) {
//   return this.cata({
//     // Circle: (center, radius) => Circle(center, radius - padding),
//     Circle: (c, r) => Circle(c, r),
//     Rectangle: (topLeft, bottomRight) => {
//       const tlx = topLeft.x + padding;
//       const brx = bottomRight.x - padding;

//       return Rectangle(Point(tlx, topLeft.y), Point(brx, bottomRight.y));
//     },
//     Line: (s, e) => Line(s, e)
//   })
// }

// module.exports = {
//   Point,
//   Range,
//   Shape,
// }
