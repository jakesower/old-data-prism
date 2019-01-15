"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../lib/utils");
const xstream_1 = require("xstream");
const isolate_1 = require("@cycle/isolate");
const slot_components_1 = require("./shared/slot-components");
// A higher order component--takes in slots and returns a component
function SlotCollector(opDef, dataSource, initialInputs) {
    const slots = opDef.slots;
    const slotKeys = Object.keys(slots);
    const slotVals = Object.values(slots);
    const slotDispatch = {
        free: slot_components_1.freeSlotComponent,
        column: slot_components_1.columnSlotComponent,
        enumerated: slot_components_1.enumeratedSlotComponent,
        expression: slot_components_1.freeSlotComponent,
        multicolumn: slot_components_1.multicolumnSlotComponent,
        source: slot_components_1.sourceSlotComponent,
    };
    function main(cycleSources) {
        const slotComponents = slotVals.map((slot, idx) => {
            const init = initialInputs[slotKeys[idx]];
            return isolate_1.default(slotDispatch[slot.slotType](slot, dataSource, init), idx)(cycleSources);
        });
        const value = xstream_1.default.combine(...slotComponents.map(sc => sc.value))
            .map(vals => utils_1.zipObj(slotKeys, vals));
        const outDom = xstream_1.default.combine(...slotComponents.map(sc => sc.DOM))
            .map(vals => [...vals]);
        return { DOM: outDom, value };
    }
    return main;
}
exports.SlotCollector = SlotCollector;
