
import flow from './flow'
import utils from './utils'

import createStream from './streams/stream'
import elasticsearch from './streams/sources/elasticsearch'
import inMemoryArray from './streams/sources/inMemoryArray'
import generator from './streams/sources/generator'

import * as P from './processes'

const sources = {
  elasticsearch,
  inMemoryArray,
  generator
}

module.exports = {
  P,
  flow,
  sources,
  utils,
  createStream
}
