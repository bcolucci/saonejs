
import { tap } from 'ramda'
import wrap from '../utils/wrap'

const each = (write: Function, opts) => {
  return {
    data: (data) => write(tap(opts.each(data)))
  }
}

export default (opts = { each: Function }): Function => wrap(each, opts)
