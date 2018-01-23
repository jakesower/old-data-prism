import { evolve, assoc, over, lensPath, lensProp, append, inc } from 'ramda';
import { Component, DataTable, Source } from '../types';
import view from './main/view';
import action from './main/action';
import { Stream } from 'most';

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

interface ModelOut {
  state$: Stream<Action>,
  loadFile$: Stream<File>,
  loadURI$: Stream<string>,
}


const firstInit = {
  page: 'Source',

  pageData: {
    sources: {
      sourceName: "",
    },
    remix: {
      grid: GridComponent.init(),
    },
    chart: ChartComponent.init(),
    annotate: {}
  },

  sources: [],  // source is {name: x, dataset: y, schema: z, id: w}
  collectorList: CollectorListComponent.init(),
  activeSource: null,

  dataLoading: false,
  help: false,
  walkthrough: false,

  uid: 1,
  mainDimensions: {}, // used for chart sizing, should depend on DOM externally
};

const init = state => state || firstInit;

export makeComponent(actions, model, view);
