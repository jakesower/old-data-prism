import { h } from "@cycle/dom";
import { pipeThru, flatten } from "../../lib/utils";
import { DataSource } from "../../types";
import { Range, Point, Line, Rectangle } from './chart-types';
import { paddedBasis, toSvgTag, paddedSvg } from "./utils";
import { ColumnSlot } from '../../lib/slots';
import dataTypes from '../../lib/data-types';


export const slots = {
  xAxis: ColumnSlot({ display: 'X Axis', type: dataTypes.String }),
  yAxis: ColumnSlot({ display: 'Y Axis', type: dataTypes.FiniteNumber })
};


export function fn(dataSource: DataSource, inputs, dimensions) {
  const { xAxis, yAxis } = inputs;
  if (!xAxis || !yAxis) return [];

  const textHeight = 20;

  const yVals = dataSource.columns[yAxis].values.map(parseFloat);
  const xRange = Range(0, dataSource.numRecords);
  const yRange = Range(
    yVals.reduce((a, b) => Math.min(a, b), 0),
    yVals.reduce((a, b) => Math.max(a, b), 0)
  );

  const basis = paddedBasis(dimensions, xRange, yRange, 10, 20);

  const yZero = toSvgTag(
    {class: {zero: true}},
    Line(Point(0, 0), Point(xRange.max, 0)).project(basis)
  );

  const barShape = (x, y) => y > 0 ?
    Rectangle(Point(x, y), Point(x + 1, 0)) :
    Rectangle(Point(x, 0), Point(x + 1, y));

  const bars = pipeThru(yVals, [
    (yvs: number[]) => yvs.map((yv, idx) => barShape(idx, yv)),
    rcts => rcts.map(rct => rct.project(basis).pad(10)),
    rcts => rcts.map(rct => toSvgTag({} , rct)),
  ]);

  const columnLabels = pipeThru(dataSource, [
    ds => ds.columns[xAxis].values,
    vals => vals.map((label, idx) => {
      const xCoord = Point(idx + 0.5, 0).project(basis).x;
      return h('text',
        { attrs: { x: xCoord, y: dimensions.height - 20 }},
        label
      );
    })
  ]);


  const dataLabels = yVals.map((yVal, idx) => {
    const barTop = Point(idx + 0.5, yVal).project(basis);
    const zeroPoint = Point(idx + 0.5, 0).project(basis);
    const yDelta = barTop.y - zeroPoint.y;
    const outside = Math.abs(yDelta) > textHeight;
    const above = (outside && yDelta > 0) || (!outside && yDelta < 0);
    const attrs = {
      x: barTop.x,
      y: above ? (barTop.y - 8) : (barTop.y + textHeight)
    };

    return h('text', {attrs}, yVal);
  });

  return paddedSvg(dimensions, 10, {}, flatten([
    bars,
    [yZero],
    columnLabels,
    dataLabels
  ]));
}
