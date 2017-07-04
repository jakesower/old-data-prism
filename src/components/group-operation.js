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


const update = Action.caseOn({
  StartEdit: R.assoc('editing', true),
  Cancel: R.assoc('editing', false),
  Delete: x => x,  // NOOP -- this should be handled externally
  Save: model =>
    R.merge(model, {
      columns: model.editState.columns,
      aggregators: model.editState.aggregators,
      editing: false,
      enabled: true
    }),

  SetColumns: R.assocPath(['editState', 'columns']),

  CreateAggregator: model => {
    return R.pipe(
      R.over(
        R.lensPath(['editState', 'aggregators']),
        S.append(OperationComponent.init('Aggregator', model.uid))),
      R.evolve({uid: S.inc})
    )(model)
  },

  SetAggregator: (idx, action, model) => {
    const agg = R.path(['editState', 'aggregators', idx], model);

    return R.set(
      R.lensPath(['editState', 'aggregators', idx]),
      OperationComponent.update(action, agg),
      model
    )
  },

  DeleteAggregator: (idx, model) =>
    R.over(
      R.lensPath(['editState', 'aggregators']),
      R.remove(idx, 1),
      model
    )

});


const init = id => ({
  id: id,
  type: 'Grouping',
  enabled: false,
  editing: true,
  uid: 0,

  columns: [],
  aggregators: [],

  editState: {
    columns: [],
    aggregators: []
  }
});


const view = R.curry(function(aggregatorPool, dataset, action$, model) {
  return model.editing ? edit(action$, model) : show(action$, model);

  function edit(action$, model) {
    const {columns, aggregators} = model.editState;

    const toOption = opt => h('option', {value: opt.index}, opt.header);
    const withBlank = R.prepend(h('option', {}, ''));

    const controlsVdom = h('div', {class: {controls: true}}, [
      h('button', {
        on: {click: [action$, Action.Save]},
        // attrs: {disabled: !func}
      }, model.func ? 'Update' : 'Apply'),

      h('button', {
        on: {click: [action$, model.enabled ? Action.Cancel : Action.Delete]}
      }, 'Cancel')
    ]);

    // column groupings
    const columnsVdom = h('div', {class: {columns: true}}, (() => {
      const optionPair = col => ({val: col.index, display: col.header});
      const clean = R.compose(Action.SetColumns, R.map(parseInt), R.filter(x => x !== ''));

      return h('div', {}, [
        h('h3', {}, "Select Column(s) to Group On"),
        ColumnSelector.multi(
          S.map(optionPair, DSF.columns(dataset)),
          forwardTo(action$, clean),
          columns
        )
      ])
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
      model.editState.aggregators
    );

    const aggregatorVdom = h('div', {class: {aggregators: true}}, R.flatten([
      existingAggs,
      h('button', {
        on: {click: [action$, Action.CreateAggregator]}
      }, "Add Aggregator")
    ]));

    return h('div', {class: {"operation-form": true}}, R.flatten([
      columnsVdom, aggregatorVdom, controlsVdom
    ]));
  }


  function show(action$, model) {
    return h('div', {class: {operation: true, grouping: true}}, [
      'Moo'
    ]);
  }
});

module.exports = {Action, view, update, init};
