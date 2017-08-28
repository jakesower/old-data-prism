const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');
const Type = require('union-type');
const ColumnSelector = require('./column-selector');
const DSF = require('../lib/dataset-functions');
const OperationAction = require('./operation/types').Action;
const OperationComponent = require('./operation');
const Action = require('./main/types').GroupAction;
const Slot = require('./slot');


const update = Action.caseOn({
  SetColumns: R.assoc('columns'),
  SetColumnName: R.assoc('columnName'),

  CreateAggregator: model => {
    return R.pipe(
      R.over(
        R.lensPath(['aggregators']),
        S.append(OperationComponent.init('Aggregator', model.uid, true))),
      R.evolve({uid: S.inc})
    )(model)
  },

  SetAggregator: (idx, action, model) => {
    const agg = R.path(['aggregators', idx], model);

    return R.set(
      R.lensPath(['aggregators', idx]),
      OperationComponent.update(action, agg),
      model
    )
  },

  DeleteAggregator: (idx, model) =>
    R.over(
      R.lensPath(['aggregators']),
      R.remove(idx, 1),
      model
    ),

  Delete: x => x,  // NOOP -- this should be handled externally
  StartEdit: x => x,
  StopEdit: x => x,

});


const init = id => ({
  id: id,
  type: 'Grouping',
  uid: 0,

  columns: [],
  aggregators: [],
});


const view = R.curry(function(aggregatorPool, dataset, editing, action$, model) {
  return editing ? edit(action$, model) : show(action$, model);

  function edit(action$, model) {
    const {columns, aggregators} = model;

    const toOption = opt => h('option', {value: opt.index}, opt.header);
    const withBlank = R.prepend(h('option', {}, ''));

    const headerVdom = h('div', {class: {"operation-header": true}}, [
      h('span', {
        class: {remove: true},
        on: {click: [action$, Action.Delete]}
      }, '\uf1f8'),
      h('h2', {}, "Grouping"),
    ]);

    const controlsVdom = h('div', {class: {controls: true}}, [
      h('button', {
        on: {click: [action$, Action.StopEdit]}
      }, 'Done')
    ]);

    // column groupings
    const columnsVdom = h('div', {class: {columns: true}}, (() => {
      const optionPair = col => ({val: col.index, display: col.header});
      const clean = R.compose(Action.SetColumns, R.map(parseInt), R.filter(x => x !== ''));

      return Slot.multicolumn(
        "Grouping Columns",
        columns,
        R.map(optionPair, DSF.columns(dataset)),
        forwardTo(action$, clean)
      );
    })());

    // aggrgator operations
    const existingAggs = R.addIndex(R.map)((operation, idx) =>
      OperationComponent.view(aggregatorPool, dataset,
        forwardTo(action$, a => {
          return OperationAction.case({
            Delete: () => Action.DeleteAggregator(idx),
            _: () => Action.SetAggregator(idx, a)
          }, a);
        }),
        operation
      ),
      model.aggregators
    );

    const aggregatorVdom = h('div', {class: {aggregators: true}}, R.flatten([
      h('h3', {}, "Aggregators"),
      R.map(a => h('div', {class: {aggregator: true}}, a), existingAggs),
      h('button', {
        on: {click: [action$, Action.CreateAggregator]}
      }, "Add Aggregator")
    ]));

    return h('div', {class: {"operation-form": true, form: true}}, R.flatten([
      headerVdom, columnsVdom, aggregatorVdom, controlsVdom
    ]));
  }


  function show(action$, model) {
    return h('div', {class: {operation: true}}, [
      h('div',
        {class: {definition: true, "operation-grouping": true}}, [
        // R.prepend(
          h('div', {}, R.flatten([
            'Grouping on ',
            S.map(c => dataset.headers[c], model.columns).join(', ')
          ]))
          // S.map(a => h('div', {}, a.definition.display({}, dataset)), model.aggregators)
        // )
      ]),

      h('div', {class: {controls: true}}, [
        h('span', {
          class: {edit: true},
          on: {click: [action$, Action.StartEdit]}
        }, '\uf040'),

        h('span', {
          class: {remove: true},
          on: {click: [action$, Action.Delete]}
        }, '\uf1f8')

      ])
    ]);
  }
});

module.exports = {Action, view, update, init};
