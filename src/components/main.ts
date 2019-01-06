import { a, aside, div, h1, main as mainT, nav, p, i, button } from "@cycle/dom";
import xs from 'xstream';
import Sources from "./pages/sources";
import Remix from "./pages/remix";
import Chart from "./pages/chart";
import Analyze from "./pages/analyze";
import Share from "./pages/share";
import Learn from "./pages/learn";
import { objectStream } from "../lib/stream-utils";
import { DataSource, StateModifier } from "../types";
import { Maybe } from "../lib/maybe";
import isolate from "@cycle/isolate";
import { csvToDataSource } from "../lib/data-functions";
import { clamp } from "../lib/utils";

interface State {
  page: "sources" | "remix" | "chart" | "analyze" | "share" | "learn",
  help: boolean,
  helpMessages: string[],
  helpIndex: number,
  sources: DataSource[],
}


const initState: State = {
  page: "sources",
  help: false,
  helpIndex: 0,
  helpMessages: ['Click the "Learn" tab and select a tutorial to begin.'],
  sources: [],
};


function main(cycleSources) {
  const { changeTab$, helpToggle$, adjustTutorialPage$ } = intent(cycleSources);
  const addSourceProxy$ = xs.create();
  const setTutorialProxy$ = xs.create();

  // TODO: Handle multiple formats
  const addHttpSource$ = cycleSources.HTTP.select('imported-source').flatten()
    .map(response => {
      const uriParts = response.req.url.split('/');
      return {
        body: response.text,
        name: uriParts[uriParts.length - 1].split('.')[0],
      }
    });

  const stateModifiers$: StateModifier<State>[] = [
    changeTab$.map(page => prev => ({ ...prev, page })),
    addSourceProxy$
      .map(source => prev => ({ ...prev,
        sources: prev.sources.concat(source),
      })),
    helpToggle$.mapTo(prev => ({ ...prev, help: !prev.help })),
    setTutorialProxy$.map(tutorial => prev => ({ ...prev,
      helpIndex: 0,
      helpMessages: tutorial,
      help: true,
    })),
    adjustTutorialPage$.map(adj => prev => ({ ...prev,
      helpIndex: clamp(0, prev.helpMessages.length - 1, prev.helpIndex + adj),
    }))
  ];

  const state$ = xs.merge(...stateModifiers$)
    .fold((state, fn) => fn(state), initState);

  const componentSources = page => ({
    ...cycleSources,
    props: state$.filter(state => state.page === page).startWith(initState),
  });

  const sources = isolate(Sources, 'sources')({ ...cycleSources, props: state$ });
  const remix = isolate(Remix, 'remix')(componentSources('remix'));

  const remixSource = remix.workingSource.startWith(Maybe.Nothing());

  const chart = isolate(Chart, 'chart')({ ...componentSources('chart'), remixSource });
  const analyze = isolate(Analyze, 'analyze')({ ...componentSources('analyze'), remixSource });
  const share = isolate(Share, 'share')({ ...componentSources('share'),
    remixSource,
    remixValue: remix.value.startWith(Maybe.Nothing()),
    chartValue: xs.of(Maybe.Nothing()),
    analysisValue: xs.of(Maybe.Nothing()),
  });
  const learn = isolate(Learn, 'learn')({ ...cycleSources });

  addSourceProxy$.imitate(xs.merge(
    remix.source,
    csvToDataSource(sources.csvLoader),
    csvToDataSource(addHttpSource$),
  ));

  setTutorialProxy$.imitate(learn.tutorial);


  const pageDoms$ = objectStream({
    sources: sources.DOM,
    remix: remix.DOM,
    chart: chart.DOM,
    analyze: analyze.DOM,
    share: share.DOM,
    learn: learn.DOM,
  });

  const view$ = xs.combine(state$, pageDoms$).map(([s, pd]) => view(s, pd));

  return {
    DOM: view$,
    csvExport: remix.csvExport,
    HTTP: sources.HTTP,
  };
}


function intent({ DOM }) {
  return {
    changeTab$: DOM.select("nav a.tab").events("click").map(ev => {
      ev.preventDefault();
      return ev.target.dataset.tab;
    }),
    helpToggle$: DOM.select('nav .help-toggle').events('click'),
    adjustTutorialPage$: xs.merge(
      DOM.select('.next-tutorial').events('click').mapTo(1),
      DOM.select('.prev-tutorial').events('click').mapTo(-1)
    ),
  }
}


function view(state, page) {
  const tab = n => a({
    class: {selected: state.page === n, tab: true}, dataset: { tab: n.toLowerCase() },
  }, n);
  const pageClass = state.page.toLowerCase();

  return div({
    class: {"body-container": true, [pageClass]: true, help: state.help}
  }, [
    nav({}, [
      h1({}, "Data Prism"),
      tab("sources"),
      tab("remix"),
      tab("chart"),
      tab("analyze"),
      tab("share"),
      tab("learn"),
      i('.help-toggle', ''),
    ]),

    div('.help-bar', [
      div('.help-text', [
        state.helpMessages[state.helpIndex],
        button('.prev-tutorial', 'Prev'),
        button('.next-tutorial', 'Next'),
      ]),
    ]),

    page[state.page]
  ]);
}



export default main;
