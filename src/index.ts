import run from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import csvLoader from './drivers/csv-loader';
import main from './components/main';

run(main, {
  DOM: makeDOMDriver('#app'),
  csvLoader,
});
