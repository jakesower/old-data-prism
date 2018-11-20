import { adapt } from '@cycle/run/lib/adapt';
import xs, { Stream } from 'xstream';
import debounce from 'xstream/extra/debounce'

/**
 * Highly specialized driver. Its value is the height and width of whatever is
 * at `main` in the DOM.
 */
export default function mainDimensionsDriver(_): Stream<{ height: number, width: number }> {
  const dimensions$ = xs.create({
    start: listener => {
      const update = () => {
        const elt = document.querySelector('main') as HTMLElement;
        listener.next({
          height: elt.clientHeight,
          width: elt.clientWidth,
        });
      }

      window.addEventListener('DOMContentLoaded', update);
      window.onresize = update;
    },
    stop: () => {}
  });

  return adapt(dimensions$
    .compose(debounce(400))
    .startWith({ height: 1, width: 1 })
    .remember()
  );
}
