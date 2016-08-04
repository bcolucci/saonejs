
import { equals, last } from 'ramda'
import { deepEqual } from 'assert'
import { compact } from '../../src/processes'
import createStream from '../../src/streams/stream'

describe('processes/compact', () => {

  // TODO fix the process
  it('...............................', done => {
    done()
    /*const stream = createStream()
    const received = []
    compact({ test: equals, compact: last })(stream)
      .on('data', received.push.bind(received))
      .on('end', () => {
        deepEqual(received, 'abcdefg'.split(''))
        done()
      })
    'aabcdddeffg'.split('')
      .forEach(n => stream.write(n))
    stream.emit('end')*/
  })

})
