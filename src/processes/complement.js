
import { keys, difference, pick, union } from 'ramda'
import wrap from '../utils/wrap'

const each = (write: Function, opts: {}) => {

  let total = []

  return {
    data: (data) => {
      const currentKeys = keys(data)
      const diff = difference(currentKeys, total)
      write(pick(diff, data))
      total = union(total, currentKeys)
    }
  }
}

export default (opts = {}): Function => wrap(each, opts)
