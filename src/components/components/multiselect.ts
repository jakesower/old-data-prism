import { div } from '@cycle/dom';
import xs, { Stream } from 'xstream';
import { scopedEvent } from '../../lib/dom-utils';
import { toggle } from '../../lib/utils';


interface Option {
  value: string,
  display: string,
}

interface Props {
  options: Option[],
  selected: string[],
}


export default function main(cycleSources: { DOM: any, props: Stream<Props> }) {
  const { DOM, props } = cycleSources;
  const { toggle$ } = intent(DOM);

  const value$ = xs.combine(props, toggle$)
    .map(([props, value]) => toggle(props.selected, value));

  return {
    DOM: xs
      .combine<Props, string[]>(props, value$)
      .map(([prop, value]) => view(value, prop.options))
  }
}


function intent(DOM) {
  return {
    toggle$: scopedEvent(DOM.select('.option'), 'click').map(t => t.dataset.value) as Stream<string>
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

  const currentDisplays = currentValues.map(cv => options.find(o => o.value === cv).display);
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
