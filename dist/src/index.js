"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const run_1 = require("@cycle/run");
const dom_1 = require("@cycle/dom");
const http_1 = require("@cycle/http");
const history_1 = require("@cycle/history");
const main_dimensions_1 = require("./drivers/main-dimensions");
const csv_export_1 = require("./drivers/csv-export");
const main_1 = require("./components/main");
run_1.default(main_1.default, {
    DOM: dom_1.makeDOMDriver('#app'),
    HTTP: http_1.makeHTTPDriver(),
    history: history_1.makeHistoryDriver(),
    dimensions: main_dimensions_1.default,
    csvExport: csv_export_1.default,
});
