
import wrap from '../utils/wrap'
import { T } from 'ramda'

const first = (write: Function, opts) => {
  let done = false
  return {
    data: (data) => {
      if(opts.test(data)) {
        if(done) {
          return
        } else {
          done = true
          write(data)
        }
      } else {
        write(data)
      }
    }
  }
}

export default (opts = { test: Function = T }): Function => wrap(first, opts)
