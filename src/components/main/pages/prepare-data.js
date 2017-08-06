import R from 'ramda';
import S from 'sanctuary';
import { default as h  } from 'snabbdom/h';
import forwardTo from 'flyd-forwardto';

import { Action, GroupAction } from '../types'
import { applyOperation, applyOperations } from '../../../lib/operation-functions'

import { Action as OperationAction  } from '../../operation/types';
import * as OperationComponent from '../../operation';

import * as GroupingComponent from '../../group-operation';

import * as GridComponent from '../../grid';

import * as AGGREGATORS from '../../../definitions/aggregators';
import * as DERIVERS from '../../../definitions/derivers';
import * as FILTERS from '../../../definitions/filters';

const itemPools = {
  Filter: FILTERS,
  Deriver: DERIVERS,
  Grouping: AGGREGATORS,
};

const componentsByType = {
  Filter: OperationComponent,
  Deriver: OperationComponent,
  Grouping: GroupingComponent
}


const operationView = R.curry((action$, dataset, operation, idx) => {
  const component = componentsByType[operation.type];

  return component.view(
    itemPools[operation.type],
    dataset,
    forwardTo(action$, act => {
      return component.Action.case({
        Delete: () => Action.DeleteOperation(idx),
        _: () => Action.ModifyOperation(idx, component.update, act)
      }, act);
    }),
    operation);
});


const renderOperations = R.curry((action$, dataset, operations, idx) => {
  const [head, tail] = [R.head(operations), R.tail(operations)];
  if (!head) return [];

  return R.prepend(
    operationView(action$, dataset, head, idx),
    renderOperations(action$, applyOperation(dataset, head), tail, idx+1)
  );
});


export default R.curry((action$, model) => {
  if (!model.dataset) return h('div', {}, '');

  return h('div', {class: {"main-container": true}}, R.flatten([
    h('aside', {class: {"prepare-controls": true}}, R.flatten([
      renderOperations(action$, model.dataset, model.operations, 0),

      h('button', {on: {click: [action$, Action.CreateDeriver]}}, "Derive Field"),
      h('button', {on: {click: [action$, Action.CreateFilter]}}, "Add Filter"),
      h('button', {on: {click: [action$, Action.CreateGrouping]}}, "Perform Grouping")
    ])),

    h('main', {}, [
      GridComponent.view(
        applyOperations(model.dataset, model.operations),
        forwardTo(action$, Action.SetGridState('prepareData')),
        model.grids.prepareData
      )
    ])
  ]))
});
