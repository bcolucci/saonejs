
import flow from '../src/flow'
import log from '../src/processes/log'
import map from '../src/processes/map'
import compact from '../src/processes/compact'
import elasticSearch from '../src/streams/sources/elasticSearch'
import filter from '../src/processes/filter'
import buffer from '../src/processes/buffer'
import count from '../src/processes/count'
import spread from '../src/processes/spread'
import categorize from '../src/processes/categorize'
import values from '../src/processes/values'
import each from '../src/processes/each'
import complement from '../src/processes/complement'
import flatten from '../src/processes/flatten'

// import source from './fixtures/events'

// flow(
//   compact({
//     equals: (e1, e2) => e1 === e2 && [ 'searchBegin', 'searchEnd' ].includes(e1)
//     , chunkSize: 10
//   }),
//   map({ transform: (e) => e === 'searchEnd' ? 'searchBegin' : e}),
//   log()
// )(source.stream)



const { listen, stream } = elasticSearch();

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



listen()
