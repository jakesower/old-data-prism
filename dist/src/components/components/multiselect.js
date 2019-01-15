"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@cycle/dom");
const dom_utils_1 = require("../../lib/dom-utils");
const utils_1 = require("../../lib/utils");
function main(init) {
    return function (cycleSources) {
        const { DOM } = cycleSources;
        const { toggle$ } = intent(DOM);
        const value$ = toggle$
            .fold((value, togId) => utils_1.toggle(value, togId), init.selected);
        return {
            DOM: value$.map(value => view(value, init.options)),
            value: value$,
        };
    };
}
exports.default = main;
function intent(DOM) {
    return {
        toggle$: dom_utils_1.scopedEvent(DOM.select('.option'), 'click').map(t => t.dataset.value)
    };
}
function view(currentValues, options) {
    const optionVdom = (option) => {
        const on = currentValues.includes(option.value);
        return dom_1.div('.option', { dataset: { value: option.value } }, [
            dom_1.div('.check', {}, on ? '✓' : ''),
            dom_1.div('.value', {}, option.display)
        ]);
    };
    const currentDisplays = currentValues
        .map(cv => options.find(o => o.value === cv).display);
    const placeholder = currentValues.length > 0 ?
        `${currentValues.length} Selected: ${currentDisplays.join(', ')}` :
        'Please select';
    return dom_1.div('.multiselect', { attrs: { tabindex: 0 } }, dom_1.div('.multiselect-content', [
        dom_1.div('.placeholder', placeholder),
        dom_1.div('.options', options.map(optionVdom))
    ]));
}
