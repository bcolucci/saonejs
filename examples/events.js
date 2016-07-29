
import flow from '../src/flow'
import log from '../src/processes/log'
import map from '../src/processes/map'
import compact from '../src/processes/compact'
import elasticSearch from '../src/streams/sources/elasticSearch'
import filter from '../src/processes/filter'
import buffer from '../src/processes/buffer'
import count from '../src/processes/count'
import spread from '../src/processes/spread'

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
const forGroup = filter({ test: (ev) => ev.group === '5704d54870547bc06a19322c' })(stream);
// const logged = log()(forGroup);
const counted = count()(forGroup);
log()(counted);

listen()
