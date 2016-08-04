
import wrap from '../utils/wrap'
import { F, last } from 'ramda'

const compact = (write: Function, opts) => {
  let toCompact = []

  return {
    data: (data) => {
      if(opts.test(data, last(toCompact))) {
        toCompact = toCompact.concat(data)
      } else {
        if(toCompact.length) {
          if(toCompact.length === 1) {
            write(last(toCompact))
          } else {
            // console.log('end of compact on data', data, toCompact);
            write(opts.compact(toCompact))  
          }
          
          toCompact = []
        }

        write(data)
      }
    }
  }
}

export default (opts = { test: F, compact: last }): Function => wrap(compact, opts)