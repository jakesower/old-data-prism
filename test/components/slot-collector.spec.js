import { assert } from 'chai';
import 'mocha';
import { compileTestData } from '../test-utils';
import { mockDOMSource } from '@cycle/dom';
import { mockTimeSource } from '@cycle/time';
import { SlotCollector } from '../../src/components/collectors/slot-collector';
import { FreeSlot } from '../../src/lib/slots';
import dataTypes from '../../src/lib/data-types';

const testData = compileTestData({
  Date: ['2014-06-14', '2014-06-14', '2014-06-19', '2014-06-20', '2014-06-24', '2014-06-24'],
  Home: ['Uruguay', 'England', 'Uruguay', 'Italy', 'Italy', 'Costa Rica'],
  Away: ['Costa Rica', 'Italy', 'England', 'Costa Rica', 'Uruguay', 'England'],
  HGs: ['1', '1', '2', '0', '0', '0'],
  AGs: ['3', '2', '1', '1', '1', '0'],
});

describe('slot components', () => {
  describe('free slot component', () => {
    it('should modify its state appropriately', (done) => {
      const Time = mockTimeSource();

      const input$ = Time.diagram('--B', { B: { target: { value: 'moo' }} });
      const expected$ = Time.diagram('A-B', { A: '', B: 'moo' });

      const DOM = mockDOMSource({
        '.slot-input': { change: input$ }
      });

      const freeSlot = FreeSlot({ type: dataTypes.String, display: 'Test Free Slot' });
      const comp = freeSlotComponent(freeSlot, testData, '')({ DOM });

      const value$ = comp.value;

      Time.assertEqual(value$, expected$);
      Time.run(done);
    });
  });

});
