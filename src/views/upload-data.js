const R = require('ramda');
const h = require('snabbdom/h').default;

module.exports = R.curry((action$, model) => {
  return h('main-container', {}, [
    h('aside', {}, [
      h('p', {}, "Select a file to upload"),
      h('p', {}, "The first row should be headers.")
    ]),

    h('main', {}, [
      h('input', {
        type: 'file',
        id: 'data-file',
      }, [])
    ])
  ])
});
