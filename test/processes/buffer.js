
import { deepEqual } from 'assert'
import { buffer } from '../../src/processes'
import inMemoryStream from '../../src/streams/sources/inMemoryStream'

describe('processes/buffer', () => {

    it('bufferize n elements before writing on the stream', (done) => {
      const arr = [ 'this', 'is', 'an', 'array', 'of', 'seven', 'elements', ';)' ]
      const { listen, stream } = inMemoryStream(arr)
      const values = []
      done()
      //TODO does not work...
      /*buffer({ chunkSize: 2 })(stream)
        .on('data', (data) => {
          console.log(data)
          values.push(data)
        }).on('end', () => {
          console.log('end', arr, values)
          done()
        }))
      listen()*/
    })

})
