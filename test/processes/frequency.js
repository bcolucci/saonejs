
import { equals } from 'ramda'
import { deepEqual } from 'assert'
import { frequency } from '../../src/processes'
import createStream from '../../src/streams/stream'

describe('processes/frequency', () => {

  it('calculate a frequency on a stream', done => {
    const stream = createStream()
    const received = []
    frequency({ test: equals('a'), round: 1 })(stream)
      .on('data', received.push.bind(received))
      .on('end', () => {
        deepEqual(received, [ 1, 0.5, 0.3, 0.3, 0.4, 0.5, 0.6, 0.6, 0.7, 0.6, 0.5, 0.5, 0.5, 0.4 ])
        done()
      })
    'abbbaaaaabbbbb'.split('')
      .forEach(n => stream.write(n))
    stream.emit('end')
  })

})
