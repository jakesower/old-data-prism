const R = require('ramda');
const h = require('snabbdom/h').default;

const Action = require('../types').Action;

const emptySourceMessage = h('p', {}, "Select a file to upload. Currenly only CSV files may be uploaded. The first row of the file should be headers.");

module.exports = R.curry((action$, model) => {
  return h('div', {class: {"main-container": true}}, [
    h('aside', {}, [
      h('p', {}, "Select a file to upload. Currenly only CSV files may be uploaded. The first row of the file should be headers.")
    ]),

    h('main', {}, [
      h('h2', {}, 'Upload CSV'),
      h('input', {
        attrs: {type: 'file', id: 'data-file'},
        on: {change: [action$, Action.StartUpload(action$)]}
      }, [])
    ])
  ])
});
