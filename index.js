'use strict'

const processes = require('./lib/processes')
const flow = require('./lib/flow').default

const sources = {
  es: require('./lib/streams/sources/elasticsearch').default
}

module.exports = Object.assign({}, { P: processes }, { flow }, { sources })
