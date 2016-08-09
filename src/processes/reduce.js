
import wrap from '../utils/wrap'

const reduce = (write: Function, opts) => {
  let accumulator
  if (opts.initialValue !== undefined)
    accumulator = opts.initialValue
  return {
    data: (data) => {
      if (!accumulator)
        accumulator = data
      else
        accumulator = opts.reduce(accumulator, data)
      write(accumulator)
    }
  }
}

export default (opts = { reduce: Function, initialValue }): Function => wrap(reduce, opts)
