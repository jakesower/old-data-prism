const R = require('ramda');
const h = require('snabbdom/h').default;

const {Action} = require('./types');

const pages = {
  UploadData: require('./pages/upload-data'),
  PrepareData: require('./pages/prepare-data'),
  Chart: require('./pages/chart'),
  Annotate: require('./pages/annotate'),
  Export: require('./pages/export'),
};

module.exports = R.curry(function(action$, model) {
  const pageClass = model.page.toLowerCase();

  return h('div', {
    class: {"body-container": true, [pageClass]: true}
  }, [
    h('nav', {}, [
      h('h1', {}, 'Data Prism'),
      h('a', {
        class: {selected: model.page === 'UploadData'},
        on: {click: [action$, Action.SetPage('UploadData')]}
      }, 'Source'),
      h('a', {
        class: {selected: model.page === 'PrepareData'},
        on: {click: [action$, Action.SetPage('PrepareData')]}
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
    ]),
    pages[model.page](action$, model)
  ]);
});
