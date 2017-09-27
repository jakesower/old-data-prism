const R = require('ramda');
const h = require('snabbdom/h').default;

module.exports = R.curry((action$, model) => {
  return h('div', {class: {"main-container": true}}, [
    h('aside', {}, [
      h('p', {}, "Help make the data in the table easier to understand.")
    ]),

    h('main', {}, R.map(
      col => h('div', {}, col.header),
      model.dataset.columns()
    )
  ])
});
