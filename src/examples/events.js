
import flow from '../flow'
import * as P from '../processes'

const memoryFlow = () => {
  const { listen, stream } = require('./fixtures/events').default
  flow(
    P.compact({
      equals: (e1, e2) => e1 === e2 && [ 'searchBegin', 'searchEnd' ].includes(e1),
      chunkSize: 10
    }),
    P.map({ transform: (e) => e === 'searchEnd' ? 'searchBegin' : e}),
    P.log()
  )(stream)
  return listen()
}

const elasticsearchFlow = () => {

  const createElasticsearchSource = require('../streams/sources/elasticsearch').default
  const clientOpts = { host: 'http://nova.wuha.io:9200' }
  const { listen, stream } = createElasticsearchSource(clientOpts, { index: 'wars', type: 'extension_event' })

  const byUUIDFlow = flow(
    P.categorize({ field: 'uuid' }),
    P.complement(),
    P.values(),
    P.flatten()
  )

  const byUUID = byUUIDFlow(stream)

  P.map({ transform: (uuidStream) => {
    P.log({ template: (ev) => ev.uuid })(uuidStream)
    P.log()(count()(uuidStream))
  } })(byUUID)

  return listen()
}

//memoryFlow()
elasticsearchFlow()
