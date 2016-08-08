
import { deepEqual } from 'assert'
import { map } from '../../src/processes'
import createStream from '../../src/streams/stream'

describe('processes/map', () => {

  it('map elements on the stream', done => {
    const stream = createStream()
    const received = []
    map({ transform: x => `_${x}` })(stream)
      .on('data', received.push.bind(received))
      .on('end', () => {
        deepEqual(received, [ '_a', '_b' ])
        done()
      })
    stream.write('a')
    stream.write('b')
    stream.emit('end')
  })

})
