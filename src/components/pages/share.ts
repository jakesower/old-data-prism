import xs, { Stream } from 'xstream';
import delay from 'xstream/extra/delay';
import { aside, div, main as main_, select, h2, VNode, input, button, map, table, tr, td, th, option, h1, ul, li } from '@cycle/dom';
import { ChainedCollection, pluck as pl} from '../../lib/chained-collection';
import { DataSource, StateModifier, makeDataSource, DataColumn } from '../../types';
import { merge, flatten, last, upperTriangularMatrixMap, round, reflectUTMatrix, zipWith, go } from '../../lib/utils';
import { Maybe } from '../../lib/maybe';


interface LocalState {
  rootSource: Maybe<string>,
  activePair: Maybe<[number, number]>
}

interface Props {
  sources: DataSource[]
}

interface State extends LocalState, Props {};
type ColPair = [DataColumn[], (number|null)[][]];

const initState: LocalState = {
  rootSource: Maybe.Nothing(),
  activePair: Maybe.Nothing(),
};


export default function main(cycleSources) {
  const { props, remixSource, remixValue, chartValue, analysisValue } = cycleSources;

  return {
    DOM: xs.combine(props, remixSource, remixValue, chartValue, analysisValue)
      .map(vs => view(...vs)),
  }
}


function view(props, remixSource, remixValue, chartValue, analysisValue) {
  console.log({ props })
  const empty = x => div(`(no ${x})`);

  return div('.main-container', [
    aside({}, [
      h2('Sources'),
      ul(props.sources.length === 0 ? empty("sources") : props.sources.map(source =>
        li(source.name)
      )),
      h2('Remixes'),
      ul(props.sources.length === 0 ? empty("sources") : props.sources.map(source =>
        li(source.name)
      )),
      h2('Charts'),
      ul(props.sources.length === 0 ? empty("sources") : props.sources.map(source =>
        li(source.name)
      )),
      h2('Analyses'),
      ul(props.sources.length === 0 ? empty("sources") : props.sources.map(source =>
        li(source.name)
      )),
    ]),

    main_({}, [
    ])
  ]);
}
