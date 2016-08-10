
import { deepEqual } from 'assert'
import { toArray } from '../../src/processes'
import createStream from '../../src/streams/stream'

describe('processes/toArray', () => {

  it('returns the array of stream elements at the end of the stream (until the end)', done => {
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

  it('returns the array of stream elements at the end of the stream (with a chunkSize)', done => {
    const stream = createStream()
    const received = []
    toArray({ chunkSize: 10 })(stream)
      .on('data', received.push.bind(received))
      .on('end', () => {
        deepEqual(received, [
          [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j' ],
          [ 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't' ],
          [ 'u', 'v', 'w', 'x', 'y', 'z' ]
        ])
        done()
      })
    'abcdefghijklmnopqrstuvwxyz'.split('').forEach(n => stream.write(n))
    stream.emit('end')
  })

})
