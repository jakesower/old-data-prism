"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@cycle/dom");
// TODO: Separate files and that
const sections = {
    introduction: [
        dom_1.h1('Introduction'),
        dom_1.p(['Welcome to Data Prism. Select a topic on the left to learn more.', dom_1.strong('This project is incomplete. It is under active development.'), dom_1.p('The application has been optimized for extensibility. New operations, charts, and analyses will regularly become available.')]),
        dom_1.h2('About'),
        dom_1.p('Data Prism helps people make sense of tabular data and share their insights and findings. It has three tools for discovery, as well as a tool for sharing.'),
        dom_1.h2('Remix'),
        dom_1.p('The Remix tool allows the user to perform operations on one or more data sources. Such operations include joining tables together, parsing and cleaning data, formatting data, as well as creating useful aggregates. This is the most versatile tool available. Most of the tutorials (in progress) will be geared at remixing data.'),
        dom_1.h2('Chart'),
        dom_1.p('The Chart tool creates simple charts based on both imported and remixed data sources. It is useful for understanding data, but is not intended for professional quality charts.'),
        dom_1.h2('Analyze'),
        dom_1.p('The Analyze tool performs various statistical analyses on imported and remixed data sources. These analyses will help users quickly identify trends in their data. Currently only simple linear regressions are supported.'),
        dom_1.h2('Share'),
        dom_1.p('The Share tool is incomplete. It will be used to export both actual data sources as well as remixes and other configurations. For example, a user might wish to create a remix formula that can be applied to multiple data files. The user will have the choice of hosting those data sources and the recipe, or merely the recipe, at which point other users will be able to apply it to suitable data sources of their own.')
    ],
    tutorials: [
        dom_1.h1('Tutorials'),
        dom_1.div('.tutorial', [
            dom_1.h2('Climate Data'),
            dom_1.p('This covers a few simple use cases across the tools. A great place for starters.'),
            dom_1.p('Topics covered:'),
            dom_1.ul([
                dom_1.li('Simple remixing'),
                dom_1.li('Simple analysis'),
                dom_1.li('Simple charting'),
            ]),
            dom_1.button('.start-tutorial', { dataset: { tutorial: 'climate' } }, 'Start'),
        ])
    ],
    reference: [
        dom_1.h1('Reference'),
    ]
};
const tutorials = {
    climate: [
        'Begin by going to the Sources tab.',
        'Click the "Average North Pole Temperatures" item under the "Import Sample Data" heading, and wait for it to load.',
        'Click the "Remix" tab.',
        'Set the root source to the average temperatures.',
        "Let's start by understanding the data. The important column is \"Anomaly of Temperature\". It indicates how much warmer or colder the month is compared to the same month in other years. For example, Jan 1880 was about 0.47 degrees cooler than normal. Columns other than Year, Month, and Anomaly of Temperature are not relevant to this tutorial.",
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
        'Pick "Decade" as the X Axis and "Rounded Avg Anomaly" for the Y Axis. Click "Apply".',
        'This concludes the tutorial. Should you have questions, please email me at jake@jakesower.com',
    ]
};
function main(cycleSources) {
    const { startTutorial$, changeSection$ } = intent(cycleSources.DOM);
    const state$ = changeSection$.fold((_acc, section) => section, 'introduction');
    return {
        DOM: state$.map(view),
        tutorial: startTutorial$,
    };
}
exports.default = main;
function intent(DOM) {
    return {
        startTutorial$: DOM.select('.start-tutorial').events('click').map(ev => tutorials[ev.target.dataset.tutorial]),
        changeSection$: DOM.select('.section').events('click').map(ev => ev.target.dataset.section),
    };
}
function view(section) {
    const sectionNames = Object.keys(sections);
    const activeSection = sections[section];
    return dom_1.div('.main-container', [
        dom_1.aside(sectionNames.map(sectionName => dom_1.div({
            class: { active: section === sectionName, section: true, },
            dataset: { section: sectionName, }
        }, sectionName))),
        dom_1.main({}, dom_1.div('.text-container', activeSection))
    ]);
}
