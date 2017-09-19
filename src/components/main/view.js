const R = require('ramda');
const h = require('snabbdom/h').default;

const Action = require('./action');

const pages = {
  UploadData: require('./pages/upload-data'),
  Remix: require('./pages/remix'),
  Chart: require('./pages/chart'),
  Annotate: require('./pages/annotate'),
  Export: require('./pages/annotate'),
  Indigo: require('./pages/annotate'),
  Purple: require('./pages/annotate'),
};

module.exports = R.curry(function(action$, model) {
  const pageClass = model.page.toLowerCase();

  return h('div', {
    class: {"body-container": true, [pageClass]: true, help: model.help}
  }, [
    h('nav', {}, [
      h('h1', {}, 'Data Prism'),
      h('div', {
        class: {help: true},
        on: {click: [action$, Action.ToggleHelp]}
      }),
      h('a', {
        class: {selected: model.page === 'UploadData'},
        on: {click: [action$, Action.SetPage('UploadData')]}
      }, 'Source'),
      h('a', {
        class: {selected: model.page === 'Remix'},
        on: {click: [action$, Action.SetPage('Remix')]}
      }, 'Remix'),
      h('a', {
        class: {selected: model.page === 'Chart'},
        on: {click: [action$, Action.SetPage('Chart')]}
      }, 'Chart'),
      h('a', {
        class: {selected: model.page === 'Annotate'},
        on: {click: [action$, Action.SetPage('Annotate')]}
      }, 'Annotate'),
      h('a', {
        class: {selected: model.page === 'Export'},
        on: {click: [action$, Action.SetPage('Export')]}
      }, 'Export'),
      h('a', {
        class: {selected: model.page === 'Purple'},
        on: {click: [action$, Action.SetPage('Purple')]}
      }, 'Purple'),
    ]),
    h('div', {class: {'help-bar': true}}, [
      h('div', {class: {'help-text': true}}, "Hi, I'm the most helpful message in the whole goddamn world. You're not totally fucking this up, I promise!"),
    ]),
    pages[model.page](action$, model)
  ]);
});
