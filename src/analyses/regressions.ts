import { DataSource } from '../types';
import { populateSlots } from '../lib/data-functions';
import { ColumnSlot } from '../lib/slots';
import dataTypes from '../lib/data-types';
import { IPoint } from '../components/charts/shapes';

export const LinearRegression = (function () {
  const slots = {
    xValues: ColumnSlot({ display: 'X-Values', type: dataTypes.FiniteNumber }),
    yValues: ColumnSlot({ display: 'Y-Values', type: dataTypes.FiniteNumber }),
  };

  return {
    fn: (xs: number[], ys: number[]) => {
      const n = xs.length;
      let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;

      for (let i=0;i<n;i+=1) {
        const x = xs[i], y = ys[i];
        sumX += x;
        sumY += y;
        sumXY += x*y;
        sumX2 += x*x;
        sumY2 += y*y;
      }

      const num = (n*sumXY) - (sumX * sumY);
      const den = Math.sqrt(((n*sumX2) - (sumX*sumX)) * ((n*sumY2) - (sumY*sumY) ));

      return num / den;
    }
  };
}());


// TODO: Optimize this big time
export function regressionLine(points: IPoint[]): { slope: number, yIntercept: number } {
  const n = points.length;
  const r2 = LinearRegression.fn(points.map(p => p.x), points.map(p => p.y));
  let sumX = 0 , sumY = 0, sx = 0, sy = 0;

  for (let i=0;i<n;i+=1) {
    const x = points[i].x, y = points[i].y;
    sumX += x;
    sumY += y;
  }

  const xMean = sumX / n;
  const yMean = sumY / n;

  for (let i=0;i<n;i+=1) {
    const x = points[i].x, y = points[i].y;
    sx += Math.pow(x - xMean, 2);
    sy += Math.pow(y - yMean, 2);
  }

  const stdX = Math.sqrt(sx);
  const stdY = Math.sqrt(sy);

  const slope = r2 * (stdY / stdX);
  const yIntercept = yMean - (slope * xMean);
  // console.log({ slope, yIntercept, r2, sumX, sx, sy, r, stdX, stdY })

  return { slope, yIntercept };
}
