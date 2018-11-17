import { a, aside, div, h1, main as mainT, nav, p } from "@cycle/dom";
import xs from 'xstream';
import Sources from "./components/sources";
import Remix from "./components/remix";
import { objectStream } from "../lib/stream-utils";
import { DataSource, StateModifier } from "../types";

interface State {
  page: "sources" | "remix" | "chart" | "analyze" | "share" | "learn",
  help: boolean,
  sources: DataSource[],
}


const initState: State = {
  page: "sources",
  help: false,
  sources: [],
};


function main(cycleSources) {
  const actions = intent(cycleSources);
  const selectedPage$ = actions.changeTab$;

  const stateModifiers$: StateModifier<State>[] = [
    selectedPage$.map(page => prev => ({ ...prev, page })),
    cycleSources.csvLoader.map(source => prev => ({ ...prev,
      sources: prev.sources.concat(source),
    })),
  ];
  const state$ = xs.merge(...stateModifiers$).fold((state, fn) => fn(state), initState);

  const componentSources = { ...cycleSources, props: state$ };
  const sources = Sources(componentSources);
  const remix = Remix(componentSources);

  const pageDoms$ = objectStream({
    sources: sources.DOM,
    remix: remix.DOM,
  });

  const view$ = xs.combine(state$, pageDoms$).map(([s, pd]) => view(s, pd));

  return {
    DOM: view$,
    csvLoader: sources.csvLoader,
  };
}


function intent({ DOM }) {
  return {
    changeTab$: DOM.select("nav a.tab").events("click").map(ev => {
      ev.preventDefault();
      return ev.target.dataset.tab;
    })
  }
}


function view(state, page) {
  // console.log({state, page})
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
      tab("learn")
    ]),

    div({class: {"help-bar": true}}, [
      div({class: {"help-text": true}}, "Hi, I'm a help message!"),
    ]),

    page[state.page] ? page[state.page] :
      div({class: {"main-container": true}}, [
        aside({}, [
          p({}, "Placeholder")
        ]),

        mainT({}, [
          div({}, "Hi"),
        ])
      ])
  ]);
}



export default main;
