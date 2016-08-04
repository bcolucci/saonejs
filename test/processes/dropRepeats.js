
import { equals } from 'ramda'
import { deepEqual } from 'assert'
import { dropRepeats } from '../../src/processes'
import createStream from '../../src/streams/stream'

describe('processes/dropRepeats', () => {

  it('drop repeating elements from a stream (simple values)', done => {
    const stream = createStream()
    const received = []
    dropRepeats()(stream)
      .on('data', received.push.bind(received))
      .on('end', () => {
        deepEqual(received, 'abcdefgabcdefg'.split(''))
        done()
      })
    'aaabccccdddefggaabbbbbcdeeeffg'.split('')
      .forEach(n => stream.write(n))
    stream.emit('end')
  })

  it('drop repeating elements from a stream (complex values)', done => {
    const stream = createStream()
    // value diff > 1 or the same value as before
    const test = (prev, cur) => Math.abs(cur.value - prev.value) > 1 || equals(prev.value, cur.value)
    const received = []
    dropRepeats({ test })(stream)
      .on('data', received.push.bind(received))
      .on('end', () => {
        deepEqual(received, [ { value: 1 }, { value: 2 }, { value: 1 } ])
        done()
      })
    const users = [
      { value: 1 },
      { value: 3 },
      { value: 2 },
      { value: 2 },
      { value: 4 },
      { value: 1 }
    ]
    users.forEach(n => stream.write(n))
    stream.emit('end')
  })

})
