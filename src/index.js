
import * as P from './processes'
import flow from './flow'

import createStream from './streams/stream'
import elasticsearch from './streams/sources/elasticsearch'

const sources = { elasticsearch }

module.exports = {
  P,
  flow,
  sources,
  createStream
}
