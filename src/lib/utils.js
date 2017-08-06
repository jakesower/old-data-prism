const targetValue = function(ev) {
  return ev.target.value;
}


const debounce = function(func, wait) {
  let timeout;
  return function() {
    let context = this, args = arguments;
    let later = function() {
      timeout = null;
      func.apply(context, args);
    }

    let callNow = !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  }
}


export {targetValue, debounce};
