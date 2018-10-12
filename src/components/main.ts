import isolate from "@cycle/isolate";
import { a, aside, div, h1, main as mainT, nav, p } from "@cycle/dom";
import { combineArray, of, never, switchLatest, mergeArray } from "most";
import { proxy } from "most-proxy";
import Sources from "./components/sources";
import { objectStream } from "../lib/utils";
import { Source, StateModifier } from "../types";

interface State {
  page: "sources" | "remix" | "chart" | "annotate" | "export" | "purple",
  help: Boolean,
  sources: Source[],
}


const initState: State = {
  page: "sources",
  help: false,
  sources: [],
};


function main(cycleSources) {
  cycleSources.csvLoader.observe(console.log);
  const { attach, stream } = proxy();

  const actions = intent(cycleSources);
  const selectedPage$ = actions.changeTab$;

  const componentSources = { ...cycleSources, props: stream };
  const sources = Sources(componentSources);

  const pageDoms$ = objectStream({
    sources: sources.DOM,
  });

  const stateModifiers$: StateModifier<State>[] = [
    selectedPage$.map(page => prev => ({ ...prev, page })),
    cycleSources.csvLoader.map(source => prev => ({ ...prev, sources: prev.sources.concat(source)})),
  ];
  const state$ = mergeArray(stateModifiers$).scan((state, fn) => fn(state), initState);

  attach(state$);


  const view$ = combineArray(view, [state$, pageDoms$]);
  // const view$ = state$.combine(view, pageSwitch$);
  // const view$ = state$.sample(view, state$, pageSwitch$);
  // (state$.merge(of("hi"))).sample(console.log, state$);

  // activePageStream$.observe(console.log);
  // pageSwitch$.observe(console.log);
  // state$.observe(console.log);
  // view$.observe(console.log);

  return {
    DOM: view$,
    csvLoader: sources.csvLoader,
  };
}


function intent({ DOM }) {
  // return never();
  return {
    changeTab$: DOM.select("nav a.tab").events("click").map(ev => {
      ev.preventDefault();
      return ev.target.dataset.tab;
    })
  }
}


function view(state, page) {
  console.log({ state, page });
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
      tab("annotate"),
      tab("export"),
      tab("purple")
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



// /* ** */
// import { evolve, append, inc, assoc, over, lensPath, lensProp } from "ramda";
// import { update as _update, init as _init } from "./collector-list";
// import { update as __update, init as __init } from "./grid";
// import { update as ___update, init as ___init } from "./chart";

// import view from "./main/view";
// import { caseOn } from "./main/action";

// const update = caseOn({
//   CreateSource: (name, data, state) =>
//     evolve({
//       dataLoading: () => false,
//       sources: append({id: state.uid, name, data, schema: {}}),
//       activeSource: () => state.uid,
//       uid: inc
//     }, state),

//   SetActiveSource: assoc("activeSource"),
//   SetPage: assoc("page"),

//   ToggleHelp: state => assoc("help", !state.help, state),
//   ToggleWalkthrough: state => assoc("walkthrough", !state.walkthrough, state),

//   SetCollectorList: (act, mod) => over(
//     lensPath(["collectorList"]),
//     _update(act),
//     mod
//   ),

//   SetGridState: (action, state) =>
//     over(lensPath(["pageData", "remix", "grid"]), __update(action), state),

//   SetMainDimensions: assoc("mainDimensions"),
//   SetChart: (action, state) =>
//     over(lensProp("chart"), ___update(action), state),

//   // LoadLocalFile, LoadURI are handled externally
//   _: function(){ console.error(arguments)}
// });


// const firstInit = {
//   page: "Source",

//   pageData: {
//     sources: {
//       sourceName: "",
//     },
//     remix: {
//       grid: __init(),
//     },
//     chart: ___init(),
//     annotate: {}
//   },

//   sources: [],  // source is {name: x, dataset: y, schema: z, id: w}
//   collectorList: _init(),
//   activeSource: null,

//   dataLoading: false,
//   help: false,
//   walkthrough: false,

//   uid: 1,
//   mainDimensions: {}, // used for chart sizing, should depend on DOM externally
// };

// const init = state => state || firstInit;


// export default {Action, view, update, init};
