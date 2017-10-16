const R = require('ramda');
const h = require('snabbdom/h').default;
const {targetValue} = require('../../../lib/utils');

const Action = require('../action');
const Samples = require('../../../samples/index');

const emptyOption = h('option', {}, '');

module.exports = R.curry((action$, model) => {
  const activeSource = R.find(s => s.id === model.activeSource, model.sources);

  return h('div', {class: {"main-container": true}}, [
    h('aside', {class: {source: true}}, [
      h('h2', {}, "+ Add Source"),
      R.length(model.sources) > 0 ?
        sourceList(action$, model.sources, model.activeSource) :
        h('p', {}, [
          'Get started by importing a data source. New to Data Prism? ...'
        ])
    ]),

    h('main', {class: {source: true}},
      model.activeSource ?
        activeSourceVdom(action$, activeSource) :
        newSourceVdom(action$)
    )
  ])
});


function activeSourceVdom(action$, source) {
  return h('div', {}, [
    h('h1', {}, source.name),
    
  ])
}


function newSourceVdom(action$) {
  return h('div', {}, [
    h('h1', {}, 'Load New Source'),

    h('div', {}, [
      h('div', {class: {colgroup: true}}, [
        h('div', {class: {"upload-type": true}}, [
          h('h2', {}, 'Upload CSV'),
          h('label', {}, 'Name'),
          h('input', {
            on: {keyup: [action$, Action.SetSourceName, targetValue]},
            value: model.sourceName
          }),
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
        ])
      ])
    ])
  ]);
}


function sourceList(action$, sources, activeSource) {
  console.log(sources)
  return h('div', {class: {"source-list": true}}, R.map(
    source => h('div', {class: {source: true, active: source.id === activeSource}}, [
      h('h2', R.isEmpty(source.name) ? '<no name>' : source.name),
      h('div', {class: {"source-stat": true}}, `Records: ${source.data.records.length}`),
      source.id === activeSource ? '' :
        h('div',
          { class: {"control-button": true},
            on: {click: [action$, Action.SetActiveSource(source.id)]}
          }, 'Activate')
    ]),
    sources
  ));
}
