
import wrap from '../utils/wrap'
import { F, last } from 'ramda'

const compact = (write: Function, opts) => {

  let toCompact = []

  return {
    data: (data) => {
      if(opts.test(data, last(toCompact), toCompact)) {
        toCompact = toCompact.concat(data)
      } else {
        if(toCompact.length) {
          write(toCompact.length === 1 ? last(toCompact) : opts.compact(toCompact))
          toCompact = []
        }

        write(data)
      }
    }
  }
}

export default (opts = { test: F, compact: last }): Function => wrap(compact, opts)
