
import { equals } from 'ramda'
import { deepEqual } from 'assert'
import { between } from '../../src/processes'
import createStream from '../../src/streams/stream'

describe('processes/between', () => {

  it('extract sequences', done => {
    const stream = createStream()
    const received = []
    between({ test: equals('a') })(stream)
      .on('data', received.push.bind(received))
      .on('end', () => {
        deepEqual(received, [
          [ 'a', 'b', 'c' ],
          [ 'a', 'c' ]
        ])
        done()
      })
    'babcacabc'.split('')
      .forEach(n => stream.write(n))
    stream.emit('end')
  })

})
