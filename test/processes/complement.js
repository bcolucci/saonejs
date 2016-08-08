
import { deepEqual } from 'assert'
import { complement } from '../../src/processes'
import createStream from '../../src/streams/stream'

describe('processes/complement', () => {

  it('returns only the difference based on the keys', done => {
    const stream = createStream()
    const received = []
    complement()(stream)
      .on('data', received.push.bind(received))
      .on('end', () => {
        deepEqual(received, [ { k1: 1 }, { k2: 2 }, { k3: 3 } ])
        done()
      })
    stream.write({ k1: 1 })
    stream.write({ k1: 1, k2: 2 })
    stream.write({ k2: 2, k3: 3 })
    stream.emit('end')
  })

})
