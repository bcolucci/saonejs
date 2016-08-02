
import flow from '../flow'
import * as P from '../processes'
import R from 'ramda'

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

const ESSource = () => {
  const createElasticsearchSource = require('../streams/sources/elasticsearch').default
  const clientOpts = { host: 'http://nova.wuha.io:9200' }
  return createElasticsearchSource(clientOpts, { index: 'wars', type: 'extension_event' })
}




const nameIsIn = (arr) => {
  const isIn = R.partialRight(R.contains, R.append(arr, []))
  return R.wrap(isIn, (isIn, ev) => isIn(ev.name))
}

const nameIsNotIn = (arr) => R.compose(R.not, nameIsIn(arr))

const removeNonRelevantEvents = () => {
  const NON_RELEVANT_EVENTS = [ 'onMouseMove', 'onScroll', 'onResize' ]
  const test = nameIsNotIn(NON_RELEVANT_EVENTS)

  return P.filter({ test })
}

const squashDuplicateSearchBegins = () => {
  const SEARCH_EVENTS = [ 'onSearchBegin', 'onSearchEnd' ]
  const test = nameIsIn(SEARCH_EVENTS)

  const getCompactedEvent = R.partial(R.set, [ R.lensProp('name'), 'onSearchBegin' ])
  const compact = R.wrap(getCompactedEvent, (getCE, events) => getCE(R.head(events)))

  return P.compact({ test, compact })
}





const cleaning = () => {
  const perUUIDFlow = flow(removeNonRelevantEvents(), squashDuplicateSearchBegins())
  
  const getUUIDStreams = flow(
    P.categorize({ field: 'uuid' }),
    P.complement(),
    P.values(),
    P.flatten(),
    P.map({ transform: perUUIDFlow })
  )

  return getUUIDStreams
}





const episodeExtraction = () => {

}



// need to take all events of the current version or less and convert them into the proper format
// give them the "raw" attribute and give them the correct behaviour name

const { listen, stream } = ESSource()
const cleanedEvents = cleaning()(stream)
const episodes = episodeExtraction()(cleanedEvents)

listen()
