
import sinon from 'sinon'
import microseconds from 'microseconds'
import { deepEqual } from 'assert'
import { pranalyze } from '../../src/processes'
import createStream from '../../src/streams/stream'

describe('processes/pranalyze', () => {

  it('pre-analyze the elements of a stream', done => {
    const MICROSEC = 1234567891011121
    sinon.stub(microseconds, 'now', () => MICROSEC)
    const stream = createStream()
    const received = []
    pranalyze()(stream)
      .on('data', received.push.bind(received))
      .on('end', () => {
        deepEqual(received, [
          { size: 0, type: 'undefined', microtime: MICROSEC, data: undefined },
          { size: 8, type: 'number', microtime: MICROSEC, data: 'null' },
          { size: 0, type: 'function', microtime: MICROSEC, data: undefined },
          { size: 0, type: 'undefined', microtime: MICROSEC, data: undefined },
          { size: 0, type: 'function', microtime: MICROSEC, data: undefined },
          { size: 0, type: 'someclass', microtime: MICROSEC, data: '{}' },
          { size: 16, type: 'string', microtime: MICROSEC, data: '"a string"' },
          { size: 8, type: 'number', microtime: MICROSEC, data: '42' },
          { size: 4, type: 'boolean', microtime: MICROSEC, data: 'false' },
          { size: 20, type: 'array', microtime: MICROSEC, data: '[1,2]' }
        ])
        done()
      })
    class SomeClass {}
    const fn = () => {}
    const arr = [
      undefined,
      NaN,
      fn,
      void 0,
      Object,
      new SomeClass,
      'a string',
      42,
      false,
      [ 1, 2 ]
    ]
    arr.forEach(n => stream.write(n))
    stream.emit('end')
    microseconds.now.restore()
  })

})
