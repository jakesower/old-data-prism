const markdown = require('marked');

const helpText = {
Grouping: `
## Grouping

Groupings are a key concept. Blah blah.`,

// ----

InnerJoin: `
## Inner Join

Combines two tables that are linked by a key.
`,

LeftOuterJoin: ``
}

module.exports = {
  groupingHelp: markdown(groupingHelp)
}
