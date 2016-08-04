
import wrap from '../utils/wrap'

const round = (write: Function, opts) => {

  const factor = !opts.value ? 1 : Math.pow(10, opts.value)
  const roundFn = x => factor === 1 ? x : Math.round(x * factor) / factor

  return {
    data: (data) => write(roundFn(data))
  }
}

export default (opts = { value: Number }): Function => wrap(round, opts)
