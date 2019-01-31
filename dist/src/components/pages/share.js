"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xstream_1 = require("xstream");
const dom_1 = require("@cycle/dom");
const maybe_1 = require("../../lib/monads/maybe");
;
const initState = {
    rootSource: maybe_1.Maybe.Nothing(),
    activePair: maybe_1.Maybe.Nothing(),
};
function main(cycleSources) {
    const { props, remixSource, remixValue, chartValue, analysisValue } = cycleSources;
    return {
        DOM: xstream_1.default.combine(props, remixSource, remixValue, chartValue, analysisValue)
            .map(vs => view(...vs)),
    };
}
exports.default = main;
function view(props, remixSource, remixValue, chartValue, analysisValue) {
    const empty = x => dom_1.div(`(no ${x})`);
    return dom_1.div('.main-container', [
        dom_1.aside({}, [
            dom_1.h2('Sources'),
            dom_1.ul(props.sources.length === 0 ? empty("sources") : props.sources.map(source => dom_1.li(source.name))),
            dom_1.h2('Remixes'),
            dom_1.ul(props.sources.length === 0 ? empty("sources") : props.sources.map(source => dom_1.li(source.name))),
            dom_1.h2('Charts'),
            dom_1.ul(props.sources.length === 0 ? empty("sources") : props.sources.map(source => dom_1.li(source.name))),
            dom_1.h2('Analyses'),
            dom_1.ul(props.sources.length === 0 ? empty("sources") : props.sources.map(source => dom_1.li(source.name))),
        ]),
        dom_1.main({}, [])
    ]);
}
