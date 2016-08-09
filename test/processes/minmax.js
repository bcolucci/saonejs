
import { deepEqual } from 'assert'
import { min, max } from '../../src/processes'
import createStream from '../../src/streams/stream'

describe('processes/minmax', () => {

  const bigArr = require('./_bigArr.json')

  const runTest = (fn, opts, expected, done) => {
    const stream = createStream()
    const received = []
    fn(opts)(stream)
      .on('data', received.push.bind(received))
      .on('end', () => {
        deepEqual(received, expected)
        done()
      })
    bigArr.forEach(n => stream.write(n))
    stream.emit('end')
  }

  describe('max', () => {
    it('keeps the maximum value from a stream (standard)', done => {
      runTest(max, {}, require('./_max_standard.json'), done)
    })
    it('keeps the maximum value from a stream (amortized)', done => {
      runTest(max, { mode: 'amortized' }, require('./_max_amortized.json'), done)
    })
  })

  describe('min', () => {
    it('keeps the minimum value from a stream (standard)', done => {
      runTest(min, {}, require('./_min_standard.json'), done)
    })
    //TODO check that
    it('keeps the minimum value from a stream (amortized)', done => {
      runTest(min, { mode: 'amortized' }, require('./_min_amortized.json'), done)
    })
  })

})
