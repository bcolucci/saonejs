
import pipe from '../../src/utils/pipe'
import createStream from '../../src/streams/stream'
import { deepEqual } from 'assert'
import { integers, boundedByIterations } from '../../src/utils/generators'
import { streamGenerator } from '../../src/utils/streams'

describe('utils/pipe', () => {

  it('should pipe a stream to a new one without transformation', (done) => {
    const fewNumbersGenerator = boundedByIterations(3)(integers)
    const fewNumbersGeneratorStream = streamGenerator(fewNumbersGenerator)
    const buffer = []
    pipe((x) => `n${x}`)(fewNumbersGeneratorStream)
      .on('data', buffer.push.bind(buffer))
      .on('end', () => {
        deepEqual(buffer, [ 'n0', 'n1', 'n2' ])
        done()
      })
  })

})
