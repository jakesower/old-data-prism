"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shapes_1 = require("./shapes");
const dom_1 = require("@cycle/dom");
const utils_1 = require("../../lib/utils");
function paddedBasis(dimensions, xRange, yRange, padding, textHeight) {
    const { height, width } = dimensions;
    return shapes_1.Basis({ height: height - (padding * 2) - textHeight,
        width: width - padding * 2
    }, xRange, yRange);
}
exports.paddedBasis = paddedBasis;
function defaultSvgAttrs(dimensions) {
    return {
        attrs: {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: `0 0 ${dimensions.width} ${dimensions.height}`,
            preserveAspectRatio: "xMidYMid"
        },
        class: { chart: true }
    };
}
function paddedSvg(dimensions, padding, attrs, body) {
    const klass = Object.assign({}, defaultSvgAttrs(dimensions).class, attrs.class);
    return dom_1.svg(Object.assign({}, attrs, defaultSvgAttrs(dimensions), { class: klass }), dom_1.h('g', { attrs: { transform: `translate(${padding}, ${padding})` } }, body));
}
exports.paddedSvg = paddedSvg;
// export function plot(shapes: Shape[], dimensions: Dimensions, options: { proportionalAxes?: boolean }): VNode {
// }
function toSvgTag(attrs, shape) {
    return dom_1.h(shape.svgTag, { attrs: Object.assign({}, attrs, shape.svgAttrs) }, shape.svgValue ? shape.svgValue : null);
}
exports.toSvgTag = toSvgTag;
function xAxisBreaks(valRange, dimRange) {
    // Draw a tick marks such that there can be no text overlap
    const width = dimRange.length;
    const translateRange = (n, initRange, targetRange) => (((n - initRange.min) / initRange.length) * targetRange.length) + targetRange.min;
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
    let pointLabels = [];
    for (let i = firstTick; i < valRange.max; i += tickInc) {
        pointLabels.push([translateRange(i, valRange, dimRange), utils_1.round(i, tickLog).toString()]);
    }
    const ticks = pointLabels.map(([x, label]) => [
        shapes_1.Line(shapes_1.Point(x, lineY - 5), shapes_1.Point(x, lineY + 5)),
        shapes_1.Label(shapes_1.Point(x, textY), label),
    ]);
    // const scale = Math.log10(maxVal - minVal);
    // Can a tick mark be placed for every value between min and max?
    const endPoint = shapes_1.Point(dimRange.max, lineY);
    return utils_1.flatten([
        shapes_1.Line(shapes_1.Point(dimRange.min, lineY), endPoint),
        ticks,
    ]);
}
exports.xAxisBreaks = xAxisBreaks;
function yAxisBreaks(valRange, dimRange) {
    // Draw a tick marks such that there can be no text overlap
    const flip = n => dimRange.max - n;
    const translateRange = (n, initRange, targetRange) => (((n - initRange.min) / initRange.length) * targetRange.length) + targetRange.min;
    // constraints from dimensions
    const tickLog = Math.floor(Math.log10(valRange.length));
    const maxTextWidth = yAxisWidth(valRange) + 5;
    const maxTicks = Math.floor(dimRange.length / 6); // TODO: figure this out better
    // use those to find round numbers from the value range
    const minTickInc = valRange.length / maxTicks;
    // const tickLog = Math.floor(Math.log10(minTickInc));
    const tickInc = Math.ceil(minTickInc / Math.pow(10, tickLog)) * Math.pow(10, tickLog);
    const firstTick = Math.ceil(valRange.min / tickInc) * tickInc;
    let pointLabels = [];
    for (let i = firstTick; i < valRange.max; i += tickInc) {
        pointLabels.push([translateRange(i, valRange, dimRange), utils_1.round(i, tickLog).toString()]);
    }
    const lineX = maxTextWidth - 5;
    const textX = 0;
    const ticks = pointLabels.map(([y, label]) => [
        shapes_1.Line(shapes_1.Point(lineX - 5, flip(y)), shapes_1.Point(lineX + 5, flip(y))),
        shapes_1.Label(shapes_1.Point(textX, flip(y) + 5), label),
    ]);
    const endPoint = shapes_1.Point(lineX, flip(dimRange.min));
    return utils_1.flatten([
        shapes_1.Line(shapes_1.Point(lineX, 0), endPoint),
        ticks,
    ]);
}
exports.yAxisBreaks = yAxisBreaks;
function yAxisWidth(valRange) {
    const tickLog = Math.floor(Math.log10(valRange.length));
    return (Math.max(utils_1.round(valRange.min, tickLog).toString().length, utils_1.round(valRange.max, tickLog).toString().length) * 10) + 3;
}
exports.yAxisWidth = yAxisWidth;
