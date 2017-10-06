const R = require('ramda');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');
const Type = require('union-type');

const {DataSlot, Slot, DataType} = require('../../types');
const slotDom = require('../helpers/slot-dom');
const {select, checkbox, text, multiselect} = require('../controls');


const slotDefs = {
  foreignSource: Slot.Pool('foreignSource', 'Foreign Source', DataType.String, R.map(R.prop('name'), sources)),
  localKey: DataSlot.Column('localKey', 'Local Key', DataType.String),
  foreignKey: DataSlot.Column('foreignKey', 'Foreign Key', DataType.String)
};


const Action = Type({
  SetInput: [String, () => true]
});


const init = () => ({
  foreignSource: null,
  localKey: null,
  foreignKey: null
});


const update = Action.caseOn({
  SetInput: (key, val, model) => R.assoc(key, val, model)
});


const view = (action$, {sources, dataset}, model) => {
  const slotStream = slot => forwardTo(action$, Action.SetInput(slot.id));
  const foreignSource = R.find(s => s.id === model.foreignSource, sources);

  return h('div', {}, [
    h('div', {class: {slot: true}}, [
      h('h3', {}, 'Foreign Source'),
      slotDom(slotStream('foreignSource'), slotDefs.foreignSource, inputs.foreignSource)
    ]),

    h('div' {class: {slot: true}}, [
      h('h3', {}, 'Local Key'),
      slotDom(slotStream('localKey'), slotDefs.localKey(dataset), inputs.localKey)
    ]),

    foreignSource ?
      h('div' {class: {slot: true}}, [
        h('h3', {}, 'Foreign Key'),
        slotDom(slotStream('foreignKey'), slotDefs.foreignKey(foreignSource.dataset), inputs.foreignKey)
      ]) :
      ''
  ]);
}


module.exports = {Action, init, view, update};
