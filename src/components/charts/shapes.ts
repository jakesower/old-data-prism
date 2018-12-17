interface BaseShape {
  svgAttrs: object,
  svgTag: string,
  svgValue?: string,
  project: (basis: IBasis) => Shape,
  pad: (padding: number) => Shape,
};

interface ICircle extends BaseShape {}
interface IRectangle extends BaseShape {}
interface ILine extends BaseShape {}
interface IPath extends BaseShape {}

export type Shape = ICircle | IRectangle | ILine | IPath;

interface IDimensions { height: number, width: number };

export interface IPoint {
  x: number,
  y: number,
  project: (basis: IBasis) => IPoint,
};

export interface IRange {
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
  return { min, max, length: max - min };
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

export function Label(center: IPoint, str: string) {
  return {
    svgTag: 'text',
    svgAttrs: { x: center.x, y: center.y },
    svgValue: str,
    project: (basis: IBasis) => Label(basis.project(center), str),
    pad: _ => Label(center, str),
  }
}
