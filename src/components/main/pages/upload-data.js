const R = require('ramda');
const h = require('snabbdom/h').default;
const {targetValue} = require('../../../lib/utils');

const Action = require('../types').Action;
const Samples = require('../../../samples/index');

const emptyOption = h('option', {}, '');

module.exports = R.curry((action$, model) => {
  return h('div', {class: {"main-container": true}}, [
    h('aside', {class: {source: true}}, [
      h('h2', {}, "Welcome"),
      h('p', {}, [
        'Get started by choosing a data source.'
      ])
    ]),

    h('main', {class: {source: true}}, [
      h('div', {class: {colgroup: true}}, [
        h('div', {class: {"upload-type": true}}, [
          h('h2', {}, 'Upload CSV'),
          h('input', {
            attrs: {type: 'file', id: 'data-file'},
            on: {change: [action$, Action.LoadLocalFile('data-file')]}
          }, [])
        ]),

        h('div', {class: {"upload-type": true}}, [
          h('h2', {}, 'Load Sample Data'),
          h('select',
            { on: {change: R.compose(action$, Action.LoadURI, targetValue)}
            },
            R.prepend(emptyOption, R.map(({name, uri}) =>
              h('option', {attrs: {value: uri}}, name),
              Samples.catalog
            ))
          )
        ]),
      ]),
    ])
  ])
});
