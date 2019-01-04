import { option } from "@cycle/dom";
import xs, { Stream } from "xstream";


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


export function extractFile(element$: Stream<any>) {
  const loaded$ = xs.create({
    start: () => {},
    stop: () => {}
  });

  element$.addListener({
    next: element => {
      var file = (element.files || [])[0];
      var fileName = file.name.replace(/\.csv$/, '').replace(/_/g, ' ');

      var r = new FileReader();
      r.onload = function() {
        loaded$.shamefullySendNext({
          body: this.result as string,
          name: fileName,
        });
      };

      r.readAsText(file);
    },
  });

  return loaded$;
};
