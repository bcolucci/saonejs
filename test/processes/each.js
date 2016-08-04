
import { deepEqual } from 'assert'
import { each } from '../../src/processes'
import createStream from '../../src/streams/stream'

describe('processes/each', () => {

  it('Apply a function on each element of a stream', done => {
    const stream = createStream()
    const received = []
    each({ each: received.push.bind(received) })(stream)
      .on('end', () => {
        deepEqual(received, [ 'a', 'b' ])
        done()
      })
    stream.write('a')
    stream.write('b')
    stream.emit('end')
  })

})
