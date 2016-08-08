
import { deepEqual } from 'assert'
import { head } from '../../src/processes'
import createStream from '../../src/streams/stream'

describe('processes/head', () => {

  it('take only the first element on the stream', done => {
    const stream = createStream()
    const received = []
    head()(stream)
      .on('data', received.push.bind(received))
      .on('end', () => {
        deepEqual(received, [ 'a' ])
        done()
      })
    stream.write('a')
    stream.write('b')
    stream.emit('end')
  })

})
