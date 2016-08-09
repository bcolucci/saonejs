
import { deepEqual } from 'assert'
import { toArray } from '../../src/processes'
import createStream from '../../src/streams/stream'

describe('processes/toArray', () => {

  it('returns the array of stream elements at the end of the stream', done => {
    const stream = createStream()
    const received = []
    toArray()(stream)
      .on('data', received.push.bind(received))
      .on('end', () => {
        deepEqual(received, [ [ 'a', 'b', 'c' ] ])
        done()
      })
    stream.write('a')
    stream.write('b')
    stream.write('c')
    stream.emit('end')
  })

})
