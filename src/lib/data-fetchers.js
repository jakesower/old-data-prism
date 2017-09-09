const R = require('ramda');
const parseCsv = require('csv-parse');

const {Action} = require('../components/main/types');


//
// WARNING: These "functions" are all about the side effects!
//

function readCsv(action$, fileDomId) {
  var input = document.getElementById(fileDomId);
  var file = input.files[0];

  var r = new FileReader();
  // r.onerror = function(e){error(e.target.error.name);};
  r.onload = function(e) {
    const result = e.target.result;
    const handleData = (err, data) => {
      action$(Action.SetData({
        headers: data[0],
        records: R.slice(1, Infinity, data)
      }));
    }

    parseCsv(result, handleData);
  };

  r.readAsText(file);
}


function readUri(action$, uri) {
  fetch(uri)
    .then(resp => resp.text())
    .then(text => parseCsv(
      text,
      (err, data) => action$(Action.SetData({
        headers: data[0],
        records: R.slice(1, Infinity, data)
      }))
    ))
}


module.exports = {
  readCsv,
  readUri,
}
