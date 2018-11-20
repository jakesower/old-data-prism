import run from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import csvLoader from './drivers/csv-loader';
import dimensions from './drivers/main-dimensions';
import main from './components/main';

run(main, {
  DOM: makeDOMDriver('#app'),
  csvLoader,
  dimensions,
});
