
import wrap from '../utils/wrap'
import { T, head } from 'ramda'

const compact = (write: Function, opts) => {
  let last = []

  return {
    data: (data) => {
      if(opts.test(data)) {
        last = last.concat(data)
      } else {
        if(last.length) {
          if(last.length === 1) {
            write(head(last))
          } else {
            write(opts.compact(last))  
          }
          
          last = []
        }

        write(data)
      }
    }
  }
}

export default (opts = { test: T, compact: head }): Function => wrap(compact, opts)