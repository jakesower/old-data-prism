"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@cycle/dom");
const utils_1 = require("../../lib/utils");
const shapes_1 = require("./shapes");
const chart_utils_1 = require("./chart-utils");
const slots_1 = require("../../lib/slots");
const data_types_1 = require("../../lib/data-types");
exports.slots = {
    xAxis: slots_1.ColumnSlot({ display: 'X Axis', type: data_types_1.default.String }),
    yAxis: slots_1.ColumnSlot({ display: 'Y Axis', type: data_types_1.default.FiniteNumber })
};
function fn(dataSource, inputs, dimensions) {
    const { xAxis, yAxis } = inputs;
    if (!xAxis || !yAxis)
        return [];
    const textHeight = 20;
    const yVals = dataSource.columns[yAxis].values.map(parseFloat);
    const xRange = shapes_1.Range(0, dataSource.numRecords);
    const yRange = shapes_1.Range(yVals.reduce((a, b) => Math.min(a, b), 0), yVals.reduce((a, b) => Math.max(a, b), 0));
    const basis = chart_utils_1.paddedBasis(dimensions, xRange, yRange, 10, 20);
    const yZero = chart_utils_1.toSvgTag({ class: { zero: true } }, shapes_1.Line(shapes_1.Point(0, 0), shapes_1.Point(xRange.max, 0)).project(basis));
    const barShape = (x, y) => y > 0 ?
        shapes_1.Rectangle(shapes_1.Point(x, y), shapes_1.Point(x + 1, 0)) :
        shapes_1.Rectangle(shapes_1.Point(x, 0), shapes_1.Point(x + 1, y));
    const bars = utils_1.pipeThru(yVals, [
        (yvs) => yvs.map((yv, idx) => barShape(idx, yv)),
        rcts => rcts.map(rct => rct.project(basis).pad(10)),
        rcts => rcts.map(rct => chart_utils_1.toSvgTag({}, rct)),
    ]);
    const columnLabels = utils_1.pipeThru(dataSource, [
        ds => ds.columns[xAxis].values,
        vals => vals.map((label, idx) => {
            const xCoord = shapes_1.Point(idx + 0.5, 0).project(basis).x;
            return dom_1.h('text', { attrs: { x: xCoord, y: dimensions.height - 20 } }, label);
        })
    ]);
    const dataLabels = yVals.map((yVal, idx) => {
        const barTop = shapes_1.Point(idx + 0.5, yVal).project(basis);
        const zeroPoint = shapes_1.Point(idx + 0.5, 0).project(basis);
        const yDelta = barTop.y - zeroPoint.y;
        const outside = Math.abs(yDelta) > textHeight;
        const above = (outside && yDelta > 0) || (!outside && yDelta < 0);
        const attrs = {
            x: barTop.x,
            y: above ? (barTop.y - 8) : (barTop.y + textHeight)
        };
        return dom_1.h('text', { attrs }, yVal);
    });
    return chart_utils_1.paddedSvg(dimensions, 10, {}, utils_1.flatten([
        bars,
        [yZero],
        columnLabels,
        dataLabels
    ]));
}
exports.fn = fn;
