
import { ok, deepEqual } from 'assert'
import { cast } from '../../src/processes'
import createStream from '../../src/streams/stream'

describe('processes/cast', () => {

    it('cast elements from a stream (simple type)', done => {
      const stream = createStream()
      const received = []
      cast({ type: Number })(stream)
        .on('data', received.push.bind(received))
        .on('end', () => {
          ok(isNaN(received.shift()))
          deepEqual(received, [ 1, 2.6 ])
          done()
        })
      stream.write('a')
      stream.write('1')
      stream.write('2.6')
      stream.emit('end')
    })

    it('cast elements from a stream (custom type)', done => {

      class MyCustomType {
        constructor(x) {
          const n = Number(x)
          this.value = isNaN(n) ? null : n
        }
      }

      const stream = createStream()
      const received = []
      cast({ type: 'MyType', definition: MyCustomType })(stream)
        .on('data', received.push.bind(received))
        .on('end', () => {
          deepEqual(received, [
            new MyCustomType(),
            new MyCustomType(1),
            new MyCustomType(2.6)
          ])
          done()
        })
      stream.write('a')
      stream.write('1')
      stream.write('2.6')
      stream.emit('end')
    })

})
