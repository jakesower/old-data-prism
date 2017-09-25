const R = require('ramda');
const h = require('snabbdom/h').default;

module.exports = (options, currentValues, events) => {
  const optionVdom = option => {
    const on = R.contains(option.value, currentValues);
    const nextVal = on ?
      R.filter(R.complement(R.equals(option.value)), currentValues) :
      R.append(option.value, currentValues);

    return h('div', {
      class: {option: true},
      on: {click: () => events.change(nextVal)}
    }, [
      h('div', {class: {check: true}}, on ? '✓' : ''),
      h('div', {class: {value: true}}, option.display)
    ])
  }

  const displayVal = R.pipe(
    v => R.find(R.propEq('value', v), options),
    R.prop('display')
  )


  const placeholder = currentValues.length > 0 ?
    (currentValues.length + ' Selected: ' +
      R.pipe(R.map(displayVal), R.join(', '))(currentValues)) :
    'Please select';


  return h('div', {class: {'multiselect': true}, attrs: {tabindex: 0}},
    h('div',
      {class: {'multiselect-content': true}},
      [
        h('div', {class: {placeholder: true}}, placeholder),
        h('div', {class: {options: true}},
          R.map(optionVdom, options)
        )
      ]
    )
  )
}
