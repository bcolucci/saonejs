
import { deepEqual } from 'assert'
import { keys } from '../../src/processes'
import createStream from '../../src/streams/stream'

describe('processes/values', () => {

  it('extract object keys from a stream', done => {
    const stream = createStream()
    const received = []
    keys()(stream)
      .on('data', received.push.bind(received))
      .on('end', () => {
        deepEqual(received, [
          [ 'k1', 'k2' ],
          [ 'k3' ]
        ])
        done()
      })
    stream.write({ k1: 'hello', k2: 'you' })
    stream.write({ k3: 'bye' })
    stream.emit('end')
  })

})
