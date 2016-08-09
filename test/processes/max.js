
import { deepEqual } from 'assert'
import { max } from '../../src/processes'
import createStream from '../../src/streams/stream'

describe('processes/max', () => {

  const bigArr = require('./_bigArr.json')

  const runTest = (opts, expected, done) => {
    const stream = createStream()
    const received = []
    max(opts)(stream)
      .on('data', received.push.bind(received))
      .on('end', () => {
        deepEqual(received, expected)
        done()
      })
    bigArr.forEach(n => stream.write(n))
    stream.emit('end')
  }

  it('keeps the maximum value from a stream (standard)', done => {
    runTest({}, require('./_max_standard.json'), done)
  })

  it('keeps the maximum value from a stream (amortized)', done => {
    runTest({ amortized: true }, require('./_max_amortized.json'), done)
  })

})
