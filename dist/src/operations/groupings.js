"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@cycle/dom");
const utils_1 = require("../lib/utils");
const group_collector_1 = require("../components/collectors/group-collector");
const types_1 = require("../types");
const data_functions_1 = require("../lib/data-functions");
const aggregatorDefs = require("./aggregators");
const either_1 = require("../lib/monads/either");
exports.Grouping = {
    name: "Grouping",
    tags: ["grouping"],
    display: _ => dom_1.div("Grouping"),
    fn: (dataSource, inputs) => utils_1.go(function* () {
        const { groupBasis, aggregators } = inputs;
        const dataSourceGroups = utils_1.pipeThru(dataSource.records, [
            recs => utils_1.groupBy(recs, record => JSON.stringify(groupBasis.map(col => record[col]))),
            utils_1.values,
            (rgs) => rgs.map(rg => {
                const rgcs = utils_1.transpose(rg);
                const cols = dataSource.columns.map((c, idx) => types_1.makeDataColumn({ name: "", values: rgcs[idx], types: c.types }));
                return types_1.makeDataSource({ columns: cols });
            }),
        ]);
        const basisColumns = groupBasis.map(col => {
            const vals = dataSourceGroups.map(ds => ds.records[0][col]);
            return types_1.makeDataColumn({
                name: dataSource.columns[col].name,
                values: vals,
                types: data_functions_1.discoverTypes(vals),
            });
        });
        const aggColumnsE = aggregators.map(agg => {
            const aggDef = aggregatorDefs[agg.aggregator];
            return aggDef.fn(dataSourceGroups, agg.inputs);
        });
        const aggColumns = yield either_1.sequenceList(aggColumnsE);
        return types_1.makeDataSource({ columns: basisColumns.concat(aggColumns) });
    }),
    collector: group_collector_1.GroupCollector,
};
const BucketGrouper = {
/*
  Things to consider:

  1. Can the type be restricted?
  2. Is there a case that a "default" won't be needed?
  3. Will there be space to allow math.eval() clauses?
  4. Separately, is there a more specific case for heterogenous comparators?
  5. Can a fn be derived from above scenarios automatically?
*/
};
