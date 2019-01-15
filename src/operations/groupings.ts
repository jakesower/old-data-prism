import { div } from '@cycle/dom';
import { groupBy, values, pipeThru, transpose, go } from '../lib/utils';
import { GroupCollector, GroupOperation } from '../components/collectors/group-collector';
import { makeDataColumn, makeDataSource, DataColumn } from '../types';
import { discoverTypes } from '../lib/data-functions';
import * as aggregatorDefs from './aggregators';
import { Ok, sequenceList } from '../lib/monads/either';

interface GroupInputs {
  groupBasis: number[],
  aggregators: AggregatorInput[],
}

interface AggregatorInput {
  aggregator: string,
  inputs: {[k: string]: string},
}


export const Grouping: GroupOperation = {
  name: "Grouping",
  tags: ["grouping"],
  display: _ => div("Grouping"),

  fn: (dataSource, inputs: GroupInputs) => go(function* () {
    const { groupBasis, aggregators } = inputs;

    const dataSourceGroups = pipeThru(dataSource.records, [
      recs => groupBy(recs, record => JSON.stringify(groupBasis.map(col => record[col]))),
      values,
      (rgs: string[][][]) => rgs.map(rg => {
        const rgcs = transpose(rg);
        const cols = dataSource.columns.map((c, idx) => makeDataColumn({ name: "", values: rgcs[idx], types: c.types }));
        return makeDataSource({ columns: cols });
      }),
    ]);

    const basisColumns = groupBasis.map(col => {
      const vals = dataSourceGroups.map(ds => ds.records[0][col]);

      return makeDataColumn({
        name: dataSource.columns[col].name,
        values: vals,
        types: discoverTypes(vals),
      });
    });

    const aggColumnsE = aggregators.map(agg => {
      const aggDef = aggregatorDefs[agg.aggregator];
      return aggDef.fn(dataSourceGroups, agg.inputs);
    });

    const aggColumns = yield sequenceList(aggColumnsE);

    return makeDataSource({ columns: basisColumns.concat(aggColumns) });
  }),

  collector: GroupCollector,
}


const BucketGrouper = {
  /*
    Things to consider:

    1. Can the type be restricted?
    2. Is there a case that a "default" won't be needed?
    3. Will there be space to allow math.eval() clauses?
    4. Separately, is there a more specific case for heterogenous comparators?
    5. Can a fn be derived from above scenarios automatically?
  */
}
