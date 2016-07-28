
import { strictEqual, deepEqual } from 'assert'
import tappedPipe from '../../src/utils/tappedPipe'

describe('tappedPipe', () => {

  it('Tap each functions and pipe them', () => {
    const logged = []
    const log = (x) => {
      logged.push(x)
      return undefined // thanks to the tap, will return x
    }
    let nbEven = 0
    const countEven = (x) => {
      if ((x % 2) === 0)
        nbEven += 1
      return 42 // see above
    }
    strictEqual(tappedPipe(log, countEven)(1), 1)
    strictEqual(tappedPipe(log, countEven)(2), 2)
    deepEqual(logged, [ 1, 2 ])
    strictEqual(nbEven, 1)
  })

})
