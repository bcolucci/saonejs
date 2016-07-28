
import sinon from 'sinon'
import { drop } from 'ramda'
import { strictEqual } from 'assert'
import * as Generators from '../../src/utils/generators'

describe('utils/generators', () => {

  it('continus should always returns a value from a generation function', () => {
    let nbIterations = 0
    const iterator = Generators.continus(() => nbIterations++)()
    strictEqual(iterator.next().value, 0)
    strictEqual(iterator.next().value, 1)
    strictEqual(iterator.next().value, 2)
  })

  it('integers should always returns the next integer', () => {
    const iterator = Generators.integers()
    strictEqual(iterator.next().value, 0)
    strictEqual(iterator.next().value, 1)
    strictEqual(iterator.next().value, 2)
  })

  it('mathRandom should always returns a random number', () => {
    const source = [ 0.24, 0.88, 0.17 ]
    sinon.stub(Math, 'random', () => source.shift())
    const iterator = Generators.mathRandom()
    strictEqual(iterator.next().value, 0.24)
    strictEqual(iterator.next().value, 0.88)
    strictEqual(iterator.next().value, 0.17)
    Math.random.restore()
  })

  //TODO conditioned
  //TODO bounded
  //TODO boundedByIterations
  //TODO boundedByValue

})
