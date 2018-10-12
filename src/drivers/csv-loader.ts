import { adapt } from '@cycle/run/lib/adapt';
import xs, { Stream as XStream } from 'xstream';
import parseCsv from 'csv-parse';
import { Stream } from 'most';
import { Source, DataColumn } from '../types';
import { transpose, zip } from '../lib/utils';
import { discoverTypes } from '../lib/data-functions';

interface Request {
  source: String,
  element: HTMLInputElement
}

export default function fileLoaderDriver(request$: XStream<Request>): Stream<Source> {
  const loaded$ = xs.create({
    start: () => {},
    stop: () => {}
  });

  request$.addListener({
    next: ({ source, element }) => {
      var file = element.files[0];
      var fileName = file.name.replace(/\.csv$/, '').replace(/_/g, ' ');

      var r = new FileReader();
      // r.onerror = function(e){error(e.target.error.name);};
      r.onload = function(e) {
        const result = this.result as string;
        parseCsv(result, {}, (err, data) => {
          if (err) {
            loaded$.shamefullySendError(err);
          } else {
            const headers = data[0];
            const records = data.slice(1);
            const pairs = zip(headers, transpose(records));

            const columns: DataColumn[] = pairs.map(pair => ({
              name: pair[0],
              values: pair[1],
              types: discoverTypes(pair[1]),
            }));

            const s: Source = {
              id: source,
              name: fileName,
              data: { columns },
            }

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
