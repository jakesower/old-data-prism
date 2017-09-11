const R = require('ramda');
const S = require('sanctuary');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');
const Type = require('union-type');
const ColumnSelector = require('./column-selector');
const DSF = require('../lib/dataset-functions');
const OperationComponent = require('./operation');
const Slot = require('./slot');


const Action = Type({
  SetColumns: [Array],
  SetActive: [Number],
  CreateAggregator: [],
  SetAggregator: [Number, Object],
  DeleteAggregator: [Number]
});


const update = Action.caseOn({
  SetActive: R.assoc('active'),
  CreateAggregator: model => {
    return R.evolve({
      aggregators: R.append(OperationComponent.init('Aggregator', model.uid)),
      uid: R.inc,
      activeAggregator: R.always(model.uid),
    }, model);
  },
  SetAggregator: (id, act) => R.map(
    agg => agg.id === id ? OperationComponent.update(act, agg) : agg
  ),
  DeleteAggregator: id => R.filter(agg => agg.id !== id),
});


const init = id => ({
  id: id,
  type: 'Grouping',
  uid: 1,
  activeAggregator: null,

  columns: [],
  aggregators: [],
});


const view = ({dataset, operation, itemPool, active}, {set$, delete$, setActive$}) => {
  return editing ? edit() : show();

  function edit() {
    const {id, columns, aggregators} = model;

    const toOption = opt => h('option', {value: opt.index}, opt.header);
    const withBlank = R.prepend(h('option', {}, ''));

    const headerVdom = h('div', {class: {"operation-header": true}}, [
      h('span',
        { class: {remove: true}
        , on: {click: [delete$, id]}
        }
      ),
      h('h2', {}, "Grouping"),
    ]);

    const controlsVdom = h('div', {class: {controls: true}}, [
      h('button', {
        on: {click: [setActive$, null]}
      }, 'Done')
    ]);

    // column groupings
    const columnsVdom = h('div', {class: {columns: true}}, (() => {
      const optionPair = col => ({val: col.index, display: col.header});
      const clean = R.compose(Action.SetColumns, R.map(parseInt));

      return Slot.multicolumn(
        "Grouping Columns",
        columns,
        R.map(optionPair, DSF.columns(dataset)),
        forwardTo(set$, clean)
      );
    })());

    // aggrgator operations
    const af = a => forwardTo(set$, a);
    const existingAggs = R.map(
      aggregator => {
        return OperationComponent.view(
          { dataset
          , operation: op
          , itemPool: aggregatorPool
          , active: op.id === active
          },
          { set$: af(Action.SetAggregator)
          , delete$: af(Action.DeleteAggegator)
          , setActive$: af(Action.SetActive)
          }
        );
      },
      model.aggregators
    );

    const ctrlAttrs = action => ({
      class: {control: true},
      on: {click: [action$, action]}
    });

    const aggregatorVdom = h('div', {class: {aggregators: true}}, R.flatten([
      h('h3', {}, "Aggregators"),
      R.map(a => h('div', {class: {aggregator: true}}, a), existingAggs),
      h('div', {class: {"prepare-controls": true}, key: 'prepare-controls'}, [
        h('div',
          { class: {control: true},
            on: {click: [set$, Action.CreateAggregator]}
          },
          h('span', {class: {'operation-aggregator': true}}, ' Aggregator')
        )
      ])
    ]));

    return h('div', {class: {"operation-form": true, form: true}}, R.flatten([
      headerVdom, columnsVdom, aggregatorVdom, controlsVdom
    ]));
  }


  function show() {
    return h('div', {class: {operation: true}}, [
      h('div',
        {class: {definition: true, "operation-grouping": true}}, [
        h('div', {}, R.flatten([
          'Grouping on ',
          R.map(c => dataset.headers[c], model.columns).join(', ')
        ]))
      ]),

      h('div', {class: {controls: true}}, [
        h('span', {class: {edit: true}, on: {click: [setActive$, model.id]}}),
        h('span', {class: {remove: true}, on: {click: [delete$, model.id]}})
      ])
    ]);
  }
};

module.exports = {Action, view, update, init};
