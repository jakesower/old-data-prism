import R from 'ramda';
import { default as h  } from 'snabbdom/h';

import { Action  } from './types';
import UploadData from './pages/upload-data';
import PrepareData from './pages/prepare-data';
import Chart from './pages/chart';

const pages = {
  UploadData,
  PrepareData,
  Chart,
};

export default R.curry(function(action$, model) {
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
