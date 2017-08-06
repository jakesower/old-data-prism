import R from 'ramda';
import { default as h  } from 'snabbdom/h';

import { Action as Action  } from '../types';

export default R.curry((action$, model) => {
  return h('div', {class: {"main-container": true}}, [
    h('aside', {}, [
      h('p', {}, "Select a file to upload"),
      h('p', {}, "The first row should be headers.")
    ]),

    h('main', {}, [
      h('input', {
        attrs: {type: 'file', id: 'data-file'},
        on: {change: [action$, Action.StartUpload(action$)]}
      }, [])
    ])
  ])
});
