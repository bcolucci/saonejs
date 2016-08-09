
import { deepEqual } from 'assert'
import { sum } from '../../src/processes'
import createStream from '../../src/streams/stream'

describe('processes/sum', () => {

  it('sum reduce on a stream', done => {
    const stream = createStream()
    const received = []
    sum({ initialValue: 3 })(stream)
      .on('data', received.push.bind(received))
      .on('end', () => {
        deepEqual(received, [ 4, 6, 9, 13 ])
        done()
      })
    const arr = [ 1, 2, 3, 4 ]
    arr.forEach(n => stream.write(n))
    stream.emit('end')
  })

})
