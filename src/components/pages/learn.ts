import xs, { Stream } from 'xstream';
import { aside, div, main as main_, select, h2, VNode, input, button, map, table, tr, td, th, option, h1, ul, li, p, strong } from '@cycle/dom';

// TODO: Separate files and that
const sections = {
  'introduction': [
    h1('Introduction'),
    p(['Welcome to Data Prism. Select a topic on the left to learn more.', strong('This project is incomplete. It is under active development.'), p('The application has been optimized for extensibility. New operations, charts, and analyses will regularly become available.')]),
    h2('About'),
    p('Data Prism helps people make sense of tabular data and share their insights and findings. It has three tools for discovery, as well as a tool for sharing.'),
    h2('Remix'),
    p('The Remix tool allows the user to perform operations on one or more data sources. Such operations include joining tables together, parsing and cleaning data, formatting data, as well as creating useful aggregates. This is the most versatile tool available. Most of the tutorials (in progress) will be geared at remixing data.'),
    h2('Chart'),
    p('The Chart tool creates simple charts based on both imported and remixed data sources. It is useful for understanding data, but is not intended for professional quality charts.'),
    h2('Analyze'),
    p('The Analyze tool performs various statistical analyses on imported and remixed data sources. These analyses will help users quickly identify trends in their data. Currently only simple linear regressions are supported.'),
    h2('Share'),
    p('The Share tool is incomplete. It will be used to export both actual data sources as well as remixes and other configurations. For example, a user might wish to create a remix formula that can be applied to multiple data files. The user will have the choice of hosting those data sources and the recipe, or merely the recipe, at which point other users will be able to apply it to suitable data sources of their own.')
  ]
};


export default function main(cycleSources) {
  const changeSection$ = cycleSources.DOM.select('.section').events('click').map(ev => ev.target.dataset.section);
  const state$ = changeSection$.fold((_acc, section) => section, 'introduction');

  return {
    DOM: state$.map(view),
  }
}


function view(section) {
  const sectionNames = Object.keys(sections);
  const activeSection = sections[section];

  return div('.main-container', [
    aside(sectionNames.map(sectionName =>
      div({
        class: { active: section === sectionName, section: true, },
        dataset: { section: sectionName, }
      }, sectionName)
    )),

    main_({}, div('.text-container', activeSection))
  ]);
}
