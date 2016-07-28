
import { when } from 'ramda'
import wrap from '../utils/wrap'

const filter = (write: Function, opts) => {
  return {
    data: (data) => when(opts.test, write)(data)
  }
}

export default (opts = { test: Function }): Function => wrap(filter, opts)
