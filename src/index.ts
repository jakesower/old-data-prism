import run from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import csvLoader from './drivers/csv-loader';
import dimensions from './drivers/main-dimensions';
import csvExport from './drivers/csv-export';
import main from './components/main';

run(main, {
  DOM: makeDOMDriver('#app'),
  csvLoader,
  dimensions,
  csvExport,
});
