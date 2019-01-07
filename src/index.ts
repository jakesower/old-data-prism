import run from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';
import { makeHistoryDriver } from '@cycle/history';
import dimensions from './drivers/main-dimensions';
import csvExport from './drivers/csv-export';
import main from './components/main';

run(main, {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver(),
  history: makeHistoryDriver(),
  dimensions,
  csvExport,
});
