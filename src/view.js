const R = require('ramda');
const h = require('snabbdom/h').default;

const pages = {
  UploadData: require('./views/upload-data')
}

module.exports = R.curry(function(action$, model) {
  return h('a', {props: {href: '/foo'}}, 'Go to Foo')
  console.log(model);
  return h('div', {
    class: "body-container"
  }, [
    h('nav', {}, [
      h('h1', {}, 'Data Prism'),
      h('a', {attrs: {href: '/foo'}}, 'Go to Foo'),
      h('a', {class: {selected: model.page === 'PrepareData'}}, 'Prepare Data')
    ])
  ]);
});
