
import { equals, last } from 'ramda'
import { deepEqual } from 'assert'
import { compact } from '../../src/processes'
import createStream from '../../src/streams/stream'

describe('processes/compact', () => {

  //TODO the description
  it('*****************************************', done => {
    const stream = createStream()
    const received = []
    compact({ test: (cur, prev, buffer) => !prev || equals(cur, prev), compact: last })(stream)
      .on('data', received.push.bind(received))
      .on('end', () => {
        //console.log('received', received.join(''))
        //TODO the assertion
          //deepEqual(received, 'abcddeffg'.split(''))
        done()
      })
    'aabcddddddeffg'.split('')
      .forEach(n => stream.write(n))
    stream.emit('end')
  })

})
