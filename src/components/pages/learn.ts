import xs, { Stream } from 'xstream';
import { aside, div, main as main_, select, h2, VNode, input, button, map, table, tr, td, th, option, h1, ul, li, p, strong } from '@cycle/dom';

// TODO: Separate files and that
const sections = {
  introduction: [
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
  ],

  tutorials: [
    h1('Tutorials'),
    div('.tutorial', [
      h2('Climate Data'),
      p('This covers a few simple use cases across the tools. A great place for starters.'),
      p('Topics covered:'),
      ul([
        li('Simple remixing'),
        li('Simple analysis'),
        li('Simple charting'),
      ]),
      button('.start-tutorial', { dataset: { tutorial: 'climate' }}, 'Start'),
    ])

  ],

  reference: [
    h1('Reference'),
  ]
};


const tutorials = {
  climate: [
    'Begin by going to the Sources tab.',
    'Click the "Average North Pole Temperatures" item under the "Import Sample Data" heading, and wait for it to load.',
    'Click the "Remix" tab.',
    'Set the root source to the average temperatures.',
    "Let's start by understanding the data. The important column is \"Anomaly of Temperature\". It indicates how much warmer or colder the month is compared to the same month in other years. For example, Jan 1880 was about 0.47 degrees cooler than normal. Columns other than Year, Month, and Anomoly of Temperature are not relevant to this tutorial.",
    'Start by removing the irrelevant columns. Click "New Operation" and then choose "Adjust Columns"',
    'Uncheck the "Keep" checkboxes next to "Total Error" and all columns below it. Then click "Save".',
    "Let's take a look at how things correlate. Go to the \"Analyze\" tab.",
    'Choose "(remix source)" as the Root Datasource.',
    'It can now be seen that "Year" and "Anomaly of Temperature" are correlated. Using linear regression, they have an R value of 0.66. Click on the 0.66 and view the scatter plot with the best fit line.',
    "Next, let's see if we can make a useful chart with the data. Return to the \"Remix\" tab.",
    "There are too many years to make a readable bar chart. Let's group them by decade instead.",
    'Click "New Operation" and choose "Expression". Expressions are the most flexible, but most complex operation available.',
    'Set "Column Name" to "Decade". For "Expression" enter "floor({Year} / 10) * 10". Click "Save".',
    'Click "New Operation" and choose "Grouping".',
    'Group by "Decade" and then click "New Aggregator". Pick the "Mean" Aggregator, set the column name to "Avg Anomaly", and choose the "Anomaly of Temperature" as the column. Click "Save".',
    'Those numbers are long. Round them by picking the "Round" operation. Set the column name to "Rounded Avg Anomaly", use the column "Avg Anomaly", and set the precision to "-2", then click "Save".',
    'Click to the "Chart" tab and choose "(remix source)" as the root datasource.',
    'Pick "Bar" for the chart type.',
    'Pick "Decade" as the X Axis and "Avg Anomaly" for the Y Axis. Click "Apply".',
    'This concludes the tutorial. Should you have questions, please email me at jake@jakesower.com',
  ]
}


export default function main(cycleSources) {
  const { startTutorial$, changeSection$ } = intent(cycleSources.DOM);
  const state$ = changeSection$.fold((_acc, section) => section, 'introduction');

  return {
    DOM: state$.map(view),
    tutorial: startTutorial$,
  }
}


function intent(DOM) {
  return {
    startTutorial$: DOM.select('.start-tutorial').events('click').map(ev => tutorials[ev.target.dataset.tutorial]),
    changeSection$: DOM.select('.section').events('click').map(ev => ev.target.dataset.section),
  };
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
