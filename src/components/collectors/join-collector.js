const R = require('ramda');
const h = require('snabbdom/h').default;
const forwardTo = require('flyd-forwardto');
const Type = require('union-type');

const Slot = require('../../types/slot');
const DataSlot = require('../../types/data-slot');
const DataType = require('../../types/data-type');
const Source = require('../../types/source');
const slotDom = require('../helpers/slot-dom');
const {select, checkbox, text, multiselect} = require('../controls');


const toPairs = R.map(s => ({display: s.name, value: s.id}));
const slotChoices = sources => ({
  foreignSource: Slot.Pool('foreignSource', 'Foreign Source', DataType.String, toPairs(sources)),
  localKey: DataSlot.Column('localKey', 'Local Key', DataType.String),
  foreignKey: DataSlot.Column('foreignKey', 'Foreign Key', DataType.String)
});


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
  const slotDefs = slotChoices(sources);
  const slotStream = slot => forwardTo(action$, Action.SetInput(slot));
  const rawForeignSource = R.find(s => s.id.toString() === model.foreignSource, sources);
  const foreignSource = rawForeignSource ? Source.load(rawForeignSource) : undefined;

  return h('div', {}, [
    h('div', {class: {slot: true}}, [
      h('h3', {}, 'Foreign Source'),
      slotDom(slotStream('foreignSource'), slotDefs.foreignSource, model.foreignSource)
    ]),

    h('div', {class: {slot: true}}, [
      h('h3', {}, 'Local Key'),
      slotDom(slotStream('localKey'), slotDefs.localKey.toSlot(dataset), model.localKey)
    ]),

    foreignSource ?
      h('div', {class: {slot: true}}, [
        h('h3', {}, 'Foreign Key'),
        slotDom(slotStream('foreignKey'), slotDefs.foreignKey.toSlot(foreignSource.dataset), model.foreignKey)
      ]) :
      ''
  ]);
}


module.exports = {Action, init, view, update};
