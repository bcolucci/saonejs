
import { equals } from 'ramda'
import { deepEqual } from 'assert'
import { between } from '../../src/processes'
import createStream from '../../src/streams/stream'

describe('processes/between', () => {

    it('extract sequences', done => {
      const stream = createStream()
      const values = []
      between({ test: equals('a') })(stream)
        .on('data', values.push.bind(values))
        .on('end', () => {
          deepEqual(values, [
            [ 'a', 'b', 'c' ],
            [ 'a', 'c' ]
          ])
          done()
        })
      const streamValues = [ 'b', 'a', 'b', 'c', 'a', 'c', 'a', 'b' ]
      streamValues.forEach(n => stream.write(n))
      stream.emit('end')
    })

})
