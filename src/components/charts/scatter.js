const R = require('ramda');
const h = require('snabbdom/h').default;
const dataTypes = require('../../definitions/data');
const DSF = require('../../lib/dataset-functions');


const slots = [
  { key: "rowAxis",
    display: "Row Axis",
    sourceType: "column",
    dataType: dataTypes.String // special cases handled in code
  },
  { key: "colAxes",
    display: "Column Axes",
    sourceType: "multicolumn",
    dataType: dataTypes.FiniteNumber
  },
  { key: "invert",
    display: "Invert",
    sourceType: "user",
    dataType: dataTypes.Boolean
  }
]


function fn(dataset, inputs, dimensions) {
  const {rowAxis, colAxes, invert} = inputs;

  if (R.isEmpty(rowAxis) || R.isEmpty(colAxes)) return [];

  const columns = DSF.columns(dataset);
  const rangePipe = R.pipe(
    R.map(parseFloat),
    R.append(0),
    R.apply(R.juxt([Math.min, Math.max]))
  );

  const grid = R.map(c => columns[c].values, colAxes);
  // const grid = invert ? R.transpose(rawPoints) : rawPoints;
  const [minValue, maxValue] = rangePipe(R.flatten(grid));

  // DEPENDS ON INVERSION!
  const categories = R.groupBy(R.nth(rowAxis), dataset.records);

  // Categorical case
  const yRange = maxValue - minValue;
  const numCategories = R.length(R.keys(categories));
  const padding = 10;
  const totalPadding = (padding * (numCategories + 2));
  const width = Math.floor((dimensions.width - totalPadding) / numCategories);
  const scale = Math.floor(dimensions.height - padding) / yRange;
  console.log({ numCategories, dimensions, totalPadding})

  // const xForCategory = cat =>


  console.log({minValue, maxValue, grid, categories, rs: dataset.records})

  const toCircle = ({x, y}) => {
    const attrs = {
      cx: Math.floor(((x + 0.5) * (width + padding)) + padding*0.5),
      cy: Math.floor(((yRange - (y - minValue)) * scale) + padding*0.5),
      r: 4
    }
    // console.log({attrs, x, y, padding, width})
    // console.log(attrs)

    return h('circle', {attrs})
  };

  const rowVals = row => R.map(c => row[c], colAxes);
  const catVals = R.chain(
    R.pipe(
      rowVals,
      R.values,
      R.map(parseFloat)
    )
  );

  const rowCircles = (row, idx) => R.map(toCircle(idx), rowVals(row));

  const circles = R.pipe(
    // R.map(R.map(rowVals)),
    // R.addIndex(R.map)((cat, idx) => ({x: idx, ys: R.chain(rowVals, cat)})),
    // R.chain(coords => R.map)
    R.addIndex(R.map)((cat, idx) => R.map(y => ({x: idx, y}), catVals(cat))),
    R.values,
    R.flatten,
    R.map(toCircle)
  )(categories);

  // console.log(rowCircles(categories['Chicago'], 0))
  // const circles = rowCircles(categories['Chicago'], 0);
  // console.

  return h('svg', {
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: `0 0 ${dimensions.width} ${dimensions.height}`,
      preserveAspectRatio: "xMidYMid",
      class: "chart scatter-plot"
    }
  }, R.flatten([
    circles
    // [zeroLine],
    // bars,
    // columnLabels,
    // dataLabels
  ]))
}

module.exports = {
  slots,
  fn
};
