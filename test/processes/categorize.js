
import { difference } from 'ramda'
import { deepEqual } from 'assert'
import { categorize } from '../../src/processes'
import createStream from '../../src/streams/stream'

describe('processes/categorize', () => {

    it('creates a map of streams based on the possible values of an attribute', done => {
      const stream = createStream()
      const received = {}
      categorize({ field: 'gender' })(stream)
        .on('data', map => {
          difference(Object.keys(map), Object.keys(received))
            .forEach(category => {
              received[category] = []
              map[category].on('data', user => received[category].push(user))
            })
        })
        .on('end', () => {
          deepEqual(received, {
            male: [
              { name: 'brice', gender: 'male' },
              { name: 'arnaud', gender: 'male' },
              { name: 'steven', gender: 'male' }
            ],
            female: [
              { name: 'léa', gender: 'female' },
              { name: 'alaa', gender: 'female' }
            ]
          })
          done()
        })
      stream.write({ name: 'brice', gender: 'male' })
      stream.write({ name: 'arnaud', gender: 'male' })
      stream.write({ name: 'léa', gender: 'female' })
      stream.write({ name: 'steven', gender: 'male' })
      stream.write({ name: 'alaa', gender: 'female' })
      stream.emit('end')
    })

})
