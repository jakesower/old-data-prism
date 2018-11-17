import { option } from "@cycle/dom";


export function indexedOptions(opts, selVal) {
  const blank = option({ attrs: { value: "" }}, "");
  const vdom = opts.map((opt, idx) => option({ attrs: { value: idx, selected: idx === selVal }}, opt));
  return [blank].concat(vdom);
}


export function optionsList(opts) {
  return opts.map(opt => option({ attrs: { value: opt }}, opt));
}


export function scopedEvent(DOM, eventType) {
  const scopes = DOM.namespace.filter(s => s.type === 'selector').map(n => n.scope);
  const match = elt => scopes.some(s => elt.matches(s));
  return DOM.events(eventType).map(ev => ev.path.find(match));
}


export function targetValue(ev) {
  return ev.target.value;
}
