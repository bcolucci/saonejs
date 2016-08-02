
import { T, head } from 'ramda'
import wrap from '../utils/wrap'

const compact = (write: Function, opts) => {
  let last = []
  return {
    data: (data) => {
      if(opts.test(data)) {
        last = last.concat(data)
        return
      }
      if (!last.length)
        return write(data)
      write(last.length === 1 ? head(last) : opts.compact(last))
      last = []
    }
  }
}

export default (opts = { test: T, compact: head }): Function => wrap(compact, opts)
