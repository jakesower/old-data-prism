const R = require('ramda');

module.exports = {
  equals: {
    columnTest: R.T,
    columnSlots: [{
      name: "Column"
    }],
    userSlots: [{
      key: "val"
      name: ""
    }],
    rowFunc: R.always((us, cs) => us[0] === cs[0])
  }
}
