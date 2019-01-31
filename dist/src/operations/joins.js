"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@cycle/dom");
const types_1 = require("../types");
const utils_1 = require("../lib/utils");
const data_functions_1 = require("../lib/data-functions");
const join_collector_1 = require("../components/collectors/join-collector");
const concat_collector_1 = require("../components/collectors/concat-collector");
const data_types_1 = require("../lib/data-types");
const either_1 = require("../lib/monads/either");
exports.Join = (function () {
    function innerJoin(local, foreign, lk, fk) {
        return joinDataSources(local, foreign, lk, fk, _ => []);
    }
    function leftJoin(local, foreign, lk, fk) {
        const emptyCols = utils_1.fill(foreign.columns.length, "");
        const noMatchFn = localRow => [localRow.concat(emptyCols)];
        return joinDataSources(local, foreign, lk, fk, noMatchFn);
    }
    function rightJoin(local, foreign, lk, fk) {
        const result = leftJoin(foreign, local, fk, lk);
        const lcols = result.columns.slice(foreign.columns.length);
        const fcols = result.columns.slice(0, foreign.columns.length);
        return types_1.makeDataSource({
            name: result.name,
            columns: lcols.concat(fcols)
        });
    }
    return {
        display: _ => dom_1.div('Join'),
        fn: (source, inputs) => {
            const local = source;
            const foreign = inputs.foreignSource;
            const lk = inputs.localKey;
            const fk = inputs.foreignKey;
            switch (inputs.joinMethod) {
                case 'Inner':
                    return either_1.Ok(innerJoin(local, foreign, lk, fk));
                case 'Left':
                    return either_1.Ok(leftJoin(local, foreign, lk, fk));
                case 'Right':
                    return either_1.Ok(rightJoin(local, foreign, lk, fk));
            }
            return either_1.Err("invalid join method");
        },
        name: 'Join',
        tags: [],
        collector: join_collector_1.JoinCollector,
        valid: (_source, inputs) => {
            const required = ['foreignSource', 'localKey', 'foreignKey', 'joinMethod'];
            return required.every(k => Object.keys(inputs).includes(k));
        },
    };
}());
exports.Concat = (function () {
    return {
        display: _ => dom_1.div('Concatenate'),
        fn: (source, inputs) => {
            const local = source;
            const foreign = inputs.foreignSource;
            const xwalk = inputs.xwalk;
            const nextCols = local.columns.map((lcol, lIdx) => {
                const fcol = foreign.columns.find(c => c.name === xwalk[lIdx].foreignColumn);
                const typeNames = utils_1.intersection(lcol.types.map(t => t.name), fcol.types.map(t => t.name));
                const types = typeNames.map(n => Object.values(data_types_1.default).find(t => t.name === n));
                return types_1.makeDataColumn({
                    name: lcol.name,
                    values: lcol.values.concat(fcol.values),
                    types,
                });
            });
            return either_1.Ok(types_1.makeDataSource({ columns: nextCols }));
        },
        name: 'Concatenate',
        tags: [],
        collector: concat_collector_1.ConcatCollector,
        valid: (_source, inputs) => {
            const required = ['foreignSource', 'xwalk'];
            return required.every(k => Object.keys(inputs).includes(k));
        },
    };
}());
function joinDataSources(a, b, aKeys, bKeys, noMatchFn) {
    const aIdx = a.columns.findIndex(col => col.name === aKeys);
    const bIdx = b.columns.findIndex(col => col.name === bKeys);
    const nextRecords = join(a.records, b.records, aIdx, bIdx, noMatchFn);
    const colHeaders = a.columns.map(c => c.name).concat(b.columns.map(c => c.name));
    const pairs = utils_1.zip(colHeaders, utils_1.transpose(nextRecords));
    const nextColumns = pairs.map(([name, values]) => types_1.makeDataColumn({
        name,
        values,
        types: data_functions_1.discoverTypes(values),
    }));
    return types_1.makeDataSource({
        name: "Moo",
        columns: nextColumns,
    });
}
function join(local, foreign, localKeys, foreignKeys, noMatchFn) {
    const foreignGroups = utils_1.groupBy(foreign, f => f[foreignKeys]);
    const joiner = (acc, localRow) => {
        const localKey = localRow[localKeys];
        const foreignMatches = foreignGroups[localKey];
        const rows = foreignMatches ?
            foreignMatches.map(match => localRow.concat(match)) :
            noMatchFn(localRow);
        return acc.concat(rows);
    };
    const resultRows = local.reduce(joiner, []);
    return resultRows;
}
