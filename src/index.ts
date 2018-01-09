import * as R from 'ramda';
import { runNow, time, fromPromise, snapshot, sample, Now, perform } from '@funkia/hareactive';
import * as snabbdom from 'snabbdom';

import snabClass = require('snabbdom/modules/class');
import snabELs = require('snabbdom/modules/eventlisteners');
import snabAttrs = require('snabbdom/modules/attributes');
import snabProps = require('snabbdom/modules/props');

const h = snabbdom.h;

const patch = snabbdom.init([
  snabClass.default,
  snabELs.default,
  snabAttrs.default,
  snabProps.default,
]);

const root = document.body;

const three = Promise.resolve(3);
const f = fromPromise(three);
perform(console.log('hi'))

// runNow()
patch(root, h('div', 'oh hai'));
