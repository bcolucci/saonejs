
import { F, last } from 'ramda'
import wrap from '../utils/wrap'

const compact = (write: Function, opts) => {

  let buffer = []

  return {
    data: (data) => {

      if (opts.test(data, last(buffer), buffer))
        return buffer = buffer.concat(data)

      if (buffer.length) {
        write(buffer.length === 1 ? last(buffer) : opts.compact(buffer))
        buffer = []
      }

      write(data)
    }
  }
}

export default (opts = { test: F, compact: last }): Function => wrap(compact, opts)
