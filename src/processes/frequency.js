
import wrap from '../utils/wrap'

const TOTAL_TRIGGER = Number.MAX_SAFE_INTEGER - 1

const frequency = (write: Function, opts) => {

  let total, views, freq

  const compute = () => views / (total || 1)
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

      freq = (freq + curFreq) / 2
      reset()

      write(freq)
    }
  }
}

export default (opts = { test: Function }): Function => wrap(frequency, opts)
