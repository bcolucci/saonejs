
import flow from '../src/flow'
import log from '../src/processes/log'
import map from '../src/processes/map'
import compact from '../src/processes/compact'

import source from './fixtures/events'

flow(
  compact({
    equals: (e1, e2) => e1 === e2 && [ 'searchBegin', 'searchEnd' ].includes(e1)
    , chunkSize: 10
  }),
  map({ transform: (e) => e === 'searchEnd' ? 'searchBegin' : e}),
  log()
)(source.stream)

source.listen()
