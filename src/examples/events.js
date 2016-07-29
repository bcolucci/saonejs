
import flow from '../flow'
import log from '../processes/log'
import map from '../processes/map'
import compact from '../processes/compact'
import filter from '../processes/filter'
import buffer from '../processes/buffer'
import count from '../processes/count'
import spread from '../processes/spread'

import categorize from '../processes/categorize'
import values from '../processes/values'
import each from '../processes/each'
import complement from '../processes/complement'
import flatten from '../processes/flatten'

// const memoryFlow = () => {
//   const { listen, stream } = require('./fixtures/events').default
//   flow(
//     compact({
//       equals: (e1, e2) => e1 === e2 && [ 'searchBegin', 'searchEnd' ].includes(e1),
//       chunkSize: 10
//     }),
//     map({ transform: (e) => e === 'searchEnd' ? 'searchBegin' : e}),
//     log()
//   )(stream)
//   return listen()
// }

const elasticsearchFlow = () => {
  const createElasticsearchSource = require('../streams/sources/elasticsearch').default
  const clientOpts = { host: 'http://nova.wuha.io:9200' }
  const { listen, stream } = createElasticsearchSource(clientOpts, { index: 'wars', type: 'extension_event' })

  // log()(stream);
  const byUUIDFlow = flow(categorize({ field: 'uuid' }),
    complement(),
    values(),
    flatten());

  const byUUID = byUUIDFlow(stream);

  map({ transform: (uuidStream) => {
    log({ template: (ev) => `${ev.uuid}` })(uuidStream);
    log()(count()(uuidStream));
  } })(byUUID);


  return listen()
}

//memoryFlow()
elasticsearchFlow()

