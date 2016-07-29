
import { forEach } from 'ramda'
import wrap from '../utils/wrap'

const flatten = (write: Function, opts: {}) => {
  return {
    data: (data) => forEach(write, data)
  }
}

export default (opts = {}): Function => wrap(flatten, opts)
