'use strict'

var processes = require('./src/processes');
var flow = require('./src/flow').default;
var sources = {
  es: require('./src/streams/sources/elasticsearch').default
};

module.exports = Object.assign({}, { P: processes }, { flow }, { sources });
