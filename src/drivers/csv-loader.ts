import { adapt } from '@cycle/run/lib/adapt';
import xs, { Stream as XStream } from 'xstream';
import * as parseCsv from 'csv-parse';
import { Stream } from 'most';
import { DataSource, makeDataSource, makeDataColumn } from '../types';
import { transpose, zip } from '../lib/utils';
import { discoverTypes } from '../lib/data-functions';

interface Request {
  source: string,
  element: HTMLInputElement
}

export default function fileLoaderDriver(request$: XStream<Request>): Stream<DataSource> {
  const loaded$ = xs.create({
    start: () => {},
    stop: () => {}
  });

  request$.addListener({
    next: ({ source, element }) => {
      var file = (element.files || [])[0];
      var fileName = file.name.replace(/\.csv$/, '').replace(/_/g, ' ');

      var r = new FileReader();
      // r.onerror = function(e){error(e.target.error.name);};
      r.onload = function(e) {
        const result = this.result as string;
        parseCsv(result, {}, (err, data: string[][]) => {
          if (err) {
            loaded$.shamefullySendError(err);
          } else {
            const headers = data[0];
            const records = data.slice(1);
            const pairs = zip(headers, transpose(records));

            const columns = pairs.map(pair => makeDataColumn({
              name: pair[0],
              values: pair[1],
              types: discoverTypes(pair[1]),
            }));

            const s: DataSource = makeDataSource({
              id: source,
              name: fileName,
              columns,
            });

            loaded$.shamefullySendNext(s);
          }
        });
      };

      r.readAsText(file);
    },
    error: () => {},
    complete: () => {}
  });

  return adapt(loaded$);
}
