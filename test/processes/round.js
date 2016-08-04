
import { equals } from 'ramda'
import { deepEqual } from 'assert'
import { round } from '../../src/processes'
import createStream from '../../src/streams/stream'

describe('processes/round', () => {

  it('round numbers on a stream', done => {
    const stream = createStream()
    const received = []
    round({ value: 2 })(stream)
      .on('data', received.push.bind(received))
      .on('end', () => {
        deepEqual(received, [ 1.24, 1.48, 1.7, 1.14, 1.34 ])
        done()
      })
    stream.write(1.2368)
    stream.write(1.4777)
    stream.write(1.6952)
    stream.write(1.1441)
    stream.write(1.3399)
    stream.emit('end')
  })

})
