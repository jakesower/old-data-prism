import * as marked from 'marked';


export const Join = marked(`
# Join

Combines two tables that are linked by a key.
`);


export const ColumnModifier = marked(`
# Adjust Columns

Remove and rename columns. Column names must be unique.
`);


export const Concat = marked(`
# Concatenate

Creates a new data source from the current one and another. The rows of the *foreign source* will be appended to the current data source. The columns must be lined up on a one-for-one basis via the *crosswalk*.

- *Foreign Source:* The data source to be appended.
- *Crosswalk:* *Keep* indicates if the column should be in the result data source. *Local Column* is the column on the data source. Each local column must be matched with a *Foreign Column*. The foreign column's values will be appended to the local column.
`);


export const Expression = marked(`
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


export const Round = marked(`
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
