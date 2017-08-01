const R = require('ramda');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');

const {Action} = require('../types');
const ColumnSelector = require('../../column-selector');
const {applyOperations} = require('../../../lib/operation-functions');
const {relevantColumns} = require('../../../lib/dataset-functions');

module.exports = R.curry((action$, model) => {
  const { mainDimensions } = model;
  const dataset = applyOperations(model.dataset, model.operations);

  return h('div', {class: {"main-container": true}}, [
    h('aside', {}, [
      h('div', {class: {"operation-form": true}}, [
        h('label', {attrs: {for: 'x-axis'}}, "X-Axis"),
        ColumnSelector.single(
          R.addIndex(R.map)((h, idx) => ({val: idx, display: h}), dataset.headers),
          forwardTo(action$, x => Action.SetChart(R.merge(model.chart, {xAxis: parseInt(x)}))),
          model.chart.xAxis
        ),

        h('label', {attrs: {for: 'y-axis'}}, "Y-Axis"),
        ColumnSelector.single(
          R.map(
            ({header, index}) => ({val: index, display: header}),
            relevantColumns(dataset, n => !isNaN(n))
          ),
          forwardTo(action$, y => Action.SetChart(R.merge(model.chart, {yAxis: parseInt(y)}))),
          model.chart.yAxis
        ),
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
    R.reduce(R.max, -Infinity)
  )(dataset.records);

  const numEntries = R.length(dataset.records);
  const padding = 10;
  const totalPadding = (padding * (numEntries + 2));
  const width = Math.floor((mainDimensions.width - totalPadding) / numEntries);
  const barHeight = Math.floor(mainDimensions.height * 0.8);
  const scale = barHeight / maxValue;

  const label = (val, idx) => {
    const attrs = {
      x: Math.floor(((idx + 0.5) * (width + padding)) + padding),
      y: barHeight + 20
    };

    return h('text', {attrs}, val);
  }

  const rect = (val, idx) => {
    const attrs = {
      x: (idx * (width + padding)) + padding,
      width,
      y: barHeight - Math.floor(val * scale),
      height: Math.floor(val * scale)
    };

    return h('rect', {attrs}, []);
  }

  const bars = R.addIndex(R.map)(
    rect,
    R.map(R.pipe(R.nth(yAxis), parseFloat), dataset.records)
  );

  const labels = R.addIndex(R.map)(
    label,
    R.map(R.nth(xAxis), dataset.records)
  );

  return h('svg', {
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: `0 0 ${mainDimensions.width} ${mainDimensions.height}`,
      preserveAspectRatio: "xMidYMid",
      class: "chart"
    }
  }, R.flatten([
    bars,
    labels
  ]))

}
