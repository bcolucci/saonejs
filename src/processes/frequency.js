
import wrap from '../utils/wrap'

const TOTAL_TRIGGER = Number.MAX_SAFE_INTEGER - 1

const frequency = (write: Function, opts) => {

  let total, views, freq

  const roundFactor = !opts.round ? 1 : Math.pow(10, opts.round)
  const round = x => {
    if (roundFactor === 1)
      return x
    return Math.round(x * roundFactor) / roundFactor
  }

  const compute = () => round(views / (total || 1))
  const reset = () => total = views = 0

  reset()

  return {
    data: (data) => {

      total++
      if(opts.test(data))
        views++

      if (freq === undefined)
        freq = compute()

      const curFreq = compute()
      if (total < TOTAL_TRIGGER)
        return write(curFreq)

      freq = .5 * (freq + curFreq)
      reset()

      write(freq)
    }
  }
}

export default (opts = { test: Function, round: Number }): Function => wrap(frequency, opts)
