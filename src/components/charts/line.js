const R = require('ramda');
const h = require('snabbdom/h').default;
const dataTypes = require('../../definitions/data');


const slots = [
  { key: "rowAxis",
    display: "Row Axis",
    sourceType: "column",
    dataType: dataTypes.String // special cases handled in code
  },
  { key: "colAxis",
    display: "Column Axis",
    sourceType: "multicolumn",
    dataType: dataTypes.FiniteNumber
  },
  { key: "invert",
    display: "Linez",
    sourceType: "user",
    dataType: dataTypes.Enumerated(["Yes", "No"])
  }
]


function fn(dataset, inputs, dimensions) {
  const {xAxis, yAxis, dv} = inputs;
  if (R.isNil(xAxis) || R.isNil(yAxis) || R.isNil(dv)) return [];

  const rangePipe = col => R.pipe(
    R.map(R.nth(col)),
    R.map(parseFloat),
    R.append(0),
    R.juxt([Math.min, Math.max])
  )

  const [minX, maxX] = rangePipe(xAxis)(dataset.records);
  console.log({minX, maxX})

  const maxY = R.pipe(
    R.map(R.nth(yAxis)),
    R.map(parseFloat),
    R.reduce(R.max, 0)  // always include 0
  )(dataset.records);

  const minY = R.pipe(
    R.map(R.nth(yAxis)),
    R.map(parseFloat),
    R.reduce(R.min, 0)  // always include 0
  )(dataset.records);

  // R.juxt instead?
  const yRange = maxValue - minValue;

  const numEntries = R.length(dataset.records);
  const padding = 10;
  const textHeight = 20;
  const totalPadding = (padding * (numEntries + 2));
  const width = Math.floor((dimensions.width - totalPadding) / numEntries);
  const barHeight = Math.floor(dimensions.height - padding - textHeight*2);
  const scale = barHeight / yRange;
  const zero = Math.abs(barHeight - Math.round(scale * minValue * -1));

  const columnLabel = (val, idx) => {
    const attrs = {
      x: Math.floor(((idx + 0.5) * (width + padding)) + padding*0.5),
      y: barHeight + textHeight*2
    };

    return h('text', {attrs}, val);
  }

  const dataLabel = (val, idx) => {
    const height = Math.abs(Math.floor(val * scale));
    const tinyOffset = (textHeight * 1.5) < height ? 0 : textHeight * 1.5;
    const yPoint =
      val < 0 ?
        zero + height - textHeight*1.5 + tinyOffset :
        zero - height - tinyOffset;

    const attrs = {
      x: Math.floor(((idx + 0.5) * (width + padding)) + padding*0.5),
      y: yPoint + textHeight
    }

    return h('text', {attrs}, val);
  }

  const rect = (val, idx) => {
    const height = Math.abs(Math.floor(val * scale));
    const yPoint = val < 0 ? zero : zero - height;

    const attrs = {
      x: (idx * (width + padding)) + padding,
      width,
      height,
      y: yPoint
    };

    return h('rect', {attrs}, []);
  }

  const bars = R.addIndex(R.map)(
    rect,
    R.map(R.pipe(R.nth(yAxis), parseFloat), dataset.records)
  );

  const columnLabels = R.addIndex(R.map)(
    columnLabel,
    R.map(R.nth(xAxis), dataset.records)
  );

  const dataLabels = R.addIndex(R.map)(
    dataLabel,
    R.map(R.nth(yAxis), dataset.records)
  );

  const zeroLine = h('line', {attrs: {x1: 0, x2: dimensions.width, y1: zero, y2: zero, class: "zero"}});

  return h('svg', {
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: `0 0 ${dimensions.width} ${dimensions.height}`,
      preserveAspectRatio: "xMidYMid",
      class: "chart"
    }
  }, R.flatten([
    [zeroLine],
    bars,
    columnLabels,
    dataLabels
  ]))
}


function range(vals) {
  return R.juxt([Math.min, Math.max], vals);
}

module.exports = {
  slots,
  fn
};
