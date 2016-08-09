
import { strictEqual } from 'assert'
import { average } from '../../src/processes'
import createStream from '../../src/streams/stream'

describe('processes/average', () => {

  const bigArr = require('./_bigArr.json')

  it('returns the average value of a stream (standard)', done => {
    const stream = createStream()
    const received = []
    average()(stream)
      .on('data', received.push.bind(received))
      .on('end', () => {
        strictEqual(received.pop(), 5.50951)
        done()
      })
    bigArr.forEach(n => stream.write(n))
    stream.emit('end')
  })

  it('returns the average value of a stream (std_deviation)', done => {
    const stream = createStream()
    const received = []
    average({ mode: 'std_deviation' })(stream)
      .on('data', received.push.bind(received))
      .on('end', () => {
        strictEqual(received.pop(), 2.867415135605587)
        done()
      })
    bigArr.forEach(n => stream.write(n))
    stream.emit('end')
  })

})
