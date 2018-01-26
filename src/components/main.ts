import { evolve, assoc, over, lensPath, lensProp, append, inc } from 'ramda';
import { DataTable, Source, Action } from '../types';
import { Component, makeComponent } from '../lib/component';
// import GridComponent from './grid';
// import CollectorListComponent from './collector-list';
// import ChartComponent from './chart';
// import view from './main/view';
import { SetPage, SetMainDimensions, ToggleHelp, ToggleWalkthrough, CreateSource } from './main/action';
import { Stream } from 'most';
import { VNode } from 'snabbdom/vnode';
import { h } from 'snabbdom/h';
import { div } from '../lib/element';

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

// const c1 = makeComponent(h('input'), {output: {click: 'clickstream'}});
// const c2 = makeComponent(h('b', 'YO!'), {that: 'ui'});
// export const view = c1.chain(c1State => makeComponent(h('b', 'YOzzz'), Object.assign(c1State, {oh: 'hai'})));
// export const view = div({output: 'hai'}, 'there');

export const view = makeComponent(h('input'), { output: { change: 'something' }});
