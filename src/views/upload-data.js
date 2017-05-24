const R = require('ramda');
const h = require('snabbdom/h').default;

const Action = require('../types').Action;

module.exports = R.curry((action$, model) => {
  return h('div', {class: {"main-container": true}}, [
    h('aside', {}, [
      h('p', {}, "Select a file to upload"),
      h('p', {}, "The first row should be headers.")
    ]),

    h('main', {}, [
      h('input', {
        attrs: {type: 'file', id: 'data-file'},
        on: {change: [action$, Action.StartUpload()]}
      }, [])
    ])
  ])
});
