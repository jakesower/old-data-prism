const R = require('ramda');
const h = require('snabbdom/h').default;

const {Action} = require('./types');

const pages = {
  UploadData: require('./pages/upload-data'),
  PrepareData: require('./pages/prepare-data'),
  Chart: require('./pages/chart')
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
      }, 'Import'),
      h('a', {
        class: {selected: model.page === 'PrepareData'},
        on: {click: [action$, Action.SetPage('PrepareData')]}
      }, 'Prepare'),
      h('a', {
        class: {selected: model.page === 'Chart'},
        on: {click: [action$, Action.SetPage('Chart')]}
      }, 'Chart'),
    ]),
    pages[model.page](action$, model)
  ]);
});
