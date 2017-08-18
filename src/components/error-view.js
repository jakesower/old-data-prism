const h = require('snabbdom/h').default;

module.exports = action$ => {
  return h('main', {on: {click: [action$, 'hi']}}, 'deth');
}
