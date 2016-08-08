'use strict'

const processes = require('./src/processes')
const flow = require('./src/flow').default

const sources = {
  es: require('./src/streams/sources/elasticsearch').default
}

module.exports = Object.assign({}, { P: processes }, { flow }, { sources })
