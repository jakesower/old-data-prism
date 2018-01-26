import { evolve, assoc, over, lensPath, lensProp, append, inc } from 'ramda';
import { DataTable, Source, Action } from '../types';
import { Component, makeComponent, extractView } from '../lib/component';
// import GridComponent from './grid';
// import CollectorListComponent from './collector-list';
// import ChartComponent from './chart';
// import view from './main/view';
import { SetPage, SetMainDimensions, ToggleHelp, ToggleWalkthrough, CreateSource } from './main/action';
import { Stream } from 'most';
import { VNode } from 'snabbdom/vnode';
import { h } from 'snabbdom/h';

interface Model {
  page: string,
  sources: Source[],
  activeSource: Source,
  dataLoading: boolean,
  help: boolean,
  walkthrough: boolean,
  uid: number,
  mainDimensions: { width: number, height: number },
}

interface StreamMap {
  action$: Stream<Action<Model>>,
  loadFile$: Stream<File>,
  loadURI$: Stream<string>,
}

type View = (state: Model) => Component<any>;


const firstInit = {
  page: 'Source',

  pageData: {
    sources: {
      sourceName: "",
    },
    // remix: {
    //   grid: GridComponent.init(),
    // },
    // chart: ChartComponent.init(),
    annotate: {}
  },

  sources: [],
  // collectorList: CollectorListComponent.init(),
  activeSource: null,

  dataLoading: false,
  help: false,
  walkthrough: false,

  uid: 1,
  mainDimensions: {}, // used for chart sizing, should depend on DOM externally
};

const init = (state: any): Model => state || firstInit;

const c1 = makeComponent(h('div', 'oh howdy3'), {});
const c2 = makeComponent(h('b', 'YO!'), {});
export const view = c1.chain(x => c2);
