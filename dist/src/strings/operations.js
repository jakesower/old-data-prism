"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const marked = require("marked");
exports.ColumnModifier = marked(`
# Adjust Columns

Remove and rename columns. Column names must be unique.
`);
exports.Concat = marked(`
# Concatenate

Creates a new data source from the current one and another. The rows of the *foreign source* will be appended to the current data source. The columns must be lined up on a one-for-one basis via the *crosswalk*.

- *Foreign Source:* The data source to be appended.
- *Crosswalk:* *Keep* indicates if the column should be in the result data source. *Local Column* is the column on the data source. Each local column must be matched with a *Foreign Column*. The foreign column's values will be appended to the local column.
`);
exports.Expression = marked(`
# Expression

Expressions use the [math.js](http://mathjs.org/docs/expressions/index.html) library for expressions. The expression provided operates on each row of the data source individually. Columns from each row can be used in the expression with \`\{Column Name\}\`. The output of the expression creates a new column.

## Examples

| Item | Regular Price | Sale Price |
| ---- | ------------- | ---------- |
| Avocado | 3 | 2 |
| Bread | 6 | 3 |

### Arithmetic

Column Name: \`Discount\`

Expression: \`\{Regular Price\} - \{Sale Price\}\`

| Item | Regular Price | Sale Price | Discount |
| ---- | ------------- | ---------- | -------- |
| Avocado | 3 | 2 | 1 |
| Bread | 6 | 3 | 3 |

`);
exports.Filter = marked(`
# Filter

Filters out any rows which don't fulfill the provided predicate expression. The predicate function should return either \`true\` or \`false\`.

## Example

| Item | Regular Price | Sale Price |
| ---- | ------------- | ---------- |
| Avocado | 3 | 2 |
| Bread | 6 | 3 |

\`{Sale Price} > 2 \`

Result:

| Item | Regular Price | Sale Price |
| ---- | ------------- | ---------- |
| Bread | 6 | 3 |
`);
exports.Grouping = marked(`
# Grouping

Transforms the data source by combining rows into aggregates based on the \`Group By\` columns. This combination allows the application of various aggregators. Each column that is grouped by will become a column in the result set. Furthermore, each aggregator will create a column.

## Example

| Item | Category | Regular Price | Sale Price |
| ---- | ------------- | ---------- |
| Avocado | Food | 3 | 2 |
| Bread | Food | 6 | 3 |
| Crown | Jewelry | 10000 | 9000 |
| Diapers | Baby Supplies | 40 | 36 |
| Eggs | Food | 4 | 3 |
| Formula | Baby Supplies | 9 | 7 |

Group By: \`Category\`
Aggregators:

- \`Count\` aggregator, column name \`Items\`
- \`Mean\` aggregator, column name \`Avg Price\`, column \`Regular Price\`

| Category | Items | Avg Price |
| -------- | ----- | --------- |
| Food | 3 | 6 |
| Jewelry | 1 | 10000 |
| Baby Supplies | 2 | 24.5 |

`);
exports.Index = marked(`
# Index

Numerically labels each column. Commonly used with the \`Sort\` operation.

## Example

| Item | Regular Price | Sale Price |
| ---- | ------------- | ---------- |
| Avocado | 3 | 2 |
| Bread | 6 | 3 |
| Crown | 10000 | 9000 |
| Diapers | 40 | 36 |
| Eggs | 4 | 3 |
| Formula | 9 | 7 |

Column name: \`Idx\`

| Item | Regular Price | Sale Price | Idx |
| ---- | ------------- | ---------- | --- |
| Avocado | 3 | 2 | 1 |
| Bread | 6 | 3 | 2 |
| Crown | 10000 | 9000 | 3 |
| Diapers | 40 | 36 | 4 |
| Eggs | 4 | 3 | 5 |
| Formula | 9 | 7 | 6 |

`);
exports.Join = marked(`
# Join

Combines two tables that are linked by a key.
`);
exports.MapValues = marked(`
# Map Values

Takes a list of condition expressions and result expressions. Each row is tested against each condition expression in order. The first \`true\` condition has its corresponding result expression evaluated and that value is the value of the result column. If no condition expressions match, the \`otherwise\` result is used.

## Example

| Item | Regular Price | Sale Price |
| ---- | ------------- | ---------- |
| Avocado | 3 | 2 |
| Bread | 6 | 3 |
| Crown | 10000 | 7000 |
| Diapers | 40 | 36 |
| Eggs | 4 | 3 |
| Formula | 9 | 7 |

### Expressions

Column Name: \`Comment\`

| Expression | Result |
| ---------- | ------ |
| \`{Regular Price} > 5000\` | \`Unaffordable\` |
| \`({Sale Price} / {Regular Price}) < 0.8\` | \`Good Deal\` |
| otherwise | \`Affordable\` |

| Item | Regular Price | Sale Price | Comment |
| ---- | ------------- | ---------- | ------- |
| Avocado | 3 | 2 | Good Deal |
| Bread | 6 | 3 | Good Deal |
| Crown | 10000 | 7000 | Unaffordable |
| Diapers | 40 | 36 | Affordable |
| Eggs | 4 | 3 | Good Deal |
| Formula | 9 | 7 | Good Deal |


`);
exports.Quantile = marked(`
# Quantile

Creates a new column based on which quantile a column falls under. The \`order\` decides how many groups available for placement. For example, an order of \`100\` will create 100 groups, commonly referred to as "percentiles." An order of \`5\` would create quintiles, etc.
`);
exports.Round = marked(`
# Round

Takes a numeric column and rounds it based on precision. The precision is the exponent in \`10^x\`.

## Examples:

Value: \`3.14159\`

| Precision | Result |
| ---- | ------------- |
| 0 | 3 |
| 1 | 0 |
| -3 | 3.142 |
`);
