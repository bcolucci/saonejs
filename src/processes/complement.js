
import { keys, difference, pick, union } from 'ramda'
import wrap from '../utils/wrap'

const each = (write: Function, opts: {}) => {

  let total = []

  return {
    data: (data) => {
      const keys = keys(data)
      const diff = difference(keys, total)
      write(pick(diff, data))
      total = union(total, keys)
    }
  }
}

export default (opts = {}): Function => wrap(each, opts)
