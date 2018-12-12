import xs, { Stream } from 'xstream';
import { DataSource } from '../types';
import * as stringify from 'csv-stringify';
import * as FileSaver from 'file-saver';

export default function csvExportDriver(request$: Stream<DataSource>): void {
  request$.addListener({
    next: (dataSource) => {
      stringify([dataSource.headers].concat(dataSource.records), (_, output: string) => {
        const blob = new Blob([output], { type: 'text/csv' });
        FileSaver.saveAs(blob);
      })
    },
    error: () => {},
    complete: () => {}
  });
}
