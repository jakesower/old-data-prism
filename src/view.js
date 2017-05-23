const R = require('ramda');
const h = require('snabbdom/h').default;

const pages = {
  UploadData: require('./views/upload-data'),
  PrepareData: require('./views/prepare-data')
};

module.exports = R.curry(function(action$, model) {
  const pageClass = model.page.toLowerCase();

  return h('div', {
    class: {"body-container": true, [pageClass]: true}
  }, [
    h('nav', {}, [
      h('h1', {}, 'Data Prism'),
      h('a', {class: {selected: model.page === 'UploadData'}}, 'Upload Data'),
      h('a', {class: {selected: model.page === 'PrepareData'}}, 'Prepare Data')
    ]),
    pages[model.page](action$, model)
  ]);
});
