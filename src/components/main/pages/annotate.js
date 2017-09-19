const R = require('ramda');
const h = require('snabbdom/h').default;

module.exports = R.curry((action$, model) => {
  return h('div', {class: {"main-container": true}}, [
    h('aside', {}, [
      h('p', {}, "Placeholder")
    ]),

    h('main', {}, [
      h('div', {}, 'Hi'),
    ])
  ])
});
