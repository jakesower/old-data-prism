import { Basis, Shape } from './chart-types';
import { h, svg } from '@cycle/dom';

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
  return svg({ ...attrs, ...defaultSvgAttrs(dimensions) },
    h('g', {attrs: {transform: `translate(${padding}, ${padding})`}}, body)
  )
}

export function toSvgTag(attrs, shape: Shape) {
  return h(
    shape.svgTag,
    { attrs: { ...attrs, ...shape.svgAttrs }}
  );
}
