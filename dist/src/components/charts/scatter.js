"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@cycle/dom");
const utils_1 = require("../../lib/utils");
const shapes_1 = require("./shapes");
const chart_utils_1 = require("./chart-utils");
const data_types_1 = require("../../lib/data-types");
const slots_1 = require("../../lib/slots");
const analyses_1 = require("../../analyses");
exports.slots = {
    rowAxis: slots_1.ColumnSlot({ display: 'X Axis', type: data_types_1.default.String }),
    colAxis: slots_1.ColumnSlot({ display: 'Y Axis', type: data_types_1.default.FiniteNumber }),
    invert: slots_1.FreeSlot({ display: 'Invert', type: data_types_1.default.Boolean }),
};
function plot(points, dimensions) {
    // TODO: Optimize
    const xRange = shapes_1.Range(Math.min(...points.map(p => p.x)), Math.max(...points.map(p => p.x)));
    const yRange = shapes_1.Range(Math.min(...points.map(p => p.y)), Math.max(...points.map(p => p.y)));
    const xOffset = chart_utils_1.yAxisWidth(yRange);
    const yOffset = 45;
    const basis = chart_utils_1.paddedBasis({ height: dimensions.height - yOffset, width: dimensions.width - xOffset }, xRange, yRange, 10, 0);
    // TODO: transduce
    const circles = points
        .map(pt => shapes_1.Circle(pt.project(basis), 2))
        .map(c => chart_utils_1.toSvgTag({}, c));
    const axes = utils_1.flatten([
        chart_utils_1.xAxisBreaks(xRange, shapes_1.Range(xOffset, dimensions.width)).map(s => chart_utils_1.toSvgTag({}, s)),
        chart_utils_1.yAxisBreaks(yRange, shapes_1.Range(yOffset, dimensions.height)).map(s => chart_utils_1.toSvgTag({ class: "y-axis" }, s)),
    ]);
    const { slope, yIntercept } = analyses_1.regressionLine(points);
    const regLineShape = shapes_1.Line(shapes_1.Point(xRange.min, yIntercept + (slope * xRange.min)), shapes_1.Point(xRange.max, yIntercept + (slope * xRange.max)));
    const regLine = chart_utils_1.toSvgTag({}, regLineShape.project(basis));
    // const yZero = toSvgTag(
    //   {class: {zero: true}},
    //   Shape.Line(Point(0, 0), Point(xRange.max, 0)).project(basis)
    // );
    return chart_utils_1.paddedSvg(dimensions, 10, { class: { 'scatter-plot': true, 'regression-chart': true } }, [
        dom_1.h('g.plots', { attrs: { transform: `translate(${xOffset}, 0)` } }, circles),
        dom_1.h('g.axes', axes),
        dom_1.h('g.regression-line', { attrs: { transform: `translate(${xOffset}, 0)` } }, regLine),
    ]);
}
exports.plot = plot;
// export function fn(dataset, inputs, dimensions) {
//   const {rowAxis, colAxes, invert} = inputs;
//   if (R.isEmpty(rowAxis) || R.isEmpty(colAxes)) return [];
//   const columns = dataset.columns;
//   const rangePipe = R.pipe(
//     R.flatten,
//     R.map(parseFloat),
//     R.append(0),
//     R.apply(R.juxt([Math.min, Math.max])),
//     R.apply(Range)
//   );
//   const rawPoints = R.map(c => columns[c].values, colAxes);
//   const grid = invert ? R.transpose(rawPoints) : rawPoints;
//   // const categories = invert ?
//   //   R.map(c => columns[c].header, colAxes) :
//   //   R.map(R.nth(R.__, dataset.records), rowAxis);
//   const numCategories = R.length(invert ? dataset.records : colAxes);
//   const xRange = Range(0, numCategories);
//   const yRange = rangePipe(grid);
//   const basis = paddedBasis(dimensions, xRange, yRange, 10, 0);
//   const xs = R.range(0, numCategories);
//   const toCircle = ({x, y}) => Shape.Circle(Point(x + 0.5, y), 4);
//   const catGrid = R.flatten(
//     R.zipWith(
//       (x, pts) => R.map(y => ({x, y}), pts),
//       xs, grid
//     )
//   );
//   const circles = R.pipe(
//     R.map(toCircle),
//     R.map(c => c.project(basis)),
//     R.map(toSvgTag({}))
//   )(catGrid);
//   const yZero = toSvgTag(
//     {class: {zero: true}},
//     Shape.Line(Point(0, 0), Point(xRange.max, 0)).project(basis)
//   );
//   return paddedSvg(dimensions, 10,
//     {class: {'scatter-plot': true}},
//     R.flatten([
//       circles,
//       [yZero]
//     ])
//   );
// }
