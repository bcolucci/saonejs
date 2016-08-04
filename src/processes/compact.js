
import wrap from '../utils/wrap'
import { F, last } from 'ramda'

const compact = (write: Function, opts) => {

  let buffer = []

  return {
    data: (data) => {
      if (!buffer.length)
        return buffer = [data]
      if (opts.test(data, last(buffer)))
        return buffer = buffer.concat(data)
      if (buffer.length) {
        write(opts.compact(buffer))
        buffer = []
      }
      write(data)
    }
  }
}

export default (opts = { test: F, compact: last }): Function => wrap(compact, opts)
