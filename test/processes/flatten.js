
import { deepEqual } from 'assert'
import { flatten } from '../../src/processes'
import createStream from '../../src/streams/stream'

describe('processes/flatten', () => {

  it('flatten an stream of arrays', done => {
    const stream = createStream()
    const received = []
    flatten()(stream)
      .on('data', received.push.bind(received))
      .on('end', () => {
        deepEqual(received, [ 1, 2, 3 ])
        done()
      })
    stream.write([ 1, 2 ])
    stream.write([ 3 ])
    stream.emit('end')
  })

})
