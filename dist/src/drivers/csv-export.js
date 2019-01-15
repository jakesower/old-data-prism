"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringify = require("csv-stringify");
const FileSaver = require("file-saver");
function csvExportDriver(request$) {
    request$.addListener({
        next: (dataSource) => {
            stringify([dataSource.headers].concat(dataSource.records), (_, output) => {
                const blob = new Blob([output], { type: 'text/csv' });
                FileSaver.saveAs(blob, `${(dataSource.name || 'data')}.csv`);
            });
        },
        error: () => { },
        complete: () => { }
    });
}
exports.default = csvExportDriver;
