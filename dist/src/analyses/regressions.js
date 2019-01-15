"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const slots_1 = require("../lib/slots");
const data_types_1 = require("../lib/data-types");
exports.LinearRegression = (function () {
    const slots = {
        xValues: slots_1.ColumnSlot({ display: 'X-Values', type: data_types_1.default.FiniteNumber }),
        yValues: slots_1.ColumnSlot({ display: 'Y-Values', type: data_types_1.default.FiniteNumber }),
    };
    return {
        fn: (xs, ys) => {
            const n = xs.length;
            let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
            for (let i = 0; i < n; i += 1) {
                const x = xs[i], y = ys[i];
                sumX += x;
                sumY += y;
                sumXY += x * y;
                sumX2 += x * x;
                sumY2 += y * y;
            }
            const num = (n * sumXY) - (sumX * sumY);
            const den = Math.sqrt(((n * sumX2) - (sumX * sumX)) * ((n * sumY2) - (sumY * sumY)));
            return num / den;
        }
    };
}());
// TODO: Optimize this big time
function regressionLine(points) {
    const n = points.length;
    const r2 = exports.LinearRegression.fn(points.map(p => p.x), points.map(p => p.y));
    let sumX = 0, sumY = 0, sx = 0, sy = 0;
    for (let i = 0; i < n; i += 1) {
        const x = points[i].x, y = points[i].y;
        sumX += x;
        sumY += y;
    }
    const xMean = sumX / n;
    const yMean = sumY / n;
    for (let i = 0; i < n; i += 1) {
        const x = points[i].x, y = points[i].y;
        sx += Math.pow(x - xMean, 2);
        sy += Math.pow(y - yMean, 2);
    }
    const stdX = Math.sqrt(sx);
    const stdY = Math.sqrt(sy);
    const slope = r2 * (stdY / stdX);
    const yIntercept = yMean - (slope * xMean);
    return { slope, yIntercept };
}
exports.regressionLine = regressionLine;
