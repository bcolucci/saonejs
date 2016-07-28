
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
    tappedPipe(log, countEven)(1).should.equal(1)
    tappedPipe(log, countEven)(2).should.equal(2)
    logged.should.deepEqual([ 1, 2 ])
    nbEven.should.equal(1)
  })

})
