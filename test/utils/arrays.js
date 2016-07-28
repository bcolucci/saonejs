
import { ok, deepEqual } from 'assert'
import { uniq } from 'ramda'
import { sample, fillFromGenerator } from '../../src/utils/arrays'
import { integers, boundedByIterations } from '../../src/utils/generators'

describe('utils/arrays', () => {

    it('sample should pick a random value from an array', () => {
      const arr = [ 'this', 'is', 'an', 'array' ]
      const values = []
      while (values.length < 50)
        values.push(sample(arr))
      const uniques = uniq(values)
      uniques.forEach((v) => ok(arr.includes(v)))
      ok(uniques.length > 1)
    })

    it('fillFromGenerator should fill an array from a generator', () => {
      const arr = fillFromGenerator({ generator: integers, nbItems: 3 })
      deepEqual(arr, [ 0, 1, 2 ])
    })

})
