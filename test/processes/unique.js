
import { equals } from 'ramda'
import { deepEqual } from 'assert'
import { unique } from '../../src/processes'
import createStream from '../../src/streams/stream'

describe('processes/unique', () => {

  it('take only unique values (simple)', done => {
    const stream = createStream()
    const received = []
    unique()(stream)
      .on('data', received.push.bind(received))
      .on('end', () => {
        deepEqual(received, [ 1, 2 ])
        done()
      })
    stream.write(1)
    stream.write(2)
    stream.write(1)
    stream.emit('end')
  })

  it('take only unique values (complex)', done => {
    const stream = createStream()
    const received = []
    unique({ equals: (a, b) => equals(a.name, b.name) })(stream)
      .on('data', received.push.bind(received))
      .on('end', () => {
        deepEqual(received, [ { name: 'onClick' }, { name: 'onMouseMove' } ])
        done()
      })
    stream.write({ name: 'onClick' })
    stream.write({ name: 'onMouseMove' })
    stream.write({ name: 'onClick' })
    stream.emit('end')
  })

})
