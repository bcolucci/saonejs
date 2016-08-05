
import { deepEqual } from 'assert'
import { tick } from '../../src/processes'
import createStream from '../../src/streams/stream'

describe('processes/tick', () => {

  it('send elements in chunks with a certain speed', done => {
    const stream = createStream()
    const received = []
    const speed = 5
    tick({ speed })(stream)
      .on('data', received.push.bind(received))
    stream.write(1)
    stream.write(1)
    stream.write(1)
    stream.write(1)
    deepEqual(received, [])
    setTimeout(() => {
      deepEqual(received, [])
      setTimeout(() => {
        deepEqual(received, [ 1 ])
        setTimeout(() => {
          deepEqual(received, [ 1, 1, 1 ])
          stream.emit('end')
          done()
        }, speed * 2)
      }, speed)
    }, 1)
  })

})
