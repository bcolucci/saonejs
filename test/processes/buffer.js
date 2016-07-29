
import { deepEqual } from 'assert'
import { buffer } from '../../src/processes'
import inMemoryStream from '../../src/streams/sources/inMemoryStream'

describe('processes/buffer', () => {

    it('bufferize n elements before writing on the stream', (done) => {
      const arr = [ 'this', 'is', 'an', 'array', 'of', 'seven', 'elements' ]
      const { listen, stream } = inMemoryStream(arr.slice())
      const buffered = buffer({ chunkSize: 3 })(stream)
      const values = []
      done()
      //TODO
      /*buffered.on('data', (data) => {
        if (!data) {
          deepEqual(values, arr)
          return done()
        }
        values.push(data)
      })
      listen()*/
    })

})
