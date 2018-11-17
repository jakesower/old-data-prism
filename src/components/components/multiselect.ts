import { div } from '@cycle/dom';
import xs, { Stream } from 'xstream';
import { scopedEvent } from '../../lib/dom-utils';
import { toggle } from '../../lib/utils';


export interface Option {
  value: string,
  display: string,
}

interface Props {
  options: Option[],
  selected: string[],
}


export default function main(init: Props) {
  return function (cycleSources: { DOM: any }) {
    const { DOM } = cycleSources;
    const { toggle$ } = intent(DOM);

    const value$ = toggle$
      .fold((value, togId) => toggle(value, togId), init.selected);

    return {
      DOM: value$.map(value => view(value, init.options)),
      value: value$,
    }
  }
}


function intent(DOM) {
  console.log({DOM})
  return {
    toggle$: scopedEvent(DOM.select('.option'), 'click').map(t => t.dataset.value) as Stream<string>
    // toggle$: DOM.select('.option').events('click').debug().map(t => t.dataset.value) as Stream<string>
  }
}


function view(currentValues: string[], options: Option[]) {
  const optionVdom = (option: Option) => {
    const on = currentValues.includes(option.value);
    return div('.option', { dataset: { value: option.value }}, [
      div('.check', {}, on ? '✓' : ''),
      div('.value', {}, option.display)
    ]);
  }

  const currentDisplays = currentValues
    .map(cv => (options.find(o => o.value === cv) as Option).display);
  const placeholder = currentValues.length > 0 ?
    `${currentValues.length} Selected: ${currentDisplays.join(', ')}` :
    'Please select';

  return div('.multiselect', { attrs: { tabindex: 0 }},
    div('.multiselect-content', [
      div('.placeholder', placeholder),
      div('.options', options.map(optionVdom))
    ])
  )
}
