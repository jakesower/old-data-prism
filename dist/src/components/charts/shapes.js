"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
;
;
;
;
function Point(x, y) {
    return { x, y,
        project: basis => basis.project(Point(x, y)),
    };
}
exports.Point = Point;
function Range(min, max) {
    return { min, max, length: max - min };
}
exports.Range = Range;
function Basis(dimensions, xRange, yRange) {
    return { dimensions, xRange, yRange,
        project: (point) => {
            const { height, width } = dimensions;
            const { x, y } = point;
            const xMin = xRange.min;
            const yMin = yRange.min;
            return Point((x - xMin) / xRange.length * width, height - (((y - yMin) / yRange.length) * height));
        }
    };
}
exports.Basis = Basis;
function Circle(center, radius) {
    return {
        svgTag: 'circle',
        svgAttrs: { cx: center.x, cy: center.y, r: radius },
        project: (basis) => Circle(basis.project(center), radius),
        pad: _ => Circle(center, radius),
    };
}
exports.Circle = Circle;
function Rectangle(topLeft, bottomRight) {
    return {
        svgTag: 'rect',
        svgAttrs: {
            x: topLeft.x,
            y: topLeft.y,
            width: bottomRight.x - topLeft.x,
            height: bottomRight.y - topLeft.y
        },
        project: (basis) => Rectangle(basis.project(topLeft), basis.project(bottomRight)),
        pad: (padding) => {
            const tlx = topLeft.x + padding;
            const brx = bottomRight.x - padding;
            return Rectangle(Point(tlx, topLeft.y), Point(brx, bottomRight.y));
        },
    };
}
exports.Rectangle = Rectangle;
function Line(start, end) {
    return {
        svgTag: 'line',
        svgAttrs: { x1: start.x, x2: end.x, y1: start.y, y2: end.y },
        project: (basis) => Line(basis.project(start), basis.project(end)),
        pad: _ => Line(start, end),
    };
}
exports.Line = Line;
function Path(points) {
    return {
        svgTag: 'line',
        svgAttrs: (() => {
            const [head, ...tail] = points;
            const pathStr = tail.reduce((acc, pt) => `${acc} L ${pt.x} ${pt.y}`, `M ${head.x} ${head.y}`);
            return { d: pathStr };
        })(),
        project: (basis) => Path(points.map(basis.project)),
        pad: _ => Path(points),
    };
}
exports.Path = Path;
function Label(center, str) {
    return {
        svgTag: 'text',
        svgAttrs: { x: center.x, y: center.y },
        svgValue: str,
        project: (basis) => Label(basis.project(center), str),
        pad: _ => Label(center, str),
    };
}
exports.Label = Label;
