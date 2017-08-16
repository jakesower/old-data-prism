const R = require('ramda');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');

const {Action} = require('../types');
const ColumnSelector = require('../../column-selector');
const {applyOperations} = require('../../../lib/operation-functions');
const {validColumns} = require('../../../lib/dataset-functions');
const dataTypes = require('../../../definitions/data');

module.exports = R.curry((action$, model) => {
  const dataset = applyOperations(model.dataset, model.operations);

  return h('div', {class: {"main-container": true}}, [
    h('aside', {}, [
      h('div', {class: {"form": true}}, [
        h('label', {attrs: {for: 'type'}}, "Chart Type"),
        ColumnSelector.single(
          [{ val: 'bar', display: 'Bar' }],
          forwardTo(action$, x => Action.SetChart(R.merge(model.chart, {type: x}))),
          model.chart.type
        ),

        h('div', {}, [
          h('label', {attrs: {for: 'x-axis'}}, "Label"),
          ColumnSelector.single(
            R.addIndex(R.map)((h, idx) => ({val: idx, display: h}), dataset.headers),
            forwardTo(action$, x => Action.SetChart(R.merge(model.chart, {xAxis: parseInt(x)}))),
            model.chart.xAxis
          ),
        ]),

        h('div', {}, [
          h('label', {attrs: {for: 'y-axis'}}, "Bar"),
          ColumnSelector.single(
            R.map(
              ({header, index}) => ({val: index, display: header}),
              validColumns(dataset, dataTypes.FiniteNumber)
            ),
            forwardTo(action$, y => Action.SetChart(R.merge(model.chart, {yAxis: parseInt(y)}))),
            model.chart.yAxis
          ),
        ])
      ])
    ]),

    h('main', {},
      barChart(dataset, model.chart.xAxis, model.chart.yAxis, model.mainDimensions)
    )
  ])
});


// TODO: zeroes
function barChart(dataset, xAxis, yAxis, mainDimensions) {
  if (R.isNil(xAxis) || R.isNil(yAxis)) return [];

  const maxValue = R.pipe(
    R.map(R.nth(yAxis)),
    R.map(parseFloat),
    R.reduce(R.max, 0)  // always include 0
  )(dataset.records);

  const minValue = R.pipe(
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
  const width = Math.floor((mainDimensions.width - totalPadding) / numEntries);
  const barHeight = Math.floor(mainDimensions.height - padding - textHeight*2);
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

  const zeroLine = h('line', {attrs: {x1: 0, x2: mainDimensions.width, y1: zero, y2: zero, class: "zero"}});

  return h('svg', {
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: `0 0 ${mainDimensions.width} ${mainDimensions.height}`,
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
