
import { deepEqual } from 'assert'
import { buffer } from '../../src/processes'
import createStream from '../../src/streams/stream'

describe('processes/buffer', () => {

    it('bufferize n elements before writing on the stream', done => {
      const stream = createStream()
      const received = []
      buffer({ chunkSize: 2 })(stream)
        .on('data', received.push.bind(received))
        .on('end', () => {
          deepEqual(received, [ 'a', 'b' ])
          done()
        })
      stream.write('a')
      stream.write('b')
      stream.write('c') // will never be received
      stream.emit('end')
    })

})
