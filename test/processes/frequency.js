
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
        deepEqual(received, [
          1,
          0.5,
          0.3333333333333333,
          0.25,
          0.4,
          0.5,
          0.5714285714285714,
          0.625,
          0.6666666666666666,
          0.6,
          0.5454545454545454,
          0.5,
          0.46153846153846156,
          0.42857142857142855
        ])
        done()
      })
    'abbbaaaaabbbbb'.split('')
      .forEach(n => stream.write(n))
    stream.emit('end')
  })

  //TODO test the trigger case

})
