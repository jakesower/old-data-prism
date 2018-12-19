import { Basis, Shape, Line, Point, IRange, Label, IPoint } from './shapes';
import { h, svg, VNode } from '@cycle/dom';
import { flatten, round } from '../../lib/utils';

type Dimensions = { height: number, width: number };

export function paddedBasis(dimensions, xRange, yRange, padding, textHeight) {
  const { height, width } = dimensions;
  return Basis(
    { height: height - (padding * 2) - textHeight,
      width: width - padding * 2
    },
    xRange,
    yRange
  );
}

function defaultSvgAttrs(dimensions) {
  return {
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: `0 0 ${dimensions.width} ${dimensions.height}`,
      preserveAspectRatio: "xMidYMid"
    },
    class: {chart: true}
  };
}

export function paddedSvg(dimensions, padding, attrs, body) {
  const klass = { ...defaultSvgAttrs(dimensions).class, ...attrs.class };
  return svg({ ...attrs, ...defaultSvgAttrs(dimensions), class: klass },
    h('g', {attrs: {transform: `translate(${padding}, ${padding})`}}, body)
  )
}

// export function plot(shapes: Shape[], dimensions: Dimensions, options: { proportionalAxes?: boolean }): VNode {

// }

export function toSvgTag(attrs, shape: Shape) {
  return h(
    shape.svgTag,
    { attrs: { ...attrs, ...shape.svgAttrs }},
    shape.svgValue ? shape.svgValue : null,
  );
}


export function xAxisBreaks(valRange: IRange, dimRange: IRange): Shape[] {
  // Draw a tick marks such that there can be no text overlap
  const width = dimRange.length;
  const translateRange = (n: number, initRange: IRange, targetRange: IRange): number =>
    (((n - initRange.min) / initRange.length) * targetRange.length) + targetRange.min

  const lineY = dimRange.max - 45;
  const textY = lineY + 20;

  // constraints from dimensions
  const maxTextWidth = Math.max(valRange.min.toString().length, valRange.max.toString().length);
  const maxTicks = Math.floor(width / (maxTextWidth + 40));

  // use those to find round numbers from the value range
  const minTickInc = valRange.length / maxTicks;
  const tickLog = Math.floor(Math.log10(minTickInc));
  const tickInc = Math.ceil(minTickInc / Math.pow(10, tickLog)) * Math.pow(10, tickLog);
  const firstTick = Math.ceil(valRange.min / tickInc) * tickInc;

  let pointLabels: [number, string][] = [];
  for (let i=firstTick; i<valRange.max; i+=tickInc) {
    pointLabels.push([translateRange(i, valRange, dimRange), round(i, tickLog).toString()]);
  }

  const ticks = pointLabels.map(([x, label]) => [
    Line(Point(x, lineY-5), Point(x, lineY+5)),
    Label(Point(x, textY), label),
  ]);
  console.log({ ticks, firstTick, tickInc, tickLog, f: round(firstTick, tickLog) })

  // const scale = Math.log10(maxVal - minVal);
  // Can a tick mark be placed for every value between min and max?

  const endPoint = Point(dimRange.max, lineY);
  return flatten([
    Line(Point(dimRange.min, lineY), endPoint),
    ticks,
  ]) as Shape[];
}


export function yAxisBreaks(valRange: IRange, dimRange: IRange): Shape[] {
  // Draw a tick marks such that there can be no text overlap
  const flip = n => dimRange.max - n;
  const translateRange = (n: number, initRange: IRange, targetRange: IRange): number =>
    (((n - initRange.min) / initRange.length) * targetRange.length) + targetRange.min

  // constraints from dimensions
  const tickLog = Math.floor(Math.log10(valRange.length))
  const maxTextWidth = yAxisWidth(valRange) + 5;
  const maxTicks = Math.floor(dimRange.length / 6); // TODO: figure this out better

  // use those to find round numbers from the value range
  const minTickInc = valRange.length / maxTicks;
  // const tickLog = Math.floor(Math.log10(minTickInc));
  const tickInc = Math.ceil(minTickInc / Math.pow(10, tickLog)) * Math.pow(10, tickLog);
  const firstTick = Math.ceil(valRange.min / tickInc) * tickInc;

  let pointLabels: [number, string][] = [];
  for (let i=firstTick; i<valRange.max; i+=tickInc) {
    pointLabels.push([translateRange(i, valRange, dimRange), round(i, tickLog).toString()]);
  }

  const lineX = maxTextWidth - 5;
  const textX = 0;

  const ticks = pointLabels.map(([y, label]) => [
    Line(Point(lineX-5, flip(y)), Point(lineX+5, flip(y))),
    Label(Point(textX, flip(y)+5), label),
  ]);

  const endPoint = Point(lineX, flip(dimRange.min));
  return flatten([
    Line(Point(lineX, 0), endPoint),
    ticks,
  ]) as Shape[];
}


export function yAxisWidth(valRange) {
  const tickLog = Math.floor(Math.log10(valRange.length));
  return (Math.max(
    round(valRange.min, tickLog).toString().length,
    round(valRange.max, tickLog).toString().length
  ) * 10) + 3;
}
