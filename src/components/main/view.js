const R = require('ramda');
const h = require('snabbdom/h').default;

const Action = require('./action');

const pages = {
  Source: require('./pages/source'),
  Remix: require('./pages/remix'),
  Chart: require('./pages/chart'),
  Annotate: require('./pages/annotate'),
  Export: require('./pages/annotate'),
  Purple: require('./pages/annotate'),
};

module.exports = R.curry(function(action$, model) {
  const pageClass = model.page.toLowerCase();
  const tab = n => h('a', {
    class: {selected: model.page === n},
    on: {click: [action$, Action.SetPage(n)]}
  }, n);

  return h('div', {
    class: {"body-container": true, [pageClass]: true, help: model.help}
  }, [
    h('nav', {}, [
      h('h1', {}, 'Data Prism'),
      tab('Source'),
      tab('Remix'),
      tab('Chart'),
      tab('Annotate'),
      tab('Export'),
      tab('Purple')
    ]),
    h('div', {class: {'help-bar': true}}, [
      h('div', {class: {'help-text': true}}, "Hi, I'm a help message!"),
    ]),
    pages[model.page](action$, model)
  ]);
});
