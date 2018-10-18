export function scopedEvent(DOM, eventType) {
  // const selector = elt.get('')
  const scopes = DOM.namespace.map(n => n.scope);
  const match = elt => scopes.some(s => elt.matches(s));
  return DOM.events(eventType).map(ev => ev.path.find(match));
}
