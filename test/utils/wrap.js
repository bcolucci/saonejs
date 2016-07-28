
import { deepEqual } from 'assert'
import { integers, boundedByIterations } from '../../src/utils/generators'
import { streamGenerator } from '../../src/utils/streams'
import wrap from '../../src/utils/wrap'

describe('wrap', () => {

  it('should wrap a process and redirect the stream events', done => {

    const buffer = []

    const log = (write: Function, opts) => {
      return {
        data: (x) => { buffer.push(x) },
        end: () => {
          deepEqual(buffer, [ 0, 1, 2 ])
          done()
        }
      }
    }

    const fewNumbersGenerator = boundedByIterations(3)(integers)
    const fewNumbersGeneratorStream = streamGenerator(fewNumbersGenerator)
    wrap(log)(fewNumbersGeneratorStream)

  })

})
