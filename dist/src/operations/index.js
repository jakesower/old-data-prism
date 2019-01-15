"use strict";
/************************************************************************
 * NOTE: Aggregators are not proper operations and are not exported here.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const derivers = require("./derivers");
const groupings = require("./groupings");
const misc = require("./misc");
const joins = require("./joins");
const operations = Object.assign({}, derivers, groupings, misc, joins);
exports.default = operations;
