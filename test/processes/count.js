
import { deepEqual } from 'assert'
import { count } from '../../src/processes'
import createStream from '../../src/streams/stream'

describe('processes/count', () => {

  it('gives the number of elements of the stream passed through', done => {
    const stream = createStream()
    const received = []
    count()(stream)
      .on('data', received.push.bind(received))
      .on('end', () => {
        deepEqual(received, [ 1, 2, 3 ])
        done()
      })
    stream.write('a')
    stream.write('b')
    stream.write('c')
    stream.emit('end')
  })

})
