import { h } from "@cycle/dom";
import { pipeThru, flatten, unnest } from "../../lib/utils";
import { DataSource } from "../../types";
import { Range, Point, Line, Rectangle, IPoint, Circle } from './shapes';
import { paddedBasis, toSvgTag, paddedSvg, xAxisBreaks, yAxisBreaks, yAxisWidth } from "./chart-utils";
import dataTypes from '../../lib/data-types';
import { FreeSlot, ColumnSlot } from "../../lib/slots";
import { regressionLine } from "../../analyses";

export const slots = {
  rowAxis: ColumnSlot({ display: 'X Axis', type: dataTypes.String }),
  colAxis: ColumnSlot({ display: 'Y Axis', type: dataTypes.FiniteNumber }),
  invert: FreeSlot({ display: 'Invert', type: dataTypes.Boolean }),
}


export function plot(points: IPoint[], dimensions: { height: number, width: number }) {
  // TODO: Optimize
  const xRange = Range(Math.min(...points.map(p => p.x)), Math.max(...points.map(p => p.x)));
  const yRange = Range(Math.min(...points.map(p => p.y)), Math.max(...points.map(p => p.y)));

  const xOffset = yAxisWidth(yRange);
  const yOffset = 45;
  const basis = paddedBasis({ height: dimensions.height - yOffset, width: dimensions.width - xOffset}, xRange, yRange, 10, 0);
  console.log({ points, dimensions })

  // TODO: transduce
  const circles = points
    .map(pt => Circle(pt.project(basis), 2))
    .map(c => toSvgTag({}, c));

  const axes = flatten([
    xAxisBreaks(xRange, Range(xOffset, dimensions.width)).map(s => toSvgTag({}, s)),
    yAxisBreaks(yRange, Range(yOffset, dimensions.height)).map(s => toSvgTag({ class: "y-axis" }, s)),
  ]);

  const { slope, yIntercept } = regressionLine(points);
  const regLineShape = Line(
    Point(xRange.min, yIntercept + (slope*xRange.min)),
    Point(xRange.max, yIntercept + (slope*xRange.max))
  );
  console.log({ slope, yIntercept, regLineShape, proj: regLineShape.project(basis) })
  const regLine = toSvgTag({}, regLineShape.project(basis));

  // const yZero = toSvgTag(
  //   {class: {zero: true}},
  //   Shape.Line(Point(0, 0), Point(xRange.max, 0)).project(basis)
  // );

  return paddedSvg(dimensions, 10,
    {class: { 'scatter-plot': true, 'regression-chart': true }},
    [
      h('g.plots', { attrs: { transform: `translate(${xOffset}, 0)` }}, circles),
      h('g.axes', axes),
      h('g.regression-line', { attrs: { transform: `translate(${xOffset}, 0)` }}, regLine),
    ],
  );
}


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
