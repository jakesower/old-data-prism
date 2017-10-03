const markdown = require('marked');

const groupingHelp = `
## Grouping

Groupings are a key concept. Blah blah.
`;

module.exports = {
  groupingHelp: markdown(groupingHelp)
}
