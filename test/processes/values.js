
import { deepEqual } from 'assert'
import { values } from '../../src/processes'
import createStream from '../../src/streams/stream'

describe('processes/values', () => {

  it('extract object values from a stream', done => {
    const stream = createStream()
    const received = []
    values()(stream)
      .on('data', received.push.bind(received))
      .on('end', () => {
        deepEqual(received, [
          [ 'hello', 'you' ],
          [ 'bye' ]
        ])
        done()
      })
    stream.write({ k1: 'hello', k2: 'you' })
    stream.write({ k1: 'bye' })
    stream.emit('end')
  })

})
