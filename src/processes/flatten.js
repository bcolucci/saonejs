import R from 'ramda';
import wrap from '../utils/wrap'

const flatten = (write: Function, opts: {}) => {
  return {
    data: (data) => {
      R.forEach(write, data)
    }
  }
}

export default (opts = {}): Function => wrap(flatten, opts)
